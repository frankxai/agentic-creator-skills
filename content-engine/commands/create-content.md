---
description: Write commissioned content in the creator's voice — blog posts, social posts, newsletters, video scripts, and threads
argument-hint: "<topic, commission packet, repurpose request, or content type+angle>"
---

# /create-content

> See [CONNECTORS.md](../CONNECTORS.md) for publishing and knowledge-base integrations.

## Workflow

### Step 1: Classify the Request

Parse the argument and route it before writing:

- **Durable search page, long-tail SEO page, pillar page, comparison page, or topic cluster** → run `/build-search-authority` first. Continue only when the page has a `PASS` commission packet.
- **Existing approved brief or commission packet** → proceed with the defined reader job, evidence, artifact, and action.
- **Repurpose request** → adapt the source idea and evidence to the destination channel.
- **Campaign, social, email, newsletter, or script request** → proceed when audience, purpose, and source material are clear.
- **Uncommissioned generic article request** → establish the reader job, differentiated thesis, evidence, original value, and primary action before drafting.

A keyword is not a brief. Do not manufacture pages merely because a query variant exists.

### Step 2: Load Voice and Brand Context

Check in this order:

1. `CREATOR.md` — active voice and positioning
2. `creator-memory/voice.md` — deeper voice documentation
3. Project `CLAUDE.md` — brand positioning, audience, language, and quality rules
4. `creator-memory/channels.md` — channel-specific constraints when present

If no voice documentation exists, ask whether to use a neutral voice or initialize the creator profile.

When a `~~knowledge base` is connected, inspect related drafts, published work, products, research, and evidence before creating new material.

### Step 3: Resolve the Commission

Before drafting, confirm the piece has:

- one audience and reader job
- one primary purpose
- a defensible thesis or useful angle
- inspectable evidence or clearly bounded opinion
- an original artifact, example, framework, demonstration, or decision aid when the format warrants it
- one primary action that continues the reader's job
- a destination channel and success signal

For search-targeted content, these must come from the approved search-authority packet. Do not silently invent them.

### Step 4: Build the Evidence and Structure

Create a compact working packet:

```text
Audience:
Reader job:
Thesis:
Evidence:
Original value:
Structure:
Primary action:
Success signal:
```

Map factual claims to trustworthy or first-party sources. Mark uncertainty. Never fabricate personal experience, benchmarks, traffic, customer results, or tool behavior.

### Step 5: Write

Apply the `content-creation` skill:

- commission layer: satisfy the reader job and artifact contract
- voice layer: apply the active creator and brand voice
- format layer: use native channel structure and pacing
- evidence layer: preserve claim provenance
- conversion layer: make the next action a natural continuation

For repurposing, transform the angle, opening, pacing, examples, and action for the destination channel rather than copying the source structure.

### Step 6: Review Independently

Run a distinct review pass for:

1. commission match
2. claim integrity and uncertainty
3. voice and human texture
4. channel fit and opening strength
5. distinct value
6. commercial continuity
7. search implementation when applicable
8. maintenance and refresh fitness

For substantial or search-targeted work, route through `/content-review` before publication.

### Step 7: Deliver the Production Packet

Return:

- final draft
- title or hook alternatives only when they serve a concrete test
- source and claim notes
- original artifact or visual requirements
- metadata and technical requirements when applicable
- primary action
- distribution derivatives
- unresolved risks or approvals

Do not add generic offers for more content. End with the next decision or production action already implied by the brief.

### Step 8: Save and Route

When the workspace provides a canonical content system:

- update the existing content record instead of creating a parallel tracker
- attach the brief, draft, sources, status, owner, review state, target date, and live URL
- route code-backed content through a repository branch and pull request
- require rendered preview evidence before production publication
- schedule the relevant learning window after release

Publication authority remains separate from drafting authority.
