# StreamHub — Domínio e Arquitetura

Skill de domínio do StreamHub. Injetado em todos os agents para decisões consistentes.

---

## 1. O QUE É O STREAMHUB

Plataforma SaaS que unifica analytics de múltiplas plataformas de streaming em uma interface única. O usuário (streamer) conecta suas contas via OAuth e vê tudo em um só dashboard — viewers ao vivo, seguidores, crescimento, monetização — sem precisar trocar de aba.

**Problema resolvido:** streamer opera em 4+ plataformas e precisa de 4 dashboards. StreamHub consolida tudo.

---

## 2. PLATAFORMAS

### MVP (implementar primeiro)
| Plataforma | PlatformName | Status |
|-----------|-------------|--------|
| YouTube   | `youtube`   | Alta viabilidade — Data API v3 |
| Twitch    | `twitch`    | Alta viabilidade — melhor API do mercado |
| Kick      | `kick`      | Alta viabilidade — API pública mar/2025 |
| Trovo     | `trovo`     | Alta viabilidade — OAuth + REST + WebSocket |

### Monetização (junto ao MVP)
| Plataforma     | PlatformName     |
|----------------|-----------------|
| Patreon        | `patreon`       |
| Ko-fi          | `kofi`          |
| Streamlabs     | `streamlabs`    |
| StreamElements | `streamelements`|

### Fase 2+ (não priorizar agora)
`tiktok`, `facebook`, `instagram`, `dlive`

---

## 3. FLUXO DE DADOS (REGRA CRÍTICA)

```
Frontend  →  Backend StreamHub  →  APIs Externas
              (NestJS)             (YouTube, Twitch...)
```

**O Frontend NUNCA chama APIs externas diretamente.**

- Frontend só consome `VITE_API_URL` (api interna)
- Backend busca dados nas APIs externas e persiste
- Jobs periódicos atualizam métricas (não por request do usuário)
- Live em tempo real: WebSocket via Socket.io

---

## 4. ESTRUTURA DO FRONTEND

### Feature-based architecture

```
Frontend/src/
  features/
    dashboard/          — Cards de métricas por plataforma
      components/
      hooks/
      types/
      index.ts
    live/               — Viewers ao vivo, chat, histórico de live
    growth/             — Gráfico de evolução de seguidores
    insights/           — Melhor plataforma, sugestões de horário, alertas
    monetization/       — Patreon, Ko-fi, Streamlabs, StreamElements
    settings/           — Conexões OAuth, config de conta
    agency/             — Múltiplos criadores (plano Agency)
  components/
    ui/                 — Badge, Button, Card, Input (genéricos)
    shared/             — MetricCard, PlatformBadge, ChartContainer
  layouts/
    AppLayout/          — Layout com sidebar + main (usuário autenticado)
    AuthLayout/         — Layout centrado (login, onboarding)
  pages/                — DashboardPage, LivePage, GrowthPage, etc.
  services/
    api.ts              — fetch wrapper (BASE_URL = VITE_API_URL)
    platforms/
      youtube.ts        — { getMetrics: () => api.get('/integrations/youtube/metrics') }
      twitch.ts
      kick.ts
      trovo.ts
  store/                — Zustand (auth.store, platforms.store, ui.store)
  types/
    platform.ts         — PlatformName, PlatformStatus, Platform
    metrics.ts          — MetricValue, PlatformMetrics
    api.ts
  utils/
    dates.ts
    formatters.ts       — formatNumber, etc.
  router/
    index.tsx           — createBrowserRouter
    routes.ts           — ROUTES constantes
    guards/             — Route guards
```

### Padrões de componente

```tsx
// Feature hook pattern
export function useDashboard() {
  // lógica de negócio aqui
}

// Componente recebe dados via props (não busca diretamente)
export function DashboardPage() {
  const { metrics, loading } = useDashboard()
  return <MetricCard value={metrics.followers.value} delta={metrics.followers.deltaPercent} />
}
```

### CSS Modules (padrão obrigatório)

```tsx
import styles from './MyComponent.module.css'
// NÃO usar inline styles ou Tailwind
```

### Services sempre via api.ts

