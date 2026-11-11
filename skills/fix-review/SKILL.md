---
name: fix-review
description: Fix the brand review entries assigned to you in a campaign's review log — understand the defect from its evidence, fix it at the source, re-render or re-export, check sibling ratios and variants, and mark it fixed for brand-reviewer to verify. Use at stage C.6 between review runs, by copywriter, graphic-designer, video-producer, or performance-marketer. Never verifies or closes an entry.
---

# Fix review

**Stage:** C.6 ↺ · **Agents:** copywriter, graphic-designer, video-producer,
performance-marketer (and campaign-strategist for entries against the brief)
**Reads:** `campaigns/NN/review-log.md`, the cited evidence in `review-evidence/`,
`creative-brief.md`, `voice-guide.md`, `brand-kit/`, `CONVENTIONS.md`
**Writes:** the fixed deliverable, its re-render or re-export, and the entry's status and history
in `review-log.md`

## Scope

Take only entries where **Owner** is you and **Status** is `open` or `reopened`. Work them
blocker first. An entry that belongs to someone else is reassigned with a reason in its
history — not fixed across the boundary.

## Procedure

1. **Read the evidence first.** Open the screenshot, frame, or script output the entry cites.
   If you cannot see the defect, add what you checked to the history and leave it for the
   next run — do not mark it fixed.
2. **Fix at the source.**
   - Copy: edit `copy/<id>.md`, then re-run the copy-limit checker.
   - Static: fix the template or the creative's props in `studio/creatives/`, using tokens, then
     re-render with the render script. Never edit a PNG by hand.
   - Video: fix the composition or `edl.json`, re-render, re-normalise loudness. Never patch a
     rendered MP4.
   - Ads files: fix the plan or the asset map, then regenerate the export.
   If the fix needs a token or template change, that is **structural** — say so.
3. **Fix the siblings.** The same defect is usually in every ratio and variant of that
   deliverable, and often in other deliverables built from the same template. Fix all of them
   and list them.
4. **Stay inside the brief.** If the fix needs a deliverable to change format, message, or
   count, raise `amend-brief` — it is not a review fix.
5. **Mark it fixed** in `review-log.md`:

   ```markdown
   **Status:** fixed

   **Fix**
   - Cause: CTA button used #FF5A1F instead of `color.accent`
   - Change: structural — `CtaButton` template now reads the token
   - Files: design/03-static-01..04/*.png re-rendered
   - Siblings: 03-static-02, 03-static-03, 03-static-04

   **History**
   - run 1 — opened by brand-reviewer
   - after run 1 — fixed by graphic-designer
   ```

## Campaign-strategist entries

An entry against the brief means the deliverable matches the brief but the brief is wrong. Fix
it with `amend-brief`, and notify every producer the amendment touches.

## Rules

1. **Never move an entry to verified.** Only `brand-reviewer` does that.
2. **Never edit earlier runs or evidence.** They are the record.
3. **Never argue the policy in the fix.** If the voice guide or claims policy is wrong, raise it
   with the human; `brand-strategist` changes the foundation, not the fix.

## Checklist

- [ ] Only my `open` and `reopened` entries, blockers first
- [ ] Defect seen in the evidence before fixing
- [ ] Fixed at the source; outputs regenerated, not patched
- [ ] Siblings fixed and listed
- [ ] Change marked local or structural
- [ ] Status `fixed` and a history line added

## Failure modes

- **Patching the output.** The next re-render brings the defect back.
- **Fixing one ratio.** The re-run reopens the entry for the other two.
- **Marking fixed without seeing the defect.** A wasted run out of three.

## Handoff

When every assigned entry is `fixed` or reassigned, `brand-reviewer` runs the next
`brand-review` run.
