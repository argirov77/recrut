// src/hooks/useReveal.ts
import { RefObject, useEffect } from 'react'

/**
 * Добавляет/убирает класс .is-active,
 * когда элемент появляется в области видимости.
 */
export default function useReveal<T extends HTMLElement>(ref: RefObject<T | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        entry.target.classList.toggle('is-active', entry.intersectionRatio >= 0.25)
      },
      { threshold: 0.25, root: document.querySelector('main') }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [ref])
}
