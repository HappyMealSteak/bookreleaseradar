import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
import { createClient } from '@libsql/client';

const db = createClient({ url: process.env.DATABASE_URL ?? '', authToken: process.env.TURSO_AUTH_TOKEN });

async function main() {
  const queries = ['dune', 'divergent', 'eragon', 'vampire academy', 'maze runner'];
  for (const q of queries) {
    const r = await db.execute({ sql: "SELECT title, authors FROM books WHERE LOWER(title) LIKE ? LIMIT 5", args: [`%${q}%`] });
    console.log(`\n=== ${q} ===`);
    r.rows.forEach(row => console.log(`  "${row.title}" by ${row.authors}`));
  }
}

main().catch(console.error);
