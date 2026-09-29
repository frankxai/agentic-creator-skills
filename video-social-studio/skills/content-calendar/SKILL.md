---
name: content-calendar
description: Plans a creator's week of social posts from 3-4 content pillars and one long video - which short clips to cut, which platform each goes to, and which day - as a repurposing table plus an optional CSV she can import into Buffer, Metricool or Later, and runs a 15-minute Friday review of what worked and what to repeat. Use when a creator says "plan my week", "content calendar", "what should I post this week", "how do I get more out of my YouTube video", "repurpose my long video", "posting schedule", "I never know what to post", "let's do my Friday review", or "what worked this week". Not for writing a single post's caption (social-post-kit) or cutting the clips (shorts-from-long).
---

# Content calendar

One long video in, a calm week of posts out, and a short Friday habit that makes next week better.

Talk to her like a friend who is organised: plain words, small steps, no guilt about missed days.
A plan she keeps at 3 posts a week beats one she abandons at 14.

## Part A. Plan the week

### Step 1. Load what we already know

- Read `creator-profile.md` in her working folder (created by `social-post-kit`). If it doesn't
  exist, ask the short profile questions from that skill first, or at least: what the channel is
  about, which platforms, her time zone.
- Read last week's `review-<date>.md` if there is one. Carry forward anything marked "repeat".

### Step 2. Set the pillars (first time only)

Pillars are the 3 or 4 recurring themes her channel is about. Every post belongs to one, which
keeps the feed recognisable and stops "what do I post?" panic.

Ask: "What are the 3 or 4 things you always come back to?" If she isn't sure, suggest four based
on her profile and past videos, e.g. for a home cook:

| Pillar | What it is | Example |
|---|---|---|
| Quick wins | Useful in under a minute | "The 10-second trick for peeling garlic" |
| Behind the scenes | Her real kitchen, real mistakes | "Tonight's dinner went wrong, here's the save" |
| Deep dive | The long YouTube video | "Full week of 20-minute dinners" |
| Community | Answering questions, reacting | "You asked: can I freeze this?" |

Save the pillars into her profile under a `## Pillars` heading so they're asked once.

### Step 3. Mine the long video for clips

Work from the long video's transcript (`vid.mjs transcript`, an SRT, or her notes). If the video
tools are installed and she wants the clips found for her, hand over to the `shorts-from-long`
skill and use its list. Otherwise pick them yourself:

- Find 4 to 7 moments that stand alone: a tip, a surprise, a strong opinion, a before/after, a
  funny mistake, a question people ask.
- For each, note start and end time, a working title, which pillar it fits, and roughly how long
  it runs (aim for 20-60 seconds; up to 3 minutes is allowed on Shorts).
- Skip moments that need earlier context to make sense.

### Step 4. Build the repurposing matrix

Match clips to platforms and days. Rules of thumb (numbers and limits come from
`../platform-specs/references/specs-2026-09.md`, never memory):

- **Long video goes first** (e.g. Monday on YouTube). The clips then point back to it.
- **One clip can go to several platforms.** Same file for Reels, TikTok, Shorts and Facebook;
  only the caption changes. That's the main time saving.
- **Spread the pillars** across the week so no two days feel the same.
- **Match the platform:** the most practical, "here's what I learned" clip suits LinkedIn;
  the funniest or most surprising suits TikTok; X gets the one with the sharpest single line.
- **Respect her capacity.** Ask how many posting days she can really manage. If she says three,
  plan three.
- **Leave one day empty** as a buffer. Life happens.

Output the week as a table:

| Day | Date | Time to test | Clip | Pillar | Platforms | Hook (first line) | Status |
|---|---|---|---|---|---|---|---|
| Mon | 2026-10-05 | 18:00 | Long video: "Full week of 20-min dinners" | Deep dive | YouTube | "Five dinners, one shop, no stress" | to film |
| Tue | 2026-10-06 | 19:00 | Clip 2: garlic trick (0:42) | Quick wins | Reels, TikTok, Shorts | "Stop peeling garlic like this" | to cut |

