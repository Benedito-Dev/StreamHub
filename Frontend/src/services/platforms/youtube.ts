import { api } from '../api'
import type { PlatformMetrics } from '@/types/metrics'

export const youtubeService = {
  getMetrics: () => api.get<PlatformMetrics>('/integrations/youtube/metrics'),
}
