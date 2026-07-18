import {
  caseStudyRegistrySchema,
  caseStudySectionIds,
  type CaseStudySectionId,
  type CaseStudySectionState,
  type LocalizedText,
} from "./schema";

const text = (hu: string, en: string): LocalizedText => ({ hu, en });

const section = (
  id: CaseStudySectionId,
  state: CaseStudySectionState,
  hu: string,
  en: string,
  evidenceIds: string[] = [],
  disclosureIds: string[] = [],
) => ({
  id,
  state,
  content: [text(hu, en)],
  evidenceIds,
  disclosureIds,
});

const samsungEvidenceId = "samsung-owner-specification";
const samsungDisclosures = {
  anonymization: "samsung-anonymization",
  confidentiality: "samsung-confidentiality",
  conceptual: "samsung-conceptual-diagram",
  scope: "samsung-scope-limitation",
  metric: "samsung-metric-attribution",
} as const;

const samsung = {
  slug: "samsung-smart-gate-analytics",
  status: "private-case-study",
  visibility: "anonymized",
  title: text(
    "Samsung – Smart Gate Analytics",
    "Samsung – Smart Gate Analytics",
  ),
  summary: text(
    "Anonimizált vállalati esettanulmány egy PHP-alapú folyamat React és Node.js irányú modernizációjáról, valamint valós idejű kaputerhelési analitikáról.",
    "An anonymized enterprise case study about modernizing a PHP-based workflow toward React and Node.js and providing real-time gate-load analytics.",
  ),
  role: text(
    "Részvétel a modernizációban; a pontos egyéni felelősségi kör nem publikus.",
    "Participation in the modernization; the exact individual scope is not public.",
  ),
  technologies: [
    { name: "React", state: "documented" },
    { name: "Node.js", state: "documented" },
    { name: "PHP", state: "documented" },
  ],
  responsibilities: [
    text(
      "Részvétel a meglévő PHP-alapú rendszer modernizálásában.",
      "Participated in modernizing the existing PHP-based system.",
    ),
  ],
  sections: [
    section(
      "summary",
      "documented",
      "Belső vállalati rendszer anonimizált bemutatása React, Node.js és meglévő PHP-környezet kontextusában.",
      "An anonymized account of an internal enterprise system in a React, Node.js, and existing PHP environment.",
      [samsungEvidenceId],
      [samsungDisclosures.anonymization],
    ),
    section(
      "context",
      "documented",
      "A cél a kapuforgalom hatékonyabb átirányítása és a helyszíni kamionmozgás gyorsítása volt valós idejű kaputerhelési nézettel.",
      "The goal was to redirect gate traffic more efficiently and speed up on-site truck movement with a real-time gate-load view.",
      [samsungEvidenceId],
      [samsungDisclosures.confidentiality],
    ),
    section(
      "ownership",
      "documented",
      "A modernizációban való részvétel igazolt. Az esettanulmány nem állít kizárólagos egyéni tulajdonlást, és a pontos scope nem publikus.",
      "Participation in the modernization is documented. This case study does not claim exclusive individual ownership, and the exact scope is not public.",
      [samsungEvidenceId],
      [samsungDisclosures.scope],
    ),
    section(
      "constraints",
      "documented",
      "A vállalati bizalmasság miatt valódi adatok, belső képernyőképek, forráskód, hálózati és érzékeny security részletek nem publikálhatók.",
      "Enterprise confidentiality prevents publishing real data, internal screenshots, source code, network details, or sensitive security information.",
      [samsungEvidenceId],
      [samsungDisclosures.confidentiality],
    ),
    section(
      "architecture",
      "documented",
      "A bemutatott architektúra csak a dokumentált PHP-, React-, Node.js- és analitikai határokat szemléltető koncepcionális rekonstrukció.",
      "The architecture shown is a conceptual reconstruction limited to the documented PHP, React, Node.js, and analytics boundaries.",
      [samsungEvidenceId],
      [samsungDisclosures.conceptual],
    ),
    section(
      "data-flow",
      "documented",
      "A publikus leírás csak a rendszám-ellenőrzési folyamat és a valós idejű kaputerhelési nézet közötti magas szintű kapcsolatot mutatja; vállalati adatot nem tartalmaz.",
      "The public account only shows the high-level relationship between the licence-plate verification workflow and the real-time gate-load view; it contains no enterprise data.",
      [samsungEvidenceId],
      [samsungDisclosures.conceptual],
    ),
    section(
      "frontend",
      "documented",
      "A modernizáció React környezetet és valós idejű analitikai nézetet érintett. A belső komponensstruktúra nem publikus.",
      "The modernization involved a React environment and a real-time analytics view. The internal component structure is not public.",
      [samsungEvidenceId],
      [samsungDisclosures.confidentiality],
    ),
    section(
      "backend-api",
      "documented",
      "A dokumentált környezet Node.js-t és egy meglévő PHP-alapú rendszert tartalmazott; endpointok és belső integrációk nem kerülnek bemutatásra.",
      "The documented environment included Node.js and an existing PHP-based system; endpoints and internal integrations are not presented.",
      [samsungEvidenceId],
      [samsungDisclosures.confidentiality],
    ),
    section(
      "security",
      "not-disclosed",
      "Az authentikációs, autorizációs, hálózati és egyéb security részletek bizalmassági okból nem publikusak.",
      "Authentication, authorization, network, and other security details are not public for confidentiality reasons.",
      [],
      [samsungDisclosures.confidentiality],
    ),
    section(
      "performance-reliability",
      "documented",
      "A rendszám-ellenőrzési folyamat pontossága 20%-kal javult. További performance- vagy reliability-mérőszám nem publikus.",
      "Licence-plate verification accuracy improved by 20%. No further performance or reliability metric is public.",
      [samsungEvidenceId],
      [samsungDisclosures.metric],
    ),
    section(
      "testing",
      "not-disclosed",
      "A belső tesztstratégia és tesztadatok nem publikusak.",
      "The internal testing strategy and test data are not public.",
      [],
      [samsungDisclosures.confidentiality],
    ),
    section(
      "deployment-monitoring",
      "not-disclosed",
      "A deployment-, infrastruktúra- és monitoring-részletek nem publikusak.",
      "Deployment, infrastructure, and monitoring details are not public.",
      [],
      [samsungDisclosures.confidentiality],
    ),
    section(
      "impact",
      "documented",
      "A projektgazda által megadott rendszereredmény 20%-os pontosságjavulás a rendszám-ellenőrzési folyamatban. Ez nem kizárólagos egyéni teljesítményként szerepel.",
      "The owner-provided system outcome is a 20% accuracy improvement in the licence-plate verification workflow. It is not presented as an exclusively individual achievement.",
      [samsungEvidenceId],
      [samsungDisclosures.metric],
    ),
    section(
      "tradeoffs",
      "not-disclosed",
      "A belső technikai döntések és trade-offok részletei nem publikusak.",
      "Details of internal technical decisions and trade-offs are not public.",
      [],
      [samsungDisclosures.confidentiality],
    ),
    section(
      "improvements",
      "not-yet-verified",
      "Utólagos fejlesztési javaslat csak további, publikálható projektgazdai információ alapján adható.",
      "A retrospective improvement proposal requires further owner-provided information that may be published.",
      [],
      [samsungDisclosures.scope],
    ),
    section(
      "related",
      "documented",
      "Kapcsolódó esettanulmányok: Adott Solution enterprise workflow és a QuestLog tervezett adatfolyamai.",
      "Related case studies: the Adott Solution enterprise workflow and QuestLog's planned data flows.",
      [samsungEvidenceId],
    ),
  ],
  architecture: {
    state: "conceptual",
    nodes: [
      { id: "php-workflow", label: text("Meglévő PHP-folyamat", "Existing PHP workflow") },
      { id: "react-view", label: text("React felület", "React interface") },
      { id: "node-boundary", label: text("Node.js határ", "Node.js boundary") },
      { id: "analytics-view", label: text("Valós idejű analitika", "Real-time analytics") },
    ],
    edges: [
      { from: "php-workflow", to: "node-boundary" },
      { from: "node-boundary", to: "react-view" },
      { from: "node-boundary", to: "analytics-view" },
    ],
    disclosureIds: [samsungDisclosures.conceptual],
  },
  results: [
    {
      id: "verification-accuracy",
      state: "documented",
      claim: text(
        "A rendszám-ellenőrzési folyamat pontossága 20%-kal javult.",
        "Licence-plate verification accuracy improved by 20%.",
      ),
      evidenceIds: [samsungEvidenceId],
      metric: {
        value: 20,
        unit: "percent",
        direction: "improvement",
        attribution: text(
          "Projektgazda által megadott rendszereredmény; nem kizárólagos egyéni teljesítmény.",
          "An owner-provided system outcome; not an exclusively individual achievement.",
        ),
      },
    },
  ],
  relatedSlugs: [
    "adott-enterprise-project-workflow",
    "questlog-offline-first-pwa",
  ],
  disclosures: [
    {
      id: samsungDisclosures.anonymization,
      kind: "anonymization",
      text: text(
        "Anonimizált esettanulmány: nem tartalmaz valódi vállalati adatot vagy belső képernyőképet.",
        "Anonymized case study: it contains no real enterprise data or internal screenshots.",
      ),
    },
    {
      id: samsungDisclosures.confidentiality,
      kind: "confidentiality",
      text: text(
        "Forráskód, belső topológia, endpointok és security részletek nem kerülnek publikálásra.",
        "Source code, internal topology, endpoints, and security details are not published.",
      ),
    },
    {
      id: samsungDisclosures.conceptual,
      kind: "conceptual-diagram",
      text: text(
        "Minden architektúra-ábra anonimizált, koncepcionális rekonstrukció.",
        "Every architecture diagram is an anonymized conceptual reconstruction.",
      ),
    },
    {
      id: samsungDisclosures.scope,
      kind: "verification",
      text: text(
        "A modernizációban való részvétel igazolt; a pontos egyéni scope nem publikus.",
        "Participation in the modernization is documented; the exact individual scope is not public.",
      ),
    },
    {
      id: samsungDisclosures.metric,
      kind: "metric-attribution",
      text: text(
        "A 20%-os mérőszám rendszereredmény, nem kizárólagos egyéni eredmény.",
        "The 20% metric is a system outcome, not an exclusively individual result.",
      ),
    },
  ],
  evidence: [
    {
      id: samsungEvidenceId,
      kind: "owner-confirmation",
      access: "private",
      verification: "verified",
      label: text(
        "A projektgazda által biztosított Portfolio V2 specifikáció",
        "The owner-provided Portfolio V2 specification",
      ),
      sectionIds: [...caseStudySectionIds],
    },
  ],
  links: [],
  media: [],
  seo: {
    title: text(
      "Samsung Smart Gate Analytics – anonimizált esettanulmány",
      "Samsung Smart Gate Analytics – anonymized case study",
    ),
    description: text(
      "Anonimizált engineering esettanulmány PHP-modernizációról, React és Node.js környezetről, valamint valós idejű kaputerhelési analitikáról.",
      "An anonymized engineering case study covering PHP modernization, a React and Node.js environment, and real-time gate-load analytics.",
    ),
  },
};

