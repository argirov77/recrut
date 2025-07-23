// Cache the promise to avoid creating a new one on every render
let healthPromise = null

export function useHealthStatus() {
  if (!healthPromise) {
    healthPromise = fetchHealthStatus()
  }
  return healthPromise
}

async function fetchHealthStatus() {
  try {
    const base = import.meta.env.VITE_API_BASE_URL || 'http://154.43.62.173:8000'
    const response = await fetch(`${base}/api/health`)
    if (!response.ok) return { status: 'error' }
    const data = await response.json()
    return data
  } catch (error) {
    return { status: 'error', message: error.message }
  }
}
