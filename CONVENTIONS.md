# Conventions

Every agent in this fleet reads this file before producing anything. Fill it in once per agency
workspace. A client can override any section in `clients/<client>/CONVENTIONS.md`; the client
file wins where both exist.

If a field says `TBD`, agents must ask rather than guess.

## Agency

| Field | Value |
|---|---|
| Agency name | TBD |
| Working languages | TBD (e.g. English, Urdu) |
| Default currency | TBD |
| Default timezone | TBD |
| Client communication language | TBD |

## Platforms in scope

Delete the rows you do not serve. Agents never plan deliverables for a platform not listed here.

| Platform | Organic | Paid |
|---|---|---|
| Instagram | yes | yes |
| Facebook | yes | yes |
| TikTok | yes | yes |
| YouTube | yes | yes |
| LinkedIn | yes | yes |
| Google Search | — | yes |
| X | yes | no |

## Creative sizes (px)

Defaults. Platforms change these; verify against current platform help pages once a quarter and
update here — agents read this table, not their memory.

| Placement | Size | Ratio | Safe zone notes |
|---|---|---|---|
| Feed portrait (IG, FB) | 1080×1350 | 4:5 | |
| Feed square | 1080×1080 | 1:1 | |
| Story / Reel / TikTok | 1080×1920 | 9:16 | keep text out of top ~250px and bottom ~340px |
| Carousel slide | 1080×1350 | 4:5 | |
| LinkedIn / link share | 1200×627 | 1.91:1 | |
| YouTube video | 1920×1080 | 16:9 | |
| YouTube thumbnail | 1280×720 | 16:9 | |
| Display banners | 300×250, 728×90, 160×600, 320×50 | — | |

## Copy limits (characters)

`write-copy` validates against these with its checker script. Recommended limits are where text
stops being truncated; hard limits are where the platform rejects it.

| Field | Recommended | Hard |
|---|---|---|
| Meta primary text | 125 | — |
| Meta headline | 27 | — |
| Meta description | 27 | — |
| Google RSA headline | — | 30 |
| Google RSA description | — | 90 |
| Google RSA path | — | 15 |
| LinkedIn intro text | 150 | 600 |
| LinkedIn headline | 70 | 200 |
| Instagram caption | 125 visible | 2200 |
| Instagram hashtags | 3–5 | 30 |
| TikTok caption | 100 visible | 2200 |
| YouTube title | 60 visible | 100 |
| X post | — | 280 |
| Email subject | 45 | — |

To change limits for the checker, put a `copy-limits.json` at the workspace root (see
`skills/write-copy/scripts/check-copy-limits.mjs` for the keys).

## Render settings

| Field | Value |
|---|---|
| Static creative scale | 2 (use 3 for print or hero assets) |
| Static format | PNG; JPG at quality 90 only where a platform file-size limit forces it |
| Video fps | 30 |
| Video codec | H.264, AAC audio |
| Loudness target | -14 LUFS (social), -16 LUFS (podcast/long form) |
| Captions | burned in for social cuts; `.srt` delivered alongside |

## Tools and credit budgets

| Tool | Key env var | Budget rule |
|---|---|---|
| Apify | `APIFY_TOKEN` | max 50 posts per profile, 10 profiles per run; estimate cost before each run |
| ElevenLabs | `ELEVENLABS_API_KEY` | only on a locked script; drafts use Kokoro or macOS `say` |
| Pexels | `PEXELS_API_KEY` | — |
| Pixabay | `PIXABAY_API_KEY` | — |
| Unsplash | `UNSPLASH_ACCESS_KEY` | — |
| Google Analytics | `GOOGLE_APPLICATION_CREDENTIALS`, `GOOGLE_PROJECT_ID` | read-only |

Optional tools enabled in this workspace (agents use none of these unless listed): TBD
(e.g. Figma MCP, Canva MCP, fal.ai, Semrush)

## Naming

- Clients: `clients/<kebab-case>/`
- Campaigns: `campaigns/NN-<kebab-slug>/`, `NN` zero-padded in roadmap order
- Deliverable IDs: `<campaign NN>-<format>-<seq>`, e.g. `03-reel-01`, `03-static-04`, `03-search-01`
- Render files: `<deliverable-id>-<WxH or ratio>[-v<variant>].<ext>`, e.g. `03-reel-01-9x16.mp4`
- UTM: `utm_source=<platform>`, `utm_medium=<paid_social|cpc|organic_social|email>`,
  `utm_campaign=<client>-<NN>-<slug>`, `utm_content=<deliverable-id>[-v<variant>]`

## Approval gates

Who signs off at each 🚦 for this agency: TBD (e.g. account lead for internal gates; client
contact for client gates). Record every sign-off with a name and a date in the stage's document.

## Git

- `clients/*/campaigns/*/video/raw/` and render intermediates are gitignored; final renders are
  committed or stored at: TBD
- Commit after every stage with `<client> <stage>: <what>`, e.g. `acme C.3: freeze creative brief`
