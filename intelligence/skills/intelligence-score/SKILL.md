---
name: intelligence-score
description: "ACOS intelligence scoring and pattern tracking. Measures skill activation accuracy, pattern quality, operational history, and learning velocity. Use when checking system effectiveness, reviewing session patterns, or reporting ACOS intelligence score."
---

# Intelligence Score

ACOS tracks its own effectiveness and learns from every session.

## The 4-Component Score (25 points each, 100 total)

| Component | Measured by | Scoring |
|-----------|-------------|---------|
| Memory Depth | Trajectory count + memory entries | 0-10 = 5pt, 11-50 = 10pt, 51-100 = 15pt, 101-200 = 20pt, 200+ = 25pt |
| Pattern Quality | patterns.json avg success rate | <50% = 5pt, 50-65% = 10pt, 66-75% = 15pt, 76-85% = 20pt, 86%+ = 25pt |
| Operational History | Total trajectories + tool diversity | <10 = 5pt, 10-30 = 10pt, 31-60 = 15pt, 61-100 = 20pt, 100+ = 25pt |
| Learning Velocity | Pattern count growth + success trend | Declining = 5pt, Flat = 10pt, Slight = 15pt, Strong = 20pt, Accelerating = 25pt |

## Score Display Format

```
═══════════════════════════════════════════════════
  ACOS Intelligence Report
═══════════════════════════════════════════════════

  Memory Depth        ████████████████████░░░░░  20/25
  Pattern Quality     ██████████████████████░░░  22/25
  Operational History ████████████████████████░  24/25
  Learning Velocity   ████████████████░░░░░░░░░  16/25

  ──────────────────────────────────────────────
  Total               ████████████████████░░░░░  82/100  Grade B+
═══════════════════════════════════════════════════
```

Grade scale: A+ (95-100), A (90-94), B+ (85-89), B (80-84), C+ (75-79), C (70-74), D (<70)

## Data Sources

The intelligence score reads from:
- `.claude/trajectories/patterns.json` — learned n-gram tool sequences
- `.claude/trajectories/` — individual trajectory files (count = operational history)
- `.claude-flow/circuit-breaker.json` — hook reliability signals
- `.claude-flow/metrics/learning-status.json` — learning system health

## Pattern Learning

ACOS extracts n-gram patterns from successful sessions:

```
Tool sequence → "Read > Edit > Bash" (3-gram)
Outcome → success/failure
Context → task type, domain

Stored as:
{
  "sequence": "Read > Edit > Bash",
  "occurrences": 10,
  "successRate": 0.89,
  "context": "code_development"
}
```

Top patterns surface as routing recommendations on session start.

## Trajectory System

Each significant session creates a trajectory file in `.claude/trajectories/`:
- Records the task type, tools used, success outcome
- Feeds pattern extraction on next session start
- Accumulates into institutional memory

**Rules:**
- Trajectories are append-only (immutable audit trail)
- Pattern extraction runs automatically on session start
- Patterns with <3 occurrences are not surfaced (insufficient evidence)

## Continuous Improvement

Intelligence score improves over time through:
1. **More trajectories** → higher operational history
2. **Better patterns** → higher pattern quality (success rate improves as bad patterns are deweighted)
3. **Voice activation accuracy** → skill routing improves as it learns your phrases
4. **Hook reliability** → zero circuit breaker breaks = perfect hook score

Review weekly with `/acos-score`. Target: Grade A (90+) within 30 sessions.
