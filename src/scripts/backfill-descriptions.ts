/**
 * Backfill descriptions for books using Open Library Works API + OL search.
 * Handles OL books by OLID, and GB books by title/author OL search.
 * Run with: npx tsx src/scripts/backfill-descriptions.ts
 */
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { createClient } from '@libsql/client';

const GB_KEY = process.env.GOOGLE_BOOKS_API_KEY ?? '';

const db = createClient({
  url: process.env.DATABASE_URL ?? '',
  authToken: process.env.TURSO_AUTH_TOKEN,
});

let olDown = false;
let gbQuotaExhausted = false;

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function extractDescription(data: Record<string, unknown>): string | null {
  const desc = data.description;
  if (!desc) return null;
  if (typeof desc === 'string') return desc.slice(0, 2000);
  if (typeof desc === 'object' && desc !== null) {
    const val = (desc as Record<string, unknown>).value;
    if (typeof val === 'string') return val.slice(0, 2000);
  }
  return null;
}

async function fetchOLDescriptionByOlid(olId: string): Promise<string | null> {
  if (olDown) return null;
  try {
    const res = await fetch(`https://openlibrary.org/works/${olId}.json`, {
      headers: { 'User-Agent': 'BookReleaseRadar/1.0 (bookreleaseradar.com)' },
    });
    if (res.status === 503 || res.status === 502) {
      console.log('\n⚠ OL returning 503 — pausing OL lookups');
      olDown = true;
      return null;
    }
    if (!res.ok) return null;
    const data = await res.json();
    return extractDescription(data as Record<string, unknown>);
  } catch {
    return null;
  }
}

async function fetchOLDescriptionBySearch(title: string, author: string): Promise<string | null> {
  if (olDown) return null;
  try {
    const q = encodeURIComponent(`${title} ${author}`);
    const res = await fetch(`https://openlibrary.org/search.json?q=${q}&fields=key&limit=1`, {
      headers: { 'User-Agent': 'BookReleaseRadar/1.0 (bookreleaseradar.com)' },
    });
    if (res.status >= 500) { olDown = true; return null; }
    if (!res.ok) return null;
    const data = (await res.json()) as { docs?: Array<{ key?: string }> };
    const key = data.docs?.[0]?.key; // like "/works/OLxxxxW"
    if (!key) return null;
    await delay(500);
    const worksRes = await fetch(`https://openlibrary.org${key}.json`, {
      headers: { 'User-Agent': 'BookReleaseRadar/1.0 (bookreleaseradar.com)' },
    });
    if (!worksRes.ok) return null;
    const work = await worksRes.json();
    return extractDescription(work as Record<string, unknown>);
  } catch {
    return null;
  }
}

async function fetchOLDescriptionByIsbn(isbn: string): Promise<string | null> {
  if (olDown) return null;
  try {
    // OL ISBN endpoint redirects to an edition; editions sometimes carry work keys
    const res = await fetch(`https://openlibrary.org/isbn/${isbn}.json`, {
      headers: { 'User-Agent': 'BookReleaseRadar/1.0 (bookreleaseradar.com)' },
    });
    if (res.status >= 500) { olDown = true; return null; }
    if (!res.ok) return null;
    const edition = (await res.json()) as { works?: Array<{ key: string }> };
    const workKey = edition.works?.[0]?.key; // e.g. "/works/OL123W"
    if (!workKey) return null;
    await delay(500);
    const worksRes = await fetch(`https://openlibrary.org${workKey}.json`, {
      headers: { 'User-Agent': 'BookReleaseRadar/1.0 (bookreleaseradar.com)' },
    });
    if (!worksRes.ok) return null;
    const work = await worksRes.json();
    return extractDescription(work as Record<string, unknown>);
  } catch {
    return null;
  }
}

async function fetchGBDescription(volumeId: string): Promise<string | null> {
  if (gbQuotaExhausted) return null;
  try {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${volumeId}?key=${GB_KEY}&fields=volumeInfo/description`
    );
    if (res.status === 429) { gbQuotaExhausted = true; console.log('\n⚠ Google Books quota exhausted'); return null; }
    if (!res.ok) return null;
    const data = (await res.json()) as { volumeInfo?: { description?: string } };
    return data.volumeInfo?.description?.slice(0, 2000) ?? null;
  } catch {
    return null;
  }
}

async function main() {
  const result = await db.execute(
    `SELECT id, isbn, title, authors FROM books
     WHERE (description IS NULL OR description = '')
     ORDER BY RANDOM()
     LIMIT 2000`
  );

  console.log(`Found ${result.rows.length} books needing descriptions`);

  let updated = 0;
  let notFound = 0;
  let errors = 0;
  let batch = 0;

  for (const row of result.rows) {
    const id = row.id as string;
    const isbn = row.isbn as string | null;
    const title = row.title as string;
    const authors = JSON.parse(row.authors as string) as string[];
    const author = authors[0] ?? '';
    const isOl = id.startsWith('ol-OL');

    let desc: string | null = null;

    if (isOl) {
      const olId = id.replace(/^ol-/, '');
      desc = await fetchOLDescriptionByOlid(olId);
      if (!desc && isbn && !olDown) {
        await delay(500);
        desc = await fetchOLDescriptionByIsbn(isbn);
      }
      if (!desc && !olDown) {
        await delay(600);
        desc = await fetchOLDescriptionBySearch(title, author);
      }
    } else {
      // GB book: try GB API first, then OL by ISBN, then OL search
      desc = await fetchGBDescription(id);
      if (!desc && isbn && !olDown) {
        await delay(500);
        desc = await fetchOLDescriptionByIsbn(isbn);
      }
      if (!desc && !olDown) {
        await delay(600);
        desc = await fetchOLDescriptionBySearch(title, author);
      }
    }

    if (desc) {
      await db.execute({
        sql: 'UPDATE books SET description = ?, updated_at = unixepoch() WHERE id = ?',
        args: [desc, id],
      });
      updated++;
      if (updated % 25 === 0) {
        console.log(`  ${updated} updated, ${notFound} not found, ${errors} errors…`);
      }
    } else {
      notFound++;
    }

    batch++;
    await delay(olDown ? 300 : 1100);

    if (olDown && gbQuotaExhausted) {
      console.log('Both OL and GB are unavailable — stopping. Re-run later.');
      break;
    }

    if (batch >= 500) {
      console.log('Pausing at 500 requests — re-run to continue');
      break;
    }
  }

  console.log(`\nDone. Updated: ${updated}, Not found: ${notFound}, Errors: ${errors}`);
}

main().catch(console.error);