const adottEvidenceId = "adott-owner-specification";
const adottDisclosures = {
  anonymization: "adott-anonymization",
  confidentiality: "adott-confidentiality",
  conceptual: "adott-conceptual-diagram",
  verification: "adott-verification-limit",
} as const;

const adott = {
  slug: "adott-enterprise-project-workflow",
  status: "private-case-study",
  visibility: "anonymized",
  title: text(
    "Adott Solution – Enterprise Project Workflow",
    "Adott Solution – Enterprise Project Workflow",
  ),
  summary: text(
    "Anonimizált enterprise workflow az Inquiry → Spec → SoW → Quote/Order folyamat, a review, approval, RBAC és auditálás kezelésére.",
    "An anonymized enterprise workflow for Inquiry → Spec → SoW → Quote/Order, review, approval, RBAC, and auditing.",
  ),
  role: text(
    "Önálló architektúra- és projektfelelősség.",
    "Independent architecture and project ownership.",
  ),
  technologies: [
    { name: "React", state: "documented" },
    { name: "Backend/API", state: "documented" },
    { name: "Token authentication", state: "documented" },
    { name: "RBAC", state: "documented" },
    { name: "Audit logging", state: "documented" },
  ],
  responsibilities: [
    text(
      "Önálló architektúra- és projektfelelősség.",
      "Independent architecture and project ownership.",
    ),
  ],
  sections: [
    section(
      "summary",
      "documented",
      "Inquiry → Spec → SoW → Quote/Order workflow React frontenddel, backend/API kapcsolattal, tokenes authentikációval, RBAC-kal és auditálással.",
      "An Inquiry → Spec → SoW → Quote/Order workflow with a React frontend, backend/API connection, token authentication, RBAC, and auditing.",
      [adottEvidenceId],
      [adottDisclosures.anonymization],
    ),
    section(
      "context",
      "documented",
      "A folyamatnak mérnöki review-t, manager státuszt, guest customer review-t, approvalt és indoklással történő rejectet kellett kezelnie.",
      "The process needed to support engineering review, manager status, guest customer review, approval, and rejection with a reason.",
      [adottEvidenceId],
    ),
    section(
      "ownership",
      "documented",
      "A projektben az architektúra és a projekt felelőssége önálló volt.",
      "Architecture and project ownership were handled independently.",
      [adottEvidenceId],
    ),
    section(
      "constraints",
      "documented",
      "A modules → tasks → phases hierarchiának óraszámokat, több szerepkört, vendég review-t, approvalt és auditálhatóságot kellett támogatnia.",
      "The modules → tasks → phases hierarchy had to support hour estimates, multiple roles, guest review, approval, and auditability.",
      [adottEvidenceId],
      [adottDisclosures.confidentiality],
    ),
    section(
      "architecture",
      "documented",
      "A publikus modell a workflow, review, jogosultság és audit határait koncepcionálisan mutatja; belső topológiát nem állít.",
      "The public model conceptually presents workflow, review, permission, and audit boundaries; it does not claim to reproduce internal topology.",
      [adottEvidenceId],
      [adottDisclosures.conceptual],
    ),
    section(
      "data-flow",
      "documented",
      "A dokumentált folyamat Inquiry-ből Spec, majd SoW, végül Quote/Order állapotba halad; a review és approval események auditálhatók.",
      "The documented flow progresses from Inquiry to Spec, then SoW, and finally Quote/Order; review and approval events are auditable.",
      [adottEvidenceId],
      [adottDisclosures.conceptual],
    ),
    section(
      "frontend",
      "documented",
      "A React frontend engineer kommentet és approvalt támogat task- és modulszinten, továbbá manager és guest customer review nézeteket kapcsol a workflow-hoz.",
      "The React frontend supports engineer comments and approvals at task and module level and connects manager and guest-customer review views to the workflow.",
      [adottEvidenceId],
    ),
    section(
      "backend-api",
      "documented",
      "A React frontend backend/API határon keresztül kapcsolódik a workflow-, jogosultság- és auditfunkciókhoz. Konkrét endpointok nem publikusak.",
      "The React frontend connects to workflow, permission, and audit capabilities through a backend/API boundary. Specific endpoints are not public.",
      [adottEvidenceId],
      [adottDisclosures.confidentiality],
    ),
    section(
      "security",
      "documented",
      "A dokumentált security képességek tokenes authentikációt, szerepköralapú jogosultságot és auditálást tartalmaznak. Implementációs részletek nem publikusak.",
      "Documented security capabilities include token authentication, role-based authorization, and auditing. Implementation details are not public.",
      [adottEvidenceId],
      [adottDisclosures.confidentiality],
    ),
    section(
      "performance-reliability",
      "not-yet-verified",
      "Publikálható performance- vagy reliability-mérőszám nem áll rendelkezésre.",
      "No publishable performance or reliability metric is available.",
      [],
      [adottDisclosures.verification],
    ),
    section(
      "testing",
      "not-yet-verified",
      "A tesztstratégia részleteihez nem áll rendelkezésre publikálható bizonyíték.",
      "No publishable evidence is available for details of the testing strategy.",
      [],
      [adottDisclosures.verification],
    ),
    section(
      "deployment-monitoring",
      "not-disclosed",
      "A deployment-, infrastruktúra- és monitoring-részletek nem publikusak.",
      "Deployment, infrastructure, and monitoring details are not public.",
      [],
      [adottDisclosures.confidentiality],
    ),
    section(
      "impact",
      "documented",
      "A workflow képessége és az önálló architektúra- és projektfelelősség igazolt; publikus eredménymérőszám nem áll rendelkezésre.",
      "The workflow capability and independent architecture and project ownership are documented; no public outcome metric is available.",
      [adottEvidenceId],
      [adottDisclosures.verification],
    ),
    section(
      "tradeoffs",
      "not-yet-verified",
      "A konkrét implementációs trade-offok publikálásához további igazolt információ szükséges.",
      "Publishing concrete implementation trade-offs requires further verified information.",
      [],
      [adottDisclosures.verification],
    ),
    section(
      "improvements",
      "not-yet-verified",
      "Mai fejlesztési javaslat csak a jelenlegi állapot és korlátok további igazolása után adható.",
      "A present-day improvement proposal requires further verification of the current state and constraints.",
      [],
      [adottDisclosures.verification],
    ),
    section(
      "related",
      "documented",
      "Kapcsolódó esettanulmányok: Samsung Smart Gate Analytics és a QuestLog tervezett state- és jogosultsági határai.",
      "Related case studies: Samsung Smart Gate Analytics and QuestLog's planned state and permission boundaries.",
      [adottEvidenceId],
    ),
  ],
  architecture: {
    state: "conceptual",
    nodes: [
      { id: "inquiry", label: text("Inquiry", "Inquiry") },
      { id: "spec", label: text("Spec", "Spec") },
      { id: "sow", label: text("SoW", "SoW") },
      { id: "quote-order", label: text("Quote / Order", "Quote / Order") },
      { id: "review", label: text("Szerepköralapú review", "Role-based review") },
      { id: "audit", label: text("Audit események", "Audit events") },
    ],
    edges: [
      { from: "inquiry", to: "spec" },
      { from: "spec", to: "sow" },
      { from: "sow", to: "quote-order" },
      { from: "review", to: "spec" },
      { from: "review", to: "sow" },
      { from: "review", to: "quote-order" },
      { from: "review", to: "audit" },
    ],
    disclosureIds: [adottDisclosures.conceptual],
  },
  results: [
    {
      id: "workflow-capability",
      state: "documented",
      claim: text(
        "Az enterprise workflow és az önálló architektúra- és projektfelelősség igazolt; publikus numerikus eredmény nem áll rendelkezésre.",
        "The enterprise workflow and independent architecture and project ownership are documented; no public numeric outcome is available.",
      ),
      evidenceIds: [adottEvidenceId],
    },
  ],
  relatedSlugs: [
    "samsung-smart-gate-analytics",
    "questlog-offline-first-pwa",
  ],
  disclosures: [
    {
      id: adottDisclosures.anonymization,
      kind: "anonymization",
      text: text(
        "Anonimizált esettanulmány: valódi ügyféladat, belső képernyőkép és forráskód nélkül.",
        "An anonymized case study without real customer data, internal screenshots, or source code.",
      ),
    },
    {
      id: adottDisclosures.confidentiality,
      kind: "confidentiality",
      text: text(
        "Belső endpointok, topológia, security és deployment részletek nem kerülnek publikálásra.",
        "Internal endpoints, topology, security, and deployment details are not published.",
      ),
    },
    {
      id: adottDisclosures.conceptual,
      kind: "conceptual-diagram",
      text: text(
        "A workflow- és architektúra-ábrák anonimizált, koncepcionális rekonstrukciók.",
        "Workflow and architecture diagrams are anonymized conceptual reconstructions.",
      ),
    },
    {
      id: adottDisclosures.verification,
      kind: "verification",
      text: text(
        "Ahol nincs publikálható bizonyíték, az oldal ezt kifejezetten jelöli, és nem egészíti ki feltételezéssel.",
        "Where no publishable evidence exists, the page says so explicitly and does not fill the gap with assumptions.",
      ),
    },
  ],
  evidence: [
    {
      id: adottEvidenceId,
      kind: "owner-confirmation",
      access: "private",
      verification: "verified",
      label: text(
        "A projektgazda által biztosított Portfolio V2 specifikáció",
        "The owner-provided Portfolio V2 specification",
      ),
      sectionIds: [...caseStudySectionIds],
    },
  ],
  links: [],
  media: [],
  seo: {
    title: text(
      "Adott Solution Enterprise Workflow – anonimizált esettanulmány",
      "Adott Solution Enterprise Workflow – anonymized case study",
    ),
    description: text(
      "Anonimizált engineering esettanulmány enterprise workflow-ról, React frontendről, RBAC-ról és auditálásról.",
      "An anonymized engineering case study covering an enterprise workflow, React frontend, RBAC, and auditing.",
    ),
  },
};

