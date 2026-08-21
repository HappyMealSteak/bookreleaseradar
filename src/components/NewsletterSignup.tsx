'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error' | 'duplicate'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.status === 409) { setState('duplicate'); return; }
      if (!res.ok) { setState('error'); return; }
      setState('success');
      setEmail('');
    } catch {
      setState('error');
    }
  }

  return (
    <section className="bg-[var(--surface-raised)] border-y border-[var(--border)] py-14">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-xs font-bold tracking-widest uppercase text-[var(--gold)] mb-3">
          Monthly Newsletter
        </p>
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl text-[var(--text)] mb-3">
          Never miss a big release
        </h2>
        <p className="text-[var(--text-muted)] mb-8 text-base leading-relaxed">
          Get the most anticipated upcoming books delivered to your inbox once a month — no spam, no filler.
        </p>

        {state === 'success' ? (
          <p className="text-[var(--gold)] font-semibold text-lg">
            You're on the list. See you next month.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={state === 'loading'}
              className="flex-1 px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--gold)] transition-colors text-sm"
            />
            <button
              type="submit"
              disabled={state === 'loading'}
              className="px-6 py-3 rounded-lg bg-[var(--gold)] text-[var(--surface)] font-semibold text-sm hover:opacity-90 disabled:opacity-60 transition-opacity whitespace-nowrap"
            >
              {state === 'loading' ? 'Subscribing…' : 'Subscribe'}
            </button>
          </form>
        )}

        {state === 'duplicate' && (
          <p className="mt-3 text-sm text-[var(--text-muted)]">That email is already subscribed.</p>
        )}
        {state === 'error' && (
          <p className="mt-3 text-sm text-red-500">Something went wrong — please try again.</p>
        )}
        <p className="mt-4 text-xs text-[var(--text-muted)]">Monthly only. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
