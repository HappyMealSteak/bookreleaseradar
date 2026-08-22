import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Hr,
  Img,
} from '@react-email/components';

interface Props {
  email: string;
}

export default function WelcomeEmail({ email }: Props) {
  return (
    <Html lang="en">
      <Head />
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logo}>BookReleaseRadar</Text>
          </Section>

          <Section style={content}>
            <Text style={heading}>You're on the list.</Text>
            <Text style={paragraph}>
              Welcome to the BookReleaseRadar newsletter — your monthly roundup of the most
              anticipated upcoming book releases across fantasy, thriller, romance, sci-fi, and more.
            </Text>
            <Text style={paragraph}>
              Each month we'll send you the biggest books releasing soon, so you never miss a drop.
            </Text>
            <Link href="https://bookreleaseradar.com" style={button}>
              Browse upcoming releases →
            </Link>
          </Section>

          <Hr style={divider} />

          <Section>
            <Text style={footer}>
              You signed up with {email}.{' '}
              <Link href={`https://bookreleaseradar.com/unsubscribe?email=${encodeURIComponent(email)}`} style={footerLink}>
                Unsubscribe
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body = { backgroundColor: '#f6f6f4', fontFamily: 'Georgia, serif', margin: 0, padding: '32px 0' };
const container = { backgroundColor: '#ffffff', maxWidth: '560px', margin: '0 auto', borderRadius: '8px', overflow: 'hidden' };
const header = { backgroundColor: '#1a1a1a', padding: '24px 32px' };
const logo = { color: '#c9a84c', fontSize: '20px', fontWeight: 'bold', margin: 0, letterSpacing: '0.02em' };
const content = { padding: '32px 32px 24px' };
const heading = { fontSize: '26px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 16px', lineHeight: '1.3' };
const paragraph = { fontSize: '16px', color: '#444', lineHeight: '1.6', margin: '0 0 16px' };
const button = { display: 'inline-block', backgroundColor: '#c9a84c', color: '#1a1a1a', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', fontSize: '15px', textDecoration: 'none' };
const divider = { borderColor: '#e8e8e4', margin: '24px 0 0' };
const footer = { fontSize: '13px', color: '#999', padding: '16px 32px 24px', margin: 0 };
const footerLink = { color: '#999', textDecoration: 'underline' };
