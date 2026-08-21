/**
 * Seed upcoming books from tracked series authors via Google Books API.
 * Run with: npx tsx src/scripts/seed-series-authors.ts
 */
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import { initDb, upsertBook } from '../lib/db';
import { volumeToBook, isUpcoming, hasQualityTitle } from '../lib/utils';
import type { GBVolume, Book } from '../lib/types';

const BASE = 'https://www.googleapis.com/books/v1/volumes';
const key = process.env.GOOGLE_BOOKS_API_KEY;

// Tracked series authors: name, default genre, and search queries
const AUTHORS = [
  { name: 'Sarah J. Maas', genre: 'fantasy' },
  { name: 'Rebecca Yarros', genre: 'fantasy' },
  { name: 'Brandon Sanderson', genre: 'fantasy' },
  { name: 'Leigh Bardugo', genre: 'fantasy' },
  { name: 'Cassandra Clare', genre: 'fantasy' },
  { name: 'Rick Riordan', genre: 'fantasy' },
  { name: 'Holly Black', genre: 'fantasy' },
  { name: 'V.E. Schwab', genre: 'fantasy' },
  { name: 'Pierce Brown', genre: 'sci-fi' },
  { name: 'Colleen Hoover', genre: 'romance' },
  { name: 'Emily Henry', genre: 'romance' },
  { name: 'Taylor Jenkins Reid', genre: 'fiction' },
  { name: 'Diana Gabaldon', genre: 'fiction' },
  { name: 'George R.R. Martin', genre: 'fantasy' },
  { name: 'Jennifer L. Armentrout', genre: 'fantasy' },
  { name: 'Jennifer Lynn Barnes', genre: 'thriller' },
  { name: 'Julia Quinn', genre: 'romance' },
  { name: 'Patrick Rothfuss', genre: 'fantasy' },
  { name: 'Andrzej Sapkowski', genre: 'fantasy' },
  { name: 'Ana Huang', genre: 'romance' },
  { name: 'Tahereh Mafi', genre: 'fantasy' },
  { name: 'Olivie Blake', genre: 'fantasy' },
  { name: 'Suzanne Collins', genre: 'sci-fi' },
  { name: 'R.F. Kuang', genre: 'fantasy' },
  { name: 'Stephen King', genre: 'horror' },
];

// Patterns that indicate reprints, foreign editions, or non-book entries
const REPRINT_PATTERNS = [
  /edizione italiana/i,
  /deluxe edition/i,
  /box set/i,
  /calendar/i,
  /day-to-day/i,
  /\bT\d+\b$/,    // "ACOTAR T6" French series numbering
  /^[A-Z]+\s+T\d+$/i,  // "ACOTAR T6"
];

function isNoiseTitle(title: string): boolean {
  return REPRINT_PATTERNS.some((p) => p.test(title));
}

async function fetchByAuthor(authorName: string): Promise<GBVolume[]> {
  const yr = new Date().getFullYear();
  const nextYr = yr + 1;
  const queries = [
    `inauthor:"${authorName}" ${yr}`,
    `inauthor:"${authorName}" ${nextYr}`,
  ];
  const seen = new Set<string>();
  const results: GBVolume[] = [];

  for (const query of queries) {
    const params = new URLSearchParams({
      q: query,
      orderBy: 'newest',
      printType: 'books',
      langRestrict: 'en',
      maxResults: '20',
      ...(key ? { key } : {}),
    });

    const res = await fetch(`${BASE}?${params}`, { cache: 'no-store' });
    if (!res.ok) {
      console.error(`  API error ${res.status} for ${authorName}`);
      continue;
    }

    const data = await res.json();
    for (const item of (data.items ?? []) as GBVolume[]) {
      if (!seen.has(item.id)) {
        seen.add(item.id);
        results.push(item);
      }
    }

    await delay(800);
  }

  return results;
}

async function seed() {
  console.log('Initializing database...');
  await initDb();

  let total = 0;

  for (const { name, genre } of AUTHORS) {
    console.log(`\nFetching: ${name}`);
    try {
      const volumes = await fetchByAuthor(name);
      const upcoming: Book[] = [];

      for (const vol of volumes) {
        const info = vol.volumeInfo;
        if (!info?.title) continue;
        // Skip non-English editions
        if (info.language && info.language !== 'en') continue;
        if (isNoiseTitle(info.title)) continue;
        const book = volumeToBook(vol);
        if (!isUpcoming(book.publishedDate)) continue;
        if (!hasQualityTitle(book.title)) continue;
        if (!book.genres.includes(genre)) {
          book.genres = [genre, ...book.genres];
        }
        upcoming.push(book);
      }

      if (upcoming.length === 0) {
        console.log(`  No upcoming books found`);
        continue;
      }

      console.log(`  Found ${upcoming.length} upcoming books:`);
      for (const book of upcoming) {
        console.log(`    - ${book.publishedDate ?? 'TBA'} | ${book.title}`);
        await upsertBook(book);
        total++;
      }
    } catch (err) {
      console.error(`  Error for ${name}:`, err);
    }
  }

  console.log(`\nDone. Upserted ${total} books.`);
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
