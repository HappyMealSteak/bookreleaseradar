// Backfill cover images for books that don't have them.
// Uses Google Books API (we store the volume ID as the book ID) and
// Open Library covers as fallback.
import { config } from 'dotenv';
config({ path: '.env.local' });
import { createClient } from '@libsql/client';

const GB_KEY = process.env.GOOGLE_BOOKS_API_KEY ?? '';
const BATCH = 200;
const DELAY_MS = 150;
let gbQuotaExhausted = false;

const db = createClient({
  url: process.env.DATABASE_URL ?? '',
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchGbCover(volumeId: string): Promise<string | null> {
  if (gbQuotaExhausted) return null;
  try {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${volumeId}?key=${GB_KEY}&fields=volumeInfo/imageLinks`
    );
    if (res.status === 429) { gbQuotaExhausted = true; console.log('\n⚠ Google Books quota exhausted — skipping GB lookups'); return null; }
    if (!res.ok) return null;
    const data = (await res.json()) as { volumeInfo?: { imageLinks?: { thumbnail?: string; smallThumbnail?: string } } };
    const thumb = data.volumeInfo?.imageLinks?.thumbnail ?? data.volumeInfo?.imageLinks?.smallThumbnail;
    if (!thumb) return null;
    return thumb.replace('http://', 'https://').replace('zoom=1', 'zoom=2');
  } catch {
    return null;
  }
}

async function fetchGbCoverByIsbn(isbn: string): Promise<string | null> {
  if (gbQuotaExhausted) return null;
  try {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${GB_KEY}&fields=items/volumeInfo/imageLinks&maxResults=1`
    );
    if (res.status === 429) { gbQuotaExhausted = true; return null; }
    if (!res.ok) return null;
    const data = (await res.json()) as { items?: Array<{ volumeInfo?: { imageLinks?: { thumbnail?: string } } }> };
    const thumb = data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail;
    if (!thumb) return null;
    return thumb.replace('http://', 'https://').replace('zoom=1', 'zoom=2');
  } catch {
    return null;
  }
}

async function fetchOlCoverByTitleAuthor(title: string, author: string): Promise<string | null> {
  try {
    const q = encodeURIComponent(`title:"${title}" author:"${author}"`);
    const res = await fetch(`https://openlibrary.org/search.json?q=${q}&fields=cover_i&limit=1`, {
      headers: { 'User-Agent': 'BookReleaseRadar/1.0 (bookreleaseradar.com)' },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { docs?: Array<{ cover_i?: number }> };
    const coverId = data.docs?.[0]?.cover_i;
    if (!coverId) return null;
    const url = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
    const check = await fetch(url);
    if (!check.ok) return null;
    const buf = await check.arrayBuffer();
    if (buf.byteLength < 500) return null;
    return url;
  } catch {
    return null;
  }
}

async function fetchOlCoverByOlid(olId: string): Promise<string | null> {
  // olId format: "ol-OL12345678W" → we need "OL12345678W"
  const olid = olId.replace(/^ol-/, '');
  try {
    const url = `https://covers.openlibrary.org/b/olid/${olid}-M.jpg?default=false`;
    const res = await fetch(url);
    if (!res.ok || res.status === 404) return null;
    const buf = await res.arrayBuffer();
    // OL returns a tiny 1-pixel "not found" image (43 bytes) when there's no cover
    if (buf.byteLength < 500) return null;
    return `https://covers.openlibrary.org/b/olid/${olid}-M.jpg`;
  } catch {
    return null;
  }
}

async function fetchOlCoverByIsbn(isbn: string): Promise<string | null> {
  try {
    const url = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg?default=false`;
    const res = await fetch(url);
    if (!res.ok || res.status === 404) return null;
    const buf = await res.arrayBuffer();
    if (buf.byteLength < 500) return null;
    return `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
  } catch {
    return null;
  }
}

async function main() {
  const rows = await db.execute({
    sql: 'SELECT id, isbn, title, authors FROM books WHERE cover_url IS NULL ORDER BY id LIMIT ?',
    args: [BATCH],
  });

  console.log(`Backfilling covers for ${rows.rows.length} books…`);
  let updated = 0;
  let notFound = 0;

  for (const row of rows.rows) {
    const id = row.id as string;
    const isbn = row.isbn as string | null;
    const title = row.title as string;
    const authors = JSON.parse(row.authors as string) as string[];
    const author = authors[0] ?? '';
    const isOl = id.startsWith('ol-');

    let cover: string | null = null;

    if (isOl) {
      cover = await fetchOlCoverByOlid(id);
      if (!cover && isbn) { await sleep(50); cover = await fetchOlCoverByIsbn(isbn); }
      if (!cover) { await sleep(200); cover = await fetchOlCoverByTitleAuthor(title, author); }
      if (!cover && isbn && !gbQuotaExhausted) { await sleep(50); cover = await fetchGbCoverByIsbn(isbn); }
    } else {
      // GB book: OL ISBN first (doesn't hit quota), then GB volume, then OL search
      if (isbn) cover = await fetchOlCoverByIsbn(isbn);
      if (!cover && !gbQuotaExhausted) { await sleep(50); cover = await fetchGbCover(id); }
      if (!cover && isbn && !gbQuotaExhausted) { await sleep(50); cover = await fetchGbCoverByIsbn(isbn); }
      if (!cover) { await sleep(200); cover = await fetchOlCoverByTitleAuthor(title, author); }
    }

    if (cover) {
      await db.execute({
        sql: 'UPDATE books SET cover_url = ?, updated_at = unixepoch() WHERE id = ?',
        args: [cover, id],
      });
      updated++;
      if (updated % 10 === 0) process.stdout.write(`  ${updated} updated…\r`);
    } else {
      notFound++;
    }

    await sleep(DELAY_MS);
  }

  console.log(`\nUpdated ${updated} covers, ${notFound} not found.`);

  const remaining = await db.execute({
    sql: 'SELECT COUNT(*) as n FROM books WHERE cover_url IS NULL',
    args: [],
  });
  console.log(`Books still without covers: ${(remaining.rows[0] as Record<string, unknown>).n}`);
}

main().then(() => process.exit(0)).catch((err) => {
  console.error(err);
  process.exit(1);
});
