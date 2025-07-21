import { StatusDot } from '../../components/ui/StatusDot'

export function LoadingStatus() {
  return (
    <div className="flex items-center">
      <StatusDot status="loading" />
      <span className="text-primary">Checking status...</span>
    </div>
  )
}
