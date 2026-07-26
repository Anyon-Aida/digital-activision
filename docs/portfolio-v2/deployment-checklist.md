# Digital Activision Portfolio V2 – deployment and Preview checklist

This checklist authorizes only the `rebuild/developer-portfolio-v2` branch and a Vercel **Preview** deployment. It does not authorize a `main` merge, Preview promotion, Production deployment, Production environment change, alias change, domain change, or data migration.

Remote status in this document is initially **pending**. Fill fields only from direct evidence and never record secret values.

## 1. Final local gate before push

- [x] Active worktree is the isolated Portfolio V2 sibling worktree.
- [x] Active branch is exactly `rebuild/developer-portfolio-v2`.
- [x] No local `main` ref is used as a work or push target.
- [x] Documentation and source changes are committed in small thematic commits.
- [ ] Worktree is clean after the final documentation commit.
- [x] The Next.js 16.2.12 migration is isolated in `3c1e8ff`.
- [x] `npm ci` succeeds from `package-lock.json`.
- [x] `npm run audit:security` reports no blocking finding.
- [x] `npm run audit:production` reports no blocking finding.
- [x] `npm run quality:full` succeeds on the final executable commit.
- [x] Final results are copied to `final-qa.md` without altering historical evidence.

Commands:

```powershell
git status --short --branch
git rev-parse --abbrev-ref HEAD
git rev-parse HEAD
git diff --stat origin/main...HEAD
git log --oneline --decorate origin/main..HEAD
npm ci
npm run audit:security
npm run audit:production
npm run quality:full
```

Final local fields:

| Field | Value |
| --- | --- |
| Tested executable commit | `5f6aa44` |
| Worktree clean | **verify immediately before push** |
| Clean install | Passed |
| Security audits | Passed; 0 vulnerabilities |
| Full quality gate | Green aggregate: 108 unit + 158 Playwright checks, production build and bundle gate |

## 2. Mandatory Vercel Production Branch check

Before push, inspect the actual Vercel project directly. GitHub’s default branch and historical deployment metadata are not sufficient substitutes.

- [ ] Correct Vercel team is open.
- [ ] Correct Digital Activision project is open.
- [ ] `Project Settings → Git → Production Branch` is exactly `main`.
- [ ] Latest Production deployment’s Git source branch is `main`.
- [ ] No wildcard or branch rule classifies `rebuild/developer-portfolio-v2` as Production.
- [ ] Git integration points to `Anyon-Aida/digital-activision`.
- [ ] No Production setting, value, domain, alias, or deployment was changed during verification.

Evidence fields:

| Field | Value |
| --- | --- |
| Vercel team | **pending manual verification** |
| Vercel project | **pending manual verification** |
| Production Branch | **pending; required value `main`** |
| Latest Production source branch | **pending; required value `main`** |
| Verification method | **pending** |
| Verifier | **pending** |

Do not push until the Production Branch field has direct evidence.

## 3. Explicit branch push and draft PR

Recheck the branch, SHA, and push destination immediately before publishing:

```powershell
git status --short --branch
git rev-parse --abbrev-ref HEAD
git rev-parse HEAD
git push origin HEAD:refs/heads/rebuild/developer-portfolio-v2
```

- [ ] Only the explicit rebuild refspec was pushed.
- [ ] `main` was not pushed.
- [ ] Draft PR targets `main`.
- [ ] Draft PR uses `draft-pr.md` and contains no secret values.
- [ ] Draft PR records current test evidence, Lighthouse comparison, screenshots, env-name changes, limitations, and rollback.
- [ ] `Production merge not performed` remains checked.

| Field | Value |
| --- | --- |
| Pushed SHA | **pending** |
| Remote branch | **pending** |
| Draft PR URL | **pending** |

## 4. Preview environment isolation

Inspect names/scopes only; do not print values.

