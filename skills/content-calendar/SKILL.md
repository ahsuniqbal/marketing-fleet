---
name: content-calendar
description: Build the campaign's content calendar as calendar.csv — every organic post and paid placement by date, platform, format, pillar, and hook, each tied to a deliverable ID. Use at stage C.2, alongside campaign-strategy. The CSV is the single source of truth; Notion or Sheets are optional views and nothing is ever auto-posted.
---

# Content calendar

**Stage:** C.2 · **Agent:** campaign-strategist
**Reads:** `campaigns/NN/strategy.md`, `campaigns/NN/brief.md`, `foundation/social-research.md`,
`playbook.md`, `CONVENTIONS.md`
**Writes:** `campaigns/NN/calendar.csv` (template: `templates/campaign-calendar.csv`)

The calendar decides how much gets made. Every row with a `deliverable_id` becomes a row in the
frozen creative brief and a unit of production work. A calendar written loosely here is the
reason a team runs out of time at C.4.

## Columns

| Column | Content |
|---|---|
| `date` | `YYYY-MM-DD`, in the agency timezone from CONVENTIONS; add `HH:MM` only when the slot matters |
| `platform` | lowercase, one per row: `instagram`, `facebook`, `tiktok`, `youtube`, `linkedin`, `google`, `x` |
| `format` | `reel`, `story`, `carousel`, `static`, `video`, `search`, `email` |
| `pillar` | a messaging pillar name from `brand-strategy.md` |
| `hook` | the working hook in a few words — copywriter writes the real one |
| `deliverable_id` | `<NN>-<format>-<seq>` per CONVENTIONS; empty only for reposts or community slots |
| `copy_ref` | `copy/<deliverable_id>.md` — filled when copy exists |
| `asset_ref` | path under `design/` or `video/renders/` — filled when the asset exists |
| `status` | `planned` → `in-production` → `in-review` → `approved` → `scheduled` → `published` |
| `notes` | paid/organic, boost plan, cross-post, anything else |

## Procedure

1. **Slots from strategy.** Posting frequency per platform from `strategy.md`; days and times from
   `social-research.md` best-posting data. Cite it in `notes` on the first row per platform.
2. **Format mix matches strategy.** Count rows per format; the shares must match `strategy.md`
   within one post. If they do not, change the calendar, not the strategy.
3. **Pillars rotate.** No pillar more than twice in a row on the same platform unless the strategy
   says so.
4. **Reuse before making.** One video cut to 9:16, 4:5, and 1:1 is one `deliverable_id` with three
   renders, not three deliverables. Cross-posts share an ID.
5. **Paid rows.** Paid placements get rows too, dated at flight start, `notes: paid`.
6. **Validate.** Every `date` falls inside the flight; every `platform` is in scope; every ID is
   unique per format and follows the naming rule. Open the CSV with a parser, not by eye.
7. **Optional view.** If the workspace uses Notion (CONVENTIONS "Optional tools"), sync the CSV
   into a Notion database for the client. The CSV stays authoritative; edits made in Notion are
   copied back to the CSV by hand, never the reverse by default.

## Never

- Post, schedule, or boost anything. Status `scheduled` and `published` are set by the human who
  did it.

## Checklist

- [ ] Header matches the template exactly
- [ ] All dates inside the flight, correct timezone
- [ ] Format shares match `strategy.md`
- [ ] Every `deliverable_id` follows CONVENTIONS naming and is reused for cross-posts
- [ ] Posting times cite `social-research.md`
- [ ] Paid placements included with `notes: paid`
- [ ] CSV parses cleanly (quoted commas, no stray line breaks)

## Failure modes

- **Calendar outgrows the budget.** Thirty deliverables on a five-deliverable production budget.
- **One ID per platform** for the same asset — triples production and review work.
- **Notion as the source of truth.** The spine and the client view diverge within a week.
- **Agent-set `published` status.** Nobody knows what actually went live.

## Handoff

With `campaign-strategy`: 🚦 user approves. Then `creative-brief` at C.3 lifts every
`deliverable_id` into the deliverables table.
