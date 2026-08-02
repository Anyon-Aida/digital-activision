# Digital Activision Portfolio V3 – Asset manifest

**Verzió:** 1.0  
**Dátum:** 2026. július 27.  
**Tulajdonosi nyilatkozat:** a projektgazda megerősítette, hogy a mellékelt képeken látható adatok dummy/tesztadatok, ezért a képek portfóliócélú felhasználása engedélyezett. Ez nem jelent ügyfél- vagy munkáltatói ajánlást; a képeket kizárólag saját fejlesztői közreműködés bemutatására szabad használni.

## 1. Általános felhasználási szabályok

- A képek **referencia- és forrásassetek**. Nem kötelező minden képet közvetlenül publikálni.
- A Codex készítsen belőlük optimalizált AVIF/WebP változatokat a `public/portfolio-v3/` mappába.
- Az eredeti PNG-ket ne méretezze fel, ne élesítse túl, és ne generáljon belőlük hamis funkciót vagy állapotot.
- A képek köré szerkesztett böngésző- vagy alkalmazáskeret lehet egyedi, de ne imitáljon megtévesztő operációs rendszert.
- A projektképekhez használjon valós, tartalomból következő képkivágást; ne random dekoratív cropot.
- A képekhez tartozó alt text a funkciót írja le, ne a vizuális díszítést.
- A hero-ban legfeljebb három képi fragment legyen egyszerre hangsúlyos. A többi csak finom háttérelemként használható.
- Az Adott képeket nem kell anonimizálni a dummy adatok miatt, de ne állítsa az oldal, hogy a képen látható konkrét tesztadatok valós ügyféladatok.
- A logók és márkanevek a projekt azonosítására használhatók, de ne jelenjen meg „official partner”, „endorsed by” vagy hasonló állítás.

## 2. Célmappák a weboldalon

```text
public/portfolio-v3/
├── hero/
│   ├── hero-blueprint-adott.webp
│   ├── hero-blueprint-alba.webp
│   └── hero-blueprint-sanjiwani.webp
├── projects/
│   ├── adott/
│   ├── alba/
│   └── sanjiwani/
└── diagrams/
    ├── samsung-gate-flow.svg
    ├── adott-workflow.svg
    └── product-system-blueprint.svg
```

Az eredeti referenciafájlok a `docs/portfolio-v3/references/` alatt vannak. A weboldal komponensei **ne** közvetlenül innen töltsék őket.

---

# 3. Sanjiwani

## 3.1. `sanjiwani-home-desktop.png`

**Tartalom:** nyitóoldal, márka, navigáció, fő hero, elsődleges CTA-k.  
**Elsődleges használat:** Sanjiwani case study nyitóvizuál, projektkártya háttér vagy editorial széles kép.  
**Másodlagos használat:** hero montage finom háttérfragmentje.  
**Javasolt crop:** a bal oldali szöveg és a jobb oldali masszázskép együtt; a felső fejléc csak akkor maradjon, ha a teljes termék kontextusa szükséges.  
**Alt text HU:** „A Sanjiwani masszázsszalon világos nyitóoldala szolgáltatás- és időpontfoglaló gombokkal.”  
**Alt text EN:** “Sanjiwani massage studio homepage with service and booking calls to action.”

## 3.2. `sanjiwani-services-desktop.png`

**Tartalom:** kategória- és időtartam-szűrők, keresőmező, szolgáltatáskártyák.  
**Elsődleges használat:** case study „Service discovery” rész, szűrés és információs architektúra bizonyítása.  
**Javasolt crop:** kategóriasor + első három szolgáltatáskártya.  
**Alt text HU:** „Masszázsszolgáltatások szűrhető listája kategória-, időtartam- és keresési vezérlőkkel.”  
**Alt text EN:** “Filterable massage service catalogue with category, duration and search controls.”

## 3.3. `sanjiwani-booking-flow-desktop.png`

**Tartalom:** időpontfoglaló modal, ügyféladatok, masszőrválasztás, dátum, időtartam, idősávok, végösszeg.  
**Elsődleges használat:** főoldali harmadik projektvizuál és Sanjiwani case study fő funkciókép.  
**Javasolt crop:** teljes modal; a háttér maradhat enyhén sötétítve, mert segít érzékeltetni a kontextust.  
**Alt text HU:** „Időpontfoglaló felület masszőr-, dátum-, időtartam- és idősávválasztással.”  
**Alt text EN:** “Booking interface with therapist, date, duration and time-slot selection.”

---

# 4. Alba Medence

## 4.1. `alba-website-3d-entry.png`

