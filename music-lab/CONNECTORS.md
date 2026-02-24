# Music Lab Connectors

| Category | Default | Alternatives |
|----------|---------|-------------|
| `~~music generation` | Suno (via web interface) | Udio, Stability Audio, AudioCraft, ElevenLabs |
| `~~knowledge base` | Local creator-memory/music.md | Notion music catalog |
| `~~publishing` | Local file storage | SoundCloud, YouTube Music, Spotify for Creators |
| `~~chat` | Slack | Discord, Teams |

## Connector Usage in This Plugin

- `~~music generation` — no direct API integration currently available for most tools. Prompts are engineered and delivered for manual use.
- `~~knowledge base` — check existing track catalog and style anchors before generating
- `~~publishing` — upload final tracks to distribution platforms
- `~~chat` — share generated prompts with collaborators for review

## Note on Music Generation APIs

Most AI music tools (Suno, Udio) don't currently expose public APIs for programmatic generation. The music-lab plugin is therefore **prompt-centric** — it engineers optimal prompts for manual use, tracks results, and builds style consistency over time.

When APIs become available, swap `~~music generation` binding without changing skill content.
