'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Search, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GENRES, GENRE_LABELS, type Genre } from '@/lib/types';

const genreLinks = GENRES.slice(0, 6) as Genre[];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[var(--surface)] border-b border-[var(--border)] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top bar */}
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 font-bold text-[var(--accent)] hover:opacity-80 transition-opacity">
            <BookOpen size={20} strokeWidth={2} />
            <span className="font-[family-name:var(--font-playfair)] text-lg tracking-tight">
              BookReleaseRadar
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            <Link
              href="/calendar"
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors',
                pathname === '/calendar'
                  ? 'bg-[var(--accent-light)] text-[var(--accent)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-raised)]'
              )}
            >
              <Calendar size={15} />
              Calendar
            </Link>
            <Link
              href="/search"
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors',
                pathname === '/search'
                  ? 'bg-[var(--accent-light)] text-[var(--accent)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-raised)]'
              )}
            >
              <Search size={15} />
              Search
            </Link>
          </nav>
        </div>

        {/* Genre sub-nav */}
        <nav className="flex items-center gap-1 pb-2 overflow-x-auto scrollbar-none">
          <Link
            href="/"
            className={cn(
              'shrink-0 px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-colors',
              pathname === '/'
                ? 'bg-[var(--accent)] text-[var(--accent-fg)]'
                : 'text-[var(--text-muted)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]'
            )}
          >
            All
          </Link>
          {genreLinks.map((genre) => (
            <Link
              key={genre}
              href={`/genre/${genre}`}
              className={cn(
                'shrink-0 px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-colors',
                pathname === `/genre/${genre}`
                  ? 'bg-[var(--accent)] text-[var(--accent-fg)]'
                  : 'text-[var(--text-muted)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]'
              )}
            >
              {GENRE_LABELS[genre]}
            </Link>
          ))}
          {(GENRES.slice(6) as Genre[]).map((genre) => (
            <Link
              key={genre}
              href={`/genre/${genre}`}
              className={cn(
                'shrink-0 px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-colors',
                pathname === `/genre/${genre}`
                  ? 'bg-[var(--accent)] text-[var(--accent-fg)]'
                  : 'text-[var(--text-muted)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]'
              )}
            >
              {GENRE_LABELS[genre]}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
