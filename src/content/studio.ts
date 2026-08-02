import { z } from "zod";

const idSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const textSchema = z.string().trim().min(1);
const localPathSchema = z.string().startsWith("/");

const studioLocaleContentSchema = z
  .object({
    metaTitle: textSchema,
    metaDescription: textSchema,
    hero: z
      .object({
        eyebrow: textSchema,
        title: textSchema,
        description: textSchema,
        primaryAction: textSchema,
        secondaryAction: textSchema,
      })
      .strict(),
    servicesHeading: textSchema,
    servicesIntro: textSchema,
    services: z
      .array(
        z
          .object({
            id: idSchema,
            title: textSchema,
            description: textSchema,
            includes: z.array(textSchema).min(2).max(4),
          })
          .strict(),
      )
      .length(4),
    featuredHeading: textSchema,
    featuredIntro: textSchema,
    featuredWork: z
      .array(
        z
          .object({
            id: idSchema,
            title: textSchema,
            description: textSchema,
            href: localPathSchema,
            image: localPathSchema,
            alt: textSchema,
            imageWidth: z.number().int().positive(),
            imageHeight: z.number().int().positive(),
          })
          .strict(),
      )
      .length(2),
    experimentsHeading: textSchema,
    experimentsIntro: textSchema,
    experimentLabel: textSchema,
    experiments: z
      .array(
        z
          .object({
            id: idSchema,
            title: textSchema,
            description: textSchema,
            href: localPathSchema,
            image: localPathSchema,
            alt: textSchema,
          })
          .strict(),
      )
      .length(3),
    processHeading: textSchema,
    processIntro: textSchema,
    process: z
      .array(
        z
          .object({
            id: idSchema,
            title: textSchema,
            description: textSchema,
            output: textSchema,
          })
          .strict(),
      )
      .length(4),
    scope: z
      .object({
        eyebrow: textSchema,
        title: textSchema,
        description: textSchema,
        action: textSchema,
      })
      .strict(),
    contact: z
      .object({
        eyebrow: textSchema,
        title: textSchema,
        description: textSchema,
        action: textSchema,
        email: z.string().email(),
        href: z.string().startsWith("mailto:"),
        privacyNote: textSchema,
      })
      .strict(),
  })
  .strict();

