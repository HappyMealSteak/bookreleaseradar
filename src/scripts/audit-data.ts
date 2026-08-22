import { createClient } from '@libsql/client';

async function main() {
  const client = createClient({
    url: process.env.DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });

  // Books with no authors
  const noAuthors = await client.execute("SELECT COUNT(*) as n FROM books WHERE authors = '[]' OR authors IS NULL OR authors = ''");
  console.log(`Books with no authors: ${noAuthors.rows[0].n}`);

  // Books with no slug
  const noSlug = await client.execute("SELECT COUNT(*) as n FROM books WHERE slug IS NULL OR slug = ''");
  console.log(`Books with no slug: ${noSlug.rows[0].n}`);

  // Books with no title
  const noTitle = await client.execute("SELECT COUNT(*) as n FROM books WHERE title IS NULL OR title = ''");
  console.log(`Books with no title: ${noTitle.rows[0].n}`);

  // Books with published_date in far future (after 2028) - possible data errors
  const farFuture = await client.execute("SELECT COUNT(*) as n FROM books WHERE published_date > '2028-12-31'");
  console.log(`Books with date after 2028: ${farFuture.rows[0].n}`);

  // Books with obviously wrong dates (before 2020)
  const tooOld = await client.execute("SELECT COUNT(*) as n, MIN(published_date) as min_date FROM books WHERE published_date < '2023-01-01' AND published_date IS NOT NULL");
  console.log(`Books with date before 2023: ${tooOld.rows[0].n} (oldest: ${tooOld.rows[0].min_date})`);

  // Duplicate slugs
  const dupSlugs = await client.execute("SELECT slug, COUNT(*) as n FROM books WHERE slug IS NOT NULL GROUP BY slug HAVING COUNT(*) > 1 LIMIT 5");
  console.log(`Duplicate slug groups: ${dupSlugs.rows.length}`);
  dupSlugs.rows.forEach(r => console.log(`  slug="${r.slug}" appears ${r.n} times`));

  // Books without amazon URL
  const noAmazon = await client.execute("SELECT COUNT(*) as n FROM books WHERE amazon_url IS NULL OR amazon_url = ''");
  console.log(`Books without Amazon URL: ${noAmazon.rows[0].n}`);
}

main().catch(console.error);
