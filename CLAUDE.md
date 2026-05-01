# StreamHub — Contexto do Projeto para Claude Code

## O que é o StreamHub

StreamHub é uma plataforma web que unifica os dashboards de analytics de múltiplas plataformas de streaming (YouTube, Twitch, Kick, TikTok) em uma interface única e inteligente.

O problema que resolve: streamers que operam em múltiplas plataformas precisam acessar 4 dashboards diferentes para acompanhar seus números. O StreamHub conecta todas as contas via OAuth oficial e exibe tudo em um só lugar, com insights cruzados que nenhuma plataforma oferece individualmente.

---

## Status Atual

> Fase 0 — Concepção e documentação. MVP ainda não iniciado.

---

## Stack Definido

| Camada         | Tecnologia          |
|----------------|---------------------|
| Frontend       | React + TypeScript  |
| Backend / API  | Node.js + NestJS    |
| Banco de dados | PostgreSQL + Redis  |
| Autenticação   | OAuth 2.0           |
| Real-time      | WebSocket (Socket.io) |
| Infra          | AWS ou GCP          |

---

## Plataformas Suportadas

### Grupo 1 — Alta Viabilidade (Integração direta, API pública robusta)

| Plataforma      | Viabilidade | Observação                                                         |
|-----------------|-------------|--------------------------------------------------------------------|
| YouTube         | ✅ Alta      | Data API v3 + Live Streaming API; live, VOD, subscribers, chat     |
| Twitch          | ✅ Alta      | Melhor API do mercado; viewers, subs, clips, EventSub em tempo real|
| Kick            | ✅ Alta      | API pública lançada mar/2025; subscriptions, follows, chat, status |
| Trovo           | ✅ Alta      | OAuth 2.0 + REST + WebSocket bem documentados; viewers, clips, chat|
| Patreon         | ✅ Alta      | API de monetização; membros, tiers, webhooks de pagamento          |
| Ko-fi           | ✅ Alta      | Webhook + REST simples; donativos, memberships, tiers              |
| Streamlabs      | ✅ Alta      | Alertas, donativos, metas, widgets; muito usado por streamers      |
| StreamElements  | ✅ Alta      | Overlays, alertas, pontos, tips, analytics de engajamento          |

### Grupo 2 — Média Viabilidade (Possível com ressalvas)

| Plataforma          | Viabilidade | Observação                                                      |
|---------------------|-------------|-----------------------------------------------------------------|
| TikTok              | 🟡 Média    | API oficial restrita; viável via Euler Stream / TikTool         |
| Facebook / Meta Live| 🟡 Média    | Graph API pública; Gaming Program encerra 2026; em declínio     |
| Instagram Live      | 🟡 Média    | Apenas contas Business/Creator; sem viewers em tempo real       |
| LinkedIn Live       | 🟡 Média    | Requer aprovação; focado em B2B/eventos corporativos            |
| DLive               | 🟡 Média    | API GraphQL pública; nicho blockchain/cripto                    |
| AfreecaTV / SOOP    | 🟡 Média    | Requer parceria; mercado coreano; relançada como SOOP em 2024   |
| Bilibili            | 🟡 Média    | Sem API oficial externa; API unofficial bem documentada         |
| CHZZK (Naver)       | 🟡 Média    | Substituta do Twitch na Coreia; API em consolidação             |
| Discord             | 🟡 Média    | Stage Channels + comunidades; não é plataforma de streaming puro|
| Rumble              | 🟡 Média    | API básica; mercado alternativo nos EUA                         |

### Grupo 3 — Baixa Viabilidade / Descartadas

| Plataforma     | Status       | Motivo                                              |
|----------------|--------------|-----------------------------------------------------|
| X (Twitter)    | 🔴 Baixa     | Leitura de API paga ($100/mês+); instável           |
| Nimo TV        | 🔴 Baixa     | Sem API pública documentada                         |
| Bigo Live      | 🔴 Inviável  | Apenas SDK de ads; ecossistema fechado              |
| Douyu          | 🔴 Inviável  | Mercado chinês fechado; sem docs em inglês          |
| Huya           | 🔴 Inviável  | Mercado chinês fechado; sem docs em inglês          |
| Steam Broadcast| 🔴 Baixa     | Muito específico para jogos no Steam                |
| Spotify        | 🔴 Baixa     | Sem analytics de criador na API pública             |
| Theta.tv       | 🔴 Baixa     | Nicho blockchain; complexidade sem retorno claro    |
| Odysee         | 🔴 Baixa     | Plataforma em declínio; nicho                       |
| Caffeine       | ❌ Encerrada  | Fechou jun/2024                                     |
| Glimesh        | ❌ Encerrada  | Fechou jun/2023                                     |
| Mixer          | ❌ Encerrada  | Fechou jul/2020 (Microsoft)                         |
| Periscope      | ❌ Encerrada  | Fechou mar/2021 (Twitter)                           |

