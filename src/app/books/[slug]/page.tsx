import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalLink, Calendar, BookOpen, User, ChevronRight } from 'lucide-react';
import { getBookBySlug, getAllBooks, getSmartRelatedBooks } from '@/lib/db';
import { formatReleaseDate, authorSlug } from '@/lib/utils';
import { GENRE_LABELS, type Genre } from '@/lib/types';
import { SERIES } from '@/lib/series';
import { getReadingOrder } from '@/lib/reading-orders';
import BookGrid from '@/components/BookGrid';

function findSeriesForBook(authors: string[]) {
  return SERIES.filter((s) =>
    authors.some((a) => a.toLowerCase().includes(s.authorQuery.toLowerCase()))
  );
}

function normTitle(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function findBookPosition(bookTitle: string, seriesSlug: string): { position: number; total: number } | null {
  const order = getReadingOrder(seriesSlug);
  if (!order) return null;
  const nt = normTitle(bookTitle);
  const idx = order.books.findIndex((b: { title: string }) => normTitle(b.title) === nt);
  if (idx === -1) return null;
  return { position: idx + 1, total: order.books.length };
}

export const revalidate = 86400;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const books = await getAllBooks(2000);
  return books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) return {};

  const bookSeries = findSeriesForBook(book.authors);
  const seriesContext = bookSeries.length > 0
    ? (() => {
        for (const s of bookSeries) {
          const pos = findBookPosition(book.title, s.slug);
          if (pos) return ` (${s.shortName ?? s.name} #${pos.position})`;
        }
        return ` (${bookSeries[0].shortName ?? bookSeries[0].name})`;
      })()
    : '';

  const title = `${book.title}${seriesContext} by ${book.authors[0] ?? 'Unknown'} — Release Date`;
  const description =
    book.description?.slice(0, 155) ??
    `Find out when ${book.title}${seriesContext} by ${book.authors[0] ?? 'the author'} releases, plus where to pre-order or buy.`;

  const keywords = [
    `${book.title} release date`,
    `${book.title} by ${book.authors[0]}`,
    ...(book.authors[0] ? [`${book.authors[0]} new book`] : []),
    ...(bookSeries.length > 0 ? [`${bookSeries[0].name} new book`, `${bookSeries[0].name} reading order`] : []),
  ];

  return {
    title,
    description,
    keywords,
    openGraph: { title, description },
  };
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) notFound();

  const related = await getSmartRelatedBooks(book, 6);
  const bookSeries = findSeriesForBook(book.authors);
  const seriesPositions = bookSeries.map((s) => ({
    series: s,
    pos: findBookPosition(book.title, s.slug),
  }));

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
    numberOfPages: book.pageCount ?? undefined,
    offers: {
      '@type': 'Offer',
      url: book.amazonUrl,
      priceCurrency: 'USD',
      availability: book.publishedDate && new Date(book.publishedDate) > new Date()
        ? 'https://schema.org/PreOrder'
        : 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'Amazon' },
    },
  };

  const isUpcomingBook = book.publishedDate && new Date(book.publishedDate) > new Date();
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `When does ${book.title} come out?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: isUpcomingBook
            ? `${book.title} by ${book.authors[0] ?? 'the author'} is scheduled for release on ${book.publishedDate ? new Date(book.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }) : 'TBA'}. You can pre-order it on Amazon now.`
            : `${book.title} by ${book.authors[0] ?? 'the author'} was released on ${book.publishedDate ? new Date(book.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }) : 'an unknown date'} and is available now.`,
        },
      },
      ...(book.authors[0] ? [{
        '@type': 'Question',
        name: `Who wrote ${book.title}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${book.title} was written by ${book.authors.join(' and ')}${book.publisher ? `, published by ${book.publisher}` : ''}.`,
        },
      }] : []),
      ...(bookSeries.length > 0 ? [{
        '@type': 'Question',
        name: `Is ${book.title} part of a series?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: (() => {
            const parts = seriesPositions.map(({ series: s, pos }) =>
              pos
                ? `${book.title} is Book ${pos.position} of ${pos.total} in the ${s.name} series by ${book.authors[0] ?? 'the author'}`
                : `${book.title} is part of the ${s.name} series by ${book.authors[0] ?? 'the author'}`
            );
            return parts.join('. ') + '. Visit the series page on BookReleaseRadar for a complete reading order.';
          })(),
        },
      }] : []),
    ],
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <nav className="flex items-center gap-1.5 text-xs text-[var(--text-faint)] mb-8">
          <Link href="/" className="hover:text-[var(--accent)] transition-colors">Home</Link>
          {primaryGenre && (
            <>
              <ChevronRight size={12} />
              <Link href={`/genre/${primaryGenre}`} className="hover:text-[var(--accent)] transition-colors">
                {GENRE_LABELS[primaryGenre as Genre] ?? primaryGenre}
              </Link>
            </>
          )}
          <ChevronRight size={12} />
          <span className="text-[var(--text-muted)] truncate max-w-[200px]">{book.title}</span>
        </nav>

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

            {/* Series position cards */}
            {seriesPositions.length > 0 && (
              <div className="mt-6 space-y-2">
                {seriesPositions.map(({ series: s, pos }) => (
                  <div
                    key={s.slug}
                    className="flex items-center gap-4 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface-raised)]"
                  >
                    <div className="flex-1 min-w-0">
                      {pos && (
                        <p className="text-xs font-bold text-[var(--gold)] tracking-wide uppercase mb-0.5">
                          Book {pos.position} of {pos.total}
                        </p>
                      )}
                      <Link
                        href={`/series/${s.slug}`}
                        className="text-sm font-semibold text-[var(--text)] hover:text-[var(--accent)] transition-colors truncate block"
                      >
                        {s.name}
                      </Link>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">{s.author}</p>
                    </div>
                    <Link
                      href={`/series/${s.slug}/reading-order`}
                      className="shrink-0 text-xs font-semibold text-[var(--accent)] hover:underline whitespace-nowrap"
                    >
                      Reading Order →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* More by this author */}
        {related.byAuthor.length > 0 && (
          <section className="mb-10">
            <h2 className="font-[family-name:var(--font-playfair)] text-xl mb-5 text-[var(--text)]">
              More by {book.authors[0]}
            </h2>
            <BookGrid books={related.byAuthor} />
          </section>
        )}

        {/* If you liked this */}
        {related.byGenre.length > 0 && (
          <section>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl mb-5 text-[var(--text)]">
              {related.byAuthor.length > 0 ? 'You might also like' : 'More books like this'}
            </h2>
            <BookGrid books={related.byGenre} />
          </section>
        )}
      </div>
    </>
  );
}
