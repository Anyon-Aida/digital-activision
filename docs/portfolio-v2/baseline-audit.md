# Digital Activision Portfolio V2 – baseline audit

> Állapotfelvétel a V2 rebuild megkezdése előtt. A dokumentum nem tartalmaz titkos értéket, és nem igazol production deploymentet.

## 1. Hatókör és pillanatfelvétel

- Audit dátuma: 2026-07-18
- Repository: `https://github.com/Anyon-Aida/digital-activision.git`
- Auditált commit: `d5a1aa2c7f9c73afe81b40c70c940571c7439c31` (`origin/main` az audit idején)
- Auditált branch: `rebuild/developer-portfolio-v2`
- Auditált worktree: `C:\Users\Maou-Senpai\Documents\frontend\digital_activision\digital-activision-portfolio-v2`
- Eredeti checkout: `C:\Users\Maou-Senpai\Documents\frontend\digital_activision\digital-activision`
- Az auditált worktree a méréskor tiszta volt.
- A rebuild branchnek a méréskor nem volt upstreamje és távoli branche.
- Commit, push, PR, merge vagy deployment az állapotfelvétel részeként nem történt.

Ez a dokumentum a rebuild előtti tényállapotot rögzíti. A későbbi dependency-advisory adatbázis, Vercel-konfiguráció vagy távoli repository-beállítás változhat; az ilyen adatokat az első push előtt újra kell ellenőrizni.

## 2. Git- és worktree-biztonság

| Ref vagy worktree | Commit | Auditkori állapot |
| --- | --- | --- |
| `origin/main` | `d5a1aa2` | a rebuild kiindulópontja |
| `rebuild/developer-portfolio-v2` | `d5a1aa2` | elkülönített V2 branch, nincs upstream |
| eredeti checkout: `2026-04-01-s94l` | `d5a1aa2` | külön worktree, nem módosítható a rebuild során |
| lokális `main` | `04805c2` | 1 committal az `origin/main` előtt; tiltott ref, nem használható és nem pusholható |

Kötelező git guardrail:

- Minden fejlesztés kizárólag a V2 worktree-ben és a `rebuild/developer-portfolio-v2` branchen történhet.
- A lokális `main` ref sem kiindulási, sem push-forrásként nem használható.
- A távoli push mindig explicit célú legyen: `HEAD:refs/heads/rebuild/developer-portfolio-v2`.
- Tilos a `main` közvetlen módosítása, merge-e, force-push-a vagy production deployja.
- A PR csak draftként, `base: main`, `head: rebuild/developer-portfolio-v2` beállítással hozható létre.
- Auto-merge nem engedélyezhető. A merge kizárólag külön, kifejezett tulajdonosi jóváhagyás után történhet.
- A Next.js 16 frissítés csak stabil quality gate után, külön és egyszerűen visszavonható commitban végezhető el.

Auditkor a publikus GitHub-beállítások alapján a `main` nem volt védettként jelölve, repository ruleset és GitHub Actions workflow nem volt, a Vercel státusz pedig az egyetlen megfigyelt távoli ellenőrzés volt. Emiatt a fenti kézi guardrailek nem opcionálisak.

## 3. Toolchain és reprodukálhatóság

| Elem | Baseline |
| --- | --- |
| Operációs rendszer | Windows / PowerShell |
| Node.js | `v20.19.3` |
| npm | `10.8.2` |
| Package manager | npm |
| Lockfile | `package-lock.json`, lockfile v3 |
| Next.js | `15.5.9` |
| React / React DOM | `19.1.0` |
| TypeScript | `^5`, `strict: true`, `noEmit: true` |
| Build parancs | `next build --turbopack` |
| Dev parancs | `next dev --turbopack` |

Hiányzó reprodukálhatósági elemek:

