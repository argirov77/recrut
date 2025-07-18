import { useRef, HTMLAttributes } from 'react';
import useScrollFade from '../hooks/useScrollFade';

export default function ScrollSection(props: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement | null>(null);
  useScrollFade(ref);
  return (
    <section
      ref={ref}
      className={`opacity-0 transform translate-y-6 scale-[0.98] transition-all duration-700 ease-out snap-start ${props.className ?? ''}`}
      {...props}
    />
  );
}
