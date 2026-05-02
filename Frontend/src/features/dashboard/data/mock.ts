export type DashPlatform = 'twitch' | 'youtube' | 'kick' | 'trovo'

export interface PlatformMeta {
  name: string
  color: string
  muted: string
  text: string
  icon: string
}

export const PLATFORMS: Record<DashPlatform, PlatformMeta> = {
  twitch:  { name: 'Twitch',  color: '#9147FF', muted: 'rgba(145,71,255,0.12)', text: '#B881FF', icon: 'T'  },
  youtube: { name: 'YouTube', color: '#FF0000', muted: 'rgba(255,0,0,0.12)',    text: '#FF6B6B', icon: 'Y'  },
  kick:    { name: 'Kick',    color: '#53FC18', muted: 'rgba(83,252,24,0.12)',  text: '#7DFF4F', icon: 'K'  },
  trovo:   { name: 'Trovo',   color: '#1DC34C', muted: 'rgba(29,195,76,0.12)',  text: '#3DDB66', icon: 'Tv' },
}

function generateViewerHistory(base: number, variance: number, points = 60): number[] {
  const data: number[] = []
  let v = base
  for (let i = 0; i < points; i++) {
    v = Math.max(0, v + (Math.random() - 0.48) * variance)
    data.push(Math.round(v))
  }
  return data
}

export interface GrowthPoint {
  day: number
  value: number
  delta: number
}

function generateGrowthData(base: number, days = 30): GrowthPoint[] {
  const data: GrowthPoint[] = []
  let total = base
  for (let i = 0; i < days; i++) {
    const delta = Math.round((Math.random() - 0.35) * 80 + 40)
    total += delta
    data.push({ day: i, value: total, delta })
  }
  return data
}

export type InsightType = 'positive' | 'warning' | 'info'

export interface Insight {
  id: number
  type: InsightType
  icon: string
  title: string
  desc: string
  metric: string
  platform: DashPlatform
}

export interface RecentLive {
  id: number
  date: string
  platforms: DashPlatform[]
  duration: string
  peak: number
  newFollowers: number
  score: number
}

export const MOCK = {
  viewers:           { twitch: 845,   youtube: 312,   kick: 90,   trovo: 47   } as Record<DashPlatform, number>,
  followers:         { twitch: 48320, youtube: 31200, kick: 8940, trovo: 2100 } as Record<DashPlatform, number>,
  followerGrowth7d:  { twitch: 1203,  youtube: 842,   kick: 158,  trovo: 44   } as Record<DashPlatform, number>,
  score: 87,
  liveStart: Date.now() - 83 * 60 * 1000,
  viewerHistory: {
    twitch:  generateViewerHistory(845, 60),
    youtube: generateViewerHistory(312, 30),
    kick:    generateViewerHistory(90,  15),
    trovo:   generateViewerHistory(47,  8),
  } as Record<DashPlatform, number[]>,
  growthData: {
    twitch:  generateGrowthData(48320),
    youtube: generateGrowthData(31200),
    kick:    generateGrowthData(8940),
    trovo:   generateGrowthData(2100),
  } as Record<DashPlatform, GrowthPoint[]>,
  insights: [
    { id: 1, type: 'positive', icon: '📈', title: 'Sábado às 20h é seu pico', desc: 'Seu pico de viewers nas últimas 4 semanas aconteceu às 20h nas sextas e sábados. Média 34% acima do habitual.', metric: '+34%',  platform: 'twitch'  },
    { id: 2, type: 'info',     icon: '⚡', title: 'YouTube crescendo rápido', desc: 'Crescimento no YouTube acelerou 2.1× esta semana comparado à semana passada.',                                metric: '+112%', platform: 'youtube' },
    { id: 3, type: 'warning',  icon: '⚠', title: 'Kick precisa de atenção',   desc: 'O engajamento no Kick caiu 18% nos últimos 7 dias. Considere aumentar a frequência.',                       metric: '-18%',  platform: 'kick'    },
  ] as Insight[],
  recentLives: [
    { id: 1, date: '28 abr', platforms: ['twitch', 'youtube'],          duration: '3h 22m', peak: 1247, newFollowers: 312, score: 91 },
    { id: 2, date: '26 abr', platforms: ['twitch', 'youtube', 'kick'],  duration: '2h 48m', peak: 998,  newFollowers: 218, score: 84 },
    { id: 3, date: '24 abr', platforms: ['twitch'],                     duration: '4h 10m', peak: 876,  newFollowers: 187, score: 79 },
    { id: 4, date: '22 abr', platforms: ['twitch', 'youtube'],          duration: '2h 05m', peak: 743,  newFollowers: 142, score: 76 },
    { id: 5, date: '19 abr', platforms: ['twitch', 'kick', 'trovo'],    duration: '3h 55m', peak: 1102, newFollowers: 289, score: 88 },
  ] as RecentLive[],
  chatActivity:     { twitch: 48, youtube: 22, kick: 11, trovo: 4 } as Record<DashPlatform, number>,
  newFollowersLive: { twitch: 87, youtube: 34, kick: 9,  trovo: 2 } as Record<DashPlatform, number>,
}

/* ─── FORMATTERS ─── */
export function fmtNum(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + 'K'
  return n.toLocaleString('pt-BR')
}

export function fmtDelta(n: number, showSign = true): string {
  const sign = n >= 0 ? '+' : ''
  return `${showSign ? sign : ''}${n.toLocaleString('pt-BR')}`
}
