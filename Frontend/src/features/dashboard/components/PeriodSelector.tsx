export type Period = '24h' | '7d' | '30d' | '3m' | '1a'

const OPTIONS: Period[] = ['24h', '7d', '30d', '3m', '1a']

interface PeriodSelectorProps {
  value: Period
  onChange: (value: Period) => void
}

export function PeriodSelector({ value, onChange }: PeriodSelectorProps) {
  return (
    <div style={{
      display: 'flex', gap: 2,
      background: 'var(--color-bg-elevated)',
      borderRadius: 'var(--radius-lg)',
      padding: 3,
      border: '1px solid var(--color-border-default)',
    }}>
      {OPTIONS.map(o => (
        <button
          key={o}
          onClick={() => onChange(o)}
          style={{
            padding: '4px 10px',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            background: value === o ? 'var(--color-brand-500)' : 'none',
            color: value === o ? '#fff' : 'var(--color-text-muted)',
            transition: 'all 0.15s',
          }}
        >
          {o}
        </button>
      ))}
    </div>
  )
}
