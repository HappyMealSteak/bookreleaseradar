import { getAllAuthors } from '@/lib/db';
import { getAuthorBio } from '@/lib/author-bios';

async function main() {
  const authors = await getAllAuthors();
  const withBooks = authors.filter(a => a.bookCount >= 2);
  const noBio = withBooks.filter(a => !getAuthorBio(a.name));
  console.log(`Authors with 2+ books but no bio: ${noBio.length}`);
  noBio.forEach(a => console.log(`  ${a.name} (${a.bookCount})`));
}

main().catch(console.error);
