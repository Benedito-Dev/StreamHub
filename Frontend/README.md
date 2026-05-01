# StreamHub — Frontend

Interface web do StreamHub, plataforma unificada de analytics para streamers e criadores de conteúdo.

## Visão geral

O frontend consome exclusivamente a API interna do StreamHub — nunca as APIs das plataformas diretamente. Dados de live em tempo real chegam via WebSocket; o restante via REST com polling configurável.

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | React 19 + TypeScript 6 |
| Build | Vite 8 |
| Roteamento | React Router v7 |
| Ícones | Lucide React |
| Estilização | CSS Modules + CSS Custom Properties (Design Tokens) |

## Requisitos

- Node.js ≥ 20
- npm ≥ 10

## Instalação

```bash
npm install
```

## Scripts

```bash
npm run dev      # Servidor de desenvolvimento em http://localhost:5173
npm run build    # Build de produção (TypeScript check + Vite)
npm run preview  # Preview do build de produção
npm run lint     # Lint com ESLint
```

## Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto `Frontend/`:

```env
VITE_API_URL=http://localhost:3000
```

| Variável | Descrição | Padrão |
|---|---|---|
| `VITE_API_URL` | URL base da API interna do StreamHub | `http://localhost:3000` |

> Nunca adicionar tokens de plataformas aqui — eles ficam exclusivamente no backend.

## Arquitetura de pastas

```
src/
├── assets/               # Imagens, SVGs, fontes estáticas
├── styles/               # Design System global
│   ├── tokens.css        # CSS custom properties (cores, tipografia, espaçamento)
│   └── globals.css       # Reset, fontes (Inter + JetBrains Mono), animações
├── types/                # Tipos TypeScript globais
│   ├── platform.ts       # PlatformName, PlatformStatus
│   ├── metrics.ts        # MetricValue, PlatformMetrics
│   └── api.ts            # ApiResponse<T>
├── utils/                # Funções puras utilitárias
│   ├── formatters.ts     # formatNumber, formatDuration
│   └── dates.ts          # formatRelativeDate
├── hooks/                # Custom hooks globais
│   ├── useDebounce.ts
│   └── useLocalStorage.ts
├── services/             # Comunicação com a API interna
│   ├── api.ts            # Cliente HTTP base
│   └── platforms/        # Um módulo por plataforma (youtube, twitch, kick, trovo…)
├── store/                # Estado global (Zustand — a implementar)
│   ├── auth.store.ts
│   ├── platforms.store.ts
│   └── ui.store.ts
├── components/
│   ├── ui/               # Átomos do Design System (Button, Badge, Input…)
│   └── shared/           # Moléculas compostas (MetricCard, PlatformCard…)
├── layouts/
│   ├── AppLayout/        # Sidebar + Topbar — usado em todas as telas autenticadas
│   └── AuthLayout/       # Layout centralizado para login/onboarding
├── features/             # Módulos de feature — cada um autocontido
│   ├── dashboard/
│   ├── live/
│   ├── growth/
│   ├── insights/
│   ├── monetization/
│   ├── settings/
│   └── agency/
├── pages/                # Composição de features + layouts (sem lógica própria)
│   ├── DashboardPage.tsx
│   ├── LivePage.tsx
│   ├── GrowthPage.tsx
│   ├── InsightsPage.tsx
│   ├── MonetizationPage.tsx
│   ├── SettingsPage.tsx
│   └── auth/
│       ├── LoginPage.tsx
│       └── OnboardingPage.tsx
├── router/
│   ├── index.tsx         # createBrowserRouter + RouterProvider
│   ├── routes.ts         # Constantes de rotas (ROUTES.DASHBOARD etc.)
│   └── guards/           # Route guards (auth, plano)
├── App.tsx
└── main.tsx
```

**Regra de dependência:**

```
pages → features → components/ui → utils/types
         ↓
       services ← store
```

- `pages/` nunca contém lógica — só compõe
- `features/` nunca importa de outras `features/` diretamente
- `services/` é a única camada que faz chamadas HTTP

## Design System

Conceito visual **Signal** — painel de controle de missão. Dark mode como padrão.

Fontes carregadas via Google Fonts:
- **Inter** — headings e body
- **JetBrains Mono** — valores numéricos e métricas (tabular-nums)

Todos os tokens estão em `src/styles/tokens.css` como CSS custom properties e podem ser usados diretamente:

```css
/* Exemplos */
color: var(--color-brand-400);
font-family: var(--font-mono);
padding: var(--space-4);
border-radius: var(--radius-xl);
```

Documentação completa do Design System: [`docs/design-system.md`](../docs/design-system.md)

## Plataformas suportadas

| Plataforma | Status no MVP |
|---|---|
| Twitch | Fase 1 |
| YouTube | Fase 1 |
| Kick | Fase 1 |
| Trovo | Fase 1 |
| Patreon / Ko-fi / Streamlabs / StreamElements | Fase 1 (monetização) |
| TikTok, Facebook Live, Instagram Live, DLive | Fase 2 |
| AfreecaTV/SOOP, CHZZK, Bilibili | Fase 4 |

## Rotas

| Rota | Tela | Autenticação |
|---|---|---|
| `/login` | Login | Pública |
| `/onboarding` | Criar conta | Pública |
| `/dashboard` | Visão geral multi-plataforma | Autenticada |
| `/dashboard/:platform` | Dashboard por plataforma | Autenticada |
| `/live` | Live ativa em tempo real | Autenticada |
| `/crescimento` | Evolução de seguidores | Autenticada |
| `/insights` | Feed de insights automáticos | Autenticada |
| `/monetizacao` | Receita consolidada | Autenticada (Pro) |
| `/configuracoes` | Plataformas, perfil, alertas | Autenticada |
| `/agency/criadores` | Gestão de criadores | Autenticada (Agency) |

## Path alias

O alias `@/` aponta para `src/`. Use em todos os imports:

```ts
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/router/routes'
```

## Convenções

- Componentes em `PascalCase`, arquivos em `PascalCase.tsx`
- Hooks em `camelCase` com prefixo `use`
- Estilos em CSS Modules (`.module.css`) por componente — sem classes globais fora de `globals.css`
- Nenhum token de cor ou tamanho hardcoded — sempre usar variáveis de `tokens.css`
- Nenhuma chamada direta a APIs externas (YouTube, Twitch etc.) — apenas via `services/`
