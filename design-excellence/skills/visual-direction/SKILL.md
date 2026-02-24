---
name: visual-direction
description: "Strategic visual intelligence for image generation. Decides what to generate, how to prompt it, and where to use it. Runs 7-gate quality filter on all generated images. Manages visual style DNA, prompt engineering, and asset registry. Activates on image generation decisions, visual content planning, and asset curation."
---

# Visual Direction

Strategic visual intelligence. Decides WHAT to generate, HOW to prompt, and WHERE to place. Every image passes the 7-gate filter before shipping.

## Visual Style DNA

A creator's visual identity has 3-5 core styles. Define them with specificity:

### Style Definition Template

```
Style Name: [name]
Usage: [percentage of all images]
Palette: [base color + accent colors]
Surface: [texture, material, depth treatment]
Depth: [layer count and arrangement]
Accents: [glow, highlight, special effects]
Texture: [grain, noise, material feel]
```

### Loading Style DNA

1. `CREATOR.md` — visual section (quick ref)
2. `creator-memory/visual-style.md` — full documentation with examples
3. Project `IMAGE_STYLE_DNA.md` — if exists, canonical reference
4. If none found: derive from existing images, or ask the creator

### Example Style Library

**Dark Premium Glass (primary)**
```
Palette: void black #0a0a0b base, 2-4 accent colors
Surface: Glass panels at 5-8% opacity with blur
Depth: 3+ distinct layers (background → midground → foreground)
Accents: Color-specific glow on key elements
Texture: Subtle film grain 3% overlay
```

**Technical Diagram**
```
Style: Technical diagrams on aged parchment or dark paper
Purpose: Architecture explainers, system diagrams
Feel: Scholarly, meticulous, precise
```

**Light Studio**
```
Style: Clean studio light, off-white background
Purpose: Tool showcases, product demos, tutorials
Feel: Accessible, professional, clean
```

## 7-Gate Quality Filter

ALL generated images must pass before shipping:

```
Gate 1: Brand Alignment    — Matches creator visual DNA?
Gate 2: Color Balance      — 3+ distinct accent colors (not monochrome)?
Gate 3: Info Density       — Rich composition, not sparse or empty?
Gate 4: Depth Layers       — Background + midground + foreground?
Gate 5: Text Legibility    — If text present, is it sharp and readable?
Gate 6: Element Quality    — Premium quality, no clipart, no artifacts?
Gate 7: Scroll-Stop Test   — Would this stop someone mid-scroll?

Score: 7/7 = APPROVED
       5-6/7 = NEEDS REVISION (note which gates failed)
       <5/7 = REJECTED
```

### Hard Vetoes (Auto-Reject)

- Only 1 accent color (monochrome failure)
- Generic stock-photo feel
- Banned visual elements (per creator's brand rules)
- No organizing metaphor or visual anchor
- Fewer than 3 named compositional elements
- Text illegible at 1x display size

## Prompt Engineering

### Prompt Structure

```
[Subject] + [Pose/Action] + [Position in frame] +
[Background environment] + [Lighting setup] + [Color palette] +
[Text to render (if any)] + [Style modifier] + [Quality instruction]
```

### Character Consistency

When generating with established characters:
- Reference existing character images as input (if tool supports)
- Maintain consistent proportions, colors, accessories
- Document character specs in `creator-memory/characters.md`

### Format Formulas

**Blog Hero** (16:9 landscape)
```
[Concept visual metaphor] + [dominant accent color] +
[dark/light base matching style DNA] + [editorial quality] +
[space for title text overlay on left 40%]
```

**Social Image** (1:1 or 4:5)
```
[Bold central element] + [strong visual metaphor] +
[text: title + hook] + [high contrast] + [scroll-stopping]
```

**Newsletter Banner** (3:4 portrait or 16:9)
```
[Character or icon RIGHT 40%] + [title text LEFT] +
[brand accent color] + [dark base] + [editorial cinematic]
```

## Asset Registry

Log every generated image:

```json
{
  "id": "unique-slug",
  "path": "public/images/[category]/filename.png",
  "type": "blog-hero | social | newsletter | product | mascot",
  "style": "style-name-from-dna",
  "gates_passed": 7,
  "status": "approved | needs-revision | rejected",
  "generated": "YYYY-MM-DD"
}
```

### Asset Priority Queue

When deciding what to generate next:
1. Pages with NO hero visual → highest priority
2. Low-quality existing images → second priority
3. New features needing visual → third priority
4. Refresh of dated images → lowest priority

## Direction Brief Format

```markdown
## Visual Direction Brief

**Asset**: [name and purpose]
**Style**: [from style DNA]
**Aspect Ratio**: [3:4 / 16:9 / 1:1 / 4:5]

**Prompt**:
[Exact prompt ready to paste]

**Quality Pre-Check**:
Gate 1 Brand: ✅/❌
Gate 2 Color: ✅/❌ [list accents]
Gate 3 Density: ✅/❌
Gate 4 Depth: ✅/❌ [layers]
Gate 5 Text: ✅/❌ or N/A
Gate 6 Quality: ✅/❌
Gate 7 Scroll-Stop: ✅/❌

**Decision**: PROCEED / REVISE PROMPT
```
