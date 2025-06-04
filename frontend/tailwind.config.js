// frontend/tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Пути, где Tailwind будет искать классы внутри ваших файлов
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      // Ни одного кастомного цвета здесь пока не будет.
      // Всё, что нам нужно — базовые цвета от Tailwind (gray, red, blue и т.д.)
    },
  },
  plugins: [
    // Если ранее ставили плагины, можете оставить их, но
    // если вам пока не нужны формы/line-clamp, можно убрать или оставить:
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
  ],
};
