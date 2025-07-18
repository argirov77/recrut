import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function Contact() {
  const { t } = useLanguage()
  const location = useLocation()

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
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location.search])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch(`${API_URL}/api/forms/`, {
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
    alert('Спасибо за вашу заявку!')
    setForm({
      fullName: '',
      country: '',
      email: '',
      phone: '',
      position: '',
      message: '',
    })
  }

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-lg">
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-8">
          {t('contact.title')}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-1">{t('contact.fullName')}</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
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
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
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
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
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
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
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
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
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
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder={t('contact.message')}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition"
            >
              {t('contact.submit')}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
