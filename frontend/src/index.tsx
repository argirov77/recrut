// frontend/src/index.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";       // Подключаем CSS с @tailwind
import "./i18n/en.json";    // Подключаем локализацию (если используете напрямую)
import { LanguageProvider } from "./context/LanguageContext";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Корневой контейнер с id 'root' не найден");
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
