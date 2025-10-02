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
  const baseStyles =
    "inline-flex items-center gap-2 rounded-lg px-6 py-2 font-medium transition focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed";
  const variants = {
    primary:
      "bg-accentGreen text-white hover:bg-accentGreen/90 focus:ring-2 focus:ring-offset-2 focus:ring-accentCyan",
    secondary:
      "border border-gray-200 bg-white text-primary hover:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-accentCyan",
    ghost:
      "text-primary hover:bg-accentCyan/10 focus:ring-2 focus:ring-offset-2 focus:ring-accentCyan",
  } as const;

  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
