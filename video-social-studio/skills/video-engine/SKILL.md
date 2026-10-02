---
name: video-engine
description: "The local ffmpeg toolbox the other video skills run on: probe a file, trim, cut pauses, even out loudness, reframe to vertical, transcribe to SRT, burn in captions, export for each platform, pick thumbnails, join clips. Use when another video skill needs to run a command, when someone asks whether their video tools are installed or how to install ffmpeg or the caption model, or when a vid.mjs command fails. Not an editor on its own: for what to cut use video-edit, for subtitles use captions, for long video into shorts use shorts-from-long."
---

# Video engine

One script does every video operation in this pack, so no skill ever hand-writes ffmpeg. It runs
on the creator's computer and uploads nothing.

## Run it

```
node "scripts/vid.mjs" <command> [args]
```

The path is relative to this skill's folder, the one that holds this SKILL.md; resolve it against
that folder before you run it. The other video skills reach the same script as
`../video-engine/scripts/vid.mjs`, so `video-engine` has to stay next to them, as a plugin and as
copied skills. Commands and options are
in `references/contract.md`. Run `vid.mjs` with no arguments to see the command list; don't invent
flags that aren't there.

Every command prints the exact ffmpeg line it runs, accepts `--dry-run`, never overwrites its
input, and exits non-zero with a plain reason.

## Check the toolbox first

`vid.mjs doctor` reports ffmpeg, ffprobe, whether captions and loudness work, and where the
caption model is cached. When something is missing it names the install line for this system:

| System | ffmpeg | Captions |
|---|---|---|
| Windows | `winget install Gyan.FFmpeg`, then reopen the terminal | the same full build includes the whisper filter |
| macOS | `brew install ffmpeg` | `brew install whisper-cpp` |
| Linux | `sudo apt install ffmpeg` | whisper.cpp with `whisper-cli` on PATH |

Offer these; don't run an installer unasked.

## What leaves the machine

Nothing, with one exception: the caption model. It is downloaded once, from huggingface.co, only
after the creator agrees and you pass `--download-model` (tiny about 75 MB, base about 142 MB,
small about 466 MB). Say the size before you ask.

## When a command fails

Pass the plain reason on in the creator's words, change the one thing that caused it, and retry
once. Common causes: a path with odd characters (quote it), a file still syncing from the cloud
(copy it locally), a phone video that is rotated (`probe` shows it, `reframe` handles it).
