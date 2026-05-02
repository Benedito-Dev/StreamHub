import { useEffect, useRef, useState, type ReactElement } from 'react'
import type { PlatformName } from '@/types/platform'

/* ─── PLATFORM CONFIG ─────────────────────────────────────────── */
type LivePlatform = 'twitch' | 'youtube' | 'kick' | 'trovo'

interface PlatformMeta {
  name: string
  color: string
  muted: string
  text: string
}

const PLATFORMS: Record<LivePlatform, PlatformMeta> = {
  twitch:  { name: 'Twitch',   color: '#9147FF', muted: 'rgba(145,71,255,0.12)', text: '#B881FF' },
  youtube: { name: 'YouTube',  color: '#FF0000', muted: 'rgba(255,0,0,0.12)',    text: '#FF6B6B' },
  kick:    { name: 'Kick',     color: '#53FC18', muted: 'rgba(83,252,24,0.12)',  text: '#7DFF4F' },
  trovo:   { name: 'Trovo',    color: '#1DC34C', muted: 'rgba(29,195,76,0.12)',  text: '#3DDB66' },
}

/* ─── MOCK DATA ───────────────────────────────────────────────── */
function generateViewerHistory(base: number, variance: number, points = 60): number[] {
  const data: number[] = []
  let v = base
  for (let i = 0; i < points; i++) {
    v = Math.max(0, v + (Math.random() - 0.48) * variance)
    data.push(Math.round(v))
  }
  return data
}

const MOCK_LIVE = {
  viewers:          { twitch: 845, youtube: 312, kick: 90, trovo: 47 } as Record<LivePlatform, number>,
  chatActivity:     { twitch: 48,  youtube: 22,  kick: 11, trovo: 4  } as Record<LivePlatform, number>,
  newFollowersLive: { twitch: 87,  youtube: 34,  kick: 9,  trovo: 2  } as Record<LivePlatform, number>,
  peakViewers: 1247,
  liveStart: Date.now() - 83 * 60 * 1000,
  viewerHistory: {
    twitch:  generateViewerHistory(845, 60),
    youtube: generateViewerHistory(312, 30),
    kick:    generateViewerHistory(90,  15),
    trovo:   generateViewerHistory(47,  8),
  } as Record<LivePlatform, number[]>,
}

/* ─── UTILITIES ───────────────────────────────────────────────── */
function fmtNum(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + 'K'
  return n.toLocaleString('pt-BR')
}

function fmtTime(ms: number): string {
  const s   = Math.floor(ms / 1000)
  const h   = Math.floor(s / 3600)
  const m   = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return [h, m, sec].map(n => String(n).padStart(2, '0')).join(':')
}

/* ─── ANIMATED NUMBER ─────────────────────────────────────────── */
interface AnimatedNumberProps {
  value: number
  duration?: number
}

function AnimatedNumber({ value, duration = 600 }: AnimatedNumberProps) {
  const [display, setDisplay] = useState(value)
  const prev = useRef(value)
  const raf  = useRef<number | null>(null)

  useEffect(() => {
    const start     = prev.current
    const end       = value
    const startTime = performance.now()
    const animate   = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(start + (end - start) * eased))
      if (progress < 1) raf.current = requestAnimationFrame(animate)
      else prev.current = end
    }
    raf.current = requestAnimationFrame(animate)
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current)
    }
  }, [value, duration])

  return <span>{fmtNum(display)}</span>
}

/* ─── PLATFORM ICON ───────────────────────────────────────────── */
interface PlatformIconProps {
  platform: LivePlatform
  size?: number
}

function PlatformIcon({ platform, size = 16 }: PlatformIconProps) {
  const p = PLATFORMS[platform]
  const icons: Record<LivePlatform, ReactElement> = {
    twitch: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={p.color}>
        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
      </svg>
    ),
    youtube: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={p.color}>
        <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
      </svg>
    ),
    kick: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={p.color}>
        <path d="M3 2h4v8l5-8h5l-6 10 6 10h-5L7 14v8H3z"/>
      </svg>
    ),
    trovo: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={p.color}>
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3l3 5h-6l3-5zm-5 7h10l-5 8-5-8z"/>
      </svg>
    ),
  }
  return icons[platform]
}

