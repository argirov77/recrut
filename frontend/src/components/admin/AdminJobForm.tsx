// frontend/src/components/admin/AdminJobForm.tsx
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../ui/Button'
import Input  from '../ui/input'

import Textarea from '../ui/Textarea'

interface Job {
  id?: number
  title: string
  location: string
  job_type: string
  description: string
  requirements: string
}

export default function AdminJobForm() {
  const { jobId } = useParams<{ jobId: string }>()
  const editMode = Boolean(jobId)
  const [job, setJob] = useState<Job>({
    title: '',
    location: '',
    job_type: '',
    description: '',
    requirements: '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string|null>(null)
  const navigate = useNavigate()

  // при редактировании подгружаем данные
  useEffect(() => {
    if (!editMode) return
    (async () => {
      try {
        const API = import.meta.env.VITE_API_URL || ''
        const token = localStorage.getItem('token') || ''
        const res = await fetch(`${API}/api/jobs/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (!res.ok) throw new Error(await res.text())
        setJob(await res.json())
      } catch (err: any) {
        setError(err.message)
      }
    })()
  }, [editMode, jobId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const API = import.meta.env.VITE_API_URL || ''
      const token = localStorage.getItem('token') || ''
      const url = editMode
        ? `${API}/api/jobs/${jobId}`
        : `${API}/api/jobs`
      const method = editMode ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(job)
      })
      if (!res.ok) throw new Error(await res.text())
      navigate('/admin/jobs')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        {editMode ? 'Edit Job' : 'New Job'}
      </h2>
      {error && (
        <p className="mb-4 text-red-600">
          <strong>Error:</strong> {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <Input
            value={job.title}
            onChange={e => setJob(j => ({ ...j, title: e.target.value }))}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <Input
            value={job.location}
            onChange={e => setJob(j => ({ ...j, location: e.target.value }))}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Job Type</label>
          <Input
            value={job.job_type}
            onChange={e => setJob(j => ({ ...j, job_type: e.target.value }))}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <Textarea
            value={job.description}
            onChange={e => setJob(j => ({ ...j, description: e.target.value }))}
            rows={5}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Requirements</label>
          <Textarea
            value={job.requirements}
            onChange={e => setJob(j => ({ ...j, requirements: e.target.value }))}
            rows={5}
          />
        </div>
        <div className="flex space-x-2">
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </Button>
          <Button variant="ghost" onClick={() => navigate('/admin/jobs')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