- [ ] Deployment environment is `Preview`.
- [ ] Git source branch is `rebuild/developer-portfolio-v2`.
- [ ] Preview does not use a Production database.
- [ ] Contact is disabled, or `CONTACT_FORM_ENABLED` and `CONTACT_PREVIEW_ENABLED` are intentionally enabled together.
- [ ] Enabled Preview contact uses `CONTACT_PREVIEW_TO` and `CONTACT_PREVIEW_FROM`, never `CONTACT_TO`/`CONTACT_FROM`.
- [ ] Preview has an isolated SMTP/sandbox setup.
- [ ] Preview has the HTTPS external rate limiter configuration.
- [ ] Preview has both Turnstile keys.
- [ ] `CONTACT_ALLOWED_ORIGINS` contains the exact intended Preview origin.
- [ ] No Production variable, recipient, alias, or domain was modified.

| Field | Value |
| --- | --- |
| Preview contact mode | **pending: disabled or isolated** |
| Required Preview variable names present | **pending** |
| Production recipient isolation | **pending** |

## 5. Preview validation

- [ ] Deployment metadata says `Environment: Preview`.
- [ ] Deployment metadata identifies the exact rebuild branch and pushed SHA.
- [ ] Preview URL is recorded in the draft PR.
- [ ] `/robots.txt` disallows indexing and metadata is `noindex, nofollow`.
- [ ] `/hu` and `/en` return 200.
- [ ] Work index and all four case studies load in both locales as applicable.
- [ ] Lab, Studio, privacy, health, sitemap, social images, and localized 404 are checked.
- [ ] Legacy redirects retain their exact permanent targets.
- [ ] Contact is verified only in its safe Preview mode.
- [ ] No critical console/page error is observed.
- [ ] Full keyboard-only critical-route smoke passes.
- [ ] NVDA or VoiceOver smoke passes for landmarks, navigation, dialogs, Lab, case studies, and contact errors.
- [ ] 200% browser zoom remains usable without lost content or controls.
- [ ] 320 px, representative iPhone Safari, and Android Chrome checks pass.
- [ ] Slow-network and longer-English-copy checks pass.
- [ ] Preview Lighthouse/LCP risk is reviewed.
- [ ] Project-owner visual review is requested.

| Field | Value |
| --- | --- |
| Preview URL | **pending** |
| Preview deployment ID | **pending** |
| Preview SHA | **pending** |
| Preview robots | **pending** |
| Preview smoke | **pending** |
| Project-owner visual review | **pending** |

## 6. One-shot final remote evidence block

Remote checks must not be polled. After the expected GitHub/Vercel work has had time to complete, run one final combined observation block. Do not use a loop, retry loop, `watch`, or repeated status calls. If a check is still pending, record it as pending and stop.

```powershell
$gh = "C:\Program Files\GitHub CLI\gh.exe"
$repo = "Anyon-Aida/digital-activision"
$branch = "rebuild/developer-portfolio-v2"

& $gh pr view $branch --repo $repo --json number,url,isDraft,baseRefName,headRefName,headRefOid,state,statusCheckRollup
& $gh pr checks $branch --repo $repo
& $gh api "repos/$repo/deployments?ref=$branch&per_page=20" --jq "map({id, ref, sha: (.sha[0:12]), environment, created_at, updated_at, production_environment, transient_environment})"
```

One-shot evidence:

| Field | Value |
| --- | --- |
| Observation performed | **pending** |
| PR remains draft | **pending** |
| Base/head refs correct | **pending** |
| GitHub checks | **pending** |
| Vercel Preview check | **pending** |
| Preview deployment metadata | **pending** |

## 7. Rollback and stop boundary

If the Preview or checks fail:

1. do not merge;
2. identify the smallest responsible rebuild commit;
3. create a normal revert/fix commit on `rebuild/developer-portfolio-v2`;
4. rerun the complete local gate;
5. push only the explicit rebuild ref;
6. create a new Preview and update the draft PR.

Do not use `reset --hard`, force-push shared history, promote an older Preview, alter Production aliases, or touch Production data.

Stop before:

- merging the PR;
- marking the PR ready for Production approval if evidence is incomplete;
- promoting Preview;
- deploying Production;
- changing Production environment variables.

Those actions require a new, explicit project-owner approval.
