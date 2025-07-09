import { Job } from '@/types/job'
const API = import.meta.env.VITE_API_URL || ''

function authHeaders() {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function fetchJobs(): Promise<Job[]> {
  const res = await fetch(`${API}/api/admin/jobs/`, {
    headers: { ...authHeaders() },
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function createJob(data: Omit<Job, 'id' | 'created_at' | 'updated_at'>): Promise<Job> {
  const res = await fetch(`${API}/api/admin/jobs/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function updateJob(id: string, data: Partial<Job>): Promise<Job> {
  const res = await fetch(`${API}/api/admin/jobs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function deleteJob(id: string): Promise<void> {
  const res = await fetch(`${API}/api/admin/jobs/${id}`, {
    method: 'DELETE',
    headers: { ...authHeaders() },
  })
  if (!res.ok) throw new Error(await res.text())
}
