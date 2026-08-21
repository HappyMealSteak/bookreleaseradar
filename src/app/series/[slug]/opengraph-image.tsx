import { ImageResponse } from 'next/og';
import { getSeriesBySlug } from '@/lib/series';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function SeriesOgImage({ params }: Props) {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);

  const name = series?.name ?? 'Book Series';
  const shortName = series?.shortName;
  const author = series?.author ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '64px',
          background: 'linear-gradient(135deg, #0f1117 0%, #1a1f2e 100%)',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Label row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <span style={{ fontSize: '13px', fontFamily: 'system-ui, sans-serif', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#d97706' }}>
            Book Series
          </span>
          {shortName && (
            <span style={{ fontSize: '13px', fontFamily: 'system-ui, sans-serif', fontWeight: 700, letterSpacing: '2px', padding: '3px 10px', borderRadius: '999px', background: 'rgba(217,119,6,0.15)', border: '1px solid rgba(217,119,6,0.4)', color: '#fbbf24' }}>
              {shortName}
            </span>
          )}
        </div>

        {/* Series name */}
        <div style={{ fontSize: name.length > 30 ? '44px' : '52px', fontWeight: 700, color: '#f8f7f4', lineHeight: 1.1, marginBottom: '20px', maxWidth: '900px' }}>
          {name}
        </div>

        {/* Author */}
        <div style={{ fontSize: '22px', color: '#94a3b8', fontFamily: 'system-ui, sans-serif', marginBottom: '48px' }}>
          by {author}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#d97706' }} />
          <span style={{ fontSize: '16px', color: '#64748b', fontFamily: 'system-ui, sans-serif', letterSpacing: '1px' }}>
            BookReleaseRadar.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
