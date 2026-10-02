---
name: captions
description: "Adds subtitles to a video, privately on her own computer: transcribes the speech to an SRT file, reviews it with her to fix names and special words, then burns styled captions into the video (bold word-pop look, clean, or minimal) placed clear of the TikTok/Reels buttons. Use when someone says 'add captions', 'add subtitles', 'burn in subtitles', 'transcribe my video', 'make an SRT', 'I need text on screen', 'most people watch without sound', 'fix the typos in my subtitles', or wants captions in Dutch, German or another language. Not for trimming or reframing (use video-edit) or cutting a long video into shorts (use shorts-from-long)."
---

# Captions

Transcribe, review together, burn in. All on her machine: no upload, no subscription, no
watermark. Every step runs through the `video-engine` script:

```
node "../video-engine/scripts/vid.mjs" <command> [args]
```

The path is relative to this skill's folder, the one that holds this SKILL.md; resolve it against
that folder before you run it. `video-engine` is a sibling. Below, `vid.mjs` means this command.
If `video-engine` is missing, say so and stop. The full command list is in
`../video-engine/references/contract.md`.

## House rules

- The original video is never touched. Captioned output goes to `edited/<name>-captioned.mp4`;
  the SRT goes to `edited/<name>.srt`.
- Never burn captions she hasn't had the chance to review. Burned-in text can't be edited later
  without redoing the video.
- Ask before downloading anything.

## Step 1: check the tools

Run `vid.mjs doctor`. Captions need a speech recogniser plus a speech model. The recogniser is
either ffmpeg's built-in `whisper` filter (the Windows full build has it) or whisper.cpp
(`whisper-cli`), which `vid.mjs` uses automatically when the filter is missing. `doctor` says
which one it found.

- **No recogniser:** explain "your video tool works, but there's no speech recogniser yet".
  Install one, then run `doctor` again: Windows `winget upgrade Gyan.FFmpeg`; macOS
  `brew install whisper-cpp` (Homebrew's ffmpeg never includes the filter, so upgrading ffmpeg
  does not help); Linux: install whisper.cpp so `whisper-cli` is on PATH.
- **No model yet:** explain it plainly and ask:
  > "To turn speech into text on your own computer I need to download a speech model once. The
  > standard one is about 150 MB and is stored in `~/.cache/video-social-studio/`. Nothing about
  > your video leaves your computer. OK to download it?"

  Only after a yes, add `--download-model` to the next `captions` command. Model choice:
  `base` (~150 MB, default, good for clear speech), `small` (larger, better with accents, music
  or noise, slower), `tiny` (fastest, rough; only for quick drafts).

## Step 2: transcribe

```
vid.mjs captions <in> --out edited/<name>.srt --lang auto   # uses the best model already downloaded; captions come out tidied to 1-2 short lines
```

Use `--lang en|nl|de|...` when she tells you the language; it is faster and more accurate than
`auto`. Tell her roughly how long it will take (about real time or faster on a laptop for `base`)
so she isn't left wondering.

If the video is already edited (pauses removed), caption the edited file, not the original, so the
timings match.

## Step 3: review with her (the step competitors skip)

Read the SRT. Then show her a short, readable version, not the raw file. Run
`vid.mjs transcript edited/<name>.srt` and present it.

Scan it yourself first and list likely mistakes in one place:
- names of people, brands, places, products (speech models guess these badly)
- her own recurring terms, handles, hashtags
- numbers, prices, dates
- words that don't fit the sentence

Ask: "I spotted these that may be wrong: … Anything else to fix? Any words to spell a special
way?" Apply fixes with Edit directly in the SRT, keeping the numbering and timestamp lines exactly
as they are. Change text lines only.

Also tidy for reading on a phone:
- at most ~32 characters per line and 2 lines per caption; split long captions at a natural
  pause
- remove filler words ("um", "uh") from the text unless she wants them kept
- keep her voice and slang; don't correct grammar she chose

If she has words she always uses, offer to remember them: write them to
`edited/caption-words.txt` (one per line) and read that file at the start of future sessions.

## Step 4: pick a style and burn in

Show the three looks in one line each and recommend one:

| Style | Looks like | Best for |
|---|---|---|
| `bold` | big, heavy, high-contrast words | Reels, TikTok, Shorts talking-head |
| `clean` | medium white text with a soft box | tutorials, LinkedIn, YouTube |
| `minimal` | small, understated | aesthetic, calm, or text-heavy visuals |

Position: `bottom` (default) sits above the app's caption and buttons area; `middle` for
vertical videos where the lower third is busy.

Preview first: make a 10-second sample (`vid.mjs trim` then `burn` on the sample) and tell her
where it is. Only after she likes it:

```
vid.mjs burn <in> --srt edited/<name>.srt --out edited/<name>-captioned.mp4 --style bold --position bottom
```

## Step 5: hand back

Report: the SRT path (she can upload it separately to YouTube as editable subtitles), the
captioned video path, and its length. Then offer the next step:
- "Want me to export this for Reels / TikTok / YouTube?" → `video-edit`
- "Want a post caption and hashtags to go with it?" → `social-post-kit`

## Troubleshooting

- **Captions drift out of sync:** the SRT was made from a different cut. Re-run Step 2 on the
  exact file you burn onto.
- **Gibberish or wrong language:** set `--lang` explicitly; try `--model small`.
- **Music drowns the voice:** try `--model small`; warn that songs with lyrics get transcribed too.
- **Text cut off at the edges:** use `--style clean` or shorten caption lines.
