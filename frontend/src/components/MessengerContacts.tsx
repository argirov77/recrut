import { useLanguage } from '../context/LanguageContext'

export default function MessengerContacts() {
  const { t } = useLanguage()

  const phone = '+359 881 234 567' // contact phone number

  return (
    <div id="messengers" className="py-10 bg-gray-100 snap-start">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">{t('messengers.title')}</h2>
        <div className="flex flex-col items-center space-y-2 text-lg">
          <div>
            <span className="font-medium mr-1">{t('messengers.viber')}:</span>
            <a
              href={`viber://chat?number=${phone.replace(/\s+/g, '')}`}
              className="text-gray-900 hover:underline"
            >
              {phone}
            </a>
          </div>
          <div>
            <span className="font-medium mr-1">{t('messengers.whatsapp')}:</span>
            <a
              href={`https://wa.me/${phone.replace(/\D/g, '')}`}
              className="text-gray-900 hover:underline"
            >
              {phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
