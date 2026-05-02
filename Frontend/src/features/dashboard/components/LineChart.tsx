import { fmtNum } from '../data/mock'

export interface LineSeries {
  id: string
  color: string
  data: number[]
  dashed?: boolean
}

interface LineChartProps {
  series: LineSeries[]
  height?: number
  showGrid?: boolean
  showLabels?: boolean
}

export function LineChart({ series, height = 200, showGrid = true, showLabels = true }: LineChartProps) {
  const width = 600
  const padL = 48, padR = 16, padT = 16, padB = showLabels ? 32 : 8
  const chartW = width - padL - padR
  const chartH = height - padT - padB

  const allVals = series.flatMap(s => s.data)
  const min     = Math.floor(Math.min(...allVals) * 0.95)
  const max     = Math.ceil(Math.max(...allVals) * 1.05)
  const range   = max - min || 1

  const toX = (i: number, len: number) => padL + (i / (len - 1)) * chartW
  const toY = (v: number) => padT + chartH - ((v - min) / range) * chartH

  const gridLines = 4
  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%' }} preserveAspectRatio="none">
      <defs>
        {series.map(s => (
          <linearGradient key={s.id} id={`lg-${s.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={s.color} stopOpacity="0.15" />
            <stop offset="100%" stopColor={s.color} stopOpacity="0"    />
          </linearGradient>
        ))}
      </defs>
      {showGrid && Array.from({ length: gridLines + 1 }, (_, i) => {
        const v = min + (range / gridLines) * i
        const y = toY(v)
        return (
          <g key={i}>
            <line x1={padL} y1={y} x2={width - padR} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            {showLabels && (
              <text x={padL - 6} y={y + 4} textAnchor="end" fontSize="9" fill="var(--color-text-muted)" fontFamily="var(--font-mono)">
                {fmtNum(Math.round(v))}
              </text>
            )}
          </g>
        )
      })}
      {series.map(s => {
        const pts   = s.data.map((v, i) => `${toX(i, s.data.length)},${toY(v)}`)
        const areaD = `M${padL},${padT + chartH} L${pts.join(' L')} L${width - padR},${padT + chartH} Z`
        const lineD = `M${pts.join(' L')}`
        return (
          <g key={s.id}>
            <path d={areaD} fill={`url(#lg-${s.id})`} />
            <path d={lineD} fill="none" stroke={s.color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"
              strokeDasharray={s.dashed ? '6 3' : undefined} />
            <circle
              cx={toX(s.data.length - 1, s.data.length)}
              cy={toY(s.data[s.data.length - 1])}
              r="3"
              fill={s.color}
            />
          </g>
        )
      })}
      {showLabels && series[0] && (() => {
        const labelCount = 7
        const len = series[0].data.length
        return Array.from({ length: labelCount }, (_, i) => {
          const idx = Math.floor(i * (len - 1) / (labelCount - 1))
          const x = toX(idx, len)
          const label = `${30 - Math.floor(idx / len * 29)}d`
          return (
            <text key={i} x={x} y={height - 4} textAnchor="middle" fontSize="9" fill="var(--color-text-muted)" fontFamily="var(--font-mono)">
              {label}
            </text>
          )
        })
      })()}
    </svg>
  )
}
