---
name: social-post-kit
description: Turns a finished video clip, or its SRT captions or transcript, into ready-to-paste post packages for Instagram Reels, TikTok, YouTube Shorts, LinkedIn, X and Facebook - hook line, caption, call to action, a few relevant hashtags, alt text, on-screen title, a posting-time idea to test, and an upload checklist - in the creator's own voice. Use when a creator says "write the caption for this reel", "help me post this video", "what should I write for TikTok", "make posts for all my platforms", "hashtags for this clip", "give me a hook line", "write alt text for my video", "on-screen title for my short", "I finished my video, now what", "turn this transcript into posts", or uploads an .srt/.mp4 and asks how to share it. Saves her niche and voice once in creator-profile.md. Not for editing, cutting or captioning the video itself.
---

# Social post kit

From one finished clip to six posts she can copy, paste and publish, sounding like her.

Who this is for: a creator who is great on camera and doesn't want to think about caption lengths,
hashtag rules or which text gets covered by the like button. Talk to her plainly. No jargon, no
"algorithm hacks", no promises about views.

## Step 1. Find or create her creator profile (once)

Look in her working folder for `creator-profile.md`.

- **Found:** read it and go to Step 2. Mention one line of it back so she knows it was used
  ("Writing this for busy parents who want 20-minute dinners, in your warm, no-fuss voice").
- **Not found, but content-engine is installed:** look for `CREATOR.md` or
  `creator-memory/voice.md`. If one exists, use its voice section and only ask the questions it
  doesn't answer (usually platforms and hashtag topics). Content-engine owns long-form voice; don't
  duplicate it, point to it from the profile.
- **Nothing found:** ask these in **one** message, and tell her she only answers them once:

  1. What is your channel about, in one sentence?
  2. Who is it for? (one kind of person, e.g. "new runners over 40")
  3. Three words for how you sound. (e.g. "warm, funny, direct")
  4. A phrase you say a lot, and a word or style you never want to see in your posts.
  5. Which platforms do you post on, and your handles?
  6. What should people do after watching? (follow, visit a link, buy, book, comment)
  7. Your time zone.

Save her answers with the template at the end of this file. Write it to the folder she is working
in, show her the file in a few lines, and tell her she can edit it any time.

## Step 2. Get the words from the clip

The post must come from what she actually says, so get the transcript first.

| She gives you | Do this |
|---|---|
| An `.srt` or `.vtt` file | Read it. If the video tools are installed, `node ${CLAUDE_PLUGIN_ROOT}/scripts/vid.mjs transcript <file.srt>` gives clean text with timestamps |
| A transcript or notes | Use them as they are |
| Only a video file | Offer to make captions first with the `captions` skill, then come back. If she'd rather not, ask her for two sentences on what the clip is about and say the post will be less specific |
| A long video, not a clip | This kit is for one finished clip. Suggest `shorts-from-long` to pick clips first, or `content-calendar` to plan the week |

Also note the clip's length and aspect ratio (from `vid.mjs probe`, or ask). You need them for the
checklist.

## Step 3. Pick the hook from her own words

Read the transcript and pull out 3 candidate hook lines. A good hook:

- is a sentence (or half-sentence) she really said in the first 30 seconds or the strongest moment;
- makes a specific promise, surprise, or tension ("I stopped salting pasta water and nobody noticed");
- is under about 80 characters, so it fits before TikTok's "more";
- would still make sense to someone who hasn't watched yet.

Pick the strongest and say why in one line. Keep the other two as options in the output.

## Step 4. Check the platform rules

Open `../platform-specs/references/specs-2026-09.md` and use its numbers for caption length,
the part shown before "more", title length, and hashtag caps. Don't use numbers from memory.
If the reference's read date is older than 90 days, tell her the limits may have moved.

## Step 5. Write one package per platform

Only for the platforms in her profile. Each package has these nine parts:

1. **Hook line** - the first line of the caption. It must work alone, because it is often all
   people see.
2. **Caption** - in her voice, using her phrases, never her banned words. Match the platform:
   - Instagram Reels: 1-3 short paragraphs, hook in the first ~125 characters.
   - TikTok: short. One or two lines; the video does the talking. Hook in the first ~80 characters.
   - YouTube Shorts: a **title** (under 100 characters, the searchable part up front, no hashtags
     in it) plus a 1-2 line description.
   - LinkedIn: what she learned or what the viewer can use, in plain first person, the point inside
     the first ~140 characters. No "I'm humbled to share".
   - X: one complete thought, under 280 characters including hashtags, unless her profile says she
     has Premium.
   - Facebook: conversational, 1-2 short paragraphs, a question people can answer.
