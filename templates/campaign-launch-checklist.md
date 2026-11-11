# Launch checklist — <NN> <campaign>

For the person launching. Agents prepared these files; **you** import, check, and publish.
Do not start until `approval/approval.md` shows client sign-off.

## Before importing

- [ ] Client sign-off recorded in `approval/approval.md` — name: · date:
- [ ] `tracking-check.md` verdict pass (or blockers accepted by: )
- [ ] Ad account, payment method, and Page / profile access confirmed

## Meta (Ads Manager)

- [ ] Upload every image and video listed in `ads/asset-map.md` to the ad account's media library
- [ ] Ads Manager → Import → `ads/meta-bulk-import.csv`
- [ ] Every campaign, ad set, and ad shows **Paused**
- [ ] Spot-check 3 ads in preview: creative, primary text, headline, URL with UTMs
- [ ] Budgets and schedule match `ads/plan.md`
- [ ] Pixel / dataset selected for conversion objectives

## Google Ads (Ads Editor)

- [ ] Get recent changes → Import → `ads/google-ads-editor.csv`
- [ ] Review the import summary: no errors, warnings read
- [ ] Every campaign Paused; budgets, keywords, negatives match the plan
- [ ] Post changes

## Go live

- [ ] Un-pause in this order:
- [ ] Record launch in `approval/approval.md` — date, who, platforms, anything changed from the pack
- [ ] 24 hours later: delivery started, no disapprovals, spend pacing as planned

## If something is rejected

Note the ad and the platform's reason in `approval/approval.md` and send it back to
`performance-marketer` / `copywriter` — do not edit creative inside the platform.
