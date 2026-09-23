// Entries in series.ts / reading-orders.ts / recommendations.ts are stored
// newest-first, so the oldest (original, hand-curated) ones are at the end.
//
// Only this many of each type are prerendered at build time and listed in the
// sitemap. Everything else still works: it renders on first request and is
// cached (ISR). Prerendering all ~30,000 pages ran the Vercel build out of
// memory, and publishing thousands of templated pages at once is an SEO risk.
// Raise this gradually as Search Console shows the pages getting indexed.
export const ROLLOUT_LIMIT = 1500;

export function rolloutSlice<T>(items: readonly T[]): T[] {
  return items.slice(-ROLLOUT_LIMIT);
}
