# Digital Activision Portfolio V2 – migration and rollback guide

This guide records the intended migration from the audited agency-first Next.js application to the bilingual Developer Portfolio V2. It describes repository and route changes only. Final quality results, Vercel settings, Preview deployment metadata, and production readiness are deliberately not asserted here.

Status legend:

- **implemented on rebuild branch:** source exists on `rebuild/developer-portfolio-v2`;
- **locally verified:** implementation and the final clean-install gate are recorded, but Preview evidence is not;
- **pending manual:** requires direct project-owner, GitHub, Vercel, browser, or content verification;
- **not authorized:** outside the rebuild’s permission boundary.

## 1. Scope and safety boundary

The migration is developed in the isolated `rebuild/developer-portfolio-v2` worktree and branch. The audited source point was `origin/main` commit `d5a1aa2`.

The migration may:

- replace the developer-facing information architecture;
- move the audited agency content to a dedicated Studio route;
- add typed content, tests, APIs, metadata, and Preview-safe controls;
- preserve or redirect public legacy URLs.

The migration may not, without explicit project-owner approval:

- modify, push, or merge `main`;
- promote a Preview deployment or deploy to Production;
- change Production environment values, domain, DNS, aliases, or Vercel project settings;
- delete Production data or a working Production capability.

No database or persistent-data migration is introduced by Portfolio V2.

## 2. Baseline to V2 architecture

| Area | Audited baseline | V2 rebuild | Status |
| --- | --- | --- | --- |
| Primary positioning | Agency sales homepage | Developer-first engineering portfolio | Implemented on rebuild branch |
| Agency material | Main homepage | Dedicated `/[locale]/studio` route | Implemented on rebuild branch |
| Localization | Partial/parallel handling | `next-intl`, explicit `hu`/`en`, validated locale routes | Implemented on rebuild branch |
| Case studies | Marketing project cards | Typed, Zod-validated registry and detail routes | Implemented on rebuild branch |
| Engineering proof | No dedicated Lab | Lab, conceptual architecture explorer, RBAC and API contract examples | Implemented on rebuild branch |
| Navigation | Agency anchors | Work/Lab/Experience/Studio/Contact plus command palette | Implemented on rebuild branch |
| Contact | Parallel Formspree and SMTP paths | One strict first-party `/api/contact` flow | Implemented on rebuild branch |
| Health | No endpoint | Safe, uncached `/api/health` | Implemented on rebuild branch |
| SEO | Fixed/global metadata and soft 404 risk | Locale metadata, canonical/alternates, social images, sitemap, fail-closed robots | Implemented on rebuild branch |
| Security | Minimal route protection | CSP and browser headers, contact abuse controls, Preview noindex | Implemented on rebuild branch |
| Framework | Next.js 15.5.20 baseline | Next.js 16.2.12 with `proxy.ts` boundary | Implemented in dedicated commit `3c1e8ff`; clean-install gate passed |
| Release evidence | Baseline only | Local QA and Lighthouse after-state recorded; Preview record pending | Locally verified |

The historical findings remain in `docs/portfolio-v2/baseline-audit.md`. Do not rewrite that document to resemble the current branch.

## 3. Route migration

### Localized application routes

| V2 route | Behavior |
| --- | --- |
| `/` | Redirect to `/hu` |
| `/hu`, `/en` | Developer-first homepage |
| `/[locale]/work` | Case-study index sourced from the registry |
| `/[locale]/work/samsung-smart-gate-analytics` | Anonymized private case study |
| `/[locale]/work/adott-enterprise-project-workflow` | Anonymized private case study |
| `/[locale]/work/alba-medence-3d-configurator` | Public demo/reference case study |
| `/[locale]/work/questlog-offline-first-pwa` | Explicitly in-progress case study |
| `/[locale]/lab` | Engineering Lab |
| `/[locale]/studio` | Migrated agency content |
| `/[locale]/privacy` | Localized privacy route |

Each Work route also provides a localized social-image route. Sitemap and metadata use the same canonical route registry.

Unknown locale-shaped paths and unknown case-study slugs must return a real localized 404 rather than rendering default-language content.

