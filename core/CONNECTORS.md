# Core Connectors

The core plugin manages workspace state and session memory.

| Category | Default | Alternatives |
|----------|---------|-------------|
| `~~knowledge base` | Notion | Obsidian, Confluence, Linear, any MCP notes tool |
| `~~task management` | Notion database | Linear, Todoist, GitHub Issues |
| `~~chat` | Slack | Discord, Teams |
| `~~memory` | Local CREATOR.md + creator-memory/ | mcp-memory, Notion |

## Connector Usage in This Plugin

- `~~knowledge base` — search for existing brand docs, content archives in creator-sprint Step 0
- `~~task management` — sync tasks with external tools if connected
- `~~chat` — send session summaries or sprint reports to team channel
- `~~memory` — persistent cross-session memory if connected

## No Connectors Required

This plugin works fully offline. All memory is stored in local files:
- `CREATOR.md` — hot cache (~80 lines, covers 90% of sessions)
- `creator-memory/` — deep documentation by domain
- `TASKS.md` — task board

External connectors enhance but are never required.
