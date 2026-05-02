interface LiveBadgeProps {
  size?: 'sm' | 'md'
}

export function LiveBadge({ size = 'md' }: LiveBadgeProps) {
  const sz = size === 'sm'
    ? { pad: '2px 8px',  dot: 6, fs: 'var(--text-xs)' }
    : { pad: '4px 12px', dot: 8, fs: 'var(--text-sm)' }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
      borderRadius: 'var(--radius-full)', padding: sz.pad,
      fontSize: sz.fs, fontWeight: 600, color: '#F87171',
      letterSpacing: '0.05em',
    }}>
      <span style={{
        width: sz.dot, height: sz.dot, borderRadius: '50%',
        background: '#EF4444',
        animation: 'sh-blink 1.2s ease-in-out infinite',
        flexShrink: 0,
      }} />
      AO VIVO
      <style>{`
        @keyframes sh-blink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.3; }
        }
      `}</style>
    </span>
  )
}
