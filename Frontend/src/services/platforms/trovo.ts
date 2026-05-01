import { api } from '../api'
import type { PlatformMetrics } from '@/types/metrics'

export const trovoService = {
  getMetrics: () => api.get<PlatformMetrics>('/integrations/trovo/metrics'),
}
