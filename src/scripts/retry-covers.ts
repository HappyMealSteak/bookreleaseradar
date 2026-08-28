/**
 * Retry cover lookups for books that returned null in book-covers.json.
 * Uses smarter title cleaning and looser queries.
 * Run with: npx tsx src/scripts/retry-covers.ts
 */
import { config } from 'dotenv';
config({ path: '.env.local' });
import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

const GB_KEY = process.env.GOOGLE_BOOKS_API_KEY ?? '';
const OUT_PATH = join(process.cwd(), 'src/lib/book-covers.json');
const DELAY = 300;

let gbQuotaExhausted = false;

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

// --- Title cleaning strategies ---

function cleanTitle(raw: string): string[] {
  const candidates = new Set<string>();
  candidates.add(raw);

  // Strip possessive author prefix: "Donna Tartt's The Secret History" → "The Secret History"
  const possessiveMatch = raw.match(/^[A-Z][^']+'\s+(.+)$/);
  if (possessiveMatch) candidates.add(possessiveMatch[1].trim());

  // Strip subtitle after colon: "Outlander: Cross Stitch" → "Outlander"
  if (raw.includes(':')) {
    candidates.add(raw.split(':')[0].trim());
    // Also try just the subtitle part
    candidates.add(raw.split(':').slice(1).join(':').trim());
  }

  // Strip parenthetical notes: "The Master and Margarita (trans. ...)" → "The Master and Margarita"
  if (raw.includes('(')) {
    candidates.add(raw.replace(/\s*\([^)]+\)/g, '').trim());
  }

  // Slash alternatives: "Blue Jasmine / The Ice Storm" → try each part
  if (raw.includes(' / ')) {
    raw.split(' / ').forEach((part) => candidates.add(part.trim()));
  }

  // Strip leading "The " for OL search variation
  if (raw.startsWith('The ')) candidates.add(raw.slice(4));

  return [...candidates].filter(Boolean);
}

// --- Open Library ---

async function olSearch(title: string, author: string): Promise<string | null> {
  // Try 1: strict quoted search
  const q1 = encodeURIComponent(`title:"${title}" author:"${author}"`);
  let url = await olFetch(q1);
  if (url) return url;
  await sleep(100);

  // Try 2: unquoted looser search
  const q2 = encodeURIComponent(`${title} ${author}`);
  url = await olFetch(q2);
  if (url) return url;
  await sleep(100);

  // Try 3: title only
  const q3 = encodeURIComponent(`title:"${title}"`);
  url = await olFetch(q3);
  return url;
}

async function olFetch(q: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${q}&fields=cover_i&limit=1`,
      { headers: { 'User-Agent': 'BookReleaseRadar/1.0 (bookreleaseradar.com)' } }
    );
    if (!res.ok) return null;
    const data = await res.json() as { docs?: Array<{ cover_i?: number }> };
    const coverId = data.docs?.[0]?.cover_i;
    if (!coverId) return null;
    const url = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
    await sleep(50);
    const check = await fetch(url, { method: 'HEAD' });
    if (!check.ok) return null;
    return url;
  } catch { return null; }
}

// --- Google Books ---

async function gbSearch(title: string, author: string): Promise<string | null> {
  if (gbQuotaExhausted || !GB_KEY) return null;
  try {
    const q = encodeURIComponent(`${title} ${author}`);
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${q}&key=${GB_KEY}&fields=items/volumeInfo/imageLinks&maxResults=1`
    );
    if (res.status === 429) { gbQuotaExhausted = true; return null; }
    if (!res.ok) return null;
    const data = await res.json() as { items?: Array<{ volumeInfo?: { imageLinks?: { thumbnail?: string } } }> };
    const thumb = data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail;
    if (!thumb) return null;
    return thumb.replace('http://', 'https://').replace('zoom=1', 'zoom=2');
  } catch { return null; }
}

// --- Main ---

async function main() {
  const covers: Record<string, string | null> = JSON.parse(readFileSync(OUT_PATH, 'utf-8'));

  const missed = Object.entries(covers)
    .filter(([, v]) => v === null)
    .map(([k]) => k);

  console.log(`Retrying ${missed.length} misses with smarter title cleaning…`);

  let recovered = 0;
  let stillMissed = 0;
  const SAVE_EVERY = 50;

  for (let i = 0; i < missed.length; i++) {
    const key = missed[i];
    const [rawTitle, author] = key.split('|||');
    const titleCandidates = cleanTitle(rawTitle);

    process.stdout.write(`[${i + 1}/${missed.length}] ${rawTitle.slice(0, 45).padEnd(45)} `);

    let found: string | null = null;

    for (const title of titleCandidates) {
      found = await olSearch(title, author);
      await sleep(DELAY);
      if (found) break;

      if (!gbQuotaExhausted) {
        found = await gbSearch(title, author);
        await sleep(150);
        if (found) break;
      }
    }

    if (found) {
      covers[key] = found;
      recovered++;
      process.stdout.write(`✓\n`);
    } else {
      stillMissed++;
      process.stdout.write(`✗\n`);
    }

    if ((i + 1) % SAVE_EVERY === 0) {
      writeFileSync(OUT_PATH, JSON.stringify(covers, null, 2));
      console.log(`  → Checkpoint saved (${recovered} recovered so far)`);
    }
  }

  writeFileSync(OUT_PATH, JSON.stringify(covers, null, 2));
  console.log(`\nDone. Recovered: ${recovered}, still missing: ${stillMissed}`);
}

main().catch((err) => { console.error(err); process.exit(1); });
