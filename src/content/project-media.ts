export type ProjectMediaLocalizedText = {
  hu: string;
  en: string;
};

export type ProjectDiagramSurface = "dark" | "light";

export const projectMediaIds = [
  "adott-inquiry-roles",
  "adott-inquiry-status-and-details",
  "adott-quote-structure",
  "adott-quote-editor",
  "adott-notifications",
  "adott-company-detail",
  "adott-company-create",
  "adott-bug-report",
  "adott-bug-report-list",
  "alba-website-3d-entry",
  "alba-brand-section-footer",
  "alba-configurator-desktop",
  "alba-configurator-mobile",
  "sanjiwani-home-desktop",
  "sanjiwani-services-desktop",
  "sanjiwani-booking-flow-desktop",
  "samsung-gate-flow",
  "adott-workflow",
  "product-system-blueprint",
] as const;

export type ProjectMediaId = (typeof projectMediaIds)[number];

type ProjectMediaProject =
  | "adott"
  | "alba"
  | "sanjiwani"
  | "samsung"
  | "shared";

export type ProjectRasterMedia = {
  id: ProjectMediaId;
  kind: "screenshot";
  project: Exclude<ProjectMediaProject, "samsung" | "shared">;
  sources: {
    avif: `/portfolio-v3/${string}.avif`;
    webp: `/portfolio-v3/${string}.webp`;
  };
  width: number;
  height: number;
  alt: ProjectMediaLocalizedText;
};

export type ProjectDiagramMedia = {
  id: ProjectMediaId;
  kind: "diagram";
  project: Extract<ProjectMediaProject, "adott" | "samsung" | "shared">;
  surface: ProjectDiagramSurface;
  sources: {
    svg: `/portfolio-v3/${string}.svg`;
  };
  width: number;
  height: number;
  alt: ProjectMediaLocalizedText;
};

export type ProjectMedia = ProjectRasterMedia | ProjectDiagramMedia;

const raster = (
  id: ProjectMediaId,
  project: ProjectRasterMedia["project"],
  width: number,
  height: number,
  hu: string,
  en: string,
): ProjectRasterMedia => ({
  id,
  kind: "screenshot",
  project,
  sources: {
    avif: `/portfolio-v3/projects/${project}/${id}.avif`,
    webp: `/portfolio-v3/projects/${project}/${id}.webp`,
  },
  width,
  height,
  alt: { hu, en },
});

const diagram = (
  id: ProjectMediaId,
  project: ProjectDiagramMedia["project"],
  width: number,
  height: number,
  surface: ProjectDiagramSurface,
  hu: string,
  en: string,
): ProjectDiagramMedia => ({
  id,
  kind: "diagram",
  project,
  surface,
  sources: {
    svg: `/portfolio-v3/diagrams/${id}.svg`,
  },
  width,
  height,
  alt: { hu, en },
});

