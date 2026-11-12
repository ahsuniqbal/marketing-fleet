---
name: campaign-strategy
description: Turn an approved campaign brief into a strategy — one SMART goal, measurable KPIs with baselines and a bottom-up forecast range, a capacity check and unit economics, channel mix, budget split, format mix grounded in research, messaging per funnel stage, and the test hypothesis. Use at stage C.2, after the client approves the brief and alongside content-calendar.
---

# Campaign strategy

**Stage:** C.2 · **Agent:** campaign-strategist
**Reads:** `playbook.md`, `campaigns/NN/brief.md`, `foundation/intake.md` (margin, shipping,
capacity), `foundation/research.md`, `foundation/social-research.md`,
`foundation/brand-strategy.md`, `CONVENTIONS.md`
**Writes:** `campaigns/NN/strategy.md` (template: `templates/campaign-strategy.md`)

Strategy is where opinion becomes evidence. Every choice here — which platform, which format, how
much money — cites either research, the playbook, or an explicit hypothesis to be tested. "Reels
work" is not a reason; "reels drew 3.1× the engagement of statics across the five competitors in
`social-research.md`" is.

## Procedure

1. **One goal.** Turn the brief's objective and "success in the client's words" into a single
   SMART goal. Two goals means two campaigns.
2. **KPIs with baselines.** Primary KPI first. Each has a baseline (from GA4, past reports, or
   "none — first campaign"), a target, and a source. **Only KPIs measurable from GA4 or an Ads
   Manager export** — `tracking-check` fails anything else at C.7.
3. **Forecast, bottom-up.** Never set the target as budget ÷ CAC. Per paid channel: spend ÷ CPM
   → impressions × CTR → clicks (CPC) × landing-to-conversion rate → conversions (e.g.
   subscriptions). Low / base / high inputs, each sourced or labelled an estimate; a brand with no
   paid history uses the low end of benchmarks. Label the base case **realistic** and anything
   above it **stretch**. If the brief's target sits above the high case, say so before approval.
4. **Constraint check.** Test the high case against supply / production capacity and
   fulfilment for the whole flight and the months it feeds — counting **all** orders (paid,
   organic, one-off, existing subscribers), not just the paid target. Model when any cap binds.
   Capacity unknown → an open client question, not an assumption.
5. **Unit economics.** Margin net of shipping, fulfilment, and discounts (not gross margin); LTV
   (with the retention assumption stated); payback period; breakeven CAC; LTV:CAC at target and
   at maximum allowed CAC. Below ~3:1, flag it. Missing inputs → client question.
6. **Channel mix.** For each platform in the brief: organic or paid, funnel role, budget, and why.
   The paid total equals the brief's media budget exactly.
7. **Format mix.** Shares per format, each justified by `social-research.md` engagement data or a
   playbook learning. This drives how many reels, carousels, and statics the creative brief asks
   for — and therefore production cost.
8. **Messaging map.** Per funnel stage: pillar from `brand-strategy.md`, angle, and proof. Proof
   must clear the claims policy.
9. **Test plan.** One primary hypothesis (hook, format, audience, or offer). Secondary tests only
   if budget can reach significance; a test the budget cannot power is noise. One variable per
   test. Winner rule: ≥1.5× gap on the deciding metric (e.g. CAC) or p < 0.1 — anything less is
   *directional*. No pausing, budget shifts, or edits inside a running platform A/B test; any
   in-flight optimisation rule must exempt the test's ad sets until it ends. Optimise for the
   real business conversion (e.g. a subscription custom conversion), not a generic purchase.
   `ads-plan` turns this into ad sets.
10. **Playbook applied.** Every applicable learning, and how it shaped a decision above.
11. **Risks.** Seasonality, ad-policy risk for the category, creative fatigue, thin budget.

## Budget sanity

Rough check before approval: budget ÷ expected CPM (from playbook or research, labelled as an
estimate) gives reach. If reach per ad set is too small to exit a learning phase, cut ad sets —
do not spread thin. Then: each ad set's daily budget × 7 ÷ forecast CPA should approach ~50
optimisation events a week; if not, plan fewer ad sets.

## Checklist

- [ ] Exactly one SMART goal
- [ ] Every KPI has baseline, target, source, and is measurable from GA4 or Ads Manager
- [ ] Target comes from a bottom-up forecast (CPM → CTR → CPC → CVR), low/base/high, realistic vs stretch
- [ ] Target checked against capacity and fulfilment for the whole flight, all orders counted
- [ ] Unit economics: net margin, LTV, payback, breakeven CAC, LTV:CAC
- [ ] Unknown capacity or margin inputs raised as client questions
- [ ] Paid budget split sums to the brief's media budget
- [ ] Every platform is in CONVENTIONS scope and in the brief
- [ ] Format shares cite research or playbook
- [ ] Messaging map uses only pillars from `brand-strategy.md`
- [ ] Every proof point cleared against the claims policy
- [ ] One primary test hypothesis that the budget can power; one variable; winner rule ≥1.5× or p < 0.1
- [ ] No mid-test pauses or budget moves; optimisation event is the real business conversion
- [ ] Playbook learnings applied and named
- [ ] Risks listed with mitigations

## Failure modes

- **KPIs nobody can measure.** "Brand love" without a survey. Rewrite or drop.
- **Budget spread across every platform.** No ad set exits learning; nothing is learned.
- **Format mix from habit.** Ignores the research the client paid for.
- **Five simultaneous tests.** None reaches significance; the report says "inconclusive" five times.
- **Numbers presented as facts.** Estimated CPMs and CTRs are labelled as estimates.
- **Target = budget ÷ CAC.** A wish, not a forecast; it hides the conversion rate it needs.
- **A target the client cannot fulfil.** Supply caps checked against paid orders only bind early.
- **Gross margin as contribution.** Overstates LTV and the CAC the client can afford.

## Handoff

With `content-calendar` done: 🚦 user approves strategy and calendar. Then `creative-brief` at C.3.
