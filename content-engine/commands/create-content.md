---
description: Write content in the creator's voice — blog posts, social posts, newsletters, video scripts, threads
argument-hint: "<topic, repurpose request, or content type+angle>"
---

# /create-content

> See [CONNECTORS.md](../CONNECTORS.md) for publishing and knowledge base integrations.

## Workflow

### Step 1: Understand the Request

Parse the argument:
- **Topic + format**: "LinkedIn post about [topic]" → write it
- **Repurpose request**: "Turn this blog post into [format]" → adapt it
- **Just a topic**: "Write about [topic]" → ask which format
- **No argument**: Ask: "What do you want to create, and what format? (blog, LinkedIn, X, email, video script)"

### Step 2: Load Voice

Check for voice config in order:
1. `CREATOR.md` — voice section (covers 90% of cases)
2. `creator-memory/voice.md` — full documentation
3. Project `CLAUDE.md` — "Brand Positioning" or "Voice" section
4. If none: ask "Should I write in a neutral voice, or describe your style first?"

Also load channel-specific rules from `creator-memory/channels.md` if it exists.

If `~~knowledge base` connected: check for related drafts or previous content on this topic.

### Step 3: Clarify if Needed

If anything is ambiguous, ask one focused question before writing. Don't ask multiple questions.

Common clarifications:
- "Is this from personal experience, or a general take?"
- "Which audience is this for — [audience A] or [audience B]?"
- "What's the one thing you want them to take away?"

### Step 4: Write

Apply the content-creation skill:
- Voice layer: apply voice attributes from CREATOR.md
- Format layer: apply format rules for the specific channel
- Quality check: verify opener strength, voice match, format fit, single purpose, specificity

For repurposing: follow the repurposing workflow in content-creation skill, adapting to the target format.

### Step 5: Deliver with Options

Present the content, then offer:
- "Want me to write a [related format] version of this?"
- "Should I add a visual prompt for this piece?"
- "Want to review this against your voice standards? Run `/content-review`."

If the piece is for a blog: offer to generate meta title/description and FAQ section for SEO.

### Step 6: Save to Catalog (optional)

If `creator-memory/content/` exists, offer to log: title, format, channel, date, status (draft/published).
