import { FormEvent, useState } from 'react'
import Button from '../ui/Button'
import { useAuth } from '../../context/AuthContext'

export default function AdminChangePassword() {
  const { changePassword, isLoading } = useAuth()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const inputClasses =
    'mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40'

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFeedback(null)

    if (newPassword !== confirmPassword) {
      setFeedback({ type: 'error', message: 'New passwords do not match.' })
      return
    }

    const result = await changePassword({ currentPassword, newPassword })
    if (result.success) {
      setFeedback({ type: 'success', message: 'Password updated successfully.' })
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } else {
      setFeedback({ type: 'error', message: result.error ?? 'Unable to change password.' })
    }
  }

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Change password</h2>
        <p className="text-gray-600">Update the credentials for your administrator account.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-gray-700">Current password</label>
          <input
            type="password"
            required
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            className={inputClasses}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">New password</label>
          <input
            type="password"
            required
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            className={inputClasses}
            minLength={8}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm new password</label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className={inputClasses}
            minLength={8}
          />
        </div>

        <div className="flex items-center gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving…' : 'Update password'}
          </Button>
          {feedback && (
            <span
              className={`text-sm ${feedback.type === 'success' ? 'text-green-600' : 'text-red-600'}`}
            >
              {feedback.message}
            </span>
          )}
        </div>
      </form>
    </div>
  )
}
