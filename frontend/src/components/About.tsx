
import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <div id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="font-heading text-3xl md:text-4xl text-primary text-center mb-8">
          {t("about.title")}
        </h2>
        <p className="font-sans text-base text-primary leading-relaxed">
          {t("about.text")}
        </p>
      </div>
    </div>
  );
}
