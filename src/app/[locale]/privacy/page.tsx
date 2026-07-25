import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, type AppLocale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/metadata';
import Footer from '@/components/Footer';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.privacy' });

  return buildMetadata({
    locale: locale as AppLocale,
    pathnames: { es: '/privacy/', en: '/en/privacy/' },
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    type: 'article',
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Privacy' });
  const serviceProvidersList = t.raw('serviceProviders.list') as string[];

  return (
    <main>
      <div className="bg-white dark:bg-darkblue flex justify-center py-4 min-h-screen">
        <div className="bg-slate-50 dark:bg-blue text-blue dark:text-white w-full lg:w-[42rem] rounded-3xl p-6">
          <h1 className="text-[2.5rem] font-extrabold text-emerald-700 dark:text-skyblue">
            {t('heading')}
          </h1>
          <p>{t('intro1')}</p>
          <p>{t('intro2')}</p>
          <p>{t('intro3')}</p>
          <h2 className="text-[2rem] font-bold leading-[4rem]">{t('collection.heading')}</h2>
          <p>{t('collection.body')}</p>
          <h2 className="text-[2rem] font-bold leading-[4rem]">{t('cookies.heading')}</h2>
          <p>{t('cookies.body')}</p>
          <h2 className="text-[2rem] font-bold leading-[4rem]">
            {t('serviceProviders.heading')}
          </h2>
          <p>{t('serviceProviders.intro')}</p>
          <ul className="list-disc pl-6 py-2">
            {serviceProvidersList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{t('serviceProviders.outro')}</p>
          <h2 className="text-[2rem] font-bold leading-[4rem]">{t('security.heading')}</h2>
          <p>{t('security.body')}</p>
          <h2 className="text-[2rem] font-bold leading-[4rem]">{t('links.heading')}</h2>
          <p>{t('links.body')}</p>
          <h2 className="text-[2rem] font-bold leading-[4rem]">{t('changes.heading')}</h2>
          <p>{t('changes.body')}</p>
          <p>{t('effectiveDate')}</p>
          <h2 className="text-[2rem] font-bold leading-[4rem]">{t('contact.heading')}</h2>
          <p>{t('contact.body')}</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
