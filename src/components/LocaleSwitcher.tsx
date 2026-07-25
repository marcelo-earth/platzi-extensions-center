'use client';

import classnames from 'classnames';
import { useLocale, useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import { usePathname, useRouter } from '@/i18n/navigation';

const LOCALE_LABELS: Record<string, string> = {
  es: 'ES',
  en: 'EN',
};

function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const activeLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      aria-label={t('label')}
      className="fixed top-4 right-4 z-40 flex items-center gap-x-1 rounded-full border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-black/60 backdrop-blur px-3 py-1.5 text-sm font-semibold"
    >
      {routing.locales.map((locale, index) => (
        <span key={locale} className="flex items-center">
          {index > 0 && <span className="text-slate-300 dark:text-white/20 px-1">/</span>}
          <button
            type="button"
            aria-current={locale === activeLocale ? 'true' : undefined}
            disabled={locale === activeLocale}
            onClick={() => router.replace(pathname, { locale })}
            className={classnames('transition', {
              'text-emerald-700 dark:text-green cursor-default': locale === activeLocale,
              'text-blue dark:text-white hover:text-emerald-700 dark:hover:text-green cursor-pointer':
                locale !== activeLocale,
            })}
          >
            {LOCALE_LABELS[locale] ?? locale.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}

export default LocaleSwitcher;