### Legacy URL preservation

Permanent redirects are defined in `src/lib/legacy-routes.ts`:

| Legacy URL | Destination |
| --- | --- |
| `/adatkezeles` | `/hu/privacy` |
| `/works/hamburger` | `/projects/hamburger/index.html` |
| `/works/boxer-hero` | `/projects/boxer-hero/index.html` |
| `/works/nati` | `/projects/nati/index.html` |
| `/works/nati/chat` | `/projects/nati/chat/index.html` |
| `/projects/hamburger` | `/projects/hamburger/index.html` |
| `/projects/boxer-hero` | `/projects/boxer-hero/index.html` |
| `/projects/nati` | `/projects/nati/index.html` |
| `/projects/nati/chat` | `/projects/nati/chat/index.html` |

Both slash and non-slash variants are handled. Only allowlisted demos remain public; unknown `/projects/...` paths must not become directory indexes or soft 404s.

Agency homepage anchors migrate to Studio on the same locale:

| Previous hash | Studio destination |
| --- | --- |
| `#features` | `/[locale]/studio#benefits` |
| `#services` | `/[locale]/studio#services` |
| `#works` | `/[locale]/studio#experiments` |
| `#process` | `/[locale]/studio#process` |
| `#pricing` | `/[locale]/studio#pricing` |

## 4. Content migration

Agency material was not deleted. Its services, process, package context, experiments, and contact hand-off moved into the typed Studio content model.

Portfolio content now has canonical sources:

| Domain | Source |
| --- | --- |
| Homepage and shared chrome | `src/content/home.ts` |
| Case-study facts | `src/content/case-studies/content.ts` |
| Case-study validation | `src/content/case-studies/schema.ts` |
| Case-study route/order projections | `src/content/case-studies/registry.ts` |
| Studio | `src/content/studio.ts` |
| Engineering Lab | `src/content/lab.ts` |
| Privacy | `src/content/privacy.ts` |

Migration rules:

- presentation components must not become independent sources of project facts;
- HU and EN fields move together;
- stable route slugs and IDs require an explicit redirect/migration plan before change;
- private enterprise content remains anonymized;
- conceptual or reconstructed architecture remains disclosed;
- unverified metrics, live status, technologies, and outcomes remain unclaimed.

No CV file was available in the workspace. The CV action therefore remains visibly unavailable. Adding HU/EN CV assets is **pending project-owner input** and must not be automated.

## 5. Contact and environment migration

The old parallel contact behavior is consolidated into the first-party `POST /api/contact` endpoint. Formspree is no longer a delivery path.

The migrated flow adds:

- strict request schema and JSON size limits;
- localized accessible client validation and safe result states;
- explicit origin allowlisting;
- honeypot and submission-age checks;
- per-client HMAC-derived rate-limit keys;
- bounded development limiter;
- external distributed limiter for Preview/Production;
- Cloudflare Turnstile for Preview/Production;
- SMTP provider abstraction;
- request IDs and PII-minimized structured logs;
- separate Preview sender/recipient variables;
- fail-closed behavior for incomplete configuration.

Environment migration:

| Baseline variable | V2 handling |
| --- | --- |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Retained for the selected SMTP transport |
| `CONTACT_TO`, `CONTACT_FROM` | Used outside Preview |
| `CONTACT_PREVIEW_TO`, `CONTACT_PREVIEW_FROM` | New mandatory Preview isolation |
| `CONTACT_FORM_ENABLED` | New explicit feature gate |
| `CONTACT_PREVIEW_ENABLED` | New additional Preview gate |
| `CONTACT_ALLOWED_ORIGINS` | New exact-origin policy |
| `CONTACT_RATE_LIMIT_*` | New distributed limiter contract |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | New browser-visible challenge key |
| `CONTACT_TURNSTILE_SECRET_KEY` | New server-only verification secret |
| `CONTACT_MIN_FILL_MS`, `CONTACT_MAX_FORM_AGE_MS` | New optional timing bounds |

