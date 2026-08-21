import Link from 'next/link';

export const metadata = { title: 'Unsubscribe', robots: 'noindex' };

export default function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ done?: string; email?: string }>;
}) {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <p className="font-[family-name:var(--font-playfair)] text-3xl text-[var(--text)] mb-4">
        Unsubscribed
      </p>
      <p className="text-[var(--text-muted)] mb-8">
        You've been removed from the BookReleaseRadar newsletter. You won't receive any more emails.
      </p>
      <Link href="/" className="text-[var(--accent)] hover:underline text-sm">
        ← Back to BookReleaseRadar
      </Link>
    </div>
  );
}
