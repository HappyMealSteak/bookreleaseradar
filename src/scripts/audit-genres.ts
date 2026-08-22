import { createClient } from '@libsql/client';

async function main() {
  const client = createClient({
    url: process.env.DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });

  // Books with no genres
  const noGenres = await client.execute("SELECT COUNT(*) as n FROM books WHERE genres = '[]' OR genres IS NULL");
  console.log(`Books with no genres: ${noGenres.rows[0].n}`);

  // Book count by genre
  const r = await client.execute(`
    SELECT json_each.value as genre, COUNT(*) as n
    FROM books, json_each(books.genres)
    GROUP BY json_each.value
    ORDER BY n DESC
  `);
  console.log('\nBook count by genre:');
  r.rows.forEach(row => console.log(`  ${row.genre}: ${row.n}`));

  // Books with upcoming dates (in future)
  const upcoming = await client.execute("SELECT COUNT(*) as n FROM books WHERE published_date >= date('now')");
  console.log(`\nUpcoming books (future release date): ${upcoming.rows[0].n}`);

  // Books published in 2023-2024 (backlist, not upcoming)
  const recent = await client.execute("SELECT COUNT(*) as n FROM books WHERE published_date >= '2023-01-01' AND published_date < date('now')");
  console.log(`Books released 2023 to today: ${recent.rows[0].n}`);
}

main().catch(console.error);
