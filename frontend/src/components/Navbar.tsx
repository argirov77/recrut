import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { t } = useLanguage();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Левый блок: логотип / название сайта */}
        <a href="#" className="text-xl font-bold text-gray-900">
          {t("siteTitle")}
        </a>

        {/* Правый блок: пункты меню + переключатель языков */}
        <div className="flex items-center space-x-6">
          <ul className="flex space-x-6 text-gray-700">
            <li>
              <a href="#hero" className="hover:text-gray-900 transition">
                {t("nav.home")}
              </a>
            </li>
            <li>
              <a href="#jobs" className="hover:text-gray-900 transition">
                {t("nav.jobs")}
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-gray-900 transition">
                {t("nav.contact")}
              </a>
            </li>
          </ul>

          {/* Переключатель языков */}
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
