// frontend/src/components/ui/Textarea.tsx
import React from 'react'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

/**
 * Простой компонент многострочного ввода с опциональной подписью
 */
export default function Textarea({ label, className = '', ...props }: TextareaProps) {
  return (
    <div className={className}>
      {label && (
        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">{label}</label>
      )}
      <textarea
        className="
          w-full
          border
          rounded
          px-3
          py-2
          focus:outline-none
          focus:ring
          focus:border-accentCyan
          dark:bg-gray-800
          dark:border-gray-700
          dark:text-gray-100
        "
        {...props}
      />
    </div>
  )
}
