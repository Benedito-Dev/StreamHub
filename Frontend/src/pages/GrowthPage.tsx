import { AppLayout } from '@/layouts/AppLayout'
import { GrowthScreen } from '@/features/growth'

export function GrowthPage() {
  return (
    <AppLayout pageTitle="Crescimento">
      <GrowthScreen connectedPlatforms={['twitch', 'youtube', 'kick', 'trovo']} />
    </AppLayout>
  )
}
