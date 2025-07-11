// frontend/src/components/admin/AdminJobForm.tsx
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../ui/Button'
import Input from '../ui/input'
import Textarea from '../ui/Textarea'

type LangCode = 'en' | 'ru' | 'bg'

interface TranslatedFields {
  title: string
  location: string
  job_type: string
  description: string
  requirements: string
}

type Job = { id?: number } & Record<LangCode, TranslatedFields>

export default function AdminJobForm() {
  const { jobId } = useParams<{ jobId: string }>()
  const editMode = Boolean(jobId)
  const [job, setJob] = useState<Job>({
    en: { title: '', location: '', job_type: '', description: '', requirements: '' },
    ru: { title: '', location: '', job_type: '', description: '', requirements: '' },
    bg: { title: '', location: '', job_type: '', description: '', requirements: '' },
  })
  const [activeLang, setActiveLang] = useState<LangCode>('en')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  // при редактировании подгружаем данные
  useEffect(() => {
    if (!editMode) return
    ;(async () => {
      try {
        const API = import.meta.env.VITE_API_URL || ''
        const token = localStorage.getItem('token') || ''
        const res = await fetch(
          `${API}/api/admin/jobs/${jobId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
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
        ? `${API}/api/admin/jobs/${jobId}`
        : `${API}/api/admin/jobs`
      const method = editMode ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(job),
      })
      if (!res.ok) throw new Error(await res.text())
      navigate('/admin/jobs')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!editMode || !jobId) return
    if (!confirm('Delete this job?')) return
    setSaving(true)
    setError(null)
    try {
      const API = import.meta.env.VITE_API_URL || ''
      const token = localStorage.getItem('token') || ''
      const res = await fetch(`${API}/api/jobs/${jobId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok && res.status !== 204) throw new Error(await res.text())
      navigate('/admin/jobs')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">{editMode ? 'Edit Job' : 'New Job'}</h2>
      {error && (
        <p className="mb-4 text-red-600">
          <strong>Error:</strong> {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-2 mb-2">
          {(['en', 'ru', 'bg'] as LangCode[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setActiveLang(l)}
              className={`px-3 py-1 border-b-2 ${activeLang === l ? 'border-blue-500 font-semibold' : 'border-transparent'}`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        {(() => {
          const fields = job[activeLang]
          return (
            <>
              <div>
                <label className="block mb-1 font-medium">Title ({activeLang.toUpperCase()})</label>
                <Input
                  value={fields.title}
                  onChange={(e) =>
                    setJob((j) => ({
                      ...j,
                      [activeLang]: { ...j[activeLang], title: e.target.value },
                    }))
                  }
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Location ({activeLang.toUpperCase()})</label>
                <Input
                  value={fields.location}
                  onChange={(e) =>
                    setJob((j) => ({
                      ...j,
                      [activeLang]: { ...j[activeLang], location: e.target.value },
                    }))
                  }
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Job Type ({activeLang.toUpperCase()})</label>
                <Input
                  value={fields.job_type}
                  onChange={(e) =>
                    setJob((j) => ({
                      ...j,
                      [activeLang]: { ...j[activeLang], job_type: e.target.value },
                    }))
                  }
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Description ({activeLang.toUpperCase()})</label>
                <Textarea
                  value={fields.description}
                  onChange={(e) =>
                    setJob((j) => ({
                      ...j,
                      [activeLang]: { ...j[activeLang], description: e.target.value },
                    }))
                  }
                  rows={5}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Requirements ({activeLang.toUpperCase()})</label>
                <Textarea
                  value={fields.requirements}
                  onChange={(e) =>
                    setJob((j) => ({
                      ...j,
                      [activeLang]: { ...j[activeLang], requirements: e.target.value },
                    }))
                  }
                  rows={5}
                />
              </div>
            </>
          )
        })()}
        <div className="flex space-x-2">
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </Button>
          <Button variant="ghost" onClick={() => navigate('/admin/jobs')}>
            Cancel
          </Button>
          {editMode && (
            <Button variant="secondary" type="button" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

