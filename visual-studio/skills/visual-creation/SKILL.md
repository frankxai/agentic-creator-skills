---
name: visual-creation
description: Style-governed image generation with quality gates. Manages visual style DNA, generates image prompts optimized for AI tools, and applies a 7-gate quality filter before batch creation. Use when creating blog hero images, social graphics, thumbnails, product visuals, or any branded imagery.
---

# Visual Creation

Generate on-brand visuals using a defined style system, not vibes.

## How This Skill Works

1. **Load style DNA** — pull visual rules from `CREATOR.md` or `creator-memory/visual.md`
2. **Engineer prompt** — translate concept into a detailed image generation prompt
3. **Apply quality gates** — check against brand standards before accepting

If no visual style is documented: prompt the user, or run `/creator-sprint`.

## Visual Style DNA

Before generating, confirm these parameters:

| Parameter | What to capture | Example |
|-----------|----------------|---------|
| Color palette | Primary + 2-4 accents | Deep navy, cyan, gold, white |
| Mood/aesthetic | Overall feeling | Dark premium, editorial, clean |
| Subject preference | What appears | Technology, abstract, humans |
| Composition | How elements arrange | Rule of thirds, centered, dynamic |
| Style reference | Visual category | Glassmorphic, editorial photo, 3D |
| Anti-patterns | What to avoid | Flat clipart, chrome robots |

## Prompt Engineering

A good image generation prompt has 6 components:

```
[Style/Medium] [Subject] [Setting/Context] [Mood] [Color Direction] [Technical Quality]
```

**Example — dark premium tech:**
```
Dark premium 3D render, glowing holographic interface floating above sleek desk surface,
dramatic cyan and gold lighting against deep navy background, depth of field blur on
background elements, cinematic composition, highly detailed, 8K quality, no text, no humans
```

**Example — light editorial:**
```
Clean editorial photograph, open laptop with code on screen, minimalist desk setup,
soft morning light from left, white and warm tones, shallow depth of field, lifestyle
photography style, high resolution
```

### Style modifiers by type

| Style | Key modifiers |
|-------|--------------|
| Dark premium | dark background, dramatic lighting, deep shadows, cinematic |
| Light editorial | white/light tones, natural light, minimal, lifestyle photography |
| 3D render | 3D render, subsurface scattering, ray tracing, realistic materials |
| Glassmorphic | frosted glass, transparency, blur, depth layers, neon accents |
| Cinematic | film grain, dramatic color grading, shallow depth of field |

## 7-Gate Quality Filter

All gates must pass before accepting an image:

| Gate | Check | Fail condition |
|------|-------|---------------|
| 1. Brand alignment | Colors match palette | Wrong colors, off-brand feel |
| 2. Color balance | 3+ distinct tones | Single-color saturation |
| 3. Composition depth | Foreground + mid + background | Flat, no depth |
| 4. Subject quality | Main subject is clear | Ambiguous, cluttered |
| 5. Text legibility | If text exists, it's readable | Blurry, wrong font style |
| 6. Anti-pattern check | None of the vetoed elements | Contains banned elements |
| 7. Scroll-stop | Would this stop scrolling? | Generic, forgettable |

## Image Types

| Type | Dimensions | Key requirements |
|------|-----------|-----------------|
| Blog hero | 1200×628 | No text, scroll-stop, brand colors |
| Social (LinkedIn) | 1200×627 | Works with text overlay, high contrast |
| Social (X) | 1600×900 | Bold composition, clear focal point |
| Newsletter header | 1200×400 | Wide, simple |
| Thumbnail | 1280×720 | High contrast, small-size readable |
| Product hero | 1:1 or 4:5 | Clean, premium, minimal |

## Output Format

Deliver:
1. **Prompt** — ready to paste into generation tool
2. **Negative prompt** — elements to exclude
3. **Rationale** — key choices explained
4. **Alternatives** — 1-2 prompt variations

After generation: apply gates, report pass/fail, suggest adjustments on fail.

Uses `~~image generation`. See `references/prompt-library.md` for tested prompts by category.