- nincs `engines` mező a `package.json` fájlban;
- nincs `.nvmrc`, `.node-version` vagy más Node-verziórögzítés;
- nincs `packageManager` mező;
- nincs `.env.example` vagy dokumentált környezeti szerződés;
- nincs külön `typecheck`, unit, E2E, accessibility vagy visual-test script;
- nincs CI workflow, amely a lokális quality gate-et távolról kikényszerítené.

## 4. Baseline quality gate

Az alábbi eredmények a `d5a1aa2` kiinduló állapothoz tartoznak.

| Ellenőrzés | Eredmény | Megjegyzés |
| --- | --- | --- |
| `npm ci` | sikeres | 440 csomag auditálva a telepítési kimenet szerint |
| `npm run lint` | sikertelen | 13 találat: 2 error, 11 warning |
| `npm run build` | sikeres | a Next build type-validációja lefutott |
| külön typecheck | nincs | nincs dedikált npm script |
| unit teszt | nincs | nincs runner vagy tesztkészlet |
| E2E teszt | nincs | nincs Playwright/Cypress konfiguráció |
| accessibility teszt | nincs | nincs axe-alapú automatizálás |
| visual regression | nincs | nincs screenshot baseline vagy diff |
| CI | nincs | `.github/workflows` nem volt jelen |

### 4.1 Lint blokkolók

| Fájl | Sor | Szabály |
| --- | ---: | --- |
| `src/app/components/pricing/Pricing.tsx` | 111 | `@typescript-eslint/no-explicit-any` |
| `src/app/components/process/Process.tsx` | 173 | `@typescript-eslint/no-explicit-any` |

A 11 warning megoszlása:

- 2 `no-unused-expressions` a legacy hamburger demo JavaScriptjében;
- 4 `no-unused-vars` a Nati demo kliens- és szerverfájljában;
- 1 nem használt `switchHref` a mobil/desktop navigációban;
- 4 `@next/next/no-img-element` warning a Footer, StickyNav és Process komponensekben.

### 4.2 Fail-open build

A `next.config.ts` az audit idején ezt tartalmazta:

- `eslint.ignoreDuringBuilds: true`;
- `images.unoptimized: true`.

Ezért a production build a lint hibák ellenére zöld volt, és a kimenetben `Skipping linting` jelent meg. A sikeres baseline build tehát nem jelent teljes quality-gate sikert. A fail-closed alapozásnak meg kell szüntetnie ezt az eltérést.

## 5. Dependency- és security baseline

### 5.1 Közvetlen runtime dependency-k

| Csomag | Baseline verzió |
| --- | --- |
| `next` | `15.5.9` |
| `react`, `react-dom` | `19.1.0` |
| `next-intl` | `^4.3.5` |
| `framer-motion` | `^12.23.12` |
| `lucide-react` | `^0.542.0` |
| `react-hook-form` | `^7.62.0` |
| `@hookform/resolvers` | `^5.2.1` |
| `zod` | `^4.1.5` |
| `nodemailer` | `^7.0.6` |
| `resend` | `^6.0.2` |

Az audit idején a `react-hook-form`, resolver, Zod és Resend csomagok jelen voltak, de a tényleges kontaktfolyam nem ezekre épült. A `next-intl` szintén telepítve volt, miközben az oldal saját JSON-dictionary megoldást használt.

### 5.2 `npm audit`

Teljes dependency-fa:

| Severity | Darab |
| --- | ---: |
| critical | 1 |
| high | 6 |
| moderate | 24 |
| low | 1 |
| összesen | 32 |

Production dependency-k (`npm audit --omit=dev`):

| Severity | Darab |
| --- | ---: |
| high | 2 |
| moderate | 2 |
| összesen | 4 |

Productionben érintett csomagok az audit idején:

- `next` – közvetlen, high;
- `nodemailer` – közvetlen, high;
- `next-intl` – közvetlen, moderate;
- `postcss` – tranzitív, moderate.

A teljes fán található critical `fast-xml-parser` tranzitív/dev útvonalon érkezett; a többi high találat között `flatted`, `minimatch`, `picomatch` és `tar` is szerepelt. Az advisory adatbázis időfüggő, ezért minden push előtt újra futtatandó mind a teljes, mind a production-only audit.

