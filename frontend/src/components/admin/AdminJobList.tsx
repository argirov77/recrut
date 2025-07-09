import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchJobs, deleteJob } from '@/lib/api/jobs'
import { Job } from '@/types/job'
import Button from '../ui/Button'
import { useToast } from '@/hooks/use-toast'

export default function AdminJobList() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { toast } = useToast()

  const load = async () => {
    setLoading(true)
    try {
      const data = await fetchJobs()
      setJobs(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const onDelete = async (id: string) => {
    if (!confirm('Delete job?')) return
    await deleteJob(id)
    toast({ title: 'Job deleted' })
    load()
  }

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
        <Button onClick={() => navigate('/admin/jobs/new')}>New Job</Button>
      </div>
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <ul className="space-y-3">
          {jobs.map((job) => (
            <li key={job.id} className="border rounded p-4 hover:shadow">
              <div className="flex justify-between items-center">
                <div
                  onClick={() => navigate(`/admin/jobs/${job.id}/edit`)}
                  className="cursor-pointer"
                >
                  <h3 className="font-medium">{job.title}</h3>
                  <p className="text-gray-600 truncate max-w-md">{job.description}</p>
                </div>
                <Button variant="ghost" onClick={() => onDelete(job.id)}>
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
