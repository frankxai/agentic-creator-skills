---
name: brand-voice
description: "Apply and enforce brand voice across all content creation. Manages voice attributes, tone adaptation by channel, style rules, and terminology. Use when writing content, reviewing drafts, or defining brand voice for a new project. Loads voice config from CREATOR.md or creator-memory/voice.md."
---

# Brand Voice

Write in a consistent voice — not just tone, but the specific fingerprint of how a creator communicates.

## Voice vs. Tone

**Voice** is fixed. It's the personality — what the brand always sounds like.
**Tone** is variable. It's the emotional inflection applied to the voice based on context.

A creator's voice stays consistent across channels. Tone adapts: more formal on LinkedIn, punchier on X, warmer in email.

## Voice Loading Priority

1. `CREATOR.md` — voice section (quick ref, covers 90% of cases)
2. `creator-memory/voice.md` — full documentation with examples
3. Project `CLAUDE.md` — look for "Brand Positioning" or "Voice" section
4. If none found: ask the user, or run `/creator-sprint`

## The 5 Voice Components

### 1. Voice Attributes (3-5 maximum)
Each attribute defined as:
- **We are**: what it means in practice
- **We are not**: the misinterpretation to avoid
- **Sounds like**: example sentence
- **Never sounds like**: anti-example

### 2. Audience Definition
- Who the primary audience is
- What they already know (don't over-explain)
- What they want from this creator
- How they expect to be addressed (peer, student, collaborator)

### 3. Content Pillars
3-5 core themes the creator consistently covers. Every piece should belong to one.

### 4. Tone Adaptation Rules

| Channel | Tone shift | Example |
|---------|-----------|---------|
| Long-form blog | Educational, complete, evidence-based | Full arguments, conclusions |
| LinkedIn | Professional, thought-provoking, personal | First-person insight |
| X/Twitter | Direct, punchy, opinionated | Short sentences, bold claims |
| Email | Personal, warm, action-oriented | "You" framing, clear next step |
| Video | Conversational, energetic | Shorter sentences, visual language |

### 5. Terminology Rules
Preferred and avoided terms. Examples:
- "creators" not "influencers"
- "ships" not "launches" (for product releases)
- Never: spiritual language, guru tone, lazy CTAs

## Applying Voice to Content

1. Read voice attributes from CREATOR.md
2. Draft the opener — rewrite until it sounds like the creator
3. Check for anti-patterns (things this creator never says)
4. Verify tone matches channel rules
5. Check terminology — any flagged words used?

## Red Flags Requiring Revision

- Opener starts with "I" (usually weak, unless intentional personal story)
- More than one "!" in a piece
- "Amazing", "awesome", "incredible" (generic, not precise)
- "In today's fast-paced world..." (stock opener, never use)
- Passive voice where active works better
- Hedging: "I think", "maybe", "possibly" (unless intentional)

See `references/voice-frameworks.md` for the full voice documentation template and derivation guide.
