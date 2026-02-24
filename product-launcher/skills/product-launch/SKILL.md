---
name: product-launch
description: "Creator product development and shipping workflow. Covers spec writing, build sprints, QA, deployment, and retrospectives. Use when building or shipping a digital product — templates, courses, tools, SaaS, or any creator product. Works with any web deployment platform."
---

# Product Launch

Ship creator products with a repeatable spec-to-launch workflow.

## The Pipeline

```
Spec → Build Sprint → QA → Deploy → Retro
```

Each stage is a command. They compose sequentially but each works standalone.

## Stage 1: Spec

Define before building. A good spec answers:
- **Problem**: What specific pain does this solve? Who has it?
- **Solution**: What does the product do? What are the boundaries (what it explicitly doesn't do)?
- **Audience**: Who is the primary buyer/user?
- **Value ladder**: Where does this sit? (free tool / $27 template / $97 product / $297 system)
- **Distribution**: How does the creator reach buyers? (email list, social, SEO, marketplace)
- **Success metric**: What makes this product worth shipping?

**Spec format:**
```markdown
# [Product Name] — Spec

## Problem
[1-3 sentences. Be specific.]

## Solution
[What it does. What it doesn't do.]

## Audience
[Primary buyer. What they already tried. Why this is different.]

## Pricing
[Price point and rationale]

## Distribution
[How buyers find this]

## Success metric
[How you'll know it worked in 30 days]

## Scope
[What's in v1. What's explicitly deferred.]
```

## Stage 2: Build Sprint

Focused build execution. Steps:
1. Read the spec — understand what exists, what needs building
2. Build in parallel where possible (frontend / backend / content are independent)
3. Verify — TypeScript compiles, page loads, no regressions
4. Report changes, do NOT deploy in this stage

## Stage 3: QA

Before shipping any product:
- [ ] All pages load without errors
- [ ] Primary user flow works end-to-end
- [ ] Mobile layout doesn't break
- [ ] CTA links work and go to right destination
- [ ] Payment/checkout works (if applicable)
- [ ] Email capture works (if applicable)
- [ ] Meta tags and OG image set
- [ ] No console errors
- [ ] Loading states present on async operations

## Stage 4: Deploy

1. Verify QA checklist is complete
2. Push to production (via `~~publishing` connector)
3. Verify production URL loads correctly
4. Notify team or subscribers via `~~chat` or `~~email marketing`

## Stage 5: Retro

After 30 days (or on request):
- What shipped vs. what was planned?
- Performance vs. success metric
- What worked? What would change?
- Next version scope

## Creator Product Types

| Type | Build time | Price range | Distribution |
|------|-----------|-------------|--------------|
| Template | 1-3 days | $7-47 | Gumroad, Etsy, own shop |
| Micro-tool | 3-7 days | Free or $9-27 | Product Hunt, social |
| Course | 2-4 weeks | $47-297 | Email list, SEO |
| Agent/system | 1-4 weeks | $97-697 | Direct, community |
| SaaS | Ongoing | Subscription | SEO, ads |

## Pricing Principles

- **Free tools**: Distribution engine. Collect emails. Upsell to paid.
- **Low price ($7-47)**: Remove friction. Don't over-scope. Ship fast.
- **Mid price ($47-147)**: Needs clear outcome promise. 10x value rule.
- **High price ($147-697)**: Systems that save 10+ hours or make 10x the cost back. Need trust built first.

See `references/product-playbook.md` for full product development patterns.
