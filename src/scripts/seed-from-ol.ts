/**
 * Seed books from Open Library for specific authors (bypass GB API quota).
 * Run with: npx tsx src/scripts/seed-from-ol.ts
 */
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { initDb, upsertBook } from '../lib/db';
import { slugify, buildAmazonUrl, mapCategories, hasQualityTitle } from '../lib/utils';
import type { Book } from '../lib/types';

const AUTHORS_TO_SEED = [
  { name: 'Ana Huang', genre: 'romance' as const },
  { name: 'Andrzej Sapkowski', genre: 'fantasy' as const },
  { name: 'Jennifer L. Armentrout', genre: 'fantasy' as const },
  { name: 'Jennifer Lynn Barnes', genre: 'thriller' as const },
  { name: 'Julia Quinn', genre: 'romance' as const },
  { name: 'Patrick Rothfuss', genre: 'fantasy' as const },
  { name: 'Tahereh Mafi', genre: 'fantasy' as const },
  { name: 'Olivie Blake', genre: 'fantasy' as const },
  { name: 'Suzanne Collins', genre: 'sci-fi' as const },
  { name: 'R.F. Kuang', genre: 'fantasy' as const },
  { name: 'Stephen King', genre: 'horror' as const },
];

// Only include books published from this year onward
const CUTOFF_YEAR = 2022;

// Additional junk patterns specific to OL aggregation noise
const OL_JUNK_PATTERNS = [
  /\bboxed?\s*set\b/i,
  /\bcollection\s+set\b/i,
  /\bbooks?\s+collection\b/i,
  /\bcomplete\s+collection\b/i,
  /\bprepack\b/i,
  /\bsigned\s+edition\b/i,
  /\bsigned\s+copy\b/i,
  /\b\d+[\s-]copy\b/i,
  /\bpaperback\s+boxed?\b/i,
  /\bbundle\b/i,
  /\bassort\b/i,
  /\bboxset\b/i,
  /\bstandard edition\b/i,
  /sneak peek/i,
  /\bvol\.\s*1-/i,       // "Vol. 1-6 by Author"
  /\bbooks?\s+1-\d+/i,   // "Books 1-5 by Author"
  / \d+-book /i,         // "9-Book" or "8-Book set"
];

// Detect obvious non-English using character ranges (accented/non-Latin characters)
function isLikelyEnglish(title: string): boolean {
  // Allow basic Latin, common punctuation, and digits
  const nonEnglish = /[^\x00-\x7FÀ-ɏ]/;
  if (nonEnglish.test(title)) return false;
  // Check for obvious Spanish/German/French common words
  const foreignWords = /\b(Los|Las|El|La|Le|Les|De|Der|Die|Das|Von|Und|Für|Ist|Du|Mon|Sur|Por|Del|Una|Unos|Unas|zum|zur|Des|Vom|Nacida|Déjate|Oświadczyny|Grzesznik|Wiedźmin|Kroniek)\b/;
  return !foreignWords.test(title);
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

interface OLDoc {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  isbn?: string[];
  cover_i?: number;
  subject?: string[];
  publisher?: string[];
  publish_date?: string[];
}

async function searchOL(authorName: string): Promise<OLDoc[]> {
  const query = encodeURIComponent(authorName);
  const fields = 'key,title,author_name,first_publish_year,isbn,cover_i,subject,publisher,publish_date';
  const url = `https://openlibrary.org/search.json?author=${query}&sort=new&limit=50&fields=${fields}&lang=eng`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'BookReleaseRadar/1.0 (bookreleaseradar.com)' },
  });
  if (!res.ok) {
    console.error(`  OL search error ${res.status} for ${authorName}`);
    return [];
  }
  const data = await res.json() as { docs?: OLDoc[] };
  return data.docs ?? [];
}

function docToBook(doc: OLDoc, authorName: string, defaultGenre: string): Book | null {
  if (!doc.title || !hasQualityTitle(doc.title)) return null;
  if (!isLikelyEnglish(doc.title)) return null;
  if (OL_JUNK_PATTERNS.some((p) => p.test(doc.title))) return null;
  const year = doc.first_publish_year;
  if (!year || year < CUTOFF_YEAR) return null;

  const isbn = doc.isbn?.find((i) => i.length === 13) ?? doc.isbn?.[0] ?? null;
  const olid = doc.key?.replace('/works/', '') ?? null;
  const id = olid ? `ol-${olid}` : isbn ?? slugify(doc.title);
  const slug = isbn ?? slugify(doc.title);

  const coverUrl = doc.cover_i
    ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
    : null;

  const genres = doc.subject ? mapCategories(doc.subject) : [];
  if (!genres.includes(defaultGenre as any)) {
    genres.unshift(defaultGenre as any);
  }

  return {
    id,
    isbn,
    slug,
    title: doc.title,
    authors: doc.author_name ?? [authorName],
    publishedDate: year.toString(),
    description: null,
    coverUrl,
    genres: genres.length ? genres : [defaultGenre as any],
    pageCount: null,
    publisher: doc.publisher?.[0] ?? null,
    amazonUrl: buildAmazonUrl(isbn, doc.title, [authorName]),
    googleUrl: null,
  };
}

async function main() {
  await initDb();
  let total = 0;

  for (const { name, genre } of AUTHORS_TO_SEED) {
    console.log(`\nSearching Open Library for: ${name}`);
    const docs = await searchOL(name);
    console.log(`  Found ${docs.length} results`);

    let upserted = 0;
    for (const doc of docs) {
      const book = docToBook(doc, name, genre);
      if (!book) continue;
      // Only upsert if author name matches
      const authorMatch = doc.author_name?.some((a) =>
        a.toLowerCase().includes(name.split(' ').slice(-1)[0].toLowerCase())
      );
      if (!authorMatch) continue;

      await upsertBook(book);
      console.log(`    + ${book.publishedDate} | ${book.title}`);
      upserted++;
    }
    console.log(`  Upserted ${upserted} books`);
    total += upserted;

    await delay(500);
  }

  console.log(`\nDone. Total upserted: ${total}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
