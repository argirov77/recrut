// frontend/src/components/Hero.tsx

import { useLanguage } from '../context/LanguageContext'
import heroVideo from '../assets/happy-workers-loop.mp4'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <div id="hero" className="relative h-screen overflow-hidden">
      {/* Фоновое видео с нарезкой довольных работников */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Градиентная подложка для лучшей читаемости текста */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent"></div>

      {/* Контент поверх видео */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
          {t('hero.headline')}
        </h1>
        <p className="mt-4 max-w-2xl font-sans text-base text-white/80 drop-shadow">
          {t('hero.subtext')}
        </p>
        <a
          href="#jobs"
          className="mt-8 inline-block rounded-md bg-red-600 px-8 py-3 font-sans font-medium text-white transition-transform hover:scale-105 hover:bg-red-700 hover:shadow-lg"
        >
          {t('hero.button')}
        </a>
      </div>
    </div>
  )
}
