import { useRef, HTMLAttributes } from 'react';
import useParallax from '../hooks/useParallax';

export default function ParallaxSection(
  props: HTMLAttributes<HTMLDivElement> & { speed?: number }
) {
  const ref = useRef<HTMLDivElement | null>(null);
  useParallax(ref, props.speed ?? 0.3);
  return (
    <section
      ref={ref}
      className={`relative overflow-hidden ${props.className ?? ''}`}
      {...props}
    />
  );
}
