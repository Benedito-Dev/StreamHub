# Padrões Frontend — React + TypeScript (StreamHub)

Aplicável ao código em `Frontend/src/`. Complementa `backend-patterns.md` para o lado cliente.

---

## 1. ARQUITETURA FEATURE-BASED

### Estrutura de uma feature

```
features/dashboard/
  components/        — Componentes específicos desta feature
  hooks/             — Custom hooks (lógica de negócio)
  types/             — Tipos específicos desta feature
  index.ts           — Barrel export (o que a feature expõe)
```

### O que fica onde

- **`features/`** — Lógica de negócio, hooks de dados, componentes de domínio
- **`components/ui/`** — Componentes genéricos sem domínio (Button, Input, Badge, Card)
- **`components/shared/`** — Componentes reutilizáveis com domínio leve (MetricCard, PlatformBadge)
- **`pages/`** — Orquestra features, ZERO lógica de negócio
- **`layouts/`** — AppLayout (autenticado), AuthLayout (login/onboarding)

---

## 2. COMPONENTES

### Padrão obrigatório

```tsx
// CORRETO — props tipadas, export nomeado
interface MetricCardProps {
  label: string
  value: number | string
  delta?: number
  loading?: boolean
}

export function MetricCard({ label, value, delta, loading = false }: MetricCardProps) {
  // ...
}
```

```tsx
// ERRADO — export default (dificulta refactor), props sem tipo
export default function MetricCard(props: any) { ... }
```

### CSS Modules (obrigatório)

```tsx
import styles from './MyComponent.module.css'

// CORRETO
<div className={styles.card}>
<div className={`${styles.card} ${styles.active}`}>

// ERRADO — inline styles (exceto para valores dinâmicos não cobertos por CSS)
<div style={{ color: 'red' }}>
```

### Quando usar inline style

Apenas para valores verdadeiramente dinâmicos (cores de plataforma calculadas em runtime):

```tsx
// ACEITÁVEL — cor vem de dado dinâmico
<div style={{ borderColor: platform.color }}>
```

---

## 3. HOOKS

### Custom hooks encapsulam lógica de negócio

```tsx
// hooks/usePlatformMetrics.ts
export function usePlatformMetrics(platform: PlatformName) {
  const [metrics, setMetrics] = useState<PlatformMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    platformService[platform].getMetrics()
      .then(setMetrics)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [platform])

  return { metrics, loading, error }
}
```

### Página fica limpa

```tsx
// DashboardPage.tsx — SÓ orquestra
export function DashboardPage() {
  const { metrics, loading } = usePlatformMetrics('twitch')
  return <MetricCard value={metrics?.followers.value ?? 0} loading={loading} />
}
```

---

## 4. SERVIÇOS

### Sempre via api.ts

```typescript
// services/platforms/twitch.ts
import { api } from '../api'
import type { PlatformMetrics } from '@/types/metrics'

export const twitchService = {
  getMetrics: () => api.get<PlatformMetrics>('/integrations/twitch/metrics'),
  connect: (code: string) => api.post('/integrations/twitch/connect', { code }),
}
```

### api.ts é o único ponto de fetch

```typescript
// ERRADO — fetch direto em componente ou hook
const res = await fetch('http://localhost:3000/integrations/twitch/metrics')

// CORRETO
const metrics = await twitchService.getMetrics()
```

### Token de autenticação StreamHub

O api.ts deve incluir o JWT do usuário:

```typescript
// services/api.ts — padrão para quando auth estiver implementado
async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = authStore.getState().token  // Zustand
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json() as Promise<T>
}
```

---

## 5. STATE MANAGEMENT (ZUSTAND)

### Store pattern

```typescript
// store/platforms.store.ts
import { create } from 'zustand'
import type { Platform } from '@/types/platform'

interface PlatformsState {
  connected: Platform[]
  isLoading: boolean
  connect: (platform: Platform) => void
  disconnect: (platformName: string) => void
}

export const usePlatformsStore = create<PlatformsState>((set) => ({
  connected: [],
  isLoading: false,
  connect: (platform) =>
    set((state) => ({ connected: [...state.connected, platform] })),
  disconnect: (platformName) =>
    set((state) => ({
      connected: state.connected.filter((p) => p.name !== platformName),
    })),
}))
```

