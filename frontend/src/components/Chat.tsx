import { useLanguage } from '../context/LanguageContext'
import viberIcon from '../assets/icons/viber.svg'
import whatsappIcon from '../assets/icons/whatsapp.svg'

export default function Chat() {
  const { t } = useLanguage()
  const phone = '+359 881 234 567'
  return (
    <section id="messengers" className="py-10 bg-gray-100 hidden lg:block">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-2xl font-semibold mb-6">{t('messengers.title')}</h2>
        <div className="mx-auto grid max-w-md grid-cols-1 gap-4 sm:grid-cols-2">
          <a
            href={`viber://chat?number=${phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-4 p-4 bg-white rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-200 text-primary hover:text-accentCyan"
          >
            <img src={viberIcon} alt="Viber" className="h-8 w-8" />
            <div className="text-left">
              <p className="font-medium">{t('messengers.viber')}</p>
              <p className="text-primary">{phone}</p>
            </div>
          </a>
          <a
            href={`https://wa.me/${phone.replace(/\D/g, '')}`}
            className="flex items-center gap-4 p-4 bg-white rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-200 text-primary hover:text-accentCyan"
          >
            <img src={whatsappIcon} alt="WhatsApp" className="h-8 w-8" />
            <div className="text-left">
              <p className="font-medium">{t('messengers.whatsapp')}</p>
              <p className="text-primary">{phone}</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
