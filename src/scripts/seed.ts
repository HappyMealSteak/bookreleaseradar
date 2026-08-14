/**
 * Seed the local database with upcoming books from Google Books API.
 * Run with: npx tsx src/scripts/seed.ts
 */
import dotenv from 'dotenv';
import path from 'path';

// Next.js uses .env.local; dotenv/config only reads .env by default
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
import { initDb, upsertBook, getBookCount, cleanupPlaceholderBooks } from '../lib/db';
import { fetchUpcomingByGenre } from '../lib/google-books';
import { GENRES, type Genre } from '../lib/types';

async function seed() {
  console.log('Initializing database...');
  await initDb();

  console.log('Removing placeholder titles...');
  const removed = await cleanupPlaceholderBooks();
  console.log(`  Removed ${removed} placeholder books`);

  const before = await getBookCount();
  console.log(`Books in DB before seed: ${before}`);

  let total = 0;

  for (const genre of GENRES) {
    console.log(`\nFetching ${genre}...`);
    try {
      const books = await fetchUpcomingByGenre(genre as Genre, 3);
      console.log(`  Found ${books.length} upcoming books`);

      for (const book of books) {
        await upsertBook(book);
        total++;
      }

      // Pause between genres to stay under rate limits
      await new Promise((r) => setTimeout(r, 1500));
    } catch (err) {
      console.error(`  Error fetching ${genre}:`, err);
    }
  }

  const after = await getBookCount();
  console.log(`\nDone. Upserted ${total} books. Total in DB: ${after}`);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
