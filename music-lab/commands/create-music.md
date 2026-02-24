---
description: Engineer AI music generation prompts for Suno and compatible tools — background music, intros, content underscore, standalone tracks
argument-hint: "<use case or vibe, e.g. 'focus music for a tutorial video'>"
---

# /create-music

> See [CONNECTORS.md](../CONNECTORS.md) for music generation integrations.

## Workflow

### Step 1: Understand the Request

Parse the argument:
- Use case provided: "focus music for a tutorial video" → proceed to Step 2
- Just a vibe: "something dark and cinematic" → clarify use case first
- No argument: ask "What's the music for? And what mood are you going for?"

**Use case categories:**
- Background — ambient, non-distracting, supports work
- Content underscore — mixes under narration/video
- Intro/outro — brand signature, 10-30 seconds
- Standalone track — complete song
- Atmospheric — scene-setting, immersive

### Step 2: Load Music Style

Check for style config:
1. `creator-memory/music.md` — style anchors and track log
2. `CREATOR.md` — music style section if present
3. If neither: ask "Do you have an established sound, or should I suggest styles?"

### Step 3: Define Parameters

Confirm before engineering:
- Genre/style
- Energy level (slow / mid-tempo / energetic / building)
- Vocals or no vocals
- Key mood descriptors
- Any specific instruments to include or avoid

### Step 4: Engineer Prompt

Apply the Suno formula:
```
[Genre/Style], [Tempo], [Key instruments], [Vocal style], [Mood], [Special elements]
```

### Step 5: Deliver

Output:
1. **Primary prompt** — ready to paste into Suno or compatible tool
2. **Purpose alignment** — confirm it fits the stated use case
3. **Style notes** — what specific elements drive the desired sound
4. **Variation A** — slightly lower energy version
5. **Variation B** — slightly higher energy version

Note: Most AI music tools don't have public APIs. These prompts are engineered for manual use.

### Step 6: Post-Generation Log (optional)

After generating, offer to log the track:
- Which prompt worked best
- Score (1-10)
- Whether to keep
- What worked / what didn't

Save to `creator-memory/music.md` to build style consistency over time.
