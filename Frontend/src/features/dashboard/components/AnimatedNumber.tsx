import { useEffect, useRef, useState } from 'react'
import { fmtNum } from '../data/mock'

interface AnimatedNumberProps {
  value: number
  format?: (n: number) => string
  duration?: number
}

export function AnimatedNumber({ value, format = fmtNum, duration = 600 }: AnimatedNumberProps) {
  const [display, setDisplay] = useState(value)
  const prev = useRef(value)
  const raf  = useRef<number | null>(null)

  useEffect(() => {
    const start     = prev.current
    const end       = value
    const startTime = performance.now()
    const animate   = (now: number) => {
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(start + (end - start) * eased))
      if (progress < 1) raf.current = requestAnimationFrame(animate)
      else prev.current = end
    }
    raf.current = requestAnimationFrame(animate)
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current)
    }
  }, [value, duration])

  return <span>{format(display)}</span>
}
