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
  month: string; // e.g. "September 2026"
  books: Book[];
  unsubscribeEmail?: string;
}

export default function MonthlyNewsletter({ month, books, unsubscribeEmail }: Props) {
  const featured = books[0];
  const rest = books.slice(1, 7);

  return (
    <Html lang="en">
      <Head />
      <Body style={body}>
        <Container style={container}>
          {/* Header */}
          <Section style={headerStyle}>
            <Text style={logoText}>BookReleaseRadar</Text>
            <Text style={tagline}>Most Anticipated Releases · {month}</Text>
          </Section>

          <Section style={contentPad}>
            <Text style={intro}>
              Here are the biggest books hitting shelves this month — pre-order now before they sell out.
            </Text>
          </Section>

          {/* Featured book */}
          {featured && (
            <Section style={featuredBox}>
              <Text style={eyebrow}>Featured Release</Text>
              <Row>
                {featured.coverUrl && (
                  <Column style={{ width: '100px', paddingRight: '16px', verticalAlign: 'top' }}>
                    <Img
                      src={featured.coverUrl}
                      width="100"
                      alt={featured.title}
                      style={{ borderRadius: '4px', display: 'block' }}
                    />
                  </Column>
                )}
                <Column style={{ verticalAlign: 'top' }}>
                  <Text style={bookTitle}>{featured.title}</Text>
                  <Text style={bookMeta}>{featured.authors.join(', ')}</Text>
                  {featured.publishedDate && (
                    <Text style={bookDate}>
                      {new Date(featured.publishedDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </Text>
                  )}
                  {featured.description && (
                    <Text style={bookDesc}>
                      {featured.description.slice(0, 200)}…
                    </Text>
                  )}
                  <Link href={featured.amazonUrl} style={buyButton}>
                    Pre-order on Amazon →
                  </Link>
                </Column>
              </Row>
            </Section>
          )}

          <Hr style={divider} />

          {/* Rest of picks */}
          {rest.length > 0 && (
            <Section style={contentPad}>
              <Text style={sectionHeading}>More Releases This Month</Text>
              {rest.map((book) => (
                <Row key={book.id} style={bookRow}>
                  {book.coverUrl && (
                    <Column style={{ width: '64px', paddingRight: '12px', verticalAlign: 'top' }}>
                      <Img
                        src={book.coverUrl}
                        width="64"
                        alt={book.title}
                        style={{ borderRadius: '3px', display: 'block' }}
                      />
                    </Column>
                  )}
                  <Column style={{ verticalAlign: 'top' }}>
                    <Text style={smallBookTitle}>
                      <Link href={`https://bookreleaseradar.com/books/${book.slug}`} style={titleLink}>
                        {book.title}
                      </Link>
                    </Text>
                    <Text style={smallMeta}>{book.authors.join(', ')}</Text>
                    {book.publishedDate && (
                      <Text style={smallDate}>
                        {new Date(book.publishedDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </Text>
                    )}
                  </Column>
                </Row>
              ))}
            </Section>
          )}

          <Hr style={divider} />

          {/* CTA */}
          <Section style={{ ...contentPad, textAlign: 'center' as const }}>
            <Text style={ctaText}>See all upcoming releases by genre</Text>
            <Link href="https://bookreleaseradar.com" style={ctaButton}>
              Browse BookReleaseRadar →
            </Link>
          </Section>

          <Hr style={divider} />

          <Section>
            <Text style={footerText}>
              You're receiving this because you subscribed at bookreleaseradar.com.{' '}
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

const body = { backgroundColor: '#f6f6f4', fontFamily: 'Georgia, serif', margin: 0, padding: '32px 0' };
const container = { backgroundColor: '#ffffff', maxWidth: '600px', margin: '0 auto', borderRadius: '8px', overflow: 'hidden' };
const headerStyle = { backgroundColor: '#1a1a1a', padding: '28px 32px' };
const logoText = { color: '#c9a84c', fontSize: '22px', fontWeight: 'bold', margin: '0 0 4px', letterSpacing: '0.02em' };
const tagline = { color: '#888', fontSize: '13px', margin: 0, letterSpacing: '0.05em', textTransform: 'uppercase' as const };
const contentPad = { padding: '24px 32px' };
const intro = { fontSize: '16px', color: '#444', lineHeight: '1.6', margin: 0 };
const featuredBox = { padding: '20px 32px 24px', backgroundColor: '#fafaf8' };
const eyebrow = { fontSize: '11px', fontWeight: 'bold', color: '#c9a84c', textTransform: 'uppercase' as const, letterSpacing: '0.1em', margin: '0 0 12px' };
const bookTitle = { fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 4px', lineHeight: '1.3' };
const bookMeta = { fontSize: '14px', color: '#666', margin: '0 0 4px' };
const bookDate = { fontSize: '13px', color: '#c9a84c', fontWeight: 'bold', margin: '0 0 10px' };
const bookDesc = { fontSize: '14px', color: '#555', lineHeight: '1.5', margin: '0 0 14px' };
const buyButton = { display: 'inline-block', backgroundColor: '#c9a84c', color: '#1a1a1a', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold', fontSize: '14px', textDecoration: 'none' };
const divider = { borderColor: '#e8e8e4', margin: '0' };
const sectionHeading = { fontSize: '16px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 16px', textTransform: 'uppercase' as const, letterSpacing: '0.05em' };
const bookRow = { marginBottom: '16px' };
const smallBookTitle = { fontSize: '15px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 2px' };
const titleLink = { color: '#1a1a1a', textDecoration: 'none' };
const smallMeta = { fontSize: '13px', color: '#666', margin: '0 0 2px' };
const smallDate = { fontSize: '12px', color: '#c9a84c', fontWeight: 'bold', margin: 0 };
const ctaText = { fontSize: '15px', color: '#444', margin: '0 0 14px' };
const ctaButton = { display: 'inline-block', border: '2px solid #1a1a1a', color: '#1a1a1a', padding: '10px 24px', borderRadius: '5px', fontWeight: 'bold', fontSize: '14px', textDecoration: 'none' };
const footerText = { fontSize: '12px', color: '#aaa', padding: '16px 32px 24px', margin: 0 };
const footerLink = { color: '#aaa', textDecoration: 'underline' };
