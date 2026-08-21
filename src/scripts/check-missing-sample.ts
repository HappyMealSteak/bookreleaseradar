import { config } from 'dotenv';
config({ path: '.env.local' });
import { createClient } from '@libsql/client';

async function main() {
  const db = createClient({ url: process.env.DATABASE_URL!, authToken: process.env.TURSO_AUTH_TOKEN });
  
  const rows = await db.execute("SELECT id, isbn, title, authors FROM books WHERE cover_url IS NULL LIMIT 10");
  for (const r of rows.rows) {
    console.log(`${r.id} | isbn:${r.isbn} | ${r.title} | ${r.authors}`);
  }
  
  const isbnCount = await db.execute("SELECT COUNT(*) as n FROM books WHERE cover_url IS NULL AND isbn IS NOT NULL");
  const noIsbn = await db.execute("SELECT COUNT(*) as n FROM books WHERE cover_url IS NULL AND isbn IS NULL");
  console.log('\nWith ISBN:', isbnCount.rows[0].n, '| Without ISBN:', noIsbn.rows[0].n);
  
  // Test one OL cover URL
  const olBook = await db.execute("SELECT id, isbn FROM books WHERE cover_url IS NULL AND id LIKE 'ol-OL%' AND isbn IS NOT NULL LIMIT 1");
  if (olBook.rows.length > 0) {
    const id = olBook.rows[0].id as string;
    const isbn = olBook.rows[0].isbn as string;
    const olid = id.replace(/^ol-/, '');
    console.log(`\nTest OL cover: https://covers.openlibrary.org/b/olid/${olid}-M.jpg`);
    console.log(`Test ISBN cover: https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`);
  }
}
main().catch(console.error);
