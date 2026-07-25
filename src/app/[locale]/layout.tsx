import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { IBM_Plex_Sans } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { SITE_URL, SITE_NAME } from '@/lib/metadata';
import '../globals.css';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: 'variable',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  authors: [{ name: 'Marcelo Arias', url: 'https://github.com/marcelo-earth' }],
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  other: {
    'msapplication-TileColor': '#0F172A',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0F172A' },
  ],
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'SoftwareApplication' });

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    alternateName: 'Platzi Browser Extension',
    description: t('description'),
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web Browser',
    softwareVersion: '3.0',
    downloadUrl: [
      'https://chrome.google.com/webstore/detail/platkey/bdjedpeffgjikndcihipemgdinpcmpcf',
      'https://apps.apple.com/app/platkey/id1659587636',
    ],
    author: {
      '@type': 'Person',
      name: 'Marcelo Arias',
      url: 'https://github.com/marcelo-earth',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    screenshot: [`${SITE_URL}/interface.webp`, `${SITE_URL}/save.webp`, `${SITE_URL}/ssh.webp`],
    featureList: t.raw('featureList'),
    browserRequirements: ['Chrome', 'Safari', 'Edge', 'Brave'],
  };

  return (
    <html lang={locale} className={ibmPlexSans.className}>
      <body className="bg-white text-blue dark:bg-black dark:text-white [color-scheme:light_dark] font-sans">
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