Kockázatkezelési elv:

- patch/minor, kompatibilis security frissítések külön review-olható commitban;
- major framework- vagy mail-provider migráció nem keverhető a baseline javításokkal;
- `npm audit fix --force` automatikus futtatása tilos;
- Next.js 16 csak a már stabil build és teljes tesztkészlet után, a legfrissebb stabil – nem canary/preview – kiadással kerülhet külön commitba.

## 6. Route inventory

### 6.1 App Router és konfigurált rewrite

| Forrás | Útvonal | Implementáció / baseline viselkedés |
| --- | --- | --- |
| `src/app/page.tsx` | `/` | szerveroldali redirect `/hu` felé |
| `src/app/[locale]/page.tsx` | `/:locale` | HU/EN főoldal; bármely más egyszegmenses útvonalat is elfogad és HU-ra koercionál |
| `src/app/api/contact/route.ts` | `/api/contact` | csak `POST`; Nodemailer/SMTP alapú küldés |
| `next.config.ts` | `/works/:slug` | rewrite `/projects/:slug/` célra |
| `src/app/favicon.ico` | `/favicon.ico` | statikus ikon |

A `generateStaticParams` csak `hu` és `en` értéket ad vissza, de futásidőben nincs locale-validáció vagy `notFound()`. Emiatt a dinamikus egyszegmenses route soft-404-kat hoz létre.

### 6.2 Legacy statikus demo inventory

| Demo | HTML belépési pont | További tartalom |
| --- | --- | --- |
| Hamburger | `/projects/hamburger/index.html` | `app.js`, `styles.css`, 3 raster asset |
| Boxer Hero | `/projects/boxer-hero/index.html` | `app.js`, `styles.css`, 2 JPG és 3 social SVG |
| Nati | `/projects/nati/index.html` | `app.js`, `styles.css`, 2 SVG, publikus `server.js` |
| Nati chat | `/projects/nati/chat/index.html` | külön HTML, `/projects/nati/` base URL-lel |

A project kártyák a locale JSON-ban `/works/hamburger/`, `/works/boxer-hero/` és `/works/nati/` linkeket használnak. A szép URL-ek a helyi production smoke során nem szolgálták ki a demo HTML-t.

### 6.3 Helyi production smoke eredmények

A smoke a sikeres baseline `next build` után futó helyi production szerveren készült.

| Kérés | Eredmény | Értékelés |
| --- | --- | --- |
| `GET /` | `307` → `/hu` | elvárt redirect |
| `GET /hu` | `200` | működik |
| `GET /en` | `200` | működik, de globális HTML/SEO nyelve hibás |
| `GET /de` | `200`, HU főoldal | hibás soft-404 |
| `GET /work` | `200`, HU főoldal | hibás soft-404 |
| `GET /lab` | `200`, HU főoldal | hibás soft-404 |
| `GET /studio` | `200`, HU főoldal | hibás soft-404 |
| `GET /adatkezeles` | `200`, HU főoldal | hibás soft-404; a footer link nem privacy oldalt nyit |
| `GET /hu/work` | `404` | V2 route még nincs |
| `GET /hu/lab` | `404` | V2 route még nincs |
| `GET /hu/studio` | `404` | V2 route még nincs |
| `GET /en/privacy` | `404` | törött footer link |
| `GET /api/contact` | `405` | a POST-only route létezik |
| `GET /api/health` | `404` | health endpoint nincs |
| `GET /works/hamburger/` | `404` | törött legacy szép URL |
| `GET /works/boxer-hero/` | `404` | törött legacy szép URL |
| `GET /works/nati/` | `404` | törött legacy szép URL |
| `GET /projects/hamburger/` | `404` | könyvtárindex nincs automatikusan kiszolgálva |
| `GET /projects/hamburger/index.html` | `200` | közvetlen statikus fájl működik |
| `GET /projects/boxer-hero/index.html` | `200` | közvetlen statikus fájl működik |
| `GET /projects/nati/index.html` | `200` | közvetlen statikus fájl működik |

