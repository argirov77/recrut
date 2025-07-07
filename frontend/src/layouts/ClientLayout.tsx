// frontend/src/layouts/ClientLayout.tsx
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { ThemeToggle } from '../components/ui/ThemeToggle'
import LanguageSwitcher from '../components/LanguageSwitcher' // ваш компонент для выбора языка

const publicNavLinks = [
  { to: '/',         label: 'Home'     },
  { to: '/about',    label: 'About'    },
  { to: '/services', label: 'Services' },
  { to: '/jobs',     label: 'Jobs'     },
  { to: '/contact',  label: 'Contact'  },
] as const

export default function ClientLayout() {
  const year = new Date().getFullYear()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* HEADER */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Логотип или название */}
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">HR Agency</h1>
          
          {/* Основное меню */}
          <nav className="flex space-x-6">
            {publicNavLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Тогглер темы и селектор языка */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 container mx-auto px-6 py-8">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-white dark:bg-gray-800 shadow mt-auto">
        <div className="container mx-auto px-6 py-4 text-center text-gray-500 dark:text-gray-400">
          © {year} HR Agency. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
