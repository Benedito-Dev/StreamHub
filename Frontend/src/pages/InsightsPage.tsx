import { AppLayout } from '@/layouts/AppLayout'
import { Badge } from '@/components/ui/Badge'

export function InsightsPage() {
  return (
    <AppLayout pageTitle="Insights">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--weight-bold)', color: 'var(--color-text-primary)', letterSpacing: 'var(--tracking-tight)' }}>
          Insights
        </h1>
        {[
          { title: 'Sábado às 20h é seu melhor horário', platform: 'twitch' as const, metric: '+34%', type: 'positive' },
          { title: 'YouTube tem maior taxa de conversão', platform: 'youtube' as const, metric: '4,7%', type: 'info' },
          { title: 'Engajamento abaixo da média no Kick', platform: 'kick' as const, metric: '-12%', type: 'warning' },
        ].map(({ title, platform, metric, type }) => (
          <div key={title} style={{
            background: 'var(--color-bg-surface)',
            border: `1px solid var(--color-border-default)`,
            borderLeft: `3px solid var(--color-${type === 'positive' ? 'success' : type === 'warning' ? 'warning' : 'info'}-500)`,
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-4)',
            cursor: 'pointer',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
              <span style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--weight-semibold)', color: 'var(--color-text-primary)' }}>{title}</span>
              <Badge variant={platform}>{platform.charAt(0).toUpperCase() + platform.slice(1)}</Badge>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xl)', fontWeight: 'var(--weight-bold)', color: 'var(--color-text-primary)', whiteSpace: 'nowrap' }}>
              {metric}
            </span>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
