---
description: Post-launch retrospective — review performance against spec, capture learnings, plan next version
argument-hint: "<product name>"
---

# /product-retro

## Workflow

### Step 1: Load Context

Read the product spec from `docs/[product-name]-spec.md`.

If not found: ask "What product are we reviewing? Share the original goals or spec."

Also gather:
- How long since launch?
- Any performance data (sales, signups, traffic)?
- Any user feedback or support questions?

### Step 2: Shipped vs. Planned

Compare what shipped to what was specced:
- What was in V1 scope that shipped?
- What was descoped or cut?
- What unexpected scope was added?

### Step 3: Performance vs. Success Metric

Review against the success metric from the spec:
- What was the target?
- What happened?
- Why? (distribution, timing, product, pricing?)

If `~~analytics` connected: pull performance data to inform the review.

### Step 4: What Worked / What Didn't

Two lists:

**What worked:**
- [Specific things to repeat]

**What didn't:**
- [Specific things to change]

Each item should be specific enough to act on, not vague ("pricing was too high" vs. "the $297 tier got no purchases, $97 got most — price anchoring didn't work").

### Step 5: V2 Scope Recommendation

Based on feedback and performance:
1. Top 3 improvements for v2
2. Any deferred v1 items now worth building
3. Anything to cut from the product entirely

### Step 6: Save the Retro

Save to `docs/[product-name]-retro-[date].md` for institutional memory.

Suggest: "Want to start a spec for v2 now? Run `/product-spec [product name] v2`."
