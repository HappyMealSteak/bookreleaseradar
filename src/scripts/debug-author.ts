import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), '.env.production.local') });

import { createClient } from '@libsql/client';

async function main() {
  console.log('DATABASE_URL:', process.env.DATABASE_URL?.slice(0, 40));
  const db = createClient({ url: process.env.DATABASE_URL!, authToken: process.env.TURSO_AUTH_TOKEN });

  // Test the exact query used by getBooksByAuthorSlug
  const slug = 'sarah-j-maas';
  const pattern = `%${slug.replace(/-/g, '%')}%`;
  console.log('LIKE pattern:', pattern);

  const result = await db.execute({
    sql: `SELECT id, slug, title, authors, published_date, cover_url, amazon_url FROM books WHERE authors LIKE ? ORDER BY published_date DESC LIMIT 24`,
    args: [pattern],
  });

  console.log(`\nRows found: ${result.rows.length}`);
  for (const row of result.rows.slice(0, 5)) {
    const r = row as Record<string, unknown>;
    console.log(`  ${r.title} | authors=${r.authors} | date=${r.published_date} | cover=${r.cover_url ? 'yes' : 'null'} | amazon=${String(r.amazon_url).slice(0, 60)}`);
  }

  // Check for any rows that would crash JSON.parse
  const allAuthors = await db.execute("SELECT id, authors FROM books WHERE authors LIKE '%Sarah%Maas%'");
  let parseErrors = 0;
  for (const row of allAuthors.rows) {
    const r = row as Record<string, unknown>;
    try { JSON.parse(r.authors as string); } catch (e) { parseErrors++; console.log('Parse error on:', r.id, r.authors); }
  }
  console.log('\nParse errors:', parseErrors);

  // Simulate the upcoming filter
  const books = result.rows.map((row) => {
    const r = row as Record<string, unknown>;
    return { publishedDate: r.published_date as string | null };
  });
  const now = new Date();
  const upcoming = books.filter((b) => b.publishedDate && new Date(b.publishedDate) >= now);
  console.log('\nUpcoming books (from filter):', upcoming.length, 'out of', books.length);
}
main().catch(console.error);
