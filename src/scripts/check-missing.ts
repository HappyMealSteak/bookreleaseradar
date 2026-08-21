import { config } from 'dotenv';
config({ path: '.env.local' });
import { createClient } from '@libsql/client';

async function main() {
  const db = createClient({ url: process.env.DATABASE_URL!, authToken: process.env.TURSO_AUTH_TOKEN });
  const [c, d, b, olNoDesc, gbNoDesc] = await Promise.all([
    db.execute("SELECT COUNT(*) as n FROM books WHERE cover_url IS NULL"),
    db.execute("SELECT COUNT(*) as n FROM books WHERE description IS NULL OR description = ''"),
    db.execute("SELECT COUNT(*) as n FROM books WHERE cover_url IS NULL AND (description IS NULL OR description = '')"),
    db.execute("SELECT COUNT(*) as n FROM books WHERE (description IS NULL OR description = '') AND id LIKE 'ol-OL%'"),
    db.execute("SELECT COUNT(*) as n FROM books WHERE (description IS NULL OR description = '') AND id NOT LIKE 'ol-OL%'"),
  ]);
  console.log('No cover:', c.rows[0].n);
  console.log('No description:', d.rows[0].n);
  console.log('Neither:', b.rows[0].n);
  console.log('OL no-desc:', olNoDesc.rows[0].n, '| GB no-desc:', gbNoDesc.rows[0].n);
}
main().catch(console.error);
