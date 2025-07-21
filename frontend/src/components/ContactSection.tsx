import { useLanguage } from '../context/LanguageContext'
import phoneIcon from '../assets/icons/phone-call.png'
import mailIcon from '../assets/icons/mail.png'
import viberIcon from '../assets/icons/viber.png'
import whatsappIcon from '../assets/icons/whatsapp.png'
import telegramIcon from '../assets/icons/telegram.svg'

export default function ContactSection() {
  const { t } = useLanguage()
  const phone = '+359 881 234 567'
  const email = 'info@bulstaff.com'
  const telegram = 'https://t.me/bulstaff'
  return (
    <section id="messengers" className="bg-gray-100 py-10">
      <div className="container mx-auto px-6 text-center space-y-6">
        <div>
          <h2 className="font-heading text-3xl md:text-4xl text-primary">
            {t('messengers.title')}
          </h2>
          <p className="mt-2 font-sans text-base text-primary">{t('contact.cta')}</p>
        </div>
        <p className="font-sans text-base text-primary">{t('contact.person')}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="p-3 bg-white rounded-full shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1"
          >
            <img src={phoneIcon} alt="Phone" className="h-8 w-8" />
          </a>
          <a
            href={`viber://chat?number=${phone.replace(/\s+/g, '')}`}
            className="p-3 bg-white rounded-full shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1"
          >
            <img src={viberIcon} alt="Viber" className="h-8 w-8" />
          </a>
          <a
            href={`https://wa.me/${phone.replace(/\D/g, '')}`}
            className="p-3 bg-white rounded-full shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1"
          >
            <img src={whatsappIcon} alt="WhatsApp" className="h-8 w-8" />
          </a>
          <a
            href={telegram}
            className="p-3 bg-white rounded-full shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1"
          >
            <img src={telegramIcon} alt="Telegram" className="h-8 w-8" />
          </a>
          <a
            href={`mailto:${email}`}
            className="p-3 bg-white rounded-full shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1"
          >
            <img src={mailIcon} alt="Email" className="h-8 w-8" />
          </a>
        </div>
        <p className="font-sans text-base text-primary">{t('contact.address')}</p>
      </div>
    </section>
  )
}
