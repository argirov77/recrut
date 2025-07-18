// frontend/src/pages/Home.tsx
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import JobList from '../components/JobList'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Chat from '../components/Chat'
import ScrollSection from '../components/ScrollSection'
import ParallaxSection from '../components/ParallaxSection'

export default function Home() {
  return (
    <>
      
      <ScrollSection id="hero">
        <Hero />
      </ScrollSection>
      <ParallaxSection
        speed={0.15}
        id="about"
        className="snap-start h-[60vh] bg-[url('/images/about-bg.jpg')] bg-cover bg-center"
      >
        <About />
      </ParallaxSection>
      <ScrollSection id="services">
        <Services />
      </ScrollSection>
      <ScrollSection id="jobs">
        <JobList />
      </ScrollSection>
      <ScrollSection id="testimonials">
        <Testimonials />
      </ScrollSection>
      <ScrollSection id="contact">
        <Contact />
      </ScrollSection>
      <Chat />
    </>
  )
}
