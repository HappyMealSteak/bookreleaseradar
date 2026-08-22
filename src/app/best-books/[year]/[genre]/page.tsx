import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { getBestBooksByGenreYear } from '@/lib/db';
import { GENRE_LABELS, GENRES, type Genre } from '@/lib/types';
import BookGrid from '@/components/BookGrid';
import NewsletterSignup from '@/components/NewsletterSignup';

export const revalidate = 86400;

const SUPPORTED_YEARS = [2025, 2026, 2027];
const MIN_BOOKS = 6;

const GENRE_INTROS: Partial<Record<Genre, Record<number, string>>> = {
  fantasy: {
    2025: "2025 was a landmark year for fantasy — romantasy continued its meteoric rise, Brandon Sanderson expanded the Cosmere, and debut authors found massive audiences through BookTok. These are the major fantasy releases BookReleaseRadar tracked across epic fantasy, dark fantasy, fae romance, and more.",
    2026: "2026 is shaping up as another strong year for fantasy readers. From long-awaited series continuations and debut standalone epics to romantasy and dark academic fantasy, these are the major fantasy releases BookReleaseRadar is tracking in 2026.",
    2027: "BookReleaseRadar is tracking early 2027 fantasy announcements. These confirmed and anticipated fantasy releases include series continuations, debut novels, and standalone epics generating pre-publication buzz.",
  },
  romance: {
    2025: "Romance dominated bestseller lists in 2025 — BookTok continued to drive discovery, and the line between romance and romantasy blurred further. These are the major 2025 romance releases BookReleaseRadar tracked.",
    2026: "Romance readers have a packed release calendar in 2026. From contemporary romance and small-town reads to steamy romantasy and dark romance, these are the major 2026 romance releases BookReleaseRadar is tracking.",
    2027: "BookReleaseRadar is tracking confirmed 2027 romance announcements. These include anticipated series continuations and debut romance novels generating early buzz.",
  },
  thriller: {
    2025: "Thriller and psychological suspense delivered powerful reads throughout 2025. From domestic noir and legal thrillers to international espionage and cozy-adjacent mysteries, these are the major 2025 thriller releases BookReleaseRadar tracked.",
    2026: "2026 brings a strong lineup of thrillers, psychological suspense, and legal dramas. These are the major 2026 thriller releases BookReleaseRadar is tracking — updated as new titles are announced.",
    2027: "BookReleaseRadar is tracking confirmed 2027 thriller and suspense announcements across psychological suspense, crime, and domestic noir.",
  },
  mystery: {
    2025: "Cozy mysteries, procedurals, and literary crime fiction all had standout years in 2025. These are the major mystery releases BookReleaseRadar tracked.",
    2026: "2026 brings new entries in beloved mystery series alongside standout debut crime novels. These are the major 2026 mystery releases BookReleaseRadar is tracking.",
    2027: "BookReleaseRadar is tracking confirmed 2027 mystery and crime fiction announcements.",
  },
  'sci-fi': {
    2025: "Science fiction in 2025 spanned hard SF, space opera, climate fiction, and AI-centered near-future stories. These are the major 2025 sci-fi releases BookReleaseRadar tracked.",
    2026: "2026 delivers new science fiction across space opera, near-future tech, and literary SF. These are the major 2026 sci-fi releases BookReleaseRadar is tracking.",
    2027: "BookReleaseRadar is tracking confirmed 2027 science fiction announcements, including anticipated series continuations.",
  },
  fiction: {
    2025: "Literary fiction and upmarket fiction had a strong 2025, with powerful debut novels and anticipated returns from major authors. These are the major 2025 fiction releases BookReleaseRadar tracked.",
    2026: "2026 brings new literary fiction from established voices and debut authors. These are the major 2026 fiction releases BookReleaseRadar is tracking.",
    2027: "BookReleaseRadar is tracking confirmed 2027 fiction announcements from anticipated authors and debut novelists.",
  },
};

interface Props {
  params: Promise<{ year: string; genre: string }>;
}

