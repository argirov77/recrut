// frontend/src/components/admin/AdminJobList.tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
        const API = import.meta.env.VITE_API_URL || ''
        const token = localStorage.getItem('token') || ''

        const res = await fetch(`${API}/api/jobs`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) {
          const text = await res.text()
          throw new Error(`Server responded ${res.status}: ${text || res.statusText}`)
        }

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

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this job?')) return
    try {
      const API = import.meta.env.VITE_API_URL || ''
      const token = localStorage.getItem('token') || ''
      const res = await fetch(`${API}/api/jobs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.status === 204) {
        setJobs((j) => j.filter((job) => job.id !== id))
      } else {
        const text = await res.text()
        throw new Error(`Server responded ${res.status}: ${text || res.statusText}`)
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (loading) {
    return <p>Loading…</p>
  }
  if (error) {
    return (
      <p className="text-accentRed">
        <strong>Error:</strong> {error}
      </p>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Jobs</h2>
        <Button onClick={() => navigate('new')}>New Job</Button>
      </div>

      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <ul className="space-y-3">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="border rounded p-4 hover:shadow flex justify-between"
              onClick={() => navigate(`${job.id}/edit`)}
            >
              <div className="cursor-pointer flex-1">
                <h3 className="font-medium">{job.title}</h3>
                <p className="text-gray-600">{job.description}</p>
              </div>
              <Button
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(job.id)
                }}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
