export interface MetricValue {
  value: number
  delta?: number
  deltaPercent?: number
}

export interface PlatformMetrics {
  platform: import('./platform').PlatformName
  followers: MetricValue
  views: MetricValue
  liveViewers?: MetricValue
}