3. **Call to action** - one, taken from her profile goal. Specific ("Save this for Sunday's shop"),
   never bait ("Comment YES if you agree!!!").
4. **Hashtags** - 3 to 5, specific to the topic and her niche, never more than 5 on any platform.
   Mix one or two broader topic tags with narrower ones. No `#fyp`, `#viral` or `#explore`: they
   describe nothing. Zero is fine on X and LinkedIn when the topic is clear from the words.
5. **Alt text** - one or two sentences describing what is on screen in the cover frame and what
   happens, for people using screen readers. Describe, don't sell. Instagram, X, LinkedIn and
   Facebook have an alt text field; for TikTok and Shorts, say the captions do this job.
6. **On-screen title** - 3 to 7 words to burn onto the first 2 seconds or use as the cover text.
   Tell her to keep it inside the safe box in the platform-specs reference (upper-middle of the
   frame), so the app's buttons and caption don't cover it.
7. **Posting time to test** - see Step 6.
8. **Checklist** - see Step 7.
9. **Why this version** - one line on the choice you made, so she can overrule it quickly.

## Step 6. Posting time: a guess to test, not a rule

Big studies disagree (Later's data says Reels at midnight Monday; Metricool's says Instagram
6-9 AM), and her audience is not an average. So:

- If she has her own numbers (Instagram Insights, TikTok Analytics, YouTube Studio "when your
  viewers are on"), use those first and say so.
- If not, suggest one time slot per platform in **her** time zone and write it as a test:
  "Try Tuesday 7 PM. Next week try Thursday 12 PM with a similar clip. Compare in Friday's review."
- Never say a time "gets more views". Say "worth testing".

## Step 7. The upload checklist

For each platform, a short tick list using the reference numbers:

- [ ] Length is inside the limit (Shorts: 3:00 or under, or it becomes a normal video)
- [ ] Aspect ratio is right (9:16 for Reels, TikTok, Shorts, Facebook)
- [ ] File type accepted (LinkedIn: MP4, not MOV)
- [ ] On-screen text sits in the safe box, not the bottom third or the right edge
- [ ] Caption hook is inside the "before more" length
- [ ] Hashtags counted: 5 or fewer
- [ ] Music: original audio, or a track she has the rights to, or one added inside the app
- [ ] Alt text pasted where the platform offers it
- [ ] Cover frame chosen (a clear face or the on-screen title, not a blink)

## Step 8. Deliver it

Write the kit to her working folder as `post-kit-<clip-name>.md`, one section per platform, each
caption in a plain block she can copy in one go. Put the three hook options and the posting-time
tests at the top.

Then, in chat, give her a three-line summary and one next step, for example:
"Six posts ready in post-kit-pasta-water.md. The TikTok one is the shortest; start there.
Want me to add this clip to your week plan?"

## Honesty rules (always)

- Never invent numbers: no reach estimates, view predictions, virality scores, engagement rates or
  "posts like this get 3x more". If she asks for a prediction, say nobody can know that in advance,
  and offer the Friday review in `content-calendar` to learn from her own results.
- No fake urgency, clickbait that the video doesn't deliver, or engagement bait.
- Don't put words in her mouth that change what she said in the video.
- If a caption would make a health, money or legal claim, keep it to what she said and flag it.
- If a rule might have changed, say so. Being wrong about an upload limit costs her a failed post.

## What this skill does not do

- Edit, trim, reframe or caption the video (`video-edit`, `captions`, `shorts-from-long`).
- Plan a whole week of posts (`content-calendar`).
- Write blog posts, newsletters or long scripts (content-engine's `content-creation`).
- Publish or schedule. She posts, or imports the calendar CSV into her scheduler.

## creator-profile.md template

```markdown
# Creator profile
Updated: <date>

## About
- Channel in one sentence:
- Made for:
- What viewers should do next (main CTA):
- Link to send people to:

## Voice
- Three words:
- Phrases I use:
- Never write: (words, emoji habits, styles)
- Long-form voice file: <path to content-engine CREATOR.md, if any>

## Platforms
| Platform | Handle | Posting now? | Notes (e.g. X Premium) |
|---|---|---|---|

## Hashtag pool
- Broad topic tags (1-2 per post):
- Niche tags (2-3 per post):

## Time zone
-

## What I've learned (added by the Friday review)
-
```

Research behind these choices, and how this compares to Buffer, Later, Metricool and Opus Clip:
[references/research.md](references/research.md).
