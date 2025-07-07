import { NavLink } from 'react-router-dom'

const links = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/jobs',      label: 'Jobs'      },
  { to: '/admin/forms',     label: 'Applicants'},
]

export default function AdminSidebar() {
  return (
    <aside className="w-48 bg-gray-100 dark:bg-gray-900 p-4">
      <nav className="space-y-3">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${
                isActive
                  ? 'bg-gray-300 dark:bg-gray-700 font-semibold'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-800'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
