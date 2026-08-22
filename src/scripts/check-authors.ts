import { getAllAuthors } from '@/lib/db';
import { getAuthorBio } from '@/lib/author-bios';

async function main() {
  const authors = await getAllAuthors();
  const withBooks = authors.filter(a => a.bookCount >= 2);
  console.log(`Authors with 2+ books: ${withBooks.length}`);

  const noBio = withBooks.filter(a => !getAuthorBio(a.name));
  console.log(`Without bios: ${noBio.length}`);
  console.log('\nTop 20 authors missing bios (by book count):');
  noBio.slice(0, 20).forEach(a => console.log(`  ${a.name} (${a.bookCount} books)`));
}

main().catch(console.error);
