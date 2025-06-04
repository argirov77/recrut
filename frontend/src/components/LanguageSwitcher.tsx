import { useLanguage, LangCode } from "../context/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage();

  // Список доступных языков
  const languages: LangCode[] = ["en", "ru", "bg"];

  return (
    <div className="flex items-center space-x-4">
      <span className="text-gray-700 font-medium">{t("languageSwitcher.label")}:</span>
      {languages.map((code) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className={`
            px-2 py-1 rounded-md transition
            ${lang === code
              ? "bg-gray-900 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
          `}
        >
          {t(`languageSwitcher.${code}`)}
        </button>
      ))}
    </div>
  );
}
