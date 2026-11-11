---
name: campaign-strategy
description: Turn an approved campaign brief into a strategy — one SMART goal, measurable KPIs with baselines and targets, channel mix, budget split, format mix grounded in research, messaging per funnel stage, and the test hypothesis. Use at stage C.2, after the client approves the brief and alongside content-calendar.
---

# Campaign strategy

**Stage:** C.2 · **Agent:** campaign-strategist
**Reads:** `playbook.md`, `campaigns/NN/brief.md`, `foundation/research.md`,
`foundation/social-research.md`, `foundation/brand-strategy.md`, `CONVENTIONS.md`
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
3. **Channel mix.** For each platform in the brief: organic or paid, funnel role, budget, and why.
   The paid total equals the brief's media budget exactly.
4. **Format mix.** Shares per format, each justified by `social-research.md` engagement data or a
   playbook learning. This drives how many reels, carousels, and statics the creative brief asks
   for — and therefore production cost.
5. **Messaging map.** Per funnel stage: pillar from `brand-strategy.md`, angle, and proof. Proof
   must clear the claims policy.
6. **Test plan.** One primary hypothesis (hook, format, audience, or offer). Secondary tests only
   if budget can reach significance; a test the budget cannot power is noise. `ads-plan` turns
   this into ad sets.
7. **Playbook applied.** Every applicable learning, and how it shaped a decision above.
8. **Risks.** Seasonality, ad-policy risk for the category, creative fatigue, thin budget.

## Budget sanity

Rough check before approval: budget ÷ expected CPM (from playbook or research, labelled as an
estimate) gives reach. If reach per ad set is too small to exit a learning phase, cut ad sets —
do not spread thin.

## Checklist

- [ ] Exactly one SMART goal
- [ ] Every KPI has baseline, target, source, and is measurable from GA4 or Ads Manager
- [ ] Paid budget split sums to the brief's media budget
- [ ] Every platform is in CONVENTIONS scope and in the brief
- [ ] Format shares cite research or playbook
- [ ] Messaging map uses only pillars from `brand-strategy.md`
- [ ] Every proof point cleared against the claims policy
- [ ] One primary test hypothesis that the budget can power
- [ ] Playbook learnings applied and named
- [ ] Risks listed with mitigations

## Failure modes

- **KPIs nobody can measure.** "Brand love" without a survey. Rewrite or drop.
- **Budget spread across every platform.** No ad set exits learning; nothing is learned.
- **Format mix from habit.** Ignores the research the client paid for.
- **Five simultaneous tests.** None reaches significance; the report says "inconclusive" five times.
- **Numbers presented as facts.** Estimated CPMs and CTRs are labelled as estimates.

## Handoff

With `content-calendar` done: 🚦 user approves strategy and calendar. Then `creative-brief` at C.3.
