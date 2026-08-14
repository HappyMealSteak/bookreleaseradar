export interface SeriesDefinition {
  slug: string;
  name: string;
  shortName?: string;
  author: string;
  authorQuery: string;
  genre: string;
  description: string;
  searchTerms: string[];
}

export const SERIES: SeriesDefinition[] = [
  {
    slug: 'acotar',
    name: 'A Court of Thorns and Roses',
    shortName: 'ACOTAR',
    author: 'Sarah J. Maas',
    authorQuery: 'Sarah J. Maas',
    genre: 'fantasy',
    description:
      'A Court of Thorns and Roses (ACOTAR) is the bestselling romantic fantasy series by Sarah J. Maas, following Feyre Archeron into a dangerous world of fae courts, ancient magic, and forbidden love. Spanning six books including A Court of Silver Flames and A Court of Frost and Starlight, ACOTAR has defined a generation of fantasy readers.',
    searchTerms: [
      'A Court of Thorns and Roses Sarah J. Maas',
      'ACOTAR new book',
      'Sarah J. Maas fantasy novel 2026',
      'Sarah J. Maas fantasy novel 2027',
    ],
  },
  {
    slug: 'throne-of-glass',
    name: 'Throne of Glass',
    shortName: 'ToG',
    author: 'Sarah J. Maas',
    authorQuery: 'Sarah J. Maas',
    genre: 'fantasy',
    description:
      'Throne of Glass (ToG) is the epic fantasy series by Sarah J. Maas following Celaena Sardothien, a legendary assassin navigating kingdoms, magic, and war. Spanning eight books from Throne of Glass to Kingdom of the Wicked, ToG launched Sarah J. Maas as a dominant force in fantasy fiction.',
    searchTerms: [
      'Throne of Glass Sarah J. Maas',
      'Celaena Sardothien new book',
    ],
  },
  {
    slug: 'crescent-city',
    name: 'Crescent City',
    author: 'Sarah J. Maas',
    authorQuery: 'Sarah J. Maas',
    genre: 'fantasy',
    description:
      'Crescent City is the urban fantasy series by Sarah J. Maas set in the city of Lunathion, blending fae mythology with a neon-lit contemporary world. House of Earth and Blood, House of Sky and Breath, and House of Flame and Shadow deliver high-stakes action, complex romance, and a richly layered world that intersects with ACOTAR and ToG.',
    searchTerms: [
      'Crescent City Sarah J. Maas',
      'House of Earth and Blood sequel',
      'Sarah J. Maas House of new book',
    ],
  },
  {
    slug: 'a-song-of-ice-and-fire',
    name: 'A Song of Ice and Fire',
    shortName: 'GoT',
    author: 'George R.R. Martin',
    authorQuery: 'George R.R. Martin',
    genre: 'fantasy',
    description:
      "A Song of Ice and Fire (GoT) is George R.R. Martin's landmark epic fantasy series and the source material for HBO's Game of Thrones. Millions of fans worldwide await The Winds of Winter — the long-anticipated sixth book following A Dance with Dragons (2011) — and the eventual final volume, A Dream of Spring.",
    searchTerms: [
      'George R.R. Martin Winds of Winter',
      'A Song of Ice and Fire new book',
      'George R.R. Martin new novel',
      'Winds of Winter release date',
    ],
  },
  {
    slug: 'fourth-wing',
    name: 'Fourth Wing',
    shortName: 'Empyrean',
    author: 'Rebecca Yarros',
    authorQuery: 'Rebecca Yarros',
    genre: 'fantasy',
    description:
      'Fourth Wing and Iron Flame launched Rebecca Yarros\'s Empyrean series into a worldwide phenomenon. Set in a military dragon-riding academy, the series blends pulse-pounding action with enemies-to-lovers romance. Fans eagerly await the next installments in this record-breaking fantasy saga.',
    searchTerms: [
      'Fourth Wing Rebecca Yarros',
      'Empyrean series Rebecca Yarros new book',
      'Iron Flame sequel Rebecca Yarros',
      'Rebecca Yarros new novel 2026',
    ],
  },
  {
    slug: 'colleen-hoover',
    name: 'Colleen Hoover',
    shortName: 'CoHo',
    author: 'Colleen Hoover',
    authorQuery: 'Colleen Hoover',
    genre: 'romance',
    description:
      "Colleen Hoover (CoHo) is the #1 New York Times bestselling author whose emotionally gripping romance and new adult fiction has taken the world by storm. From Ugly Love and It Ends with Us to Reminders of Him and Confess, CoHo's books dominate bestseller lists and BookTok alike.",
    searchTerms: [
      'Colleen Hoover new novel 2026',
      'Colleen Hoover romance book',
      'Colleen Hoover 2027',
    ],
  },
  {
    slug: 'wheel-of-time',
    name: 'The Wheel of Time',
    shortName: 'WoT',
    author: 'Robert Jordan',
    authorQuery: 'Jordan',
    genre: 'fantasy',
    description:
      "The Wheel of Time (WoT) is Robert Jordan's iconic 14-book epic fantasy series, completed by Brandon Sanderson after Jordan's passing. Set in a vast world where time is a turning wheel, the series follows Rand al'Thor in an epochal battle of Light against Shadow. Companion works and the Prime Video adaptation continue to expand the world.",
    searchTerms: [
      'Wheel of Time Robert Jordan companion',
      'Wheel of Time Brandon Sanderson new',
      'Robert Jordan fantasy new book',
    ],
  },
  {
    slug: 'mistborn',
    name: 'Mistborn',
    author: 'Brandon Sanderson',
    authorQuery: 'Brandon Sanderson',
    genre: 'fantasy',
    description:
      "Mistborn is Brandon Sanderson's beloved fantasy series featuring a unique magic system built on ingesting metals. Spanning multiple eras — from the original trilogy to the Wax & Wayne books and the upcoming Era 3 — Mistborn is the crown jewel of Sanderson's vast Cosmere universe.",
    searchTerms: [
      'Mistborn Brandon Sanderson new book',
      'Brandon Sanderson Mistborn Era 3',
      'Brandon Sanderson Cosmere 2026',
    ],
  },
  {
    slug: 'stormlight-archive',
    name: 'The Stormlight Archive',
    author: 'Brandon Sanderson',
    authorQuery: 'Brandon Sanderson',
    genre: 'fantasy',
    description:
      "The Stormlight Archive is Brandon Sanderson's magnum opus — a sprawling 10-book epic fantasy set on the storm-wracked world of Roshar. Wind and Truth (Book 5) concluded the first arc, and the next five books will follow a new generation of characters in a transformed world. Stormlight is essential reading for any serious fantasy fan.",
    searchTerms: [
      'Stormlight Archive Brandon Sanderson',
      'Brandon Sanderson Wind and Truth sequel',
      'Stormlight Archive book 6',
    ],
  },
  {
    slug: 'hunger-games',
    name: 'The Hunger Games',
    author: 'Suzanne Collins',
    authorQuery: 'Suzanne Collins',
    genre: 'fiction',
    description:
      "The Hunger Games by Suzanne Collins is the defining dystopian YA series of a generation, following Katniss Everdeen in the brutal, televised death matches of Panem. The series expanded with The Ballad of Songbirds and Snakes prequel, and fans anticipate further explorations of this rich, dark world.",
    searchTerms: [
      'Suzanne Collins new book',
      'Hunger Games new novel',
      'Hunger Games prequel sequel Suzanne Collins',
    ],
  },
];

export function getSeriesBySlug(slug: string): SeriesDefinition | undefined {
  return SERIES.find((s) => s.slug === slug);
}
