import { AppLayout } from '@/layouts/AppLayout'
import { Badge } from '@/components/ui/Badge'
import { MetricCard } from '@/components/shared/MetricCard'

export function LivePage() {
  return (
    <AppLayout pageTitle="Live">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--weight-bold)', color: 'var(--color-text-primary)', letterSpacing: 'var(--tracking-tight)' }}>
            Live Ativa
          </h1>
          <Badge variant="live">Ao Vivo</Badge>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
          <MetricCard label="Viewers agora" value={1247} delta={18.4} sublabel="consolidado" />
          <MetricCard label="Twitch" value={845} sublabel="viewers" />
          <MetricCard label="YouTube" value={312} sublabel="viewers" />
        </div>
        <div style={{
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border-default)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-8)',
          textAlign: 'center',
          color: 'var(--color-text-muted)',
          fontSize: 'var(--text-sm)',
        }}>
          Gráfico de viewers em tempo real — em desenvolvimento
        </div>
      </div>
    </AppLayout>
  )
}
