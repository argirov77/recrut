// frontend/src/layouts/ClientLayout.tsx
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ChatModal from '../components/ChatModal'
import { MessageSquare } from 'lucide-react'

export default function ClientLayout() {
  const year = new Date().getFullYear()
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* HEADER */}
      <Navbar />

      {/* MAIN без глобального container — секции сами решают ширину */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* FOOTER с контейнером, чтобы текст не «лип» к краям на широких экранах */}
      <footer className="bg-white dark:bg-gray-800 shadow mt-auto">
        <div className="container mx-auto px-6 py-4 text-center text-gray-500 dark:text-gray-400">
          © {year} Bulstaff. All rights reserved.
        </div>
      </footer>

      {/* Floating chat button visible only on small screens */}
      <button
        onClick={() => setChatOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 rounded-full bg-accentGreen p-4 text-white shadow-lg"
        aria-label="Open chat options"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Modal with messenger links */}
      <ChatModal open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  )
}
