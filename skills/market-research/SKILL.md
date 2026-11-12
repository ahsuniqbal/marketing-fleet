---
name: market-research
description: Research a client's market, competitors, audience, and search demand — producing a competitor matrix, two to four evidence-backed personas, and a keyword list, every claim sourced. Use at stage F.1a, after client intake and in parallel with social-research.
---

# Market research

**Stage:** F.1a · **Agent:** market-researcher
**Reads:** `foundation/intake.md`, `CONVENTIONS.md`
**Writes:** `clients/<client>/foundation/research.md` (template: `templates/client-research.md`),
`clients/<client>/foundation/research/raw/` (saved page extracts, Trends and ad-library pulls,
named `<source>-<subject>-<YYYY-MM-DD>.<ext>`)

Positioning, voice, and every campaign target are built on this document. Research that repeats
the client's beliefs back to them adds nothing; research that tests them is the job.

## Tools — free first

- WebSearch and WebFetch for market reports, review sites, forums, news
- Playwright MCP for pages that need a browser (competitor sites, pricing pages)
- Google Trends and search autocomplete for demand signals
- Paid keyword MCPs (DataForSEO, Semrush, Ahrefs) **only** if listed as enabled in
  `CONVENTIONS.md`

## Procedure

1. **Competitor list.** Start with the competitors the client named, then add the ones that
   actually show up for the client's core searches and in their category. Five to ten total.
   Record each one's site and social handles — `social-research` uses this list.
2. **Competitor matrix.** For each: offer, price points, positioning line, main claims, proof
   they use (reviews, numbers, certifications), channels they are active on, visible weaknesses.
3. **Audience evidence.** Read reviews (the client's and competitors'), Reddit and forum threads,
   Q&A sections. Pull the exact words customers use for the problem, the outcome, and the
   objections. Quote them; these become hooks.
4. **Personas — two to four.** Each grounded in evidence from step 3, not invented: who, the
   job they are hiring the product for, triggers, objections, where they spend time, what proof
   convinces them. Mark where a persona contradicts the client's intake.
5. **Search demand.** Seed terms from the offer and customer language → autocomplete and Trends
   → a keyword list with intent (problem, solution, brand, competitor) and seasonality. Without a
   paid tool, record relative interest, not invented volumes.
6. **Gaps and opportunities.** What no competitor says, owns, or serves well.
7. **Source every claim.** URL and access date. An unsourced number is deleted.
8. **Save raw evidence** to `foundation/research/raw/` before analysing it — the same folder
   `social-research` uses. Check it first; never fetch the same source twice in a month.

## Checklist

- [ ] Five to ten competitors, with sites and social handles
- [ ] Matrix complete: offer, price, positioning, claims, proof, channels, weaknesses
- [ ] Customer language quoted from real sources
- [ ] Personas grounded in evidence, contradictions with the intake flagged
- [ ] Keywords tagged by intent, seasonality noted
- [ ] No invented search volumes
- [ ] Every claim has a source and access date
- [ ] Gaps and opportunities stated

## Failure modes

- **Personas from imagination.** A demographic sketch with no quotes is fiction.
- **Only the competitors the client named.** The real competition is whoever wins the search.
- **Invented numbers.** A made-up search volume becomes a KPI target later.
- **Feature comparison only.** Positioning needs claims and proof, not spec sheets.

## Handoff

`social-research` uses the competitor handles. Both documents feed `brand-strategy` at F.2.
