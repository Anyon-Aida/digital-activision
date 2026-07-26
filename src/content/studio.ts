import { z } from "zod";
import type { Locale } from "@/i18n/routing";

const nonEmptyText = z.string().trim().min(1);

const benefitIdSchema = z.enum([
  "scope-clarity",
  "reusable-foundation",
  "delivery-visibility",
]);
const serviceIdSchema = z.enum([
  "websites-commerce",
  "brand-ui",
  "technical-seo",
  "operations-support",
  "audit-consulting",
  "content-publishing",
]);
const processIdSchema = z.enum([
  "discovery",
  "scope",
  "prototype",
  "design-system",
  "implementation",
  "qa-handover",
]);
const packageIdSchema = z.enum(["starter", "growth", "scale"]);
const experimentIdSchema = z.enum([
  "home-garden",
  "burger-shop",
  "lion-gym",
  "nati-chat",
]);

const benefitSchema = z
  .object({
    id: benefitIdSchema,
    title: nonEmptyText,
    description: nonEmptyText,
  })
  .strict();

const serviceSchema = z
  .object({
    id: serviceIdSchema,
    title: nonEmptyText,
    description: nonEmptyText,
    includes: z.array(nonEmptyText).min(2),
    boundary: nonEmptyText,
  })
  .strict();

const processStepSchema = z
  .object({
    id: processIdSchema,
    title: nonEmptyText,
    description: nonEmptyText,
    output: nonEmptyText,
  })
  .strict();

const studioPackageSchema = z
  .object({
    id: packageIdSchema,
    status: z.literal("needs-owner-confirmation"),
    name: nonEmptyText,
    retainedPrice: nonEmptyText,
    positioning: nonEmptyText,
    includes: z.array(nonEmptyText).min(2),
    scopeNote: nonEmptyText,
  })
  .strict();

const exactLegacyDemoPath = /^\/projects\/[a-z0-9-]+(?:\/[a-z0-9-]+)*\/index\.html$/;

const experimentLinkSchema = z
  .object({
    label: nonEmptyText,
    href: z.string().regex(exactLegacyDemoPath),
  })
  .strict();

const experimentSchema = z
  .object({
    id: experimentIdSchema,
    classification: z.enum(["ui-concept", "static-experiment"]),
    title: nonEmptyText,
    description: nonEmptyText,
    availabilityNote: nonEmptyText,
    links: z.array(experimentLinkSchema),
  })
  .strict();

const studioLocaleContentSchema = z
  .object({
    metaTitle: nonEmptyText,
    metaDescription: nonEmptyText,
    hero: z
      .object({
        eyebrow: nonEmptyText,
        title: nonEmptyText,
        description: nonEmptyText,
        primaryAction: nonEmptyText,
        secondaryAction: nonEmptyText,
        boundary: nonEmptyText,
      })
      .strict(),
    benefitsHeading: nonEmptyText,
    benefitsIntro: nonEmptyText,
    benefits: z.array(benefitSchema).min(1),
    servicesHeading: nonEmptyText,
    servicesIntro: nonEmptyText,
    services: z.array(serviceSchema).min(1),
    processHeading: nonEmptyText,
    processIntro: nonEmptyText,
    process: z.array(processStepSchema).min(1),
    packagesHeading: nonEmptyText,
    packagesIntro: nonEmptyText,
    pricingWarningTitle: nonEmptyText,
    pricingWarningBody: nonEmptyText,
    packageStatusLabel: nonEmptyText,
    productionPriceFallback: nonEmptyText,
    packages: z.array(studioPackageSchema).min(1),
    experimentsHeading: nonEmptyText,
    experimentsIntro: nonEmptyText,
    experimentLabels: z
      .object({
        uiConcept: nonEmptyText,
        staticExperiment: nonEmptyText,
      })
      .strict(),
    experiments: z.array(experimentSchema).min(1),
    contact: z
      .object({
        eyebrow: nonEmptyText,
        title: nonEmptyText,
        description: nonEmptyText,
        action: nonEmptyText,
        email: z.string().email(),
        href: z.string().regex(/^mailto:/),
        privacyNote: nonEmptyText,
      })
      .strict(),
  })
  .strict();

