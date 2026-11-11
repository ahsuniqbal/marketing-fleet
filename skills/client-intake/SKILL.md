---
name: client-intake
description: Turn client conversations, call notes, and existing material into a structured intake — business goals, audience, offer, budget, timeline, constraints, and do-nots — with assumptions and open questions flagged. Use at stage F.0, the first step of onboarding a new client, before any research.
---

# Client intake

**Stage:** F.0 · **Agent:** account-manager
**Reads:** client call notes or transcripts, emails, existing brand material, `CONVENTIONS.md`
**Writes:** `clients/<client>/foundation/intake.md` (template: `templates/client-intake.md`)

Every later stage — research, positioning, every campaign — inherits what is written here. A
wrong budget, a missed do-not, or an unstated goal is paid for on every campaign that follows.

## Procedure

1. **Create the client folder.** `clients/<client>/foundation/` and `clients/<client>/campaigns/`
   if absent. Copy the template.
2. **Collect what exists.** Call transcripts, notes, the website, current social handles, past ad
   accounts' results if shared, any brand book. List every source at the top of the intake.
3. **Separate said from inferred.** What the client **said** goes in the body. What you
   **inferred** goes in "Assumptions", flagged, so it can be corrected cheaply.
4. **Fill every section of the template:**
   - Business: what they sell, price points, margins if shared, how a sale happens
   - Goals: business goal (revenue, leads, bookings) and the marketing goal that serves it, with
     numbers and a date. "More awareness" is not a goal until it has a measure.
   - Audience as the client describes it — research will test this later
   - Offer and differentiators in the client's own words
   - Budget: total, monthly, and the split between ad spend and production, if known
   - Timeline: launch dates, seasonal peaks, blackout dates
   - Channels: current accounts, follower counts, what they have tried, what failed
   - Competitors the client names
   - Constraints and do-nots: words, claims, colors, competitors not to mention, regulated
     categories (health, finance, alcohol, children)
   - Assets available: logo files, fonts, photos, raw footage, testimonials
   - Access needed: GA4, ad accounts (read-only exports), social accounts — who grants it
   - Approvers: who signs off at each client gate
5. **Check scope against `CONVENTIONS.md`.** A platform the agency does not serve is an open
   question, not a silent addition.
6. **Write open questions** with options and what each implies. The human takes them to the
   client.

## Checklist

- [ ] Every source listed
- [ ] Goals have a number and a date
- [ ] Budget states ad spend and production separately, or says it is unknown
- [ ] Do-nots and regulated categories captured
- [ ] Assumptions separated from client statements
- [ ] Platforms checked against `CONVENTIONS.md`
- [ ] Approvers named for each client gate
- [ ] Open questions listed with implications

## Failure modes

- **Accepting vague goals.** "Grow the brand" produces campaigns nobody can judge.
- **Silent assumptions.** An assumed audience becomes a wrong positioning two stages later.
- **Missing do-nots.** The client finds the banned claim in a live ad.
- **Budget as one number.** Production cost hidden inside ad spend wrecks the media plan.

## Handoff

🚦 Client answers the open questions. Then `market-research` and `social-research` run in
parallel at F.1.
