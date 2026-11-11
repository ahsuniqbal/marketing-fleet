---
name: write-copy
description: Write all copy for each deliverable in the frozen creative brief — ad primary text, headlines, descriptions, search ads, captions, on-screen text, email subjects — with 3–5 variants per field for A/B testing, validated against platform character limits by a checker script. Use at stage C.4a, after write-script has locked the video scripts.
---

# Write copy

**Stage:** C.4a · **Agent:** copywriter
**Reads:** `playbook.md`, `campaigns/NN/creative-brief.md`, `foundation/voice-guide.md`,
`foundation/brand-strategy.md`, `foundation/research.md` (personas, keywords),
`foundation/social-research.md` (hooks), `CONVENTIONS.md` (copy limits)
**Writes:** `campaigns/NN/copy/<deliverable-id>.md` (template: `templates/campaign-copy.md`)

Copy is consumed by three agents at once: `graphic-designer` sets the on-screen text,
`performance-marketer` exports the ad text, and `brand-reviewer` checks every word. It has to be
written exactly as it will ship, in a format a script can validate.

## Procedure

1. **One file per deliverable ID** in the creative brief. Deliver exactly the field keys its
   "Copy needs" row lists — no more, no fewer.
2. **Table format is fixed:** `| field | variant | text |`, keys from the template, variants
   `v1`…`v5`. Text exactly as it ships; `<br>` for line breaks. The checker parses this table.
3. **Variants: 3–5 per field** that the brief marks for testing. Each variant changes one thing —
   hook type, benefit, proof, or tone — and the "Variant rationale" table says which. Five
   variants that differ only in punctuation teach `ads-plan` nothing.
4. **Search ads.** Google RSA: aim for up to 15 headlines and 4 descriptions, keywords from
   `research.md` in at least a third of the headlines, and paths that read as a URL.
5. **On-screen text** (`onscreen.*`) — short enough to read at a glance; the designer will not
   shorten it for you.
6. **Voice and claims.** Every line against `voice-guide.md`: tone, banned words, example lines.
   Every claim listed in "Claims used" with its proof. Anything not allowed by the claims policy
   is cut.
7. **Run the checker** on every file:

   ```bash
   node ${CLAUDE_SKILL_DIR}/scripts/check-copy-limits.mjs campaigns/NN/copy/*.md
   ```

   `${CLAUDE_SKILL_DIR}` is the folder holding this SKILL.md. Hard-limit errors (exit 1) must be
   fixed. Recommended-limit warnings may stay only with a reason in the variant rationale (e.g.
   long-form primary text being tested deliberately). A `copy-limits.json` at the workspace root
   overrides the defaults. Paste the final output into the file's "Checker output" section.
8. **Hand over.** Set `Status: ready-for-review`; update `copy_ref` in `calendar.csv`; tell the
   graphic-designer and performance-marketer which IDs are ready.

## Checklist

- [ ] Every brief deliverable with copy needs has a file
- [ ] Only template field keys used; table parses
- [ ] 3–5 variants per tested field, each testing one stated thing
- [ ] RSA headlines include research keywords
- [ ] No banned words; tone matches the voice guide
- [ ] Every claim listed with proof and allowed by the claims policy
- [ ] Checker run: zero hard errors, warnings justified
- [ ] CTA matches the creative brief exactly
- [ ] `copy_ref` filled in `calendar.csv`

## Failure modes

- **Fake variants.** Same idea, different words — the A/B result is noise.
- **Copy written in prose.** The checker and `ads-export` cannot parse it.
- **Truncated primary text.** The CTA sits after the "…more" cut.
- **Designer shortens headlines.** Copy and creative disagree at review. Write it short.
- **Claims drift.** "Clinically proven" appears in v4 because it sounded good.

## Handoff

Copy → `graphic-designer` (`produce-creatives`), `performance-marketer` (`ads-export`), and
`brand-reviewer` at C.6.
