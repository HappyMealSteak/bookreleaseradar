export const GENRES = [
  'fiction',
  'thriller',
  'mystery',
  'fantasy',
  'sci-fi',
  'romance',
  'self-help',
  'non-fiction',
] as const;

export type Genre = (typeof GENRES)[number];

export const GENRE_LABELS: Record<Genre, string> = {
  fiction: 'Fiction',
  thriller: 'Thriller',
  mystery: 'Mystery',
  fantasy: 'Fantasy',
  'sci-fi': 'Sci-Fi',
  romance: 'Romance',
  'self-help': 'Self-Help',
  'non-fiction': 'Non-Fiction',
};

export const GENRE_DESCRIPTIONS: Record<Genre, string> = {
  fiction: 'From debut literary novels to sweeping family sagas, these upcoming fiction releases explore the full range of human experience. Discover the new voices and established authors shaping contemporary storytelling.',
  thriller: 'Stay on the edge of your seat with the latest psychological thrillers, crime thrillers, and suspense novels. These upcoming releases promise twists, tension, and sleepless nights.',
  mystery: 'New whodunits, cozy mysteries, and noir crime novels arriving soon. Track upcoming releases from your favorite detective fiction authors and discover fresh voices in the mystery genre.',
  fantasy: 'Epic worlds, magical systems, and unforgettable characters await. Browse upcoming fantasy releases spanning epic fantasy, urban fantasy, and dark fantasy — from debut authors and series you already love.',
  'sci-fi': 'Explore the future with the latest science fiction novels. From hard sci-fi to space opera and speculative fiction, these upcoming releases push the boundaries of imagination.',
  romance: 'Fall in love all over again with the newest romance releases. Contemporary romance, historical romance, and romantic suspense — find your next swoony read before it hits shelves.',
  'self-help': 'Build better habits, sharpen your mindset, and unlock your potential with the latest self-help and personal development books. Upcoming titles from leading coaches, researchers, and thinkers.',
  'non-fiction': 'True stories, expert insights, and real-world knowledge. Browse upcoming non-fiction releases covering history, science, memoir, journalism, and current events.',
};

export interface Book {
  id: string;
  isbn: string | null;
  slug: string;
  title: string;
  authors: string[];
  publishedDate: string | null;
  description: string | null;
  coverUrl: string | null;
  genres: string[];
  pageCount: number | null;
  publisher: string | null;
  amazonUrl: string;
  googleUrl: string | null;
}

// Raw Google Books API shape
export interface GBVolume {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
    description?: string;
    categories?: string[];
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    industryIdentifiers?: Array<{
      type: string;
      identifier: string;
    }>;
    pageCount?: number;
    publisher?: string;
    infoLink?: string;
    language?: string;
    previewLink?: string;
    averageRating?: number;
    ratingsCount?: number;
  };
}

export interface GBResponse {
  totalItems: number;
  items?: GBVolume[];
}
