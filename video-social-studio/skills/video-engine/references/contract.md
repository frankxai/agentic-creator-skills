# vid.mjs command contract

Every skill in this pack drives video through one deterministic script:
`node "../video-engine/scripts/vid.mjs" <command> [args]`, with the path relative to the calling
skill's folder (from inside `video-engine` it is `scripts/vid.mjs`). The video skills sit side by
side, in `${CLAUDE_PLUGIN_ROOT}/skills` when installed as a plugin. Requires ffmpeg on PATH
(captions need ffmpeg 8+ with the `whisper` filter, or whisper.cpp `whisper-cli` on PATH as the automatic fallback). Every command prints the exact ffmpeg
command it runs, accepts `--dry-run`, never overwrites its input, and exits non-zero with a
plain-language reason on failure.

| Command | Purpose |
|---|---|
| `doctor` | Checks ffmpeg/ffprobe, version, the `whisper`, `subtitles` and `loudnorm` filters, and the caption model; prints the install line for this OS. |
| `probe <in>` | JSON: duration, width, height, fps, codecs, has audio, rotation. |
| `trim <in> --from 00:01:02 --to 00:01:40 --out <file> [--snap <file.srt>]` | Frame-accurate cut. `--snap` moves the cut to the nearest sentence start and end. |
| `silence <in> --out <file> [--db -35] [--min 0.5] [--pad 0.12]` | Jump cuts: removes pauses longer than `--min` seconds. Prints seconds removed. |
| `reframe <in> --aspect 9:16\|1:1\|4:5\|16:9 --out <file> [--mode crop\|blur] [--x center\|left\|right]` | Changes aspect ratio: center crop, or fit onto a blurred background. |
| `captions <in> --out <file.srt> [--model base\|small\|tiny] [--lang auto\|en\|nl\|de...] [--max-len 42] [--download-model]` | Transcribes to SRT with ffmpeg's whisper filter or, when that is missing, whisper.cpp; 1–2 lines per cue. The model is cached under `~/.cache/video-social-studio/`. |
| `burn <in> --srt <file.srt> --out <file> [--style bold\|clean\|minimal] [--position bottom\|middle]` | Burns styled captions in, clear of the platform UI safe zones. |
| `loudness <in> --out <file> [--lufs -14]` | EBU R128 loudness normalization to platform level. |
| `export <in> --preset reels\|tiktok\|shorts\|youtube\|linkedin\|x --out <file>` | Aspect, resolution, fps, bitrate, loudness and codec for the platform, in one pass. |
| `thumbs <in> --count 6 --out <dir>` | Evenly spaced candidate frames as JPGs. |
| `concat <a> <b> [...] --out <file>` | Joins clips, re-encoding to a common format. |
| `tidy <file.srt> --out <file.srt> [--video <in>] [--wrap 32]` | Removes overlaps, clamps to the clip, wraps to two short lines. `captions` applies this automatically. |
| `transcript <file.srt>` | Plain text with timestamps, for choosing hooks and clips. |
