import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BookGrid from '@/components/BookGrid';
import { getBooksByAuthorSlug, getAllBooks } from '@/lib/db';
import { authorSlug } from '@/lib/utils';
import { getAuthorBio } from '@/lib/author-bios';
import { SERIES } from '@/lib/series';

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
  const bio = getAuthorBio(authorName);
  const authorSeries = SERIES.filter((s) =>
    authorName.toLowerCase().includes(s.authorQuery.toLowerCase())
  );

  const now = new Date();
  const upcoming = books.filter((b) => b.publishedDate && new Date(b.publishedDate) >= now);
  const past = books.filter((b) => !upcoming.includes(b));

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bookreleaseradar.com' },
      { '@type': 'ListItem', position: 2, name: authorName, item: `https://bookreleaseradar.com/author/${slug}` },
    ],
  };

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: authorName,
    url: `https://bookreleaseradar.com/author/${slug}`,
    description: bio?.bio,
    knowsAbout: bio?.knownFor,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <p className="text-xs font-bold tracking-widest uppercase text-[var(--gold)] mb-2">Author</p>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl text-[var(--text)] mb-2">
          {authorName}
        </h1>
        {bio ? (
          <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-2xl mb-3">{bio.bio}</p>
        ) : (
          <p className="text-[var(--text-muted)] mb-3">
            {books.length} title{books.length !== 1 ? 's' : ''} tracked
          </p>
        )}
        {authorSeries.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {authorSeries.map((s) => (
              <Link
                key={s.slug}
                href={`/series/${s.slug}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                {s.shortName ?? s.name} Series →
              </Link>
            ))}
          </div>
        )}
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
    </>
  );
}
