import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">{t("footer.rights")}</p>
        <div className="space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-sm hover:underline">
            {t("footer.privacy")}
          </a>
          <a href="#" className="text-sm hover:underline">
            {t("footer.contacts")}
          </a>
        </div>
      </div>
    </footer>
  );
}
