---
name: approval-pack
description: Assemble one self-contained client review page showing every campaign deliverable — images, playable videos, copy variants, the content calendar, and the ads plan summary — and an approval record for the client's sign-off and, later, the human launch date. Use at stage C.8, after tracking-check and before launch.
---

# Approval pack

**Stage:** C.8 · **Agent:** account-manager
**Reads:** `campaigns/NN/brief.md`, `creative-brief.md`, `calendar.csv`, `copy/`, `design/`,
`video/renders/`, `ads/plan.md`, `review-log.md`, `tracking-check.md`
**Writes:** `campaigns/NN/approval/index.html`, `campaigns/NN/approval/approval.md`
(template: `templates/campaign-approval.md`)

## Why one page

Clients approve what they can see in one place. Ten attachments over email produce ten partial
approvals and one forgotten deliverable. The page is also the record of exactly what was
approved.

## The page — `approval/index.html`

Self-contained: one HTML file, inline CSS, no external scripts, opened straight from disk.
Images and videos referenced by relative path (`../design/...`, `../video/renders/...`) so the
`approval/` folder is shared together with the campaign folder; if the human needs a single file
to email, offer to inline images as data URIs (videos stay as files).

Sections, in this order:

1. **Summary** — campaign goal, flight dates, budget, KPIs, in the client's language. No
   internal jargon (no stage numbers, no agent names).
2. **Deliverables** — one card per deliverable ID: the creative (image, or `<video controls>`
   per ratio), its copy variants, platform and placement, a checkbox-style "approve / change"
   line for the client to reply against.
3. **Content calendar** — `calendar.csv` as a readable table, grouped by week.
4. **Paid plan** — platforms, budget split, audiences in plain words, what is being tested.
5. **Open items** — any tracking blockers from `tracking-check.md`, any deferred review entries,
   any decision the client must make.

Use brand tokens for the page's own styling so it looks like the client's brand.

## The record — `approval/approval.md`

- Version of the pack (date + git commit) sent to the client
- Per deliverable: approved / change requested / rejected, and the client's words
- Sign-off: name, role, date, channel (email, call, message)
- **Launch** — filled later by the human: date launched, who launched, platforms, any change from
  the approved pack

## Procedure

1. Confirm `review-log.md` verdict is pass and `tracking-check.md` is pass or its blockers are
   accepted by the human. If not, stop.
2. Build the page; open it with Playwright and check every image and video loads.
3. Write `approval.md` with every deliverable pending.
4. Hand to the human to send. **Never send it to the client yourself.**
5. When feedback arrives, record it verbatim. Change requests go back to C.4 through
   `amend-brief` (scope change) or `fix-review` (correction) — then a new pack version.

## Checklist

- [ ] Review pass; tracking pass or blockers accepted
- [ ] Every deliverable ID on the page, every ratio
- [ ] Every media file loads when the page is opened locally
- [ ] No internal jargon
- [ ] Open items listed
- [ ] `approval.md` version recorded, all deliverables pending
- [ ] Sent by a human, not by an agent

## Failure modes

- **Showing one ratio.** The client approves the 1:1 and objects to the 9:16 after launch.
- **Approval by silence.** No recorded sign-off is no sign-off.
- **Editing after approval without a new version.** What launched is not what was approved.

## Handoff

Client signs off → a human follows `ads/launch-checklist.md` and records the launch in
`approval.md`. After the flight, `/report` runs `campaign-report` at C.9.
