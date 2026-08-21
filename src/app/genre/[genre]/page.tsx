import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BookGrid from '@/components/BookGrid';
import { getBooksByGenre, getBookCountByGenre } from '@/lib/db';
import { GENRES, GENRE_LABELS, GENRE_DESCRIPTIONS, type Genre } from '@/lib/types';
import { SERIES } from '@/lib/series';

const GENRE_FAQS: Record<Genre, Array<{ q: string; a: string }>> = {
  fantasy: [
    { q: 'What upcoming fantasy books are releasing in 2025 and 2026?', a: 'BookReleaseRadar tracks all upcoming fantasy releases including epic fantasy, urban fantasy, and dark fantasy. Browse our full list with confirmed release dates and pre-order links.' },
    { q: 'What are the most anticipated fantasy books coming out?', a: 'Our most anticipated list includes new entries in major fantasy series plus debut novels generating early buzz. Check the Most Anticipated page for the full breakdown.' },
    { q: 'How do I find out when the next book in a fantasy series comes out?', a: 'Use our Series reading order pages to see all books in a series and track upcoming installments with release dates.' },
  ],
  'sci-fi': [
    { q: 'What new science fiction books are coming out in 2025 and 2026?', a: 'BookReleaseRadar tracks upcoming sci-fi releases from hard science fiction and space opera to speculative fiction and cli-fi. Our list is updated with confirmed publication dates.' },
    { q: 'What are the best upcoming science fiction novels?', a: 'Our upcoming science fiction list includes debuts and sequels from established authors. Filter by date to find what releases next.' },
    { q: 'Where can I find release dates for new sci-fi books?', a: 'Every book on BookReleaseRadar includes its confirmed release date, Amazon pre-order link, and series information when applicable.' },
  ],
  thriller: [
    { q: 'What new thriller books are coming out soon?', a: "BookReleaseRadar tracks upcoming psychological thrillers, crime thrillers, and domestic suspense novels. Each listing shows the release date and a link to pre-order on Amazon." },
    { q: 'What are the most anticipated thriller books of 2025 and 2026?', a: 'Browse our thriller genre page to see all upcoming releases sorted by date, or check the Most Anticipated page for the biggest titles across all genres.' },
    { q: 'Are there upcoming thrillers from bestselling authors like Harlan Coben or Lisa Gardner?', a: "BookReleaseRadar tracks new releases from bestselling thriller authors. Search an author's name to see their upcoming books." },
  ],
  mystery: [
    { q: 'What new mystery books are releasing in 2025 and 2026?', a: 'BookReleaseRadar tracks upcoming cozy mysteries, police procedurals, historical mysteries, and noir releases with confirmed publication dates.' },
    { q: 'What are the best upcoming cozy mystery books?', a: 'Our mystery section includes cozy mysteries alongside harder-edged crime fiction. Filter by date to find what releases soonest.' },
    { q: 'How do I track when the next book in a mystery series comes out?', a: 'Visit our reading order pages to see complete series order and track upcoming installments with release dates and pre-order links.' },
  ],
  romance: [
    { q: 'What new romance novels are coming out in 2025 and 2026?', a: 'BookReleaseRadar tracks upcoming contemporary romance, historical romance, romantasy, and romantic suspense with confirmed release dates and pre-order links.' },
    { q: 'What are the most anticipated romance books of 2026?', a: 'Browse the romance genre page for all upcoming releases sorted by date, or visit our Most Anticipated page for the biggest titles.' },
    { q: 'Where can I pre-order upcoming romance books?', a: 'Every book on BookReleaseRadar includes an Amazon affiliate link where you can pre-order or buy on release day.' },
  ],
  fiction: [
    { q: 'What new literary fiction books are coming out in 2025 and 2026?', a: 'BookReleaseRadar tracks upcoming literary fiction, debut novels, and general fiction across all styles. Browse the full list with confirmed release dates.' },
    { q: 'What upcoming debut novels should I watch for in 2026?', a: 'The fiction genre page includes debut novels alongside established authors. Check regularly as new titles are added as publication dates are confirmed.' },
    { q: 'How can I find out about new books before they come out?', a: 'BookReleaseRadar is updated weekly with newly announced titles and release dates. Bookmark the site to track upcoming books before they hit shelves.' },
  ],
  'self-help': [
    { q: 'What new self-help books are coming out in 2025 and 2026?', a: 'BookReleaseRadar tracks upcoming self-help, personal development, business, and productivity books with confirmed release dates.' },
    { q: 'What are the most anticipated non-fiction self-improvement books?', a: 'Browse the self-help genre page for all upcoming releases, or visit the Most Anticipated page for the biggest titles across genres.' },
    { q: 'Where can I pre-order upcoming self-help books?', a: 'Every title on BookReleaseRadar includes an Amazon link for pre-ordering before the release date.' },
  ],
  'non-fiction': [
    { q: 'What new non-fiction books are coming out in 2025 and 2026?', a: 'BookReleaseRadar tracks upcoming non-fiction across history, memoir, science, politics, and current events with confirmed publication dates.' },
    { q: 'What are the most anticipated non-fiction releases of 2026?', a: 'Browse the non-fiction genre page to find upcoming titles sorted by release date, or check the Most Anticipated page for highlights.' },
    { q: 'How do I find upcoming books on a specific topic?', a: 'Use the search feature on BookReleaseRadar to find books by keyword, author name, or title. The non-fiction page shows all tracked upcoming releases.' },
  ],
};

