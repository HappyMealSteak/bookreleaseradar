import { createClient } from '@libsql/client';

async function main() {
  const client = createClient({
    url: process.env.DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });

  const r = await client.execute(
    "SELECT id, title, authors, published_date FROM books WHERE authors = '[]' OR authors IS NULL OR authors = '' ORDER BY published_date DESC LIMIT 20"
  );
  console.log(`Books with no authors: ${r.rows.length}`);
  r.rows.forEach(row => console.log(`  [${row.id}] "${row.title}" — ${row.published_date}`));
}

main().catch(console.error);
