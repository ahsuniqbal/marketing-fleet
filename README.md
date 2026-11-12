# marketing-fleet

A marketing agency as a Claude Code plugin. Ten role agents, twenty-seven skills, and a document
spine that carries a client from the first call to launched, measured campaigns.

Built around one constraint: **campaigns ship one at a time, per client, and every campaign
starts from what the last one learned.** Volume is not the goal — consistency and compounding
are. Campaign 7 must sound and look like campaign 1, and perform better.

## Pipeline reference

[pipeline.html](pipeline.html) is the whole pipeline on one page — flow diagram, all twenty-three
stages, the nine human gates, the agent roster, the skill index, and the tool stack. Open it in a
browser straight from the repo; it is a single self-contained file with no build step. It is a
visual reference generated from this README — update both together.

## Install

```bash
claude
/plugin marketplace add ahsuniqbal/marketing-fleet
/plugin install marketing-fleet@marketing-fleet
```

Installing copies the plugin into `~/.claude/plugins/cache/` at the version in `plugin.json`. To
pick up a new release:

```bash
claude plugin marketplace update marketing-fleet
claude plugin update marketing-fleet@marketing-fleet
```

Then restart Claude Code — the update does not apply to a running session.

## Releasing a change

1. Bump `version` in [.claude-plugin/plugin.json](.claude-plugin/plugin.json).
2. Commit and push.
3. `claude plugin tag .` — tags `marketing-fleet--v<version>` and checks the manifests agree.

## Tool stack — free first

Every default in this fleet is free or free-tier. Paid tools are optional and bring-your-own-key.

| Need | Default (free) | Optional (your own account) |
|---|---|---|
| Web and competitor research | WebSearch / WebFetch, Playwright MCP | — |
| Social data (Instagram, Facebook, TikTok) | Apify MCP — free monthly credit | Paid Apify plan |
| Public ad research | Meta Ad Library, TikTok Creative Center, Google Trends via Playwright | — |
| Keywords | Google Trends, autocomplete, competitor pages | DataForSEO / Semrush / Ahrefs MCP |
| Static creatives | React/HTML templates rendered by Playwright at 2x/3x | Figma MCP, Canva MCP |
| Stock imagery and footage | Pexels / Pixabay / Unsplash APIs (free keys) | — |
| AI images / b-roll | — | fal.ai / Replicate MCP (pay per use) |
| Video | Remotion, ffmpeg, whisper.cpp, MediaPipe | — |
| Voiceover | ElevenLabs MCP (free tier, ~10k chars/month), Kokoro TTS fallback | Paid ElevenLabs plan |
| Analytics | Google Analytics MCP, Ads Manager CSV exports | Ads platform MCPs |
| Content calendar | `calendar.csv` in the spine | Notion / Google Sheets sync |

**Ads are never launched by an agent.** `performance-marketer` produces import-ready files and a
launch checklist; a human imports, reviews, and publishes.

### Licensing notes for buyers

- **Remotion** is free for individuals and companies of up to three people. Larger agencies need a
  Remotion company license. See remotion.dev/license.
- **ElevenLabs** free-tier output may not carry a commercial license. Check the current terms, or
  use a paid plan or the Kokoro fallback (Apache 2.0) for client work.
- **Stock assets** follow each provider's license. `brand-reviewer` checks attribution notes.
- **Scraping** uses public data only. You are responsible for each platform's terms.

## Setup

1. Copy [CONVENTIONS.md](CONVENTIONS.md) to the root of your agency workspace and fill it in
   there — the installed plugin lives in Claude Code's cache and is overwritten on update. Agents
   read the workspace copy before producing anything; any field left `TBD` becomes a question,
   not a guess. `/onboard` copies it for you if it is missing.
