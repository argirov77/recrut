import { useEffect, useState } from 'react'
import axios from 'axios'

interface Application {
  id: number
  job_id: number
  applicant_name: string
  email: string
  submitted_at: string
}

export default function AdminApplicants() {
  const [apps, setApps] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    axios
      .get<Application[]>('/api/admin/applications')
      .then((res) => setApps(res.data))
      .catch(() => setError('Failed to load applications'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading applications…</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Applicants</h2>
      <table className="min-w-full bg-white dark:bg-gray-800">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Job ID</th>
            <th className="px-4 py-2 text-left">Submitted</th>
          </tr>
        </thead>
        <tbody>
          {apps.map((app) => (
            <tr key={app.id} className="border-t">
              <td className="px-4 py-2">{app.id}</td>
              <td className="px-4 py-2">{app.applicant_name}</td>
              <td className="px-4 py-2">{app.email}</td>
              <td className="px-4 py-2">{app.job_id}</td>
              <td className="px-4 py-2">
                {new Date(app.submitted_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
