interface ScoreRingProps {
  score: number
  size?: number
}

export function ScoreRing({ score, size = 64 }: ScoreRingProps) {
  const r = size * 0.38
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - score / 100)
  const color = score >= 80 ? '#8B5CF6' : score >= 60 ? '#22D3EE' : '#FBBF24'
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="var(--color-bg-elevated)" strokeWidth={size * 0.1}
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth={size * 0.1}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.8s var(--easing-default)' }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: size * 0.22,
          fontWeight: 700, color, lineHeight: 1,
        }}>
          {score}
        </span>
        <span style={{ fontSize: size * 0.12, color: 'var(--color-text-muted)', lineHeight: 1.2 }}>
          score
        </span>
      </div>
    </div>
  )
}
