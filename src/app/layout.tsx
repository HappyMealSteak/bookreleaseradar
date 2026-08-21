import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'BookReleaseRadar — Upcoming Book Releases',
    template: '%s | BookReleaseRadar',
  },
  description:
    'Track upcoming book releases 2025–2027 by genre, author, and date. Thriller, mystery, fantasy, romance, sci-fi — find your next read before it hits shelves.',
  keywords: [
    'upcoming book releases',
    'new book releases 2026',
    'new book releases 2027',
    'books releasing soon',
    'upcoming thriller novels',
    'upcoming fantasy books',
    'upcoming romance novels',
    'new mystery books',
    'upcoming sci-fi books',
    'book release dates',
    'pre-order books',
    'ACOTAR new book',
    'Fourth Wing new book',
    'Winds of Winter release date',
    'Doors of Stone release date',
    'Bridgerton books in order',
    'Sarah J Maas new book',
    'Rebecca Yarros new book',
    'Colleen Hoover new book',
    'Brandon Sanderson new book',
    'Jennifer L Armentrout new book',
    'From Blood and Ash series',
    'Inheritance Games new book',
    'Sunrise on the Reaping release date',
    'Hunger Games new book 2026',
    'Wheel of Time reading order',
    'R.F. Kuang new book',
    'Stephen King Dark Tower',
  ],
  metadataBase: new URL('https://bookreleaseradar.com'),
  openGraph: {
    siteName: 'BookReleaseRadar',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
  verification: {
    google: '0beSyglhpQGifSqVe0b_FVeMGDkoSyPZmnCZ7BQVpY0',
  },
  alternates: {
    types: {
      'application/rss+xml': 'https://bookreleaseradar.com/feed.xml',
    },
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const ADSENSE_ID = 'ca-pub-5947043421820182';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full`}>
      <head>
        {GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{page_path:window.location.pathname});`,
              }}
            />
          </>
        )}
        <meta name="google-adsense-account" content={ADSENSE_ID} />
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--text)] antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
