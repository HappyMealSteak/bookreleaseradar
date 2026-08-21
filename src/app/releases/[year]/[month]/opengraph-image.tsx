import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

interface Props {
  params: Promise<{ year: string; month: string }>;
}

export default async function MonthlyOGImage({ params }: Props) {
  const { year, month } = await params;
  const monthNum = parseInt(month, 10);
  const monthName = MONTH_NAMES[Math.max(0, Math.min(11, monthNum - 1))];

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0f1117',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div style={{ width: '60px', height: '4px', background: '#d97706', marginBottom: '32px', borderRadius: '2px' }} />
        <div style={{ fontSize: '22px', fontWeight: 700, color: '#d97706', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '20px', fontFamily: 'sans-serif' }}>
          New Book Releases
        </div>
        <div style={{ fontSize: '72px', fontWeight: 700, color: '#f8f9fa', lineHeight: 1.0, marginBottom: '16px', fontFamily: 'serif' }}>
          {monthName}
        </div>
        <div style={{ fontSize: '48px', fontWeight: 400, color: '#6b7280', marginBottom: '32px', fontFamily: 'serif' }}>
          {year}
        </div>
        <div style={{ fontSize: '24px', color: '#9ca3af', maxWidth: '700px', fontFamily: 'sans-serif' }}>
          Browse every book releasing this month with dates and Amazon pre-order links.
        </div>
        <div style={{ position: 'absolute', bottom: '48px', right: '80px', color: '#6b7280', fontSize: '20px', fontFamily: 'sans-serif' }}>
          bookreleaseradar.com
        </div>
      </div>
    ),
    { ...size },
  );
}
