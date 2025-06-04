// frontend/src/context/LanguageContext.tsx
import { createContext, ReactNode, useContext, useState } from "react";
import en from "../i18n/en.json";
import ru from "../i18n/ru.json";
import bg from "../i18n/bg.json";

// Типы языковых кодов
export type LangCode = "en" | "ru" | "bg";

// Объединённый тип всех возможных словарей (JSON-файлов)
type Dictionary = typeof en | typeof ru | typeof bg;

// Интерфейс контекста
interface LanguageContextProps {
  lang: LangCode;
  setLang: (c: LangCode) => void;
  t: (key: string) => any;    // <-- изменили на `any`
}

// Создаём контекст
const LanguageContext = createContext<LanguageContextProps>({
  lang: "en",
  setLang: () => {},
  t: (key: string) => key,   // здесь можем возвращать key, но TS теперь видит, что t возвращает any
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<LangCode>("en");

  // Выбираем словарь
  const dictionary: Dictionary =
    lang === "en" ? en : lang === "ru" ? ru : bg;

  // t(key) возвращает значение из JSON, приводим к any
  const t = (key: string): any => {
    const keys = key.split(".");
    let result: any = dictionary;
    for (const k of keys) {
      if (!result || typeof result !== "object" || !(k in result)) {
        return key;
      }
      result = result[k as keyof typeof result];
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
