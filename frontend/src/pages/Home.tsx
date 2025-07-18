// frontend/src/pages/Home.tsx
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import JobList from '../components/JobList'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Chat from '../components/Chat'
import AnimatedSection from '../components/AnimatedSection'
import ParallaxSection from '../components/ParallaxSection'

export default function Home() {
  return (
    <>
      
      <AnimatedSection id="hero">
        <Hero />
      </AnimatedSection>
      <ParallaxSection
        speed={0.15}
        id="about"
        className="snap-start h-[60vh] bg-[url('/images/about-bg.jpg')] bg-cover bg-center"
      >
        <About />
      </ParallaxSection>
      <AnimatedSection id="services">
        <Services />
      </AnimatedSection>
      <AnimatedSection id="jobs">
        <JobList />
      </AnimatedSection>
      <AnimatedSection id="testimonials">
        <Testimonials />
      </AnimatedSection>
      <AnimatedSection id="contact">
        <Contact />
      </AnimatedSection>
      <Chat />
    </>
  )
}
