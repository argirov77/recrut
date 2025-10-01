import { API_BASE_URL } from '@/lib/api'

type HealthStatusResponse = { status: string; message?: string }

// Cache the promise to avoid creating a new one on every render
let healthPromise: Promise<HealthStatusResponse> | null = null

export function useHealthStatus() {
  if (!healthPromise) {
    healthPromise = fetchHealthStatus()
  }
  return healthPromise
}

async function fetchHealthStatus() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`)
    if (!response.ok) return { status: 'error' }
    const data = (await response.json()) as HealthStatusResponse
    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { status: 'error', message }
  }
}
