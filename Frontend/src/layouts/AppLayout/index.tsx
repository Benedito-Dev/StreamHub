import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Radio, TrendingUp, Lightbulb,
  DollarSign, Settings, Bell, Search,
  ChevronLeft, ChevronRight,
} from 'lucide-react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Badge } from '@/components/ui/Badge'
import { ROUTES } from '@/router/routes'
import styles from './AppLayout.module.css'

interface AppLayoutProps {
  children: ReactNode
  pageTitle?: string
}

const mainNav = [
  { to: ROUTES.DASHBOARD,    icon: LayoutDashboard, label: 'Dashboard' },
  { to: ROUTES.LIVE,         icon: Radio,           label: 'Live' },
  { to: ROUTES.GROWTH,       icon: TrendingUp,      label: 'Crescimento' },
  { to: ROUTES.INSIGHTS,     icon: Lightbulb,       label: 'Insights' },
]

const monetizationNav = [
  { to: ROUTES.MONETIZATION, icon: DollarSign, label: 'Receita' },
]

const platformsNav = [
  { to: `${ROUTES.DASHBOARD}/youtube`, label: 'YouTube', color: 'var(--color-youtube)' },
  { to: `${ROUTES.DASHBOARD}/twitch`,  label: 'Twitch',  color: 'var(--color-twitch)' },
  { to: `${ROUTES.DASHBOARD}/kick`,    label: 'Kick',    color: 'var(--color-kick)' },
]

export function AppLayout({ children, pageTitle = 'StreamHub' }: AppLayoutProps) {
  const [expanded, setExpanded] = useLocalStorage('sidebar-expanded', true)

  const sidebarCls = [
    styles.sidebar,
    expanded ? styles.sidebarExpanded : styles.sidebarCollapsed,
  ].join(' ')

  return (
    <div className={styles.shell}>
      <aside className={sidebarCls}>
        <div className={styles.logo}>
          <div className={styles.logoMark}>S</div>
          <span className={styles.logoText}>StreamHub</span>
        </div>

        <nav className={styles.nav}>
          <div className={styles.navGroup}>
            <span className={styles.navGroupLabel}>Principal</span>
            {mainNav.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  [styles.navItem, isActive ? styles.navItemActive : ''].join(' ')
                }
              >
                <Icon size={20} className={styles.navIcon} />
                <span className={styles.navLabel}>{label}</span>
              </NavLink>
            ))}
          </div>

          <div className={styles.navDivider} />

          <div className={styles.navGroup}>
            <span className={styles.navGroupLabel}>Monetização</span>
            {monetizationNav.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  [styles.navItem, isActive ? styles.navItemActive : ''].join(' ')
                }
              >
                <Icon size={20} className={styles.navIcon} />
                <span className={styles.navLabel}>{label}</span>
              </NavLink>
            ))}
          </div>

          <div className={styles.navDivider} />

          <div className={styles.navGroup}>
            <span className={styles.navGroupLabel}>Plataformas</span>
            {platformsNav.map(({ to, label, color }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  [styles.navItem, isActive ? styles.navItemActive : ''].join(' ')
                }
              >
                <span
                  style={{
                    width: 10, height: 10, borderRadius: '50%',
                    backgroundColor: color, flexShrink: 0,
                    display: 'inline-block', margin: '5px',
                  }}
                />
                <span className={styles.navLabel}>{label}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        <div className={styles.sidebarFooter}>
          <NavLink
            to={ROUTES.SETTINGS}
            className={({ isActive }) =>
              [styles.navItem, isActive ? styles.navItemActive : ''].join(' ')
            }
          >
            <Settings size={20} className={styles.navIcon} />
            <span className={styles.navLabel}>Configurações</span>
          </NavLink>

          <div className={styles.navDivider} />

          <div className={styles.userInfo}>
            <div className={styles.avatar}>B</div>
            <div className={styles.userMeta}>
              <div className={styles.userName}>Streamer</div>
              <div className={styles.userPlan}>
                <Badge variant="plan-free">Free</Badge>
              </div>
            </div>
          </div>

          <button
            className={styles.toggleBtn}
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? 'Recolher sidebar' : 'Expandir sidebar'}
          >
            {expanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>
      </aside>

      <div className={styles.main}>
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <span className={styles.pageTitle}>{pageTitle}</span>
          </div>
          <div className={styles.topbarRight}>
            <button className={styles.iconBtn} aria-label="Buscar">
              <Search size={18} />
            </button>
            <button className={styles.iconBtn} aria-label="Notificações">
              <Bell size={18} />
              <span className={styles.notifBadge} />
            </button>
            <div className={styles.avatar} style={{ cursor: 'pointer' }}>B</div>
          </div>
        </header>

        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  )
}
