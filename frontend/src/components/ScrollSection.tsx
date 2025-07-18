import { useRef, HTMLAttributes } from 'react';
import useScrollFade from '../hooks/useScrollFade';

export default function ScrollSection(props: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement | null>(null);
  useScrollFade(ref);
  return (
    <section
      ref={ref}
      className={`snap-start ${props.className ?? ''}`}
      {...props}
    />
  );
}
