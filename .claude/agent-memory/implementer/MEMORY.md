# Implementer Memory — StreamHub

Codepaths, patterns e gotchas acumulados ao longo das tasks.

---

## Codepaths Descobertos

- `MetricCard` (Frontend/src/components/shared/MetricCard/index.tsx) — suporta `loading` prop com skeleton automático. Usar sempre que buscar dados assíncronos.
- `api.ts` (Frontend/src/services/api.ts) — wrapper fetch com BASE_URL = VITE_API_URL. Único ponto de chamada HTTP no Frontend.
- Alias `@/` configurado no tsconfig — usar sempre em vez de imports relativos profundos.
- Stores Zustand: `auth.store.ts`, `platforms.store.ts`, `ui.store.ts` — ainda interfaces, implementação pendente.
- React Router v7 (`react-router-dom@7`) — usar `createBrowserRouter`, não `BrowserRouter`.
- Build command: `cd Frontend && npm run build` (monorepo — package.json está em Frontend/).

---

## Patterns que Funcionaram

(Registrados ao longo das tasks)

---

## Gotchas e Armadilhas

(Registrados ao longo das tasks)

---

## Dependencias entre Modulos

- Features (dashboard, live, growth, etc.) dependem de `services/platforms/*.ts`
- `services/platforms/*.ts` dependem de `services/api.ts`
- `services/api.ts` depende de `VITE_API_URL` (env var)