**Tartalom:** az Alba Medence weboldal 3D tervezőhöz vezető hero szekciója.  
**Elsődleges használat:** case study bevezetés, a konfigurátor üzleti kontextusának bemutatása.  
**Javasolt crop:** teljes hero navigációval; alternatívaként a bal szöveg + gomb és a medencekép.  
**Alt text HU:** „Az Alba Medence weboldal 3D medencetervezőt bemutató hero szekciója.”  
**Alt text EN:** “Alba Medence website hero introducing the interactive 3D pool planner.”

## 4.2. `alba-brand-section-footer.png`

**Tartalom:** márkák és nagy footer hullámos vizuális átmenettel.  
**Elsődleges használat:** csak case study galéria vagy márkakörnyezet bemutatása.  
**Ne használja:** hero fő képként vagy főoldali projekt teaserben.  
**Alt text HU:** „Az Alba Medence márkapartner-szekciója és információgazdag footere.”  
**Alt text EN:** “Alba Medence partner-brand section and information-rich footer.”

## 4.3. `alba-configurator-desktop.png`

**Tartalom:** interaktív 3D medencemodell, desktop oldalsó konfigurációs panel, FPS/memory overlay.  
**Elsődleges használat:** Alba fő projektvizuál, hibrid hero egyik elsődleges fragmentje.  
**Javasolt crop:** a 3D medence és a jobb oldali opciópanel együtt. A debug overlay case studyban maradhat, mert technikai fejlesztési kontextust mutat; a főoldali kompozícióból inkább vágja le.  
**Alt text HU:** „Interaktív 3D medencekonfigurátor desktop nézetben, kiegészítőválasztó oldalsávval.”  
**Alt text EN:** “Interactive 3D pool configurator on desktop with an options sidebar.”

## 4.4. `alba-configurator-mobile.png`

**Tartalom:** mobil konfigurátor, 3D nézet, nagy érintési célok és ajánlatkérő CTA.  
**Elsődleges használat:** desktop projektkompozícióra ráúsztatott mobil frame; reszponzív UX bizonyítása.  
**Alt text HU:** „A 3D medencekonfigurátor mobilnézete érintésbarát opciókkal és ajánlatkérő gombbal.”  
**Alt text EN:** “Mobile view of the 3D pool configurator with touch-friendly options and quote request.”

---

# 5. Adott Solution / A.TANGO

A képek a projektgazda szerint dummy adatokat tartalmaznak és publikálhatók. A vizuális kommunikációban továbbra is szerepeljen, hogy a bemutatás a fejlesztői közreműködésre koncentrál; nem ügyfélajánlás és nem teljes termékdokumentáció.

## 5.1. `adott-inquiry-roles.png`

**Tartalom:** inquiry nézet, státuszfolyamat, ADOTT role-lista, vendégfelhasználó és szerepkör-hozzárendelési kontextus.  
**Elsődleges használat:** RBAC és workflow komplexitás bemutatása.  
**Javasolt crop:** bal navigáció + felső státuszlépések + role-lista; a hosszú alsó szöveg nem szükséges.  
**Alt text HU:** „Enterprise inquiry nézet szerepkörlistával és többlépcsős státuszfolyamattal.”  
**Alt text EN:** “Enterprise inquiry view with role definitions and a multi-stage status workflow.”

## 5.2. `adott-inquiry-status-and-details.png`

**Tartalom:** raw inquiry, műszaki tulajdonságtábla, attachment kezelés, filter, jobb oldali státuszsáv.  
**Elsődleges használat:** összetett adatkezelés, attachment és workflow státusz bemutatása.  
**Alt text HU:** „Inquiry részletező nézet műszaki paraméterekkel, csatolmánnyal, státuszszűrővel és folyamatjelzővel.”  
**Alt text EN:** “Inquiry detail view with technical parameters, attachment controls, status filter and workflow indicator.”

## 5.3. `adott-quote-structure.png`

**Tartalom:** quote nézet, projekt, modulok, taskok, phase-ek és órabecslések.  
**Elsődleges használat:** Adott főoldali projektkompozíció elsődleges képe; case study „structured estimation” blokk.  
**Javasolt crop:** modul–task–phase hierarchia és overall hours.  
**Alt text HU:** „Ajánlati struktúra modulokkal, feladatokkal, fázisokkal és órabecslésekkel.”  
**Alt text EN:** “Quote structure with modules, tasks, phases and effort estimates.”

## 5.4. `adott-quote-editor.png`

**Tartalom:** szerkeszthető modul–task–phase struktúra, hozzáadás/törlés, SoW owner, mentés.  
**Elsődleges használat:** interakciós komplexitás, nested form és szerkesztési workflow bemutatása.  
**Alt text HU:** „Összetett ajánlatszerkesztő beágyazott modul-, feladat- és fázismezőkkel.”  
**Alt text EN:** “Complex quote editor with nested module, task and phase fields.”

