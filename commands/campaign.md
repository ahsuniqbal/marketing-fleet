---
description: Run Phase B for one campaign — brief, strategy and calendar, frozen creative brief, parallel copy, design, video and ads, brand review loop, tracking check, and the client approval pack.
argument-hint: <client> [campaign name or number, or blank for next in roadmap]
---

Run **Phase B — the campaign loop** for: $ARGUMENTS

Blank campaign means the next unlaunched campaign in `clients/<client>/foundation/roadmap.md`.

## C.0 — mandatory preamble

Read `clients/<client>/playbook.md` **first**. Every agent in this loop reads it before acting.
Then `CONVENTIONS.md` (and the client override, if any) and the foundation documents.

Skipping this is how a campaign retests a hook that already failed.

## Stages — stop at every gate

| Stage | Agent | Skill | Output |
|---|---|---|---|
| C.1 | `account-manager` | `campaign-brief` | `campaigns/NN-<slug>/brief.md` |
| 🚦 | — | — | **STOP.** Client approves the brief and its success measure. |
| C.2 | `campaign-strategist` | `campaign-strategy`, `content-calendar` | `strategy.md`, `calendar.csv` |
| 🚦 | — | — | **STOP.** User approves KPIs, mix, budget split, and calendar. |
| C.3 | `campaign-strategist` | `creative-brief` | `creative-brief.md` |
| 🚦 | — | — | **STOP. CREATIVE BRIEF FROZEN.** This gate is what makes C.4 safe. |
| C.4a ⟂ | `copywriter` | `write-script` → `write-copy` | `copy/` |
| C.4b ⟂ | `graphic-designer` | `produce-creatives` | `design/` |
| C.4c ⟂ | `video-producer` | `produce-video` / `edit-footage` | `video/` |
| C.4d ⟂ | `performance-marketer` | `ads-plan` | `ads/plan.md`, `ads/utm-sheet.csv` |
| C.5 | `performance-marketer` | `ads-export` | import files, `ads/launch-checklist.md` |
| C.6 ↺ | `brand-reviewer` ⇄ owners | `brand-review`, `fix-review` | `review-log.md` — loop below |
| C.7 | `analytics-reporter` | `tracking-check` | `tracking-check.md` |
| C.8 | `account-manager` | `approval-pack` | `approval/index.html`, `approval/approval.md` |
| 🚦 | — | — | **STOP.** Client signs off. A human imports the ad files and launches. |

Launch C.4a–d concurrently. Inside C.4, `copywriter` runs `write-script` first and locks each
script; `video-producer` starts with storyboard, footage logging, and asset gathering, and records
voiceover only on a locked script. `graphic-designer` lays out from the brief and pulls final words
from `copy/` as they land. C.5 starts when the copy, design, and video deliverables it references
exist.

If the client supplied raw footage, it goes in `campaigns/NN/video/raw/` before C.4 starts.

## C.6 — the review loop

1. **Run 1.** `brand-reviewer` reviews every deliverable and files findings in `review-log.md` as
   `open`, each with an owner and a severity.
2. **Pass?** No open blocker or major findings → go to C.7.
3. **Fix round.** Launch each owner with `fix-review` on their own findings, concurrently.
   Status becomes `fixed`, with a fix note.
4. **Retest.** `brand-reviewer` appends the next run, re-checks every fixed deliverable and anything
   that shares its template, and moves each finding to `verified` or `reopened`.
5. **Repeat from 2**, to a maximum of **three runs**. If run 3 still has an open or reopened
   blocker or major finding, stop and escalate to the user with the history.

## Rules that hold during this loop

1. **The creative brief is law after C.3.** A change goes through `amend-brief` — never a quiet
   edit, never an extra deliverable nobody briefed.
2. **Tokens and voice only.** No off-token visuals; no copy outside the voice guide and claims
   policy.
3. **Humans hold the money and the publish button.** No agent launches ads, spends, posts, or
   emails the client.
4. **Every deliverable keyed by ID.** Copy, design, video, UTMs, review findings, and the report
   all use the creative brief's IDs.

## On completion

Report: deliverables ready by ID, review runs taken, anything deferred, and the launch checklist
path. After the flight ends and the human has dropped the ad exports in `ads/results/`, run
`/report`.
