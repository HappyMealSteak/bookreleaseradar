'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Search, Calendar, Star, Library, TrendingUp, Heart, Flame } from 'lucide-react';
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

          <nav className="flex items-center gap-0.5 overflow-x-auto scrollbar-none">
            <Link
              href="/series"
              className={cn(
                'shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm transition-colors',
                pathname === '/series' || pathname.startsWith('/series/')
                  ? 'bg-[var(--accent-light)] text-[var(--accent)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-raised)]'
              )}
            >
              <Library size={14} />
              <span className="hidden sm:inline">Series</span>
            </Link>
            <Link
              href="/books-like"
              className={cn(
                'shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm transition-colors',
                pathname === '/books-like' || pathname.startsWith('/books-like/')
                  ? 'bg-[var(--accent-light)] text-[var(--accent)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-raised)]'
              )}
            >
              <Heart size={14} />
              <span className="hidden sm:inline">Books Like</span>
            </Link>
            <Link
              href="/new-releases"
              className={cn(
                'shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm transition-colors',
                pathname === '/new-releases'
                  ? 'bg-[var(--accent-light)] text-[var(--accent)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-raised)]'
              )}
            >
              <Flame size={14} />
              <span className="hidden sm:inline">New</span>
            </Link>
            <Link
              href="/trending"
              className={cn(
                'shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm transition-colors',
                pathname === '/trending'
                  ? 'bg-[var(--accent-light)] text-[var(--accent)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-raised)]'
              )}
            >
              <TrendingUp size={14} />
              <span className="hidden sm:inline">Trending</span>
            </Link>
            <Link
              href="/most-anticipated"
              className={cn(
                'shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm transition-colors',
                pathname === '/most-anticipated'
                  ? 'bg-[var(--accent-light)] text-[var(--accent)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-raised)]'
              )}
            >
              <Star size={14} />
              <span className="hidden md:inline">Anticipated</span>
            </Link>
            <Link
              href="/calendar"
              className={cn(
                'shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm transition-colors',
                pathname === '/calendar'
                  ? 'bg-[var(--accent-light)] text-[var(--accent)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-raised)]'
              )}
            >
              <Calendar size={14} />
              <span className="hidden md:inline">Calendar</span>
            </Link>
            <Link
              href="/search"
              className={cn(
                'shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm transition-colors',
                pathname === '/search'
                  ? 'bg-[var(--accent-light)] text-[var(--accent)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-raised)]'
              )}
            >
              <Search size={14} />
              <span className="hidden sm:inline">Search</span>
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
