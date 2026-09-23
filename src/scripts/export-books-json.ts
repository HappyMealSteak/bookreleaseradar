// Dumps the Turso `books` table to src/data/books.json.
//
// Vercel builds and page renders no longer query Turso at all (see
// src/lib/db.ts) — they read this committed file instead. Turso reads now
// only happen here, once per seed run, which is why the site can live on the
// free tier: a few hundred row reads a week instead of thousands per build.
//
// Run after seeding: npx tsx src/scripts/export-books-json.ts
import { createClient } from '@libsql/client';
import { writeFileSync, mkdirSync } from 'fs';
import path from 'path';

async function main() {
  const url = process.env.DATABASE_URL ?? 'file:./dev.db';
  const authToken = process.env.TURSO_AUTH_TOKEN;
  const db = createClient({ url, authToken });

  const result = await db.execute('SELECT * FROM books ORDER BY published_date DESC');
  const books = result.rows.map((row) => {
    const r = row as Record<string, unknown>;
    return {
      id: r.id as string,
      isbn: r.isbn as string | null,
      slug: r.slug as string,
      title: r.title as string,
      authors: JSON.parse(r.authors as string),
      publishedDate: r.published_date as string | null,
      description: r.description as string | null,
      coverUrl: r.cover_url as string | null,
      genres: JSON.parse(r.genres as string),
      pageCount: r.page_count as number | null,
      publisher: r.publisher as string | null,
      amazonUrl: r.amazon_url as string,
      googleUrl: r.google_url as string | null,
    };
  });

  const outDir = path.join(process.cwd(), 'src', 'data');
  mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'books.json');
  writeFileSync(outPath, JSON.stringify(books));
  console.log(`Wrote ${books.length} books to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
