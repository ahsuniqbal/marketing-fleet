---
description: Run Phase C for a launched campaign after its flight — report results against KPIs and fold the learnings into the client playbook.
argument-hint: <client> [campaign name or number, or blank for the most recently launched]
---

Run **Phase C — report and close** for: $ARGUMENTS

Blank campaign means the most recently launched campaign whose `approval/approval.md` records a
launch date and whose `summary.md` does not exist yet.

## Before starting

1. Confirm the flight has ended, or the user explicitly wants an interim report. An interim report
   is labeled interim and does **not** run C.10.
2. Check `campaigns/NN/ads/results/` for the Ads Manager / Google Ads exports. If missing, tell
   the user exactly which exports to download (columns, breakdowns, date range, attribution
   setting) and stop.

## Stages

| Stage | Agent | Skill | Output |
|---|---|---|---|
| C.9 | `analytics-reporter` | `campaign-report` | `report.md`, `report.html` |
| 🚦 | — | — | **STOP.** User reviews the report before it reaches the client. |
| C.10 | `analytics-reporter` | `close-campaign` | `summary.md`, updated `playbook.md` |

## Why C.10 is not optional

The next campaign's agents start at C.0 by reading the playbook. An unwritten learning means the
next campaign retests what this one already proved, and the playbook quietly stops being true.

## On completion

Report: primary KPI vs target, the top learnings added to the playbook, and the next campaign in
the roadmap.
