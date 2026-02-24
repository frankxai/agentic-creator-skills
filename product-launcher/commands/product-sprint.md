---
description: Focused build sprint for an existing product spec — builds without deploying
argument-hint: "<page path, component, or feature to build>"
---

# /product-sprint

## Workflow

### Step 1: Understand Current State

1. Read the target file(s) to understand what exists
2. Read surrounding files (layout, shared components, data sources)
3. Check for a spec file in `docs/` — read it if found
4. Identify what needs to change or be built

### Step 2: Build

If changes span multiple domains (frontend + backend + content), run them in parallel:

**Frontend changes** (Task agent):
- Implement UI changes
- Apply brand design system
- Use existing component patterns from the codebase

**Backend changes** (Task agent):
- Implement API/data layer changes
- Add validation at system boundaries

**Content changes** (inline, no Task needed for copy):
- Apply voice guidelines
- Update copy, meta tags, SEO elements

If changes are focused and small: do them inline.

### Step 3: Verify

- TypeScript compiles without errors
- Page/feature loads correctly
- No regressions to adjacent functionality
- Quick accessibility check: headings, alt text, contrast

### Step 4: Report

Summarize:
- What was built
- Files modified
- Any issues found or decisions made
- What's ready for QA

**Do NOT deploy** — sprint is build-only. Use `/product-deploy` when ready.
