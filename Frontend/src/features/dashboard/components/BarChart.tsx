import { fmtNum } from '../data/mock'

export interface BarDatum {
  label: string
  value: number
  color: string
}

interface BarChartProps {
  data: BarDatum[]
  height?: number
}

export function BarChart({ data, height = 160 }: BarChartProps) {
  const max = Math.max(...data.map(d => d.value))
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height, padding: '8px 0' }}>
      {data.map((d, i) => (
        <div key={i} style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-muted)',
          }}>
            {fmtNum(d.value)}
          </span>
          <div style={{
            width: '100%',
            borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
            background: `linear-gradient(to top, ${d.color}, ${d.color}99)`,
            height: `${(d.value / max) * (height - 40)}px`,
            transition: 'height 0.4s var(--easing-spring)',
            boxShadow: `0 0 8px ${d.color}40`,
          }} />
          <span style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-muted)',
            whiteSpace: 'nowrap',
          }}>
            {d.label}
          </span>
        </div>
      ))}
    </div>
  )
}
