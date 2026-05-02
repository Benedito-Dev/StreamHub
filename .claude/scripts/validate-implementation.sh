#!/bin/bash
# validate-implementation.sh — StreamHub
# Stop hook para o agent Implementer
# Valida que a implementacao esta correta antes de passar para o Reviewer
#
# StreamHub e monorepo: Frontend/ e (futuro) Backend/

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "Validando implementacao StreamHub..."

# ==============================================================================
# DETECTAR CAMADA ALTERADA
# ==============================================================================

FRONTEND_CHANGED=false
BACKEND_CHANGED=false

if git rev-parse --git-dir > /dev/null 2>&1; then
  CHANGED_FILES=$(git status --porcelain | awk '{print $2}')
  echo "$CHANGED_FILES" | grep -q '^Frontend/' && FRONTEND_CHANGED=true
  echo "$CHANGED_FILES" | grep -q '^Backend/' && BACKEND_CHANGED=true
fi

# Fallback: se nao detectou pelo git, validar o que existir
if [ "$FRONTEND_CHANGED" = false ] && [ "$BACKEND_CHANGED" = false ]; then
  [ -d "Frontend" ] && FRONTEND_CHANGED=true
  [ -d "Backend" ] && BACKEND_CHANGED=true
fi

# ==============================================================================
# VALIDACAO 1: BUILD DEVE PASSAR (CRITICO)
# ==============================================================================

if [ "$FRONTEND_CHANGED" = true ] && [ -f "Frontend/package.json" ]; then
  echo ""
  echo "Rodando build do Frontend..."

  if ! (cd Frontend && npm run build) > /tmp/build-output.log 2>&1; then
    echo -e "${RED}ERRO: BUILD FRONTEND FALHOU!${NC}" >&2
    tail -20 /tmp/build-output.log >&2
    exit 2
  fi

  echo -e "${GREEN}BUILD FRONTEND PASSOU!${NC}"
fi

if [ "$BACKEND_CHANGED" = true ] && [ -f "Backend/package.json" ]; then
  echo ""
  echo "Rodando build do Backend..."

  if ! (cd Backend && npm run build) >> /tmp/build-output.log 2>&1; then
    echo -e "${RED}ERRO: BUILD BACKEND FALHOU!${NC}" >&2
    tail -20 /tmp/build-output.log >&2
    exit 2
  fi

  echo -e "${GREEN}BUILD BACKEND PASSOU!${NC}"
fi

# ==============================================================================
# VALIDACAO 2: TypeScript — ZERO ERROS
# ==============================================================================

if [ "$FRONTEND_CHANGED" = true ] && [ -f "Frontend/tsconfig.json" ]; then
  echo ""
  echo "Verificando TypeScript do Frontend..."

  if ! (cd Frontend && npx tsc --noEmit) > /tmp/typescript-output.log 2>&1; then
    echo -e "${RED}ERRO: TypeScript Frontend com ERROS!${NC}" >&2
    cat /tmp/typescript-output.log >&2
    exit 2
  fi

  echo -e "${GREEN}TypeScript Frontend: 0 erros${NC}"
fi

if [ "$BACKEND_CHANGED" = true ] && [ -f "Backend/tsconfig.json" ]; then
  echo ""
  echo "Verificando TypeScript do Backend..."

  if ! (cd Backend && npx tsc --noEmit) >> /tmp/typescript-output.log 2>&1; then
    echo -e "${RED}ERRO: TypeScript Backend com ERROS!${NC}" >&2
    cat /tmp/typescript-output.log >&2
    exit 2
  fi

  echo -e "${GREEN}TypeScript Backend: 0 erros${NC}"
fi

# ==============================================================================
# VALIDACAO 3: Implementation notes existem
# ==============================================================================

echo ""
echo "Verificando implementation notes..."

IMPL_DIR="workspace/implementations"

if [ ! -d "$IMPL_DIR" ]; then
  echo -e "${RED}ERRO: workspace/implementations/ nao existe!${NC}" >&2
  exit 2
fi

LATEST_IMPL=$(find "$IMPL_DIR" -name "impl-*.md" -type f -print0 2>/dev/null | xargs -0 ls -t 2>/dev/null | head -1 || true)

if [ -z "$LATEST_IMPL" ]; then
  echo -e "${RED}ERRO: Implementation notes nao encontradas!${NC}" >&2
  echo -e "${YELLOW}Crie: workspace/implementations/impl-[modulo]-[descricao]-taskN.md${NC}" >&2
  exit 2
fi

IMPL_FILENAME=$(basename "$LATEST_IMPL")

if ! echo "$IMPL_FILENAME" | grep -qE '^impl-[a-z0-9]+-[a-z0-9-]+-task[0-9]+\.md$'; then
  echo -e "${RED}ERRO: Nomenclatura incorreta: $IMPL_FILENAME${NC}" >&2
  echo -e "${YELLOW}Formato: impl-[modulo]-[descricao]-taskN.md${NC}" >&2
  exit 2
fi

IMPL_LINES=$(wc -l < "$LATEST_IMPL")
echo -e "${GREEN}OK${NC} Implementation notes: $IMPL_FILENAME ($IMPL_LINES linhas)"

# ==============================================================================
# VALIDACAO 4: ESLint Frontend
# ==============================================================================

if [ "$FRONTEND_CHANGED" = true ] && [ -f "Frontend/eslint.config.js" ]; then
  echo ""
  echo "Rodando ESLint do Frontend..."

  ESLINT_OUTPUT=$((cd Frontend && npx eslint src/ --format json 2>/dev/null) || echo "[]")

  ERROR_COUNT=$(echo "$ESLINT_OUTPUT" | jq '[.[] | .errorCount] | add // 0' 2>/dev/null || echo 0)
  WARNING_COUNT=$(echo "$ESLINT_OUTPUT" | jq '[.[] | .warningCount] | add // 0' 2>/dev/null || echo 0)

  if [ "$ERROR_COUNT" -gt 0 ]; then
    echo -e "${RED}ERRO: ESLint encontrou $ERROR_COUNT erros!${NC}" >&2
    (cd Frontend && npx eslint src/) >&2 || true
    exit 2
  fi

  echo -e "${GREEN}OK${NC} ESLint Frontend: $ERROR_COUNT erros, $WARNING_COUNT warnings"
fi

# ==============================================================================
# VALIDACAO 5: Git status
# ==============================================================================

echo ""
echo "Verificando arquivos modificados..."

if git rev-parse --git-dir > /dev/null 2>&1; then
  MODIFIED_COUNT=$(git status --porcelain | grep -c '^ M\|^M ' || true)
  CREATED_COUNT=$(git status --porcelain | grep -c '^??' || true)

  if [ "$((MODIFIED_COUNT + CREATED_COUNT))" -eq 0 ]; then
    echo -e "${YELLOW}AVISO: Nenhuma mudanca detectada no git${NC}"
  fi

  echo -e "${GREEN}OK${NC} Mudancas: $MODIFIED_COUNT modificados, $CREATED_COUNT novos"
fi

# ==============================================================================
# SUCESSO
# ==============================================================================

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}TODAS AS VALIDACOES PASSARAM!${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Implementacao aprovada para Review!${NC}"
echo ""

exit 0