Megjegyzés: valós kontaktküldés nem része a baseline smoke-nak; az audit nem küldött e-mailt és nem olvasott környezeti titkokat.

## 7. Component inventory

### 7.1 Oldalstruktúra

| Fájl / komponens | Szerep | Renderelési megjegyzés |
| --- | --- | --- |
| `src/app/layout.tsx` | globális metadata, skip link, StickyNav, Footer | globálisan HU nyelv és metadata |
| `src/app/Homepage.tsx` | főoldali szekciók összeállítása | szerverkomponens, de minden fő gyerek klienskomponens |
| `Hero` | hero és fő CTA-k | Client Component |
| `Features` | értékajánlat-kártyák | Client Component, Framer Motion |
| `Services` | szolgáltatások | Client Component, Framer Motion |
| `Works` | project-kártyák és legacy linkek | Client Component, Framer Motion, `next/image` |
| `Process` | reszponzív interaktív folyamat | Client Component, saját touch/click animáció |
| `Pricing` | csomagok és CTA-k | Client Component, Framer Motion |
| `ContactCTA` | kapcsolatfelvételi űrlap | Client Component, Framer Motion, Formspree |
| `StickyNav` | fix fejléc, mobilmenü, locale-váltó | Client Component |
| `Footer` | navigáció, ál-hírlevél, térkép, kontakt | Client Component |

Mind a kilenc fő vizuális komponens `use client` határ alatt fut; közülük öt közvetlenül Framer Motiont importál. Ez indokolatlanul nagy hidratációs és JavaScript-felületet okozhat, különösen a statikus tartalmi szekcióknál.

### 7.2 Tartalmi adatforrások

- `src/locales/hu/common.json`
- `src/locales/en/common.json`
- `src/lib/i18n.ts`, amely a JSON-fájlokat egy `Record<Locale, Dict>` objektumba tölti.

A locale tartalom és a projektlista egyetlen nagy `common.json` fájlban keveredik. Nincs typed case-study domain model, slug-validáció vagy build-időben ellenőrzött kapcsolat a project metaadat és a route között.

## 8. Asset inventory és performance kockázatok

### 8.1 Méretösszesítés

| Csoport | Méret |
| --- | ---: |
| teljes `public` könyvtár | 16 524 133 byte, kb. 15,76 MiB |
| 6 Process PNG | 12 528 708 byte, kb. 11,95 MiB |
| teljes `public/projects` | 3 982 155 byte, kb. 3,80 MiB |

Legnagyobb egyedi fájlok:

| Asset | Kb. méret |
| --- | ---: |
| `public/process/6-launch.png` | 2,30 MiB |
| `public/process/2-plan.png` | 2,17 MiB |
| `public/process/5-dev.png` | 2,09 MiB |
| `public/process/4-design.png` | 1,97 MiB |
| `public/process/3-wire.png` | 1,86 MiB |
| `public/process/1-discovery.png` | 1,56 MiB |
| `public/projects/nati_chat.png` | 0,78 MiB |
| `public/projects/alba_pool.png` | 0,60 MiB |

### 8.2 Performance megállapítások

- A Next képoptimalizálás globálisan ki van kapcsolva (`images.unoptimized: true`).
- Több fő UI-komponens nyers `<img>` elemet használ.
- A hat Process illusztráció egyszerre része a DOM-nak és összesen 11,95 MiB.
- A kilenc fő vizuális komponens mind hidratálódik, öt Framer Motion runtime-ot használ.
- A Process szekció fix `1100px` magasságot és sok layout-/resize-/touch-logikát használ.
- Nincs bundle-, asset- vagy route-szintű performance budget.
- Nincs automatikus Lighthouse vagy Core Web Vitals ellenőrzés.
- A legacy demók saját JS/CSS és raster asseteket töltenek, a Next pipeline-ját megkerülve.
- A `public/projects/nati/server.js` statikus publikus fájlként hozzáférhető; szerverkódnak vagy belső implementációs mintának nem a `public` könyvtárban van a helye.

