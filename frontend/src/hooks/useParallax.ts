import { RefObject, useEffect } from 'react'

export default function useParallax(ref: RefObject<HTMLElement | null>, speed = 0.3) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const main = document.querySelector('main')
    if (!main) return
    const onScroll = () => {
      const offset = main.scrollTop
      el.style.transform = `translateY(${offset * speed}px)`
    }
    main.addEventListener('scroll', onScroll, { passive: true })
    return () => main.removeEventListener('scroll', onScroll)
  }, [ref, speed])
}
