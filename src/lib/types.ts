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
