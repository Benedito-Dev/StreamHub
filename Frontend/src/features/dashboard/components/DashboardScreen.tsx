import { useState } from 'react'
import { MOCK, PLATFORMS, fmtNum, type DashPlatform } from '../data/mock'
import { MetricCard } from './MetricCard'
import { PlatformCard } from './PlatformCard'
import { PlatformIcon } from './PlatformIcon'
import { LineChart, type LineSeries } from './LineChart'
import { LiveBadge } from './LiveBadge'
import { ScoreRing } from './ScoreRing'
import { InsightCard } from './InsightCard'
import { PeriodSelector, type Period } from './PeriodSelector'

interface DashboardScreenProps {
  isLive?: boolean
  connectedPlatforms?: DashPlatform[]
}

export function DashboardScreen({
  isLive = true,
  connectedPlatforms = ['twitch', 'youtube', 'kick', 'trovo'],
}: DashboardScreenProps) {
  const [period, setPeriod] = useState<Period>('30d')

  const totalViewers   = connectedPlatforms.reduce((s, p) => s + (isLive ? MOCK.viewers[p] : 0), 0)
  const totalFollowers = connectedPlatforms.reduce((s, p) => s + MOCK.followers[p], 0)
  const totalGrowth    = connectedPlatforms.reduce((s, p) => s + MOCK.followerGrowth7d[p], 0)

  const growthSeries: LineSeries[] = connectedPlatforms.map(plat => ({
    id: plat,
    color: PLATFORMS[plat].color,
    data: MOCK.growthData[plat].map(d => d.value),
  }))

  return (
    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

        {/* Hero metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
          <MetricCard label="Viewers Agora"      value={totalViewers}   delta={isLive ? 47 : undefined}            deltaLabel="desde ontem"     size="md" />
          <MetricCard label="Total Seguidores"   value={totalFollowers} delta={totalGrowth}                        deltaLabel="em 7 dias"       size="md" />
          <MetricCard label="Crescimento 7d"     value={totalGrowth}    delta={Math.round(totalGrowth * 0.184)}     deltaLabel="vs semana ant."  size="md" />
          <div style={{
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border-default)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-5)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex', alignItems: 'center', gap: 16,
          }}>
            <ScoreRing score={MOCK.score} size={70} />
            <div>
              <div style={{
                fontSize: 'var(--text-xs)', fontWeight: 600,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: 'var(--color-text-muted)', marginBottom: 4,
              }}>
                StreamHub Score
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                Excelente performance esta semana
              </div>
              <div style={{
                fontSize: 'var(--text-xs)', color: 'var(--color-success-500)',
                marginTop: 4, fontFamily: 'var(--font-mono)',
              }}>
                ▲ +3 pontos
              </div>
            </div>
          </div>
        </div>

        {/* Live now */}
        {isLive && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <LiveBadge />
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>Transmitindo agora</h2>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 'var(--space-3)',
            }}>
              {connectedPlatforms.map(plat => (
                <MetricCard
                  key={plat}
                  label={`${PLATFORMS[plat].name} Viewers`}
                  value={MOCK.viewers[plat]}
                  platform={plat}
                  sparkData={MOCK.viewerHistory[plat].slice(-20)}
                  size="sm"
                />
              ))}
            </div>
          </div>
        )}

        {/* Platform cards */}
        <div>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 12 }}>Plataformas</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-4)',
          }}>
            {connectedPlatforms.map(plat => (
              <PlatformCard
                key={plat}
                platform={plat}
                isLive={isLive}
                viewers={MOCK.viewers[plat]}
                followers={MOCK.followers[plat]}
                growth7d={MOCK.followerGrowth7d[plat]}
              />
            ))}
          </div>
        </div>

        {/* Growth chart */}
        <div style={{
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border-default)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-5)',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: 16,
          }}>
            <div>
              <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>Evolução de Seguidores</h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginTop: 2 }}>
                Crescimento consolidado por plataforma
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', gap: 12 }}>
                {connectedPlatforms.map(plat => (
                  <div key={plat} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 8, height: 2, borderRadius: 1, background: PLATFORMS[plat].color }} />
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                      {PLATFORMS[plat].name}
                    </span>
                  </div>
                ))}
              </div>
              <PeriodSelector value={period} onChange={setPeriod} />
            </div>
          </div>
          <div style={{ height: 220 }}>
            <LineChart series={growthSeries} height={200} showGrid showLabels />
          </div>
        </div>

        {/* Insights */}
        <div>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: 12,
          }}>
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>Insights Recentes</h2>
            <button style={{
              background: 'none', border: 'none', color: 'var(--color-text-brand)',
              fontSize: 'var(--text-sm)', fontWeight: 500, cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
            }}>
              Ver todos →
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
            {MOCK.insights.map(ins => <InsightCard key={ins.id} insight={ins} />)}
          </div>
        </div>

        {/* Recent lives */}
        <div style={{
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border-default)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{
            padding: 'var(--space-5)',
            borderBottom: '1px solid var(--color-border-subtle)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>Lives Recentes</h2>
            <button style={{
              background: 'none', border: 'none', color: 'var(--color-text-brand)',
              fontSize: 'var(--text-sm)', fontWeight: 500, cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
            }}>
              Ver histórico →
            </button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--color-bg-elevated)' }}>
                {['Data', 'Plataformas', 'Duração', 'Pico Viewers', 'Novos Segs', 'Score'].map(h => (
                  <th key={h} style={{
                    padding: '10px 20px', textAlign: 'left',
                    fontSize: 'var(--text-xs)', fontWeight: 600,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                    color: 'var(--color-text-muted)',
                    borderBottom: '1px solid var(--color-border-subtle)',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK.recentLives.map((live, i) => (
                <tr
                  key={live.id}
                  style={{
                    borderBottom: i < MOCK.recentLives.length - 1
                      ? '1px solid var(--color-border-subtle)'
                      : 'none',
                    cursor: 'pointer',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-bg-elevated)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '' }}
                >
                  <td style={{
                    padding: '12px 20px',
                    fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)',
                    color: 'var(--color-text-secondary)',
                  }}>
                    {live.date}
                  </td>
                  <td style={{ padding: '12px 20px' }}>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {live.platforms.map(p => (
                        <div key={p} style={{
                          width: 18, height: 18,
                          borderRadius: 'var(--radius-sm)',
                          background: PLATFORMS[p].muted,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <PlatformIcon platform={p} size={10} />
                        </div>
                      ))}
                    </div>
                  </td>
                  <td style={{
                    padding: '12px 20px',
                    fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)',
                    color: 'var(--color-text-secondary)',
                  }}>
                    {live.duration}
                  </td>
                  <td style={{
                    padding: '12px 20px',
                    fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)',
                    fontWeight: 600, color: 'var(--color-text-primary)',
                  }}>
                    {fmtNum(live.peak)}
                  </td>
                  <td style={{
                    padding: '12px 20px',
                    fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)',
                    color: 'var(--color-success-500)',
                  }}>
                    +{live.newFollowers}
                  </td>
                  <td style={{ padding: '12px 20px' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)',
                      fontWeight: 700,
                      color: live.score >= 85
                        ? 'var(--color-brand-400)'
                        : live.score >= 75 ? 'var(--color-accent-400)' : 'var(--color-text-secondary)',
                      background: live.score >= 85
                        ? 'rgba(139,92,246,0.1)'
                        : 'var(--color-bg-elevated)',
                      padding: '2px 8px', borderRadius: 'var(--radius-full)',
                    }}>
                      {live.score}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}
