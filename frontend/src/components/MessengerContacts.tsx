// frontend/src/components/MessengerContacts.tsx
import { useLanguage } from '../context/LanguageContext'
import viberIcon from '../assets/icons/viber.svg'
import whatsappIcon from '../assets/icons/whatsapp.svg'
import telegramIcon from '../assets/icons/telegram.svg'
import emailIcon from '../assets/icons/email.svg'

export default function MessengerContacts() {
  const { t } = useLanguage()
  const phone = '+359 881 234 567' // contact phone number
  const email = 'info@bulstaff.com'
  const telegram = 'bulstaff'

  return (
    <section id="messengers" className="py-10 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-heading text-3xl md:text-4xl text-primary text-center mb-8">
          {t('messengers.title')}
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={`viber://chat?number=${phone.replace(/\s+/g, '')}`}
            className="bg-white rounded-lg shadow-md p-4 w-40 text-center hover:shadow-lg transition block"
          >
            <img src={viberIcon} alt="Viber" className="h-8 w-8 mx-auto mb-2" />
            <p className="font-heading text-2xl text-primary mb-2">{t('messengers.viber')}</p>
            <p className="font-sans text-base text-primary">{phone}</p>
          </a>
          <a
            href={`https://wa.me/${phone.replace(/\D/g, '')}`}
            className="bg-white rounded-lg shadow-md p-4 w-40 text-center hover:shadow-lg transition block"
          >
            <img src={whatsappIcon} alt="WhatsApp" className="h-8 w-8 mx-auto mb-2" />
            <p className="font-heading text-2xl text-primary mb-2">{t('messengers.whatsapp')}</p>
            <p className="font-sans text-base text-primary">{phone}</p>
          </a>
          <a
            href={`https://t.me/${telegram}`}
            className="bg-white rounded-lg shadow-md p-4 w-40 text-center hover:shadow-lg transition block"
          >
            <img src={telegramIcon} alt="Telegram" className="h-8 w-8 mx-auto mb-2" />
            <p className="font-heading text-2xl text-primary mb-2">{t('messengers.telegram')}</p>
            <p className="font-sans text-base text-primary">@{telegram}</p>
          </a>
          <a
            href={`mailto:${email}`}
            className="bg-white rounded-lg shadow-md p-4 w-40 text-center hover:shadow-lg transition block"
          >
            <img src={emailIcon} alt="Email" className="h-8 w-8 mx-auto mb-2" />
            <p className="font-heading text-2xl text-primary mb-2">{t('messengers.email')}</p>
            <p className="font-sans text-base text-primary">{email}</p>
          </a>
        </div>
      </div>
    </section>
  )
}
