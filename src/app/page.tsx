import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, TrendingUp, Zap, Library, BookMarked, ExternalLink, Clock } from 'lucide-react';
import BookGrid from '@/components/BookGrid';
import NewsletterSignup from '@/components/NewsletterSignup';
import { getUpcomingBooks, getBooksByGenre, getReleasingThisWeek } from '@/lib/db';
import { GENRES, GENRE_LABELS, type Genre } from '@/lib/types';
import { getNytList } from '@/lib/nyt';
import { getMostAnticipated } from '@/lib/reading-orders';
import { getSeriesBySlug } from '@/lib/series';

const SPOTLIGHT_SERIES = [
  { slug: 'acotar', label: 'ACOTAR', sub: 'Sarah J. Maas' },
  { slug: 'fourth-wing', label: 'Fourth Wing', sub: 'Rebecca Yarros' },
  { slug: 'six-of-crows', label: 'Six of Crows', sub: 'Leigh Bardugo' },
  { slug: 'colleen-hoover', label: 'Colleen Hoover', sub: 'CoHo picks' },
  { slug: 'percy-jackson', label: 'Percy Jackson', sub: 'Rick Riordan' },
  { slug: 'a-song-of-ice-and-fire', label: 'Game of Thrones', sub: 'George R.R. Martin' },
  { slug: 'shadowhunters', label: 'Shadowhunters', sub: 'Cassandra Clare' },
  { slug: 'stormlight-archive', label: 'Stormlight', sub: 'Brandon Sanderson' },
  { slug: 'red-rising', label: 'Red Rising', sub: 'Pierce Brown' },
  { slug: 'outlander', label: 'Outlander', sub: 'Diana Gabaldon' },
  { slug: 'folk-of-the-air', label: 'Folk of the Air', sub: 'Holly Black' },
  { slug: 'mistborn', label: 'Mistborn', sub: 'Brandon Sanderson' },
  { slug: 'bridgerton', label: 'Bridgerton', sub: 'Julia Quinn' },
  { slug: 'kingkiller-chronicle', label: 'Kingkiller', sub: 'Patrick Rothfuss' },
  { slug: 'blood-and-ash', label: 'Blood & Ash', sub: 'J.L. Armentrout' },
  { slug: 'inheritance-games', label: 'Inheritance Games', sub: 'J.L. Barnes' },
  { slug: 'shatter-me', label: 'Shatter Me', sub: 'Tahereh Mafi' },
  { slug: 'atlas-six', label: 'The Atlas Six', sub: 'Olivie Blake' },
  { slug: 'twisted', label: 'Twisted Series', sub: 'Ana Huang' },
  { slug: 'the-witcher', label: 'The Witcher', sub: 'Andrzej Sapkowski' },
  { slug: 'hunger-games', label: 'Hunger Games', sub: 'Suzanne Collins' },
  { slug: 'wheel-of-time', label: 'Wheel of Time', sub: 'Robert Jordan' },
  { slug: 'poppy-war', label: 'Poppy War', sub: 'R.F. Kuang' },
  { slug: 'dark-tower', label: 'Dark Tower', sub: 'Stephen King' },
];

export const revalidate = 86400; // refresh every 24h

