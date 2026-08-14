import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Calendar, BookOpen, User } from 'lucide-react';
import { getBookBySlug, getAllBooks, getRelatedBooks } from '@/lib/db';
import { formatReleaseDate, authorSlug } from '@/lib/utils';
import { GENRE_LABELS, type Genre } from '@/lib/types';
import { SERIES } from '@/lib/series';
import BookGrid from '@/components/BookGrid';

function findSeriesForBook(authors: string[]) {
  return SERIES.filter((s) =>
    authors.some((a) => a.toLowerCase().includes(s.authorQuery.toLowerCase()))
  );
}

export const revalidate = 86400;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const books = await getAllBooks(500);
  return books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) return {};

  const title = `${book.title} by ${book.authors[0] ?? 'Unknown'} — Release Date & Info`;
  const description =
    book.description?.slice(0, 155) ??
    `Find out when ${book.title} releases, plus author info and where to buy.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: book.coverUrl ? [{ url: book.coverUrl }] : [],
    },
  };
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params;
  const [book, related] = await Promise.all([
    getBookBySlug(slug),
    getBookBySlug(slug).then((b) => (b ? getRelatedBooks(b, 6) : [])),
  ]);

  if (!book) notFound();
  const bookSeries = findSeriesForBook(book.authors);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    author: book.authors.map((a) => ({ '@type': 'Person', name: a })),
    datePublished: book.publishedDate,
    description: book.description,
    image: book.coverUrl,
    isbn: book.isbn,
    publisher: book.publisher ? { '@type': 'Organization', name: book.publisher } : undefined,
  };

  const primaryGenre = book.genres[0];
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bookreleaseradar.com' },
      ...(primaryGenre ? [{
        '@type': 'ListItem',
        position: 2,
        name: `${GENRE_LABELS[primaryGenre as Genre] ?? primaryGenre} Books`,
        item: `https://bookreleaseradar.com/genre/${primaryGenre}`,
      }] : []),
      { '@type': 'ListItem', position: primaryGenre ? 3 : 2, name: book.title, item: `https://bookreleaseradar.com/books/${book.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] mb-8 transition-colors"
        >
          <ArrowLeft size={14} /> Back to releases
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 mb-12">
          {/* Cover */}
          <div className="flex flex-col gap-4">
            <div className="relative w-full max-w-[200px] mx-auto md:mx-0 rounded-lg overflow-hidden shadow-lg border border-[var(--border)]" style={{ aspectRatio: '2/3' }}>
              {book.coverUrl ? (
                <Image
                  src={book.coverUrl}
                  alt={`Cover of ${book.title}`}
                  fill
                  className="object-cover"
                  priority
                  sizes="200px"
                />
              ) : (
                <div className="absolute inset-0 cover-placeholder flex flex-col items-center justify-center gap-3 p-4 text-center">
                  <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <rect x="5" y="3" width="18" height="26" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
                    <rect x="8" y="3" width="15" height="26" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
                    <line x1="11" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
                    <line x1="11" y1="14" x2="20" y2="14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
                    <line x1="11" y1="18" x2="16" y2="18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
                  </svg>
                  <span className="text-[var(--text-faint)] text-xs font-semibold tracking-wider uppercase opacity-70">Cover not yet released</span>
                </div>
              )}
            </div>

            <a
              href={book.amazonUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center justify-center gap-2 w-full max-w-[200px] mx-auto md:mx-0 py-3 px-4 rounded-lg bg-[var(--accent)] text-[var(--accent-fg)] font-semibold text-sm hover:bg-[var(--accent-hover)] transition-colors"
            >
              <ExternalLink size={14} />
              {book.publishedDate && new Date(book.publishedDate) > new Date() ? 'Pre-order on Amazon' : 'Buy on Amazon'}
            </a>

            {book.googleUrl && (
              <a
                href={book.googleUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex items-center justify-center gap-2 w-full max-w-[200px] mx-auto md:mx-0 py-2.5 px-4 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] text-xs font-medium transition-colors"
              >
                <BookOpen size={13} />
                Google Books
              </a>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {book.genres.map((genre) => (
                <Link
                  key={genre}
                  href={`/genre/${genre}`}
                  className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--accent-light)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-fg)] transition-colors"
                >
                  {GENRE_LABELS[genre as Genre] ?? genre}
                </Link>
              ))}
            </div>

            <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold mb-3 leading-tight">
              {book.title}
            </h1>

            <div className="flex flex-col gap-2 mb-6">
              {book.authors.length > 0 && (
                <div className="flex items-center gap-2 text-[var(--text-muted)]">
                  <User size={14} className="shrink-0" />
                  <div className="flex flex-wrap gap-1">
                    {book.authors.map((author, i) => (
                      <span key={author}>
                        {i > 0 && <span className="mr-1">,</span>}
                        <Link
                          href={`/author/${authorSlug(author)}`}
                          className="font-medium hover:text-[var(--accent)] transition-colors"
                        >
                          {author}
                        </Link>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-[var(--text-muted)]">
                <Calendar size={14} className="shrink-0" />
                <span className="text-sm">
                  <span className="font-medium text-[var(--text)]">
                    {formatReleaseDate(book.publishedDate)}
                  </span>
                  {book.publishedDate && new Date(book.publishedDate) > new Date() && (
                    <span className="ml-2 text-[var(--gold)] font-semibold text-xs">Upcoming</span>
                  )}
                </span>
              </div>

              {book.publisher && (
                <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                  <BookOpen size={14} className="shrink-0" />
                  <span>{book.publisher}</span>
                  {book.pageCount && <span>· {book.pageCount} pages</span>}
                </div>
              )}
            </div>

            {book.description && (
              <div className="prose prose-sm max-w-none">
                <h2 className="font-[family-name:var(--font-playfair)] text-lg font-semibold mb-2 text-[var(--text)]">
                  About this book
                </h2>
                <p className="text-[var(--text-muted)] leading-relaxed">{book.description}</p>
              </div>
            )}

            {book.isbn && (
              <p className="mt-6 text-xs text-[var(--text-faint)]">ISBN-13: {book.isbn}</p>
            )}

            {/* Series cross-links */}
            {bookSeries.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {bookSeries.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/series/${s.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-raised)] text-xs font-semibold text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                  >
                    {s.shortName ? `${s.shortName}: ` : ''}{s.name} Series →
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl mb-5 text-[var(--text)]">
              You might also like
            </h2>
            <BookGrid books={related} />
          </section>
        )}
      </div>
    </>
  );
}
