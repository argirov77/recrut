import { RefObject, useEffect } from 'react'

export default function useScrollFade(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('animate-fade-up')
        } else {
          el.classList.remove('animate-fade-up')
        }
      },
      { root: null, threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
}
