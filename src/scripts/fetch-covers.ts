/**
 * Fetches book cover images for all titles in recommendations.ts and reading-orders.ts.
 * Writes results to src/lib/book-covers.json as a "Title|||Author" → URL map.
 * null = looked up, not found. Missing key = not yet looked up.
 * Run with: npx tsx src/scripts/fetch-covers.ts
 * Safe to re-run — skips already-resolved entries.
 */
import { config } from 'dotenv';
config({ path: '.env.local' });
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { RECOMMENDATIONS } from '../lib/recommendations';
import { ALL_READING_ORDER_SLUGS, getReadingOrder } from '../lib/reading-orders';

const GB_KEY = process.env.GOOGLE_BOOKS_API_KEY ?? '';
const OUT_PATH = join(process.cwd(), 'src/lib/book-covers.json');
const DELAY_OL = 250;   // Open Library: polite delay
const DELAY_GB = 150;   // Google Books: below quota threshold
const BATCH_SAVE = 100; // Save to disk every N lookups

let gbQuotaExhausted = false;
let olRequestCount = 0;
let gbRequestCount = 0;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function coverKey(title: string, author: string) {
  return `${title}|||${author}`;
}

// --- Open Library ---

async function olCoverByTitleAuthor(title: string, author: string): Promise<string | null> {
  try {
    const q = encodeURIComponent(`title:"${title}" author:"${author}"`);
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${q}&fields=cover_i&limit=1`,
      { headers: { 'User-Agent': 'BookReleaseRadar/1.0 (bookreleaseradar.com)' } }
    );
    olRequestCount++;
    if (!res.ok) return null;
    const data = await res.json() as { docs?: Array<{ cover_i?: number }> };
    const coverId = data.docs?.[0]?.cover_i;
    if (!coverId) return null;
    const url = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
    // Verify the cover actually exists
    await sleep(50);
    const check = await fetch(url, { method: 'HEAD' });
    if (!check.ok) return null;
    return url;
  } catch {
    return null;
  }
}

// --- Google Books ---

async function gbCoverByTitleAuthor(title: string, author: string): Promise<string | null> {
  if (gbQuotaExhausted || !GB_KEY) return null;
  try {
    const q = encodeURIComponent(`intitle:${title} inauthor:${author}`);
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${q}&key=${GB_KEY}&fields=items/volumeInfo/imageLinks&maxResults=1`
    );
    gbRequestCount++;
    if (res.status === 429) {
      gbQuotaExhausted = true;
      console.log('\n⚠ Google Books quota exhausted');
      return null;
    }
    if (!res.ok) return null;
    const data = await res.json() as { items?: Array<{ volumeInfo?: { imageLinks?: { thumbnail?: string; smallThumbnail?: string } } }> };
    const thumb =
      data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail ??
      data.items?.[0]?.volumeInfo?.imageLinks?.smallThumbnail;
    if (!thumb) return null;
    return thumb.replace('http://', 'https://').replace('zoom=1', 'zoom=2');
  } catch {
    return null;
  }
}

// --- Collect unique books ---

function collectUniqueBooks(): Array<{ title: string; author: string }> {
  const seen = new Set<string>();
  const books: Array<{ title: string; author: string }> = [];

  // From recommendations.ts
  for (const entry of RECOMMENDATIONS) {
    for (const rec of entry.recommendations) {
      const key = coverKey(rec.title, rec.author);
      if (!seen.has(key)) {
        seen.add(key);
        books.push({ title: rec.title, author: rec.author });
      }
    }
  }

  // From reading-orders.ts
  for (const slug of ALL_READING_ORDER_SLUGS) {
    const order = getReadingOrder(slug);
    if (!order) continue;
    for (const book of order.books) {
      const key = coverKey(book.title, book.author);
      if (!seen.has(key)) {
        seen.add(key);
        books.push({ title: book.title, author: book.author });
      }
    }
  }

  return books;
}

// --- Main ---

async function main() {
  // Load existing results (resume support)
  const existing: Record<string, string | null> = existsSync(OUT_PATH)
    ? JSON.parse(readFileSync(OUT_PATH, 'utf-8'))
    : {};

  const allBooks = collectUniqueBooks();
  const pending = allBooks.filter((b) => !(coverKey(b.title, b.author) in existing));

  const alreadyFound = Object.values(existing).filter((v) => v !== null).length;
  const alreadyMissed = Object.values(existing).filter((v) => v === null).length;

  console.log(`Total unique books: ${allBooks.length}`);
  console.log(`Already resolved: ${alreadyFound} found, ${alreadyMissed} not found`);
  console.log(`Pending lookups: ${pending.length}`);
  if (pending.length === 0) {
    console.log('Nothing to do.');
    return;
  }

  let found = 0;
  let missed = 0;
  let saved = 0;

  function saveResults() {
    writeFileSync(OUT_PATH, JSON.stringify(existing, null, 2));
    saved++;
  }

  for (let i = 0; i < pending.length; i++) {
    const { title, author } = pending[i];
    const key = coverKey(title, author);

    process.stdout.write(`[${i + 1}/${pending.length}] ${title.slice(0, 40).padEnd(40)} `);

    // Try Open Library first
    let url = await olCoverByTitleAuthor(title, author);
    await sleep(DELAY_OL);

    // Fallback to Google Books
    if (!url && !gbQuotaExhausted) {
      url = await gbCoverByTitleAuthor(title, author);
      await sleep(DELAY_GB);
    }

    existing[key] = url;

    if (url) {
      found++;
      process.stdout.write(`✓\n`);
    } else {
      missed++;
      process.stdout.write(`✗\n`);
    }

    // Save periodically so progress isn't lost
    if ((i + 1) % BATCH_SAVE === 0) {
      saveResults();
      console.log(`  → Saved checkpoint (${found} found, ${missed} missed so far)`);
    }
  }

  // Final save
  saveResults();

  console.log(`\nDone.`);
  console.log(`  Found: ${found}`);
  console.log(`  Not found: ${missed}`);
  console.log(`  OL requests: ${olRequestCount}`);
  console.log(`  GB requests: ${gbRequestCount}`);
  console.log(`  Output: ${OUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
