import { PLATFORMS, type Insight, type InsightType } from '../data/mock'
import { PlatformIcon } from './PlatformIcon'

interface InsightStyle {
  border: string
  bg: string
  text: string
}

const STYLES: Record<InsightType, InsightStyle> = {
  positive: { border: 'var(--color-success-500)', bg: 'rgba(34,197,94,0.06)',  text: 'var(--color-success-500)' },
  warning:  { border: 'var(--color-warning-500)', bg: 'rgba(245,158,11,0.06)', text: 'var(--color-warning-500)' },
  info:     { border: 'var(--color-info-500)',    bg: 'rgba(59,130,246,0.06)', text: 'var(--color-info-500)'    },
}

interface InsightCardProps {
  insight: Insight
}

export function InsightCard({ insight }: InsightCardProps) {
  const c = STYLES[insight.type] ?? STYLES.info
  const p = PLATFORMS[insight.platform]
  return (
    <div style={{
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border-default)',
      borderTop: `2px solid ${c.border}`,
      borderRadius: 'var(--radius-xl)',
      padding: 'var(--space-5)',
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>{insight.icon}</span>
          <span style={{ fontWeight: 600, fontSize: 'var(--text-md)' }}>{insight.title}</span>
        </div>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', fontWeight: 700,
          color: c.text, background: c.bg,
          padding: '2px 8px', borderRadius: 'var(--radius-full)',
          border: `1px solid ${c.border}40`, whiteSpace: 'nowrap',
        }}>
          {insight.metric}
        </span>
      </div>
      <p style={{
        fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)',
        lineHeight: 1.5, marginBottom: 10,
      }}>
        {insight.desc}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          background: p.muted, padding: '2px 8px', borderRadius: 'var(--radius-full)',
        }}>
          <PlatformIcon platform={insight.platform} size={10} />
          <span style={{ fontSize: 'var(--text-xs)', color: p.text, fontWeight: 600 }}>{p.name}</span>
        </div>
        <button style={{
          background: 'none', border: 'none',
          color: 'var(--color-text-brand)',
          fontSize: 'var(--text-sm)', fontWeight: 500,
          cursor: 'pointer', padding: 0,
          fontFamily: 'var(--font-sans)',
        }}>
          Ver detalhes →
        </button>
      </div>
    </div>
  )
}
