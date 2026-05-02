# Reviewer Memory — StreamHub

Padrões de qualidade e issues encontrados ao longo das tasks.

---

## Regras Criticas do StreamHub (Sempre Verificar)

1. **Frontend nunca chama API externa** — grep por `fetch.*api.twitch.tv`, `googleapis.com`, etc.
2. **CSS Modules obrigatório** — sem inline styles (exceto cores dinâmicas de plataforma)
3. **Token OAuth nunca no Frontend** — nunca exposto, nunca logado
4. **Build em subdiretório** — `cd Frontend && npm run build`, não `npm run build` na raiz

---

## Issues Recorrentes por Modulo

(Registrados ao longo das tasks)

---

## Scores Historicos

(Registrados ao longo das tasks)

---

## Violations Arquiteturais Encontradas

(Registradas ao longo das tasks)
