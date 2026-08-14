/**
 * Seed series author books using Open Library (no API key, no quota).
 * Run with: npm run seed:series
 */
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import { initDb, upsertBook, getBookCount } from '../lib/db';
import { buildAmazonUrl } from '../lib/utils';
import type { Book } from '../lib/types';

const OL_SEARCH = 'https://openlibrary.org/search.json';
const OL_COVERS = 'https://covers.openlibrary.org/b/id';

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG ?? 'bookreleaseradar-20';

// Authors whose books power the series pages
const SERIES_AUTHORS = [
  { name: 'Sarah J. Maas',      genre: 'fantasy' },
  { name: 'Rebecca Yarros',     genre: 'fantasy' },
  { name: 'Colleen Hoover',     genre: 'romance' },
  { name: 'George R.R. Martin', genre: 'fantasy' },
  { name: 'Brandon Sanderson',  genre: 'fantasy' },
  { name: 'Robert Jordan',      genre: 'fantasy' },
  { name: 'Leigh Bardugo',      genre: 'fantasy' },
  { name: 'Emily Henry',        genre: 'romance' },
  { name: 'Taylor Jenkins Reid', genre: 'fiction' },
];

interface OLDoc {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  isbn?: string[];
  cover_i?: number;
  publisher?: string[];
  number_of_pages_median?: number;
  language?: string[];
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);
}

async function fetchAuthorBooks(authorName: string): Promise<OLDoc[]> {
  const params = new URLSearchParams({
    author: authorName,
    limit: '100',
    sort: 'new',
    language: 'eng',
    fields: 'key,title,author_name,first_publish_year,isbn,cover_i,publisher,number_of_pages_median,language',
  });

  const res = await fetch(`${OL_SEARCH}?${params}`, {
    headers: { 'User-Agent': 'BookReleaseRadar/1.0 (bookreleaseradar.com)' },
  });

  if (!res.ok) {
    console.error(`  Open Library error ${res.status} for ${authorName}`);
    return [];
  }

  const data = await res.json();
  return (data.docs ?? []) as OLDoc[];
}

function docToBook(doc: OLDoc, author: string, genre: string): Book | null {
  if (!doc.title || doc.title.length < 2) return null;

  // Skip non-English
  if (doc.language && doc.language.length > 0 && !doc.language.includes('eng')) return null;

  // Prefer ISBN-13, fall back to ISBN-10
  const isbn13 = doc.isbn?.find((i) => i.length === 13) ?? null;
  const isbn10 = doc.isbn?.find((i) => i.length === 10) ?? null;
  const isbn = isbn13 ?? isbn10 ?? null;

  const slug = isbn ?? slugify(doc.title);
  const id = doc.key.replace('/works/', 'ol-');

  // Published date: use first_publish_year as a year string
  const publishedDate = doc.first_publish_year ? String(doc.first_publish_year) : null;

  // Cover URL from Open Library
  const coverUrl = doc.cover_i
    ? `${OL_COVERS}/${doc.cover_i}-L.jpg`
    : null;

  const amazonUrl = buildAmazonUrl(isbn13, doc.title, [author]);

  return {
    id,
    isbn,
    slug,
    title: doc.title,
    authors: [author],
    publishedDate,
    description: null,
    coverUrl,
    genres: [genre],
    pageCount: doc.number_of_pages_median ?? null,
    publisher: doc.publisher?.[0] ?? null,
    amazonUrl,
    googleUrl: `https://openlibrary.org${doc.key}`,
  };
}

async function main() {
  console.log('Initializing database...');
  await initDb();

  const before = await getBookCount();
  console.log(`Books in DB before series seed: ${before}\n`);

  let totalUpserted = 0;

  for (const { name, genre } of SERIES_AUTHORS) {
    console.log(`Seeding: ${name}...`);
    const docs = await fetchAuthorBooks(name);
    console.log(`  Open Library returned ${docs.length} docs`);

    let upserted = 0;
    for (const doc of docs) {
      const book = docToBook(doc, name, genre);
      if (!book) continue;
      await upsertBook(book);
      upserted++;
      totalUpserted++;
    }
    console.log(`  Upserted ${upserted} books`);
    await delay(500); // Be polite to Open Library
  }

  const after = await getBookCount();
  console.log(`\nDone. Upserted ${totalUpserted} books. Total in DB: ${after}`);
}

main().catch(console.error);
