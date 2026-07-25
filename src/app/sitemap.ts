import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { SITE_URL, PAGE_PATHS } from '@/lib/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(PAGE_PATHS).flatMap((pathnames) => {
    const languages: Record<string, string> = {
      'x-default': `${SITE_URL}${pathnames[routing.defaultLocale]}`,
    };
    for (const locale of routing.locales) {
      languages[locale] = `${SITE_URL}${pathnames[locale]}`;
    }

    return routing.locales.map((locale) => ({
      url: `${SITE_URL}${pathnames[locale]}`,
      alternates: { languages },
    }));
  });
}