2. **API keys.** Copy [.env.example](.env.example) from this repo to the root of your own
   agency workspace as `.env`, and fill in the keys you have. Keys go in the workspace, never
   in the plugin. `templates/workspace.gitignore` already ignores `.env`, so keys are never
   committed. All keys are optional; a stage that needs a missing key stops and asks.

   ```bash
   cp /path/to/marketing-fleet/.env.example /path/to/your-workspace/.env
   ```

   | Key | Get it at | Used by |
   |---|---|---|
   | `APIFY_TOKEN` | apify.com (free account, monthly credit) | `social-research` — public Instagram, Facebook, TikTok posts |
   | `ELEVENLABS_API_KEY` | elevenlabs.io (free tier, ~10k chars/month) | `produce-video` — final voiceover on locked scripts |
   | `PEXELS_API_KEY` | pexels.com/api | `produce-creatives`, `produce-video` — stock images and footage |
   | `PIXABAY_API_KEY` | pixabay.com/api/docs | `produce-creatives`, `produce-video` — stock images, footage, music |
   | `UNSPLASH_ACCESS_KEY` | unsplash.com/developers | `produce-creatives` — stock images |
   | `GOOGLE_APPLICATION_CREDENTIALS` | Google Cloud service-account JSON with Viewer on the GA4 property | `tracking-check`, `campaign-report` — GA4 read |
   | `GOOGLE_PROJECT_ID` | the same Google Cloud project | as above |

   Claude Code does not read `.env` on its own, and the MCP servers take their keys from the
   shell environment. Load it before starting Claude, from the workspace root:

   ```bash
   set -a; source .env; set +a; claude
   ```

   Or use direnv with `dotenv` in an `.envrc`.

3. **Local tools.**

   | Tool | Needed for | Install (macOS) |
   |---|---|---|
   | Node.js 20+ and `npx` | studios, Playwright and Apify MCP, render scripts | nodejs.org or `brew install node` |
   | `ffmpeg` / `ffprobe` | video renders, loudness, frame extraction | `brew install ffmpeg` |
   | `uv` (provides `uvx`) | ElevenLabs MCP | `brew install uv` |
   | `pipx` | Google Analytics MCP | `brew install pipx && pipx ensurepath` |
   | whisper.cpp | word-level captions from voiceover | installed into `studio/video/` by `video-foundation` on first use |
   | Remotion | motion video | installed into `studio/video/` by `video-foundation` on first use |
   | Kokoro TTS (optional) | draft and fallback voiceover without ElevenLabs | `pip install kokoro soundfile` (macOS `say` also works for drafts) |
   | MediaPipe (optional) | subject-tracked vertical reframes of client footage | `pip install mediapipe` |

The MCP servers are declared in [.mcp.json](.mcp.json). The browser server is named
`marketing-playwright` so it does not collide with another plugin's `playwright` server; its tools
appear as `mcp__plugin_marketing-fleet_marketing-playwright__*`. A server without its key fails to start;
that only matters for the stage that uses it.

## The document spine

Agents have no memory between runs. Everything lives in files. Every stage reads the previous
document and writes the next. One workspace holds many clients.

```
clients/<client>/
  foundation/
    intake.md            goals, audience, budget, constraints, do-nots
    research.md          market, competitors, personas, keywords
    social-research.md   format mix, hooks, posting times, trends — dated
    research/raw/        raw scrape output, so nothing is scraped twice
    brand-strategy.md    positioning, messaging pillars, claims policy
    voice-guide.md       tone, do/don't, example lines, banned words
    brand-kit/
      tokens.json        THE VISUAL SOURCE OF TRUTH — read by creatives and video
      brand-kit.md       usage rules, logo, type, color, imagery
      logos/  fonts/
    roadmap.md           ordered campaign queue (`order:` list), with a reason for each position
  playbook.md            THE LEARNING LEDGER — read at the start of every campaign
  studio/
    creatives/           React templates + render script (static creatives)
    video/               Remotion project (motion graphics and footage edits)
  campaigns/
    NN-<slug>/
      brief.md           what the client wants from this campaign
      strategy.md        goal, KPIs, channel mix, budget split
      calendar.csv       the content calendar
      creative-brief.md  FROZEN before production — every deliverable, by ID
      copy/              <deliverable-id>.md, scripts/<deliverable-id>.md
      design/            <deliverable-id>/*.png + assets.md (stock attribution),
                         render-manifest.json, contact-sheet.html
      video/             storyboard.md, assets.md, footage-log.md, edl.json, transcripts/,
                         reframe/, renders/; raw/, proxies/, frames/ (gitignored)
      ads/               plan.md, utm-sheet.csv, asset-map.md, launch-checklist.md,
                         meta-bulk-import.csv, google-ads-editor.csv,
                         templates/ (headers exported from your own ad accounts),
                         results/ (exports you drop in after the flight)
      review-log.md      brand review runs — open → fixed → verified / reopened
      review-evidence/   run-N/ screenshots and extracted frames per review run
      tracking-check.md  pre-launch tracking verification
      approval/          client review page + approval.md (sign-off, launch date)
      report.md          results vs KPIs, written after the flight
      summary.md         written at close, feeds the playbook
```

Templates for all documents are in [templates/](templates/).

## Phase A — Onboarding, once per client (`/onboard`)

