// frontend/src/components/Hero.tsx

import { useLanguage } from "../context/LanguageContext";
import heroVideo from "../assets/happy-workers-loop.mp4";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* Фоновое видео с нарезкой довольных работников */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Полупрозрачная тёмная подложка ради читаемости текста */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Контент поверх видео */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
          {t("hero.headline")}
        </h1>
        <p className="mt-4 text-md sm:text-lg md:text-xl text-gray-200 max-w-2xl">
          {t("hero.subtext")}
        </p>
        <a
          href="#jobs"
          className="mt-8 inline-block px-8 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition"
        >
          {t("hero.button")}
        </a>
      </div>
    </section>
  );
}
