import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import { initDb, upsertBook, getBookCount } from '../lib/db';
import { SERIES } from '../lib/series';
import type { GBResponse, GBVolume, Book } from '../lib/types';
import { volumeToBook, hasQualityTitle } from '../lib/utils';

const BASE = 'https://www.googleapis.com/books/v1/volumes';

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchPage(query: string, startIndex = 0, retries = 3): Promise<GBVolume[]> {
  const key = process.env.GOOGLE_BOOKS_API_KEY;
  const params = new URLSearchParams({
    q: query,
    orderBy: 'newest',
    printType: 'books',
    langRestrict: 'en',
    maxResults: '40',
    startIndex: String(startIndex),
    ...(key ? { key } : {}),
  });

  for (let attempt = 0; attempt < retries; attempt++) {
    const res = await fetch(`${BASE}?${params}`, { cache: 'no-store' });
    if (res.status === 429) {
      const backoff = (attempt + 1) * 2000;
      console.log(`  Rate limited, backing off ${backoff}ms...`);
      await delay(backoff);
      continue;
    }
    if (!res.ok) {
      console.error(`  API error ${res.status} for: ${query}`);
      return [];
    }
    const data: GBResponse = await res.json();
    return data.items ?? [];
  }
  return [];
}

async function fetchSeriesBooks(searchTerms: string[], genre: string): Promise<Book[]> {
  const books: Book[] = [];
  const seen = new Set<string>();

  for (const term of searchTerms) {
    const volumes = await fetchPage(term);
    for (const vol of volumes) {
      if (seen.has(vol.id) || !vol.volumeInfo?.title) continue;
      const book = volumeToBook(vol);
      if (!hasQualityTitle(book.title)) continue;
      // Tag with series genre if not already tagged
      if (!book.genres.includes(genre)) {
        book.genres = [genre, ...book.genres];
      }
      seen.add(vol.id);
      books.push(book);
    }
    await delay(800);
  }

  return books;
}

async function main() {
  console.log('Initializing database...');
  await initDb();

  const before = await getBookCount();
  console.log(`Books in DB before series seed: ${before}\n`);

  let totalUpserted = 0;

  for (const series of SERIES) {
    console.log(`Seeding: ${series.name}${series.shortName ? ` (${series.shortName})` : ''}...`);
    const books = await fetchSeriesBooks(series.searchTerms, series.genre);
    console.log(`  Found ${books.length} books`);

    for (const book of books) {
      await upsertBook(book);
      totalUpserted++;
    }
    await delay(500);
  }

  const after = await getBookCount();
  console.log(`\nDone. Upserted ${totalUpserted} books. Total in DB: ${after}`);
}

main().catch(console.error);
