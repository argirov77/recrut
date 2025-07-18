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
    <div id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center mb-12">
        <h2 className="text-3xl font-semibold text-gray-900">
          {t("services.title")}
        </h2>
      </div>
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="w-16 h-16 mx-auto text-red-600 mb-4">
                <Icon />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                {srv.title}
              </h3>
              <p className="text-gray-600">{srv.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
