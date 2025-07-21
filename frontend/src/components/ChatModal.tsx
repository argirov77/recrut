import { useLanguage } from '../context/LanguageContext'
import phoneIcon from '../assets/icons/phone-call.png'
import mailIcon from '../assets/icons/mail.png'
import viberIcon from '../assets/icons/viber.png'
import whatsappIcon from '../assets/icons/whatsapp.png'

interface ChatModalProps {
  open: boolean
  onClose: () => void
}

export default function ChatModal({ open, onClose }: ChatModalProps) {
  const { t } = useLanguage()
  const phone = '+359 881 234 567'
  const email = 'info@bulstaff.com'
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 lg:hidden">
      <div className="relative bg-white rounded-lg p-6 w-11/12 max-w-sm">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="font-heading text-3xl md:text-4xl text-primary text-center mb-8">
          {t('messengers.title')}
        </h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all"
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
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all"
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
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all"
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
            href={`mailto:${email}`}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all"
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
      </div>
    </div>
  )
}