Do not migrate values by copying Production secrets into Preview. Preview must use isolated test/sandbox configuration or keep contact delivery disabled.

Actual Vercel variable presence and scoping are **pending manual verification**. Values must never be recorded in this guide or the PR.

## 6. SEO, privacy and indexing migration

V2 introduces:

- locale-specific titles and descriptions;
- correct document `lang`;
- canonical and `hreflang` alternates;
- localized social images;
- `sitemap.xml`;
- environment-aware `robots.txt`;
- localized privacy routes;
- `noindex` headers for legacy experiments.

Indexing is fail-closed. The site is indexable only when all of these are true:

- `NODE_ENV=production`;
- `VERCEL_ENV=production`;
- a valid public HTTPS canonical origin is available;
- the configured origin is not malformed.

Preview must remain disallowed in robots regardless of its public URL. The deployed Preview response still requires direct verification.

## 7. Security and observability migration

Global headers add CSP, strict referrer handling, MIME sniffing protection, a restrictive permissions policy, and frame denial. HSTS is emitted only in the Vercel Production environment.

`/api/health` is dynamic and uncached. It exposes a minimal status, validated build metadata, and a request ID; it does not expose secret names, dependency state, SMTP configuration, or raw Vercel values.

Contact logs must not include raw request bodies, email addresses, names, messages, IP addresses, credentials, or provider payloads. External monitoring is not part of this migration and remains subject to separate project-owner approval.

## 8. Next.js 16 migration

The framework-major upgrade is intentionally isolated from the feature commits. Commit `3c1e8ff` pins Next.js 16.2.12, React/React DOM 19.2.7, and the matching Next lint plugin.

Source migration:

