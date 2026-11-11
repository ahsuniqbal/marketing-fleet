---
name: ads-plan
description: Plan a campaign's paid media — account structure from campaign to ad set to ad, audiences built from the personas, budget split, a one-variable-per-test A/B plan, and a UTM sheet for every link. Use at stage C.4d, in parallel with production, after the creative brief is frozen. Produces a plan for a human to execute; never launches or spends.
---

# Ads plan

**Stage:** C.4d · **Agent:** performance-marketer
**Reads:** `campaigns/NN/strategy.md`, `campaigns/NN/creative-brief.md`,
`foundation/research.md` (personas), `foundation/intake.md` (budget, geography), `playbook.md`,
`CONVENTIONS.md` (platforms, UTM naming)
**Writes:** `campaigns/NN/ads/plan.md` (template: `templates/campaign-ads-plan.md`),
`campaigns/NN/ads/utm-sheet.csv` (template: `templates/campaign-utm-sheet.csv`)

## Why plan before assets exist

The structure decides what gets tested, and the test decides which assets are needed. Planning
in parallel with production means a missing variant is caught while the designer is still
working, not after the brief is closed.

## Procedure

1. **Read the money.** Total budget, flight dates, and split by platform from `strategy.md`. Only
   platforms marked paid in `CONVENTIONS.md`.
2. **Structure.** Per platform: campaign (objective matching the KPI), ad sets (one audience
   each), ads (one deliverable ID and variant each). Name everything with the campaign slug and
   deliverable IDs so reports can be joined back.
3. **Audiences.** One per persona that the strategy targets: location, age, language, interests
   or keywords, exclusions. Add a retargeting audience only if the client has a pixel or list —
   check `intake.md`. Google Search: keyword themes, match types, negatives.
4. **Budget split.** Daily budget per ad set; respect platform minimums; hold back a stated
   reserve (default 20%) for scaling winners. Show the arithmetic.
5. **Test plan.** Each test changes **one variable** — hook, format, audience, or offer — with a
   hypothesis, the metric that decides it, the minimum spend or impressions before deciding, and
   what happens to the loser. Pull hypotheses from `playbook.md` first.
6. **UTMs.** One row per ad per link in `utm-sheet.csv` using the naming in `CONVENTIONS.md`.
   Every URL resolves to a page that exists — check it.
7. **Gaps.** Any variant the test plan needs that the creative brief does not contain → raise
   `amend-brief` with `campaign-strategist`. Never ask a producer directly.

## Rules

1. **No launching, no spending.** This skill writes documents only.
2. **Every ad maps to a deliverable ID.** Nothing in the plan is unassigned creative.
3. **One variable per test.** Two changes at once make the result unreadable.

## Checklist

- [ ] Budget, flight, and platforms match `strategy.md`
- [ ] Every campaign objective matches a KPI
- [ ] One audience per ad set; exclusions written
- [ ] Budget arithmetic shown, reserve held back
- [ ] Every test: one variable, hypothesis, deciding metric, minimum sample
- [ ] Every ad mapped to a deliverable ID and variant
- [ ] UTM row for every ad link, per `CONVENTIONS.md`
- [ ] Missing variants raised through `amend-brief`

## Failure modes

- **Testing everything at once.** No winner can be named.
- **Audiences that overlap.** Ad sets bid against each other.
- **Budget spread too thin.** No ad set exits learning; nothing is decided.
- **UTMs invented per ad by hand.** Reporting at C.9 cannot join results to creatives.

## Handoff

`ads-export` at C.5 once the copy, design, and video deliverables exist.
