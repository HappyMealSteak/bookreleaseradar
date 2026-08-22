import { createClient } from '@libsql/client';

async function main() {
  const client = createClient({
    url: process.env.DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });

  const r = await client.execute(
    "SELECT id, title FROM books WHERE authors = '[]' OR authors IS NULL OR authors = ''"
  );

  for (const row of r.rows) {
    console.log(`Deleting: "${row.title}" [${row.id}]`);
    await client.execute({ sql: 'DELETE FROM books WHERE id = ?', args: [row.id as string] });
  }
  console.log(`\nRemoved ${r.rows.length} books.`);
}

main().catch(console.error);
