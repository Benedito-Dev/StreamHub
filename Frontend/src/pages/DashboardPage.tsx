import { AppLayout } from '@/layouts/AppLayout'
import { DashboardScreen } from '@/features/dashboard'

export function DashboardPage() {
  return (
    <AppLayout pageTitle="Dashboard">
      <DashboardScreen isLive connectedPlatforms={['twitch', 'youtube', 'kick', 'trovo']} />
    </AppLayout>
  )
}
