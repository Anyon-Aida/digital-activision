# Digital Activision Portfolio V3
## Editorial Industrial Systems – tartalmi, UX/UI és Codex megvalósítási specifikáció

**Dokumentumverzió:** 1.0  
**Dátum:** 2026. július 27.  
**Repository:** `Anyon-Aida/digital-activision`  
**Kiinduló branch:** `rebuild/developer-portfolio-v2`  
**Célbranch:** `rebuild/editorial-industrial-v3`  
**Production oldal:** `https://digitalactivision.hu/`  
**Projektgazda:** Kovács Zalán  
**Elsődleges közönség:** recruiter, CTO, engineering manager, technikai reviewer  
**Másodlagos közönség:** Studio ügyfél, digitális terméket vagy weboldalt kereső partner  
**Elsődleges nyelv:** magyar, teljes angol lokalizációval  

> Ez a dokumentum a V3 végleges termék-, tartalmi és vizuális irányát rögzíti. A Codex feladata nem új designirány keresése, nem teljes repository-audit megismétlése, és nem új scope kitalálása. A feladata a V2 technikai alapjának megtartása mellett a felhasználó által látható réteg célzott újratervezése és megvalósítása a jelen specifikáció szerint.

---

# 1. Vezetői összefoglaló

A V2 technikai szempontból erős alapot hozott létre:

- Next.js 16-os, server-first architektúra;
- egységes magyar/angol routing;
- typed/Zod-validált tartalmi registry;
- biztonságos kontaktfolyamat;
- SEO-, security-, accessibility- és quality gate rendszer;
- külön Work, Lab és Studio route;
- Vercel Preview workflow;
- széles körű unit, E2E, axe, visual és cross-browser tesztelés.

A V2 fő problémája nem technikai, hanem art direction- és tartalmi hierarchiaprobléma. A főoldal túl sok szakmai állítást, auditnyelvet, kártyát, badge-et, monospace címkét és sötét szekciót jelenít meg. Emiatt a felület:

- nehezen emészthető;
- túl hosszú;
- túlságosan dokumentációs/dashboardos;
- kevéssé személyes;
- generikus AI/SaaS portfólió benyomását kelti;
- a valódi projektek vizuális bizonyítékait nem helyezi elég erősen előtérbe.

A V3 célja:

1. Megtartani a V2 erős technikai és biztonsági alapját.
2. A főoldalt legalább 35–45%-kal rövidebbé és vizuálisabbá tenni.
3. A domináns megjelenést világos, prémium editorial felületté alakítani.
4. Az egyedi karaktert a vállalati/gyártástechnológiai háttérből származó finom „industrial systems” motívumokkal létrehozni.
5. A főoldal központjába valódi projektscreenshotokat, konkrét feladatokat és eredményeket helyezni.
6. Az audit- és compliance-nyelvet eltávolítani a felhasználói szövegből.
7. Az Adott, Alba és Sanjiwani projekteket erős vizuális zászlóshajóként bemutatni.
8. A Samsung projektet mérhető enterprise hatásként, nem gyenge screenshot nélküli projektkártyaként kezelni.
9. A QuestLogot és a régi UI-kísérleteket másodlagos Work/Lab tartalomként megtartani.
10. A végeredményt úgy kialakítani, hogy egy prémium product/engineering ügynökség egyedileg tervezett oldalának hasson, ne sablonnak vagy generált portfóliónak.

A végleges art direction neve:

# **Editorial Industrial Systems**

Ajánlott arány:

- **70% Editorial Product Engineering** – levegő, tipográfia, vizuális történetmesélés, aszimmetria, nagy projektképek.
- **30% Industrial Systems** – adatfolyam, műszaki annotációk, rendszerhatárok, mérnöki pontosság.

---

# 2. Források és döntési hierarchia

A Codex a következő prioritási sorrendet használja:

1. Jelen V3 specifikáció.
2. `docs/portfolio-v3/asset-manifest.md`.
3. A mellékelt V3 referenciaassetek.
4. A V2 branch meglévő technikai architektúrája.
5. A meglévő magyar/angol CV assetek.
6. A jelenlegi typed content registry – csak technikai alapként, nem változatlan publikus copyként.

Ha a V2 és a V3 között tartalmi vagy vizuális ellentmondás van, **a V3 az elsődleges**.

Ha a dokumentumban nincs engedélyezve egy új szekció, funkció vagy vizuális minta, a Codex nem adhatja hozzá saját döntésből.

---

# 3. Kötelező scope lock

## 3.1. A Codex nem teheti meg

- nem auditálhatja újra a teljes repositoryt általános „gap analysis” célból;
- nem nyithat új designirányt;
- nem kereshet önállóan új trendeket vagy referenciákat;
- nem készíthet új, a dokumentumban nem szereplő főoldali szekciót;
- nem írhat új compliance-, „verified evidence”, „repository proves” vagy auditjellegű tartalmat;
- nem adhat hozzá skill barokat, százalékos kompetenciamutatókat vagy hamis mérőszámokat;
- nem változtathatja meg a fő márkaarchitektúrát;
- nem tehet portrét vagy emberi stock fotót az oldalra;
- nem építhet automatikus dark mode-ot vagy theme switchert;
- nem használhat generikus AI-illusztrációt vagy stock technológiai képet;
- nem alakíthatja át a teljes technikai architektúrát pusztán vizuális redesign miatt;
- nem módosíthatja a `main` ágat;
- nem merge-elhet és nem indíthat production deploymentet;
- nem pollingolhatja 10 másodpercenként a GitHub vagy Vercel állapotát;
- nem futtathatja a teljes quality suite-ot minden apró módosítás után.

## 3.2. A Codex folyamatosan dolgozhat

A Codex a specifikáció összes munkacsomagját külön jóváhagyáskérés nélkül végrehajthatja. Csak az alábbi valódi blokkolóknál állhat meg:

- kötelező asset fizikailag nem található;
- a branch vagy worktree biztonságosan nem hozható létre;
- a build egy külső szolgáltatás vagy hiányzó secret miatt nem futtatható;
- a dokumentum két kötelező követelménye technikailag egymást kizárja;
- productiont vagy `main` ágat érintő művelet következne.

Kisebb implementációs döntéseknél a dokumentum szelleméhez legközelebb álló, legkonzervatívabb megoldást válassza, és ne kérjen külön jóváhagyást.

---

# 4. Git, worktree és deployment stratégia

## 4.1. Kiindulópont

A V3 nem a `main` ágból indul. A V2 technikai alapját kell folytatni.

Kötelező kiinduló remote ref:

```text
origin/rebuild/developer-portfolio-v2
```

Kötelező új branch:

```text
rebuild/editorial-industrial-v3
```

Ajánlott worktree:

```powershell
git fetch origin

git worktree add `
  ..\digital-activision-portfolio-v3 `
  -b rebuild/editorial-industrial-v3 `
  origin/rebuild/developer-portfolio-v2

