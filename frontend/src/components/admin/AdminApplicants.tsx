// frontend/src/components/admin/AdminApplicants.tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Button from '../ui/Button'

interface Applicant {
  id: number
  full_name: string
  country: string
  email: string
  phone: string
  position?: string | null
  message?: string | null
  created_at: string
}

export default function AdminApplicants() {
  const [apps, setApps] = useState<Applicant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this applicant?')) return
    try {
      const API = import.meta.env.VITE_API_URL || ''
      const token = localStorage.getItem('token') || ''
      const res = await fetch(`${API}/api/forms/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.status === 204) {
        setApps((apps) => apps.filter((a) => a.id !== id))
      } else {
        const text = await res.text()
        throw new Error(`Server responded ${res.status}: ${text || res.statusText}`)
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const API = import.meta.env.VITE_API_URL || ''
        const token = localStorage.getItem('token') || ''
        const res = await fetch(`${API}/api/forms`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) {
          if (res.status === 401) {
            logout()
            navigate('/admin/login')
            return
          }
          throw new Error(`Server ${res.status}: ${await res.text()}`)
        }
        setApps(await res.json())
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return <p className="p-6">Loading…</p>
  if (error)
    return (
      <p className="p-6 text-red-600">
        <strong>Error:</strong> {error}
      </p>
    )

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Applicants ({apps.length})</h2>
      {apps.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <table className="min-w-full table-auto border">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Country</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Position</th>
              <th className="px-4 py-2">Message</th>
              <th className="px-4 py-2">Submitted</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody>
            {apps.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="px-4 py-2">{a.full_name}</td>
                <td className="px-4 py-2">{a.country}</td>
                <td className="px-4 py-2">{a.email}</td>
                <td className="px-4 py-2">{a.phone}</td>
                <td className="px-4 py-2">{a.position}</td>
                <td className="px-4 py-2">{a.message}</td>
                <td className="px-4 py-2">{new Date(a.created_at).toLocaleString()}</td>
                <td className="px-4 py-2 text-right">
                  <Button variant="ghost" onClick={() => handleDelete(a.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
