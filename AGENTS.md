# Repository Instructions

This repo is part of the FrankX / Starlight / Arcanea agent estate.

## Classification

- Repo: agentic-creator-skills
- Class: public Claude Code plugin marketplace (ACOS — Agentic Creator OS)
- Default health command: `claude plugin validate --strict .` (marketplace and every plugin), plus `node --test video-social-studio/scripts/vid.test.mjs` for the video engine
- Remote: https://github.com/frankxai/agentic-creator-skills.git

## Agent Rules

- Read this file before making changes.
- Preserve existing user work and unrelated dirty files.
- Keep edits scoped to the requested task.
- Prefer existing repo conventions over new abstractions.
- Run the health command before handoff when feasible.
- Do not publish secrets, private memory, credentials, or internal-only strategy.

## Class-Specific Guidance

- Preserve skill/plugin/MCP schemas and frontmatter.
- Validate skills, manifests, scripts, and generated registries after edits.
- Keep public/private memory boundaries explicit.

## Handoff

Summarize changed files, validation run, risks, and any follow-up needed.

## Design Taste Kernel

For any site, app, landing page, dashboard, visual identity, brand, motion, media, social, or frontend task, apply the shared Design Taste Kernel before handoff:

- C:\Users\frank\starlight\repos\DESIGN_TASTE.md
- C:\Users\frank\starlight\repos\WEB_EXPERIENCE_STANDARD.md
- C:\Users\frank\starlight\repos\MOTION_TASTE_RUBRIC.md
- C:\Users\frank\starlight\repos\MULTI_AGENT_DESIGN_COUNCIL.md
- C:\Users\frank\starlight\repos\VISUAL_QA_GATE.md

When motion, scroll, generated media, GIF/video, or premium polish matters, route through the Motion Design Studio plugin/skills and verify the result visually.


## GenCreator packs

New creator packs follow the `gencreator-product-team` profile (starlight-agent-config `core/teams/`): one named creator and her weekly job, research the tool she pays for, a deterministic engine script for mechanical work plus skills for judgment, a `creator-dogfood-tester` run on real media, a `skill-judge` eval, and a second-provider review before the draft PR is marked ready. `video-social-studio/` is the reference pack. Never publish, price or post on a creator's behalf.
