---
name: produce-creatives
description: Produce every static deliverable in the frozen creative brief — feed posts, carousels, stories, banners — from the client's studio/creatives React templates and design tokens, with licensed stock imagery, rendered by Playwright at 2x (3x for hero assets), plus a contact sheet for review. Use at stage C.4b, in parallel with copy, video, and ads planning.
---

# Produce creatives

**Stage:** C.4b · **Agent:** graphic-designer
**Reads:** `playbook.md`, `campaigns/NN/creative-brief.md`, `campaigns/NN/copy/<id>.md`,
`foundation/brand-kit/tokens.json`, `foundation/brand-kit/brand-kit.md`, `studio/creatives/`,
`CONVENTIONS.md` (sizes, render settings, optional tools)
**Writes:** `campaigns/NN/design/<deliverable-id>/*.png`, `design/<deliverable-id>/assets.md`
(sources and attribution), `design/contact-sheet.html`, `design/render-manifest.json`

## Rules

- **Templates and tokens only.** Every creative is a template from `studio/creatives/src/templates/`
  fed with props. No hardcoded color, font, size, or spacing. Style values come only through
  `studio/creatives/src/tokens.ts`, which resolves the `{color.palette.x}` alias references in
  `tokens.json` — never read raw `tokens.json` values directly, or you get unresolved aliases. A
  needed value that is not a token is a question for the brand kit, not a local hex code.
- **Copy is not edited here.** On-screen text comes from `copy/<id>.md` exactly. If it does not
  fit, raise it — `fix-review` or `amend-brief` — do not shorten it yourself.
- **Free stock first.** Pexels, Unsplash, or Pixabay APIs. Optional tools — Figma, Canva, AI
  images — only if CONVENTIONS lists them as enabled. AI never generates text or logos.

## Where tooling runs

Run every `npm`, `npx`, `remotion`, and `playwright` command from inside `studio/creatives/`
(`cd clients/<client>/studio/creatives` first, or `npm --prefix`). Never at the client root or the
workspace root: that leaves a stray `package-lock.json`, `node_modules/`, `.cache/`, and
`.remotion/` in `clients/<client>/`. All dependencies live in `studio/creatives/package.json`.

## Procedure

1. **List the work.** Every static ID in the creative brief owned by graphic-designer, with all
   its sizes and variants. One ID × sizes × variants = the render count. Say it up front.
2. **Pick templates.** Use the template named in the brief (`SingleImage`, `TextOnly`,
   `CarouselSlide`, `Story`, `Banner`, or any added since). If a new layout is truly needed, build
   it as a new component in `studio/creatives/src/templates/` following `design-templates`
   (props `{ headline, body?, image?, cta?, variant? }`, tokens via `tokens.ts`, registered with
   the `/render` route), and flag it for the playbook — do not one-off it inside a campaign folder.
3. **Imagery.** Search stock APIs with the brief's imagery direction (`PEXELS_API_KEY`,
   `UNSPLASH_ACCESS_KEY`, `PIXABAY_API_KEY`). Download the largest size. Record in
   `assets.md`: provider, URL, photographer, license, and any required attribution. Missing key →
   stop and ask; do not scrape images from search results.
4. **Compose.** Feed each template the copy variant, image, and size. Check safe zones from
   CONVENTIONS (story/reel text clear of top and bottom bands). Check contrast between text and
   image — add a token-based scrim rather than moving text off-brand.
5. **Render.** Start the studio dev server (`npm run dev` in `studio/creatives/`). Write
   `design/render-manifest.json`, one entry per ID × size × variant, in the template shape:

   ```json
   { "base": "http://localhost:5173",
     "items": [
       { "id": "03-static-01", "template": "SingleImage", "size": "1080x1350",
         "props": { "headline": "…", "image": "…", "cta": "…", "variant": "v1" },
         "out": "03-static-01/03-static-01-1080x1350-v1.png" } ] }
   ```

   The script builds `<base>/render?template=&size=&props=<url-encoded JSON>` — the route
   `design-templates` defines — and screenshots exactly that size. (A raw `{ id, url, width,
   height, out }` entry also works for one-off pages.) Then, from `studio/creatives/` (it loads
   Playwright from there):

   ```bash
   node ${CLAUDE_SKILL_DIR}/scripts/render-stills.mjs ../../campaigns/NN-<slug>/design/render-manifest.json --scale 2
   ```

   `${CLAUDE_SKILL_DIR}` is the folder holding this SKILL.md. `--base` overrides the manifest's
   `base`. Use `--scale 3` for hero and print assets. Output names follow CONVENTIONS:
   `<id>-<WxH>[-v<variant>].png`. Read any text-fit warnings the templates log; overflowing copy
   goes back to the copywriter, not into a smaller font.
6. **Contact sheet.** `design/contact-sheet.html` — every render, grouped by ID, labelled with
   size, variant, and the copy it carries. This is what reviewers and the client look at first.
7. **Hand over.** Fill `asset_ref` in `calendar.csv`; tell performance-marketer which IDs are
   rendered.

## Checklist

- [ ] Every static ID × size × variant rendered
- [ ] Only templates from `studio/creatives/`; any new template built there and flagged
- [ ] Zero hardcoded design values — tokens only
- [ ] On-screen text matches `copy/<id>.md` exactly
- [ ] Every stock asset recorded with provider, license, and attribution
- [ ] Safe zones respected for 9:16
- [ ] Text contrast readable over imagery
- [ ] Rendered at scale 2 (3 for hero), names per CONVENTIONS
- [ ] Contact sheet built
- [ ] `asset_ref` filled in `calendar.csv`

## Failure modes

- **One-off layouts.** Campaign 5 looks like a different brand; the playbook learns nothing.
- **Hex codes "just this once".** Drift that `brand-reviewer` will fail.
- **Silent copy edits.** Ads export one headline, the image shows another.
- **Unlicensed images.** A takedown after launch costs more than the campaign.
- **Rendering at 1x.** Soft on every modern phone.

## Handoff

Renders → `performance-marketer` (`ads-export`) and `brand-reviewer` at C.6.
