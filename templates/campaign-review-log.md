# Review log — <NN> <campaign>

`brand-reviewer` opens, verifies, and reopens entries at C.6; owners mark them fixed with
`fix-review`. Runs are appended, never rewritten.

```
open ──(owner fixes)──► fixed ──(brand-reviewer re-run)──► verified
                                       └────────────────► reopened ──► fixed …
```

Also `deferred` — human only, with a reason. An owner never moves their own entry to verified.

**Severity:** `blocker` — legal, claims, wrong brand, broken file, spend risk · `major` —
visible off-brand, spec or copy-limit failure · `minor` — polish.

## Runs

| Run | Date | Deliverables checked | Opened | Verified | Reopened | Verdict |
|---|---|---|---|---|---|---|
| 1 | | | | | | pass / fail |

Pass: no `blocker` or `major` in `open`, `fixed`, or `reopened`. Three-run limit — past run 3,
escalate to the human.

## Summary

| Entry | Deliverable | Area | Severity | Owner | Status | Found in run | Closed in run |
|---|---|---|---|---|---|---|---|
| REV-<NN>-001 | | claims | blocker | copywriter | open | 1 | |

---

### REV-<NN>-001 — <what is wrong, as observed> · blocker

**Status:** open · **Owner:** copywriter / graphic-designer / video-producer /
performance-marketer / campaign-strategist
**Deliverable:** `<NN>-<format>-<seq>` (ratios / variants affected) · **Area:** voice / claims /
brand kit / spelling / specs / copy limits / license / ads files / playbook
**Found in:** run 1
**Rule broken:** <voice-guide line, claims-policy item, token, CONVENTIONS row>
**Evidence:** `review-evidence/run-1/<id>/...`

**Fix** — filled by the owner

- Cause:
- Change: local / structural —
- Files:
- Siblings:

**History**
- run 1 — opened by brand-reviewer
