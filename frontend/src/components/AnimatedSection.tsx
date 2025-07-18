import { useRef, HTMLAttributes } from 'react';
import useScrollFade from '../hooks/useScrollFade';

export default function AnimatedSection(props: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement | null>(null);
  useScrollFade(ref);
  return (
    <section
      ref={ref}
      className={`opacity-0 snap-start ${props.className ?? ''}`}
      {...props}
    />
  );
}
