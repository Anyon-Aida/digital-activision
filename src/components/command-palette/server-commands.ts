import "server-only";

import {
  getCaseStudies,
  getCaseStudyPath,
  localize,
} from "@/content/case-studies";
import type { Locale } from "@/i18n/routing";
import type { PaletteCommand } from "./types";

type CommandSeed = Omit<PaletteCommand, "disabled" | "href"> & {
  localeIndependent?: boolean;
  path: string;
};

const commandSeeds: Record<Locale, readonly CommandSeed[]> = {
  hu: [
    {
      id: "page-home",
      path: "",
      group: "page",
      label: "Fejlesztői főoldal",
      description:
        "Full-stack termékfejlesztés, válogatott munkák és szakmai tapasztalat.",
      keywords: ["kezdőlap", "portfólió", "home", "developer"],
    },
    {
      id: "page-work",
      path: "/work",
      group: "page",
      label: "Munkák",
      description: "Válogatott termék- és rendszeresettanulmányok.",
      keywords: ["projektek", "esettanulmány", "case study", "work"],
    },
    {
      id: "page-lab",
      path: "/lab",
      group: "page",
      label: "Engineering Lab",
      description:
        "Validált requestek, workflowk, jogosultságok és API-szerződések.",
      keywords: ["labor", "architecture", "api", "permission", "workflow"],
    },
    {
      id: "page-studio",
      path: "/studio",
      group: "page",
      label: "Digital Activision Studio",
      description:
        "Weboldalak, digitális termékek és scope-alapú együttműködés.",
      keywords: ["ügynökség", "szolgáltatás", "studio", "scope"],
    },
    {
      id: "page-privacy",
      path: "/privacy",
      group: "page",
      label: "Adatkezelés",
      description: "Adatkezelési tájékoztató.",
      keywords: ["privacy", "jogi", "személyes adat"],
    },
    {
      id: "action-cv",
      path: "/cv/kovacs-zalan-cv-hu.pdf",
      localeIndependent: true,
      group: "action",
      label: "Magyar CV megnyitása",
      description: "Kovács Zalán magyar nyelvű önéletrajza PDF-formátumban.",
      keywords: ["cv", "önéletrajz", "resume", "letöltés", "pdf"],
    },
    {
      id: "home-featured-work",
      path: "#featured-work",
      group: "section",
      label: "Kiemelt munkák",
      description:
        "Adott, Alba Medence és Sanjiwani eltérő termékhelyzetekben.",
      keywords: ["projektek", "munka", "selected work", "case study"],
    },
    {
      id: "home-experience",
      path: "#experience",
      group: "section",
      label: "Tapasztalat",
      description:
        "Bosch, Samsung, Adott Solution és saját digitális termékek.",
      keywords: ["karrier", "bosch", "samsung", "adott", "experience"],
    },
    {
      id: "home-lab",
      path: "#lab",
      group: "section",
      label: "Lab összefoglaló",
      description: "Mérnöki kísérletek és validált rendszerpéldák.",
      keywords: ["lab", "engineering", "api", "workflow", "experiment"],
    },
    {
      id: "home-studio",
      path: "#studio",
      group: "section",
      label: "Studio",
      description: "Rövid átjáró az ügyfélfókuszú Studio oldalhoz.",
      keywords: ["studio", "digitális termék", "szolgáltatás"],
    },
    {
      id: "home-contact",
      path: "#contact",
      group: "section",
      label: "Kapcsolat",
      description: "Beszélgetés indítása egy termék- vagy rendszerfeladatról.",
      keywords: ["email", "elérhetőség", "contact", "együttműködés"],
    },
  ],
  en: [
    {
      id: "page-home",
      path: "",
      group: "page",
      label: "Developer homepage",
      description:
        "Full-stack product engineering, selected work, and experience.",
      keywords: ["start", "portfolio", "home", "developer"],
    },
    {
      id: "page-work",
      path: "/work",
      group: "page",
      label: "Work",
      description: "Selected product and systems case studies.",
      keywords: ["projects", "case study", "work"],
    },
    {
      id: "page-lab",
      path: "/lab",
      group: "page",
      label: "Engineering Lab",
      description:
        "Validated requests, workflows, permissions, and API contracts.",
      keywords: ["architecture", "api", "permission", "workflow", "lab"],
    },
    {
      id: "page-studio",
      path: "/studio",
      group: "page",
      label: "Digital Activision Studio",
      description:
        "Websites, digital products, and scope-based collaboration.",
      keywords: ["agency", "services", "studio", "scope"],
    },
    {
      id: "page-privacy",
      path: "/privacy",
      group: "page",
      label: "Privacy",
      description: "Privacy notice.",
      keywords: ["legal", "personal data", "notice"],
    },
    {
      id: "action-cv",
      path: "/cv/kovacs-zalan-cv-en.pdf",
      localeIndependent: true,
      group: "action",
      label: "Open English CV",
      description: "Kovács Zalán's English curriculum vitae in PDF format.",
      keywords: ["cv", "resume", "curriculum vitae", "download", "pdf"],
    },
    {
      id: "home-featured-work",
      path: "#featured-work",
      group: "section",
      label: "Selected work",
      description:
        "Adott, Alba Medence, and Sanjiwani across distinct product contexts.",
      keywords: ["projects", "work", "selected work", "case study"],
    },
    {
      id: "home-experience",
      path: "#experience",
      group: "section",
      label: "Experience",
      description:
        "Bosch, Samsung, Adott Solution, and independent digital products.",
      keywords: ["career", "bosch", "samsung", "adott", "timeline"],
    },
    {
      id: "home-lab",
      path: "#lab",
      group: "section",
      label: "Lab overview",
      description: "Engineering experiments and validated system examples.",
      keywords: ["lab", "engineering", "api", "workflow", "experiment"],
    },
    {
      id: "home-studio",
      path: "#studio",
      group: "section",
      label: "Studio",
      description: "A concise bridge to the client-focused Studio.",
      keywords: ["studio", "digital product", "services"],
    },
    {
      id: "home-contact",
      path: "#contact",
      group: "section",
      label: "Contact",
      description: "Start a conversation about a product or systems brief.",
      keywords: ["email", "contact", "collaboration", "project"],
    },
  ],
};

export function buildServerCommandPaletteCommands(
  locale: Locale,
): readonly PaletteCommand[] {
  const staticCommands = commandSeeds[locale].map(
    ({ localeIndependent, path, ...command }) => ({
      ...command,
      disabled: false,
      href: (localeIndependent ? path : `/${locale}${path}`) as PaletteCommand["href"],
    }),
  );
  const caseStudyCommands = getCaseStudies().map((study) => ({
    id: `case-study-${study.slug}`,
    href: getCaseStudyPath(study.slug, locale),
    group: "case-study" as const,
    label: localize(study.title, locale),
    description: localize(study.presentation.homepageSummary, locale),
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
