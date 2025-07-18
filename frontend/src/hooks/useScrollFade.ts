import { RefObject, useEffect } from 'react'

export default function useScrollFade(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('opacity-100', 'translate-y-0', 'scale-1')
        } else {
          el.classList.remove('opacity-100', 'translate-y-0', 'scale-1')
        }
      },
      { root: null, threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
}
