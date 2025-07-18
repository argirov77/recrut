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
    <div id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center mb-12">
        <h2 className="text-3xl font-semibold text-gray-900">
          {t("testimonials.title")}
        </h2>
      </div>
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviews.map((r, idx) => (
          <div key={idx} className="p-6 bg-gray-50 rounded-lg shadow">
            <blockquote className="text-gray-600 italic mb-4">“{r.text}”</blockquote>
            <p className="text-gray-900 font-medium">{r.name}</p>
            <p className="text-gray-500 text-sm">{r.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
