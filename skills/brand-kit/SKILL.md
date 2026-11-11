---
name: brand-kit
description: Establish a client's visual identity as design tokens — color, typography, spacing, radius, shadow, motion — in tokens.json, the single visual source of truth for both static creatives and video, plus a brand-kit document with logo, type, color, and imagery rules. Use at stage F.3a, after positioning and voice are approved and before any template or video work.
---

# Brand kit

**Stage:** F.3a · **Agent:** graphic-designer
**Reads:** `foundation/brand-strategy.md`, `foundation/voice-guide.md`,
`foundation/intake.md` (assets available), client logo and font files, existing brand book
**Writes:** `clients/<client>/foundation/brand-kit/tokens.json` (template:
`templates/client-tokens.json`), `brand-kit/brand-kit.md` (template:
`templates/client-brand-kit.md`), `brand-kit/logos/`, `brand-kit/fonts/`

`tokens.json` is read by the React templates in `studio/creatives/` **and** the Remotion project
in `studio/video/`. One file means a color change reaches every static and every video. A value
hardcoded anywhere else is a defect `brand-reviewer` will fail.

## Procedure

1. **Start from what exists.** If the client has a brand book, encode it — do not redesign it.
   Note any inconsistencies in their material as open questions.
2. **Logos.** Collect SVG (preferred) or high-res PNG with transparency into `logos/`: primary,
   secondary/stacked, icon, and light and dark versions. Missing vector files are an open
   question — never trace or recreate a client's logo.
3. **Color tokens.** Primitive palette (`color.palette.*`), then semantic roles
   (`color.bg`, `color.surface`, `color.text`, `color.textMuted`, `color.primary`,
   `color.onPrimary`, `color.accent`, `color.overlay`). Check text/background pairs for WCAG AA
   contrast (4.5:1 body, 3:1 large text) and record the ratios.
4. **Typography.** Font families with fallbacks, weights, and a type scale for social sizes
   (display, headline, subhead, body, caption, legal). Fonts must be licensed for the use:
   Google Fonts are safe defaults; a commercial font needs the client's license on file. Put
   font files or the Google Fonts reference in `fonts/`.
5. **Spacing, radius, shadow.** A spacing scale, corner radii, and shadows used in templates.
6. **Motion tokens.** Durations and easing curves for video and animated creatives
   (`motion.duration.fast/base/slow`, `motion.easing.*`), plus logo-reveal timing.
7. **Imagery rules** in `brand-kit.md`: photo style, subjects to prefer and avoid, overlay and
   crop rules, stock search keywords that match the brand, illustration style if any.
8. **Usage rules** in `brand-kit.md`: logo clear space and minimum size, forbidden treatments,
   color combinations allowed on photos, how text sits over images.

## Checklist

- [ ] Existing brand book encoded, not redesigned
- [ ] Logos in vector or high-res transparent PNG, light and dark
- [ ] Semantic color roles defined on top of the palette
- [ ] Contrast ratios recorded for every text/background pair
- [ ] Fonts licensed for commercial use, with fallbacks
- [ ] Type scale covers display to legal
- [ ] Motion tokens defined for video
- [ ] Imagery and usage rules written
- [ ] `tokens.json` is valid JSON

## Failure modes

- **Palette without roles.** Templates pick "blue-500" and every campaign picks differently.
- **Unlicensed fonts.** A font that looked nice on the designer's machine cannot be shipped.
- **Recreated logos.** Traced logos drift from the real mark; ask for the files.
- **No motion tokens.** Video invents its own timing and feels like another brand.

## Handoff

`design-templates` (F.3b) and `video-foundation` (F.3c) start in parallel, both reading
`tokens.json`. 🚦 Client approves the brand kit and templates together.
