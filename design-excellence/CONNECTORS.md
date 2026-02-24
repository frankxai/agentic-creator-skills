# Design Excellence Connectors

The design-excellence plugin governs visual quality across all UI work.

| Category | Default | Alternatives |
|----------|---------|-------------|
| `~~knowledge base` | Notion | Obsidian, Confluence, any MCP notes tool |
| `~~design tool` | Figma (via MCP) | Penpot, Sketch (manual export) |
| `~~image generation` | nanobanana (Gemini Flash) | fal.ai, Replicate, DALL-E |
| `~~chat` | Slack | Discord, Teams |

## Connector Usage in This Plugin

- `~~knowledge base` — search for brand docs, design system documentation
- `~~design tool` — Figma MCP for design-to-code workflow, token sync, component inspection
- `~~image generation` — visual asset creation with 7-gate quality filter
- `~~chat` — send design review reports, QA verdicts to team channel

## No Connectors Required

This plugin works fully offline using local files:
- `CREATOR.md` — brand voice, color domains, character map
- `creator-memory/design-system.md` — design token reference
- Project `globals.css` + `tailwind.config.js` — token source of truth

External connectors enhance but are never required.
