---
name: video-foundation
description: Scaffold a client's Remotion video project wired to tokens.json, with branded intro, outro, lower-third, and word-level caption compositions, and install whisper.cpp for transcription. Use at stage F.3c, after the brand kit, in parallel with design-templates.
---

# Video foundation

**Stage:** F.3c · **Agent:** video-producer
**Reads:** `foundation/brand-kit/` (tokens, logos, fonts, motion tokens),
`foundation/voice-guide.md` (voiceover direction), `CONVENTIONS.md` (fps, codec, loudness,
caption rules)
**Writes:** `clients/<client>/studio/video/`

Every video in every campaign — motion pieces and footage edits — is built from these
compositions. They carry the brand's motion, type, and caption style, so a reel made in month
six matches one made in month one.

## License note — tell the user

Remotion is free for individuals and companies of up to three people; larger companies need a
company license (remotion.dev/license). Record in `studio/video/README.md` which applies to this
workspace. If unknown, ask before scaffolding.

## Where tooling runs

Run every `npm`, `npx`, `remotion`, and `playwright` command from inside `studio/video/`
(`cd clients/<client>/studio/video` first, or `npm --prefix`). Never at the client root or the
workspace root: that leaves a stray `package-lock.json`, `node_modules/`, `.cache/`, and
`.remotion/` in `clients/<client>/`. All dependencies live in `studio/video/package.json`.

## Procedure

1. **Scaffold.** In `studio/video/`: `npx create-video@latest` with the blank TypeScript
   template. Pin the Remotion version; all `remotion` and `@remotion/*` packages must share it.
2. **Tokens.** `studio/video/src/tokens.ts` imports `../../../foundation/brand-kit/tokens.json`
   (three levels up: `src/` → `video/` → `studio/` → client). Load brand fonts with
   `@remotion/google-fonts` or `@remotion/fonts` from `brand-kit/fonts/`. No color, font, or
   timing literal elsewhere. Read tokens by their exact paths in `tokens.json` — durations are
   `motion.duration.fast`, `motion.duration.base`, `motion.duration.slow` (ms), easings are
   `motion.easing.standard|enter|exit`, logo reveal is `motion.logoReveal` — converted to frames
   with one helper (`msToFrames(ms, fps)`). There is no `motion.base`; type `tokens.ts` from the
   JSON so a wrong path fails the type check.
3. **Compositions**, each with typed props and registered in `Root.tsx` at 1080×1920, 1080×1080,
   and 1920×1080 (layout adapts per ratio):
   - `BrandIntro` — logo reveal, 1–2 s
   - `BrandOutro` — logo, CTA text prop, optional URL/handle, 2–3 s
   - `LowerThird` — name/title or key-point prop, enter and exit animations
   - `Captions` — word-level highlighted captions from a whisper.cpp transcript, styled from
     tokens, inside the safe zones in `CONVENTIONS.md`
   - `Template` — a sequence wrapper (intro → content slot → outro) that `produce-video` and
     `edit-footage` compose into
4. **Transcription.** Install whisper.cpp with `@remotion/install-whisper-cpp` and download a
   model (`medium.en` for English; a multilingual model if `CONVENTIONS.md` lists other
   languages). Add a script `scripts/transcribe.ts` that outputs word-level JSON for `Captions`.
5. **Audio defaults.** A helper that normalizes to the loudness target with ffmpeg `loudnorm`.
   Check `ffmpeg -version` exists; if not, stop and tell the user.
6. **Voice selection.** From the voice guide's voiceover direction, shortlist an ElevenLabs voice
   and a Kokoro fallback voice; record both IDs in `studio/video/README.md`. Do not generate
   ElevenLabs audio here — credits are for locked scripts only.
7. **Sample render.** Render `Template` with placeholder content in each ratio to
   `studio/video/samples/` for the client gate.

## Checklist

- [ ] License situation recorded
- [ ] All Remotion packages on one pinned version
- [ ] No style or timing literal outside `tokens.ts`; `tsc --noEmit` passes
- [ ] Every install and cache is inside `studio/video/`; nothing at the client root
- [ ] Brand fonts load in render, not just in preview
- [ ] Intro, outro, lower-third, captions, template — in all three ratios
- [ ] Captions respect safe zones
- [ ] whisper.cpp installed, transcribe script produces word-level JSON
- [ ] Voices shortlisted, no ElevenLabs credits spent
- [ ] Sample renders produced

## Failure modes

- **Mismatched Remotion package versions.** Renders fail in confusing ways.
- **Fonts missing at render time.** The preview looks right; the MP4 does not.
- **Captions under the platform UI.** Unreadable on TikTok and Reels.
- **Spending voiceover credits on samples.** The month's budget is gone before campaign 1.

## Handoff

🚦 Client approves the brand kit and templates (static and video samples together). Then
`campaign-roadmap` at F.4.
