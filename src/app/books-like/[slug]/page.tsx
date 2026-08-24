import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, ExternalLink, BookOpen } from 'lucide-react';
import { RECOMMENDATIONS, getBooksLike, getRecommendationAmazonUrl, ALL_BOOKS_LIKE_SLUGS } from '@/lib/recommendations';
import { SERIES, getSeriesBySlug } from '@/lib/series';
import { ALL_READING_ORDER_SLUGS } from '@/lib/reading-orders';
import NewsletterSignup from '@/components/NewsletterSignup';

export const revalidate = 2592000;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_BOOKS_LIKE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getBooksLike(slug);
  if (!entry) return {};

  const name = entry.sourceShortName ?? entry.sourceTitle;
  const title = `Books Like ${name} — ${entry.tagline}`;
  const description = `If you loved ${entry.sourceTitle}, here are the best books to read next. ${entry.description.slice(0, 100)}...`;

  return {
    title,
    description,
    keywords: entry.keywords,
    alternates: { canonical: `https://bookreleaseradar.com/books-like/${slug}` },
    openGraph: { title, description },
  };
}

export default async function BooksLikePage({ params }: Props) {
  const { slug } = await params;
  const entry = getBooksLike(slug);
  if (!entry) notFound();

  const series = getSeriesBySlug(slug);
  const hasReadingOrder = ALL_READING_ORDER_SLUGS.includes(slug);
  const name = entry.sourceShortName ?? entry.sourceTitle;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bookreleaseradar.com' },
      { '@type': 'ListItem', position: 2, name: 'Books Like…', item: 'https://bookreleaseradar.com/books-like' },
      { '@type': 'ListItem', position: 3, name: `Books Like ${name}`, item: `https://bookreleaseradar.com/books-like/${slug}` },
    ],
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Books Like ${entry.sourceTitle}`,
    description: entry.description,
    numberOfItems: entry.recommendations.length,
    itemListElement: entry.recommendations.map((rec, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: rec.title,
      item: {
        '@type': 'Book',
        name: rec.title,
        author: { '@type': 'Person', name: rec.author },
      },
    })),
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What books are similar to ${entry.sourceTitle}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The best books similar to ${entry.sourceTitle} include: ${entry.recommendations.slice(0, 4).map((r) => `${r.title} by ${r.author}`).join(', ')}. ${entry.description}`,
        },
      },
      {
        '@type': 'Question',
        name: `What should I read after ${name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `After finishing ${entry.sourceTitle}, readers love: ${entry.recommendations.slice(0, 3).map((r) => `${r.title} by ${r.author} — ${r.why}`).join('. ')}`,
        },
      },
      {
        '@type': 'Question',
        name: `What genre is ${name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${entry.sourceTitle} is primarily ${entry.recommendations[0]?.genre ?? 'fiction'}. ${entry.tagline}`,
        },
      },
    ],
  };

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
          <Link href="/books-like" className="hover:text-[var(--accent)] transition-colors">Books Like…</Link>
          <ChevronRight size={12} />
          <span className="text-[var(--text-muted)]">{name}</span>
        </nav>

        {/* Hero */}
        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest uppercase text-[var(--gold)] mb-2">
            Recommendations
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl text-[var(--text)] mb-3 leading-tight">
            Books Like {name}
          </h1>
          <p className="text-base text-[var(--text-muted)] italic mb-3">{entry.tagline}</p>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">{entry.description}</p>
        </div>

        {/* Recommendations list */}
        <section className="mb-10">
          <ol className="space-y-4">
            {entry.recommendations.map((rec, i) => (
              <li
                key={rec.title}
                className="flex gap-4 p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)]/40 transition-colors"
              >
                <div className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center">
                  <span className="text-[var(--accent)] text-sm font-bold">{i + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="font-[family-name:var(--font-playfair)] font-semibold text-[var(--text)] mb-0.5">
                        {rec.title}
                      </h2>
                      <p className="text-xs text-[var(--text-muted)] mb-2">by {rec.author}</p>
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed">{rec.why}</p>
                    </div>
                    <a
                      href={getRecommendationAmazonUrl(rec)}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--gold-light)] text-[var(--gold)] hover:bg-[var(--accent)] hover:text-[var(--accent-fg)] text-xs font-semibold transition-colors whitespace-nowrap"
                    >
                      <ExternalLink size={11} />
                      Buy
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Related links */}
        {(series || hasReadingOrder) && (
          <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] mb-8">
            <p className="text-xs font-bold tracking-widest uppercase text-[var(--text-faint)] mb-3">
              More {name} Resources
            </p>
            <div className="flex flex-wrap gap-2">
              {series && (
                <Link
                  href={`/series/${slug}`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--accent)] text-[var(--accent-fg)] text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors"
                >
                  <BookOpen size={14} />
                  All {name} Books
                </Link>
              )}
              {hasReadingOrder && (
                <Link
                  href={`/series/${slug}/reading-order`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface-raised)] text-[var(--text-muted)] text-sm font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  {name} Reading Order →
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Explore other recommendations */}
        <section>
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="font-[family-name:var(--font-playfair)] text-lg text-[var(--text)]">
              More Reading Recommendations
            </h2>
            <Link href="/books-like" className="text-xs text-[var(--accent)] hover:underline">View all →</Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {RECOMMENDATIONS.filter((r) => r.slug !== slug).slice(0, 4).map((r) => (
              <Link
                key={r.slug}
                href={`/books-like/${r.slug}`}
                className="group p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)]/40 transition-colors"
              >
                <p className="font-semibold text-sm text-[var(--text)] group-hover:text-[var(--accent)] transition-colors mb-1">
                  Books Like {r.sourceShortName ?? r.sourceTitle}
                </p>
                <p className="text-xs text-[var(--text-faint)] line-clamp-2">{r.tagline}</p>
              </Link>
            ))}
          </div>
        </section>

        <NewsletterSignup />

        <p className="mt-8 text-xs text-[var(--text-faint)] leading-relaxed">
          Book links are Amazon affiliate links. As an Amazon Associate, BookReleaseRadar earns from qualifying purchases at no extra cost to you.
        </p>
      </div>
    </>
  );
}