export const revalidate = 86400;

interface Props {
  params: Promise<{ genre: string }>;
}

export async function generateStaticParams() {
  return GENRES.map((genre) => ({ genre }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { genre } = await params;
  if (!GENRES.includes(genre as Genre)) return {};

  const label = GENRE_LABELS[genre as Genre];
  const year = new Date().getFullYear();
  const title = `Upcoming ${label} Books ${year}`;
  const description = `Browse the latest upcoming ${label.toLowerCase()} book releases for ${year}. Find new ${label.toLowerCase()} titles with release dates and buy on Amazon.`;

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function GenrePage({ params }: Props) {
  const { genre } = await params;
  if (!GENRES.includes(genre as Genre)) notFound();

  const [books, count] = await Promise.all([
    getBooksByGenre(genre, 100),
    getBookCountByGenre(genre),
  ]);
  const label = GENRE_LABELS[genre as Genre];
  const year = new Date().getFullYear();
  const genreSeries = SERIES.filter((s) => s.genre === genre).slice(0, 6);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bookreleaseradar.com' },
      { '@type': 'ListItem', position: 2, name: `${label} Books`, item: `https://bookreleaseradar.com/genre/${genre}` },
    ],
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Upcoming ${label} Books ${year}`,
    numberOfItems: books.length,
    itemListElement: books.slice(0, 20).map((book, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: book.title,
      url: `https://bookreleaseradar.com/books/${book.slug}`,
      item: {
        '@type': 'Book',
        name: book.title,
        author: { '@type': 'Person', name: book.authors[0] ?? '' },
        datePublished: book.publishedDate ?? undefined,
        image: book.coverUrl ?? undefined,
        url: `https://bookreleaseradar.com/books/${book.slug}`,
      },
    })),
  };

  const faqs = GENRE_FAQS[genre as Genre] ?? [];
  const faqJsonLd = faqs.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <p className="text-xs font-bold tracking-widest uppercase text-[var(--gold)] mb-2">Genre</p>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl text-[var(--text)] mb-2">
          Upcoming {label} Books
        </h1>
        <p className="text-[var(--text-muted)] mb-3">
          {count > 0 ? `${count} upcoming ` : ''}{label.toLowerCase()} releases for {year} and beyond.
        </p>
        <p className="text-sm text-[var(--text-muted)] max-w-2xl leading-relaxed">
          {GENRE_DESCRIPTIONS[genre as Genre]}
        </p>
      </div>

      <BookGrid
        books={books}
        emptyMessage={`No upcoming ${label.toLowerCase()} books found. Check back after running the seed script.`}
      />

      {/* Popular series in genre */}
      {genreSeries.length > 0 && (
        <section className="mt-14">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--text)]">
              Popular {label} Series
            </h2>
            <Link href="/series" className="text-sm text-[var(--accent)] hover:underline">
              All Series →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {genreSeries.map((s) => (
              <Link key={s.slug} href={`/series/${s.slug}`} className="group rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] p-3 hover:border-[var(--accent)] transition-colors">
                <p className="text-sm font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors leading-tight mb-0.5 line-clamp-2">{s.shortName ?? s.name}</p>
                <p className="text-xs text-[var(--text-muted)] truncate">{s.author}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Best of year banner */}
      <div className="mt-12 rounded-xl border border-[var(--gold)]/30 bg-[var(--gold)]/5 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-[var(--gold)] mb-1">Editorial</p>
          <h3 className="font-[family-name:var(--font-playfair)] text-lg text-[var(--text)]">
            Best {label} Books of {year}
          </h3>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">
            Our curated list of the top {label.toLowerCase()} releases of {year}.
          </p>
        </div>
        <Link
          href={`/best-books/${year}/${genre}`}
          className="shrink-0 px-5 py-2.5 rounded-lg bg-[var(--gold)] text-[var(--surface)] text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          See Best of {year} →
        </Link>
      </div>
    </div>
    </>
  );
}
