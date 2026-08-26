import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { getBooksByAuthorName, getAllAuthors } from '@/lib/db';
import { authorSlug } from '@/lib/utils';
import { getAuthorBio } from '@/lib/author-bios';
import { GENRE_LABELS, type Genre } from '@/lib/types';
import BookGrid from '@/components/BookGrid';
import NewsletterSignup from '@/components/NewsletterSignup';

export const revalidate = 86400;

interface Props {
  params: Promise<{ slug: string }>;
}

function slugToName(slug: string, authors: Array<{ name: string }>): string | null {
  return authors.find((a) => authorSlug(a.name) === slug)?.name ?? null;
}

export async function generateStaticParams() {
  try {
    const authors = await getAllAuthors();
    return authors
      .filter((a) => a.bookCount >= 2)
      .map((a) => ({ slug: authorSlug(a.name) }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const authors = await getAllAuthors();
  const name = slugToName(slug, authors);
  if (!name) return {};

  const bio = getAuthorBio(name);
  const title = `${name} — Books, New Releases & Upcoming Titles`;
  const description = bio
    ? bio.bio.slice(0, 155)
    : `Browse all books by ${name}. See upcoming releases, new titles, and complete book list on BookReleaseRadar.`;

  return {
    title,
    description,
    keywords: [
      `${name} new book`,
      `${name} upcoming book`,
      `${name} next book`,
      `${name} books in order`,
      `${name} book list`,
      `new books by ${name}`,
    ],
    alternates: { canonical: `https://bookreleaseradar.com/author/${slug}` },
    openGraph: { title, description },
  };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const authors = await getAllAuthors();
  const name = slugToName(slug, authors);
  if (!name) notFound();

  const [books] = await Promise.all([getBooksByAuthorName(name, 48)]);
  if (!books.length) notFound();

  const bio = getAuthorBio(name);
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = books.filter((b) => b.publishedDate && b.publishedDate >= today);
  const past = books.filter((b) => !b.publishedDate || b.publishedDate < today);

  const allGenres = [...new Set(books.flatMap((b) => b.genres))].slice(0, 5);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    description: bio?.bio,
    url: `https://bookreleaseradar.com/author/${slug}`,
    sameAs: [],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bookreleaseradar.com' },
      { '@type': 'ListItem', position: 2, name: 'Authors', item: 'https://bookreleaseradar.com/authors' },
      { '@type': 'ListItem', position: 3, name, item: `https://bookreleaseradar.com/author/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <nav className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] mb-8">
          <Link href="/" className="hover:text-[var(--accent)] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/authors" className="hover:text-[var(--accent)] transition-colors">Authors</Link>
          <span>/</span>
          <span className="text-[var(--text)]">{name}</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-bold tracking-widest uppercase text-[var(--gold)] mb-2">Author</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-bold mb-4 leading-tight">
            {name}
          </h1>

          {/* Genre tags */}
          {allGenres.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {allGenres.map((genre) => (
                <Link
                  key={genre}
                  href={`/genre/${genre}`}
                  className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--accent-light)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-fg)] transition-colors"
                >
                  {GENRE_LABELS[genre as Genre] ?? genre}
                </Link>
              ))}
            </div>
          )}

          {/* Bio */}
          {bio ? (
            <div className="max-w-3xl">
              <p className="text-[var(--text-muted)] text-base leading-relaxed mb-3">{bio.bio}</p>
              {bio.knownFor.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <BookOpen size={13} className="text-[var(--text-faint)] shrink-0" />
                  <span className="text-xs text-[var(--text-faint)]">Known for:</span>
                  {bio.knownFor.map((s) => (
                    <span key={s} className="text-xs text-[var(--text-muted)] font-medium">{s}</span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="text-[var(--text-muted)] text-base">
              {books.length} book{books.length !== 1 ? 's' : ''} tracked on BookReleaseRadar
            </p>
          )}

          {bio && (
            <p className="text-sm text-[var(--text-faint)] mt-3">
              {books.length} book{books.length !== 1 ? 's' : ''} tracked on BookReleaseRadar
            </p>
          )}
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

      <NewsletterSignup />
    </>
  );
}
