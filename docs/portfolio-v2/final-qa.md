# Digital Activision Portfolio V2 – final QA record

This document records verified local evidence for `rebuild/developer-portfolio-v2`. It is an incremental QA record, not a production-readiness certificate.

Current boundary:

- Next.js 16 migration commit: `3c1e8ff`;
- tested executable head: `5f6aa44`;
- final clean-install gate: **passed**;
- GitHub remote checks: **pending**;
- Vercel Production Branch verification: **pending**;
- Vercel Preview URL and deployment validation: **pending**;
- `main` merge and Production deployment: not part of this QA phase.

No remote or deployment fact is inferred from local configuration.

## 1. Toolchain

| Tool | Verified version |
| --- | --- |
| Node.js | 20.19.3 |
| npm | 10.8.2 |
| Next.js | 16.2.12 |
| React / React DOM | 19.2.7 |
| Playwright | 1.61.1 |
| Lighthouse | 12.8.2 |

The lint stack is ESLint 10 flat config with direct `@next/eslint-plugin-next` 16.2.12, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, and `globals`. It does not use `eslint-config-next`.

## 2. Local quality evidence

| Gate | Recorded result | Status |
| --- | --- | --- |
| Clean-install dependency audits | 0 vulnerabilities in both security and production audits | Passed |
| Lint | ESLint completed with zero warnings | Passed |
| Typecheck | TypeScript completed without emit | Passed |
| Unit tests | 21 files, 108 tests | Passed |
| Production build | 31 generated pages | Passed |
| Homepage client bundle | 42.1 KiB gzip; budget 165 KiB | Passed |
| Chromium E2E | 104/104 | Passed |
| Chromium axe | 18/18 | Passed |
| Chromium visual | 26/26, including HU/EN full-page section rhythm | Passed |
| Internal-link crawl | 1/1 | Passed |
| Cross-browser release smoke | 9/9 across Chromium, Firefox, and WebKit | Passed |
| Optimized public case-study media | Targeted case-study suite 15/15 after `c68fcc9` | Passed |
| Final Playwright inventory | 104 E2E + 18 axe + 26 visual + 9 cross-browser + 1 link = 158/158 | Passed |
| Lighthouse | Three mobile runs per locale; medians recorded below | Completed locally |

### Combined Chromium run and correction

The earlier combined E2E, accessibility, and visual run contained 143 tests, before the optimized-image test was added:

- 141 passed on the first run;
- 2 smoke assertions failed because they expected an absolute `Location` header while the response correctly used a relative location;
- the two assertions were corrected;
- the targeted smoke suite then passed 7/7.

The mandated final `npm run quality:full` invocation passed lint, typecheck, 108 unit tests, the production build, bundle budget, and 104 E2E tests, then exposed two homepage axe contrast failures in the new light credibility strip. Commit `5f6aa44` darkens that semantic light-theme accent. After rebuilding, axe passed 18/18, the inspected visual suite passed 26/26, internal links passed 1/1, and the Chromium/Firefox/WebKit smoke passed 9/9. The aggregate final state is green; the full command was not invoked a second time.

## 3. Lighthouse comparison

Measurement method:

- Lighthouse 12.8.2 mobile preset;
- local Next.js production server;
- final V2 measurements: three runs per locale, median calculated independently for every metric;
- baseline measurements: the single recorded WP-01 report per locale;
- no `VERCEL_ENV` was set during the final local runs.

| Metric | HU baseline | HU V2 median | EN baseline | EN V2 median |
| --- | ---: | ---: | ---: | ---: |
| Performance | 98 | 96 | 98 | 96 |
| Accessibility | 96 | 100 | 96 | 100 |
| Best Practices | 100 | 100 | 100 | 100 |
| SEO | 92 | 58 | 92 | 58 |
| FCP | 909.361 ms | 1131.676 ms | 911.759 ms | 1115.236 ms |
| LCP | 2375.042 ms | 2571.074 ms | 2374.638 ms | 2566.598 ms |
| TBT | 30.5 ms | 85 ms | 28.5 ms | 92 ms |
| CLS | 0 | 0 | 0 | 0 |
| Total transferred bytes | 841,178 | 306,128 | 840,651 | 302,921 |

Machine-readable comparison: [`final/lighthouse/summary.json`](final/lighthouse/summary.json).

Raw final reports:

- [`homepage-hu-mobile-run-1.json`](final/lighthouse/raw/homepage-hu-mobile-run-1.json)
- [`homepage-hu-mobile-run-2.json`](final/lighthouse/raw/homepage-hu-mobile-run-2.json)
- [`homepage-hu-mobile-run-3.json`](final/lighthouse/raw/homepage-hu-mobile-run-3.json)
- [`homepage-en-mobile-run-1.json`](final/lighthouse/raw/homepage-en-mobile-run-1.json)
- [`homepage-en-mobile-run-2.json`](final/lighthouse/raw/homepage-en-mobile-run-2.json)
- [`homepage-en-mobile-run-3.json`](final/lighthouse/raw/homepage-en-mobile-run-3.json)

