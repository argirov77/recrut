// frontend/src/context/LanguageContext.tsx
import { createContext, ReactNode, useContext, useState } from "react";
import en from "../i18n/en.json";
import ru from "../i18n/ru.json";
import bg from "../i18n/bg.json";

// Типы языковых кодов
export type LangCode = "en" | "ru" | "bg";

// все поддерживаемые языки
const supported: LangCode[] = ["en", "ru", "bg"];

// функция для выбора первоначального языка
function detectBrowserLang(): LangCode {
  if (typeof navigator === "undefined") return "en";
  const code = navigator.language.split("-")[0] as LangCode;
  return supported.includes(code) ? code : "en";
}

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
  const saved =
    (typeof localStorage !== "undefined" &&
      (localStorage.getItem("lang") as LangCode | null)) || null;
  const initial = saved ?? detectBrowserLang();
  const [lang, setLang] = useState<LangCode>(initial);

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

  const changeLang = (c: LangCode) => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("lang", c);
    }
    setLang(c);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
