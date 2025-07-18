import { RefObject, useEffect } from 'react';

export default function useParallax(
  ref: RefObject<HTMLElement | null>,
  speed = 0.3
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const offset = window.pageYOffset;
      el.style.transform = `translateY(${offset * speed}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref, speed]);
}
