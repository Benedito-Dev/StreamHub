#!/bin/bash
# block-destructive-commands.sh — StreamHub
# PreToolUse hook que bloqueia comandos destrutivos

set -euo pipefail

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if [ -z "$COMMAND" ]; then
  exit 0
fi

# =====================================================================
# 1. PRISMA DESTRUTIVO (Backend — quando existir)
# =====================================================================
if echo "$COMMAND" | grep -iE 'accept-data-loss|--force-reset' > /dev/null; then
  echo "BLOQUEADO: --accept-data-loss ou --force-reset detectado." >&2
  echo "Use ALTER TABLE RENAME para renomear colunas com seguranca." >&2
  exit 2
fi

if echo "$COMMAND" | grep -iE 'prisma\s+migrate\s+reset' > /dev/null; then
  echo "BLOQUEADO: 'prisma migrate reset' apaga TODO o banco!" >&2
  echo "Faca backup antes: pg_dump -d streamhub > backup.sql" >&2
  exit 2
fi

if echo "$COMMAND" | grep -iE 'prisma\s+db\s+push' > /dev/null; then
  echo "BLOQUEADO: 'prisma db push' pode causar perda de dados!" >&2
  echo "Use 'prisma migrate dev' para mudancas seguras." >&2
  exit 2
fi

# =====================================================================
# 2. SQL DESTRUTIVO
# =====================================================================
if echo "$COMMAND" | grep -iE '\bDROP\s+(TABLE|DATABASE|SCHEMA)\b' > /dev/null; then
  echo "BLOQUEADO: DROP TABLE/DATABASE/SCHEMA detectado!" >&2
  exit 2
fi

if echo "$COMMAND" | grep -iE '\bTRUNCATE\b' > /dev/null; then
  echo "BLOQUEADO: TRUNCATE apaga todos os dados da tabela!" >&2
  exit 2
fi

# =====================================================================
# 3. FILESYSTEM DESTRUTIVO
# =====================================================================
if echo "$COMMAND" | grep -iE 'rm\s+(-rf|-fr)\s+(/|~|Frontend/src/|Backend/src/|\.claude/|workspace/|node_modules/)' > /dev/null; then
  echo "BLOQUEADO: rm -rf em diretorio critico!" >&2
  echo "Diretorios protegidos: src/, .claude/, workspace/, node_modules/" >&2
  exit 2
fi

if echo "$COMMAND" | grep -iE 'rm\s+(-rf|-fr)\s+\.git' > /dev/null; then
  echo "BLOQUEADO: rm -rf .git apagaria todo o historico do StreamHub!" >&2
  exit 2
fi

# =====================================================================
# 4. GIT DESTRUTIVO
# =====================================================================
if echo "$COMMAND" | grep -iE 'git\s+push\s+.*--force.*\b(main|master)\b' > /dev/null; then
  echo "BLOQUEADO: git push --force em main/master!" >&2
  exit 2
fi

# =====================================================================
# 5. STREAMHUB-SPECIFIC: Proteger tokens OAuth
# =====================================================================
if echo "$COMMAND" | grep -iE 'console\.(log|info|debug).*token' > /dev/null; then
  echo "AVISO: Possivel log de token detectado!" >&2
  echo "NUNCA logar tokens OAuth, JWT ou chaves de API." >&2
  # Nao bloqueia — so avisa. Claude deve revisar antes de executar.
fi

# Bloquear chamadas diretas a APIs externas via curl/fetch no Frontend
if echo "$COMMAND" | grep -iE 'curl.*api\.twitch\.tv|curl.*googleapis\.com|curl.*kick\.com|curl.*trovo\.live' > /dev/null; then
  echo "AVISO: Chamada direta a API de plataforma detectada." >&2
  echo "No StreamHub, o Backend (NestJS) chama as APIs externas, nao o Frontend." >&2
  # Avisa mas nao bloqueia (pode ser teste/debug legitimo)
fi

# =====================================================================
# COMANDO PERMITIDO
# =====================================================================
exit 0
