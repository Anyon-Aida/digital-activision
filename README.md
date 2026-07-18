# Digital Activision – Developer Portfolio V2

A bilingual, developer-first portfolio for Kovács Zalán, built with the Next.js App Router. The rebuild keeps the existing agency material available under Studio while introducing typed case studies, an Engineering Lab, accessible interaction primitives, and a fail-closed quality pipeline.

## Local requirements

- Node.js 20.19.3 (see `.node-version` and `.nvmrc`)
- npm 10.8.2 or a lockfile-compatible npm release
- Chromium installed through Playwright for browser tests

```powershell
npm ci
npx playwright install chromium
npm run dev
```

The default local URL is `http://localhost:3000`; `/` redirects to the Hungarian locale. English content is available below `/en`.

## Quality gates

```powershell
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
npm run test:a11y
npm run test:visual
```

`npm run quality` runs lint, typecheck, unit tests, and a production build. `npm run quality:full` also runs the Chromium E2E, axe accessibility, and visual suites. The build is intentionally fail-closed: lint and type errors are not bypassed.

Visual snapshots are platform-specific. Linux CI owns the functional and accessibility gates; the Windows CI job owns the checked-in Windows screenshot baseline.

## Environment contract

Copy `.env.example` to `.env.local` and fill only the values required for the feature being exercised. Never commit `.env.local` or real credentials.

The contact flow must remain disabled when its provider configuration is incomplete. Preview and local environments must not silently send production mail. Vercel system variables are consumed when present and do not belong in committed env files.

## Repository structure

```text
src/app/                 App Router pages, layouts, metadata and API routes
src/i18n/                Locale routing and request configuration
src/components/          Shared UI and feature components (V2 target)
src/content/             Validated localized portfolio content (V2 target)
tests/e2e/               Route and interaction coverage
tests/a11y/              Automated axe coverage
tests/visual/            Playwright visual regression coverage
docs/portfolio-v2/       Audit, QA, migration and deployment evidence
public/projects/         Preserved standalone legacy demos
```

Server Components are the default. Client Components are limited to interaction islands such as dialogs, the command palette, the architecture explorer, and the contact form.

## Branch and deployment safety

Portfolio V2 work is developed on `rebuild/developer-portfolio-v2` in an isolated worktree. The protected delivery workflow is:

1. run the full local quality gate;
2. verify that Vercel's Production Branch is exactly `main`;
3. push only the explicit rebuild branch ref;
4. inspect the Vercel Preview deployment;
5. open or update a draft pull request.

Do not push or merge `main`, run a production deployment, promote a Preview deployment, or change production environment variables without explicit project-owner approval.

Baseline findings and rollback guardrails are documented in `docs/portfolio-v2/baseline-audit.md`.
