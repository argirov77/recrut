import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import JobList from './components/JobList'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MessengerContacts from './components/MessengerContacts'

export default function App() {
  useEffect(() => {
    // Включаем плавное скроллирование по якорям (anchor links)
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <JobList />
        <Testimonials />
        <Contact />
        <MessengerContacts />
      </main>

      <Footer />
    </div>
  )
}
