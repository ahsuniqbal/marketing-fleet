---
name: campaign-roadmap
description: Turn the client's goals, budget, seasonality, and research into an ordered campaign queue with a reason for each position, and seed the client's playbook — the learning ledger every campaign reads first. Use at stage F.4, the last step of onboarding, after the brand kit is approved.
---

# Campaign roadmap

**Stage:** F.4 · **Agents:** account-manager + campaign-strategist
**Reads:** every file in `foundation/`, `CONVENTIONS.md`
**Writes:** `clients/<client>/foundation/roadmap.md` (template: `templates/client-roadmap.md`),
`clients/<client>/playbook.md` (template: `templates/client-playbook.md`)

Campaigns run one at a time, and each one starts from what the previous one learned. The order
therefore matters: early campaigns should produce the learnings and assets that later, larger
campaigns depend on.

## Who does what

- **account-manager** owns the business side: goals, dates, budget, what the client asked for.
- **campaign-strategist** owns the sequencing logic and the hypotheses.
Neither overrides the other silently — disagreements go in open questions.

## Procedure

1. **List candidate campaigns** from the intake goals, seasonal dates, launches, and the
   opportunities in research. Each: objective, primary persona, pillar, platforms, rough budget,
   rough window.
2. **Order the queue.** Typical logic, overridden by hard dates:
   - Fixed dates first (launches, seasonal peaks, events)
   - Learning before scale — a smaller test campaign that answers "which pillar/format/audience
     wins" before the big-budget one that depends on the answer
   - Foundation content before conversion — awareness and retargeting pools before offers that
     need them
   - Asset reuse — campaigns whose creatives later campaigns can recycle go earlier
3. **Write a reason for every position** and the hypothesis each campaign tests. "Because the
   client asked" is allowed as a reason, and is written down as such.
4. **Budget check.** Sum of campaign budgets against the intake budget, per month. Overruns are
   an open question.
5. **Write `roadmap.md`** with an `order:` list of campaign slugs — `/campaign` reads this list —
   and `NN` numbers assigned in that order.
6. **Seed `playbook.md`** from the template: fill "Starting hypotheses" from research and the
   roadmap, "Voice notes" from the voice guide's key rules, and "Templates and assets" with the
   templates and compositions built at F.3. Learnings sections stay empty until the first
   `close-campaign`.

## Checklist

- [ ] Every intake goal served by at least one campaign
- [ ] Hard dates respected
- [ ] A reason and a hypothesis for every position
- [ ] Monthly budget totals checked against intake
- [ ] `order:` list present and numbered
- [ ] Platforms limited to those in `CONVENTIONS.md`
- [ ] `playbook.md` seeded: hypotheses, voice notes, templates
- [ ] Open questions listed

## Failure modes

- **Biggest campaign first.** The largest budget is spent before anything is learned.
- **No hypotheses.** Campaigns finish and the playbook has nothing to record.
- **Budget over intake.** Discovered in month three instead of at onboarding.
- **Unseeded playbook.** Campaign 1's agents start from nothing.

## Handoff

🚦 Client approves the campaign queue. Onboarding is complete; `/campaign` runs the first entry
in `order:`.
