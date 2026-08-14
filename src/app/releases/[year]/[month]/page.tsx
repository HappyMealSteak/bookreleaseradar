import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getBooksByMonth, getPublishedMonths } from '@/lib/db';
import BookGrid from '@/components/BookGrid';

export const revalidate = 86400;

interface Props {
  params: Promise<{ year: string; month: string }>;
}

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export async function generateStaticParams() {
  const months = await getPublishedMonths();
  return months.map(({ year, month }) => ({
    year: String(year),
    month: String(month).padStart(2, '0'),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year, month } = await params;
  const monthNum = parseInt(month, 10);
  if (monthNum < 1 || monthNum > 12) return {};
  const monthName = MONTH_NAMES[monthNum - 1];
  const title = `New Books ${monthName} ${year}`;
  const description = `All new book releases for ${monthName} ${year}. Browse upcoming and recently released titles with release dates and Amazon links.`;
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function MonthlyReleasesPage({ params }: Props) {
  const { year, month } = await params;
  const yearNum = parseInt(year, 10);
  const monthNum = parseInt(month, 10);

  if (
    isNaN(yearNum) || isNaN(monthNum) ||
    monthNum < 1 || monthNum > 12 ||
    yearNum < 2020 || yearNum > 2030
  ) {
    notFound();
  }

  const books = await getBooksByMonth(yearNum, monthNum);
  const monthName = MONTH_NAMES[monthNum - 1];

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bookreleaseradar.com' },
      { '@type': 'ListItem', position: 2, name: 'Release Calendar', item: 'https://bookreleaseradar.com/calendar' },
      { '@type': 'ListItem', position: 3, name: `${monthName} ${year}`, item: `https://bookreleaseradar.com/releases/${year}/${month}` },
    ],
  };

  // Adjacent months for navigation
  const prevMonth = monthNum === 1 ? { year: yearNum - 1, month: 12 } : { year: yearNum, month: monthNum - 1 };
  const nextMonth = monthNum === 12 ? { year: yearNum + 1, month: 1 } : { year: yearNum, month: monthNum + 1 };
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Link
          href="/calendar"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] mb-8 transition-colors"
        >
          <ArrowLeft size={14} /> Release Calendar
        </Link>

        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest uppercase text-[var(--gold)] mb-2">Monthly Releases</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl text-[var(--text)] mb-2">
            New Books — {monthName} {year}
          </h1>
          <p className="text-[var(--text-muted)]">
            {books.length > 0
              ? `${books.length} book${books.length !== 1 ? 's' : ''} releasing in ${monthName} ${year}.`
              : `No books with confirmed dates for ${monthName} ${year}.`}
          </p>
        </div>

        {books.length > 0 ? (
          <BookGrid books={books} />
        ) : (
          <div className="py-20 text-center text-[var(--text-muted)]">
            <p className="font-[family-name:var(--font-playfair)] text-xl mb-2">No releases scheduled</p>
            <p className="text-sm">Check back as publishers announce dates.</p>
          </div>
        )}

        {/* Month navigation */}
        <nav className="flex justify-between mt-12 pt-6 border-t border-[var(--border)]">
          <Link
            href={`/releases/${prevMonth.year}/${pad(prevMonth.month)}`}
            className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            ← {MONTH_NAMES[prevMonth.month - 1]} {prevMonth.year}
          </Link>
          <Link
            href={`/releases/${nextMonth.year}/${pad(nextMonth.month)}`}
            className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            {MONTH_NAMES[nextMonth.month - 1]} {nextMonth.year} →
          </Link>
        </nav>
      </div>
    </>
  );
}
