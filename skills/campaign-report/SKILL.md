---
name: campaign-report
description: Report a finished campaign's results against its KPIs — pull GA4 data and the ad platform exports the human provides, find winners and losers by creative, audience, format, and hook, and write an honest report plus a self-contained HTML version with charts for the client. Use at stage C.9, after the campaign's flight ends.
---

# Campaign report

**Stage:** C.9 · **Agent:** analytics-reporter
**Reads:** `campaigns/NN/strategy.md` (KPIs and targets), `ads/plan.md` (tests and hypotheses),
`ads/utm-sheet.csv`, `approval/approval.md` (launch date, changes at launch),
`tracking-check.md`, `campaigns/NN/ads/results/` (exports), GA4 via MCP, `playbook.md`
**Writes:** `campaigns/NN/report.md` (template: `templates/campaign-report.md`),
`campaigns/NN/report.html`

## Data comes from two places

- **GA4** (Google Analytics MCP, read-only): sessions, key events, and conversions by
  `utm_campaign`, `utm_source`, `utm_content` for the flight dates.
- **Ad platforms:** agents have no ads access. Ask the human to export from Ads Manager and
  Google Ads (ad-level, daily, the flight dates, with spend, impressions, reach, clicks, CTR,
  CPM, CPC, results, cost per result, and video metrics) into `ads/results/`. Missing exports →
  stop and ask; do not report spend from memory or estimates.

Join everything on ad name and `utm_content`, which carry deliverable IDs by convention.

## Procedure

1. **Check inputs.** Flight dates from `approval.md`; exports cover them; GA4 reachable. Note
   any gap.
2. **KPIs.** Each KPI in `strategy.md`: target, actual, delta, verdict (hit / missed / not
   measurable). Show the source of every number.
3. **Tests.** Each test in `ads/plan.md`: did it reach its minimum sample? If yes, the winner
   and by how much; if no, say "inconclusive" — never call a winner on thin data.
4. **Breakdowns.** Winners and losers by deliverable (creative), format (reel / static /
   carousel / search), hook, audience, and platform. Use cost per result and the KPI's own
   metric, not CTR alone.
5. **Discrepancies.** Platform-reported conversions vs GA4 rarely agree. Report both and the
   gap; explain the likely cause (attribution windows, consent, view-through).
6. **Insights.** Three to five, each with its evidence and a recommendation for the next
   campaign. These feed `close-campaign`.
7. **Write `report.md`** for the agency and **`report.html`** for the client: one self-contained
   file, inline SVG or a pinned-version chart library, brand tokens for styling, plain language,
   no stage or agent names.

## Honesty rules

1. **Missing data is stated, not filled.** "Not measurable — no key event existed" is a result.
2. **Inconclusive is a verdict.** Better than a false winner the playbook will repeat.
3. **No vanity framing.** Lead with the KPI the client agreed to, not the best-looking metric.

## Checklist

- [ ] Exports cover the full flight; GA4 reachable or gap noted
- [ ] Every KPI has target, actual, verdict, and source
- [ ] Every test has a minimum-sample check before a winner is named
- [ ] Breakdowns by creative, format, hook, audience, platform
- [ ] Platform vs GA4 discrepancy reported
- [ ] Insights each carry evidence and a recommendation
- [ ] `report.html` self-contained, opens from disk, client language

## Failure modes

- **CTR as the headline.** Cheap clicks that did not convert look like a win.
- **Calling tests early.** A 50-click "winner" becomes a playbook rule.
- **Averaging across platforms.** Hides the platform that carried the result.

## Handoff

`report.html` goes to `account-manager` for the client. `close-campaign` at C.10 folds the
insights into the playbook.
