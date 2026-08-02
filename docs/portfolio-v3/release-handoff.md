# Portfolio V3 release handoff

Date: 2026-08-02

## Delivery scope

- Worktree: `digital-activision-portfolio-v3`
- Branch: `rebuild/editorial-industrial-v3`
- Base ref: `origin/rebuild/developer-portfolio-v2`
- Base commit: `3ea5300dc5f3c819c9e06fbbcd715ae1dea4e3a1`
- Target: draft pull request to `main`
- Production deployment: intentionally not started

The V3 implementation follows the supplied Hungarian specification and asset
manifest. It replaces the presentation layer with the light-first Editorial
Industrial system, rebuilds the localized homepage, Work and five case studies,
and refines the Lab and Studio routes without adding new portfolio claims,
screens, metrics, pricing, or scope.

## Assets and content

- 41 optimized portfolio assets are shipped under `public/portfolio-v3/`
  (1,325,341 bytes total).
- Both source CVs are published under `public/cv/` and protected by immutable
  size and SHA-256 assertions.
- Raw reference files are deliberately excluded from Git; asset regeneration
  starts by restoring the original Codex package documented in
  `asset-output.md`.
- The Work index keeps the specified order: Adott, Alba, Samsung, Sanjiwani,
  and QuestLog. Experiments remain a separate, visually subordinate group.
- Case-study evidence uses only supplied project material. The Samsung diagram
  is an anonymized explanatory composite and does not invent a product screen or
  additional measurement.

## Verification

The final `npm run quality:full` retry passed on 2026-08-02 after the first run
identified one transient hero-label contrast failure. The container opacity
fade was removed while retaining the motion cue, and the exact failing a11y test
passed before the single allowed full retry.

- ESLint: passed with zero warnings
- TypeScript: passed
- Vitest: 22 files, 124 tests passed
- Production build: passed; 35 static/dynamic route entries generated
- Homepage initial client JavaScript: 46.6 KiB gzip (165 KiB budget)
- Chromium E2E: 110 passed
- Chromium accessibility: 18 passed
- Chromium visual regression: 26 passed
- Internal-link release check: 1 passed
- Cross-browser release check: 9 passed across Chromium, Firefox, and WebKit
- `npm run audit:production`: 0 vulnerabilities
- `git diff --check`: passed before the final gate

Targeted development checks also covered the five case narratives, command
palette, localized contact states, reduced motion, lazy contact-form layout,
Lab interactions, Studio topology, and mobile/desktop overflow. Visual baselines
were updated in exactly three reviewed batches (14 + 4 + 8 = 26 snapshots).

## Lighthouse evidence

Lighthouse was run once against a local production server before the deferred
contact-form placeholder correction:

- Performance: 76
- Accessibility: 100
- Best Practices: 100
- SEO: 61
- LCP: 2,968 ms
- CLS: 0.4107
- Transfer size: 383,256 bytes

The report traced the measured CLS to the contact-form fallback being shorter
than the loaded form. After the measurement, the mobile and desktop fallback
heights were aligned and focused Playwright checks measured a `0px` footer
position shift at both viewports. Lighthouse was intentionally not rerun, so no
post-fix Lighthouse score is claimed.

The local SEO score reflects the intentional fail-closed local `robots.txt` and
local canonical validation. Production indexability and canonical generation
are covered by unit tests; Preview remains intentionally non-indexable.

## Preview and production checklist

- Confirm the single observed Vercel Preview check and open the generated URL.
- Smoke-test `/hu`, `/en`, Work, one case study, Lab, Studio, Privacy, both CV
  downloads, keyboard navigation, and a 320 px viewport on Preview.
- Keep Preview non-indexable and verify the configured canonical host before a
  later production release.
- Verify contact-delivery environment variables in the intended deployment
  environment; the application fails closed when delivery is unavailable.
- Merge and production deployment remain explicit follow-up actions and are not
  part of this handoff.
