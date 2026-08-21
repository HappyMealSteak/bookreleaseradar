import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getBooksByAuthorName, getAllAuthors } from '@/lib/db';
import { authorSlug } from '@/lib/utils';
import BookGrid from '@/components/BookGrid';

export const revalidate = 86400;

interface Props {
  params: Promise<{ slug: string }>;
}

function slugToName(slug: string, authors: Array<{ name: string }>): string | null {
  return authors.find((a) => authorSlug(a.name) === slug)?.name ?? null;
}

export async function generateStaticParams() {
  const authors = await getAllAuthors();
  return authors
    .filter((a) => a.bookCount >= 2)
    .map((a) => ({ slug: authorSlug(a.name) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const authors = await getAllAuthors();
  const name = slugToName(slug, authors);
  if (!name) return {};

  const title = `${name} — Books, New Releases & Upcoming Titles`;
  const description = `Browse all books by ${name}. See upcoming releases, new titles, and complete book list on BookReleaseRadar.`;

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const authors = await getAllAuthors();
  const name = slugToName(slug, authors);
  if (!name) notFound();

  const books = await getBooksByAuthorName(name, 48);
  if (!books.length) notFound();

  const today = new Date().toISOString().slice(0, 10);
  const upcoming = books.filter((b) => b.publishedDate && b.publishedDate >= today);
  const past = books.filter((b) => !b.publishedDate || b.publishedDate < today);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    url: `https://bookreleaseradar.com/author/${slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] mb-8 transition-colors"
        >
          <ArrowLeft size={14} /> Back to releases
        </Link>

        <div className="mb-10">
          <p className="text-xs font-bold tracking-widest uppercase text-[var(--gold)] mb-2">Author</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-bold mb-3 leading-tight">
            {name}
          </h1>
          <p className="text-[var(--text-muted)] text-base">
            {books.length} book{books.length !== 1 ? 's' : ''} tracked on BookReleaseRadar
          </p>
        </div>

        {upcoming.length > 0 && (
          <section className="mb-12">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold mb-6 text-[var(--text)]">
              Upcoming Releases
            </h2>
            <BookGrid books={upcoming} />
          </section>
        )}

        {past.length > 0 && (
          <section>
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold mb-6 text-[var(--text)]">
              {upcoming.length > 0 ? 'Previous Releases' : 'Books'}
            </h2>
            <BookGrid books={past} />
          </section>
        )}
      </div>
    </>
  );
}
