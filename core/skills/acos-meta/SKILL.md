---
name: acos-meta
description: "ACOS self-description. Explains how ACOS works, how to add new plugins/skills/commands, and how to debug the system. Use when building new ACOS capabilities, understanding the system architecture, or onboarding a new user to ACOS."
---

# ACOS Meta

ACOS (Agentic Creator OS) describes itself using the same primitives it uses to build everything else.

## Plugin Architecture

```
agentic-creator-skills/           ← The marketplace repo
├── .claude-plugin/
│   └── marketplace.json          ← Plugin registry
├── core/                         ← Install first
├── content-engine/               ← Writing + distribution
├── visual-studio/                ← Image generation
├── music-lab/                    ← Music production
├── brand-architect/              ← Voice + positioning
├── product-launcher/             ← Shipping products
├── intelligence/                 ← Learning + scoring
└── skills/                       ← Standalone Anthropic skills (existing)

Each plugin/
├── .claude-plugin/plugin.json    ← Plugin manifest
├── skills/[name]/SKILL.md        ← Domain expertise (progressive disclosure)
├── skills/[name]/references/     ← Deep content, fetched on demand
├── commands/*.md                 ← Slash commands
└── CONNECTORS.md                 ← Tool category map
```

## The 3 Design Principles

### 1. Progressive Disclosure
SKILL.md holds the mental model and workflow skeleton (<3K words). Deep content lives in `references/`. Claude loads the lean summary and fetches references only when needed.

### 2. Connector Agnosticism
Skills reference `~~categories` (e.g. `~~image generation`, `~~knowledge base`), not vendor names. The `.mcp.json` maps categories to tools. Swap tools without touching skills.

### 3. Commands as Workflows
Commands are markdown-specified workflows: input gathering, decision logic, output format, follow-up options. No code. Claude interprets and executes.

## Plugin Install Matrix

```bash
# Minimum setup (just creator workspace)
claude plugin install core@agentic-creator-skills

# Full creator OS
claude plugin install core content-engine visual-studio music-lab brand-architect product-launcher intelligence@agentic-creator-skills

# Add to any existing project
claude plugin marketplace add frankxai/agentic-creator-skills
claude plugin install core@agentic-creator-skills
```

## Adding a New Plugin

1. Create `plugin-name/` directory in the repo
2. Add `.claude-plugin/plugin.json` (only: name, version, description, author)
3. Create `skills/[skill]/SKILL.md` with YAML frontmatter
4. Create `commands/[command].md` following workflow format
5. Create `CONNECTORS.md` with `~~category` placeholders
6. Register in `.claude-plugin/marketplace.json` with `source` field
7. Validate: `claude plugin validate plugin-name/`

## Adding a New Skill

1. Create `skills/[skill-name]/SKILL.md`
2. Add frontmatter: `name`, `description` (include trigger phrases)
3. Main content: overview, workflow, key principles (<3K words)
4. Create `references/` subdir for detailed content loaded on demand
5. Test: mention trigger phrases, verify activation

## Adding a New Command

1. Create `commands/[command-name].md`
2. YAML frontmatter: `description`, optional `argument-hint`
3. Add `> See CONNECTORS.md` reference
4. Write `## Workflow` with numbered steps
5. Include: input gathering, tool use, output format, follow-up options

## Debugging

When something behaves unexpectedly:
1. Check installed plugin: `claude plugin list`
2. Re-validate: `claude plugin validate [plugin-name]/`
3. Re-install: `claude plugin uninstall X@agentic-creator-skills && claude plugin install X@agentic-creator-skills`
4. Check marketplace is current: `claude plugin marketplace update agentic-creator-skills`
