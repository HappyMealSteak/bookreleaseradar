import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
import { createClient } from '@libsql/client';

async function main() {
  const db = createClient({ url: process.env.DATABASE_URL!, authToken: process.env.TURSO_AUTH_TOKEN });
  const r = await db.execute("SELECT amazon_url FROM books LIMIT 5");
  r.rows.forEach(row => console.log((row as Record<string,unknown>).amazon_url));
}
main().catch(console.error);
