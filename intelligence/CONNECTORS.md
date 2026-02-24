# Intelligence Connectors

| Category | Default | Alternatives |
|----------|---------|-------------|
| `~~memory` | Local .claude/trajectories/ + patterns.json | mcp-memory, external vector store |
| `~~knowledge base` | Local ACOS docs | Notion |
| `~~chat` | Slack | Discord |
| `~~analytics` | Local metrics files | Datadog, PostHog |

## Connector Usage in This Plugin

- `~~memory` — read/write trajectory patterns and session summaries
- `~~knowledge base` — surface intelligence reports to team documentation
- `~~chat` — send weekly intelligence digests or score alerts
- `~~analytics` — stream metrics to external dashboards if needed

## Architecture Note

The intelligence plugin tracks patterns from `.claude/trajectories/` and `.claude-flow/` directories. These are local to the Claude Code workspace and don't require external connectors.

The ACOS intelligence score system is self-contained — it reads its own audit trail and patterns to compute the score. External connectors only add reporting/notification capability.
