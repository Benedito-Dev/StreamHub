import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'ghost-brand' | 'danger' | 'outline-brand'
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  fullWidth?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  children?: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const variantKey = variant === 'ghost-brand' ? 'ghostBrand' : variant === 'outline-brand' ? 'outlineBrand' : variant

  const cls = [
    styles.btn,
    styles[size],
    styles[variantKey as keyof typeof styles],
    loading ? styles.loading : '',
    fullWidth ? styles.fullWidth : '',
    className ?? '',
  ].filter(Boolean).join(' ')

  return (
    <button className={cls} disabled={disabled ?? loading} {...props}>
      {loading ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : leftIcon}
      {children && <span>{children}</span>}
      {!loading && rightIcon}
    </button>
  )
}