Baseline reports:

- [`baseline/lighthouse/homepage-hu-mobile.json`](baseline/lighthouse/homepage-hu-mobile.json)
- [`baseline/lighthouse/homepage-en-mobile.json`](baseline/lighthouse/homepage-en-mobile.json)

### SEO interpretation

The local SEO median of 58 is not treated as deployed Production SEO evidence. With `VERCEL_ENV` unset, the application intentionally fails indexing closed:

- `robots.txt` disallows crawling;
- metadata retains the configured Production canonical origin;
- Lighthouse therefore flags crawlability and canonical-origin checks.

The dedicated metadata and robots E2E coverage is green. Preview must still be verified as `noindex, nofollow`, and Production indexing/canonical behavior requires a separately authorized production-like check.

### LCP risk

The target Production LCP maximum is 2500 ms:

- HU median is 2571.074 ms: 71.074 ms over target;
- EN median is 2566.598 ms: 66.598 ms over target.

The difference is small but remains an explicit performance risk. A production-like Preview measurement should be compared before merge; this local result must not be rounded into a passing claim.

## 4. Bundle and build review

- Production build output: 31 pages.
- Homepage initial client JavaScript: 42.1 KiB gzip.
- Enforced budget: 165 KiB gzip.
- The contact experience is deferred from the initial homepage client path.
- The global `images.unoptimized` configuration has been removed.
- Case-study media uses `next/image`.

The bundle check is fail-closed through `npm run check:bundle` and is included in `npm run quality`.

## 5. Browser, accessibility, and visual coverage

Verified automated evidence:

- Chromium E2E passed 104/104;
- axe passed 18/18;
- visual regression passed 26/26;
- focused release smoke passed 3 tests in each of Chromium, Firefox, and WebKit, 9/9 total;
- the internal-link crawl passed 1/1;
- focused smoke after the relative `Location` fix passed 7/7.
- the targeted case-study suite, including explicit optimized public image coverage from `c68fcc9`, passed 15/15.

Still pending as manual/Preview release evidence:

- keyboard-only review of all critical routes;
- full 320 px route matrix, not only automated covered states;
- NVDA or VoiceOver smoke on landmarks, navigation, dialogs, Lab controls, case-study structure, and contact errors;
- browser review at 200% zoom;
- representative iPhone Safari and Android Chrome device checks;
- slow-network behavior;
- manual review of longer English line wrapping;
- manual console/page-error sweep across the final Preview;
- project-owner visual review on the Vercel Preview URL.

## 6. Known risks and limitations

1. Local Lighthouse SEO 58 is environment-driven and cannot substitute for Preview/Production SEO verification.
2. Median LCP remains 66–71 ms above the 2.5 s Production target.
3. Vercel Production Branch, Preview environment isolation, Preview URL, deployment metadata, and Preview checks are pending.
4. HU/EN CV assets are unavailable and the UI keeps the action disabled.
5. Bosch and both Freelancer timeline entries have no verified role/period source; Samsung and Adott also lack complete role/period evidence. The UI labels those facts as undocumented instead of inventing them, pending project-owner input.
6. Production environment values, aliases, domain, and runtime logs have not been inspected or changed.

## 7. Final clean-install gate

The completed code state was installed and checked before documentation-only hand-off changes:

```powershell
npm ci
npm run audit:security
npm run audit:production
npm run quality:full
```

| Field | Value |
| --- | --- |
| Tested executable commit | `5f6aa44` |
| `npm ci` | Passed; 261 packages installed, 262 audited |
| `audit:security` | Passed; 0 vulnerabilities |
| `audit:production` | Passed; 0 vulnerabilities |
| `quality:full` | One invocation exposed the light-theme contrast defect after all earlier stages passed; the concrete fix was rebuilt and every affected/remaining gate then passed |
| Final local gate conclusion | **green** |

## 8. Remote and deployment hand-off

| Field | Value |
| --- | --- |
| Vercel project/team | **pending manual verification** |
| Vercel Production Branch | **pending; must be exactly `main`** |
| Remote rebuild branch SHA | **pending** |
| Draft PR URL | **pending** |
| GitHub checks | **pending** |
| Vercel environment | **pending; must be Preview** |
| Vercel Preview URL | **pending** |
| Preview contact isolation | **pending** |
| Preview robots noindex | **pending** |
| Preview smoke | **pending** |

Use [`deployment-checklist.md`](deployment-checklist.md) for the authorized one-shot remote workflow. Do not merge `main` or deploy/promote to Production without explicit project-owner approval.
