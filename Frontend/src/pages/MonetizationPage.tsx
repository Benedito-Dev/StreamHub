import { AppLayout } from '@/layouts/AppLayout'
import { MetricCard } from '@/components/shared/MetricCard'

export function MonetizationPage() {
  return (
    <AppLayout pageTitle="Receita">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--weight-bold)', color: 'var(--color-text-primary)', letterSpacing: 'var(--tracking-tight)' }}>
          Receita
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
          <MetricCard label="Total no mês" value="R$ 3.240" delta={8.4} sublabel="todas as fontes" />
          <MetricCard label="Patreon" value="R$ 2.200" delta={5.2} sublabel="68% do total" />
          <MetricCard label="Ko-fi + outros" value="R$ 1.040" delta={12.1} sublabel="32% do total" />
        </div>
      </div>
    </AppLayout>
  )
}
