---
description: Audit brand voice documentation, check consistency, or initialize voice from scratch
argument-hint: "<'audit', 'init', or paste content to check against voice>"
---

# /brand-voice-check

> See [CONNECTORS.md](../CONNECTORS.md) for knowledge base integration.

## Workflow

### Detect Mode from Argument

- **`audit`**: Review existing voice documentation for completeness and consistency
- **`init`**: Start voice documentation from scratch (prompts for samples, derives attributes)
- **Content pasted**: Check specific content against the voice standards
- **No argument**: Ask what to do

---

## Mode: Audit

Check existing voice documentation for completeness:

1. Read `CREATOR.md` voice section + `creator-memory/voice.md`
2. Check each of the 5 components: voice attributes, audience definition, content pillars, tone adaptation, terminology
3. For each: rate complete / partial / missing
4. Report gaps and suggest what to add

Output:
```
Voice Documentation Audit
═════════════════════════

Voice Attributes     [complete / partial / missing]
Audience Definition  [complete / partial / missing]
Content Pillars      [complete / partial / missing]
Tone Adaptation      [complete / partial / missing]
Terminology Rules    [complete / partial / missing]

Gaps:
• [Missing item + what to add]

Recommendation: [What to prioritize]
```

---

## Mode: Init

Initialize voice documentation from writing samples:

1. Ask: "Paste 2-3 examples of your best content — things that sound exactly like you."
2. Analyze samples using voice derivation method (see brand-voice skill)
3. Extract: sentence patterns, opening style, formality level, signature phrases, what's never included
4. Present derived attributes for confirmation
5. Generate `creator-memory/voice.md` using full template
6. Update `CREATOR.md` with condensed voice section

---

## Mode: Content Check

Check pasted content against voice standards:

1. Load voice from CREATOR.md
2. Check for red flags:
   - Opener starts with "I"
   - More than one "!"
   - Generic superlatives ("amazing", "incredible", "awesome")
   - Stock openers ("In today's fast-paced world...")
   - Passive voice where active works
   - Hedging language
   - Flagged terminology
3. Check voice attribute alignment (does it sound like the creator?)
4. Report: flagged passages + reason + suggested rewrite

See `references/voice-frameworks.md` for the complete voice attribute definition system and drift detection guide.
