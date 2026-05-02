import type { CSSProperties } from 'react'

const DAYS  = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const HOURS = [14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

function buildData(): number[][] {
  const data = DAYS.map(() => HOURS.map(() => Math.random()))
  data[0][6] = 0.95
  data[6][6] = 0.88
  data[6][5] = 0.82
  data[5][6] = 0.79
  return data
}

const data = buildData()

export function Heatmap() {
  const cellHover = (e: React.MouseEvent<HTMLDivElement>, scale: string) => {
    e.currentTarget.style.transform = scale
  }
  return (
    <div style={{ overflowX: 'auto' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `40px repeat(${HOURS.length}, 1fr)`,
        gap: 3,
        minWidth: 400,
      }}>
        <div />
        {HOURS.map(h => (
          <div key={h} style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-muted)',
            textAlign: 'center',
            fontFamily: 'var(--font-mono)',
            paddingBottom: 4,
          }}>
            {h}h
          </div>
        ))}
        {DAYS.map((day, di) => (
          <DayRow key={day} day={day} di={di} onHover={cellHover} />
        ))}
      </div>
    </div>
  )
}

interface DayRowProps {
  day: string
  di: number
  onHover: (e: React.MouseEvent<HTMLDivElement>, scale: string) => void
}

function DayRow({ day, di, onHover }: DayRowProps) {
  return (
    <>
      <div style={{
        fontSize: 'var(--text-xs)',
        color: 'var(--color-text-muted)',
        display: 'flex',
        alignItems: 'center',
        paddingRight: 4,
      }}>
        {day}
      </div>
      {HOURS.map((h, hi) => {
        const v = data[di][hi]
        const alpha = v * 0.9 + 0.05
        const style: CSSProperties = {
          aspectRatio: '1',
          borderRadius: 'var(--radius-sm)',
          background: v > 0.7
            ? `rgba(139,92,246,${alpha})`
            : `rgba(34,211,238,${alpha * 0.6})`,
          cursor: 'pointer',
          transition: 'transform 0.1s',
        }
        return (
          <div
            key={h}
            style={style}
            title={`${day} ${h}h — ${Math.round(v * 100)}% performance`}
            onMouseEnter={e => onHover(e, 'scale(1.15)')}
            onMouseLeave={e => onHover(e, 'scale(1)')}
          />
        )
      })}
    </>
  )
}