export async function generateStaticParams() {
  const params: { year: string; genre: string }[] = [];
  for (const year of SUPPORTED_YEARS) {
    for (const genre of [...GENRES] as Genre[]) {
      const books = await getBestBooksByGenreYear(genre, year, 1);
      if (books.length >= 1) {
        params.push({ year: String(year), genre });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year, genre } = await params;
  const yearNum = parseInt(year);
  if (!SUPPORTED_YEARS.includes(yearNum) || !GENRES.includes(genre as Genre)) return {};

  const genreLabel = GENRE_LABELS[genre as Genre] ?? genre;
  const title = `Best ${genreLabel} Books of ${year}`;
  const description = `The best ${genreLabel.toLowerCase()} books of ${year} — major releases, anticipated titles, and new debuts. Find release dates and buy on Amazon.`;

  return {
    title,
    description,
    keywords: [
      `best ${genre} books ${year}`,
      `best ${genreLabel.toLowerCase()} books ${year}`,
      `new ${genre} books ${year}`,
      `top ${genre} releases ${year}`,
      `${genre} books coming out ${year}`,
      `must read ${genre} ${year}`,
    ],
    openGraph: { title, description },
  };
}

export default async function BestBooksGenrePage({ params }: Props) {
  const { year, genre } = await params;
  const yearNum = parseInt(year);

  if (!SUPPORTED_YEARS.includes(yearNum) || !GENRES.includes(genre as Genre)) notFound();

  const books = await getBestBooksByGenreYear(genre as Genre, yearNum, 48);
  if (books.length < MIN_BOOKS) notFound();

  const genreLabel = GENRE_LABELS[genre as Genre] ?? genre;
  const intro = GENRE_INTROS[genre as Genre]?.[yearNum] ?? `These are the major ${genreLabel.toLowerCase()} releases BookReleaseRadar is tracking in ${year}.`;

  const upcoming = books.filter((b) => b.publishedDate && new Date(b.publishedDate) > new Date());
  const released = books.filter((b) => !upcoming.includes(b));

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bookreleaseradar.com' },
      { '@type': 'ListItem', position: 2, name: `Best Books ${year}`, item: `https://bookreleaseradar.com/best-books/${year}` },
      { '@type': 'ListItem', position: 3, name: `Best ${genreLabel} Books ${year}`, item: `https://bookreleaseradar.com/best-books/${year}/${genre}` },
    ],
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Best ${genreLabel} Books of ${year}`,
    numberOfItems: books.length,
    itemListElement: books.slice(0, 20).map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.title,
      url: `https://bookreleaseradar.com/books/${b.slug}`,
    })),
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What are the best ${genreLabel.toLowerCase()} books of ${year}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The top ${genreLabel.toLowerCase()} books of ${year} include: ${books.slice(0, 5).map((b) => `${b.title} by ${b.authors[0] ?? 'unknown'}`).join(', ')}. BookReleaseRadar tracks major ${genreLabel.toLowerCase()} releases across series continuations, debut novels, and anticipated titles.`,
        },
      },
      {
        '@type': 'Question',
        name: `How many ${genreLabel.toLowerCase()} books are releasing in ${year}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `BookReleaseRadar is tracking ${books.length} ${genreLabel.toLowerCase()} books in ${year}${upcoming.length > 0 ? `, including ${upcoming.length} still to come` : ''}. The list includes major releases from established authors and anticipated debut novels.`,
        },
      },
      {
        '@type': 'Question',
        name: `Where can I find ${genreLabel.toLowerCase()} books releasing in ${year}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `BookReleaseRadar tracks all major ${genreLabel.toLowerCase()} releases with confirmed release dates and Amazon pre-order links. Visit the ${genreLabel} genre page or the Release Calendar for a complete view across all dates.`,
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <nav className="flex items-center gap-1 text-xs text-[var(--text-muted)] mb-8 flex-wrap">
          <Link href="/" className="hover:text-[var(--accent)] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href={`/best-books/${year}`} className="hover:text-[var(--accent)] transition-colors">Best Books {year}</Link>
          <ChevronRight size={12} />
          <span className="text-[var(--text)]">Best {genreLabel} Books {year}</span>
        </nav>

        <div className="mb-10">
          <p className="text-xs font-bold tracking-widest uppercase text-[var(--gold)] mb-2">{year} Releases</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl text-[var(--text)] mb-4">
            Best {genreLabel} Books of {year}
          </h1>
          <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-2xl mb-4">{intro}</p>

          {/* Genre nav */}
          <div className="flex flex-wrap gap-2 mt-4">
            {([...GENRES] as Genre[]).map((g) => (
              <Link
                key={g}
                href={`/best-books/${year}/${g}`}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                  g === genre
                    ? 'border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)]'
                    : 'border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                }`}
              >
                {GENRE_LABELS[g]}
              </Link>
            ))}
          </div>
        </div>

        {upcoming.length > 0 && (
          <section className="mb-12">
            <h2 className="font-[family-name:var(--font-playfair)] text-xl mb-5 text-[var(--text)]">
              Still to Come in {year}
            </h2>
            <BookGrid books={upcoming} />
          </section>
        )}

        {released.length > 0 && (
          <section className="mb-12">
            <h2 className="font-[family-name:var(--font-playfair)] text-xl mb-5 text-[var(--text)]">
              {upcoming.length > 0 ? `Already Released` : `${genreLabel} Books — ${year}`}
            </h2>
            <BookGrid books={released} />
          </section>
        )}

        <div className="border-t border-[var(--border)] pt-8 mt-4">
          <p className="text-xs font-bold tracking-widest uppercase text-[var(--text-muted)] mb-4">Browse More</p>
          <div className="flex flex-wrap gap-3">
            <Link href={`/genre/${genre}`} className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">All {genreLabel} Books →</Link>
            <Link href="/new-releases" className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">New This Week →</Link>
            <Link href="/most-anticipated" className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">Most Anticipated →</Link>
            <Link href={`/best-books/${year}`} className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">Best Books {year} →</Link>
          </div>
        </div>
      </div>

      <NewsletterSignup />
    </>
  );
}
