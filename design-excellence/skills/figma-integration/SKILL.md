---
name: figma-integration
description: "Figma MCP integration specialist. Budget-conscious API usage, design-to-code translation, bidirectional token sync, and Code Connect mapping. Activates when a Figma URL is shared, design context is needed, or tokens need syncing between Figma and code."
---

# Figma Integration

Manages all Figma MCP interactions. Budget guardian for rate-limited API calls. Translates Figma designs to token-compliant code.

## Figma MCP Tools

### Tool Priority (Budget Conservation)

Most Figma plans have rate limits. Use calls wisely:

| Tool | ROI | Use When |
|------|-----|----------|
| `get_design_context` | Very High | New design needs implementation |
| `get_variable_defs` | High | Token sync after Figma changes |
| `get_screenshot` | Medium | Quick visual reference, no code needed |
| `get_metadata` | Low-Medium | First time in unfamiliar file |

### When NOT to Use Figma MCP

- Routine component builds (use existing patterns)
- Token changes starting in code (update code → sync Figma later)
- Content updates (not a design task)
- Image placement (images already in project /public)

## URL Parsing

```
figma.com/design/:fileKey/:fileName?node-id=1-2
  → fileKey: from URL path
  → nodeId: convert "1-2" → "1:2" (dash to colon)

figma.com/design/:fileKey/branch/:branchKey/:fileName
  → use branchKey as fileKey

figma.com/board/:fileKey/:fileName
  → FigJam file → use get_figjam tool

figma.com/community/file/:id
  → Must be duplicated first by user → then use new fileKey
```

## Design-to-Code Workflow

### Step 1: Get Design Context

```
get_design_context(
  nodeId,
  fileKey,
  clientFrameworks="react,next.js",
  clientLanguages="typescript,css"
)
```

### Step 2: Map Colors to Tokens

The raw output uses Figma colors. Map to project tokens:

```
Figma Color         → Project Token
────────────────────────────────────
white / near-white  → text-primary token
gray-400            → text-secondary token
dark background     → void/base background
glass fill          → surface.glass (bg-white/5 + backdrop-blur)
border              → border-white/10
accent color        → semantic color token
shadow              → elevation system level
```

### Step 3: Apply Interactivity

Any clickable element gets:
```tsx
import { interactiveSurface, stateLayer, focusRing } from "design-tokens";
// interactiveSurface + stateLayer.hover + focusRing.default + touchTarget
```

### Step 4: Apply Motion

```tsx
import { m3Curves, motionDurations } from "motion-config";
// Entering: emphasized curve, normal duration
// Exiting: emphasizedAccelerate curve, fast duration
```

### Step 5: Check Code Connect

If a Code Connect mapping exists for the component, use the mapped import instead of building from scratch.

## Token Sync Protocol

### Code → Figma

When tokens change in code:
1. Update CSS variables and Tailwind config
2. Export updated tokens to Figma-compatible format
3. Import via Tokens Studio or Figma Variables API

### Figma → Code

When tokens change in Figma:
1. Call `get_variable_defs` to read current Figma variables
2. Compare to local token files
3. Update CSS variables and Tailwind extensions
4. Commit: "chore(design): sync tokens from Figma"

## Code Connect Mapping

Maintain a mapping between Figma component names and code imports:

```json
{
  "Button": "@/components/ui/button",
  "Card": "@/components/ui/card",
  "GlassCard": "@/components/ui/GlassmorphicCard",
  "Badge": "@/components/ui/primitives#Badge"
}
```

### Rules:
- Check mapping BEFORE building a new component
- Add new mapping AFTER building a new component
- Figma component name → code import path
- Document in project's `code-connect.json`

## Community File Activation

When user duplicates a community Figma file:
1. Get the URL from user
2. Extract fileKey
3. Call `get_metadata` to understand structure
4. Call `get_variable_defs` to extract tokens
5. Map extracted tokens to project token system
6. Document findings in design system docs
