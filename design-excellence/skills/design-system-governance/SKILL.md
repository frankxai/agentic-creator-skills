---
name: design-system-governance
description: "Enforce design token compliance, surface hierarchy, typography scale, spacing grid, and visual consistency. The central authority for all design decisions. Activates when creating or modifying UI components, pages, or design tokens. Loads design system config from project globals.css, tailwind.config, and CREATOR.md."
---

# Design System Governance

Maintain a living design system that scales. Every visual decision traces back to a token — never a hardcoded value.

## Token Architecture

A design system has 7 token layers. Each builds on the previous:

### Layer 1: Color Primitives
Raw color values. Never used directly in components.
```
emerald-500, cyan-400, purple-600, amber-500
```

### Layer 2: Semantic Colors
Purpose-mapped references to primitives.
```
--brand-primary    → emerald-500 (AI/tech context)
--brand-secondary  → purple-600 (brand/ACOS context)
--text-primary     → rgba(255,255,255,0.95)
--text-secondary   → rgba(255,255,255,0.72)
--text-tertiary    → rgba(255,255,255,0.48)
--text-muted       → rgba(255,255,255,0.32)
```

### Layer 3: Surfaces
Background treatment hierarchy. Dark-mode-first.
```
void        → #0a0a0b (base background)
glass       → backdrop-blur-xl bg-white/5 border border-white/10
elevated    → backdrop-blur-xl bg-white/[0.08] border border-white/15
subtle      → bg-white/[0.02] border border-white/5
transparent → bg-transparent border border-white/10
```

### Layer 4: Elevation
Shadow system with semantic levels.
```
elevation-1 → cards at rest (subtle shadow)
elevation-2 → cards on hover, popovers (medium)
elevation-3 → modals, overlays (prominent)
elevation-4 → toasts, notifications (max)
brand-tinted → emerald/purple glow for featured elements
```

### Layer 5: Typography
Font families + type scale.
```
Display:  font-display (Poppins, headings ≥18px ONLY)
Body:     font-sans (Inter, everything else)
Code:     font-mono (JetBrains Mono)
Scale:    Perfect Fourth (1.333 ratio)
Fluid:    clamp() for responsive text (text-fluid-xs through text-fluid-7xl)
```

### Layer 6: Spacing
4px base grid.
```
Section:  py-24 lg:py-32 (standard), py-12 lg:py-16 (compact)
Hero:     pt-16 md:pt-20 pb-24 lg:pb-32
Content:  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
Padding:  4pt grid — 4/8/12/16/20/24/32/40/48/64
```

### Layer 7: Motion
Animation primitives with M3 + Apple HIG synthesis.
```
Durations:  instant(100ms), fast(200ms), normal(400ms), slow(600ms)
M3 Curves:  emphasized, emphasizedDecelerate, emphasizedAccelerate, standard
Springs:    interactive(stiffness:500), gentle(stiffness:120), bouncy(stiffness:600)
State layers: hover(8%), pressed(12%), focused(16%) — M3 specification
```

## Hard Rules

### Colors
- NEVER hardcode hex — use CSS variables or Tailwind tokens
- NEVER use raw opacity for text — use semantic text-primary/secondary/tertiary/muted
- Glass opacity: 0.02–0.08 MAX. Never above 0.08 for backgrounds.

### Typography
- Display font for headings ≥18px ONLY. Body font for everything else.
- Code font for code blocks and inline code ONLY.
- Fluid type (clamp()) preferred over fixed breakpoint overrides.

### Borders
- Cards: rounded-4xl (32px)
- Buttons: rounded-2xl (16px)
- Inputs: rounded-lg (8px)
- Pills/badges: rounded-full

### Icons
- Import individually, never import * from icon library
- Standard stroke width: 1.5
- Sizes: 16px (inline), 20px (buttons), 24px (cards), 32px (decorative)

### Spacing
- 4px base grid. All spacing values divisible by 4.
- Section padding consistent across all pages.
- Content max-width capped at 7xl (1280px).

## Anti-Patterns to Detect

| Pattern | Severity | Fix |
|---------|----------|-----|
| Hardcoded hex color | HIGH | → semantic token or Tailwind class |
| `bg-white/15` (too bright glass) | HIGH | → `bg-white/5` (standard) or `bg-white/[0.08]` (elevated) |
| `text-gray-400` (no contrast guarantee) | HIGH | → semantic text token |
| `shadow-lg` (generic) | MEDIUM | → `shadow-elevation-2` |
| `rounded-lg` on cards | MEDIUM | → `rounded-4xl` |
| `transition-all` | LOW | → specific property (transition-colors, transition-opacity) |
| Display font on body text | MEDIUM | → font-sans |
| Fixed font size without fluid | LOW | → text-fluid-* |

## Content Domain Color Mapping

Load from CREATOR.md. Default mapping:

| Domain | Primary Accent | Use |
|--------|---------------|-----|
| Technical/AI | Emerald/Cyan | Architecture, code, APIs |
| Creative/Music | Amber/Rose | Music, art, creative tools |
| Brand/System | Purple/Violet | Brand pages, system features |
| Premium | Gold | Premium products, exclusive content |
| Community | Teal/Sky | Community, learning, support |

## Design System Health Check

Run periodically to audit compliance:
1. Scan all component files for hardcoded values
2. Check glass opacity levels (flag anything > 0.08)
3. Verify typography imports match scale
4. Count token violations per file
5. Generate compliance score (% of files passing)
