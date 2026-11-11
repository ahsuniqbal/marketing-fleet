---
name: brand-review
description: Review every campaign deliverable against the voice guide, claims policy, brand kit, platform specs, licenses, and UTMs — by reading and by looking at rendered images and video frames — log each defect with an owner, and verify or reopen fixes, up to three runs. Use at stage C.6, after ads-export and before tracking-check. Never edits a deliverable.
---

# Brand review

**Stage:** C.6 ↺ · **Agent:** brand-reviewer
**Reads:** `campaigns/NN/creative-brief.md`, every file under `copy/`, `design/`, `video/`,
`ads/`, `foundation/voice-guide.md`, `foundation/brand-strategy.md` (claims policy),
`foundation/brand-kit/`, `playbook.md`, `CONVENTIONS.md`, `review-log.md` on a re-run
**Writes:** `campaigns/NN/review-log.md` (template: `templates/campaign-review-log.md`),
`campaigns/NN/review-evidence/run-N/`

## Why this stage exists

Campaigns ship one at a time, by agents with no memory. Nothing makes campaign 7 sound and look
like campaign 1 except this review. It is also the last check before a client sees the work and
before money is attached to it. You are the person who did not make the thing.

## Reviewer, not editor

You never change a deliverable. You find, evidence, and assign. The owner fixes with
`fix-review`; you verify. A reviewer who fixes things cannot also verify them.

## What to check — every deliverable, every run

| Area | Check |
|---|---|
| **Coverage** | Every deliverable ID in `creative-brief.md` exists, in every ratio and variant |
| **Voice** | Tone, do/don't, banned words from `voice-guide.md` |
| **Claims** | Every claim allowed by the claims policy; proof exists where required; no superlatives the policy bans; platform ad policies (health, finance, before/after) |
| **Brand kit** | Look at every PNG and at video frames: colours, type, logo usage and clear space match `brand-kit.md`. Grep `studio/` sources for hardcoded hex, px, or font names |
| **Spelling** | Copy, on-image text, captions, `.srt`, brand and product names |
| **Specs** | Sizes and ratios per `CONVENTIONS.md`; video duration matches the brief; text inside safe zones |
| **Copy limits** | `node ${CLAUDE_SKILL_DIR}/../write-copy/scripts/check-copy-limits.mjs <campaign>/copy` — the `write-copy` skill folder next to this one |
| **Licenses** | Every stock asset in `video/assets.md` or `design/` notes has a source and license; attribution present where required |
| **Ads files** | Every row Paused; asset names exist; UTMs match `utm-sheet.csv` |
| **Playbook** | Nothing repeats an approach `playbook.md` records as a loser without a stated reason |

**Video frames:** `ffmpeg -i <render> -vf fps=1/2 review-evidence/run-N/<id>/%03d.png`, plus
the first and last frame. Look at them — do not infer from the composition source.

## Procedure

1. **Run 1.** Check every area for every deliverable. Each defect becomes an entry in
   `review-log.md`: ID `REV-NN-###`, deliverable, area, what is wrong as observed, evidence path,
   severity, owner, status `open`.
   - **Severity:** `blocker` — legal, claims, wrong brand, broken file, spend risk; `major` —
     visible off-brand, spec or copy-limit failure; `minor` — polish.
   - **Owner:** copywriter (words), graphic-designer (static), video-producer (video),
     performance-marketer (ads files, UTMs). A defect in the brief itself → campaign-strategist.
2. **Verdict.** Pass when no `blocker` or `major` is `open`, `fixed`, or `reopened`.
3. **Re-run** after owners run `fix-review`: check every `fixed` entry and its neighbours (same
   deliverable, other ratios and variants). Move to `verified` or `reopened` with a history line.
   Append the run to the log; never rewrite an earlier run.
4. **Limit.** Three runs. If run 3 leaves a `blocker` or `major` open, stop and escalate to the
   human with the entries and their reopen history.

## Checklist

- [ ] Every deliverable ID covered in every ratio and variant
- [ ] PNGs and video frames looked at, not assumed
- [ ] Copy-limit script run, output saved as evidence
- [ ] Hardcoded-value grep run on `studio/`
- [ ] Every defect has evidence, severity, and one owner
- [ ] Earlier runs untouched; history lines added
- [ ] Verdict stated; escalated if run 3 fails

## Failure modes

- **Reviewing the source instead of the output.** The render is what the audience sees.
- **Fixing it yourself.** Nobody verifies your fix, and the owner never learns.
- **Checking only the 9:16.** The 1:1 crop is where text falls off.
- **Vague entries.** "Feels off-brand" cannot be fixed. Name the token, the line, the frame.

## Handoff

Pass → `tracking-check` at C.7. Open entries → owners run `fix-review`, then the next run.
