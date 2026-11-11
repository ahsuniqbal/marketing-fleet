---
name: produce-video
description: Produce a campaign's motion videos from locked scripts — storyboard, stock assets, voiceover, word-level captions, a Remotion composition built from the brand kit, and loudness-normalised renders in every ratio the creative brief asks for. Use at stage C.4c for script-driven video with no client footage. For client-shot footage use edit-footage.
---

# Produce video

**Stage:** C.4c · **Agent:** video-producer
**Reads:** `campaigns/NN/creative-brief.md`, `campaigns/NN/copy/scripts/<id>.md` (locked),
`foundation/brand-kit/tokens.json`, `foundation/brand-kit/brand-kit.md`,
`foundation/voice-guide.md`, `playbook.md`, `CONVENTIONS.md` (render settings, sizes, budgets)
**Writes:** `campaigns/NN/video/storyboard.md` (template: `templates/campaign-storyboard.md`),
`studio/video/src/campaigns/NN/<id>.tsx`, `campaigns/NN/video/renders/<id>-<ratio>.mp4` + `.srt`,
`campaigns/NN/video/assets.md` (every stock asset, its source URL, and its license)

## Why this is built in code

The video is a Remotion composition, not a timeline in an editor. That means it reads the same
`tokens.json` the static creatives read, re-renders in every ratio from one source, and can be
changed by `fix-review` without starting over. A colour or font that is not a token is a defect,
not a style choice.

## Before starting

- Only work deliverables the creative brief assigns to `video-producer` with mode `motion`. A `hybrid` deliverable uses this skill for the motion parts and `edit-footage`
  for the client footage, assembled in one composition.
- The script must be **locked** — its header says `Status: locked`. Until then, storyboard and
  gather assets only. Never record final voiceover against an unlocked script.
- Read `playbook.md` for hook lengths, pacing, and caption styles that have already won or lost.

## Procedure

1. **Storyboard.** One row per scene: timecode, duration, visual, on-screen text, VO line,
   asset source, transition. The total matches the duration in the creative brief to the second.
   The first 3 seconds carry the hook from the script — no logo-first openings unless the brief
   says so.
2. **Gather assets.** Stock footage and music from Pexels / Pixabay (`PEXELS_API_KEY`,
   `PIXABAY_API_KEY`). Download into `studio/video/public/campaigns/NN/`. Record each in
   `video/assets.md` with URL, creator, and license. No asset without a recorded license.
3. **Draft voiceover.** For timing, use Kokoro TTS or macOS `say -o draft.aiff`. Drafts never use
   ElevenLabs credits.
4. **Final voiceover.** On a locked script, generate with the ElevenLabs MCP using the voice named
   in `brand-kit.md` (or ask). Before the call, count characters and log them in
   `video/assets.md` under **ElevenLabs usage** with the running monthly total. If the call would
   exceed the free ~10k characters/month, or no key is set, stop and offer Kokoro as the fallback
   — record which was used.
5. **Captions.** Transcribe the final VO with whisper.cpp (`@remotion/install-whisper-cpp`) for
   word-level timestamps. Fix spellings of brand and product names against `voice-guide.md`.
   Export `.srt` and feed the same data to the `Captions` component.
6. **Compose.** Build `<id>.tsx` in `studio/video` from the components `video-foundation`
   created — `BrandIntro`, `BrandOutro`, `LowerThird`, `Captions` — and values from `tokens.json`
   only. Register one composition per ratio (9:16, 1:1 or 4:5, 16:9 as the brief requires). Keep
   text inside the safe zones in `CONVENTIONS.md`.
7. **Render.** `npx remotion render <CompositionId> ../../campaigns/NN/video/renders/<id>-<ratio>.mp4`
   at the fps and codec in `CONVENTIONS.md`.
8. **Normalise loudness.** `ffmpeg -i in.mp4 -af loudnorm=I=-14:TP=-1.5:LRA=11 -c:v copy out.mp4`
   (target per `CONVENTIONS.md`). Replace the render with the normalised file.
9. **Self-check by eye.** Extract frames every 2 seconds plus the first and last frame
   (`ffmpeg -i <file> -vf fps=1/2 video/frames/<id>/%03d.png`) and look at them: tokens, safe zones,
   caption legibility, no cut-off text, logo correct. Fix before handoff.

## Checklist

- [ ] Script locked before final VO
- [ ] Storyboard duration matches the brief
- [ ] Hook in the first 3 seconds
- [ ] Every stock asset in `assets.md` with license
- [ ] ElevenLabs characters logged; fallback recorded if used
- [ ] Captions word-timed, brand names spelled right, `.srt` delivered
- [ ] Only tokens — no hardcoded colour, font, or spacing
- [ ] Every ratio in the brief rendered, named `<id>-<ratio>.mp4`
- [ ] Loudness normalised
- [ ] Frames reviewed by eye

## Failure modes

- **Voiceover before the script is locked.** Credits spent twice, and the free tier is small.
- **One ratio cropped into the others.** A 16:9 centre-crop to 9:16 cuts text and faces. Lay out
  each ratio.
- **Unlicensed music.** The ad gets muted or taken down after launch.
- **Captions copied from the script, not the audio.** They drift from what is said.
- **Hardcoded brand values.** `brand-review` fails it, and the next brand-kit change misses it.

## Handoff

Renders and `.srt` files go to `performance-marketer` for `ads-export` and to `brand-reviewer`
for `brand-review` at C.6.
