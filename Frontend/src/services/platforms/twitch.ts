import { api } from '../api'
import type { PlatformMetrics } from '@/types/metrics'

export const twitchService = {
  getMetrics: () => api.get<PlatformMetrics>('/integrations/twitch/metrics'),
}
