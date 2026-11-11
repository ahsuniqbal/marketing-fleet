---
name: creative-brief
description: Author and freeze the campaign's creative brief — message hierarchy, tone, visual direction, and a deliverables table keyed by deliverable ID with format, size, duration, message, CTA, owner, variants, and due date. Use at stage C.3, after strategy and calendar are approved. This document is what lets copy, design, video, and ads work in parallel.
---

# Creative brief

**Stage:** C.3 · **Agent:** campaign-strategist
**Reads:** `playbook.md`, `campaigns/NN/strategy.md`, `campaigns/NN/calendar.csv`,
`campaigns/NN/brief.md`, `foundation/brand-strategy.md`, `foundation/voice-guide.md`,
`foundation/brand-kit/brand-kit.md`, `studio/creatives/` and `studio/video/` template lists,
`CONVENTIONS.md`
**Writes:** `campaigns/NN/creative-brief.md` (template: `templates/campaign-creative-brief.md`)

## Why freeze

C.4 runs four agents at once: copywriter, graphic-designer, video-producer, performance-marketer.
They can only work in parallel if they agree on what is being made. The frozen deliverables table
is that agreement — the marketing equivalent of a frozen API contract. After the freeze, any
change goes through `amend-brief`. No exceptions, no "small tweaks" in chat.

## Procedure

1. **Lift every deliverable from the calendar.** Each unique `deliverable_id` in `calendar.csv`
   becomes one row. Add ad-only deliverables (search ads, extra paid variants) that have no
   organic slot. Nothing appears here that is neither scheduled nor in the ads plan.
2. **Fill every column.**
   - **Placement / size** — from CONVENTIONS "Creative sizes"; list every ratio to render
   - **Duration** — for video, in seconds; must suit the placement
   - **Message** — one line, from the message hierarchy
   - **CTA** — exact wording, or the copy field that will carry it
   - **Owner** — the producing agents; copy owner always listed for anything with words
   - **Variants** — what varies and how many (e.g. "3 headlines", "2 hooks"); this sets the A/B
     test surface `ads-plan` builds on
   - **Due** — leaves time before C.6 review for up to three review runs
3. **Message hierarchy.** Primary message, support points, proof, CTA. Proof cleared against the
   claims policy — anything not cleared is removed, not softened.
4. **Copy needs.** Per ID, the exact field keys from `templates/campaign-copy.md` the copywriter
   must deliver, and whether a script is needed.
5. **Video mode.** Per video ID: motion, footage, or hybrid; footage source and arrival date;
   voiceover yes/no. Footage that has not arrived blocks that ID — say so.
6. **Visual direction.** Name the existing templates to use. A new template is allowed only with a
   reason; it is built inside `produce-creatives` and goes in the playbook at close.
7. **Freeze.** Set `Frozen: <date>`, add an empty Changelog, get approval, and tell all four C.4
   agents the brief is frozen.

## Checklist

- [ ] Every calendar `deliverable_id` has exactly one row; no orphans either way
- [ ] Every size exists in CONVENTIONS "Creative sizes"
- [ ] Every row has owner, variants, and due date
- [ ] Message hierarchy has one primary message
- [ ] All proof cleared against the claims policy
- [ ] Copy field keys listed per deliverable
- [ ] Video mode and footage status listed per video deliverable
- [ ] Templates named; any new template justified
- [ ] `Frozen:` date set and Changelog section present
- [ ] All four C.4 agents notified

## Failure modes

- **Freezing with gaps.** "TBD" in a row means two agents guess differently.
- **No variants column.** `ads-plan` has nothing to test.
- **Due dates with no review time.** C.6 has up to three runs; plan for them.
- **Footage assumed.** Video blocked mid-C.4 waiting for client files.
- **Changing the brief in chat.** Use `amend-brief`.

## Handoff

🚦 Brief frozen. C.4 starts in parallel: `write-script` then `write-copy` (copywriter),
`produce-creatives` (graphic-designer), `produce-video` / `edit-footage` (video-producer),
`ads-plan` (performance-marketer).
