---
name: platform-specs
description: Current, sourced upload rules for Instagram Reels, TikTok, YouTube Shorts, LinkedIn video, X video and Facebook Reels - aspect ratio, resolution, max length, file size, caption and title limits, hashtag caps, and safe zones for on-screen text. Use when a creator asks "what size should my reel be", "how long can a Short be", "how many hashtags on Instagram", "will my text get covered by the buttons", "why did LinkedIn reject my video", "what export settings for TikTok", or when another skill (social-post-kit, content-calendar, video export) needs a platform number. Every number lives in references/ with a link and read date; this skill never answers from memory.
---

# Platform specs

The single place in this plugin where platform numbers live. Other skills and the `vid.mjs export`
presets read from here, so a platform change is fixed once.

## The rule

**Never state a platform number from memory.** Open
[references/specs-2026-09.md](references/specs-2026-09.md), find the row, and give the number with
its tag. Platforms change limits several times a year, and third-party blogs copy each other's
mistakes (several say YouTube ignores hashtags past 15; YouTube's own page says 60).

## How to answer a spec question

1. Open the reference file and find the platform and the field.
2. Check the read date at the top. If it is more than 90 days before today, say so, and offer to
   re-check the official page with WebFetch before she relies on it.
3. Answer in one or two plain sentences, then give the practical version. Example:
   "YouTube counts anything square or vertical up to 3 minutes as a Short. Keep yours under
   2:50 so a slow export can't tip it over."
4. Say how sure the number is, in her words:
   - [OFFICIAL] → "YouTube's own help page says..."
   - [TRADE] → "Most scheduling tools agree on..."
   - [UNVERIFIED] → "This one moves around. Treat it as a rough guide and check in the app."
5. If she needs the source, give the URL from the row.

## The short version (for when she just wants to film)

Point to the reference for the numbers, but this is the advice that rarely changes:

- **Film vertical, 9:16.** One 1080 x 1920 file works on Reels, TikTok, Shorts and Facebook, and
  LinkedIn and X accept it too.
- **Keep text in the upper middle of the frame.** The bottom third is where every app puts the
  caption, the handle and the music label; the right edge has the like and share buttons. The
  reference gives one safe box that works everywhere.
- **Shorts must stay at 3 minutes or under**, or YouTube files it as a normal video.
- **LinkedIn wants an MP4.** It no longer takes MOV files straight off an iPhone.
- **Five hashtags maximum** everywhere. Instagram enforces it; the others don't reward more.

## Checking a finished file against a platform

When she has an exported clip and asks "is this OK for TikTok?":

1. If the video tools in this plugin are available, run
   `node "../video-engine/scripts/vid.mjs" probe <file>` (the path is relative to this skill's folder; if `video-engine` is not a sibling there, ask her for the length and size instead) to get duration, size and aspect.
2. Compare each value to the platform's row. Report only what fails or is close, for example:
   "Length is fine. It's 4:5, not 9:16, so TikTok will add bars top and bottom."
3. For a fix, hand over to the video skills (`vid.mjs reframe` or `vid.mjs export --preset`).
   Editing the video is not this skill's job.

## Updating the reference

When a number is found to be wrong or stale:

1. Fetch the platform's official help page first (URLs are in the table). Use a trade guide only
   if the official page is unreachable, and tag the row [TRADE].
2. Save a new dated file (`specs-YYYY-MM.md`), update every changed row with its URL and read date,
   and point the link at the top of this skill to the new file.
3. If an export preset number changed (section 6), tell her the `vid.mjs` preset needs the same
   change. Don't edit the script from here.

## What this skill does not do

- Write captions or hashtags: that is `social-post-kit`.
- Plan the week: that is `content-calendar`.
- Cut, crop or caption video: that is the video skills (`video-edit`, `captions`,
  `shorts-from-long`).
- Promise that any length, time or hashtag count "gets more reach". The reference records what
  platforms allow; it does not predict what the algorithm rewards.
