---
name: shorts-from-long
description: "Turns one long video (podcast, vlog, livestream, talk, interview, YouTube video) into 3 to 5 ready-to-post vertical shorts: transcribes it, finds the moments with a strong hook, scores them, then trims, makes them 9:16, adds captions and levels the sound, and hands back a table of clips with suggested titles and on-screen hook text. Runs locally and privately, no upload. Use when someone says 'make shorts from this', 'find the best clips', 'turn my podcast into Reels', 'cut this into TikToks', 'repurpose my YouTube video', 'find viral moments', 'clip my livestream', or 'what parts of this would do well on Shorts'. Not for editing one video end to end (use video-edit) or only adding subtitles (use captions)."
---

# Shorts from a long video

Opus Clip, Submagic Magic Clips and CapCut AutoCut do this in the cloud for a monthly fee. This
does it on her computer, in her words, with her say over every clip. See
[references/research.md](references/research.md) for what they do well and where we differ.

All video work goes through the `video-engine` script:

```
node "<skills-folder>/video-engine/scripts/vid.mjs" <command> [args]
```

`<skills-folder>` is the folder this skill sits in; `video-engine` is its sibling. Below,
`vid.mjs` means this command. If `video-engine` is missing, say so and stop. The command list is
in `<skills-folder>/video-engine/references/contract.md`.

## House rules

- The long original is never touched. Everything goes in `shorts/<name>/` next to it.
- She approves the clip list **before** any rendering. Rendering five clips takes time; picking
  the wrong five wastes it.
- Honest scoring. Never promise a clip "will go viral". Say "strongest hook", "most complete".

## Step 1: tools and transcript

1. `vid.mjs doctor`. If ffmpeg or captions are missing, follow the setup steps in the
   `video-edit` and `captions` skills (ask before `--download-model`, ~150 MB for `base`).
2. `vid.mjs probe <in>` and tell her the length and shape.
3. Transcribe the whole video once:
   `vid.mjs captions <in> --out shorts/<name>/full.srt --lang <lang or auto>`
   Tell her how long it may take. For videos over an hour, suggest she grab a coffee.
4. `vid.mjs transcript shorts/<name>/full.srt` to get timestamped text you can read.

Ask one quick question while it runs (skip if she already said): "Who are these shorts for, and
is there a topic you most want to push?" Her answer beats any generic virality guess.

## Step 2: find candidate moments

Read the full transcript. List 8 to 12 candidate moments, each 15 to 60 seconds, that could stand
alone. Look for:

- a bold claim, surprising fact, or strong opinion
- a question she answers crisply
- a short story with a turn ("and then…", "what I didn't expect…")
- a list or how-to ("three things…", "the one mistake…")
- an emotional peak: laughter, frustration, a confession
- a quotable one-liner

Each clip must **start on the hook**, not on the setup. If the best line comes 8 seconds in, start
the clip there. Snap start and end to sentence boundaries using the SRT timestamps, then add
0.2 s of breathing room at each end.

## Step 3: score with the rubric

Score each candidate 0–5 on four things. Total out of 20.

| Criterion | 5 means | 0 means |
|---|---|---|
| **Hook in the first 2 seconds** | first sentence makes you need the next one | starts with "so, um, yeah" or context |
| **One idea** | a single clear point | wanders across topics |
| **Payoff** | ends on the answer, punchline or lesson | trails off or stops mid-thought |
| **Stands alone** | a stranger gets it with no context | needs "as I said earlier" |

Drop anything with a Hook score under 3, no matter the total. Prefer variety (not five clips
about the same point). Keep 3 to 5.

Present the shortlist as a table and wait for her pick:

| # | Time | Length | Score | Hook (first line, verbatim) | Why it works |
|---|---|---|---|---|---|

Then ask: "Which of these should I make? Want to change any start or end point?"

## Step 4: render each approved clip

For clip N (keep numbering from the table), chain on the previous output:

1. **Cut:** `vid.mjs trim <in> --from <start> --to <end> --snap shorts/<name>/full.srt --out shorts/<name>/clipN-1-cut.mp4` (`--snap` moves the cut to the nearest sentence start and end, so a clip never starts mid-word)
2. **Tighten (optional):** for talking-head clips,
   `vid.mjs silence shorts/<name>/clipN-1-cut.mp4 --out shorts/<name>/clipN-2-tight.mp4 --min 0.4 --pad 0.1`.
   Skip for music or action footage.
3. **Vertical:** `vid.mjs reframe <prev> --aspect 9:16 --out shorts/<name>/clipN-3-vertical.mp4`
   Default `--mode crop` for one person on camera (use `--x left|right` if she's off-centre);
   `--mode blur` for two people far apart, slides or screen recordings. Check the first clip with
   her before doing the rest the same way.
4. **Captions:** re-transcribe the final cut so timings match, not the long SRT:
   `vid.mjs captions <prev> --out shorts/<name>/clipN.srt --lang <lang>`. Fix names using what she
   corrected earlier (and `edited/caption-words.txt` if it exists), then
   `vid.mjs burn <prev> --srt shorts/<name>/clipN.srt --out shorts/<name>/clipN-4-captioned.mp4 --style bold`.
5. **Export:** `vid.mjs export <prev> --preset reels|tiktok|shorts --out shorts/<name>/clipN-final.mp4`
   (the preset also normalises loudness, so no separate loudness step is needed).

Render clip 1 fully, show it, and get a thumbs up before batching the rest. Report progress per
clip ("clip 2 of 4 done").

## Step 5: hand over

Give her one table:

| # | File | Length | Suggested title | On-screen hook text (≤ 7 words) | Post caption angle |
|---|---|---|---|---|---|

Writing rules for titles and hook text:
- use her words from the clip, not marketing language
- the hook text says what the viewer gets or why they should stay ("The mistake I made for 3 years")
- no clickbait she can't back up; no invented numbers

Then offer:
- "Want post captions and hashtags for each clip?" → hand the table to `social-post-kit` (pass
  file, hook text, the clip's transcript and the platform)
- "Want a thumbnail frame per clip?" → `vid.mjs thumbs <clip> --count 4 --out shorts/<name>/thumbsN/`
- Tidy up: offer to delete the in-between files (`-1-cut`, `-2-tight`, `-3-vertical`,
  `-4-captioned`) and keep only `-final.mp4` and `.srt`. Delete only after she says yes, and never
  the original.

## Edge cases

- **Video under 2 minutes:** suggest `video-edit` instead; one short is the whole video.
- **No speech (music, B-roll, gaming without voice):** transcript-based picking won't work. Say so,
  and offer `vid.mjs thumbs --count 12` to eyeball scenes and pick times together.
- **Two languages:** transcribe with `--lang auto`, and check the hook lines by hand.
- **Guest on camera:** mention that sharing clips of other people is her call to clear with them.
