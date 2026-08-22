import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, BookOpen } from 'lucide-react';
import { RECOMMENDATIONS } from '@/lib/recommendations';
import NewsletterSignup from '@/components/NewsletterSignup';

export const revalidate = 2592000;

export const metadata: Metadata = {
  title: 'Books Like… — Reading Recommendations | BookReleaseRadar',
  description:
    "Find your next favorite series. Curated reading recommendations for fans of ACOTAR, Fourth Wing, Harry Potter, Twilight, Dune, Divergent, Maze Runner, Red Queen, Legend, The Selection, An Ember in the Ashes, Eragon, Vampire Academy, The Handmaid's Tale, Shadow and Bone, Game of Thrones, Colleen Hoover, Mistborn, Wheel of Time, and more.",
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
    'books like The Poppy War',
    'books like Dark Tower',
    'books like Harry Potter',
    'books like Shadow and Bone',
    'books like Twilight',
    "books like The Handmaid's Tale",
    'paranormal romance like Twilight',
    'books like Dune',
    'books like Divergent',
    'books like Eragon',
    'books like Vampire Academy',
    'books like Maze Runner',
    'books like Red Queen',
    'books like Legend Marie Lu',
    'books like The Selection Kiera Cass',
    'books like An Ember in the Ashes',
    'books like The Giver Lois Lowry',
    'books like Children of Blood and Bone',
    'books like Unwind Neal Shusterman',
    'books like Matched Ally Condie',
    'books like Three Dark Crowns Kendare Blake',
    'books like Warcross Marie Lu',
    'books like The Young Elites Marie Lu',
    'books like Delirium Lauren Oliver',
    'books like The Lies of Locke Lamora',
    'books like The Night Circus Erin Morgenstern',
    'books like City of Brass Daevabad',
    'books like Priory of the Orange Tree',
    'feminist dystopia books',
    'dragon fantasy books',
    'YA dystopia books',
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
    {
      '@type': 'Question',
      name: 'What books are like Twilight?',
      acceptedAnswer: { '@type': 'Answer', text: 'Books like Twilight include The Vampire Diaries by L.J. Smith, A Court of Thorns and Roses by Sarah J. Maas, Hush, Hush by Becca Fitzpatrick, Shiver by Maggie Stiefvater, and Shadowhunters: City of Bones by Cassandra Clare. Our full Twilight guide has 8 paranormal romance picks.' },
    },
    {
      '@type': 'Question',
      name: "What should I read if I liked The Handmaid's Tale?",
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Handmaid's Tale include The Testaments by Margaret Atwood (the sequel), Vox by Christina Dalcher, The Power by Naomi Alderman, Parable of the Sower by Octavia Butler, and Mexican Gothic by Silvia Moreno-Garcia. Our full guide covers 8 feminist dystopia and literary fiction picks." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Dune?',
      acceptedAnswer: { '@type': 'Answer', text: 'Books like Dune include A Memory Called Empire by Arkady Martine, Hyperion by Dan Simmons, Foundation by Isaac Asimov, and The Left Hand of Darkness by Ursula K. Le Guin. Our full Dune guide covers 8 picks for fans of political intrigue, ecology, and epic world-building.' },
    },
    {
      '@type': 'Question',
      name: 'What books are similar to Divergent?',
      acceptedAnswer: { '@type': 'Answer', text: 'Books like Divergent include The Hunger Games by Suzanne Collins, The Maze Runner by James Dashner, Legend by Marie Lu, Red Queen by Victoria Aveyard, and Scythe by Neal Shusterman. Our full Divergent guide has 8 YA dystopia picks.' },
    },
    {
      '@type': 'Question',
      name: 'What should I read after Eragon?',
      acceptedAnswer: { '@type': 'Answer', text: 'After Eragon, fans love Fourth Wing by Rebecca Yarros, Temeraire by Naomi Novik, The Name of the Wind by Patrick Rothfuss, and The Stormlight Archive by Brandon Sanderson. Our full Eragon guide covers 8 dragon fantasy picks.' },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Maze Runner?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Maze Runner include The Hunger Games by Suzanne Collins, Divergent by Veronica Roth, Ender's Game by Orson Scott Card, Legend by Marie Lu, and Unwind by Neal Shusterman. Our full Maze Runner guide covers 8 survival dystopia picks." },
    },
    {
      '@type': 'Question',
      name: 'What books are similar to Red Queen?',
      acceptedAnswer: { '@type': 'Answer', text: 'Books like Red Queen include An Ember in the Ashes by Sabaa Tahir, Shadow and Bone by Leigh Bardugo, The Hunger Games by Suzanne Collins, Three Dark Crowns by Kendare Blake, and Shatter Me by Tahereh Mafi. Our full Red Queen guide has 8 picks for fans of class war and court intrigue.' },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Legend by Marie Lu?',
      acceptedAnswer: { '@type': 'Answer', text: 'Books like Legend by Marie Lu include The Hunger Games by Suzanne Collins, Red Queen by Victoria Aveyard, Divergent by Veronica Roth, An Ember in the Ashes by Sabaa Tahir, and Warcross by Marie Lu herself. Our full Legend guide covers 8 picks for fans of dual-POV YA dystopia.' },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Selection by Kiera Cass?',
      acceptedAnswer: { '@type': 'Answer', text: 'Books like The Selection include Red Queen by Victoria Aveyard, The Hunger Games by Suzanne Collins, Matched by Ally Condie, An Ember in the Ashes by Sabaa Tahir, and Shatter Me by Tahereh Mafi. Our full Selection guide has 8 picks for fans of competition romance and dystopian courts.' },
    },
    {
      '@type': 'Question',
      name: 'What should I read after An Ember in the Ashes?',
      acceptedAnswer: { '@type': 'Answer', text: 'After An Ember in the Ashes, readers love Red Queen by Victoria Aveyard, Shadow and Bone by Leigh Bardugo, Six of Crows by Leigh Bardugo, Children of Blood and Bone by Tomi Adeyemi, and The Cruel Prince by Holly Black. Our full Ember in the Ashes guide covers 8 picks.' },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Night Circus?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Night Circus include The Starless Sea by Erin Morgenstern (her own second novel), Jonathan Strange & Mr Norrell by Susanna Clarke, Piranesi by Susanna Clarke, The Name of the Wind by Patrick Rothfuss, and Caraval by Stephanie Garber. Our full Night Circus guide covers 8 atmospheric fantasy picks." },
    },
    {
      '@type': 'Question',
      name: 'What should I read after The City of Brass?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The City of Brass include The Poppy War by R.F. Kuang, Children of Blood and Bone by Tomi Adeyemi, An Ember in the Ashes by Sabaa Tahir, A Memory Called Empire by Arkady Martine, and The Priory of the Orange Tree by Samantha Shannon. Our full Daevabad guide has 8 picks for fans of non-Western mythology fantasy." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Priory of the Orange Tree?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Priory of the Orange Tree include A Memory Called Empire by Arkady Martine, The Bear and the Nightingale by Katherine Arden, The City of Brass by S.A. Chakraborty, The Way of Kings by Brandon Sanderson, and Fourth Wing by Rebecca Yarros. Our full Priory guide covers 8 epic fantasy picks for fans of dragons, queens, and multi-civilization world-building." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Young Elites?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Young Elites include Legend and Warcross (also by Marie Lu), The Cruel Prince by Holly Black, Shadow and Bone by Leigh Bardugo, Red Queen by Victoria Aveyard, and An Ember in the Ashes by Sabaa Tahir. Our full Young Elites guide covers 8 picks for fans of dark fantasy with villain protagonists." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Delirium?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Delirium by Lauren Oliver include Matched by Ally Condie, The Hunger Games, Divergent, The Giver, Shatter Me by Tahereh Mafi, and Wither by Lauren DeStefano. Our full Delirium guide covers 8 picks for fans of dystopian romance with controlled-emotion societies." },
    },
    {
      '@type': 'Question',
      name: 'What should I read after The Lies of Locke Lamora?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like The Lies of Locke Lamora include The Name of the Wind by Patrick Rothfuss, Six of Crows by Leigh Bardugo, The Blade Itself by Joe Abercrombie, Mistborn by Brandon Sanderson, and The Night Circus by Erin Morgenstern. Our full Gentleman Bastard guide covers 8 heist fantasy picks." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Matched?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Matched by Ally Condie include Delirium by Lauren Oliver, The Selection by Kiera Cass, The Giver by Lois Lowry, Divergent by Veronica Roth, and The Hunger Games by Suzanne Collins. Our full Matched guide covers 8 picks for fans of dystopian romance and controlled societies." },
    },
    {
      '@type': 'Question',
      name: 'What should I read after Three Dark Crowns?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Three Dark Crowns include Red Queen by Victoria Aveyard, An Ember in the Ashes by Sabaa Tahir, The Cruel Prince by Holly Black, Shadow and Bone by Leigh Bardugo, and Children of Blood and Bone by Tomi Adeyemi. Our full Three Dark Crowns guide has 8 dark fantasy picks for fans of lethal queens and court intrigue." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Warcross?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Warcross by Marie Lu include Legend (also by Marie Lu), The Hunger Games, Ready Player One, Ender's Game, Red Queen, and The Young Elites. Our full Warcross guide covers 8 picks for fans of high-stakes VR competition and morally complex romance." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked Unwind?',
      acceptedAnswer: { '@type': 'Answer', text: "Books like Unwind include The Hunger Games by Suzanne Collins, Scythe by Neal Shusterman (also by Shusterman), The Maze Runner by James Dashner, Divergent by Veronica Roth, and The House of the Scorpion by Nancy Farmer. Our full Unwind guide covers 8 picks for fans of dark body-horror dystopia." },
    },
    {
      '@type': 'Question',
      name: 'What should I read if I liked The Giver?',
      acceptedAnswer: { '@type': 'Answer', text: 'Books like The Giver include Scythe by Neal Shusterman, Matched by Ally Condie, Divergent by Veronica Roth, The Hunger Games by Suzanne Collins, Brave New World by Aldous Huxley, and 1984 by George Orwell. Our full Giver guide covers 8 picks for fans of philosophical dystopias.' },
    },
    {
      '@type': 'Question',
      name: 'What should I read after Children of Blood and Bone?',
      acceptedAnswer: { '@type': 'Answer', text: 'Books like Children of Blood and Bone include An Ember in the Ashes by Sabaa Tahir, The Poppy War by R.F. Kuang, Shadow and Bone by Leigh Bardugo, The City of Brass by S.A. Chakraborty, and The Rage of Dragons by Evan Winter. Our full guide covers 8 picks for fans of diverse fantasy worlds.' },
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

      <NewsletterSignup />
    </>
  );
}
