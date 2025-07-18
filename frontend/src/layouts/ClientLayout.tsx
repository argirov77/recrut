// frontend/src/layouts/ClientLayout.tsx
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ThemeToggle } from '../components/ui/ThemeToggle';

export default function ClientLayout() {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* HEADER */}
      <Navbar />

      {/* Плавающий тумблер темы — всегда в правом‑верхнем углу */}
      <div className="fixed right-6 top-24 z-50">
        <ThemeToggle />
      </div>

      {/* MAIN без глобального container — секции сами решают ширину */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* FOOTER с контейнером, чтобы текст не «лип» к краям на широких экранах */}
      <footer className="bg-white dark:bg-gray-800 shadow mt-auto">
        <div className="container mx-auto px-6 py-4 text-center text-gray-500 dark:text-gray-400">
          © {year} HR Agency. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
