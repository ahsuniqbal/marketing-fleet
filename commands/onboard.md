---
description: Run Phase A for a new client — intake, market and social research, brand strategy and voice, brand kit, creative and video templates, and the campaign roadmap.
argument-hint: <client name> [client notes, call transcript, or file path]
---

Run **Phase A — Onboarding** for: $ARGUMENTS

Once per client, before any campaign work.

## Before starting

1. Read `CONVENTIONS.md` at the workspace root. If it does not exist, copy it from this plugin's
   `CONVENTIONS.md` and tell the user to fill it in. If a field this phase depends on says `TBD` (agency languages,
   platforms in scope, approval gates), **ask the user** before F.0. Do not guess.
2. Create `clients/<client>/foundation/`, `clients/<client>/campaigns/`, and
   `clients/<client>/studio/` if absent. Client folder names are kebab-case.
3. If the workspace `.gitignore` lacks the rules in `templates/workspace.gitignore`, append them.
   Raw footage must never be committed. If the workspace has no `.gitattributes`, copy
   `templates/workspace.gitattributes` there; if it has one, append any missing lines. This
   stores PNG, JPG, and audio/video renders in Git LFS. Check `git lfs version`; if Git LFS is
   missing, tell the user to run `brew install git-lfs && git lfs install` before the first
   commit of media.
4. Copy the relevant file from `templates/` as each stage starts.
5. If the workspace has no `.env`, copy this plugin's `.env.example` there as `.env` and tell the
   user to fill it and reload it (`set -a; source .env; set +a`) before restarting Claude.
   Check which keys are exported (`APIFY_TOKEN`, `PEXELS_API_KEY`, …). Report missing ones now,
   not when the stage that needs them fails.

## Stages — stop at every gate

| Stage | Agent | Skill | Output |
|---|---|---|---|
| F.0 | `account-manager` | `client-intake` | `foundation/intake.md` |
| 🚦 | — | — | **STOP.** Present open questions. Wait for client answers. |
| F.1a ⟂ | `market-researcher` | `market-research` | `foundation/research.md` |
| F.1b ⟂ | `market-researcher` | `social-research` | `foundation/social-research.md`, `foundation/research/raw/` |
| F.2a | `brand-strategist` | `brand-strategy` | `foundation/brand-strategy.md` |
| F.2b | `brand-strategist` | `voice-guide` | `foundation/voice-guide.md` |
| 🚦 | — | — | **STOP.** Client approves positioning, pillars, claims policy, and voice. |
| F.3a | `graphic-designer` | `brand-kit` | `foundation/brand-kit/` |
| F.3b ⟂ | `graphic-designer` | `design-templates` | `studio/creatives/` |
| F.3c ⟂ | `video-producer` | `video-foundation` | `studio/video/` |
| 🚦 | — | — | **STOP.** Client approves brand kit, template previews, and brand intro/outro. |
| F.4 | `account-manager` + `campaign-strategist` | `campaign-roadmap` | `foundation/roadmap.md`, `playbook.md` |
| 🚦 | — | — | **STOP.** Client approves the campaign queue. |

F.1b needs the competitor list from F.1a's first pass; start F.1b as soon as that list exists.
F.3b and F.3c run concurrently after F.3a — both read `tokens.json`.

## Gates are hard stops

Do not continue past a 🚦 on your own judgment. Unapproved positioning or an unapproved brand kit
costs rework on every campaign that follows.

## On completion

Report: the campaign queue with campaign 1 named, keys still missing, `TBD` fields still open,
and what the user must get from the client before `/campaign` runs.
