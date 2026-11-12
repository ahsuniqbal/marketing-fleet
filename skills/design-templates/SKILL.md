---
name: design-templates
description: Build a client's base creative templates as React components driven by props (headline, body, image, cta) and styled only from tokens.json — one per placement in CONVENTIONS — plus a preview page, ready to render to high-res PNG with Playwright. Use at stage F.3b, after the brand kit, in parallel with video-foundation.
---

# Design templates

**Stage:** F.3b · **Agent:** graphic-designer
**Reads:** `foundation/brand-kit/` (tokens, logos, fonts, rules),
`foundation/social-research.md` (format mix), `CONVENTIONS.md` (creative sizes, render settings)
**Writes:** `clients/<client>/studio/creatives/`

Every static creative in every campaign is an instance of these templates. Building them once,
from tokens, is what makes campaign 7 look like campaign 1 — and what makes producing forty
sizes a render instead of forty designs.

## Project shape

```
studio/creatives/
  package.json          react, react-dom, vite; playwright as a dev dependency
  src/
    tokens.ts           imports ../../../foundation/brand-kit/tokens.json — the only style source
    templates/          one component per template
    preview.tsx         renders every template, every size, with sample props
    render.tsx          route /render?template=&size=&props=<json> — one creative, no chrome
  README.md             how to add a template, how to render
```

Static PNGs are produced by `skills/produce-creatives/scripts/render-stills.mjs` at the scale in
`CONVENTIONS.md` (2x default, 3x for hero/print). The render route must therefore show exactly
one creative at the exact pixel size, on a transparent-free background, with fonts loaded before
the page signals ready (`document.fonts.ready`).

## Where tooling runs

Run every `npm`, `npx`, `remotion`, and `playwright` command from inside `studio/creatives/`
(`cd clients/<client>/studio/creatives` first, or `npm --prefix`). Never at the client root or the
workspace root: that leaves a stray `package-lock.json`, `node_modules/`, `.cache/`, and
`.remotion/` in `clients/<client>/`. All dependencies live in `studio/creatives/package.json`.

## Procedure

1. **Scaffold** with Vite (React + TypeScript). Keep dependencies minimal.
2. **Tokens module.** Import `tokens.json`; export typed accessors. No color, font, size, or
   spacing literal anywhere else in `src/`.
3. **Templates, driven by the format mix.** At minimum:
   - `SingleImage` — image, headline, optional body, CTA, logo
   - `TextOnly` — quote/statement post
   - `CarouselSlide` — cover, content, and end-card variants
   - `Story` — 9:16 with safe zones from `CONVENTIONS.md` enforced
   - `Banner` — display sizes, if paid display is in scope
   Each takes props `{ headline, body?, image?, cta?, variant? }` and a `size` from
   `CONVENTIONS.md`. Layout adapts per size; it does not just scale.
4. **Text fitting.** Long headlines shrink within the type scale, then wrap; never overflow or
   go below the minimum size. Log a warning when copy does not fit.
5. **Images.** `object-fit: cover` with a focal-point prop; overlays from `color.overlay` to keep
   text contrast AA.
6. **Preview page.** Every template at every size with short, long, and missing-image sample
   props, so the client gate shows edge cases, not just the happy path.
7. **Render a sample set** with the render script and put the PNGs in
   `studio/creatives/samples/` for the client gate.

## Checklist

- [ ] No style literal outside `tokens.ts`
- [ ] Every install and cache is inside `studio/creatives/`; nothing at the client root
- [ ] A template for every format in the recommended mix
- [ ] Every size in `CONVENTIONS.md` that is in scope
- [ ] Story safe zones enforced
- [ ] Text fitting handles long copy without overflow
- [ ] Text over images meets AA contrast
- [ ] Render route shows one creative at exact size, fonts loaded
- [ ] Preview covers short, long, and missing-image props
- [ ] Sample PNGs rendered at 2x

## Failure modes

- **Hardcoded hex values.** The brand changes and half the templates do not.
- **Scaling instead of re-laying-out.** A 1:1 layout squashed into 9:16 under the UI chrome.
- **Fonts not loaded before capture.** PNGs render in a fallback font.
- **Happy-path previews.** The client approves a template that breaks on the first real headline.

## Handoff

🚦 Client approves the brand kit and templates. `produce-creatives` uses these on every
campaign; new templates are added there only when the creative brief needs a format that does
not exist.