A nyers audit idején még nem készült rögzített Lighthouse- és visual-regression baseline. A WP-01 lezárásakor ezeket ugyanazon, lokális production buildről rögzítettük.

### 8.3 Rögzített Lighthouse baseline

Mérési környezet: Next.js 15.5.20 production szerver, Node.js 20.19.3, Lighthouse 12.8.2 mobile preset, headless Chromium, Windows 10. A mérés lokális HTTP szerveren futott, ezért laboreredmény; nem Vercel- vagy valós felhasználói mérés.

| Route | Performance | Accessibility | Best Practices | SEO | FCP | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `/hu` | 98 | 96 | 100 | 92 | 0,91 s | 2,38 s | 31 ms | 0 |
| `/en` | 98 | 96 | 100 | 92 | 0,91 s | 2,38 s | 29 ms | 0 |

A teljes, géppel olvasható riportok a `docs/portfolio-v2/baseline/lighthouse/` könyvtárban vannak. Az accessibility 96-os értéke a baseline hiányossága; a WP-01 axe gate ettől függetlenül 0 serious/critical hibával futott le.

### 8.4 Rögzített screenshot baseline

A HU és EN főoldalt az előírt négy viewporton rögzítettük:

- mobile: 390×844;
- tablet: 768×1024;
- desktop: 1440×1000;
- wide: 1920×1080.

A nyolc PNG a `docs/portfolio-v2/baseline/screenshots/` könyvtárban található. Ezek audit-artifactok, nem a runtime bundle részei. A Playwright visual regression külön, stabilizált teszt-snapshotot használ.

## 9. Accessibility kockázatok

Prioritás szerint:

1. A mobilmenü gombján nincs `aria-expanded` és `aria-controls`; a címke nem locale-függő.
2. A becsukott mobilmenü `aria-hidden`, de a benne lévő fókuszolható linkek DOM-ban maradnak; nincs Escape-kezelés, fókusz-visszaadás vagy fókuszmenedzsment.
3. A Process elsődleges váltása panel-click és touch gesture; a timeline gombjai `disabled` állapotúak, ezért billentyűzettel nem kezelhető teljes értékűen.
4. Nincs `prefers-reduced-motion` vagy `useReducedMotion` kezelés az ismétlődő és belépési animációkhoz.
5. A kontakt `Field` labeljei nincsenek `htmlFor`/`id` párral a beviteli mezőkhöz kötve.
6. A kontakt sikerállapot nem rendelkezik megbízható `role="status"`/`aria-live` szemantikával; a hibák blokkoló `alert()` üzenetek.
7. A skip link szövege és a globális dokumentumnyelv mindig magyar, az angol route-on is.
8. A Works új ablakos linkjének aria-labelje mindig magyar.
9. A navigáció és footer több hash-linkje nem route-aware; aloldalról hibás célhoz vezethet.
10. Nincs automatizált axe teszt, billentyűzetes regresszióteszt vagy dokumentált kézi screen-reader ellenőrzés.

Pozitív baseline-elemek: van skip link, a fő landmarknak van `id`, több navigáció és iframe kapott akadálymentes nevet, a footer státuszmező `aria-live` attribútumot használ. Ezek azonban nem fedik le a fenti interakciós hibákat.

## 10. i18n- és routing kockázatok

