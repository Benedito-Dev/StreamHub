export type PlatformName = 'youtube' | 'twitch' | 'kick' | 'trovo' | 'tiktok' | 'facebook' | 'instagram' | 'patreon' | 'kofi' | 'streamlabs' | 'streamelements'

export type PlatformStatus = 'active' | 'expired' | 'error' | 'disconnected'

export interface Platform {
  name: PlatformName
  status: PlatformStatus
  connectedAt?: string
}
