# Short-form clipping tools: what they do well, where this plugin differs

Researched 2026-09-29. Bar to clear: Opus Clip for picking clips, Submagic for captions,
Descript for pause removal.

## What the leaders do well

| Tool | Strength worth copying | How we match it |
|---|---|---|
| **Opus Clip** | Scores every clip 0–99 on hook strength, pacing and topic shifts, so the creator reviews the best first. Checks whether the opening grabs attention and relates to the main topic. ReframeAnything tracks the speaker for a stable 9:16 crop. | The four-part rubric (hook in 2 s, one idea, payoff, stands alone) with a hard floor on hook score, shown as a table she approves. |
| **Submagic** | Word-level animated captions in 48+ languages; remove silences and filler words; AI hook titles. Pro is $39/month (or $23/month billed yearly) and capped at 40 videos, max 3 minutes each. Magic Clips is a paid add-on capped at 10 long videos a month. | `captions` skill: transcribe, review names with her, burn `bold` / `clean` / `minimal` styles. No per-video caps. |
| **Descript** | "Shorten word gaps" trims pauses to a target length, and "avoid harsh cuts" skips removals that would clip words. | `vid.mjs silence` with `--pad` breathing room and a dry-run preview of seconds removed before cutting. |
| **CapCut** | AutoCut detects highlights from long uploads (up to 3 h / 10 GB), auto captions, smart 9:16 reframe with subject focus, per-platform formatting. | Same pipeline, local: transcript → pick → trim → reframe → captions → `export --preset`. |

## Where we win

- **Local and private.** The video never leaves her computer. Nothing to upload, no account.
- **Free to run.** No monthly plan, no per-video or per-minute limits, no watermark.
- **Her agent, her say.** She approves the shortlist before rendering and can move any start or
  end point by talking. Cloud tools hand back a batch and a score.
- **Her voice.** Titles and hook text come from her own words in the clip, and caption fixes
  (names, terms) are remembered across sessions.
- **Honest.** No "viral score" dressed up as prediction; the rubric says why a clip made the cut.

## Where they still win (be honest with her)

- **Speaker tracking.** Opus Clip and CapCut follow a moving face. `reframe` is a fixed crop
  (`--x left|center|right`) or a blurred fit. For a two-person podcast with both on screen, use
  `--mode blur` or pick clips where one person talks.
- **Animated word-by-word captions and B-roll.** Submagic's emoji/zoom styles and stock B-roll
  are richer than our three static styles.
- **Speed on huge files.** Cloud GPUs transcribe a 2-hour stream faster than a laptop.

## Sources

1. OpusClip Help, "What is the Virality Score on OpusClip?" https://help.opus.pro/docs/article/virality-score
2. Submagic pricing page, https://www.submagic.co/pricing (plan limits cross-checked with
   https://fluxnote.io/guides/submagic-pricing-2026)
3. Descript Help, "Shorten word gaps", https://help.descript.com/script-editing/shorten-word-gaps
4. CapCut resource, "Top Long Video to Shorts Converters in 2026",
   https://www.capcut.com/resource/top-7-long-video-to-shorts-converters, and
   "The Ultimate Guide to CapCut AutoCut (2026)", https://www.miracamp.com/learn/capcut/the-ultimate-guide-to-autocut