- Támogatott locale-ok deklaráltan `hu` és `en`, de futásidőben bármely egyszegmenses URL HU tartalommá válik.
- A root layout `<html lang="hu">` értéke az angol oldalon is megmarad.
- A globális title és description magyar; nincs locale-onkénti `generateMetadata`.
- A StickyNav és Footer a pathname elejéből, kliensoldalon következteti ki a locale-t.
- A nyelvváltó nem általános, typed localized routingra épül.
- A `next-intl` telepítve van, de nincs egységesen integrálva.
- Nincs locale-aware 404, error vagy not-found állapot.
- Nincs teljes HU/EN route-paritás.
- Az érvénytelen locale-ok soft-404-ja duplikált indexelhető HU tartalmat eredményezhet.

## 11. SEO és tartalmi kockázatok

- Nincs locale-specifikus canonical és `hreflang` alternate.
- Nincs `sitemap.xml`, `robots.txt`, Open Graph, Twitter metadata vagy strukturált adat.
- Nincs saját 404/error oldal.
- A legacy Works URL-ek töröttek, ami belső linkhibát és crawl-veszteséget okoz.
- Az `/adatkezeles` soft-404 HU főoldalt ad, az `/en/privacy` 404-et ad.
- A globális magyar metadata és `lang` az angol route szemantikáját rontja.
- A képoptimalizálás hiánya LCP-t és crawl/render költséget ronthat.
- A következő állítások publikálás előtt bizonyítékot vagy óvatosabb megfogalmazást igényelnek: „Hazai csapat”, „Határidő-garancia”, „Mérhető eredmények”, „jobb Google-pozíció”, illetve az ezekkel egyenértékű angol állítások.

## 12. Contact rendszer és observability kockázatok

### 12.1 Két egymástól eltérő kontaktút

- A fő kontaktűrlap közvetlenül egy hard-coded Formspree URL-re küld.
- A saját `/api/contact` Nodemailer/SMTP route létezik, de a UI nem használja.
- A Footer „hírlevél” nem hív backendet; 600 ms várakozás után mindig sikert jelez.
- A Nati demo kliens `/api/chat` jellegű backend-integrációt feltételez, de az alkalmazásban nincs ilyen route.

### 12.2 Szerveroldali hardening hiányai

- minimális presence és regex-alapú e-mail validáció;
- nincs Zod-alapú schema, mezőhossz- vagy request-size limit;
- nincs rate limit, abuse protection vagy szerveroldali honeypot;
- nincs explicit origin-policy vagy idempotencia;
- nincs egységes, lokalizált hiba-contract;
- a mail-provider és transport döntés nincs egységesítve;
- a dependency-k között egyszerre szerepel Nodemailer és Resend;
- nincs health/readiness endpoint;
- nincs request ID, strukturált log, tracing, metrika vagy külső error monitoring;
- a route csak `console.error` naplózást használ.

### 12.3 Jelenlegi környezeti változónevek

