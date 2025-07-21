import React from 'react'
import { useLanguage } from '../context/LanguageContext'

interface FeedbackModalProps {
  type: 'success' | 'error'
  message: string
  onClose: () => void
  title?: string
}

export default function FeedbackModal({ title, message, onClose }: FeedbackModalProps) {
  const { t } = useLanguage()
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-200 ease-out z-50">
      <div className="bg-white rounded-xl p-6 max-w-sm mx-auto shadow-lg">
        {title && (
          <h2 className="font-heading text-3xl md:text-4xl text-primary text-center mb-8">
            {title}
          </h2>
        )}
        <p className="font-sans text-base text-primary font-medium">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 px-6 py-2 bg-accentGreen text-white rounded-full hover:bg-accentGreen/90 transition"
          type="button"
        >
          {t('contact.ok')}
        </button>
      </div>
    </div>
  )
}
