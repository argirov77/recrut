// frontend/src/components/admin/AdminJobList.tsx
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../ui/Button'

// тип вакансии
interface Job {
  id: number
  title: string
  description: string
}

export default function AdminJobList() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        // подхватываем из .env
        const API = import.meta.env.VITE_API_URL || ''
        const token = localStorage.getItem('token') || ''

        const res = await fetch(`${API}/api/jobs`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) {
          // если не 2xx — пробуем прочитать текст ошибки
          const text = await res.text()
          throw new Error(
            `Server responded ${res.status}: ${text || res.statusText}`
          )
        }

        // теперь точно можно парсить JSON
        const data = (await res.json()) as Job[]
        setJobs(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  if (loading) return <p className="p-6">Loading…</p>
  if (error)
    return (
      <p className="p-6 text-red-600">
        <strong>Error:</strong> {error}
      </p>
    )

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Jobs</h2>
        <Button onClick={() => navigate('/admin/jobs/new')}>
          New Job
        </Button>
      </div>

      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <ul className="space-y-3">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="border rounded p-4 hover:shadow cursor-pointer"
              onClick={() => navigate(`/admin/jobs/${job.id}/edit`)}
            >
              <h3 className="font-medium">{job.title}</h3>
              <p className="text-gray-600">{job.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
