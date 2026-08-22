import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, BookOpen } from 'lucide-react';
import { RECOMMENDATIONS } from '@/lib/recommendations';

export const revalidate = 2592000;

export const metadata: Metadata = {
  title: 'Books Like… — Reading Recommendations | BookReleaseRadar',
  description:
    'Find your next favorite series. Curated reading recommendations for fans of ACOTAR, Fourth Wing, Harry Potter, Shadow and Bone, Game of Thrones, Colleen Hoover, Mistborn, Wheel of Time, and more.',
  keywords: [
    'books like ACOTAR',
    'books like Fourth Wing',
    'books like Colleen Hoover',
    'books like Game of Thrones',
    'books like Mistborn',
    'books like Wheel of Time',
    'books like Hunger Games',
    'books like Six of Crows',
    'books like Shadowhunters',
    'books like Percy Jackson',
    'books like Outlander',
    'books like Emily Henry',
    'books like Taylor Jenkins Reid',
    'books like Red Rising',
    'books like Bridgerton',
    'books like Blood and Ash',
    'books like Inheritance Games',
    'books like Kingkiller Chronicle',
    'books like Shatter Me',
    'books like The Atlas Six',
    'books like Hunger Games',
    'books like Wheel of Time',
    'books like The Poppy War',
    'books like Dark Tower',
    'books like Harry Potter',
    'books like Shadow and Bone',
    'books like Grishaverse',
    'reading recommendations',
    'what to read next',
    'book recommendations fantasy romance',
  ],
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bookreleaseradar.com' },
    { '@type': 'ListItem', position: 2, name: 'Books Like…', item: 'https://bookreleaseradar.com/books-like' },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What should I read if I liked ACOTAR?',
      acceptedAnswer: { '@type': 'Answer', text: 'If you loved A Court of Thorns and Roses, try From Blood and Ash by Jennifer L. Armentrout, An Ember in the Ashes by Sabaa Tahir, The Cruel Prince by Holly Black, or Shadow and Bone by Leigh Bardugo. Our full guide covers 8 picks with reasons why ACOTAR fans love each one.' },
    },
    {
      '@type': 'Question',
      name: 'What books are similar to Fourth Wing?',
      acceptedAnswer: { '@type': 'Answer', text: 'Books similar to Fourth Wing include From Blood and Ash, A Court of Thorns and Roses, An Ember in the Ashes, and The Name of the Wind. Visit our Fourth Wing reading recommendations page for 8 detailed picks.' },
    },
    {
      '@type': 'Question',
      name: 'What should I read after finishing a Colleen Hoover book?',
      acceptedAnswer: { '@type': 'Answer', text: 'After reading Colleen Hoover, fans often love Taylor Jenkins Reid, Emily Henry, and Tarryn Fisher. Visit our Books Like Colleen Hoover page for 8 curated picks with descriptions.' },
    },
    {
      '@type': 'Question',
      name: 'What should I read next after Game of Thrones?',
      acceptedAnswer: { '@type': 'Answer', text: 'After Game of Thrones, readers typically love The Name of the Wind by Patrick Rothfuss, The Way of Kings by Brandon Sanderson, The Lies of Locke Lamora by Scott Lynch, and Pillars of the Earth by Ken Follett. See our full Game of Thrones reading recommendations.' },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Harry Potter?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Harry Potter include The Name of the Wind by Patrick Rothfuss, Percy Jackson by Rick Riordan, The Magicians by Lev Grossman, Jonathan Strange & Mr Norrell by Susanna Clarke, and The Night Circus by Erin Morgenstern. Our full guide covers 8 picks for readers of all ages." },
    },
    {
      '@type': 'Question',
      name: 'What should I read after Shadow and Bone?',
      acceptedAnswer: { '@type': 'Answer', text: 'After Shadow and Bone, read Six of Crows (also by Leigh Bardugo in the same world), An Ember in the Ashes by Sabaa Tahir, The Cruel Prince by Holly Black, and The Bear and the Nightingale by Katherine Arden. Our full Grishaverse/Shadow and Bone guide covers 8 picks.' },
    },
  ],
};

export default function BooksLikeIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[var(--text-faint)] mb-6">
          <Link href="/" className="hover:text-[var(--accent)] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-[var(--text-muted)]">Books Like…</span>
        </nav>

        {/* Hero */}
        <div className="mb-10">
          <p className="text-xs font-bold tracking-widest uppercase text-[var(--gold)] mb-2">Reading Recommendations</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl text-[var(--text)] mb-3 leading-tight">
            Books Like Your Favorites
          </h1>
          <p className="text-[var(--text-muted)] text-sm max-w-2xl leading-relaxed">
            Finished a series and don't know what to read next? Each guide below gives you 8 hand-picked recommendations with reasons why fans of the original series love them.
          </p>
        </div>

        {/* Recommendation cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RECOMMENDATIONS.map((entry) => (
            <Link
              key={entry.slug}
              href={`/books-like/${entry.slug}`}
              className="group block p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)]/50 hover:bg-[var(--surface-raised)] transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-[var(--text-faint)] mb-1">If you liked</p>
                  <h2 className="font-[family-name:var(--font-playfair)] text-lg text-[var(--text)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                    {entry.sourceShortName ?? entry.sourceTitle}
                  </h2>
                  {entry.sourceShortName && (
                    <p className="text-xs text-[var(--text-faint)] mt-0.5 line-clamp-1">{entry.sourceTitle}</p>
                  )}
                </div>
                <BookOpen size={18} className="shrink-0 mt-1 text-[var(--accent)] opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-3 line-clamp-2">{entry.tagline}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-faint)]">{entry.recommendations.length} picks</span>
                <span className="text-xs font-semibold text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">View →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Browse series CTA */}
        <div className="mt-12 p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-[var(--text)] mb-1">Looking for a specific series?</p>
            <p className="text-sm text-[var(--text-muted)]">Browse all popular series pages for release dates, reading orders, and upcoming books.</p>
          </div>
          <Link
            href="/series"
            className="shrink-0 px-5 py-2.5 rounded-lg bg-[var(--accent)] text-[var(--accent-fg)] text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors whitespace-nowrap"
          >
            Browse All Series →
          </Link>
        </div>
      </div>
    </>
  );
}
