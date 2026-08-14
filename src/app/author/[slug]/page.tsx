import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BookGrid from '@/components/BookGrid';
import { getBooksByAuthorSlug, getAllBooks } from '@/lib/db';
import { authorSlug } from '@/lib/utils';

export const revalidate = 86400;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const books = await getAllBooks(500);
  const slugs = new Set<string>();
  for (const book of books) {
    for (const author of book.authors) {
      slugs.add(authorSlug(author));
    }
  }
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const books = await getBooksByAuthorSlug(slug, 1);
  if (!books.length) return {};

  const authorName = books[0].authors.find((a) => authorSlug(a) === slug) ?? books[0].authors[0];
  const title = `${authorName} — Upcoming Books & New Releases`;
  const description = `See all upcoming books and new releases from ${authorName}. Find release dates and buy on Amazon.`;

  return { title, description, openGraph: { title, description } };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const books = await getBooksByAuthorSlug(slug, 24);

  if (!books.length) notFound();

  const authorName = books[0].authors.find((a) => authorSlug(a) === slug) ?? books[0].authors[0];

  const now = new Date();
  const upcoming = books.filter((b) => b.publishedDate && new Date(b.publishedDate) >= now);
  const past = books.filter((b) => !upcoming.includes(b));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <p className="text-xs font-bold tracking-widest uppercase text-[var(--gold)] mb-2">Author</p>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl text-[var(--text)] mb-2">
          {authorName}
        </h1>
        <p className="text-[var(--text-muted)]">
          {books.length} title{books.length !== 1 ? 's' : ''} tracked
        </p>
      </div>

      {upcoming.length > 0 && (
        <section className="mb-12">
          <h2 className="font-[family-name:var(--font-playfair)] text-xl mb-5 text-[var(--text)]">
            Upcoming Releases
          </h2>
          <BookGrid books={upcoming} />
        </section>
      )}

      {past.length > 0 && (
        <section>
          <h2 className="font-[family-name:var(--font-playfair)] text-xl mb-5 text-[var(--text)]">
            Recent Releases
          </h2>
          <BookGrid books={past} />
        </section>
      )}
    </div>
  );
}
