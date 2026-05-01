import { AppLayout } from '@/layouts/AppLayout'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

const platforms = [
  { name: 'Twitch',  color: 'var(--color-twitch)'  },
  { name: 'YouTube', color: 'var(--color-youtube)' },
  { name: 'Kick',    color: 'var(--color-kick)'    },
]

export function SettingsPage() {
  return (
    <AppLayout pageTitle="Configurações">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', maxWidth: 720 }}>
        <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--weight-bold)', color: 'var(--color-text-primary)', letterSpacing: 'var(--tracking-tight)' }}>
          Configurações
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-semibold)', color: 'var(--color-text-primary)' }}>
            Plataformas conectadas
          </h2>
          {platforms.map(({ name, color }) => (
            <div key={name} style={{
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border-default)',
              borderLeft: `3px solid ${color}`,
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-4) var(--space-5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'var(--space-4)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: color, display: 'inline-block' }} />
                <span style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--weight-semibold)', color: 'var(--color-text-primary)' }}>{name}</span>
                <Badge variant="success">Ativo</Badge>
              </div>
              <Button variant="danger" size="sm">Desconectar</Button>
            </div>
          ))}
          <Button variant="outline-brand" size="sm" style={{ alignSelf: 'flex-start' }}>
            + Conectar nova plataforma
          </Button>
        </div>
      </div>
    </AppLayout>
  )
}
