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
  presentation: {
    featuredMedia: ["samsung-gate-flow"],
    heroVariant: "data",
    homepageSummary: text(
      "Valós idejű kaputerhelési analitika és egy pontosabb rendszám-ellenőrzési folyamat vállalati modernizációs környezetben.",
      "Real-time gate-load analytics and a more accurate licence-plate verification workflow in an enterprise modernization context.",
    ),
    roleSummary: text(
      "Közreműködés a PHP-rendszer React és Node.js irányú modernizációjában",
      "Contributed to modernizing a PHP system toward React and Node.js",
    ),
    storySections: [
      {
        id: "context",
        title: text("Kapuforgalom és ellenőrzés", "Gate traffic and verification"),
        paragraphs: [
          text(
            "A belső rendszer a helyszíni kapuforgalom és a rendszám-ellenőrzés támogatására szolgált. A cél az volt, hogy a terhelés és az ellenőrzési folyamat állapota gyorsabban áttekinthető legyen.",
            "The internal system supported on-site gate traffic and licence-plate verification. The goal was to make gate load and the state of the verification flow easier to understand.",
          ),
        ],
        mediaIds: [],
      },
      {
        id: "modernization",
        title: text("Fokozatos modernizáció", "Incremental modernization"),
        paragraphs: [
          text(
            "A meglévő PHP-környezet modernizációja React felületeket és Node.js rendszerhatárokat kapcsolt a működő vállalati folyamathoz.",
            "The existing PHP environment was modernized by connecting React interfaces and Node.js boundaries to the operating enterprise workflow.",
          ),
        ],
        mediaIds: [],
      },
      {
        id: "live-analytics",
        title: text("Valós idejű terhelési nézet", "Real-time load analytics"),
        paragraphs: [
          text(
            "A kaputerhelési analitika a forgalmi állapotot egy gyorsan olvasható működési jelként kezelte. Az absztrakt gate-flow ábra a rendszám-ellenőrzés, a kaputerhelés és a működési visszajelzés kapcsolatát mutatja.",
            "Gate-load analytics treated traffic state as a quickly readable operational signal. The abstract gate-flow diagram connects licence-plate verification, gate load and operational feedback.",
          ),
        ],
        mediaIds: [],
      },
      {
        id: "impact",
        title: text("Mérhető rendszerhatás", "Measured system impact"),
        paragraphs: [
          text(
            "A modernizált rendszám-ellenőrzési folyamat 20%-os pontosságjavulást ért el. Ez a vállalati modernizáció közös rendszereredménye, nem kizárólagos egyéni teljesítmény.",
            "The modernized licence-plate verification workflow achieved a 20% accuracy improvement. This is a shared outcome of the enterprise modernization, not an exclusively individual achievement.",
          ),
        ],
        mediaIds: [],
      },
      {
        id: "learning",
        title: text("Vállalati megbízhatóság", "Enterprise reliability"),
        paragraphs: [
          text(
            "A munka a fokozatos modernizáció, a logelemzés, a valós idejű visszajelzés és az üzemi megbízhatóság kapcsolatát tette kézzelfoghatóvá.",
            "The work made the relationship between incremental modernization, log analysis, real-time feedback and operational reliability tangible.",
          ),
        ],
        mediaIds: [],
      },
    ],
  },
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
    "Adott Solution – Enterprise Workflow Platform",
    "Adott Solution – Enterprise Workflow Platform",
  ),
  summary: text(
    "Egy összetett vállalati rendszer, amely inquiry-, specifikációs, ajánlati és projektfolyamatokat kapcsol össze szerepkörökkel, review- és approval-lépésekkel.",
    "A complex enterprise system connecting inquiry, specification, quote and project workflows with roles, review and approval steps.",
  ),
  role: text(
    "A rendszer architektúráján, frontend és backend összekapcsolásán, adatmodelljén, jogosultsági logikáján és több kulcsfontosságú workflow felületén dolgoztam, jelentős önálló projektfelelősséggel.",
    "I worked on the system architecture, frontend and backend integration, data model, permission logic and several key workflow interfaces, with substantial independent project ownership.",
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
  presentation: {
    featuredMedia: [
      "adott-quote-structure",
      "adott-inquiry-roles",
      "adott-company-detail",
    ],
    heroVariant: "workflow",
    homepageSummary: text(
      "Összetett inquiry-, ajánlat- és projektfolyamatok egy közös rendszerben, szerepkörökkel, review- és approval-lépésekkel, auditálható állapotváltozásokkal.",
      "Complex inquiry, quote and project workflows in one system, with roles, review and approval steps, and auditable state changes.",
    ),
    roleSummary: text(
      "Önálló architekturális és full-stack fejlesztési felelősség",
      "Independent architectural and full-stack development ownership",
    ),
    storySections: [
      {
        id: "problem",
        title: text("A probléma", "The challenge"),
        paragraphs: [
          text(
            "A rendszernek több üzleti állapotot és szerepkört kellett egyetlen folyamattá szerveznie: az inquiry beérkezésétől a review-n és specifikáción át az ajánlatig és a projektátadásig.",
            "The system had to organize multiple business states and roles into one flow: from incoming inquiry through review and specification to quoting and project delivery.",
          ),
          text(
            "A modulok, taskok és phase-ek hierarchiája, a vendég és belső felhasználók, valamint az értesítések és auditálható változások egyszerre jelentettek információs és interakciós kihívást.",
            "The hierarchy of modules, tasks and phases, guest and internal users, notifications and auditable changes created both information and interaction challenges.",
          ),
        ],
        mediaIds: ["adott-inquiry-status-and-details"],
      },
      {
        id: "workflow-architecture",
        title: text(
          "Információs és workflow architektúra",
          "Information and workflow architecture",
        ),
        paragraphs: [
          text(
            "Az alapfolyam az Inquiry → Specification → Quote / SoW → Project delivery lépéseket köti össze. A szerepkörök, kommentek, csatolmányok, értesítések és audit események végigkísérik az állapotváltásokat.",
            "The core flow connects Inquiry → Specification → Quote / SoW → Project delivery. Roles, comments, attachments, notifications and audit events accompany each state transition.",
          ),
        ],
        mediaIds: ["adott-workflow", "adott-inquiry-roles"],
      },
      {
        id: "editing-experience",
        title: text("Összetett szerkesztési UX", "Complex editing experience"),
        paragraphs: [
          text(
            "A beágyazott modul–task–phase struktúrában óraszámok, tulajdonosok és részletes mezők szerkeszthetők. Az expand/collapse és a világos hierarchia nagy adatszerkezet mellett is kezelhetővé teszi a munkát.",
            "The nested module–task–phase structure supports effort estimates, owners and detailed fields. Expand/collapse behavior and clear hierarchy keep large structures manageable.",
          ),
        ],
        mediaIds: ["adott-quote-structure", "adott-quote-editor"],
      },
      {
        id: "permissions-and-companies",
        title: text(
          "Jogosultság és vállalati adatok",
          "Permissions and company data",
        ),
        paragraphs: [
          text(
            "A viewer, writer és approver felelősségek elkülönülnek, miközben a company/contact master-detail nézetek és adminisztrációs űrlapok ugyanahhoz az üzleti folyamathoz kapcsolódnak.",
            "Viewer, writer and approver responsibilities remain distinct, while company/contact master-detail views and administrative forms connect to the same business workflow.",
          ),
        ],
        mediaIds: [
          "adott-inquiry-roles",
          "adott-company-detail",
          "adott-company-create",
        ],
      },
      {
        id: "feedback-and-operation",
        title: text("Visszajelzés és működés", "Feedback and operation"),
        paragraphs: [
          text(
            "A státuszváltozásokhoz értesítések, a fejlesztési visszacsatoláshoz pedig egyszerű hibajegy- és feature-bejelentési felületek kapcsolódnak.",
            "Status changes connect to notifications, while a focused bug and feature reporting flow supports development feedback.",
          ),
        ],
        mediaIds: [
          "adott-notifications",
          "adott-bug-report",
          "adott-bug-report-list",
        ],
      },
      {
        id: "what-it-demonstrates",
        title: text("Mit bizonyít a projekt?", "What the project demonstrates"),
        paragraphs: [
          text(
            "A projekt enterprise UI-tervezést, összetett üzleti logikát, RBAC-ot, React–API integrációt, SQL-adatmodellezést és önálló full-stack felelősséget kapcsol össze.",
            "The project connects enterprise interface design, complex business logic, RBAC, React–API integration, SQL data modelling and independent full-stack ownership.",
          ),
        ],
        mediaIds: [],
      },
    ],
  },
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
        "A képernyők tesztadatokat mutatnak. A bemutatás a felhasználói utakra és a rendszer összetettségére koncentrál; nem teljes termékdokumentáció.",
        "The screens show test data. This presentation focuses on user flows and system complexity; it is not complete product documentation.",
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
    "Egy böngészőben futó 3D konfigurátor, amely a medence kialakítását, kiegészítőit és ajánlatkérését egy reszponzív felhasználói folyamatba szervezi.",
    "A browser-based 3D configurator that organizes pool design, accessories and quote requests into one responsive user flow.",
  ),
  role: text(
    "Frontend, 3D interakció és reszponzív konfigurációs UX.",
    "Frontend, 3D interaction and responsive configuration UX.",
  ),
  technologies: [
    { name: "WebGL / 3D", state: "documented" },
    { name: "Responsive UI", state: "documented" },
    { name: "State management", state: "documented" },
  ],
  responsibilities: [
    text(
      "A 3D nézet és a konfigurációs kezelőfelület reszponzív összekapcsolása.",
      "Connected the 3D view with a responsive configuration interface.",
    ),
  ],
  presentation: {
    featuredMedia: [
      "alba-configurator-desktop",
      "alba-configurator-mobile",
      "alba-website-3d-entry",
    ],
    heroVariant: "3d",
    homepageSummary: text(
      "Böngészőben futó 3D medencetervező, amely méret-, kialakítás- és kiegészítőválasztást kapcsol össze reszponzív ajánlatkérési folyamattal.",
      "A browser-based 3D pool planner connecting size, layout and accessory choices with a responsive quote-request flow.",
    ),
    roleSummary: text(
      "Frontend, 3D interakció és reszponzív konfigurációs UX",
      "Frontend, 3D interaction and responsive configuration UX",
    ),
    storySections: [
      {
        id: "business-context",
        title: text("Üzleti kontextus", "Business context"),
        paragraphs: [
          text(
            "A weboldal a látogatót egy 3D medencetervezőbe vezeti. A konfiguráció nem önálló vizuális demo: a választásokat egy ajánlatkérési folyamat felé rendezi.",
            "The website leads visitors into a 3D pool planner. The configurator is not a standalone visual demo: it organizes choices toward a quote request.",
          ),
        ],
        mediaIds: ["alba-website-3d-entry"],
      },
      {
        id: "three-d-interaction",
        title: text("3D interakció", "3D interaction"),
        paragraphs: [
          text(
            "A medencemodell, a víz, a burkolat és a kiegészítők állapota együtt változik a kezelőfelülettel. A UI és a 3D nézet ugyanazt a konfigurációs állapotot teszi láthatóvá.",
            "The pool model, water, surround and accessories change together with the controls. The interface and 3D view expose the same configuration state.",
          ),
        ],
        mediaIds: ["alba-configurator-desktop"],
      },
      {
        id: "responsive-experience",
        title: text("Reszponzív működés", "Responsive experience"),
        paragraphs: [
          text(
            "Keskeny nézetben az érintési célok, az opciópanel és az ajánlatkérő CTA megtartja a prioritását, miközben a 3D modell továbbra is értelmezhető marad.",
            "On narrow screens, touch targets, the option panel and quote-request CTA retain priority while the 3D model remains understandable.",
          ),
        ],
        mediaIds: ["alba-configurator-mobile"],
      },
      {
        id: "performance",
        title: text(
          "Teljesítmény és technikai döntések",
          "Performance and technical decisions",
        ),
        paragraphs: [
          text(
            "A WebGL-erőforrások, a mobil memóriahatárok és az assetek betöltése miatt a renderelési réteg elkülönül a kezelőfelülettől. A nagy vizuális elemek késleltetett, mérethelyes betöltést igényelnek.",
            "WebGL resources, mobile memory limits and asset loading keep the rendering layer separate from interface controls. Large visual assets require lazy, correctly sized delivery.",
          ),
        ],
        mediaIds: ["alba-configurator-desktop", "alba-configurator-mobile"],
      },
      {
        id: "outcome",
        title: text("Eredmény", "Outcome"),
        paragraphs: [
          text(
            "Az eredmény egy működő, reszponzív 3D konfigurációs élmény, amely a látogatót ajánlatkérés felé vezeti.",
            "The outcome is a working responsive 3D configuration experience that guides visitors toward a quote request.",
          ),
        ],
        mediaIds: [],
      },
      {
        id: "gallery",
        title: text("Galéria és márkakörnyezet", "Gallery and brand context"),
        paragraphs: [
          text(
            "A konfigurátor a teljes webes márkaélmény része: a belépési pont, a desktop és mobil nézet, valamint a márka- és footer-környezet együtt mutatja a termék útját.",
            "The configurator is part of the wider brand experience: its entry point, desktop and mobile views, and brand/footer context show the complete product journey.",
          ),
        ],
        mediaIds: [
          "alba-website-3d-entry",
          "alba-brand-section-footer",
        ],
      },
    ],
  },
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
        "A bemutatás a konfigurációs folyamatra és a fejlesztői közreműködésre koncentrál; számszerű üzleti eredményt nem állít.",
        "This presentation focuses on the configuration flow and development contribution; it makes no numeric business-outcome claim.",
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
      "Alba Medence – interaktív 3D medencekonfigurátor",
      "Alba Medence – interactive 3D pool configurator",
    ),
    description: text(
      "Reszponzív 3D medencekonfigurátor a webes belépési ponttól az opcióválasztáson át az ajánlatkérésig.",
      "A responsive 3D pool configurator from website entry through option selection to quote request.",
    ),
  },
};