/* ─── LIVE BADGE ──────────────────────────────────────────────── */
interface LiveBadgeProps {
  size?: 'sm' | 'md'
}

function LiveBadge({ size = 'md' }: LiveBadgeProps) {
  const cfg = size === 'sm'
    ? { pad: '2px 8px',  dot: 6, fs: '0.625rem' }
    : { pad: '4px 12px', dot: 8, fs: '0.75rem'  }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
      borderRadius: 9999, padding: cfg.pad,
      fontSize: cfg.fs, fontWeight: 600, color: '#F87171',
      letterSpacing: '0.05em',
    }}>
      <span style={{
        width: cfg.dot, height: cfg.dot, borderRadius: '50%',
        background: '#EF4444', flexShrink: 0,
        animation: 'live-blink 1.2s ease-in-out infinite',
      }} />
      AO VIVO
    </span>
  )
}

/* ─── LINE CHART ──────────────────────────────────────────────── */
interface LineSeries {
  id: string
  color: string
  data: number[]
}

interface LineChartProps {
  series: LineSeries[]
  height?: number
}

function LineChart({ series, height = 200 }: LineChartProps) {
  const W = 600, padL = 8, padR = 8, padT = 8, padB = 8
  const chartW = W - padL - padR
  const chartH = height - padT - padB

  const allVals = series.flatMap(s => s.data)
  const min     = Math.floor(Math.min(...allVals) * 0.9)
  const max     = Math.ceil(Math.max(...allVals)  * 1.1)
  const range   = max - min || 1

  const toX = (i: number, len: number) => padL + (i / (len - 1)) * chartW
  const toY = (v: number) => padT + chartH - ((v - min) / range) * chartH

  return (
    <svg viewBox={`0 0 ${W} ${height}`} style={{ width: '100%', height: '100%' }} preserveAspectRatio="none">
      <defs>
        {series.map(s => (
          <linearGradient key={s.id} id={`llg-${s.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={s.color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={s.color} stopOpacity="0"    />
          </linearGradient>
        ))}
      </defs>
      {[0.25, 0.5, 0.75].map(frac => {
        const y = padT + chartH * frac
        return <line key={frac} x1={padL} y1={y} x2={W - padR} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      })}
      {series.map(s => {
        const pts    = s.data.map((v, i) => [toX(i, s.data.length), toY(v)] as [number, number])
        const lineD  = 'M' + pts.map(([x, y]) => `${x},${y}`).join(' L')
        const areaD  = `M${padL},${padT + chartH} L` + pts.map(([x, y]) => `${x},${y}`).join(' L') + ` L${W - padR},${padT + chartH} Z`
        const lastPt = pts[pts.length - 1]
        return (
          <g key={s.id}>
            <path d={areaD} fill={`url(#llg-${s.id})`} />
            <path d={lineD} fill="none" stroke={s.color} strokeWidth="2"
              strokeLinejoin="round" strokeLinecap="round" />
            <circle cx={lastPt[0]} cy={lastPt[1]} r="4" fill={s.color} />
            <circle cx={lastPt[0]} cy={lastPt[1]} r="7" fill={s.color} opacity="0.2">
              <animate attributeName="r" values="4;9;4" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;0;0.2" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>
        )
      })}
    </svg>
  )
}

/* ─── LIVE SCREEN ─────────────────────────────────────────────── */
interface LiveScreenProps {
  isLive?: boolean
  connectedPlatforms?: LivePlatform[]
}

export function LiveScreen({
  isLive = true,
  connectedPlatforms = ['twitch', 'youtube', 'kick', 'trovo'],
}: LiveScreenProps) {
  const [viewers,      setViewers]      = useState<Record<LivePlatform, number>>({ ...MOCK_LIVE.viewers })
  const [elapsed,      setElapsed]      = useState(Date.now() - MOCK_LIVE.liveStart)
  const [newFollowers, setNewFollowers] = useState<Record<LivePlatform, number>>({ ...MOCK_LIVE.newFollowersLive })
  const [rtData,       setRtData]       = useState<Record<LivePlatform, number[]>>(() => {
    const base = {} as Record<LivePlatform, number[]>
    connectedPlatforms.forEach(p => { base[p] = [...MOCK_LIVE.viewerHistory[p].slice(-30)] })
    return base
  })

  useEffect(() => {
    if (!isLive) return
    const tick = setInterval(() => {
      setElapsed(Date.now() - MOCK_LIVE.liveStart)

      setViewers(prev => {
        const next = {} as Record<LivePlatform, number>
        connectedPlatforms.forEach(p => {
          next[p] = Math.max(0, prev[p] + Math.round((Math.random() - 0.45) * 20))
        })
        return next
      })

      setRtData(prev => {
        const next = {} as Record<LivePlatform, number[]>
        connectedPlatforms.forEach(p => {
          const last   = prev[p][prev[p].length - 1] ?? 0
          const newVal = Math.max(0, last + Math.round((Math.random() - 0.45) * 20))
          next[p] = [...prev[p].slice(-59), newVal]
        })
        return next
      })

      setNewFollowers(prev => {
        const next = { ...prev }
        connectedPlatforms.forEach(p => {
          if (Math.random() < 0.3) next[p] = prev[p] + 1
        })
        return next
      })
    }, 2000)
    return () => clearInterval(tick)
  }, [isLive, connectedPlatforms])

  const totalViewers   = connectedPlatforms.reduce((s, p) => s + (isLive ? viewers[p] : 0), 0)
  const totalFollowers = connectedPlatforms.reduce((s, p) => s + newFollowers[p], 0)
  const totalChat      = connectedPlatforms.reduce((s, p) => s + MOCK_LIVE.chatActivity[p], 0)
  const maxChat        = Math.max(...connectedPlatforms.map(p => MOCK_LIVE.chatActivity[p]))

  const rtSeries: LineSeries[] = connectedPlatforms.map(p => ({
    id: p, color: PLATFORMS[p].color, data: rtData[p] ?? [],
  }))

  if (!isLive) {
    return (
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: 16, padding: 32,
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: 'var(--color-bg-elevated)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
            stroke="var(--color-text-muted)" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M5 5a9.9 9.9 0 0 0 0 14M19 5a9.9 9.9 0 0 1 0 14"/>
            <path d="M8 8a6 6 0 0 0 0 8M16 8a6 6 0 0 1 0 8"/>
          </svg>
        </div>
        <div style={{ textAlign: 'center', maxWidth: 340 }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8 }}>
            Nenhuma live em andamento
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: 20, lineHeight: 1.6 }}>
            Quando você começar uma transmissão, os dados aparecerão aqui em tempo real.
          </p>
          <button style={{
            padding: '10px 24px', borderRadius: 8,
            border: '1px solid rgba(124,58,237,0.4)',
            background: 'rgba(124,58,237,0.1)',
            color: '#A07DFF', cursor: 'pointer',
            fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 600,
          }}>
            Ver Histórico de Lives
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <style>{`
        @keyframes live-blink {
          0%,100% { opacity:1; }
          50%      { opacity:0.25; }
        }
      `}</style>

      <div style={{
        padding: '24px',
        display: 'flex', flexDirection: 'column', gap: 20,
      }}>

        {/* ── HERO CARD ── */}
        <div style={{
          position: 'relative', overflow: 'hidden',
          background: 'var(--color-bg-surface)',
          border: '1px solid rgba(34,211,238,0.3)',
          borderRadius: 16, padding: 24,
          boxShadow: '0 0 0 1px rgba(34,211,238,0.15), 0 0 24px rgba(34,211,238,0.08)',
        }}>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(135deg, rgba(34,211,238,0.04) 0%, rgba(139,92,246,0.04) 100%)',
          }} />

          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 20, position: 'relative',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <LiveBadge />
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '1.125rem',
                color: 'var(--color-text-muted)', letterSpacing: '0.02em',
              }}>
                {fmtTime(elapsed)}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              <span>Pico da live:</span>
              <span style={{
                fontFamily: 'var(--font-mono)', fontWeight: 700,
                color: '#22D3EE', fontSize: '0.875rem',
              }}>
                {fmtNum(MOCK_LIVE.peakViewers)}
              </span>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: 32, alignItems: 'center',
            position: 'relative',
          }}>
            <div>
              <div style={{
                fontSize: '0.625rem', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--color-text-muted)', marginBottom: 6,
              }}>
                Viewers Totais
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '3rem',
                fontWeight: 700, lineHeight: 1,
                color: 'var(--color-text-primary)',
                fontVariantNumeric: 'tabular-nums',
                textShadow: '0 0 40px rgba(139,92,246,0.4)',
              }}>
                <AnimatedNumber value={totalViewers} duration={800} />
              </div>
              <div style={{ display: 'flex', gap: 16, marginTop: 10 }}>
                {connectedPlatforms.map(p => (
                  <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <PlatformIcon platform={p} size={13} />
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.875rem',
                      color: PLATFORMS[p].text, fontWeight: 600,
                    }}>
                      <AnimatedNumber value={viewers[p]} duration={600} />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {([
                { label: 'Novos Seguidores', value: totalFollowers, color: '#22C55E', prefix: '+' as const, display: undefined },
                { label: 'Msgs/min chat',    value: totalChat,      color: '#22D3EE', prefix: ''  as const, display: undefined },
                { label: 'vs live anterior', value: null,           color: '#8B5CF6', prefix: ''  as const, display: '+23%' },
              ] as Array<{ label: string; value: number | null; color: string; prefix: '+' | ''; display?: string }>).map(stat => (
                <div key={stat.label} style={{
                  background: 'var(--color-bg-elevated)',
                  borderRadius: 10, padding: 16, textAlign: 'center',
                }}>
                  <div style={{ fontSize: '0.625rem', color: 'var(--color-text-muted)', marginBottom: 6 }}>{stat.label}</div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '1.875rem',
                    fontWeight: 700, color: stat.color,
                    lineHeight: 1,
                  }}>
                    {stat.display
                      ? stat.display
                      : <>{stat.prefix}<AnimatedNumber value={stat.value as number} /></>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── REALTIME CHART ── */}
        <div style={{
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border-default)',
          borderRadius: 12, padding: 20,
          boxShadow: '0 1px 2px rgba(0,0,0,.4)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 2 }}>Viewers em Tempo Real</h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                Últimos 60 minutos · Atualiza a cada 2s
              </p>
            </div>
            <div style={{ display: 'flex', gap: 14 }}>
              {connectedPlatforms.map(p => (
                <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 8, height: 2, borderRadius: 1, background: PLATFORMS[p].color }} />
                  <span style={{ fontSize: '0.625rem', color: 'var(--color-text-muted)' }}>
                    {PLATFORMS[p].name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ height: 200 }}>
            <LineChart series={rtSeries} height={200} />
          </div>
        </div>

        {/* ── BOTTOM ROW: Chat + New Followers ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

          <div style={{
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border-default)',
            borderRadius: 12, padding: 20,
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 16 }}>Atividade do Chat</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {connectedPlatforms.map(p => {
                const pct = (MOCK_LIVE.chatActivity[p] / maxChat) * 100
                return (
                  <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 20, display: 'flex', justifyContent: 'center' }}>
                      <PlatformIcon platform={p} size={14} />
                    </div>
                    <div style={{
                      flex: 1, height: 6, borderRadius: 9999,
                      background: 'var(--color-bg-elevated)', overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%', width: `${pct}%`,
                        background: PLATFORMS[p].color,
                        borderRadius: 9999,
                        boxShadow: `0 0 6px ${PLATFORMS[p].color}60`,
                        transition: 'width 0.5s cubic-bezier(0.34,1.56,0.64,1)',
                      }} />
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                      color: PLATFORMS[p].text, fontWeight: 600,
                      minWidth: 52, textAlign: 'right',
                    }}>
                      {MOCK_LIVE.chatActivity[p]} msg/m
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div style={{
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border-default)',
            borderRadius: 12, padding: 20,
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 16 }}>Novos Seguidores na Live</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {connectedPlatforms.map(p => (
                <div key={p} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: 6,
                      background: PLATFORMS[p].muted,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <PlatformIcon platform={p} size={13} />
                    </div>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                      {PLATFORMS[p].name}
                    </span>
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '1.5rem',
                    fontWeight: 700, color: '#22C55E',
                  }}>
                    +<AnimatedNumber value={newFollowers[p]} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export type { LivePlatform }
export type LiveScreenPlatformName = Extract<PlatformName, LivePlatform>
