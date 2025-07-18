import { RefObject, useEffect } from 'react'

export default function useParallax(ref: RefObject<HTMLElement | null>, speed = 0.3) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    let rafId = 0
    const update = () => {
      const offset = window.scrollY
      el.style.transform = `translateY(${offset * speed}px)`
      rafId = 0
    }
    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [ref, speed])
}
