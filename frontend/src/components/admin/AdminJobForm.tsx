// frontend/src/components/admin/AdminJobForm.tsx
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../ui/Button'
import Input from '../ui/input'

import Textarea from '../ui/Textarea'

type LangCode = 'en' | 'ru' | 'bg'

interface Job {
  id?: number
  title_en: string
  title_ru: string
  title_bg: string
  location_en: string
  location_ru: string
  location_bg: string
  job_type_en: string
  job_type_ru: string
  job_type_bg: string
  description_en: string
  description_ru: string
  description_bg: string
  requirements_en: string
  requirements_ru: string
  requirements_bg: string
  [key: string]: any
}

export default function AdminJobForm() {
  const { jobId } = useParams<{ jobId: string }>()
  const editMode = Boolean(jobId)
  const [job, setJob] = useState<Job>({
    title_en: '',
    title_ru: '',
    title_bg: '',
    location_en: '',
    location_ru: '',
    location_bg: '',
    job_type_en: '',
    job_type_ru: '',
    job_type_bg: '',
    description_en: '',
    description_ru: '',
    description_bg: '',
    requirements_en: '',
    requirements_ru: '',
    requirements_bg: '',
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
        const res = await fetch(`${API}/api/admin/jobs/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` },
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
      const url = editMode ? `${API}/api/admin/jobs/${jobId}` : `${API}/api/admin/jobs`
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
        {activeLang === 'en' && (
          <>
            <div>
              <label className="block mb-1 font-medium">Title (EN)</label>
              <Input
                value={job.title_en}
                onChange={(e) => setJob((j) => ({ ...j, title_en: e.target.value }))}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Location (EN)</label>
              <Input
                value={job.location_en}
                onChange={(e) => setJob((j) => ({ ...j, location_en: e.target.value }))}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Job Type (EN)</label>
              <Input
                value={job.job_type_en}
                onChange={(e) => setJob((j) => ({ ...j, job_type_en: e.target.value }))}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Description (EN)</label>
              <Textarea
                value={job.description_en}
                onChange={(e) => setJob((j) => ({ ...j, description_en: e.target.value }))}
                rows={5}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Requirements (EN)</label>
              <Textarea
                value={job.requirements_en}
                onChange={(e) => setJob((j) => ({ ...j, requirements_en: e.target.value }))}
                rows={5}
              />
            </div>
          </>
        )}
        {activeLang === 'ru' && (
          <>
            <div>
              <label className="block mb-1 font-medium">Title (RU)</label>
              <Input
                value={job.title_ru}
                onChange={(e) => setJob((j) => ({ ...j, title_ru: e.target.value }))}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Location (RU)</label>
              <Input
                value={job.location_ru}
                onChange={(e) => setJob((j) => ({ ...j, location_ru: e.target.value }))}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Job Type (RU)</label>
              <Input
                value={job.job_type_ru}
                onChange={(e) => setJob((j) => ({ ...j, job_type_ru: e.target.value }))}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Description (RU)</label>
              <Textarea
                value={job.description_ru}
                onChange={(e) => setJob((j) => ({ ...j, description_ru: e.target.value }))}
                rows={5}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Requirements (RU)</label>
              <Textarea
                value={job.requirements_ru}
                onChange={(e) => setJob((j) => ({ ...j, requirements_ru: e.target.value }))}
                rows={5}
              />
            </div>
          </>
        )}
        {activeLang === 'bg' && (
          <>
            <div>
              <label className="block mb-1 font-medium">Title (BG)</label>
              <Input
                value={job.title_bg}
                onChange={(e) => setJob((j) => ({ ...j, title_bg: e.target.value }))}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Location (BG)</label>
              <Input
                value={job.location_bg}
                onChange={(e) => setJob((j) => ({ ...j, location_bg: e.target.value }))}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Job Type (BG)</label>
              <Input
                value={job.job_type_bg}
                onChange={(e) => setJob((j) => ({ ...j, job_type_bg: e.target.value }))}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Description (BG)</label>
              <Textarea
                value={job.description_bg}
                onChange={(e) => setJob((j) => ({ ...j, description_bg: e.target.value }))}
                rows={5}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Requirements (BG)</label>
              <Textarea
                value={job.requirements_bg}
                onChange={(e) => setJob((j) => ({ ...j, requirements_bg: e.target.value }))}
                rows={5}
              />
            </div>
          </>
        )}
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
