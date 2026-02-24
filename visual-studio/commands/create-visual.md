---
description: Generate on-brand visual prompts with quality gates — blog heroes, social images, thumbnails, product visuals
argument-hint: "<image type and concept, e.g. 'blog hero for AI article'>"
---

# /create-visual

> See [CONNECTORS.md](../CONNECTORS.md) — uses `~~image generation` if connected.

## Workflow

### Step 1: Understand the Request

Parse the argument:
- Type + concept: "blog hero for [topic]" → proceed
- Just a concept: ask "What type of image? (blog hero, LinkedIn post, thumbnail, product visual, newsletter header)"
- No argument: ask for type and concept

### Step 2: Load Style DNA

Check for visual style config:
1. `CREATOR.md` — visual style section (quick ref)
2. `creator-memory/visual.md` — full style documentation
3. If neither: ask "Describe your visual aesthetic, or share a reference image."

Key parameters to confirm: color palette, mood/aesthetic, anti-patterns.

If `~~design` connected: pull brand colors and component specs from design system.

### Step 3: Determine Parameters

Map image type to technical specs:
- Blog hero: 1200×628, no text, scroll-stop visual
- LinkedIn: 1200×627, works with text overlay
- X/Twitter: 1600×900, bold composition
- Thumbnail: 1280×720, high contrast
- Product hero: 1:1 or 4:5, clean and minimal
- Newsletter header: 1200×400, wider aspect

### Step 4: Engineer Prompt

Apply the 6-component formula:
```
[Style/Medium] [Subject] [Setting/Context] [Mood] [Color Direction] [Technical Quality]
```

Add negative prompt: elements to exclude (anti-patterns from style DNA + type-specific exclusions).

### Step 5: Deliver

Output:
1. **Primary prompt** — ready to paste
2. **Negative prompt** — exclusions list
3. **Rationale** — key choices explained (1-3 sentences)
4. **Alternative** — 1 variation with different energy or composition

If `~~image generation` connected: generate directly and proceed to Step 6.
If not: deliver prompts for manual use.

### Step 6: Quality Gates (post-generation)

Apply 7-gate quality filter:

| Gate | Check |
|------|-------|
| Brand alignment | Colors match palette |
| Color balance | 3+ distinct tones |
| Composition depth | Foreground + mid + background |
| Subject quality | Main subject clear and intentional |
| Text legibility | Any text readable (or no text as specified) |
| Anti-pattern check | None of the defined vetoed elements |
| Scroll-stop | Would this stop someone scrolling? |

**Pass (all 7)**: Add to image log in `creator-memory/` if one exists.
**Fail**: Identify which gate(s) failed. Suggest specific prompt adjustments. Offer to regenerate.

See `references/prompt-library.md` for tested prompts by category.
