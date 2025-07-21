export function StatusDot({ status }: { status: 'healthy' | 'error' | 'loading' }) {
  const colors: Record<'healthy' | 'error' | 'loading', string> = {
    healthy: 'bg-accentGreen',
    error: 'bg-accentRed',
    loading: 'bg-accentCyan animate-pulse',
  }

  return <div className={`w-3 h-3 rounded-full mr-2 ${colors[status] || colors.error}`} />
}
