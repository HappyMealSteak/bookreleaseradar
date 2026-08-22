import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
import { createClient } from '@libsql/client';

const db = createClient({ url: process.env.DATABASE_URL ?? '', authToken: process.env.TURSO_AUTH_TOKEN });

async function main() {
  const queries = ['Frank Herbert', 'Veronica Roth', 'Christopher Paolini', 'Richelle Mead'];
  for (const author of queries) {
    const r = await db.execute({ 
      sql: "SELECT COUNT(*) as cnt FROM books WHERE authors LIKE ?", 
      args: [`%${author}%`] 
    });
    console.log(`${author}: ${r.rows[0].cnt} books`);
  }
}

main().catch(console.error);
