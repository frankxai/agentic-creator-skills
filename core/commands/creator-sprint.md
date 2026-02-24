---
description: Start a focused creative work session, or initialize the creator workspace for the first time
---

# /creator-sprint

> See [CONNECTORS.md](../CONNECTORS.md) for available integrations.

## Workflow

### Detect Mode

Check if `CREATOR.md` exists in the working directory:
- **Exists** → Sprint Mode (daily session start)
- **Doesn't exist** → Initialization Mode (first-time setup)

---

## Initialization Mode

Build the creator's brand knowledge base from scratch.

### Step 0: Scan for Existing Context (Before Asking Anything)

Silently check for existing brand signals:
1. Look for `CLAUDE.md` — does it have brand, voice, or positioning sections? Extract any voice attributes, audience, or content pillars already defined.
2. Look for `content/` or `blog/` directory — if found, read 2-3 recent pieces to infer voice patterns.
3. Look for `README.md` — often reveals audience and positioning.
4. Check `~~knowledge base` (if connected) for existing brand docs or style guides.

If existing context found: "I found some context about your brand. Let me confirm a few things rather than starting from scratch."

### Step 1: Creator Profile

Ask conversationally — not all at once:

"Let's set up your creator workspace. Quick questions:
1. What's your name, and what type of creator are you?
2. What's your core audience?
3. Your brand in 3 words?"

### Step 2: Voice Derivation (from samples, not self-description)

"Paste 2-3 examples of your best content — things that sound exactly like you."

From their samples, derive voice attributes by analyzing:
- Sentence length and rhythm
- Formality level
- Structural patterns (how do they open/close?)
- Signature phrases they repeat
- What they include vs. leave out

Present: "Based on your samples, here's your voice: [attributes]. Does this feel accurate?"

If no samples available: "Describe someone whose writing style yours is closest to. And give me one example of content in your space you'd never write."

### Step 3: Content Pillars

"What are the main topics or themes you create content about? Give me 3-5 pillars."

### Step 4: Visual Style (optional)

"Do you have an established visual aesthetic?"

### Step 5: Music (optional)

"Do you create or use music in your work?"

### Step 6: Active Projects

"What are you actively working on? Name and one-line brief for each."

### Step 7: Create Files

Generate:
1. `CREATOR.md` — working memory (~80 lines)
2. `creator-memory/voice.md` — full voice documentation
3. `creator-memory/channels.md` — per-channel rules
4. `creator-memory/visual.md` — visual style (if discussed)
5. `creator-memory/music.md` — music style (if discussed)
6. `creator-memory/projects/[name].md` — one file per active project
7. `TASKS.md` — task board with any mentioned priorities

### Step 8: Completion

```
✓ Creator workspace initialized

Files created:
• CREATOR.md — working memory
• creator-memory/voice.md — full voice documentation
• creator-memory/channels.md — channel rules
[• creator-memory/visual.md]
[• creator-memory/music.md]
[• creator-memory/projects/]
• TASKS.md — task board

Ready to:
• /create-content — write in your voice
• /create-visual — generate on-brand images
• /create-music — engineer music prompts
• /content-review — check content against your standards
```

---

## Sprint Mode (Daily Session)

### Step 1: Load Context

Read `CREATOR.md` — active projects, voice, any notes from last session.

If `~~knowledge base` connected: check for recent notes or drafts.

### Step 2: Session Orientation

```
Ready to create. Current context:

Active projects:
• [Project 1] — [status]
• [Project 2] — [status]

Suggested focus:
• [Most pressing based on context]

What do you want to create?
```

### Step 3: Create

Execute whatever the creator requests. Common sprint tasks:
- `/create-content`, `/create-visual`, `/create-music`, `/content-review`

### Step 4: End-of-Session Log (optional)

"Want to log what we created today?" → Update project statuses + new style decisions in CREATOR.md.
