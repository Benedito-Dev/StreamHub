import type { PlatformName } from '@/types/platform'
import { Badge } from '@/components/ui/Badge'
import { formatNumber } from '@/utils/formatters'
import styles from './PlatformBadge.module.css'

interface PlatformMetricItem {
  label: string
  value: number | string
  color?: string
}

interface PlatformCardProps {
  platform: PlatformName
  label: string
  color: string
  status: 'active' | 'offline' | 'error'
  metrics: [PlatformMetricItem, PlatformMetricItem, PlatformMetricItem, PlatformMetricItem]
  onViewMore?: () => void
}

const statusMap = {
  active:  'success',
  offline: 'neutral',
  error:   'error',
} as const

const statusLabel = {
  active:  'Ativo',
  offline: 'Offline',
  error:   'Erro',
}

export function PlatformCard({ platform, label, color, status, metrics, onViewMore }: PlatformCardProps) {
  return (
    <div className={styles.card} style={{ borderLeftColor: color }}>
      <div className={styles.header}>
        <div className={styles.platformInfo}>
          <span className={styles.platformDot} style={{ backgroundColor: color }} />
          <span className={styles.platformName}>{label}</span>
        </div>
        <Badge variant={statusMap[status]}>{statusLabel[status]}</Badge>
      </div>

      <div className={styles.metricsGrid}>
        {metrics.map((m) => (
          <div key={m.label} className={styles.metric}>
            <span className={styles.metricLabel}>{m.label}</span>
            <span
              className={styles.metricValue}
              style={{ color: m.color ?? `var(--color-${platform}-text)` }}
            >
              {typeof m.value === 'number' ? formatNumber(m.value) : m.value}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <button className={styles.viewMore} onClick={onViewMore}>
          Ver detalhes →
        </button>
      </div>
    </div>
  )
}
