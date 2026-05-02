# Conventional Commits

Padrao internacional de commits. Referencia oficial: https://www.conventionalcommits.org/

---

## FORMATO OBRIGATORIO

```
<type>(<scope>): <subject>

<body>

<footer>
```

---

## 1. TYPE (Obrigatorio)

| Type | Uso | Exemplo |
|------|-----|---------|
| `feat` | Nova funcionalidade | `feat(auth): adiciona refresh tokens` |
| `fix` | Correcao de bug | `fix(users): corrige erro 500 ao deletar` |
| `docs` | Apenas documentacao | `docs(readme): adiciona secao de setup` |
| `refactor` | Refatoracao sem mudanca de comportamento | `refactor(db): extrai queries em repository` |
| `perf` | Melhoria de performance | `perf(api): adiciona cache em listagem` |
| `test` | Adicionar/corrigir testes | `test(auth): cobre cenario de token expirado` |
| `chore` | Build, configs, dependencies | `chore(deps): atualiza typescript para 5.4` |
| `style` | Formatacao (sem mudanca logica) | `style: aplica prettier em todo src/` |
| `ci` | Mudancas em CI/CD | `ci: adiciona workflow de release` |
| `build` | Mudancas no sistema de build | `build: migra de webpack para vite` |

Escolha o type CORRETO — afeta CHANGELOG automatico e versionamento semantico.

---

## 2. SCOPE (Obrigatorio)

Identifica o modulo afetado. Exemplos genericos:
- `auth`, `users`, `payments`, `api`, `db`, `common`, `config`, `docs`

Use os nomes reais dos seus modulos (os do projeto em questao, nao genericos).

**Se afeta multiplos modulos:** use o principal ou `core`.

---

## 3. SUBJECT (Obrigatorio)

Descricao breve **em portugues** do que foi feito.

**Regras:**
- Maximo 72 caracteres
- Primeira letra minuscula
- Sem ponto final
- Imperativo (`adiciona`, nao `adicionado`/`adicionando`)
- Claro e objetivo

```
CORRETO:  feat(auth): adiciona validacao de refresh tokens
ERRADO:   feat(auth): Adicionado validacao.          # maiuscula + ponto + passado
ERRADO:   feat(auth): adicionando validacao          # gerundio
ERRADO:   feat: validacao                            # sem scope, vago
```

---

## 4. BODY (Recomendado em commits importantes)

Descricao detalhada. Uma linha por ponto com `-`:

```
feat(auth): adiciona refresh tokens

- Auth:
  * POST /auth/refresh — novo endpoint
  * Rotacao automatica (1 uso por refresh)
  * TTL: 15min access, 7 dias refresh

- Security:
  * Tokens hasheados com bcrypt
  * Revogacao em cascata ao trocar senha

- Tests:
  * 12 unit tests (100% pass)
  * Build: PASS, TypeScript: 0 errors

- Documentation:
  * JSDoc em RefreshTokenService
  * CHANGELOG atualizado
```

---

## 5. FOOTER (Opcional)

Referencias, breaking changes:

```
Closes #123
Refs #456

BREAKING CHANGE: Remove campo deprecated 'token' (usar 'accessToken')

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## EXEMPLOS COMPLETOS

### Feature

```
feat(payments): adiciona integracao com Stripe

- Payments:
  * StripeService com @stripe/stripe-node
  * POST /payments/checkout — cria Session
  * Webhook /payments/webhook valida assinatura

- Configuration:
  * STRIPE_SECRET_KEY e STRIPE_WEBHOOK_SECRET em .env
  * Exemplo atualizado em .env.example

- Tests:
  * 8 unit tests (100% pass)
  * 2 integration tests (100% pass)

Closes #42
```

### Bug Fix

```
fix(users): corrige erro 500 ao deletar usuario com posts

- Problema:
  * DELETE /users/:id falhava se user tinha posts
  * Foreign key violation nao estava sendo tratada

- Solucao:
  * Soft delete (deletedAt) em vez de remove fisico
  * Cascade para posts (marca como arquivado)

- Tests:
  * Cenario do bug agora coberto
  * 3 novos integration tests

Fixes #89
```

### Refactor

```
refactor(db): extrai queries de usuarios em repository

- Criado UserRepository em src/users/user.repository.ts
- Queries complexas movidas do service para o repository
- Service agora so tem logica de negocio

- Metrica:
  * UserService: 320 linhas -> 180 linhas
  * UserRepository: 140 linhas (novo)

- Tests:
  * Todos os tests existentes continuam passando
  * 5 novos unit tests no repository
```

### Performance

```
perf(api): otimiza listagem de projetos com cursor pagination

- Antes: offset pagination (skip), O(n) em paginas altas
- Depois: cursor pagination, O(1) sempre

- Benchmark:
  * Pagina 1: 45ms -> 42ms (igual)
  * Pagina 100: 2.3s -> 48ms (98% reducao)
  * Pagina 1000: 30s+ -> 50ms

- Breaking: API muda — resposta agora inclui `nextCursor` em vez de `page`

BREAKING CHANGE: GET /projects retorna { items, nextCursor } em vez de { items, page, total }

Closes #67
```

---

## COMMITS RUINS (Evitar)

```
# Muito vago
fix: bug

# Sem scope
feat: novo endpoint

# Subject em ingles quando time e BR
feat(auth): add validation

# Gerundio
feat(auth): adicionando validacao

# Body vazio em commit importante
feat(payments): integracao com Stripe
# (sem explicar o que, como, tests, etc.)

# Multiplas mudancas nao relacionadas
feat(auth): refresh tokens + fix users 500 + refactor db
# (quebrar em 3 commits)
```

---

## DICA: COMMIT ATOMICO

Cada commit deve ser **uma mudanca logica**. Se voce tem que escrever "e" no subject, provavelmente sao 2 commits.

- Corretamente: 3 commits pequenos (`feat: X`, `fix: Y`, `refactor: Z`)
- Errado: 1 commit gigante mixando tudo
