import type { Metadata } from 'next';
import { routing, type AppLocale } from '@/i18n/routing';

export const SITE_URL = 'https://platzi-extensions.vercel.app';
export const SITE_NAME = 'Platzi Extension';
export const TWITTER_HANDLE = '@marcelo_earth';

/** Absolute path per locale for every page on the site. Single source of truth for
 * canonical/hreflang metadata and the generated sitemap. */
export const PAGE_PATHS = {
  home: { es: '/', en: '/en/' },
  love: { es: '/love/', en: '/en/love/' },
  privacy: { es: '/privacy/', en: '/en/privacy/' },
} satisfies Record<string, Record<AppLocale, string>>;

const OG_LOCALE: Record<AppLocale, string> = {
  es: 'es_ES',
  en: 'en_US',
};

type BuildMetadataArgs = {
  locale: AppLocale;
  /** Absolute path (leading slash, e.g. '/', '/en/', '/love/') per locale. */
  pathnames: Record<AppLocale, string>;
  title: string;
  description: string;
  keywords: string;
  type?: 'website' | 'article';
};

export function buildMetadata({
  locale,
  pathnames,
  title,
  description,
  keywords,
  type = 'website',
}: BuildMetadataArgs): Metadata {
  const canonical = `${SITE_URL}${pathnames[locale]}`;

  const languages: Record<string, string> = {
    'x-default': `${SITE_URL}${pathnames[routing.defaultLocale]}`,
  };
  for (const loc of routing.locales) {
    languages[loc] = `${SITE_URL}${pathnames[loc]}`;
  }

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type,
      url: canonical,
      title,
      description,
      siteName: SITE_NAME,
      images: [{ url: `${SITE_URL}/cover.webp`, alt: `${title} - Preview Image` }],
      locale: OG_LOCALE[locale],
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title,
      description,
      images: [`${SITE_URL}/cover.webp`],
    },
  };
}
