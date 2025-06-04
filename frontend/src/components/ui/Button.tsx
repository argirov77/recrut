// frontend/src/components/ui/Button.tsx
import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: ButtonProps) {
  const baseStyles = "px-6 py-2 rounded font-medium transition";
  const variants = {
    primary: "bg-accent text-white hover:bg-accent-dark",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    ghost: "bg-transparent text-accent hover:text-accent-dark",
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
