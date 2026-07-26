# Draft PR: Developer Portfolio V2

> Draft status: the final local gate is green at executable head `5f6aa44`; Vercel Production Branch verification, remote checks, and Preview URL are **pending**.

## Summary

Rebuilds Digital Activision as a bilingual, developer-first full-stack portfolio while preserving the audited agency offering under a dedicated Studio route.

The branch adds:

- a validated HU/EN route and SEO boundary;
- a developer-first homepage;
- four typed, evidence-aware case studies;
- an Engineering Lab and command palette;
- accessible UI primitives and interaction coverage;
- a migrated Studio experience and preserved legacy demo URLs;
- a hardened first-party contact flow;
- a safe health endpoint, security headers, and fail-closed Preview indexing;
- Next.js 16.2.12 in dedicated commit `3c1e8ff`;
- fail-closed lint, build, bundle, unit, E2E, axe, visual, internal-link, and cross-browser gates.

## Why

The previous homepage primarily communicated an agency sales proposition. Portfolio V2 prioritizes verifiable engineering ownership, system thinking, delivery practice, and honest evidence while retaining the business-facing content without deletion.

## Route changes

| Route | Result |
| --- | --- |
| `/` | Redirects to `/hu` |
| `/hu`, `/en` | Developer-first homepage |
| `/[locale]/work` | Typed case-study index |
| `/[locale]/work/[slug]` | Four validated case studies |
| `/[locale]/lab` | Engineering Lab |
| `/[locale]/studio` | Migrated agency offering |
| `/[locale]/privacy` | Localized privacy |
| `/api/contact` | Strict first-party contact endpoint |
| `/api/health` | Minimal uncached health/build metadata |
| `/adatkezeles` | Permanent redirect to `/hu/privacy` |
| allowlisted `/works/...` and directory-style `/projects/...` | Permanent redirects to preserved static demo entry points |

Unknown locales, unknown case-study slugs, and unknown legacy-like paths fail closed.

## Before / after screenshots

The links target tracked repository evidence on the rebuild branch.

