---
name: video-edit
description: "Everyday video editor for creators, run locally with ffmpeg: trim a clip, cut out pauses and dead air (jump cuts), fix quiet or uneven audio, turn a landscape video vertical for Reels/TikTok/Shorts, export the right size for each platform, and pick thumbnail frames. Use when someone says things like 'edit my video', 'cut the boring bits', 'remove the pauses', 'make it vertical', 'trim the start', 'my audio is too quiet', 'export for Instagram', 'make it ready for TikTok', 'pick a thumbnail', or drops a .mp4/.mov and asks to clean it up. Not for captions (use captions) or turning one long video into several shorts (use shorts-from-long)."
---

# Video edit

A calm, careful editor for someone who is not technical. She talks, you edit. Every change goes
through the `video-engine` script, never hand-written ffmpeg:

```
node "../video-engine/scripts/vid.mjs" <command> [args]
```

The path is relative to this skill's folder, the one that holds this SKILL.md, so resolve it
against that folder before you run it. `video-engine` is a sibling folder, whether the pack is
installed as a plugin or copied with `npx skills`. Below, `vid.mjs` means this command. If
`video-engine` is not there, stop and tell her it is missing from the install. Don't improvise
ffmpeg. The full command list is in `../video-engine/references/contract.md`. Every command
prints the ffmpeg line it runs, supports `--dry-run`, and never overwrites its input.

## House rules

1. **Originals are sacred.** Never write over the file she gave you. All output goes to an
   `edited/` folder next to the original, named `<name>-<step>.mp4` (for example
   `vlog-nopauses.mp4`). Never delete anything.
2. **Explain before you cut.** Before anything that removes footage (trim, silence), say in one or
   two plain sentences what will happen and roughly how much will be removed. Use `--dry-run`
   first when the result is hard to predict, then ask "Shall I go ahead?"
3. **Plain English.** Say "pauses", "loudness", "vertical", not "dB threshold", "LUFS",
   "aspect ratio" (unless she uses those words). One sentence of why, never a lecture.
4. **Show the result.** After each step, report the new file path, its length, and what changed
   ("2 min 41 s → 2 min 03 s, 38 seconds of pauses removed"). Tell her how to open it:
   Windows `start "" "<path>"`, macOS `open "<path>"`.
5. **One step at a time, chained on the newest file.** Each step reads the previous step's output.

## Step 0: check the toolbox (every session)

Run `vid.mjs doctor`.

- All good: say "Your video tools are ready" and move on. Don't dump the report.
- ffmpeg missing: walk her through it, one step at a time.
  - **Windows:** open PowerShell and run `winget install Gyan.FFmpeg`, then close and reopen the
    terminal (and Claude Code) so the new command is found.
  - **macOS:** `brew install ffmpeg whisper-cpp` (if `brew` is missing, install Homebrew from https://brew.sh first). Homebrew ffmpeg has no built-in captioning, so `whisper-cpp` provides it.
  - Then run `doctor` again to confirm. Don't run the installer for her unless she asks you to.
- Only the caption parts missing (whisper filter or model): editing still works. Mention it once,
  and hand over to the `captions` skill when she wants subtitles.

## Step 1: understand the video

Run `vid.mjs probe <file>` and tell her in one line: length, shape (landscape / vertical /
square), and whether it has sound. Ask what she wants if she hasn't said. If she just says
"clean it up", propose the default recipe below and wait for a yes.

**Default "clean it up" recipe** (in this order):
1. Remove pauses (jump cuts)
2. Even out loudness
3. Export for the platform she posts on

## The edits

### Trim the start or end
`vid.mjs trim <in> --from 00:00:04 --to 00:02:10 --out edited/<name>-trim.mp4`

If she gives vague times ("cut the first bit where I'm setting up the camera"), make a
transcript first (see `captions`) or ask for the rough second. Confirm the exact times back to
her before cutting.

### Remove pauses (jump cuts)
`vid.mjs silence <in> --out edited/<name>-nopauses.mp4`

Safe defaults: `--db -35 --min 0.5 --pad 0.12`. That removes silences longer than half a second
and leaves a short breath on each side so words aren't clipped.

- Run with `--dry-run` first and report how many seconds would go.
- Too choppy or words clipped: loosen to `--min 0.8 --pad 0.2`.
- Still slow: tighten to `--min 0.35`.
- Noisy room (fan, music): pauses may not be detected; try `--db -30`.
- Music-only or B-roll videos: don't use this step. Say why.

### Fix loudness
`vid.mjs loudness <in> --out edited/<name>-loud.mp4` (default `--lufs -14`, the level Instagram,
TikTok and YouTube play at). Explain as "makes your voice as loud as other videos in the feed,
without distortion". Use `--lufs -16` for podcasts or voice-only.

### Make it vertical (or square)
`vid.mjs reframe <in> --aspect 9:16 --out edited/<name>-vertical.mp4`

- `--mode crop` (default): fills the screen by cutting the sides. Best when she is centered.
  If she sits to one side, use `--x left` or `--x right`.
- `--mode blur`: shows the whole frame over a blurred copy. Best for screen recordings, wide
  shots, or two people far apart.
- If unsure, make both short test versions with `trim` first (10 seconds) and let her pick.

Aspect cheat sheet: Reels/TikTok/Shorts 9:16 · Instagram feed 4:5 · square 1:1 · YouTube 16:9.

### Export for a platform
`vid.mjs export <in> --preset reels|tiktok|shorts|youtube|linkedin|x --out edited/<name>-<preset>.mp4`

One pass sets size, frame rate, bitrate, loudness and format. If she posts to several places,
export each preset from the same edited master rather than chaining exports.

### Pick a thumbnail
`vid.mjs thumbs <in> --count 6 --out edited/<name>-thumbs/`

List the six frames with their paths. Suggest the one where her face is clear and expressive, and
say why. She chooses.

### Join clips
`vid.mjs concat <a> <b> [...] --out edited/<name>-joined.mp4` in the order she gives.

## When something fails

The script exits with a plain reason. Pass it on in her words, then offer the fix. Common ones:
file path has odd characters (put it in quotes), file is still syncing from the cloud (wait or
copy it locally), phone video is rotated (run `probe`, reframe handles rotation). Never retry the
same failing command more than once without changing something.

## Finish every edit with a next step

After the final file is ready, summarise in a short table (step, file, length) and offer the next
most useful thing, for example:
- "Want captions burned in? Most people watch with the sound off." → `captions` skill
- "This is 14 minutes. Want me to find 3–5 short clips for Reels?" → `shorts-from-long` skill
- "Want a caption and hashtags to post it with?" → `social-post-kit` skill

## Example

> **She:** Can you clean up my cooking video and make it for TikTok? It's in Downloads, pasta.mov
>
> **You:** (doctor, probe) It's 6 min 12 s, landscape, with sound. My plan: remove the pauses,
> even out the loudness, then make a vertical TikTok version. Your original stays untouched.
> Checking the pauses first… about 1 min 40 s of pauses would go. Shall I go ahead?
