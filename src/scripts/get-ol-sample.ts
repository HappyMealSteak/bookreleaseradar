import { config } from 'dotenv';
config({ path: '.env.local' });
import { createClient } from '@libsql/client';
async function main() {
  const db = createClient({ url: process.env.DATABASE_URL!, authToken: process.env.TURSO_AUTH_TOKEN });
  const rows = await db.execute("SELECT id, title FROM books WHERE (description IS NULL OR description = '') AND id LIKE 'ol-OL%' LIMIT 3");
  for (const r of rows.rows) console.log((r.id as string) + '|' + r.title);
}
main().catch(console.error);
