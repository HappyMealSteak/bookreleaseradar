import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure & Privacy Policy',
  description: 'BookReleaseRadar affiliate disclosure, privacy policy, and terms of use.',
  robots: { index: false },
};

export default function DisclosurePage() {
  const year = new Date().getFullYear();
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold mb-8 text-[var(--text)]">
        Affiliate Disclosure &amp; Privacy Policy
      </h1>

      <section className="mb-10">
        <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold mb-3 text-[var(--text)]">
          Affiliate Disclosure
        </h2>
        <div className="text-[var(--text-muted)] space-y-3 text-sm leading-relaxed">
          <p>
            BookReleaseRadar is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program
            designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
          </p>
          <p>
            When you click an Amazon link on this site and make a purchase, we may earn a small commission at no additional cost
            to you. This helps us maintain the site and continue tracking upcoming book releases.
          </p>
          <p>
            All book data, release dates, and descriptions are sourced from the Google Books API. We do not receive payment
            from publishers or authors to feature books on this site. Books are selected and ranked algorithmically.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold mb-3 text-[var(--text)]">
          Privacy Policy
        </h2>
        <div className="text-[var(--text-muted)] space-y-3 text-sm leading-relaxed">
          <p>
            BookReleaseRadar does not collect personal information from visitors. We do not use cookies for tracking purposes.
          </p>
          <p>
            <strong className="text-[var(--text)]">Analytics:</strong> We may use aggregate, anonymous analytics to understand
            which pages are popular and improve the site. No personally identifiable information is collected.
          </p>
          <p>
            <strong className="text-[var(--text)]">Third-party services:</strong> Amazon and Google may set their own cookies
            when you click links to their sites. Please refer to their privacy policies for details.
          </p>
          <p>
            <strong className="text-[var(--text)]">Advertising:</strong> This site may display advertising via Google AdSense.
            Google uses cookies to serve ads based on your prior visits to this and other websites. You can opt out of
            personalized advertising at <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">Google Ad Settings</a>.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold mb-3 text-[var(--text)]">
          Copyright &amp; Content
        </h2>
        <div className="text-[var(--text-muted)] space-y-3 text-sm leading-relaxed">
          <p>
            Book covers, descriptions, and metadata displayed on this site are provided by the Google Books API and remain
            the property of their respective publishers and copyright holders.
          </p>
          <p>
            BookReleaseRadar&apos;s original content (site design, copy, and code) is &copy; {year} BookReleaseRadar.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold mb-3 text-[var(--text)]">
          Contact
        </h2>
        <p className="text-[var(--text-muted)] text-sm">
          Questions about this disclosure? Contact us at{' '}
          <a href="mailto:hello@bookreleaseradar.com" className="text-[var(--accent)] hover:underline">
            hello@bookreleaseradar.com
          </a>
        </p>
      </section>
    </div>
  );
}
