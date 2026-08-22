import { createClient } from '@libsql/client';

async function main() {
  const client = createClient({
    url: process.env.DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });

  const r = await client.execute(
    "SELECT COUNT(*) as total, SUM(CASE WHEN description IS NOT NULL AND description != '' THEN 1 ELSE 0 END) as with_desc, SUM(CASE WHEN cover_url IS NOT NULL AND cover_url != '' THEN 1 ELSE 0 END) as with_cover FROM books"
  );
  const row = r.rows[0];
  const total = Number(row.total);
  const withDesc = Number(row.with_desc);
  const withCover = Number(row.with_cover);
  console.log(`Books: ${total}`);
  console.log(`Descriptions: ${withDesc}/${total} (${Math.round(withDesc/total*100)}% — missing: ${total - withDesc})`);
  console.log(`Covers: ${withCover}/${total} (${Math.round(withCover/total*100)}% — missing: ${total - withCover})`);
}

main().catch(console.error);
