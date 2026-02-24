# Visual Studio Connectors

| Category | Default | Alternatives |
|----------|---------|-------------|
| `~~image generation` | Gemini 2.5 Flash Image (nano-banana MCP) | Midjourney, DALL-E 3, Flux, Stability AI |
| `~~design` | Figma | Canva, Adobe Express |
| `~~knowledge base` | Notion | Local creator-memory/visual.md |
| `~~publishing` | Vercel public/ directory | Cloudinary, S3, any CDN |

## Connector Usage in This Plugin

- `~~image generation` — generate images from engineered prompts via `/create-visual`
- `~~design` — pull brand colors, typography, component specs from design system
- `~~knowledge base` — search for existing approved images, style guides
- `~~publishing` — upload approved images to CDN/asset store

## No Connectors Required

Visual Studio engineers prompts that work with any image generation tool. If no `~~image generation` connector is configured, prompts are delivered ready to paste into any tool manually.

The 7-gate quality review works on any generated image regardless of tool.
