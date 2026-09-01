---
name: content-creation
description: Voice-consistent content creation across blog posts, social media, newsletters, video scripts, and email. Applies brand voice attributes, per-channel tone rules, and content structure frameworks. Use when writing commissioned content, adapting existing content for new channels, or building a content calendar. For durable search pages, long-tail SEO, topic clusters, or pillar content, apply the search-authority skill first.
---

# Content Creation

Produce content in the creator's voice, at the right length and format for each channel.

## Upstream Routing

Before writing, classify the request:

- **Durable search page, long-tail SEO page, pillar page, comparison page, or topic cluster** → load `search-authority` first and require a `PASS` commission packet.
- **Campaign, newsletter, social post, script, or repurposing task** → proceed with this skill when audience, purpose, and source material are clear.
- **Uncommissioned generic article request** → establish the reader job, evidence, original value, and primary action before drafting.

A keyword is not a brief. Do not manufacture pages merely because a query variant exists.

## How This Skill Works

1. **Commission layer** — the piece has a clear audience job, purpose, evidence, and action
2. **Voice layer** — every piece sounds like the creator (loaded from `CREATOR.md` or `creator-memory/voice.md`)
3. **Format layer** — each channel has specific structure, length, and tone rules
4. **Evidence layer** — claims map to inspectable sources or first-party experience
5. **Conversion layer** — the next action continues the reader's job instead of changing the subject

If no voice documentation exists: ask the user to describe their voice, or run `/creator-sprint`.

## Content Types and Formats

### Blog Post

- **Headline**: usually 50–65 characters, but clarity and distinction outrank arbitrary length
- **Opening**: first 100 words earn the scroll; lead with the decision, tension, result, or surprising mechanism—not background
- **Structure**: Reader job → thesis → evidence/framework → application → next decision
- **Length**: determined by the job and evidence; remove everything that does not advance the decision
- **Summary**: include an early decision summary when it improves scanability
- **Closing action**: one primary action with clear value continuity
- **Search-targeted pages**: follow the approved page commission packet and original-artifact contract

### Social Post (LinkedIn)

- **Opening line**: earns attention with a concrete claim, observation, tension, result, or decision
- **Body**: 3–7 compact sections with deliberate white space
- **Length**: use the minimum space required to complete one idea
- **CTA**: one relevant question or action; no engagement bait

### Social Post (X / Twitter)

- **Lead post**: a complete thought, not merely a teaser
- **Thread option**: use only when the argument genuinely requires sequence
- **Proof**: include a screenshot, diagram, result, or source when the claim depends on it

### Email / Newsletter

- **Subject**: specific value, tension, or curiosity without false promises
- **Preview text**: extends rather than repeats the subject
- **Opening**: reaches the live question immediately
- **Body**: one argument, one useful artifact or implication, one primary action

### Video Script

- **Hook**: first five seconds establish the promised decision, result, tension, or visual transformation
- **Structure**: Hook → proof/context → mechanism → application → summary → action
- **Pacing**: write for spoken delivery and editability, not essay cadence
- **Visual contract**: identify what the viewer should see while each claim is made

## Channel Tone Adjustment

Voice stays consistent; tone adapts to context:

| Channel | Tone | Example shift |
|---|---|---|
| Blog | Complete, evidence-led | Full arguments, sources, direct artifacts |
| LinkedIn | Professional, personal | First-person judgment, operating implications |
| X/Twitter | Direct, compressed | One sharp claim or sequence |
| Email | Personal, useful | Reader framing, clear next step |
| Video | Conversational, visual | Action verbs, shorter spoken sentences |

## Repurposing Workflow

Repurpose the **idea and evidence**, not the paragraph structure.

1. Start with the richest source artifact: research, build, long-form article, interview, or video
2. Extract 3–5 distinct decisions, tensions, mechanisms, or proof points
3. Assign one native angle to each destination channel
4. Rewrite openings, pacing, examples, and actions for that channel
5. Preserve claim provenance and link back when the source adds value
6. Do not publish near-identical copy across several brand accounts

See `references/repurposing-templates.md` for format-specific templates.

## Search Implementation Checklist

Use this only after `search-authority` has commissioned the page:

- [ ] One canonical owner and URL
- [ ] Reader job and exclusion boundary are explicit
- [ ] Primary query and related entities appear naturally
- [ ] Title and opening resolve the actual intent
- [ ] Heading structure follows reader decisions, not keyword repetition
- [ ] Claims map to current, trustworthy, or first-party evidence
- [ ] Original artifact is present and useful
- [ ] Internal links reflect the topic graph and next decisions
- [ ] Meta description accurately previews the page
- [ ] Canonical, robots, sitemap, structured data, and indexation intent are correct
- [ ] Images have useful alt text and rights/provenance are known
- [ ] Analytics events cover the primary action
- [ ] Author, reviewer, publication date, and refresh trigger are visible where appropriate

## Quality Check Before Delivering

1. **Commission match** — does the piece satisfy the approved reader job and artifact contract?
2. **Voice match** — does it sound like the creator rather than a generic model?
3. **Opening strength** — does the first screen create a reason to continue?
4. **Argument integrity** — are claims supported and uncertainty represented honestly?
5. **Distinct value** — what can the reader use, inspect, decide, or do here that was not available before?
6. **Format fit** — is the structure native to this channel?
7. **Single purpose** — is there one primary idea and next action?
8. **Human texture** — are examples, judgments, transitions, and sentence rhythms specific rather than synthetic?
9. **Conversion continuity** — does the CTA advance the same job?
10. **Maintenance fitness** — can the piece be reviewed, refreshed, merged, or retired deliberately?
