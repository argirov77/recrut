import { useLanguage } from "../context/LanguageContext";

export default function Testimonials() {
  const { t } = useLanguage();

  // Берём массив из JSON (для TypeScript приводим к нужному типу)
  const reviews = t("testimonials.items") as Array<{
    name: string;
    role: string;
    text: string;
  }>;

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 text-center mb-8">
        <h2 className="text-primary font-heading text-2xl lg:text-3xl">
          {t('testimonials.title')}
        </h2>
      </div>
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviews.map((r, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow px-6 py-6">
            <blockquote className="text-gray-700 italic mb-4">“{r.text}”</blockquote>
            <p className="text-primary font-heading">{r.name}</p>
            <p className="text-gray-700 text-sm">{r.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
