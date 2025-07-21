// frontend/src/components/MessengerContacts.tsx
import { useLanguage } from '../context/LanguageContext'
import viberIcon from '../assets/icons/viber.svg'
import whatsappIcon from '../assets/icons/whatsapp.svg'

export default function MessengerContacts() {
  const { t } = useLanguage()
  const phone = '+359 881 234 567' // contact phone number

  return (
    <section id="messengers" className="py-10 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-2xl font-heading font-semibold text-primary mb-6">
          {t('messengers.title')}
        </h2>
        <div className="flex justify-center gap-4">
          <a
            href={`viber://chat?number=${phone.replace(/\s+/g, '')}`}
            className="bg-white rounded-lg shadow-md p-4 w-40 text-center hover:shadow-lg transition block"
          >
            <img src={viberIcon} alt="Viber" className="h-8 w-8 mx-auto mb-2" />
            <p className="font-heading text-primary">{t('messengers.viber')}</p>
            <p className="font-sans text-sm text-primary">{phone}</p>
          </a>
          <a
            href={`https://wa.me/${phone.replace(/\D/g, '')}`}
            className="bg-white rounded-lg shadow-md p-4 w-40 text-center hover:shadow-lg transition block"
          >
            <img src={whatsappIcon} alt="WhatsApp" className="h-8 w-8 mx-auto mb-2" />
            <p className="font-heading text-primary">{t('messengers.whatsapp')}</p>
            <p className="font-sans text-sm text-primary">{phone}</p>
          </a>
        </div>
      </div>
    </section>
  )
}