- `src/middleware.ts` is replaced by `src/proxy.ts`;
- the locale, canonical-path, legacy bypass, and case-study validation behavior must remain equivalent;
- the ESLint 10 flat configuration integrates `@next/eslint-plugin-next` directly alongside `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, and `globals`;
- `eslint-config-next` is not part of the migrated lint stack;
- framework and React lockfile changes stay in the same revertable dependency commit.

Observed post-migration evidence includes a 0-vulnerability clean-install audit, 108 passing unit tests across 21 files, a 31-page production build, a passing 42.1 KiB/165 KiB homepage bundle budget, 104/104 Chromium E2E, 18/18 axe, 26/26 visual, 9/9 cross-browser smoke, and the 1/1 internal-link crawl. Commit `c68fcc9` added explicit optimized-image E2E coverage, `e50ac8d` stabilized local Windows concurrency, and `5f6aa44` closes the final SEO/content/theme/env gaps with full-page visual evidence.

Current status: **implemented and locally verified**. Preview deployment evidence and project-owner review remain pending, so this guide does not claim production readiness. See `docs/portfolio-v2/final-qa.md`.

## 9. Performance migration

The V2 architecture reduces unnecessary client ownership by rendering content on the server and limiting hydration to interaction islands. Visual tests use reduced-motion stabilization.

Verified local changes and measurements:

- the global `images.unoptimized` override has been removed, case-study media uses `next/image`, and commit `c68fcc9` verifies the optimized public response path;
- the production build generated 31 pages;
- the homepage initial client JavaScript is 42.1 KiB gzip against a 165 KiB fail-closed budget;
- three Lighthouse 12.8.2 mobile runs per locale produced median Performance 96, Accessibility 100, and Best Practices 100;
- transferred bytes fell from 841,178 to 306,128 for HU and from 840,651 to 302,921 for EN in the recorded local measurements.

The following remain release risks or pending checks:

- critical images must use intentional sizing and priority;
- 320 px and the required visual viewport matrix must be checked;
- no critical console error or horizontal overflow may remain.

The local Lighthouse SEO median is 58 rather than the baseline 92. This is expected in the measurement context: `VERCEL_ENV` was unset, so the fail-closed robots policy prevents indexing, while metadata points at the production canonical origin. The dedicated metadata/robots E2E suite is green, but deployed Preview and Production behavior still require direct verification.

Median LCP is 2571.074 ms for HU and 2566.598 ms for EN. Both are roughly 66–71 ms over the 2.5 s production target, so production-like measurement remains an explicit performance risk. Raw reports and the machine-readable comparison are under `docs/portfolio-v2/final/lighthouse/`.

Cache behavior is intentionally simple: localized portfolio pages are rendered dynamically from repository-backed content without an application data cache; robots and sitemap plus case-study social images are build output; contact and health are explicitly dynamic/no-store; other social images are deterministic Edge routes with platform-managed response caching. No route uses time-based ISR. The complete route-family table is maintained in `README.md`.

## 10. Verification and release checklist

Repository checks:

- [x] The active branch is `rebuild/developer-portfolio-v2`.
- [x] The complete Next.js 16 change is one independently revertable commit (`3c1e8ff`).
- [x] `npm ci` succeeds from the lockfile.
- [x] The post-migration audit reported 0 vulnerabilities.
- [x] Both dependency audit commands pass again in the final clean-install gate.
- [x] Lint, typecheck, unit tests, and production build pass together in the final clean-install gate.
- [x] Unit suite passed: 21 files / 108 tests.
- [x] Production build generated 31 pages and the bundle budget passed.
- [x] Chromium axe 18/18 and visual 26/26 passed.
- [x] Optimized public case-study media suite passed 15/15 after commit `c68fcc9`.
- [x] Full current Chromium E2E suite passes 104/104.
- [x] Chromium/Firefox/WebKit release smoke passed 9/9.
- [x] Internal-link crawl passed 1/1.
- [x] Route/metadata/robots coverage passed in the recorded focused reruns.
- [ ] Keyboard, reduced-motion, 320 px, console, and long-English-copy checks pass.
- [x] Lighthouse comparison and bundle review are recorded.

Preview checks:

- [ ] Vercel Production Branch is directly verified as exactly `main`.
- [ ] The rebuild deployment is explicitly identified as Preview.
- [ ] Preview contact is disabled or isolated from Production recipients.
- [ ] Preview robots return noindex/nofollow behavior.
- [ ] Critical HU/EN routes and APIs pass Preview smoke testing.
- [ ] Preview URL and deployment evidence are recorded in the draft PR.
- [ ] Project-owner visual review is requested.

Checked items above are backed by the current local evidence. Unchecked manual items and all remote/Preview fields remain pending; this guide does not certify production readiness.

## 11. Rollback strategy

Rollback occurs only on the rebuild branch until the project owner separately authorizes a merge.

Preferred sequence:

1. identify the smallest feature or dependency commit responsible for the regression;
2. create a normal `git revert` commit on `rebuild/developer-portfolio-v2`;
3. rerun the complete local gate;
4. push the explicit rebuild ref;
5. validate the new Preview;
6. update the draft PR and incident note.

Do not rewrite shared history with `reset --hard` or force-push. Do not touch `main`, Production aliases, Production variables, or Production data as part of a Preview rollback.

Rollback units:

| Change | Preferred rollback |
| --- | --- |
| Content or route feature | Revert its small thematic commit, preserving later independent work where possible |
| Studio migration | Revert Studio commits only after confirming legacy route/function preservation |
| Contact hardening | Disable delivery first; revert the responsible commit only on the rebuild branch |
| Security headers | Revert only after reproducing the break and preserving safe minimum headers |
| Next.js 16 upgrade | Revert dedicated commit `3c1e8ff` as one unit, accounting for later dependent commits |
| Faulty Preview | Revert/fix on rebuild and create a new Preview; never promote or alter Production |

There is no database rollback because Portfolio V2 adds no database migration.

## 12. Production hand-off

Production hand-off is not part of the autonomous rebuild.

Before any merge, the project owner must review:

- the draft PR and commit sequence;
- final QA and Lighthouse evidence;
- Preview URL and environment isolation;
- content accuracy and confidentiality;
- missing CV and any other manual assets;
- branch protection and Vercel Production Branch settings;
- rollback plan.

Only explicit project-owner approval can authorize merging `main` or starting/promoting a Production deployment. Production smoke testing and rollback execution belong to the separately approved production phase.
