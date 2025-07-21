
import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-center text-primary font-heading text-2xl lg:text-3xl mb-8">
          {t('about.title')}
        </h2>
        <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
          {t('about.text')}
        </p>
      </div>
    </section>
  );
}
