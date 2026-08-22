import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Popular Book Series — BookReleaseRadar';
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
          <div style={{ display: 'flex', fontSize: '18px', fontWeight: 700, color: '#c9a84c', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '24px', fontFamily: 'sans-serif' }}>
            BookReleaseRadar
          </div>

          <div style={{ display: 'flex', width: '60px', height: '4px', background: '#c9a84c', marginBottom: '32px', borderRadius: '2px' }} />

          <div style={{ display: 'flex', fontSize: '68px', fontWeight: 700, color: '#f8f9fa', lineHeight: 1.05, maxWidth: '900px', marginBottom: '28px' }}>
            Popular Book Series
          </div>

          <div style={{ display: 'flex', fontSize: '24px', color: '#9ca3af', maxWidth: '800px', lineHeight: 1.4, fontFamily: 'sans-serif' }}>
            Reading orders, new releases, and upcoming books for ACOTAR, Fourth Wing, Wheel of Time &amp; more.
          </div>
        </div>

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
