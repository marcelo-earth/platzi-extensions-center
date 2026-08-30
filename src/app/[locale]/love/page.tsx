import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, type AppLocale } from '@/i18n/routing';
import { buildMetadata, PAGE_PATHS } from '@/lib/metadata';
import Footer from '@/components/Footer';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.love' });

  return buildMetadata({
    locale: locale as AppLocale,
    pathnames: PAGE_PATHS.love,
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
  });
}

export default async function LovePage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Love' });

  return (
    <main>
      <div className="min-h-screen w-full bg-gradient-to-t from-white to-slate-100 dark:from-black dark:to-darkblue flex flex-col justify-center gap-y-16 text-center">
        <div className="flex flex-col gap-y-4">
          <h1 className="text-4xl text-blue dark:text-white text-center font-bold">
            {t('tweet.heading')}
          </h1>
          <p className="text-blue dark:text-white text-xl">{t('tweet.subtext')}</p>
          <div>
            <a
              href="https://twitter.com/intent/tweet?text=Me encanta esta extensión&url=https://platzi-extensions.vercel.app&hashtags=platzi,chrome"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-skyblue active:ring text-darkblue font-bold py-2 px-6 rounded-lg text-xl"
            >
              {t('tweet.button')}
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <h2 className="text-4xl text-blue dark:text-white text-center font-bold">
            {t('feedback.heading')}
          </h2>
          <p className="text-blue dark:text-white text-xl">{t('feedback.subtext')}</p>
          <div>
            <a
              href="https://tally.so/r/waOBvb"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue active:ring text-skyblue font-bold py-2 px-6 rounded-lg text-xl"
            >
              {t('feedback.button')}
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <h2 className="text-4xl text-blue dark:text-white text-center font-bold">
            {t('report.heading')}
          </h2>
          <p className="text-blue dark:text-white text-xl">{t('report.subtext')}</p>
          <div>
            <a
              href="https://tally.so/r/w7XdER"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue active:ring text-skyblue font-bold py-2 px-6 rounded-lg text-xl"
            >
              {t('report.button')}
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