cd ..\digital-activision-portfolio-v3
```

A munka kezdetén egyszer ellenőrizendő:

```powershell
git status
git branch --show-current
git log -1 --oneline
git remote -v
```

Ha az aktív branch `main`, a Codex nem módosíthat fájlt.

## 4.2. Commitstratégia

A V3 célzott redesign; 5–8 tematikus commit elegendő. Nem szükséges több tucat mikrócommit.

Ajánlott commitcsoportok:

1. `chore: add portfolio v3 assets and content model`
2. `feat: implement editorial industrial design system`
3. `feat: rebuild developer homepage around project evidence`
4. `feat: redesign work and case study presentation`
5. `feat: refine lab studio and navigation experience`
6. `test: update targeted visual and interaction coverage`
7. `docs: add portfolio v3 handoff and release notes`

## 4.3. Preview és PR

A Codex a munka végén:

1. pusholja a `rebuild/editorial-industrial-v3` branchet;
2. létrehoz egy draft PR-t a `main` felé;
3. legfeljebb egyszer ellenőrzi a Vercel checket;
4. ha a Preview URL nem olvasható ki egyetlen lekérdezésből, átadja a PR linkjét;
5. nem próbál meg Vercel tokent vagy belső API-t kutatni;
6. nem merge-el;
7. nem promótál Preview-t productionbe.

---

# 5. Termékstratégia és célközönség

## 5.1. Prioritás

A főoldal kommunikációs aránya:

- **75%** fejlesztői karrier, recruiter, CTO, engineering manager;
- **25%** Studio, ügyfélmunka, digitális termékfejlesztés.

A főoldal nem lehet egyszerre teljes állásportfólió és teljes ügynökségi landing page. A Studio külön útvonalon marad.

## 5.2. Márkaarchitektúra

Fő brand:

```text
Kovács Zalán
```

Fő szakmai megnevezés:

```text
Full-Stack Developer & Product Engineer
```

Magyar kísérőszövegben használható:

```text
Full-stack fejlesztő, termék- és rendszerfókusszal
```

Másodlagos márka:

```text
Digital Activision Studio
```

A Digital Activision név a Studio route-on és a footerben jelenhet meg hangsúlyosan. A recruiter-fókuszú főoldalon Kovács Zalán neve dominál.

## 5.3. Mit kell 20 másodperc alatt megérteni?

A látogatónak az első viewport alapján értenie kell:

- ki vagy;
- milyen problémákat oldasz meg;
- hogy a UI és a backend egyaránt a munkád része;
- hogy vannak valódi enterprise és interaktív termékprojektjeid;
- hogy a részletekhez van case study, GitHub és CV.

## 5.4. Mit kell 2–3 perc alatt bizonyítani?

- összetett enterprise workflow és RBAC;
- 3D interaktív konfigurátor;
- időpontfoglalási UX;
- valós idejű analitika és mérhető eredmény;
- React/Next.js/Node.js/Laravel/SQL tapasztalat;
- vállalati környezet Bosch és Samsung háttérrel;
- tesztelhető, hozzáférhető és üzemeltethető szemlélet.

---

# 6. Tartalmi hang és copywriting szabályok

## 6.1. Hangnem

A szöveg legyen:

- természetes;
- egyes szám első személyű;
- konkrét;
- nyugodt és magabiztos;
- rövid mondatokkal olvasható;
- szakmai, de nem önigazoló;
- magyarul természetes, nem angolból szó szerint fordított.

## 6.2. Tiltott nyelvezet

A publikus felületen nem jelenhet meg:

- „A nyilvános forráskészletben nem dokumentált.”
- „Szakmai útvonal, feltételezések nélkül.”
- „Amit ez a repository már bizonyít.”
- „Megvalósítva / Következő gate.”
- „Verified evidence.”
- „Owner-provided specification.”
- „A hiányzó adatokat nem pótolom feltételezéssel.”
- „A V2 repository ellenőrizhető megvalósítása.”
- „Production eredmény nem állítható.”
- túl sok „engineering”, „system boundary”, „operable” és hasonló ismétlődő terminus.

A belső adatmodellben maradhatnak státuszok és disclosure-k, de a UI csak ott mutassa őket, ahol a látogató számára tényleges értékük van.

## 6.3. Bizalmasság kezelése

Privát vállalati projektnél egyetlen rövid megjegyzés elegendő:

**HU:**
> A képernyők és diagramok portfóliócélú rekonstrukciók vagy tesztadatokat mutató referenciák; nem tartalmaznak valós vállalati adatot.

**EN:**
> Screens and diagrams are portfolio reconstructions or references using test data; they contain no real company data.

Ezt nem kell minden szekcióban megismételni.

---

# 7. Vizuális art direction: Editorial Industrial Systems

## 7.1. Alapelv

A felület úgy hasson, mintha egy tapasztalt product design és engineering studio egyedileg tervezte volna. Az egyediség forrása nem dekorációhalmozás, hanem:

- tartalomhoz igazított kompozíció;
- projektspecifikus vizuális történet;
- eltérő, mégis egységes szekcióritmus;
- saját rendszer- és adatmotívum;
- tipográfiai kontraszt;
- nagy, valódi screenshotok;
- tudatos whitespace;
- finom, tartalmi animáció.

## 7.2. Domináns téma

A hivatalos art direction kizárólag világos.

Kötelező:

```css
:root {
  color-scheme: light;
}
```

Nem készül:

- theme switcher;
- automatikus `prefers-color-scheme: dark` átváltás;
- külön sötét designrendszer.

Sötét szekció legfeljebb két helyen alkalmazható:

1. Lab/engineering teaser;
2. footer vagy egy rövid átvezető sáv.

A főoldal legalább 80%-a világos vizuális tér legyen.

## 7.3. Vizuális személyiség

Kulcsszavak:

- editorial;
- precise;
- quiet confidence;
- engineered;
- tactile;
- spacious;
- project-led;
- human;
- bespoke.

Kerülendő kulcsszavak:

- cyberpunk;
- hacker;
- neon dashboard;
- AI SaaS;
- glassmorphism everywhere;
- terminal portfolio;
- futuristic stock UI;
- infinite card grid.

---

# 8. Színrendszer

## 8.1. Fő paletta

A Codex a jelenlegi tokenrendszert módosítsa, ne komponensenként hardcode-oljon színeket.

Javasolt alapértékek:

```css
--paper-50: #F7F5F0;
--paper-100: #F0EDE6;
--white: #FFFFFF;
--ink-950: #101418;
--ink-800: #242A31;
--slate-600: #67707C;
--line-200: #D8D9D6;
--line-300: #C6C9CC;
--industrial-blue: #1F4B99;
--electric-violet: #6B5CF6;
--signal-cyan: #0097B5;
--signal-cyan-soft: #DDF4F6;
--warm-sand: #D9C7A2;
--success: #167A58;
--warning: #9A6200;
--danger: #B42318;
--dark-panel: #111923;
```

## 8.2. Használati szabályok

- háttér: meleg törtfehér;
- fő szöveg: majdnem fekete, nem navy;
- panelek: fehér vagy enyhén meleg felület;
- lila: brand- és CTA-kiemelés;
- cián: adatfolyam, interakció, aktív állapot;
- ipari kék: projekt- és diagramjelölés;
- sand: finom editorial háttér vagy Sanjiwani-projekthez kapcsolódó meleg tónus;
- egy képernyőn legfeljebb két hangsúlyos accent szín;
- gradient csak a blueprint-vonalak vagy nagyon finom háttérfény esetén;
- nagy lila–cián radial gradient nem használható hero háttérként.

---

# 9. Tipográfia

## 9.1. Betűcsaládok

Ajánlott:

- **Primary sans:** `Manrope`
- **Editorial display accent:** `Instrument Serif`
- **Technical annotation:** `IBM Plex Mono`

A Codex `next/font/google` használatával töltse be őket, subsettinggel.

Fallback:

```css
--font-sans: "Manrope", "Segoe UI", Arial, sans-serif;
--font-serif: "Instrument Serif", Georgia, serif;
--font-mono: "IBM Plex Mono", Consolas, monospace;
```

## 9.2. Szerepek

- Sans: body, navigáció, gomb, legtöbb heading.
- Serif: csak kiválasztott hangsúlyos szó, rövid editorial alcím vagy projektcím-részlet.
- Mono: maximum 10–15% vizuális jelenlét; annotáció, rövid meta, szám, diagramcímke.

## 9.3. Méretek

Desktop:

```text
Hero H1: clamp(3.6rem, 5.5vw, 6.1rem)
Section H2: clamp(2.5rem, 4vw, 4.75rem)
Project H3: clamp(2rem, 3vw, 3.5rem)
Body large: 1.2–1.35rem
Body: 1.0–1.075rem
Meta: 0.75–0.8rem
```

Mobil:

```text
Hero H1: 2.6–3.1rem
Section H2: 2.1–2.6rem
Project H3: 1.8–2.2rem
Body: 1rem
```

A hero főcím desktopon legfeljebb három sor, mobilon legfeljebb négy sor lehet. Nem tölthet ki több teljes viewportmagasságot.

---

# 10. Layout rendszer

## 10.1. Grid

Desktop:

- 12 oszlop;
- max width: 1440 px;
- fő content width: 1280–1320 px;
- oldalsó gutter: 32–64 px;
- szekciók között 96–144 px;
- projektblokkokban eltérő 5/7, 7/5, 4/8 arányok használhatók.

Tablet:

- 8 oszlop;
- 24–32 px gutter;
- projektvizuál és szöveg egymás alá kerülhet.

Mobil:

- 4 oszlop;
- 18–20 px gutter;
- 64–88 px szekciótávolság;
- nincs vízszintes overflow;
- a screenshotkompozíció nem zsugoríthat olvashatatlan miniatűrré teljes desktop képernyőt.

## 10.2. Ritmus

A főoldalon nem ismétlődhet hatszor ugyanaz a minta:

```text
eyebrow → heading → paragraph → card grid
```

A következő szekciótípusoknak eltérő kompozíciót kell kapniuk:

- hero: split blueprint;
- projektek: editorial showcase;
- impact: tipográfiai adatblokk;
- experience: lineáris történeti layout;
- capabilities: nyitott lista, nem kártyagrid;
- Lab teaser: sötét interaktív panel;
- Studio/contact: egyszerű CTA és űrlap.

---

# 11. UI komponens- és formai szabályok

## 11.1. Kártyák

A jelenlegi univerzális rounded card nem lehet minden tartalom alapja.

Kötelező változás:

- projekt showcase ne a `Card` komponens szokásos keretezett dobozát használja;
- experience ne kártyalistaként jelenjen meg;
- capability ne 2×2 kártyagrid legyen;
- standards blokk törlendő a főoldalról;
- a card radius 24 px helyett általában 12–18 px legyen;
- bizonyos editorial felületeknek ne legyen kerete vagy radiusa.

## 11.2. Badge-ek

Badge csak valódi, gyorsan értelmezhető metaadathoz:

- `Enterprise workflow`
- `3D configurator`
- `Booking UX`
- `Anonymized case study`
- `In progress`

Nem jelenhet meg minden projektben több státusz- és evidence-badge.

## 11.3. Eyebrow

Az uppercase monospace eyebrow nem lehet minden szekció kötelező eleme.

Használható:

- hero egy rövid sorában;
- diagram annotációban;
- egy projekt technikai metájában;
- Lab szekcióban.

A legtöbb editorial szekció csak címet és rövid bevezetőt kapjon.

## 11.4. Vonalak és annotációk

Az industrial karakterhez használható:

- 1 px finom mérővonal;
- kis sorszámok;
- rövid műszaki címkék;
- csomópontok és összekötő vonalak;
- screenshoton belüli hotspotok;
- projektadatot magyarázó oldalsó jegyzet.

Nem használható:

- teljes képernyős blueprint rács;
- minden elem köré technikai keret;
- dekoratív, funkció nélküli node-hálózat.

---

# 12. Navigáció és header

## 12.1. Header tartalom

Bal oldal:

```text
Kovács Zalán
Full-stack developer
```

Nem szükséges a „KZ” rounded square logó. A név önmagában legyen a wordmark.

Desktop navigáció:

- Munkák
- Tapasztalat
- Lab
- Studio
- Kapcsolat

Jobb oldal:

- HU/EN váltó;
- GitHub ikon vagy rövid link;
- CV letöltés;
- keresés/command palette opcionális, visszafogott ikonként.

## 12.2. Header stílus

- világos, enyhén áttetsző vagy solid paper háttér;
- 68–76 px magasság;
- finom alsó border;
- nincs dark navbar a világos főoldal tetején;
- scrollnál enyhe backdrop blur megengedett;
- active route vagy anchor jelzése vékony vonallal;
- a CV valódi link legyen, ne disabled gomb.

## 12.3. Mobil menü

- teljes szélességű, világos sheet;
- nagy, 48 px feletti érintési célok;
- fókuszcsapda és ESC bezárás;
- külön CV és nyelvváltás;
- ne legyen túlzsúfolt command palette + hamburger + több ikon egyszerre.

---

# 13. Főoldal V3 – végleges információs architektúra

A főoldal kötelező sorrendje:

1. Header
2. Hero + hibrid System Blueprint
3. Selected Work – három projekt
4. Samsung measured impact strip
5. Experience + capabilities rövid blokk
6. Engineering Lab teaser
7. Studio bridge
8. Contact
9. Footer

A V2 következő főoldali blokkjai törlendők vagy áthelyezendők:

- teljes generikus System Map;
- credibility ötoszlopos strip jelenlegi formája;
- négy egyforma case study kártya;
- teljes capability kártyagrid;
- hosszú, hatszereplős timeline;
- „Amit ez a repository már bizonyít” standards grid;
- Studio migrációs magyarázat;
- contact mellett a témák ismétlődő oldalkártyája.

---

# 14. Hero – tartalom

## 14.1. Magyar copy

Eyebrow:

```text
FULL-STACK FEJLESZTŐ · TERMÉK- ÉS RENDSZERFÓKUSSZAL
```

Főcím:

```text
Komplex webes rendszereket teszek egyszerűvé használni.
```

A „egyszerűvé” vagy „használni” szó opcionálisan editorial serif hangsúlyt kaphat. Ne legyen minden szó vegyes betűtípusú.

Leírás:

```text
React, Next.js, Node.js, Laravel és SQL alapú termékeken dolgozom – vállalati workflowktól az interaktív 3D konfigurátorokig.
```

Második mondat:

```text
A felületet, az üzleti logikát és a szállítási folyamatot egy összefüggő rendszerként tervezem.
```

Elsődleges CTA:

```text
Kiemelt munkák
```

Másodlagos CTA:

```text
CV letöltése
```

Kiegészítő link:

```text
GitHub
```

Rövid bizonyítékok, legfeljebb három:

```text
Bosch és Samsung vállalati környezet
20%-os pontosságjavulás egy ellenőrzési folyamatban
Frontendtől a backend- és adatmodellig
```

## 14.2. Angol copy

Eyebrow:

```text
FULL-STACK DEVELOPER · PRODUCT AND SYSTEM FOCUS
```

Headline:

```text
I make complex web systems feel simple to use.
```

Description:

```text
I work across React, Next.js, Node.js, Laravel and SQL – from enterprise workflows to interactive 3D configurators.
```

Second sentence:

```text
I design the interface, business logic and delivery flow as one connected product system.
```

CTA-k:

```text
Selected work
Download CV
GitHub
```

## 14.3. Hero layout

Desktop:

- bal oldal 6.5–7 oszlop: copy;
- jobb oldal 5–5.5 oszlop: System Blueprint;
- min-height 680–760 px;
- copy vertikálisan középre igazítva;
- H1 max width 760 px;
- CTA-k egy sorban, mobilon egymás alatt vagy wrapelve;
- bizonyítékok három rövid sorban vagy egy finom vízszintes sávban.

Mobil:

- copy felül;
- blueprint alatta;
- blueprint magassága 360–460 px;
- a headline ne legyen 5–7 soros;
- nincs jobboldali stack-kártya.

---

# 15. Hero – hibrid System Blueprint vizuál

## 15.1. Alapstruktúra

A blueprint ne legyen külön generált kép. Reszponzív DOM/CSS kompozíció legyen:

- három screenshot-fragment;
- egy központi finom adat-/rendszerút;
- rövid annotációk;
- enyhe depth/parallax csak pointeres eszközön;
- reduced motion esetén teljesen statikus.

Kötelező források:

1. Adott – quote structure vagy quote editor fragment;
2. Alba – 3D konfigurátor fragment;
3. Sanjiwani – booking modal fragment;
4. Samsung – saját SVG line/data motif, screenshot nélkül.

## 15.2. Vizuális hierarchia

Elsődleges fragment:

- Adott enterprise workflow;
- legnagyobb, kb. 46–52% vizuális terület.

Másodlagos:

- Alba 3D konfigurátor;
- kb. 30–36%.

Harmadlagos:

- Sanjiwani booking;
- kb. 20–28%.

Samsung:

- screenshot helyett egy vékony, animálható line chart / gate flow / verification signal.

## 15.3. Annotációk

Legfeljebb négy rövid címke:

```text
WORKFLOW
3D CONFIG
BOOKING
DATA / API
```

A címkék ne legyenek nagy badge-ek. Finom mono annotációként jelenjenek meg.

## 15.4. Mozgás

Megengedett:

- 6–10 px finom pointer parallax;
- lassú, egyszeri beúszás;
- adatvonalon 1–2 másodperces finom flow pulse;
- hoverre egyetlen fragment enyhe fókusza.

Tiltott:

- folyamatos lebegés;
- nagy 3D forgás;
- scrolljacking;
- automatikus carousel;
- villogó node-ok;
- több rétegű neon glow.

---

# 16. Selected Work – főoldali projektbemutatás

## 16.1. Szekciócím

HU:

```text
Kiemelt munkák
```

Leírás:

```text
Három különböző terméktípus, ugyanazzal a céllal: az összetett folyamatok legyenek átláthatók és használhatók.
```

EN:

```text
Selected work
Three different product types with the same goal: make complex processes clear and usable.
```

## 16.2. Projekt 1 – Adott Solution

Cím:

```text
Adott Solution – Enterprise Workflow Platform
```

Rövid HU copy:

```text
Összetett inquiry-, ajánlat- és projektfolyamatok egy közös rendszerben, szerepkörökkel, review- és approval-lépésekkel, auditálható állapotváltozásokkal.
```

Szerepkör:

```text
Önálló architekturális és full-stack fejlesztési felelősség
```

Kiemelt elemek:

```text
Workflow és státuszkezelés
RBAC és approval
Összetett modul–task–phase szerkesztés
Vállalati és kapcsolattartói adatok
Értesítések és hibajegykezelés
```

CTA:

```text
Esettanulmány megnyitása
```

Layout:

- teljes szélességű editorial feature;
- bal oldalon 4–5 oszlop copy;
- jobb oldalon 7–8 oszlop képi kompozíció;
- fő kép: `adott-quote-structure.png`;
- másodlagos overlay: `adott-inquiry-roles.png` vagy `adott-company-detail.png`;
- nincs project card keret;
- finom ipari kék annotációk;
- világos háttér.

## 16.3. Projekt 2 – Alba Medence

Cím:

```text
Alba Medence – Interactive 3D Configurator
```

HU copy:

```text
Böngészőben futó 3D medencetervező, amely méret-, kialakítás- és kiegészítőválasztást kapcsol össze reszponzív ajánlatkérési folyamattal.
```

Szerepkör:

```text
Frontend, 3D interakció és reszponzív konfigurációs UX
```

Kiemelt elemek:

```text
Valós idejű 3D megjelenítés
Konfigurációs állapotkezelés
Desktop és mobil kezelőfelület
Teljesítmény- és memóriatudatos működés
Ajánlatkérési átvezetés
```

Layout:

- projektvizuál bal oldalon 7 oszlop;
- copy jobb oldalon 5 oszlop;
- desktop screenshot nagy frame-ben;
- mobil screenshot részben ráúsztatva;
- háttérben nagyon finom aqua/blue műszaki vonal;
- ne legyen túlzott medencekék gradient.

## 16.4. Projekt 3 – Sanjiwani

Cím:

```text
Sanjiwani – Service Discovery & Booking Experience
```

HU copy:

```text
Szolgáltatáskeresés és időpontfoglalás egy nyugodt, márkához illeszkedő felületen – kategória-, időtartam-, masszőr- és idősávválasztással.
```

Szerepkör:

```text
UI/UX, szolgáltatáskatalógus és foglalási flow
```

Kiemelt elemek:

```text
Kategória- és időtartam-szűrés
Keresés
Masszőrválasztás
Dátum- és idősávkezelés
Végösszeg és foglalási adatok
```

Layout:

- melegebb, sand/paper tónusú editorial blokk;
- booking modal legyen a fő kép;
- home és services screenshot kisebb kiegészítő cropként;
- a projektszekció formája térjen el az első kettőtől;
- például nagy függőleges modal + mellette két keskeny képcsík.

---

# 17. Samsung measured impact strip

A Samsung ne negyedik egyforma projektkártya legyen a főoldalon.

## 17.1. Tartalom

Nagy szám:

```text
+20%
```

Cím:

```text
Pontosabb rendszám-ellenőrzési folyamat
```

Leírás:

```text
Egy vállalati modernizáció részeként valós idejű kaputerhelési analitikán és a rendszám-ellenőrzési folyamat fejlesztésén dolgoztam.
```

Kiegészítő:

```text
Samsung · React · Node.js · PHP · vállalati környezet
```

CTA:

```text
Anonimizált esettanulmány
```

## 17.2. Vizualizáció

- nagy tipográfiai `+20%`;
- saját, egyszerű SVG gate-flow vagy verification line;
- 3–5 absztrakt kapu/oszlop;
- mozgó signal pont csak reduced-motion hiányában;
- semmilyen kitalált dashboard screenshot;
- a mérőszámot ne állítsa kizárólagos egyéni eredménynek.

## 17.3. Angol copy

```text
+20%
More accurate licence-plate verification workflow
I contributed to a modernization project involving real-time gate-load analytics and improvements to the verification flow.
```

---

# 18. Experience + capabilities

## 18.1. Experience forma

A V2 hosszú timeline helyett három fő állomás és egy rövid jelenlegi fókusz legyen. A főoldalon nem szükséges bizonytalan dátumokat mutatni.

### Bosch, Hatvan

Cím:

```text
Full-Stack Developer
```

Rövid leírás:

```text
Belső vállalati alkalmazások PHP és Laravel alapon, REST API-k, SQL-adatmodellek, biztonsági alapok és agilis csapatmunka.
```

### Samsung, Jászfényszaru

Cím:

```text
Full-Stack Developer
```

Rövid leírás:

```text
Meglévő PHP-rendszerek modernizálása, React- és Node.js-integráció, jogosultságkezelés, cache, logelemzés és valós idejű analitikai felületek.
```

### Adott Solution

Cím:

```text
Full-Stack Developer / Project Ownership
```

Rövid leírás:

```text
Enterprise projektworkflow önálló tervezése és fejlesztése React, backend API, adatmodell, RBAC, review- és approval-folyamatok mentén.
```

### Saját termékek és Studio

Cím:

```text
Product engineering
```

Rövid leírás:

```text
Interaktív webes termékek, PWA-k, UI-rendszerek és ügyféloldalak tervezése, fejlesztése és továbbfejlesztése.
```

## 18.2. Dátumok

A főoldalon ne jelenjen meg bizonytalan pontos dátum. A case study vagy CV tartalmazhat évszintű, hozzávetőleges időszakot.

Engedélyezett formák:

```text
2020-as évek eleje
Kb. egyéves vállalati szerepkör
Későbbi önálló projekt
Jelenlegi fókusz
```

Ha a CV asset pontosabb dátumot ad, a CV marad az elsődleges részletes forrás.

## 18.3. Capabilities

A capability blokk ne használjon kártyákat. Egy nagy, nyitott 4 oszlopos vagy 2×2 listás kompozíció legyen.

### Product interface

- React és Next.js
- reszponzív, hozzáférhető UI
- komplex formok és state
- 3D és adatvizualizáció

### Backend & workflow

- Node.js és Laravel/PHP
- REST API és validáció
- authentication, RBAC, audit
- integrációk és üzleti szabályok

### Data & reliability

- SQL és adatmodellezés
- cache, migráció, logelemzés
- hibakezelés és monitoring
- teljesítményoptimalizálás

### Delivery

- Git és PR workflow
- CI/CD és Preview deployment
- unit, E2E és accessibility teszt
- dokumentáció és review

A listák mellett egyetlen rövid CTA:

```text
Technikai részletek az Engineering Labban
```

---

# 19. Engineering Lab teaser

## 19.1. Szerep

A teljes Lab külön oldalon marad. A főoldalon csak egy rövid, sötét teaser jelenik meg.

## 19.2. Tartalom

Eyebrow opcionális:

```text
ENGINEERING LAB
```

Cím:

```text
A rendszer nem ér véget a képernyőnél.
```

Leírás:

```text
Interaktív példák request-validációra, jogosultságokra, approval workflowkra és offline szinkronizációra.
```

CTA:

```text
Lab megnyitása
```

## 19.3. Vizuál

- sötét panel, de csak egy szekció;
- egyetlen tömör interaktív flow;
- három tab vagy selector: Request / Approval / Offline;
- kiválasztott nézetben maximum 4–5 node;
- a teljes fallback text és permission matrix ne jelenjen meg a főoldalon;
- a Lab route-on maradhat részletesebb.

---

# 20. Studio bridge

A főoldali Studio blokk ne magyarázza a migrációt vagy a korábbi oldalt.

## 20.1. HU copy

Cím:

```text
Digitális terméket vagy weboldalt építenél?
```

Leírás:

```text
A Digital Activision Studio üzleti weboldalak, UI-rendszerek és kisebb webalkalmazások tervezésében és megvalósításában segít.
```

CTA:

```text
Studio szolgáltatások
```

## 20.2. Design

- világos, egyszerű, széles editorial CTA;
- nincs pricing teaser;
- nincs külön migration note;
- finom lila accent;
- legfeljebb egy illusztratív vonal vagy geometriai motívum.

---

# 21. Contact

## 21.1. Cím és hang

HU:

```text
Beszéljünk a következő rendszerről.
```

Leírás:

```text
Álláslehetőségről, szakmai együttműködésről vagy Studio projektről írnál? Küldj rövid kontextust, és visszajelzek.
```

EN:

```text
Let’s talk about the next system.
```

## 21.2. Layout

- világos háttér;
- bal oldalon headline és közvetlen e-mail link;
- jobb oldalon egyszerű kontaktűrlap;
- a „Hasznos kontextus” külön oldalkártya törlendő;
- topic select maradhat;
- request ID csak hibánál jelenjen meg;
- privacy note rövid legyen;
- preview környezetben disabled állapot egyértelműen jelenjen meg.

## 21.3. Űrlap

Megmaradó mezők:

- név;
- e-mail;
- téma;
- üzenet;
- adatkezelési hozzájárulás.

Nem szükséges új mező vagy marketing checkbox.

---

# 22. Footer

Tartalom:

- Kovács Zalán;
- rövid szakmai megnevezés;
- GitHub;
- LinkedIn;
- magyar/angol CV;
- Adatkezelés;
- Studio;
- copyright.

Vizuál:

- dark footer megengedett;
- egyszerű 2–4 oszlopos layout;
- nincs nagy feature-lista;
- nincs hírlevél, ha nincs valódi backend és üzleti cél.

---

# 23. Work index oldal

## 23.1. Cél

A Work oldal mutassa az összes releváns projektet, de ne legyen státusz- és badge-katalógus.

## 23.2. Projekt sorrend

1. Adott Solution – Enterprise Workflow Platform
2. Alba Medence – Interactive 3D Configurator
3. Samsung – Smart Gate Analytics
4. Sanjiwani – Service Discovery & Booking
5. QuestLog – Offline-First PWA (fejlesztés alatt)

Másodlagos „UI experiments” blokk:

- Burger Shop;
- Lion Gym;
- Nati;
- egyéb korábbi statikus demók.

## 23.3. Layout

- első két projekt nagy editorial blokk;
- Samsung és Sanjiwani közepes grid;
- QuestLog kisebb in-progress feature;
- experiments egyszerű thumbnail lista;
- nem minden elem azonos kártya;
- nagy képek, rövid szöveg;
- szűrő csak akkor maradjon, ha ténylegesen legalább 6–8 releváns projekt van. A jelenlegi öt projektnél a filter elhagyható.

---

# 24. Case study rendszer egyszerűsítése

## 24.1. Adatmodell

A typed registry és Zod-validáció maradjon. A V2 16 kötelező szekciós megjelenítése nem maradhat.

A registryben a részletes adatok megtarthatók, de a UI az alábbi 5–7 történeti blokkot renderelje:

1. Overview
2. Challenge / Context
3. My role and approach
4. Product and system design
5. Key implementation details
6. Outcome / impact
7. Gallery / related links

Privát/anonymizált projektnél egy rövid disclosure blokk a hero alatt.

## 24.2. UI

Törlendő:

- sticky 16 elemű tartalomjegyzék;
- minden szekción status badge;
- evidence list minden szekció végén;
- disclosure ismétlés;
- „not disclosed” szekciók;
- „not yet verified” panelek;
- túl sok mono sorszám.

Megmaradhat:

- projekt hero;
- szerepkör;
- technológiák;
- egy rövid meta panel;
- nagy screenshotok;
- architecture/workflow diagram;
- eredményszám;
- kapcsolódó projektek.

## 24.3. Case study oldal design

- világos domináns layout;
- nagy projektvizuál a nyitóképernyőn;
- 70–80 karakteres olvasható szövegszélesség;
- screenshotok full-bleed vagy 10–12 oszlopos kompozícióban;
- oldalsó annotáció megengedett;
- nem dokumentációs táblázat;
- sötét technikai diagram blokk maximum egyszer.

---

# 25. Adott Solution case study

## 25.1. Cím

```text
Enterprise Workflow Platform
```

Másodlagos név:

```text
Adott Solution / A.TANGO
```

## 25.2. Rövid összefoglaló

```text
Egy összetett vállalati rendszer, amely inquiry-, specifikációs, ajánlati és projektfolyamatokat kapcsol össze szerepkörökkel, review- és approval-lépésekkel.
```

## 25.3. Saját szerep

```text
A rendszer architektúráján, frontend és backend összekapcsolásán, adatmodelljén, jogosultsági logikáján és több kulcsfontosságú workflow felületén dolgoztam, jelentős önálló projektfelelősséggel.
```

## 25.4. Kötelező történeti fejezetek

### 1. A probléma

- több üzleti állapot és szerepkör;
- inquiry → review → ready folyamat;
- quote és SoW struktúra;
- modulok, taskok, phase-ek;
- vendég és belső felhasználók;
- értesítések és auditálhatóság.

### 2. Információs és workflow architektúra

Készítsen saját, egyszerű diagramot:

```text
Inquiry
  ↓ review
