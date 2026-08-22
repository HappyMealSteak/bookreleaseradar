import { ImageResponse } from 'next/og';
import { GENRE_LABELS } from '@/lib/types';
import type { Genre } from '@/lib/types';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const GENRE_ACCENTS: Record<string, string> = {
  thriller: '#dc2626',
  mystery: '#7c3aed',
  fantasy: '#2563eb',
  romance: '#db2777',
  'sci-fi': '#0891b2',
  fiction: '#059669',
  'self-help': '#d97706',
  'non-fiction': '#64748b',
};

interface Props {
  params: Promise<{ genre: string }>;
}

export default async function GenreOGImage({ params }: Props) {
  const { genre } = await params;
  const label = GENRE_LABELS[genre as Genre] ?? genre;
  const accent = GENRE_ACCENTS[genre] ?? '#d97706';
  const year = new Date().getFullYear();

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0f1117',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Accent bar */}
          <div style={{ display: 'flex', width: '60px', height: '4px', background: accent, marginBottom: '32px', borderRadius: '2px' }} />

          {/* Genre eyebrow */}
          <div style={{ display: 'flex', fontSize: '22px', fontWeight: 700, color: accent, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '20px', fontFamily: 'sans-serif' }}>
            {label}
          </div>

          {/* Headline */}
          <div style={{ display: 'flex', fontSize: '64px', fontWeight: 700, color: '#f8f9fa', lineHeight: 1.1, maxWidth: '900px', marginBottom: '28px', fontFamily: 'serif' }}>
            Upcoming {label} Books {year}
          </div>

          {/* Subtext */}
          <div style={{ display: 'flex', fontSize: '26px', color: '#9ca3af', maxWidth: '700px', lineHeight: 1.4, fontFamily: 'sans-serif' }}>
            New {label.toLowerCase()} releases with dates, covers, and Amazon links.
          </div>
        </div>

        {/* Site name */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ display: 'flex', color: '#6b7280', fontSize: '20px', fontFamily: 'sans-serif' }}>
            bookreleaseradar.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
