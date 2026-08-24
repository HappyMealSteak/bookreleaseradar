import type { Metadata } from 'next';
import { Suspense } from 'react';
import SearchContent from './SearchContent';
import NewsletterSignup from '@/components/NewsletterSignup';

export const metadata: Metadata = {
  title: 'Search Upcoming Book Releases | BookReleaseRadar',
  description: 'Search upcoming and new book releases by title, author, or genre. Find release dates, pre-order links, and reading orders for fantasy, romance, thriller, sci-fi, and more.',
  keywords: [
    'search book releases',
    'find upcoming books',
    'book release dates',
    'search books by author',
    'upcoming fantasy books',
    'upcoming romance books',
    'book search',
  ],
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest uppercase text-[var(--gold)] mb-2">Find</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl text-[var(--text)] mb-6">
            Search Books
          </h1>
          <Suspense>
            <SearchContent />
          </Suspense>
        </div>
      </div>

      <NewsletterSignup />
    </>
  );
}
