import { RefObject, useEffect } from 'react'

export default function useScrollFade(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('animate-fade-up')
          el.classList.remove('animate-fade-down')
        } else {
          el.classList.add('animate-fade-down')
          el.classList.remove('animate-fade-up')
        }
      },
      { threshold: 0.3, root: document.querySelector('main') }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
}
