import { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { AppLayout } from '@/layouts/AppLayout'
import { MetricCard } from '@/components/shared/MetricCard'
import { PlatformCard } from '@/components/shared/PlatformBadge'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import styles from './DashboardPage.module.css'

const PERIODS = ['7d', '30d', '3m', '1a'] as const
type Period = typeof PERIODS[number]

/* Mock chart data — 30 bars simulating follower growth */
const chartData = [
  18, 22, 19, 25, 28, 24, 30, 35, 29, 38,
  42, 36, 44, 50, 47, 55, 52, 60, 58, 65,
  62, 70, 68, 75, 72, 80, 85, 90, 88, 96,
]

const platformColors: Record<string, string> = {
  twitch:  'var(--color-twitch)',
  youtube: 'var(--color-youtube)',
  kick:    'var(--color-kick)',
}

export function DashboardPage() {
  const [period, setPeriod] = useState<Period>('30d')
  const maxBar = Math.max(...chartData)

  return (
    <AppLayout pageTitle="Dashboard">
      <div className={styles.page}>

        {/* Page header */}
        <div className={styles.pageHeader}>
          <div className={styles.pageHeading}>
            <h1 className={styles.pageTitle}>Visão Geral</h1>
            <Badge variant="live">Ao Vivo</Badge>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <span className={styles.lastUpdate}>Atualizado há 42s</span>
            <Button variant="secondary" size="sm" leftIcon={<RefreshCw size={14} />}>
              Atualizar
            </Button>
          </div>
        </div>

        {/* Hero metrics */}
        <div className={styles.metricsRow}>
          <MetricCard
            label="Viewers agora"
            value={1247}
            delta={18.4}
            sublabel="em todas as plataformas"
          />
          <MetricCard
            label="Seguidores totais"
            value={284930}
            delta={2.1}
            sublabel="consolidado"
          />
          <MetricCard
            label="Novos seguidores"
            value={1203}
            delta={12.6}
            sublabel="últimas 24h"
          />
          {/* Score card */}
          <div className={`${styles.chartPlaceholder} ${styles.scoreCard}`} style={{ minHeight: 96, padding: 'var(--space-4) var(--space-5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-semibold)', letterSpacing: 'var(--tracking-widest)', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                StreamHub Score
              </span>
            </div>
            <span className={styles.scoreValue}>87</span>
            <div style={{ marginTop: 'var(--space-2)' }}>
              <Badge variant="delta-positive">+4 esta semana</Badge>
            </div>
          </div>
        </div>

        {/* Platform cards */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Plataformas</span>
            <button className={styles.sectionAction}>+ Conectar plataforma</button>
          </div>
          <div className={styles.platformsGrid}>
            <PlatformCard
              platform="twitch"
              label="Twitch"
              color={platformColors.twitch}
              status="active"
              metrics={[
                { label: 'Viewers', value: 845 },
                { label: 'Seguidores', value: 142800 },
                { label: 'Subs', value: 1240 },
                { label: 'Crescimento', value: '+3,2%' },
              ]}
            />
            <PlatformCard
              platform="youtube"
              label="YouTube"
              color={platformColors.youtube}
              status="active"
              metrics={[
                { label: 'Viewers', value: 312 },
                { label: 'Inscritos', value: 98600 },
                { label: 'Views 30d', value: 124000 },
                { label: 'Crescimento', value: '+1,8%' },
              ]}
            />
            <PlatformCard
              platform="kick"
              label="Kick"
              color={platformColors.kick}
              status="active"
              metrics={[
                { label: 'Viewers', value: 90 },
                { label: 'Seguidores', value: 43530 },
                { label: 'Clips', value: 87 },
                { label: 'Crescimento', value: '+5,1%' },
              ]}
            />
          </div>
        </div>

        {/* Followers chart */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Evolução de seguidores</span>
          </div>
          <div className={styles.chartPlaceholder}>
            <div className={styles.chartHeader}>
              <span className={styles.chartTitle}>Consolidado — todas as plataformas</span>
              <div className={styles.chartPeriodChips}>
                {PERIODS.map((p) => (
                  <button
                    key={p}
                    className={[styles.chip, p === period ? styles.chipActive : ''].join(' ')}
                    onClick={() => setPeriod(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.chartArea}>
              {chartData.map((v, i) => (
                <div
                  key={i}
                  className={styles.chartBar}
                  style={{
                    height: `${(v / maxBar) * 100}%`,
                    background: `linear-gradient(to top, var(--color-brand-600), var(--color-brand-400))`,
                    opacity: i === chartData.length - 1 ? 1 : 0.5 + (i / chartData.length) * 0.5,
                  }}
                  title={`Dia ${i + 1}: ${v}k seguidores`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Insights recentes</span>
            <button className={styles.sectionAction}>Ver todos →</button>
          </div>
          <div className={styles.insightsRow}>
            <div className={`${styles.insightCard} ${styles.positive}`}>
              <div className={styles.insightHeader}>
                <span className={styles.insightTitle}>Melhor dia da semana</span>
                <Badge variant="twitch">Twitch</Badge>
              </div>
              <span className={styles.insightMetric}>Sábado 20h</span>
              <p className={styles.insightDesc}>Suas lives de sábado às 20h geram em média 34% mais viewers do que nos outros horários.</p>
            </div>

            <div className={`${styles.insightCard} ${styles.info}`}>
              <div className={styles.insightHeader}>
                <span className={styles.insightTitle}>Taxa de conversão</span>
                <Badge variant="youtube">YouTube</Badge>
              </div>
              <span className={styles.insightMetric}>4,7%</span>
              <p className={styles.insightDesc}>YouTube está convertendo viewers em inscritos com maior eficiência esta semana.</p>
            </div>

            <div className={`${styles.insightCard} ${styles.warning}`}>
              <div className={styles.insightHeader}>
                <span className={styles.insightTitle}>Queda no engajamento</span>
                <Badge variant="kick">Kick</Badge>
              </div>
              <span className={styles.insightMetric}>-12%</span>
              <p className={styles.insightDesc}>O engajamento no Kick caiu abaixo da média histórica nos últimos 7 dias.</p>
            </div>
          </div>
        </div>

      </div>
    </AppLayout>
  )
}
