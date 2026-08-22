import { createClient } from '@libsql/client';

async function main() {
  const client = createClient({
    url: process.env.DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });

  const junkPatterns = ['Wikipedia', 'Library of Congress', 'Amazon', 'Various'];
  for (const pattern of junkPatterns) {
    const r = await client.execute({
      sql: "SELECT id, title, authors, published_date FROM books WHERE authors LIKE ? ORDER BY published_date DESC LIMIT 5",
      args: [`%${pattern}%`],
    });
    if (r.rows.length > 0) {
      console.log(`\n"${pattern}" author entries (${r.rows.length} total):`);
      r.rows.forEach(row => console.log(`  [${row.id}] ${row.title} — ${row.published_date}`));
    }
  }
}

main().catch(console.error);
