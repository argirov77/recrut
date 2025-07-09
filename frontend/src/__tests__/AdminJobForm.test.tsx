import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AdminJobForm from '../components/admin/AdminJobForm'
import { BrowserRouter } from 'react-router-dom'

it('requires title and description', async () => {
  render(
    <BrowserRouter>
      <AdminJobForm />
    </BrowserRouter>
  )
  await userEvent.click(screen.getByRole('button', { name: /save/i }))
  expect(await screen.findAllByText(/at least 1 character/i)).toHaveLength(2)
})
