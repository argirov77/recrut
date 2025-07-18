// frontend/src/App.tsx
import { BrowserRouter } from 'react-router-dom'

// Ваши компоненты
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import JobList from './components/JobList'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Chat from './components/Chat'
import Footer from './components/Footer'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Navbar />

        <main className="flex-1">
          <Hero />
          <About />
          <Services />
          <JobList />
          <Testimonials />
          <Contact />
          <Chat />
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}
