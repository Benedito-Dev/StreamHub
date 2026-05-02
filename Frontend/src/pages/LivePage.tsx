import { AppLayout } from '@/layouts/AppLayout'
import { LiveScreen } from '@/features/live'

export function LivePage() {
  return (
    <AppLayout pageTitle="Live">
      <LiveScreen isLive connectedPlatforms={['twitch', 'youtube', 'kick', 'trovo']} />
    </AppLayout>
  )
}
