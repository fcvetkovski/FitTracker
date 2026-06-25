import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
}

export function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <button className={`btn btn-${variant} ${className}`.trim()} type="button" {...props}>
      {children}
    </button>
  )
}
