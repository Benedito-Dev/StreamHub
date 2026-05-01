import { AppLayout } from '@/layouts/AppLayout'
import { MetricCard } from '@/components/shared/MetricCard'

export function GrowthPage() {
  return (
    <AppLayout pageTitle="Crescimento">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--weight-bold)', color: 'var(--color-text-primary)', letterSpacing: 'var(--tracking-tight)' }}>
          Crescimento
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
          <MetricCard label="Total de seguidores" value={284930} delta={2.1} sublabel="consolidado" />
          <MetricCard label="Crescimento 30d" value={5840} delta={14.2} sublabel="novos seguidores" />
          <MetricCard label="Melhor plataforma" value="Kick" sublabel="+5,1% esta semana" />
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
          Gráficos de crescimento por plataforma — em desenvolvimento
        </div>
      </div>
    </AppLayout>
  )
}