| Stage | Agent | Skill | Output |
|---|---|---|---|
| F.0 | account-manager | `client-intake` | `foundation/intake.md` |
| 🚦 | | | Client answers open questions |
| F.1a ⟂ | market-researcher | `market-research` | `foundation/research.md` |
| F.1b ⟂ | market-researcher | `social-research` | `foundation/social-research.md`, `foundation/research/raw/` |
| F.2a | brand-strategist | `brand-strategy` | `foundation/brand-strategy.md` |
| F.2b | brand-strategist | `voice-guide` | `foundation/voice-guide.md` |
| 🚦 | | | Client approves positioning and voice |
| F.3a | graphic-designer | `brand-kit` | `foundation/brand-kit/` |
| F.3b ⟂ | graphic-designer | `design-templates` | `studio/creatives/` base templates |
| F.3c ⟂ | video-producer | `video-foundation` | `studio/video/` Remotion project, brand intro/outro, captions |
| 🚦 | | | Client approves the brand kit and templates |
| F.4 | account-manager + campaign-strategist | `campaign-roadmap` | `foundation/roadmap.md`, seeded `playbook.md` |
| 🚦 | | | Client approves the campaign queue |

F.3b and F.3c both start after F.3a — they read `tokens.json`.

Every 🚦 is recorded in the document it approves as `client-approved (<name>, <date>)` or
`user-approved (<name>, <date>)`. A gate without a recorded name and date has not been passed.

## Phase B — Campaign loop, repeated in roadmap order (`/campaign`)

| Stage | Agent | Skill | Output |
|---|---|---|---|
| C.0 | *all* | read `playbook.md` | — |
| C.1 | account-manager | `campaign-brief` | `brief.md` |
| 🚦 | | | Client approves the brief |
| C.2 | campaign-strategist | `campaign-strategy`, `content-calendar` | `strategy.md`, `calendar.csv` |
| 🚦 | | | User approves strategy and calendar |
| C.3 | campaign-strategist | `creative-brief` | `creative-brief.md` → **freeze** |
| C.4a ⟂ | copywriter | `write-script`, then `write-copy` | `copy/` |
| C.4b ⟂ | graphic-designer | `produce-creatives` | `design/` |
| C.4c ⟂ | video-producer | `produce-video` and/or `edit-footage` | `video/` |
| C.4d ⟂ | performance-marketer | `ads-plan` | `ads/plan.md`, `ads/utm-sheet.csv` |
| C.5 | performance-marketer | `ads-export` | import files, `ads/launch-checklist.md` |
| C.6 ↺ | brand-reviewer ⇄ owners | `brand-review`, `fix-review` | `review-log.md` — max three runs |
| C.7 | analytics-reporter | `tracking-check` | `tracking-check.md` |
| C.8 | account-manager | `approval-pack` | `approval/` |
| 🚦 | | | Client signs off. **A human imports and launches the ads.** |

C.4a–d run in parallel; the frozen creative brief is what makes that safe. One ordering rule
inside C.4: `copywriter` delivers and locks scripts first, because `video-producer` cannot record
voiceover until a script is locked. Until then video works on storyboard, footage logging, and
asset gathering.

Any deliverable change after C.3 goes through `amend-brief` (campaign-strategist). No exceptions.

## Phase C — Report and close, after the flight (`/report`)

| Stage | Agent | Skill | Output |
|---|---|---|---|
| C.9 | analytics-reporter | `campaign-report` | `report.md`, `report.html` |
| 🚦 | | | User reviews the report before it reaches the client |
| C.10 | analytics-reporter | `close-campaign` | `summary.md`, updated `playbook.md` |

## The three rules

1. **C.0 preamble.** Every agent reads `playbook.md` before doing anything. What worked is reused;
   what failed is not repeated.
2. **Tokens and voice are law.** No hardcoded color, font, or spacing in creatives or video — only
   `tokens.json`. No copy that contradicts `voice-guide.md` or the claims policy.
3. **Humans hold the money and the publish button.** Agents never launch ads, spend budget, post
   to social accounts, or send client email. They prepare; a person ships.

## Agents

