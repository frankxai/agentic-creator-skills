---
description: Display the ACOS unified intelligence score — memory depth, pattern quality, operational history, and learning velocity
---

# /acos-score

## Workflow

### Step 1: Gather Data

1. Read `.claude/trajectories/patterns.json` — trajectory stats and n-gram patterns
2. Check `.claude-flow/circuit-breaker.json` — hook reliability
3. Count trajectory files in `.claude/trajectories/` (exclude `_active.json`, `_operations.jsonl`, `patterns.json`)
4. Read `.claude-flow/metrics/learning-status.json` if it exists

If these files don't exist: report "No trajectory data yet. Run a few sessions and check back."

### Step 2: Calculate Components

**Memory Depth (25 pts)**
- Count trajectory files + memory entries
- 0-10 = 5pt, 11-50 = 10pt, 51-100 = 15pt, 101-200 = 20pt, 200+ = 25pt

**Pattern Quality (25 pts)**
- Average success rate from patterns.json
- <50% = 5pt, 50-65% = 10pt, 66-75% = 15pt, 76-85% = 20pt, 86%+ = 25pt

**Operational History (25 pts)**
- Total trajectory count
- <10 = 5pt, 10-30 = 10pt, 31-60 = 15pt, 61-100 = 20pt, 100+ = 25pt

**Learning Velocity (25 pts)**
- Compare last 10 trajectories success rate vs first 10
- Declining = 5pt, Flat = 10pt, Slight growth = 15pt, Strong = 20pt, Accelerating = 25pt

### Step 3: Display Report

```
═══════════════════════════════════════════════════
  ACOS Intelligence Report
═══════════════════════════════════════════════════

  Memory Depth        [bar]  [score]/25
  Pattern Quality     [bar]  [score]/25
  Operational History [bar]  [score]/25
  Learning Velocity   [bar]  [score]/25

  ──────────────────────────────────────────────
  Total               [bar]  [total]/100  Grade [X]
═══════════════════════════════════════════════════

  Top patterns this session:
  • [sequence] ([context]): [success rate]% over [n] sessions
  • [sequence] ([context]): [success rate]% over [n] sessions

  Recommendation:
  [One actionable improvement based on lowest-scoring component]
```

### Grade Scale

A+ (95-100), A (90-94), B+ (85-89), B (80-84), C+ (75-79), C (70-74), D (<70)

### Improvement Tips by Low Score

- **Low Memory Depth**: Complete more sessions. Each session adds to the trajectory log.
- **Low Pattern Quality**: Review what types of tasks are failing. Check circuit breaker for hook issues.
- **Low Operational History**: Keep using ACOS consistently. History compounds.
- **Low Learning Velocity**: System is plateauing — try new task types to expose new patterns.
