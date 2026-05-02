import { useState, type CSSProperties, type ReactNode } from 'react'
import { PLATFORMS, type DashPlatform } from '../data/mock'
import { AnimatedNumber } from './AnimatedNumber'
import { Sparkline } from './Sparkline'
import { PlatformIcon } from './PlatformIcon'

interface MetricCardProps {
  label: string
  value: number | string
  delta?: number
  deltaLabel?: string
  platform?: DashPlatform
  sparkData?: number[]
  loading?: boolean
  icon?: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export function MetricCard({
  label, value, delta, deltaLabel, platform, sparkData, loading, icon, size = 'md',
}: MetricCardProps) {
  const [hovered, setHovered] = useState(false)
  const p = platform ? PLATFORMS[platform] : null

  const valueFontSize: CSSProperties['fontSize'] =
    size === 'lg' ? 'var(--text-4xl)' : size === 'sm' ? 'var(--text-xl)' : 'var(--text-3xl)'

  return (
    <div
      style={{
        background: 'var(--color-bg-surface)',
        border: '1px solid',
        borderColor: hovered ? 'var(--color-border-strong)' : 'var(--color-border-default)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-5)',
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        display: 'flex', flexDirection: 'column', gap: 12,
        transition: 'border-color 0.2s, box-shadow 0.2s',
        cursor: 'default',
        minWidth: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{
          fontSize: 'var(--text-xs)', fontWeight: 600,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
        }}>
          {label}
        </span>
        {p && platform && (
          <div style={{
            background: p.muted, borderRadius: 'var(--radius-sm)', padding: '2px 4px',
          }}>
            <PlatformIcon platform={platform} size={14} />
          </div>
        )}
        {icon && !p && <span style={{ fontSize: 18, opacity: 0.7 }}>{icon}</span>}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8 }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: valueFontSize,
            fontWeight: 700, lineHeight: 1,
            color: 'var(--color-text-primary)',
            fontVariantNumeric: 'tabular-nums',
          }}>
            {loading
              ? <div style={{
                  width: 80, height: 28,
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--color-bg-elevated)',
                  animation: 'shimmer 1.5s infinite',
                  backgroundSize: '200% 100%',
                  backgroundImage: 'linear-gradient(90deg, var(--color-bg-elevated) 0%, var(--color-neutral-700) 50%, var(--color-bg-elevated) 100%)',
                }} />
              : <AnimatedNumber value={typeof value === 'number' ? value : 0} />
            }
          </div>
          {delta !== undefined && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
              <span style={{
                fontSize: 'var(--text-xs)', fontWeight: 600,
                color: delta >= 0 ? 'var(--color-success-500)' : 'var(--color-error-500)',
                fontFamily: 'var(--font-mono)',
              }}>
                {delta >= 0 ? '▲' : '▼'} {Math.abs(delta).toLocaleString('pt-BR')}
              </span>
              {deltaLabel && (
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                  {deltaLabel}
                </span>
              )}
            </div>
          )}
        </div>
        {sparkData && (
          <Sparkline data={sparkData} color={p ? p.color : '#8B5CF6'} height={36} width={70} />
        )}
      </div>
    </div>
  )
}