**Decisão:** MVP foca em YouTube + Twitch + Kick + Trovo. Monetização (Patreon, Ko-fi, Streamlabs, StreamElements) entra junto como camada complementar.

---

## Fases do Roadmap

- **Fase 0** (1 mês): Validação de APIs, setup de ambiente, OAuth
- **Fase 1 — MVP** (3 meses): YouTube + Twitch + Kick + Trovo; métricas de seguidores, views, live em tempo real
- **Fase 1b** (junto ao MVP): Camada de monetização — Patreon, Ko-fi, Streamlabs, StreamElements
- **Fase 2** (2 meses): TikTok (via Euler Stream), Facebook Live, Instagram Live, DLive; relatórios semanais
- **Fase 3** (2 meses): Insights inteligentes, sugestão de horários, alertas automáticos; LinkedIn Live, Discord (comunidades)
- **Fase 4** (contínuo): Mercados asiáticos (AfreecaTV/SOOP, CHZZK, Bilibili); app mobile; API própria (plano Agency)

---

## Requisitos Funcionais Principais

### Autenticação
- RF01: Conexão de contas via OAuth oficial por plataforma
- RF02: Tokens armazenados de forma segura com renovação automática
- RF03: Desconexão de plataforma a qualquer momento
- RF04: Status de conexão visível por plataforma

### Dashboard
- RF05: Cards de resumo com principais métricas por plataforma
- RF06: Dashboard personalizável pelo usuário
- RF07: Atualização automática em intervalos configuráveis
- RF08: Score agregado de performance multi-plataforma

### Analytics de Live
- RF09: Viewers simultâneos de todas as plataformas em tempo real
- RF10: Histórico de pico, duração e chat activity por live
- RF11: Relatório automático ao encerrar uma live

### Crescimento
- RF12: Gráfico de evolução de seguidores consolidado e por plataforma
- RF13: Comparação de períodos: 7d, 30d, 3m, 1a
- RF14: Destaque de dias e horários de maior crescimento orgânico

### Insights
- RF15: Melhor plataforma por taxa de conversão viewer → seguidor
- RF16: Sugestão de horários com base no histórico
- RF17: Alertas quando métricas caem abaixo da média histórica
- RF18: Relatório semanal automático

---

## Requisitos Não Funcionais

- Dashboard carrega em menos de 3 segundos
- Latência máxima de 30s para dados de live em tempo real
- SLA mínimo de 99,5% para plano pago
- Tokens OAuth armazenados com AES-256
- HTTPS/TLS obrigatório
- Cada integração de plataforma deve ser um módulo isolado

---

## Arquitetura de Dados

O frontend NUNCA consome as APIs externas diretamente.

Fluxo:
1. Usuário autentica via OAuth na plataforma de origem
2. Backend recebe e armazena o token de acesso de forma segura
3. Jobs periódicos consultam as APIs das plataformas e persistem os dados
4. Frontend consome apenas a API interna unificada do StreamHub
5. Dados de live em tempo real são servidos via WebSocket

---

## Modelo de Negócio

| Plano   | Preço       | Funcionalidades                                              |
|---------|-------------|--------------------------------------------------------------|
| Free    | R$ 0/mês    | 2 plataformas, dados básicos, histórico 30 dias             |
| Pro     | R$ 49/mês   | Todas as plataformas, insights, histórico 1 ano, alertas    |
| Agency  | R$ 199/mês  | Múltiplos criadores, relatórios white-label, API própria    |

---

## Riscos Conhecidos

- **APIs mudarem sem aviso** → módulos isolados por plataforma, monitorar changelogs
- **TikTok bloquear live analytics** → já tratado como opcional desde o início
- **Custo de infra em escala** → arquitetura serverless para partes não críticas, cache agressivo
- **Concorrente copiar** → velocidade de execução e foco em nicho (streamers ao vivo)

---

## Convenções para este Projeto

- Commits em português ou inglês, mas consistente por PR
- Cada integração de plataforma fica em módulo próprio: `src/integrations/youtube`, `src/integrations/twitch`, etc.
- Variáveis de ambiente para todos os tokens e secrets — nunca hardcoded
- Testes obrigatórios para módulos de integração (mocks das APIs externas)

---

## Documentação de Referência

- `docs/StreamHub_Requisitos.docx` — Documento completo de requisitos (v1.0)
- `docs/StreamHub_Requisitos.pdf` — Versão PDF do documento de requisitos