const albaDisclosures = {
  verification: "alba-verification-limit",
  status: "alba-reference-status",
} as const;

const alba = {
  slug: "alba-medence-3d-configurator",
  status: "demo",
  visibility: "public",
  title: text(
    "Alba Medence – Interactive 3D Configurator",
    "Alba Medence – Interactive 3D Configurator",
  ),
  summary: text(
    "A publikus portfólió-repository egy Alba Medence 3D tervezőként megnevezett projektkártyát, képernyőképet és külső hivatkozást tartalmaz. A technikai implementáció még nincs igazolva.",
    "The public portfolio repository contains a project card named Alba Pool 3D configurator, a screenshot, and an external reference. The technical implementation has not yet been verified.",
  ),
  role: text(
    "Az egyéni szerepkör a jelenlegi publikus bizonyítékból nem igazolható.",
    "The individual role cannot be verified from the currently public evidence.",
  ),
  technologies: [
    { name: "3D technology", state: "not-yet-verified" },
  ],
  responsibilities: [],
  sections: [
    section(
      "summary",
      "documented",
      "A repositoryban megtalálható projektkártya, publikus képernyőkép és külső link alapján a projekt Alba Medence 3D tervezőként szerepel. Ez nem igazolja a technikai architektúrát vagy a production státuszt.",
      "A repository project card, public screenshot, and external link identify the project as an Alba Pool 3D configurator. This does not verify its technical architecture or production status.",
      ["alba-portfolio-repository", "alba-public-screenshot"],
      [albaDisclosures.verification],
    ),
    section(
      "context",
      "not-yet-verified",
      "A külső hivatkozás rendelkezésre áll, de az üzleti cél és a jelenlegi elérhetőség még külön ellenőrzést igényel.",
      "An external reference is available, but the business goal and current availability still require separate verification.",
      ["alba-public-reference"],
      [albaDisclosures.status],
    ),
    section(
      "ownership",
      "not-yet-verified",
      "Az egyéni szerepkör és felelősségi kör nem igazolható a jelenlegi publikus anyagokból.",
      "The individual role and scope cannot be verified from the current public material.",
      [],
      [albaDisclosures.verification],
    ),
    section(
      "constraints",
      "not-yet-verified",
      "A mobil fallback, asset loading, UX-, SEO- és üzleti korlátok vizsgálata még nem történt meg igazolható forrásból.",
      "Mobile fallback, asset loading, UX, SEO, and business constraints have not yet been verified from a source.",
      [],
      [albaDisclosures.verification],
    ),
    section(
      "architecture",
      "not-yet-verified",
      "A 3D technológia és a rendszerarchitektúra a jelenlegi bizonyítékból nem azonosítható.",
      "The 3D technology and system architecture cannot be identified from the current evidence.",
      [],
      [albaDisclosures.verification],
    ),
    section(
      "data-flow",
      "not-yet-verified",
      "A konfigurációs állapotmodell és adatfolyam még nincs igazolva.",
      "The configuration state model and data flow have not yet been verified.",
      [],
      [albaDisclosures.verification],
    ),
    section(
      "frontend",
      "not-yet-verified",
      "A publikus screenshot vizuális referenciát ad, de a frontend struktúrát és technológiát nem igazolja.",
      "The public screenshot provides a visual reference but does not verify the frontend structure or technology.",
      ["alba-public-screenshot"],
      [albaDisclosures.verification],
    ),
    section(
      "backend-api",
      "not-yet-verified",
      "Backend- vagy API-megvalósításról nincs igazolt publikus adat.",
      "No verified public information is available about a backend or API implementation.",
      [],
      [albaDisclosures.verification],
    ),
    section(
      "security",
      "not-yet-verified",
      "Authentikációs, autorizációs vagy egyéb security megoldás nem igazolható a jelenlegi forrásokból.",
      "Authentication, authorization, or other security measures cannot be verified from the current sources.",
      [],
      [albaDisclosures.verification],
    ),
    section(
      "performance-reliability",
      "not-yet-verified",
      "Az asset loading, mobil fallback, performance és reliability még mérésre és forrásellenőrzésre vár.",
      "Asset loading, mobile fallback, performance, and reliability still require measurement and source verification.",
      [],
      [albaDisclosures.verification],
    ),
    section(
      "testing",
      "not-yet-verified",
      "Tesztstratégia vagy publikus teszteredmény nem áll rendelkezésre.",
      "No testing strategy or public test result is available.",
      [],
      [albaDisclosures.verification],
    ),
    section(
      "deployment-monitoring",
      "not-yet-verified",
      "A külső URL nem tekinthető igazolt live vagy production állításnak; deployment- és monitoring-adat nincs.",
      "The external URL is not treated as a verified live or production claim; deployment and monitoring information is unavailable.",
      ["alba-public-reference"],
      [albaDisclosures.status],
    ),
    section(
      "impact",
      "not-yet-verified",
      "Publikálható üzleti vagy felhasználói eredménymérőszám nem áll rendelkezésre.",
      "No publishable business or user outcome metric is available.",
      [],
      [albaDisclosures.verification],
    ),
    section(
      "tradeoffs",
      "not-yet-verified",
      "Technikai trade-off csak a technológia, állapotmodell és mobil fallback igazolása után dokumentálható.",
      "Technical trade-offs can only be documented after verifying the technology, state model, and mobile fallback.",
      [],
      [albaDisclosures.verification],
    ),
    section(
      "improvements",
      "not-yet-verified",
      "Fejlesztési javaslat előtt repository- vagy projektgazdai technikai bizonyíték és performance audit szükséges.",
      "Repository or owner-provided technical evidence and a performance audit are required before proposing improvements.",
      [],
      [albaDisclosures.verification],
    ),
    section(
      "related",
      "documented",
      "Kapcsolódó esettanulmány: a QuestLog nyíltan tervezett kliensoldali állapot- és offline megközelítése.",
      "Related case study: QuestLog's explicitly planned client-side state and offline approach.",
      ["alba-portfolio-repository"],
    ),
  ],
  architecture: {
    state: "not-yet-verified",
    nodes: [],
    edges: [],
    disclosureIds: [albaDisclosures.verification],
  },
  results: [
    {
      id: "alba-outcome-unverified",
      state: "not-yet-verified",
      claim: text(
        "Az eredmény és hatás a jelenlegi publikus bizonyítékból nem igazolható.",
        "The result and impact cannot be verified from the current public evidence.",
      ),
      evidenceIds: [],
    },
  ],
  relatedSlugs: ["questlog-offline-first-pwa"],
  disclosures: [
    {
      id: albaDisclosures.verification,
      kind: "verification",
      text: text(
        "Csak a publikus repository, képernyőkép és link tekinthető bizonyítéknak; technikai részlet nem kerül kikövetkeztetésre.",
        "Only the public repository, screenshot, and link are treated as evidence; no technical detail is inferred.",
      ),
    },
    {
      id: albaDisclosures.status,
      kind: "status",
      text: text(
        "A külső link elérhetősége nincs igazolva, ezért az oldal nem használ live vagy production állítást.",
        "The external link's availability is not verified, so the page makes no live or production claim.",
      ),
    },
  ],
  evidence: [
    {
      id: "alba-portfolio-repository",
      kind: "public-repository",
      access: "public",
      verification: "verified",
      label: text(
        "A Digital Activision publikus repository Alba projektkártyája",
        "The Alba project card in the public Digital Activision repository",
      ),
      href: "https://github.com/Anyon-Aida/digital-activision",
      sectionIds: ["summary", "related"],
    },
    {
      id: "alba-public-screenshot",
      kind: "public-screenshot",
      access: "public",
      verification: "verified",
      label: text(
        "A repositoryban tárolt publikus Alba projektkép",
        "The public Alba project image stored in the repository",
      ),
      href: "/projects/alba_pool.png",
      sectionIds: ["summary", "frontend"],
    },
    {
      id: "alba-public-reference",
      kind: "public-link",
      access: "public",
      verification: "not-yet-verified",
      label: text(
        "A meglévő projektkártyán szereplő külső hivatkozás",
        "The external reference present on the existing project card",
      ),
      href: "https://albamedence.hu/",
      sectionIds: ["context", "deployment-monitoring"],
    },
  ],
  links: [
    {
      kind: "reference",
      href: "https://albamedence.hu/",
      label: text(
        "Külső referencia – elérhetőség ellenőrzésre vár",
        "External reference – availability not yet verified",
      ),
      verification: "not-yet-verified",
    },
  ],
  media: [
    {
      id: "alba-pool-public-image",
      kind: "screenshot",
      representation: "public-project-screenshot",
      source: "/projects/alba_pool.png",
      alt: text(
        "Az Alba Medence projekthez a publikus repositoryban tárolt képernyőkép",
        "Screenshot stored in the public repository for the Alba Pool project",
      ),
      evidenceId: "alba-public-screenshot",
      disclosureIds: [albaDisclosures.verification],
    },
  ],
  seo: {
    title: text(
      "Alba Medence 3D Configurator – igazolás alatt",
      "Alba Pool 3D Configurator – verification in progress",
    ),
    description: text(
      "Publikus repository-, képernyőkép- és linkalapú projektbemutató; a technikai architektúra és a live státusz még nincs igazolva.",
      "A project account based on a public repository, screenshot, and link; the technical architecture and live status are not yet verified.",
    ),
  },
};

