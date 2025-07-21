import { useLanguage } from "../context/LanguageContext";
import {
  BriefcaseIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

export default function Services() {
  const { t } = useLanguage();

  // Преобразуем массив в нужный формат из JSON
  const services = t("services.list") as Array<{
    title: string;
    desc: string;
  }>;

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 text-center mb-8">
        <h2 className="text-primary font-heading text-2xl lg:text-3xl">
          {t('services.title')}
        </h2>
      </div>
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((srv, idx) => {
          // Делаем условный выбор иконки по индексу
          let Icon;
          if (idx === 0) Icon = BriefcaseIcon;
          else if (idx === 1) Icon = DocumentTextIcon;
          else if (idx === 2) Icon = ShieldCheckIcon;
          else Icon = HomeIcon;

          return (
            <div
              key={idx}
              className="bg-white rounded-lg shadow px-6 py-6 hover:shadow-lg transition"
            >
              <div className="w-16 h-16 mx-auto text-accentRed mb-4">
                <Icon />
              </div>
              <h3 className="text-xl lg:text-2xl font-heading text-primary mb-2">
                {srv.title}
              </h3>
              <p className="text-gray-700 text-base lg:text-lg">{srv.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
