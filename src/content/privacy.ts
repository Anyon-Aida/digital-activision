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
  vercel: "https://vercel.com/legal/privacy-notice",
  cloudflare: "https://www.cloudflare.com/privacypolicy/",
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
          "A postai címet és a vonatkozó nyilvántartási, adó- vagy cégazonosítót a production közzététel előtt kell feltüntetni.",
        ],
      },
      {
        id: "contact",
        title: "2. Kapcsolatfelvétel",
        paragraphs: [
          "A kapcsolatfelvételi űrlap a megadott nevet, e-mail-címet, témakört, üzenetet és a választott nyelvet kezeli azért, hogy az adatkezelő válaszolhasson a megkeresésre és előkészíthesse az esetleges együttműködést.",
          "Az elküldéshez kötelező adatkezelési jelölőnégyzet rögzíti, hogy a megkereső elolvasta a tájékoztatót és hozzájárul az üzenete kezeléséhez. A hozzájárulás jelzése is bekerül a kérésbe. Annak jogi felülvizsgálata még szükséges, hogy az egyes megkereséseknél a hozzájárulás, a szerződéskötést megelőző lépések vagy más jogalap alkalmazandó-e.",
        ],
      },
      {
        id: "current-delivery",
        title: "3. Saját kapcsolatfelvételi folyamat",
        paragraphs: [
          "A böngésző a kapcsolatfelvételi adatokat az oldal azonos eredetű, saját /api/contact végpontjára küldi. A végpont korlátozza a kérés méretét, ellenőrzi az eredetet és a mezőket, majd a konfigurált SMTP-kiszolgálón keresztül továbbítja a nevet, e-mail-címet, témakört, nyelvet, üzenetet és egy technikai kérésazonosítót a konfigurált címzett postaládájába.",
          "Az alkalmazás kódja nem írja az űrlap tartalmát saját adatbázisba. Az e-mail-szolgáltató és a címzett postaládája ugyanakkor a saját, ténylegesen beállított megőrzési szabályai szerint kezelheti a továbbított üzenetet. Hiányos konfiguráció esetén a végpont nem küld üzenetet, hanem zárt állapotban marad.",
        ],
      },
      {
        id: "technical-data",
        title: "4. Visszaélés-megelőzési és naplóadatok",
        paragraphs: [
          "Az űrlap egy rejtett csalimezőt, a kitöltés kezdetének időpontját és – ha a környezetben aktiválva van – Cloudflare Turnstile tokent küld a visszaélések kiszűréséhez. A szerver a kérés IP-címéből titkos kulccsal HMAC-azonosítót képez a gyakoriságkorlátozáshoz; a kapcsolatfelvételi alkalmazásnapló nem rögzíti a nyers IP-címet, a nevet, az e-mail-címet vagy az üzenetet.",
          "A strukturált alkalmazásnapló csak technikai kérésazonosítót, környezetet, futási időt, eseményt és szükség esetén általános hibaokot tartalmaz. A Vercel tárhely- és hálózati rétege ettől függetlenül kezelhet IP-címet és más technikai kérésadatokat; a tényleges production naplózási és megőrzési beállításokat indulás előtt ellenőrizni kell.",
        ],
      },
      {
        id: "third-parties",
        title: "5. Feltételes szolgáltatók és címzettek",
        paragraphs: [
          "A webhely Vercel környezetben fut. Az űrlap bekapcsolásakor a konfigurált SMTP-szolgáltató kézbesíti az üzenetet. Preview és production környezetben egy konfigurált külső, elosztott rate limiter kapja meg a HMAC-azonosítót, a korlátot, az időablakot és a technikai kérésazonosítót; az űrlap tartalma nem kerül ebbe a kérésbe.",
          "Ha a kapcsolatfelvételi folyamat preview vagy production környezetben engedélyezett, a visszaélés elleni ellenőrzés Cloudflare Turnstile-t használ. Aktivált kliensoldali widget esetén a böngésző közvetlenül is kapcsolatba léphet a Cloudflare-rel, a szerver pedig a tokent a Cloudflare ellenőrző végpontján validálja. Az alkalmazott SMTP- és rate-limit szolgáltató nevét, szerződéses szerepét, feldolgozási helyét és adattovábbítási garanciáit a production konfiguráció alapján kell a közzététel előtt megnevezni.",
        ],
      },
      {
        id: "hosting-links",
        title: "6. Tárhely és külső hivatkozások",
        paragraphs: [
          "A tárhely- és hálózati szolgáltató a webhely kiszolgálásakor technikai adatokat kezelhet, például IP-címet, időpontot, kért útvonalat, böngésző- vagy eszközinformációt. Ennek célja a biztonságos és megbízható működés, a hibakeresés és a visszaélések megelőzése.",
          "A külső GitHub- és LinkedIn-hivatkozások csak megnyitás után viszik a látogatót az adott szolgáltatóhoz. Az ottani adatkezelésre a szolgáltatók saját szabályai vonatkoznak.",
        ],
      },
      {
        id: "retention",
        title: "7. Megőrzés és címzettek",
        paragraphs: [
          "A kapcsolatfelvételi adatokat csak a megkeresés kezeléséhez, az esetleges együttműködés előkészítéséhez és a kapcsolódó jogi igények kezeléséhez szükséges ideig szabad megőrizni. Az üzenet a kézbesítés után a címzett postaládájában, valamint a tényleges SMTP-szolgáltató rendszerében annak beállításai szerint maradhat meg.",
          "A pontos határidők, törlési folyamatok, hozzáférési körök, a Vercel naplóinak megőrzése, a külső rate limiter adatkezelése, az SMTP-szolgáltató és az EGT-n kívüli adattovábbítás esetleges garanciái még nincsenek igazolva. Ezeket a production indulás előtt a tényleges konfiguráció alapján kell rögzíteni; a jelen munkaváltozat nem állít ellenőrizetlen időtartamot vagy adattovábbítási mechanizmust.",
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
          "Az oldal jelenleg nem használ külön marketing- vagy analitikai rendszert. Ha később analitika, marketing-cookie vagy hasonló mérés kerül bevezetésre, annak aktiválása előtt frissíteni kell a tájékoztatót és – ahol szükséges – valódi hozzájárulás-kezelést kell biztosítani.",
          "A webhely jelenleg nem végez profilalkotást vagy kizárólag automatizált döntéshozatalt.",
        ],
      },
      {
        id: "security-updates",
        title: "10. Biztonság és a tájékoztató változásai",
        paragraphs: [
          "Az adatkezelőnek megfelelő technikai és szervezési intézkedésekkel kell védenie az adatokat. A megvalósítás szerveroldali sémavalidációt, méret- és eredetellenőrzést, gyakoriságkorlátozást, feltételes botvédelmet, személyesadat-mentes alkalmazásnaplózást és hiányos konfigurációnál zárt működést használ.",
          "A tájékoztatót minden olyan változáskor frissíteni kell, amely érinti az adatokat, a célokat, a jogalapot, a szolgáltatókat, a megőrzést vagy az érintetti jogok gyakorlását.",
        ],
      },
    ],
    sourcesTitle: "Hivatalos és szolgáltatói tájékoztatók",
    sources: [
      { label: "Európai Bizottság – adatvédelmi jogok", href: sharedSources.commission },
      { label: "NAIH – érintetti jogok", href: sharedSources.naih },
      { label: "Vercel – Privacy Notice", href: sharedSources.vercel },
      { label: "Cloudflare – Privacy Policy", href: sharedSources.cloudflare },
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
          "A postal address and the applicable registration, tax or company identifier must be supplied before Production publication.",
        ],
      },
      {
        id: "contact",
        title: "2. Contact requests",
        paragraphs: [
          "The contact form processes the name, email address, topic, message and selected language you provide so the controller can answer your request and prepare a possible engagement.",
          "A required privacy checkbox records that the sender has read this notice and consents to the handling of the message; that consent signal is included in the request. Legal review is still required to determine whether consent, steps requested before entering into a contract, or another legal basis applies to each type of request.",
        ],
      },
      {
        id: "current-delivery",
        title: "3. First-party contact flow",
        paragraphs: [
          "The browser sends contact data to the site's same-origin, first-party /api/contact endpoint. The endpoint limits request size, validates the origin and fields, then uses the configured SMTP server to deliver the name, email address, topic, language, message and a technical request identifier to the configured recipient mailbox.",
          "The application code does not write the form content to its own database. The email provider and recipient mailbox may nevertheless handle the delivered message according to their actual retention settings. If configuration is incomplete, the endpoint fails closed and does not send a message.",
        ],
      },
      {
        id: "technical-data",
        title: "4. Abuse-prevention and log data",
        paragraphs: [
          "For abuse prevention, the form sends a hidden honeypot field, the time at which completion started and, when enabled in the environment, a Cloudflare Turnstile token. The server derives a secret-keyed HMAC identifier from the request IP address for rate limiting; the contact application's logs do not record the raw IP address, name, email address or message.",
          "Structured application logs contain only a technical request identifier, environment, duration, event and, where needed, a general failure reason. Independently, Vercel's hosting and network layer may process the IP address and other technical request data; the actual Production logging and retention settings must be verified before launch.",
        ],
      },
      {
        id: "third-parties",
        title: "5. Conditional providers and recipients",
        paragraphs: [
          "The site runs on Vercel. When the form is enabled, the configured SMTP provider delivers the message. In Preview and Production, a configured external distributed rate limiter receives the HMAC identifier, limit, time window and technical request identifier; the form content is not included in that request.",
          "When the contact flow is enabled in Preview or Production, it uses Cloudflare Turnstile for abuse checks. When its client widget is enabled, the browser may connect directly to Cloudflare, and the server validates the token with Cloudflare's verification endpoint. The SMTP and rate-limit providers, their contractual roles, processing locations and transfer safeguards must be documented from the Production configuration before publication.",
        ],
      },
      {
        id: "hosting-links",
        title: "6. Hosting and external links",
        paragraphs: [
          "The hosting and network provider may process technical data while serving the site, such as IP address, timestamp, requested path, browser or device information. The purpose is reliable and secure operation, troubleshooting and abuse prevention.",
          "External GitHub and LinkedIn links take visitors to those providers only after activation. Their own policies govern processing on those services.",
        ],
      },
      {
        id: "retention",
        title: "7. Retention and recipients",
        paragraphs: [
          "Contact data may be retained only for as long as needed to handle the request, prepare a possible engagement and manage related legal claims. After delivery, the message may remain in the recipient mailbox and in the actual SMTP provider's systems according to their settings.",
          "Exact periods, deletion procedures, access roles, Vercel log retention, external rate-limiter processing, the SMTP provider and any safeguards for transfers outside the EEA have not yet been verified. They must be recorded from the real Production configuration before launch; this working draft does not assert an unverified duration or transfer mechanism.",
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
          "The site currently does not use a dedicated marketing or analytics system. If analytics, marketing cookies or similar measurement are introduced later, this notice must be updated and genuine consent controls must be provided where required before activation.",
          "The website currently performs no profiling or solely automated decision-making.",
        ],
      },
      {
        id: "security-updates",
        title: "10. Security and updates to this notice",
        paragraphs: [
          "The controller must protect data with appropriate technical and organisational measures. The implementation uses server-side schema validation, size and origin checks, rate limiting, conditional bot protection, personal-data-free application logging and fail-closed behaviour when configuration is incomplete.",
          "This notice must be updated whenever a change affects the data, purposes, legal basis, providers, retention or the way people can exercise their rights.",
        ],
      },
    ],
    sourcesTitle: "Official and provider notices",
    sources: [
      { label: "European Commission – data protection rights", href: sharedSources.commission },
      { label: "NAIH – data subject rights (Hungarian)", href: sharedSources.naih },
      { label: "Vercel – Privacy Notice", href: sharedSources.vercel },
      { label: "Cloudflare – Privacy Policy", href: sharedSources.cloudflare },
    ],
    homeLabel: "Back to the homepage",
  },
} satisfies Record<Locale, PrivacyContent>;
