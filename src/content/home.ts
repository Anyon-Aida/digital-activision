import type { Locale } from "@/i18n/routing";

export type NavigationItem = {
  href: `#${string}`;
  label: string;
};

export type SystemMapNode = {
  id: string;
  label: string;
  summary: string;
  detail: string;
};

export type FeaturedProject = {
  slug: string;
  title: string;
  status: string;
  visibility: string;
  problem: string;
  ownership: string;
  stack: readonly string[];
  result: string;
};

export type CapabilityGroup = {
  title: string;
  items: readonly string[];
  evidence: string;
  evidenceHref: `#${string}`;
};

export type ExperienceEntry = {
  organization: string;
  location?: string;
  role: string;
  period: string;
  scope: string;
  result: string;
  stack: readonly string[];
};

export type StandardItem = {
  title: string;
  description: string;
  state: "implemented" | "planned";
};

export type HomeContent = {
  chrome: {
    brand: string;
    brandDetail: string;
    navigationLabel: string;
    openNavigation: string;
    closeNavigation: string;
    navigationTitle: string;
    navigation: readonly NavigationItem[];
    unavailable: string;
    cvLabel: string;
    languageLabel: string;
    footerSummary: string;
    privacyLabel: string;
    githubLabel: string;
    linkedInLabel: string;
  };
  hero: {
    eyebrow: string;
    name: string;
    role: string;
    headline: string;
    paragraphs: readonly [string, string];
    stackLabel: string;
    stack: readonly string[];
    primaryCta: string;
    secondaryCta: string;
    cvUnavailable: string;
    githubLabel: string;
    linkedInLabel: string;
  };
  systemMap: {
    eyebrow: string;
    title: string;
    description: string;
    conceptualLabel: string;
    detailLabel: string;
    fallbackTitle: string;
    nodes: readonly SystemMapNode[];
  };
  credibility: {
    label: string;
    items: readonly string[];
  };
  featuredWork: {
    eyebrow: string;
    title: string;
    description: string;
    problemLabel: string;
    ownershipLabel: string;
    resultLabel: string;
    availabilityLabel: string;
    projects: readonly FeaturedProject[];
  };
  capabilities: {
    eyebrow: string;
    title: string;
    description: string;
    evidenceLabel: string;
    groups: readonly CapabilityGroup[];
  };
  experience: {
    eyebrow: string;
    title: string;
    description: string;
    roleLabel: string;
    periodLabel: string;
    resultLabel: string;
    entries: readonly ExperienceEntry[];
  };
  standards: {
    eyebrow: string;
    title: string;
    description: string;
    implementedLabel: string;
    plannedLabel: string;
    items: readonly StandardItem[];
  };
  studio: {
    eyebrow: string;
    title: string;
    description: string;
    action: string;
    migrationNote: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    topicsLabel: string;
    topics: readonly string[];
    action: string;
    privacyNote: string;
  };
};

const unavailable = {
  hu: "A nyilvános forráskészletben nem dokumentált.",
  en: "Not documented in the public source set.",
} as const;

