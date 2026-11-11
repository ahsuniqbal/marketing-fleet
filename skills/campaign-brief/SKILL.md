---
name: campaign-brief
description: Turn the next roadmap campaign plus fresh client input into an approved campaign brief — objective, audience, offer, mandatories, budget, flight, and the playbook learnings that apply. Use at stage C.1, the first step of every campaign loop, before any strategy work.
---

# Campaign brief

**Stage:** C.1 · **Agent:** account-manager
**Reads:** `clients/<client>/playbook.md` (first, always), `foundation/roadmap.md`,
`foundation/intake.md`, `foundation/brand-strategy.md`, new client input for this campaign
**Writes:** `clients/<client>/campaigns/NN-<slug>/brief.md` (template: `templates/campaign-brief.md`)

The brief is the client's truth for one campaign. Everything downstream — strategy, the frozen
creative brief, every asset — is measured against it. A vague brief does not save time; it moves
the argument to approval day, when every asset already exists.

## Procedure

1. **Read the playbook first.** Copy every learning that applies into "Learnings from the
   playbook", with its source campaign. A brief that ignores a known failure is a brief that
   repeats it.
2. **Pick the campaign.** Next unshipped entry in `roadmap.md`, unless the user names one. Create
   `campaigns/NN-<slug>/` with `NN` matching its roadmap position.
3. **Separate said from inferred.** What the client stated goes in the body. What you inferred is
   flagged as an assumption, so it is cheap to correct.
4. **Pin the hard facts.** Media budget, production budget, currency, flight dates, platforms.
   Every platform must appear in CONVENTIONS "Platforms in scope" — if not, it is an open question,
   not a silent addition.
5. **One message.** Write the single most important message. If the client wants three, record
   them and ask which one wins; the creative brief can only lead with one.
6. **Proof inventory.** List every claim the client wants to make and the proof behind it. Check
   each against the claims policy in `brand-strategy.md`. Unproven claims go to open questions.
7. **Mandatories and avoids.** Legal lines, partner marks, product shots, banned topics, and any
   client-supplied footage — with where it lives and when it arrives. `video-producer` needs that
   to choose motion or footage mode.
8. **Success in the client's words.** Quote it. `campaign-strategy` turns it into KPIs; do not
   invent numbers here.
9. **Out of scope.** Write it. Unwritten exclusions become extra deliverables at C.4.

## Checklist

- [ ] `playbook.md` read; applicable learnings listed with source
- [ ] Campaign folder created with the correct `NN`
- [ ] Objective in business terms, not channel terms
- [ ] Personas named from `research.md`, not invented
- [ ] Budgets, currency, flight, and platforms filled — no `TBD`
- [ ] Every platform is in scope per CONVENTIONS
- [ ] Single most important message chosen
- [ ] Every claim has proof or is an open question
- [ ] Client-supplied assets listed with location and arrival date
- [ ] Out of scope written
- [ ] Open questions listed with implications

## Failure modes

- **Skipping the playbook.** The loop stops compounding and campaign 7 repeats campaign 2's mistake.
- **Three primary messages.** Produces assets that say nothing; the creative brief cannot freeze.
- **Budget "to be confirmed".** Strategy cannot split a number that does not exist.
- **Silent platform additions.** The client asks for TikTok; the agency does not serve it. Ask.
- **Inventing KPIs.** That is `campaign-strategy`'s job, with baselines.

## Handoff

🚦 Client approves the brief — record name and date in the header. Then `campaign-strategy` and
`content-calendar` at C.2.