export const projectMedia = [
  raster(
    "adott-inquiry-roles",
    "adott",
    1_600,
    594,
    "Enterprise inquiry nézet szerepkörlistával és többlépcsős státuszfolyamattal.",
    "Enterprise inquiry view with role definitions and a multi-stage status workflow.",
  ),
  raster(
    "adott-inquiry-status-and-details",
    "adott",
    1_600,
    594,
    "Inquiry részletező nézet műszaki paraméterekkel, csatolmánnyal, státuszszűrővel és folyamatjelzővel.",
    "Inquiry detail view with technical parameters, attachment controls, status filter and workflow indicator.",
  ),
  raster(
    "adott-quote-structure",
    "adott",
    1_600,
    594,
    "Ajánlati struktúra modulokkal, feladatokkal, fázisokkal és órabecslésekkel.",
    "Quote structure with modules, tasks, phases and effort estimates.",
  ),
  raster(
    "adott-quote-editor",
    "adott",
    1_600,
    594,
    "Összetett ajánlatszerkesztő beágyazott modul-, feladat- és fázismezőkkel.",
    "Complex quote editor with nested module, task and phase fields.",
  ),
  raster(
    "adott-notifications",
    "adott",
    1_600,
    594,
    "Enterprise értesítési központ státuszváltozásokat összegző kártyákkal és lenyíló panellel.",
    "Enterprise notification centre with status-change cards and a dropdown panel.",
  ),
  raster(
    "adott-company-detail",
    "adott",
    1_600,
    594,
    "Vállalati ügyféllista jobbról nyíló cég- és kapcsolattartói részletező panellel.",
    "Company list with a right-side drawer for company and contact details.",
  ),
  raster(
    "adott-company-create",
    "adott",
    1_600,
    594,
    "Új vállalat létrehozására szolgáló adminisztrációs modal cím- és kapcsolattartói mezőkkel.",
    "Administrative modal for creating a company with address and optional contact fields.",
  ),
  raster(
    "adott-bug-report",
    "adott",
    1_600,
    594,
    "Bug- és feature-bejelentő űrlap prioritás- és fájlcsatolási lehetőséggel.",
    "Bug and feature report form with priority selection and file attachment.",
  ),
  raster(
    "adott-bug-report-list",
    "adott",
    1_600,
    594,
    "Bug report lista részletes leírásokat, prioritást és állapotot mutató kártyákkal.",
    "Bug report list with cards showing descriptions, priority and status.",
  ),
  raster(
    "alba-website-3d-entry",
    "alba",
    1_339,
    740,
    "Az Alba Medence weboldal 3D medencetervezőt bemutató hero szekciója.",
    "Alba Medence website hero introducing the interactive 3D pool planner.",
  ),
  raster(
    "alba-brand-section-footer",
    "alba",
    1_333,
    744,
    "Az Alba Medence márkapartner-szekciója és információgazdag footere.",
    "Alba Medence partner-brand section and information-rich footer.",
  ),
  raster(
    "alba-configurator-desktop",
    "alba",
    1_335,
    746,
    "Interaktív 3D medencekonfigurátor desktop nézetben, kiegészítőválasztó oldalsávval.",
    "Interactive 3D pool configurator on desktop with an options sidebar.",
  ),
  raster(
    "alba-configurator-mobile",
    "alba",
    351,
    734,
    "A 3D medencekonfigurátor mobilnézete érintésbarát opciókkal és ajánlatkérő gombbal.",
    "Mobile view of the 3D pool configurator with touch-friendly options and quote request.",
  ),
  raster(
    "sanjiwani-home-desktop",
    "sanjiwani",
    1_483,
    729,
    "A Sanjiwani masszázsszalon világos nyitóoldala szolgáltatás- és időpontfoglaló gombokkal.",
    "Sanjiwani massage studio homepage with service and booking calls to action.",
  ),
  raster(
    "sanjiwani-services-desktop",
    "sanjiwani",
    1_485,
    728,
    "Masszázsszolgáltatások szűrhető listája kategória-, időtartam- és keresési vezérlőkkel.",
    "Filterable massage service catalogue with category, duration and search controls.",
  ),
  raster(
    "sanjiwani-booking-flow-desktop",
    "sanjiwani",
    1_477,
    735,
    "Időpontfoglaló felület masszőr-, dátum-, időtartam- és idősávválasztással.",
    "Booking interface with therapist, date, duration and time-slot selection.",
  ),
  diagram(
    "samsung-gate-flow",
    "samsung",
    960,
    320,
    "dark",
    "Koncepcionális kapuforgalmi folyamat a rendszám-ellenőrzés és a terhelési analitika kapcsolatáról.",
    "Conceptual gate-flow diagram connecting licence-plate verification with load analytics.",
  ),
  diagram(
    "adott-workflow",
    "adott",
    1_120,
    360,
    "light",
    "Az inquiry, specifikáció, ajánlat és projektátadás fő workflow-lépései.",
    "Main workflow stages from inquiry and specification to quote and project delivery.",
  ),
  diagram(
    "product-system-blueprint",
    "shared",
    1_120,
    560,
    "dark",
    "Három termékfelületet workflow-, 3D- és foglalási rendszerként összekapcsoló vizuális terv.",
    "Visual blueprint connecting three product interfaces as workflow, 3D and booking systems.",
  ),
] as const satisfies readonly ProjectMedia[];

export const projectMediaById = Object.freeze(
  Object.fromEntries(projectMedia.map((media) => [media.id, media])) as Record<
    ProjectMediaId,
    ProjectMedia
  >,
);

export function getProjectMedia(id: ProjectMediaId): ProjectMedia {
  return projectMediaById[id];
}

export function getProjectMediaSource(media: ProjectMedia): string {
  return media.kind === "diagram" ? media.sources.svg : media.sources.avif;
}
