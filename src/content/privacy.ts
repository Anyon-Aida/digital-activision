import type { Locale } from "@/i18n/routing";

type PrivacySection = {
  id: string;
  title: string;
  paragraphs: readonly string[];
  items?: readonly string[];
};

type PrivacySource = {
  label: string;
  href: string;
};

export type PrivacyContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  reviewTitle: string;
  reviewBody: string;
  sections: readonly PrivacySection[];
  sourcesTitle: string;
  sources: readonly PrivacySource[];
  homeLabel: string;
};

const sharedSources = {
  commission:
    "https://commission.europa.eu/law/law-topic/data-protection/information-individuals_en",
  naih: "https://www.naih.hu/erintetti-jogok",
  formspree: "https://formspree.io/legal/privacy-policy",
  vercel: "https://vercel.com/legal/privacy-policy",
  openStreetMap: "https://osmfoundation.org/wiki/Privacy_Policy",
} as const;

export const privacyContent = {
  hu: {
    metaTitle: "Adatkezelési tájékoztató | Kovács Zalán",
    metaDescription:
      "A Digital Activision portfólióoldal adatkezelési gyakorlatának közérthető, production előtti jogi ellenőrzésre váró összefoglalója.",
    eyebrow: "Adatvédelem",
    title: "Adatkezelési tájékoztató",
    intro:
      "Ez a tájékoztató bemutatja, milyen személyes adatok kerülhetnek kezelésre a portfólióoldal használata és a kapcsolatfelvétel során.",
    reviewTitle: "Production előtti jogi ellenőrzés szükséges",
    reviewBody:
      "Ez egy átláthatóságot szolgáló munkaváltozat, nem végleges jogi dokumentum. Az adatkezelő igazolt postai címét, vállalkozói vagy cégazonosító adatait, a végleges szolgáltatói listát és a pontos megőrzési időket a közzététel előtt jogi review keretében kell rögzíteni. Ezeket az adatokat a dokumentum szándékosan nem találja ki.",
    sections: [
      {
        id: "controller",
        title: "1. Adatkezelő és elérhetőség",
        paragraphs: [
          "Adatkezelő: Kovács Zalán / Digital Activision.",
          "Adatvédelmi megkeresés: digitalactivision@gmail.com.",
          "A postai cím és a nyilvántartási, adó- vagy cégazonosító jelenleg nincs igazolt formában a repositoryban; ezeket a production közzététel előtt pótolni kell.",
        ],
      },
      {
        id: "contact",
        title: "2. Kapcsolatfelvétel",
        paragraphs: [
          "A kapcsolatfelvételi űrlap a megadott nevet, e-mail-címet és üzenetet kezeli azért, hogy az adatkezelő válaszolhasson a megkeresésre és előkészíthesse az esetleges együttműködést.",
          "A tervezett jogalap a megkereső kérésére történő, szerződéskötést megelőző lépések megtétele, illetve szükség szerint a válaszadáshoz és a szolgáltatás biztonságához fűződő jogos érdek. A végleges jogalapot a folyamat és a szolgáltató véglegesítésekor jogilag ellenőrizni kell.",
        ],
      },
      {
        id: "current-delivery",
        title: "3. Az űrlap jelenlegi technikai útja",
        paragraphs: [
          "A jelenlegi felület a kapcsolatfelvételi adatokat közvetlenül a Formspree szolgáltatásnak továbbítja. A repository saját e-mail végpontot is tartalmaz, de a felület jelenleg nem azt használja. A V2 contact-hardening során egyetlen, dokumentált és validált feldolgozási út maradhat.",
          "A szolgáltatóváltással együtt ezt a tájékoztatót, az adatfeldolgozói szerződést, az adattovábbítás helyét és az alkalmazott garanciákat is felül kell vizsgálni.",
        ],
      },
      {
        id: "technical-data",
        title: "4. Technikai adatok és tárhely",
        paragraphs: [
          "A tárhely- és hálózati szolgáltató a webhely kiszolgálásakor technikai naplóadatokat kezelhet, például IP-címet, időpontot, kért útvonalat, böngésző- vagy eszközinformációt. A webhely Vercel környezetben fut; a tényleges naplózási beállításokat és megőrzési időket production előtt ellenőrizni kell.",
          "E technikai adatkezelés célja a biztonságos és megbízható működés, a hibakeresés és a visszaélések megelőzése.",
        ],
      },
      {
        id: "third-parties",
        title: "5. Külső szolgáltatók és beágyazott tartalom",
        paragraphs: [
          "A jelenlegi lábléc OpenStreetMap térképet ágyaz be. A beágyazás betöltésekor a látogató böngészője közvetlen kapcsolatot létesíthet az OpenStreetMap szolgáltatásával, amely technikai adatokat kaphat.",
          "A külső LinkedIn- és Instagram-linkek csak megnyitás után viszik a látogatót az adott szolgáltatóhoz. Az ottani adatkezelésre a szolgáltatók saját szabályai vonatkoznak.",
        ],
      },
      {
        id: "newsletter",
        title: "6. Hírlevél",
        paragraphs: [
          "A jelenlegi láblécben látható hírlevélmező nincs szerveroldali szolgáltatáshoz kötve: a beírt e-mail-címet a webhely nem továbbítja és nem menti el. A félreérthető próbafelületet a V2 migráció során el kell távolítani, vagy csak külön, dokumentált hozzájárulási és leiratkozási folyamattal szabad aktiválni.",
        ],
      },
      {
        id: "retention",
        title: "7. Megőrzés és címzettek",
        paragraphs: [
          "A kapcsolatfelvételi adatokat csak a megkeresés kezeléséhez, az esetleges együttműködés előkészítéséhez és a kapcsolódó jogi igények kezeléséhez szükséges ideig szabad megőrizni.",
          "A pontos határidőket, törlési folyamatot, hozzáférési köröket, adatfeldolgozókat és az EGT-n kívüli adattovábbítás esetleges garanciáit a production indulás előtt a tényleges konfiguráció alapján kell rögzíteni. A jelen munkaváltozat nem állít ellenőrizetlen megőrzési időt vagy adattovábbítási mechanizmust.",
        ],
      },
      {
        id: "rights",
        title: "8. Az érintett jogai",
        paragraphs: [
          "Az alkalmazandó feltételek szerint kérhető tájékoztatás és hozzáférés, helyesbítés, törlés, az adatkezelés korlátozása, adathordozhatóság, valamint tiltakozás. Hozzájáruláson alapuló adatkezelésnél a hozzájárulás visszavonható; ez nem érinti a korábbi adatkezelés jogszerűségét.",
          "A kérelmek a fenti e-mail-címre küldhetők. Panasz tehető a Nemzeti Adatvédelmi és Információszabadság Hatóságnál, és az érintett bírósághoz is fordulhat. A jogok gyakorlása az adott adatkezelés jogalapjától és körülményeitől függhet.",
        ],
      },
      {
        id: "cookies",
        title: "9. Cookie-k, analitika és automatizált döntés",
        paragraphs: [
          "A repository jelenlegi állapota nem tartalmaz külön marketing- vagy analitikai rendszert. Ha később analitika, marketing-cookie vagy hasonló mérés kerül bevezetésre, annak aktiválása előtt frissíteni kell a tájékoztatót és – ahol szükséges – valódi hozzájárulás-kezelést kell biztosítani.",
          "A webhely jelenleg nem végez profilalkotást vagy kizárólag automatizált döntéshozatalt.",
        ],
      },
      {
        id: "security-updates",
        title: "10. Biztonság és a tájékoztató változásai",
        paragraphs: [
          "Az adatkezelőnek megfelelő technikai és szervezési intézkedésekkel kell védenie az adatokat. A V2 megvalósítás része a validáció, a visszaélés elleni védelem, a titokmentes naplózás és a szükséges hozzáférés elve.",
          "A tájékoztatót minden olyan változáskor frissíteni kell, amely érinti az adatokat, a célokat, a jogalapot, a szolgáltatókat, a megőrzést vagy az érintetti jogok gyakorlását.",
        ],
      },
    ],
    sourcesTitle: "Hivatalos és szolgáltatói tájékoztatók",
    sources: [
      { label: "Európai Bizottság – adatvédelmi jogok", href: sharedSources.commission },
      { label: "NAIH – érintetti jogok", href: sharedSources.naih },
      { label: "Formspree – Privacy Policy", href: sharedSources.formspree },
      { label: "Vercel – Privacy Policy", href: sharedSources.vercel },
      { label: "OpenStreetMap Foundation – Privacy Policy", href: sharedSources.openStreetMap },
    ],
    homeLabel: "Vissza a főoldalra",
  },
  en: {
    metaTitle: "Privacy notice | Kovács Zalán",
    metaDescription:
      "A plain-language summary of the Digital Activision portfolio's data practices, pending final legal review before Production.",
    eyebrow: "Privacy",
    title: "Privacy notice",
    intro:
      "This notice explains which personal data may be processed when you use the portfolio website or submit a contact request.",
    reviewTitle: "Legal review required before Production",
    reviewBody:
      "This is a transparency-focused working draft, not a final legal document. The controller's verified postal address, business or company identifiers, final vendor list and exact retention periods must be added during legal review before publication. The document deliberately does not invent those details.",
    sections: [
      {
        id: "controller",
        title: "1. Controller and contact details",
        paragraphs: [
          "Controller: Kovács Zalán / Digital Activision.",
          "Privacy requests: digitalactivision@gmail.com.",
          "A verified postal address and registration, tax or company identifier are not currently present in the repository and must be supplied before Production publication.",
        ],
      },
      {
        id: "contact",
        title: "2. Contact requests",
        paragraphs: [
          "The contact form processes the name, email address and message you provide so the controller can answer your request and prepare a possible engagement.",
          "The intended legal basis is taking steps at your request before entering into a contract and, where necessary, legitimate interests in responding and keeping the service secure. The final legal basis must be reviewed when the process and provider are finalised.",
        ],
      },
      {
        id: "current-delivery",
        title: "3. Current technical delivery path",
        paragraphs: [
          "The current interface sends contact data directly to Formspree. The repository also contains its own email endpoint, but the interface does not currently use it. The V2 contact-hardening phase must leave one documented and validated processing path.",
          "Any provider change must trigger a review of this notice, the data-processing terms, the processing location and the safeguards used for transfers.",
        ],
      },
      {
        id: "technical-data",
        title: "4. Technical data and hosting",
        paragraphs: [
          "The hosting and network provider may process technical log data while serving the site, such as IP address, timestamp, requested path, browser or device information. The site runs on Vercel; actual logging settings and retention periods must be verified before Production.",
          "The purpose of this technical processing is reliable and secure operation, troubleshooting and abuse prevention.",
        ],
      },
      {
        id: "third-parties",
        title: "5. External services and embedded content",
        paragraphs: [
          "The current footer embeds an OpenStreetMap map. Loading the embed can make the visitor's browser connect directly to OpenStreetMap, which may receive technical data.",
          "External LinkedIn and Instagram links take visitors to those providers only after activation. Their own policies govern processing on those services.",
        ],
      },
      {
        id: "newsletter",
        title: "6. Newsletter",
        paragraphs: [
          "The newsletter field currently shown in the footer is not connected to a server-side service: the website does not transmit or store the entered email address. The misleading prototype must be removed during the V2 migration, or activated only with a separately documented consent and unsubscribe flow.",
        ],
      },
      {
        id: "retention",
        title: "7. Retention and recipients",
        paragraphs: [
          "Contact data may be retained only for as long as needed to handle the request, prepare a possible engagement and manage related legal claims.",
          "Exact periods, deletion procedures, access roles, processors and any safeguards for transfers outside the EEA must be recorded from the real Production configuration before launch. This working draft does not assert an unverified retention period or transfer mechanism.",
        ],
      },
      {
        id: "rights",
        title: "8. Your rights",
        paragraphs: [
          "Subject to the applicable conditions, you may request information and access, rectification, erasure, restriction, portability and may object to processing. Where processing relies on consent, consent may be withdrawn without affecting processing that was lawful before withdrawal.",
          "Requests can be sent to the email address above. You may lodge a complaint with the Hungarian National Authority for Data Protection and Freedom of Information (NAIH) and seek a judicial remedy. Available rights can depend on the legal basis and circumstances of the processing.",
        ],
      },
      {
        id: "cookies",
        title: "9. Cookies, analytics and automated decisions",
        paragraphs: [
          "The current repository does not include a dedicated marketing or analytics system. If analytics, marketing cookies or similar measurement are introduced later, this notice must be updated and genuine consent controls must be provided where required before activation.",
          "The website currently performs no profiling or solely automated decision-making.",
        ],
      },
      {
        id: "security-updates",
        title: "10. Security and updates to this notice",
        paragraphs: [
          "The controller must protect data with appropriate technical and organisational measures. V2 implementation includes validation, abuse protection, secret-free logging and least-necessary access.",
          "This notice must be updated whenever a change affects the data, purposes, legal basis, providers, retention or the way people can exercise their rights.",
        ],
      },
    ],
    sourcesTitle: "Official and provider notices",
    sources: [
      { label: "European Commission – data protection rights", href: sharedSources.commission },
      { label: "NAIH – data subject rights (Hungarian)", href: sharedSources.naih },
      { label: "Formspree – Privacy Policy", href: sharedSources.formspree },
      { label: "Vercel – Privacy Policy", href: sharedSources.vercel },
      { label: "OpenStreetMap Foundation – Privacy Policy", href: sharedSources.openStreetMap },
    ],
    homeLabel: "Back to the homepage",
  },
} satisfies Record<Locale, PrivacyContent>;
