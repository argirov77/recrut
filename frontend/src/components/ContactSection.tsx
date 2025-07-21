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
  return (
    <section id="messengers" className="py-10 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-heading text-3xl md:text-4xl text-primary mb-8">
          {t('messengers.title')}
        </h2>
        <div className="mx-auto grid max-w-md grid-cols-1 gap-4 sm:grid-cols-2 md:max-w-none md:grid-cols-5">
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <img src={phoneIcon} alt="Phone" className="h-8 w-8" />
            <div className="text-left">
              <p className="font-sans text-base text-primary font-medium">
                {t('messengers.phone')}
              </p>
              <p className="font-sans text-base text-primary">{phone}</p>
            </div>
          </a>
          <a
            href={`viber://chat?number=${phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <img src={viberIcon} alt="Viber" className="h-8 w-8" />
            <div className="text-left">
              <p className="font-sans text-base text-primary font-medium">
                {t('messengers.viber')}
              </p>
              <p className="font-sans text-base text-primary">{phone}</p>
            </div>
          </a>
          <a
            href={`https://wa.me/${phone.replace(/\D/g, '')}`}
            className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <img src={whatsappIcon} alt="WhatsApp" className="h-8 w-8" />
            <div className="text-left">
              <p className="font-sans text-base text-primary font-medium">
                {t('messengers.whatsapp')}
              </p>
              <p className="font-sans text-base text-primary">{phone}</p>
            </div>
          </a>
          <a
            href="https://t.me/bulstaff"
            className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <img src={telegramIcon} alt="Telegram" className="h-8 w-8" />
            <div className="text-left">
              <p className="font-sans text-base text-primary font-medium">
                {t('messengers.telegram')}
              </p>
              <p className="font-sans text-base text-primary">@bulstaff</p>
            </div>
          </a>
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <img src={mailIcon} alt="Email" className="h-8 w-8" />
            <div className="text-left">
              <p className="font-sans text-base text-primary font-medium">
                {t('messengers.email')}
              </p>
              <p className="font-sans text-base text-primary">{email}</p>
            </div>
          </a>
        </div>
        <div className="mt-6 space-y-1">
          <p className="font-sans text-base text-primary">{t('contact.address')}</p>
          <p className="font-sans text-base text-primary">{t('contact.person')}</p>
        </div>
      </div>
    </section>
  )
}