### Onde usar store vs hook local

- **Store (Zustand):** dados globais compartilhados (user, plataformas conectadas, tema)
- **useState local:** estado de UI que não sai do componente (isOpen, inputValue)
- **Custom hook:** lógica de fetch/derivação específica de uma feature

---

## 6. TIPOS

### Sempre em `types/` para compartilhados, inline para locais

```typescript
// types/platform.ts — usado em múltiplos lugares
export type PlatformName = 'youtube' | 'twitch' | 'kick' | 'trovo' | ...

// features/dashboard/types/index.ts — específico da feature
export interface DashboardFilter {
  period: '7d' | '30d' | '3m' | '1y'
  platform: PlatformName | 'all'
}
```

### Props inline para componentes simples

```tsx
// OK — tipo inline para props de componente simples
function Badge({ variant, children }: { variant: 'delta-positive' | 'delta-negative'; children: React.ReactNode }) {
```

---

## 7. FORMATAÇÃO DE DADOS

### Usar utils/formatters.ts

```typescript
import { formatNumber, formatPercent, formatDuration } from '@/utils/formatters'

// CORRETO
formatNumber(1234567)   // → "1.2M"
formatPercent(0.0523)   // → "+5.2%"

// ERRADO — formatar inline
{value.toLocaleString('pt-BR')}
```

### Datas via utils/dates.ts

```typescript
import { formatDate, formatRelative } from '@/utils/dates'
// Não usar new Date() inline em componentes
```

---

## 8. ROUTER

### Usar ROUTES constante (nunca hardcoded)

```tsx
import { ROUTES } from '@/router'

// CORRETO
<Link to={ROUTES.DASHBOARD}>Dashboard</Link>
navigate(ROUTES.LIVE)

// ERRADO
<Link to="/dashboard">
navigate('/live')
```

---

## 9. IMPORTS

### Path aliases (@/)

```typescript
// CORRETO — absoluto via alias
import { MetricCard } from '@/components/shared/MetricCard'
import type { PlatformName } from '@/types/platform'

// EVITAR — relativo profundo
import { MetricCard } from '../../../components/shared/MetricCard'
```

### Ordem de imports

```typescript
// 1. React e libs externas
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// 2. Componentes (alias @/)
import { MetricCard } from '@/components/shared/MetricCard'

// 3. Hooks e serviços
import { usePlatformMetrics } from '@/features/dashboard/hooks'
import { twitchService } from '@/services/platforms/twitch'

// 4. Types (com type keyword)
import type { PlatformMetrics } from '@/types/metrics'

// 5. Styles
import styles from './MyComponent.module.css'
```

---

## 10. PERFORMANCE

### Não buscar dados no render sem cache

```tsx
// ERRADO — fetch em cada render
function DashboardPage() {
  const [data, setData] = useState(null)
  useEffect(() => { fetch(...).then(setData) }, [])  // ok se feito 1x
}

// MELHOR — hook com cache (quando React Query for adicionado)
const { data } = useQuery(['metrics', 'twitch'], twitchService.getMetrics)
```

### Skeleton loading (padrão do MetricCard)

```tsx
// MetricCard suporta loading prop
<MetricCard label="Seguidores" value={0} loading={isLoading} />
```

---

## 11. CHECKLIST FRONTEND

Antes de considerar código pronto:

- [ ] TypeScript: 0 errors (`cd Frontend && npx tsc --noEmit`)
- [ ] Build passa (`cd Frontend && npm run build`)
- [ ] ESLint: 0 errors (`cd Frontend && npx eslint src/`)
- [ ] CSS Modules (sem inline styles desnecessários)
- [ ] Sem fetch direto — sempre via `services/api.ts`
- [ ] Tipos explícitos em props de componentes
- [ ] Sem `any` (use `unknown` + type guard)
- [ ] Import aliases `@/` em vez de relativos profundos
- [ ] Formatadores via `utils/` em vez de inline
- [ ] Hooks para lógica de negócio (páginas só orquestram)
