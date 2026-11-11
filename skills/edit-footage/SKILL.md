---
name: edit-footage
description: Edit client-shot raw footage into campaign videos — proxies, transcript, scene detection, a logged footage sheet, a paper edit as an edit decision list, audio cleanup, Remotion assembly with brand elements, subject-tracked reframing to vertical, and final renders. Use at stage C.4c when the creative brief marks a deliverable as mode footage or hybrid. Never modifies raw files.
---

# Edit footage

**Stage:** C.4c · **Agent:** video-producer
**Reads:** `campaigns/NN/creative-brief.md`, `campaigns/NN/video/raw/`,
`campaigns/NN/copy/scripts/<id>.md` (if the brief gives one), `foundation/brand-kit/`,
`playbook.md`, `CONVENTIONS.md`
**Writes:** `campaigns/NN/video/footage-log.md` (template: `templates/campaign-footage-log.md`),
`campaigns/NN/video/edl.json` (template: `templates/campaign-edl.json`),
`studio/video/src/campaigns/NN/<id>.tsx`, `campaigns/NN/video/renders/<id>-<ratio>.mp4` + `.srt`

## Text-based editing

You cannot scrub a timeline, so the edit is made on paper: the footage is transcribed, logged,
and cut by choosing lines and shots, then assembled in code from an edit decision list. The EDL is
the edit. Anyone can read it, `brand-reviewer` can cite it, and `fix-review` can change one line
of it without redoing the rest.

## Rules

1. **Raw is read-only.** `video/raw/` is gitignored and never written to. Heavy derivatives go to
   `video/proxies/` and `video/frames/` (gitignored); small JSON — transcripts and reframe paths —
   goes to `video/transcripts/` and `video/reframe/` and is committed.
2. **Every cut traces to the log.** An EDL entry names a clip and timestamps that exist in
   `footage-log.md`.

## Procedure

1. **Ingest.** List every file in `video/raw/` with `ffprobe` — duration, resolution, fps, audio
   channels. A missing or corrupt file stops the stage; tell the human which.
2. **Proxies.** `ffmpeg -i raw/<f> -vf scale=-2:540 -c:v libx264 -crf 28 -c:a aac proxies/<f>.mp4`.
   All analysis runs on proxies; the final render uses the originals.
3. **Transcribe.** whisper.cpp on each clip's audio, word-level timestamps, to
   `video/transcripts/<f>.json`.
4. **Detect scenes.** `ffmpeg -i proxy -vf "select='gt(scene,0.3)',showinfo" -f null -` and
   extract one frame per scene to `video/frames/<f>/`.
5. **Log.** Look at the frames and read the transcripts. Fill `footage-log.md`: clip, in, out,
   what is said or shown, quality (focus, exposure, framing, audio), usable yes/no, and why.
6. **Paper edit.** Against the script or the brief's message, pick lines and shots. Write
   `edl.json`: order, clip, in, out, purpose (hook / proof / CTA / b-roll), and any text overlay.
   Total duration matches the brief.
7. **Clean audio.** Find silences (`silencedetect=n=-35dB:d=0.4`) and filler words ("um", "uh",
   false starts) from the transcript; tighten the EDL around them. Normalise loudness with
   `loudnorm` per `CONVENTIONS.md`.
8. **Assemble.** In `studio/video`, build `<id>.tsx` that maps the EDL to `<OffthreadVideo>`
   sequences with `startFrom`/`endAt`, plus `BrandIntro`, `BrandOutro`, `LowerThird`, and
   `Captions` from `video-foundation`. Tokens only.
9. **Reframe.** For 9:16 and 4:5 from 16:9 footage, track the subject with MediaPipe
   (`pip install mediapipe`; face or pose detection on proxy frames), smooth the centre path, and
   write per-frame crop offsets to `video/reframe/<clip>.json`. The composition reads it. Never a
   blind centre crop.
10. **Captions and render.** Captions from the edited transcript; `npx remotion render` each
    ratio; export `.srt`.
11. **Self-check.** Extract frames every 2 seconds and look: subject in frame after reframe, no
    jump cuts mid-word, captions inside safe zones, brand elements correct.

## Checklist

- [ ] Raw files untouched; derivatives in proxies/, frames/, transcripts/, reframe/
- [ ] Every clip probed, proxied, transcribed, scene-split
- [ ] `footage-log.md` covers every clip with a usable verdict
- [ ] `edl.json` entries all trace to the log; duration matches the brief
- [ ] Silences and fillers cut; loudness normalised
- [ ] Reframe uses subject tracking, smoothed
- [ ] Every ratio rendered with `.srt`
- [ ] Frames reviewed by eye

## Failure modes

- **Centre-crop reframing.** The speaker leaves the frame and the ad looks amateur.
- **Cutting mid-word.** Timestamps from the transcript need a few frames of handle.
- **Editing on originals.** Slow, and one bad command destroys footage the client cannot reshoot.
- **Logging only the "good" takes.** The next campaign needs to know what else was shot.

## Handoff

Renders go to `performance-marketer` and `brand-reviewer` at C.6. Unused but usable shots stay in
the footage log; `close-campaign` lists them in the summary for reuse.
