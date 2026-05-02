import { useState } from 'react'
import {
  MOCK, PLATFORMS, fmtNum,
  type DashPlatform,
} from '@/features/dashboard/data/mock'
import { MetricCard } from '@/features/dashboard/components/MetricCard'
import { PlatformIcon } from '@/features/dashboard/components/PlatformIcon'
import { LineChart, type LineSeries } from '@/features/dashboard/components/LineChart'
import { BarChart, type BarDatum } from '@/features/dashboard/components/BarChart'
import { Heatmap } from '@/features/dashboard/components/Heatmap'
import { Sparkline } from '@/features/dashboard/components/Sparkline'
import { PeriodSelector, type Period } from '@/features/dashboard/components/PeriodSelector'

interface GrowthScreenProps {
  connectedPlatforms?: DashPlatform[]
}

export function GrowthScreen({
  connectedPlatforms = ['twitch', 'youtube', 'kick', 'trovo'],
}: GrowthScreenProps) {
  const [period, setPeriod] = useState<Period>('30d')
  const [activePlatforms, setActivePlatforms] = useState<DashPlatform[]>(connectedPlatforms)

  const togglePlatform = (plat: DashPlatform) => {
    setActivePlatforms(prev => prev.includes(plat) ? prev.filter(p => p !== plat) : [...prev, plat])
  }

  const growthSeries: LineSeries[] = activePlatforms.map(plat => ({
    id: plat,
    color: PLATFORMS[plat].color,
    data: MOCK.growthData[plat].map(d => d.value),
  }))

  const barData: BarDatum[] = connectedPlatforms.map(plat => ({
    label: PLATFORMS[plat].name,
    value: MOCK.followerGrowth7d[plat],
    color: PLATFORMS[plat].color,
  }))

  const totalCurrent = connectedPlatforms.reduce((s, p) => s + MOCK.followers[p], 0)
  const totalGrowth  = connectedPlatforms.reduce((s, p) => s + MOCK.followerGrowth7d[p], 0)

  return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

        {/* Top metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
          <MetricCard label="Total de Seguidores"      value={totalCurrent} size="md" />
          <MetricCard label="Crescimento no Período"   value={totalGrowth}  delta={214} deltaLabel="vs período ant." size="md" />
          <div style={{
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border-default)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-5)',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 36, height: 36,
              borderRadius: 'var(--radius-lg)',
              background: PLATFORMS[connectedPlatforms[0]].muted,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <PlatformIcon platform={connectedPlatforms[0]} size={20} />
            </div>
            <div>
              <div style={{
                fontSize: 'var(--text-xs)', fontWeight: 600,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: 'var(--color-text-muted)', marginBottom: 2,
              }}>
                Maior Crescimento
              </div>
              <div style={{ fontSize: 'var(--text-md)', fontWeight: 700 }}>
                {PLATFORMS[connectedPlatforms[0]].name}
              </div>
              <div style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-success-500)',
                fontFamily: 'var(--font-mono)', fontWeight: 600,
              }}>
                +{fmtNum(MOCK.followerGrowth7d[connectedPlatforms[0]])} em 7d
              </div>
            </div>
          </div>
        </div>

        {/* Main chart with platform filter */}
        <div style={{
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border-default)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-5)',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-start', marginBottom: 16,
          }}>
            <div>
              <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>Evolução de Seguidores</h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginTop: 2 }}>
                Total acumulado por plataforma
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', gap: 4 }}>
                {connectedPlatforms.map(plat => {
                  const active = activePlatforms.includes(plat)
                  const p = PLATFORMS[plat]
                  return (
                    <button
                      key={plat}
                      onClick={() => togglePlatform(plat)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 5,
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-full)',
                        border: `1px solid ${active ? p.color + '60' : 'var(--color-border-default)'}`,
                        background: active ? p.muted : 'none',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        opacity: active ? 1 : 0.5,
                      }}
                    >
                      <PlatformIcon platform={plat} size={11} />
                      <span style={{
                        fontSize: 'var(--text-xs)', fontWeight: 600,
                        color: active ? p.text : 'var(--color-text-muted)',
                      }}>
                        {p.name}
                      </span>
                    </button>
                  )
                })}
              </div>
              <PeriodSelector value={period} onChange={setPeriod} />
            </div>
          </div>
          <div style={{ height: 240 }}>
            {growthSeries.length > 0 ? (
              <LineChart series={growthSeries} height={220} showGrid showLabels />
            ) : (
              <div style={{
                height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--color-text-muted)',
              }}>
                Selecione pelo menos uma plataforma
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          {/* Bar chart */}
          <div style={{
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border-default)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-5)',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>Crescimento por Plataforma</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginTop: 2 }}>
                Novos seguidores em 7 dias
              </p>
            </div>
            <BarChart data={barData} height={160} />
          </div>

          {/* Heatmap */}
          <div style={{
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border-default)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-5)',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <div style={{ marginBottom: 14 }}>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>Melhores Horários</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginTop: 2 }}>
                Performance por dia × hora
              </p>
            </div>
            <Heatmap />
            <div style={{ display: 'flex', gap: 12, marginTop: 12, alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Menor</span>
              <div style={{
                flex: 1, height: 4,
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(to right, rgba(34,211,238,0.1), rgba(139,92,246,0.9))',
              }} />
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Maior</span>
            </div>
          </div>
        </div>

        {/* Per-platform delta cards */}
        <div>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 12 }}>
            Detalhamento por Plataforma
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-4)',
          }}>
            {connectedPlatforms.map(plat => {
              const p = PLATFORMS[plat]
              const pct = ((MOCK.followerGrowth7d[plat] / MOCK.followers[plat]) * 100).toFixed(2)
              return (
                <div key={plat} style={{
                  background: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border-default)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-5)',
                  boxShadow: 'var(--shadow-sm)',
                }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', marginBottom: 12,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        width: 24, height: 24,
                        borderRadius: 'var(--radius-md)',
                        background: p.muted,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <PlatformIcon platform={plat} size={13} />
                      </div>
                      <span style={{ fontWeight: 600, fontSize: 'var(--text-md)' }}>{p.name}</span>
                    </div>
                    <span style={{
                      fontSize: 'var(--text-xs)',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--color-success-500)',
                      fontWeight: 600,
                    }}>
                      +{pct}%
                    </span>
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-3xl)',
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    marginBottom: 4,
                  }}>
                    {fmtNum(MOCK.followers[plat])}
                  </div>
                  <div style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-success-500)',
                    fontFamily: 'var(--font-mono)',
                    marginBottom: 10,
                  }}>
                    +{fmtNum(MOCK.followerGrowth7d[plat])} em 7d
                  </div>
                  <Sparkline
                    data={MOCK.growthData[plat].map(d => d.value)}
                    color={p.color}
                    height={32}
                    width={160}
                  />
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}
