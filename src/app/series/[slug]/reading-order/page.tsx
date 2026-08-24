import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, ExternalLink, BookOpen, Clock } from 'lucide-react';
import { SERIES, getSeriesBySlug } from '@/lib/series';
import { getReadingOrder, getReadingOrderBooksWithUrls, ALL_READING_ORDER_SLUGS } from '@/lib/reading-orders';
import { ALL_BOOKS_LIKE_SLUGS } from '@/lib/recommendations';
import NewsletterSignup from '@/components/NewsletterSignup';

export const revalidate = 2592000;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_READING_ORDER_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);
  const order = getReadingOrder(slug);
  if (!series || !order) return {};

  const aliases = series.shortName ? `${series.shortName} / ` : '';
  const title = `${aliases}${series.name} Reading Order — Complete Book List`;
  const description = `The complete ${series.name}${series.shortName ? ` (${series.shortName})` : ''} reading order. All ${order.books.length} books listed in order with links to buy on Amazon.`;

  return {
    title,
    description,
    keywords: [
      `${series.name} reading order`,
      series.shortName ? `${series.shortName} reading order` : undefined,
      `${series.name} books in order`,
      `${series.shortName ? series.shortName + ' books in order' : ''}`,
      `how to read ${series.name}`,
      `${series.name} book list`,
      `${series.author} reading order`,
      `${series.name} complete series`,
    ].filter(Boolean) as string[],
    alternates: { canonical: `https://bookreleaseradar.com/series/${slug}/reading-order` },
    openGraph: { title, description },
  };
}

export default async function ReadingOrderPage({ params }: Props) {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);
  const order = getReadingOrder(slug);
  if (!series || !order) notFound();

  const books = getReadingOrderBooksWithUrls(order);
  const mainBooks = books.filter((b) => !b.isOptional);
  const hasBooksLike = ALL_BOOKS_LIKE_SLUGS.includes(slug);
  const optionalBooks = books.filter((b) => b.isOptional);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bookreleaseradar.com' },
      { '@type': 'ListItem', position: 2, name: 'Series', item: 'https://bookreleaseradar.com/series' },
      { '@type': 'ListItem', position: 3, name: series.name, item: `https://bookreleaseradar.com/series/${slug}` },
      { '@type': 'ListItem', position: 4, name: 'Reading Order', item: `https://bookreleaseradar.com/series/${slug}/reading-order` },
    ],
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${series.name} Reading Order`,
    description: order.intro,
    numberOfItems: mainBooks.length,
    itemListElement: mainBooks.map((book, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: book.title,
      item: {
        '@type': 'Book',
        name: book.title,
        author: { '@type': 'Person', name: book.author },
        datePublished: typeof book.year === 'number' ? String(book.year) : undefined,
      },
    })),
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: order.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  let bookIndex = 0;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[var(--text-faint)] mb-6 flex-wrap">
          <Link href="/" className="hover:text-[var(--accent)] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/series" className="hover:text-[var(--accent)] transition-colors">Series</Link>
          <ChevronRight size={12} />
          <Link href={`/series/${slug}`} className="hover:text-[var(--accent)] transition-colors">{series.name}</Link>
          <ChevronRight size={12} />
          <span className="text-[var(--text-muted)]">Reading Order</span>
        </nav>

        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xs font-bold tracking-widest uppercase text-[var(--gold)]">Reading Order</p>
            {series.shortName && (
              <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[var(--accent-light)] text-[var(--accent)] border border-[var(--accent)]/30">
                {series.shortName}
              </span>
            )}
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl text-[var(--text)] mb-3 leading-tight">
            {series.name} Reading Order
          </h1>
          <p className="text-[var(--text-muted)] text-sm mb-4 leading-relaxed">{order.intro}</p>

          {/* Where to start callout */}
          <div className="p-4 rounded-lg bg-[var(--accent-light)] border border-[var(--accent)]/20">
            <p className="text-sm font-semibold text-[var(--accent)] mb-1">Where to start</p>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">{order.startWith}</p>
          </div>
        </div>

        {/* Main reading order */}
        <section className="mb-10">
          <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--text)] mb-4">
            Complete {series.shortName ?? series.name} Book List
          </h2>

          <ol className="space-y-3">
            {books.map((book) => {
              if (!book.isOptional) bookIndex++;
              const num = book.isOptional ? null : bookIndex;

              return (
                <li
                  key={book.title}
                  className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${
                    book.isUpcoming
                      ? 'border-[var(--gold)]/30 bg-[var(--surface)]'
                      : book.isOptional
                      ? 'border-dashed border-[var(--border)] bg-transparent'
                      : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)]/40'
                  }`}
                >
                  {/* Number */}
                  <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    {book.isUpcoming ? (
                      <Clock size={16} className="text-[var(--gold)]" />
                    ) : book.isOptional ? (
                      <BookOpen size={16} className="text-[var(--text-faint)]" />
                    ) : (
                      <span className="text-[var(--accent)] text-sm font-bold">{num}</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-2 mb-0.5">
                      <h3 className={`font-semibold text-sm leading-snug ${book.isUpcoming ? 'text-[var(--text-muted)]' : 'text-[var(--text)]'}`}>
                        {book.title}
                      </h3>
                      {book.isUpcoming && (
                        <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded bg-[var(--gold-light)] text-[var(--gold)] uppercase">
                          Upcoming
                        </span>
                      )}
                      {book.isOptional && !book.isUpcoming && (
                        <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded bg-[var(--surface-raised)] text-[var(--text-faint)] border border-[var(--border)] uppercase">
                          Optional
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-faint)]">
                      <span>{book.author}</span>
                      <span>·</span>
                      <span>{typeof book.year === 'number' ? book.year : book.year}</span>
                      {book.note && (
                        <>
                          <span>·</span>
                          <span className="italic">{book.note}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Buy link */}
                  {!book.isUpcoming ? (
                    <a
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--gold-light)] text-[var(--gold)] hover:bg-[var(--accent)] hover:text-[var(--accent-fg)] text-xs font-semibold transition-colors whitespace-nowrap"
                    >
                      <ExternalLink size={11} />
                      Buy
                    </a>
                  ) : (
                    <span className="shrink-0 px-3 py-1.5 text-xs text-[var(--gold)] font-medium">
                      {book.note?.match(/\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+\d{4}/i)?.[0]
                        ?? book.note?.match(/\d{4}/)?.[0]
                        ?? 'Coming Soon'}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--text)] mb-5">
            {series.shortName ?? series.name} — Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {order.faq.map((item) => (
              <div key={item.q} className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                <h3 className="font-semibold text-sm text-[var(--text)] mb-2">{item.q}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Links back */}
        <div className="flex flex-wrap gap-3 mb-4">
          <Link
            href={`/series/${slug}`}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[var(--accent)] text-[var(--accent-fg)] text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors"
          >
            <BookOpen size={14} />
            All {series.shortName ?? series.name} Books
          </Link>
          <Link
            href="/series"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] text-sm font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
          >
            Browse All Series
          </Link>
          {hasBooksLike && (
            <Link
              href={`/books-like/${slug}`}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] text-sm font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              Books Like {series.shortName ?? series.name} →
            </Link>
          )}
        </div>

        <NewsletterSignup />

        {/* Affiliate disclosure */}
        <p className="mt-8 text-xs text-[var(--text-faint)] leading-relaxed">
          Book links are Amazon affiliate links. As an Amazon Associate, BookReleaseRadar earns from qualifying purchases at no extra cost to you.
        </p>
      </div>
    </>
  );
}
