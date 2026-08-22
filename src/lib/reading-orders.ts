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
  {
    slug: 'dune',
    intro:
      "Frank Herbert's Dune Saga is the foundation of modern science fiction. The original six novels by Herbert form a complete philosophical arc spanning millennia. Brian Herbert and Kevin J. Anderson have since published over a dozen prequel and sequel novels expanding the universe. Most readers read only Herbert's original six; the expanded universe novels are optional.",
    startWith:
      "Start with Dune (1965) — the novel that started everything. Herbert's first book is the most accessible and most beloved. The sequels get progressively more esoteric; many readers read only the first book or the first three.",
    books: [
      { title: 'Dune', author: 'Frank Herbert', year: 1965, note: 'Book 1 — Paul Atreides arrives on Arrakis; the beginning of the saga' },
      { title: 'Dune Messiah', author: 'Frank Herbert', year: 1969, note: 'Book 2 — 12 years later; the consequences of Paul becoming a god-emperor' },
      { title: 'Children of Dune', author: 'Frank Herbert', year: 1976, note: "Book 3 — Paul's children Leto II and Ghanima carry the burden of prescience" },
      { title: 'God Emperor of Dune', author: 'Frank Herbert', year: 1981, note: 'Book 4 — 3,500 years later; Leto II has completed his Golden Path' },
      { title: 'Heretics of Dune', author: 'Frank Herbert', year: 1984, note: 'Book 5 — 1,500 years after God Emperor; humanity has scattered across the galaxy' },
      { title: 'Chapterhouse: Dune', author: 'Frank Herbert', year: 1985, note: "Book 6 — Herbert's final Dune novel; left on a cliffhanger at his death in 1986" },
      { title: 'Hunters of Dune', author: 'Brian Herbert & Kevin J. Anderson', year: 2006, note: 'Continuation — picks up where Chapterhouse ends; based on Herbert\'s notes', isOptional: true },
      { title: 'Sandworms of Dune', author: 'Brian Herbert & Kevin J. Anderson', year: 2007, note: 'Conclusion of the Chapterhouse cliffhanger arc', isOptional: true },
    ],
    faq: [
      { q: 'What is the Dune reading order?', a: "The original Dune Saga by Frank Herbert: Dune (1965) → Dune Messiah → Children of Dune → God Emperor of Dune → Heretics of Dune → Chapterhouse: Dune. Many readers stop after Book 1, 3, or 6. Brian Herbert and Kevin J. Anderson's prequels and sequels are optional expanded universe content." },
      { q: 'Do I need to read all 6 Dune books?', a: "No. Dune (Book 1) stands completely on its own and is the most beloved. Dune Messiah and Children of Dune complete the 'Paul arc.' Books 4–6 are progressively more experimental and esoteric. Most casual readers read 1–3 and stop there." },
      { q: 'How many Dune books are there?', a: "Frank Herbert wrote 6 Dune novels. Brian Herbert and Kevin J. Anderson have written 16+ additional novels set in the universe, covering prequels (Legends of Dune, Prelude to Dune) and sequels (Hunters of Dune, Sandworms of Dune, The Caladan Trilogy)." },
      { q: 'Should I read Dune before watching the Denis Villeneuve films?', a: "Yes — the films are close adaptations of the first novel. The book adds depth to Mentat abilities, the Bene Gesserit, and Paul's internal voice that the films can only hint at. Reading the book before or after the first film both work well." },
      { q: 'Is Dune Messiah worth reading?', a: "Dune Messiah is a short, dark deconstruction of the chosen-one story Herbert accidentally created in Dune — it is deliberately unsatisfying if you wanted more heroics, but essential if you want Herbert's full vision. Read it expecting a tragedy, not a sequel." },
    ],
  },
  {
    slug: 'divergent',
    intro:
      "Veronica Roth's Divergent trilogy is set in a future Chicago divided into five personality-based factions. Beatrice 'Tris' Prior chooses Dauntless on her Choosing Day — and discovers she is Divergent, fitting into no single faction. The trilogy is best read in order; Allegiant has one of YA's most discussed endings.",
    startWith:
      "Start with Divergent (Book 1). The trilogy must be read in order — each book follows immediately from the last. Read the novellas (Four: A Divergent Collection) after finishing the main trilogy if you want more of the world.",
    books: [
      { title: 'Divergent', author: 'Veronica Roth', year: 2011, note: 'Book 1 — Tris chooses Dauntless; Dauntless initiation begins' },
      { title: 'Insurgent', author: 'Veronica Roth', year: 2012, note: 'Book 2 — faction war; Tris uncovers the secret the Erudite will kill for' },
      { title: 'Allegiant', author: 'Veronica Roth', year: 2013, note: 'Book 3 — the faction system revealed; one of YA\'s most divisive endings' },
      { title: 'Four: A Divergent Collection', author: 'Veronica Roth', year: 2014, note: "Companion novellas told from Four's POV; best read after the trilogy", isOptional: true },
    ],
    faq: [
      { q: 'What is the Divergent reading order?', a: "Read in trilogy order: Divergent (2011) → Insurgent (2012) → Allegiant (2013). The companion Four: A Divergent Collection (2014) provides bonus novellas from Four's perspective and is best read after the trilogy." },
      { q: 'How many Divergent books are there?', a: "There are 3 main trilogy novels (Divergent, Insurgent, Allegiant) plus one companion collection of novellas (Four: A Divergent Collection). The trilogy is complete." },
      { q: 'Does Allegiant have a happy ending?', a: "Allegiant is famous for its divisive ending. Many readers were surprised by how it ends — it subverts typical YA conventions. The Divergent film series changed the ending for the movie adaptation. Read without spoilers for the best experience." },
      { q: 'Do I need to read Four: A Divergent Collection?', a: "Four is optional but beloved by fans who want more time in the Divergent world. It retells events from Books 1 and 2 from Four's point of view and adds new scenes. Best read after Allegiant." },
    ],
  },
  {
    slug: 'vampire-academy',
    intro:
      "Richelle Mead's Vampire Academy follows Rose Hathaway — a half-vampire Dhampir guardian — and her bond with Lissa Dragomir, a Moroi princess with spirit magic, through St. Vladimir's Academy and beyond. The six-book series spawned the six-book Bloodlines spinoff following Sydney Sage. Read VA first, then Bloodlines — they share characters and the timelines overlap.",
    startWith:
      "Start with Vampire Academy (Book 1). The six VA books must be read in order, as must the six Bloodlines books. Bloodlines is best started after completing VA, though it can be read concurrently from Book 1.",
    books: [
      { title: 'Vampire Academy', author: 'Richelle Mead', year: 2007, note: 'VA Book 1 — Rose and Lissa return to St. Vladimir\'s; the Strigoi threat begins' },
      { title: 'Frostbite', author: 'Richelle Mead', year: 2008, note: 'VA Book 2 — Strigoi attacks escalate; Rose chooses between two paths' },
      { title: 'Shadow Kiss', author: 'Richelle Mead', year: 2008, note: 'VA Book 3 — Rose begins to question everything; a devastating ending' },
      { title: 'Blood Promise', author: 'Richelle Mead', year: 2009, note: "VA Book 4 — Rose leaves the Academy to fulfill her promise; Dimitri's fate" },
      { title: 'Spirit Bound', author: 'Richelle Mead', year: 2010, note: "VA Book 5 — a way to save Strigoi is discovered; shocking consequences" },
      { title: 'Last Sacrifice', author: 'Richelle Mead', year: 2010, note: "VA Book 6 — the VA series finale; the truth about the Dragomir line" },
      { title: 'Bloodlines', author: 'Richelle Mead', year: 2011, note: "Bloodlines Book 1 — Sydney Sage's story begins; set after Last Sacrifice", isOptional: true },
      { title: 'The Golden Lily', author: 'Richelle Mead', year: 2012, note: 'Bloodlines Book 2 — Sydney and Adrian grow closer', isOptional: true },
      { title: 'The Indigo Spell', author: 'Richelle Mead', year: 2013, note: 'Bloodlines Book 3 — Sydney embraces her magic', isOptional: true },
      { title: 'The Fiery Heart', author: 'Richelle Mead', year: 2013, note: 'Bloodlines Book 4 — told from both Sydney and Adrian\'s POV', isOptional: true },
      { title: 'Silver Shadows', author: 'Richelle Mead', year: 2014, note: 'Bloodlines Book 5 — the Alchemists vs. Sydney and Adrian', isOptional: true },
      { title: 'The Ruby Circle', author: 'Richelle Mead', year: 2015, note: 'Bloodlines Book 6 — series conclusion', isOptional: true },
    ],
    faq: [
      { q: 'What is the Vampire Academy reading order?', a: "The Vampire Academy series: Vampire Academy → Frostbite → Shadow Kiss → Blood Promise → Spirit Bound → Last Sacrifice. Then the Bloodlines spinoff: Bloodlines → The Golden Lily → The Indigo Spell → The Fiery Heart → Silver Shadows → The Ruby Circle." },
      { q: 'How many Vampire Academy books are there?', a: "There are 6 Vampire Academy books and 6 Bloodlines books, totaling 12 novels in the shared universe. The original VA series and Bloodlines are both complete." },
      { q: 'Do I have to read Bloodlines after Vampire Academy?', a: "Bloodlines is optional but highly recommended if you want more of the world. It follows Sydney Sage (an Alchemist from VA) and Adrian Ivashkov in a new setting. Major spoilers for VA are present, so finish VA first." },
      { q: 'Is there a Vampire Academy TV show?', a: "Yes — a Vampire Academy TV series premiered on Peacock in 2022 but was cancelled after one season. The show adapts the first book with significant changes to characters and lore." },
    ],
  },
  {
    slug: 'eragon',
    intro:
      "Christopher Paolini began writing Eragon at age fifteen — and the Inheritance Cycle became a publishing phenomenon. Set in Alagaësia, the story follows farm boy Eragon and his dragon Saphira as they join the Varden's rebellion against the evil King Galbatorix. Paolini returned to Alagaësia with Murtagh (2023), a standalone novel following the series' greatest antihero.",
    startWith:
      "Start with Eragon (Book 1). The original cycle must be read in order. Murtagh (2023) takes place after Inheritance and contains major spoilers — read the original four books first.",
    books: [
      { title: 'Eragon', author: 'Christopher Paolini', year: 2003, note: 'Book 1 — Eragon finds a dragon egg; his destiny begins in Alagaësia' },
      { title: 'Eldest', author: 'Christopher Paolini', year: 2005, note: 'Book 2 — Eragon trains among the elves; Roran defends Carvahall' },
      { title: 'Brisingr', author: 'Christopher Paolini', year: 2008, note: 'Book 3 — the war escalates; Eragon forges his sword Brisingr' },
      { title: 'Inheritance', author: 'Christopher Paolini', year: 2011, note: "Book 4 — the series finale; the fate of Galbatorix and Alagaësia decided" },
      { title: 'The Fork, the Witch, and the Worm', author: 'Christopher Paolini', year: 2018, note: 'Companion — three tales set after Inheritance; a bridge to the new era', isOptional: true },
      { title: 'Murtagh', author: 'Christopher Paolini', year: 2023, note: 'Standalone — Murtagh and Thorn, two years after Inheritance; a new adventure' },
    ],
    faq: [
      { q: 'What is the Eragon reading order?', a: "The Inheritance Cycle: Eragon (2003) → Eldest (2005) → Brisingr (2008) → Inheritance (2011). Then optionally The Fork, the Witch, and the Worm (companion tales), then Murtagh (2023), which takes place after Inheritance and follows Murtagh and Thorn." },
      { q: 'How many Eragon books are there?', a: "The original Inheritance Cycle is 4 books (Eragon, Eldest, Brisingr, Inheritance). Christopher Paolini also published a companion collection (The Fork, the Witch, and the Worm) and the standalone novel Murtagh (2023), set two years after Inheritance." },
      { q: 'Is Murtagh a sequel to Eragon?', a: "Murtagh (2023) is a standalone novel set in Alagaësia two years after the events of Inheritance. It follows Murtagh and his dragon Thorn on a new quest. It contains major spoilers for the Inheritance Cycle, so read the original four books first." },
      { q: 'Will there be more Alagaësia books after Murtagh?', a: "Christopher Paolini has expressed intent to write more Alagaësia books. He is also working on The Fractal Shroud, a new science fiction novel outside the Alagaësia universe. Future Alagaësia books have not been formally announced with release dates." },
    ],
  },
  {
    slug: 'maze-runner',
    intro: "James Dashner's Maze Runner trilogy starts in the Glade — a community of boys with no memory, enclosed by a massive maze that kills after dark. Reading order matters here because each book directly follows the previous, and there are two prequel novels that reveal how the maze was built and the world fell apart.",
    startWith: 'The Maze Runner',
    books: [
      { title: 'The Maze Runner', author: 'James Dashner', year: 2009, note: 'Book 1 — Thomas arrives in the Glade with no memory; the maze waits' },
      { title: 'The Scorch Trials', author: 'James Dashner', year: 2010, note: 'Book 2 — The Gladers escape only to face a new, deadlier test' },
      { title: 'The Death Cure', author: 'James Dashner', year: 2011, note: 'Book 3 — The final trial; what W.I.C.K.E.D. was really building toward' },
      { title: 'The Kill Order', author: 'James Dashner', year: 2012, note: 'Prequel — how the Flare virus spread and the world ended; optional but adds context', isOptional: true },
      { title: 'The Fever Code', author: 'James Dashner', year: 2016, note: 'Prequel — how the Maze was built and how the Gladers were chosen; reveals major answers', isOptional: true },
    ],
    faq: [
      { q: 'What is the Maze Runner reading order?', a: "Read the main trilogy first: The Maze Runner (2009) → The Scorch Trials (2010) → The Death Cure (2011). The prequels The Kill Order and The Fever Code are optional and best read after the trilogy — The Fever Code especially, as it reveals major answers." },
      { q: 'How many Maze Runner books are there?', a: "There are 3 main trilogy books (Maze Runner, Scorch Trials, Death Cure) and 2 prequel novels (The Kill Order, The Fever Code), plus a short story companion. The main trilogy is complete; the prequels expand the world." },
      { q: 'Should I read the Maze Runner prequels?', a: "The Kill Order gives more context on how the Flare virus wiped out civilization. The Fever Code is the most important prequel — it shows exactly how the Maze was built and how Thomas and the other Gladers were chosen. Both are optional but add depth to the world." },
      { q: 'Is The Maze Runner based on a book?', a: "Yes — the 2014 film (and its sequels) adapts the Maze Runner trilogy by James Dashner. The films follow the main plot but simplify some characters and condense the world-building that makes the books compelling." },
    ],
  },
  {
    slug: 'red-queen',
    intro: "Victoria Aveyard's Red Queen series starts with a girl who shouldn't have powers — and a court that will do anything to use or destroy her. The series spans 4 main books plus a collection of novellas. Reading order matters because each book ends on a major revelation that sets up the next.",
    startWith: 'Red Queen',
    books: [
      { title: 'Red Queen', author: 'Victoria Aveyard', year: 2015, note: 'Book 1 — Mare Barrow discovers her Silver-level powers in a Red girl\'s body' },
      { title: 'Glass Sword', author: 'Victoria Aveyard', year: 2016, note: 'Book 2 — Mare becomes the Scarlet Guard\'s reluctant symbol while hunting for other newbloods' },
      { title: 'King\'s Cage', author: 'Victoria Aveyard', year: 2017, note: 'Book 3 — Mare is captured; the war for Norta reaches a turning point' },
      { title: 'War Storm', author: 'Victoria Aveyard', year: 2018, note: 'Book 4 — The final battle; all sides converge' },
      { title: 'Broken Throne', author: 'Victoria Aveyard', year: 2019, note: 'Novella collection — stories from secondary characters and the world history; best read after War Storm', isOptional: true },
    ],
    faq: [
      { q: 'What is the Red Queen reading order?', a: "Read in order: Red Queen (2015) → Glass Sword (2016) → King's Cage (2017) → War Storm (2018). The novella collection Broken Throne is optional and best read after War Storm, as it contains major spoilers." },
      { q: 'How many Red Queen books are there?', a: "There are 4 main novels (Red Queen, Glass Sword, King's Cage, War Storm) and 1 novella collection (Broken Throne). The main series is complete. Victoria Aveyard has since written the Realm Breaker epic fantasy trilogy." },
      { q: 'Does Red Queen have a good ending?', a: "War Storm provides a complete ending to the Red Queen saga that most fans find satisfying, though some aspects are bittersweet. The series earned its ending through the consequences it sets up across all four books." },
      { q: 'Is there a Red Queen movie or show?', a: "As of 2025, there is no Red Queen film or show adaptation, though Universal Pictures acquired the rights early on. No production has been officially confirmed." },
    ],
  },
  {
    slug: 'legend',
    intro: "Marie Lu's Legend trilogy is one of the tightest YA dystopian trilogies — three books, three escalating stages of June and Day's revolution, and no filler. The series follows a linear timeline and must be read in order. Lu has also written The Young Elites trilogy and Warcross, set in separate universes.",
    startWith: 'Legend',
    books: [
      { title: 'Legend', author: 'Marie Lu', year: 2011, note: 'Book 1 — Day (most-wanted criminal) and June (military prodigy) are sent to destroy each other' },
      { title: 'Prodigy', author: 'Marie Lu', year: 2013, note: 'Book 2 — Day and June reach the Colonies and discover the Patriot rebels have their own agenda' },
      { title: 'Champion', author: 'Marie Lu', year: 2013, note: 'Book 3 — The Republic and Colonies are at war; Day is dying; June faces an impossible choice' },
      { title: 'Rebel', author: 'Marie Lu', year: 2019, note: 'Companion novel — picks up 10 years after Champion; Day\'s younger brother Eden takes center stage', isOptional: true },
    ],
    faq: [
      { q: 'What is the Legend reading order?', a: "Read the main trilogy in order: Legend (2011) → Prodigy (2013) → Champion (2013). The companion novel Rebel (2019) takes place 10 years later from a new protagonist's perspective and is best read after the trilogy." },
      { q: 'How many Legend books are there?', a: "There are 3 main trilogy books (Legend, Prodigy, Champion) and 1 companion novel (Rebel, set 10 years after Champion). The Legend series is complete. Marie Lu has also written The Young Elites trilogy and the Warcross duology, set in separate universes." },
      { q: 'Is Legend by Marie Lu a series?', a: "Yes — Legend is the first book in the Legend trilogy by Marie Lu. The story continues in Prodigy and Champion, with a companion novel Rebel set 10 years later. The main trilogy must be read in order." },
      { q: 'What is Legend about?', a: "Legend is set in a future United States divided into the Republic and the Colonies, where the government runs brutal Trials to eliminate the weak. Day is the Republic's most wanted criminal; June is its most brilliant military prodigy. When June is sent to hunt Day, what she discovers changes everything." },
    ],
  },
  {
    slug: 'selection',
    intro: "Kiera Cass's Selection series is a five-book dystopian romance that blends The Hunger Games' competition premise with a royal love story. The original trilogy (The Selection, The Elite, The One) follows America Singer. The Crown and The Heir continue with the next generation. Plus there are two novellas giving the competition from the Prince's perspective.",
    startWith: 'The Selection',
    books: [
      { title: 'The Selection', author: 'Kiera Cass', year: 2012, note: 'Book 1 — America Singer is Selected to compete to become Prince Maxon\'s wife' },
      { title: 'The Elite', author: 'Kiera Cass', year: 2013, note: 'Book 2 — The competition narrows; America is caught between Maxon and Aspen' },
      { title: 'The One', author: 'Kiera Cass', year: 2014, note: 'Book 3 — The original trilogy concludes; one girl wins' },
      { title: 'The Heir', author: 'Kiera Cass', year: 2015, note: 'Book 4 — America and Maxon\'s daughter Eadlyn holds her own Selection; new protagonist', isOptional: true },
      { title: 'The Crown', author: 'Kiera Cass', year: 2016, note: 'Book 5 — Eadlyn\'s Selection reaches its conclusion', isOptional: true },
    ],
    faq: [
      { q: 'What is the Selection reading order?', a: "The core trilogy: The Selection (2012) → The Elite (2013) → The One (2014). The Heir (2015) and The Crown (2016) continue with a new protagonist (America's daughter) and can be read as an optional continuation after the original trilogy." },
      { q: 'How many Selection books are there?', a: "There are 5 main novels (The Selection, The Elite, The One, The Heir, The Crown) plus 2 novellas (The Prince and The Guard, from Maxon and Aspen's perspectives). The series is complete." },
      { q: 'Do I have to read The Heir and The Crown?', a: "The Heir and The Crown are optional if you just want America and Maxon's story — the original trilogy ends completely in The One. The Heir and Crown follow a new protagonist in the same world. Most fans who love the first three books eventually read them." },
      { q: 'Is The Selection a dystopia?', a: "The Selection takes place in a future America called Illea, divided into numbered castes (1 through 8). While there is a dystopian framework, the series leans much more heavily on the romance and competition than on the dystopian politics. Readers who want pure dystopia should try The Hunger Games; Selection fans enjoy the romance first." },
    ],
  },
  {
    slug: 'harry-potter',
    intro: "J.K. Rowling's Harry Potter series is the best-selling book series in history with over 600 million copies sold worldwide. The main series is 7 books that must be read in order — each year at Hogwarts builds on the last, and the overarching story won't make sense out of sequence. There are also companion books and the Fantastic Beasts prequel films, but most readers start and finish with the core 7.",
    startWith: "Harry Potter and the Philosopher's Stone",
    books: [
      { title: "Harry Potter and the Philosopher's Stone", author: 'J.K. Rowling', year: 1997, note: "Book 1 — Harry discovers he's a wizard and begins his first year at Hogwarts" },
      { title: 'Harry Potter and the Chamber of Secrets', author: 'J.K. Rowling', year: 1998, note: 'Book 2 — A monster stalks the halls of Hogwarts; Harry hears a voice in the walls' },
      { title: 'Harry Potter and the Prisoner of Azkaban', author: 'J.K. Rowling', year: 1999, note: 'Book 3 — A convicted murderer has escaped Azkaban; the series begins its darker turn' },
      { title: 'Harry Potter and the Goblet of Fire', author: 'J.K. Rowling', year: 2000, note: 'Book 4 — The Triwizard Tournament; Voldemort returns' },
      { title: 'Harry Potter and the Order of the Phoenix', author: 'J.K. Rowling', year: 2003, note: 'Book 5 — The Ministry of Magic denies Voldemort\'s return; the Order fights back' },
      { title: 'Harry Potter and the Half-Blood Prince', author: 'J.K. Rowling', year: 2005, note: 'Book 6 — Dumbledore reveals Voldemort\'s past; the war escalates' },
      { title: 'Harry Potter and the Deathly Hallows', author: 'J.K. Rowling', year: 2007, note: 'Book 7 — The final confrontation; Harry, Ron, and Hermione hunt the Horcruxes' },
      { title: 'Fantastic Beasts and Where to Find Them', author: 'J.K. Rowling', year: 2001, note: 'Companion — a textbook from the Hogwarts curriculum, now as a standalone book; optional', isOptional: true },
      { title: 'The Tales of Beedle the Bard', author: 'J.K. Rowling', year: 2008, note: 'Companion — the fairy tales mentioned in Deathly Hallows; short and optional', isOptional: true },
    ],
    faq: [
      { q: 'What is the Harry Potter reading order?', a: "Read the main 7 books in publication order: Philosopher's Stone → Chamber of Secrets → Prisoner of Azkaban → Goblet of Fire → Order of the Phoenix → Half-Blood Prince → Deathly Hallows. The companion books (Fantastic Beasts, Quidditch Through the Ages, Tales of Beedle the Bard) are short and optional, best read after the main series." },
      { q: 'How many Harry Potter books are there?', a: "There are 7 main Harry Potter novels by J.K. Rowling, plus 3 companion books (Fantastic Beasts and Where to Find Them, Quidditch Through the Ages, The Tales of Beedle the Bard) and the stage play script Harry Potter and the Cursed Child (2016). The main series is complete." },
      { q: 'Should I read Harry Potter in order?', a: "Yes — the Harry Potter series absolutely must be read in order. Each book builds directly on the events of the previous one, and major plot threads from Books 1–3 become crucial in Books 6 and 7. Reading out of order will spoil major reveals." },
      { q: 'What are the Harry Potter books called?', a: "The 7 Harry Potter novels are: The Philosopher's Stone (Sorcerer's Stone in the US), The Chamber of Secrets, The Prisoner of Azkaban, The Goblet of Fire, The Order of the Phoenix, The Half-Blood Prince, and The Deathly Hallows. All published between 1997 and 2007." },
      { q: "Is Harry Potter and the Cursed Child a book?", a: "Harry Potter and the Cursed Child (2016) is the script of a stage play, not a novel. It follows an adult Harry and his son Albus. It is controversial among fans — many do not consider it canonical. It can be read after the main series, but it is not a traditional Harry Potter novel." },
    ],
  },
  {
    slug: 'shadow-and-bone',
    intro: "Leigh Bardugo's Grishaverse spans two major series and multiple novellas, all set in the same world. The recommended reading order depends on your goals: most new readers start with Shadow and Bone, but Six of Crows can technically be read first. The Grishaverse is one of the most expansive and consistent fantasy universes in modern YA.",
    startWith: 'Shadow and Bone',
    books: [
      { title: 'Shadow and Bone', author: 'Leigh Bardugo', year: 2012, note: 'Book 1 of Shadow and Bone trilogy — Alina discovers she is a Grisha Sun Summoner' },
      { title: 'Siege and Storm', author: 'Leigh Bardugo', year: 2013, note: 'Book 2 — Alina and Mal evade the Darkling; the Grisha army takes shape' },
      { title: 'Ruin and Rising', author: 'Leigh Bardugo', year: 2014, note: 'Book 3 — The final confrontation with the Darkling; the war for Ravka' },
      { title: 'Six of Crows', author: 'Leigh Bardugo', year: 2015, note: 'Book 1 of Six of Crows duology — a heist crew assembles for an impossible job in Ketterdam' },
      { title: 'Crooked Kingdom', author: 'Leigh Bardugo', year: 2016, note: 'Book 2 — Kaz Brekker\'s crew face the consequences of their impossible heist' },
      { title: 'King of Scars', author: 'Leigh Bardugo', year: 2019, note: 'Book 1 of King of Scars duology — Nikolai Lantsov is crowned king; contains major Shadow and Bone spoilers', isOptional: true },
      { title: 'Rule of Wolves', author: 'Leigh Bardugo', year: 2021, note: 'Book 2 of King of Scars duology — the Grishaverse war reaches its next chapter', isOptional: true },
      { title: 'The Language of Thorns', author: 'Leigh Bardugo', year: 2017, note: 'Novella collection — fairy tales from across the Grishaverse; beautiful illustrations; optional', isOptional: true },
      { title: 'The Lives of Saints', author: 'Leigh Bardugo', year: 2020, note: 'A short companion about Ravka\'s saints; pairs with Shadow and Bone; optional', isOptional: true },
    ],
    faq: [
      { q: 'What is the Shadow and Bone reading order?', a: "Start with the Shadow and Bone trilogy (Shadow and Bone → Siege and Storm → Ruin and Rising), then Six of Crows → Crooked Kingdom. King of Scars and Rule of Wolves continue with Nikolai and require the full trilogy plus Six of Crows as context." },
      { q: 'Should I read Shadow and Bone or Six of Crows first?', a: "Most readers recommend starting with Shadow and Bone, which introduces the Grishaverse world. Six of Crows can technically be read first (it has a different cast and setting), but several references and a key character will be more meaningful if you've read the Shadow and Bone trilogy first." },
      { q: 'How many books are in the Grishaverse?', a: "The core Grishaverse consists of 7 novels: the Shadow and Bone trilogy (3 books), the Six of Crows duology (2 books), and the King of Scars duology (2 books). Plus 2 novella collections (The Language of Thorns, The Lives of Saints). All written by Leigh Bardugo." },
      { q: 'Is the Shadow and Bone Netflix show in the same order as the books?', a: "The Netflix Shadow and Bone series adapts the Shadow and Bone trilogy for its main storyline while weaving in the Six of Crows characters (who aren't in the original trilogy). The show compresses and reorganizes events from the books significantly — reading the books gives a much more complete picture of the world." },
    ],
  },
  {
    slug: 'twilight',
    intro: "Stephenie Meyer's Twilight saga is a 4-book series that must be read in order — the story follows a continuous arc through Bella Swan's relationships with vampire Edward Cullen and werewolf Jacob Black, from their first meeting through the conclusion of the Cullen-Volturi conflict. Meyer later published Midnight Sun (2020), which retells the first book from Edward's perspective.",
    startWith: 'Twilight',
    books: [
      { title: 'Twilight', author: 'Stephenie Meyer', year: 2005, note: 'Book 1 — Bella moves to Forks, Washington and falls for the mysterious Edward Cullen' },
      { title: 'New Moon', author: 'Stephenie Meyer', year: 2006, note: 'Book 2 — Edward leaves; Bella turns to Jacob; the Volturi are introduced' },
      { title: 'Eclipse', author: 'Stephenie Meyer', year: 2007, note: 'Book 3 — A vampire army targets Forks; Bella must choose between Edward and Jacob' },
      { title: 'Breaking Dawn', author: 'Stephenie Meyer', year: 2008, note: 'Book 4 — The saga concludes; Bella and Edward\'s wedding, transformation, and final confrontation' },
      { title: 'Midnight Sun', author: 'Stephenie Meyer', year: 2020, note: 'Companion — Twilight retold from Edward\'s perspective; best read after the original saga', isOptional: true },
      { title: 'The Short Second Life of Bree Tanner', author: 'Stephenie Meyer', year: 2010, note: 'Novella — the story of a newborn vampire from Eclipse; optional companion', isOptional: true },
    ],
    faq: [
      { q: 'What is the Twilight reading order?', a: "Read in order: Twilight (2005) → New Moon (2006) → Eclipse (2007) → Breaking Dawn (2008). Midnight Sun (2020) retells the first book from Edward's perspective and is best read after the main saga. The Short Second Life of Bree Tanner is a short novella that can be read alongside Eclipse." },
      { q: 'How many Twilight books are there?', a: "There are 4 main Twilight novels (Twilight, New Moon, Eclipse, Breaking Dawn) plus 2 companion books: Midnight Sun (2020), which retells Twilight from Edward's perspective, and The Short Second Life of Bree Tanner, a novella. Stephenie Meyer also published The Chemist and The Host as adult novels separate from the Twilight universe." },
      { q: 'Is Midnight Sun worth reading?', a: "Yes, if you love the Twilight saga — Midnight Sun gives Edward's internal perspective on the events of the first book, including his famous diner scene thoughts and a much darker view of what it costs him to resist Bella. Published 15 years after Twilight, it's a fan service book that delivers exactly what it promises." },
      { q: 'Should I read Twilight in order?', a: "Yes — the Twilight saga follows a continuous story arc and must be read in order. New Moon's central conflict only makes sense in context of Twilight; Eclipse picks up directly from New Moon; and Breaking Dawn is the conclusion of everything set up across the first three books." },
    ],
  },
  {
    slug: 'an-ember-in-the-ashes',
    intro: "Sabaa Tahir's An Ember in the Ashes series is a 4-book fantasy saga set in a Roman-inspired empire where Scholar slaves serve Martial soldiers. The series follows Laia and Elias from opposite sides of the empire's brutality through a revolution neither asked for. Each book picks up directly after the last — this is a series that must be read in order.",
    startWith: 'An Ember in the Ashes',
    books: [
      { title: 'An Ember in the Ashes', author: 'Sabaa Tahir', year: 2015, note: 'Book 1 — Laia goes undercover as a slave; Elias wants to escape the empire he serves' },
      { title: 'A Torch Against the Night', author: 'Sabaa Tahir', year: 2016, note: 'Book 2 — Laia and Elias flee together; the empire closes in' },
      { title: 'A Reaper at the Gates', author: 'Sabaa Tahir', year: 2018, note: 'Book 3 — The Night Bringer\'s plan becomes clear; the Nightbringer arc escalates' },
      { title: 'A Sky Beyond the Storm', author: 'Sabaa Tahir', year: 2020, note: 'Book 4 — The saga concludes; the fate of the Scholar people and the empire decided' },
    ],
    faq: [
      { q: 'What is the An Ember in the Ashes reading order?', a: "Read in order: An Ember in the Ashes (2015) → A Torch Against the Night (2016) → A Reaper at the Gates (2018) → A Sky Beyond the Storm (2020). The series is complete at 4 books. Each book picks up directly where the last ended." },
      { q: 'How many Ember in the Ashes books are there?', a: "There are 4 books in the An Ember in the Ashes series: An Ember in the Ashes, A Torch Against the Night, A Reaper at the Gates, and A Sky Beyond the Storm. The series is complete. Sabaa Tahir's more recent novel All My Rage is a standalone contemporary novel, separate from this world." },
      { q: 'Is An Ember in the Ashes YA or adult?', a: "An Ember in the Ashes is typically classified as YA (young adult), though it is notably darker and more brutal than most YA fantasy. Its themes of slavery, oppression, and warfare are handled with more moral seriousness than typical YA. Adult readers who enjoy dark fantasy regularly pick it up and don't find it feels juvenile." },
      { q: 'What is An Ember in the Ashes inspired by?', a: "Sabaa Tahir drew on ancient Rome for the empire's military structure and brutality, Mughal and Afghan culture for the Scholar people, and the ongoing realities of racial oppression and occupation for the series' emotional core. The world is not a direct historical analogue but draws heavily from multiple real-world sources." },
    ],
  },
  {
    slug: 'scythe',
    intro: "Neal Shusterman's Arc of a Scythe trilogy imagines a world where disease and war have been eliminated by an AI called the Thunderhead, and the only remaining death is by gleaning — administered by an order of Scythes. The trilogy is complete at 3 books and must be read in order, as the story follows a continuous arc. There is also a novella collection, Gleanings, set within the same world.",
    startWith: 'Scythe',
    books: [
      { title: 'Scythe', author: 'Neal Shusterman', year: 2016, note: 'Book 1 — Two teenagers are apprenticed to a Scythe and discover the institution is fracturing' },
      { title: 'Thunderhead', author: 'Neal Shusterman', year: 2018, note: 'Book 2 — The benevolent AI observes the Scythedom\'s corruption; Rowan goes rogue' },
      { title: 'The Toll', author: 'Neal Shusterman', year: 2019, note: 'Book 3 — Three years later; Citra and Rowan face the final reckoning with the Scythedom' },
      { title: 'Gleanings', author: 'Neal Shusterman & various authors', year: 2022, note: 'Novella collection — stories from other characters and corners of the Scythedom world; best read after the trilogy', isOptional: true },
    ],
    faq: [
      { q: 'What is the Scythe reading order?', a: "Read in trilogy order: Scythe (2016) → Thunderhead (2018) → The Toll (2019). The novella collection Gleanings (2022) is optional and best read after the main trilogy. The trilogy is complete." },
      { q: 'How many Scythe books are there?', a: "There are 3 main trilogy books (Scythe, Thunderhead, The Toll) and 1 novella collection (Gleanings). The Arc of a Scythe trilogy is complete. Neal Shusterman also wrote the Unwind series, which has thematically similar moral questions about bodily autonomy and societal control." },
      { q: 'Is Scythe a standalone book?', a: "Scythe can technically be read as a standalone — the first book has a satisfying arc. However, the story continues and escalates significantly in Thunderhead and The Toll, and major plot threads from Scythe are not resolved until Book 3. Most readers who love Scythe read all three." },
      { q: 'What age is Scythe appropriate for?', a: "Scythe is typically classified as YA (ages 12+), but it deals with themes of death, institutionalized killing, and political corruption that are more sophisticated than typical YA. It is one of the most philosophically ambitious YA novels of its decade and is widely read by adults as well as teenagers." },
    ],
  },
  {
    slug: 'the-giver',
    intro: "Lois Lowry's Giver Quartet is four novels set in different communities in the same world — but they do not follow the same characters (except for one key connection in Messenger and Son). The Giver (1993) stands completely alone and is still assigned in schools across the world. Reading the full quartet in order enriches the world significantly.",
    startWith: 'The Giver',
    books: [
      { title: 'The Giver', author: 'Lois Lowry', year: 1993, note: 'Book 1 — Jonas lives in a Community of Sameness; he is chosen as the next Receiver of Memory' },
      { title: 'Gathering Blue', author: 'Lois Lowry', year: 2000, note: 'Book 2 — Kira, a crippled girl, discovers her community is also hiding something; set in a different, crueler society' },
      { title: 'Messenger', author: 'Lois Lowry', year: 2004, note: 'Book 3 — Matty lives in Village, the refuge; characters from Books 1 and 2 appear' },
      { title: 'Son', author: 'Lois Lowry', year: 2012, note: 'Book 4 — Claire is the birth mother of Jonas\'s Gabe; her search across 30 years concludes the quartet' },
    ],
    faq: [
      { q: 'What is The Giver reading order?', a: "The Giver Quartet: The Giver (1993) → Gathering Blue (2000) → Messenger (2004) → Son (2012). The Giver stands alone as a standalone novel. The later books expand the world and connect characters from Books 1 and 2, but they are separate stories, not direct sequels to The Giver." },
      { q: 'How many Giver books are there?', a: "There are 4 books in The Giver Quartet: The Giver, Gathering Blue, Messenger, and Son. The series is complete. The books are set in different communities in the same world, with characters from Books 1 and 2 meeting in Book 3." },
      { q: 'Is The Giver a series or standalone?', a: "The Giver (1993) is a standalone novel that works perfectly on its own — it is widely read in schools as a standalone. Lois Lowry later wrote three companion novels (Gathering Blue, Messenger, Son) set in the same world, culminating in Son, which directly connects back to Jonas and Gabe from The Giver." },
      { q: 'What is The Giver about?', a: "The Giver is set in a futuristic society that has achieved peace by eliminating pain, conflict, and memory from human experience — a process called Sameness. Twelve-year-old Jonas is chosen as the Receiver of Memory, the one person allowed to hold all the memories of emotion and history that his community has given up, and discovers the cost of his community's 'perfect' world." },
    ],
  },
  {
    slug: 'unwind',
    intro: "Neal Shusterman's Unwind Dystology is a 5-book complete series set in a future America where the Second Civil War ended with a compromise — abortion is illegal, but any teenager aged 13–18 can be 'unwound': their body parts harvested and redistributed to others, keeping them 'alive in a divided state.' The series follows Connor, Risa, and Lev through a revolution against this system.",
    startWith: 'Unwind',
    books: [
      { title: 'Unwind', author: 'Neal Shusterman', year: 2007, note: 'Book 1 — Three teens are scheduled to be unwound; they escape and discover how large the resistance is' },
      { title: 'UnWholly', author: 'Neal Shusterman', year: 2012, note: 'Book 2 — The Graveyard grows; AWOL unwinds become a political problem; new characters introduced' },
      { title: 'UnSouled', author: 'Neal Shusterman', year: 2013, note: 'Book 3 — Connor and Lev travel to find the source of unwinding; the Cam experiment escalates' },
      { title: 'UnDivided', author: 'Neal Shusterman', year: 2014, note: 'Book 4 — The revolution reaches its crisis; the future of unwinding is decided' },
      { title: 'UnBound', author: 'Neal Shusterman', year: 2015, note: 'Book 5 — Short story collection in the Unwind universe; optional companion after Book 4', isOptional: true },
    ],
    faq: [
      { q: 'What is the Unwind reading order?', a: "Read in series order: Unwind (2007) → UnWholly (2012) → UnSouled (2013) → UnDivided (2014). UnBound (2015) is a short story collection and optional companion, best read after UnDivided. The main story is complete at 4 books." },
      { q: 'How many Unwind books are there?', a: "There are 4 main novels (Unwind, UnWholly, UnSouled, UnDivided) and 1 short story collection (UnBound). The Unwind Dystology is complete. Neal Shusterman also wrote the Scythe trilogy, which has thematically similar moral questions about death and societal control." },
      { q: 'Is Unwind a series or standalone?', a: "Unwind can work as a standalone — the first book has a satisfying arc of its own. However, the story of the Second Civil War and the unwinding system continues across 4 books, and UnDivided provides the resolution. Most fans read all four main books." },
      { q: 'What age is Unwind appropriate for?', a: "Unwind is typically classified as YA (ages 13+), but it deals with graphic themes of bodily autonomy, harvesting, and political violence that are more disturbing than most YA. The famous 'unwinding chapter' in Book 1 is one of the most-discussed scenes in YA fiction. Mature teens and adults read it regularly." },
    ],
  },
  {
    slug: 'handmaids-tale',
    intro: "Margaret Atwood's Handmaid's Tale is a two-book series — though the original novel (1985) works as a complete standalone and is more widely read on its own. The Testaments (2019), which won the Booker Prize, is a direct sequel set 15 years after the original, told from three new perspectives. Both are essential if you want the full arc of Gilead.",
    startWith: "The Handmaid's Tale",
    books: [
      { title: "The Handmaid's Tale", author: 'Margaret Atwood', year: 1985, note: 'Book 1 — Offred narrates her life as a handmaid in the theocratic Republic of Gilead' },
      { title: 'The Testaments', author: 'Margaret Atwood', year: 2019, note: 'Book 2 — Three women\'s perspectives 15 years after the original; won the Booker Prize' },
    ],
    faq: [
      { q: "What is The Handmaid's Tale reading order?", a: "Read The Handmaid's Tale (1985) first, then The Testaments (2019). The Testaments is set 15 years after the original and contains major spoilers for the first book. Both are standalone enough to read independently, but The Handmaid's Tale provides essential context for The Testaments." },
      { q: "How many Handmaid's Tale books are there?", a: "There are 2 books: The Handmaid's Tale (1985) and The Testaments (2019). The Testaments won the 2019 Booker Prize (shared with Girl, Woman, Other). Margaret Atwood has stated The Testaments is the conclusion of the Gilead story." },
      { q: "Is The Handmaid's Tale a standalone?", a: "Yes — The Handmaid's Tale (1985) works as a complete standalone and is widely taught and read on its own. The Testaments (2019) is a sequel set 15 years later, told from new perspectives, and can only be fully appreciated if you've read the original." },
      { q: "What is The Handmaid's Tale TV show based on?", a: "The Hulu series The Handmaid's Tale (2017-present) adapts the first novel and then continues beyond the book's ending. Seasons 1-2 roughly cover the first novel; Seasons 3-5 go well beyond it. The Testaments novel covers similar ground to later seasons but with different characters and perspectives." },
    ],
  },
  {
    slug: 'children-of-blood-and-bone',
    intro: "Tomi Adeyemi's Legacy of Orïsha is a planned trilogy — two books have been published, with the third still forthcoming. The series is set in a West African-inspired world where magic was exterminated by the king, and follows Zélie Adebola's quest to restore it. Both published books must be read in order.",
    startWith: 'Children of Blood and Bone',
    books: [
      { title: 'Children of Blood and Bone', author: 'Tomi Adeyemi', year: 2018, note: 'Book 1 — Zélie discovers a scroll that could restore magic; the king\'s son pursues her' },
      { title: 'Children of Virtue and Vengeance', author: 'Tomi Adeyemi', year: 2019, note: 'Book 2 — Divided kingdoms; the reborn Maji war with those born without magic' },
      { title: 'Children of Anguish and Anarchy', author: 'Tomi Adeyemi', year: 2025, note: 'Book 3 — The trilogy conclusion', isUpcoming: true },
    ],
    faq: [
      { q: 'What is the Children of Blood and Bone reading order?', a: "Read Children of Blood and Bone (2018) first, then Children of Virtue and Vengeance (2019). The third book, Children of Anguish and Anarchy, is the trilogy conclusion. All three must be read in order." },
      { q: 'How many Children of Blood and Bone books are there?', a: "The Legacy of Orïsha series is a planned trilogy by Tomi Adeyemi. Two books have been published: Children of Blood and Bone (2018) and Children of Virtue and Vengeance (2019). The third book, Children of Anguish and Anarchy, completes the trilogy." },
      { q: 'Is Children of Blood and Bone a standalone?', a: "No — Children of Blood and Bone ends on a major cliffhanger that is not resolved until Children of Virtue and Vengeance. Both books must be read in order, and the trilogy requires all three books for a complete story." },
      { q: 'What mythology is Children of Blood and Bone based on?', a: "Children of Blood and Bone draws heavily on Yoruba mythology and West African culture, particularly Nigerian history and folklore. Author Tomi Adeyemi drew on her own Nigerian heritage and conducted extensive research into Yoruba religious and mythological traditions to create the world of Orïsha." },
    ],
  },
  {
    slug: 'matched',
    intro: "Ally Condie's Matched trilogy is a complete dystopian romance trilogy set in the Society — a future civilization that controls every aspect of citizens' lives, including who they marry (their Match). The series follows Cassia Reyes, who begins to question the Society's perfect order when she falls for someone other than her Matched partner. All three books should be read in order.",
    startWith: 'Matched',
    books: [
      { title: 'Matched', author: 'Ally Condie', year: 2010, note: 'Book 1 — Cassia is Matched with her best friend Xander, but then sees another face on her card' },
      { title: 'Crossed', author: 'Ally Condie', year: 2011, note: 'Book 2 — Cassia escapes the Society to find Ky in the Outer Provinces' },
      { title: 'Reached', author: 'Ally Condie', year: 2012, note: 'Book 3 — The Rising begins; all three POVs converge for the finale' },
    ],
    faq: [
      { q: 'What is the Matched reading order?', a: "Read Matched (2010), then Crossed (2011), then Reached (2012). The trilogy must be read in order — each book ends on a cliffhanger resolved in the next." },
      { q: 'How many Matched books are there?', a: "Ally Condie's Matched series is a complete trilogy: Matched (2010), Crossed (2011), and Reached (2012). There are also two short novellas — Xander's Choice and Ky's Story — which are optional companion pieces." },
      { q: 'Is Matched similar to The Hunger Games?', a: "Matched shares the YA dystopia genre with The Hunger Games but focuses far more on romance and the emotional experience of living under a controlling government than on action and survival. If you loved the Hunger Games but want more romance and less violence, Matched is a perfect next read." },
      { q: 'Is Matched a standalone or series?', a: "Matched is the first book in a trilogy. It ends on a cliffhanger, so you will need to continue with Crossed and Reached for the full story." },
    ],
  },
  {
    slug: 'three-dark-crowns',
    intro: "Kendare Blake's Three Dark Crowns is a complete four-book YA dark fantasy series. On the island of Fennbirn, every generation three triplet queens are born, each with a different power, and they must kill each other to claim the throne. The series is brutal, twisty, and best read in order — each book recontextualizes what came before.",
    startWith: 'Three Dark Crowns',
    books: [
      { title: 'Three Dark Crowns', author: 'Kendare Blake', year: 2016, note: 'Book 1 — Meet the three sisters: poisoner Katharine, elemental Mirabella, and naturalist Arsinoe' },
      { title: 'One Dark Throne', author: 'Kendare Blake', year: 2017, note: 'Book 2 — The Quickening begins; alliances form and first blood is drawn' },
      { title: 'Two Dark Reigns', author: 'Kendare Blake', year: 2018, note: 'Book 3 — A fourth queen emerges; the island\'s history is rewritten' },
      { title: 'Five Dark Fates', author: 'Kendare Blake', year: 2019, note: 'Book 4 — The final battle for the throne; all fates converge' },
    ],
    faq: [
      { q: 'What is the Three Dark Crowns reading order?', a: "Read Three Dark Crowns (2016), One Dark Throne (2017), Two Dark Reigns (2018), and Five Dark Fates (2019). All four books must be read in order — the series has major plot twists that build on each book." },
      { q: 'How many Three Dark Crowns books are there?', a: "The Three Dark Crowns series by Kendare Blake is a complete four-book series: Three Dark Crowns, One Dark Throne, Two Dark Reigns, and Five Dark Fates. The series is fully published with no further books planned." },
      { q: 'Is Three Dark Crowns similar to Red Queen?', a: "Three Dark Crowns and Red Queen both feature class power dynamics and women fighting for power in a corrupt system. Three Dark Crowns is darker and more focused on court intrigue, magic, and sisterhood, while Red Queen has more action and romance. Fans of one typically love the other." },
      { q: 'Is Three Dark Crowns a standalone?', a: "No — Three Dark Crowns is the first book in a four-book series by Kendare Blake. The first book ends on a significant cliffhanger and the story is not complete until Five Dark Fates." },
    ],
  },
  {
    slug: 'warcross',
    intro: "Marie Lu's Warcross duology is a complete two-book YA sci-fi series set in a near-future world dominated by the Warcross virtual reality game. Emika Chen is a bounty hunter who accidentally hacks her way into the game's global championship — and is recruited by the game's billionaire creator to go undercover. The duology must be read in order.",
    startWith: 'Warcross',
    books: [
      { title: 'Warcross', author: 'Marie Lu', year: 2017, note: 'Book 1 — Emika accidentally glitches into the Warcross championships and is recruited as a spy' },
      { title: 'Wildcard', author: 'Marie Lu', year: 2018, note: 'Book 2 — Emika goes deeper into the conspiracy behind Warcross; the duology conclusion' },
    ],
    faq: [
      { q: 'What is the Warcross reading order?', a: "Read Warcross (2017) first, then Wildcard (2018). Warcross is a complete two-book duology by Marie Lu — read both books in order for the full story." },
      { q: 'How many Warcross books are there?', a: "Warcross is a duology by Marie Lu: Warcross (2017) and Wildcard (2018). Both books are published and the story is complete." },
      { q: 'Is Warcross by the same author as Legend?', a: "Yes — both Warcross and Legend are by Marie Lu. If you loved Legend's dual-POV storytelling and high-stakes action, Warcross delivers a similar cinematic pace with a futuristic virtual reality setting instead of a post-apocalyptic world." },
      { q: 'Is Warcross part of the Legend series?', a: "No — Warcross and Legend are separate series by Marie Lu set in entirely different worlds. Legend is a dystopian series with military themes; Warcross is a near-future sci-fi series about virtual reality gaming. They share Marie Lu's signature dual-POV storytelling and pacing, but are otherwise unconnected." },
    ],
  },
  {
    slug: 'young-elites',
    intro: "Marie Lu's Young Elites is a complete dark YA fantasy trilogy about a survivor of a blood fever who discovers she has powers — and is recruited by a secret society of marked rebels. Unlike most YA heroines, Adelina Amouteru is not a hero; she is a villain-in-the-making, and her slow fall is the subject of the trilogy. All three books must be read in order.",
    startWith: 'The Young Elites',
    books: [
      { title: 'The Young Elites', author: 'Marie Lu', year: 2014, note: "Book 1 — Adelina survives the blood fever with a power she can't control and is recruited by the Dagger Society" },
      { title: 'The Rose Society', author: 'Marie Lu', year: 2015, note: "Book 2 — Adelina forms her own order of Elites and begins her descent" },
      { title: 'The Midnight Star', author: 'Marie Lu', year: 2016, note: "Book 3 — The trilogy conclusion; Adelina's fate and the fate of all Elites" },
    ],
    faq: [
      { q: 'What is the Young Elites reading order?', a: "Read The Young Elites (2014), then The Rose Society (2015), then The Midnight Star (2016). The trilogy must be read in order — Adelina's arc across all three books is the core of the series." },
      { q: 'How many Young Elites books are there?', a: "The Young Elites series by Marie Lu is a complete trilogy: The Young Elites (2014), The Rose Society (2015), and The Midnight Star (2016). There are no additional books planned." },
      { q: 'Is The Young Elites connected to Legend or Warcross?', a: "No — The Young Elites is a standalone series by Marie Lu set in a completely different world from Legend and Warcross. All three series are by Marie Lu but have no shared characters, settings, or storylines." },
      { q: 'Is The Young Elites a villain origin story?', a: "Yes — The Young Elites is unusual for YA fantasy in that Adelina Amouteru is not a traditional hero. The trilogy chronicles her transformation from a frightened, abused survivor into a ruthless villain. Marie Lu has described the series as what happens to the villain before the hero's story begins." },
    ],
  },
  {
    slug: 'delirium',
    intro: "Lauren Oliver's Delirium trilogy is set in a future America where love — classified as the disease Amor Deliria Nervosa — has been cured. At eighteen, all citizens receive the procedure that removes the ability to love. Lena Haloway is ninety-five days from her cure when she meets Alex and falls in love for the first time. The trilogy is a complete story that should be read in order.",
    startWith: 'Delirium',
    books: [
      { title: 'Delirium', author: 'Lauren Oliver', year: 2011, note: 'Book 1 — Lena is weeks from the cure when she meets Alex and falls in love for the first time' },
      { title: 'Pandemonium', author: 'Lauren Oliver', year: 2012, note: 'Book 2 — After Portland, Lena joins the resistance in New York; alternating timelines' },
      { title: 'Requiem', author: 'Lauren Oliver', year: 2013, note: 'Book 3 — Lena and Hana (her best friend, now cured) tell the final story in alternating chapters' },
    ],
    faq: [
      { q: 'What is the Delirium reading order?', a: "Read Delirium (2011), then Pandemonium (2012), then Requiem (2013). The trilogy must be read in order. There are also optional novellas — Hana, Annabel, and Raven — which explore side characters but are not required for the main story." },
      { q: 'How many Delirium books are there?', a: "Lauren Oliver's Delirium series is a complete trilogy: Delirium (2011), Pandemonium (2012), and Requiem (2013). There are three companion novellas (Hana, Annabel, and Raven) that are optional. No further books are planned." },
      { q: 'Is Delirium similar to Matched?', a: "Yes — Delirium and Matched are very similar: both are YA dystopian romances set in societies that control who you love, both feature quiet prose and slow-burn romance, and both launched in the early 2010s dystopia wave. Delirium is slightly darker and more action-oriented; Matched is more lyrical and internal." },
      { q: 'Is Delirium a standalone?', a: "No — Delirium ends on a cliffhanger that is not resolved until Pandemonium. You need all three books for the complete story, though Requiem's dual-narrative ending has divided readers." },
    ],
  },
  {
    slug: 'gentleman-bastard',
    intro: "Scott Lynch's Gentleman Bastard sequence is an ongoing heist fantasy series following Locke Lamora, a thief-priest of the god Perelandro and the leader of the Gentleman Bastards — a crew of elite con artists operating in the city of Camorr. Three books have been published; a fourth is in progress. The series must be read in order.",
    startWith: 'The Lies of Locke Lamora',
    books: [
      { title: 'The Lies of Locke Lamora', author: 'Scott Lynch', year: 2006, note: 'Book 1 — Locke and his crew run an elaborate con while a mysterious killer begins targeting the criminal underworld' },
      { title: 'Red Seas Under Red Skies', author: 'Scott Lynch', year: 2007, note: 'Book 2 — Locke and Jean infiltrate a casino and end up shanghaied into a pirate war' },
      { title: 'The Republic of Thieves', author: 'Scott Lynch', year: 2013, note: 'Book 3 — A Bondsmage offers Locke a cure for poison — if he rigs an election in a city of mages' },
      { title: 'The Thorn of Emberlain', author: 'Scott Lynch', year: 'TBD', note: 'Book 4 — Long-anticipated; publication date not yet announced', isUpcoming: true },
    ],
    faq: [
      { q: 'What is the Gentleman Bastard reading order?', a: "Read The Lies of Locke Lamora (2006), then Red Seas Under Red Skies (2007), then The Republic of Thieves (2013). A fourth book, The Thorn of Emberlain, is forthcoming. All books must be read in order." },
      { q: 'How many Gentleman Bastard books are there?', a: "Three books have been published in Scott Lynch's Gentleman Bastard sequence: The Lies of Locke Lamora (2006), Red Seas Under Red Skies (2007), and The Republic of Thieves (2013). A fourth book, The Thorn of Emberlain, has been in progress for many years with no confirmed publication date." },
      { q: 'Is The Lies of Locke Lamora a standalone?', a: "The Lies of Locke Lamora works very well as a standalone novel — it tells a complete heist story with a satisfying ending. However, the characters and world continue in the sequels, and the series is planned as a seven-book sequence. Most readers find the first book compelling enough to continue immediately." },
      { q: 'What genre is the Gentleman Bastard series?', a: "The Gentleman Bastard sequence is fantasy heist fiction — set in a secondary world with elements of Renaissance Italy, featuring elaborate cons, criminal underworlds, magic, and ocean adventure. It is classified as grimdark or flintlock fantasy and is aimed at adult readers rather than YA." },
    ],
  },
  {
    slug: 'night-circus',
    intro: "Erin Morgenstern's The Night Circus is a standalone novel — there is no series and no direct sequel. Morgenstern's second novel, The Starless Sea (2019), is set in a completely separate world and has no characters or plot connections to The Night Circus. If you're looking for more from Morgenstern, The Starless Sea is your only option, and it shares the dreamlike, layered prose but not the competitive magic structure.",
    startWith: 'The Night Circus',
    books: [
      { title: 'The Night Circus', author: 'Erin Morgenstern', year: 2011, note: "Standalone — Celia and Marco are bound to a magical competition taking place inside a black-and-white circus that appears without warning" },
      { title: 'The Starless Sea', author: 'Erin Morgenstern', year: 2019, note: "Separate standalone — a graduate student falls into an underground world of stories; same dreamy prose, different world" },
    ],
    faq: [
      { q: 'Is The Night Circus a series?', a: "No — The Night Circus is a standalone novel by Erin Morgenstern. There is no sequel and no series. Morgenstern's second novel, The Starless Sea (2019), is a separate standalone in a different world." },
      { q: 'Do I need to read The Night Circus before The Starless Sea?', a: "No — The Night Circus and The Starless Sea are completely separate standalone novels. They share Morgenstern's distinctive atmospheric, layered prose but have different characters, settings, and plots. You can read either in any order or either alone." },
      { q: 'What is The Night Circus about?', a: "The Night Circus is set in a mysterious black-and-white circus that appears without warning and is open only at night. Two young magicians, Celia and Marco, are bound by their teachers to a competition that takes place inside the circus. The novel alternates between the 1870s and 1902, and is as much about the circus itself as about the competitors who inhabit it." },
      { q: 'Is The Night Circus fantasy or magical realism?', a: "The Night Circus straddles both — it is set in a recognizable historical world (late 19th/early 20th century Europe and America) and features magic that is ambiguous rather than system-based, which is characteristic of magical realism. Most booksellers shelve it as fantasy, but its aesthetic and tonal sensibility are closer to literary magical realism." },
    ],
  },
  {
    slug: 'city-of-brass',
    intro: "S.A. Chakraborty's Daevabad trilogy is a complete three-book adult fantasy series drawing on Islamic mythology, djinn folklore, and the history of the medieval Islamic world. The story follows Nahri, a con artist in 18th-century Cairo who discovers she has a hidden identity that pulls her into the ancient city of Daevabad. All three books must be read in order.",
    startWith: 'The City of Brass',
    books: [
      { title: 'The City of Brass', author: 'S.A. Chakraborty', year: 2017, note: 'Book 1 — Nahri accidentally summons a djinn warrior in 18th-century Cairo and is swept to the hidden city of Daevabad' },
      { title: 'The Kingdom of the Wicked', author: 'S.A. Chakraborty', year: 2019, note: 'Book 2 — Daevabad fractures as Nahri navigates court politics and a brewing revolution' },
      { title: 'The Empire of Gold', author: 'S.A. Chakraborty', year: 2020, note: 'Book 3 — The trilogy conclusion; all factions converge as Daevabad burns' },
    ],
    faq: [
      { q: 'What is the City of Brass reading order?', a: "Read The City of Brass (2017), then The Kingdom of the Wicked (2019), then The Empire of Gold (2020). The Daevabad trilogy by S.A. Chakraborty must be read in order — each book ends on significant cliffhangers." },
      { q: 'How many City of Brass books are there?', a: "The Daevabad trilogy by S.A. Chakraborty is a complete three-book series: The City of Brass (2017), The Kingdom of the Wicked (2019), and The Empire of Gold (2020). Chakraborty also wrote The Adventures of Amina al-Sirafi (2023), a separate series set in the same world but with different characters and 12th-century setting." },
      { q: 'Is City of Brass part of a series?', a: "Yes — The City of Brass is the first book of the Daevabad trilogy by S.A. Chakraborty. The trilogy is complete with three books: The City of Brass, The Kingdom of the Wicked, and The Empire of Gold." },
      { q: 'What mythology is City of Brass based on?', a: "The City of Brass draws extensively on Islamic mythology, particularly djinn folklore from Arabic, Persian, and South Asian traditions, as well as the history of the medieval Islamic world. Author S.A. Chakraborty has cited the works of Islamic historians and her own study of Arabic and Islamic history as major research sources for the series." },
    ],
  },
  {
    slug: 'priory-of-the-orange-tree',
    intro: "Samantha Shannon's The Priory of the Orange Tree is a standalone epic fantasy novel — one of the longest single fantasy volumes published in the modern era at around 850 pages. Shannon has also written a prequel, A Day of Fallen Night (2023), set 500 years before the main novel. The two books can be read in any order; A Day of Fallen Night is set in the same world but tells a different story.",
    startWith: 'The Priory of the Orange Tree',
    books: [
      { title: 'The Priory of the Orange Tree', author: 'Samantha Shannon', year: 2019, note: 'Standalone — four narrators across three kingdoms, a sleeping dragon god, and a dragon-rider queen defending an ancient order' },
      { title: 'A Day of Fallen Night', author: 'Samantha Shannon', year: 2023, note: 'Prequel — set 500 years before Priory; standalone, can be read in any order' },
    ],
    faq: [
      { q: 'Is The Priory of the Orange Tree a series?', a: "The Priory of the Orange Tree is a standalone epic fantasy novel, not the start of a series. Samantha Shannon also wrote a prequel, A Day of Fallen Night (2023), set 500 years before the main novel. Both books are self-contained and can be read in any order." },
      { q: 'How long is The Priory of the Orange Tree?', a: "The Priory of the Orange Tree is approximately 848 pages and 298,000 words, making it one of the longest single-volume fantasy novels published in recent years. Despite its length, readers consistently note its fast pacing across four distinct POV characters." },
      { q: 'Is The Priory of the Orange Tree a feminist fantasy?', a: "Yes — The Priory of the Orange Tree centers on female protagonists, features a dragon-rider queen, and imagines a world where women hold significant political and religious power. Shannon has cited her desire to write a high fantasy that didn't center male experience as a primary motivation for the book." },
      { q: 'Should I read Priory of the Orange Tree or A Day of Fallen Night first?', a: "You can read either first. A Day of Fallen Night is a prequel set 500 years before Priory and functions as a complete standalone story. Most readers start with The Priory of the Orange Tree (published first and more widely read), but reading A Day of Fallen Night first provides historical context that enriches the later book." },
    ],
  },
  {
    slug: 'bear-and-the-nightingale',
    intro: "Katherine Arden's Winternight Trilogy is a complete three-book historical fantasy set in medieval Russia, following Vasilisa Petrovna — a girl who can see the old spirits her village's Christianity is working to erase. The trilogy draws on authentic Slavic mythology and the history of medieval Russia. All three books should be read in order; the story is one complete arc across the trilogy.",
    startWith: 'The Bear and the Nightingale',
    books: [
      { title: 'The Bear and the Nightingale', author: 'Katherine Arden', year: 2017, note: "Book 1 — Vasya is a strange child in a village where the old spirits are dying as Christianity spreads; she alone can still see them" },
      { title: 'The Girl in the Tower', author: 'Katherine Arden', year: 2017, note: "Book 2 — Vasya escapes her village and travels to Moscow, disguised as a boy; the Winter King's power grows" },
      { title: 'The Winter of the Witch', author: 'Katherine Arden', year: 2019, note: "Book 3 — Moscow burns; Vasya must choose between the old world and the new, and between two winter kings" },
    ],
    faq: [
      { q: 'What is The Bear and the Nightingale reading order?', a: "Read The Bear and the Nightingale (2017), then The Girl in the Tower (2017), then The Winter of the Witch (2019). The Winternight Trilogy must be read in order — it tells one continuous story across all three books." },
      { q: 'How many Bear and the Nightingale books are there?', a: "Katherine Arden's Winternight Trilogy is a complete three-book series: The Bear and the Nightingale (2017), The Girl in the Tower (2017), and The Winter of the Witch (2019). The trilogy is fully published and concluded." },
      { q: 'What mythology is The Bear and the Nightingale based on?', a: "The Bear and the Nightingale draws on authentic Slavic mythology, particularly Russian folk tales and the spirit-world (domovoi, dvorovoi, bannik, and other household and natural spirits) that Russian peasant Christianity absorbed or suppressed. Arden studied Russian at Middlebury College and researched Russian folklore extensively for the series." },
      { q: 'Is The Bear and the Nightingale similar to Jonathan Strange & Mr Norrell?', a: "They share an atmospheric, literary approach to magic that treats it as both ancient and dangerous, and both are set in recognizable historical periods (medieval Russia vs. Napoleonic England). Arden's prose is more accessible and her pacing faster; Clarke's is more ironic and exhaustively detailed. Both are excellent." },
    ],
  },
  {
    slug: 'a-memory-called-empire',
    intro: "Arkady Martine's Teixcalaan series is a complete two-book space opera set in an interstellar empire. The story begins when Mahit Dzmare, the ambassador from a small independent mining station, arrives at the empire's capital to investigate the death of her predecessor. The two novels must be read in order; both follow Mahit and Three Seagrass across two distinct crises.",
    startWith: 'A Memory Called Empire',
    books: [
      { title: 'A Memory Called Empire', author: 'Arkady Martine', year: 2019, note: "Book 1 — Ambassador Mahit Dzmare arrives at Teixcalaan's capital and discovers her predecessor was murdered; won the Hugo Award" },
      { title: 'A Desolation Called Peace', author: 'Arkady Martine', year: 2021, note: "Book 2 — Three Seagrass investigates an alien contact scenario at the edge of empire; won the Hugo Award" },
    ],
    faq: [
      { q: 'What is A Memory Called Empire reading order?', a: "Read A Memory Called Empire (2019) first, then A Desolation Called Peace (2021). The Teixcalaan series by Arkady Martine is a complete duology — both books must be read in order, though A Desolation Called Peace features a partially different cast." },
      { q: 'How many Teixcalaan books are there?', a: "The Teixcalaan series by Arkady Martine currently consists of two books: A Memory Called Empire (2019) and A Desolation Called Peace (2021). Both won the Hugo Award for Best Novel. Martine has indicated possible future books but none are announced." },
      { q: 'What is A Memory Called Empire about?', a: "A Memory Called Empire follows Mahit Dzmare, the ambassador from Lsel Station — a small independent mining station — who arrives at the capital of the Teixcalaan empire to investigate the death of her predecessor. She carries a neurological implant containing a copy of her predecessor's memories, which may be outdated and failing. The novel is a political thriller about empire, identity, and the seduction of assimilation." },
      { q: 'Is A Memory Called Empire science fiction or fantasy?', a: "A Memory Called Empire is classified as science fiction — a space opera set in an interstellar empire — but its sensibility and prose style are closer to literary fiction and political fantasy. Arkady Martine is a Byzantine historian, and the novel draws heavily on Byzantine imperial court structure and culture." },
    ],
  },
  {
    slug: 'daughter-of-the-moon-goddess',
    intro: "Sue Lynn Tan's Celestial Kingdom duology is a complete two-book fantasy drawing on Chinese mythology, particularly the legend of Chang'e (the moon goddess) and her daughter. Both books must be read in order; the duology tells a complete story across both volumes.",
    startWith: 'Daughter of the Moon Goddess',
    books: [
      { title: 'Daughter of the Moon Goddess', author: 'Sue Lynn Tan', year: 2022, note: "Book 1 — Xingyin flees the moon to save her mother and trains as a celestial soldier, hiding her identity" },
      { title: 'Heart of the Sun Warrior', author: 'Sue Lynn Tan', year: 2022, note: "Book 2 — The duology conclusion; Xingyin faces the greatest threat to the celestial kingdom" },
    ],
    faq: [
      { q: 'What is the Daughter of the Moon Goddess reading order?', a: "Read Daughter of the Moon Goddess (2022) first, then Heart of the Sun Warrior (2022). The Celestial Kingdom duology by Sue Lynn Tan must be read in order — Heart of the Sun Warrior is the direct continuation and conclusion." },
      { q: 'How many Daughter of the Moon Goddess books are there?', a: "The Celestial Kingdom series by Sue Lynn Tan is a complete duology: Daughter of the Moon Goddess (2022) and Heart of the Sun Warrior (2022). Both books are published and the story is complete." },
      { q: 'What mythology is Daughter of the Moon Goddess based on?', a: "Daughter of the Moon Goddess draws primarily on the legend of Chang'e, the Chinese moon goddess who drank an immortality elixir and was exiled to the moon, and the larger mythology of Chinese celestial culture — the Jade Emperor, celestial soldiers, and the mortal realm. Tan also draws on the legend of Houyi the archer and the Monkey King." },
      { q: 'Is Daughter of the Moon Goddess similar to City of Brass or The Poppy War?', a: "All three draw on non-Western mythology with similar literary seriousness. Daughter of the Moon Goddess is the most lyrical and romantic of the three; The Poppy War is the most brutal and historically grounded; City of Brass is the most politically intricate. All three reward readers who want fantasy built from sources outside the Western European tradition." },
    ],
  },
  {
    slug: 'piranesi',
    intro: "Susanna Clarke's Piranesi (2020) is a standalone novel — there is no series and no sequel. It is completely unrelated to Clarke's first novel, Jonathan Strange & Mr Norrell, despite sharing Clarke's distinctive voice and interest in a magical world with its own rules. Both novels can be read as standalones in any order.",
    startWith: 'Piranesi',
    books: [
      { title: 'Piranesi', author: 'Susanna Clarke', year: 2020, note: "Standalone — Piranesi lives alone in a house of infinite halls, tidal hallways, and statues, and keeps careful notes about both, until he discovers he may not be as alone as he thinks" },
    ],
    faq: [
      { q: 'Is Piranesi a series?', a: "No — Piranesi is a standalone novel by Susanna Clarke. There is no sequel and no series. Clarke also wrote Jonathan Strange & Mr Norrell, but that is a completely separate standalone novel in a different world." },
      { q: 'Should I read Jonathan Strange & Mr Norrell before Piranesi?', a: "No — Piranesi and Jonathan Strange & Mr Norrell are completely unrelated standalone novels. They share Susanna Clarke's distinctive voice and her interest in a magical world with its own rules, but they have different settings, characters, and stories. You can read either first." },
      { q: 'What is Piranesi about?', a: "Piranesi lives alone in a vast House — a building of infinite halls, with tidal hallways, statues lining every surface, and only two other people who enter. He keeps meticulous journals about the House's ecology and geography. Then he discovers his journals contain entries he has no memory of writing, and begins to question everything he knows about how he got there." },
      { q: 'Is Piranesi fantasy or mystery?', a: "Piranesi is classified as fantasy — it features a clearly impossible setting, the House, that operates on its own magical rules. But structurally it is also a mystery novel: the central question of who Piranesi is and how he ended up in the House drives the narrative. Most readers describe it as quietly devastating and unlike anything else they've read." },
    ],
  },
  {
    slug: 'house-in-the-cerulean-sea',
    intro: "TJ Klune's The House in the Cerulean Sea (2020) has a companion novel — Somewhere Beyond the Sea (2024) — set in the same world with the same characters. Both books are standalones with self-contained stories, but most readers prefer to read The House in the Cerulean Sea first as Somewhere Beyond the Sea continues Linus and Arthur's story.",
    startWith: 'The House in the Cerulean Sea',
    books: [
      { title: 'The House in the Cerulean Sea', author: 'TJ Klune', year: 2020, note: "Standalone — a caseworker for magical children is sent to inspect a mysterious orphanage and falls in love, quietly, against the world's expectations" },
      { title: 'Somewhere Beyond the Sea', author: 'TJ Klune', year: 2024, note: "Companion — set in the same world, continuing Linus and Arthur's story; can be read standalone" },
    ],
    faq: [
      { q: 'Is The House in the Cerulean Sea a series?', a: "The House in the Cerulean Sea has a companion novel, Somewhere Beyond the Sea (2024), set in the same world and continuing the story of Linus Baker and Arthur Parnassus. Both books are largely self-contained, but most readers prefer to read The House in the Cerulean Sea first." },
      { q: 'Do I need to read The House in the Cerulean Sea before Somewhere Beyond the Sea?', a: "Somewhere Beyond the Sea is a companion novel that continues the story of characters from The House in the Cerulean Sea, so most readers recommend reading the first book first. However, each book is largely self-contained and tells a complete story." },
      { q: 'What is The House in the Cerulean Sea about?', a: "Linus Baker is a caseworker for the Department in Charge of Magical Youth who is sent to evaluate a mysterious orphanage on an island. He expects to find dangerous magical children; instead he finds something he wasn't looking for. The book is a cozy fantasy about bureaucracy, prejudice, found families, and a quiet, unexpected love story." },
      { q: 'Is The House in the Cerulean Sea appropriate for adults?', a: "Yes — The House in the Cerulean Sea is written for adult readers, not children. Despite its gentle tone and whimsical premise, it deals with adult themes: institutional prejudice, fear of difference, and a romance between two adult men. It was praised as one of the best adult cozy fantasy novels of 2020." },
    ],
  },
  {
    slug: 'jonathan-strange',
    intro: "Susanna Clarke's Jonathan Strange & Mr Norrell (2004) is a standalone novel — there is no sequel and no series. Clarke also wrote Piranesi (2020), a completely separate standalone novel. Both can be read in any order. Jonathan Strange & Mr Norrell is approximately 1000 pages and structured as a Victorian novel.",
    startWith: 'Jonathan Strange & Mr Norrell',
    books: [
      { title: 'Jonathan Strange & Mr Norrell', author: 'Susanna Clarke', year: 2004, note: "Standalone — two English magicians in the Napoleonic era attempt to restore English magic; structured as a Victorian novel with extensive footnotes" },
    ],
    faq: [
      { q: 'Is Jonathan Strange & Mr Norrell a series?', a: "No — Jonathan Strange & Mr Norrell is a standalone novel by Susanna Clarke, approximately 1000 pages. Clarke's second novel, Piranesi (2020), is a completely separate standalone in a different world." },
      { q: 'How long is Jonathan Strange & Mr Norrell?', a: "Jonathan Strange & Mr Norrell is approximately 1000 pages and 309,000 words — one of the longest fantasy novels published in the 2000s. The novel also features extensive footnotes that are an integral part of the reading experience, not supplementary material." },
      { q: 'Is Jonathan Strange & Mr Norrell appropriate for adults?', a: "Jonathan Strange & Mr Norrell is written for adult readers. It is structured as a Victorian novel with extensive footnotes, satirical humor, and an ironic narrator — the register is adult literary fiction as much as fantasy. The BBC television adaptation (2015) captures the novel's tone well and may help readers decide if the style appeals to them." },
      { q: 'What is Jonathan Strange & Mr Norrell about?', a: "Set in an alternate Napoleonic England where magic was once practiced but has been absent for centuries, the novel follows Mr Norrell — a reclusive scholar who has hoarded all the books of magic — and Jonathan Strange, a gentleman who discovers he has a natural gift for it. As their partnership deteriorates, they attract the attention of an ancient and dangerous fairy who has his own plans for English magic." },
    ],
  },
  {
    slug: 'circe',
    intro: "Madeline Miller's Circe (2018) is a standalone novel — there is no sequel and no direct series. Miller also wrote The Song of Achilles (2011), which is set in the same Greek mythological world. Both books can be read in any order; they share mythology and occasionally characters but not a continuous story.",
    startWith: 'Circe',
    books: [
      { title: 'Circe', author: 'Madeline Miller', year: 2018, note: "Standalone — the witch of Greek mythology narrates her own life, from exile to power, in lyrical literary prose" },
      { title: 'The Song of Achilles', author: 'Madeline Miller', year: 2011, note: "Companion standalone — the Trojan War through Patroclus's eyes; same world, different story, any order" },
    ],
    faq: [
      { q: 'Is Circe a series?', a: "No — Circe is a standalone novel by Madeline Miller. Miller also wrote The Song of Achilles (2011), which is set in the same Greek mythological world but tells a different story. Both books can be read in any order." },
      { q: 'Should I read Circe or The Song of Achilles first?', a: "You can read either first. Circe and The Song of Achilles share Greek mythology and occasionally reference the same mythological events, but they are set in different periods and tell completely different stories. Most readers have a strong preference for one or the other — The Song of Achilles is more romantic and tragic; Circe is more about identity and power." },
      { q: 'What is Circe about?', a: "Circe follows the daughter of the sun god Helios — a nymph with an unsettling voice and no apparent power — who discovers she has the ability to transform things and people. Exiled to the island of Aeaea, she slowly builds her power and her identity over millennia, encountering figures from Greek mythology — Daedalus, Odysseus, Medea — and eventually coming into conflict with the gods who control her world." },
      { q: 'Is Circe appropriate for adults?', a: "Circe is written for adult readers. While the prose is accessible and the story engaging, it deals with adult themes including sexual violence, revenge, and the subjugation of women in mythology. Miller retells many of the more disturbing myths in Circe (including Scylla's transformation and aspects of Odysseus's travels) without sanitizing them." },
    ],
  },
  {
    slug: 'goblin-emperor',
    intro: "Katherine Addison's The Goblin Emperor (2014) is largely a standalone novel. Addison has also written The Witness for the Dead (2021), a companion novel set in the same world with a minor character from The Goblin Emperor as the protagonist, and its sequel The Grief of Stones (2022). The Goblin Emperor can be read entirely alone; the companions add to the world but don't continue Maia's story.",
    startWith: 'The Goblin Emperor',
    books: [
      { title: 'The Goblin Emperor', author: 'Katherine Addison', year: 2014, note: "Standalone — half-goblin Maia unexpectedly becomes emperor and must learn to rule while everyone around him expects him to fail" },
      { title: 'The Witness for the Dead', author: 'Katherine Addison', year: 2021, note: "Companion — set in the same world; Thara Celehar investigates deaths using his gift for communing with the recently dead" },
      { title: 'The Grief of Stones', author: 'Katherine Addison', year: 2022, note: "Sequel to Witness for the Dead; continues Thara's story" },
    ],
    faq: [
      { q: 'Is The Goblin Emperor a series?', a: "The Goblin Emperor is largely a standalone novel. Katherine Addison has written two companion books set in the same world — The Witness for the Dead (2021) and its sequel The Grief of Stones (2022) — which follow a different character, Thara Celehar. These companions can be read independently of The Goblin Emperor." },
      { q: 'Do I need to read The Goblin Emperor before The Witness for the Dead?', a: "You do not need to read The Goblin Emperor before The Witness for the Dead — they follow different protagonists and different plots in the same world. However, many readers find The Goblin Emperor enriches the world and its history in a way that makes the companion books more rewarding." },
      { q: 'What is The Goblin Emperor about?', a: "Maia is the half-goblin, half-elf fourth son of the Emperor of the Elflands — raised by an abusive caretaker in a remote estate, never expected to inherit anything. When the Emperor and his three other sons die in an airship accident, Maia becomes Emperor. He knows nothing about court, has no allies, and nearly everyone in the palace wanted someone else on the throne. The novel follows his first months trying to rule by being kind in a system built around cruelty." },
      { q: 'Is The Goblin Emperor cozy fantasy?', a: "The Goblin Emperor is often cited as one of the founding texts of cozy fantasy, alongside The House in the Cerulean Sea — though it was published before that term was coined. The novel is notable for its almost complete absence of violence, its focus on political problem-solving through kindness and coalition-building, and its deeply empathetic protagonist who refuses to become cruel despite every pressure to do so." },
    ],
  },
  {
    slug: 'raven-cycle',
    intro: "Maggie Stiefvater's Raven Cycle is a complete four-book YA fantasy series following Blue Sargent — a girl who can amplify psychic visions but cannot have them herself — and a group of prep school boys searching for the ley lines and the sleeping Welsh king Glendower. All four books must be read in order. There is also a connected spinoff trilogy (Dreamer Trilogy) following Ronan Lynch.",
    startWith: 'The Raven Boys',
    books: [
      { title: 'The Raven Boys', author: 'Maggie Stiefvater', year: 2012, note: 'Book 1 — Blue meets Gansey, Ronan, Adam, and Noah; the search for Glendower begins' },
      { title: 'The Dream Thieves', author: 'Maggie Stiefvater', year: 2013, note: "Book 2 — Ronan's dream-pulling power and the Grey Man's arrival in Henrietta" },
      { title: 'Blue Lily, Lily Blue', author: 'Maggie Stiefvater', year: 2014, note: "Book 3 — Blue's mother is missing; the ley lines grow dangerous" },
      { title: 'The Raven King', author: 'Maggie Stiefvater', year: 2016, note: 'Book 4 — The series conclusion; Glendower is found and the ley lines reach crisis' },
    ],
    faq: [
      { q: 'What is the Raven Cycle reading order?', a: "Read The Raven Boys (2012), The Dream Thieves (2013), Blue Lily, Lily Blue (2014), and The Raven King (2016). All four books must be read in order. Maggie Stiefvater also wrote the Dreamer Trilogy (Call Down the Hawk, Mister Impossible, Greywaren) which is a connected spinoff following Ronan Lynch." },
      { q: 'How many Raven Cycle books are there?', a: "The Raven Cycle by Maggie Stiefvater is a complete four-book series: The Raven Boys, The Dream Thieves, Blue Lily Lily Blue, and The Raven King. There is also a connected spinoff trilogy (the Dreamer Trilogy) following Ronan Lynch through Call Down the Hawk, Mister Impossible, and Greywaren." },
      { q: 'Is the Raven Cycle connected to the Dreamer Trilogy?', a: "Yes — the Dreamer Trilogy (Call Down the Hawk, Mister Impossible, Greywaren) follows Ronan Lynch, a main character from the Raven Cycle, in the aftermath of the main series. It is recommended to read the Raven Cycle first, though the Dreamer Trilogy is designed to be accessible to new readers." },
      { q: 'What is The Raven Boys about?', a: "Blue Sargent comes from a family of psychics but has no powers of her own — instead she can amplify the visions of others. She has been told her whole life that if she kisses her true love, he will die. When she encounters four prep school boys searching for the ley lines and the legendary Welsh king Owen Glendower, Blue is pulled into their search — and toward the boy she may be destined to kill." },
    ],
  },
  {
    slug: 'caraval',
    intro: "Stephanie Garber's Caraval trilogy is a complete three-book YA fantasy series centered on a legendary magical game where the line between performance and reality blurs. The story follows Scarlett and her sister Donatella across three interconnected games. All three books should be read in order; Legendary and Finale follow different POV characters but continue the overarching story.",
    startWith: 'Caraval',
    books: [
      { title: 'Caraval', author: 'Stephanie Garber', year: 2017, note: "Book 1 — Scarlett's POV: she and her sister Tella travel to the legendary magical game Caraval, where Tella goes missing as part of the game — or so Scarlett is told" },
      { title: 'Legendary', author: 'Stephanie Garber', year: 2018, note: "Book 2 — Tella's POV: the game returns to Caraval, and Tella is playing her own secret game inside it" },
      { title: 'Finale', author: 'Stephanie Garber', year: 2019, note: "Book 3 — Both sisters' POVs: the fate of the master of Caraval and the empire itself" },
    ],
    faq: [
      { q: 'What is the Caraval reading order?', a: "Read Caraval (2017), then Legendary (2018), then Finale (2019). All three books must be read in order — Legendary and Finale resolve storylines set up in the first book. The books shift between Scarlett's POV (Book 1) and Tella's POV (Book 2) before combining both in Finale." },
      { q: 'How many Caraval books are there?', a: "Stephanie Garber's Caraval series is a complete trilogy: Caraval (2017), Legendary (2018), and Finale (2019). There is also Once Upon a Broken Heart (2021), a new series by Garber set in the same world but following a different protagonist, Evangeline Fox." },
      { q: 'Is Caraval a standalone?', a: "No — Caraval is the first book in a trilogy. It has a semi-complete ending but many mysteries are unresolved until Legendary and Finale. Most readers continue with the full trilogy after the first book." },
      { q: 'What is Caraval similar to?', a: "Caraval is most often compared to The Night Circus by Erin Morgenstern — both feature a magical performance venue where the line between game and reality blurs, and both have romance as a central thread. Caraval is more YA and more plot-driven; Night Circus is more literary and atmospheric. Fans of one tend to love the other." },
    ],
  },
  {
    slug: 'strange-the-dreamer',
    intro: "Laini Taylor's Strange the Dreamer is a complete two-book YA fantasy duology set in a city that has been erased from all maps and all memory. The duology must be read in order; Muse of Nightmares is the direct continuation and conclusion of the story.",
    startWith: 'Strange the Dreamer',
    books: [
      { title: 'Strange the Dreamer', author: 'Laini Taylor', year: 2017, note: "Book 1 — Lazlo Strange, an orphan librarian obsessed with a forgotten city called Weep, joins an expedition to find it; in the ruins he meets Sarai, a ghost who walks into dreams" },
      { title: 'Muse of Nightmares', author: 'Laini Taylor', year: 2018, note: "Book 2 — The duology conclusion; Lazlo and Sarai must prevent a catastrophe that threatens both humans and the godspawn living above the city" },
    ],
    faq: [
      { q: 'What is the Strange the Dreamer reading order?', a: "Read Strange the Dreamer (2017) first, then Muse of Nightmares (2018). The two books form a complete duology and must be read in order — Strange the Dreamer ends on a significant cliffhanger." },
      { q: 'How many Strange the Dreamer books are there?', a: "Strange the Dreamer is a complete two-book duology by Laini Taylor: Strange the Dreamer (2017) and Muse of Nightmares (2018). Taylor also wrote the Daughter of Smoke and Bone trilogy, a completely separate series set in a different world." },
      { q: 'Is Strange the Dreamer connected to Daughter of Smoke and Bone?', a: "No — Strange the Dreamer and the Daughter of Smoke and Bone trilogy are completely separate series in different worlds by Laini Taylor. They share Taylor's distinctive lush prose style but have no shared characters, settings, or plot." },
      { q: 'What is Strange the Dreamer about?', a: "Lazlo Strange is a librarian's assistant in a fantasy world who has been obsessed since childhood with a city once called Weep that was erased from all maps and all memory. When an expedition sets out to find Weep, Lazlo joins it. There he discovers the city is ruled by titanic metal hands in the sky and inhabited by godspawn — children of gods, hunted by humanity — including Sarai, a girl who enters human dreams." },
    ],
  },
  {
    slug: 'legends-and-lattes',
    intro: "Travis Baldree's Legends & Lattes (2022) has a prequel, Bookshops & Bonedust (2023), which tells a young Viv's story set fifteen years before the events of the first book. Both books stand alone and can be read in any order, though most readers prefer to read Legends & Lattes first.",
    startWith: 'Legends & Lattes',
    books: [
      { title: 'Legends & Lattes', author: 'Travis Baldree', year: 2022, note: "Standalone — orc barbarian Viv retires from adventuring to open the first coffee shop in the city of Thune; a cozy found-family story" },
      { title: 'Bookshops & Bonedust', author: 'Travis Baldree', year: 2023, note: "Prequel standalone — a younger Viv is injured and left behind in a seaside town; same world, 15 years earlier" },
    ],
    faq: [
      { q: 'What is the Legends & Lattes reading order?', a: "Legends & Lattes (2022) is the first book and can be read standalone. Bookshops & Bonedust (2023) is a prequel set fifteen years earlier with a younger version of the same protagonist. Both books stand alone; most readers prefer Legends & Lattes first." },
      { q: 'How many Legends & Lattes books are there?', a: "Travis Baldree has written two books in this world: Legends & Lattes (2022) and Bookshops & Bonedust (2023), a prequel. Both are standalones. No additional books have been announced." },
      { q: 'What genre is Legends & Lattes?', a: "Legends & Lattes is widely credited as one of the books that defined cozy fantasy — a genre of fantasy that emphasizes warmth, found family, slice-of-life storytelling, and low stakes rather than epic world-ending conflicts. The book is often listed alongside The House in the Cerulean Sea by TJ Klune as a founding text of the genre." },
      { q: 'Is Legends & Lattes appropriate for adults?', a: "Yes — Legends & Lattes is written for adult readers, though its gentle content makes it accessible to older teens as well. It features a lesbian romance between two adult women, but the content is not explicit. The book was a Goodreads Choice Award winner for fantasy and romance." },
    ],
  },
  {
    slug: 'daughter-of-smoke-and-bone',
    intro: "Laini Taylor's Daughter of Smoke and Bone trilogy is a complete three-book YA fantasy series. The story follows Karou, an art student in Prague with blue hair who draws monsters from memory — because the monsters are her family. All three books must be read in order; the trilogy builds to a conclusion that spans both worlds Taylor creates across the series.",
    startWith: 'Daughter of Smoke and Bone',
    books: [
      { title: 'Daughter of Smoke and Bone', author: 'Laini Taylor', year: 2011, note: "Book 1 — Karou, an art student in Prague raised by chimera in a wish shop, discovers the truth of her origins when an angel comes for her" },
      { title: 'Days of Blood and Starlight', author: 'Laini Taylor', year: 2012, note: "Book 2 — The war between angels and chimera resumes in a devastated Eretz; Karou and Akiva are on opposite sides" },
      { title: 'Dreams of Gods and Monsters', author: 'Laini Taylor', year: 2014, note: "Book 3 — A ceasefire, a new threat, and the trilogy's conclusion across two worlds" },
    ],
    faq: [
      { q: 'What is the Daughter of Smoke and Bone reading order?', a: "Read Daughter of Smoke and Bone (2011), then Days of Blood and Starlight (2012), then Dreams of Gods and Monsters (2014). All three books must be read in order — the trilogy is one continuous story." },
      { q: 'How many Daughter of Smoke and Bone books are there?', a: "Laini Taylor's Daughter of Smoke and Bone series is a complete trilogy: Daughter of Smoke and Bone (2011), Days of Blood and Starlight (2012), and Dreams of Gods and Monsters (2014). Taylor also wrote the Strange the Dreamer duology, a completely separate series in a different world." },
      { q: 'Is Daughter of Smoke and Bone connected to Strange the Dreamer?', a: "No — Daughter of Smoke and Bone and the Strange the Dreamer duology are completely separate series by Laini Taylor, set in different worlds with different characters. They share Taylor's distinctive lush prose style but have no plot or character connections." },
      { q: 'What is Daughter of Smoke and Bone about?', a: "Karou is a seventeen-year-old art student at a Prague art school who was raised by a family of chimera — monsters who collect teeth for a wish dealer named Brimstone. When handprints of ash appear on all the portals to the wish shop simultaneously, Karou's two worlds collide, and she discovers the truth of who she is. The trilogy is a war story about angels and demons set partly in modern Prague and partly in a fantasy world called Eretz." },
    ],
  },
  {
    slug: 'long-way-to-a-small-angry-planet',
    intro: "Becky Chambers's Wayfarers series is a loosely connected science fiction series — each book follows different characters in the same universe and can be read as a standalone or in publication order. The books are connected by setting and occasional character appearances, but each tells a completely self-contained story. Publication order is recommended but not required.",
    startWith: 'The Long Way to a Small, Angry Planet',
    books: [
      { title: 'The Long Way to a Small, Angry Planet', author: 'Becky Chambers', year: 2014, note: "Book 1 — The crew of the tunneler Wayfarer takes a year-long job through dangerous space to the edge of the galaxy" },
      { title: 'A Closed and Common Orbit', author: 'Becky Chambers', year: 2016, note: "Book 2 — Sidra (an AI from Book 1) navigates life in a human body; Pepper's backstory alternates" },
      { title: 'Record of a Spaceborn Few', author: 'Becky Chambers', year: 2018, note: "Book 3 — Life inside the Exodus Fleet, a generation after humanity left Earth; standalone" },
      { title: 'The Galaxy, and the Ground Within', author: 'Becky Chambers', year: 2021, note: "Book 4 — Travelers stranded at a waystation with little in common find connection; standalone" },
    ],
    faq: [
      { q: 'What is the Wayfarers reading order?', a: "The Wayfarers series by Becky Chambers has four main books: The Long Way to a Small, Angry Planet (2014), A Closed and Common Orbit (2016), Record of a Spaceborn Few (2018), and The Galaxy, and the Ground Within (2021). Each book is a standalone; publication order is recommended but not required." },
      { q: 'Do I need to read the Wayfarers books in order?', a: "No — each Wayfarers book is a standalone with a self-contained story. A Closed and Common Orbit features a character introduced in the first book, so most readers recommend starting with The Long Way to a Small, Angry Planet, but all four books can be read independently." },
      { q: 'What is The Long Way to a Small, Angry Planet about?', a: "A small crew of tunnelers — who travel through space creating wormholes — takes a year-long job to drill a tunnel to a dangerous planet at the far edge of the galaxy. The novel is more about the people on the ship than about the destination: their relationships, their different species and cultures, and what it means to build a home on a ship." },
      { q: 'Is Wayfarers similar to The Hitchhiker\'s Guide to the Galaxy?', a: "Wayfarers and Hitchhiker's Guide both feature ensemble casts of different species traveling through space, but their tones are very different. Hitchhiker's Guide is satirical and absurdist; Wayfarers is warm, cozy, and deeply humanist. Chambers's books are closer in feel to a workplace found-family novel than to comic sci-fi." },
    ],
  },
  {
    slug: 'scorpio-races',
    intro: "Maggie Stiefvater's The Scorpio Races is a standalone novel — there is no sequel and no series. It is completely unrelated to the Raven Cycle, though both are by Maggie Stiefvater. The Scorpio Races can be read at any point without any prior Stiefvater experience.",
    startWith: 'The Scorpio Races',
    books: [
      { title: 'The Scorpio Races', author: 'Maggie Stiefvater', year: 2011, note: "Standalone — every November on the island of Thisby, water horses emerge from the sea for the Scorpio Races; Sean Kendrick trains them, and Puck Connolly will be the first woman to ride" },
    ],
    faq: [
      { q: 'Is The Scorpio Races a series?', a: "No — The Scorpio Races is a standalone novel by Maggie Stiefvater. There is no sequel and no series. Stiefvater also wrote the Raven Cycle (four books) and the Shiver trilogy, but they are completely unrelated to The Scorpio Races." },
      { q: 'Should I read The Scorpio Races before the Raven Cycle?', a: "No — The Scorpio Races and the Raven Cycle are completely separate, unrelated novels by the same author. You can read either in any order. The Scorpio Races is a standalone; the Raven Cycle is a four-book series." },
      { q: 'What is The Scorpio Races about?', a: "Every October on the fictional island of Thisby, water horses emerge from the sea — enormous, predatory creatures who want to return to the ocean. Every November, riders race them along the beach. Sean Kendrick is the only rider who has won four times; Puck Connolly is the first woman to enter the races, to save her family's home. The novel alternates between their perspectives across the weeks before the race." },
      { q: 'Is The Scorpio Races similar to the Raven Cycle?', a: "Both The Scorpio Races and the Raven Cycle are by Maggie Stiefvater and share her atmospheric, lyrical prose and her sense of a magical world hidden inside or alongside the ordinary one. The Scorpio Races is set on an island with Celtic-influenced mythology and is more contained and romantic; the Raven Cycle is a four-book epic about Welsh mythology in Virginia." },
    ],
  },
  {
    slug: 'first-law',
    intro: "Joe Abercrombie's First Law World is an ongoing series of grimdark fantasy novels. It began with the First Law Trilogy (three books), continued with three standalone novels in the same world, and then launched a new trilogy (Age of Madness) set 30 years later. The original trilogy can be read as a complete, standalone story. The standalones and the Age of Madness trilogy build on the original but can largely be appreciated without it.",
    startWith: 'The Blade Itself',
    books: [
      { title: 'The Blade Itself', author: 'Joe Abercrombie', year: 2006, note: "Book 1 — The First Law Trilogy: Logen Ninefingers, a barbarian trying to leave his past; Jezal, a vain soldier; Sand dan Glokta, a torturer who was once a hero" },
      { title: 'Before They Are Hanged', author: 'Joe Abercrombie', year: 2007, note: "Book 2 — Two campaigns split the cast across the continent; the war begins" },
      { title: 'Last Argument of Kings', author: 'Joe Abercrombie', year: 2008, note: "Book 3 — The trilogy conclusion; famous for one of fantasy's most devastating final acts" },
      { title: 'Best Served Cold', author: 'Joe Abercrombie', year: 2009, note: "Standalone — set in the same world, 10 years later; a mercenary captain pursues revenge", isOptional: true },
      { title: 'The Heroes', author: 'Joe Abercrombie', year: 2011, note: "Standalone — a single battle across three days; multiple POVs", isOptional: true },
      { title: 'A Little Hatred', author: 'Joe Abercrombie', year: 2019, note: "Age of Madness Book 1 — set 30 years after the trilogy; the Industrial Revolution comes to the Circle of the World", isOptional: true },
    ],
    faq: [
      { q: 'What is the First Law reading order?', a: "Start with the First Law Trilogy: The Blade Itself (2006), Before They Are Hanged (2007), and Last Argument of Kings (2008). After the trilogy, you can read the standalone novels (Best Served Cold, The Heroes, Red Country) in any order, then the Age of Madness trilogy starting with A Little Hatred (2019)." },
      { q: 'How many First Law books are there?', a: "Joe Abercrombie has written nine books in the First Law World: the original trilogy (3 books), three standalones (Best Served Cold, The Heroes, Red Country), and the Age of Madness trilogy (A Little Hatred, The Trouble with Peace, The Wisdom of Crowds). All nine are published and available." },
      { q: 'Do I need to read the First Law Trilogy before the Age of Madness?', a: "The Age of Madness trilogy is set 30 years after the original First Law Trilogy and features some returning characters. While it can be read as a starting point, readers consistently get more from the Age of Madness having read the original trilogy, particularly its ending." },
      { q: 'What is the First Law series about?', a: "The First Law is grimdark fantasy — fantasy that subverts the heroic tradition by showing that war is brutal, heroes are compromised, and institutions serve their own interests. The original trilogy follows a barbarian, a torturer, and a vain soldier across a continent-spanning war orchestrated by a mysterious figure called Bayaz, the First of the Magi." },
    ],
  },
  {
    slug: 'carry-on',
    intro: "Rainbow Rowell's Simon Snow series is a complete two-book duology about a chosen hero at a magical school who doesn't fit the prophecy as neatly as anyone expected. The series can be read in order (Carry On, then Wayward Son), or Carry On can be read as a standalone. There is a third book, Any Way the Wind Blows, which concludes the trilogy.",
    startWith: 'Carry On',
    books: [
      { title: 'Carry On', author: 'Rainbow Rowell', year: 2015, note: "Book 1 — Simon Snow's final year at Watford School of Magicks, the prophecy, the Humdrum, and his enemy-turned-something-else Baz" },
      { title: 'Wayward Son', author: 'Rainbow Rowell', year: 2019, note: "Book 2 — Simon, Penny, and Baz take a road trip across America; the war is over but Simon doesn't know what to do with himself" },
      { title: 'Any Way the Wind Blows', author: 'Rainbow Rowell', year: 2021, note: "Book 3 — The trilogy conclusion; what happens after the chosen one's story is supposed to be over" },
    ],
    faq: [
      { q: 'What is the Carry On reading order?', a: "Read Carry On (2015), then Wayward Son (2019), then Any Way the Wind Blows (2021). The trilogy should be read in order. Carry On can function as a standalone, but Wayward Son and Any Way the Wind Blows continue the story directly." },
      { q: 'How many Carry On books are there?', a: "Rainbow Rowell's Simon Snow trilogy consists of three books: Carry On (2015), Wayward Son (2019), and Any Way the Wind Blows (2021). The trilogy is complete." },
      { q: 'Is Carry On related to Harry Potter?', a: "Carry On originated as fanfiction-within-fanfiction — in Rowell's novel Fangirl, the protagonist writes fanfiction about a fictional Harry Potter-esque series called Simon Snow. Carry On then brought Simon Snow to life as its own novel. Carry On is an original work and not a Harry Potter parody, though it engages lovingly with the tropes of the chosen-hero-at-magical-school genre." },
      { q: 'Is Carry On appropriate for all ages?', a: "Carry On is a YA novel with an explicit same-sex romance between Simon and Baz. The romance is the emotional center of the book. The content is more explicit than most YA but less so than adult fiction. The novel is generally recommended for readers 14 and up." },
    ],
  },
  {
    slug: 'shiver',
    intro: "Maggie Stiefvater's Wolves of Mercy Falls trilogy is a complete three-book YA paranormal romance series about Grace, a girl who has loved a yellow-eyed wolf since he saved her life as a child, and Sam, the wolf in question. The trilogy must be read in order. There is also a companion/spinoff novel, Sinner (2014), following a different character from the Shiver world.",
    startWith: 'Shiver',
    books: [
      { title: 'Shiver', author: 'Maggie Stiefvater', year: 2009, note: "Book 1 — Grace discovers the yellow-eyed wolf she's loved is a boy named Sam; their time together is limited by the cold" },
      { title: 'Linger', author: 'Maggie Stiefvater', year: 2010, note: "Book 2 — Sam tries to stay human; Grace begins to transform; new wolves complicate everything" },
      { title: 'Forever', author: 'Maggie Stiefvater', year: 2011, note: "Book 3 — The trilogy conclusion; hunters come for the pack" },
      { title: 'Sinner', author: 'Maggie Stiefvater', year: 2014, note: "Companion — follows Cole and Isabel from the trilogy; standalone", isOptional: true },
    ],
    faq: [
      { q: 'What is the Shiver reading order?', a: "Read Shiver (2009), then Linger (2010), then Forever (2011). All three must be read in order. Sinner (2014) is a companion novel following secondary characters from the trilogy and can be read after Forever or as a standalone." },
      { q: 'How many Shiver books are there?', a: "The Wolves of Mercy Falls trilogy by Maggie Stiefvater consists of three books: Shiver (2009), Linger (2010), and Forever (2011). Sinner (2014) is a companion novel following Cole and Isabel." },
      { q: 'Is Shiver similar to Twilight?', a: "Shiver is frequently compared to Twilight — both feature a teenage girl falling in love with a paranormal boy, an elemental trigger for transformation (cold for the wolves vs. sunlight for the Cullens), and a threat to the relationship from the paranormal world. Stiefvater's prose is more literary and atmospheric than Meyer's, and the romance is equally central to both." },
      { q: 'What makes the wolves in Shiver different?', a: "The werewolves in Shiver shift between human and wolf form based on temperature rather than the full moon — they are wolves in winter and humans in summer. As they age, they spend more and more time as wolves until eventually they can no longer return to human form. This creates a ticking-clock element to Grace and Sam's romance." },
    ],
  },
  {
    slug: 'ariadne',
    intro: "Jennifer Saint's Ariadne (2021) is a standalone literary fantasy retelling the myth of Theseus and the Minotaur from the perspective of the two women at its center — Ariadne and Phaedra, daughters of King Minos of Crete. The novel does not have a sequel. Saint has since written companion novels set in the same mythological world (Elektra, Atalanta) that are completely standalone and can be read in any order.",
    startWith: 'Ariadne',
    books: [
      { title: 'Ariadne', author: 'Jennifer Saint', year: 2021, note: "Standalone — Ariadne and Phaedra retell the myth of Theseus and the Minotaur from a woman's perspective" },
      { title: 'Elektra', author: 'Jennifer Saint', year: 2022, note: "Companion standalone — three women at the center of the Trojan War's aftermath; same mythological world, no shared characters", isOptional: true },
      { title: 'Atalanta', author: 'Jennifer Saint', year: 2023, note: "Companion standalone — the myth of Atalanta, the hero who ran faster than any man; same mythological world, completely standalone", isOptional: true },
    ],
    faq: [
      { q: 'Is Ariadne by Jennifer Saint a standalone?', a: "Yes — Ariadne is a complete standalone novel. Jennifer Saint has written other mythology retellings (Elektra, Atalanta) set in the same mythological world, but they have no shared characters or plot with Ariadne and can be read in any order or not at all." },
      { q: 'What myth does Ariadne retell?', a: "Ariadne retells the myth of Theseus and the Minotaur, centering on Ariadne — the Cretan princess who gave Theseus the thread to navigate the Labyrinth — and her sister Phaedra. The novel follows what happens to the sisters after Theseus enters their story: what he takes from them and what they build for themselves." },
      { q: 'Is Ariadne similar to Circe by Madeline Miller?', a: "Yes — Ariadne is the most frequently recommended companion to Circe. Both are literary feminist mythology retellings set in ancient Greece, both center on women who have been treated as supporting characters in men's myths, and both are told in a lyrical, immediate first-person voice. If you loved Circe, Ariadne is the natural next read." },
      { q: 'What order should I read Jennifer Saint\'s books?', a: "Jennifer Saint's mythology retellings are all standalone novels set in the same ancient Greek mythological world: Ariadne (2021), Elektra (2022), and Atalanta (2023). There is no required reading order — you can start with whichever myth interests you most." },
    ],
  },
  {
    slug: 'stardust',
    intro: "Neil Gaiman's Stardust (1999) is a complete standalone fantasy novel. There is no sequel. Stardust tells the story of Tristran Thorn, a young man in the English village of Wall, who crosses the wall into the magical land of Faerie to retrieve a fallen star for the girl he thinks he loves — and discovers the star is a person, and that he may not know what he actually wants. The book was originally published as an illustrated novel with art by Charles Vess; both editions tell the same story.",
    startWith: 'Stardust',
    books: [
      { title: 'Stardust', author: 'Neil Gaiman', year: 1999, note: "Standalone — Tristran Thorn crosses into Faerie to retrieve a fallen star and discovers she is a young woman named Yvaine" },
    ],
    faq: [
      { q: 'Is Stardust by Neil Gaiman a standalone?', a: "Yes — Stardust is a complete standalone novel with no sequels, prequels, or related books required. Neil Gaiman has written other fantasy novels (American Gods, The Ocean at the End of the Lane, Neverwhere), but each is entirely independent." },
      { q: 'Is Stardust appropriate for all ages?', a: "Stardust is a fairy tale for adults — more explicitly than children's fairy tales it deals with death, desire, and violence, though in a tone that is romantic and fantastical rather than graphic. The 2007 film adaptation is rated PG-13. Most readers place it at 14 and up, with the caveat that Gaiman writes fairy tales in which dark things happen." },
      { q: 'Is Stardust related to American Gods or Good Omens?', a: "Stardust is not connected to American Gods, Good Omens (co-written with Terry Pratchett), Neverwhere, or any of Gaiman's other novels. Each is a completely independent story with its own world and characters." },
      { q: 'What is Stardust about?', a: "Stardust is a fairy tale in the classic tradition — a young man makes a rash promise to bring back a fallen star for a girl, crosses into the magical kingdom of Faerie on the other side of the wall that borders his village, and finds that the star is a young woman. It's a love story, a quest, and a meditation on what we think we want vs. what we actually need." },
    ],
  },
  {
    slug: 'a-psalm-for-the-wild-built',
    intro: "Becky Chambers' Monk and Robot series is a gentle, philosophical cozy science fiction series set in a world where humans have retreated to smaller, sustainable settlements after giving robots their freedom. The robots disappeared into the wilderness decades ago — until one of them comes back. The series can be read as a standalone after the first book, but the second book completes the story the first begins.",
    startWith: 'A Psalm for the Wild-Built',
    books: [
      { title: 'A Psalm for the Wild-Built', author: 'Becky Chambers', year: 2021, note: "Book 1 — Dex, a monk who makes tea and listens to people, leaves their comfortable life to find something missing; in the wilderness, they meet Mosscap, a robot who has wandered back to ask humans what they need" },
      { title: 'A Prayer for the Crown-Shy', author: 'Becky Chambers', year: 2022, note: "Book 2 — Dex and Mosscap travel into human settlements; Mosscap asks the question the robots have always wanted answered" },
    ],
    faq: [
      { q: 'What is the Monk and Robot reading order?', a: "Read A Psalm for the Wild-Built (2021) first, then A Prayer for the Crown-Shy (2022). The two books form a single complete story and should be read in order. Both books are novellas — approximately 150 pages each — and can be read in a single sitting." },
      { q: 'How many Monk and Robot books are there?', a: "The Monk and Robot series currently has two novellas: A Psalm for the Wild-Built (2021) and A Prayer for the Crown-Shy (2022). Becky Chambers has indicated interest in continuing the series, but no additional books have been announced." },
      { q: 'Is A Psalm for the Wild-Built related to the Wayfarers series?', a: "A Psalm for the Wild-Built is not set in the same universe as Chambers' Wayfarers series (A Long Way to a Small, Angry Planet). They share Chambers' characteristic tone — gentle, philosophical, warm — but are entirely separate worlds with no shared characters or continuity." },
      { q: 'What is A Psalm for the Wild-Built about?', a: "At its core, A Psalm for the Wild-Built is about asking the question 'what do you need?' and discovering that the answer is harder than it sounds. The robot Mosscap was built to observe humans and ask them what they need; Dex, a monk traveling toward an answer they can't name, is the first human the robots have encountered in decades. It's a quiet, philosophical story about meaning and contentment." },
    ],
  },
  {
    slug: 'rage-of-dragons',
    intro: "Evan Winter's The Burning is a complete two-book African-inspired epic fantasy duology. The series follows Tau, the son of a Lesser Caste warrior, in a world where a caste of women called Gifted defend humanity from demons while a warrior caste fights the ongoing war against the Omehi's enemies. Tau has no special power — he is simply willing to become the greatest swordsman who has ever lived. Both books must be read in order.",
    startWith: 'The Rage of Dragons',
    books: [
      { title: 'The Rage of Dragons', author: 'Evan Winter', year: 2019, note: "Book 1 — Tau of the Lower Caste trains himself to become the greatest sword fighter in the kingdom in order to avenge his father's death" },
      { title: 'The Fires of Vengeance', author: 'Evan Winter', year: 2020, note: "Book 2 — The duology conclusion; Tau's path and the kingdom's fate converge" },
    ],
    faq: [
      { q: 'What is The Rage of Dragons reading order?', a: "Read The Rage of Dragons (2019) first, then The Fires of Vengeance (2020). The two books form a complete story and must be read in order. The duology is finished — there are no planned additional books." },
      { q: 'How many Rage of Dragons books are there?', a: "The Burning duology by Evan Winter consists of two books: The Rage of Dragons (2019) and The Fires of Vengeance (2020). The duology is complete." },
      { q: 'What makes The Rage of Dragons different from other epic fantasy?', a: "The Rage of Dragons draws on Xhosa culture and Zulu history for its world-building, making it one of the few major epic fantasy series to be rooted in African rather than European medieval culture. The combat system is highly technical, the protagonist is entirely non-magical in a world where magic exists, and the pace is relentless — it's often described as the most action-dense epic fantasy published in the last decade." },
      { q: 'Is The Rage of Dragons appropriate for all ages?', a: "The Rage of Dragons is adult epic fantasy — it features graphic combat, death, and a level of violence that exceeds most YA fantasy. It is not recommended for young readers. Fans of Joe Abercrombie's First Law, Brian Staveley, or Mark Lawrence will feel at home with its intensity." },
    ],
  },
  {
    slug: 'his-dark-materials',
    intro: "Philip Pullman's His Dark Materials is a complete three-book fantasy trilogy that begins as a children's adventure and deepens into one of the most philosophically ambitious and theologically provocative works of speculative fiction written in the last 50 years. The trilogy follows Lyra Belacqua, a girl raised in an alternate Oxford where every human's soul takes the form of an animal companion called a dæmon, as she discovers that children are going missing and that the forces she thought were protecting her are the ones she should fear. The trilogy must be read in order. Pullman has since written two additional books in the companion series The Book of Dust.",
    startWith: 'The Golden Compass',
    books: [
      { title: 'The Golden Compass', author: 'Philip Pullman', year: 1995, note: "Book 1 — Lyra and her dæmon Pan leave Oxford for the Arctic North in search of missing children and a mysterious substance called Dust" },
      { title: 'The Subtle Knife', author: 'Philip Pullman', year: 1997, note: "Book 2 — Lyra meets Will Parry, who possesses a knife that cuts windows between worlds; the series expands to include multiple parallel universes" },
      { title: 'The Amber Spyglass', author: 'Philip Pullman', year: 2000, note: "Book 3 — The trilogy conclusion; the war between worlds reaches its crisis point" },
      { title: 'La Belle Sauvage', author: 'Philip Pullman', year: 2017, note: "The Book of Dust Vol. 1 — prequel set 10 years before The Golden Compass; can be read before or after the original trilogy", isOptional: true },
      { title: 'The Secret Commonwealth', author: 'Philip Pullman', year: 2019, note: "The Book of Dust Vol. 2 — set 20 years after His Dark Materials; follows an older Lyra", isOptional: true },
    ],
    faq: [
      { q: 'What is the His Dark Materials reading order?', a: "Read The Golden Compass (1995), then The Subtle Knife (1997), then The Amber Spyglass (2000). The trilogy must be read in order. Philip Pullman has also written The Book of Dust, a companion series: La Belle Sauvage (2017) is a prequel and can be read before or after the original trilogy; The Secret Commonwealth (2019) is a sequel set 20 years later and should be read after." },
      { q: 'How many His Dark Materials books are there?', a: "The His Dark Materials trilogy has three books. Philip Pullman has also written two volumes of The Book of Dust, a companion series: La Belle Sauvage (2017) and The Secret Commonwealth (2019). A third Book of Dust volume has been announced but not yet published." },
      { q: 'Is His Dark Materials appropriate for children?', a: "The Golden Compass is often shelved in children's fiction, but the series grows significantly darker and more philosophically complex in The Subtle Knife and The Amber Spyglass. The trilogy grapples directly with religious authority, death, consciousness, and loss. Most readers recommend it for ages 12 and up, with the caveat that The Amber Spyglass especially is emotionally demanding." },
      { q: 'What is a dæmon in His Dark Materials?', a: "In Lyra's world, every human has a dæmon — an animal companion that is, in some sense, an externalized soul. Children's dæmons can change form; adults' dæmons have settled into a permanent shape. The nature of dæmons, and what they represent about consciousness and identity, is one of the central mysteries of the trilogy." },
    ],
  },
  {
    slug: 'the-expanse',
    intro: "James S.A. Corey's The Expanse is a complete nine-book science fiction series set 200 years in the future, when humanity has colonized the solar system but the gap between Earth, Mars, and the Belt (asteroid belt colonies) has produced three distinct civilizations in conflict. The series begins with Leviathan Wakes, when a detective hired to find a missing girl and the executive officer of a destroyed freighter independently discover something that will change humanity's place in the universe. The series is famous for its hard science, its political realism, and one of the most authentic large ensemble casts in science fiction.",
    startWith: 'Leviathan Wakes',
    books: [
      { title: 'Leviathan Wakes', author: 'James S.A. Corey', year: 2011, note: "Book 1 — The protomolecule is discovered; James Holden and Detective Miller find themselves at the center of an interplanetary crisis" },
      { title: 'Caliban\'s War', author: 'James S.A. Corey', year: 2012, note: "Book 2 — The protomolecule has been weaponized; new POV characters join the Rocinante crew" },
      { title: 'Abaddon\'s Gate', author: 'James S.A. Corey', year: 2013, note: "Book 3 — A ring gate opens beyond the orbit of Uranus; humanity must decide whether to go through" },
      { title: 'Cibola Burn', author: 'James S.A. Corey', year: 2014, note: "Book 4 — Colonists and corporate interests clash on the first planet beyond the gate" },
      { title: 'Nemesis Games', author: 'James S.A. Corey', year: 2015, note: "Book 5 — the Rocinante crew separates for the first time; catastrophe strikes the inner planets" },
      { title: 'Babylon\'s Ashes', author: 'James S.A. Corey', year: 2016, note: "Book 6 — The war for the solar system reaches its conclusion; a government-in-exile fights for control" },
      { title: 'Persepolis Rising', author: 'James S.A. Corey', year: 2017, note: "Book 7 — 30 years later; a new threat emerges from the ring space" },
      { title: 'Tiamat\'s Wrath', author: 'James S.A. Corey', year: 2019, note: "Book 8 — the resistance and the Laconian Empire; the builders of the rings are found" },
      { title: 'Leviathan Falls', author: 'James S.A. Corey', year: 2021, note: "Book 9 — the series finale; humanity faces the existential threat that destroyed the builders" },
    ],
    faq: [
      { q: 'What is The Expanse reading order?', a: "The Expanse should be read in publication order: Leviathan Wakes (2011), Caliban's War (2012), Abaddon's Gate (2013), Cibola Burn (2014), Nemesis Games (2015), Babylon's Ashes (2016), Persepolis Rising (2017), Tiamat's Wrath (2019), and Leviathan Falls (2021). James S.A. Corey has also published several novellas set in the same universe that can be read alongside the novels." },
      { q: 'How many The Expanse books are there?', a: "The Expanse series has nine main novels plus a collection of novellas. The main series is complete with Leviathan Falls (2021). James S.A. Corey — the pen name of co-authors Daniel Abraham and Ty Franck — has said the story is finished." },
      { q: 'Is The Expanse hard science fiction?', a: "The Expanse is known for being one of the most scientifically rigorous major science fiction series — ships must decelerate as well as accelerate, characters experience realistic zero-g physiology, and the political and economic dynamics of a solar-system civilization are worked out in careful detail. It is hard sci-fi in the tradition of Kim Stanley Robinson and Arthur C. Clarke, but with character-driven drama that makes it accessible to readers who don't normally read hard SF." },
      { q: 'Can I watch The Expanse TV show instead of reading the books?', a: "The Expanse TV series (Amazon Prime, 6 seasons) is widely considered one of the best science fiction adaptations ever made, covering roughly the first six books. The show and books diverge in details but tell the same story. Many readers start with the show and come to the books for what happens after Season 6 — both approaches work." },
    ],
  },
  {
    slug: 'project-hail-mary',
    intro: "Andy Weir's Project Hail Mary (2021) is a complete standalone science fiction novel. There is no sequel. The novel opens with Ryland Grace waking up alone on a spaceship with no memory of how he got there, two dead crewmates, and a mission he must piece together from clues around him. What he discovers is that he is humanity's last hope, alone in another solar system, tasked with preventing Earth's extinction. The novel is structured around Grace's memories surfacing as he works the problem — and around an encounter with the only other being in the solar system who can help him.",
    startWith: 'Project Hail Mary',
    books: [
      { title: 'Project Hail Mary', author: 'Andy Weir', year: 2021, note: "Standalone — Ryland Grace wakes alone on a spacecraft with no memory and a mission he has to reconstruct from clues" },
    ],
    faq: [
      { q: 'Is Project Hail Mary a standalone novel?', a: "Yes — Project Hail Mary is a complete standalone novel with no sequels, prequels, or related books required. Andy Weir has written other novels (The Martian, Artemis), but each is entirely independent." },
      { q: 'Is Project Hail Mary related to The Martian?', a: "Project Hail Mary is not set in the same universe as The Martian and has no shared characters. Both books feature a scientifically inclined protagonist solving survival problems alone in space, and readers who loved The Martian's 'science-as-adventure' approach consistently love Project Hail Mary. But no prior reading is required." },
      { q: 'Is Project Hail Mary appropriate for non-science fiction readers?', a: "Project Hail Mary is frequently recommended as an entry point to science fiction for readers who have never read SF before. The science is accurate but explained in character — Grace is a science teacher, so his internal monologue explains concepts in terms that don't require a background in physics or biology. The emotional core of the novel is a relationship, not a concept." },
      { q: 'What makes Project Hail Mary different from other sci-fi?', a: "The central relationship in Project Hail Mary — between Grace and Rocky, a being from another star system — is one of the most unusual and moving partnerships in recent fiction. The two cannot share biology, cannot breathe the same air, and communicate through a language they build from scratch. The first-contact element of the novel is handled with both scientific rigor and genuine wonder." },
    ],
  },
  {
    slug: 'legendborn',
    intro: "Tracy Deonn's Legendborn series is an ongoing YA fantasy series set at the University of North Carolina at Chapel Hill, where a secret society called the Order of the Round Table has been hiding in plain sight for centuries — descendants of King Arthur's knights who are preparing for the day Arthur reincarnates and Britain's enemies return. Bree Matthews arrives on campus for an early college program and discovers that the death she was told was an accident was something else, and that the magical world she didn't know existed has been affecting her family for generations. The series must be read in order.",
    startWith: 'Legendborn',
    books: [
      { title: 'Legendborn', author: 'Tracy Deonn', year: 2020, note: "Book 1 — Bree Matthews uncovers the Order of the Round Table at her university and discovers her own family's connection to the Arthurian legacy" },
      { title: 'Bloodmarked', author: 'Tracy Deonn', year: 2022, note: "Book 2 — Bree must navigate the Order's politics while the Lines are fractured and the forces she discovered in Book 1 are moving faster" },
    ],
    faq: [
      { q: 'What is the Legendborn reading order?', a: "Read Legendborn (2020) first, then Bloodmarked (2022). The series must be read in order. A third book has been announced; check Tracy Deonn's website for publication updates." },
      { q: 'How many Legendborn books are there?', a: "The Legendborn Cycle currently has two published books: Legendborn (2020) and Bloodmarked (2022). A third book has been announced and is in progress." },
      { q: 'Is Legendborn part of a larger connected world?', a: "Legendborn is set in a contemporary United States where the Arthurian legend is hidden history rather than myth. It is not connected to any other published series. The world-building is entirely contained within the Legendborn Cycle." },
      { q: 'What makes Legendborn unique?', a: "Legendborn centers the experience of a Black girl in a secret society whose mythology is rooted in a white British colonial legacy — and asks what that legacy actually means, what it has done, and whether it belongs to her. The novel is unusual in the YA fantasy genre for treating the magic system and the racial history of the United States as genuinely connected rather than parallel concerns." },
    ],
  },
  {
    slug: 'winners-curse',
    intro: "Marie Rutkoski's The Winner's Trilogy is a complete three-book YA fantasy series set in a world where the Herrani people were enslaved by the Valorian empire a generation ago. The trilogy follows Kestrel, a Valorian general's daughter, who buys a Herrani slave at auction — and in doing so sets in motion a political and personal crisis that neither of them can control. The series must be read in order.",
    startWith: "The Winner's Curse",
    books: [
      { title: "The Winner's Curse", author: 'Marie Rutkoski', year: 2014, note: "Book 1 — Kestrel buys a Herrani slave named Arin and discovers she is already in a game she didn't know had started" },
      { title: "The Winner's Crime", author: 'Marie Rutkoski', year: 2015, note: "Book 2 — Kestrel is now betrothed to the emperor's son; the political situation demands choices she cannot afford to make" },
      { title: "The Winner's Kiss", author: 'Marie Rutkoski', year: 2016, note: "Book 3 — The trilogy conclusion; the war Kestrel has been trying to prevent arrives" },
    ],
    faq: [
      { q: "What is The Winner's Curse reading order?", a: "Read The Winner's Curse (2014), then The Winner's Crime (2015), then The Winner's Kiss (2016). The trilogy must be read in order. The series is complete." },
      { q: "How many Winner's Curse books are there?", a: "The Winner's Trilogy by Marie Rutkoski consists of three books: The Winner's Curse, The Winner's Crime, and The Winner's Kiss. The trilogy is complete." },
      { q: "Is The Winner's Curse enemies to lovers?", a: "Yes — The Winner's Curse is one of the defining enemies-to-lovers YA fantasy series. Kestrel is a Valorian, whose empire enslaved Arin's people; Arin is her slave and her enemy. The trilogy does not let them escape the political and moral weight of what that means, even as their personal feelings become more complicated." },
      { q: "Is The Winner's Curse similar to The Cruel Prince or An Ember in the Ashes?", a: "Yes — The Winner's Curse shares core DNA with both. Like The Cruel Prince, it features a morally complicated power dynamic and a protagonist who weaponizes intelligence against everyone around her. Like An Ember in the Ashes, it features two protagonists from opposite sides of a colonial system falling in love in ways that complicate both of their political positions." },
    ],
  },
  {
    slug: 'enders-game',
    intro: "Orson Scott Card's Ender's Game is the first book in the Ender's Game series — though the novel functions as a complete standalone and can be read without the sequels. The series follows Andrew 'Ender' Wiggin, a child genius recruited to Battle School to be trained as humanity's military commander against an alien species called the Formics. The series splits into two parallel tracks after the first book: the Ender track (Speaker for the Dead, Xenocide, Children of the Mind) and the Shadow track (Ender's Shadow and sequels), which follows Bean and the Battle School characters on Earth.",
    startWith: "Ender's Game",
    books: [
      { title: "Ender's Game", author: 'Orson Scott Card', year: 1985, note: "Book 1 — Andrew Wiggin is trained at Battle School to command humanity's fleet against the Formics; functions as a complete standalone" },
      { title: "Ender's Shadow", author: 'Orson Scott Card', year: 1999, note: "Parallel novel — the same events as Ender's Game from Bean's perspective; standalone entry point to the Shadow series", isOptional: true },
      { title: 'Speaker for the Dead', author: 'Orson Scott Card', year: 1986, note: "Ender's Game sequel — 3,000 years later; Ender is now the Speaker for the Dead on a planet with a new alien species; very different in tone", isOptional: true },
    ],
    faq: [
      { q: "What is the Ender's Game reading order?", a: "Most readers recommend starting with Ender's Game (1985), which stands alone as a complete novel. The series splits into two parallel tracks: the Ender track continues with Speaker for the Dead (1986), Xenocide (1991), and Children of the Mind (1996); the Shadow track begins with Ender's Shadow (1999), retelling Ender's Game from Bean's perspective. You can read either track after the first book without reading the other." },
      { q: "How many Ender's Game books are there?", a: "The Ender universe has two main series: the Ender track (4 books) and the Shadow track (5 books), plus several companion anthologies and short fiction collections. The most commonly read are Ender's Game, Ender's Shadow, and Speaker for the Dead." },
      { q: "Is Ender's Game appropriate for all ages?", a: "Ender's Game is frequently assigned in middle school and high school curricula. The novel deals with psychological manipulation of children, violence in a training context, and the moral weight of military command — themes that are handled in ways appropriate for readers 10 and up, though the implications deepen as readers get older." },
      { q: "Is Ender's Game still worth reading in 2024?", a: "Yes — Ender's Game remains one of the most widely read science fiction novels for good reason. The tactical puzzle-solving, the psychological dynamics of Battle School, and the moral weight of the ending are as effective as they were in 1985. Many readers discover it as teenagers and reread it as adults with a completely different response to the twist." },
    ],
  },
  {
    slug: 'a-deadly-education',
    intro: "Naomi Novik's The Scholomance trilogy is a complete three-book YA fantasy series about a school for magical students that is specifically designed to kill them — because the alternative is being killed by the monsters attracted by magical children outside the school. The protagonist, El (Galadriel), has a prophesied ability to kill everything, which everyone around her assumes means she will become a dark mage. The series must be read in order.",
    startWith: 'A Deadly Education',
    books: [
      { title: 'A Deadly Education', author: 'Naomi Novik', year: 2020, note: "Book 1 — El navigates the Scholomance, a school that kills students for survival rather than sport, while an annoyingly helpful classmate named Orion Lake keeps saving her" },
      { title: 'The Last Graduate', author: 'Naomi Novik', year: 2021, note: "Book 2 — senior year at the Scholomance; the graduation gauntlet looms" },
      { title: 'The Golden Enclaves', author: 'Naomi Novik', year: 2022, note: "Book 3 — the trilogy conclusion; El and Orion face what comes after survival" },
    ],
    faq: [
      { q: 'What is the Scholomance reading order?', a: "Read A Deadly Education (2020), then The Last Graduate (2021), then The Golden Enclaves (2022). All three must be read in order. The trilogy is complete." },
      { q: 'How many Scholomance books are there?', a: "The Scholomance trilogy by Naomi Novik consists of three books: A Deadly Education (2020), The Last Graduate (2021), and The Golden Enclaves (2022). The trilogy is complete." },
      { q: 'Is The Scholomance similar to Harry Potter?', a: "The Scholomance is partly a direct critique of the magical-school fantasy — the school has no teachers, no staff, no sports, and no extracurriculars. Its purpose is not education but survival. El's mordant narration, which is consistently aware of the genre conventions she is inside, treats the magical-school premise with the same satirical affection that Holly Black's Folk of the Air treats the fantasy-court premise." },
      { q: 'Is A Deadly Education appropriate for all ages?', a: "A Deadly Education is YA with a darker edge than most — students die regularly, and El's internal monologue is caustic, intelligent, and often very funny about terrible things. The romantic subplot is slow-burn and not explicit. Recommended for readers 14 and up." },
    ],
  },
  {
    slug: 'american-gods',
    intro: "Neil Gaiman's American Gods (2001) is a standalone novel — there is no sequel, though Gaiman has written companion short fiction including 'The Monarch of the Glen' and 'Black Dog'. The novel follows Shadow Moon, released from prison three days before his wife's death in a car accident, who is immediately recruited by a man calling himself Mr. Wednesday to work as his bodyguard. Mr. Wednesday is traveling across America to gather the old gods — brought to America by the immigrants who believed in them — for a war against the new gods of technology, media, and celebrity.",
    startWith: 'American Gods',
    books: [
      { title: 'American Gods', author: 'Neil Gaiman', year: 2001, note: "Standalone — Shadow Moon is recruited by Mr. Wednesday, an old god, to travel America gathering allies for a war against the new gods of technology and media" },
      { title: 'Anansi Boys', author: 'Neil Gaiman', year: 2005, note: "Companion standalone — Fat Charlie Nancy discovers his late father was the African trickster god Anansi; set in the same world but no shared plot", isOptional: true },
    ],
    faq: [
      { q: 'Is American Gods a standalone novel?', a: "Yes — American Gods is a complete standalone novel. Anansi Boys (2005) is set in the same world and features the character Mr. Nancy from American Gods, but the two books have no shared plot and Anansi Boys can be read first, last, or not at all." },
      { q: 'Is American Gods related to Neil Gaiman\'s other books?', a: "American Gods is set in its own world — not connected to Stardust, Neverwhere, Coraline, Good Omens, or any of Gaiman's other novels. The tone is darker and more grounded in American mythology than Stardust, closer to Neverwhere in its sense of a hidden world behind ordinary life." },
      { q: 'What is American Gods about?', a: "American Gods is a road trip through America as a religious landscape — a novel about what happens to gods when the people who believed in them emigrate to a new country. The old gods brought from Africa, Europe, and Asia are diminished and forgotten, surviving by working ordinary jobs; the new gods of television, the internet, and celebrity are young and arrogant. The war between them is about who owns American belief." },
      { q: 'Is the American Gods TV show based on the book?', a: "Yes — the American Gods TV series (Starz, 2017–2021) was based directly on the novel and adapted by Bryan Fuller and Michael Green. The show ran for three seasons and covered roughly the events of the novel. Gaiman was an executive producer. The show is considered a largely faithful adaptation with some significant expansions of supporting characters." },
    ],
  },
  {
    slug: 'foundation',
    intro: "Isaac Asimov's Foundation is a classic science fiction series about the fall of a galactic empire and one man's plan to reduce the dark age that follows from 30,000 years to 1,000 years. The original trilogy — Foundation, Foundation and Empire, and Second Foundation — was written in the 1950s and is complete in itself. Asimov later added prequels (Prelude to Foundation, Forward the Foundation) and sequels (Foundation's Edge, Foundation and Earth) that expand the universe. Most readers start with the original trilogy.",
    startWith: 'Foundation',
    books: [
      { title: 'Foundation', author: 'Isaac Asimov', year: 1951, note: "Book 1 — Hari Seldon's psychohistory predicts the fall of the Galactic Empire; he establishes a Foundation at the edge of the galaxy to preserve knowledge" },
      { title: 'Foundation and Empire', author: 'Isaac Asimov', year: 1952, note: "Book 2 — the Foundation faces its greatest crisis: the Mule, a mutant whose abilities psychohistory could not predict" },
      { title: 'Second Foundation', author: 'Isaac Asimov', year: 1953, note: "Book 3 — the original trilogy concludes; the search for the Second Foundation" },
      { title: "Foundation's Edge", author: 'Isaac Asimov', year: 1982, note: "Book 4 — Asimov's sequel, written 30 years later; set 500 years after the trilogy", isOptional: true },
      { title: 'Prelude to Foundation', author: 'Isaac Asimov', year: 1988, note: "Prequel — Hari Seldon's early life and the development of psychohistory; written for new readers", isOptional: true },
    ],
    faq: [
      { q: 'What is the Foundation reading order?', a: "Most readers recommend starting with Foundation (1951) and reading the original trilogy in order (Foundation, Foundation and Empire, Second Foundation). Asimov later added two prequels (Prelude to Foundation, Forward the Foundation) and two sequels (Foundation's Edge, Foundation and Earth). The prequels are a good entry point for new readers; the sequels extend the universe but are less essential." },
      { q: 'How many Foundation books are there?', a: "Asimov wrote seven Foundation novels in total: the original trilogy (3 books), two prequels (Prelude to Foundation, Forward the Foundation), and two sequels (Foundation's Edge, Foundation and Earth). There are also Foundation stories and companion novels by other authors." },
      { q: "Is Foundation still worth reading in 2024?", a: "Foundation remains one of the most influential science fiction series ever written, and the central concept — psychohistory, a mathematical science that predicts the behavior of large populations — is as intellectually interesting now as it was in 1951. The prose is more functional than literary, but the ideas are the point. The Apple TV+ adaptation (2021–) has introduced many new readers to the series." },
      { q: "What is psychohistory in Foundation?", a: "Psychohistory is the fictional science at the center of Foundation — a branch of mathematics that uses statistics to predict the behavior of large populations over long periods of time. Like statistical mechanics, it works at scale: it can predict what civilizations will do but cannot predict what individuals will do. The plan Hari Seldon builds around psychohistory is the engine of the entire series." },
    ],
  },
  {
    slug: 'hyperion',
    intro: "Dan Simmons' Hyperion Cantos is a four-book science fiction series, though the first two books (Hyperion and The Fall of Hyperion) form a complete story and are most commonly read as a pair. The series is set in a future interstellar civilization on the eve of its collapse, centering on the planet Hyperion, where an entity called the Shrike — worshipped by one cult, feared by all — has been killing pilgrims for centuries. The first novel is structured as a Canterbury Tales-style pilgrimage in which seven characters tell the stories of why they came to Hyperion.",
    startWith: 'Hyperion',
    books: [
      { title: 'Hyperion', author: 'Dan Simmons', year: 1989, note: "Book 1 — seven pilgrims on a final journey to Hyperion tell their stories in the mode of The Canterbury Tales; ends on a cliffhanger" },
      { title: 'The Fall of Hyperion', author: 'Dan Simmons', year: 1990, note: "Book 2 — the conclusion of the first story arc; read immediately after Hyperion" },
      { title: 'Endymion', author: 'Dan Simmons', year: 1996, note: "Book 3 — set 274 years after the first duet; a new story arc with new protagonists in a transformed civilization", isOptional: true },
      { title: 'The Rise of Endymion', author: 'Dan Simmons', year: 1997, note: "Book 4 — the Endymion arc concludes", isOptional: true },
    ],
    faq: [
      { q: 'What is the Hyperion Cantos reading order?', a: "Read Hyperion (1989), then The Fall of Hyperion (1990) immediately after — they form one complete story published in two volumes. Endymion (1996) and The Rise of Endymion (1997) form a separate but connected story set centuries later and can be read as a standalone duet after the first pair." },
      { q: 'How many Hyperion books are there?', a: "The Hyperion Cantos consists of four novels: Hyperion (1989), The Fall of Hyperion (1990), Endymion (1996), and The Rise of Endymion (1997). The series is complete." },
      { q: 'Why is Hyperion structured like The Canterbury Tales?', a: "The first novel is structured as a pilgrimage to a dangerous site, in which each pilgrim tells their story — drawing directly on Chaucer's Canterbury Tales. Each of the seven tales is told in a completely different literary mode: one is a detective story, one is a military thriller, one is a scholar's tragedy, one is a priest's crisis of faith. The structure lets Simmons write seven different kinds of science fiction novel inside one book." },
      { q: 'Is Hyperion worth reading even if I am not usually a sci-fi reader?', a: "Hyperion is frequently recommended to literary fiction readers who don't usually read science fiction, because the Canterbury Tales structure foregrounds voice and story-within-story rather than world-building exposition. The tale of the Consul, the Sol Weintraub story, and the detective tale in particular read as distinct literary fiction genres that happen to take place in space." },
    ],
  },
  {
    slug: 'uprooted',
    intro: "Naomi Novik's Uprooted (2015) is a complete standalone fantasy novel. There is no sequel. The novel is a dark fairy tale inspired by Eastern European folk traditions, particularly Polish folklore, about Agnieszka — a girl from a village on the edge of a corrupted magical forest called the Wood — and the Dragon, a cold and powerful wizard who takes one girl from her valley every ten years to serve him. The novel's relationship with Polish folklore and its sense of magic as something wild and personal rather than systematic won it the Nebula Award for Best Novel.",
    startWith: 'Uprooted',
    books: [
      { title: 'Uprooted', author: 'Naomi Novik', year: 2015, note: "Standalone — Agnieszka is taken to serve the Dragon, discovers she has magic, and faces the Wood that has been corrupting her valley for generations" },
    ],
    faq: [
      { q: 'Is Uprooted by Naomi Novik a standalone?', a: "Yes — Uprooted is a complete standalone novel with no sequels or prequels. Novik has written other fantasy (the Scholomance trilogy, the Temeraire series), but Uprooted is entirely independent." },
      { q: 'Is Uprooted similar to A Deadly Education?', a: "Both are by Naomi Novik, and both feature young female protagonists discovering that their relationship to magic is unusual and poorly understood by the experts around them. Uprooted is darker, more fairy-tale in register, and more focused on the relationship between Agnieszka and the Dragon; A Deadly Education is more mordantly funny and more explicitly YA." },
      { q: 'What folklore is Uprooted based on?', a: "Uprooted draws primarily on Polish folklore — the Dragon is based on the Polish folk figure of a cold, powerful wizard who lives in a tower, and the Wood draws on Slavic traditions of malevolent forests. Novik has spoken extensively about the influence of Polish fairy tales and the fairy tale collections of her childhood on the novel." },
      { q: 'Is Uprooted a romance?', a: "Uprooted has a romance at its center — the slow evolution of the relationship between Agnieszka and the Dragon — but it is primarily a dark fantasy novel with significant horror elements involving the Wood. The romance is unusual in that it develops in ways that are hard to predict from the opening chapters." },
    ],
  },
  {
    slug: 'recursion',
    intro: "Blake Crouch's Recursion (2019) is a complete standalone science fiction thriller. There is no sequel. The novel begins with two parallel storylines: a woman who discovers that her son — who died years ago — may not have died after all; and a NYPD detective investigating a new phenomenon called False Memory Syndrome, in which people are experiencing detailed memories of lives they didn't live. The novel's central concept involves the scientific mechanism behind these phenomena, which Crouch reveals incrementally.",
    startWith: 'Recursion',
    books: [
      { title: 'Recursion', author: 'Blake Crouch', year: 2019, note: "Standalone — a neuroscientist and a detective uncover the mechanism behind False Memory Syndrome and discover it involves the ability to change history" },
    ],
    faq: [
      { q: 'Is Recursion by Blake Crouch a standalone?', a: "Yes — Recursion is a complete standalone novel with no sequels or prequels. Blake Crouch has written other standalone thrillers (Dark Matter, Upgrade) and the Wayward Pines trilogy, but Recursion is entirely independent." },
      { q: 'Is Recursion similar to Dark Matter by Blake Crouch?', a: "Yes — both Recursion and Dark Matter are standalone thrillers by Crouch that use a scientific concept (parallel universes in Dark Matter, memory and time in Recursion) as the engine of a thriller plot. Most readers who love one love the other. Dark Matter came first (2016) and has a slightly more focused structure; Recursion is more ambitious in scope." },
      { q: 'Is Recursion science fiction or a thriller?', a: "Recursion is generally shelved in science fiction but reads as a thriller — it has the pacing of a thriller and does not require any prior interest in science fiction. The science is explained in character and is plausible enough to be unsettling. It's one of the most accessible science fiction novels for readers who don't usually read the genre." },
      { q: 'What is Recursion about without spoilers?', a: "Recursion is about memory and time — specifically about what it would mean to be able to go back to a point in your past and change what happened. The mechanism for this is revealed gradually. The novel is a thriller that asks what you would actually do if you could fix the worst moment of your life, and what that fixing might cost." },
    ],
  },
  {
    slug: 'left-hand-of-darkness',
    intro: "Ursula K. Le Guin's The Left Hand of Darkness (1969) is a complete standalone science fiction novel. There is no sequel, though it is set in the same universe as several other Le Guin novels (the Hainish Cycle) which can be read independently in any order. The novel follows Genly Ai, a human envoy from the galactic confederation called the Ekumen, sent to the planet Gethen — a world where no one is permanently male or female — to invite it to join. The novel won both the Hugo and Nebula Awards for Best Novel.",
    startWith: 'The Left Hand of Darkness',
    books: [
      { title: 'The Left Hand of Darkness', author: 'Ursula K. Le Guin', year: 1969, note: "Standalone — Genly Ai, a human envoy, navigates the politics of a planet where human beings are ambisexual, told partly through his reports, partly through local mythology and folktales" },
      { title: 'The Dispossessed', author: 'Ursula K. Le Guin', year: 1974, note: "Companion standalone — set in the same Hainish Cycle universe; an anarchist physicist from a utopian moon visits the capitalist planet that exiled his people", isOptional: true },
    ],
    faq: [
      { q: 'Is The Left Hand of Darkness a standalone?', a: "Yes — The Left Hand of Darkness is a complete standalone novel. It is set in Le Guin's Hainish Cycle, a shared universe that includes The Dispossessed and several other novels, but each can be read independently with no required reading order." },
      { q: 'What is The Left Hand of Darkness about?', a: "The Left Hand of Darkness is about a human envoy from a galactic confederation sent to a world where human beings are not permanently male or female — they exist in a sexually neuter state most of the time and enter periods of fertility (kemmer) that can be either male or female. The novel uses this premise to examine what gender actually is: what it does to perception, politics, and personal relationships when it is neither permanent nor determining." },
      { q: 'Is The Left Hand of Darkness dated?', a: "The Left Hand of Darkness remains one of the most widely taught and discussed science fiction novels ever written, partly because its central premise has only become more relevant since 1969. The prose is Le Guin's formal, measured style that some readers find slow; the ideas are as contemporary as anything published in the last five years." },
      { q: "What is the Hainish Cycle?", a: "The Hainish Cycle is Ursula K. Le Guin's shared science fiction universe, in which all the inhabited planets in the galaxy were originally seeded from the planet Hain millions of years ago, and are now being reunited by a galactic confederation called the Ekumen. The cycle includes The Left Hand of Darkness, The Dispossessed, The Word for World is Forest, and several other novels and stories — but all can be read independently, in any order." },
    ],
  },
  {
    slug: 'old-mans-war',
    intro: "John Scalzi's Old Man's War series is an ongoing military science fiction series currently at six novels. The series follows John Perry, a 75-year-old man who joins the Colonial Defense Forces — humanity's interstellar military — in a new young body, fighting in a war for habitable planets against dozens of alien species. The series can be read in publication order; each novel is largely self-contained with the first book functioning as the strongest standalone.",
    startWith: "Old Man's War",
    books: [
      { title: "Old Man's War", author: 'John Scalzi', year: 2005, note: "Book 1 — John Perry joins the Colonial Defense Forces at 75 and discovers what old people get in exchange for their military service; functions as a complete standalone" },
      { title: 'The Ghost Brigades', author: 'John Scalzi', year: 2006, note: "Book 2 — follows the Special Forces, made from the DNA of people who died before they could enlist; different protagonist than Book 1" },
      { title: 'The Last Colony', author: 'John Scalzi', year: 2007, note: "Book 3 — John Perry and Jane Sagan lead a new colony; the galactic politics around human colonization come to a head" },
    ],
    faq: [
      { q: "What is the Old Man's War reading order?", a: "Read Old Man's War (2005) first — it functions as a complete standalone. The Ghost Brigades (2006) and The Last Colony (2007) form a loose trilogy with the first book. Zoe's Tale (2008) retells The Last Colony from a different perspective. Additional novels in the series include The Human Division (2013) and The End of All Things (2015)." },
      { q: "How many Old Man's War books are there?", a: "The Old Man's War series currently has six novels: Old Man's War, The Ghost Brigades, The Last Colony, Zoe's Tale, The Human Division, and The End of All Things. John Scalzi has not ruled out additional books in the series." },
      { q: "Is Old Man's War similar to Ender's Game?", a: "Old Man's War and Ender's Game are frequently compared — both are military science fiction about humanity at war with alien species, both center on protagonists who are trained to fight, and both ask what the military does to the people it builds. Scalzi's approach is more comedic and more direct about the political economy of interstellar war than Card's; Ender's Game is darker and more focused on the psychological cost." },
      { q: "Is Old Man's War hard science fiction?", a: "Old Man's War is military science fiction rather than hard SF — the science is plausible and internally consistent but Scalzi doesn't labor over technical detail. The novel's interest is in what the premise does to the characters (particularly what it means to fight a war in a young body with an old person's values) rather than in the technical mechanisms." },
    ],
  },
  {
    slug: 'kingdom-of-the-wicked',
    intro: "Kerri Maniscalco's Kingdom of the Wicked is a complete three-book YA dark fantasy series set in 1888 Sicily, where a young woman named Emilia di Carlo summons a demon to help her investigate her twin sister's murder — and discovers that the murders are connected to the Seven Princes of Hell. The series must be read in order.",
    startWith: 'Kingdom of the Wicked',
    books: [
      { title: 'Kingdom of the Wicked', author: 'Kerri Maniscalco', year: 2020, note: "Book 1 — Emilia summons Wrath, the Demon Prince of Wrath, to help her find her twin sister's killer in a supernatural Sicily" },
      { title: 'Kingdom of the Cursed', author: 'Kerri Maniscalco', year: 2021, note: "Book 2 — Emilia travels to the underworld in pursuit of her sister's killer" },
      { title: 'Kingdom of the Feared', author: 'Kerri Maniscalco', year: 2022, note: "Book 3 — the trilogy conclusion; Emilia and Wrath face the full consequences of the bargain they've made" },
    ],
    faq: [
      { q: 'What is the Kingdom of the Wicked reading order?', a: "Read Kingdom of the Wicked (2020), then Kingdom of the Cursed (2021), then Kingdom of the Feared (2022). All three must be read in order. The trilogy is complete." },
      { q: 'How many Kingdom of the Wicked books are there?', a: "The Kingdom of the Wicked trilogy by Kerri Maniscalco consists of three books: Kingdom of the Wicked (2020), Kingdom of the Cursed (2021), and Kingdom of the Feared (2022). The trilogy is complete." },
      { q: 'Is Kingdom of the Wicked enemies to lovers?', a: "Yes — Kingdom of the Wicked features an enemies-to-lovers romance between Emilia and Wrath, the Demon Prince of Wrath. The romance follows a slow-burn arc across all three books, with Wrath beginning as an antagonist whose goals may or may not align with Emilia's." },
      { q: 'Is Kingdom of the Wicked related to Stalking Jack the Ripper?', a: "Both series are by Kerri Maniscalco, but they are set in completely different worlds and have no shared characters or plot. Stalking Jack the Ripper is historical fiction set in Victorian London; Kingdom of the Wicked is supernatural fantasy set in 1888 Sicily." },
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
