import { useEffect, useState } from 'react'
import axios from 'axios'

interface Job {
  id: number
  title: string
  location: string
  job_type: string
  created_at: string
}

export default function AdminJobList() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    axios
      .get<Job[]>('/api/admin/jobs')
      .then((res) => setJobs(res.data))
      .catch(() => setError('Failed to load jobs'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading jobs…</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Jobs</h2>
      <table className="min-w-full bg-white dark:bg-gray-800">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Location</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Created</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="border-t">
              <td className="px-4 py-2">{job.id}</td>
              <td className="px-4 py-2">{job.title}</td>
              <td className="px-4 py-2">{job.location}</td>
              <td className="px-4 py-2">{job.job_type}</td>
              <td className="px-4 py-2">
                {new Date(job.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
