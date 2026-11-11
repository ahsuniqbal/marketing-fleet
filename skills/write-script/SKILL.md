---
name: write-script
description: Write and lock video scripts for every video deliverable in the frozen creative brief — a 0–3 second hook, scene-by-scene VO, on-screen text, and visuals, a CTA, and a timing check that fits the duration. Use at stage C.4a, first, before write-copy, because video-producer cannot record voiceover until a script is locked.
---

# Write script

**Stage:** C.4a (first) · **Agent:** copywriter
**Reads:** `playbook.md`, `campaigns/NN/creative-brief.md`, `foundation/voice-guide.md`,
`foundation/brand-strategy.md`, `foundation/social-research.md` (top hooks),
`video/footage-log.md` if footage mode and it exists
**Writes:** `campaigns/NN/copy/scripts/<deliverable-id>.md` (template: `templates/campaign-script.md`)

## Why scripts go first

C.4 is parallel, but video has a dependency the others do not: voiceover is generated from a
locked script, and ElevenLabs credits are spent the moment it runs. Until a script is locked,
`video-producer` can only storyboard, log footage, and gather assets. Every hour the script is late
is an hour video waits.

## Procedure

1. **One script per video deliverable ID** in the creative brief. Variants (alternate hooks) live
   in the same file, not in new files.
2. **Hook first, 0–3 seconds.** The scroll decision happens here. Start from proven patterns in
   `social-research.md` and `playbook.md`; name which pattern you used. The hook works with sound
   off — on-screen text carries it alone.
3. **Scenes.** Each row: time range, VO, on-screen text, visual. On-screen text is short — read in
   the time on screen (about 3 words per second, never more than ~7 words per card).
4. **Footage mode.** In "Visual / shot", name the shot or the transcript line to pull. If
   `footage-log.md` exists, use its timestamps; if not, describe the shot so `edit-footage` can
   find it.
5. **CTA.** VO and on-screen text match the brief's CTA exactly.
6. **Timing check.** VO word count ÷ 2.5 words per second ≈ VO duration. It must fit the target
   duration with room for the hook beat and end card. Cut words — never ask for a longer video.
7. **Voice and claims.** Read every line against `voice-guide.md` banned words and the claims
   policy. Note pronunciation of brand and product names for the voiceover.
8. **Lock.** Set `Status: locked` and the date, then tell `video-producer` that the ID is ready
   for voiceover. After lock, changes only through `amend-brief` or a `fix-review` note.

## Checklist

- [ ] One file per video deliverable ID
- [ ] Hook lands in 0–3s and works with sound off
- [ ] Hook pattern named, with source
- [ ] Every scene has time, VO, on-screen text, visual
- [ ] On-screen text readable at ~3 words per second
- [ ] CTA matches the creative brief exactly
- [ ] Timing check fits the target duration
- [ ] No banned words; every claim allowed by the claims policy
- [ ] Pronunciation notes for brand and product names
- [ ] `Status: locked` with date; video-producer notified

## Failure modes

- **Slow hook.** Logo first, message at second five. The viewer is gone.
- **VO that does not fit.** 80 words in a 15-second reel; voiceover is regenerated and credits
  burn.
- **Sound-on dependence.** Most feed video plays muted.
- **Editing a locked script.** Video records against one version; review checks another.

## Handoff

Locked scripts → `video-producer` (`produce-video` or `edit-footage`). Then the copywriter moves on
to `write-copy`.
