---
name: social-research
description: Analyse competitors' and the category's social content on Instagram, Facebook, and TikTok — format mix, engagement by format, top hooks, posting times, trending audio and hashtags, running ads, and content gaps — using Apify's free credit and public pages, within credit guards. Use at stage F.1b, in parallel with market-research.
---

# Social research

**Stage:** F.1b · **Agent:** market-researcher
**Reads:** `foundation/intake.md`, the competitor list in `foundation/research.md` (or the
client's named competitors if it is not written yet), `CONVENTIONS.md` credit budgets
**Writes:** `clients/<client>/foundation/social-research.md` (template:
`templates/client-social-research.md`), `clients/<client>/foundation/research/raw/`

The content calendar's format mix, every hook, and every posting time trace back here. Guesses
about "what works on Instagram" are replaced by what is working for this category, this month.

## Public data only

Collect only public posts, public profiles, and public ad libraries. No logins to other people's
accounts, no private data, no personal data beyond public handles. Each platform's terms apply
to the workspace owner; note in the document that the analysis is of public data.

## Credit guards — Apify free tier

1. **Check `research/raw/` first.** If a profile was scraped within the last 30 days, reuse it.
   Never scrape the same thing twice.
2. **Estimate before every run.** Actor, profiles, results per profile, and expected cost
   against the remaining monthly credit. State it before running.
3. **Cap results** to the `CONVENTIONS.md` budget (default: 50 posts per profile, 10 profiles).
   Last 90 days only.
4. **Save raw output** as `research/raw/<platform>-<handle>-<YYYY-MM-DD>.json` before analysing.
5. If `APIFY_TOKEN` is missing or the credit is spent, stop and tell the user. Do not switch to
   a paid tool on your own.

## Procedure

1. **Scrape** competitor and client profiles per platform in scope (Apify Instagram, Facebook,
   TikTok scrapers): format, caption, posted time, likes, comments, views, shares where public,
   audio used.
2. **Public ad research with Playwright MCP:**
   - Meta Ad Library — each competitor's active ads: format, copy, CTA, how long each has run
     (long-running ads are the proven ones)
   - TikTok Creative Center — trending hashtags, songs, and creators for the category and region
   - Google Trends — rising queries for the category
3. **Analyse:**
   - **Format mix** per competitor: % reels / carousel / static image / stories
   - **Engagement by format:** median engagement rate per format (engagements ÷ followers),
     medians not averages — one viral post distorts an average
   - **Top hooks:** the first line or first three seconds of the top 10% of posts, quoted
   - **Posting times:** day and hour bands of the top performers, in the client's timezone
   - **Trending audio and hashtags**, each with the date observed — trends expire in weeks
   - **Content pillars** competitors use, and **gaps** nobody covers
4. **Recommendations:** a format mix, posting cadence, and hook patterns for the client, each
   tied to the evidence above.

## Checklist

- [ ] `research/raw/` checked before any scrape
- [ ] Cost estimated and stated before each Apify run
- [ ] Result caps respected
- [ ] Raw JSON saved, dated
- [ ] Format mix and median engagement per format, per competitor
- [ ] Top hooks quoted, not paraphrased
- [ ] Posting times in the client's timezone
- [ ] Every trend has an observed date
- [ ] Meta Ad Library long-running ads recorded
- [ ] Public-data note included

## Failure modes

- **Burning the free credit in one run.** Uncapped scrapes on ten profiles.
- **Averages.** One viral reel makes a weak format look strong.
- **Undated trends.** A three-month-old sound is used in a launch.
- **Vanity metrics.** Likes without follower counts say nothing about engagement rate.

## Handoff

Feeds `brand-strategy` and `voice-guide` at F.2, `design-templates` (format mix), and
`content-calendar` on every campaign.
