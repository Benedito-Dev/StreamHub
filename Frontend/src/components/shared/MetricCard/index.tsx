import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/Badge'
import { formatNumber } from '@/utils/formatters'
import styles from './MetricCard.module.css'

interface MetricCardProps {
  label: string
  value: number | string
  delta?: number
  sublabel?: string
  icon?: ReactNode
  loading?: boolean
}

export function MetricCard({ label, value, delta, sublabel, icon, loading = false }: MetricCardProps) {
  if (loading) {
    return (
      <div className={`${styles.card} ${styles.skeleton}`}>
        <div className={styles.header}><span className={styles.label}>loading</span></div>
        <span className={styles.value}>loading</span>
      </div>
    )
  }

  const displayValue = typeof value === 'number' ? formatNumber(value) : value
  const deltaVariant = delta !== undefined ? (delta >= 0 ? 'delta-positive' : 'delta-negative') : undefined
  const deltaLabel = delta !== undefined ? `${delta >= 0 ? '+' : ''}${delta.toFixed(1)}%` : undefined

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        {icon}
      </div>
      <span className={styles.value}>{displayValue}</span>
      <div className={styles.footer}>
        {deltaVariant && deltaLabel && (
          <Badge variant={deltaVariant}>{deltaLabel}</Badge>
        )}
        {sublabel && <span className={styles.sublabel}>{sublabel}</span>}
      </div>
    </div>
  )
}