| Agent | Model | Owns |
|---|---|---|
| `account-manager` | opus | Client truth: intake, briefs, approvals, client communication |
| `market-researcher` | sonnet | Market, competitor, audience, and social research |
| `brand-strategist` | opus | Positioning, messaging pillars, voice, claims policy |
| `campaign-strategist` | opus | Roadmap, campaign strategy, calendar, the frozen creative brief |
| `copywriter` | sonnet | All words: ad copy, captions, landing copy, emails, scripts |
| `graphic-designer` | sonnet | Brand kit, templates, static creatives |
| `video-producer` | sonnet | Remotion foundation, motion videos, raw footage edits |
| `performance-marketer` | sonnet | Ad structure, audiences, UTMs, test plan, import files |
| `brand-reviewer` | opus | Cross-campaign consistency, compliance, specs — the review loop |
| `analytics-reporter` | sonnet | Tracking, reporting, and the playbook |

## Skills

| Skill | Stage | Agent | Reads | Writes |
|---|---|---|---|---|
| `client-intake` | F.0 | account-manager | client notes, call transcripts | `foundation/intake.md` |
| `market-research` | F.1a | market-researcher | `intake.md` | `foundation/research.md` |
| `social-research` | F.1b | market-researcher | `intake.md`, `research.md` competitor list | `foundation/social-research.md`, `foundation/research/raw/` |
| `brand-strategy` | F.2a | brand-strategist | `intake.md`, `research.md`, `social-research.md` | `foundation/brand-strategy.md` |
| `voice-guide` | F.2b | brand-strategist | `brand-strategy.md`, `social-research.md` | `foundation/voice-guide.md` |
| `brand-kit` | F.3a | graphic-designer | `brand-strategy.md`, client assets | `foundation/brand-kit/` |
| `design-templates` | F.3b | graphic-designer | `brand-kit/`, `social-research.md` format mix | `studio/creatives/` |
| `video-foundation` | F.3c | video-producer | `brand-kit/`, `voice-guide.md` | `studio/video/` |
| `campaign-roadmap` | F.4 | account-manager + campaign-strategist | all foundation docs | `foundation/roadmap.md`, `playbook.md` |
| `campaign-brief` | C.1 | account-manager | `roadmap.md`, `playbook.md`, client input | `campaigns/NN/brief.md` |
| `campaign-strategy` | C.2 | campaign-strategist | `brief.md`, foundation, `playbook.md` | `strategy.md` |
| `content-calendar` | C.2 | campaign-strategist | `strategy.md`, `social-research.md` | `calendar.csv` |
| `creative-brief` | C.3 | campaign-strategist | `strategy.md`, `calendar.csv` | `creative-brief.md` (frozen) |
| `amend-brief` | C.4, on demand | campaign-strategist | the blocker, `creative-brief.md` | amendment + changelog |
| `write-script` | C.4a | copywriter | `creative-brief.md`, `voice-guide.md` | `copy/scripts/<id>.md` |
| `write-copy` | C.4a | copywriter | `creative-brief.md`, `voice-guide.md`, `brand-strategy.md` | `copy/<id>.md` |
| `produce-creatives` | C.4b | graphic-designer | `creative-brief.md`, `copy/`, `brand-kit/` | `design/<id>/` |
| `produce-video` | C.4c | video-producer | `creative-brief.md`, `copy/scripts/`, `brand-kit/` | `video/` |
| `edit-footage` | C.4c | video-producer | `creative-brief.md`, `video/raw/`, `copy/scripts/` | `video/` |
| `ads-plan` | C.4d | performance-marketer | `strategy.md`, `creative-brief.md`, `research.md` personas | `ads/plan.md`, `ads/utm-sheet.csv` |
| `ads-export` | C.5 | performance-marketer | `ads/plan.md`, `copy/`, `design/`, `video/renders/` | import files, `ads/launch-checklist.md` |
| `brand-review` | C.6 | brand-reviewer | every deliverable, foundation, `playbook.md` | `review-log.md` |
| `fix-review` | C.6 | copywriter / graphic-designer / video-producer / performance-marketer | `review-log.md` | fixed deliverables, fix notes |
| `tracking-check` | C.7 | analytics-reporter | `strategy.md` KPIs, `ads/utm-sheet.csv` | `tracking-check.md` |
| `approval-pack` | C.8 | account-manager | everything in the campaign | `approval/index.html`, `approval/approval.md` |
| `campaign-report` | C.9 | analytics-reporter | `strategy.md`, GA4, Ads Manager exports | `report.md`, `report.html` |
| `close-campaign` | C.10 | analytics-reporter | `report.md`, `review-log.md`, deliverables | `summary.md`, `playbook.md` |

## Commands

- `/onboard <client>` — run Phase A for a new client
- `/campaign <client> [campaign]` — run Phase B for the next campaign in the roadmap
- `/report <client> [campaign]` — run Phase C after the campaign's flight ends
