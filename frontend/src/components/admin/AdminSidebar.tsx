import { NavLink } from 'react-router-dom'

const links = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/jobs',      label: 'Jobs'      },
  { to: '/admin/forms',     label: 'Applicants'},
  { to: '/admin/security',  label: 'Security'  },
]

export default function AdminSidebar() {
  return (
    <aside className="w-56 bg-white border-r border-gray-200 p-6">
      <nav className="space-y-2">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-accentCyan/10 text-accentGreen'
                  : 'text-gray-700 hover:bg-gray-100'
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
