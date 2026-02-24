---
name: creator-productivity
description: "Task management and workspace memory for creative work sessions. Manages TASKS.md for project tracking, CREATOR.md as the hot-cache memory system, and the creator-memory/ deep files. Use when organizing creative projects, starting a focused work session, or tracking content tasks."
---

# Creator Productivity

Structured task management and memory for creative work — projects don't slip, context doesn't reset.

## Architecture

```
TASKS.md               ← Task board (Active, In Progress, Done)
CREATOR.md             ← Working memory (voice, projects, quick-ref, ~80 lines)
creator-memory/
  voice.md             ← Full brand voice documentation
  visual.md            ← Visual style system
  music.md             ← Music style and track log
  channels.md          ← Per-channel content rules
  projects/            ← Active project briefs
  content/             ← Published + draft content catalog
```

The two-tier system keeps the hot cache lean while supporting unlimited depth.

## Task Management

### TASKS.md Format

```markdown
# Tasks

## Active
- [ ] **[Task title]** — [context, project, deadline if any]

## In Progress
- [ ] **[Task title]** — [started date, blocker if any]

## Done (last 2 weeks)
- [x] ~~[Completed task]~~ ([completion date])
```

**Rules:** Bold the title. Include enough context to resume without re-explaining. Move to Done immediately. Archive Done weekly to `creator-memory/content/archive.md`.

### Task Capture from Conversation

When the user mentions trackable work, extract and add automatically:
- Infer title and context from conversation
- Add to Active with today's date
- Confirm: "Added to TASKS.md: [title]. Is that right?"

## Creator Memory System

Two-tier lookup for every creative request:

```
Request → CREATOR.md (hot cache, 90% of needs)
       → creator-memory/ (deep files if not in cache)
       → Ask user, then save
```

## Session Start Checklist

1. Read TASKS.md — flag overdue or blocking items
2. Read CREATOR.md — confirm active projects and voice
3. Check creator-memory/projects/ for any project briefs needing review
4. Present orientation summary

## File Initialization

- TASKS.md missing → create with standard template
- CREATOR.md missing → offer `/creator-sprint` for full setup, or create minimal version

See `references/file-templates.md` for standard templates.
