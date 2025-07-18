import { HTMLAttributes } from 'react'
import { useInView } from 'react-intersection-observer'

export default function AnimatedSection(props: HTMLAttributes<HTMLDivElement>) {
  const { ref, inView } = useInView({ threshold: 0.2 })

  return (
    <section
      ref={ref}
      className={`transition-all duration-700 ease-out snap-start ${
        inView ? 'animate-fade-up' : 'opacity-0 translate-y-6 scale-[0.98]'
      } ${props.className ?? ''}`}
      {...props}
    />
  )
}
