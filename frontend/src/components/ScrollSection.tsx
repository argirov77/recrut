// src/components/ScrollSection.tsx
import { useRef } from 'react';
import useReveal from '../hooks/useReveal';

type Props = React.HTMLAttributes<HTMLDivElement>;

export default function ScrollSection({ className = '', ...rest }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  useReveal(ref);                            // ✔️ типы без ошибки

  return (
    <section
      ref={ref}
      className={`section-transition ${className}`}
      {...rest}
    />
  );
}
