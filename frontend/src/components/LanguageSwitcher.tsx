import { useState, useRef, useEffect } from 'react';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { useLanguage, LangCode } from '../context/LanguageContext';

/* метки кнопок */
const LABEL: Record<LangCode, string> = { en: 'EN', ru: 'RU', bg: 'BG' };
const LANGS: LangCode[] = ['en', 'ru', 'bg'];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* клик вне закрывает */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center justify-center p-2 rounded-md text-primary
                   hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-accentGreen"
        aria-label="Select language"
      >
        <GlobeAltIcon className="h-6 w-6" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-200 rounded-md shadow-lg">
          {LANGS.map((code) => (
            <button
              key={code}
              onClick={() => {
                setLang(code);
                setOpen(false);
              }}
              className={`w-full px-4 py-1 text-sm text-left transition-colors ${
                lang === code
                  ? 'bg-accentGreen text-white'
                  : 'text-primary hover:bg-gray-100'
              }`}
            >
              {LABEL[code]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
