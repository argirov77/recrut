// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import bg from "./i18n/bg.json";
import ru from "./i18n/ru.json";
import en from "./i18n/en.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      bg: { translation: bg },
      ru: { translation: ru },
      en: { translation: en },
    },
    lng: "bg",             // по умолчанию – болгарский
    fallbackLng: "bg",     // если перевода нет, остаёмся на BG
    interpolation: {
      escapeValue: false,  // React сам экранирует
    },
  });

export default i18n;
