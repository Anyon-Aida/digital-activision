import "server-only";

import {
  getCaseStudies,
  getCaseStudyPath,
  localize,
} from "@/content/case-studies";
import type { Locale } from "@/i18n/routing";
import type { PaletteCommand } from "./types";

type CommandSeed = Omit<PaletteCommand, "disabled" | "href"> & {
  disabled?: boolean;
  path: string | null;
};

const commandSeeds = {
  hu: [
    {
      id: "page-home",
      path: "",
      group: "page",
      label: "Fejlesztői főoldal",
      description: "Full-stack fókusz, kiemelt munkák és szakmai tapasztalat.",
      keywords: ["kezdőlap", "portfólió", "home", "developer"],
    },
    {
      id: "page-work",
      path: "/work",
      group: "page",
      label: "Engineering munkák",
      description: "A validált esettanulmányok teljes gyűjteménye.",
      keywords: ["projektek", "case study", "work"],
    },
    {
      id: "page-studio",
      path: "/studio",
      group: "page",
      label: "Digital Activision Studio",
      description: "Szolgáltatások, folyamat, csomagok és kísérletek.",
      keywords: ["ügynökség", "szolgáltatás", "agency"],
    },
    {
      id: "page-lab",
      path: "/lab",
      group: "page",
      label: "Engineering Lab",
      description: "Koncepcionális architektúra-, permission- és API-demók.",
      keywords: ["labor", "architecture", "api", "permission"],
    },
    {
      id: "page-privacy",
      path: "/privacy",
      group: "page",
      label: "Adatkezelés",
      description: "Adatkezelési tájékoztató és jelenlegi korlátai.",
      keywords: ["privacy", "jogi", "személyes adat"],
    },
    {
      id: "action-cv",
      path: null,
      group: "action",
      label: "CV megnyitása",
      description: "A magyar és angol CV asset még nem érhető el.",
      keywords: ["önéletrajz", "resume", "letöltés"],
      disabled: true,
    },
    {
      id: "search-backend-projects",
      path: "/work/adott-enterprise-project-workflow",
      group: "case-study",
      label: "Backend projektek megjelenítése",
      description:
        "A legerősebben dokumentált backend/API találat: Adott Solution enterprise workflow.",
      keywords: ["backend", "api", "node", "php", "server"],
    },
    {
      id: "search-security-work",
      path: "/work/adott-enterprise-project-workflow",
      group: "case-study",
      label: "Security-kapcsolatú munkák megjelenítése",
      description:
        "Dokumentált token-authentikáció, RBAC és audit: Adott Solution.",
      keywords: [
        "security",
        "auth",
        "authorization",
        "jogosultság",
        "rbac",
        "audit",
      ],
    },
    {
      id: "home-system-map",
      path: "#system-map",
      group: "section",
      label: "System Map",
      description: "Egy kérés útja a teljes stacken.",
      keywords: ["architektúra", "rendszertérkép", "flow"],
    },
    {
      id: "home-featured-work",
      path: "#featured-work",
      group: "section",
      label: "Kiemelt engineering munkák",
      description: "A négy kiemelt projekt rövid áttekintése.",
      keywords: ["projektek", "munka", "case study"],
    },
    {
      id: "home-capabilities",
      path: "#capabilities",
      group: "section",
      label: "Engineering képességek",
      description: "Frontend, backend, adat és delivery bizonyítékokkal.",
      keywords: ["skill", "stack", "technológia"],
    },
    {
      id: "home-experience",
      path: "#experience",
      group: "section",
      label: "Szakmai tapasztalat",
      description: "Igazolt szakmai útvonal és felelősségek.",
      keywords: ["karrier", "bosch", "samsung", "experience"],
    },
    {
      id: "home-standards",
      path: "#standards",
      group: "section",
      label: "Engineering standardok",
      description: "Megvalósított és tervezett minőségi gyakorlatok.",
      keywords: ["quality", "teszt", "accessibility", "ci"],
    },
    {
      id: "home-contact",
      path: "#contact",
      group: "section",
      label: "Kapcsolat",
      description: "Engineering együttműködés kezdeményezése e-mailben.",
      keywords: ["email", "elérhetőség", "contact"],
    },
    {
      id: "studio-services",
      path: "/studio#services",
      group: "section",
      label: "Studio szolgáltatások",
      description: "A Studio dokumentált szolgáltatási területei.",
      keywords: ["weboldal", "ui", "seo", "service"],
    },
    {
      id: "studio-experiments",
      path: "/studio#experiments",
      group: "section",
      label: "Studio kísérletek",
      description: "Megőrzött, önálló statikus prototípusok.",
      keywords: ["demo", "prototype", "legacy"],
    },
    {
      id: "studio-process",
      path: "/studio#process",
      group: "section",
      label: "Studio folyamat",
      description: "A Studio együttműködési folyamatának lépései.",
      keywords: ["workflow", "együttműködés", "process"],
    },
    {
      id: "studio-pricing",
      path: "/studio#pricing",
      group: "section",
      label: "Studio csomagok",
      description: "Projektgazdai megerősítésre váró tájékoztató csomagok.",
      keywords: ["ár", "csomag", "pricing"],
    },
    {
      id: "studio-contact",
      path: "/studio#contact",
      group: "section",
      label: "Studio kapcsolat",
      description: "E-mailes Studio megkeresés.",
      keywords: ["email", "ajánlat", "contact"],
    },
    {
      id: "lab-architecture",
      path: "/lab#architecture-explorer-title",
      group: "section",
      label: "Architecture Explorer",
      description: "Három koncepcionális rendszerfolyam bejárása.",
      keywords: ["node", "flow", "rendszer", "diagram"],
    },
    {
      id: "lab-permissions",
      path: "/lab#permission-matrix-title",
      group: "section",
      label: "Role & Permission Matrix",
      description: "Szemléltető, műveletszintű jogosultsági mátrix.",
      keywords: ["rbac", "role", "authorization", "jogosultság"],
    },
    {
      id: "lab-api-contract",
      path: "/lab#api-contract-title",
      group: "section",
      label: "API contract példa",
      description: "Validált request és stabil hibafelület.",
      keywords: ["endpoint", "request", "response", "error"],
    },
  ],
  en: [
    {
      id: "page-home",
      path: "",
      group: "page",
      label: "Developer homepage",
      description: "Full-stack focus, featured work, and experience.",
      keywords: ["start", "portfolio", "home", "developer"],
    },
    {
      id: "page-work",
      path: "/work",
      group: "page",
      label: "Engineering work",
      description: "The complete collection of validated case studies.",
      keywords: ["projects", "case study", "work"],
    },
    {
      id: "page-studio",
      path: "/studio",
      group: "page",
      label: "Digital Activision Studio",
      description: "Services, process, packages, and experiments.",
      keywords: ["agency", "services", "studio"],
    },
    {
      id: "page-lab",
      path: "/lab",
      group: "page",
      label: "Engineering Lab",
      description: "Conceptual architecture, permission, and API demos.",
      keywords: ["architecture", "api", "permission", "demo"],
    },
    {
      id: "page-privacy",
      path: "/privacy",
      group: "page",
      label: "Privacy",
      description: "Privacy information and its current limitations.",
      keywords: ["legal", "personal data", "notice"],
    },
    {
      id: "action-cv",
      path: null,
      group: "action",
      label: "Open CV",
      description: "The Hungarian and English CV assets are not yet available.",
      keywords: ["resume", "curriculum vitae", "download"],
      disabled: true,
    },
    {
      id: "search-backend-projects",
      path: "/work/adott-enterprise-project-workflow",
      group: "case-study",
      label: "Show backend projects",
      description:
        "The strongest documented backend/API match: Adott Solution enterprise workflow.",
      keywords: ["backend", "api", "node", "php", "server"],
    },
    {
      id: "search-security-work",
      path: "/work/adott-enterprise-project-workflow",
      group: "case-study",
      label: "Show security-related work",
      description:
        "Documented token authentication, RBAC, and auditing: Adott Solution.",
      keywords: ["security", "auth", "authorization", "rbac", "audit"],
    },
    {
      id: "home-system-map",
      path: "#system-map",
      group: "section",
      label: "System Map",
      description: "A request across the full stack.",
      keywords: ["architecture", "flow", "system"],
    },
    {
      id: "home-featured-work",
      path: "#featured-work",
      group: "section",
      label: "Featured engineering work",
      description: "A compact view of the four featured projects.",
      keywords: ["projects", "work", "case study"],
    },
    {
      id: "home-capabilities",
      path: "#capabilities",
      group: "section",
      label: "Engineering capabilities",
      description: "Frontend, backend, data, and delivery with evidence.",
      keywords: ["skills", "stack", "technology"],
    },
    {
      id: "home-experience",
      path: "#experience",
      group: "section",
      label: "Experience",
      description: "Verified career path and responsibilities.",
      keywords: ["career", "bosch", "samsung", "timeline"],
    },
    {
      id: "home-standards",
      path: "#standards",
      group: "section",
      label: "Engineering standards",
      description: "Implemented and planned quality practices.",
      keywords: ["quality", "testing", "accessibility", "ci"],
    },
    {
      id: "home-contact",
      path: "#contact",
      group: "section",
      label: "Contact",
      description: "Start an engineering conversation by email.",
      keywords: ["email", "reach out", "collaboration"],
    },
    {
      id: "studio-services",
      path: "/studio#services",
      group: "section",
      label: "Studio services",
      description: "The Studio's documented service areas.",
      keywords: ["website", "ui", "seo", "service"],
    },
    {
      id: "studio-experiments",
      path: "/studio#experiments",
      group: "section",
      label: "Studio experiments",
      description: "Preserved standalone static prototypes.",
      keywords: ["demo", "prototype", "legacy"],
    },
    {
      id: "studio-process",
      path: "/studio#process",
      group: "section",
      label: "Studio process",
      description: "Steps in the Studio collaboration process.",
      keywords: ["workflow", "collaboration", "process"],
    },
    {
      id: "studio-pricing",
      path: "/studio#pricing",
      group: "section",
      label: "Studio packages",
      description: "Informational packages awaiting owner confirmation.",
      keywords: ["price", "package", "pricing"],
    },
    {
      id: "studio-contact",
      path: "/studio#contact",
      group: "section",
      label: "Studio contact",
      description: "Contact the Studio by email.",
      keywords: ["email", "quote", "contact"],
    },
    {
      id: "lab-architecture",
      path: "/lab#architecture-explorer-title",
      group: "section",
      label: "Architecture Explorer",
      description: "Inspect three conceptual system flows.",
      keywords: ["node", "flow", "system", "diagram"],
    },
    {
      id: "lab-permissions",
      path: "/lab#permission-matrix-title",
      group: "section",
      label: "Role & Permission Matrix",
      description: "An illustrative action-level permission matrix.",
      keywords: ["rbac", "role", "authorization", "permissions"],
    },
    {
      id: "lab-api-contract",
      path: "/lab#api-contract-title",
      group: "section",
      label: "API contract example",
      description: "A validated request and stable error surface.",
      keywords: ["endpoint", "request", "response", "error"],
    },
  ],
} as const satisfies Record<Locale, readonly CommandSeed[]>;

export function buildServerCommandPaletteCommands(
  locale: Locale,
): readonly PaletteCommand[] {
  const staticCommands = commandSeeds[locale].map((command) => ({
    ...command,
    disabled: "disabled" in command ? command.disabled : false,
    href:
      command.path === null
        ? null
        : (`/${locale}${command.path}` as PaletteCommand["href"]),
  }));
  const caseStudyCommands = getCaseStudies().map((study) => ({
    id: `case-study-${study.slug}`,
    href: getCaseStudyPath(study.slug, locale),
    group: "case-study" as const,
    label: localize(study.title, locale),
    description: localize(study.summary, locale),
    disabled: false,
    keywords: [
      study.slug,
      labelsForCaseStudy(locale),
      ...study.technologies.map(({ name }) => name),
      ...study.sections
        .filter(({ state }) => state === "documented" || state === "planned")
        .map(({ id }) => id),
    ],
  }));

  return [...staticCommands, ...caseStudyCommands];
}

function labelsForCaseStudy(locale: Locale) {
  return locale === "hu" ? "esettanulmány projekt" : "case study project";
}
