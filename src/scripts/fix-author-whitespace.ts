import { createClient } from '@libsql/client';

async function main() {
  const client = createClient({
    url: process.env.DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });

  // Find books where any author entry has leading/trailing whitespace
  const r = await client.execute("SELECT id, title, authors FROM books WHERE authors LIKE '% \"%' OR authors LIKE '%\" %' OR authors LIKE '%  %'");
  console.log(`Books with potential whitespace in authors JSON: ${r.rows.length}`);

  let fixCount = 0;
  for (const row of r.rows) {
    const authorsStr = row.authors as string;
    let authors: string[];
    try {
      authors = JSON.parse(authorsStr);
    } catch {
      continue;
    }

    const cleaned = authors.map(a => a.trim());
    const hasChanges = cleaned.some((a, i) => a !== authors[i]);
    if (hasChanges) {
      console.log(`  Fix: "${authors.join(', ')}" -> "${cleaned.join(', ')}"`);
      await client.execute({
        sql: 'UPDATE books SET authors = ? WHERE id = ?',
        args: [JSON.stringify(cleaned), row.id as string],
      });
      fixCount++;
    }
  }

  console.log(`\nFixed ${fixCount} books.`);
}

main().catch(console.error);
