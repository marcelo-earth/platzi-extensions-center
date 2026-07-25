export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSectionProps {
  title: string;
  items: FaqItem[];
}

function FaqSection({ title, items }: FaqSectionProps) {
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section id="faq" className="bg-white dark:bg-darkblue px-4 py-[10vh] flex justify-center">
      <div className="flex flex-col gap-y-10 w-full max-w-3xl">
        <h2 className="text-blue dark:text-white font-bold text-4xl lg:text-5xl text-center">
          {title}
        </h2>
        <div className="flex flex-col gap-y-6">
          {items.map((item) => (
            <div
              key={item.question}
              className="rounded-lg border border-slate-200 dark:border-white/10 p-5"
            >
              <h3 className="text-emerald-700 dark:text-green font-semibold text-xl">
                {item.question}
              </h3>
              <p className="text-blue dark:text-white text-lg pt-2">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
    </section>
  );
}

export default FaqSection;