```typescript
// CORRETO — passa pelo wrapper
export const youtubeService = {
  getMetrics: () => api.get<PlatformMetrics>('/integrations/youtube/metrics'),
}

// ERRADO — fetch direto
fetch('https://www.googleapis.com/...')  // bloqueado por arquitetura
```

---

## 5. ESTRUTURA DO BACKEND (NestJS — a criar)

```
Backend/src/
  integrations/
    youtube/            — YoutubeModule, YoutubeService, YoutubeController
    twitch/
    kick/
    trovo/
    patreon/
    kofi/
    streamlabs/
    streamelements/
  auth/                 — AuthModule, JWT, OAuth por plataforma
  users/                — UsersModule (conta do streamer no StreamHub)
  metrics/              — Agregação de métricas multi-plataforma
  live/                 — WebSocket gateway (Socket.io)
  jobs/                 — Cron jobs de atualização periódica
  common/               — Guards, filters, interceptors, decorators
  app.module.ts
  main.ts
```

### Padrão de módulo de integração

```typescript
// Cada integração é isolada:
// integrations/twitch/twitch.service.ts
@Injectable()
export class TwitchService {
  async getMetrics(userId: string): Promise<PlatformMetrics> {
    const token = await this.tokenService.getValid('twitch', userId)
    // chama API Twitch com token
  }
}
```

---

## 6. TIPOS GLOBAIS IMPORTANTES

```typescript
// platform.ts
type PlatformName = 'youtube' | 'twitch' | 'kick' | 'trovo' | 'tiktok' |
  'facebook' | 'instagram' | 'patreon' | 'kofi' | 'streamlabs' | 'streamelements'

type PlatformStatus = 'active' | 'expired' | 'error' | 'disconnected'

// metrics.ts
interface MetricValue {
  value: number
  delta?: number           // valor absoluto da variação
  deltaPercent?: number    // % de variação
}

interface PlatformMetrics {
  platform: PlatformName
  followers: MetricValue
  views: MetricValue
  liveViewers?: MetricValue  // só quando ao vivo
}
```

---

## 7. OAUTH E TOKENS

- Cada plataforma tem seu próprio fluxo OAuth 2.0
- Tokens armazenados no backend com AES-256
- Frontend NUNCA vê o access_token da plataforma
- Renovação automática no backend (refresh token)
- Status visível via `PlatformStatus` ('active' | 'expired' | 'error' | 'disconnected')

---

## 8. REAL-TIME (WebSocket)

- Socket.io no backend
- Frontend assina eventos por plataforma: `live:viewers:twitch`, `live:viewers:youtube`
- Latência máxima aceitável: 30 segundos
- Apenas dados de live são real-time; outros são polling/cache

---

## 9. PLANOS DE NEGÓCIO

| Plano   | Plataformas | Features             |
|---------|-------------|----------------------|
| Free    | 2           | Básico, histórico 30d|
| Pro     | Todas       | Insights, alertas, 1a|
| Agency  | Todas       | Multi-criadores, API |

**Para feature flags:** verificar `user.plan` antes de liberar feature.

---

## 10. VARIÁVEIS DE AMBIENTE

### Frontend (prefix VITE_)
- `VITE_API_URL` — URL da API interna StreamHub

### Backend
- `DATABASE_URL` — PostgreSQL
- `REDIS_URL` — Redis
- `JWT_SECRET`
- `ENCRYPTION_KEY` — AES-256 para tokens OAuth
- `YOUTUBE_CLIENT_ID`, `YOUTUBE_CLIENT_SECRET`
- `TWITCH_CLIENT_ID`, `TWITCH_CLIENT_SECRET`
- `KICK_CLIENT_ID`, `KICK_CLIENT_SECRET`
- `TROVO_CLIENT_ID`, `TROVO_CLIENT_SECRET`

---

## 11. REGRAS CRÍTICAS DO DOMÍNIO

1. **Frontend nunca chama API externa** — sempre via Backend
2. **Token OAuth nunca exposto ao Frontend** — fica só no Backend
3. **Cada integração = módulo isolado** — facilita desativar/adicionar plataformas
4. **Soft delete** — nunca hard delete de conexões de plataforma (histórico)
5. **Build está em Frontend/** — `cd Frontend && npm run build`
6. **TypeScript strict em ambos** — Frontend e Backend