const sanjiwaniEvidenceId = "sanjiwani-owner-specification";
const sanjiwaniDisclosureId = "sanjiwani-portfolio-context";

const sanjiwani = {
  slug: "sanjiwani-booking-experience",
  status: "demo",
  visibility: "public",
  title: text(
    "Sanjiwani – Service Discovery & Booking Experience",
    "Sanjiwani – Service Discovery & Booking Experience",
  ),
  summary: text(
    "Egy szolgáltatásfelfedezési és időpontfoglalási felület, amely a nyugodt márkaélményt jól szkennelhető választási és foglalási folyamattal kapcsolja össze.",
    "A service-discovery and appointment-booking interface connecting a calm brand experience with a clear, scannable selection and booking flow.",
  ),
  role: text(
    "UI/UX, szolgáltatáskatalógus és foglalási flow.",
    "UI/UX, service catalogue and booking flow.",
  ),
  technologies: [
    { name: "Responsive UI", state: "documented" },
    { name: "Service filtering", state: "documented" },
    { name: "Booking state", state: "documented" },
  ],
  responsibilities: [
    text(
      "A szolgáltatásfelfedezés, a szűrés és az egy felületen tartható időpontfoglalási folyamat megtervezése.",
      "Designed service discovery, filtering and an appointment flow that stays within one focused interface.",
    ),
  ],
  presentation: {
    featuredMedia: [
      "sanjiwani-booking-flow-desktop",
      "sanjiwani-services-desktop",
      "sanjiwani-home-desktop",
    ],
    heroVariant: "booking",
    homepageSummary: text(
      "Szolgáltatáskeresés és időpontfoglalás egy nyugodt, márkához illeszkedő felületen – kategória-, időtartam-, masszőr- és idősávválasztással.",
      "Service discovery and appointment booking in a calm, brand-aligned interface with category, duration, therapist and time-slot selection.",
    ),
    roleSummary: text(
      "UI/UX, szolgáltatáskatalógus és foglalási flow",
      "UI/UX, service catalogue and booking flow",
    ),
    storySections: [
      {
        id: "brand-entry",
        title: text("Márka és belépési pont", "Brand and entry point"),
        paragraphs: [
          text(
            "A nyitóoldal nyugodt vizuális hangot, egyértelmű navigációt és közvetlen szolgáltatás- illetve foglalási CTA-kat használ. A belépési pont a márkaélményt azonnal a következő feladathoz köti.",
            "The homepage uses a calm visual tone, clear navigation and direct service and booking calls to action. The entry point connects the brand experience immediately to the next task.",
          ),
        ],
        mediaIds: ["sanjiwani-home-desktop"],
      },
      {
        id: "service-discovery",
        title: text("Szolgáltatásfelfedezés", "Service discovery"),
        paragraphs: [
          text(
            "A kategória- és időtartam-szűrés, a keresés és a szolgáltatáskártyák együtt csökkentik a választási terhet. A lényegi információk szkennelhetők maradnak nagyobb kínálat mellett is.",
            "Category and duration filters, search and service cards work together to reduce selection effort. Essential information remains scannable as the catalogue grows.",
          ),
        ],
        mediaIds: ["sanjiwani-services-desktop"],
      },
      {
        id: "booking-flow",
        title: text("Foglalási flow", "Booking flow"),
        paragraphs: [
          text(
            "A modal egy helyen kezeli az ügyféladatokat, a masszőr-, dátum-, időtartam- és idősávválasztást, valamint a végösszeget. A háttér kontextust ad, miközben a fókusz a foglaláson marad.",
            "The modal keeps customer details, therapist, date, duration and time-slot selection, and the total in one place. The background retains context while focus stays on booking.",
          ),
        ],
        mediaIds: ["sanjiwani-booking-flow-desktop"],
      },
      {
        id: "ux-decisions",
        title: text("UX döntések", "UX decisions"),
        paragraphs: [
          text(
            "Az idősávok napszak szerint csoportosíthatók, a kiválasztott masszőr állapota látható, az összeg pedig a döntés közben végig követhető. A folyamat reszponzív nézetben sem bomlik szét külön oldalakra.",
            "Time slots can be grouped by part of day, the selected therapist remains visible and the total stays available throughout the decision. The flow does not fragment into separate pages on responsive layouts.",
          ),
        ],
        mediaIds: [
          "sanjiwani-services-desktop",
          "sanjiwani-booking-flow-desktop",
        ],
      },
      {
        id: "outcome",
        title: text("Eredmény", "Outcome"),
        paragraphs: [
          text(
            "Az eredmény egy egységes szolgáltatásfelfedezési és foglalási élmény, amely a márka nyugodt hangját a feladatközpontú választással kapcsolja össze.",
            "The outcome is a unified service-discovery and booking experience connecting the brand's calm tone with task-focused selection.",
          ),
        ],
        mediaIds: [],
      },
    ],
  },
  sections: [
    section(
      "summary",
      "documented",
      "A Sanjiwani szolgáltatásfelfedezést, szűrést és időpontfoglalást kapcsol össze egy egységes márkafelületen.",
      "Sanjiwani connects service discovery, filtering and appointment booking in one consistent brand interface.",
      [sanjiwaniEvidenceId],
      [sanjiwaniDisclosureId],
    ),
    section(
      "context",
      "documented",
      "A felhasználónak a szolgáltatások áttekintésétől egyértelmű lépésekben kell eljutnia a foglalásig.",
      "Users need a clear path from understanding the services to completing a booking.",
      [sanjiwaniEvidenceId],
    ),
    section(
      "ownership",
      "documented",
      "A dokumentált felelősség a UI/UX-ra, a szolgáltatáskatalógusra és a foglalási flow-ra terjed ki.",
      "Documented ownership covers UI/UX, the service catalogue and the booking flow.",
      [sanjiwaniEvidenceId],
    ),
    section(
      "constraints",
      "documented",
      "A felületnek a nyugodt márkaélményt, a nagyobb szolgáltatáskínálatot, a több választási dimenziót és a reszponzív működést egyszerre kell kezelnie.",
      "The interface has to balance a calm brand experience, a broad service catalogue, multiple selection dimensions and responsive behavior.",
      [sanjiwaniEvidenceId],
    ),
    section(
      "architecture",
      "documented",
      "A publikus folyamat a márkaoldalt, a szolgáltatáskatalógust és a foglalási modalt köti össze; nem állít belső backend-topológiát.",
      "The public flow connects the brand page, service catalogue and booking modal; it makes no claim about internal backend topology.",
      [sanjiwaniEvidenceId],
      [sanjiwaniDisclosureId],
    ),
    section(
      "data-flow",
      "documented",
      "A kiválasztott szolgáltatás, masszőr, dátum, időtartam és idősáv egy közös foglalási állapotban jelenik meg a végösszeggel.",
      "Selected service, therapist, date, duration and time slot appear in one booking state together with the total.",
      [sanjiwaniEvidenceId],
    ),
    section(
      "frontend",
      "documented",
      "A frontend kategória- és időtartam-szűrést, keresést, szolgáltatáskártyákat és fókuszált booking modalt mutat.",
      "The frontend presents category and duration filters, search, service cards and a focused booking modal.",
      [sanjiwaniEvidenceId],
    ),
    section(
      "backend-api",
      "not-applicable",
      "A portfólióbemutatás nem tesz állítást backend- vagy API-megvalósításról.",
      "This portfolio presentation makes no claim about backend or API implementation.",
      [],
      [sanjiwaniDisclosureId],
    ),
    section(
      "security",
      "not-applicable",
      "A referenciafelületek alapján külön authentikációs vagy jogosultsági történet nem része az esettanulmánynak.",
      "Authentication or authorization is not part of this case-study narrative based on the reference interfaces.",
      [],
      [sanjiwaniDisclosureId],
    ),
    section(
      "performance-reliability",
      "documented",
      "A reszponzív felépítés, a képek mérethelyes betöltése és a modal fókuszkezelése a használható élmény alapja.",
      "Responsive composition, correctly sized image delivery and modal focus management are foundations of the usable experience.",
      [sanjiwaniEvidenceId],
    ),
    section(
      "testing",
      "not-applicable",
      "A projekt belső tesztstratégiája nem része a publikus UX-esettanulmánynak.",
      "The project's internal testing strategy is outside this public UX case study.",
      [],
      [sanjiwaniDisclosureId],
    ),
    section(
      "deployment-monitoring",
      "not-applicable",
      "A deployment- és monitoring-részletek nem részei ennek a felhasználóiút-központú bemutatásnak.",
      "Deployment and monitoring details are outside this user-flow-focused presentation.",
      [],
      [sanjiwaniDisclosureId],
    ),
    section(
      "impact",
      "documented",
      "A dokumentált eredmény egy működő, egységes szolgáltatásfelfedezési és foglalási élmény; számszerű konverziós eredmény nincs állítva.",
      "The documented outcome is a working, coherent service-discovery and booking experience; no numeric conversion outcome is claimed.",
      [sanjiwaniEvidenceId],
    ),
    section(
      "tradeoffs",
      "documented",
      "Az egyetlen modalban tartott flow csökkenti a kontextusváltást, ugyanakkor fegyelmezett információs sűrűséget és reszponzív tördelést igényel.",
      "Keeping the flow in one modal reduces context switching but requires disciplined information density and responsive layout.",
      [sanjiwaniEvidenceId],
    ),
    section(
      "improvements",
      "documented",
      "További iterációban a mobil foglalási lépések, a hibaállapotok és a szolgáltatás-összehasonlítás részletesebben tesztelhetők.",
      "Further iteration can test mobile booking steps, error states and service comparison in more detail.",
      [sanjiwaniEvidenceId],
    ),
    section(
      "related",
      "documented",
      "Kapcsolódó esettanulmányok: az Alba reszponzív konfigurációs folyamata és az Adott összetett workflow-ja.",
      "Related case studies: Alba's responsive configuration flow and Adott's complex workflow.",
      [sanjiwaniEvidenceId],
    ),
  ],
  architecture: {
    state: "conceptual",
    nodes: [
      { id: "brand-entry", label: text("Márkaoldal", "Brand entry") },
      { id: "service-catalogue", label: text("Szolgáltatáskatalógus", "Service catalogue") },
      { id: "booking-modal", label: text("Foglalási modal", "Booking modal") },
      { id: "booking-summary", label: text("Foglalási összegzés", "Booking summary") },
    ],
    edges: [
      { from: "brand-entry", to: "service-catalogue" },
      { from: "service-catalogue", to: "booking-modal" },
      { from: "booking-modal", to: "booking-summary" },
    ],
    disclosureIds: [sanjiwaniDisclosureId],
  },
  results: [
    {
      id: "coherent-booking-experience",
      state: "documented",
      claim: text(
        "Működő, egységes szolgáltatásfelfedezési és foglalási élmény számszerű konverziós állítás nélkül.",
        "A working, coherent service-discovery and booking experience without a numeric conversion claim.",
      ),
      evidenceIds: [sanjiwaniEvidenceId],
    },
  ],
  relatedSlugs: [
    "alba-medence-3d-configurator",
    "adott-enterprise-project-workflow",
  ],
  disclosures: [
    {
      id: sanjiwaniDisclosureId,
      kind: "verification",
      text: text(
        "A képernyők tesztadatokat mutatnak; a bemutatás a szolgáltatásfelfedezési és foglalási UX-re koncentrál.",
        "The screens show test data; this presentation focuses on the service-discovery and booking experience.",
      ),
    },
  ],
  evidence: [
    {
      id: sanjiwaniEvidenceId,
      kind: "owner-confirmation",
      access: "private",
      verification: "verified",
      label: text(
        "A projektgazda által biztosított V3 specifikáció és referencia-képernyők",
        "The owner-provided V3 specification and reference screens",
      ),
      sectionIds: [...caseStudySectionIds],
    },
  ],
  links: [],
  media: [],
  seo: {
    title: text(
      "Sanjiwani – szolgáltatásfelfedezés és időpontfoglalás",
      "Sanjiwani – service discovery and appointment booking",
    ),
    description: text(
      "Nyugodt márkaélményt, szűrhető szolgáltatáskatalógust és fókuszált időpontfoglalást összekapcsoló UX-esettanulmány.",
      "A UX case study connecting a calm brand experience, filterable service catalogue and focused appointment booking.",
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
  presentation: {
    featuredMedia: [],
    heroVariant: "data",
    homepageSummary: text(
      "Fejlesztés alatt álló offline-first PWA napi küldetésekkel, XP-vel és fokozatosan bővíthető kliensoldali állapottal.",
      "An in-progress offline-first PWA with daily quests, XP and incrementally extensible client-side state.",
    ),
    roleSummary: text(
      "Saját termékirány és fokozatos PWA-megvalósítás",
      "Independent product direction and incremental PWA implementation",
    ),
    storySections: [
      {
        id: "current-state",
        title: text("Jelenlegi állapot", "Current state"),
        paragraphs: [
          text(
            "A QuestLog napi küldetéseket, XP-rendszert és offline használatot szervez fokozatosan bővíthető PWA-ba. A jelenlegi fókusz a termékmodell és a kliensoldali alapok kialakítása.",
            "QuestLog organizes daily quests, an XP system and offline use into an incrementally extensible PWA. The current focus is shaping the product model and client-side foundations.",
          ),
        ],
        mediaIds: [],
      },
      {
        id: "product-direction",
        title: text("Termékirány", "Product direction"),
        paragraphs: [
          text(
            "A kezdeti koncepció napi küldetéseket, XP- és szintrendszert, installálhatóságot és visszafogott progressziót kapcsol össze.",
            "The initial concept connects daily quests, XP and levels, installability and restrained progression feedback.",
          ),
        ],
        mediaIds: [],
      },
      {
        id: "offline-first",
        title: text("Offline-first alap", "Offline-first foundation"),
        paragraphs: [
          text(
            "Az első kiadás kliensoldali állapottal és offline fallbackkel indulhat. A tartós adatbázis, felhasználói fiók és többeszközös szinkronizáció későbbi fázis.",
            "The first release can start with client-side state and an offline fallback. Durable storage, user accounts and multi-device synchronization belong to a later phase.",
          ),
        ],
        mediaIds: [],
      },
      {
        id: "implementation-boundary",
        title: text("Megvalósítási határ", "Implementation boundary"),
        paragraphs: [
          text(
            "A localStorage gyors iterációt tesz lehetővé a kezdeti kliensoldali állapothoz. A tartós, konfliktuskezelő adatmodell és a többeszközös szinkronizáció a következő fázis része.",
            "LocalStorage enables fast iteration for the initial client-side state. A durable, conflict-aware data model and multi-device synchronization belong to the next phase.",
          ),
        ],
        mediaIds: [],
      },
      {
        id: "next-steps",
        title: text("Következő lépések", "Next steps"),
        paragraphs: [
          text(
            "A további irány a tartós adatmodell, a conflict-aware szinkronizáció, a background sync, a tesztek és a CI/CD fokozatos bevezetése.",
            "The next direction is to introduce a durable data model, conflict-aware synchronization, background sync, tests and CI/CD incrementally.",
          ),
        ],
        mediaIds: [],
      },
    ],
  },
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

const rawCaseStudies = [samsung, adott, alba, sanjiwani, questlog];

export const caseStudies = caseStudyRegistrySchema.parse(rawCaseStudies);
