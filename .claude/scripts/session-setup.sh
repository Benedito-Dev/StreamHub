#!/bin/bash
# session-setup.sh — StreamHub
# SessionStart hook — verifica pre-requisitos ao iniciar a sessao

set -euo pipefail

ERRORS=0
WARNINGS=0
CONTEXT=""

# =====================================================================
# CHECK 1: Node.js instalado
# =====================================================================
if ! command -v node &>/dev/null; then
  CONTEXT+="ERROR: Node.js nao encontrado. Instale antes de continuar.\n"
  ERRORS=$((ERRORS + 1))
else
  NODE_VERSION=$(node --version)
  CONTEXT+="Node.js: $NODE_VERSION\n"
fi

# =====================================================================
# CHECK 2: Frontend (monorepo — package.json esta em Frontend/)
# =====================================================================
if [ -d "Frontend" ] && [ -f "Frontend/package.json" ]; then
  CONTEXT+="Frontend/package.json: OK\n"

  if [ ! -d "Frontend/node_modules" ]; then
    CONTEXT+="WARNING: Frontend/node_modules nao encontrado. Rode 'cd Frontend && npm install'.\n"
    WARNINGS=$((WARNINGS + 1))
  else
    CONTEXT+="Frontend/node_modules: OK\n"
  fi
else
  CONTEXT+="INFO: Frontend/ nao encontrado ou sem package.json.\n"
fi

# =====================================================================
# CHECK 3: Backend (ainda nao criado — avisa quando existir)
# =====================================================================
if [ -d "Backend" ]; then
  if [ -f "Backend/package.json" ]; then
    CONTEXT+="Backend/package.json: OK\n"

    if [ ! -d "Backend/node_modules" ]; then
      CONTEXT+="WARNING: Backend/node_modules nao encontrado. Rode 'cd Backend && npm install'.\n"
      WARNINGS=$((WARNINGS + 1))
    else
      CONTEXT+="Backend/node_modules: OK\n"
    fi

    # Prisma (se backend usar)
    if [ -d "Backend/prisma" ] || [ -f "Backend/prisma/schema.prisma" ]; then
      if [ ! -d "Backend/node_modules/.prisma/client" ]; then
        CONTEXT+="WARNING: Prisma detectado mas client nao gerado. Rode 'cd Backend && npx prisma generate'.\n"
        WARNINGS=$((WARNINGS + 1))
      else
        CONTEXT+="Prisma client: OK\n"
      fi
    fi
  fi
else
  CONTEXT+="INFO: Backend/ ainda nao criado (Fase 0 do roadmap).\n"
fi

# =====================================================================
# CHECK 4: .env — Frontend usa VITE_API_URL
# =====================================================================
if [ -f "Frontend/.env.example" ] || [ -f ".env.example" ]; then
  ENV_FILE=""
  [ -f "Frontend/.env" ] && ENV_FILE="Frontend/.env"
  [ -f ".env" ] && ENV_FILE=".env"

  if [ -z "$ENV_FILE" ]; then
    CONTEXT+="WARNING: .env.example existe mas .env nao. Copie e configure (VITE_API_URL).\n"
    WARNINGS=$((WARNINGS + 1))
  else
    CONTEXT+=".env: OK\n"
  fi
fi

# =====================================================================
# CHECK 5: Git branch
# =====================================================================
BRANCH=$(git branch --show-current 2>/dev/null || echo "(sem git)")
CONTEXT+="Git branch: $BRANCH\n"

if git rev-parse --git-dir > /dev/null 2>&1; then
  MODIFIED=$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')
  CONTEXT+="Arquivos modificados: $MODIFIED\n"
fi

# =====================================================================
# CHECK 6: workspace/ para multi-agent
# =====================================================================
if [ ! -d "workspace" ]; then
  CONTEXT+="WARNING: workspace/ nao existe. Agents multi-agent precisam dele.\n"
  WARNINGS=$((WARNINGS + 1))
else
  CONTEXT+="workspace/: OK\n"
fi

# =====================================================================
# CHECK 7: CLAUDE.md
# =====================================================================
if [ -f "CLAUDE.md" ]; then
  CONTEXT+="CLAUDE.md: OK\n"
else
  CONTEXT+="INFO: CLAUDE.md nao existe (recomendado).\n"
fi

# =====================================================================
# OUTPUT
# =====================================================================
echo "=== StreamHub Session Setup ==="
echo -e "$CONTEXT"

if [ "$ERRORS" -gt 0 ]; then
  echo "RESULTADO: $ERRORS erros, $WARNINGS warnings"
  echo "Corrija erros antes de comecar."
else
  echo "RESULTADO: Ambiente OK ($WARNINGS warnings)"
fi

exit 0
