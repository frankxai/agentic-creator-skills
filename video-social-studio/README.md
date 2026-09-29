# Video Social Studio

Your own video editor and social media manager, inside Claude. Tell it what you want in plain
words ("cut the pauses", "add captions", "make three shorts from this", "write the Instagram
post") and it does the work on your computer. Your videos never leave your machine.

## What it does

| You say | It does |
|---|---|
| "Clean up this video" | Removes long pauses (jump cuts), evens out the volume, keeps your original safe |
| "Add captions" | Transcribes your speech locally, lets you fix names, burns in bold readable captions |
| "Make it vertical for Reels" | Reframes to 9:16 and exports at the right size and loudness for Reels, TikTok, Shorts, LinkedIn or X |
| "Turn this into shorts" | Finds the strongest 15–60 second moments, asks which you like, then cuts, captions and exports each one |
| "Write the posts" | Hook, caption, hashtags, alt text and a posting checklist for each platform, in your voice |
| "Plan my week" | A simple content calendar from one long video, plus a 15-minute Friday review |

## Set up once (10 minutes)

1. **Install ffmpeg**, the free video engine it uses.
   - Windows: open Terminal and run `winget install Gyan.FFmpeg`
   - Mac: install [Homebrew](https://brew.sh), then run `brew install ffmpeg`
2. **Add the plugin in Claude Code:**
   ```
   /plugin marketplace add frankxai/agentic-creator-skills
   /plugin install video-social-studio@agentic-creator-skills
   ```
3. **Say hi:** open a folder with your videos and type `/edit-video`. The first thing it does is
   check your setup and tell you, in plain words, if anything is missing.

The first time you ask for captions it offers to download a speech model once (about 150 MB).

## Commands

- `/edit-video` for everyday edits
- `/make-shorts` to turn one long video into several shorts
- `/post-kit` for per-platform post copy
- `/plan-week` for the week's content plan

You can also just describe what you want; you don't need the commands.

## Good to know

- Every edit is saved as a new file in an `edited/` folder. Your original is never changed.
- Reframing is a centered crop or a blurred-background fit. It does not track your face yet, so
  keep yourself near the middle of the frame when filming for vertical.
- It never promises reach or invents numbers. Posting times are suggestions to test, not rules.

Part of [Agentic Creator Skills](https://github.com/frankxai/agentic-creator-skills) by GenCreator.
