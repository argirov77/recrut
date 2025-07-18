import { useRef, HTMLAttributes } from 'react';
import useScrollFade from '../hooks/useScrollFade';

// This component animates its children into view.
// Documentation refers to it as `AnimatedSection`.

export default function ScrollSection(props: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement | null>(null);
  useScrollFade(ref);
  return (
    <section
      ref={ref}
      className={`opacity-0 transform translate-y-6 scale-[0.98] transition-all duration-700 ease-out ${props.className ?? ''}`}
      {...props}
    />
  );
}
