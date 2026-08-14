export interface ReadingOrderBook {
  title: string;
  author: string;
  year: number | string;
  note?: string;
  isUpcoming?: boolean;
  isOptional?: boolean;
}

export interface SeriesReadingOrder {
  slug: string;
  intro: string;
  startWith: string;
  books: ReadingOrderBook[];
  faq: Array<{ q: string; a: string }>;
}

function amazonSearchUrl(title: string, author: string): string {
  const tag = 'bookreleaseradar-20';
  const q = encodeURIComponent(`${title} ${author}`);
  return `https://www.amazon.com/s?k=${q}&i=stripbooks&tag=${tag}`;
}

export function getReadingOrderBooksWithUrls(order: SeriesReadingOrder) {
  return order.books.map((b) => ({
    ...b,
    amazonUrl: amazonSearchUrl(b.title, b.author),
  }));
}

const READING_ORDERS: SeriesReadingOrder[] = [
  {
    slug: 'acotar',
    intro:
      "The A Court of Thorns and Roses (ACOTAR) series by Sarah J. Maas follows mortal huntress Feyre Archeron into a dangerous world of fae, forbidden magic, and epic romance. Here's the complete ACOTAR reading order so you don't miss a single installment.",
    startWith:
      "Start with A Court of Thorns and Roses, which introduces Feyre and the fae world of Prythian. The series is best read in order — each book builds directly on the last.",
    books: [
      { title: 'A Court of Thorns and Roses', author: 'Sarah J. Maas', year: 2015, note: 'Book 1 — start here' },
      { title: 'A Court of Mist and Fury', author: 'Sarah J. Maas', year: 2016, note: 'Book 2' },
      { title: 'A Court of Wings and Ruin', author: 'Sarah J. Maas', year: 2017, note: 'Book 3 — concludes Feyre\'s arc' },
      { title: 'A Court of Frost and Starlight', author: 'Sarah J. Maas', year: 2018, note: 'Book 3.5 — novella bridge', isOptional: true },
      { title: 'A Court of Silver Flames', author: 'Sarah J. Maas', year: 2021, note: 'Book 4 — Nesta\'s story' },
    ],
    faq: [
      { q: 'Where should I start ACOTAR?', a: 'Start with A Court of Thorns and Roses (Book 1). The series must be read in order as each book picks up where the last ended.' },
      { q: 'How many ACOTAR books are there?', a: 'There are currently 5 books in the ACOTAR series: the original trilogy (Books 1–3), a novella (A Court of Frost and Starlight), and A Court of Silver Flames. Sarah J. Maas has indicated more books are planned.' },
      { q: 'Can I read ACOTAR without reading Throne of Glass?', a: 'Yes — ACOTAR and Throne of Glass are set in different worlds and can be read independently. Crescent City intersects with both in later books, but ACOTAR stands completely on its own.' },
      { q: 'Is A Court of Frost and Starlight required?', a: "It's a short novella (companion novella) set between Books 3 and 4. It adds context but Book 4 can be read without it. Recommended if you want the full experience." },
    ],
  },
  {
    slug: 'throne-of-glass',
    intro:
      "The Throne of Glass (ToG) series by Sarah J. Maas follows assassin Celaena Sardothien through eight books of epic fantasy spanning kingdoms, magic, and war. Here's the definitive Throne of Glass reading order.",
    startWith:
      "Start with Throne of Glass (Book 1). The Assassin's Blade novellas are set before the main series — you can read them first or after Book 1.",
    books: [
      { title: "The Assassin's Blade", author: 'Sarah J. Maas', year: 2014, note: 'Prequel novellas — read before or after Book 1', isOptional: true },
      { title: 'Throne of Glass', author: 'Sarah J. Maas', year: 2012, note: 'Book 1 — start here' },
      { title: 'Crown of Midnight', author: 'Sarah J. Maas', year: 2013, note: 'Book 2' },
      { title: 'Heir of Fire', author: 'Sarah J. Maas', year: 2014, note: 'Book 3' },
      { title: 'Queen of Shadows', author: 'Sarah J. Maas', year: 2015, note: 'Book 4' },
      { title: 'Empire of Storms', author: 'Sarah J. Maas', year: 2016, note: 'Book 5' },
      { title: 'Tower of Dawn', author: 'Sarah J. Maas', year: 2017, note: 'Book 6 — set concurrently with Book 5' },
      { title: 'Kingdom of the Wicked', author: 'Sarah J. Maas', year: 2018, note: 'Book 7 — series finale' },
    ],
    faq: [
      { q: 'How many Throne of Glass books are there?', a: "There are 8 total: The Assassin's Blade (prequel novellas), Books 1–7, plus bonus content. The main series concludes with Kingdom of the Wicked." },
      { q: 'Should I read Tower of Dawn before Kingdom of the Wicked?', a: 'Yes. Tower of Dawn happens simultaneously with Empire of Storms (Book 5) and contains events critical to understanding Kingdom of the Wicked. Read it before the finale.' },
      { q: "Do I need to read Throne of Glass before ACOTAR?", a: "No — ACOTAR is a standalone series set in a different world. They're written by the same author but can be read in either order." },
    ],
  },
  {
    slug: 'crescent-city',
    intro:
      "The Crescent City series by Sarah J. Maas is set in the gleaming, neon-lit city of Lunathion where humans, fae, and shifters coexist uneasily. Here's the complete Crescent City reading order.",
    startWith:
      "Start with House of Earth and Blood — it's a standalone entry point with a complete story arc before the series expands in Book 2.",
    books: [
      { title: 'House of Earth and Blood', author: 'Sarah J. Maas', year: 2020, note: 'Book 1 — start here' },
      { title: 'House of Sky and Breath', author: 'Sarah J. Maas', year: 2022, note: 'Book 2 — connects to ACOTAR and ToG universes' },
      { title: 'House of Flame and Shadow', author: 'Sarah J. Maas', year: 2024, note: 'Book 3' },
    ],
    faq: [
      { q: 'Do I need to read ACOTAR before Crescent City?', a: 'No — House of Earth and Blood can be read cold. However, Book 2 (House of Sky and Breath) includes crossover characters from ACOTAR and Throne of Glass, so reading those first enriches the experience.' },
      { q: 'Is Crescent City finished?', a: 'House of Flame and Shadow (Book 3, 2024) continues the story. Sarah J. Maas has confirmed more books are planned for the series.' },
    ],
  },
  {
    slug: 'a-song-of-ice-and-fire',
    intro:
      "A Song of Ice and Fire (the books behind HBO's Game of Thrones) is George R.R. Martin's epic fantasy masterwork. Here's the complete GoT reading order — including the long-awaited upcoming installments.",
    startWith:
      "Start with A Game of Thrones. The series must be read in order — each book follows directly from the last across a sprawling cast of characters.",
    books: [
      { title: 'A Game of Thrones', author: 'George R.R. Martin', year: 1996, note: 'Book 1 — start here' },
      { title: 'A Clash of Kings', author: 'George R.R. Martin', year: 1998, note: 'Book 2' },
      { title: 'A Storm of Swords', author: 'George R.R. Martin', year: 2000, note: 'Book 3' },
      { title: 'A Feast for Crows', author: 'George R.R. Martin', year: 2005, note: 'Book 4' },
      { title: 'A Dance with Dragons', author: 'George R.R. Martin', year: 2011, note: 'Book 5' },
      { title: 'The Winds of Winter', author: 'George R.R. Martin', year: 'TBA', note: 'Book 6 — forthcoming', isUpcoming: true },
      { title: 'A Dream of Spring', author: 'George R.R. Martin', year: 'TBA', note: 'Book 7 — planned finale', isUpcoming: true },
      { title: 'Fire & Blood', author: 'George R.R. Martin', year: 2018, note: 'Companion — Targaryen history (basis for House of the Dragon)', isOptional: true },
      { title: 'The World of Ice & Fire', author: 'George R.R. Martin', year: 2014, note: 'Companion — world history reference', isOptional: true },
    ],
    faq: [
      { q: 'When will The Winds of Winter be released?', a: 'George R.R. Martin has not announced an official release date for The Winds of Winter (Book 6). It has been in progress since 2011. Updates appear on his blog at georgerrmartin.com.' },
      { q: 'Should I read A Feast for Crows and A Dance with Dragons together?', a: 'Books 4 and 5 cover the same time period with different POV characters. Many fans recommend reading them in a combined reading order that interleaves chapters — search for the "combined A Feast for Crows / A Dance with Dragons" reading order online.' },
      { q: 'Do I need to read the books if I watched Game of Thrones?', a: 'The show and books diverge significantly from Season 5 onward. The books contain vastly more detail, subplot, and characters — they\'re a different experience even for show fans.' },
    ],
  },
  {
    slug: 'fourth-wing',
    intro:
      "The Empyrean series by Rebecca Yarros launched with Fourth Wing and became a global publishing phenomenon. Here's the complete Fourth Wing / Empyrean reading order, including upcoming books.",
    startWith:
      "Start with Fourth Wing — it's the series opener and perfectly sets up the dragon-riding academy world, the magic system, and Violet and Xaden's relationship.",
    books: [
      { title: 'Fourth Wing', author: 'Rebecca Yarros', year: 2023, note: 'Book 1 — start here' },
      { title: 'Iron Flame', author: 'Rebecca Yarros', year: 2023, note: 'Book 2' },
      { title: 'Onyx Storm', author: 'Rebecca Yarros', year: 2025, note: 'Book 3' },
      { title: 'Empyrean Book 4', author: 'Rebecca Yarros', year: 'TBA', note: 'Book 4 — forthcoming', isUpcoming: true },
      { title: 'Empyrean Book 5', author: 'Rebecca Yarros', year: 'TBA', note: 'Book 5 — planned finale', isUpcoming: true },
    ],
    faq: [
      { q: 'How many books will be in the Empyrean series?', a: 'Rebecca Yarros has confirmed the Empyrean series will be 5 books. Fourth Wing (1), Iron Flame (2), and Onyx Storm (3) are out. Books 4 and 5 are forthcoming.' },
      { q: 'Do I need to read Iron Flame before Onyx Storm?', a: "Yes — the Empyrean series must be read in order. The overarching plot and character arcs build directly on each previous book, and cliffhangers connect them." },
      { q: 'Is Fourth Wing a romance or fantasy?', a: 'Both. Fourth Wing is classified as romantasy — a blend of epic fantasy (dragon riders, magic, war) and romance. The series has a strong romantic storyline alongside its fantasy world-building.' },
    ],
  },
  {
    slug: 'colleen-hoover',
    intro:
      "Colleen Hoover (CoHo) writes emotionally gripping contemporary romance and new adult fiction that dominates bestseller lists. Since her books are mostly standalones, there's no strict reading order — but here's where to start based on what you're looking for.",
    startWith:
      "New to Colleen Hoover? Start with Ugly Love or It Ends with Us — these are her most beloved books and both work perfectly as entry points with no prior reading required.",
    books: [
      { title: 'Ugly Love', author: 'Colleen Hoover', year: 2014, note: 'Most recommended starting point' },
      { title: 'It Ends with Us', author: 'Colleen Hoover', year: 2016, note: '#1 bestseller — essential CoHo' },
      { title: 'It Starts with Us', author: 'Colleen Hoover', year: 2022, note: 'Sequel to It Ends with Us — read after' },
      { title: 'Verity', author: 'Colleen Hoover', year: 2018, note: 'Psychological thriller — very different from her romances' },
      { title: 'Reminders of Him', author: 'Colleen Hoover', year: 2022, note: 'BookTok favorite' },
      { title: 'November 9', author: 'Colleen Hoover', year: 2015, note: 'Standalone' },
      { title: 'Confess', author: 'Colleen Hoover', year: 2015, note: 'Standalone' },
      { title: 'Hopeless', author: 'Colleen Hoover', year: 2012, note: 'Book 1 of Hopeless series' },
      { title: 'Losing Hope', author: 'Colleen Hoover', year: 2013, note: 'Hopeless told from his POV', isOptional: true },
      { title: 'All Your Perfects', author: 'Colleen Hoover', year: 2018, note: 'Standalone — connected to Maybe Someday' },
    ],
    faq: [
      { q: 'Where should I start with Colleen Hoover?', a: "Start with Ugly Love or It Ends with Us — these are her most acclaimed books and both work as perfect entry points. If you want to try her thriller side first, read Verity." },
      { q: 'Are Colleen Hoover books connected?', a: "Most CoHo books are standalones, but a few are connected: It Ends with Us and It Starts with Us must be read in order. The Slammed trilogy (Slammed, Point of Retreat, This Girl) should also be read in order. All other books are fully standalone." },
      { q: 'How many books has Colleen Hoover written?', a: 'Colleen Hoover has written over 20 novels and novellas, primarily in contemporary romance and new adult fiction. She continues to release new books regularly.' },
    ],
  },
  {
    slug: 'wheel-of-time',
    intro:
      "The Wheel of Time by Robert Jordan (completed by Brandon Sanderson) is one of the greatest epic fantasy series ever written — 14 main books plus a prequel across a richly detailed world. Here's the complete Wheel of Time reading order.",
    startWith:
      "Start with The Eye of the World (Book 1). Alternatively, the prequel novella New Spring can be read after the main series — it works better with context.",
    books: [
      { title: 'New Spring', author: 'Robert Jordan', year: 2004, note: 'Prequel novella — best read after Book 6', isOptional: true },
      { title: 'The Eye of the World', author: 'Robert Jordan', year: 1990, note: 'Book 1 — start here' },
      { title: 'The Great Hunt', author: 'Robert Jordan', year: 1990, note: 'Book 2' },
      { title: 'The Dragon Reborn', author: 'Robert Jordan', year: 1991, note: 'Book 3' },
      { title: 'The Shadow Rising', author: 'Robert Jordan', year: 1992, note: 'Book 4' },
      { title: 'The Fires of Heaven', author: 'Robert Jordan', year: 1993, note: 'Book 5' },
      { title: 'Lord of Chaos', author: 'Robert Jordan', year: 1994, note: 'Book 6' },
      { title: 'A Crown of Swords', author: 'Robert Jordan', year: 1996, note: 'Book 7' },
      { title: 'The Path of Daggers', author: 'Robert Jordan', year: 1998, note: 'Book 8' },
      { title: "Winter's Heart", author: 'Robert Jordan', year: 2000, note: 'Book 9' },
      { title: 'Crossroads of Twilight', author: 'Robert Jordan', year: 2003, note: 'Book 10' },
      { title: 'Knife of Dreams', author: 'Robert Jordan', year: 2005, note: 'Book 11 — last Robert Jordan wrote before his passing' },
      { title: 'The Gathering Storm', author: 'Robert Jordan & Brandon Sanderson', year: 2009, note: 'Book 12 — completed by Brandon Sanderson' },
      { title: 'Towers of Midnight', author: 'Robert Jordan & Brandon Sanderson', year: 2010, note: 'Book 13' },
      { title: 'A Memory of Light', author: 'Robert Jordan & Brandon Sanderson', year: 2013, note: 'Book 14 — series finale' },
    ],
    faq: [
      { q: 'How long does it take to read the Wheel of Time?', a: "The Wheel of Time is approximately 4.4 million words across 14 books — one of the longest fantasy series ever written. Most readers take 6–18 months to complete the full series." },
      { q: 'Is the TV show a good substitute for the books?', a: "The Amazon Prime series captures the broad strokes but compresses and changes many storylines. The books contain far more depth, characters, and world-building. Most fans recommend the books for the complete experience." },
      { q: 'Are Books 8–10 as slow as people say?', a: "Books 8–10 are considered the pacing dip of the series, often called the 'slog.' Many fans recommend powering through — the story accelerates dramatically from Book 11 onward, and the final three books (by Brandon Sanderson) are considered among the best in the series." },
    ],
  },
  {
    slug: 'mistborn',
    intro:
      "Mistborn is Brandon Sanderson's beloved fantasy series spanning multiple eras in a world where ash falls from the sky and mists rule the night. Here's the complete Mistborn reading order, including the upcoming Era 3.",
    startWith:
      "Start with Mistborn: The Final Empire (Era 1, Book 1). Each era can technically stand alone, but they connect in the broader Cosmere universe — read Era 1 first for the best experience.",
    books: [
      { title: 'Mistborn: The Final Empire', author: 'Brandon Sanderson', year: 2006, note: 'Era 1, Book 1 — start here' },
      { title: 'The Well of Ascension', author: 'Brandon Sanderson', year: 2007, note: 'Era 1, Book 2' },
      { title: 'The Hero of Ages', author: 'Brandon Sanderson', year: 2008, note: 'Era 1, Book 3 — concludes Era 1' },
      { title: 'The Alloy of Law', author: 'Brandon Sanderson', year: 2011, note: 'Era 2, Book 1 — set 300 years later' },
      { title: 'Shadows of Self', author: 'Brandon Sanderson', year: 2015, note: 'Era 2, Book 2' },
      { title: 'The Bands of Mourning', author: 'Brandon Sanderson', year: 2016, note: 'Era 2, Book 3' },
      { title: 'The Lost Metal', author: 'Brandon Sanderson', year: 2022, note: 'Era 2, Book 4 — concludes Era 2' },
      { title: 'Mistborn Era 3 Book 1', author: 'Brandon Sanderson', year: 'TBA', note: 'Era 3 — forthcoming, set in a modern industrial world', isUpcoming: true },
    ],
    faq: [
      { q: 'Do I need to read Mistborn Era 1 before Era 2?', a: "Era 2 (Wax & Wayne) is set 300 years after Era 1 and spoils major Era 1 plot points. Read Era 1 first for the best experience and to understand the Allomancy magic system." },
      { q: 'Is Mistborn part of the Cosmere?', a: "Yes — Mistborn is one of the core series in Brandon Sanderson's Cosmere, a shared universe of interconnected fantasy worlds. You can read Mistborn without reading other Cosmere books, but fans who read the full Cosmere will notice connections." },
      { q: 'When is Mistborn Era 3 coming?', a: 'Brandon Sanderson has confirmed Era 3 will be set in a modern/industrial world. No official release date has been announced. Follow Brandon Sanderson\'s website for updates.' },
    ],
  },
  {
    slug: 'stormlight-archive',
    intro:
      "The Stormlight Archive is Brandon Sanderson's masterwork — a 10-book epic fantasy series set on the storm-wracked world of Roshar. Here's the complete Stormlight Archive reading order, including companion novellas.",
    startWith:
      "Start with The Way of Kings (Book 1). The Stormlight Archive rewards readers who pay attention — it's a rich, complex series best experienced from the beginning.",
    books: [
      { title: 'The Way of Kings', author: 'Brandon Sanderson', year: 2010, note: 'Book 1 — start here' },
      { title: 'Words of Radiance', author: 'Brandon Sanderson', year: 2014, note: 'Book 2' },
      { title: 'Edgedancer', author: 'Brandon Sanderson', year: 2016, note: 'Novella — read after Book 2', isOptional: true },
      { title: 'Oathbringer', author: 'Brandon Sanderson', year: 2017, note: 'Book 3' },
      { title: 'Dawnshard', author: 'Brandon Sanderson', year: 2020, note: 'Novella — read before Book 4', isOptional: true },
      { title: 'Rhythm of War', author: 'Brandon Sanderson', year: 2020, note: 'Book 4' },
      { title: 'Wind and Truth', author: 'Brandon Sanderson', year: 2024, note: 'Book 5 — concludes Arc 1' },
      { title: 'Stormlight Archive Book 6', author: 'Brandon Sanderson', year: 'TBA', note: 'Book 6 — begins Arc 2, new protagonist focus', isUpcoming: true },
    ],
    faq: [
      { q: 'How long are the Stormlight Archive books?', a: "The Way of Kings is approximately 1,000 pages. All main Stormlight books are similarly long — they're among the longest individual fantasy novels ever published. Plan on 30–50 hours per book." },
      { q: 'Do the Stormlight novellas (Edgedancer, Dawnshard) matter?', a: "Edgedancer and Dawnshard are companion novellas that expand the world and develop side characters. They're not strictly required but enhance the experience significantly — both are short reads." },
      { q: 'Is The Stormlight Archive connected to Mistborn?', a: "Yes — both are part of Brandon Sanderson's Cosmere universe. Stormlight and Mistborn share a larger mythology and some recurring characters. The connection becomes more significant in later books." },
    ],
  },
  {
    slug: 'hunger-games',
    intro:
      "The Hunger Games by Suzanne Collins is the defining dystopian YA series, set in the nation of Panem where children fight to the death in televised games. Here's the complete Hunger Games reading order, including the prequel.",
    startWith:
      "Start with The Hunger Games (Book 1). The trilogy is best read in order — each book escalates the stakes and the story's emotional and political themes.",
    books: [
      { title: 'The Hunger Games', author: 'Suzanne Collins', year: 2008, note: 'Book 1 — start here' },
      { title: 'Catching Fire', author: 'Suzanne Collins', year: 2009, note: 'Book 2' },
      { title: 'Mockingjay', author: 'Suzanne Collins', year: 2010, note: 'Book 3 — trilogy finale' },
      { title: 'The Ballad of Songbirds and Snakes', author: 'Suzanne Collins', year: 2020, note: 'Prequel — set 64 years before the original trilogy' },
    ],
    faq: [
      { q: 'Should I read The Ballad of Songbirds and Snakes before or after the trilogy?', a: "Read the original trilogy first (Books 1–3). The Ballad of Songbirds and Snakes is a prequel but it spoils elements of the main trilogy and is best appreciated with that context." },
      { q: 'Is there a sequel to The Hunger Games after Mockingjay?', a: "The Ballad of Songbirds and Snakes (2020) is the only additional book so far. Suzanne Collins has not announced further sequels to the main trilogy." },
      { q: 'How does the Hunger Games trilogy compare to the movies?', a: "The books are generally considered richer in detail, especially for Katniss's internal thoughts and the political commentary. The first two films are close adaptations; Mockingjay's split into two films dilutes the pacing." },
    ],
  },
];

export function getReadingOrder(slug: string): SeriesReadingOrder | undefined {
  return READING_ORDERS.find((r) => r.slug === slug);
}

export const ALL_READING_ORDER_SLUGS = READING_ORDERS.map((r) => r.slug);
