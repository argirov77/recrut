import { useLanguage } from '../context/LanguageContext'
import viberIcon from '../assets/icons/viber.svg'
import whatsappIcon from '../assets/icons/whatsapp.svg'

interface ChatModalProps {
  open: boolean
  onClose: () => void
}

export default function ChatModal({ open, onClose }: ChatModalProps) {
  const { t } = useLanguage()
  const phone = '+359 881 234 567'
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
        <h2 className="text-primary font-heading text-xl mb-4 text-center">
          {t('messengers.title')}
        </h2>
        <div className="grid gap-4">
          <a
            href={`viber://chat?number=${phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
          >
            <img src={viberIcon} alt="Viber" className="h-8 w-8" />
            <div className="text-left">
              <p className="font-medium">{t('messengers.viber')}</p>
              <p className="text-gray-700">{phone}</p>
            </div>
          </a>
          <a
            href={`https://wa.me/${phone.replace(/\D/g, '')}`}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
          >
            <img src={whatsappIcon} alt="WhatsApp" className="h-8 w-8" />
            <div className="text-left">
              <p className="font-medium">{t('messengers.whatsapp')}</p>
              <p className="text-gray-700">{phone}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
