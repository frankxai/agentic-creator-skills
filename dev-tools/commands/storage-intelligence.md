---
description: Scan and clean developer disk space — WSL-aware, framework-aware, 3-lens safety council
argument-hint: "[scan|purge|deep]"
---

# /storage-intelligence

> See [CONNECTORS.md](../CONNECTORS.md) | Standalone CLI: `npx storage-intelligence`

## Modes

- **No args**: Full scan → auto-clean safe items → interactive recommendations
- **`scan`**: Dry run — report only, no deletions
- **`purge`**: Auto-clean only, no questions asked
- **`deep`**: Full + inactive project node_modules analysis

## Workflow

### Step 1: Determine mode
Parse argument or default to `full`.

### Step 2: Run scan
Execute all 6 zones (+ node_modules if deep):
- Zone 1: Windows Temp (WSL swap detection is the priority)
- Zone 2: Package manager caches
- Zone 3: Node global packages
- Zone 4: WSL app data (Claude versions, OpenCode, browser engines)
- Zone 5: Build caches (.next, .nuxt, .turbo, etc.)
- Zone 6: Windows AppData caches

### Step 3: Apply 3-lens council
Each item passes: Safety Guardian → Efficiency Analyst → Developer Advocate.
Verdict: AUTO-DELETE | RECOMMEND-DELETE | PRESERVE

### Step 4: Execute + Report
Auto-delete confirmed-safe items. In `full` mode, present recommendations interactively.
Show disk usage before and after. Provide VHD compaction command for post-cleanup.

---

Powered by [frankxai/storage-intelligence](https://github.com/frankxai/storage-intelligence)
