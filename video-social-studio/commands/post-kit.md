---
description: Turn a finished clip, SRT or transcript into ready-to-paste posts for every platform she uses
argument-hint: "<clip file, .srt file, or transcript>"
---

# /post-kit

Use the `social-post-kit` skill on: $ARGUMENTS

If no file was given, look in the current folder for the newest `.srt`, `.vtt` or video file and
ask whether that's the clip. Follow the skill's steps in order: creator profile, transcript, hook,
platform rules from `platform-specs`, one package per platform, then save
`post-kit-<clip-name>.md` and suggest one next step.
