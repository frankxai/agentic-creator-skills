---
description: Review content against brand voice standards and score it for readiness
argument-hint: "<paste content here, or omit to review the last piece created>"
---

# /content-review

> See [CONNECTORS.md](../CONNECTORS.md) for knowledge base integration.

## Workflow

### Step 1: Get Content to Review

If content is provided as argument: use it.
If no argument: ask user to paste the content for review.

### Step 2: Load Voice Standards

Load from `CREATOR.md` or `creator-memory/voice.md`:
- Voice attributes (the 3-5 core traits)
- Anti-patterns (what this creator never writes)
- Channel rules (if channel is specified)
- Terminology rules

### Step 3: Score

Score on 5 dimensions (1-5 each, 25 total):

**Voice Match (1-5)**
- 5: Unmistakably this creator's voice
- 3: Generally correct but could be anyone
- 1: Clearly not this creator's voice

**Opener Strength (1-5)**
- 5: Would stop scrolling; specific, surprising, or immediately useful
- 3: Acceptable but not compelling
- 1: Starts with "I", generic claim, or weak setup

**Format Fit (1-5)**
- 5: Perfect length and structure for this channel
- 3: Close but could be optimized
- 1: Wrong format for channel (too long, wrong structure)

**Clarity and Specificity (1-5)**
- 5: Every claim is specific and actionable
- 3: Some vague or generic sections
- 1: Abstract throughout, no specific examples

**CTA Quality (1-5)**
- 5: One clear action, naturally integrated
- 3: Weak or formulaic CTA
- 1: No CTA, or multiple competing CTAs

### Step 4: Report

```
Content Review
══════════════

Voice Match       [score]/5  [brief note]
Opener Strength   [score]/5  [brief note]
Format Fit        [score]/5  [brief note]
Clarity           [score]/5  [brief note]
CTA Quality       [score]/5  [brief note]
──────────────────────────────────
Total             [total]/25

Verdict: [PUBLISH-READY / MINOR EDITS / SIGNIFICANT REVISION / REWRITE]
```

**Thresholds:** 22-25 = publish-ready, 18-21 = minor edits, 13-17 = significant revision, <13 = rewrite

For each score below 4: quote the specific passage + explain the issue + provide a rewritten version.

### Step 5: Offer Follow-Up

If revision needed: "Want me to revise based on this feedback?"
If ready: "Looks good. Want me to adapt this for another channel?"