Az audit nem olvasott és nem dokumentál értékeket. A meglévő SMTP route a következő neveket használja:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_TO`
- `CONTACT_FROM`

A `SMTP_PORT` alapértéke 587, a `CONTACT_FROM` fallbackje `SMTP_USER`. A tényleges Preview contractot a kontakt-hardening fázis választott provideréhez kell véglegesíteni, `.env.example` fájlban csak placeholderrel dokumentálva. Production környezeti változó nem módosítható ebben a rebuildben kifejezett jóváhagyás nélkül.

## 13. Vercel production-branch ellenőrzési checklist

Az első branch-push előtt az alábbi ellenőrzést ember által olvasható bizonyítékkal kell elvégezni. A baseline audit során a Vercel projekt tényleges Production Branch beállítása nem volt közvetlenül ellenőrizhető, ezért ez push-blocker.

- [ ] A megfelelő Vercel team és a Digital Activision projekt van megnyitva.
- [ ] `Project Settings → Git → Production Branch` értéke pontosan `main`.
- [ ] A legutóbbi Production deployment Git source branche `main`; nem feature branch.
- [ ] A `rebuild/developer-portfolio-v2` branch deployment típusa Preview lesz.
- [ ] Nincs branch wildcard vagy más beállítás, amely a rebuild branchet productionként kezeli.
- [ ] A GitHub/Vercel integration a megfelelő `Anyon-Aida/digital-activision` repositoryhoz kapcsolódik.
- [ ] Preview deploymenthez szükséges változónevek elérhetők a Preview scope-ban; értéküket nem kell és nem szabad naplózni.
- [ ] Production env értékhez, domainhez vagy deploymenthez nem történt módosítás.
- [ ] Az ellenőrzés időpontja és végzője bekerül a PR leírásába vagy a QA-jegyzőkönyvbe.

Közvetlen push előtti git ellenőrzés:

```powershell
git status --short --branch
git rev-parse --abbrev-ref HEAD
git rev-parse HEAD
git diff --stat origin/main...HEAD
git log --oneline --decorate origin/main..HEAD
```

Elvárt aktív branch: `rebuild/developer-portfolio-v2`. Push csak explicit refspecgel:

```powershell
git push origin HEAD:refs/heads/rebuild/developer-portfolio-v2
```

Nem használható: implicit `git push`, `git push origin main`, `vercel --prod`, production promotion vagy production alias-módosítás.

## 14. Preview és rollback guardrailek

### Preview

- Minden munkacsomag kis, tematikus, review-olható commitokra bomlik.
- Push előtt a teljes helyi quality gate kötelező, nem csak a releváns részteszt.
- A Vercel deployment metadata oldalán ellenőrizni kell, hogy `Environment: Preview` és a Git branch a rebuild branch.
- Az eredményt kizárólag Preview URL-en szabad bemutatni.
- A draft PR nem merge-engedély; production jóváhagyást nem jelent.
- Previewból Productionbe promotion tilos.
- Production domaint vagy alias-t Preview deploymenthez kapcsolni tilos.

### Rollback

- Hibás feature vagy dependency-frissítés visszaállítása elsődlegesen új `git revert` commit legyen a rebuild branchen.
- Megosztott branch történetét `reset --hard` és force-push segítségével átírni tilos.
- Hibás Preview esetén az utolsó zöld rebuild commit redeployolható Previewként, vagy a hibás commit revertálható.
- Rollback sem érintheti a `main` refet vagy Production deploymentet.
- Adatot, működő production funkciót vagy környezeti változót migrációs/rollback terv nélkül törölni tilos.
- A Next.js 16 külön commitja önállóan revertálható kell legyen.

## 15. Cél quality gate minden push előtt

```powershell
npm ci
npm audit
npm audit --omit=dev
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
npm run test:a11y
npm run test:visual
```

Ehhez még kötelező:

- route- és redirect-smoke HU és EN útvonalakon;
- 390, 768, 1440 és 1920 px viewport-ellenőrzés;
- billentyűzetes és reduced-motion kézi QA;
- böngésző-console error/warning ellenőrzés;
- Lighthouse mérés az egyeztetett kulcsroute-okon;
- branch, upstream, diff és explicit push-cél ellenőrzése;
- Vercel Preview státusz és deployment metadata ellenőrzése.

## 16. Baseline döntési napló

1. A rebuild nem a lokális `main` refből, hanem az auditált `origin/main` commitból indult.
2. A zöld baseline build nem tekinthető zöld quality gate-nek, mert a lint ki volt kapcsolva build közben.
3. A locale-validáció, legacy redirectek és SEO együtt kezelendő, mert ugyanazon soft-404 és crawl problémát alkotják.
4. A meglévő ügynökségi tartalom migrációt igényel; nem törölhető egyszerűen a developer-first főoldal kedvéért.
5. A legacy demo URL-ekhez explicit redirect/rewrite és regresszióteszt szükséges.
6. A kontakt provider egységesítése, input hardening és observability egy munkacsomag; a UI nem maradhat látszólag sikeres, backend nélküli állapotban.
7. A Next.js 16 upgrade csak a teljes, stabil tesztalap után és külön commitban történhet.
8. A `main` merge, Preview promotion és production változtatás minden esetben külön felhasználói jóváhagyást igényel.
