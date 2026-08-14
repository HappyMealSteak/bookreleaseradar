import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import BookGrid from '@/components/BookGrid';
import { getBooksByYear, getPublishedMonths } from '@/lib/db';

export const revalidate = 86400;

interface Props {
  params: Promise<{ year: string }>;
}

const VALID_YEARS = [2025, 2026, 2027, 2028];

export async function generateStaticParams() {
  return VALID_YEARS.map((y) => ({ year: String(y) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params;
  const y = Number(year);
  if (!VALID_YEARS.includes(y)) return {};

  const title = `New Books ${y} — Upcoming Releases`;
  const description = `Browse all new book releases in ${y}. Upcoming fiction, thriller, mystery, fantasy, romance, and more — with release dates and Amazon links.`;

  return {
    title,
    description,
    keywords: [
      `new books ${y}`,
      `book releases ${y}`,
      `upcoming books ${y}`,
      `best books ${y}`,
      `books coming out in ${y}`,
      `new novels ${y}`,
    ],
    openGraph: { title, description },
  };
}

export default async function YearPage({ params }: Props) {
  const { year } = await params;
  const y = Number(year);
  if (!VALID_YEARS.includes(y)) notFound();

  const [books, months] = await Promise.all([
    getBooksByYear(y, 200),
    getPublishedMonths(),
  ]);

  const yearMonths = months
    .filter((m) => m.year === y)
    .sort((a, b) => a.month - b.month);

  const MONTH_NAMES = [
    '', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bookreleaseradar.com' },
      { '@type': 'ListItem', position: 2, name: `New Books ${y}`, item: `https://bookreleaseradar.com/releases/${y}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest uppercase text-[var(--gold)] mb-2">Release Calendar</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl text-[var(--text)] mb-3">
            New Books {y}
          </h1>
          <p className="text-[var(--text-muted)] max-w-2xl">
            {books.length > 0
              ? `${books.length} book${books.length !== 1 ? 's' : ''} tracked for ${y} across all genres.`
              : `Upcoming book releases for ${y}.`}{' '}
            Pre-order now or track release dates.
          </p>
        </div>

        {/* Month navigation */}
        {yearMonths.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {yearMonths.map(({ month, count }) => (
              <Link
                key={month}
                href={`/releases/${y}/${String(month).padStart(2, '0')}`}
                className="px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                {MONTH_NAMES[month]}
                <span className="ml-1.5 text-xs text-[var(--text-faint)]">({count})</span>
              </Link>
            ))}
          </div>
        )}

        {/* Year navigation */}
        <div className="flex items-center gap-2 mb-8">
          {VALID_YEARS.filter((vy) => vy !== y).map((vy) => (
            <Link
              key={vy}
              href={`/releases/${vy}`}
              className="flex items-center gap-0.5 text-xs font-semibold text-[var(--text-faint)] hover:text-[var(--accent)] transition-colors"
            >
              {vy} <ChevronRight size={11} />
            </Link>
          ))}
        </div>

        <BookGrid
          books={books}
          emptyMessage={`No books tracked for ${y} yet. Check back after the next weekly seed.`}
        />
      </div>
    </>
  );
}
