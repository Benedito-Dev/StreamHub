# StreamHub — Design System & Mapeamento de Telas

> Versão 1.0 — Maio 2026  
> Stack: React + TypeScript  
> Modo padrão: Dark mode

---

## Sumário

1. [Identidade Visual e Conceito](#1-identidade-visual-e-conceito)
2. [Paleta de Cores](#2-paleta-de-cores)
3. [Tipografia](#3-tipografia)
4. [Espaçamento e Grid](#4-espaçamento-e-grid)
5. [Bordas, Sombras e Efeitos](#5-bordas-sombras-e-efeitos)
6. [Componentes Core](#6-componentes-core)
7. [Iconografia e Assets](#7-iconografia-e-assets)
8. [Estrutura de Navegação](#8-estrutura-de-navegação)
9. [Mapeamento Completo de Telas](#9-mapeamento-completo-de-telas)
10. [Fluxo de Navegação](#10-fluxo-de-navegação)
11. [Hierarquia de Informação por Tela](#11-hierarquia-de-informação-por-tela)

---

# ENTREGÁVEL 1 — DESIGN SYSTEM

---

## 1. Identidade Visual e Conceito

### 1.1 Conceito Central

**Nome do conceito:** *Signal*

O StreamHub é uma central de inteligência para criadores. A metáfora visual é a de um **painel de controle de missão** — como uma sala de controle de transmissão ao vivo, onde múltiplos feeds de dados convergem para um único ponto de decisão. O streamer deve sentir que está *no controle*, vendo tudo ao mesmo tempo sem sobrecarga cognitiva.

**Palavras-chave de design:**
- Preciso — dados limpos, sem ruído visual
- Vivo — movimento sutil, dados em tempo real comunicam atividade
- Profissional — sem excesso de gamificação, mas com energia
- Contextual — informação certa no momento certo
- Confiante — o produto sabe o que está fazendo

### 1.2 Referências de Mercado

| Referência | O que absorver |
|---|---|
| **Linear** | Tipografia apertada, espaçamento preciso, UI densa mas legível |
| **Vercel Dashboard** | Cards de métricas, feedback de status em tempo real, dark mode refinado |
| **Raycast** | Hierarquia visual forte, uso de cor como sinal (não decoração) |
| **Streamlabs** | Familiaridade com o público de streamers, iconografia de plataformas |
| **Grafana** | Densidade de informação em dashboards, containers de charts |

### 1.3 Justificativa para o Público de Streamers

- **Dark mode como padrão:** Streamers trabalham em ambientes com iluminação controlada (estúdios), frequentemente à noite. Dark mode reduz fadiga ocular durante sessões longas de monitoramento.
- **Densidade de informação média-alta:** O usuário quer ver muitos números de uma vez, mas não quer decodificar gráficos complexos para cada insight básico.
- **Cor como sinal:** Vermelho e verde são usados com propósito claro (queda/crescimento). As cores de plataforma (roxo Twitch, vermelho YouTube) funcionam como atalhos cognitivos imediatos.
- **Movimento intencional:** Animações curtas (100–200ms) ao atualizar métricas transmitem que os dados são *ao vivo*, não estáticos.

---

## 2. Paleta de Cores

### 2.1 Design Tokens — Estrutura

```typescript
// tokens/colors.ts
export const colors = {
  // Primárias
  brand: { ... },
  // Accent
  accent: { ... },
  // Neutros
  neutral: { ... },
  // Semânticas
  semantic: { ... },
  // Plataformas
  platforms: { ... },
}
```

### 2.2 Cores Primárias (Brand)

A cor primária do StreamHub é um **violeta elétrico** que remete à transmissão ao vivo, energia e tecnologia. Não conflita com nenhuma plataforma principal (Twitch usa um roxo mais saturado e frio).

```css
/* Brand — Violet */
--color-brand-50:  #F0EBFF;
--color-brand-100: #DDD0FF;
--color-brand-200: #C4ADFF;
--color-brand-300: #A07DFF;
--color-brand-400: #8B5CF6;  /* Primary action */
--color-brand-500: #7C3AED;  /* Primary hover */
--color-brand-600: #6D28D9;  /* Primary active/pressed */
--color-brand-700: #5B21B6;
--color-brand-800: #4C1D95;
--color-brand-900: #2E1065;
```

**Uso principal:**
- `--color-brand-400` → botões primários, links ativos, indicadores de foco
- `--color-brand-500` → hover de botões primários
- `--color-brand-600` → estado pressed, bordas de elementos selecionados
- `--color-brand-300` → highlights em texto sobre fundo escuro

### 2.3 Cores Accent (Secundárias)

Um **cyan/teal** para contrastar com o violeta em contextos de "ao vivo" e indicadores de stream ativo.

```css
/* Accent — Cyan */
--color-accent-50:  #ECFEFF;
--color-accent-100: #CFFAFE;
--color-accent-200: #A5F3FC;
--color-accent-300: #67E8F9;
--color-accent-400: #22D3EE;  /* Live indicator, real-time badge */
--color-accent-500: #06B6D4;
--color-accent-600: #0891B2;
--color-accent-700: #0E7490;
--color-accent-800: #155E75;
--color-accent-900: #164E63;
```

**Uso:**
- `--color-accent-400` → badge "AO VIVO", pulso de viewer count em tempo real
- `--color-accent-500` → ícones de status ativo, highlights de dados em tempo real

### 2.4 Escala de Neutros

Base em **cinza frio** levemente azulado, que harmoniza com o violeta primário e cria profundidade no dark mode.

```css
/* Neutrals — Cool Gray */
--color-neutral-0:   #FFFFFF;
--color-neutral-50:  #F8FAFC;
--color-neutral-100: #F1F5F9;
--color-neutral-200: #E2E8F0;
--color-neutral-300: #CBD5E1;
--color-neutral-400: #94A3B8;
--color-neutral-500: #64748B;
--color-neutral-600: #475569;
--color-neutral-700: #334155;
--color-neutral-800: #1E293B;  /* Surface elevated */
--color-neutral-850: #172033;  /* Surface default */
--color-neutral-900: #0F172A;  /* Background base */
--color-neutral-950: #080D17;  /* Background deep */
```

**Mapeamento semântico para Dark Mode:**

```css
/* Backgrounds */
--color-bg-base:       var(--color-neutral-950);  /* #080D17 — fundo da página */
--color-bg-subtle:     var(--color-neutral-900);  /* #0F172A — sidebar, painéis */
--color-bg-surface:    var(--color-neutral-850);  /* #172033 — cards, containers */
--color-bg-elevated:   var(--color-neutral-800);  /* #1E293B — popovers, modais */
--color-bg-overlay:    var(--color-neutral-700);  /* #334155 — tooltips */

/* Borders */
--color-border-subtle:  var(--color-neutral-800);  /* divisórias suaves */
--color-border-default: var(--color-neutral-700);  /* bordas de card */
--color-border-strong:  var(--color-neutral-600);  /* bordas de input focado */
--color-border-brand:   var(--color-brand-500);    /* bordas de elemento ativo */

/* Texto */
--color-text-primary:   var(--color-neutral-50);   /* títulos, valores principais */
--color-text-secondary: var(--color-neutral-300);  /* labels, subtítulos */
--color-text-muted:     var(--color-neutral-500);  /* placeholders, helper text */
--color-text-disabled:  var(--color-neutral-600);  /* texto desabilitado */
--color-text-inverse:   var(--color-neutral-950);  /* texto sobre fundos claros */
--color-text-brand:     var(--color-brand-300);    /* links, destaques de marca */
```

### 2.5 Cores Semânticas

```css
/* Success — Green */
--color-success-50:  #F0FDF4;
--color-success-200: #BBF7D0;
--color-success-400: #4ADE80;  /* ícone de sucesso */
--color-success-500: #22C55E;  /* texto de sucesso */
--color-success-700: #15803D;
--color-success-bg:  #052E16;  /* fundo de alert de sucesso */

/* Warning — Amber */
--color-warning-50:  #FFFBEB;
--color-warning-200: #FDE68A;
--color-warning-400: #FBBF24;  /* ícone de warning */
--color-warning-500: #F59E0B;  /* texto de warning */
--color-warning-700: #B45309;
--color-warning-bg:  #1C0A00;  /* fundo de alert de warning */

/* Error / Danger — Red */
--color-error-50:  #FFF1F2;
--color-error-200: #FECDD3;
--color-error-400: #F87171;  /* ícone de erro */
--color-error-500: #EF4444;  /* texto de erro */
--color-error-700: #B91C1C;
--color-error-bg:  #1C0000;  /* fundo de alert de erro */

/* Info — Blue */
--color-info-50:  #EFF6FF;
--color-info-200: #BFDBFE;
--color-info-400: #60A5FA;  /* ícone de info */
--color-info-500: #3B82F6;  /* texto de info */
--color-info-700: #1D4ED8;
--color-info-bg:  #0A1628;  /* fundo de alert de info */
```

**Regra de uso semântico:**
- Badges e ícones → usar a variante `400`
- Textos de status → usar a variante `500`
- Fundos de alertas → usar a variante `bg`
- Nunca usar cor semântica pura em elementos grandes (>200px) — causa fadiga visual

### 2.6 Cores por Plataforma

```css
/* Plataformas — cores oficiais com ajuste de luminosidade para dark mode */

/* YouTube */
--color-youtube:        #FF0000;
--color-youtube-muted:  #FF000026;  /* fundo de badge/card YouTube */
--color-youtube-text:   #FF6B6B;    /* texto sobre dark bg */

/* Twitch */
--color-twitch:         #9147FF;
--color-twitch-muted:   #9147FF26;
--color-twitch-text:    #B881FF;

/* Kick */
--color-kick:           #53FC18;
--color-kick-muted:     #53FC1826;
--color-kick-text:      #7DFF4F;

/* Trovo */
--color-trovo:          #1DC34C;
--color-trovo-muted:    #1DC34C26;
--color-trovo-text:     #3DDB66;

/* TikTok */
--color-tiktok:         #FF0050;
--color-tiktok-muted:   #FF005026;
--color-tiktok-text:    #FF4D7D;

/* Facebook */
--color-facebook:       #1877F2;
--color-facebook-muted: #1877F226;
--color-facebook-text:  #5B9EF5;

/* Instagram */
--color-instagram:      #E1306C;
--color-instagram-muted:#E1306C26;
--color-instagram-text: #F06292;

/* Patreon */
--color-patreon:        #FF424D;
--color-patreon-muted:  #FF424D26;
--color-patreon-text:   #FF7A82;

/* Ko-fi */
--color-kofi:           #FF5E5B;
--color-kofi-muted:     #FF5E5B26;
--color-kofi-text:      #FF8F8D;

/* Streamlabs */
--color-streamlabs:     #80F5D2;
--color-streamlabs-muted:#80F5D226;
--color-streamlabs-text: #80F5D2;

/* StreamElements */
--color-streamelements:     #F5A623;
--color-streamelements-muted:#F5A62326;
--color-streamelements-text: #FFC04D;
```

**Diretrizes de uso das cores de plataforma:**
- Usar a cor pura (`--color-plataforma`) apenas em ícones/logos pequenos (16–24px)
- Usar `--color-plataforma-muted` como fundo de badges e cards de plataforma
- Usar `--color-plataforma-text` para textos e valores associados à plataforma sobre dark bg
- Nunca usar a cor pura como fundo de texto — contraste insuficiente no dark mode

---

## 3. Tipografia

### 3.1 Fontes

| Papel | Fonte | Motivo |
|---|---|---|
| **Heading** | `Inter` (Google Fonts) | Legibilidade em alta densidade, excelente em dark mode, amplamente usada por Linear e Vercel |
| **Body** | `Inter` | Consistência com os headings, ótima legibilidade em tamanhos pequenos |
| **Monospace** | `JetBrains Mono` (Google Fonts) | Leitura de valores numéricos, métricas, timestamps e código |

```css
/* Font imports */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

/* Font families */
--font-sans:  'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono:  'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
```

**Justificativa JetBrains Mono para números:** Métricas como `1.234.567 viewers` ou `+12,4%` precisam de alinhamento tabular perfeito. O atributo `font-variant-numeric: tabular-nums` combinado com a fonte mono garante que colunas de números se alinhem verticalmente, essencial para tabelas de analytics.

### 3.2 Escala Tipográfica

```css
/* Font sizes */
--text-xs:   0.625rem;  /* 10px — timestamps, captions */
--text-sm:   0.75rem;   /* 12px — labels, badges, helper text */
--text-base: 0.875rem;  /* 14px — body padrão */
--text-md:   1rem;      /* 16px — body destaque, subtítulos */
--text-lg:   1.125rem;  /* 18px — subtítulos de seção */
--text-xl:   1.25rem;   /* 20px — títulos de card */
--text-2xl:  1.5rem;    /* 24px — títulos de página */
--text-3xl:  1.875rem;  /* 30px — métricas hero */
--text-4xl:  2.25rem;   /* 36px — métricas principais (viewer count) */
--text-5xl:  3rem;      /* 48px — métricas de destaque máximo */

/* Font weights */
--weight-light:    300;
--weight-regular:  400;
--weight-medium:   500;
--weight-semibold: 600;
--weight-bold:     700;
--weight-extrabold:800;

/* Line heights */
--leading-none:    1;      /* métricas numéricas grandes */
--leading-tight:   1.25;   /* headings */
--leading-snug:    1.375;  /* subtítulos */
--leading-normal:  1.5;    /* body text */
--leading-relaxed: 1.625;  /* texto longo, descrições */

/* Letter spacing */
--tracking-tight:  -0.025em;  /* headings grandes */
--tracking-normal:  0em;
--tracking-wide:    0.025em;  /* labels uppercase */
--tracking-wider:   0.05em;   /* badges uppercase */
--tracking-widest:  0.1em;    /* category labels */
```

### 3.3 Estilos Tipográficos Compostos

```css
/* Heading styles */
.text-heading-xl {
  font-size: var(--text-2xl);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--color-text-primary);
}

.text-heading-lg {
  font-size: var(--text-xl);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-tight);
  color: var(--color-text-primary);
}

.text-heading-md {
  font-size: var(--text-lg);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
  color: var(--color-text-primary);
}

/* Body styles */
.text-body-lg {
  font-size: var(--text-md);
  font-weight: var(--weight-regular);
  line-height: var(--leading-normal);
  color: var(--color-text-secondary);
}

.text-body {
  font-size: var(--text-base);
  font-weight: var(--weight-regular);
  line-height: var(--leading-normal);
  color: var(--color-text-secondary);
}

.text-body-sm {
  font-size: var(--text-sm);
  font-weight: var(--weight-regular);
  line-height: var(--leading-normal);
  color: var(--color-text-muted);
}

/* Metric styles — use JetBrains Mono */
.text-metric-hero {
  font-family: var(--font-mono);
  font-size: var(--text-4xl);
  font-weight: var(--weight-bold);
  line-height: var(--leading-none);
  letter-spacing: var(--tracking-tight);
  font-variant-numeric: tabular-nums;
  color: var(--color-text-primary);
}

.text-metric-lg {
  font-family: var(--font-mono);
  font-size: var(--text-3xl);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-none);
  font-variant-numeric: tabular-nums;
  color: var(--color-text-primary);
}

.text-metric-md {
  font-family: var(--font-mono);
  font-size: var(--text-xl);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-none);
  font-variant-numeric: tabular-nums;
  color: var(--color-text-primary);
}

/* Label styles */
.text-label {
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  line-height: var(--leading-none);
  letter-spacing: var(--tracking-wide);
  color: var(--color-text-muted);
}

.text-label-upper {
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-none);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-text-muted);
}
```

---

## 4. Espaçamento e Grid

### 4.1 Sistema de Espaçamento

Base: **4px**. Todos os valores de espaçamento são múltiplos de 4px para garantir alinhamento perfeito em grids.

```css
/* Spacing scale */
--space-0:   0px;
--space-0-5: 2px;
--space-1:   4px;
--space-1-5: 6px;
--space-2:   8px;
--space-2-5: 10px;
--space-3:   12px;
--space-4:   16px;
--space-5:   20px;
--space-6:   24px;
--space-7:   28px;
--space-8:   32px;
--space-9:   36px;
--space-10:  40px;
--space-12:  48px;
--space-14:  56px;
--space-16:  64px;
--space-20:  80px;
--space-24:  96px;
--space-32:  128px;
```

**Guia de uso de espaçamento:**

| Contexto | Token |
|---|---|
| Gap entre ícone e label | `--space-1-5` (6px) |
| Padding interno de badge | `--space-1` × `--space-2` (4px × 8px) |
| Padding interno de botão | `--space-2` × `--space-4` (8px × 16px) |
| Padding interno de card | `--space-4` ou `--space-6` |
| Gap entre cards no grid | `--space-4` (16px) |
| Padding de seção de página | `--space-6` (24px) |
| Padding de página (lateral) | `--space-8` (32px) |
| Gap entre seções de página | `--space-12` (48px) |

### 4.2 Grid e Breakpoints

```css
/* Breakpoints */
--breakpoint-sm:  640px;   /* Mobile landscape */
--breakpoint-md:  768px;   /* Tablet portrait */
--breakpoint-lg:  1024px;  /* Desktop mínimo */
--breakpoint-xl:  1280px;  /* Desktop padrão */
--breakpoint-2xl: 1536px;  /* Desktop wide */
```

**Sistema de Grid por Breakpoint:**

| Breakpoint | Colunas | Gutter | Margem lateral | Largura máxima de conteúdo |
|---|---|---|---|---|
| `< 640px` (Mobile) | 4 | 12px | 16px | 100% |
| `640–768px` (Mobile lg) | 8 | 16px | 24px | 100% |
| `768–1024px` (Tablet) | 8 | 20px | 24px | 100% |
| `1024–1280px` (Desktop sm) | 12 | 24px | 32px | 100% |
| `1280–1536px` (Desktop) | 12 | 24px | 32px | 1280px |
| `> 1536px` (Wide) | 12 | 32px | auto | 1440px |

**Áreas de layout principais:**

```css
/* Layout structure */
--sidebar-width-collapsed: 64px;
--sidebar-width-expanded:  240px;
--topbar-height:           56px;
--content-max-width:       1280px;
```

**Grid de cards do Dashboard:**

| Tela | Cards por linha |
|---|---|
| Mobile (< 640px) | 1 |
| Tablet (640–1024px) | 2 |
| Desktop (1024–1280px) | 3 |
| Wide (> 1280px) | 4 |

---

## 5. Bordas, Sombras e Efeitos

### 5.1 Border Radius

```css
/* Border radius scale */
--radius-none: 0px;
--radius-xs:   2px;   /* badges inline */
--radius-sm:   4px;   /* botões pequenos, inputs */
--radius-md:   6px;   /* botões padrão, chips */
--radius-lg:   8px;   /* cards pequenos */
--radius-xl:   12px;  /* cards de dashboard */
--radius-2xl:  16px;  /* cards hero, modais */
--radius-3xl:  24px;  /* elementos grandes */
--radius-full: 9999px; /* badges pill, avatares, toggles */
```

### 5.2 Sistema de Sombras (Elevation)

No dark mode, sombras pretas não têm impacto visual suficiente. A estratégia é combinar **borda sutil + glow de cor** para elevação.

```css
/* Elevation system — dark mode optimized */

/* Nível 0 — flat, sem elevação */
--shadow-none: none;

/* Nível 1 — card padrão */
--shadow-sm:
  0 1px 2px rgba(0, 0, 0, 0.4),
  inset 0 1px 0 rgba(255, 255, 255, 0.04);

/* Nível 2 — card interativo, hover */
--shadow-md:
  0 4px 6px rgba(0, 0, 0, 0.5),
  0 1px 3px rgba(0, 0, 0, 0.4),
  inset 0 1px 0 rgba(255, 255, 255, 0.06);

/* Nível 3 — dropdown, popover */
--shadow-lg:
  0 10px 15px rgba(0, 0, 0, 0.6),
  0 4px 6px rgba(0, 0, 0, 0.4),
  inset 0 1px 0 rgba(255, 255, 255, 0.08);

/* Nível 4 — modal, drawer */
--shadow-xl:
  0 20px 25px rgba(0, 0, 0, 0.7),
  0 8px 10px rgba(0, 0, 0, 0.5),
  inset 0 1px 0 rgba(255, 255, 255, 0.08);

/* Brand glow — elementos com destaque de marca */
--shadow-brand:
  0 0 0 1px var(--color-brand-500),
  0 0 12px rgba(139, 92, 246, 0.3);

/* Accent glow — elementos ao vivo */
--shadow-accent:
  0 0 0 1px var(--color-accent-400),
  0 0 16px rgba(34, 211, 238, 0.25);

/* Error glow — estados de erro */
--shadow-error:
  0 0 0 1px var(--color-error-500),
  0 0 8px rgba(239, 68, 68, 0.25);
```

### 5.3 Efeitos Especiais

**Glassmorphism — uso criterioso:**

Aplicado apenas em: modais sobre dashboard, overlays de Live Ativa, tooltips de chart.

```css
/* Glass effect */
--glass-bg:     rgba(23, 32, 51, 0.7);   /* --color-bg-surface com 70% opacidade */
--glass-border: rgba(255, 255, 255, 0.08);
--glass-blur:   backdrop-filter: blur(12px) saturate(180%);

/* Composição: */
.glass {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(12px) saturate(180%);
}
```

**Gradientes de marca:**

```css
/* Gradient — hero sections, CTAs premium */
--gradient-brand:
  linear-gradient(135deg, #7C3AED 0%, #22D3EE 100%);

/* Gradient — background sutil de cards brand */
--gradient-brand-subtle:
  linear-gradient(135deg,
    rgba(139, 92, 246, 0.08) 0%,
    rgba(34, 211, 238, 0.04) 100%);

/* Gradient — borda animada de elemento ao vivo */
--gradient-live:
  linear-gradient(90deg, #22D3EE, #8B5CF6, #22D3EE);

/* Gradient — fade de tabelas longas */
--gradient-fade-bottom:
  linear-gradient(to bottom,
    transparent 0%,
    var(--color-bg-surface) 100%);
```

**Animações base:**

```css
/* Motion tokens */
--duration-instant:  50ms;
--duration-fast:     100ms;
--duration-normal:   200ms;
--duration-slow:     300ms;
--duration-slower:   500ms;

--easing-default:    cubic-bezier(0.4, 0, 0.2, 1);  /* ease-in-out */
--easing-out:        cubic-bezier(0, 0, 0.2, 1);     /* ease-out */
--easing-in:         cubic-bezier(0.4, 0, 1, 1);     /* ease-in */
--easing-spring:     cubic-bezier(0.34, 1.56, 0.64, 1); /* spring */
```

---

## 6. Componentes Core

### 6.1 Button

**Variantes:**

| Variante | Uso | Background | Texto | Borda |
|---|---|---|---|---|
| `primary` | Ação principal (Conectar, Salvar) | `brand-400` | `neutral-950` | none |
| `secondary` | Ação secundária (Cancelar, Editar) | `bg-elevated` | `text-primary` | `border-default` |
| `ghost` | Ações terciárias, navegação | transparent | `text-secondary` | none |
| `ghost-brand` | Links de ação com destaque | transparent | `brand-300` | none |
| `danger` | Ações destrutivas (Desconectar, Excluir) | `error-bg` | `error-400` | `error-700` |
| `outline-brand` | CTAs secundários de marca | transparent | `brand-300` | `brand-500` |

**Tamanhos:**

| Tamanho | Padding H × V | Font size | Border radius | Icon size |
|---|---|---|---|---|
| `xs` | 8px × 4px | 12px | `radius-sm` | 12px |
| `sm` | 12px × 6px | 12px | `radius-md` | 14px |
| `md` (padrão) | 16px × 8px | 14px | `radius-md` | 16px |
| `lg` | 20px × 10px | 16px | `radius-lg` | 18px |
| `xl` | 24px × 12px | 16px | `radius-lg` | 20px |

**Estados:**

- `default` → cor base da variante
- `hover` → versão mais clara/brilhante; adicionar `--shadow-sm`
- `focus` → ring de 2px com `brand-400` + 2px offset
- `active/pressed` → versão mais escura; sem sombra
- `loading` → spinner substituindo texto; cursor `wait`; desabilitado
- `disabled` → opacidade 40%; cursor `not-allowed`

**Composição com ícone:** Ícone pode preceder ou suceder o texto. Ícone sozinho (icon-only) usa padding igual em todos os lados. Sempre incluir `aria-label` em botões icon-only.

---

### 6.2 Card

**Variantes de Card:**

**`MetricCard`** — Exibe uma única métrica agregada de plataforma ou consolidada.

- Anatomia: Label superior (text-label-upper) + Valor principal (text-metric-lg) + Delta de variação (badge de %) + Sparkline opcional (mini-chart de 7d) + Ícone de plataforma (16px, canto superior direito)
- Estados: `default`, `hover` (leve brilho na borda), `loading` (skeleton), `error` (borda vermelha sutil + mensagem)
- Tamanho: 100% da coluna grid, altura mínima 96px

**`PlatformCard`** — Card de resumo de uma plataforma específica no dashboard.

- Anatomia: Header com logo + nome da plataforma + badge de status (Ativo/Offline/Erro) + Grid 2×2 de métricas menores + Link "Ver mais"
- Cor da borda esquerda (4px) usa `--color-plataforma` da respectiva plataforma
- Largura: span de 1 coluna (desktop) ou 2 colunas (tablet)

**`LiveCard`** — Card de live em andamento.

- Anatomia: Badge "AO VIVO" com pulso animado (accent-400) + Thumbnail/preview + Nome da live + Viewer count em destaque + Duração + Barra de atividade do chat
- Borda: `--shadow-accent` para indicar estado ativo
- Atualização automática: viewer count anima suavemente ao mudar

**`InsightCard`** — Card de insight automático.

- Anatomia: Ícone categórico + Título do insight (text-heading-md) + Descrição curta + Métrica de destaque + Plataforma associada (badge) + Ação sugerida (link ou botão ghost)
- Variantes de cor por tipo: `positive` (verde), `warning` (âmbar), `info` (azul), `neutral` (cinza)

---

### 6.3 Badge

**Variantes:**

| Variante | Uso | Exemplo |
|---|---|---|
| `platform` | Identificar plataforma | Twitch, YouTube |
| `status` | Estado de conexão ou live | Ativo, Offline, Erro, Expirado |
| `plan` | Plano do usuário | Free, Pro, Agency |
| `live` | Indicar transmissão ao vivo | AO VIVO (com pulso) |
| `delta-positive` | Variação positiva | +12,4% |
| `delta-negative` | Variação negativa | -3,1% |
| `count` | Número em contexto | 3 alertas |
| `new` | Destaque de novidade | Novo |

**Especificação:**
- Padding: `--space-1` vertical × `--space-2` horizontal (badges padrão)
- Font: `text-xs`, `weight-semibold`, `tracking-wide`
- Border-radius: `radius-full` (pill) para todos os tipos
- Badges de plataforma incluem o logo da plataforma (12px) à esquerda do nome
- Badge `live` tem animação de `pulse` no dot indicador (2px, accent-400)

---

### 6.4 Input

**Anatomia:** Label (opcional, acima) + Input field + Helper text / Error message (abaixo)

**Variantes:**

| Variante | Uso |
|---|---|
| `text` | Campos de texto padrão |
| `search` | Com ícone de lupa à esquerda, clear button à direita |
| `password` | Com toggle show/hide à direita |
| `number` | Alinhamento à direita, font-mono |

**Estados:**

| Estado | Border color | Background |
|---|---|---|
| `default` | `border-default` | `bg-surface` |
| `hover` | `border-strong` | `bg-surface` |
| `focus` | `border-brand` + ring | `bg-elevated` |
| `filled` | `border-default` | `bg-surface` |
| `error` | `error-500` | `error-bg` (sutil) |
| `disabled` | `border-subtle` | `bg-subtle` + 60% opacity |
| `readonly` | `border-subtle` | `bg-subtle` |

**Tamanhos:** `sm` (32px altura), `md` (40px), `lg` (48px)

---

### 6.5 Select

Baseado em `Input` visualmente. Inclui ícone chevron à direita. Ao abrir, exibe `Dropdown` com lista de opções.

- Dropdown: background `bg-elevated`, `shadow-lg`, `radius-xl`
- Opções: `text-base`, padding `space-2 space-4`, hover com `bg-overlay`
- Opção selecionada: marca com ícone check + `text-brand`
- Suporta grupos de opções com `text-label-upper` como separador de grupo

---

### 6.6 Toggle (Switch)

- Tamanho: 36px × 20px (padrão), track com `radius-full`
- Off: track `bg-elevated`, thumb `neutral-400`
- On: track `brand-400`, thumb `neutral-0`
- Transição: `duration-normal`, `easing-spring` para o thumb
- Focus: ring de 2px com `brand-400`
- Disabled: opacidade 40%

---

### 6.7 Sidebar / Navigation

**Estrutura:**
- Largura collapsed: `--sidebar-width-collapsed` (64px) — apenas ícones
- Largura expanded: `--sidebar-width-expanded` (240px) — ícones + labels
- Toggle: botão no canto inferior esquerdo da sidebar
- Persiste estado em `localStorage`
- Em mobile (< 1024px): sempre collapsed, overlay ao expandir com backdrop `rgba(0,0,0,0.5)`

**Anatomia da Sidebar:**
```
[Logo StreamHub]          ← 56px de altura, alinhado ao topbar
─────────────────────────
[Nav Group: Principal]
  ● Dashboard
  ● Live
  ● Crescimento
  ● Insights
─────────────────────────
[Nav Group: Monetização]
  ● Receita
─────────────────────────
[Nav Group: Plataformas]  ← Dinâmico, com ícones das plataformas conectadas
  ● YouTube
  ● Twitch
  ● Kick
─────────────────────────
[Espaço flex]
─────────────────────────
[Perfil do usuário]       ← Avatar + nome + plano (expanded)
[Configurações]
[Toggle expand/collapse]
```

**Estados de Item de Nav:**
- `default`: ícone `neutral-500`, label `text-secondary`
- `hover`: ícone `neutral-300`, label `text-primary`, fundo `bg-overlay` radius `radius-md`
- `active`: ícone `brand-400`, label `text-brand` + `weight-semibold`, fundo `brand-muted` (brand com 8% opacidade) radius `radius-md`
- `disabled`: opacidade 40%
- Badge de count (ex: `3 alertas`) posicionado à direita do label ou sobre o ícone

---

### 6.8 Header / Topbar

**Altura:** `--topbar-height` (56px)  
**Background:** `bg-subtle` com `border-bottom: 1px solid border-subtle`  
**Posição:** `sticky top-0`, `z-index: 50`

**Anatomia da Topbar:**
```
[Breadcrumb / Título da página]    [Spacer]    [Barra de busca global]    [Botão de alertas]    [Avatar]
```

- **Breadcrumb:** Para páginas aninhadas (ex: "Histórico > Live do dia 28/04"). Clicável nas partes intermediárias.
- **Busca global:** Expandível ao clicar, busca por métricas, plataformas, lives passadas
- **Ícone de alertas:** Badge com contagem de alertas não lidos. Dropdown de preview ao clicar.
- **Avatar:** Dropdown com: Meu perfil, Configurações, Plano atual, Sair

---

### 6.9 Chart Container

**Componente wrapper para todos os gráficos da plataforma.**

**Anatomia:**
```
[Header do Chart]
  [Título]  [Subtítulo/período]              [Controles: seletor de período | expand | more]
─────────────────────────────────────────────
[Área do chart] (altura variável, mínimo 200px)
─────────────────────────────────────────────
[Footer do chart] (opcional)
  [Legenda]                                  [Nota de dados/fonte]
```

**Variantes de período:** Chips de seleção: `24h` | `7d` | `30d` | `3m` | `1a` | `Custom`

**Cores de série:** Para múltiplas plataformas, usar as cores de plataforma. Para dados consolidados, usar `brand-400`. Garantir sempre contraste e diferenciação acessível (não usar só cor — incluir padrão de linha: sólido, tracejado, pontilhado).

**Loading state:** Skeleton animado que imita a área do chart com barras ou linha placeholder.

---

### 6.10 Alert / Toast

**Alert (inline, persistente):**

```
[Ícone]  [Título]
         [Descrição]                    [Ação (opcional)]  [Fechar]
```

Variantes: `success`, `warning`, `error`, `info`  
Estilos: background usa a variante `bg` da cor semântica. Borda esquerda de 3px na cor da variante.

**Toast (flutuante, temporário):**
- Posição: canto inferior direito, `z-index: 100`, `margin: --space-4`
- Stacking: múltiplos toasts empilham-se verticalmente com `gap: --space-2`
- Auto-dismiss: 4s padrão (erros ficam até serem fechados manualmente)
- Animação de entrada: slide-in da direita + fade-in
- Animação de saída: fade-out + collapse de altura

---

### 6.11 Modal / Drawer

**Modal:**
- Overlay backdrop: `rgba(8, 13, 23, 0.8)` com blur `backdrop-filter: blur(4px)`
- Container: `bg-elevated`, `shadow-xl`, `radius-2xl`
- Tamanhos: `sm` (400px), `md` (560px), `lg` (720px), `xl` (900px), `full` (100vw − 48px)
- Animação: scale-in de 95%→100% + fade-in, `duration-normal`
- Fechar com: botão X no header, clique no backdrop, tecla Escape
- Estrutura: Header (título + botão fechar) + Body (scroll interno) + Footer (ações)

**Drawer:**
- Posição: `right` (padrão) ou `left`
- Largura: `sm` (360px), `md` (480px), `lg` (640px)
- Animação: slide-in da borda + fade-in do backdrop
- Uso típico: Detalhes de uma live, edição de alertas, configuração de plataforma

---

### 6.12 Avatar

**Avatar de usuário:**
- Tamanhos: 24px (xs), 32px (sm), 40px (md), 48px (lg), 64px (xl), 96px (2xl)
- Fallback: iniciais do nome (1 ou 2 letras) sobre fundo gerado por hash do nome (uma das cores de brand/accent)
- Shape: `radius-full` (circular)
- Borda: opcional, 2px sólida com `border-default`
- Status dot: 8px no canto inferior direito, cor semântica de status

**Avatar de plataforma (platform icon):**
- Tamanhos: 16px, 20px, 24px, 32px
- Shape: `radius-sm` (levemente arredondado, diferente do avatar de usuário)
- Background: `--color-plataforma-muted`
- Exibe o logo oficial da plataforma

---

### 6.13 Skeleton Loader

- Aplica-se em qualquer componente enquanto dados carregam
- Cor base: `bg-elevated`
- Cor de shimmer: `neutral-700` em movimento linear
- Animação: shimmer horizontal, `duration-slower` (1.5s), `easing-default`, `infinite`
- O skeleton deve ter a **mesma shape/dimensão** do conteúdo que vai substituir
- Não usar spinners globais — preferir sempre skeletons localizados

```css
/* Skeleton base */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-bg-elevated) 0%,
    var(--color-neutral-700) 50%,
    var(--color-bg-elevated) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

### 6.14 Empty State

**Anatomia:**
```
[Ícone ilustrativo]   (48px, neutral-600)
[Título]              (text-heading-md, text-primary)
[Descrição]           (text-body, text-muted, max-width 320px)
[Ação principal]      (Button primary ou outline-brand)
[Ação secundária]     (Button ghost, opcional)
```

**Variantes:**

| Variante | Ícone | Título | Ação |
|---|---|---|---|
| `no-data` | BarChart2 | "Sem dados disponíveis" | Configurar período |
| `no-platforms` | Plug | "Nenhuma plataforma conectada" | Conectar plataforma |
| `no-live` | Radio | "Nenhuma live em andamento" | Ver histórico |
| `no-insights` | Lightbulb | "Insights ainda sendo gerados" | Atualizar |
| `error` | AlertTriangle | "Erro ao carregar dados" | Tentar novamente |
| `no-results` | Search | "Nenhum resultado encontrado" | Limpar filtros |

---

### 6.15 Platform Connection Card

**Uso:** Tela de Configurações → Plataformas Conectadas

**Anatomia:**
```
[Logo plataforma 32px]  [Nome da plataforma]  [Badge de status]
                        [Username conectado]
                        [Última sincronização]
[────────────────────────────────────────────────────]
[Permissões ativas: badges de escopo]
[Próxima renovação de token: data]
[────────────────────────────────────────────────────]
[Botão: Reconectar / Desconectar]  [Botão: Ver dados]
```

**Estados do card:**

| Estado | Badge | Borda esquerda | Ação disponível |
|---|---|---|---|
| `connected` | "Ativo" (success) | `success-500` | Desconectar |
| `expired` | "Expirado" (warning) | `warning-500` | Reconectar |
| `error` | "Erro" (error) | `error-500` | Reconectar |
| `disconnected` | "Desconectado" (neutral) | `border-default` | Conectar |
| `connecting` | "Conectando..." (info) | `info-500` | — (loading) |

---

## 7. Iconografia e Assets

### 7.1 Sistema de Ícones

**Biblioteca recomendada: [Lucide Icons](https://lucide.dev)**

Motivos:
- Open source, licença MIT
- Integração nativa com React (`lucide-react`)
- Linha fina (1.5px stroke) e consistente — alinha com a estética precisão do design system
- Mais de 1.400 ícones, incluindo todos os necessários para analytics e streaming
- Tree-shakeable: apenas ícones usados vão para o bundle

**Instalação:**
```bash
npm install lucide-react
```

**Tamanhos de ícone:**

```typescript
// Padrão de uso
type IconSize = 12 | 14 | 16 | 18 | 20 | 24 | 32 | 48;

// Contextos
const iconSizes = {
  inline:     12, // dentro de texto
  badge:      12, // dentro de badges
  button_sm:  14, // botões pequenos
  button_md:  16, // botões médios
  button_lg:  18, // botões grandes
  nav_item:   20, // itens de navegação
  card_icon:  24, // ícones em cards
  empty_state:48, // empty states
};
```

**Ícones-chave do sistema:**

| Contexto | Ícone Lucide |
|---|---|
| Dashboard | `LayoutDashboard` |
| Live | `Radio` |
| Crescimento | `TrendingUp` |
| Insights | `Lightbulb` |
| Monetização | `DollarSign` |
| Configurações | `Settings` |
| Conectar plataforma | `Plug` |
| Desconectar | `Unplug` |
| Alerta | `Bell` |
| Viewer | `Eye` |
| Seguidor | `UserPlus` |
| Compartilhar | `Share2` |
| Expandir chart | `Maximize2` |
| Período | `CalendarRange` |
| Ao vivo | `Wifi` |
| Performance score | `Gauge` |
| Relatório | `FileBarChart` |
| Download | `Download` |
| Filtrar | `Filter` |
| Buscar | `Search` |
| Usuário | `CircleUserRound` |
| Sair | `LogOut` |

### 7.2 Logos de Plataformas

**Regras para logos de plataformas:**

1. **Fonte obrigatória:** Usar sempre os assets oficiais das plataformas (brand kits). Nunca redesenhar logos de plataformas.
2. **Formato:** SVG preferido. PNG como fallback para plataformas sem SVG oficial.
3. **Armazenamento:** `/public/icons/platforms/` com naming: `youtube.svg`, `twitch.svg`, `kick.svg`, etc.
4. **Versões:** Manter duas versões de cada logo:
   - `nome-color.svg` — logo colorido (para uso em `PlatformCard` e `PlatformConnectionCard`)
   - `nome-mono.svg` — versão monocromática branca/cinza (para uso em contextos com menos destaque)
5. **Tamanho de exibição:** Logos de plataformas nunca devem ser exibidos menores que 16px (perda de legibilidade da marca).
6. **Não modificar:** Não aplicar filtros CSS, não alterar cores, não recortar fora do espaço de proteção definido por cada brand kit.

**Logos necessários para o MVP:**

```
/public/icons/platforms/
  youtube-color.svg
  youtube-mono.svg
  twitch-color.svg
  twitch-mono.svg
  kick-color.svg
  kick-mono.svg
  trovo-color.svg
  trovo-mono.svg
  patreon-color.svg
  patreon-mono.svg
  kofi-color.svg
  kofi-mono.svg
  streamlabs-color.svg
  streamlabs-mono.svg
  streamelements-color.svg
  streamelements-mono.svg
```

---

# ENTREGÁVEL 2 — MAPEAMENTO DE ABAS E ESTRUTURA DE TELAS

---

## 8. Estrutura de Navegação

### 8.1 Hierarquia Completa

```
StreamHub
│
├── [Público — Não autenticado]
│   ├── / (Landing Page)
│   ├── /login
│   ├── /cadastro
│   └── /cadastro/verificar-email
│
├── [Onboarding — Primeira vez autenticado]
│   ├── /onboarding/boas-vindas
│   ├── /onboarding/conectar
│   ├── /onboarding/tour
│   └── /onboarding/concluido
│
└── [App — Autenticado]
    │
    ├── /dashboard                         ← Dashboard Overview
    │   └── /dashboard/[plataforma]        ← Dashboard por plataforma
    │
    ├── /live                              ← Live Ativa (tempo real)
    │   ├── /live/historico                ← Histórico de Lives
    │   └── /live/[id]                     ← Relatório de Live Individual
    │
    ├── /crescimento                       ← Visão geral de crescimento
    │   ├── /crescimento/plataforma        ← Análise por plataforma
    │   └── /crescimento/comparar          ← Comparação de períodos
    │
    ├── /insights                          ← Feed de Insights
    │   ├── /insights/horarios             ← Melhores horários
    │   └── /insights/alertas             ← Alertas e notificações
    │
    ├── /monetizacao                       ← Receita consolidada
    │
    ├── /configuracoes                     ← Configurações gerais
    │   ├── /configuracoes/plataformas     ← Plataformas conectadas
    │   ├── /configuracoes/perfil          ← Perfil do usuário
    │   ├── /configuracoes/dashboard       ← Preferências do dashboard
    │   ├── /configuracoes/alertas         ← Alertas configuráveis
    │   └── /configuracoes/plano           ← Plano e faturamento
    │
    └── /agency  [apenas plano Agency]
        ├── /agency/criadores              ← Lista de criadores
        └── /agency/criadores/[id]         ← Visão por criador
```

### 8.2 Navegação Principal (Sidebar)

```
PRINCIPAL
  ● Dashboard         /dashboard
  ● Live              /live
  ● Crescimento       /crescimento
  ● Insights          /insights

MONETIZAÇÃO
  ● Receita           /monetizacao

PLATAFORMAS (dinâmico — apenas plataformas conectadas)
  ● YouTube           /dashboard/youtube
  ● Twitch            /dashboard/twitch
  ● Kick              /dashboard/kick

AGENCY (apenas plano Agency)
  ● Criadores         /agency/criadores

──────────────
  ● Configurações     /configuracoes
  [Avatar + nome + plano]
```

### 8.3 Sub-navegação por Seção

**Dashboard:** Tabs horizontais acima do conteúdo — "Visão Geral" | "YouTube" | "Twitch" | "Kick" | "+ Adicionar"

**Live:** Tabs — "Ao Vivo" | "Histórico"

**Crescimento:** Tabs — "Visão Geral" | "Por Plataforma" | "Comparar Períodos"

**Insights:** Tabs — "Feed" | "Melhores Horários" | "Alertas"

**Configurações:** Menu lateral secundário (dentro da tela) ou tabs verticais — "Plataformas" | "Perfil" | "Dashboard" | "Alertas" | "Plano"

### 8.4 Fluxos Modais

| Modal | Ativado por | Conteúdo |
|---|---|---|
| Conectar plataforma | Botão "+ Conectar" | Seleção de plataforma → OAuth redirect |
| Detalhes de live | Click em LiveCard no histórico | Métricas completas de uma live |
| Criar alerta | Botão "Novo Alerta" | Formulário de configuração |
| Confirmar desconexão | Botão "Desconectar" | Confirmação destrutiva |
| Preview de insight | Click em InsightCard | Detalhe expandido do insight |
| Upgrade de plano | CTA de feature bloqueada | Comparação de planos + CTA de upgrade |
| Configurar widget | Botão de edição no dashboard | Opções de widget |

---

## 9. Mapeamento Completo de Telas

---

### ONBOARDING

---

#### Tela 1.1 — Landing / App Entry

**Rota:** `/`  
**Objetivo:** Apresentar o valor do StreamHub e direcionar para cadastro ou login.  
**Quem acessa:** Visitante não autenticado.

**Conteúdo principal:**
- Hero section: headline + subheadline + CTA "Começar grátis"
- Preview animado do dashboard (screenshot ou animação)
- Seção de logos de plataformas suportadas
- 3 benefícios principais em cards
- Comparação de planos (tabela simplificada)
- Depoimentos (se disponíveis)
- CTA de rodapé + link de login

**Componentes:** Button (primary "Começar grátis", ghost "Entrar"), Badge (plataformas), Card (benefícios), tabela de planos

**Ações:** Cadastrar, Fazer login

---

#### Tela 1.2 — Cadastro

**Rota:** `/cadastro`  
**Objetivo:** Criar conta no StreamHub.

**Conteúdo principal:**
- Logo StreamHub
- Título "Criar sua conta"
- Formulário: nome, e-mail, senha, confirmar senha
- Checkbox de aceite dos Termos e Política de Privacidade
- Botão "Criar conta"
- Divisor "ou"
- OAuth social: Google (mínimo)
- Link "Já tem conta? Entrar"

**Componentes:** Input (text, password), Button (primary, ghost), Toggle (checkbox), Alert (erro de validação)

**Validações:** E-mail único, senha mínimo 8 chars, campos obrigatórios

---

#### Tela 1.3 — Login

**Rota:** `/login`  
**Objetivo:** Autenticar usuário existente.

**Conteúdo principal:**
- Logo StreamHub
- Título "Bem-vindo de volta"
- Formulário: e-mail, senha
- Link "Esqueci minha senha"
- Botão "Entrar"
- Divisor "ou"
- OAuth social: Google
- Link "Não tem conta? Cadastre-se"

**Componentes:** Input, Button, Alert (erro de credenciais)

**Ações:** Login, Recuperar senha, Ir para cadastro

---

#### Tela 1.4 — Boas-vindas (Onboarding Step 1)

**Rota:** `/onboarding/boas-vindas`  
**Objetivo:** Contextualizar o valor do StreamHub e preparar o usuário para a conexão de plataformas.

**Conteúdo principal:**
- Saudação personalizada com o nome do usuário
- Título "Bem-vindo ao StreamHub"
- 3 bullets de o que o usuário vai poder fazer
- Barra de progresso do onboarding (passo 1 de 3)
- CTA "Conectar minha primeira plataforma"

**Componentes:** Button (primary), progress indicator

---

#### Tela 1.5 — Conectar Plataforma (Onboarding Step 2)

**Rota:** `/onboarding/conectar`  
**Objetivo:** Guiar o usuário a conectar pelo menos uma plataforma via OAuth.

**Conteúdo principal:**
- Barra de progresso (passo 2 de 3)
- Grade de plataformas disponíveis (cards com logo + nome)
- Estado de cada card: `disponível`, `conectando`, `conectado` (com check verde), `bloqueado por plano` (cadeado)
- Botão "Continuar" (ativo apenas após pelo menos 1 conexão)
- Link "Pular por agora" (abaixo do botão, texto menor)

**Componentes:** PlatformConnectionCard (versão onboarding), Button (primary, ghost), Badge (status), Skeleton loader durante callback OAuth

**Fluxo OAuth:** Click em plataforma → redirect para OAuth da plataforma → callback → retorno com status `conectado`

---

#### Tela 1.6 — Tour Guiado (Onboarding Step 3)

**Rota:** `/onboarding/tour`  
**Objetivo:** Orientar o usuário nos principais elementos da interface com tooltips.

**Conteúdo principal:**
- Overlay de tour (spotlight nos elementos com tooltip)
- 5 passos: Sidebar → Dashboard → Live → Insights → Configurações
- Controles: "Anterior" / "Próximo" / "Pular tour"
- Indicador de progresso de passo (dots)

**Componentes:** Modal/Drawer estilo tour (biblioteca como Shepherd.js ou implementação custom), Button

---

### DASHBOARD

---

#### Tela 2.1 — Dashboard Overview

**Rota:** `/dashboard`  
**Objetivo:** Visão consolidada e em tempo real de todas as plataformas conectadas.

**Conteúdo principal:**

**Zona 1 — Above the fold (sem scroll):**
- Topbar com título "Dashboard" + último horário de atualização + botão de refresh manual
- Row de métricas hero (4 MetricCards horizontais):
  - Viewers simultâneos agora (se ao vivo)
  - Total de seguidores (consolidado)
  - Crescimento de seguidores 7d
  - StreamHub Score (0–100, performance agregada)
- Seção "Ao Vivo Agora": cards de lives ativas (LiveCard) ou empty state
- Cards de plataformas conectadas (PlatformCard, grid 2–4 colunas)

**Zona 2 — Below the fold (scroll):**
- Gráfico de evolução de seguidores consolidado (últimos 30 dias)
- Row de insights recentes (3 InsightCards)
- Tabela de lives recentes (últimas 5)

**Componentes utilizados:** MetricCard, LiveCard, PlatformCard, InsightCard, ChartContainer, Alert (se há plataforma com erro), Skeleton loader, Badge (plataforma, live, delta), Button (refresh, "ver todos")

**Ações disponíveis:**
- Clicar em PlatformCard → navegar para `/dashboard/[plataforma]`
- Clicar em LiveCard → abrir modal de detalhes
- Clicar em InsightCard → abrir modal de insight
- Ajustar período do gráfico
- Personalizar layout (botão no canto superior direito → modal de personalização)
- Refresh manual de dados

---

#### Tela 2.2 — Dashboard por Plataforma

**Rota:** `/dashboard/[plataforma]` (ex: `/dashboard/twitch`)  
**Objetivo:** Visão aprofundada de uma plataforma específica.

**Conteúdo principal:**
- Header com logo da plataforma + nome + username conectado + badge de status
- 4–6 MetricCards específicos da plataforma (seguidores, views, subscribers, receita se disponível)
- Gráfico de evolução (seguidores + visualizações nos últimos 30d)
- Tabela de lives recentes da plataforma
- Insights específicos da plataforma
- Dados de monetização da plataforma (se disponível)

**Componentes:** MetricCard, ChartContainer, tabela de lives, InsightCard, Badge (plataforma, status)

---

### LIVE

---

#### Tela 3.1 — Live Ativa (Tempo Real)

**Rota:** `/live`  
**Objetivo:** Central de monitoramento de lives em andamento em todas as plataformas.

**Estado quando não há live:** Empty state "Nenhuma live em andamento" com botão "Ver histórico"

**Estado quando há live ativa:**

**Zona 1 — Above the fold:**
- Badge "AO VIVO" + duração da live atual
- Viewer count total (consolidado, fonte mono grande, atualização animada a cada ~15s)
- Row de viewers por plataforma (MetricCards menores, com cor da plataforma)
- Gráfico de viewers em tempo real (linha, últimos 60 minutos, múltiplas séries por plataforma)

**Zona 2:**
- Atividade do chat (contador de mensagens/min por plataforma, barra de atividade)
- Novos seguidores durante a live (contador com animação de incremento)
- Pico de viewers da live (atualizado dinamicamente)
- Comparativo com a live anterior (card de contexto)

**Componentes:** Badge (live com pulso), MetricCard, ChartContainer (tempo real, auto-refresh 15s), barra de atividade de chat, Alert (se plataforma desconectar durante live)

**Ações:** Finalizar monitoramento, ver detalhes por plataforma, exportar dados

---

#### Tela 3.2 — Histórico de Lives

**Rota:** `/live/historico`  
**Objetivo:** Listar e filtrar todas as lives passadas com resumo de métricas.

**Conteúdo principal:**
- Filtros: plataforma (multi-select), período (date range picker), ordenação
- Tabela/grid de lives com colunas: Data | Plataforma(s) | Duração | Pico de viewers | Novos seguidores | Receita estimada | Ação
- Paginação ou infinite scroll
- Resumo agregado (totais do período filtrado)

**Componentes:** Input (busca), Select (filtros), tabela com Avatar de plataforma, Badge (plataforma), Button (ver relatório)

**Ações:** Filtrar, ordenar, clicar em live para ver relatório individual, exportar lista

---

#### Tela 3.3 — Relatório de Live Individual

**Rota:** `/live/[id]`  
**Objetivo:** Análise completa de uma live específica.

**Conteúdo principal:**
- Header: título da live + data + duração total + plataformas utilizadas
- Métricas de resumo: pico de viewers (por plataforma), total de novos seguidores, média de viewers, atividade de chat
- Gráfico de viewers ao longo da live (com marcadores de evento: pico, queda, encerramento)
- Comparativo entre plataformas (viewers, engajamento, conversão)
- Tabela de momentos de pico
- Insights automáticos da live
- Comparativo com média histórica

**Componentes:** MetricCard, ChartContainer, tabela, InsightCard, Badge (plataforma)

**Ações:** Exportar relatório (PDF), compartilhar, comparar com outra live

---

### CRESCIMENTO

---

#### Tela 4.1 — Visão Geral de Crescimento

**Rota:** `/crescimento`  
**Objetivo:** Acompanhar a evolução de seguidores de forma consolidada.

**Conteúdo principal:**
- Seletor de período: 7d | 30d | 3m | 1a
- Métricas de topo: Total de seguidores agora + crescimento no período + plataforma de maior crescimento
- Gráfico principal: evolução consolidada + por plataforma (linhas)
- Cards de crescimento por plataforma (com delta e mini-sparkline)
- Heatmap de crescimento: dias e horários de maior ganho orgânico
- Top conteúdos/lives que geraram mais seguidores (se dados disponíveis)

**Componentes:** MetricCard, ChartContainer, Badge (plataforma, delta), heatmap component, seletor de período (chips)

---

#### Tela 4.2 — Análise por Plataforma

**Rota:** `/crescimento/plataforma`  
**Objetivo:** Comparar o crescimento entre todas as plataformas conectadas.

**Conteúdo principal:**
- Gráfico de barras comparativo (crescimento por plataforma no período)
- Tabela de plataformas: seguidores atuais, crescimento no período, % de crescimento, taxa de conversão
- Gráfico de composição (proporção de seguidores por plataforma, área chart)

---

#### Tela 4.3 — Comparação de Períodos

**Rota:** `/crescimento/comparar`  
**Objetivo:** Comparar dois períodos para identificar tendências.

**Conteúdo principal:**
- Dois seletores de período (período A vs período B)
- Gráfico de sobreposição (linha período A vs linha período B)
- Tabela de métricas comparativas: média diária, pico, total, variação %
- Resumo textual automático ("No período B, você cresceu 34% mais do que no período A")

---

### INSIGHTS

---

#### Tela 5.1 — Feed de Insights

**Rota:** `/insights`  
**Objetivo:** Exibir insights automáticos gerados pelo sistema com base nos dados do usuário.

**Conteúdo principal:**
- Filtros: tipo de insight (crescimento, live, monetização, alerta), plataforma, período
- Feed de InsightCards (ordem cronológica reversa, mais recentes primeiro)
- Cada card: tipo + título + descrição + métrica destaque + plataforma + data + ação sugerida
- Seção "Relatório Semanal": card destacado com o resumo automático da semana

**Componentes:** InsightCard, Select (filtros), Badge (tipo, plataforma), Button (ação sugerida), Empty state

**Ações:** Filtrar, marcar como lido, executar ação sugerida, compartilhar insight

---

#### Tela 5.2 — Melhores Horários

**Rota:** `/insights/horarios`  
**Objetivo:** Recomendar os melhores horários e dias para fazer live.

**Conteúdo principal:**
- Heatmap principal: dias da semana × horários do dia, intensidade = crescimento médio
- Por plataforma: heatmap individual por plataforma
- Top 5 horários recomendados (cards com dia, hora, métrica de suporte, plataforma)
- Base de dados utilizada: quantas lives foram analisadas, período considerado
- Nota: dados insuficientes se < 5 lives no histórico (alert info)

**Componentes:** ChartContainer (heatmap), MetricCard (top horários), Badge (plataforma), Alert (dados insuficientes)

---

#### Tela 5.3 — Alertas e Notificações

**Rota:** `/insights/alertas`  
**Objetivo:** Gerenciar e visualizar alertas de métricas.

**Conteúdo principal:**
- Tabs: "Ativos" | "Histórico"
- **Aba Ativos:** Lista de alertas configurados com status (ativo, pausado), condição (ex: "viewers < 100"), frequência de verificação, última vez disparado
- **Aba Histórico:** Feed de alertas disparados (com timestamp, métrica que causou o disparo, valor)
- Botão "Novo Alerta" (abre modal)
- Empty state para cada aba

**Modal de Novo Alerta:**
- Selecionar métrica (viewers, seguidores, taxa de crescimento, receita)
- Selecionar plataforma (ou "Todas")
- Definir condição (< | > | = um valor)
- Definir frequência de verificação
- Canal de notificação: in-app (obrigatório), e-mail (opcional)
- Botão "Criar Alerta"

**Componentes:** Tabela de alertas, Badge (status), Button, Modal com formulário (Input, Select, Toggle)

---

### MONETIZAÇÃO

---

#### Tela 6.1 — Receita Consolidada

**Rota:** `/monetizacao`  
**Objetivo:** Visão unificada de receita de todas as fontes de monetização conectadas.

**Conteúdo principal:**
- Seletor de período
- Métricas hero: Total no período + maior fonte + maior crescimento
- Gráfico de receita ao longo do tempo (área, por fonte de monetização)
- Cards por fonte: Patreon, Ko-fi, Streamlabs, StreamElements (com valor no período + delta)
- Tabela de transações ou doações recentes (se APIs disponibilizarem)
- Insight: "Esta semana, Patreon representou 68% da sua receita"

**Componentes:** MetricCard, ChartContainer, Badge (plataforma de monetização), tabela

**Nota de plano:** Este módulo requer plano Pro. Usuários Free veem preview bloqueado com CTA de upgrade.

---

### CONFIGURAÇÕES

---

#### Tela 7.1 — Plataformas Conectadas

**Rota:** `/configuracoes/plataformas`  
**Objetivo:** Gerenciar todas as conexões de plataformas.

**Conteúdo principal:**
- Lista de plataformas conectadas (PlatformConnectionCard)
- Seção "Conectar nova plataforma": grade de plataformas disponíveis não conectadas
- Indicador de limite de plano (ex: "2/2 plataformas no plano Free — Faça upgrade para conectar mais")

**Componentes:** PlatformConnectionCard, Button (conectar, desconectar, reconectar), Badge (status), Alert (limite de plano), Modal de confirmação de desconexão

**Ações:** Conectar, desconectar (com modal de confirmação), reconectar, ver dados da plataforma

---

#### Tela 7.2 — Perfil do Usuário

**Rota:** `/configuracoes/perfil`  
**Objetivo:** Gerenciar dados pessoais da conta.

**Conteúdo principal:**
- Avatar (com upload de foto)
- Formulário: nome de exibição, e-mail, nome de usuário único do StreamHub
- Seção "Segurança": alterar senha, sessões ativas
- Seção "Dados": exportar dados, excluir conta (destrutivo, com confirmação dupla)

**Componentes:** Avatar, Input, Button, Alert, Modal de confirmação

---

#### Tela 7.3 — Preferências de Dashboard

**Rota:** `/configuracoes/dashboard`  
**Objetivo:** Personalizar o dashboard e seus widgets.

**Conteúdo principal:**
- Toggle: atualização automática (on/off)
- Select: intervalo de atualização (30s, 1min, 5min, manual)
- Reordenar e mostrar/ocultar widgets do dashboard (drag and drop ou checkboxes)
- Selecionar métricas exibidas nos MetricCards do topo
- Botão "Restaurar padrões"

**Componentes:** Toggle, Select, lista reordenável, Button, Card (preview do widget)

---

#### Tela 7.4 — Alertas Configuráveis

**Rota:** `/configuracoes/alertas`  
**Objetivo:** Gerenciar preferências globais de notificação.

**Conteúdo principal:**
- Toggle: notificações por e-mail (on/off)
- Toggle: relatório semanal automático (on/off)
- Toggle: alertas de live iniciada
- Select: horário de recebimento do relatório semanal
- Link para gerenciar alertas de métricas → `/insights/alertas`

**Componentes:** Toggle, Select, Button (salvar), Alert (confirmação de salvamento)

---

#### Tela 7.5 — Plano e Faturamento

**Rota:** `/configuracoes/plano`  
**Objetivo:** Gerenciar plano e pagamentos.

**Conteúdo principal:**
- Card do plano atual: nome, preço, data de renovação, features incluídas
- Tabela comparativa dos 3 planos (Free, Pro, Agency) com features
- Botão de upgrade (se não estiver no plano máximo)
- Seção de histórico de faturas
- Botão "Cancelar plano" (planos pagos, destrutivo com confirmação)

**Componentes:** Card (plano atual), tabela comparativa, Button (upgrade = primary, cancelar = danger), Badge (plano)

---

### AGENCY

---

#### Tela 8.1 — Lista de Criadores

**Rota:** `/agency/criadores`  
**Objetivo:** Visão consolidada de todos os criadores gerenciados pela agência.

**Conteúdo principal:**
- Métrica de topo: total de criadores gerenciados + seguidores somados
- Grid de cards de criadores (avatar + nome + plataformas + StreamHub Score + delta de crescimento)
- Filtros: plataforma, faixa de seguidores, crescimento
- Botão "Adicionar criador"

**Componentes:** Card (criador), Badge (plataforma, delta), Avatar, Button, Input (busca)

**Nota de plano:** Disponível apenas para assinantes Agency.

---

#### Tela 8.2 — Visão por Criador

**Rota:** `/agency/criadores/[id]`  
**Objetivo:** Análise individual de um criador gerenciado.

**Conteúdo principal:**
- Header: avatar + nome do criador + plataformas + período de gerenciamento
- Todas as telas do Dashboard Overview, porém no contexto do criador selecionado
- Botão "Gerar Relatório White-Label" (exporta PDF com brand da agência)

**Componentes:** Todos os componentes do Dashboard + Button de exportação + Badge (plano do criador)

---

## 10. Fluxo de Navegação

### 10.1 Happy Path — Diagrama Textual

```
[/] Landing Page
    │
    ▼ Click "Começar grátis"
[/cadastro] Criação de conta
    │
    ▼ Conta criada com sucesso
[/onboarding/boas-vindas] Passo 1 de 3
    │
    ▼ Click "Conectar minha primeira plataforma"
[/onboarding/conectar] Passo 2 de 3
    │
    ├──▶ Click em "Twitch"
    │       │
    │       ▼ Redirect OAuth Twitch
    │   [accounts.twitch.tv/oauth]
    │       │
    │       ▼ Autorização + callback
    │   [/onboarding/conectar] — Twitch ✓ conectado
    │
    ▼ Click "Continuar" (1+ plataforma conectada)
[/onboarding/tour] Passo 3 de 3
    │
    ▼ Click "Concluir" ou "Pular"
[/dashboard] Dashboard Overview — PRIMEIRA VISITA
    │
    ├── [Sidebar] Click "Live"
    │       │
    │       ▼
    │   [/live] Live Ativa
    │       │ (se live em andamento)
    │       ├── Monitora viewers em tempo real
    │       │
    │       ▼ (live encerrada / click "Histórico")
    │   [/live/historico] Histórico de Lives
    │       │
    │       ▼ Click em uma live
    │   [/live/:id] Relatório da Live
    │
    ├── [Sidebar] Click "Crescimento"
    │       │
    │       ▼
    │   [/crescimento] Visão de Crescimento
    │       │
    │       ▼ Tabs / sub-navegação
    │   [/crescimento/plataforma] | [/crescimento/comparar]
    │
    └── [Sidebar] Click "Insights"
            │
            ▼
        [/insights] Feed de Insights
            │
            ├── Click em insight específico → Modal de detalhe
            │
            ▼ Tab "Melhores Horários"
        [/insights/horarios]
            │
            ▼ Tab "Alertas" ou sidebar Configurações
        [/insights/alertas] | [/configuracoes/alertas]
```

### 10.2 Fluxo de Erro de Conexão

```
[/dashboard] Dashboard
    │
    ▼ Alert: "Token Twitch expirado"
    │
    ├── Click "Reconectar"
    │       │
    │       ▼
    │   [Modal OAuth Twitch]
    │       │
    │       ▼ Sucesso
    │   [/dashboard] — Twitch reconectado ✓
    │
    └── Click "Ignorar"
            │
            ▼
        [/dashboard] — cards Twitch em estado "error"
```

### 10.3 Fluxo de Upgrade de Plano

```
[Qualquer tela] Feature bloqueada por plano
    │
    ▼ Click no CTA de upgrade (ou badge de cadeado)
[Modal de Upgrade]
    │
    ├── Visualiza comparativo de planos
    │
    ▼ Click "Assinar Pro"
[/configuracoes/plano] — Checkout
    │
    ▼ Pagamento confirmado
[/dashboard] — plano atualizado, feature desbloqueada (toast de sucesso)
```

---

## 11. Hierarquia de Informação por Tela

### 11.1 Dashboard Overview

**Princípio:** O streamer precisa saber em 3 segundos se está tudo bem, quanto viewer ele tem agora, e se tem algo importante para agir.

```
NÍVEL 1 — Primeira percepção (above the fold, 0–500ms)
┌─────────────────────────────────────────────────────────────────┐
│  [AO VIVO ●]  1.247 viewers agora        [SCORE: 87]           │
│  ─────────────────────────────────────────────────────────────  │
│  [+1.203 seg. hoje]  [+18,4% esta semana]  [Twitch: liderando] │
└─────────────────────────────────────────────────────────────────┘
→ O quê: Status de live + número mais importante (viewers ou total seguidores)
→ Como: Fonte mono grande, badge "AO VIVO" com pulso, delta em badge colorido
→ Por que primeiro: É o dado mais crítico — o streamer precisa saber se está ao vivo

NÍVEL 2 — Contextualização por plataforma (above the fold, scroll mínimo)
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  TWITCH      │  │  YOUTUBE     │  │  KICK        │
│  845 viewers │  │  312 viewers │  │  90 viewers  │
│  ████░░░░░░  │  │  ████░░░░░░  │  │  ██░░░░░░░░  │
│  +3 seg/min  │  │  +1 seg/min  │  │  estável     │
└──────────────┘  └──────────────┘  └──────────────┘
→ O quê: Breakdown por plataforma com cor identificadora
→ Como: Grid de PlatformCards, barra de progresso relativa ao pico histórico
→ Por que segundo: Contexto para decisão (em qual plataforma focar energia)

NÍVEL 3 — Tendência e ação (início do scroll)
[Gráfico de viewers dos últimos 30 dias — linha]
→ O quê: Tendência histórica
→ Como: ChartContainer com seletor de período
→ Por que terceiro: Contexto temporal, não urgente

NÍVEL 4 — Insights e ações (scroll)
[3 InsightCards com ações sugeridas]
→ O quê: Recomendações do sistema
→ Como: Cards com gradiente sutil por tipo
→ Por que quarto: Sugestões, não fatos — hierarquia menor
```

---

### 11.2 Live Ativa

**Princípio:** Modo de alta concentração. O streamer está ao vivo e monitora em segundos. Informação deve ser lida de relance.

```
NÍVEL 1 — Status absoluto da live (above the fold completo)
┌─────────────────────────────────────────────────────────────────┐
│  ● AO VIVO   01:23:47          TOTAL: 1.247 viewers            │
│  ─────────────────────────────────────────────────────────────  │
│  TWITCH: 845  │  YOUTUBE: 312  │  KICK: 90                     │
└─────────────────────────────────────────────────────────────────┘
→ Viewer count em fonte mono 4xl — o maior elemento da tela
→ Duração da live sempre visível
→ Breakdown imediato por plataforma em fonte menor mas ainda proeminente

NÍVEL 2 — Gráfico de viewers em tempo real (ainda above the fold)
[Linha de viewers últimos 60 min — múltiplas séries por plataforma]
[Atualização suave a cada 15s sem flash/reload]
→ Tendência dos últimos minutos para decisão de conteúdo

NÍVEL 3 — Engajamento e momentum (scroll leve)
[Chat activity: barras por plataforma — msgs/min]
[Novos seguidores durante a live: contador com animação +1]
[Comparativo com live anterior: "Hoje está 23% acima da média"]

NÍVEL 4 — Dados de suporte (scroll)
[Pico histórico desta live — com timestamp]
[Estimativa de receita em tempo real (plano Pro)]
```

---

### 11.3 Feed de Insights

**Princípio:** Insights devem ser escaneáveis, acionáveis e priorizados por impacto. O usuário não vai ler todos — precisa identificar os importantes em segundos.

```
NÍVEL 1 — Insight mais importante (above the fold)
┌─────────────────────────────────────────────────────────────────┐
│  [SEMANA EM DESTAQUE]                              [NOVO]       │
│  Seu melhor horário esta semana foi sábado às 20h             │
│  Pico de 1.847 viewers — 34% acima da sua média               │
│  [Ver análise completa →]                                      │
└─────────────────────────────────────────────────────────────────┘
→ Card destacado (maior, fundo com gradiente sutil de brand)
→ Número específico e comparação — não vago
→ Ação clara e imediata

NÍVEL 2 — Filtros + insights recentes (above the fold, abaixo do card)
[Chips de filtro: Todos | Crescimento | Live | Monetização | Alertas]
[InsightCard 1] — Tipo: Crescimento
[InsightCard 2] — Tipo: Live
[InsightCard 3] — Tipo: Alerta (warning)

→ Filtros horizontais compactos — máxima eficiência de espaço
→ Cards em sequência, ordem por impacto (não por data)
→ Insight de alerta tem cor âmbar de borda — salta visualmente

NÍVEL 3 — Insights de contexto (scroll)
[Mais InsightCards — tipo informativo, cor neutra]
[Insight de monetização — apenas usuários Pro]
[CTA de upgrade para usuários Free — ao final da lista]
```

---

## Apêndice A — Tokens CSS Completos

```css
/* ===================================================
   STREAMHUB DESIGN TOKENS — v1.0
   Copiar para: src/styles/tokens.css
   =================================================== */

:root {
  /* BRAND */
  --color-brand-50:  #F0EBFF;
  --color-brand-100: #DDD0FF;
  --color-brand-200: #C4ADFF;
  --color-brand-300: #A07DFF;
  --color-brand-400: #8B5CF6;
  --color-brand-500: #7C3AED;
  --color-brand-600: #6D28D9;
  --color-brand-700: #5B21B6;
  --color-brand-800: #4C1D95;
  --color-brand-900: #2E1065;

  /* ACCENT */
  --color-accent-50:  #ECFEFF;
  --color-accent-100: #CFFAFE;
  --color-accent-200: #A5F3FC;
  --color-accent-300: #67E8F9;
  --color-accent-400: #22D3EE;
  --color-accent-500: #06B6D4;
  --color-accent-600: #0891B2;
  --color-accent-700: #0E7490;
  --color-accent-800: #155E75;
  --color-accent-900: #164E63;

  /* NEUTRALS */
  --color-neutral-0:   #FFFFFF;
  --color-neutral-50:  #F8FAFC;
  --color-neutral-100: #F1F5F9;
  --color-neutral-200: #E2E8F0;
  --color-neutral-300: #CBD5E1;
  --color-neutral-400: #94A3B8;
  --color-neutral-500: #64748B;
  --color-neutral-600: #475569;
  --color-neutral-700: #334155;
  --color-neutral-800: #1E293B;
  --color-neutral-850: #172033;
  --color-neutral-900: #0F172A;
  --color-neutral-950: #080D17;

  /* SEMANTIC — SUCCESS */
  --color-success-50:  #F0FDF4;
  --color-success-200: #BBF7D0;
  --color-success-400: #4ADE80;
  --color-success-500: #22C55E;
  --color-success-700: #15803D;
  --color-success-bg:  #052E16;

  /* SEMANTIC — WARNING */
  --color-warning-50:  #FFFBEB;
  --color-warning-200: #FDE68A;
  --color-warning-400: #FBBF24;
  --color-warning-500: #F59E0B;
  --color-warning-700: #B45309;
  --color-warning-bg:  #1C0A00;

  /* SEMANTIC — ERROR */
  --color-error-50:  #FFF1F2;
  --color-error-200: #FECDD3;
  --color-error-400: #F87171;
  --color-error-500: #EF4444;
  --color-error-700: #B91C1C;
  --color-error-bg:  #1C0000;

  /* SEMANTIC — INFO */
  --color-info-50:  #EFF6FF;
  --color-info-200: #BFDBFE;
  --color-info-400: #60A5FA;
  --color-info-500: #3B82F6;
  --color-info-700: #1D4ED8;
  --color-info-bg:  #0A1628;

  /* PLATFORMS */
  --color-youtube:             #FF0000;
  --color-youtube-muted:       rgba(255, 0, 0, 0.15);
  --color-youtube-text:        #FF6B6B;
  --color-twitch:              #9147FF;
  --color-twitch-muted:        rgba(145, 71, 255, 0.15);
  --color-twitch-text:         #B881FF;
  --color-kick:                #53FC18;
  --color-kick-muted:          rgba(83, 252, 24, 0.15);
  --color-kick-text:           #7DFF4F;
  --color-trovo:               #1DC34C;
  --color-trovo-muted:         rgba(29, 195, 76, 0.15);
  --color-trovo-text:          #3DDB66;
  --color-tiktok:              #FF0050;
  --color-tiktok-muted:        rgba(255, 0, 80, 0.15);
  --color-tiktok-text:         #FF4D7D;
  --color-patreon:             #FF424D;
  --color-patreon-muted:       rgba(255, 66, 77, 0.15);
  --color-patreon-text:        #FF7A82;
  --color-kofi:                #FF5E5B;
  --color-kofi-muted:          rgba(255, 94, 91, 0.15);
  --color-kofi-text:           #FF8F8D;
  --color-streamlabs:          #80F5D2;
  --color-streamlabs-muted:    rgba(128, 245, 210, 0.15);
  --color-streamlabs-text:     #80F5D2;
  --color-streamelements:      #F5A623;
  --color-streamelements-muted:rgba(245, 166, 35, 0.15);
  --color-streamelements-text: #FFC04D;

  /* SEMANTIC ALIASES — DARK MODE */
  --color-bg-base:       var(--color-neutral-950);
  --color-bg-subtle:     var(--color-neutral-900);
  --color-bg-surface:    var(--color-neutral-850);
  --color-bg-elevated:   var(--color-neutral-800);
  --color-bg-overlay:    var(--color-neutral-700);
  --color-border-subtle:  var(--color-neutral-800);
  --color-border-default: var(--color-neutral-700);
  --color-border-strong:  var(--color-neutral-600);
  --color-border-brand:   var(--color-brand-500);
  --color-text-primary:   var(--color-neutral-50);
  --color-text-secondary: var(--color-neutral-300);
  --color-text-muted:     var(--color-neutral-500);
  --color-text-disabled:  var(--color-neutral-600);
  --color-text-inverse:   var(--color-neutral-950);
  --color-text-brand:     var(--color-brand-300);

  /* TYPOGRAPHY */
  --font-sans:  'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono:  'JetBrains Mono', 'Fira Code', monospace;
  --text-xs:   0.625rem;
  --text-sm:   0.75rem;
  --text-base: 0.875rem;
  --text-md:   1rem;
  --text-lg:   1.125rem;
  --text-xl:   1.25rem;
  --text-2xl:  1.5rem;
  --text-3xl:  1.875rem;
  --text-4xl:  2.25rem;
  --text-5xl:  3rem;
  --weight-light:     300;
  --weight-regular:   400;
  --weight-medium:    500;
  --weight-semibold:  600;
  --weight-bold:      700;
  --weight-extrabold: 800;
  --leading-none:    1;
  --leading-tight:   1.25;
  --leading-snug:    1.375;
  --leading-normal:  1.5;
  --leading-relaxed: 1.625;
  --tracking-tight:  -0.025em;
  --tracking-normal:  0em;
  --tracking-wide:    0.025em;
  --tracking-wider:   0.05em;
  --tracking-widest:  0.1em;

  /* SPACING */
  --space-0:   0px;
  --space-0-5: 2px;
  --space-1:   4px;
  --space-1-5: 6px;
  --space-2:   8px;
  --space-2-5: 10px;
  --space-3:   12px;
  --space-4:   16px;
  --space-5:   20px;
  --space-6:   24px;
  --space-7:   28px;
  --space-8:   32px;
  --space-9:   36px;
  --space-10:  40px;
  --space-12:  48px;
  --space-14:  56px;
  --space-16:  64px;
  --space-20:  80px;
  --space-24:  96px;
  --space-32:  128px;

  /* LAYOUT */
  --sidebar-width-collapsed: 64px;
  --sidebar-width-expanded:  240px;
  --topbar-height:           56px;
  --content-max-width:       1280px;
  --breakpoint-sm:  640px;
  --breakpoint-md:  768px;
  --breakpoint-lg:  1024px;
  --breakpoint-xl:  1280px;
  --breakpoint-2xl: 1536px;

  /* BORDER RADIUS */
  --radius-none: 0px;
  --radius-xs:   2px;
  --radius-sm:   4px;
  --radius-md:   6px;
  --radius-lg:   8px;
  --radius-xl:   12px;
  --radius-2xl:  16px;
  --radius-3xl:  24px;
  --radius-full: 9999px;

  /* SHADOWS */
  --shadow-none: none;
  --shadow-sm:   0 1px 2px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.04);
  --shadow-md:   0 4px 6px rgba(0,0,0,.5), 0 1px 3px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.06);
  --shadow-lg:   0 10px 15px rgba(0,0,0,.6), 0 4px 6px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.08);
  --shadow-xl:   0 20px 25px rgba(0,0,0,.7), 0 8px 10px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.08);
  --shadow-brand: 0 0 0 1px var(--color-brand-500), 0 0 12px rgba(139,92,246,.3);
  --shadow-accent: 0 0 0 1px var(--color-accent-400), 0 0 16px rgba(34,211,238,.25);
  --shadow-error: 0 0 0 1px var(--color-error-500), 0 0 8px rgba(239,68,68,.25);

  /* MOTION */
  --duration-instant:  50ms;
  --duration-fast:     100ms;
  --duration-normal:   200ms;
  --duration-slow:     300ms;
  --duration-slower:   500ms;
  --easing-default:    cubic-bezier(0.4, 0, 0.2, 1);
  --easing-out:        cubic-bezier(0, 0, 0.2, 1);
  --easing-in:         cubic-bezier(0.4, 0, 1, 1);
  --easing-spring:     cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## Apêndice B — Estrutura de Pastas Recomendada

```
src/
├── styles/
│   ├── tokens.css          ← Todos os CSS custom properties
│   ├── globals.css         ← Reset, base styles, @font-face
│   └── animations.css      ← @keyframes reutilizáveis
│
├── components/
│   ├── ui/                 ← Componentes do design system
│   │   ├── Button/
│   │   ├── Card/
│   │   │   ├── MetricCard.tsx
│   │   │   ├── PlatformCard.tsx
│   │   │   ├── LiveCard.tsx
│   │   │   └── InsightCard.tsx
│   │   ├── Badge/
│   │   ├── Input/
│   │   ├── Select/
│   │   ├── Toggle/
│   │   ├── Avatar/
│   │   ├── Skeleton/
│   │   ├── EmptyState/
│   │   ├── Alert/
│   │   ├── Toast/
│   │   ├── Modal/
│   │   ├── Drawer/
│   │   └── ChartContainer/
│   │
│   ├── layout/             ← Componentes estruturais
│   │   ├── Sidebar/
│   │   ├── Topbar/
│   │   └── PageLayout/
│   │
│   └── platform/           ← Componentes específicos de plataforma
│       └── PlatformConnectionCard/
│
├── pages/ (ou app/ se Next.js)
│   ├── index.tsx           ← Landing page
│   ├── login.tsx
│   ├── cadastro.tsx
│   ├── onboarding/
│   ├── dashboard/
│   ├── live/
│   ├── crescimento/
│   ├── insights/
│   ├── monetizacao/
│   ├── configuracoes/
│   └── agency/
│
public/
└── icons/
    └── platforms/
        ├── youtube-color.svg
        ├── youtube-mono.svg
        └── ...
```

---

*Documento gerado em 01/05/2026. Versão 1.0.*  
*Para dúvidas ou iterações, referenciar os Requisitos em `docs/StreamHub_Requisitos.pdf`.*
