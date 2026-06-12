# /create-music - Guided Suno Music Creation

**ACOS Vibe OS Music Pipeline - From idea to published track**

## Workflow Overview

```
╔═══════════════════════════════════════════════════════════════════╗
║                    VIBE OS MUSIC PIPELINE                          ║
║              "Transform Frequency into Form"                        ║
╠═══════════════════════════════════════════════════════════════════╣
║  Step 1: Define → Step 2: Craft → Step 3: Generate → Step 4: Publish║
╚═══════════════════════════════════════════════════════════════════╝
```

16: ## Step 1: Define Purpose & Mood
17: 
18: First, determine the track's intention:
19: 
20: **Questions to ask:**
21: 1. What transformation does this music facilitate?
22: 2. Who is the listener and what state are they in?
23: 3. What state should they be in after listening?
24: 4. Which brand or project?
25: 
26: **Mood Categories:**
27: - 🧘 **Meditation**: calm, peaceful, introspective, healing
28: - ⚡ **Energy**: uplifting, motivational, powerful, epic
29: - 🎯 **Focus**: ambient, minimal, steady, concentration
30: - ❤️ **Emotional**: dramatic, cinematic, touching, transformative
31: - 🌟 **Immersive**: ethereal, expansive, mind-expanding
32: 
33: ## Step 2: Craft Suno Prompt
34: 
35: Use the **Lyric Genius MCP** for prompt engineering:
36: 
37: ```javascript
38: // Activate with:
39: mcp__lyric-genius__activate_lyric_genius({
40:   theme: "track theme",
41:   mood: "emotional mood",
42:   style: "musical genre/style"
43: })
44: ```
45: 
46: **Prompt Formula:**
47: ```
48: [Genre/Style], [Tempo/Energy], [Instruments], [Vocal Style], [Mood Descriptors], [Special Elements]
49: ```
50: 
51: **Example Prompts by Category:**
52: 
53: **528Hz Meditation:**
54: ```
55: ambient meditation, slow ethereal, soft synths pads, no drums, 528hz healing frequency,
56: binaural undertones, nature sounds subtle, peaceful calming transcendent, female humming gentle
57: ```
58: 
59: **Epic Orchestral:**
60: ```
61: cinematic orchestral, building crescendo, full orchestra strings brass,
62: choir ethereal, dramatic powerful uplifting, film score epic, heroic triumphant
63: ```
64: 
65: **Focus/Productivity:**
66: ```
67: lo-fi ambient, steady 90bpm, soft piano rhodes, minimal drums subtle,
68: warm analog, focus concentration flow state, instrumental clean
69: ```
70: 
71: ## Step 3: Generate on Suno
72: 
73: 1. Open [Suno](https://suno.com/create)
74: 2. Paste crafted prompt
75: 3. Generate 2-4 variations
76: 4. Select best version(s)
77: 5. Extend if needed (full song vs hook)
78: 
79: **Quality Checklist:**
80: - [ ] Clear audio quality
81: - [ ] Coherent structure
82: - [ ] Mood matches intention
83: - [ ] Vocals clean (if any)
84: - [ ] Suitable length
85: 
86: ## Step 4: Add to Inventory
87: 
88: After selecting the final track, add it to the inventory:
89: 
90: **File Location:** `data/inventories/music.json`
91: 
92: **Entry Template:**
93: ```json
94: {
95:   "id": "track-slug-name",
96:   "type": "music",
97:   "title": "Track Title",
98:   "description": "Brief description of the track's purpose",
99:   "brand": "creator-brand",
100:   "status": "published",
101:   "tags": ["meditation", "528hz", "healing"],
102:   "createdAt": "2026-01-23",
103:   "platform": "suno",
104:   "sunoId": "uuid-from-suno-url",
105:   "sunoUrl": "https://suno.com/song/uuid",
106:   "duration": "3:24",
107:   "genre": ["ambient", "meditation"],
108:   "mood": ["calm", "peaceful", "healing"],
109:   "promptUsed": "The full Suno prompt used",
110:   "usageRights": "commercial"
111: }
112: ```
113: 
114: ## Step 5: Publish & Promote
115: 
116: 1. **Add to Playlist** on Suno
117: 2. **Create Social Post** using `/generate-social` or manual:
118:    - Hook: "New track just dropped: [Title]"
119:    - Story: Why I created this / what it's for
120:    - CTA: Link to track
121: 3. **Update Backlog** if this was a planned item
122: 
123: ## Quick Start Commands
124: 
125: ```
126: "Create a meditation track for morning energy"
127: "Make an epic orchestral piece"
128: "Generate a focus track for deep work sessions"
129: "Create a 528Hz healing frequency track"
130: ```
131: 
132: ## Integration with Creation Pipeline
133: 
134: Check `data/inventories/creation-pipeline.json` for:
135: - **Backlog items**: Pre-planned music to create
136: - **Related products**: Music tied to products (e.g., meditation series)
137: - **Brand alignment**: Which brand this serves
138: 
139: ## Tools Used

| Tool | Purpose |
|------|---------|
| `mcp__lyric-genius__*` | Prompt engineering |
| `mcp__nano-banana__*` | Cover art generation |
| Suno | Music generation |
| Inventory JSON | Tracking |

---

*Engage the Sonic Engineer for music that moves people.*
