---
description: Write a product spec from a brief or idea — defines scope, audience, pricing, and success metric before building
argument-hint: "<product name or idea>"
---

# /product-spec

## Workflow

### Step 1: Understand the Idea

Parse argument or ask: "What product are you building? Give me the one-line version."

Then gather (conversationally, not as a form dump):
1. **Problem**: Who has it, how painful is it?
2. **Audience**: Who is the primary buyer or user?
3. **Format**: Template / tool / course / agent / SaaS?
4. **Price range**: Free / $7-47 / $47-147 / $147-697?

If they've already thought this through: ask for the brief and extract the answers.

### Step 2: Validate Before Speccing

Before writing the spec, check the idea against the product-launch skill principles:
- Is the problem specific? (vague problems = unsellable products)
- Is the audience narrow enough? (broad audience = no urgency to buy)
- Does the price match the value delivered? (10x value rule)
- Is there a clear distribution path? (no launch plan = no sales)

If any of these fail: ask the clarifying question before proceeding.

### Step 3: Write the Spec

Generate a product spec document:

```markdown
# [Product Name] — Spec

## Problem
[2-3 sentences. Specific pain, specific person.]

## Solution
[What it does. What it explicitly doesn't do (v1 scope).]

## Audience
[Primary buyer. What they've already tried. Why this is different.]

## Pricing
[Price point, rationale, value ladder context]

## Distribution
[How buyers find this — email list / SEO / social / marketplace / direct]

## Success Metric
[What makes this worth shipping in 30 days]

## V1 Scope
### In
- [Feature / piece of content / page]

### Explicitly Out (v2+)
- [Deferred items]

## Open Questions
- [Anything unresolved]
```

### Step 4: Confirm and Save

Present the spec for review. Ask: "Does this capture what you're building?"

On approval: save to `docs/[product-name]-spec.md`.

Suggest next step: `/product-sprint [component]` to start building.