## 5.5. `adott-notifications.png`

**Tartalom:** értesítéskártyák, dropdown panel, státuszváltozás események.  
**Elsődleges használat:** case study galéria vagy audit/notification funkció bemutatása.  
**Ne használja:** főoldali elsődleges projektképként.  
**Alt text HU:** „Enterprise értesítési központ státuszváltozásokat összegző kártyákkal és lenyíló panellel.”  
**Alt text EN:** “Enterprise notification centre with status-change cards and a dropdown panel.”

## 5.6. `adott-company-detail.png`

**Tartalom:** ügyféltábla és jobbról nyíló company/contact drawer.  
**Elsődleges használat:** master-detail UX és vállalati adatkezelés.  
**Alt text HU:** „Vállalati ügyféllista jobbról nyíló cég- és kapcsolattartói részletező panellel.”  
**Alt text EN:** “Company list with a right-side drawer for company and contact details.”

## 5.7. `adott-company-create.png`

**Tartalom:** add company modal, címadatok, opcionális kapcsolattartói rész.  
**Elsődleges használat:** form design és admin workflow.  
**Alt text HU:** „Új vállalat létrehozására szolgáló adminisztrációs modal cím- és kapcsolattartói mezőkkel.”  
**Alt text EN:** “Administrative modal for creating a company with address and optional contact fields.”

## 5.8. `adott-bug-report.png`

**Tartalom:** egyszerű bug/feature bejelentő form, prioritás, csatolmány.  
**Elsődleges használat:** másodlagos galéria; delivery/feedback loop bemutatása.  
**Alt text HU:** „Bug- és feature-bejelentő űrlap prioritás- és fájlcsatolási lehetőséggel.”  
**Alt text EN:** “Bug and feature report form with priority selection and file attachment.”

## 5.9. `adott-bug-report-list.png`

**Tartalom:** bug report kártyagrid, leírás, prioritás, aktív állapot.  
**Elsődleges használat:** másodlagos galéria; belső visszajelzési folyamat.  
**Alt text HU:** „Bug report lista részletes leírásokat, prioritást és állapotot mutató kártyákkal.”  
**Alt text EN:** “Bug report list with cards showing descriptions, priority and status.”

---

# 6. Hero asset prioritás

A hibrid hero kötelező vizuális sorrendje:

1. **Adott:** `adott-quote-structure.png` vagy `adott-quote-editor.png` – enterprise workflow fragment.
2. **Alba:** `alba-configurator-desktop.png` – 3D product fragment.
3. **Sanjiwani:** `sanjiwani-booking-flow-desktop.png` – consumer UX fragment.
4. **Samsung:** nem screenshotból, hanem saját SVG adatfolyam/analitika motívumból jelenjen meg.

A hero ne mutasson négy teljes screenshotot. A három képi fragment egy közös blueprint-kompozíció része legyen, finom összekötő vonalakkal és rövid, legfeljebb 1–2 szavas annotációkkal:

- `WORKFLOW`
- `3D CONFIG`
- `BOOKING`
- `DATA / API`

---

# 7. Projektoldali galéria prioritás

## Adott

1. quote structure
2. inquiry roles
3. company detail
4. notifications
5. quote editor
6. bug report/list csak „Supporting systems” részben

## Alba

1. configurator desktop
2. configurator mobile
3. website 3D entry
4. brand/footer csak galéria végén

## Sanjiwani

1. booking flow
2. services
3. home

---

# 8. Optimalizálási célok

- Főoldali projektképek: maximum 1600 px hosszabb oldal; AVIF és WebP; 75–82 közötti minőség.
- Hero fragmentek: maximum 1200 px; AVIF elsődleges, WebP fallback.
- Mobil screenshot: natív arány megtartása, ne torzítsa széles képre.
- `next/image` kötelező, megfelelő `sizes` értékekkel.
- Above-the-fold csak a ténylegesen látható egy vagy két kép kapjon `priority`/preload beállítást.
- Ne generáljon ugyanabból a képből feleslegesen több közel azonos méretű változatot.

---

# 9. CV assetek

## `references/cv/kovacs-zalan-cv-hu.pdf`

Másolandó cél: `public/cv/kovacs-zalan-cv-hu.pdf`  
Használat: magyar locale CV letöltési linkje.  
A link legyen valódi `<a>` elem `download` attribútummal vagy új lapon megnyitással; ne maradjon disabled gomb.

## `references/cv/kovacs-zalan-cv-en.pdf`

Másolandó cél: `public/cv/kovacs-zalan-cv-en.pdf`  
Használat: angol locale CV letöltési linkje.
