---
description: Edit a video in plain English (cut pauses, fix sound, make it vertical, captions, export for a platform)
argument-hint: "[video file] [what you want, e.g. 'cut the pauses and make it for TikTok']"
---

Use the `video-edit` skill to edit this video: $ARGUMENTS

If no file was given, ask which video (a path, or drag it into the terminal). If no goal was
given, propose the default clean-up recipe from the skill and wait for a yes. Keep the original
untouched and hand off to the `captions` skill if she asks for subtitles.
