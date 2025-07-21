import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-50 text-primary text-sm py-4">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p>{t('footer.rights')}</p>
        <div className="space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:underline">
            {t('footer.privacy')}
          </a>
          <a href="#" className="hover:underline">
            {t('footer.contacts')}
          </a>
        </div>
      </div>
    </footer>
  );
}
