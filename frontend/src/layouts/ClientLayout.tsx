// frontend/src/layouts/ClientLayout.tsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import { ThemeToggle } from '../components/ui/ThemeToggle'
import Navbar from '../components/Navbar'

export default function ClientLayout() {
  const year = new Date().getFullYear()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* HEADER */}
      <Navbar />
      <div className="container mx-auto px-6 py-4 flex justify-end">
        <ThemeToggle />
      </div>

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