| View | Before | After |
| --- | --- | --- |
| HU desktop | [baseline HU desktop](https://github.com/Anyon-Aida/digital-activision/blob/rebuild/developer-portfolio-v2/docs/portfolio-v2/baseline/screenshots/homepage-hu-desktop.png) | [V2 HU desktop](https://github.com/Anyon-Aida/digital-activision/blob/rebuild/developer-portfolio-v2/tests/__screenshots__/visual/homepage.spec.ts/homepage-hu-desktop-win32.png) |
| HU mobile | [baseline HU mobile](https://github.com/Anyon-Aida/digital-activision/blob/rebuild/developer-portfolio-v2/docs/portfolio-v2/baseline/screenshots/homepage-hu-mobile.png) | [V2 HU mobile](https://github.com/Anyon-Aida/digital-activision/blob/rebuild/developer-portfolio-v2/tests/__screenshots__/visual/homepage.spec.ts/homepage-hu-mobile-win32.png) |
| EN desktop | [baseline EN desktop](https://github.com/Anyon-Aida/digital-activision/blob/rebuild/developer-portfolio-v2/docs/portfolio-v2/baseline/screenshots/homepage-en-desktop.png) | [V2 EN desktop](https://github.com/Anyon-Aida/digital-activision/blob/rebuild/developer-portfolio-v2/tests/__screenshots__/visual/homepage.spec.ts/homepage-en-desktop-win32.png) |
| EN mobile | [baseline EN mobile](https://github.com/Anyon-Aida/digital-activision/blob/rebuild/developer-portfolio-v2/docs/portfolio-v2/baseline/screenshots/homepage-en-mobile.png) | [V2 EN mobile](https://github.com/Anyon-Aida/digital-activision/blob/rebuild/developer-portfolio-v2/tests/__screenshots__/visual/homepage.spec.ts/homepage-en-mobile-win32.png) |

Additional case-study, Studio, Lab, command-palette, and contact baselines are tracked under `tests/__screenshots__/visual/`.

## HU / EN verification

- [x] Explicit `hu` and `en` locale registry.
- [x] Locale-prefixed application routes.
- [x] Localized homepage, Work, four case studies, Lab, Studio, privacy, errors, metadata, and social images.
- [x] Typed content tests require HU/EN parity.
- [x] Locale switching preserves supported route context.
- [x] Final clean-install localized suite rerun.
- [ ] Preview HU/EN smoke.

## Local test evidence

| Gate | Evidence |
| --- | --- |
| Clean-install audits | Security and production audits both passed with 0 vulnerabilities |
| Unit | 21 files / 108 tests passed |
| Production build | 31 pages |
| Bundle budget | 42.1 KiB gzip / 165 KiB |
| Chromium E2E | 104/104 passed |
| Earlier corrections | Two relative `Location` assertions corrected; Windows local workers reduced to two after transient socket exhaustion |
| Chromium axe | 18/18 passed |
| Chromium visual | 26/26 passed, including HU/EN full-page section rhythm |
| Internal links | 1/1 passed |
| Cross-browser | 9/9 across Chromium, Firefox, WebKit |
| Optimized public media | `c68fcc9`; targeted case-study suite 15/15 |
| Final Playwright inventory | 158/158 passed |
| Final local gate | **green** at executable head `5f6aa44`; see final QA for the single-run contrast correction trail |

Full details: [`docs/portfolio-v2/final-qa.md`](https://github.com/Anyon-Aida/digital-activision/blob/rebuild/developer-portfolio-v2/docs/portfolio-v2/final-qa.md).

## Lighthouse before / after

Lighthouse 12.8.2 mobile; final values are three-run medians per locale.

| Locale | State | P | A | BP | SEO | FCP | LCP | TBT | CLS | Bytes |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| HU | Baseline | 98 | 96 | 100 | 92 | 909.361 ms | 2375.042 ms | 30.5 ms | 0 | 841,178 |
| HU | V2 median | 96 | 100 | 100 | 58 | 1131.676 ms | 2571.074 ms | 85 ms | 0 | 306,128 |
| EN | Baseline | 98 | 96 | 100 | 92 | 911.759 ms | 2374.638 ms | 28.5 ms | 0 | 840,651 |
| EN | V2 median | 96 | 100 | 100 | 58 | 1115.236 ms | 2566.598 ms | 92 ms | 0 | 302,921 |

The local SEO score is intentionally depressed because `VERCEL_ENV` was unset: fail-closed robots disallow indexing, and canonical metadata points to the Production origin. Metadata/robots E2E is green; Preview noindex and Production indexing still require direct environment verification.

Median LCP remains 71.074 ms over the 2.5 s target in HU and 66.598 ms over it in EN. This remains a disclosed performance risk.

Raw reports and machine-readable medians: [`docs/portfolio-v2/final/lighthouse/`](https://github.com/Anyon-Aida/digital-activision/tree/rebuild/developer-portfolio-v2/docs/portfolio-v2/final/lighthouse).

## Environment changes

No values are included in this PR.

New/clarified names:

- `NEXT_PUBLIC_SITE_URL`
- `BUILD_TIME`
- `CONTACT_FORM_ENABLED`
- `CONTACT_PREVIEW_ENABLED`
- `CONTACT_ALLOWED_ORIGINS`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- `CONTACT_TO`, `CONTACT_FROM`
- `CONTACT_PREVIEW_TO`, `CONTACT_PREVIEW_FROM`
- `CONTACT_RATE_LIMIT_ENDPOINT`
- `CONTACT_RATE_LIMIT_TOKEN`
- `CONTACT_RATE_LIMIT_KEY_SECRET`
- `CONTACT_RATE_LIMIT_MAX`
- `CONTACT_RATE_LIMIT_WINDOW_MS`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `CONTACT_TURNSTILE_SECRET_KEY`
- `CONTACT_MIN_FILL_MS`
- `CONTACT_MAX_FORM_AGE_MS`

Vercel supplies `VERCEL_ENV`, `VERCEL_GIT_COMMIT_SHA`, and `VERCEL_PROJECT_PRODUCTION_URL`.

## Manual setup

- [ ] Verify Vercel `Production Branch` is exactly `main`.
- [ ] Keep Preview contact disabled, or configure isolated Preview SMTP sender/recipient.
- [ ] Configure the HTTPS distributed rate limiter for enabled Preview contact.
- [ ] Configure both Turnstile keys for enabled Preview contact.
- [ ] Set exact Preview allowed origin.
- [ ] Do not copy Production recipients or secrets into Preview.
- [ ] Add HU/EN CV assets only after project-owner review; they are currently unavailable.
- [ ] Verify recommended `main` branch protection manually.

## Vercel Preview

| Field | Value |
| --- | --- |
| Production Branch verification | **PENDING — must be exactly `main` before push** |
| Preview URL | **PENDING** |
| Preview deployment SHA | **PENDING** |
| Preview robots noindex | **PENDING** |
| Preview environment isolation | **PENDING** |
| Preview smoke | **PENDING** |
| Project-owner visual review | **PENDING** |

## Known limitations and risks

- Median local LCP is slightly above the 2.5 s target.
- Local Lighthouse SEO is not deployed-environment evidence.
- CV assets are unavailable.
- Several experience timeline role/period facts have no verified source and remain explicitly labelled undocumented pending project-owner input.
- Screen-reader, 200% zoom, physical iPhone/Android, slow-network, and final Preview keyboard/console review remain manual release checks.
- Preview and Production environment settings have not been inferred or changed.
- External monitoring such as Sentry is not configured.

## Rollback

- Revert the smallest responsible thematic commit on `rebuild/developer-portfolio-v2`.
- Revert Next.js 16 through dedicated commit `3c1e8ff`, accounting for later dependent commits.
- Rerun both audits and `quality:full`.
- Push only `HEAD:refs/heads/rebuild/developer-portfolio-v2`.
- Validate a new Preview.
- Never rewrite shared history, touch `main`, promote Preview, or alter Production state as part of rollback.

Detailed plan: [`docs/portfolio-v2/migration-guide.md`](https://github.com/Anyon-Aida/digital-activision/blob/rebuild/developer-portfolio-v2/docs/portfolio-v2/migration-guide.md).

## Reviewer checklist

- [ ] Architecture and route migration reviewed.
- [ ] HU and EN content accuracy reviewed.
- [ ] Confidentiality/anonymization reviewed.
- [ ] Contact and environment isolation reviewed.
- [ ] Lighthouse/LCP risk accepted or follow-up requested.
- [ ] Preview visual and functional review completed.
- [x] **Production merge not performed.**
- [x] **Production deployment not performed.**

## Final hand-off sentence

**Pending until the Preview URL and quality gates are verified.** At that point, replace this pending note with the following mandatory sentence exactly as specified; the text below is a template, not a current completion claim:

```text
A preview elkészült és a quality gate-ek állapota dokumentálva van. A main merge és a production deployment nem történt meg; ehhez a projektgazda jóváhagyása szükséges.
```
