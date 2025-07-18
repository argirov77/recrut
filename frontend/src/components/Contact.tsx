import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import FeedbackModal from './FeedbackModal'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function Contact() {
  const { t } = useLanguage()
  const location = useLocation()

  const [isOpen, setIsOpen] = useState(false)

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const [form, setForm] = useState({
    fullName: '',
    country: '',
    email: '',
    phone: '',
    position: '',
    message: '',
  })

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const title = params.get('position')
    if (title) {
      setForm((prev) => ({ ...prev, position: title }))
      setIsOpen(true)
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location.search])

  useEffect(() => {
    if (location.hash === '#contact') {
      setIsOpen(true)
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location.hash])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API_URL}/api/forms/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: form.fullName,
          country: form.country,
          email: form.email,
          phone: form.phone,
          position: form.position,
          message: form.message,
        }),
      })
      if (!res.ok) throw new Error('failed')
      setFeedback({ type: 'success', text: t('contact.success') })
      setForm({
        fullName: '',
        country: '',
        email: '',
        phone: '',
        position: '',
        message: '',
      })
    } catch {
      setFeedback({ type: 'error', text: t('contact.error') })
    }
  }

  return (
    <div id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <details
          id="contact-form"
          open={isOpen}
          onToggle={(e) => setIsOpen(e.currentTarget.open)}
          className="group max-w-lg mx-auto bg-white border border-gray-200 rounded-xl shadow-lg transition-all duration-300 ease-out overflow-hidden"
        >
          <summary className="cursor-pointer select-none p-4 flex items-center justify-between">
            <span className="text-xl font-heading font-semibold text-primary">
              {t('contact.title')}
            </span>
            <svg
              className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-90"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </summary>
          <form onSubmit={handleSubmit} className="p-6 pt-0 space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">{t('contact.fullName')}</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder={t('contact.fullName')}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">{t('contact.country')}</label>
              <input
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder={t('contact.country')}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">{t('contact.email')}</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder={t('contact.email')}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">{t('contact.phone')}</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder={t('contact.phone')}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">{t('contact.position')}</label>
              <input
                type="text"
                name="position"
                value={form.position}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder={t('contact.position')}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">{t('contact.message')}</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder={t('contact.message')}
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="inline-block px-6 py-2 bg-accentGreen text-white font-medium rounded-full hover:bg-accentGreen/90 transition-shadow"
              >
                {t('contact.submit')}
              </button>
            </div>
          </form>
        </details>
        {feedback && (
          <FeedbackModal
            type={feedback.type}
            message={feedback.text}
            onClose={() => setFeedback(null)}
          />
        )}
      </div>
    </div>
  )
}
