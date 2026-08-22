import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'BookReleaseRadar — Upcoming Book Releases';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
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
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Accent bar */}
          <div style={{ display: 'flex', width: '60px', height: '4px', background: '#d97706', marginBottom: '32px', borderRadius: '2px' }} />

          {/* Site name */}
          <div style={{ display: 'flex', fontSize: '22px', fontWeight: 700, color: '#d97706', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '20px', fontFamily: 'sans-serif' }}>
            BookReleaseRadar
          </div>

          {/* Headline */}
          <div style={{ display: 'flex', fontSize: '64px', fontWeight: 700, color: '#f8f9fa', lineHeight: 1.1, maxWidth: '800px', marginBottom: '28px' }}>
            Upcoming Book Releases
          </div>

          {/* Subtext */}
          <div style={{ display: 'flex', fontSize: '26px', color: '#9ca3af', maxWidth: '700px', lineHeight: 1.4 }}>
            Track new thriller, mystery, fantasy, romance &amp; more — before they hit shelves.
          </div>

          {/* Genre pills */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '48px', flexWrap: 'wrap' }}>
            {['Thriller', 'Mystery', 'Fantasy', 'Romance', 'Sci-Fi'].map((g) => (
              <div key={g} style={{ display: 'flex', background: '#1f2937', color: '#d1d5db', padding: '8px 18px', borderRadius: '20px', fontSize: '18px', fontFamily: 'sans-serif', border: '1px solid #374151' }}>
                {g}
              </div>
            ))}
          </div>
        </div>

        {/* URL */}
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
