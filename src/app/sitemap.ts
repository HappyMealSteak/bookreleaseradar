import type { MetadataRoute } from 'next';
import { getAllBooks, getPublishedMonths } from '@/lib/db';
import { GENRES } from '@/lib/types';
import { SERIES } from '@/lib/series';
import { ALL_READING_ORDER_SLUGS } from '@/lib/reading-orders';
import { ALL_BOOKS_LIKE_SLUGS } from '@/lib/recommendations';
import { authorSlug } from '@/lib/utils';

const BASE = 'https://bookreleaseradar.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [books, months] = await Promise.all([getAllBooks(2000), getPublishedMonths()]);

  const bookUrls: MetadataRoute.Sitemap = books.map((book) => ({
    url: `${BASE}/books/${book.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const genreUrls: MetadataRoute.Sitemap = GENRES.map((genre) => ({
    url: `${BASE}/genre/${genre}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.7,
  }));

  const uniqueAuthors = [
    ...new Set(books.flatMap((b) => b.authors).filter(Boolean)),
  ];
  const authorUrls: MetadataRoute.Sitemap = uniqueAuthors.map((author) => ({
    url: `${BASE}/author/${authorSlug(author)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const monthUrls: MetadataRoute.Sitemap = months.map(({ year, month }) => ({
    url: `${BASE}/releases/${year}/${String(month).padStart(2, '0')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const currentYear = new Date().getFullYear();
  const seriesUrls: MetadataRoute.Sitemap = [
    { url: `${BASE}/series`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...SERIES.map((s) => ({
      url: `${BASE}/series/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
    ...ALL_READING_ORDER_SLUGS.map((slug) => ({
      url: `${BASE}/series/${slug}/reading-order`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    { url: `${BASE}/books-like`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/releases/${currentYear}`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.85 },
    { url: `${BASE}/releases/${currentYear + 1}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...ALL_BOOKS_LIKE_SLUGS.map((slug) => ({
      url: `${BASE}/books-like/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.88,
    })),
  ];

  const bestBookUrls: MetadataRoute.Sitemap = [2025, 2026, 2027].flatMap((year) => [
    { url: `${BASE}/best-books/${year}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.88 },
    ...GENRES.map((genre) => ({
      url: `${BASE}/best-books/${year}/${genre}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
  ]);

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE}/new-releases`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.95 },
    { url: `${BASE}/most-anticipated`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/trending`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.88 },
    { url: `${BASE}/calendar`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE}/search`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/disclosure`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    ...seriesUrls,
    ...genreUrls,
    ...monthUrls,
    ...authorUrls,
    ...bookUrls,
    ...bestBookUrls,
  ];
}
