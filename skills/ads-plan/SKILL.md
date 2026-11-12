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
   - **Learning phase.** Plan for roughly 50 optimisation events per ad set per week (Meta).
     Show the arithmetic: daily budget × 7 ÷ forecast CPA. If an ad set cannot get near it,
     consolidate — prospecting usually becomes 1–2 ad sets, not one per persona or angle.
   - **3–4 ads per ad set, maximum.** Read angles and hooks from `utm_content`, not from
     separate ad sets.
   - **Optimise for the real business conversion** — the event the primary KPI counts (e.g. a
     `subscription` custom conversion), not a generic Purchase or Lead. If that event does not
     exist yet, list it for `tracking-check` and the launch checklist.
3. **Audiences.** One per persona that the strategy targets: location, age, language, interests
   or keywords, exclusions. Add a retargeting audience only if the client has a pixel or list —
   check `intake.md`. Customer lists also seed lookalikes, not only exclusions.
   - **Retargeting / warm.** Starts only once the pool reaches a stated minimum (default
     1,000 people in the audience); give the expected start date from pixel-live date and
     traffic, and ramp budget in after it (reserve until then). Cover **every age band in
     scope**, not only the core band — warm users outside it are excluded from prospecting too.
   - **Audiences to create.** List every custom audience by its exact name, source, window, and
     who creates it when. `ads-export` fails any warm ad set whose audience is not on this list.
   - **Google Search.** Keyword themes, match types (phrase/exact for core), negatives. Drop
     terms with near-zero volume (Trends/autocomplete floor) and DIY or recipe intent; add
     "how to", "recipe", "diy", "homemade" negatives. One brand-name headline per RSA, plus
     sitelinks and callouts. State the rule for moving budget if Search under-delivers.
4. **Budget split.** Daily budget per ad set; respect platform minimums; hold back a stated
   reserve (default 20%) for scaling winners. Show the arithmetic.
5. **Test plan.** Each test changes **one variable** — hook, format, audience, or offer — with a
   hypothesis, the metric that decides it, the minimum spend or impressions before deciding, and
   what happens to the loser. Pull hypotheses from `playbook.md` first.
   - **One variable, checked.** Compare like with like: if B differs in anything besides the
     variable (size, ad mix, copy length), fix the cell or label the test directional.
   - **Winner rule.** A winner needs a ≥1.5× gap on the deciding metric (e.g. CAC) or p < 0.1
     at the planned sample. Anything less is reported as *directional*, never as a winner.
     Cells too small to read (≈1–2 conversions) are descriptive only.
   - **Hands off a running platform A/B test.** No pausing ads, budget shifts, or edits in the
     test's ad sets until its end date. CTR pauses and reserve moves apply after, or only
     outside the test.
6. **UTMs.** One row per ad per link in `utm-sheet.csv` using the naming in `CONVENTIONS.md`.
   Every URL resolves to a page that exists — check it.
7. **Gaps.** Any variant the test plan needs that the creative brief does not contain → raise
   `amend-brief` with `campaign-strategist`. Never ask a producer directly.

## Rules

1. **No launching, no spending.** This skill writes documents only.
2. **Every ad maps to a deliverable ID.** Nothing in the plan is unassigned creative.
3. **One variable per test.** Two changes at once make the result unreadable.
4. **No edits inside a running A/B test.** Pausing or moving budget mid-test voids it.

## Checklist

- [ ] Budget, flight, and platforms match `strategy.md`
- [ ] Every campaign objective matches a KPI
- [ ] One audience per ad set; exclusions written
- [ ] Each ad set's weekly optimisation events shown (~50 target); prospecting consolidated if not
- [ ] ≤4 ads per ad set; angles read from `utm_content`
- [ ] Optimisation event is the real business conversion, not a generic Purchase
- [ ] Retargeting: minimum pool size, start date, budget ramp, every age band in scope
- [ ] Every custom audience listed by exact name under *Audiences to create*
- [ ] Search: no near-zero-volume or DIY/recipe terms; "how to"/"recipe" negatives; brand headline; sitelinks and callouts
- [ ] Budget arithmetic shown, reserve held back
- [ ] Every test: one variable, hypothesis, deciding metric, minimum sample
- [ ] Winner rule ≥1.5× gap or p < 0.1, else directional; no mid-test pauses or budget moves
- [ ] Every ad mapped to a deliverable ID and variant
- [ ] UTM row for every ad link, per `CONVENTIONS.md`
- [ ] Missing variants raised through `amend-brief`

## Failure modes

- **Testing everything at once.** No winner can be named.
- **Audiences that overlap.** Ad sets bid against each other.
- **Budget spread too thin.** No ad set exits learning; nothing is decided.
- **Retargeting before there is anyone to retarget.** Spend goes to an empty or tiny pool —
  or, with the audience field blank, to a fourth broad prospecting set.
- **Calling a winner on noise.** 21 vs 28 conversions is not a result.
- **Optimising for the wrong event.** The algorithm finds one-off buyers when the goal is subscribers.
- **UTMs invented per ad by hand.** Reporting at C.9 cannot join results to creatives.

## Handoff

`ads-export` at C.5 once the copy, design, and video deliverables exist.
