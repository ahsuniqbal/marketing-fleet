---
name: ads-export
description: Turn the approved ads plan and finished deliverables into import-ready files — a Meta Ads Manager bulk import sheet and a Google Ads Editor CSV, everything paused — plus a step-by-step launch checklist for the human who will import and publish. Use at stage C.5, after production and before brand review. Agents never launch ads or spend budget.
---

# Ads export

**Stage:** C.5 · **Agent:** performance-marketer
**Reads:** `campaigns/NN/ads/plan.md`, `campaigns/NN/ads/utm-sheet.csv`, `campaigns/NN/copy/`,
`campaigns/NN/design/`, `campaigns/NN/video/renders/`, `CONVENTIONS.md`
**Writes:** `campaigns/NN/ads/meta-bulk-import.csv`, `campaigns/NN/ads/google-ads-editor.csv`,
`campaigns/NN/ads/launch-checklist.md` (template: `templates/campaign-launch-checklist.md`),
`campaigns/NN/ads/asset-map.md`

## Do not invent column headers

Ads Manager and Google Ads Editor change their import formats. A sheet built from memory imports
with silent errors or not at all. **Get the template from the human's own account:**

- **Meta:** Ads Manager → select an existing campaign (or create a draft) → *Export* → *Export
  selected (Excel or CSV)*. The exported header row is the format.
- **Google:** Google Ads Editor → *Account* → *Export* → *Export whole account (CSV)*, or
  *Import* → *Download template*.

Ask the human to place these at `ads/templates/meta-export.csv` and
`ads/templates/google-editor-export.csv`. If they are absent, stop and ask. Never guess.

## Procedure

1. **Map assets.** For every ad in `plan.md`, find the copy variant, the image or video file, and
   the UTM'd URL. Write `asset-map.md`: ad name → files → copy refs. A missing asset stops the
   export and is reported to its producer.
2. **Fill the Meta sheet** using the exported header row exactly. Campaign, ad set, and ad rows;
   budgets, schedule, audience fields, copy, URL with UTMs, and the creative's file name. Status
   on **every** row: `Paused`.
3. **Fill the Google Editor CSV** the same way: campaigns, ad groups, keywords, negatives, RSA
   headlines and descriptions, final URLs, tracking template. Status: **Paused**.
4. **Validate.** Re-run the copy-limit checker on the exported copy columns
   (`node ${CLAUDE_SKILL_DIR}/../write-copy/scripts/check-copy-limits.mjs` — the `write-copy`
   skill folder next to this one). Confirm file names in the sheets match
   files on disk. Then check every ad set row against `plan.md` — **any failure stops the
   export:**
   - A retargeting / warm ad set with an empty `Custom Audiences` field. Imported blank, it
     becomes another broad prospecting set that overlaps the others and breaks the test.
   - A `Custom Audiences` or `Excluded Custom Audiences` name not listed in the plan's
     *Audiences to create* and as a creation step in `launch-checklist.md` before import.
   - Age range, location, start date, budget, or optimisation event differing from the plan.
5. **Launch checklist.** Write `launch-checklist.md` for a person with no context: where each
   file is, how to import it, which images and videos to upload where, what to check in the
   preview, how to confirm budgets and dates, the pixel check, and the order to un-pause. Every
   step a checkbox.

## Rules

1. **Never launch, never un-pause, never connect to an ads account with write access.**
2. **Every row Paused.** A sheet with one active row is a sheet that can spend money on import.
3. **Exact headers from the human's export.** No reconstructed formats.

## Checklist

- [ ] Header rows taken from the human's own exports
- [ ] Every ad in the plan present, mapped to files in `asset-map.md`
- [ ] Every row status Paused
- [ ] UTMs from `utm-sheet.csv`, unchanged
- [ ] Copy limits re-checked on export
- [ ] File names in sheets exist on disk
- [ ] Every warm ad set has `Custom Audiences` filled, each name in the plan's *Audiences to create*
- [ ] Every audience used has a creation step in `launch-checklist.md` before import
- [ ] Ad set age, location, start date, budget, and optimisation event match `plan.md`
- [ ] `launch-checklist.md` complete enough for someone with no context

## Failure modes

- **Headers from memory.** Import fails, or worse, imports into the wrong fields.
- **An active row.** Spend starts before client sign-off.
- **Asset names that don't match.** The human uploads the wrong creative to the wrong ad.
- **A blank audience field "to fill at launch".** It imports as broad targeting and spends.

## Handoff

`brand-review` at C.6 reviews the import files and checklist alongside every other deliverable.
After client sign-off at C.8, a human follows `launch-checklist.md`.
