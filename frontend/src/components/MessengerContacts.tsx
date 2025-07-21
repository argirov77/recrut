import { useLanguage } from '../context/LanguageContext'

export default function MessengerContacts() {
  const { t } = useLanguage()

  const phone = '+359 881 234 567' // contact phone number

  return (
    <section id="messengers" className="py-10 bg-gray-50 snap-start">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-primary font-heading text-2xl lg:text-3xl mb-4">{t('messengers.title')}</h2>
        <div className="flex flex-col items-center space-y-2 text-lg">
          <div>
            <span className="font-medium mr-1">{t('messengers.viber')}:</span>
              <a
                href={`viber://chat?number=${phone.replace(/\s+/g, '')}`}
                className="text-primary hover:underline"
              >
              {phone}
            </a>
          </div>
          <div>
            <span className="font-medium mr-1">{t('messengers.whatsapp')}:</span>
              <a
                href={`https://wa.me/${phone.replace(/\D/g, '')}`}
                className="text-primary hover:underline"
              >
              {phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
