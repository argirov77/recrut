// frontend/src/pages/Home.tsx
import Hero         from '../components/Hero'
import About        from '../components/About'
import Services     from '../components/Services'
import JobList      from '../components/JobList'
import Testimonials from '../components/Testimonials'
import Contact      from '../components/Contact'
import MessengerContacts from '../components/MessengerContacts'

export default function Home() {
  return (
    <>
      <section id="hero"><Hero /></section>
      <section id="about"><About /></section>
      <section id="services"><Services /></section>
      <section id="jobs"><JobList /></section>
      <section id="testimonials"><Testimonials /></section>
      <section id="contact"><Contact /></section>
      <MessengerContacts />
    </>
  )
}
