import type { ProjectMediaId } from "@/content/project-media";
import type { Locale } from "@/i18n/routing";
import type { CaseStudySlug } from "@/lib/case-study-routes";

export type NavigationItem = {
  href: `#${string}` | `/${string}`;
  label: string;
};

export type SystemMapNode = {
  id: string;
  label: string;
  summary: string;
  detail: string;
};

export type SystemMapContent = {
  eyebrow: string;
  title: string;
  description: string;
  conceptualLabel: string;
  detailLabel: string;
  fallbackTitle: string;
  nodes: readonly SystemMapNode[];
};

export type ContactTopic = {
  value: "career-engineering" | "studio" | "other";
  label: string;
};

type FeaturedProject = {
  slug: CaseStudySlug;
  tag: string;
  title: string;
  summary: string;
  role: string;
  highlights: readonly string[];
  mediaIds: readonly ProjectMediaId[];
};

type ExperienceEntry = {
  organization: string;
  location?: string;
  role: string;
  period: string;
  description: string;
};

type CapabilityGroup = {
  title: string;
  items: readonly string[];
};

type LabTeaserFlow = {
  label: string;
  nodes: readonly [string, string, string, string];
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
    cvLabel: string;
    cvHref: `/cv/${string}.pdf`;
    cvDownloadFilename: string;
    cvHuHref: "/cv/kovacs-zalan-cv-hu.pdf";
    cvEnHref: "/cv/kovacs-zalan-cv-en.pdf";
    cvHuLabel: string;
    cvEnLabel: string;
    languageLabel: string;
    footerSummary: string;
    privacyLabel: string;
    studioLabel: string;
    githubLabel: string;
    githubHref: "https://github.com/Anyon-Aida";
    linkedInLabel: string;
    linkedInHref: "https://www.linkedin.com/company/digital-activision";
  };
  hero: {
    eyebrow: string;
    headlineLead: string;
    headlineAccent: string;
    paragraphs: readonly [string, string];
    primaryCta: string;
    cvCta: string;
    githubCta: string;
    proofPoints: readonly [string, string, string];
    blueprintLabel: string;
    blueprintAnnotations: readonly [string, string, string, string];
  };
  selectedWork: {
    title: string;
    description: string;
    actionLabel: string;
    roleLabel: string;
    highlightsLabel: string;
    projects: readonly [FeaturedProject, FeaturedProject, FeaturedProject];
  };
  samsungImpact: {
    metric: "+20%";
    title: string;
    description: string;
    meta: string;
    action: string;
    diagramLabel: string;
  };
  profile: {
    title: string;
    description: string;
    experienceTitle: string;
    capabilityTitle: string;
    labAction: string;
    experience: readonly [
      ExperienceEntry,
      ExperienceEntry,
      ExperienceEntry,
      ExperienceEntry,
    ];
    capabilities: readonly [
      CapabilityGroup,
      CapabilityGroup,
      CapabilityGroup,
      CapabilityGroup,
    ];
  };
  labTeaser: {
    eyebrow: string;
    title: string;
    description: string;
    action: string;
    flows: readonly [LabTeaserFlow, LabTeaserFlow, LabTeaserFlow];
  };
  studioBridge: {
    title: string;
    description: string;
    action: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    directEmailLabel: string;
    topicsLabel: string;
    topicOptions: readonly ContactTopic[];
    nameLabel: string;
    emailLabel: string;
    topicLabel: string;
    topicPlaceholder: string;
    messageLabel: string;
    messageDescription: string;
    privacyConsentLabel: string;
    privacyLinkLabel: string;
    submitLabel: string;
    submittingLabel: string;
    mailtoFallbackIntro: string;
    mailtoFallbackLabel: string;
    privacyNote: string;
    botVerificationLabel: string;
    successMessage: string;
    genericErrorMessage: string;
    rateLimitMessage: string;
    disabledMessage: string;
    requestIdLabel: string;
    errors: {
      name: string;
      email: string;
      topic: string;
      message: string;
      privacy: string;
    };
  };
};

const sharedChrome = {
  brand: "Kovács Zalán",
  cvHuHref: "/cv/kovacs-zalan-cv-hu.pdf",
  cvEnHref: "/cv/kovacs-zalan-cv-en.pdf",
  githubHref: "https://github.com/Anyon-Aida",
  linkedInHref: "https://www.linkedin.com/company/digital-activision",
} as const;

