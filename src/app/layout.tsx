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
    'Track upcoming book releases by genre, author, and date. Find the next must-read before it hits shelves.',
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--text)] antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
