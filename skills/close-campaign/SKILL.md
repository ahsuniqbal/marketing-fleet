---
name: close-campaign
description: Close a reported campaign by writing its summary and folding everything learned and everything reusable into the client's playbook index, so the next campaign's agents start from evidence instead of guesses. Use at stage C.10, the final step of every campaign loop. The mechanism that makes serial campaigns compound.
---

# Close campaign

**Stage:** C.10 · **Agent:** analytics-reporter
**Reads:** `campaigns/NN/report.md`, `review-log.md`, `ads/plan.md`, `creative-brief.md` (and its
amendments), `video/footage-log.md`, `design/`, `studio/`, `playbook.md`, `foundation/roadmap.md`
**Writes:** `campaigns/NN/summary.md` (template: `templates/campaign-summary.md`),
`clients/<client>/playbook.md`

## Two files, two jobs

| File | Role | Read when |
|---|---|---|
| `campaigns/NN/summary.md` | **detail** — what happened, why, evidence | on demand |
| `playbook.md` | **index** — one line per learning or asset | at C.0, every campaign, by every agent |

Every agent reads the playbook before doing anything. They only open a summary when the playbook
points them there. If the playbook stops being scannable, it stops being read.

## What must be captured

**In `summary.md`:**
- Results against KPIs, in one table, linked to `report.md`
- Test outcomes: winner, margin, sample — or inconclusive
- What worked and what did not, by hook, format, audience, platform
- Review defects that recurred (from `review-log.md`) and their root cause
- Brief amendments and what caused them
- Reusable assets: templates added or changed in `studio/`, compositions, unused-but-usable
  footage from `footage-log.md`, audiences, keyword lists
- Known gaps: tracking problems, untested hypotheses, with a revisit point

**In `playbook.md`** — one line each, under its section, pointing at the summary:

```
- Hook: question-led openers beat stat-led on IG Reels — CTR 1.9% vs 1.1% | evidence: 03, 05 (2/2) | see campaigns/05/summary.md
```

## Procedure

1. Write `summary.md` from the report and logs.
2. For each learning, check the playbook for an existing entry on the same thing.
   - **Exists and agrees** → add this campaign to its evidence list and update the count
     (`2/2` → `3/3`).
   - **Exists and contradicts** → update the count (`2/3`), and if the rule no longer holds,
     mark it `contested` in place with both campaigns' evidence. Never delete silently.
   - **New** → add it, marked `1/1`. One campaign is a hypothesis, not a rule; the line says so.
3. File each learning under the playbook's sections: *Winning hooks*, *Formats*, *Audiences*,
   *Offers and angles*, *Posting and timing*, *Voice notes*, *Things that failed — do not
   repeat*. Update the *Benchmarks* table with this campaign's numbers.
4. Add reusable assets to *Creatives and templates* with their path, and recurring review
   defects to *Review patterns* so producers check them first.
5. Move tested items out of *Open hypotheses*; add the new hypotheses the report raised, each
   with a target campaign.
6. **Hygiene:** under ~300 lines. Past that, split into `playbook/` by section.
7. Mark the campaign shipped in `roadmap.md` and name the next one.

## Checklist

- [ ] `summary.md` complete, linked to `report.md`
- [ ] Every insight from the report in the playbook as one line
- [ ] Existing entries' evidence counts updated, not duplicated
- [ ] Contradictions marked contested, not deleted
- [ ] Reusable assets in Creatives and templates, with paths
- [ ] Recurring review defects in Review patterns
- [ ] Benchmarks updated; Open hypotheses moved or added
- [ ] Playbook under ~300 lines
- [ ] Roadmap updated; next campaign named

## Failure modes

- **Archive instead of index.** A playbook of paragraphs is not read.
- **One campaign becomes a rule.** Evidence counts keep hypotheses honest.
- **Only adding, never updating.** The same learning appears five times with five numbers.
- **Skipping close because the report was sent.** The next campaign starts from zero.

## Handoff

Report what was added to the playbook and name the next campaign in `roadmap.md`. The next
`/campaign` starts with C.0 — reading this playbook.
