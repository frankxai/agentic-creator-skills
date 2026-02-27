---
name: storage-intelligence
description: WSL-aware developer disk cleanup with a 3-lens safety council (Safety Guardian, Efficiency Analyst, Developer Advocate). Identifies and auto-deletes stale WSL swaps, build caches, diagnostic artifacts. Recommends package manager caches and inactive project cleanup. Use when disk space is low or as routine maintenance.
---

# Storage Intelligence

Scan developer disk usage across Windows and WSL, classify items through a safety council, and clean with confidence.

## Unique Capability: WSL Swap Detection

The #1 space consumer on WSL-heavy Windows machines is **orphaned WSL swap.vhdx files** — stale virtual memory files that Windows Temp never cleans up. This skill detects and removes them automatically while preserving today's active swap.

## 3-Lens Council

Every item passes three independent reviewers before deletion:

| Lens | Question | Veto Triggers |
|------|----------|---------------|
| **Safety Guardian** | Could this break anything? | User data, credentials, active sessions, .git, .worktrees |
| **Efficiency Analyst** | Is the size worth the risk? | Items <50MB are skipped |
| **Developer Advocate** | Is this needed for dev workflow? | Active node_modules, active Node version, recently-used tools |

## What Gets Cleaned

### AUTO-DELETE (always safe, no confirmation)
- Stale WSL `swap.vhdx` files (UUID dirs in Windows Temp, older than today)
- Windows diagnostic outputs (`DiagOutputDir`, `Diagnostics`, `wsl-crashes`)
- Build caches (`.next`, `.nuxt`, `.turbo`, `.svelte-kit`, `.vite`)
- OpenCode logs and snapshots
- Old Claude CLI versions (keeps latest only)
- `pip-unpack-*` temp directories

### RECOMMEND-DELETE (needs user confirmation)
- Package manager caches (npm, pnpm, uv, pip, chroma) — always re-downloadable
- Stale browser engine binaries (Playwright/Puppeteer) if not recently used
- Old global npm packages with no project references
- `node_modules` in projects with no commits in 30+ days

### ALWAYS PRESERVED
- Today's WSL swap file (active session)
- `.worktrees` (production repo)
- `.git` directories
- User data (`Documents`, `Pictures`, `Videos`, `Desktop`)
- Credentials and secrets
- Items under 50MB

## Usage

```
/storage-intelligence          → full scan + auto-clean + recommendations
/storage-intelligence scan     → dry run, report only
/storage-intelligence purge    → auto-clean only, no questions
/storage-intelligence deep     → include inactive project node_modules
```

## Standalone CLI Alternative

```bash
npx storage-intelligence
npx storage-intelligence scan
```

Source: [github.com/frankxai/storage-intelligence](https://github.com/frankxai/storage-intelligence)

## Post-Cleanup Action

After cleanup, compact the WSL virtual disk to reclaim freed space on C: drive:

```powershell
# Run from Windows PowerShell (Admin)
wsl --shutdown
wsl --manage Ubuntu-24.04 --optimize
```

## Implementation

See full implementation in [`claude-commands/storage-intelligence.md`](https://github.com/frankxai/storage-intelligence/blob/main/claude-commands/storage-intelligence.md)
