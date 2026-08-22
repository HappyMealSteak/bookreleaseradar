import { createClient } from '@libsql/client';

async function main() {
  const client = createClient({
    url: process.env.DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });

  const junkIds = ['5s1CDwAAQBAJ', 'Ys5CDwAAQBAJ', 'Gc6-nF4CZQcC', 'UF3sdOA6Cd0C'];

  for (const id of junkIds) {
    const r = await client.execute({ sql: 'SELECT title, authors FROM books WHERE id = ?', args: [id] });
    if (r.rows.length > 0) {
      console.log(`Deleting: "${r.rows[0].title}" by ${r.rows[0].authors}`);
      await client.execute({ sql: 'DELETE FROM books WHERE id = ?', args: [id] });
    }
  }
  console.log('Done.');
}

main().catch(console.error);
