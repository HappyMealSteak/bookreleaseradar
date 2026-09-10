import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Row,
  Column,
  Text,
  Link,
  Hr,
  Img,
} from '@react-email/components';
import type { Book } from '@/lib/types';

interface Props {
  dateRange: string; // e.g. "Sept 8 – Sept 14"
  books: Book[];
  unsubscribeEmail?: string;
}

export default function WeeklyDigest({ dateRange, books, unsubscribeEmail }: Props) {
  const featured = books[0];
  const rest = books.slice(1);

  return (
    <Html lang="en">
      <Head />
      <Body style={body}>
        <Container style={container}>
          {/* Header */}
          <Section style={headerStyle}>
            <Text style={logoText}>BookReleaseRadar</Text>
            <Text style={tagline}>Out This Week · {dateRange}</Text>
          </Section>

          <Section style={contentPad}>
            <Text style={intro}>
              {books.length} {books.length === 1 ? 'book hits' : 'books hit'} shelves this week. Tap a cover to grab one before the library line forms.
            </Text>
          </Section>

          {/* Featured book — biggest tap target, single column for mobile */}
          {featured && (
            <Section style={featuredBox}>
              <Text style={eyebrow}>This Week's Top Pick</Text>
              <Link href={featured.amazonUrl} style={coverLink}>
                {featured.coverUrl && (
                  <Img
                    src={featured.coverUrl}
                    width="140"
                    alt={featured.title}
                    style={{ borderRadius: '4px', display: 'block', margin: '0 auto 14px' }}
                  />
                )}
              </Link>
              <Text style={bookTitleCenter}>{featured.title}</Text>
              <Text style={bookMetaCenter}>{featured.authors.join(', ')}</Text>
              {featured.description && (
                <Text style={bookDescCenter}>
                  {featured.description.slice(0, 160)}…
                </Text>
              )}
              <Link href={featured.amazonUrl} style={buyButton}>
                Get It on Amazon →
              </Link>
            </Section>
          )}

          <Hr style={divider} />

          {/* Rest of the week's releases — stacked rows, big tap targets */}
          {rest.length > 0 && (
            <Section style={contentPad}>
              <Text style={sectionHeading}>Also Out This Week</Text>
              {rest.map((book) => (
                <Link key={book.id} href={book.amazonUrl} style={rowLink}>
                  <Row style={bookRow}>
                    {book.coverUrl && (
                      <Column style={{ width: '64px', paddingRight: '14px', verticalAlign: 'top' }}>
                        <Img
                          src={book.coverUrl}
                          width="64"
                          alt={book.title}
                          style={{ borderRadius: '3px', display: 'block' }}
                        />
                      </Column>
                    )}
                    <Column style={{ verticalAlign: 'top' }}>
                      <Text style={smallBookTitle}>{book.title}</Text>
                      <Text style={smallMeta}>{book.authors.join(', ')}</Text>
                      {book.publishedDate && (
                        <Text style={smallDate}>
                          {new Date(book.publishedDate).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </Text>
                      )}
                    </Column>
                  </Row>
                </Link>
              ))}
            </Section>
          )}

          <Hr style={divider} />

          {/* CTA */}
          <Section style={{ ...contentPad, textAlign: 'center' as const }}>
            <Text style={ctaText}>Want the full picture, not just this week?</Text>
            <Link href="https://bookreleaseradar.com/new-releases" style={ctaButton}>
              See All Upcoming Releases →
            </Link>
          </Section>

          <Hr style={divider} />

          <Section>
            <Text style={footerText}>
              You're getting this because you subscribed for release alerts at bookreleaseradar.com.{' '}
              {unsubscribeEmail && (
                <Link
                  href={`https://bookreleaseradar.com/unsubscribe?email=${encodeURIComponent(unsubscribeEmail)}`}
                  style={footerLink}
                >
                  Unsubscribe
                </Link>
              )}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body = { backgroundColor: '#f6f6f4', fontFamily: 'Georgia, serif', margin: 0, padding: '24px 0' };
const container = { backgroundColor: '#ffffff', maxWidth: '480px', margin: '0 auto', borderRadius: '8px', overflow: 'hidden' };
const headerStyle = { backgroundColor: '#1a1a1a', padding: '24px 24px' };
const logoText = { color: '#c9a84c', fontSize: '20px', fontWeight: 'bold', margin: '0 0 4px', letterSpacing: '0.02em' };
const tagline = { color: '#888', fontSize: '12px', margin: 0, letterSpacing: '0.05em', textTransform: 'uppercase' as const };
const contentPad = { padding: '20px 24px' };
const intro = { fontSize: '15px', color: '#444', lineHeight: '1.6', margin: 0 };
const featuredBox = { padding: '4px 24px 24px', backgroundColor: '#fafaf8', textAlign: 'center' as const };
const eyebrow = { fontSize: '11px', fontWeight: 'bold', color: '#c9a84c', textTransform: 'uppercase' as const, letterSpacing: '0.1em', margin: '16px 0 14px' };
const coverLink = { display: 'block' };
const bookTitleCenter = { fontSize: '19px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 4px', lineHeight: '1.3' };
const bookMetaCenter = { fontSize: '14px', color: '#666', margin: '0 0 10px' };
const bookDescCenter = { fontSize: '14px', color: '#555', lineHeight: '1.5', margin: '0 0 16px' };
const buyButton = { display: 'inline-block', backgroundColor: '#c9a84c', color: '#1a1a1a', padding: '13px 28px', borderRadius: '6px', fontWeight: 'bold', fontSize: '15px', textDecoration: 'none' };
const divider = { borderColor: '#e8e8e4', margin: '0' };
const sectionHeading = { fontSize: '14px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 16px', textTransform: 'uppercase' as const, letterSpacing: '0.05em' };
const rowLink = { textDecoration: 'none', display: 'block' };
const bookRow = { marginBottom: '18px' };
const smallBookTitle = { fontSize: '15px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 2px' };
const smallMeta = { fontSize: '13px', color: '#666', margin: '0 0 2px' };
const smallDate = { fontSize: '12px', color: '#c9a84c', fontWeight: 'bold', margin: 0 };
const ctaText = { fontSize: '15px', color: '#444', margin: '0 0 14px' };
const ctaButton = { display: 'inline-block', border: '2px solid #1a1a1a', color: '#1a1a1a', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', fontSize: '14px', textDecoration: 'none' };
const footerText = { fontSize: '12px', color: '#aaa', padding: '16px 24px 24px', margin: 0 };
const footerLink = { color: '#aaa', textDecoration: 'underline' };