const rawStudioContent = {
  hu: {
    metaTitle: "Digital Activision Studio – weboldalak és digitális termékek",
    metaDescription:
      "Weboldalak, UI-rendszerek és kisebb full-stack termékek tervezése és megvalósítása átlátható, scope-alapú együttműködésben.",
    hero: {
      eyebrow: "DIGITAL ACTIVISION STUDIO",
      title: "Digitális felületek, amelyeknek világos feladatuk van.",
      description:
        "Üzleti weboldalakat, UI-rendszereket és kisebb webalkalmazásokat tervezek és építek. A vizuális irányt, a működést és a technikai megvalósítást egy folyamatban tartom.",
      primaryAction: "Projekt egyeztetése",
      secondaryAction: "Mit készítek",
    },
    servicesHeading: "Mit készítek",
    servicesIntro:
      "Négy együttműködési terület, a célhoz és a meglévő technikai környezethez igazítva.",
    services: [
      {
        id: "digital-product",
        title: "Weboldal és digitális termék",
        description:
          "Új, reszponzív felület a tartalmi struktúrától a működő kiadásig.",
        includes: [
          "Információs architektúra és user flow",
          "Reszponzív UI",
          "Tartalom- és mérési alapok",
        ],
      },
      {
        id: "frontend-system",
        title: "UI-rendszer és frontend megvalósítás",
        description:
          "Konzisztens komponensrendszer összetett interakciókhoz és hosszú távú bővítéshez.",
        includes: [
          "Design tokenek és komponensek",
          "Akadálymentes interakciók",
          "Teljesítménytudatos megvalósítás",
        ],
      },
      {
        id: "full-stack-feature",
        title: "Full-stack funkció és integráció",
        description:
          "Felhasználói felület, validált üzleti logika, API és adatmodell egy összefüggő funkcióhoz.",
        includes: [
          "Űrlapok és workflowk",
          "REST API és integráció",
          "Adatmodell és jogosultság",
        ],
      },
      {
        id: "technical-support",
        title: "Audit, továbbfejlesztés és műszaki támogatás",
        description:
          "Meglévő felület vagy rendszer célzott felmérése, javítása és továbbépítése.",
        includes: [
          "UX- és technikai áttekintés",
          "Prioritásos fejlesztési terv",
          "Karbantartás és hibajavítás",
        ],
      },
    ],
    featuredHeading: "Kiemelt vizuális munkák",
    featuredIntro:
      "Két eltérő termékhelyzet: szolgáltatásfoglalás és böngészőben futó 3D konfiguráció.",
    featuredWork: [
      {
        id: "sanjiwani",
        title: "Sanjiwani – foglalási élmény",
        description:
          "Szolgáltatáskeresés, masszőr-, dátum- és idősávválasztás egy nyugodt márkafelületen.",
        href: "/work/sanjiwani-booking-experience",
        image:
          "/portfolio-v3/projects/sanjiwani/sanjiwani-booking-flow-desktop.webp",
        alt: "Időpontfoglaló felület masszőr-, dátum-, időtartam- és idősávválasztással.",
        imageWidth: 1477,
        imageHeight: 735,
      },
      {
        id: "alba",
        title: "Alba Medence – 3D konfigurátor",
        description:
          "Valós idejű 3D medencetervezés reszponzív opcióválasztással és ajánlatkérési átvezetéssel.",
        href: "/work/alba-medence-3d-configurator",
        image:
          "/portfolio-v3/projects/alba/alba-configurator-desktop.webp",
        alt: "Interaktív 3D medencekonfigurátor desktop nézetben, kiegészítőválasztó oldalsávval.",
        imageWidth: 1335,
        imageHeight: 746,
      },
    ],
    experimentsHeading: "Korábbi UI-kísérletek",
    experimentsIntro:
      "Kisebb, statikus demók vizuális irányok és frontend részletek kipróbálására.",
    experimentLabel: "UI-koncepció / prototípus",
    experiments: [
      {
        id: "burger",
        title: "Burger Shop",
        description: "Kontrasztos éttermi landing page prototípus.",
        href: "/projects/hamburger/index.html",
        image: "/projects/burgers.png",
        alt: "Burger Shop landing page prototípus előnézete.",
      },
      {
        id: "lion",
        title: "Lion Gym",
        description: "Sportmárka hero- és landing page kísérlet.",
        href: "/projects/boxer-hero/index.html",
        image: "/projects/lion.png",
        alt: "Lion Gym landing page prototípus előnézete.",
      },
      {
        id: "nati",
        title: "Nati",
        description: "Chatfelület és ügyfélszolgálati UI-koncepció.",
        href: "/projects/nati/index.html",
        image: "/projects/nati_chat.png",
        alt: "Nati chatfelület UI-koncepció előnézete.",
      },
    ],
    processHeading: "Együttműködés négy lépésben",
    processIntro:
      "Rövid döntési pontok, látható előrehaladás és review-olható szállítás.",
    process: [
      {
        id: "discovery",
        title: "Cél és kontextus",
        description:
          "Tisztázzuk a közönséget, az üzleti célt, a szükséges tartalmat és a technikai környezetet.",
        output: "Kimenet: rövid brief és prioritások",
      },
      {
        id: "direction",
        title: "Szerkezet és irány",
        description:
          "Felrajzolom a fő user flowkat, a felület szerkezetét és a vizuális rendszer alapjait.",
        output: "Kimenet: jóváhagyható terv és scope",
      },
      {
        id: "implementation",
        title: "Megvalósítás",
        description:
          "Kis, bemutatható egységekben készül a frontend, a szükséges backend és az integráció.",
        output: "Kimenet: folyamatosan review-olható Preview",
      },
      {
        id: "release",
        title: "QA és átadás",
        description:
          "Eszköz-, akadálymentességi és technikai ellenőrzés után dokumentált átadás következik.",
        output: "Kimenet: kiadási checklist és átadás",
      },
    ],
    scope: {
      eyebrow: "SCOPE-ALAPÚ EGYÜTTMŰKÖDÉS",
      title: "A megoldás mérete a feladathoz igazodik.",
      description:
        "A végleges scope, ütemezés és ár a célok, tartalom és szükséges integrációk alapján készül.",
      action: "Projekt egyeztetése",
    },
    contact: {
      eyebrow: "KAPCSOLAT",
      title: "Beszéljük át, mit kell megoldania a következő felületnek.",
      description:
        "Írj röviden a célról, a jelenlegi helyzetről és a fontos időzítésről e-mailben.",
      action: "E-mail írása",
      email: "digitalactivision@gmail.com",
      href: "mailto:digitalactivision@gmail.com?subject=Studio%20projekt",
      privacyNote:
        "Az e-mailben megadott adatokat kizárólag a megkeresés megválaszolásához használom.",
    },
  },
  en: {
    metaTitle: "Digital Activision Studio – websites and digital products",
    metaDescription:
      "Websites, UI systems and focused full-stack products designed and built through a transparent, scope-led collaboration.",
    hero: {
      eyebrow: "DIGITAL ACTIVISION STUDIO",
      title: "Digital experiences with a clear job to do.",
      description:
        "I design and build business websites, UI systems and focused web applications. Visual direction, product behaviour and technical delivery stay in one connected process.",
      primaryAction: "Discuss a project",
      secondaryAction: "What I build",
    },
    servicesHeading: "What I build",
    servicesIntro:
      "Four collaboration areas shaped around the goal and the existing technical environment.",
    services: [
      {
        id: "digital-product",
        title: "Website and digital product",
        description:
          "A new responsive experience, from content structure to a working release.",
        includes: [
          "Information architecture and user flow",
          "Responsive interface",
          "Content and measurement foundations",
        ],
      },
      {
        id: "frontend-system",
        title: "UI system and frontend delivery",
        description:
          "A consistent component system for complex interactions and long-term extension.",
        includes: [
          "Design tokens and components",
          "Accessible interaction",
          "Performance-aware implementation",
        ],
      },
      {
        id: "full-stack-feature",
        title: "Full-stack feature and integration",
        description:
          "Interface, validated business logic, API and data model for one connected feature.",
        includes: [
          "Forms and workflows",
          "REST API and integration",
          "Data model and permissions",
        ],
      },
      {
        id: "technical-support",
        title: "Audit, extension and technical support",
        description:
          "A focused assessment, repair and extension path for an existing product or website.",
        includes: [
          "UX and technical review",
          "Prioritised improvement plan",
          "Maintenance and issue resolution",
        ],
      },
    ],
    featuredHeading: "Selected visual work",
    featuredIntro:
      "Two different product contexts: service booking and browser-based 3D configuration.",
    featuredWork: [
      {
        id: "sanjiwani",
        title: "Sanjiwani – booking experience",
        description:
          "Service discovery plus therapist, date and time-slot selection in a calm brand experience.",
        href: "/work/sanjiwani-booking-experience",
        image:
          "/portfolio-v3/projects/sanjiwani/sanjiwani-booking-flow-desktop.webp",
        alt: "Booking interface with therapist, date, duration and time-slot selection.",
        imageWidth: 1477,
        imageHeight: 735,
      },
      {
        id: "alba",
        title: "Alba Medence – 3D configurator",
        description:
          "Real-time 3D pool planning with responsive option controls and a quote-request hand-off.",
        href: "/work/alba-medence-3d-configurator",
        image:
          "/portfolio-v3/projects/alba/alba-configurator-desktop.webp",
        alt: "Interactive 3D pool configurator on desktop with an options sidebar.",
        imageWidth: 1335,
        imageHeight: 746,
      },
    ],
    experimentsHeading: "Earlier UI experiments",
    experimentsIntro:
      "Small static demos used to explore visual directions and frontend details.",
    experimentLabel: "UI concept / prototype",
    experiments: [
      {
        id: "burger",
        title: "Burger Shop",
        description: "A high-contrast restaurant landing-page prototype.",
        href: "/projects/hamburger/index.html",
        image: "/projects/burgers.png",
        alt: "Burger Shop landing-page prototype preview.",
      },
      {
        id: "lion",
        title: "Lion Gym",
        description: "A sports-brand hero and landing-page experiment.",
        href: "/projects/boxer-hero/index.html",
        image: "/projects/lion.png",
        alt: "Lion Gym landing-page prototype preview.",
      },
      {
        id: "nati",
        title: "Nati",
        description: "A chat and customer-support interface concept.",
        href: "/projects/nati/index.html",
        image: "/projects/nati_chat.png",
        alt: "Nati chat interface concept preview.",
      },
    ],
    processHeading: "A four-step collaboration",
    processIntro:
      "Short decision points, visible progress and reviewable delivery.",
    process: [
      {
        id: "discovery",
        title: "Goal and context",
        description:
          "We clarify the audience, business goal, required content and technical environment.",
        output: "Output: concise brief and priorities",
      },
      {
        id: "direction",
        title: "Structure and direction",
        description:
          "I map the key user flows, interface structure and foundations of the visual system.",
        output: "Output: an approvable plan and scope",
      },
      {
        id: "implementation",
        title: "Implementation",
        description:
          "Frontend, required backend and integrations are delivered in small, demonstrable units.",
        output: "Output: continuously reviewable Preview",
      },
      {
        id: "release",
        title: "QA and handover",
        description:
          "Device, accessibility and technical checks lead into a documented handover.",
        output: "Output: release checklist and handover",
      },
    ],
    scope: {
      eyebrow: "SCOPE-LED COLLABORATION",
      title: "The solution is sized around the job.",
      description:
        "Final scope, timing and price are based on the goals, content and integrations required.",
      action: "Discuss a project",
    },
    contact: {
      eyebrow: "CONTACT",
      title: "Let’s discuss what the next experience needs to solve.",
      description:
        "Send a short email with the goal, current context and important timing.",
      action: "Write an email",
      email: "digitalactivision@gmail.com",
      href: "mailto:digitalactivision@gmail.com?subject=Studio%20project",
      privacyNote:
        "Information shared by email is used only to respond to the enquiry.",
    },
  },
} as const;

export const studioContentSchema = z
  .object({
    hu: studioLocaleContentSchema,
    en: studioLocaleContentSchema,
  })
  .strict()
  .superRefine((content, context) => {
    for (const key of [
      "services",
      "featuredWork",
      "experiments",
      "process",
    ] as const) {
      const huIds = content.hu[key].map(({ id }) => id);
      const enIds = content.en[key].map(({ id }) => id);

      if (JSON.stringify(huIds) !== JSON.stringify(enIds)) {
        context.addIssue({
          code: "custom",
          path: ["en", key],
          message: `${key} topology must match across locales.`,
        });
      }
    }
  });

export const studioContent = studioContentSchema.parse(rawStudioContent);
export type StudioLocaleContent = z.infer<typeof studioLocaleContentSchema>;
