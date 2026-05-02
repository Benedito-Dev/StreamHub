import type { ReactElement } from 'react'
import { PLATFORMS, type DashPlatform } from '../data/mock'

interface PlatformIconProps {
  platform: DashPlatform
  size?: number
}

export function PlatformIcon({ platform, size = 20 }: PlatformIconProps) {
  const p = PLATFORMS[platform]
  const icons: Record<DashPlatform, ReactElement> = {
    twitch: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={p.color}>
        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
      </svg>
    ),
    youtube: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={p.color}>
        <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
      </svg>
    ),
    kick: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={p.color}>
        <path d="M3 2h4v8l5-8h5l-6 10 6 10h-5L7 14v8H3z"/>
      </svg>
    ),
    trovo: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={p.color}>
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3l3 5h-6l3-5zm-5 7h10l-5 8-5-8z"/>
      </svg>
    ),
  }
  return icons[platform]
}
