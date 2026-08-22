import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Most Anticipated Books — BookReleaseRadar';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
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
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: '18px', fontWeight: 700, color: '#c9a84c', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '24px', fontFamily: 'sans-serif' }}>
            BookReleaseRadar
          </div>

          <div style={{ display: 'flex', width: '60px', height: '4px', background: '#c9a84c', marginBottom: '32px', borderRadius: '2px' }} />

          <div style={{ display: 'flex', fontSize: '64px', fontWeight: 700, color: '#f8f9fa', lineHeight: 1.1, maxWidth: '900px', marginBottom: '28px' }}>
            Most Anticipated Books {year}
          </div>

          <div style={{ display: 'flex', fontSize: '24px', color: '#9ca3af', maxWidth: '750px', lineHeight: 1.4, fontFamily: 'sans-serif' }}>
            The biggest upcoming releases fans can't wait to read — with pre-order links and release dates.
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
