import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import type { ContactForm } from '@/types/contactForm'
import { PageLoader } from '@/components/ui/PageLoader'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function AdminForms() {
  const { user, token, isLoading } = useAuth()
  const navigate = useNavigate()
  const [forms, setForms] = useState<ContactForm[]>([])

  useEffect(() => {
    if (token) fetchForms()
  }, [token])

  useEffect(() => {
    if (!isLoading && user && user.role !== 'admin') {
      navigate('/dashboard', { replace: true })
    }
  }, [user, isLoading, navigate])

  if (isLoading || !user) return <PageLoader />

  async function fetchForms() {
    const res = await fetch(`${API_URL}/api/forms/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (res.ok) {
      setForms(await res.json())
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Contact Forms</h1>
      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2">Name</th>
            <th className="border px-2">Email</th>
            <th className="border px-2">Country</th>
            <th className="border px-2">Phone</th>
            <th className="border px-2">Position</th>
            <th className="border px-2">Message</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((f) => (
            <tr key={f.id}>
              <td className="border px-2">{f.full_name}</td>
              <td className="border px-2">{f.email}</td>
              <td className="border px-2">{f.country}</td>
              <td className="border px-2">{f.phone}</td>
              <td className="border px-2">{f.position}</td>
              <td className="border px-2">{f.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