export const homeContent = {
  hu: {
    chrome: {
      brand: "Kovács Zalán",
      brandDetail: "Full-stack engineering",
      navigationLabel: "Elsődleges navigáció",
      openNavigation: "Navigáció megnyitása",
      closeNavigation: "Navigáció bezárása",
      navigationTitle: "Navigáció",
      navigation: [
        { href: "#featured-work", label: "Engineering munkák" },
        { href: "#system-map", label: "System Map" },
        { href: "#experience", label: "Tapasztalat" },
        { href: "#studio", label: "Studio" },
        { href: "#contact", label: "Kapcsolat" },
      ],
      unavailable: "Nem elérhető",
      cvLabel: "CV",
      languageLabel: "Váltás angol nyelvre",
      footerSummary:
        "Full-stack rendszerek és digitális termékek a felülettől az API-kon át a deploymentig.",
      privacyLabel: "Adatkezelés",
      githubLabel: "GitHub profil",
      linkedInLabel: "Digital Activision LinkedIn",
    },
    hero: {
      eyebrow: "Full-stack engineering portfólió",
      name: "Kovács Zalán",
      role: "Full-Stack Engineer & Digital Product Builder",
      headline:
        "Nem csak felületeket készítek: működő, biztonságos és skálázható webes rendszereket építek.",
      paragraphs: [
        "React, Next.js, Node.js, Laravel/PHP és SQL alapú rendszereken dolgozom a felülettől az API-kon és adatmodellen át a deploymentig.",
        "Az üzleti problémát tesztelhető rendszerhatárokra, hozzáférhető felületekre és üzemeltethető megoldásokra fordítom le.",
      ],
      stackLabel: "Fókusz",
      stack: [
        "React",
        "Next.js",
        "Node.js",
        "Laravel / PHP",
        "SQL",
        "System design",
      ],
      primaryCta: "Engineering esettanulmányok",
      secondaryCta: "System Map felfedezése",
      cvUnavailable: "A HU/EN CV asset még nem érhető el a workspace-ben.",
      githubLabel: "GitHub",
      linkedInLabel: "Studio LinkedIn",
    },
    systemMap: {
      eyebrow: "Interactive System Map",
      title: "Egy kérés útja a teljes stacken",
      description:
        "Koncepcionális, technológia-semleges rendszerkép. Válassz egy csomópontot a felelősségi határ megismeréséhez.",
      conceptualLabel: "Koncepcionális architektúraminta",
      detailLabel: "Kiválasztott rendszerhatár",
      fallbackTitle: "A teljes folyamat szövegesen",
      nodes: [
        { id: "ui", label: "User Interface", summary: "Hozzáférhető felület", detail: "Szemantikus, reszponzív interakciók, amelyek egyértelmű szerver-szerződésekhez kapcsolódnak." },
        { id: "boundary", label: "Next.js boundary", summary: "Szerver- és klienshatár", detail: "A renderelés, cache és adatbetöltés határa; csak a valódi interakció kerül kliensre." },
        { id: "api", label: "API / Server Action", summary: "Validált bemenet", detail: "Típusos request contract, méretkorlát, normalizálás és kiszámítható hibaválaszok." },
        { id: "auth", label: "Auth & authorization", summary: "Identity és jogosultság", detail: "A hitelesítés az identitást, az authorization pedig minden védett művelet jogosultságát ellenőrzi." },
        { id: "service", label: "Business service", summary: "Üzleti szabályok", detail: "A workflow, tranzakciós szabályok és integrációk a UI-tól és transporttól elkülönítve maradnak." },
        { id: "data", label: "PostgreSQL / cache", summary: "Adat és konzisztencia", detail: "Explicit adatmodell, migrációs út és csak mért indokkal bevezetett cache." },
        { id: "observe", label: "Monitoring & audit", summary: "Visszakövethető működés", detail: "PII-mentes strukturált jelek, request korreláció és auditálható állapotváltozások." },
      ],
    },
    credibility: {
      label: "Ellenőrizhető szakmai bizonyítékok",
      items: [
        "5+ év szoftverfejlesztési tapasztalat",
        "Bosch és Samsung vállalati környezet",
        "20%-os pontosságjavulás egy rendszám-ellenőrzési folyamatban",
        "Frontend, backend, adatbázis és deployment felelősség",
        "Workflow-, RBAC- és audit-tapasztalat",
      ],
    },
    featuredWork: {
      eyebrow: "Featured engineering work",
      title: "Rendszerhatárok, döntések és igazolható eredmények",
      description:
        "A bizalmas munkák anonimizált, koncepcionális bemutatást kapnak; a hiányzó adatokat nem pótolom feltételezéssel.",
      problemLabel: "Probléma",
      ownershipLabel: "Felelősség",
      resultLabel: "Eredmény / állapot",
      availabilityLabel: "A typed case-study route a következő munkacsomagban kapcsolódik be.",
      projects: [
        { slug: "samsung-smart-gate-analytics", title: "Samsung – Smart Gate Analytics", status: "Privát esettanulmány", visibility: "Anonimizált", problem: "Valós idejű kaputerhelési nézet és egy PHP-alapú folyamat React/Node.js modernizációja.", ownership: "A modernizációban való részvétel igazolt; a pontos egyéni scope nem publikus.", stack: ["React", "Node.js", "PHP", "Analytics"], result: "A rendszám-ellenőrzési folyamat pontossága 20%-kal javult." },
        { slug: "adott-enterprise-project-workflow", title: "Adott Solution – Enterprise Project Workflow", status: "Privát esettanulmány", visibility: "Anonimizált", problem: "Inquiry → Spec → SoW → Quote/Order workflow szerepköralapú review-val és auditálással.", ownership: "Önálló architektúra- és projektfelelősség.", stack: ["React", "API", "Token auth", "RBAC", "Audit"], result: "A workflow capability igazolt; publikus mérőszám nem áll rendelkezésre." },
        { slug: "alba-medence-3d-configurator", title: "Alba Medence – Interactive 3D Configurator", status: "Publikus bemutató", visibility: "Publikus", problem: "Interaktív 3D medencekonfigurátor modern vizuális iránnyal.", ownership: unavailable.hu, stack: ["Next.js", "3D", "UX", "UI"], result: "A technikai architektúra és az eredmény még igazolásra vár." },
        { slug: "questlog-offline-first-pwa", title: "QuestLog – Offline-First PWA", status: "Fejlesztés alatt", visibility: "Publikus koncepció", problem: "Napi küldetéskezelés XP- és szintrendszerrel, telepíthető és offline fallback iránnyal.", ownership: unavailable.hu, stack: ["PWA", "localStorage", "Offline", "Product"], result: "Roadmap, nem kész production rendszer; live link nincs." },
      ],
    },
    capabilities: {
      eyebrow: "Engineering capabilities",
      title: "Képességek bizonyítékhoz kötve",
      description: "Nincs százalékos skill bar: minden csoport projekthez vagy a jelen V2 repository ellenőrizhető megvalósításához kapcsolódik.",
      evidenceLabel: "Kapcsolódó bizonyíték",
      groups: [
        { title: "Frontend systems", items: ["React és Next.js architektúra", "Design system", "Reszponzív és hozzáférhető UI", "State és adatbetöltés", "Teljesítmény", "3D és adatvizualizáció"], evidence: "Samsung, Alba Medence és Portfolio V2", evidenceHref: "#featured-work" },
        { title: "Backend & APIs", items: ["Node.js", "Laravel / PHP", "REST API", "Validáció", "Authentication", "RBAC", "Audit log", "Külső integrációk"], evidence: "Adott Solution és Samsung", evidenceHref: "#featured-work" },
        { title: "Data & reliability", items: ["SQL és adatmodellezés", "Migrációk", "Cache", "Monitoring", "Logelemzés", "Hibakezelés", "Adatvizualizáció"], evidence: "System Map és Portfolio V2 roadmap", evidenceHref: "#system-map" },
        { title: "Delivery", items: ["Git és PR workflow", "CI/CD", "Automatizált tesztek", "Vercel Preview", "Production debugging", "Dokumentáció", "Agilis csapatmunka"], evidence: "Portfolio V2 quality pipeline", evidenceHref: "#standards" },
      ],
    },
    experience: {
      eyebrow: "Experience",
      title: "Szakmai útvonal, feltételezések nélkül",
      description: "A sorrend igazolt; a nem publikus pozíciókat, időszakokat és eredményeket egyértelműen hiányzóként jelölöm.",
      roleLabel: "Pozíció",
      periodLabel: "Időszak",
      resultLabel: "Kiemelt eredmény",
      entries: [
        { organization: "Bosch", location: "Hatvan", role: unavailable.hu, period: unavailable.hu, scope: unavailable.hu, result: unavailable.hu, stack: [] },
        { organization: "Freelancer", role: unavailable.hu, period: unavailable.hu, scope: unavailable.hu, result: unavailable.hu, stack: [] },
        { organization: "Samsung", location: "Jászfényszaru", role: unavailable.hu, period: unavailable.hu, scope: "Vállalati PHP-rendszer modernizációja React és Node.js irányba; kapuforgalmi analitika.", result: "20%-os pontosságjavulás a rendszám-ellenőrzési folyamatban.", stack: ["React", "Node.js", "PHP"] },
        { organization: "Freelancer", role: unavailable.hu, period: unavailable.hu, scope: unavailable.hu, result: unavailable.hu, stack: [] },
        { organization: "Adott Solution", role: unavailable.hu, period: unavailable.hu, scope: "Enterprise projekt-workflow, review, approval, RBAC és audit.", result: "Önálló architektúra- és projektfelelősség.", stack: ["React", "API", "RBAC"] },
        { organization: "Sajá projektek és fejlesztés", role: "Digital Product Builder", period: "Jelenlegi", scope: "Portfolio V2, QuestLog és engineering demonstrációk.", result: "Aktív fejlesztés; production eredmény nem állítható.", stack: ["Next.js", "TypeScript", "PWA"] },
      ],
    },
    standards: {
      eyebrow: "Engineering standards",
      title: "Amit ez a repository már bizonyít — és ami még terv",
      description: "A státuszok a rebuild branch tényleges quality pipeline-jához kapcsolódnak.",
      implementedLabel: "Megvalósítva",
      plannedLabel: "Következő gate",
      items: [
        { title: "Typed contracts", description: "Strict TypeScript, runtime locale-validáció és fail-closed route-kezelés.", state: "implemented" },
        { title: "Review-ready changes", description: "Kis, tematikus commitok és explicit rebuild branch workflow.", state: "implemented" },
        { title: "Automated tests", description: "Lint, typecheck, unit, production build, E2E, axe és visual regression.", state: "implemented" },
        { title: "Accessibility", description: "WCAG-alapú axe gate, keyboard/fókuszteszt, reduced motion és 44 px célméret.", state: "implemented" },
        { title: "Secure defaults", description: "Preview noindex, dependency audit és fail-closed delivery policy; a kontakt hardening még következik.", state: "implemented" },
        { title: "Observable production", description: "PII-mentes telemetry és safe health endpoint a WP-08 része.", state: "planned" },
        { title: "Performance budgets", description: "Lighthouse after-mérés és bundle budget a végső QA-ban zárul.", state: "planned" },
        { title: "Reversible deployment", description: "Preview-only bemutatás, külön major upgrade commit és dokumentált revert út.", state: "implemented" },
      ],
    },
    studio: {
      eyebrow: "Digital Activision Studio",
      title: "Weboldalra vagy digitális termékre van szükséged a vállalkozásodhoz?",
      description: "A meglévő szolgáltatási, folyamat- és pricing tartalom külön Studio oldalon marad meg, tisztázott ígéretekkel.",
      action: "Studio projekt megbeszélése",
      migrationNote: "A dedikált Studio route a tartalommigrációs munkacsomagban aktiválódik.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Beszéljünk a problémáról, nem csak a feature-listáról.",
      description: "Állásról, szakmai együttműködésről vagy engineering projektről beszélnél? Írd meg röviden a kontextust.",
      topicsLabel: "Hasznos kontextus",
      topics: ["Karrierlehetőség", "Engineering együttműködés", "Weboldal vagy digitális termék", "Egyéb"],
      action: "E-mail írása",
      privacyNote: "A sajá, validált kontaktfolyam a WP-08-ban lép a statikus mailto helyére.",
    },
  },
  en: {
    chrome: {
      brand: "Kovács Zalán",
      brandDetail: "Full-stack engineering",
      navigationLabel: "Primary navigation",
      openNavigation: "Open navigation",
      closeNavigation: "Close navigation",
      navigationTitle: "Navigation",
      navigation: [
        { href: "#featured-work", label: "Engineering work" },
        { href: "#system-map", label: "System Map" },
        { href: "#experience", label: "Experience" },
        { href: "#studio", label: "Studio" },
        { href: "#contact", label: "Contact" },
      ],
      unavailable: "Unavailable",
      cvLabel: "CV",
      languageLabel: "Switch to Hungarian",
      footerSummary: "Full-stack systems and digital products from the interface and APIs through deployment.",
      privacyLabel: "Privacy",
      githubLabel: "GitHub profile",
      linkedInLabel: "Digital Activision LinkedIn",
    },
    hero: {
      eyebrow: "Full-stack engineering portfolio",
      name: "Kovács Zalán",
      role: "Full-Stack Engineer & Digital Product Builder",
      headline: "I build production-grade web systems, not just interfaces.",
      paragraphs: [
        "I work across React, Next.js, Node.js, Laravel/PHP and SQL—from interfaces and APIs to data models and deployment.",
        "I turn business problems into testable system boundaries, accessible interfaces and operable solutions.",
      ],
      stackLabel: "Focus",
      stack: ["React", "Next.js", "Node.js", "Laravel / PHP", "SQL", "System design"],
      primaryCta: "Engineering case studies",
      secondaryCta: "Explore the System Map",
      cvUnavailable: "The HU/EN CV assets are not yet available in the workspace.",
      githubLabel: "GitHub",
      linkedInLabel: "Studio LinkedIn",
    },
    systemMap: {
      eyebrow: "Interactive System Map",
      title: "A request across the full stack",
      description: "A conceptual, technology-neutral system map. Select a node to inspect the responsibility boundary.",
      conceptualLabel: "Conceptual architecture pattern",
      detailLabel: "Selected system boundary",
      fallbackTitle: "The complete flow in text",
      nodes: [
        { id: "ui", label: "User Interface", summary: "Accessible interaction", detail: "Semantic, responsive interactions connect to explicit server contracts." },
        { id: "boundary", label: "Next.js boundary", summary: "Server and client boundary", detail: "The rendering, caching and data-loading boundary; only genuine interaction moves to the client." },
        { id: "api", label: "API / Server Action", summary: "Validated input", detail: "Typed request contracts, size limits, normalization and predictable error responses." },
        { id: "auth", label: "Auth & authorization", summary: "Identity and permission", detail: "Authentication establishes identity; authorization checks every protected operation." },
        { id: "service", label: "Business service", summary: "Business rules", detail: "Workflow, transactional rules and integrations stay separate from UI and transport." },
        { id: "data", label: "PostgreSQL / cache", summary: "Data and consistency", detail: "An explicit data model, migration path and caching introduced only with measured justification." },
        { id: "observe", label: "Monitoring & audit", summary: "Traceable operation", detail: "PII-free structured signals, request correlation and auditable state changes." },
      ],
    },
    credibility: {
      label: "Verifiable engineering evidence",
      items: [
        "5+ years in software development",
        "Enterprise experience at Bosch and Samsung",
        "20% accuracy improvement in a licence-plate verification workflow",
        "Frontend, backend, database and deployment ownership",
        "Workflow, RBAC and audit experience",
      ],
    },
    featuredWork: {
      eyebrow: "Featured engineering work",
      title: "System boundaries, decisions and verifiable outcomes",
      description: "Confidential work uses anonymized conceptual explanations; missing details are never filled with assumptions.",
      problemLabel: "Problem",
      ownershipLabel: "Ownership",
      resultLabel: "Outcome / state",
      availabilityLabel: "The typed case-study route is connected in the next work package.",
      projects: [
        { slug: "samsung-smart-gate-analytics", title: "Samsung – Smart Gate Analytics", status: "Private case study", visibility: "Anonymized", problem: "Real-time gate-load analytics and the React/Node.js modernization of a PHP-based workflow.", ownership: "Participation in the modernization is verified; exact individual scope is not public.", stack: ["React", "Node.js", "PHP", "Analytics"], result: "Licence-plate verification accuracy improved by 20%." },
        { slug: "adott-enterprise-project-workflow", title: "Adott Solution – Enterprise Project Workflow", status: "Private case study", visibility: "Anonymized", problem: "An Inquiry → Spec → SoW → Quote/Order workflow with role-based review and auditability.", ownership: "Independent architecture and project ownership.", stack: ["React", "API", "Token auth", "RBAC", "Audit"], result: "The workflow capability is verified; no public impact metric is available." },
        { slug: "alba-medence-3d-configurator", title: "Alba Medence – Interactive 3D Configurator", status: "Public demo", visibility: "Public", problem: "An interactive 3D pool configurator with a modern visual direction.", ownership: unavailable.en, stack: ["Next.js", "3D", "UX", "UI"], result: "The architecture and outcome still require source verification." },
        { slug: "questlog-offline-first-pwa", title: "QuestLog – Offline-First PWA", status: "In progress", visibility: "Public concept", problem: "Daily quests with XP and levels, installability and an offline-fallback direction.", ownership: unavailable.en, stack: ["PWA", "localStorage", "Offline", "Product"], result: "A roadmap, not a finished production system; no live link is claimed." },
      ],
    },
    capabilities: {
      eyebrow: "Engineering capabilities",
      title: "Capabilities connected to evidence",
      description: "No percentage skill bars: each group connects to a project or to an implementation that is verifiable in this V2 repository.",
      evidenceLabel: "Related evidence",
      groups: [
        { title: "Frontend systems", items: ["React and Next.js architecture", "Design systems", "Responsive and accessible UI", "State and data loading", "Performance", "3D and data visualization"], evidence: "Samsung, Alba Medence and Portfolio V2", evidenceHref: "#featured-work" },
        { title: "Backend & APIs", items: ["Node.js", "Laravel / PHP", "REST API", "Validation", "Authentication", "RBAC", "Audit logs", "External integrations"], evidence: "Adott Solution and Samsung", evidenceHref: "#featured-work" },
        { title: "Data & reliability", items: ["SQL and data modelling", "Migrations", "Caching", "Monitoring", "Log analysis", "Error handling", "Data visualization"], evidence: "System Map and Portfolio V2 roadmap", evidenceHref: "#system-map" },
        { title: "Delivery", items: ["Git and PR workflow", "CI/CD", "Automated tests", "Vercel Preview", "Production debugging", "Documentation", "Agile teamwork"], evidence: "Portfolio V2 quality pipeline", evidenceHref: "#standards" },
      ],
    },
    experience: {
      eyebrow: "Experience",
      title: "A career path without invented details",
      description: "The sequence is verified; non-public roles, dates and outcomes are explicitly marked as unavailable.",
      roleLabel: "Role",
      periodLabel: "Period",
      resultLabel: "Highlighted outcome",
      entries: [
        { organization: "Bosch", location: "Hatvan", role: unavailable.en, period: unavailable.en, scope: unavailable.en, result: unavailable.en, stack: [] },
        { organization: "Freelancer", role: unavailable.en, period: unavailable.en, scope: unavailable.en, result: unavailable.en, stack: [] },
        { organization: "Samsung", location: "Jászfényszaru", role: unavailable.en, period: unavailable.en, scope: "Modernization of an enterprise PHP system toward React and Node.js, with gate-load analytics.", result: "20% accuracy improvement in the licence-plate verification workflow.", stack: ["React", "Node.js", "PHP"] },
        { organization: "Freelancer", role: unavailable.en, period: unavailable.en, scope: unavailable.en, result: unavailable.en, stack: [] },
        { organization: "Adott Solution", role: unavailable.en, period: unavailable.en, scope: "Enterprise project workflow, review, approval, RBAC and audit.", result: "Independent architecture and project ownership.", stack: ["React", "API", "RBAC"] },
        { organization: "Independent products and development", role: "Digital Product Builder", period: "Current", scope: "Portfolio V2, QuestLog and engineering demonstrations.", result: "Active development; no production outcome is claimed.", stack: ["Next.js", "TypeScript", "PWA"] },
      ],
    },
    standards: {
      eyebrow: "Engineering standards",
      title: "What this repository proves—and what remains planned",
      description: "Statuses connect directly to the real quality pipeline on the rebuild branch.",
      implementedLabel: "Implemented",
      plannedLabel: "Next gate",
      items: [
        { title: "Typed contracts", description: "Strict TypeScript, runtime locale validation and fail-closed route handling.", state: "implemented" },
        { title: "Review-ready changes", description: "Small thematic commits and an explicit rebuild-branch workflow.", state: "implemented" },
        { title: "Automated tests", description: "Lint, typecheck, unit, production build, E2E, axe and visual regression.", state: "implemented" },
        { title: "Accessibility", description: "WCAG-oriented axe gates, keyboard/focus tests, reduced motion and 44px targets.", state: "implemented" },
        { title: "Secure defaults", description: "Preview noindex, dependency audits and fail-closed delivery policy; contact hardening is still ahead.", state: "implemented" },
        { title: "Observable production", description: "PII-free telemetry and a safe health endpoint arrive in WP-08.", state: "planned" },
        { title: "Performance budgets", description: "The Lighthouse after-measurement and bundle budget close in final QA.", state: "planned" },
        { title: "Reversible deployment", description: "Preview-only delivery, a separate major-upgrade commit and a documented revert path.", state: "implemented" },
      ],
    },
    studio: {
      eyebrow: "Digital Activision Studio",
      title: "Need a website or digital product for your business?",
      description: "The existing services, process and pricing content stays available on a dedicated Studio page with clarified promises.",
      action: "Discuss a Studio project",
      migrationNote: "The dedicated Studio route is activated during the content-migration work package.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let’s discuss the problem, not only the feature list.",
      description: "Want to discuss a role, an engineering collaboration or a product project? Share the context briefly.",
      topicsLabel: "Useful context",
      topics: ["Career opportunity", "Engineering collaboration", "Website or digital product", "Other"],
      action: "Write an email",
      privacyNote: "The validated first-party contact flow replaces this static mailto in WP-08.",
    },
  },
} satisfies Record<Locale, HomeContent>;
