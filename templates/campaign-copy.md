# Copy — <deliverable-id>

**Creative brief row:** <deliverable-id> · **Status:** draft | ready-for-review | approved
**Pillar:** · **Persona:** · **CTA:**

## Copy

One row per field per variant. `field` uses only the keys below — the checker script validates by
key. Variants are `v1`, `v2`, … (3–5 per field for A/B). Write the text exactly as it will ship:
no surrounding quotes, and `<br>` for a line break inside a cell.

| field | variant | text |
|---|---|---|
| meta.primary_text | v1 | |
| meta.headline | v1 | |
| meta.description | v1 | |

Field keys:

| Key | Use |
|---|---|
| `meta.primary_text`, `meta.headline`, `meta.description` | Facebook / Instagram ads |
| `google.rsa_headline`, `google.rsa_description`, `google.path` | Google responsive search ads |
| `linkedin.intro`, `linkedin.headline` | LinkedIn ads and posts |
| `instagram.caption` | organic IG posts — hashtags inside the caption are counted |
| `tiktok.caption` | TikTok |
| `youtube.title` | YouTube |
| `x.post` | X |
| `email.subject` | email |
| `onscreen.headline`, `onscreen.subhead`, `onscreen.cta` | text set inside a creative — not limit-checked, keep short |

## Variant rationale

What each variant tests (hook type, benefit, proof, tone) so the A/B result means something.

| Variant | Tests |
|---|---|

## Claims used

| Claim | Proof / source | Allowed by claims policy? |
|---|---|---|

## Checker output

Paste the last `check-copy-limits.mjs` result here.