Posting times are guesses to test, in her time zone (see Step 6 of `social-post-kit`). Put one
different time in the week on purpose, so the Friday review has something to compare.

### Step 5. Offer the next steps

After the table, list what has to happen for each row, in order, e.g.:

1. Cut clips 1-4 (`shorts-from-long`, or `/video-social-studio:post-kit` once each clip is ready).
2. Write the posts for each clip (`social-post-kit`).
3. Schedule them, or import the CSV below.

### Step 6. Save the plan (and the CSV, if she wants it)

Write `week-<monday-date>.md` to her working folder with the pillars, clip list, matrix and next
steps.

Ask whether she uses a scheduler. If yes, also write `week-<monday-date>.csv`, one row per post
per platform, UTF-8, comma-separated, text in double quotes:

```csv
posting_time,platform,pillar,clip_file,hook,caption,hashtags,status
"2026-10-06 19:00","instagram","Quick wins","clip-02-garlic.mp4","Stop peeling garlic like this","","#garlic #cookinghacks #weeknightdinner","draft"
```

- `posting_time` uses `YYYY-MM-DD HH:mm`, 24-hour, which is the format Buffer's bulk upload asks
  for (https://support.buffer.com/article/926-how-to-upload-posts-in-bulk-to-buffer, read
  2026-09-29).
- Buffer imports one channel at a time: tell her to filter by `platform` and save one CSV per
  channel.
- Metricool wants its own template with fixed columns and TRUE/FALSE per network
  (https://help.metricool.com/en/article/how-to-schedule-posts-in-batch-with-a-csv-file-in-metricool-3wihqx/,
  read 2026-09-29). Tell her to download it from Metricool and paste our columns in; don't reorder
  theirs.
- Leave `caption` empty until `social-post-kit` has written it, then fill it in.
- Video files usually have to be attached in the scheduler itself. Say so, so she isn't surprised.

## Part B. The Friday 15-minute review

Run this when she says "Friday review", "what worked this week", or at the end of a planned week.
Keep it to 15 minutes. Timebox it out loud.

### Minute 0-5: collect

Ask her to open each app's analytics and read out, for each post: **views, average watch time or
% watched, saves, shares, comments, follows.** Accept whatever she has; half the numbers is fine.
Use only numbers she gives you. Never estimate or fill gaps.

Put them in a table:

| Post | Platform | Pillar | Time posted | Views | Watch % | Saves | Shares | Follows | Note |
|---|---|---|---|---|---|---|---|---|---|

### Minute 5-10: read

Look for patterns, and say how sure you are. One week is a small sample: call a pattern "a hint"
until it shows up two or three weeks running.

- Which post held attention best (watch %)? What was its first line?
- Which got saved or shared? That's the content people found useful enough to keep or pass on.
- Did the test time do better or worse than the usual one? One data point, so: "worth one more try"
  or "no difference yet".
- Which pillar did best, and which fell flat?

### Minute 10-15: decide

End with three short lists, and nothing else:

- **Repeat:** one or two things to do again next week (a hook style, a pillar, a time).
- **Drop or change:** one thing to stop or try differently.
- **Try:** one small new experiment.

Save it as `review-<friday-date>.md`, and add a one-line lesson to the "What I've learned" section
of `creator-profile.md`, so next week's plan and captions use it.

Close warmly and specifically: name one thing that went well, even in a quiet week. Then offer to
plan next week.

## Honesty rules

- No invented numbers, predictions, "average engagement rates" or promises of growth.
- Low numbers are information, not failure. Say what to change, never "you should post more".
- No growth hacks: no follow/unfollow, engagement pods, bought views, reposting other people's
  work, or trending audio she doesn't have rights to outside the app's own library.

## What this skill does not do

- Write each post's caption and hashtags (`social-post-kit`).
- Cut, reframe or caption the clips (`shorts-from-long`, `video-edit`, `captions`).
- Publish or schedule on her behalf.
- Long-form writing like newsletters or blog posts (content-engine).
