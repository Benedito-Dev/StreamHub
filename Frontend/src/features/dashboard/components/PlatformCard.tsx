import { useState } from 'react'
import { MOCK, PLATFORMS, fmtNum, type DashPlatform } from '../data/mock'
import { LiveBadge } from './LiveBadge'
import { Sparkline } from './Sparkline'
import { PlatformIcon } from './PlatformIcon'

interface PlatformCardProps {
  platform: DashPlatform
  isLive: boolean
  viewers: number
  followers: number
  growth7d: number
  onSelect?: (p: DashPlatform) => void
}

export function PlatformCard({
  platform, isLive, viewers, followers, growth7d, onSelect,
}: PlatformCardProps) {
  const p = PLATFORMS[platform]
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border-default)',
        borderLeft: `3px solid ${p.color}`,
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-5)',
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        cursor: 'pointer',
        transition: 'all 0.2s var(--easing-default)',
        transform: hovered ? 'translateY(-1px)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect?.(platform)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28,
            borderRadius: 'var(--radius-md)', background: p.muted,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <PlatformIcon platform={platform} size={16} />
          </div>
          <span style={{ fontWeight: 600, fontSize: 'var(--text-md)' }}>{p.name}</span>
        </div>
        {isLive ? <LiveBadge size="sm" /> : (
          <span style={{
            fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)',
            background: 'var(--color-bg-elevated)', padding: '2px 8px',
            borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border-default)',
          }}>
            Offline
          </span>
        )}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 2 }}>Seguidores</div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 'var(--text-lg)',
            color: 'var(--color-text-primary)',
          }}>
            {fmtNum(followers)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 2 }}>Viewers agora</div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 'var(--text-lg)',
            color: isLive ? p.text : 'var(--color-text-muted)',
          }}>
            {isLive ? fmtNum(viewers) : '—'}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 2 }}>Crescimento 7d</div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 'var(--text-base)',
            color: 'var(--color-success-500)',
          }}>
            +{fmtNum(growth7d)}
          </div>
        </div>
        <div>
          <Sparkline
            data={MOCK.viewerHistory[platform].slice(-20)}
            color={p.color}
            height={28}
            width={60}
          />
        </div>
      </div>
    </div>
  )
}