export const homeContent = {
  hu: {
    chrome: {
      ...sharedChrome,
      brandDetail: "Full-stack developer",
      navigationLabel: "Elsődleges navigáció",
      openNavigation: "Navigáció megnyitása",
      closeNavigation: "Navigáció bezárása",
      navigationTitle: "Navigáció",
      navigation: [
        { href: "/work", label: "Munkák" },
        { href: "#experience", label: "Tapasztalat" },
        { href: "/lab", label: "Lab" },
        { href: "/studio", label: "Studio" },
        { href: "#contact", label: "Kapcsolat" },
      ],
      cvLabel: "CV letöltése",
      cvHref: "/cv/kovacs-zalan-cv-hu.pdf",
      cvDownloadFilename: "kovacs-zalan-cv-hu.pdf",
      cvHuLabel: "Magyar CV",
      cvEnLabel: "English CV",
      languageLabel: "Váltás angol nyelvre",
      footerSummary:
        "Full-Stack Developer & Product Engineer — felületek, üzleti logika és szállítható webes rendszerek.",
      privacyLabel: "Adatkezelés",
      studioLabel: "Digital Activision Studio",
      githubLabel: "GitHub",
      linkedInLabel: "LinkedIn",
    },
    hero: {
      eyebrow: "FULL-STACK FEJLESZTŐ · TERMÉK- ÉS RENDSZERFÓKUSSZAL",
      headlineLead: "Komplex webes rendszereket teszek",
      headlineAccent: "egyszerűvé használni.",
      paragraphs: [
        "React, Next.js, Node.js, Laravel és SQL alapú termékeken dolgozom – vállalati workflowktól az interaktív 3D konfigurátorokig.",
        "A felületet, az üzleti logikát és a szállítási folyamatot egy összefüggő rendszerként tervezem.",
      ],
      primaryCta: "Kiemelt munkák",
      cvCta: "CV letöltése",
      githubCta: "GitHub",
      proofPoints: [
        "Bosch és Samsung vállalati környezet",
        "20%-os pontosságjavulás egy ellenőrzési folyamatban",
        "Frontendtől a backend- és adatmodellig",
      ],
      blueprintLabel: "Összekapcsolt termékrendszerek",
      blueprintAnnotations: ["WORKFLOW", "3D CONFIG", "BOOKING", "DATA / API"],
    },
    selectedWork: {
      title: "Kiemelt munkák",
      description:
        "Három különböző terméktípus, ugyanazzal a céllal: az összetett folyamatok legyenek átláthatók és használhatók.",
      actionLabel: "Esettanulmány megnyitása",
      roleLabel: "Szerepkör",
      highlightsLabel: "Fókusz",
      projects: [
        {
          slug: "adott-enterprise-project-workflow",
          tag: "Enterprise workflow",
          title: "Adott Solution – Enterprise Workflow Platform",
          summary:
            "Összetett inquiry-, ajánlat- és projektfolyamatok egy közös rendszerben, szerepkörökkel, review- és approval-lépésekkel, auditálható állapotváltozásokkal.",
          role: "Önálló architekturális és full-stack fejlesztési felelősség",
          highlights: [
            "Workflow és státuszkezelés",
            "RBAC és approval",
            "Összetett modul–task–phase szerkesztés",
            "Vállalati és kapcsolattartói adatok",
            "Értesítések és hibajegykezelés",
          ],
          mediaIds: ["adott-quote-structure", "adott-inquiry-roles"],
        },
        {
          slug: "alba-medence-3d-configurator",
          tag: "3D configurator",
          title: "Alba Medence – Interactive 3D Configurator",
          summary:
            "Böngészőben futó 3D medencetervező, amely méret-, kialakítás- és kiegészítőválasztást kapcsol össze reszponzív ajánlatkérési folyamattal.",
          role: "Frontend, 3D interakció és reszponzív konfigurációs UX",
          highlights: [
            "Valós idejű 3D megjelenítés",
            "Konfigurációs állapotkezelés",
            "Desktop és mobil kezelőfelület",
            "Teljesítmény- és memóriatudatos működés",
            "Ajánlatkérési átvezetés",
          ],
          mediaIds: [
            "alba-configurator-desktop",
            "alba-configurator-mobile",
          ],
        },
        {
          slug: "sanjiwani-booking-experience",
          tag: "Booking UX",
          title: "Sanjiwani – Service Discovery & Booking Experience",
          summary:
            "Szolgáltatáskeresés és időpontfoglalás egy nyugodt, márkához illeszkedő felületen – kategória-, időtartam-, masszőr- és idősávválasztással.",
          role: "UI/UX, szolgáltatáskatalógus és foglalási flow",
          highlights: [
            "Kategória- és időtartam-szűrés",
            "Keresés",
            "Masszőrválasztás",
            "Dátum- és idősávkezelés",
            "Végösszeg és foglalási adatok",
          ],
          mediaIds: [
            "sanjiwani-booking-flow-desktop",
            "sanjiwani-home-desktop",
            "sanjiwani-services-desktop",
          ],
        },
      ],
    },
    samsungImpact: {
      metric: "+20%",
      title: "Pontosabb rendszám-ellenőrzési folyamat",
      description:
        "Egy vállalati modernizáció részeként valós idejű kaputerhelési analitikán és a rendszám-ellenőrzési folyamat fejlesztésén dolgoztam.",
      meta: "Samsung · React · Node.js · PHP · vállalati környezet",
      action: "Anonimizált esettanulmány",
      diagramLabel: "Kapuforgalom és ellenőrzési jel",
    },
    profile: {
      title: "Tapasztalat a termékfelülettől a működő rendszerig.",
      description:
        "Vállalati workflowk, saját termékek és ügyfélmunkák során ugyanazt keresem: hol tehető egy összetett folyamat érthetőbbé, megbízhatóbbá és könnyebben szállíthatóvá.",
      experienceTitle: "Tapasztalat",
      capabilityTitle: "Amivel dolgozom",
      labAction: "Technikai részletek az Engineering Labban",
      experience: [
        {
          organization: "Bosch",
          location: "Hatvan",
          role: "Full-Stack Developer",
          period: "2020-as évek eleje",
          description:
            "Belső vállalati alkalmazások PHP és Laravel alapon, REST API-k, SQL-adatmodellek, biztonsági alapok és agilis csapatmunka.",
        },
        {
          organization: "Samsung",
          location: "Jászfényszaru",
          role: "Full-Stack Developer",
          period: "Kb. egyéves vállalati szerepkör",
          description:
            "Meglévő PHP-rendszerek modernizálása, React- és Node.js-integráció, jogosultságkezelés, cache, logelemzés és valós idejű analitikai felületek.",
        },
        {
          organization: "Adott Solution",
          role: "Full-Stack Developer / Project Ownership",
          period: "Későbbi önálló projekt",
          description:
            "Enterprise projektworkflow önálló tervezése és fejlesztése React, backend API, adatmodell, RBAC, review- és approval-folyamatok mentén.",
        },
        {
          organization: "Saját termékek és Studio",
          role: "Product engineering",
          period: "Jelenlegi fókusz",
          description:
            "Interaktív webes termékek, PWA-k, UI-rendszerek és ügyféloldalak tervezése, fejlesztése és továbbfejlesztése.",
        },
      ],
      capabilities: [
        {
          title: "Product interface",
          items: [
            "React és Next.js",
            "Reszponzív, hozzáférhető UI",
            "Komplex formok és state",
            "3D és adatvizualizáció",
          ],
        },
        {
          title: "Backend & workflow",
          items: [
            "Node.js és Laravel/PHP",
            "REST API és validáció",
            "Authentication, RBAC, audit",
            "Integrációk és üzleti szabályok",
          ],
        },
        {
          title: "Data & reliability",
          items: [
            "SQL és adatmodellezés",
            "Cache, migráció, logelemzés",
            "Hibakezelés és monitoring",
            "Teljesítményoptimalizálás",
          ],
        },
        {
          title: "Delivery",
          items: [
            "Git és PR workflow",
            "CI/CD és Preview deployment",
            "Unit, E2E és accessibility teszt",
            "Dokumentáció és review",
          ],
        },
      ],
    },
    labTeaser: {
      eyebrow: "ENGINEERING LAB",
      title: "A rendszer nem ér véget a képernyőnél.",
      description:
        "Interaktív példák request-validációra, jogosultságokra, approval workflowkra és offline szinkronizációra.",
      action: "Lab megnyitása",
      flows: [
        {
          label: "Request",
          nodes: ["Input", "Validate", "Authorize", "Persist"],
        },
        {
          label: "Approval",
          nodes: ["Identity", "Permission", "Decision", "Audit"],
        },
        {
          label: "Offline",
          nodes: ["Local state", "Outbox", "Sync", "Conflict"],
        },
      ],
    },
    studioBridge: {
      title: "Digitális terméket vagy weboldalt építenél?",
      description:
        "A Digital Activision Studio üzleti weboldalak, UI-rendszerek és kisebb webalkalmazások tervezésében és megvalósításában segít.",
      action: "Studio szolgáltatások",
    },
    contact: {
      eyebrow: "KAPCSOLAT",
      title: "Beszéljünk a következő rendszerről.",
      description:
        "Álláslehetőségről, szakmai együttműködésről vagy Studio projektről írnál? Küldj rövid kontextust, és visszajelzek.",
      directEmailLabel: "digitalactivision@gmail.com",
      topicsLabel: "Téma",
      topicOptions: [
        {
          value: "career-engineering",
          label: "Karrier vagy engineering együttműködés",
        },
        {
          value: "studio",
          label: "Studio, weboldal vagy digitális termék",
        },
        { value: "other", label: "Egyéb" },
      ],
      nameLabel: "Név",
      emailLabel: "E-mail-cím",
      topicLabel: "Téma",
      topicPlaceholder: "Válassz témát",
      messageLabel: "Üzenet",
      messageDescription:
        "Legalább 20 karakterben írd le röviden a kontextust.",
      privacyConsentLabel:
        "Elolvastam az adatkezelési tájékoztatót, és hozzájárulok az üzenetem kezeléséhez.",
      privacyLinkLabel: "Adatkezelési tájékoztató megnyitása",
      submitLabel: "Üzenet küldése",
      submittingLabel: "Küldés folyamatban…",
      mailtoFallbackIntro: "Ha az űrlap nem érhető el, e-mailben is írhatsz:",
      mailtoFallbackLabel: "E-mail írása",
      privacyNote:
        "Az adatokat kizárólag a megkeresés megválaszolásához kezelem.",
      botVerificationLabel: "Automatikus visszaélés-védelem",
      successMessage: "Köszönöm, az üzenetet fogadtam.",
      genericErrorMessage:
        "Az üzenetet most nem sikerült elküldeni. Próbáld újra később, vagy használd az e-mailes lehetőséget.",
      rateLimitMessage:
        "Túl sok küldési kísérlet történt. Várj egy kicsit, majd próbáld újra, vagy írj e-mailt.",
      disabledMessage:
        "A kontaktűrlap ebben a környezetben jelenleg nem érhető el. Az e-mailes lehetőség továbbra is működik.",
      requestIdLabel: "Kérésazonosító",
      errors: {
        name: "Adj meg legalább két karakterből álló nevet.",
        email: "Adj meg egy érvényes e-mail-címet.",
        topic: "Válassz témát.",
        message: "Az üzenet legalább 20, legfeljebb 5000 karakter lehet.",
        privacy:
          "Az üzenet küldéséhez fogadd el az adatkezelési feltételt.",
      },
    },
  },
  en: {
    chrome: {
      ...sharedChrome,
      brandDetail: "Full-stack developer",
      navigationLabel: "Primary navigation",
      openNavigation: "Open navigation",
      closeNavigation: "Close navigation",
      navigationTitle: "Navigation",
      navigation: [
        { href: "/work", label: "Work" },
        { href: "#experience", label: "Experience" },
        { href: "/lab", label: "Lab" },
        { href: "/studio", label: "Studio" },
        { href: "#contact", label: "Contact" },
      ],
      cvLabel: "Download CV",
      cvHref: "/cv/kovacs-zalan-cv-en.pdf",
      cvDownloadFilename: "kovacs-zalan-cv-en.pdf",
      cvHuLabel: "Magyar CV",
      cvEnLabel: "English CV",
      languageLabel: "Switch to Hungarian",
      footerSummary:
        "Full-Stack Developer & Product Engineer — interfaces, business logic and web systems ready to ship.",
      privacyLabel: "Privacy",
      studioLabel: "Digital Activision Studio",
      githubLabel: "GitHub",
      linkedInLabel: "LinkedIn",
    },
    hero: {
      eyebrow: "FULL-STACK DEVELOPER · PRODUCT AND SYSTEM FOCUS",
      headlineLead: "I make complex web systems feel",
      headlineAccent: "simple to use.",
      paragraphs: [
        "I work across React, Next.js, Node.js, Laravel and SQL – from enterprise workflows to interactive 3D configurators.",
        "I design the interface, business logic and delivery flow as one connected product system.",
      ],
      primaryCta: "Selected work",
      cvCta: "Download CV",
      githubCta: "GitHub",
      proofPoints: [
        "Enterprise environments at Bosch and Samsung",
        "20% accuracy improvement in a verification workflow",
        "From frontend to backend and data model",
      ],
      blueprintLabel: "Connected product systems",
      blueprintAnnotations: ["WORKFLOW", "3D CONFIG", "BOOKING", "DATA / API"],
    },
    selectedWork: {
      title: "Selected work",
      description:
        "Three different product types with the same goal: make complex processes clear and usable.",
      actionLabel: "Open case study",
      roleLabel: "Role",
      highlightsLabel: "Focus",
      projects: [
        {
          slug: "adott-enterprise-project-workflow",
          tag: "Enterprise workflow",
          title: "Adott Solution – Enterprise Workflow Platform",
          summary:
            "Complex inquiry, quote and project workflows in one system, with roles, review and approval stages, and traceable state changes.",
          role: "Independent architecture and full-stack development responsibility",
          highlights: [
            "Workflow and state management",
            "RBAC and approval",
            "Nested module–task–phase editing",
            "Company and contact data",
            "Notifications and issue reporting",
          ],
          mediaIds: ["adott-quote-structure", "adott-inquiry-roles"],
        },
        {
          slug: "alba-medence-3d-configurator",
          tag: "3D configurator",
          title: "Alba Medence – Interactive 3D Configurator",
          summary:
            "A browser-based 3D pool planner connecting size, layout and accessory choices to a responsive quote-request flow.",
          role: "Frontend, 3D interaction and responsive configuration UX",
          highlights: [
            "Real-time 3D rendering",
            "Configuration state management",
            "Desktop and mobile controls",
            "Performance and memory awareness",
            "Quote-request handoff",
          ],
          mediaIds: [
            "alba-configurator-desktop",
            "alba-configurator-mobile",
          ],
        },
        {
          slug: "sanjiwani-booking-experience",
          tag: "Booking UX",
          title: "Sanjiwani – Service Discovery & Booking Experience",
          summary:
            "Service discovery and appointment booking in a calm, brand-aligned interface with category, duration, therapist and time-slot selection.",
          role: "UI/UX, service catalogue and booking flow",
          highlights: [
            "Category and duration filters",
            "Search",
            "Therapist selection",
            "Date and time-slot handling",
            "Total and booking details",
          ],
          mediaIds: [
            "sanjiwani-booking-flow-desktop",
            "sanjiwani-home-desktop",
            "sanjiwani-services-desktop",
          ],
        },
      ],
    },
    samsungImpact: {
      metric: "+20%",
      title: "More accurate licence-plate verification workflow",
      description:
        "I contributed to a modernization project involving real-time gate-load analytics and improvements to the verification flow.",
      meta: "Samsung · React · Node.js · PHP · enterprise environment",
      action: "Anonymized case study",
      diagramLabel: "Gate load and verification signal",
    },
    profile: {
      title: "Experience from product interface to working system.",
      description:
        "Across enterprise workflows, independent products and client work, I look for the same thing: where a complex process can become clearer, more reliable and easier to ship.",
      experienceTitle: "Experience",
      capabilityTitle: "What I work with",
      labAction: "Technical detail in the Engineering Lab",
      experience: [
        {
          organization: "Bosch",
          location: "Hatvan",
          role: "Full-Stack Developer",
          period: "Early 2020s",
          description:
            "Internal enterprise applications with PHP and Laravel, REST APIs, SQL data models, secure foundations and agile teamwork.",
        },
        {
          organization: "Samsung",
          location: "Jászfényszaru",
          role: "Full-Stack Developer",
          period: "Approx. one-year enterprise role",
          description:
            "Modernizing existing PHP systems, React and Node.js integration, permissions, caching, log analysis and real-time analytics interfaces.",
        },
        {
          organization: "Adott Solution",
          role: "Full-Stack Developer / Project Ownership",
          period: "Later independent project",
          description:
            "Independent design and development of an enterprise project workflow across React, backend API, data model, RBAC, review and approval.",
        },
        {
          organization: "Independent products and Studio",
          role: "Product engineering",
          period: "Current focus",
          description:
            "Designing, building and evolving interactive web products, PWAs, UI systems and client websites.",
        },
      ],
      capabilities: [
        {
          title: "Product interface",
          items: [
            "React and Next.js",
            "Responsive, accessible UI",
            "Complex forms and state",
            "3D and data visualization",
          ],
        },
        {
          title: "Backend & workflow",
          items: [
            "Node.js and Laravel/PHP",
            "REST API and validation",
            "Authentication, RBAC, audit",
            "Integrations and business rules",
          ],
        },
        {
          title: "Data & reliability",
          items: [
            "SQL and data modelling",
            "Caching, migration, log analysis",
            "Error handling and monitoring",
            "Performance optimization",
          ],
        },
        {
          title: "Delivery",
          items: [
            "Git and PR workflow",
            "CI/CD and Preview deployment",
            "Unit, E2E and accessibility tests",
            "Documentation and review",
          ],
        },
      ],
    },
    labTeaser: {
      eyebrow: "ENGINEERING LAB",
      title: "The system does not end at the screen.",
      description:
        "Interactive examples for request validation, permissions, approval workflows and offline synchronization.",
      action: "Open the Lab",
      flows: [
        {
          label: "Request",
          nodes: ["Input", "Validate", "Authorize", "Persist"],
        },
        {
          label: "Approval",
          nodes: ["Identity", "Permission", "Decision", "Audit"],
        },
        {
          label: "Offline",
          nodes: ["Local state", "Outbox", "Sync", "Conflict"],
        },
      ],
    },
    studioBridge: {
      title: "Building a digital product or website?",
      description:
        "Digital Activision Studio helps plan and deliver business websites, UI systems and focused web applications.",
      action: "Studio services",
    },
    contact: {
      eyebrow: "CONTACT",
      title: "Let’s talk about the next system.",
      description:
        "Writing about a role, professional collaboration or Studio project? Share a little context and I’ll get back to you.",
      directEmailLabel: "digitalactivision@gmail.com",
      topicsLabel: "Topic",
      topicOptions: [
        {
          value: "career-engineering",
          label: "Career or engineering collaboration",
        },
        {
          value: "studio",
          label: "Studio, website or digital product",
        },
        { value: "other", label: "Other" },
      ],
      nameLabel: "Name",
      emailLabel: "Email address",
      topicLabel: "Topic",
      topicPlaceholder: "Choose a topic",
      messageLabel: "Message",
      messageDescription: "Share the context in at least 20 characters.",
      privacyConsentLabel:
        "I have read the privacy notice and consent to the handling of my message.",
      privacyLinkLabel: "Open the privacy notice",
      submitLabel: "Send message",
      submittingLabel: "Sending…",
      mailtoFallbackIntro: "If the form is unavailable, you can still email:",
      mailtoFallbackLabel: "Write an email",
      privacyNote: "Your details are used only to respond to your message.",
      botVerificationLabel: "Automated abuse protection",
      successMessage: "Thank you. Your message has been accepted.",
      genericErrorMessage:
        "Your message could not be sent right now. Try again later or use the email option.",
      rateLimitMessage:
        "There have been too many submission attempts. Wait a little, then try again or use email.",
      disabledMessage:
        "The contact form is currently unavailable in this environment. The email option still works.",
      requestIdLabel: "Request ID",
      errors: {
        name: "Enter a name with at least two characters.",
        email: "Enter a valid email address.",
        topic: "Choose a topic.",
        message: "The message must contain between 20 and 5000 characters.",
        privacy: "Accept the privacy condition before sending your message.",
      },
    },
  },
} satisfies Record<Locale, HomeContent>;
