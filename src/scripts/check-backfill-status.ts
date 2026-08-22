import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
import { createClient } from '@libsql/client';

const db = createClient({ url: process.env.DATABASE_URL ?? '', authToken: process.env.TURSO_AUTH_TOKEN });

async function main() {
  // Books with no description, sorted by most recently updated
  const r = await db.execute({ 
    sql: "SELECT title, updated_at FROM books WHERE (description IS NULL OR description = '') ORDER BY updated_at DESC LIMIT 10",
    args: []
  });
  console.log('Most recently updated books without description:');
  r.rows.forEach(row => console.log(`  ${row.updated_at}: "${row.title}"`));
  
  // Count
  const cnt = await db.execute({ sql: "SELECT COUNT(*) as cnt FROM books WHERE (description IS NULL OR description = '')", args: [] });
  console.log(`\nTotal without description: ${cnt.rows[0].cnt}`);
}

main().catch(console.error);
