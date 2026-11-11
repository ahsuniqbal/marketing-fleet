---
name: amend-brief
description: Change a frozen creative brief safely when a production agent hits a genuine blocker — assess impact on every deliverable and agent, log the amendment, and notify everyone affected. Use during stage C.4 or C.6 whenever copy, design, video, or ads cannot proceed within the brief as written. The only sanctioned way to change a frozen creative brief.
---

# Amend brief

**Stage:** C.4–C.6, on demand · **Agent:** campaign-strategist
**Reads:** the blocker, `campaigns/NN/creative-brief.md`, `strategy.md`, `calendar.csv`,
`ads/plan.md` if it exists
**Writes:** the amendment plus a Changelog entry in `creative-brief.md`; `calendar.csv` if a
deliverable is added, removed, or moved

## Why this exists

A frozen brief lets four agents work in parallel. The freeze is only credible if there is a
sanctioned way to change it. Without one, the copywriter rewrites the CTA in chat, the designer
never hears, the ads plan ships the old one, and review finds three versions of the truth.

**Any change to a frozen brief goes through here. There are no small exceptions.**

## Procedure

1. **State the blocker precisely.** What was attempted, what the brief says, why it cannot be
   done. "It would look better" is a preference — the answer is no. Real blockers: the message
   does not fit the placement's copy limit; the claim fails the claims policy; client footage did
   not arrive or is unusable; a size is not accepted by the platform; the script cannot fit the
   duration; the client changed the offer.
2. **Try alternatives first.** Can a variant, a different template, or a different copy field
   solve it inside the brief? Is the strategy the real problem? Amending is the last option.
3. **Assess blast radius.** Which deliverable IDs, which agents, which work already done — copy
   written, renders made, voiceover spent (credits are not refundable), ad rows exported.
4. **Classify:**
   - **Additive** — new variant, new ratio of an existing ID. Low risk.
   - **Modifying** — changed message, CTA, duration, or size. Every owner of that ID re-works.
   - **Removing / replacing** — dropped or swapped deliverable. Update `calendar.csv` and the
     ads plan.
   - **Script change after lock** — modifying, and flags that voiceover must be redone.
5. **Write the Changelog entry:**

   ```markdown
   ### 2026-11-20 — 03-reel-01 CTA changed to "Book a free trial"
   **Requested by:** copywriter
   **Reason:** client replaced the discount offer with a free trial on 2026-11-19
   **Type:** modifying
   **Affects:** 03-reel-01, 03-static-02, ads/plan.md ad set B, locked script 03-reel-01 (VO redo)
   **Notified:** copywriter, graphic-designer, video-producer, performance-marketer
   ```

6. **Update the brief body** — deliverables table, message hierarchy, copy needs — and
   `calendar.csv` if rows change.
7. **Notify every affected agent** with their specific action. Notify `brand-reviewer` if C.6 has
   started.
8. **Re-freeze** with a new date.

## Checklist

- [ ] Blocker is a real impossibility, not a preference
- [ ] Alternatives considered and recorded
- [ ] Blast radius covers copy, design, video, ads, and spent voiceover credits
- [ ] Change classified
- [ ] Deliverables table and calendar updated together
- [ ] Changelog entry complete
- [ ] Every affected agent notified with their action
- [ ] Re-frozen with a new date

## Failure modes

- **Amending for taste.** The freeze stops meaning anything.
- **Updating the brief but not the calendar.** Production and schedule diverge.
- **Notifying one agent.** Guarantees the mismatch the freeze exists to prevent.
- **Unlocking a script silently.** Voiceover gets recorded twice, or not at all.

## Handoff

Affected agents resume against the amended brief. `brand-reviewer` reads the Changelog first at C.6.
