---
description: Generate a full intelligence report — top patterns, skill activation history, learning trends, and improvement recommendations
---

# /intelligence-report

## Workflow

### Step 1: Read All Data Sources

1. `.claude/trajectories/patterns.json` — all learned n-gram patterns
2. `.claude/trajectories/` — all trajectory files (list + count)
3. `.claude-flow/circuit-breaker.json` — hook health
4. `.claude-flow/metrics/learning-status.json` — if present
5. `.claude-flow/audit.jsonl` (last 50 lines) — recent tool activity

If no data exists: "No trajectory data yet. Complete a few sessions first."

### Step 2: Analyze Patterns

From patterns.json, surface:
- **Top 5 patterns** by frequency (most-used tool sequences)
- **Top 5 patterns** by success rate (most reliable sequences)
- **Bottom 5 patterns** by success rate (sequences to avoid)
- **New patterns** (sequences that appeared in the last 7 days)

### Step 3: Skill Activation Analysis

From trajectory data, identify:
- Which skill domains appear most frequently? (content, visual, music, product, etc.)
- Are activations appropriate? (is the right skill loading for the right task?)
- Any missing activations? (tasks where no skill guidance loaded)

### Step 4: Learning Trends

Compare early trajectories (first 20%) vs recent (last 20%):
- Success rate trend: improving / flat / declining?
- Tool sequence length trend: getting more efficient (shorter) or more thorough (longer)?
- New tool types being used? (expanding capability or narrowing?)

### Step 5: Generate Report

```
═══════════════════════════════════════════════════════════════
  ACOS Intelligence Report — Full Analysis
═══════════════════════════════════════════════════════════════

  Sessions: [n] | Trajectories: [n] | Patterns: [n]

  TOP PATTERNS (most reliable)
  ─────────────────────────────────────
  1. [sequence] — [success rate]% over [n] sessions
  2. [sequence] — [success rate]% over [n] sessions
  3. [sequence] — [success rate]% over [n] sessions

  EMERGING PATTERNS (last 7 days)
  ─────────────────────────────────────
  • [new pattern observed]

  SKILL ACTIVATION
  ─────────────────────────────────────
  Most active: [skill domain] ([n] activations)
  Recommendation: [one specific improvement]

  LEARNING TREND
  ─────────────────────────────────────
  Success rate: [early baseline]% → [recent]% ([delta])
  Trajectory: [Improving / Flat / Declining]

  RECOMMENDATIONS
  ─────────────────────────────────────
  1. [Specific action to improve lowest-scoring area]
  2. [Pattern to reinforce]
  3. [Pattern to investigate or avoid]
═══════════════════════════════════════════════════════════════
```

### Step 6: Save Report (optional)

Offer to save to `.claude/trajectories/reports/[date]-report.md` for trend tracking over time.