export default async function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BookReleaseRadar',
    url: 'https://bookreleaseradar.com',
    description: 'Track upcoming book releases by genre, author, and date.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://bookreleaseradar.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const year = new Date().getFullYear();
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What new books are coming out in ${year}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `BookReleaseRadar tracks all major book releases for ${year} across fantasy, thriller, romance, sci-fi, literary fiction, and more. Browse by genre or use the calendar to see what's releasing each month. Pre-order links are included for every book.`,
        },
      },
      {
        '@type': 'Question',
        name: 'How do I find out when the next book in a series comes out?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Browse the Series section on BookReleaseRadar. Each popular series has a dedicated page with all books, upcoming releases, and confirmed release dates. Series include ACOTAR, Fourth Wing, Bridgerton, Hunger Games, Wheel of Time, Kingkiller Chronicle, Blood and Ash, The Inheritance Games, The Poppy War, The Dark Tower, Shatter Me, The Atlas Six, Twisted, The Witcher, Percy Jackson, Game of Thrones, Mistborn, and more.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the most anticipated books coming out?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The most anticipated books include major series continuations and debut novels generating early buzz. Visit the Most Anticipated page on BookReleaseRadar for the full list with confirmed release dates for ${year} and ${year + 1}.`,
        },
      },
      {
        '@type': 'Question',
        name: 'What books are similar to ACOTAR or Fourth Wing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'BookReleaseRadar has curated "Books Like" guides for all major series. If you loved ACOTAR, try From Blood and Ash, An Ember in the Ashes, The Cruel Prince, or Shadow and Bone. If you loved Fourth Wing, try ACOTAR, Red Rising, An Ember in the Ashes, or The Name of the Wind. Visit the Books Like section for complete recommendations.',
        },
      },
    ],
  };
  const [upcoming, thisWeek, trendingList, ...genreSamples] = await Promise.all([
    getUpcomingBooks(18),
    getReleasingThisWeek(),
    getNytList('young-adult-hardcover'),
    ...GENRES.map((g) => getBooksByGenre(g as Genre, 6)),
  ]);

  const featuredGenres = [...GENRES] as Genre[];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-14">
      {/* Hero */}
      <section>
        <div className="mb-6">
          <p className="text-xs font-bold tracking-widest uppercase text-[var(--gold)] mb-2">
            {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
          <h1 className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] text-[var(--text)] mb-2">
            Upcoming Book Releases
          </h1>
          <p className="text-[var(--text-muted)] text-base max-w-xl">
            The next great reads, tracked before they hit shelves. Browse by genre, author, or release date.
          </p>
        </div>

        <BookGrid books={upcoming} emptyMessage="Run the seed script to populate books from Google Books API." />

        {upcoming.length > 0 && (
          <div className="mt-6 text-center">
            <Link
              href="/search"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--accent)] hover:underline font-medium"
            >
              Browse all books <ChevronRight size={14} />
            </Link>
          </div>
        )}
      </section>

      {/* Releasing This Week */}
      {thisWeek.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-[var(--gold)]" />
              <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--text)]">
                Releasing This Week
              </h2>
            </div>
            <Link
              href={`/releases/${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}`}
              className="text-xs font-semibold text-[var(--accent)] hover:underline flex items-center gap-0.5"
            >
              See full month <ChevronRight size={13} />
            </Link>
          </div>
          <BookGrid books={thisWeek} />
        </section>
      )}

      {/* Popular Series Spotlight */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Library size={16} className="text-[var(--accent)]" />
            <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--text)]">
              Popular Series
            </h2>
          </div>
          <Link href="/series" className="text-xs font-semibold text-[var(--accent)] hover:underline flex items-center gap-0.5">
            All series <ChevronRight size={13} />
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-5">
          {SPOTLIGHT_SERIES.map((s) => (
            <Link
              key={s.slug}
              href={`/series/${s.slug}`}
              className="group flex flex-col items-center text-center p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)]/50 hover:bg-[var(--surface-raised)] transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-[var(--accent-light)] flex items-center justify-center mb-2">
                <BookMarked size={18} className="text-[var(--accent)]" />
              </div>
              <span className="text-xs font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors leading-tight mb-0.5">{s.label}</span>
              <span className="text-[10px] text-[var(--text-faint)] leading-tight">{s.sub}</span>
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/series/acotar/reading-order" className="px-3 py-1.5 text-xs rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
            ACOTAR Reading Order →
          </Link>
          <Link href="/series/fourth-wing/reading-order" className="px-3 py-1.5 text-xs rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
            Fourth Wing Reading Order →
          </Link>
          <Link href="/series/six-of-crows/reading-order" className="px-3 py-1.5 text-xs rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
            Grishaverse Reading Order →
          </Link>
          <Link href="/series/percy-jackson/reading-order" className="px-3 py-1.5 text-xs rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
            Percy Jackson Reading Order →
          </Link>
          <Link href="/series/shadowhunters/reading-order" className="px-3 py-1.5 text-xs rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
            Shadowhunters Reading Order →
          </Link>
          <Link href="/series/red-rising/reading-order" className="px-3 py-1.5 text-xs rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
            Red Rising Reading Order →
          </Link>
          <Link href="/books-like/acotar" className="px-3 py-1.5 text-xs rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
            Books Like ACOTAR →
          </Link>
          <Link href="/books-like/six-of-crows" className="px-3 py-1.5 text-xs rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
            Books Like Six of Crows →
          </Link>
          <Link href="/books-like" className="px-3 py-1.5 text-xs rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
            All Recommendations →
          </Link>
        </div>
      </section>

      {/* Most Anticipated */}
      {(() => {
        const anticipated = getMostAnticipated();
        if (!anticipated.length) return null;
        return (
          <section>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[var(--gold)]" />
                <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--text)]">
                  Most Anticipated
                </h2>
                <span className="text-[10px] font-bold tracking-wider uppercase text-[var(--gold)] bg-[var(--gold-light)] px-2 py-0.5 rounded-full">
                  Coming Soon
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {anticipated.map((book) => {
                const series = getSeriesBySlug(book.seriesSlug);
                return (
                  <Link
                    key={book.title}
                    href={`/series/${book.seriesSlug}/reading-order`}
                    className="group flex flex-col gap-2 p-4 rounded-xl border border-[var(--gold)]/30 bg-[var(--surface)] hover:border-[var(--gold)]/60 hover:bg-[var(--surface-raised)] transition-all"
                  >
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Clock size={12} className="text-[var(--gold)] shrink-0" />
                      <span className="text-[10px] font-bold tracking-wider uppercase text-[var(--gold)]">
                        {book.note && /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|\d{4})\b/i.test(book.note)
                          ? (book.note.match(/\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+\d{4}/i) ?? book.note.match(/\d{4}/))?.[0] ?? 'TBA'
                          : 'TBA'}
                      </span>
                    </div>
                    <p className="font-[family-name:var(--font-playfair)] font-semibold text-sm leading-snug text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                      {book.title}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">{book.author}</p>
                    {series && (
                      <p className="text-[10px] text-[var(--text-faint)] mt-auto pt-1 border-t border-[var(--border)]">
                        {series.name}
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })()}

      {/* Trending on BookTok */}
      {trendingList && trendingList.books.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-[var(--gold)]" />
              <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--text)]">
                Trending on BookTok
              </h2>
              <span className="text-[10px] font-bold tracking-wider uppercase text-[var(--gold)] bg-[var(--gold-light)] px-2 py-0.5 rounded-full">
                NYT YA
              </span>
            </div>
            <Link
              href="/trending"
              className="text-xs font-semibold text-[var(--accent)] hover:underline flex items-center gap-0.5"
            >
              Full charts <ChevronRight size={13} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {trendingList.books.slice(0, 5).map((book) => (
              <a
                key={book.isbn13 || book.title}
                href={book.amazonUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="group flex flex-col bg-[var(--surface)] border border-[var(--border)] rounded-lg overflow-hidden hover:border-[var(--accent)] hover:shadow-md transition-all duration-200"
              >
                <div className="relative bg-[var(--surface-raised)]" style={{ aspectRatio: '2/3' }}>
                  {book.coverUrl && (
                    <Image
                      src={book.coverUrl}
                      alt={book.title}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
                    />
                  )}
                  <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-[var(--accent)] flex items-center justify-center shadow">
                    <span className="text-[11px] font-bold text-[var(--accent-fg)]">#{book.rank}</span>
                  </div>
                  {book.weeksOnList === 1 && (
                    <div className="absolute top-2 right-2 bg-[var(--gold)] text-[var(--accent-fg)] text-[9px] font-bold px-1.5 py-0.5 rounded">
                      NEW
                    </div>
                  )}
                </div>
                <div className="p-2.5 flex flex-col flex-1 gap-0.5">
                  <p className="font-[family-name:var(--font-playfair)] font-semibold text-xs leading-snug line-clamp-2 text-[var(--text)]">
                    {book.title}
                  </p>
                  <p className="text-[10px] text-[var(--text-muted)] line-clamp-1">{book.author}</p>
                  <div className="mt-auto pt-2 flex items-center justify-between">
                    <span className="text-[9px] text-[var(--text-faint)]">
                      {book.weeksOnList === 1 ? 'New' : `${book.weeksOnList}wk`}
                    </span>
                    <ExternalLink size={10} className="text-[var(--text-faint)] group-hover:text-[var(--accent)] transition-colors" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Genre sections */}
      {featuredGenres.map((genre, i) => {
        const books = genreSamples[i] ?? [];
        if (!books.length) return null;
        return (
          <section key={genre}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-[var(--accent)]" />
                <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--text)]">
                  New in {GENRE_LABELS[genre]}
                </h2>
              </div>
              <Link
                href={`/genre/${genre}`}
                className="text-xs font-semibold text-[var(--accent)] hover:underline flex items-center gap-0.5"
              >
                See all <ChevronRight size={13} />
              </Link>
            </div>
            <BookGrid books={books} />
          </section>
        );
      })}

      {/* Best Books of year */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-[var(--gold)] mb-1">Editorial</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--text)]">
              Best Books of {year}
            </h2>
          </div>
          <Link href={`/best-books/${year}`} className="text-xs font-semibold text-[var(--accent)] hover:underline flex items-center gap-0.5">
            All genres <ChevronRight size={13} />
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {([...GENRES] as Genre[]).map((g) => (
            <Link
              key={g}
              href={`/best-books/${year}/${g}`}
              className="px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface-raised)] text-sm text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              Best {GENRE_LABELS[g]} of {year}
            </Link>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="rounded-xl bg-[var(--accent-light)] border border-[var(--border)] p-8 text-center">
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl mb-2 text-[var(--text)]">
          Never miss a release
        </h2>
        <p className="text-[var(--text-muted)] text-sm mb-4 max-w-md mx-auto">
          Browse by genre or use the calendar view to see everything releasing this month and beyond.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/calendar"
            className="px-5 py-2.5 rounded-lg bg-[var(--accent)] text-[var(--accent-fg)] text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors"
          >
            View Calendar
          </Link>
          <Link
            href="/search"
            className="px-5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-sm font-semibold hover:border-[var(--accent)] transition-colors"
          >
            Search Books
          </Link>
        </div>
      </section>
    </div>
    <NewsletterSignup />
    </>
  );
}
