'use client';
import { useState, useEffect, useRef, useTransition } from 'react';
import { Search, X } from 'lucide-react';
import BookGrid from '@/components/BookGrid';
import type { Book } from '@/lib/types';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Book[]>([]);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      return;
    }

    const id = setTimeout(() => {
      startTransition(async () => {
        const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.books ?? []);
        }
      });
    }, 300);

    return () => clearTimeout(id);
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <p className="text-xs font-bold tracking-widest uppercase text-[var(--gold)] mb-2">Find</p>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl text-[var(--text)] mb-6">
          Search Books
        </h1>

        <div className="relative max-w-xl">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-faint)] pointer-events-none"
          />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, author, or genre…"
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--text-faint)] focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-colors text-sm"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-faint)] hover:text-[var(--text)] transition-colors"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {isPending && (
        <div className="text-sm text-[var(--text-muted)] mb-4">Searching…</div>
      )}

      {!isPending && query.trim().length >= 2 && (
        <div className="mb-4 text-sm text-[var(--text-muted)]">
          {results.length > 0
            ? `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`
            : `No results for "${query}"`}
        </div>
      )}

      {query.trim().length < 2 && !isPending && (
        <div className="py-16 text-center text-[var(--text-muted)]">
          <Search size={40} className="mx-auto mb-4 opacity-20" />
          <p className="font-[family-name:var(--font-playfair)] text-xl mb-1">Search the catalog</p>
          <p className="text-sm">Type at least 2 characters to search titles, authors, and descriptions.</p>
        </div>
      )}

      {results.length > 0 && (
        <BookGrid books={results} />
      )}
    </div>
  );
}
