import type {
  CaseStudy,
  CaseStudyLocale,
  CaseStudySectionState,
} from "@/content/case-studies";

type CaseStudyStatus = CaseStudy["status"];
type CaseStudyVisibility = CaseStudy["visibility"];
type ArchitectureState = CaseStudy["architecture"]["state"];
type ResultState = CaseStudy["results"][number]["state"];
type TechnologyState = CaseStudy["technologies"][number]["state"];
type VerificationState = CaseStudy["evidence"][number]["verification"];
type EvidenceAccess = CaseStudy["evidence"][number]["access"];

export const caseStudyUi = {
  hu: {
    indexMetaTitle: "Engineering munkák | Kovács Zalán",
    indexMetaDescription:
      "Validált, lokalizált engineering esettanulmányok rendszerhatárokról, felelősségről és igazolható eredményekről.",
    indexEyebrow: "Engineering work",
    indexTitle: "Esettanulmányok, feltételezések nélkül",
    indexDescription:
      "Minden projekt ugyanazt a validált tartalmi modellt használja. A bizalmas, tervezett vagy még nem igazolt részleteket az oldal egyértelműen jelöli.",
    readCaseStudy: "Engineering esettanulmány megnyitása",
    filterLabel: "Projektlista szűrése",
    filterAll: "Mind",
    filterPublic: "Publikus",
    filterAnonymized: "Anonimizált",
    filterInProgress: "Fejlesztés alatt",
    filterResult: "{count} projekt látható",
    role: "Szerepkör és felelősség",
    period: "Időszak",
    notDocumented: "A validált registryben nincs dokumentálva.",
    technologies: "Technológiák",
    responsibilities: "Dokumentált felelősségek",
    breadcrumbLabel: "Morzsanavigáció",
    home: "Főoldal",
    work: "Engineering munkák",
    backToWork: "Vissza az összes esettanulmányhoz",
    contents: "Tartalomjegyzék",
    state: "Tartalmi állapot",
    disclosures: "Korlátok és közlések",
    sectionDisclosures: "Ehhez a fejezethez tartozó közlések",
    sectionEvidence: "Ehhez a fejezethez tartozó bizonyíték",
    evidenceRegister: "Bizonyítékjegyzék",
    results: "Igazolt eredmények és állapotok",
    resources: "Publikus források",
    links: "Projekt-hivatkozások",
    noLinks:
      "A registry ehhez a projekthez nem tartalmaz publikus projekt- vagy live linket.",
    media: "Ellenőrzött média",
    noMedia:
      "A registry ehhez a projekthez nem tartalmaz publikálható médiát.",
    related: "Kapcsolódó esettanulmányok",
    architectureTitle: "Koncepcionális rendszerfolyam",
    architectureFallback: "A diagram teljes szöveges megfelelője",
    architectureNodes: "Rendszerhatárok",
    architectureConnections: "Dokumentált kapcsolatok",
    architectureUnavailable:
      "Az architektúra még nincs igazolva; ezért az oldal nem rajzol feltételezett rendszert.",
    connection: "kapcsolódik ehhez",
    metricAttribution: "Mérőszám értelmezése",
    metricImprovement: "javulás",
    externalLink: "külső hivatkozás",
    status: {
      production: "Production",
      demo: "Demó",
      "private-case-study": "Privát esettanulmány",
      "in-progress": "Fejlesztés alatt",
    } satisfies Record<CaseStudyStatus, string>,
    visibility: {
      public: "Publikus",
      anonymized: "Anonimizált",
    } satisfies Record<CaseStudyVisibility, string>,
    sectionState: {
      documented: "Dokumentált",
      "not-applicable": "Nem alkalmazható",
      "not-disclosed": "Nem publikus",
      planned: "Tervezett",
      "not-yet-verified": "Még nincs igazolva",
    } satisfies Record<CaseStudySectionState, string>,
    architectureState: {
      conceptual: "Koncepcionális rekonstrukció",
      planned: "Tervezett architektúra",
      "not-yet-verified": "Még nincs igazolva",
    } satisfies Record<ArchitectureState, string>,
    resultState: {
      documented: "Dokumentált",
      planned: "Tervezett",
      "not-yet-verified": "Még nincs igazolva",
    } satisfies Record<ResultState, string>,
    technologyState: {
      documented: "Dokumentált",
      planned: "Tervezett",
      "not-yet-verified": "Még nincs igazolva",
    } satisfies Record<TechnologyState, string>,
    verification: {
      verified: "Ellenőrzött",
      "not-yet-verified": "Ellenőrzésre vár",
    } satisfies Record<VerificationState, string>,
    evidenceAccess: {
      public: "Publikus bizonyíték",
      private: "Privát bizonyíték; hivatkozás nem publikálható",
    } satisfies Record<EvidenceAccess, string>,
  },
  en: {
    indexMetaTitle: "Engineering work | Kovács Zalán",
    indexMetaDescription:
      "Validated, localized engineering case studies about system boundaries, ownership, and verifiable outcomes.",
    indexEyebrow: "Engineering work",
    indexTitle: "Case studies without assumptions",
    indexDescription:
      "Every project uses the same validated content model. Confidential, planned, and not-yet-verified details are labelled explicitly.",
    readCaseStudy: "Read engineering case study",
    filterLabel: "Filter project list",
    filterAll: "All",
    filterPublic: "Public",
    filterAnonymized: "Anonymized",
    filterInProgress: "In progress",
    filterResult: "{count} projects shown",
    role: "Role and ownership",
    period: "Period",
    notDocumented: "Not documented in the validated registry.",
    technologies: "Technologies",
    responsibilities: "Documented responsibilities",
    breadcrumbLabel: "Breadcrumb",
    home: "Home",
    work: "Engineering work",
    backToWork: "Back to all case studies",
    contents: "Contents",
    state: "Content state",
    disclosures: "Scope and disclosures",
    sectionDisclosures: "Disclosures for this section",
    sectionEvidence: "Evidence for this section",
    evidenceRegister: "Evidence register",
    results: "Verified outcomes and states",
    resources: "Public resources",
    links: "Project references",
    noLinks:
      "The registry contains no public project or live link for this case study.",
    media: "Verified media",
    noMedia:
      "The registry contains no publishable media for this case study.",
    related: "Related case studies",
    architectureTitle: "Conceptual system flow",
    architectureFallback: "Complete text equivalent of the diagram",
    architectureNodes: "System boundaries",
    architectureConnections: "Documented connections",
    architectureUnavailable:
      "The architecture has not yet been verified, so this page does not draw an assumed system.",
    connection: "connects to",
    metricAttribution: "Metric attribution",
    metricImprovement: "improvement",
    externalLink: "external reference",
    status: {
      production: "Production",
      demo: "Demo",
      "private-case-study": "Private case study",
      "in-progress": "In progress",
    } satisfies Record<CaseStudyStatus, string>,
    visibility: {
      public: "Public",
      anonymized: "Anonymized",
    } satisfies Record<CaseStudyVisibility, string>,
    sectionState: {
      documented: "Documented",
      "not-applicable": "Not applicable",
      "not-disclosed": "Not disclosed",
      planned: "Planned",
      "not-yet-verified": "Not yet verified",
    } satisfies Record<CaseStudySectionState, string>,
    architectureState: {
      conceptual: "Conceptual reconstruction",
      planned: "Planned architecture",
      "not-yet-verified": "Not yet verified",
    } satisfies Record<ArchitectureState, string>,
    resultState: {
      documented: "Documented",
      planned: "Planned",
      "not-yet-verified": "Not yet verified",
    } satisfies Record<ResultState, string>,
    technologyState: {
      documented: "Documented",
      planned: "Planned",
      "not-yet-verified": "Not yet verified",
    } satisfies Record<TechnologyState, string>,
    verification: {
      verified: "Verified",
      "not-yet-verified": "Not yet verified",
    } satisfies Record<VerificationState, string>,
    evidenceAccess: {
      public: "Public evidence",
      private: "Private evidence; no link can be published",
    } satisfies Record<EvidenceAccess, string>,
  },
} as const;

export type CaseStudyUi = (typeof caseStudyUi)[CaseStudyLocale];
