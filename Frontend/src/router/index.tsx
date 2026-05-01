import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ROUTES } from './routes'
import { LoginPage } from '@/pages/auth/LoginPage'
import { OnboardingPage } from '@/pages/auth/OnboardingPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { LivePage } from '@/pages/LivePage'
import { GrowthPage } from '@/pages/GrowthPage'
import { InsightsPage } from '@/pages/InsightsPage'
import { MonetizationPage } from '@/pages/MonetizationPage'
import { SettingsPage } from '@/pages/SettingsPage'

export const router = createBrowserRouter([
  { path: ROUTES.HOME,         element: <Navigate to={ROUTES.DASHBOARD} replace /> },
  { path: ROUTES.LOGIN,        element: <LoginPage /> },
  { path: ROUTES.ONBOARDING,   element: <OnboardingPage /> },
  { path: ROUTES.DASHBOARD,    element: <DashboardPage /> },
  { path: `${ROUTES.DASHBOARD}/:platform`, element: <DashboardPage /> },
  { path: ROUTES.LIVE,         element: <LivePage /> },
  { path: ROUTES.GROWTH,       element: <GrowthPage /> },
  { path: ROUTES.INSIGHTS,     element: <InsightsPage /> },
  { path: ROUTES.MONETIZATION, element: <MonetizationPage /> },
  { path: ROUTES.SETTINGS,     element: <SettingsPage /> },
])

export { ROUTES }
