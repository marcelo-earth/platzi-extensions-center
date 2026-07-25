import { getLocale, getTranslations } from 'next-intl/server';

const Footer = async () => {
  const locale = await getLocale();
  const t = await getTranslations('Footer');
  const prefix = locale === 'en' ? '/en' : '';

  return (
    <footer className="bg-white dark:bg-black p-4">
      <div className="flex flex-row flex-wrap justify-center gap-x-[2rem] gap-y-[2rem]">
        <a
          className="text-emerald-700 dark:text-green hover:underline"
          href="https://github.com/marcelo-earth/platkey"
        >
          {t('githubrepository')}
        </a>
        <a
          className="text-emerald-700 dark:text-green hover:underline"
          href="https://github.com/marcelo-earth/platkey/issues"
        >
          {t('issues')}
        </a>
        <a
          className="text-emerald-700 dark:text-green hover:underline"
          href="https://github.com/marcelo-earth/platkey#-contributing"
        >
          {t('contributions')}
        </a>
        <a className="text-emerald-700 dark:text-green hover:underline" href={`${prefix}/#faq`}>
          {t('faq')}
        </a>
        <a
          className="text-emerald-700 dark:text-green hover:underline"
          href={`${prefix}/love/`}
        >
          {t('love')}
        </a>
        <a
          className="text-emerald-700 dark:text-green hover:underline"
          href={`${prefix}/privacy/`}
        >
          {t('privacy')}
        </a>
      </div>
      <div className="flex flex-row p-4 justify-center">
        <p className="text-blue dark:text-white text-center max-w-[42rem]">
          {t('disclaimer')}
        </p>
      </div>
      <div className="flex flex-row justify-center">
        <p className="text-emerald-700 dark:text-green text-sm text-center">{t('copyright')}</p>
      </div>
    </footer>
  );
};

export default Footer;
