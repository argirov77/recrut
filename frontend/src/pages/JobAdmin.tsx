import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '@/components/ui/input'
import Button from '@/components/ui/Button'
import { PageLoader } from '@/components/ui/PageLoader'
import { useAuth } from '@/context/AuthContext'
import type { Job } from '@/types/job'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function JobAdmin() {
  const navigate = useNavigate()
  const { user, token, isLoading } = useAuth()
  const [jobs, setJobs] = useState<Job[]>([])
  const [form, setForm] = useState<Omit<Job, 'id'>>({
    title: '',
    location: '',
    job_type: '',
    description: '',
    requirements: '',
  })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<Omit<Job, 'id'>>(form)

  useEffect(() => {
    if (token) fetchJobs()
  }, [token])

  useEffect(() => {
    if (!isLoading && user && user.role !== 'admin') {
      navigate('/dashboard', { replace: true })
    }
  }, [user, isLoading, navigate])

  if (isLoading || !user) {
    return <PageLoader />
  }

  async function fetchJobs() {
    const res = await fetch(`${API_URL}/api/jobs`)
    if (res.ok) {
      setJobs(await res.json())
    }
  }

  async function createJob(e: React.FormEvent) {
    e.preventDefault()
    await fetch(`${API_URL}/api/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    })
    setForm({ title: '', location: '', job_type: '', description: '', requirements: '' })
    fetchJobs()
  }

  async function startEdit(job: Job) {
    setEditingId(job.id)
    setEditForm({
      title: job.title,
      location: job.location,
      job_type: job.job_type,
      description: job.description,
      requirements: job.requirements || '',
    })
  }

  async function saveEdit(id: number) {
    await fetch(`${API_URL}/api/jobs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editForm),
    })
    setEditingId(null)
    fetchJobs()
  }

  async function deleteJob(id: number) {
    await fetch(`${API_URL}/api/jobs/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    fetchJobs()
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Job Administration</h1>
      <form onSubmit={createJob} className="space-y-2 max-w-md">
        <Input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <Input
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <Input
          placeholder="Type"
          value={form.job_type}
          onChange={(e) => setForm({ ...form, job_type: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="w-full px-4 py-2 border border-gray-300 rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <textarea
          placeholder="Requirements"
          className="w-full px-4 py-2 border border-gray-300 rounded"
          value={form.requirements}
          onChange={(e) => setForm({ ...form, requirements: e.target.value })}
        />
        <Button type="submit">Create</Button>
      </form>

      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2">Title</th>
            <th className="border px-2">Location</th>
            <th className="border px-2">Type</th>
            <th className="border px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) =>
            editingId === job.id ? (
              <tr key={job.id}>
                <td className="border px-2">
                  <Input
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  />
                </td>
                <td className="border px-2">
                  <Input
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  />
                </td>
                <td className="border px-2">
                  <Input
                    value={editForm.job_type}
                    onChange={(e) => setEditForm({ ...editForm, job_type: e.target.value })}
                  />
                </td>
                <td className="border px-2 space-x-2">
                  <Button variant="secondary" type="button" onClick={() => saveEdit(job.id)}>
                    Save
                  </Button>
                  <Button variant="ghost" type="button" onClick={() => setEditingId(null)}>
                    Cancel
                  </Button>
                </td>
              </tr>
            ) : (
              <tr key={job.id}>
                <td className="border px-2">{job.title}</td>
                <td className="border px-2">{job.location}</td>
                <td className="border px-2">{job.job_type}</td>
                <td className="border px-2 space-x-2">
                  <Button variant="secondary" type="button" onClick={() => startEdit(job)}>
                    Edit
                  </Button>
                  <Button variant="ghost" type="button" onClick={() => deleteJob(job.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  )
}
