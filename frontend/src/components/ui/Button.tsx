// frontend/src/components/ui/Button.tsx
import React from 'react'
import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  children: React.ReactNode
}

export default function Button({ variant = 'primary', className, children, ...rest }: ButtonProps) {
  const baseStyles = 'px-6 py-2 rounded font-medium transition'
  const variants = {
    primary: 'bg-accentRed text-white hover:bg-accentRed/90',
    secondary: 'bg-accentGreen text-white hover:bg-accentGreen/90',
    ghost: 'bg-transparent text-accentCyan hover:text-accentCyan/80',
  }

  return (
    <button className={clsx(baseStyles, variants[variant], className)} {...rest}>
      {children}
    </button>
  )
}
