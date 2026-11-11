---
name: tracking-check
description: Verify before launch that a campaign can be measured — the GA4 property and key events exist, every UTM link lands on a live page and registers, and the ad pixels are present on landing pages. Use at stage C.7, after brand review passes and before the approval pack. Read-only against analytics; never changes tracking configuration.
---

# Tracking check

**Stage:** C.7 · **Agent:** analytics-reporter
**Reads:** `campaigns/NN/strategy.md` (KPIs), `campaigns/NN/ads/utm-sheet.csv`,
`campaigns/NN/ads/plan.md`, `foundation/intake.md` (analytics access, pixels), `CONVENTIONS.md`
**Writes:** `campaigns/NN/tracking-check.md` (template: `templates/campaign-tracking-check.md`)

## Why before launch

A campaign that cannot be measured cannot be reported, and `close-campaign` then teaches the
playbook nothing. Tracking problems found after launch cost the whole flight's data. Found here,
they cost a message to the client's developer.

## Procedure

1. **GA4 access.** With the Google Analytics MCP (read-only), confirm the property ID from
   `intake.md` is reachable. No credentials or no access → stop; record it as a blocker and tell
   the human what access is needed.
2. **Key events.** For every KPI in `strategy.md` that is a conversion (lead, purchase, sign-up),
   confirm a matching key event exists in the property and has recorded events recently. A KPI
   with no event is a blocker.
3. **Links.** For every row in `utm-sheet.csv`, open the full URL with Playwright: it loads
   (2xx, no redirect that strips UTMs), the page is the intended one, and the UTM parameters
   survive in the final URL.
4. **Registration.** For a sample of links (at least one per platform), check GA4 realtime
   reports via the MCP for the visit with the expected `utm_campaign` and `utm_source`. Allow for
   delay; record what was and was not seen.
5. **Pixels.** On each distinct landing page, check with Playwright for the Meta Pixel
   (`connect.facebook.net` / `fbq`), Google tag (`googletagmanager.com` / `gtag`), and any other
   platform the plan uses — in network requests, not only in page source. Missing pixel on a paid
   platform's landing page is a blocker.
6. **Consent.** Note whether a consent banner blocks tags before consent, which changes what
   numbers mean.
7. **Write the verdict.** Every check: pass / fail / not checked, with evidence. Blockers get an
   owner — usually the client's web team, through `account-manager`.

## Rules

1. **Read-only.** Never create events, edit the property, or change tags.
2. **Not checked is not pass.** Record what could not be verified and why.

## Checklist

- [ ] GA4 property reachable, or blocker recorded
- [ ] Every conversion KPI has a key event with recent data
- [ ] Every UTM link loads and keeps its parameters
- [ ] At least one link per platform seen in realtime
- [ ] Pixels present in network requests for every paid platform
- [ ] Consent behaviour noted
- [ ] Verdict with blockers and owners

## Failure modes

- **Checking page source only.** A tag manager can load the pixel — or fail to.
- **Testing one link.** The broken one is the one you skipped.
- **Assuming the event exists because the client said so.** Check it has data.

## Handoff

Pass, or blockers accepted by the human → `approval-pack` at C.8. Tracking blockers go into the
approval pack so the client sees them before sign-off.
