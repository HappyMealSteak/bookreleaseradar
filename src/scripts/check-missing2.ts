import { config } from 'dotenv';
config({ path: '.env.local' });
import { createClient } from '@libsql/client';
async function main() {
  const db = createClient({ url: process.env.DATABASE_URL!, authToken: process.env.TURSO_AUTH_TOKEN });
  const [olNoC, gbNoC] = await Promise.all([
    db.execute("SELECT COUNT(*) as n FROM books WHERE cover_url IS NULL AND id LIKE 'ol-OL%'"),
    db.execute("SELECT COUNT(*) as n FROM books WHERE cover_url IS NULL AND id NOT LIKE 'ol-OL%'"),
  ]);
  console.log('OL books missing covers:', olNoC.rows[0].n);
  console.log('GB books missing covers:', gbNoC.rows[0].n);
}
main().catch(console.error);