Specification
  ↓ approval
Quote / SoW
  ↓ accepted
Project delivery
```

Oldalt:

```text
Roles · Comments · Attachments · Notifications · Audit
```

### 3. Összetett szerkesztési UX

Képek:

- `adott-quote-structure.png`
- `adott-quote-editor.png`

Téma:

- nested module/task/phase szerkesztés;
- óraszámok;
- tulajdonosok;
- expand/collapse;
- adatok kezelhetővé tétele nagy struktúrában.

### 4. Jogosultság és vállalati adatok

Képek:

- `adott-inquiry-roles.png`
- `adott-company-detail.png`
- `adott-company-create.png`

Téma:

- több szerepkör;
- külön viewer/writer/approver felelősség;
- company/contact master-detail;
- adminisztrációs formok.

### 5. Visszajelzés és működés

Képek:

- `adott-notifications.png`
- opcionálisan bug report és bug list.

Téma:

- státuszváltozás;
- értesítés;
- hibajegy;
- auditálható változás.

### 6. Mit bizonyít a projekt?

- enterprise UI;
- komplex business logic;
- RBAC;
- React és API integráció;
- SQL/adatmodell;
- önálló felelősség;
- tesztelés és deployment szemlélet.

## 25.5. Disclosure

Egyetlen blokk:

```text
A képernyők tesztadatokat mutatnak. A bemutatás a felhasználói utakra és a rendszer összetettségére koncentrál; nem teljes termékdokumentáció.
```

---

# 26. Alba Medence case study

## 26.1. Cím

```text
Interactive 3D Pool Configurator
```

## 26.2. Rövid összefoglaló

```text
Egy böngészőben futó 3D konfigurátor, amely a medence kialakítását, kiegészítőit és ajánlatkérését egy reszponzív felhasználói folyamatba szervezi.
```

## 26.3. Kötelező fejezetek

### 1. Üzleti kontextus

- a weboldal 3D tervezőbe vezet;
- a konfiguráció célja ajánlatkérés támogatása;
- nem önálló vizuális demo, hanem termékfolyamat.

Kép:

- `alba-website-3d-entry.png`

### 2. 3D interakció

Kép:

- `alba-configurator-desktop.png`

Téma:

- modellek és opciók;
- konfigurációs állapot;
- víz, burkolat, kiegészítő;
- UI és 3D nézet szinkronja.

### 3. Reszponzív működés

Kép:

- `alba-configurator-mobile.png`

Téma:

- keskeny nézet;
- érintési célok;
- opciópanel;
- ajánlatkérő CTA;
- 3D és form kontroll egyensúlya.

### 4. Teljesítmény és technikai döntések

- WebGL/3D erőforrások;
- memóriatudatos assetkezelés;
- mobil limitációk;
- render és UI elkülönítése;
- lazy loading és képoptimalizálás.

### 5. Eredmény

Ne találjon ki számszerű eredményt. A nyilvános eredmény:

```text
Működő, reszponzív 3D konfigurációs élmény, amely a látogatót ajánlatkérés felé vezeti.
```

### 6. Galéria

- website entry;
- desktop configurator;
- mobile configurator;
- brand/footer opcionális.

---

# 27. Sanjiwani case study

## 27.1. Cím

```text
Service Discovery & Booking Experience
```

## 27.2. Rövid összefoglaló

```text
Egy szolgáltatásfelfedezési és időpontfoglalási felület, amely a nyugodt márkaélményt jól szkennelhető választási és foglalási folyamattal kapcsolja össze.
```

## 27.3. Kötelező fejezetek

### 1. Márka és belépési pont

Kép:

- `sanjiwani-home-desktop.png`

Téma:

- vizuális hangulat;
- elsődleges CTA;
- navigáció;
- szolgáltatás és foglalás közötti átvezetés.

### 2. Szolgáltatásfelfedezés

Kép:

- `sanjiwani-services-desktop.png`

Téma:

- kategóriák;
- időtartam;
- keresés;
- szolgáltatáskártyák;
- információs sűrűség kezelése.

### 3. Foglalási flow

Kép:

- `sanjiwani-booking-flow-desktop.png`

Téma:

- név, telefon, e-mail;
- masszőrválasztás;
- dátum;
- szolgáltatási idő;
- idősávok;
- végösszeg;
- modal fókusz és háttérkontextus.

### 4. UX döntések

- idősávok napszak szerint;
- kiválasztott masszőr állapot;
- összeg láthatósága;
- egy helyen tartható flow;
- reszponzív követelmények.

### 5. Eredmény

Ne használjon kitalált konverziós számot. Eredményként a működő, egységes foglalási élményt írja le.

---

# 28. Samsung case study

## 28.1. Megközelítés

A Samsung case study rövidebb, vizuális és anonimizált legyen. Ne renderelje a V2 összes „not disclosed” szekcióját.

## 28.2. Kötelező fejezetek

1. Kontextus – kapuforgalom és rendszám-ellenőrzés.
2. Modernizáció – PHP környezet, React és Node.js irány.
3. Valós idejű analitika – kaputerhelési nézet.
4. Hatás – 20%-os pontosságjavulás rendszereredményként.
5. Mit tanultam – vállalati rendszer, logelemzés, üzemi megbízhatóság.

## 28.3. Vizuál

Készítsen saját SVG-ket:

- gate flow;
- licence plate verification stages;
- live load bars;
- before/after accuracy marker.

Nem készíthet hamis, Samsungnak tulajdonított dashboard screenshotot.

---

# 29. QuestLog és experiments

## 29.1. QuestLog

- maradjon a Work oldalon;
- státusz: fejlesztés alatt;
- ne legyen főoldali projekt;
- használja a meglévő részletes specifikációt;
- ne építse meg a V3 feladat részeként;
- ne generáljon hozzá hamis UI screenshotot;
- később működő demóval emelhető ki.

## 29.2. Burger, Lion Gym, Nati

- ne legyenek engineering case study-k;
- jelenjenek meg `Earlier UI experiments` / `Korábbi UI-kísérletek` cím alatt;
- kisebb thumbnail, cím, rövid egy mondat;
- egyértelműen demo/prototype státusz;
- ne foglalják el a főoldalt.

---

# 30. Studio oldal V3

## 30.1. Cél

A Studio oldal maradjon ügyfélfókuszú, de rövidebb és magabiztosabb legyen.

## 30.2. Szerkezet

1. Hero
2. Mit készítek / szolgáltatási területek
3. Kiemelt vizuális munkák: Sanjiwani, Alba, esetleg régi UI-kísérletek
4. Folyamat, 4 lépésben
5. Scope-alapú együttműködés
6. Kapcsolat

## 30.3. Törlendő vagy összevonandó

- fix csomagárak;
- „needs owner confirmation” jelzések;
- hosszú boundary magyarázat minden szolgáltatásnál;
- hat szolgáltatás egyforma kártyákban;
- hatlépcsős túlmagyarázott process;
- migrációs vagy belső megjegyzések.

## 30.4. Szolgáltatási csoportok

Legfeljebb négy:

1. Weboldal és digitális termék
2. UI-rendszer és frontend megvalósítás
3. Full-stack funkció és integráció
4. Audit, továbbfejlesztés és műszaki támogatás

## 30.5. Árazás

Nem jelenik meg fix csomagár.

Copy:

```text
A végleges scope, ütemezés és ár a célok, tartalom és szükséges integrációk alapján készül.
```

CTA:

```text
Projekt egyeztetése
```

---

# 31. Engineering Lab V3

## 31.1. Megtartandó

- typed, Zod-validált tartalom;
- architecture view-k;
- permission matrix;
- API contract;
- keyboard accessibility;
- reduced motion;
- server-first megvalósítás.

## 31.2. Újratervezendő

- ne legyen teljes oldalnyi sötét dashboard;
- a hero legyen világos;
- minden demo külön editorial „experiment panel” legyen;
- a három fő demo saját vizuális kompozíciót kapjon;
- a disclosure egy rövid, egyszeri megjegyzés legyen;
- a permission matrix ne domináljon a mobilélményben;
- a node-ok ne legyenek mind ugyanolyan kártyák.

## 31.3. Szekciók

1. Validated request
2. Approval workflow
3. Offline sync
4. Role and permission matrix
5. API contract

A Lab maradhat részletesebb, mert technikai közönségnek szól.

---

# 32. Design system implementáció

## 32.1. Megtartandó technikai elv

A komponensek semantic tokeneket használjanak. A Codex ne álljon át ad hoc Tailwind színértékekre.

## 32.2. Új UI primitive-ek

Szükség esetén létrehozható:

- `EditorialSection`
- `ProjectShowcase`
- `ProjectMediaFrame`
- `TechnicalAnnotation`
- `MetricFeature`
- `SplitFeature`
- `InlineLinkArrow`
- `BlueprintCanvas`

A meglévő `Card`, `Surface`, `Section` maradhat, de ne legyen minden layout egyetlen általános komponens erőltetett variánsa.

## 32.3. Section tone

A `dark` és `light` tone technikailag maradhat, de:

- a főoldal hero `light`;
- selected work `light`/`canvas`;
- Samsung `subtle` vagy saját tone;
- experience `light`;
- Lab teaser `dark`;
- Studio `light`;
- contact `light`;
- footer `dark`.

---

# 33. Motion és mikrointerakciók

## 33.1. Elv

A motion a hierarchiát és a rendszerkapcsolatokat magyarázza. Nem látványossági réteg.

## 33.2. Megengedett

- hero blueprint finom reveal;
- projektképek enyhe mask/clip megjelenése;
- linknyíl animáció;
- screenshot hotspot hover;
- Lab node selection;
- command palette nyitás;
- mobile sheet transition;
- focus és pressed state.

## 33.3. Tiltott

- minden kártya külön scroll fade;
- nagy parallax háttér;
- scroll snap főoldal;
- végtelen marquee;
- automatikus carousel;
- cursor trail;
- 3D tilt minden kártyán;
- oldal betöltésekor több másodperces intro;
- motion nélküli használatot akadályozó funkció.

## 33.4. Reduced motion

A V2 reduced-motion alapja maradjon. Minden új animáció `prefers-reduced-motion` esetén:

- azonnali állapotváltásra;
- statikus képre;
- nulla parallaxra

essen vissza.

---

# 34. Képek és assetek

A részletes forrás a `asset-manifest.md`.

## 34.1. Kötelező feladatok

- a mellékelt referenciaassetek beolvasása;
- optimalizált webassetek létrehozása;
- AVIF/WebP használat;
- helyes `sizes` és `priority`;
- alt text;
- mobil crop;
- CLS elkerülése;
- screenshot frame komponens.

## 34.2. Nyers assetek

A nyers PNG-k maradhatnak a `docs/portfolio-v3/references` mappában, vagy a Codex a végén elhagyhatja őket a commitból, ha az optimalizált public assetek és a manifest megmaradnak.

A repository méretének csökkentése előny, ezért a preferált végeredmény:

- optimalizált public assetek commitolva;
- eredeti PNG-k csak akkor commitolva, ha a projektgazda későbbi újrafeldolgozásához szükségesek;
- ne legyen ugyanaz a kép több mappában teljes méretben.

## 34.3. CV

A csomagban lévő HU/EN PDF-eket másolja:

```text
public/cv/kovacs-zalan-cv-hu.pdf
public/cv/kovacs-zalan-cv-en.pdf
```

A locale alapján a helyes fájl nyíljon meg.

---

# 35. SEO és metadata

A V2 locale-, canonical-, social-image-, robots- és sitemap infrastruktúrája maradjon.

## 35.1. Főoldal title

HU:

```text
Kovács Zalán – Full-Stack Developer és Product Engineer
```

EN:

```text
Kovács Zalán – Full-Stack Developer & Product Engineer
```

## 35.2. Description

HU:

```text
Full-stack fejlesztő React, Next.js, Node.js, Laravel és SQL tapasztalattal. Enterprise workflowk, interaktív 3D konfigurátorok és digitális termékek.
```

EN:

```text
Full-stack developer experienced with React, Next.js, Node.js, Laravel and SQL, building enterprise workflows, interactive 3D configurators and digital products.
```

## 35.3. Social image

A social image ne legyen generikus sötét gradient.

Javasolt:

- világos paper háttér;
- név és headline;
- három vékony projektfragment vagy blueprint vonal;
- 1200×630;
- magyar és angol változat;
- jól olvasható mobil share previewban.

## 35.4. Strukturált adat

Megmaradhat:

- `Person` schema;
- `WebSite`;
- case study oldalaknál `CreativeWork` vagy `SoftwareApplication` csak valós adatokkal.

Ne állítson olyan employer-, award- vagy certification adatot, amely nincs forrásban.

---

# 36. Accessibility

A V2 accessibility gate megmarad.

Kötelező:

- semantic heading hierarchy;
- minden interakció billentyűzettel használható;
- visible focus;
- 44 px minimum érintési cél;
- screenshot alt text;
- dekoratív blueprint elemek `aria-hidden`;
- hero animáció nem zavarja a screen readert;
- command palette fókuszkezelése;
- mobilmenü fókuszcsapda;
- kontraszt WCAG AA;
- 200% zoomnál nincs tartalomvesztés;
- form label és hibaüzenet kapcsolatok;
- reduced motion.

A screenshotokon belüli apró szöveg nem számít a weboldal fő információhordozójának. A mellette lévő copy minden lényegi tartalmat szövegesen is közöljön.

---

# 37. Performance

## 37.1. Megőrzendő cél

- initial client bundle ne nőjön indokolatlanul;
- hero ne legyen nagy JS-interakció;
- a screenshotok legyenek optimalizáltak;
- a Lab maradhat külön route-on nagyobb kliensoldali kóddal;
- a főoldali Lab teaser kisebb island legyen;
- fontokból csak szükséges weight és subset.

## 37.2. Célok

- mobil Lighthouse Performance: minimum 90;
- Accessibility: 100 vagy indokolt, dokumentált eltérés;
- Best Practices: 100;
- SEO production környezetben: 95+;
- LCP cél: 2,5 s alatt;
- CLS: 0,1 alatt;
- hero asset teljes bytes lehetőleg 500 KB alatt modern formátumban;
- teljes főoldali képanyag első betöltése kontrollált lazy loadinggal.

## 37.3. Tiltott optimalizálási kör

A Codex nem tölthet órákat 1–2 pontnyi Lighthouse javításra, ha a felület és a quality gate már megfelel a céloknak. A dokumentált minimum elérése után haladjon a lezárás felé.

---

# 38. Technikai architektúra – mit kell megtartani?

Kötelezően megmarad:

- Next.js 16.2.x stable;
- App Router;
- server-first komponensek;
- client island elv;
- TypeScript strict;
- typed/Zod-validált content;
- HU/EN route-ok;
- locale-specifikus metadata;
- security headerek;
- contact backend, rate limit és Turnstile támogatás;
- health endpoint;
- Preview noindex;
- robots/sitemap;
- command palette – visszafogottabb UI-val;
- unit, E2E, a11y, visual és cross-browser infrastruktúra;
- CI workflow;
- Vercel Preview;
- fail-closed build.

Nem kötelező megtartani változatlanul:

- `DeveloperHomepage.tsx` jelenlegi markupja;
- `SectionHeading` mindenhol azonos használata;
- `Card` minden tartalomra;
- SystemMap a főoldalon;
- V2 homepage copy;
- 16 szekciós case study megjelenítés;
- standards grid;
- jelenlegi dark/light váltakozási ritmus;
- filter a Work oldalon;
- disabled CV UI.

---

# 39. Tartalmi modellezés

## 39.1. Home content

A `HomeContent` típust egyszerűsítse a V3 struktúrára. Ajánlott top-level kulcsok:

```ts
type HomeContentV3 = {
  chrome: ChromeContent;
  hero: HeroContent;
  selectedWork: SelectedWorkContent;
  samsungImpact: ImpactContent;
  profile: ProfileContent;
  labTeaser: LabTeaserContent;
  studioBridge: StudioBridgeContent;
  contact: ContactContent;
};
```

Törölhető vagy más route-ra mozgatható:

- `systemMap`;
- `credibility` külön blokk;
- `standards`;
- hosszú `capabilities.groups` evidence linkekkel;
- hatszereplős `experience.entries` hiányzó adatokkal.

## 39.2. Case study model

A registry maradjon gazdag, de a UI számára készüljön `presentation` mező:

```ts
presentation: {
  featuredMedia: string[];
  heroVariant: "workflow" | "3d" | "booking" | "data";
  storySections: StorySection[];
  homepageSummary: LocalizedText;
  roleSummary: LocalizedText;
}
```

A régi evidence/disclosure adatok maradhatnak belső forrásként, de ne diktálják a teljes UI-t.

## 39.3. Sanjiwani új case study

Új slug:

```text
sanjiwani-booking-experience
```

Route:

```text
/[locale]/work/sanjiwani-booking-experience
```

Homepage featured projektként szerepel.

---

# 40. Implementációs munkacsomagok

## WP-00 – Biztonságos V3 indítás

Feladatok:

- worktree és branch ellenőrzése;
- V3 csomag assetjeinek helyre tétele;
- egyetlen `npm ci`;
- egyetlen induló `npm run lint` és `npm run typecheck`;
- meglévő V2 build állapot dokumentálása röviden;
- nincs új teljes audit.

Elfogadás:

- V3 branch aktív;
- main érintetlen;
- asset manifest olvasható;
- repository indul.

## WP-01 – V3 content és asset foundation

Feladatok:

- home content modell egyszerűsítése;
- Sanjiwani case study hozzáadása;
- experience copy javítása;
- auditnyelv eltávolítása;
- CV assetek bekötése;
- képek optimalizálása;
- projekt media registry.

Célzott ellenőrzés:

- content unit tesztek;
- registry teszt;
- image path ellenőrzés;
- typecheck.

## WP-02 – Editorial Industrial design system

Feladatok:

- tokenek;
- fontok;
- grid és spacing;
- header;
- editorial UI primitive-ek;
- card/badge használat csökkentése;
- light-first tone rendszer;
- motion primitive-ek.

Célzott ellenőrzés:

- lint az érintett fájlokra;
- typecheck;
- egyetlen design-system visual page vagy Story route, ha már van infrastruktúra;
- ne fusson full E2E.

## WP-03 – Főoldal V3

Feladatok:

- új hero;
- hybrid blueprint;
- selected work három projekttel;
- Samsung impact;
- experience/capabilities;
- Lab teaser;
- Studio bridge;
- contact;
- footer.

Célzott ellenőrzés:

- HU/EN homepage E2E;
- mobile nav;
- CV link;
- hero reduced motion;
- screenshotok 390, 768, 1440, 1920 szélességen egyszer.

## WP-04 – Work index és case studies

Feladatok:

- Work index átrendezése;
- filter eltávolítása vagy indokolt megtartása;
- Adott új storytelling oldal;
- Alba új storytelling oldal;
- Sanjiwani új case study;
- Samsung tömör case study;
- QuestLog és experiments másodlagos elhelyezése;
- 16 szekciós UI megszüntetése.

Célzott ellenőrzés:

- minden route 200;
- belső linkek;
- case study E2E;
- képek alt text;
- legfeljebb egy visual batch.

## WP-05 – Lab, Studio és navigation finomítás

Feladatok:

- Lab light-first redesign;
- főoldali teaser és teljes Lab összhangja;
- Studio rövidítés;
- fix pricing eltávolítása;
- header és command palette finomítása;
- footer;
- privacy route vizuális igazítása.

Célzott ellenőrzés:

- Lab interakciók;
- Studio CTA;
- command palette;
- keyboard QA.

## WP-06 – Végső QA és handoff

Feladatok:

- `git diff --check`;
- pontosan egy teljes `npm run quality:full`;
- konkrét hibák javítása;
- ha szükséges, a hibás teszt és a teljes gate legfeljebb egy ismétlése;
- Lighthouse egyszer;
- screenshotmatrix egyszer;
- commit;
- push;
- draft PR;
- egyszeri Vercel check;
- handoff report.

---

# 41. Tesztelési és keretfogyasztási szabály

## 41.1. Induláskor

Egyszer:

```powershell
npm ci
npm run lint
npm run typecheck
```

A teljes quality suite induláskor nem szükséges, ha a V2 branch legutóbbi CI-je zöld.

## 41.2. Fejlesztés közben

Csak célzottan:

- érintett unit teszt;
- érintett Playwright spec;
- `npx eslint` az érintett fájlokra vagy normál lint ritkán;
- typecheck nagyobb komponensfázis végén;
- build csak route/Next-konfiguráció vagy jelentős server/client határ változásakor.

## 41.3. Visual teszt

Maximum három nagy visual frissítési pont:

1. homepage;
2. case studies;
3. Lab/Studio.

A snapshotok ne frissüljenek automatikusan anélkül, hogy a Codex előbb megvizsgálta volna a diffet.

## 41.4. Teljes gate

A munka végén pontosan egy:

```powershell
npm run quality:full
```

Ha hibás:

1. csak a konkrét hibát javítsa;
2. a célzott hibás tesztet futtassa;
3. utána a teljes gate még egyszer futhat.

Kettőnél több teljes gate csak valódi technikai indokkal megengedett, és a végső jelentésben dokumentálandó.

## 41.5. Lighthouse

- egy lokális vagy Preview mérés a végén;
- nem fut szekciónként;
- nem üldöz 1–2 pontnyi eltérést, ha a minimumok teljesülnek.

## 41.6. Remote polling

Tilos:

- Vercel/GitHub állapot 10 másodperces ciklusban;
- ismétlődő `gh` vagy Vercel API lekérdezés;
- Vercel CLI belső forrásának kutatása.

Egyetlen végső remote check elegendő.

---

# 42. Főoldali elfogadási kritériumok

## 42.1. Vizuális

- dominánsan világos;
- nincs teljes sötét hero;
- headline legfeljebb 3 sor desktopon;
- hero első viewportban teljesen érthető;
- blueprint valódi projektfragmenteket használ;
- legalább három eltérő projektlayout;
- nincs végtelen kártyagrid;
- nincs nagy lila–cián glow háttér;
- nincs generikus AI/SaaS sablonhatás;
- az oldal 35–45%-kal rövidebb a V2 főoldalnál;
- a selected work a fő vizuális súlypont.

## 42.2. Tartalmi

- nincs auditnyelv;
- nincs „nem dokumentált forráskészlet” szöveg;
- nincs „repository proves” blokk;
- a Bosch, Samsung és Adott tapasztalat értelmes szöveggel jelenik meg;
- CV letölthető;
- Adott, Alba és Sanjiwani világosan bemutatott;
- Samsung `+20%` megfelelő attribúcióval;
- QuestLog nem zászlóshajó;
- Studio külön, rövid CTA.

## 42.3. UX

- navigáció egyszerű;
- CTA-k egyértelműek;
- elsődleges user flow: hero → selected work → case study;
- másodlagos user flow: hero → CV / GitHub;
- Studio útvonal külön;
- mobilon nincs zsúfoltság;
- screenshotok nem olvashatatlan miniatűrök;
- interakciók reduced motion mellett működnek.

---

# 43. Case study elfogadási kritériumok

- 5–7 történeti blokk, nem 16 státuszszekció;
- legalább egy nagy projektvizuál above the fold;
- egyetlen disclosure blokk, ha szükséges;
- szerepkör és technológia röviden;
- valódi screenshot vagy korrekt saját diagram;
- nincs ismétlődő evidence-lista;
- nincs „not disclosed” blokkhalmozás;
- mobilon kényelmes olvasás;
- minden képhez alt text;
- related projects a végén.

---

# 44. Technical acceptance criteria

Kötelező zöld állapot:

- `git diff --check`;
- ESLint 0 error;
- TypeScript zöld;
- unit tesztek zöldek;
- production build zöld;
- releváns E2E zöld;
- axe zöld;
- visual diff elfogadott;
- internal links zöld;
- cross-browser zöld;
- dependency auditban nincs ismert critical/high production vulnerability;
- Vercel Preview Ready;
- `main` érintetlen;
- production deploy nem történt.

---

# 45. Végső handoff formátuma

A Codex végső válasza rövid, strukturált és lezáró legyen.

Kötelező tartalom:

1. branch;
2. végső commit SHA;
3. draft PR link;
4. Preview URL vagy útmutatás a PR Vercel checkhez;
5. megvalósított munkacsomagok;
6. design- és tartalmi változások összefoglalása;
7. quality gate eredmények;
8. Lighthouse eredmények;
9. fennmaradó manuális QA;
10. production előtti checklist;
11. explicit mondat arról, hogy a `main` nem módosult.

Nem kezdhet új fejlesztési kört a végső jelentés után.

---

# 46. Production előtti manuális checklist

A projektgazda ellenőrzi:

- HU homepage;
- EN homepage;
- Adott case study;
- Alba case study;
- Sanjiwani case study;
- Samsung case study;
- Work index;
- Lab;
- Studio;
- privacy;
- CV HU/EN;
- GitHub link;
- LinkedIn link;
- 390 px mobil;
- 768 px tablet;
- 1440 px desktop;
- 1920 px wide;
- Firefox;
- Chrome;
- fizikai Android vagy iPhone;
- keyboard navigation;
- 200% zoom;
- reduced motion;
- contact preview isolation;
- console error;
- noindex Preview;
- production metadata.

Csak ezután történhet merge a `main` ágba.

---

# 47. Végső tiltott AI-design minták

A Codex a megvalósítás során minden pontot explicit kerül:

1. teljes sötét oldal neon accenttel;
2. minden szekció felett uppercase monospace eyebrow;
3. minden tartalom rounded cardban;
4. minden projekt azonos 2×2 gridben;
5. túlméretezett, 5–8 soros hero headline;
6. felesleges „01 / 02 / 03” sorszámozás mindenhol;
7. badge-halmozás;
8. repository- vagy tesztpipeline-önigazolás felhasználói tartalomként;
9. kitalált terminal window;
10. generikus node graph projektbizonyíték helyett;
11. túl sok technikai jargon a főoldalon;
12. stock illusztráció;
13. AI-generált ember vagy portré;
14. üres gradient orb;
15. folyamatos scroll animation minden elemen;
16. olyan dashboard-esztétika, amely nem kapcsolódik valódi projekthez;
17. túl szabályos, monoton szekcióritmus;
18. nagy üres sötét felületek tartalom nélkül;
19. „100%”, „perfect”, „senior level” vagy hasonló önminősítő állítás;
20. változatlan V2 copy új színpalettával.

---

# 48. Rövid végső definíció

A V3 akkor sikeres, ha a látogató ezt érzi:

> Ez nem egy sablonos fejlesztői portfólió. Egy olyan full-stack fejlesztő munkája, aki érti a felhasználói élményt, az üzleti folyamatot és a rendszer működését is.

A főoldal nem akar mindent egyszerre elmagyarázni. A valódi munkák mutatják meg a képességeket. A részletes technikai tartalom a case study és Lab oldalakon érhető el. A vizuális megjelenés világos, editorial, precíz és projektspecifikus; az industrial rendszerkarakter finom, nem domináns.
