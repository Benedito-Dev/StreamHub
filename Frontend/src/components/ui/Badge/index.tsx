import type { ReactNode } from 'react'
import type { PlatformName } from '@/types/platform'
import styles from './Badge.module.css'

type BadgeVariant =
  | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  | 'delta-positive' | 'delta-negative'
  | 'plan-free' | 'plan-pro' | 'plan-agency'
  | 'live'
  | PlatformName

interface BadgeProps {
  variant: BadgeVariant
  children: ReactNode
  className?: string
}

const variantClassMap: Record<string, string> = {
  'success':       styles.success,
  'warning':       styles.warning,
  'error':         styles.error,
  'info':          styles.info,
  'neutral':       styles.neutral,
  'delta-positive':styles.deltaPositive,
  'delta-negative':styles.deltaNegative,
  'plan-free':     styles.planFree,
  'plan-pro':      styles.planPro,
  'plan-agency':   styles.planAgency,
  'live':          styles.live,
  'youtube':       styles.youtube,
  'twitch':        styles.twitch,
  'kick':          styles.kick,
  'trovo':         styles.trovo,
  'tiktok':        styles.tiktok,
  'patreon':       styles.patreon,
}

export function Badge({ variant, children, className }: BadgeProps) {
  const cls = [styles.badge, variantClassMap[variant] ?? styles.neutral, className].filter(Boolean).join(' ')
  return (
    <span className={cls}>
      {variant === 'live' && <span className={styles.liveDot} aria-hidden="true" />}
      {children}
    </span>
  )
}
