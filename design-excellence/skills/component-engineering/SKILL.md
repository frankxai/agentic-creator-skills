---
name: component-engineering
description: "Design-to-code specialist. Translates Figma designs, screenshots, and design briefs into pixel-perfect components using the project's design system. Zero hardcoded values. Activates when building new components, implementing designs, or refactoring existing UI."
---

# Component Engineering

Build components that are token-compliant, accessible, and performant from the first commit.

## Pre-Build Checklist

Before creating ANY new component:

```
1. CHECK primitives — does an existing primitive cover this?
2. CHECK existing components — is there something close to extend?
3. CHECK code-connect mapping — is there a Figma→code link?
4. BUILD new ONLY if genuinely missing
5. EXTRACT to primitives if this pattern will be reused 2+ times
```

## Component Architecture

### Surface Hierarchy

Every component sits on a surface. Choose the right level:

```
glass       → standard cards, sections (most common)
elevated    → modals, popovers, dropdowns
subtle      → hover states, background sections
transparent → border-only containers, minimal chrome
```

### Interactive Components

All clickable surfaces need 3 layers:

```tsx
// Required for any interactive element:
1. interactiveSurface  — relative overflow-hidden cursor-pointer select-none
2. stateLayer.hover    — M3 8% white overlay on hover (::before pseudo)
3. focusRing.default   — WCAG 2.2 focus ring (ring-2 ring-offset-2)
4. touchTarget.standard — min-h-[44px] min-w-[44px] (Apple HIG)
```

### Component Template

```tsx
"use client"; // ONLY if component needs interactivity

import { cn } from "@/lib/utils";
import { surface, interactiveSurface, stateLayer, focusRing } from "@/lib/design/tokens";
import { motion } from "framer-motion";
import { m3Curves, motionDurations } from "@/lib/design/motion";

interface ComponentNameProps {
  // Typed props with JSDoc
}

export function ComponentName({ ...props }: ComponentNameProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: motionDurations.normal,
        ease: m3Curves.emphasized,
      }}
      className={cn(
        surface.glass,
        "rounded-4xl p-6",
      )}
    >
      {/* content */}
    </motion.div>
  );
}
```

## Motion Rules

### Entry Animations
```
Entering viewport → emphasized curve, normal duration (400ms)
Hero entrance → emphasized curve, slow duration (600ms)
Staggered children → 50-80ms delay between items
```

### Exit Animations
```
Leaving viewport → emphasizedAccelerate curve, fast duration (200ms)
Dismissing → standard curve, fast duration
```

### Interactions
```
Hover → instant feedback (<100ms)
Press → spring physics (stiffness:500, damping:35)
Drag → spring physics (stiffness:300, damping:30)
```

### Reduced Motion
```tsx
const prefersReduced = useReducedMotion()
// Replace transform animations with opacity-only
// Replace springs with linear transitions
// Keep essential state changes (color, opacity)
```

## Figma-to-Code Workflow

When implementing from a Figma design:

1. **Map colors** → CSS variables or Tailwind tokens (never raw hex)
2. **Map text styles** → type scale tokens
3. **Map effects** → surface/elevation system
4. **Map shadows** → elevation levels or glow variants
5. **Replace flat backgrounds** → glass surface + blur
6. **Add state layers** → hover/focus/active states
7. **Add motion** → M3 curves for enter/exit
8. **Check accessibility** → focus rings, touch targets, contrast

## Performance Rules

- `"use client"` ONLY if component has state, effects, or event handlers
- Images: Always use next/image with width/height (no layout shift)
- Icons: Import individually (not `import * from 'lucide-react'`)
- Below-fold: Add `loading="lazy"` to images
- Animations: Transform-only (never animate layout properties top/left/width/height)
- Motion: Never `transition-all` — specify exact properties

## Output Checklist

Every component delivery includes:
1. Complete TypeScript file with proper types
2. Import statement for usage
3. Props interface with JSDoc documentation
4. Variant examples (if applicable)
5. Design token references used
6. Accessibility features (focus, aria, screen reader)
