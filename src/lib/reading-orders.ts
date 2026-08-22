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
      { title: 'A Court of Thorns and Roses 7', author: 'Sarah J. Maas', year: 2027, note: 'Book 6 — forthcoming, January 2027', isUpcoming: true },
    ],
    faq: [
      { q: 'Where should I start ACOTAR?', a: 'Start with A Court of Thorns and Roses (Book 1). The series must be read in order as each book picks up where the last ended.' },
      { q: 'How many ACOTAR books are there?', a: 'There are currently 5 published books in the ACOTAR series: the original trilogy (Books 1–3), a novella (A Court of Frost and Starlight), and A Court of Silver Flames. A new book is announced for January 2027.' },
      { q: 'Can I read ACOTAR without reading Throne of Glass?', a: 'Yes — ACOTAR and Throne of Glass are set in different worlds and can be read independently. Crescent City intersects with both in later books, but ACOTAR stands completely on its own.' },
      { q: 'Is A Court of Frost and Starlight required?', a: "It's a short novella (companion novella) set between Books 3 and 4. It adds context but Book 4 can be read without it. Recommended if you want the full experience." },
      { q: 'When is the next ACOTAR book coming out?', a: 'A new ACOTAR book titled "A Court of Thorns and Roses 7" is scheduled for release on January 12, 2027. Sarah J. Maas has not yet revealed the official English title.' },
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
    slug: 'six-of-crows',
    intro:
      "The Grishaverse by Leigh Bardugo spans a richly detailed world of soldiers, thieves, and magic. The Six of Crows duology is widely considered the crown jewel — but where you start depends on how much context you want. Here's the complete Grishaverse reading order.",
    startWith:
      "You can start with either the Shadow and Bone trilogy or Six of Crows. Six of Crows is the more popular entry point for adult readers — it stands alone well, and the heist premise is immediately gripping. Reading Shadow and Bone first gives richer Grishaverse context.",
    books: [
      { title: 'Shadow and Bone', author: 'Leigh Bardugo', year: 2012, note: 'Grisha Trilogy Book 1 — optional first entry point' },
      { title: 'Siege and Storm', author: 'Leigh Bardugo', year: 2013, note: 'Grisha Trilogy Book 2' },
      { title: 'Ruin and Rising', author: 'Leigh Bardugo', year: 2014, note: 'Grisha Trilogy Book 3' },
      { title: 'Six of Crows', author: 'Leigh Bardugo', year: 2015, note: 'Duology Book 1 — most popular entry point' },
      { title: 'Crooked Kingdom', author: 'Leigh Bardugo', year: 2016, note: 'Duology Book 2 — must read immediately after' },
      { title: 'King of Scars', author: 'Leigh Bardugo', year: 2019, note: 'Nikolai Duology Book 1 — read after both trilogies' },
      { title: 'Rule of Wolves', author: 'Leigh Bardugo', year: 2021, note: 'Nikolai Duology Book 2' },
      { title: 'The Lives of Saints', author: 'Leigh Bardugo', year: 2020, note: 'Companion — Grishaverse mythology', isOptional: true },
    ],
    faq: [
      { q: 'Should I read Shadow and Bone or Six of Crows first?', a: "Both work as entry points. Most readers who start with Six of Crows love it immediately. Starting with Shadow and Bone gives you Grisha world context but is slower-paced. If you prefer heist stories, start with Six of Crows." },
      { q: 'Do Six of Crows and Shadow and Bone share characters?', a: "They share the same world and some background characters, but Six of Crows has a completely different protagonist group (Kaz, Inej, Jesper, etc.) vs. Shadow and Bone (Alina, Mal, the Darkling). They can be read independently." },
      { q: 'Is the Grishaverse series finished?', a: "The Six of Crows duology and the original Shadow and Bone trilogy are complete. The Nikolai duology (King of Scars, Rule of Wolves) is complete. Leigh Bardugo has hinted at returning to the Grishaverse but nothing is officially confirmed." },
    ],
  },
  {
    slug: 'shadowhunters',
    intro:
      "Cassandra Clare's Shadowhunter Chronicles is one of the most expansive YA fantasy universes ever created — spanning six interconnected series and dozens of books. This guide covers where to start and the best reading order to experience the full Shadowhunter world.",
    startWith:
      "Start with The Mortal Instruments (City of Bones). It's the original series and the intended entry point to the Shadowhunter world. The Infernal Devices can be read after or alongside it.",
    books: [
      { title: 'City of Bones', author: 'Cassandra Clare', year: 2007, note: 'The Mortal Instruments Book 1 — start here' },
      { title: 'City of Ashes', author: 'Cassandra Clare', year: 2008, note: 'The Mortal Instruments Book 2' },
      { title: 'City of Glass', author: 'Cassandra Clare', year: 2009, note: 'The Mortal Instruments Book 3' },
      { title: 'Clockwork Angel', author: 'Cassandra Clare', year: 2010, note: 'The Infernal Devices Book 1 — Victorian-era prequel' },
      { title: 'Clockwork Prince', author: 'Cassandra Clare', year: 2011, note: 'The Infernal Devices Book 2' },
      { title: 'Clockwork Princess', author: 'Cassandra Clare', year: 2013, note: 'The Infernal Devices Book 3' },
      { title: 'City of Fallen Angels', author: 'Cassandra Clare', year: 2011, note: 'The Mortal Instruments Book 4' },
      { title: 'City of Lost Souls', author: 'Cassandra Clare', year: 2012, note: 'The Mortal Instruments Book 5' },
      { title: 'City of Heavenly Fire', author: 'Cassandra Clare', year: 2014, note: 'The Mortal Instruments Book 6 — series finale' },
      { title: 'Lady Midnight', author: 'Cassandra Clare', year: 2016, note: 'The Dark Artifices Book 1 — set 5 years later' },
      { title: 'Lord of Shadows', author: 'Cassandra Clare', year: 2017, note: 'The Dark Artifices Book 2' },
      { title: 'Queen of Air and Darkness', author: 'Cassandra Clare', year: 2018, note: 'The Dark Artifices Book 3' },
      { title: 'Chain of Gold', author: 'Cassandra Clare', year: 2020, note: 'The Last Hours Book 1 — 1903 London' },
      { title: 'Chain of Iron', author: 'Cassandra Clare', year: 2021, note: 'The Last Hours Book 2' },
      { title: 'Chain of Thorns', author: 'Cassandra Clare', year: 2023, note: 'The Last Hours Book 3' },
      { title: 'The Last King of Faerie', author: 'Cassandra Clare', year: 2026, note: 'The Wicked Powers Book 1 — November 2026', isUpcoming: true },
    ],
    faq: [
      { q: 'How many Shadowhunter books are there?', a: 'There are 6 main series in the Shadowhunter Chronicles with 3–6 books each, plus novellas and companion volumes. The main reading list covers 15+ novels. New series continue to be released.' },
      { q: 'Do I need to read all the series?', a: 'No — each series has its own protagonist group and can be appreciated on its own. The Mortal Instruments + Infernal Devices are the most popular pairing. You can stop after any complete series.' },
      { q: 'What order should I read The Mortal Instruments and The Infernal Devices?', a: 'Read City of Bones first, then Clockwork Angel. Many fans alternate: TMI Book 1, TID Book 1, TMI Book 2, TID Book 2, etc. — the books reward this reading style. At minimum, read TID before TMI Books 4–6.' },
      { q: 'What is The Wicked Powers?', a: '"The Wicked Powers" is the concluding trilogy of the Shadowhunter Chronicles, following The Dark Artifices. The first book, "The Last King of Faerie," publishes November 3, 2026. It features Drusilla Blackthorn and Kit Herondale.' },
      { q: 'When does The Last King of Faerie come out?', a: '"The Last King of Faerie" by Cassandra Clare releases November 3, 2026. It is the first book of The Wicked Powers trilogy.' },
    ],
  },
  {
    slug: 'percy-jackson',
    intro:
      "Rick Riordan has built an entire world of mythological adventure across multiple series. Percy Jackson & The Olympians is where it all begins — here's the complete reading order for the entire Riordan-verse, plus where to start.",
    startWith:
      "Start with The Lightning Thief (Percy Jackson & The Olympians Book 1). It's one of the most beloved opening books in modern fiction and perfectly introduces the world.",
    books: [
      { title: 'The Lightning Thief', author: 'Rick Riordan', year: 2005, note: 'Percy Jackson Book 1 — start here' },
      { title: 'The Sea of Monsters', author: 'Rick Riordan', year: 2006, note: 'Percy Jackson Book 2' },
      { title: 'The Titan\'s Curse', author: 'Rick Riordan', year: 2007, note: 'Percy Jackson Book 3' },
      { title: 'The Battle of the Labyrinth', author: 'Rick Riordan', year: 2008, note: 'Percy Jackson Book 4' },
      { title: 'The Last Olympian', author: 'Rick Riordan', year: 2009, note: 'Percy Jackson Book 5 — trilogy finale' },
      { title: 'The Lost Hero', author: 'Rick Riordan', year: 2010, note: 'Heroes of Olympus Book 1 — new protagonist trio' },
      { title: 'The Son of Neptune', author: 'Rick Riordan', year: 2011, note: 'Heroes of Olympus Book 2' },
      { title: 'The Mark of Athena', author: 'Rick Riordan', year: 2012, note: 'Heroes of Olympus Book 3' },
      { title: 'The House of Hades', author: 'Rick Riordan', year: 2013, note: 'Heroes of Olympus Book 4' },
      { title: 'The Blood of Olympus', author: 'Rick Riordan', year: 2014, note: 'Heroes of Olympus Book 5' },
      { title: 'The Hidden Oracle', author: 'Rick Riordan', year: 2016, note: 'Trials of Apollo Book 1' },
      { title: 'The Dark Prophecy', author: 'Rick Riordan', year: 2017, note: 'Trials of Apollo Book 2' },
      { title: 'The Burning Maze', author: 'Rick Riordan', year: 2018, note: 'Trials of Apollo Book 3' },
      { title: 'The Tyrant\'s Tomb', author: 'Rick Riordan', year: 2019, note: 'Trials of Apollo Book 4' },
      { title: 'The Tower of Nero', author: 'Rick Riordan', year: 2020, note: 'Trials of Apollo Book 5 — concludes Apollo\'s arc' },
      { title: 'The Wrath of the Triple Goddess', author: 'Rick Riordan', year: 2024, note: 'Percy Jackson & the Olympians Book 6 — new series' },
    ],
    faq: [
      { q: 'Do I need to read Percy Jackson before Heroes of Olympus?', a: "Yes — Heroes of Olympus contains major spoilers for Percy Jackson and requires that context to be fully appreciated. Read the original 5-book series first." },
      { q: 'Is there a new Percy Jackson series?', a: 'Yes — Rick Riordan returned to Percy Jackson with The Wrath of the Triple Goddess (2024). A new Disney+ series has also brought fresh attention to the original books.' },
      { q: 'What about the Kane Chronicles and Magnus Chase?', a: "The Kane Chronicles (Egyptian mythology) and Magnus Chase (Norse mythology) are companion series set in the same world. They can be read after the original Percy Jackson series. There are fun crossover short stories between all three." },
    ],
  },
  {
    slug: 'outlander',
    intro:
      "Diana Gabaldon's Outlander series is an epic saga of time travel, romance, and Scottish history spanning nine main novels and multiple novellas. Here's the complete Outlander reading order.",
    startWith:
      "Start with Outlander (Book 1). The series follows Claire Randall, a WWII nurse who is transported back to 18th-century Scotland — each book must be read in order as the story follows Claire and Jamie across decades.",
    books: [
      { title: 'Outlander', author: 'Diana Gabaldon', year: 1991, note: 'Book 1 — start here' },
      { title: 'Dragonfly in Amber', author: 'Diana Gabaldon', year: 1992, note: 'Book 2' },
      { title: 'Voyager', author: 'Diana Gabaldon', year: 1993, note: 'Book 3' },
      { title: 'Drums of Autumn', author: 'Diana Gabaldon', year: 1996, note: 'Book 4' },
      { title: 'The Fiery Cross', author: 'Diana Gabaldon', year: 2001, note: 'Book 5' },
      { title: 'A Breath of Snow and Ashes', author: 'Diana Gabaldon', year: 2005, note: 'Book 6' },
      { title: 'An Echo in the Bone', author: 'Diana Gabaldon', year: 2009, note: 'Book 7' },
      { title: 'Written in My Own Heart\'s Blood', author: 'Diana Gabaldon', year: 2014, note: 'Book 8' },
      { title: 'Go Tell the Bees That I Am Gone', author: 'Diana Gabaldon', year: 2021, note: 'Book 9' },
      { title: 'Book of Souls', author: 'Diana Gabaldon', year: 'TBA', note: 'Book 10 — concluding volume, forthcoming', isUpcoming: true },
      { title: 'Lord John and the Private Matter', author: 'Diana Gabaldon', year: 2003, note: 'Lord John Grey Book 1 — companion series', isOptional: true },
    ],
    faq: [
      { q: 'How many Outlander books are there?', a: 'There are 9 published main novels plus novellas and the Lord John Grey companion series. A 10th and final book (tentatively Book of Souls) is planned but has no release date.' },
      { q: 'How long are the Outlander books?', a: "Outlander books are famously long — the original is 850+ pages and later books are 1,000+ pages each. Plan on 30–50 hours per book. The depth of historical detail and character development rewards the investment." },
      { q: 'Does the Outlander TV show follow the books?', a: "The Starz series closely follows the books through Season 7. It\'s one of the most faithful book-to-TV adaptations of a long series. Reading the books after watching adds substantial depth to characters and story." },
    ],
  },
  {
    slug: 'folk-of-the-air',
    intro:
      "Holly Black's The Folk of the Air trilogy is dark fae fantasy at its most intoxicating — mortal girl Jude Duarte navigating treachery, power, and a ruthless fae prince in the courts of Elfhame. Here's the complete reading order.",
    startWith:
      "Start with The Cruel Prince (Book 1). The trilogy must be read in order — The Wicked King's cliffhanger is one of the most talked-about in modern fantasy.",
    books: [
      { title: 'The Cruel Prince', author: 'Holly Black', year: 2018, note: 'Book 1 — start here' },
      { title: 'The Lost Sisters', author: 'Holly Black', year: 2018, note: 'Novella — Taryn\'s POV, read between Books 1 and 2', isOptional: true },
      { title: 'The Wicked King', author: 'Holly Black', year: 2019, note: 'Book 2 — famous cliffhanger ending' },
      { title: 'How the King of Elfhame Learned to Hate Stories', author: 'Holly Black', year: 2020, note: 'Novella — Cardan\'s POV, read between Books 2 and 3', isOptional: true },
      { title: 'The Queen of Nothing', author: 'Holly Black', year: 2020, note: 'Book 3 — trilogy finale' },
      { title: 'The Stolen Heir', author: 'Holly Black', year: 2023, note: 'Book 1 of a new duology set in Elfhame' },
      { title: 'The Prisoner\'s Throne', author: 'Holly Black', year: 2024, note: 'New duology Book 2' },
    ],
    faq: [
      { q: 'How many Folk of the Air books are there?', a: "The original trilogy is 3 books (The Cruel Prince, The Wicked King, The Queen of Nothing). Holly Black has since released a companion duology (The Stolen Heir, The Prisoner's Throne) set in the same world with new protagonists." },
      { q: 'Are The Stolen Heir and The Prisoner\'s Throne connected to the main trilogy?', a: "Yes — they\'re set in Elfhame after the events of The Queen of Nothing. You should read the original trilogy first as the new books reference events and characters from it." },
      { q: 'Does The Wicked King really end on a cliffhanger?', a: "Yes — The Wicked King has one of the most notorious cliffhanger endings in YA fantasy. Make sure you have The Queen of Nothing ready before you finish it." },
    ],
  },
  {
    slug: 'shades-of-magic',
    intro:
      "V.E. Schwab's Shades of Magic trilogy is a masterwork of portal fantasy — following Kell, one of the last Antari magicians who can travel between parallel Londons. Here's the complete reading order, plus her other must-reads.",
    startWith:
      "Start with A Darker Shade of Magic (Book 1). The trilogy flows directly from one book to the next and should be read in order.",
    books: [
      { title: 'A Darker Shade of Magic', author: 'V.E. Schwab', year: 2015, note: 'Book 1 — start here' },
      { title: 'A Gathering of Shadows', author: 'V.E. Schwab', year: 2016, note: 'Book 2' },
      { title: 'A Conjuring of Light', author: 'V.E. Schwab', year: 2017, note: 'Book 3 — trilogy finale' },
      { title: 'Vicious', author: 'V.E. Schwab', year: 2013, note: 'Villains duology Book 1 — standalone, dark superpowers', isOptional: true },
      { title: 'Vengeful', author: 'V.E. Schwab', year: 2018, note: 'Villains duology Book 2', isOptional: true },
      { title: 'The Invisible Life of Addie LaRue', author: 'V.E. Schwab', year: 2020, note: 'Standalone — literary fantasy phenomenon', isOptional: true },
      { title: 'The Fragile Threads of Power', author: 'V.E. Schwab', year: 2023, note: 'Threads of Power Book 1 — sequel trilogy to Shades of Magic' },
    ],
    faq: [
      { q: 'Is there a sequel to the Shades of Magic trilogy?', a: "Yes — V.E. Schwab returned to this world with The Fragile Threads of Power (2023), the first book in a new sequel trilogy called Threads of Power, set years after A Conjuring of Light." },
      { q: 'Do I need to read Shades of Magic before The Fragile Threads of Power?', a: "Yes — Threads of Power is a direct sequel. Reading the Shades of Magic trilogy first is essential; Fragile Threads of Power references characters and events throughout." },
      { q: 'How does Vicious relate to Shades of Magic?', a: "Vicious (Villains series) is set in a completely separate world with no connection to Shades of Magic. It features supervillains instead of magic. Both are great, just different." },
    ],
  },
  {
    slug: 'red-rising',
    intro:
      "Pierce Brown's Red Rising Saga is a ruthless, brilliantly plotted science fiction epic set in a future where humanity has colonized the solar system under a rigid color-coded caste system. Here's the complete reading order.",
    startWith:
      "Start with Red Rising (Book 1). The saga is best read in order — each book raises the stakes and expands the scope of Darrow's revolution across the solar system.",
    books: [
      { title: 'Red Rising', author: 'Pierce Brown', year: 2014, note: 'Book 1 — start here' },
      { title: 'Golden Son', author: 'Pierce Brown', year: 2015, note: 'Book 2' },
      { title: 'Morning Star', author: 'Pierce Brown', year: 2016, note: 'Book 3 — original trilogy finale' },
      { title: 'Iron Gold', author: 'Pierce Brown', year: 2018, note: 'Book 4 — new POVs, set 10 years later' },
      { title: 'Dark Age', author: 'Pierce Brown', year: 2019, note: 'Book 5 — the longest and darkest entry' },
      { title: 'Light Bringer', author: 'Pierce Brown', year: 2023, note: 'Book 6' },
      { title: 'Red God', author: 'Pierce Brown', year: 'TBA', note: 'Book 7 — planned finale', isUpcoming: true },
    ],
    faq: [
      { q: 'Does Red Rising work as a standalone trilogy?', a: "Yes — Books 1–3 (Red Rising, Golden Son, Morning Star) form a complete story arc. Books 4–7 continue with additional characters and a wider scope. Many fans consider the original trilogy one of the best trilogies in sci-fi." },
      { q: 'Is Red Rising YA or adult fiction?', a: "Red Rising is often classified as adult science fiction despite initially being shelved near YA. It has mature content (violence, morally complex themes) and is not recommended for younger readers." },
      { q: 'When is Red God (Book 7) coming out?', a: "Pierce Brown has not announced an official release date for Red God. Light Bringer (2023) ends on a major cliffhanger. Follow Pierce Brown's social media for updates." },
    ],
  },
  {
    slug: 'emily-henry',
    intro:
      "Emily Henry is the #1 New York Times bestselling author who redefined contemporary romance with her witty banter, emotionally resonant storytelling, and brilliantly drawn characters. Here's the complete Emily Henry reading order — from her debut to her latest novel.",
    startWith:
      "Most fans recommend starting with Beach Read or People We Meet on Vacation. Both are excellent entry points that showcase Emily Henry's voice. Book Lovers is a great third read.",
    books: [
      { title: 'The Love That Split the World', author: 'Emily Henry', year: 2016, note: 'Debut — YA magical realism, very different from her later work', isOptional: true },
      { title: 'A Million Junes', author: 'Emily Henry', year: 2017, note: 'Second novel — YA magical realism', isOptional: true },
      { title: 'Beach Read', author: 'Emily Henry', year: 2020, note: 'Adult debut — enemies-to-lovers, start here for her romance era' },
      { title: 'People We Meet on Vacation', author: 'Emily Henry', year: 2021, note: 'Friends-to-lovers across years of missed chances' },
      { title: 'Book Lovers', author: 'Emily Henry', year: 2022, note: 'Enemies-to-lovers between a literary agent and an editor in a small town' },
      { title: 'Happy Place', author: 'Emily Henry', year: 2023, note: 'Exes forced to fake it for one last vacation' },
      { title: 'Funny Story', author: 'Emily Henry', year: 2024, note: 'Jilted exes become unexpected roommates and more' },
    ],
    faq: [
      { q: 'What order should I read Emily Henry books?', a: "For her adult romance novels, publication order works perfectly: Beach Read (2020) → People We Meet on Vacation (2021) → Book Lovers (2022) → Happy Place (2023) → Funny Story (2024). Her earlier YA novels (The Love That Split the World, A Million Junes) are optional and tonally quite different." },
      { q: 'Which Emily Henry book should I read first?', a: "Most fans recommend Beach Read or People We Meet on Vacation as entry points. Beach Read has the classic enemies-to-lovers setup; People We Meet on Vacation is beloved for its dual-timeline friends-to-lovers story. Both are excellent starting points." },
      { q: 'Are Emily Henry books part of the same universe?', a: "Her adult romance novels are standalone stories — you don't need to read them in order. However, readers sometimes spot Easter eggs and familiar settings connecting the books, as they all take place in the same loose world." },
      { q: 'Is Emily Henry writing a new book?', a: "Emily Henry typically releases one book per year. Check BookReleaseRadar's series page for the latest news on upcoming Emily Henry releases." },
    ],
  },
  {
    slug: 'taylor-jenkins-reid',
    intro:
      "Taylor Jenkins Reid is the New York Times bestselling author of sweeping, character-driven fiction set against the backdrop of Hollywood, rock and roll, and American celebrity culture. Here's the complete Taylor Jenkins Reid reading order.",
    startWith:
      "Most readers discover TJR through The Seven Husbands of Evelyn Hugo — start there. Daisy Jones & The Six is a perfect second read. Her earlier novels offer a different, more intimate TJR.",
    books: [
      { title: 'Forever, Interrupted', author: 'Taylor Jenkins Reid', year: 2013, note: 'Debut — grief and new widowhood; earlier, quieter TJR', isOptional: true },
      { title: 'After I Do', author: 'Taylor Jenkins Reid', year: 2014, note: 'Marriage on a break — emotional and character-driven', isOptional: true },
      { title: 'Maybe in Another Life', author: 'Taylor Jenkins Reid', year: 2015, note: 'Sliding doors premise — two paths from one choice', isOptional: true },
      { title: 'One True Loves', author: 'Taylor Jenkins Reid', year: 2016, note: 'Husband presumed dead returns — love triangle with no easy answer', isOptional: true },
      { title: 'Three Days in Summer', author: 'Taylor Jenkins Reid', year: 2017, note: 'Short standalone', isOptional: true },
      { title: 'The Seven Husbands of Evelyn Hugo', author: 'Taylor Jenkins Reid', year: 2017, note: 'Breakout novel — start here for her acclaimed work' },
      { title: 'Daisy Jones & The Six', author: 'Taylor Jenkins Reid', year: 2019, note: 'Rockumentary-format oral history of a 1970s band' },
      { title: 'Malibu Rising', author: 'Taylor Jenkins Reid', year: 2021, note: 'Four celebrity siblings, one legendary party, one wild night' },
      { title: 'Carrie Soto Is Back', author: 'Taylor Jenkins Reid', year: 2022, note: "A tennis legend's comeback at 37" },
    ],
    faq: [
      { q: 'What order should I read Taylor Jenkins Reid books?', a: "TJR's books are all standalone — you can read them in any order. However, her career arc is interesting: her debut trilogy (2013–2016) is more intimate contemporary romance; The Seven Husbands of Evelyn Hugo (2017) marks her shift toward Hollywood-epic storytelling. New readers typically start with Evelyn Hugo." },
      { q: 'Which Taylor Jenkins Reid book should I read first?', a: "Start with The Seven Husbands of Evelyn Hugo — it's her most celebrated work and the best showcase of her storytelling gifts. Follow with Daisy Jones & The Six, then Malibu Rising." },
      { q: 'Are Taylor Jenkins Reid books in the same universe?', a: "Her later books share a loosely connected world of celebrity culture. Some characters from Malibu Rising and Daisy Jones overlap. However, each book is fully standalone and reading order doesn't affect enjoyment." },
      { q: 'Is Taylor Jenkins Reid writing a new book?', a: "Check BookReleaseRadar's series page for the latest news on upcoming Taylor Jenkins Reid releases." },
    ],
  },
  {
    slug: 'blood-and-ash',
    intro:
      "Jennifer L. Armentrout's Blood and Ash series is a sweeping romantic fantasy set in the Kingdom of Solis. Beginning with From Blood and Ash, the series follows Poppy, a Maiden chosen by the gods, whose sheltered life shatters when she meets Hawke — a guard whose secrets run as deep as her own. Here's the complete reading order.",
    startWith:
      "Start with From Blood and Ash (Book 1) — no prior Armentrout knowledge needed. The series is best read in publication order; each book ends on a major cliffhanger. The companion Flesh and Fire duology (also by Armentrout) can be read after the main series or after Book 3.",
    books: [
      { title: 'From Blood and Ash', author: 'Jennifer L. Armentrout', year: 2020, note: 'Book 1 — start here; Poppy and Hawke' },
      { title: 'A Kingdom of Flesh and Fire', author: 'Jennifer L. Armentrout', year: 2020, note: 'Book 2' },
      { title: 'The Crown of Gilded Bones', author: 'Jennifer L. Armentrout', year: 2021, note: 'Book 3' },
      { title: 'The War of Two Queens', author: 'Jennifer L. Armentrout', year: 2022, note: 'Book 4' },
      { title: 'A Soul of Ash and Blood', author: 'Jennifer L. Armentrout', year: 2023, note: "Book 5 — Hawke's POV" },
      { title: 'A Fire in the Flesh', author: 'Jennifer L. Armentrout', year: 2023, note: 'Book 6' },
      { title: 'A Light in the Flame', author: 'Jennifer L. Armentrout', year: 2023, note: 'Flesh and Fire Book 2 — prequel companion, read after Book 3 or after the main series', isOptional: true },
      { title: 'From Blood and Ash Book 7', author: 'Jennifer L. Armentrout', year: 'TBA', note: 'Book 7 — forthcoming', isUpcoming: true },
    ],
    faq: [
      { q: 'What is the Blood and Ash reading order?', a: "The main series order is: From Blood and Ash → A Kingdom of Flesh and Fire → The Crown of Gilded Bones → The War of Two Queens → A Soul of Ash and Blood → A Fire in the Flesh. A Light in the Flame (Flesh and Fire Book 2) is a companion prequel best read after Book 3 or after the main series." },
      { q: 'How many Blood and Ash books are there?', a: "There are currently 6 books in the main Blood and Ash series, plus the companion Flesh and Fire duology (A Shadow in the Ember and A Light in the Flame) and the planned Book 7. Jennifer L. Armentrout is one of the most prolific authors in romantic fantasy." },
      { q: 'Is From Blood and Ash related to ACOTAR or Fourth Wing?', a: "From Blood and Ash and ACOTAR are separate series by different authors (Jennifer L. Armentrout and Sarah J. Maas respectively), but fans of one often love the other due to their shared blend of epic fantasy world-building and passionate romance. If you loved ACOTAR, From Blood and Ash is one of the most frequently recommended next reads." },
      { q: 'Do I need to read the Flesh and Fire books?', a: "A Shadow in the Ember and A Light in the Flame (the Flesh and Fire duology) are companion prequels set in the same world — they enrich the mythology but are optional. Most fans recommend reading them after the main series or after Book 3 of Blood and Ash." },
    ],
  },
  {
    slug: 'inheritance-games',
    intro:
      "Jennifer Lynn Barnes's The Inheritance Games series is an addictive YA mystery that begins when ordinary teenager Avery Grambs is left a billionaire's fortune — and drawn into his world of secrets, puzzles, and his four magnetic grandsons, the Hawthorne brothers. Here's the complete reading order.",
    startWith:
      "Start with The Inheritance Games (Book 1). The series must be read in order — each book builds directly on the previous one and ends on significant reveals.",
    books: [
      { title: 'The Inheritance Games', author: 'Jennifer Lynn Barnes', year: 2021, note: "Book 1 — start here; Avery inherits a billionaire's fortune" },
      { title: 'The Hawthorne Legacy', author: 'Jennifer Lynn Barnes', year: 2022, note: 'Book 2' },
      { title: 'The Final Gambit', author: 'Jennifer Lynn Barnes', year: 2023, note: 'Book 3 — main trilogy conclusion' },
      { title: 'The Brothers Hawthorne', author: 'Jennifer Lynn Barnes', year: 2023, note: "Book 4 — companion novel from the Hawthorne brothers' POV" },
      { title: 'The Grandest Game', author: 'Jennifer Lynn Barnes', year: 2024, note: 'Book 5 — new protagonist, new competition, set in the same world' },
      { title: 'The Inheritance Games Book 6', author: 'Jennifer Lynn Barnes', year: 'TBA', note: 'Book 6 — forthcoming', isUpcoming: true },
    ],
    faq: [
      { q: 'What order should I read The Inheritance Games series?', a: "Read in publication order: The Inheritance Games (2021) → The Hawthorne Legacy (2022) → The Final Gambit (2023) → The Brothers Hawthorne (2023) → The Grandest Game (2024). Each book builds on the previous, so don't skip ahead." },
      { q: 'How many Inheritance Games books are there?', a: "There are 5 published books in the series as of 2024: the original trilogy (Books 1–3), a companion novel (The Brothers Hawthorne), and The Grandest Game which begins a new story arc in the same world with a new protagonist. More books are expected." },
      { q: 'Is The Grandest Game a new series or a continuation?', a: "The Grandest Game is both a continuation and a new chapter — it features a new main character but takes place in the same world as The Inheritance Games and connects to familiar characters. You should read the original trilogy first before The Grandest Game." },
      { q: 'What genre is The Inheritance Games?', a: "The Inheritance Games series is YA mystery/thriller with romantic elements. It combines puzzle-solving, wealthy-family secrets, and a slow-burn love triangle in a fast-paced plot. Fans of Knives Out, locked-room mysteries, and enemies-to-lovers romance tend to love the series." },
    ],
  },
  {
    slug: 'bridgerton',
    intro:
      "Julia Quinn's Bridgerton series follows the eight Bridgerton siblings across eight standalone novels set in Regency-era London. Each book centers on a different sibling's love story, making them enjoyable to read in any order — though publication order is recommended for the best experience.",
    startWith:
      "Start with The Duke and I (Daphne's story, Book 1) or jump straight to The Viscount Who Loved Me (Anthony's story, Book 2) — both are excellent entry points. The Bridgerton novels are standalones and can be read independently, but you'll enjoy the family dynamics more if you start from Book 1.",
    books: [
      { title: 'The Duke and I', author: 'Julia Quinn', year: 2000, note: 'Book 1 — Daphne and Simon; Season 1 of the Netflix show' },
      { title: 'The Viscount Who Loved Me', author: 'Julia Quinn', year: 2000, note: 'Book 2 — Anthony and Kate; Season 2 of the Netflix show' },
      { title: 'An Offer from a Gentleman', author: 'Julia Quinn', year: 2001, note: 'Book 3 — Benedict and Sophie' },
      { title: 'Romancing Mr. Bridgerton', author: 'Julia Quinn', year: 2002, note: 'Book 4 — Colin and Penelope; Season 3 of the Netflix show' },
      { title: 'To Sir Phillip, With Love', author: 'Julia Quinn', year: 2003, note: 'Book 5 — Eloise and Sir Phillip' },
      { title: 'When He Was Wicked', author: 'Julia Quinn', year: 2004, note: 'Book 6 — Francesca and Michael' },
      { title: "It's in His Kiss", author: 'Julia Quinn', year: 2005, note: 'Book 7 — Hyacinth and Gareth' },
      { title: 'On the Way to the Wedding', author: 'Julia Quinn', year: 2006, note: 'Book 8 — Gregory and Lucy; final main series book' },
    ],
    faq: [
      { q: 'What is the Bridgerton reading order?', a: "The recommended reading order is: The Duke and I (Book 1) → The Viscount Who Loved Me (Book 2) → An Offer from a Gentleman (Book 3) → Romancing Mr. Bridgerton (Book 4) → To Sir Phillip, With Love (Book 5) → When He Was Wicked (Book 6) → It's in His Kiss (Book 7) → On the Way to the Wedding (Book 8). Each book focuses on a different Bridgerton sibling and can be enjoyed as a standalone." },
      { q: 'How many Bridgerton books are there?', a: "There are 8 main Bridgerton novels by Julia Quinn, plus additional prequel novellas about the Rokesby family. The Netflix series Bridgerton by Shonda Rhimes has brought renewed attention to all the books." },
      { q: 'Which Bridgerton book matches the Netflix series?', a: "Season 1 covers The Duke and I (Daphne and Simon's story), Season 2 covers The Viscount Who Loved Me (Anthony and Kate), and Season 3 covers Romancing Mr. Bridgerton (Colin and Penelope, also known as Polin). Each Netflix season adapts one book from the series." },
      { q: 'Is Bridgerton a standalone or do you need to read them in order?', a: "Each Bridgerton book is a standalone romance featuring a different sibling, so you can technically start anywhere. However, reading in publication order gives you the richest experience — you'll know the family dynamics and appreciate the recurring characters more." },
    ],
  },
  {
    slug: 'kingkiller-chronicle',
    intro:
      "Patrick Rothfuss's Kingkiller Chronicle is widely considered one of the finest fantasy series ever written. The story is told by the legendary Kvothe as he recounts his extraordinary life — from orphaned child of traveling performers to famous wizard, warrior, and musician — across two massive, beloved volumes. The world holds its breath for Book 3.",
    startWith:
      "Start with The Name of the Wind (Book 1) and follow it immediately with The Wise Man's Fear (Book 2). The Slow Regard of Silent Things is a companion novella set between Books 1 and 2 — read it after Book 2, or skip it if you want to wait for Book 3.",
    books: [
      { title: 'The Name of the Wind', author: 'Patrick Rothfuss', year: 2007, note: "Book 1 — Kvothe's first day of telling his story; where the legend begins" },
      { title: "The Wise Man's Fear", author: 'Patrick Rothfuss', year: 2011, note: "Book 2 — Kvothe's second day; the University, Ademre, the Fae" },
      { title: 'The Slow Regard of Silent Things', author: 'Patrick Rothfuss', year: 2014, note: 'Companion novella — Auri\'s story; can be read after Book 2', isOptional: true },
      { title: 'The Doors of Stone', author: 'Patrick Rothfuss', year: 'TBA', note: "Book 3 — the long-awaited conclusion to Kvothe's story; no release date announced", isUpcoming: true },
    ],
    faq: [
      { q: 'What is the Kingkiller Chronicle reading order?', a: "Read in order: The Name of the Wind (Book 1, 2007) → The Wise Man's Fear (Book 2, 2011) → optionally The Slow Regard of Silent Things (companion novella, 2014) → The Doors of Stone (Book 3, release date TBA). The main trilogy must be read in order." },
      { q: "When is The Doors of Stone coming out?", a: "As of 2026, Patrick Rothfuss has not announced a release date for The Doors of Stone (Kingkiller Chronicle Book 3). The book has been in progress for over a decade and is one of the most anticipated novels in fantasy. Rothfuss has confirmed the book is being worked on." },
      { q: 'How many Kingkiller Chronicle books are there?', a: "There are 2 main novels (The Name of the Wind and The Wise Man's Fear), 1 companion novella (The Slow Regard of Silent Things), and an upcoming third main novel (The Doors of Stone). Patrick Rothfuss has also written short stories set in the world." },
      { q: 'Is The Name of the Wind worth reading before Doors of Stone is out?', a: "Absolutely yes — The Name of the Wind and The Wise Man's Fear are considered among the best fantasy novels ever written. The prose, world-building, and character depth are exceptional on their own merits. Millions of readers have already fallen in love with the series despite the long wait for Book 3." },
    ],
  },
  {
    slug: 'the-witcher',
    intro:
      "Andrzej Sapkowski's The Witcher saga is best started with the two short story collections before reading the five-novel main saga. This is the recommended order for new readers — the same order the author intended, and the best foundation for understanding Geralt, Yennefer, and Ciri before the novels begin.",
    startWith:
      "Start with The Last Wish (short stories, 1993) — it introduces Geralt and the world of The Witcher perfectly, and several stories are essential context for the novels. Follow with Sword of Destiny, then read the five-novel saga in order.",
    books: [
      { title: 'The Last Wish', author: 'Andrzej Sapkowski', year: 1993, note: 'Short story collection — start here; introduces Geralt of Rivia' },
      { title: 'Sword of Destiny', author: 'Andrzej Sapkowski', year: 1992, note: 'Short story collection — introduces Ciri; read before the novels' },
      { title: 'Blood of Elves', author: 'Andrzej Sapkowski', year: 1994, note: 'Novel 1 — the main saga begins; Geralt and Ciri' },
      { title: 'Time of Contempt', author: 'Andrzej Sapkowski', year: 1995, note: 'Novel 2' },
      { title: 'Baptism of Fire', author: 'Andrzej Sapkowski', year: 1996, note: 'Novel 3' },
      { title: 'Tower of the Swallow', author: 'Andrzej Sapkowski', year: 1997, note: 'Novel 4' },
      { title: 'Lady of the Lake', author: 'Andrzej Sapkowski', year: 1999, note: 'Novel 5 — the saga conclusion' },
      { title: 'Season of Storms', author: 'Andrzej Sapkowski', year: 2013, note: 'Standalone prequel — can be read after Lady of the Lake', isOptional: true },
    ],
    faq: [
      { q: 'What is the correct Witcher reading order?', a: "The recommended reading order is: The Last Wish → Sword of Destiny → Blood of Elves → Time of Contempt → Baptism of Fire → Tower of the Swallow → Lady of the Lake. Read Season of Storms after the main saga as an optional prequel. Do NOT start with Blood of Elves — the short stories in The Last Wish are essential introduction to the world and characters." },
      { q: 'Do I need to read the Witcher books before playing the games?', a: "The games (especially The Witcher 3) assume some familiarity with Geralt's world, but CD Projekt Red designed them to be accessible to newcomers. Reading The Last Wish and Sword of Destiny before the games enriches the experience considerably — you'll understand Geralt and Yennefer's relationship and many character callbacks. The games are not direct adaptations of the novels." },
      { q: 'How does the Witcher book series relate to the Netflix show?', a: "The Netflix show is primarily based on The Last Wish and Sword of Destiny short stories, plus elements of the novel Blood of Elves. Season 1 adapts several stories from The Last Wish. Reading the books will deepen your appreciation of the show's characters and world, even where the adaptation diverges." },
      { q: 'Is The Last Wish or Blood of Elves the first Witcher book?', a: "The Last Wish was published first (1993 in Polish) and is the correct first book to read. Blood of Elves is the first full-length novel but assumes you've read the short story collections. Always start with The Last Wish." },
    ],
  },
  {
    slug: 'twisted',
    intro:
      "Ana Huang's Twisted Series is a bestselling contemporary romance saga set in the world of wealth, ambition, and simmering tension. Each book features a new couple and can technically be read as a standalone — but reading in order lets you follow beloved characters across all five books.",
    startWith:
      "Start with Twisted Love (Book 1 — Alex and Ava's story). The books can be read in any order as standalones, but Book 1 is widely considered the best entry point and the fan favorite of the series.",
    books: [
      { title: 'Twisted Love', author: 'Ana Huang', year: 2021, note: 'Book 1 — Alex and Ava; the fan favorite and best starting point' },
      { title: 'Twisted Games', author: 'Ana Huang', year: 2021, note: 'Book 2 — Rhys and Bridget; bodyguard romance' },
      { title: 'Twisted Hate', author: 'Ana Huang', year: 2022, note: 'Book 3 — Jules and Josh; enemies-to-lovers' },
      { title: 'Twisted Lies', author: 'Ana Huang', year: 2022, note: 'Book 4 — Stella and Christian; fake dating' },
      { title: 'Twisted Emotions', author: 'Ana Huang', year: 2023, note: 'Book 5 — conclusion of the main series' },
    ],
    faq: [
      { q: 'What order should I read the Twisted series?', a: "The recommended order is: Twisted Love (Book 1) → Twisted Games (Book 2) → Twisted Hate (Book 3) → Twisted Lies (Book 4) → Twisted Emotions (Book 5). Each book is a standalone with its own HEA but characters from earlier books reappear, so reading in order enhances the experience." },
      { q: 'Is Twisted Love the best book in the Twisted series?', a: "Twisted Love is widely considered the standout of Ana Huang's Twisted series — it's the most popular, the fan favorite on BookTok, and the best entry point. The Alex and Ava story is the one most readers recommend starting with." },
      { q: 'How many books are in Ana Huang\'s Twisted series?', a: "There are 5 main books in Ana Huang's Twisted series: Twisted Love, Twisted Games, Twisted Hate, Twisted Lies, and Twisted Emotions. Ana Huang has also written other standalone romance novels outside the Twisted universe." },
      { q: 'Can I read the Twisted series out of order?', a: "Yes — each Twisted book has a self-contained romance that resolves by the end. However, characters from earlier books appear in later ones, so reading in order gives you the richest experience and prevents spoilers about earlier couples." },
    ],
  },
  {
    slug: 'shatter-me',
    intro:
      "Tahereh Mafi's Shatter Me series spans three main trilogy novels, three novellas from Warner's POV, and a second trilogy of continuation novels — nine books total plus a prequel. Mafi's poetic, immersive prose is as much a feature as the plot, and the series rewards readers who go in order.",
    startWith:
      "Start with Shatter Me (Book 1). Read the novellas in the order listed below — they add crucial context from Warner's perspective and bridge key story beats between the main novels.",
    books: [
      { title: 'Shatter Me', author: 'Tahereh Mafi', year: 2011, note: 'Book 1 — Juliette discovers her power; the main series begins' },
      { title: 'Destroy Me', author: 'Tahereh Mafi', year: 2012, note: 'Novella 1 — Warner\'s POV; events between Books 1 and 2', isOptional: true },
      { title: 'Unravel Me', author: 'Tahereh Mafi', year: 2013, note: 'Book 2 — Juliette and the Omega Point' },
      { title: 'Fracture Me', author: 'Tahereh Mafi', year: 2013, note: 'Novella 2 — Adam\'s POV; bridge to Book 3', isOptional: true },
      { title: 'Ignite Me', author: 'Tahereh Mafi', year: 2014, note: 'Book 3 — original trilogy conclusion' },
      { title: 'Restore Me', author: 'Tahereh Mafi', year: 2018, note: 'Book 4 — continuation; Juliette in power' },
      { title: 'Shadow Me', author: 'Tahereh Mafi', year: 2019, note: "Novella 3 — Kenji's POV; bridge between Books 4 and 5", isOptional: true },
      { title: 'Defy Me', author: 'Tahereh Mafi', year: 2019, note: 'Book 5 — major revelations' },
      { title: 'Reveal Me', author: 'Tahereh Mafi', year: 2020, note: "Novella 4 — Kenji's POV; bridge to Book 6", isOptional: true },
      { title: 'Imagine Me', author: 'Tahereh Mafi', year: 2021, note: 'Book 6 — second trilogy conclusion; series finale' },
      { title: 'Believe Me', author: 'Tahereh Mafi', year: 2021, note: "Novella 5 — Warner's POV epilogue; read after Book 6", isOptional: true },
    ],
    faq: [
      { q: 'What is the Shatter Me reading order?', a: "The correct order is: Shatter Me (1) → Destroy Me (novella) → Unravel Me (2) → Fracture Me (novella) → Ignite Me (3) → Restore Me (4) → Shadow Me (novella) → Defy Me (5) → Reveal Me (novella) → Imagine Me (6) → Believe Me (novella). Novellas are optional but highly recommended — they add crucial Warner and Kenji POV scenes." },
      { q: 'How many books are in the Shatter Me series?', a: "There are 6 main novels, 5 novellas, and a prequel novel in the Shatter Me universe — 12 entries total. The original trilogy (Shatter Me, Unravel Me, Ignite Me) tells the first story arc, while Restore Me, Defy Me, and Imagine Me form a continuation trilogy." },
      { q: 'Do I need to read the Shatter Me novellas?', a: "The novellas are optional but strongly recommended by fans. They provide crucial POV scenes from Warner and Kenji that add emotional depth. Destroy Me (Warner's POV) in particular changes how you experience events in the main trilogy. Reading them between the main novels is the intended experience." },
      { q: 'Is the Shatter Me series finished?', a: "Yes — the Shatter Me series concluded with Imagine Me (Book 6) in 2021. Tahereh Mafi has also written a prequel novella (Believe Me) and continues to write other projects." },
    ],
  },
  {
    slug: 'atlas-six',
    intro:
      "Olivie Blake's The Atlas Six trilogy is intellectually dense, morally ambiguous dark fantasy about six exceptional magicians in a deadly competition to join a secret ancient society. Each book goes deeper into philosophy, power, and betrayal — read in order for the full effect.",
    startWith:
      "Start with The Atlas Six (Book 1). This trilogy must be read in order — each book recontextualizes the events of the previous one, and the ending of Book 1 sets up everything that follows.",
    books: [
      { title: 'The Atlas Six', author: 'Olivie Blake', year: 2022, note: 'Book 1 — six magicians, one society, elimination required' },
      { title: 'The Atlas Paradox', author: 'Olivie Blake', year: 2022, note: 'Book 2 — inside the Alexandrian Society; allegiances shift' },
      { title: 'The Atlas Complex', author: 'Olivie Blake', year: 2024, note: 'Book 3 — trilogy conclusion; the full cost of power revealed' },
    ],
    faq: [
      { q: 'What is The Atlas Six reading order?', a: "Read in order: The Atlas Six (2022) → The Atlas Paradox (2022) → The Atlas Complex (2024). The trilogy must be read in publication order — the narrative builds directly on each previous book, and key revelations lose impact if read out of order." },
      { q: 'How many Atlas Six books are there?', a: "The Atlas Six trilogy consists of 3 books: The Atlas Six, The Atlas Paradox, and The Atlas Complex (which concluded the trilogy in 2024). As of 2026, Olivie Blake has not announced additional Atlas books." },
      { q: 'Is The Atlas Six part of a larger universe?', a: "The Atlas Six trilogy is self-contained within its own universe. Olivie Blake has written other standalone works, but The Atlas Six, Atlas Paradox, and Atlas Complex form a complete trilogy." },
      { q: 'What is The Atlas Six about?', a: "The Atlas Six follows six exceptional magicians who are each offered a position in the Alexandrian Society — a secret organization guarding the world's most powerful knowledge. The catch: only five can be admitted, meaning one person must be eliminated. The novel explores power, philosophy, and what people will sacrifice for knowledge." },
    ],
  },
  {
    slug: 'hunger-games',
    intro:
      "Suzanne Collins' Hunger Games universe spans three original trilogy novels, one prequel (The Ballad of Songbirds and Snakes), and the forthcoming Sunrise on the Reaping (March 2026) — Haymitch Abernathy's own Hunger Games, set 24 years before Katniss's story. The original trilogy can be read by anyone; the prequels/companion novels work best read after the main trilogy.",
    startWith:
      "Start with The Hunger Games (Book 1 of the original trilogy). The prequels enrich the world but work best after you know how the story ends for Katniss.",
    books: [
      { title: 'The Hunger Games', author: 'Suzanne Collins', year: 2008, note: 'Book 1 — Katniss volunteers as tribute; the Capitol vs. the Districts begins' },
      { title: 'Catching Fire', author: 'Suzanne Collins', year: 2009, note: 'Book 2 — the Victory Tour, the Quarter Quell, and the sparks of revolution' },
      { title: 'Mockingjay', author: 'Suzanne Collins', year: 2010, note: 'Book 3 — the rebellion comes to a head; Katniss becomes the Mockingjay' },
      { title: 'The Ballad of Songbirds and Snakes', author: 'Suzanne Collins', year: 2020, note: 'Prequel — Coriolanus Snow at age 18 in the 10th Hunger Games' },
      { title: 'Sunrise on the Reaping', author: 'Suzanne Collins', year: 2026, note: "Companion novel — Haymitch Abernathy's 50th Hunger Games; March 2026" },
    ],
    faq: [
      { q: 'What is the Hunger Games reading order?', a: "Publication order: The Hunger Games (2008) → Catching Fire (2009) → Mockingjay (2010) → The Ballad of Songbirds and Snakes (2020) → Sunrise on the Reaping (March 2026). The original trilogy should be read first; the prequels are richer if you already know Katniss's story." },
      { q: 'When does Sunrise on the Reaping come out?', a: "Sunrise on the Reaping by Suzanne Collins releases March 18, 2026. It is set 24 years before the events of The Hunger Games and follows Haymitch Abernathy as a tribute in the 50th Hunger Games — the Second Quarter Quell." },
      { q: 'How many Hunger Games books are there?', a: "There are 5 books in the Hunger Games universe: The Hunger Games, Catching Fire, and Mockingjay form the original trilogy; The Ballad of Songbirds and Snakes (2020) is a prequel following young Coriolanus Snow; and Sunrise on the Reaping (March 2026) follows Haymitch Abernathy in the 50th Hunger Games." },
      { q: 'Do I need to read the Hunger Games in order?', a: "Yes — the original trilogy (Books 1-3) must be read in order. The prequels (Ballad of Songbirds and Snakes, Sunrise on the Reaping) can technically be read standalone, but they contain spoilers for the main trilogy and hit harder when you already know how Panem's story ends." },
    ],
  },
  {
    slug: 'poppy-war',
    intro:
      "R.F. Kuang's Poppy War trilogy is a dark military fantasy drawing on 20th-century Chinese history — the Rape of Nanjing, the Second Sino-Japanese War, and Mao's cultural revolution. It is not light reading, but it is some of the most powerful and unflinching fantasy written in the last decade. Read in trilogy order, then explore Kuang's standalone works Babel and Yellowface.",
    startWith:
      "Start with The Poppy War (Book 1). Content warning: this trilogy depicts war, genocide, and extreme violence with unflinching honesty.",
    books: [
      { title: 'The Poppy War', author: 'R.F. Kuang', year: 2018, note: 'Book 1 — Rin tests into Sinegard Academy; discovers shamanic power during war' },
      { title: 'The Dragon Republic', author: 'R.F. Kuang', year: 2019, note: 'Book 2 — the war expands; Rin navigates factions while losing control of her power' },
      { title: 'The Burning God', author: 'R.F. Kuang', year: 2020, note: 'Book 3 — the trilogy conclusion; devastating and necessary' },
      { title: 'Babel', author: 'R.F. Kuang', year: 2022, note: 'Standalone — Oxford silver-working fantasy about colonialism, language, and resistance' },
      { title: 'Yellowface', author: 'R.F. Kuang', year: 2023, note: 'Standalone — literary satire about race, authorship, and publishing; not fantasy' },
    ],
    faq: [
      { q: 'What is The Poppy War reading order?', a: "The Poppy War trilogy must be read in order: The Poppy War (2018) → The Dragon Republic (2019) → The Burning God (2020). After the trilogy, explore R.F. Kuang's standalones: Babel (2022) and Yellowface (2023). Each standalone is independent and can be read in any order." },
      { q: 'How many Poppy War books are there?', a: "The Poppy War series is a trilogy: The Poppy War, The Dragon Republic, and The Burning God. R.F. Kuang has also written two standalone novels — Babel (2022) and Yellowface (2023) — set in entirely different worlds." },
      { q: 'Is Babel by R.F. Kuang a sequel to The Poppy War?', a: "No. Babel is a completely standalone novel set in an alternate 1830s Oxford with a magic system based on silver-working and translation. It shares R.F. Kuang's thematic obsessions — colonialism, power, and the cost of assimilation — but has no connection to the Poppy War universe." },
      { q: 'How dark is The Poppy War?', a: "The Poppy War trilogy is very dark. It depicts war, genocide, and atrocity with unflinching detail inspired by real historical events. Many readers consider it some of the most powerful fantasy ever written for exactly that reason. Content warnings: extreme violence, genocide, addiction, torture." },
    ],
  },
  {
    slug: 'dark-tower',
    intro:
      "Stephen King's The Dark Tower is an eight-novel epic spanning 30 years of writing — part Western, part fantasy, part horror, part science fiction. Roland Deschain's quest for the Dark Tower intersects with over 40 of King's other novels, making it the connective tissue of the King Multiverse. Start from the beginning and follow the Gunslinger.",
    startWith:
      "Start with The Gunslinger (Book 1). Note: King revised The Gunslinger in 2003 to better match later books — read the revised edition. The Wind Through the Keyhole fits between Books 4 and 5.",
    books: [
      { title: 'The Gunslinger', author: 'Stephen King', year: 1982, note: 'Book 1 — Roland pursues the Man in Black across the desert; the quest begins' },
      { title: 'The Drawing of the Three', author: 'Stephen King', year: 1987, note: 'Book 2 — Roland draws companions from our world; Eddie and Susannah join the ka-tet' },
      { title: 'The Waste Lands', author: 'Stephen King', year: 1991, note: 'Book 3 — the ka-tet reaches Lud; the mechanical bear Shardik; Blaine the Mono' },
      { title: 'Wizard and Glass', author: 'Stephen King', year: 1997, note: "Book 4 — Roland's past: Susan Delgado and Mejis; one of the series' most beloved entries" },
      { title: 'The Wind Through the Keyhole', author: 'Stephen King', year: 2012, note: 'Book 4.5 — best read between Books 4 and 5; a story within a story within a story' },
      { title: 'Wolves of the Calla', author: 'Stephen King', year: 2003, note: 'Book 5 — the ka-tet defends a village; Father Callahan from Salem\'s Lot appears' },
      { title: 'Song of Susannah', author: 'Stephen King', year: 2004, note: "Book 6 — the ka-tet splits; King inserts himself into his own story" },
      { title: 'The Dark Tower', author: 'Stephen King', year: 2004, note: "Book 7 — the Tower is reached; the series' controversial and cathartic ending" },
      { title: 'The Dark Tower VIII: The Wind Through the Keyhole', author: 'Stephen King', year: 2012, note: 'Alt numbering — same as Book 4.5 above' },
    ],
    faq: [
      { q: 'What is The Dark Tower reading order?', a: "Read in order: The Gunslinger → The Drawing of the Three → The Waste Lands → Wizard and Glass → The Wind Through the Keyhole (between Books 4 and 5) → Wolves of the Calla → Song of Susannah → The Dark Tower. King revised The Gunslinger in 2003; read the revised edition." },
      { q: 'How many Dark Tower books are there?', a: "There are 8 books in The Dark Tower series, plus The Wind Through the Keyhole is sometimes numbered as Book 4.5. Stephen King has not announced a Book 9, though the universe has been expanded through references in other King novels." },
      { q: 'Does The Dark Tower connect to other Stephen King books?', a: "Yes — The Dark Tower is the connective tissue of Stephen King's multiverse. It explicitly references Salem's Lot (Father Callahan appears as a major character), The Stand (Randall Flagg), It, Insomnia, Black House, and dozens of other King novels. The series reveals that many King stories share the same universe." },
      { q: 'Is The Dark Tower series finished?', a: "Yes. The main Dark Tower series concluded with Book 7, The Dark Tower (2004). The Wind Through the Keyhole (2012) is an additional story set between Books 4 and 5 but does not extend the ending. As of 2026, Stephen King has not announced a Book 9." },
    ],
  },
  {
    slug: 'wheel-of-time',
    intro:
      "Robert Jordan's Wheel of Time is one of the greatest achievements in fantasy — 14 books spanning 4 million words, with one of the most richly detailed worlds ever constructed. Jordan began the series in 1990 and passed away in 2007 before completing it; Brandon Sanderson finished the final three books from Jordan's extensive notes. The Wheel of Time series is complete and perfect for long-haul readers.",
    startWith:
      "Start with The Eye of the World (Book 1). Many readers also recommend the New Spring prequel novella, but it works better after Books 6–8 when you know the characters. The companion book The World of Robert Jordan's The Wheel of Time is optional reference material.",
    books: [
      { title: 'The Eye of the World', author: 'Robert Jordan', year: 1990, note: 'Book 1 — five villagers from Emond\'s Field discover one of them may be the Dragon Reborn' },
      { title: 'The Great Hunt', author: 'Robert Jordan', year: 1990, note: "Book 2 — the hunt for the Horn of Valere; the world expands dramatically" },
      { title: 'The Dragon Reborn', author: 'Robert Jordan', year: 1991, note: "Book 3 — Rand's identity is confirmed; Egwene, Nynaeve, and Mat take center stage" },
      { title: 'The Shadow Rising', author: 'Robert Jordan', year: 1992, note: 'Book 4 — widely considered the series\' best; the Aiel Waste and Rhuidean' },
      { title: 'The Fires of Heaven', author: 'Robert Jordan', year: 1993, note: 'Book 5 — the first to lack a prologue; Mat comes into his own as a general' },
      { title: 'Lord of Chaos', author: 'Robert Jordan', year: 1994, note: 'Book 6 — Dumai\'s Wells; the most explosive sequence in the series' },
      { title: 'A Crown of Swords', author: 'Robert Jordan', year: 1996, note: 'Book 7 — Ebou Dar, the Bowl of the Winds, and the Gholam' },
      { title: 'The Path of Daggers', author: 'Robert Jordan', year: 1998, note: 'Book 8 — Rand uses the Choedan Kal; the series begins to deepen politically' },
      { title: 'Winter\'s Heart', author: 'Robert Jordan', year: 2000, note: 'Book 9 — the Cleansing of saidin; a pivotal moment for the male half of the True Source' },
      { title: 'Crossroads of Twilight', author: 'Robert Jordan', year: 2003, note: 'Book 10 — often cited as the slowest entry; events of Winter\'s Heart viewed from other POVs' },
      { title: 'Knife of Dreams', author: 'Robert Jordan', year: 2005, note: 'Book 11 — Jordan\'s last solo book; the pace picks back up significantly' },
      { title: 'The Gathering Storm', author: 'Robert Jordan & Brandon Sanderson', year: 2009, note: "Book 12 — Sanderson's first WoT; Rand's arc reaches its darkest point and then the peak" },
      { title: 'Towers of Midnight', author: 'Robert Jordan & Brandon Sanderson', year: 2010, note: "Book 13 — Mat and Perrin's threads converge; the Last Battle approaches" },
      { title: 'A Memory of Light', author: 'Robert Jordan & Brandon Sanderson', year: 2013, note: 'Book 14 — the series finale; the Last Battle; one of fantasy\'s most epic conclusions' },
      { title: 'New Spring', author: 'Robert Jordan', year: 2004, note: 'Prequel novella — Moiraine and Lan in the year Rand was born; best read after Books 6–8' },
    ],
    faq: [
      { q: 'What is The Wheel of Time reading order?', a: "Read the main 14-book series in order, starting with The Eye of the World. The New Spring prequel is best read after Books 6–8. The final three books (The Gathering Storm, Towers of Midnight, A Memory of Light) were completed by Brandon Sanderson from Robert Jordan's notes." },
      { q: 'How many Wheel of Time books are there?', a: "There are 14 main series books and 1 prequel novella (New Spring). The main series is complete. Brandon Sanderson wrote the final three books (12–14) using Robert Jordan's notes and outlines after Jordan passed away in 2007." },
      { q: 'Is it worth reading The Wheel of Time?', a: "Yes — The Wheel of Time is one of the defining epic fantasy series. The world-building is unmatched, the magic system is original, and the character depth across 4 million words rewards patient readers. Books 8–10 are often cited as slower-paced, but the series accelerates dramatically in Books 11–14." },
      { q: 'Is The Wheel of Time finished?', a: "Yes. The Wheel of Time is completely finished. Brandon Sanderson completed the series with Books 12, 13, and 14 using Robert Jordan's detailed notes, outlines, and completed scenes. A Memory of Light (Book 14) was published in January 2013." },
      { q: 'Does the Amazon Wheel of Time show follow the books?', a: "Amazon Prime Video's The Wheel of Time series is a loose adaptation that condenses and reorganizes plot elements from the first few books. Viewers generally recommend reading the books, as they contain substantially more depth and different story beats than the show." },
    ],
  },
];

export function getReadingOrder(slug: string): SeriesReadingOrder | undefined {
  return READING_ORDERS.find((r) => r.slug === slug);
}

export const ALL_READING_ORDER_SLUGS = READING_ORDERS.map((r) => r.slug);

export interface MostAnticipatedBook {
  title: string;
  author: string;
  note: string;
  seriesName: string;
  seriesSlug: string;
}

export function getMostAnticipated(): MostAnticipatedBook[] {
  const results: MostAnticipatedBook[] = [];
  for (const order of READING_ORDERS) {
    for (const book of order.books) {
      if (book.isUpcoming && !book.isOptional) {
        results.push({
          title: book.title,
          author: book.author,
          note: book.note ?? '',
          seriesName: order.slug,
          seriesSlug: order.slug,
        });
      }
    }
  }
  return results;
}
