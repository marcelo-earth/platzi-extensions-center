import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, type AppLocale } from '@/i18n/routing';
import { buildMetadata, PAGE_PATHS } from '@/lib/metadata';
import HeroSection from '@/components/home/HeroSection';
import LandingSection from '@/components/home/LandingSection';
import FaqSection from '@/components/home/FaqSection';
import Footer from '@/components/Footer';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.home' });

  return buildMetadata({
    locale: locale as AppLocale,
    pathnames: PAGE_PATHS.home,
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Faq' });
  const items = t.raw('items') as Array<{ question: string; answer: string }>;

  return (
    <main>
      <HeroSection />
      <LandingSection />
      <FaqSection title={t('title')} items={items} />
      <Footer />
    </main>
  );
}
