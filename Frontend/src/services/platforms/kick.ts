import { api } from '../api'
import type { PlatformMetrics } from '@/types/metrics'

export const kickService = {
  getMetrics: () => api.get<PlatformMetrics>('/integrations/kick/metrics'),
}
