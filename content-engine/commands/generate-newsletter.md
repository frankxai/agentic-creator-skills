---
description: Generate a newsletter issue from content catalog or briefing, route to approval before sending
argument-hint: "<stream name, topic, or 'all'>"
---

# /generate-newsletter

> See [CONNECTORS.md](../CONNECTORS.md) — requires `~~email marketing` for sending, `~~chat` for approval routing.

## Workflow

### Step 1: Determine Newsletter Stream

Parse argument:
- Named stream (e.g., "weekly roundup", "product update"): use that stream
- Topic provided: generate a topical issue
- No argument: ask which newsletter or stream to generate for

Load stream config from `creator-memory/channels.md` if it exists (cadence, audience segment, tone).

### Step 2: Source Content

Check for source material:
1. `creator-memory/content/` — recent published pieces to feature
2. Provided topic brief or links
3. If `~~knowledge base` connected: search for this week's most relevant content

Ask: "What should this issue cover? Share links, notes, or let me build from your recent content."

### Step 3: Generate the Issue

Apply content-creation skill with email/newsletter format rules:
- Subject line: under 50 chars, specific benefit or curiosity gap
- Preview text: 85-100 chars, extends subject
- Opening: hooks in first sentence
- Body: short paragraphs, one bold insight per section
- CTA: single primary action, secondary links below the fold

Apply the creator's voice from `CREATOR.md`.

Structure:
```
[Subject line options: 3 variations]

---
[Preview text]

[Opening hook]

[Section 1: Main content/story]
[Section 2: Resource or recommendation]
[Section 3: What's next / CTA]

[Signature]
[Unsubscribe footer placeholder]
```

### Step 4: Route to Approval

If `~~chat` connected: post draft to approval channel with:
- Subject line options
- Full draft
- Reply instructions ("React ✅ to approve, 💬 to suggest changes")

If not connected: display draft and ask: "Approve to send, or request changes?"

### Step 5: Send (on approval)

If `~~email marketing` connected: send via connected email platform.
If not: provide formatted copy ready for manual sending.

Log: date, subject line used, stream, send status in `creator-memory/content/newsletter-log.md`.
