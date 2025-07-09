import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AdminJobForm from '../components/admin/AdminJobForm'
import { BrowserRouter } from 'react-router-dom'

it('shows validation error for salary', async () => {
  render(
    <BrowserRouter>
      <AdminJobForm />
    </BrowserRouter>
  )
  await userEvent.type(screen.getByLabelText(/title/i), 't')
  await userEvent.type(screen.getByLabelText(/description/i), 'd')
  await userEvent.type(screen.getByLabelText(/location/i), 'l')
  await userEvent.type(screen.getByLabelText(/salary min/i), '100')
  await userEvent.type(screen.getByLabelText(/salary max/i), '50')
  await userEvent.click(screen.getByRole('button', { name: /save/i }))
  expect(await screen.findByText(/salary_max/)).toBeInTheDocument()
})
