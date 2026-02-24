---
name: design-qa
description: "Quality gate for all visual output. Runs 5-gate validation on components, pages, and design changes before shipping. Blocks merging until all gates pass. Activates on pre-commit UI reviews, new page checks, component audits, and accessibility assessments."
---

# Design QA

Quality gate for all visual output. Not a creator — a validator. PASS/FAIL verdicts with specific fix instructions.

## The 5 Gates

Every UI change must pass ALL 5 gates before shipping.

### Gate 1: Token Compliance

```
FAIL if any of:
  ✗ Hardcoded hex colors (instead of token/variable)
  ✗ Raw opacity on glass > 0.08
  ✗ Wrong font on headings (body font on display text)
  ✗ Wrong radius on cards (rounded-lg instead of rounded-4xl)
  ✗ Generic shadow (shadow-lg instead of elevation system)
  ✗ Missing backdrop-blur on glass surfaces
  ✗ Spacing not on 4px grid
```

### Gate 2: Accessibility (WCAG 2.2)

```
FAIL if any of:
  ✗ No focus-visible ring on interactive elements
  ✗ Touch target < 44×44px (Apple HIG + WCAG 2.2 SC 2.5.8)
  ✗ Text contrast < 4.5:1 (WCAG AA)
  ✗ Missing aria-label on icon-only buttons
  ✗ Animation without prefers-reduced-motion check
  ✗ Missing alt text on non-decorative images
  ✗ Form inputs without associated labels
  ✗ Missing keyboard navigation support
```

### Gate 3: Brand Compliance

```
FAIL if any of:
  ✗ Wrong character/mascot for the page domain
  ✗ Playful/chibi style on professional pages
  ✗ Banned voice terms in copy ("journey", "transformation", "awakening")
  ✗ Vague CTAs ("Learn More", "Click here", "Explore")
  ✗ Glass opacity > 0.08 on backgrounds
  ✗ Color accent doesn't match content domain
```

Load brand rules from: CREATOR.md voice section, brand-voice skill, or project CLAUDE.md.

### Gate 4: Performance

```
FAIL if any of:
  ✗ Images without next/image or equivalent optimizer
  ✗ Missing width/height on images (causes layout shift)
  ✗ Animating layout properties (top/left/width/height)
  ✗ Missing loading="lazy" on below-fold images
  ✗ Wildcard icon imports (import * from icon library)
  ✗ "use client" on component that could be a server component
  ✗ Uncompressed images > 200KB
```

### Gate 5: Motion

```
FAIL if any of:
  ✗ transition-all (too broad — specify exact properties)
  ✗ duration > 800ms on UI interactions (reserved for hero only)
  ✗ No easing curve specified (browser defaults are wrong)
  ✗ Animation without reduced-motion alternative
  ✗ Jank-prone: animating non-compositable properties
```

## Severity Classification

| Severity | Definition | Action |
|----------|-----------|--------|
| HIGH | Token violation, accessibility failure, brand violation | Fix before merge |
| MEDIUM | Performance issue, motion anti-pattern | Fix before deploy |
| LOW | Non-ideal pattern, minor inconsistency | Fix in next sprint |

## Scoring

| Verdict | Gate Result | Action |
|---------|------------|--------|
| PASS | All 5 gates green | Ship it |
| CONDITIONAL | 1-2 LOW issues only | Ship with fix ticket |
| NEEDS REVISION | Any MEDIUM issue | Fix before merge |
| BLOCKED | Any HIGH issue | Fix before review |

## Anti-Pattern Quick Reference

| Anti-Pattern | Severity | Fix |
|-------------|----------|-----|
| `bg-white/15` | HIGH | → `bg-white/5` or `bg-white/[0.08]` |
| `text-gray-400` | HIGH | → semantic text token |
| `font-display` on body | MEDIUM | → `font-sans` |
| `rounded-lg` on cards | MEDIUM | → `rounded-4xl` |
| `shadow-lg` | MEDIUM | → `shadow-elevation-2` |
| `transition-all` | LOW | → specific property |
| hardcoded `#10b981` | HIGH | → `text-emerald-500` |

## Report Format

```markdown
## Design QA Report

**Target**: [file/component/page]
**Date**: [date]
**Verdict**: PASS / CONDITIONAL / NEEDS REVISION / BLOCKED

### Gate Results

| Gate | Status | Issues |
|------|--------|--------|
| 1. Token Compliance | ✅ PASS | — |
| 2. Accessibility | ❌ FAIL | [specific issue] |
| 3. Brand Compliance | ✅ PASS | — |
| 4. Performance | ⚠️ WARNING | [specific issue] |
| 5. Motion | ✅ PASS | — |

### Blocking Issues (Fix First)
1. **[HIGH]** `file:line` — Issue description
   Fix: [specific fix instruction]

### Non-Blocking Issues
1. **[LOW]** `file:line` — Issue description

### Approved Patterns
- ✅ [what's working correctly]
```