const collectionKeys = [
  "benefits",
  "services",
  "process",
  "packages",
  "experiments",
] as const;

export const studioContentSchema = z
  .object({
    hu: studioLocaleContentSchema,
    en: studioLocaleContentSchema,
  })
  .strict()
  .superRefine((content, context) => {
    for (const locale of ["hu", "en"] as const) {
      for (const key of collectionKeys) {
        const ids = content[locale][key].map(({ id }) => id);

        if (new Set(ids).size !== ids.length) {
          context.addIssue({
            code: "custom",
            message: `${locale}.${key} contains duplicate ids`,
            path: [locale, key],
          });
        }
      }
    }

    for (const key of collectionKeys) {
      const huIds = content.hu[key].map(({ id }) => id);
      const enIds = content.en[key].map(({ id }) => id);

      if (JSON.stringify(huIds) !== JSON.stringify(enIds)) {
        context.addIssue({
          code: "custom",
          message: `${key} must have identical HU/EN topology`,
          path: [key],
        });
      }
    }
  });

const rawStudioContent = {
  hu: {
    metaTitle: "Digital Activision Studio | Weboldalak és digitális termékek",
    metaDescription:
      "Egyedi weboldalak, UI-rendszerek és digitális termékek tervezése, fejlesztése és műszaki támogatása tisztázott scope alapján.",
    hero: {
      eyebrow: "Digital Activision Studio",
      title: "Üzleti célból működő webes felület",
      description:
        "A Studio weboldalak, UI-rendszerek és kisebb digitális termékek tervezésében és megvalósításában segít. A megoldás, az ütemezés és a mérési terv mindig a jóváhagyott scope-ból indul.",
      primaryAction: "Projekt egyeztetése",
      secondaryAction: "Szolgáltatások áttekintése",
      boundary:
        "A Studio ügyfélprojektekre fókuszál; a fejlesztői portfólió és az engineering case study-k külön felületen maradnak.",
    },
    benefitsHeading: "Mit ad egy tisztázott együttműködés?",
    benefitsIntro:
      "Nem előre gyártott ígéreteket, hanem ellenőrizhető scope-ot, döntési pontokat és átadható eredményeket.",
    benefits: [
      {
        id: "scope-clarity",
        title: "Tiszta scope",
        description:
          "A célok, felhasználói utak, függőségek és kizárások a fejlesztés előtt közös keretet kapnak.",
      },
      {
        id: "reusable-foundation",
        title: "Újrahasználható alap",
        description:
          "A komponensek, tartalmi struktúrák és integrációs határok a későbbi bővítést is figyelembe veszik.",
      },
      {
        id: "delivery-visibility",
        title: "Követhető szállítás",
        description:
          "A mérföldkövek, review-pontok és átadandó elemek a projekt tényleges kockázataihoz igazodnak.",
      },
    ],
    servicesHeading: "Studio szolgáltatások",
    servicesIntro:
      "A modulok külön vagy összehangolt projektként is tervezhetők. A végleges tartalom minden esetben az egyeztetett ajánlat része.",
    services: [
      {
        id: "websites-commerce",
        title: "Weboldal és kereskedelmi felület",
        description:
          "Reszponzív marketingoldal, tartalmi felület vagy webshop-front a szükséges üzleti folyamatokhoz igazítva.",
        includes: [
          "Információs architektúra és kulcs user flow-k",
          "Űrlapok, ajánlatkérés és egyeztetett integrációk",
        ],
        boundary:
          "A fizetési, készlet- és külső rendszerkapcsolatok külön technikai felmérést igényelnek.",
      },
      {
        id: "brand-ui",
        title: "Arculati irány és UI-rendszer",
        description:
          "Vizuális irány, tipográfia, színek és újrahasználható felületi komponensek digitális termékekhez.",
        includes: [
          "Kulcsképernyők és komponensállapotok",
          "Reszponzív és hozzáférhető UI-alapok",
        ],
        boundary:
          "A teljes márkastratégia, nyomdai anyag és egyedi illusztráció csak külön scope esetén része a munkának.",
      },
      {
        id: "technical-seo",
        title: "Technikai SEO-alapozás",
        description:
          "Keresőbarát szerkezet, metadata, crawl-kezelés és teljesítménytudatos megvalósítás.",
        includes: [
          "Szemantikus oldal- és heading-struktúra",
          "Indexelési, megosztási és alap mérési beállítások",
        ],
        boundary:
          "Helyezés vagy forgalomnövekedés nem garantálható; a tartalmi stratégia és kampánykezelés külön feladat.",
      },
      {
        id: "operations-support",
        title: "Üzemeltetés és műszaki támogatás",
        description:
          "Frissítési, hibajavítási, mentési és monitorozási feladatok dokumentált felelősségi körrel.",
        includes: [
          "Egyeztetett karbantartási feladatok",
          "Hibajegy- és változáskezelési keret",
        ],
        boundary:
          "Rendelkezésre állás, reakcióidő és szolgáltatási szint csak külön támogatási megállapodásban vállalható.",
      },
      {
        id: "audit-consulting",
        title: "Webes audit és konzultáció",
        description:
          "Meglévő felület műszaki, használhatósági és tartalmi áttekintése, prioritásokkal rendezett javaslatokkal.",
        includes: [
          "Kockázatok és gyorsan javítható pontok",
          "Prioritási és megvalósítási javaslat",
        ],
        boundary:
          "Az audit mélysége és az eszközös mérés köre a hozzáférések és a jóváhagyott feladat alapján változik.",
      },
      {
        id: "content-publishing",
        title: "Tartalmi struktúra és publikálás",
        description:
          "Oldalstruktúra, szerkesztési minta és publikálási folyamat webes tartalmakhoz.",
        includes: [
          "Tartalmi sablonok és komponenshez illesztés",
          "CMS- vagy repository-alapú publikálási folyamat",
        ],
        boundary:
          "A szövegírás, fordítás, fotózás és folyamatos szerkesztés mennyisége külön egyeztetendő.",
      },
    ],
    processHeading: "A közös munka folyamata",
    processIntro:
      "A lépések sorrendje stabil keretet ad, a részletek és review-pontok pedig a projekt méretéhez igazodnak.",
    process: [
      {
        id: "discovery",
        title: "Felderítés",
        description:
          "A cél, a közönség, a jelenlegi állapot és a kritikus korlátok közös feltérképezése.",
        output: "Kimenet: rövid brief, célok, nyitott kérdések és kockázatok.",
      },
      {
        id: "scope",
        title: "Scope és megvalósítási terv",
        description:
          "Az oldaltérkép, user flow-k, integrációk, felelősségek és elfogadási feltételek rögzítése.",
        output: "Kimenet: jóváhagyható scope és mérföldkőterv.",
      },
      {
        id: "prototype",
        title: "Vázlat és prototípus",
        description:
          "A kulcsfolyamatok kipróbálható formába rendezése a részletes vizuális kidolgozás előtt.",
        output: "Kimenet: review-olható wireframe vagy célzott prototípus.",
      },
      {
        id: "design-system",
        title: "Vizuális rendszer",
        description:
          "A jóváhagyott irány kiterjesztése komponensekre, állapotokra és reszponzív nézetekre.",
        output: "Kimenet: kulcsképernyők és implementálható UI-szabályok.",
      },
      {
        id: "implementation",
        title: "Fejlesztés és integráció",
        description:
          "A felület, az adatkapcsolatok és az egyeztetett külső szolgáltatások fokozatos megvalósítása.",
        output: "Kimenet: review-környezet és tesztelhető funkciók.",
      },
      {
        id: "qa-handover",
        title: "QA és átadás",
        description:
          "Funkcionális, reszponzív és hozzáférhetőségi ellenőrzés, majd dokumentált átadás.",
        output: "Kimenet: elfogadási lista, dokumentáció és egyeztetett következő lépések.",
      },
    ],
    packagesHeading: "Kiinduló csomagstruktúra",
    packagesIntro:
      "A csomagok összehasonlítási alapot adnak. Nem helyettesítik az igényfelmérést vagy az írásos ajánlatot.",
    pricingWarningTitle: "Preview árak — tulajdonosi megerősítés szükséges",
    pricingWarningBody:
      "Az összegek a korábbi Studio-tartalomból megőrzött, ellenőrzésre váró értékek. Nem minősülnek kötelező ajánlatnak; a végleges ár, tartalom, ütemezés és adózási feltétel csak jóváhagyott scope és írásos ajánlat alapján érvényes.",
    packageStatusLabel: "Tulajdonosi megerősítés szükséges",
    productionPriceFallback: "Egyedi, scope-alapú ajánlat",
    packages: [
      {
        id: "starter",
        status: "needs-owner-confirmation",
        name: "Starter",
        retainedPrice: "490 000 Ft-tól",
        positioning: "Fókuszált marketing- vagy bemutatkozó felülethez.",
        includes: [
          "Kis terjedelmű, reszponzív oldalstruktúra",
          "Egyedi UI-irány és technikai SEO-alapok",
          "Kapcsolati vagy ajánlatkérő folyamat",
          "Dokumentált átadás",
        ],
        scopeNote:
          "Az oldalszám, tartalom-előkészítés, integráció és módosítási kör az ajánlatban rögzítendő.",
      },
      {
        id: "growth",
        status: "needs-owner-confirmation",
        name: "Growth",
        retainedPrice: "1 190 000 Ft-tól",
        positioning: "Többoldalas, szerkeszthető üzleti felülethez.",
        includes: [
          "Több aloldal és egyeztetett CMS-folyamat",
          "Újrahasználható komponensrendszer",
          "Technikai SEO- és mérési alapok",
          "Launch előtti QA és átadási támogatás",
        ],
        scopeNote:
          "A CMS, tartalommigráció, analitika és támogatás pontos köre az ajánlatban rögzítendő.",
      },
      {
        id: "scale",
        status: "needs-owner-confirmation",
        name: "Scale",
        retainedPrice: "Egyedi ajánlat",
        positioning: "Webalkalmazás- vagy összetett integrációs igényhez.",
        includes: [
          "Egyedi alkalmazás- és integrációs scope",
          "Deployment- és observability-terv",
          "Biztonsági és adatkezelési követelmények",
          "Opcionális karbantartási keret",
        ],
        scopeNote:
          "Az architektúra, szolgáltatási szint, ütemezés és költség csak technikai felmérés után határozható meg.",
      },
    ],
    experimentsHeading: "UI-koncepciók és statikus kísérletek",
    experimentsIntro:
      "Ezek a kisebb munkák vizuális vagy interakciós ötleteket mutatnak. Nem egyenértékűek production case study-val, és nem mindegyik kapcsolódik működő backendhez.",
    experimentLabels: {
      uiConcept: "UI-koncepció",
      staticExperiment: "Statikus kísérlet",
    },
    experiments: [
      {
        id: "home-garden",
        classification: "ui-concept",
        title: "Home Garden",
        description:
          "Webshop-kategóriákhoz és termékfelfedezéshez készült vizuális felületi koncepció.",
        availabilityNote:
          "Ebben a repositoryban nincs hozzá önálló, ellenőrzött HTML-demo, ezért élő hivatkozás nem jelenik meg.",
        links: [],
      },
      {
        id: "burger-shop",
        classification: "static-experiment",
        title: "Burger Shop",
        description:
          "Erős kontrasztra és termékfókuszra épülő statikus landing-page kísérlet.",
        availabilityNote:
          "Önálló HTML/CSS/JavaScript bemutató; nem kereskedelmi rendszer és nem production referencia.",
        links: [
          {
            label: "Statikus Burger Shop demo megnyitása",
            href: "/projects/hamburger/index.html",
          },
        ],
      },
      {
        id: "lion-gym",
        classification: "static-experiment",
        title: "Lion Gym",
        description:
          "Sportmárkához készített hero- és landing-page vizuális kísérlet.",
        availabilityNote:
          "Önálló statikus bemutató; nem igazol működő tagsági, foglalási vagy fizetési rendszert.",
        links: [
          {
            label: "Statikus Lion Gym demo megnyitása",
            href: "/projects/boxer-hero/index.html",
          },
        ],
      },
      {
        id: "nati-chat",
        classification: "static-experiment",
        title: "Nati chat interface",
        description:
          "Chatfelülethez készült vizuális és navigációs prototípus.",
        availabilityNote:
          "A statikus felület nem nyújt aktív AI- vagy ügyfélszolgálati backendet.",
        links: [
          {
            label: "Nati bemutatóoldal megnyitása",
            href: "/projects/nati/index.html",
          },
          {
            label: "Nati chat képernyő megnyitása",
            href: "/projects/nati/chat/index.html",
          },
        ],
      },
    ],
    contact: {
      eyebrow: "Studio kapcsolat",
      title: "Írd le röviden a projekt helyzetét",
      description:
        "A cél, a jelenlegi felület, a szükséges funkciók és az ismert korlátok elég kiindulást adnak az első egyeztetéshez. A kapcsolatfelvétel most e-mailben működik; automatikus ajánlat vagy válaszidő-ígéret nincs.",
      action: "Studio megkeresés e-mailben",
      email: "digitalactivision@gmail.com",
      href: "mailto:digitalactivision@gmail.com?subject=Digital%20Activision%20Studio%20megkeres%C3%A9s",
      privacyNote:
        "Csak a megkereséshez szükséges adatokat küldd el; jelszót, üzleti titkot vagy érzékeny személyes adatot ne írj az első e-mailbe.",
    },
  },
  en: {
    metaTitle: "Digital Activision Studio | Websites and digital products",
    metaDescription:
      "Design, development and technical support for websites, UI systems and digital products, based on a clearly agreed scope.",
    hero: {
      eyebrow: "Digital Activision Studio",
      title: "Web experiences built around a business need",
      description:
        "Studio helps shape and implement websites, UI systems and focused digital products. The solution, schedule and measurement plan start with an agreed scope.",
      primaryAction: "Discuss a project",
      secondaryAction: "Review the services",
      boundary:
        "Studio focuses on client work; the developer portfolio and engineering case studies remain a separate part of the site.",
    },
    benefitsHeading: "What does a clear engagement provide?",
    benefitsIntro:
      "Not pre-written promises, but a reviewable scope, decision points and concrete handover items.",
    benefits: [
      {
        id: "scope-clarity",
        title: "Clear scope",
        description:
          "Goals, user journeys, dependencies and exclusions receive a shared frame before implementation starts.",
      },
      {
        id: "reusable-foundation",
        title: "Reusable foundation",
        description:
          "Components, content structures and integration boundaries account for likely future extension.",
      },
      {
        id: "delivery-visibility",
        title: "Visible delivery",
        description:
          "Milestones, review points and handover items follow the actual risks of the project.",
      },
    ],
    servicesHeading: "Studio services",
    servicesIntro:
      "Modules can be planned independently or as one coordinated project. Final deliverables always belong to the agreed proposal.",
    services: [
      {
        id: "websites-commerce",
        title: "Websites and commerce interfaces",
        description:
          "Responsive marketing, content or storefront experiences aligned with the business processes they support.",
        includes: [
          "Information architecture and key user flows",
          "Forms, quote requests and agreed integrations",
        ],
        boundary:
          "Payments, inventory and external system connections require a separate technical assessment.",
      },
      {
        id: "brand-ui",
        title: "Visual direction and UI systems",
        description:
          "Visual direction, typography, colour and reusable interface components for digital products.",
        includes: [
          "Key screens and component states",
          "Responsive and accessible UI foundations",
        ],
        boundary:
          "Full brand strategy, print work and custom illustration are included only through a separate scope.",
      },
      {
        id: "technical-seo",
        title: "Technical SEO foundation",
        description:
          "Search-friendly structure, metadata, crawl controls and performance-aware implementation.",
        includes: [
          "Semantic page and heading structure",
          "Indexing, sharing and foundational measurement setup",
        ],
        boundary:
          "Rankings or traffic growth cannot be guaranteed; content strategy and campaign management are separate workstreams.",
      },
      {
        id: "operations-support",
        title: "Operations and technical support",
        description:
          "Updates, fixes, backups and monitoring tasks with a documented responsibility boundary.",
        includes: [
          "Agreed maintenance activities",
          "An issue and change-management framework",
        ],
        boundary:
          "Availability, response targets and service levels can only be agreed in a separate support agreement.",
      },
      {
        id: "audit-consulting",
        title: "Web audit and consulting",
        description:
          "A technical, usability and content review of an existing experience with prioritised recommendations.",
        includes: [
          "Risks and practical improvement opportunities",
          "Prioritisation and implementation guidance",
        ],
        boundary:
          "Audit depth and measurement coverage depend on the available access and approved scope.",
      },
      {
        id: "content-publishing",
        title: "Content structure and publishing",
        description:
          "Page structures, editorial patterns and publishing workflows for web content.",
        includes: [
          "Content templates and component mapping",
          "CMS- or repository-based publishing workflow",
        ],
        boundary:
          "Copywriting, translation, photography and ongoing editorial volume require separate agreement.",
      },
    ],
    processHeading: "How an engagement moves forward",
    processIntro:
      "The sequence provides a stable framework while details and review points adapt to the size of the project.",
    process: [
      {
        id: "discovery",
        title: "Discovery",
        description:
          "Map the goal, audience, current state and critical constraints together.",
        output: "Output: a concise brief, goals, open questions and risks.",
      },
      {
        id: "scope",
        title: "Scope and delivery plan",
        description:
          "Define the sitemap, user flows, integrations, responsibilities and acceptance criteria.",
        output: "Output: an approvable scope and milestone plan.",
      },
      {
        id: "prototype",
        title: "Wireframe and prototype",
        description:
          "Put key journeys into a reviewable form before detailed visual execution.",
        output: "Output: a reviewable wireframe or focused prototype.",
      },
      {
        id: "design-system",
        title: "Visual system",
        description:
          "Extend the approved direction across components, states and responsive views.",
        output: "Output: key screens and implementation-ready UI rules.",
      },
      {
        id: "implementation",
        title: "Development and integration",
        description:
          "Implement the experience, data connections and agreed external services incrementally.",
        output: "Output: a review environment and testable functionality.",
      },
      {
        id: "qa-handover",
        title: "QA and handover",
        description:
          "Complete functional, responsive and accessibility checks, followed by documented handover.",
        output: "Output: an acceptance list, documentation and agreed next steps.",
      },
    ],
    packagesHeading: "Starting package structure",
    packagesIntro:
      "Packages provide a comparison point. They do not replace discovery or a written proposal.",
    pricingWarningTitle: "Preview pricing — owner confirmation required",
    pricingWarningBody:
      "These amounts are retained from the previous Studio content and await verification. They are not a binding offer; final price, deliverables, schedule and tax treatment apply only through an approved scope and written proposal.",
    packageStatusLabel: "Owner confirmation required",
    productionPriceFallback: "Custom, scope-based quote",
    packages: [
      {
        id: "starter",
        status: "needs-owner-confirmation",
        name: "Starter",
        retainedPrice: "from HUF 490,000",
        positioning: "For a focused marketing or company profile experience.",
        includes: [
          "A small responsive page structure",
          "Custom UI direction and technical SEO foundations",
          "Contact or quote-request journey",
          "Documented handover",
        ],
        scopeNote:
          "Page count, content preparation, integrations and revision rounds must be defined in the proposal.",
      },
      {
        id: "growth",
        status: "needs-owner-confirmation",
        name: "Growth",
        retainedPrice: "from HUF 1,190,000",
        positioning: "For a multi-page, editable business experience.",
        includes: [
          "Multiple pages and an agreed CMS workflow",
          "Reusable component system",
          "Technical SEO and measurement foundations",
          "Pre-launch QA and handover support",
        ],
        scopeNote:
          "The exact CMS, content migration, analytics and support coverage must be defined in the proposal.",
      },
      {
        id: "scale",
        status: "needs-owner-confirmation",
        name: "Scale",
        retainedPrice: "Custom proposal",
        positioning: "For application or complex integration requirements.",
        includes: [
          "Custom application and integration scope",
          "Deployment and observability plan",
          "Security and data-processing requirements",
          "Optional maintenance framework",
        ],
        scopeNote:
          "Architecture, service levels, schedule and cost can only be set after a technical assessment.",
      },
    ],
    experimentsHeading: "UI concepts and static experiments",
    experimentsIntro:
      "These smaller pieces demonstrate visual or interaction ideas. They are not equivalent to production case studies, and not every item connects to a working backend.",
    experimentLabels: {
      uiConcept: "UI concept",
      staticExperiment: "Static experiment",
    },
    experiments: [
      {
        id: "home-garden",
        classification: "ui-concept",
        title: "Home Garden",
        description:
          "A visual storefront concept exploring product categories and discovery.",
        availabilityNote:
          "This repository does not contain a standalone verified HTML demo, so no live link is presented.",
        links: [],
      },
      {
        id: "burger-shop",
        classification: "static-experiment",
        title: "Burger Shop",
        description:
          "A static landing-page experiment built around strong contrast and product focus.",
        availabilityNote:
          "A standalone HTML/CSS/JavaScript demonstration; not a commerce system or production reference.",
        links: [
          {
            label: "Open the static Burger Shop demo",
            href: "/projects/hamburger/index.html",
          },
        ],
      },
      {
        id: "lion-gym",
        classification: "static-experiment",
        title: "Lion Gym",
        description:
          "A hero and landing-page visual experiment for a sports brand.",
        availabilityNote:
          "A standalone static demonstration; it does not claim a working membership, booking or payment system.",
        links: [
          {
            label: "Open the static Lion Gym demo",
            href: "/projects/boxer-hero/index.html",
          },
        ],
      },
      {
        id: "nati-chat",
        classification: "static-experiment",
        title: "Nati chat interface",
        description:
          "A visual and navigation prototype for a chat interface.",
        availabilityNote:
          "The static interface does not provide an active AI or customer-support backend.",
        links: [
          {
            label: "Open the Nati introduction",
            href: "/projects/nati/index.html",
          },
          {
            label: "Open the Nati chat screen",
            href: "/projects/nati/chat/index.html",
          },
        ],
      },
    ],
    contact: {
      eyebrow: "Studio contact",
      title: "Share the current state of the project",
      description:
        "The goal, existing experience, required functions and known constraints are enough for an initial discussion. Contact currently works by email; there is no automated quote or response-time promise.",
      action: "Email a Studio inquiry",
      email: "digitalactivision@gmail.com",
      href: "mailto:digitalactivision@gmail.com?subject=Digital%20Activision%20Studio%20inquiry",
      privacyNote:
        "Send only the data needed for the inquiry. Do not include passwords, trade secrets or sensitive personal data in the first email.",
    },
  },
} as const;

export const studioContent = studioContentSchema.parse(rawStudioContent) satisfies Record<
  Locale,
  z.infer<typeof studioLocaleContentSchema>
>;

export type StudioLocaleContent = z.infer<typeof studioLocaleContentSchema>;
