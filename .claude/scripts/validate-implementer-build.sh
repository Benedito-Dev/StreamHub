#!/bin/bash
# validate-implementer-build.sh — StreamHub
# SubagentStop hook para o Implementer
# Double-check: garante que o build passa ANTES de retornar ao Orchestrator
#
# StreamHub e monorepo: build esta em Frontend/ (e futuramente Backend/)

set -euo pipefail

cat > /dev/null 2>&1 || true

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

echo "Double-check: validando build do Implementer..." >&2

# =====================================================================
# DETECTAR QUAL CAMADA FOI ALTERADA
# =====================================================================

FRONTEND_CHANGED=false
BACKEND_CHANGED=false

if git rev-parse --git-dir > /dev/null 2>&1; then
  CHANGED_FILES=$(git status --porcelain | awk '{print $2}')
  if echo "$CHANGED_FILES" | grep -q '^Frontend/'; then
    FRONTEND_CHANGED=true
  fi
  if echo "$CHANGED_FILES" | grep -q '^Backend/'; then
    BACKEND_CHANGED=true
  fi
  # Se nenhum detectado pelo git, tentar por existencia das pastas
  if [ "$FRONTEND_CHANGED" = false ] && [ "$BACKEND_CHANGED" = false ]; then
    [ -d "Frontend" ] && FRONTEND_CHANGED=true
  fi
else
  # Sem git: validar o que existir
  [ -d "Frontend" ] && FRONTEND_CHANGED=true
  [ -d "Backend" ] && BACKEND_CHANGED=true
fi

# =====================================================================
# VALIDACAO 1: Build do Frontend
# =====================================================================
if [ "$FRONTEND_CHANGED" = true ] && [ -f "Frontend/package.json" ]; then
  echo "Validando build do Frontend..." >&2

  if ! (cd Frontend && npm run build) > /tmp/subagent-build-check.log 2>&1; then
    echo -e "${RED}BUILD FRONTEND FALHOU no double-check!${NC}" >&2
    echo "Implementer NAO pode retornar com build quebrado." >&2
    echo "Ultimas 10 linhas:" >&2
    tail -10 /tmp/subagent-build-check.log >&2

    ERRMSG=$(tail -5 /tmp/subagent-build-check.log | tr '\n' ' ' | sed 's/"/\\"/g')
    cat <<EOF
{
  "decision": "block",
  "reason": "BUILD FRONTEND FALHOU no double-check (cd Frontend && npm run build). Implementer precisa corrigir o build antes de retornar. Erro: ${ERRMSG}"
}
EOF
    exit 0
  fi

  echo -e "${GREEN}Double-check: BUILD FRONTEND OK${NC}" >&2
fi

# =====================================================================
# VALIDACAO 2: Build do Backend (quando existir)
# =====================================================================
if [ "$BACKEND_CHANGED" = true ] && [ -f "Backend/package.json" ]; then
  echo "Validando build do Backend..." >&2

  if ! (cd Backend && npm run build) >> /tmp/subagent-build-check.log 2>&1; then
    echo -e "${RED}BUILD BACKEND FALHOU no double-check!${NC}" >&2
    tail -10 /tmp/subagent-build-check.log >&2

    ERRMSG=$(tail -5 /tmp/subagent-build-check.log | tr '\n' ' ' | sed 's/"/\\"/g')
    cat <<EOF
{
  "decision": "block",
  "reason": "BUILD BACKEND FALHOU no double-check (cd Backend && npm run build). Erro: ${ERRMSG}"
}
EOF
    exit 0
  fi

  echo -e "${GREEN}Double-check: BUILD BACKEND OK${NC}" >&2
fi

# =====================================================================
# VALIDACAO 3: Implementation notes existem
# =====================================================================
IMPL_DIR="workspace/implementations"
LATEST_IMPL=""
if [ -d "$IMPL_DIR" ]; then
  LATEST_IMPL=$(find "$IMPL_DIR" -name "impl-*.md" -type f -print0 2>/dev/null | xargs -0 ls -t 2>/dev/null | head -1 || true)
fi

if [ -z "${LATEST_IMPL:-}" ]; then
  cat <<EOF
{
  "decision": "block",
  "reason": "Implementation notes nao encontradas em workspace/implementations/. Implementer precisa criar impl-[modulo]-[desc]-taskN.md antes de retornar."
}
EOF
  exit 0
fi

echo -e "${GREEN}Double-check: Implementation notes OK${NC}" >&2
echo -e "${GREEN}Double-check COMPLETO: Implementer pode retornar.${NC}" >&2
exit 0
