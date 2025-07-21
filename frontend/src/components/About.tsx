import { useLanguage } from '../context/LanguageContext'

export default function About() {
  const { t } = useLanguage()

  return (
    <div id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold text-primary mb-4">{t('about.title')}</h2>
        <p className="text-gray-600 leading-relaxed">{t('about.text')}</p>
      </div>
    </div>
  )
}