const questlogEvidenceId = "questlog-owner-specification";
const questlogDisclosures = {
  status: "questlog-in-progress-status",
  verification: "questlog-verification-limit",
} as const;

const questlog = {
  slug: "questlog-offline-first-pwa",
  status: "in-progress",
  visibility: "public",
  title: text(
    "QuestLog – Offline-First PWA",
    "QuestLog – Offline-First PWA",
  ),
  summary: text(
    "Fejlesztés alatt álló termékirány napi küldetésekkel, XP- és szintrendszerrel, localStorage-alapú kezdeti állapottal, PWA telepíthetőséggel és offline fallbackkel.",
    "An in-progress product direction with daily quests, XP and levels, an initial localStorage-based state, PWA installability, and offline fallback.",
  ),
  role: text(
    "A projekt státusza in progress; a megvalósított egyéni scope bizonyítékkal együtt kerül majd dokumentálásra.",
    "The project is in progress; implemented individual scope will be documented together with evidence.",
  ),
  technologies: [
    { name: "PWA", state: "planned" },
    { name: "localStorage", state: "planned" },
    { name: "Offline fallback", state: "planned" },
  ],
  responsibilities: [],
  sections: [
    section(
      "summary",
      "documented",
      "A projekt igazoltan tervezett, in-progress termékirány; nem kész production rendszer és nincs live linkje.",
      "The project is a documented planned, in-progress product direction; it is not a finished production system and has no live link.",
      [questlogEvidenceId],
      [questlogDisclosures.status],
    ),
    section(
      "context",
      "documented",
      "A kezdeti terv napi küldetéskezelést, XP- és szintrendszert, installálhatóságot és offline használati irányt fogalmaz meg.",
      "The initial plan defines daily quest management, XP and levels, installability, and an offline-use direction.",
      [questlogEvidenceId],
      [questlogDisclosures.status],
    ),
    section(
      "ownership",
      "not-yet-verified",
      "A megvalósított egyéni felelősségi kör még nem igazolható, mert a projekt roadmap státuszban van.",
      "Implemented individual ownership cannot yet be verified because the project is at roadmap status.",
      [],
      [questlogDisclosures.verification],
    ),
    section(
      "constraints",
      "planned",
      "A tervezett irány installálható PWA-t, offline fallbacket és kezdeti localStorage állapotot ír le; a teljes backend nem release-blokkoló.",
      "The planned direction calls for an installable PWA, offline fallback, and initial localStorage state; a full backend is not a release blocker.",
      [questlogEvidenceId],
      [questlogDisclosures.status],
    ),
    section(
      "architecture",
      "planned",
      "A kezdeti koncepció kliensoldali PWA- és localStorage-határokat tartalmaz. A hosszabb távú backend és szinkronizáció csak roadmap.",
      "The initial concept includes client-side PWA and localStorage boundaries. The longer-term backend and synchronization remain roadmap items.",
      [questlogEvidenceId],
      [questlogDisclosures.status],
    ),
    section(
      "data-flow",
      "planned",
      "A napi küldetések, XP és szintek kezdeti kliensoldali állapotként vannak tervezve; conflict-aware szinkronizáció csak hosszabb távú terv.",
      "Daily quests, XP, and levels are planned as initial client-side state; conflict-aware synchronization is only a longer-term plan.",
      [questlogEvidenceId],
      [questlogDisclosures.status],
    ),
    section(
      "frontend",
      "planned",
      "A frontend terv napi küldetéskezelést, XP- és szintvisszajelzést, PWA installálhatóságot és offline fallbacket tartalmaz.",
      "The frontend plan includes daily quest management, XP and level feedback, PWA installability, and offline fallback.",
      [questlogEvidenceId],
      [questlogDisclosures.status],
    ),
    section(
      "backend-api",
      "planned",
      "User account, PostgreSQL/Supabase vagy saját backend, valamint szinkronizáció csak a hosszabb távú full-stack roadmap része.",
      "User accounts, PostgreSQL/Supabase or a custom backend, and synchronization are only part of the longer-term full-stack roadmap.",
      [questlogEvidenceId],
      [questlogDisclosures.status],
    ),
    section(
      "security",
      "planned",
      "A user account és szerveroldali jogosultság csak jövőbeli full-stack fázisban értelmezhető; kész implementáció nincs állítva.",
      "User accounts and server-side authorization only apply to a future full-stack phase; no finished implementation is claimed.",
      [questlogEvidenceId],
      [questlogDisclosures.status],
    ),
    section(
      "performance-reliability",
      "planned",
      "Offline-first local database, conflict-aware synchronization és background sync hosszabb távú terv; mérési eredmény még nincs.",
      "An offline-first local database, conflict-aware synchronization, and background sync are longer-term plans; no measurement result exists yet.",
      [questlogEvidenceId],
      [questlogDisclosures.status],
    ),
    section(
      "testing",
      "planned",
      "A tesztek a hosszabb távú full-stack terv részei; kész tesztkészlet vagy teszteredmény nincs állítva.",
      "Tests are part of the longer-term full-stack plan; no finished suite or test result is claimed.",
      [questlogEvidenceId],
      [questlogDisclosures.status],
    ),
    section(
      "deployment-monitoring",
      "planned",
      "Installálható PWA és későbbi CI/CD szerepel a tervben; live deployment és monitoring jelenleg nincs állítva.",
      "An installable PWA and later CI/CD are planned; no live deployment or monitoring is currently claimed.",
      [questlogEvidenceId],
      [questlogDisclosures.status],
    ),
    section(
      "impact",
      "not-yet-verified",
      "A projekt in progress, ezért felhasználói vagy üzleti eredmény még nem igazolható.",
      "The project is in progress, so no user or business outcome can yet be verified.",
      [],
      [questlogDisclosures.verification],
    ),
    section(
      "tradeoffs",
      "planned",
      "A kezdeti localStorage-megközelítés gyors kliensoldali iterációt céloz; a tartós, többeszközös szinkronizáció a későbbi full-stack fázis feladata.",
      "The initial localStorage approach targets fast client-side iteration; durable multi-device synchronization belongs to a later full-stack phase.",
      [questlogEvidenceId],
      [questlogDisclosures.status],
    ),
    section(
      "improvements",
      "planned",
      "A roadmap user accountot, tartós adatbázist, conflict-aware szinkronizációt, background syncet, streaket, achievementet, statisztikát, teszteket és CI/CD-t sorol fel.",
      "The roadmap lists user accounts, a durable database, conflict-aware synchronization, background sync, streaks, achievements, statistics, tests, and CI/CD.",
      [questlogEvidenceId],
      [questlogDisclosures.status],
    ),
    section(
      "related",
      "documented",
      "Kapcsolódó esettanulmányok: az Alba konfigurációs állapotának még ellenőrzendő kérdései és az Adott Solution dokumentált workflow-ja.",
      "Related case studies: the still-unverified configuration-state questions in Alba and the documented Adott Solution workflow.",
      [questlogEvidenceId],
    ),
  ],
  architecture: {
    state: "planned",
    nodes: [
      { id: "pwa-interface", label: text("Tervezett PWA felület", "Planned PWA interface") },
      { id: "quest-state", label: text("Küldetés-, XP- és szintállapot", "Quest, XP, and level state") },
      { id: "local-storage", label: text("Tervezett localStorage", "Planned localStorage") },
      { id: "offline-fallback", label: text("Tervezett offline fallback", "Planned offline fallback") },
    ],
    edges: [
      { from: "pwa-interface", to: "quest-state" },
      { from: "quest-state", to: "local-storage" },
      { from: "pwa-interface", to: "offline-fallback" },
    ],
    disclosureIds: [questlogDisclosures.status],
  },
  results: [
    {
      id: "questlog-roadmap",
      state: "planned",
      claim: text(
        "A release-ben őszinte in-progress roadmap szerepel; kész production eredmény nem kerül állításra.",
        "The release presents an honest in-progress roadmap; it makes no claim of a finished production outcome.",
      ),
      evidenceIds: [questlogEvidenceId],
    },
  ],
  relatedSlugs: [
    "alba-medence-3d-configurator",
    "adott-enterprise-project-workflow",
  ],
  disclosures: [
    {
      id: questlogDisclosures.status,
      kind: "status",
      text: text(
        "In-progress roadmap: a felsorolt képességek tervek, nem kész production funkciók.",
        "In-progress roadmap: the listed capabilities are plans, not finished production features.",
      ),
    },
    {
      id: questlogDisclosures.verification,
      kind: "verification",
      text: text(
        "Live link, elkészült backend és igazolt eredménymérőszám jelenleg nem áll rendelkezésre.",
        "No live link, finished backend, or verified outcome metric is currently available.",
      ),
    },
  ],
  evidence: [
    {
      id: questlogEvidenceId,
      kind: "specification",
      access: "private",
      verification: "verified",
      label: text(
        "A projektgazda által biztosított Portfolio V2 roadmap-specifikáció",
        "The owner-provided Portfolio V2 roadmap specification",
      ),
      sectionIds: [...caseStudySectionIds],
    },
  ],
  links: [],
  media: [],
  seo: {
    title: text(
      "QuestLog Offline-First PWA – in-progress roadmap",
      "QuestLog Offline-First PWA – in-progress roadmap",
    ),
    description: text(
      "Őszinte in-progress projektbemutató napi küldetésekről, XP-ről, PWA- és offline-first tervekről, kész backend vagy live állítás nélkül.",
      "An honest in-progress project account covering daily quests, XP, and PWA and offline-first plans, without claiming a finished backend or live deployment.",
    ),
  },
};

const rawCaseStudies = [samsung, adott, alba, questlog];

export const caseStudies = caseStudyRegistrySchema.parse(rawCaseStudies);
