import { z } from "zod";
import type { Locale } from "@/i18n/routing";

const locales = ["hu", "en"] as const;
const nonEmptyText = z.string().trim().min(1);
const localizedTextSchema = z
  .object({ hu: nonEmptyText, en: nonEmptyText })
  .strict();
const categorySchema = z.enum([
  "client",
  "server",
  "data",
  "security",
  "operations",
]);
const viewIdSchema = z.enum([
  "validated-request",
  "approval-workflow",
  "offline-sync",
]);
const roleIdSchema = z.enum([
  "admin",
  "manager",
  "engineer",
  "guest-customer",
]);
const actionIdSchema = z.enum([
  "project-view",
  "structure-edit",
  "comment",
  "approve-task",
  "approve-module",
  "approve-spec",
  "reject-with-reason",
  "audit-view",
]);

const architectureNodeSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    label: localizedTextSchema,
    category: categorySchema,
    summary: localizedTextSchema,
    responsibilities: z.array(localizedTextSchema).min(1),
    flow: localizedTextSchema,
    security: localizedTextSchema,
    reliability: localizedTextSchema,
    position: z
      .object({
        x: z.number().min(8).max(92),
        y: z.number().min(12).max(88),
      })
      .strict(),
  })
  .strict();

const architectureEdgeSchema = z
  .object({
    from: nonEmptyText,
    to: nonEmptyText,
    protocol: nonEmptyText,
    label: localizedTextSchema,
  })
  .strict();

const architectureViewSchema = z
  .object({
    id: viewIdSchema,
    label: localizedTextSchema,
    summary: localizedTextSchema,
    disclosure: localizedTextSchema,
    nodes: z.array(architectureNodeSchema).min(3),
    edges: z.array(architectureEdgeSchema).min(2),
  })
  .strict()
  .superRefine((view, context) => {
    const nodeIds = view.nodes.map(({ id }) => id);
    const nodeIdSet = new Set(nodeIds);

    if (nodeIdSet.size !== nodeIds.length) {
      context.addIssue({
        code: "custom",
        message: "Architecture node ids must be unique within a view",
        path: ["nodes"],
      });
    }

    view.edges.forEach((edge, index) => {
      if (!nodeIdSet.has(edge.from) || !nodeIdSet.has(edge.to)) {
        context.addIssue({
          code: "custom",
          message: "Architecture edges must reference existing nodes",
          path: ["edges", index],
        });
      }

      if (edge.from === edge.to) {
        context.addIssue({
          code: "custom",
          message: "Architecture edges cannot point to the same node",
          path: ["edges", index],
        });
      }
    });
  });

const roleSchema = z
  .object({ id: roleIdSchema, label: localizedTextSchema })
  .strict();

const permissionActionSchema = z
  .object({
    id: actionIdSchema,
    label: localizedTextSchema,
    description: localizedTextSchema,
    allowedRoles: z.array(roleIdSchema).min(1),
  })
  .strict();

const labSourceSchema = z
  .object({
    status: z.literal("conceptual-demonstration"),
    metadata: z
      .object({ title: localizedTextSchema, description: localizedTextSchema })
      .strict(),
    hero: z
      .object({
        eyebrow: localizedTextSchema,
        title: localizedTextSchema,
        description: localizedTextSchema,
        disclosure: localizedTextSchema,
        demoLabel: localizedTextSchema,
      })
      .strict(),
    architecture: z
      .object({
        eyebrow: localizedTextSchema,
        title: localizedTextSchema,
        description: localizedTextSchema,
        viewSelectorLabel: localizedTextSchema,
        nodeSelectorLabel: localizedTextSchema,
        selectedNodeLabel: localizedTextSchema,
        fallbackTitle: localizedTextSchema,
        fallbackSummary: localizedTextSchema,
        edgeListTitle: localizedTextSchema,
        panelLabels: z
          .object({
            responsibilities: localizedTextSchema,
            flow: localizedTextSchema,
            security: localizedTextSchema,
            reliability: localizedTextSchema,
          })
          .strict(),
        categoryLabels: z
          .object({
            client: localizedTextSchema,
            server: localizedTextSchema,
            data: localizedTextSchema,
            security: localizedTextSchema,
            operations: localizedTextSchema,
          })
          .strict(),
        views: z.array(architectureViewSchema).length(3),
      })
      .strict(),
    permissions: z
      .object({
        eyebrow: localizedTextSchema,
        title: localizedTextSchema,
        description: localizedTextSchema,
        disclosure: localizedTextSchema,
        roleSelectorLabel: localizedTextSchema,
        selectedRoleLabel: localizedTextSchema,
        allowedLabel: localizedTextSchema,
        deniedLabel: localizedTextSchema,
        fullMatrixTitle: localizedTextSchema,
        actionHeader: localizedTextSchema,
        roles: z.array(roleSchema).length(4),
        actions: z.array(permissionActionSchema).length(8),
      })
      .strict(),
    apiContract: z
      .object({
        eyebrow: localizedTextSchema,
        title: localizedTextSchema,
        description: localizedTextSchema,
        disclosure: localizedTextSchema,
        endpointLabel: localizedTextSchema,
        endpoint: nonEmptyText,
        requestLabel: localizedTextSchema,
        requestExample: nonEmptyText,
        responseLabel: localizedTextSchema,
        responseExample: nonEmptyText,
        errorTitle: localizedTextSchema,
        errors: z
          .array(
            z
              .object({
                status: z.number().int().min(400).max(599),
                label: localizedTextSchema,
              })
              .strict(),
          )
          .min(1),
        notes: z.array(localizedTextSchema).min(1),
      })
      .strict(),
  })
  .strict()
  .superRefine((source, context) => {
    const viewIds = source.architecture.views.map(({ id }) => id);
    const roleIds = source.permissions.roles.map(({ id }) => id);
    const actionIds = source.permissions.actions.map(({ id }) => id);

    for (const [path, ids] of [
      ["architecture.views", viewIds],
      ["permissions.roles", roleIds],
      ["permissions.actions", actionIds],
    ] as const) {
      if (new Set(ids).size !== ids.length) {
        context.addIssue({
          code: "custom",
          message: `${path} must contain unique ids`,
          path: path.split("."),
        });
      }
    }

    const knownRoles = new Set(roleIds);
    source.permissions.actions.forEach((action, index) => {
      if (new Set(action.allowedRoles).size !== action.allowedRoles.length) {
        context.addIssue({
          code: "custom",
          message: "Permission roles must not be duplicated",
          path: ["permissions", "actions", index, "allowedRoles"],
        });
      }

      if (action.allowedRoles.some((role) => !knownRoles.has(role))) {
        context.addIssue({
          code: "custom",
          message: "Permission actions must reference declared roles",
          path: ["permissions", "actions", index, "allowedRoles"],
        });
      }
    });
  });

const text = (hu: string, en: string) => ({ hu, en });

const rawLabSource = {
  status: "conceptual-demonstration",
  metadata: {
    title: text("Engineering Lab | Kovács Zalán", "Engineering Lab | Kovács Zalán"),
    description: text(
      "Hozzáférhető, koncepcionális architektúra-, jogosultság- és API-contract demonstrációk, valós production állítások nélkül.",
      "Accessible conceptual demonstrations of architecture, permissions and API contracts without claiming a production implementation.",
    ),
  },
  hero: {
    eyebrow: text("Engineering Lab", "Engineering Lab"),
    title: text(
      "Rendszerhatárok, amelyeket végig lehet követni",
      "System boundaries you can inspect end to end",
    ),
    description: text(
      "Három rövid nézet mutatja be a request-validációt, egy többszereplős approval workflow-t és egy offline szinkronizációs mintát. Minden elem adatvezérelt és billentyűzettel is használható.",
      "Three compact views cover request validation, a multi-role approval workflow and an offline synchronization pattern. Every element is data-driven and keyboard accessible.",
    ),
    disclosure: text(
      "A Lab elemei oktatási célú, szintetikus és anonimizált demonstrációk. Nem production topológiák, endpointok, jogosultságok vagy teljesítménymérések.",
      "Lab items are synthetic, anonymized demonstrations for explanation. They are not production topologies, endpoints, permission policies or performance measurements.",
    ),
    demoLabel: text("Koncepcionális demonstráció", "Conceptual demonstration"),
  },
  architecture: {
    eyebrow: text("Interactive Architecture Explorer", "Interactive Architecture Explorer"),
    title: text("Három rendszerfolyam, közös felelősségi elvekkel", "Three system flows with shared responsibility principles"),
    description: text(
      "Válassz nézetet és csomópontot. A részletező panel külön mutatja a felelősséget, adatfolyamot, security-határt és reliability szempontot.",
      "Choose a view and a node. The detail panel separates responsibility, data flow, the security boundary and the reliability concern.",
    ),
    viewSelectorLabel: text("Architektúranézet kiválasztása", "Select an architecture view"),
    nodeSelectorLabel: text("Csomópont kiválasztása", "Select a node"),
    selectedNodeLabel: text("Kiválasztott rendszerhatár", "Selected system boundary"),
    fallbackTitle: text("Teljes szöveges architektúranézet", "Complete architecture text view"),
    fallbackSummary: text(
      "A csomópontok és kapcsolatok JavaScript nélkül is olvashatók.",
      "Nodes and connections remain readable without JavaScript.",
    ),
    edgeListTitle: text("Kapcsolatok és protokollok", "Connections and protocols"),
    panelLabels: {
      responsibilities: text("Felelősség", "Responsibility"),
      flow: text("Adatfolyam", "Flow"),
      security: text("Security", "Security"),
      reliability: text("Reliability", "Reliability"),
    },
    categoryLabels: {
      client: text("Kliens", "Client"),
      server: text("Szerver", "Server"),
      data: text("Adat", "Data"),
      security: text("Biztonság", "Security"),
      operations: text("Üzemeltetés", "Operations"),
    },
    views: [
      {
        id: "validated-request",
        label: text("Validált request", "Validated request"),
        summary: text(
          "Egy felhasználói művelet útja az akadálymentes UI-tól az auditálható állapotváltozásig.",
          "A user action from an accessible interface to an auditable state transition.",
        ),
        disclosure: text(
          "Technológiasemleges referenciafolyam; nem egy konkrét production rendszer rajza.",
          "A technology-neutral reference flow, not a diagram of a specific production system.",
        ),
        nodes: [
          {
            id: "accessible-ui",
            label: text("Hozzáférhető UI", "Accessible UI"),
            category: "client",
            summary: text("Szemantikus interakció", "Semantic interaction"),
            responsibilities: [
              text("Kliensoldali mezőállapot és érthető hibajelzés.", "Client-side field state and understandable error feedback."),
            ],
            flow: text("A felhasználói szándék strukturált requestté alakul.", "User intent becomes a structured request."),
            security: text("A kliensvalidáció UX, nem biztonsági határ.", "Client validation is UX, not a security boundary."),
            reliability: text("A megszakadt küldés újrapróbálható, duplikáció nélkül.", "Interrupted submission can be retried without accidental duplication."),
            position: { x: 10, y: 25 },
          },
          {
            id: "render-boundary",
            label: text("Next.js boundary", "Next.js boundary"),
            category: "server",
            summary: text("Render és adatbetöltés", "Rendering and data loading"),
            responsibilities: [
              text("Server- és client-felelősség explicit elválasztása.", "Explicit separation of server and client responsibilities."),
            ],
            flow: text("A request a publikus route contractjához érkezik.", "The request reaches the public route contract."),
            security: text("Secret és privileged adat nem kerül client bundle-be.", "Secrets and privileged data do not enter the client bundle."),
            reliability: text("A renderelési hiba izolált boundaryn kezelhető.", "Rendering failures can be handled at an isolated boundary."),
            position: { x: 28, y: 25 },
          },
          {
            id: "validation-boundary",
            label: text("Validált API", "Validated API"),
            category: "server",
            summary: text("Típusos bemeneti contract", "Typed input contract"),
            responsibilities: [
              text("Parse, normalizálás, méretkorlát és stabil hibaválasz.", "Parsing, normalization, size limits and stable error responses."),
            ],
            flow: text("Csak validált adat halad az üzleti szolgáltatás felé.", "Only validated data proceeds to the domain service."),
            security: text("A szerver minden nem megbízható inputot újra ellenőriz.", "The server revalidates every untrusted input."),
            reliability: text("A hibák determinisztikus státusz- és hibakódot kapnak.", "Failures receive deterministic statuses and error codes."),
            position: { x: 46, y: 25 },
          },
          {
            id: "authorization-policy",
            label: text("Authorization policy", "Authorization policy"),
            category: "security",
            summary: text("Műveletszintű döntés", "Action-level decision"),
            responsibilities: [
              text("Identity, erőforrás és művelet összevetése.", "Evaluate identity, resource and requested action."),
            ],
            flow: text("Az engedélyezett parancs kap további feldolgozást.", "Only an authorized command continues."),
            security: text("A UI-ban látható gomb nem helyettesíti a backend enforcementet.", "A visible UI control never replaces backend enforcement."),
            reliability: text("A policy-döntés naplózható, de érzékeny adat nélkül.", "Policy decisions can be logged without sensitive payloads."),
            position: { x: 64, y: 25 },
          },
          {
            id: "domain-service",
            label: text("Domain service", "Domain service"),
            category: "server",
            summary: text("Üzleti invariánsok", "Business invariants"),
            responsibilities: [
              text("Workflow-szabály és konzisztens állapotátmenet.", "Workflow rules and consistent state transitions."),
            ],
            flow: text("A parancs tranzakciós módosítássá válik.", "The command becomes a transactional change."),
            security: text("Az erőforrásszintű jogosultság itt is érvényesül.", "Resource-level authorization remains enforced here."),
            reliability: text("Idempotency vagy verzióellenőrzés védi az ismétléstől.", "Idempotency or version checks protect against repetition."),
            position: { x: 82, y: 25 },
          },
          {
            id: "durable-state",
            label: text("Tartós adat", "Durable state"),
            category: "data",
            summary: text("Tranzakció és migráció", "Transactions and migrations"),
            responsibilities: [
              text("Konzisztens mentés és explicit sémaváltozás.", "Consistent persistence and explicit schema change."),
            ],
            flow: text("Az elfogadott állapot és audit-esemény tartósan rögzül.", "The accepted state and audit event are persisted."),
            security: text("Least-privilege adatbázis-hozzáférés és minimalizált mezők.", "Least-privilege database access and minimized fields."),
            reliability: text("Tranzakció, constraint és helyreállítási terv védi az adatot.", "Transactions, constraints and a recovery plan protect the data."),
            position: { x: 68, y: 72 },
          },
          {
            id: "safe-telemetry",
            label: text("Safe telemetry", "Safe telemetry"),
            category: "operations",
            summary: text("Korrelált, PII-mentes jel", "Correlated PII-free signal"),
            responsibilities: [
              text("Request ID, státusz és időzítés gyűjtése payload nélkül.", "Capture request ID, status and timing without payloads."),
            ],
            flow: text("A feldolgozási eredmény operációs jelként jelenik meg.", "The processing outcome becomes an operational signal."),
            security: text("Secret, token és személyes tartalom nem kerül logba.", "Secrets, tokens and personal content never enter logs."),
            reliability: text("A telemetry hibája nem blokkolja az üzleti tranzakciót.", "Telemetry failure does not block the business transaction."),
            position: { x: 88, y: 72 },
          },
        ],
        edges: [
          { from: "accessible-ui", to: "render-boundary", protocol: "HTTPS", label: text("felhasználói művelet", "user action") },
          { from: "render-boundary", to: "validation-boundary", protocol: "typed request", label: text("request contract", "request contract") },
          { from: "validation-boundary", to: "authorization-policy", protocol: "server call", label: text("validált parancs", "validated command") },
          { from: "authorization-policy", to: "domain-service", protocol: "policy result", label: text("engedélyezett művelet", "authorized action") },
          { from: "domain-service", to: "durable-state", protocol: "transaction", label: text("állapotváltozás", "state transition") },
          { from: "domain-service", to: "safe-telemetry", protocol: "structured event", label: text("működési jel", "operational signal") },
        ],
      },
      {
        id: "approval-workflow",
        label: text("Approval workflow", "Approval workflow"),
        summary: text(
          "Anonimizált többszereplős review és approval minta explicit policy- és audit-határral.",
          "An anonymized multi-role review and approval pattern with explicit policy and audit boundaries.",
        ),
        disclosure: text(
          "A szerepkörök és jogosultságok szemléltető policy-t alkotnak; nem reprodukálnak ügyfélrendszert.",
          "Roles and permissions form an illustrative policy and do not reproduce a client system.",
        ),
        nodes: [
          {
            id: "role-workspace",
            label: text("Szerepkörös workspace", "Role-aware workspace"),
            category: "client",
            summary: text("Kontextushoz igazított UI", "Context-aware UI"),
            responsibilities: [text("A releváns műveletek és állapotok érthető megjelenítése.", "Present relevant actions and states clearly.")],
            flow: text("A felhasználó review- vagy döntési szándékot küld.", "The user submits a review or decision intent."),
            security: text("A rejtett gomb nem jogosultsági védelem.", "A hidden button is not authorization protection."),
            reliability: text("A kliens megőrzi az indoklást sikertelen küldéskor.", "The client preserves a reason when submission fails."),
            position: { x: 12, y: 25 },
          },
          {
            id: "token-identity",
            label: text("Token identity", "Token identity"),
            category: "security",
            summary: text("Hitelesített szereplő", "Authenticated actor"),
            responsibilities: [text("Érvényes identity-context létrehozása.", "Establish a valid identity context.")],
            flow: text("A tokenből ellenőrzött actor azonosító lesz.", "A token becomes a verified actor identifier."),
            security: text("Lejárat, aláírás és audience szerveroldali ellenőrzése.", "Expiry, signature and audience are verified server-side."),
            reliability: text("A lejárt session kiszámítható 401 választ ad.", "An expired session returns a predictable 401 response."),
            position: { x: 32, y: 25 },
          },
          {
            id: "permission-policy",
            label: text("Permission policy", "Permission policy"),
            category: "security",
            summary: text("Role + resource + action", "Role + resource + action"),
            responsibilities: [text("Minden védett művelet külön engedélyezése.", "Authorize every protected action independently.")],
            flow: text("A policy engedélyez vagy explicit 403 választ eredményez.", "The policy allows the command or produces an explicit 403."),
            security: text("Default deny és erőforrásszintű ellenőrzés.", "Default deny and resource-level checks."),
            reliability: text("A policy-verzió és döntési ok visszakövethető.", "Policy version and decision reason are traceable."),
            position: { x: 52, y: 25 },
          },
          {
            id: "workflow-engine",
            label: text("Workflow service", "Workflow service"),
            category: "server",
            summary: text("Állapotgép és invariáns", "State machine and invariant"),
            responsibilities: [text("Approve/reject átmenetek és kötelező indoklás kezelése.", "Handle approve/reject transitions and required reasons.")],
            flow: text("Az engedélyezett döntés új workflow-állapotot képez.", "An authorized decision creates a new workflow state."),
            security: text("A command actor- és erőforrás-contexttel fut.", "The command executes with actor and resource context."),
            reliability: text("Optimistic version check akadályozza az elveszett frissítést.", "Optimistic version checks prevent lost updates."),
            position: { x: 72, y: 25 },
          },
          {
            id: "project-record",
            label: text("Projektállapot", "Project state"),
            category: "data",
            summary: text("Verziózott struktúra", "Versioned structure"),
            responsibilities: [text("A struktúra, döntés és verzió konzisztens tárolása.", "Store structure, decisions and versions consistently.")],
            flow: text("A workflow-változás tranzakcióban frissíti az állapotot.", "The workflow change updates state in a transaction."),
            security: text("A lekérdezés tenant- és erőforráshatárt alkalmaz.", "Queries apply tenant and resource boundaries."),
            reliability: text("Constraint és verziómező védi a konzisztenciát.", "Constraints and version fields protect consistency."),
            position: { x: 62, y: 72 },
          },
          {
            id: "audit-event",
            label: text("Audit event", "Audit event"),
            category: "operations",
            summary: text("Ki, mit, mikor", "Who, what and when"),
            responsibilities: [text("Minimalizált döntési metadata rögzítése.", "Record minimized decision metadata.")],
            flow: text("A sikeres állapotátmenethez audit-esemény társul.", "A successful transition emits an audit event."),
            security: text("A napló nem tartalmaz tokent vagy teljes bizalmas payloadot.", "The log contains neither tokens nor full confidential payloads."),
            reliability: text("Az audit és az állapot tranzakciós kapcsolatban marad.", "Audit and state remain transactionally linked."),
            position: { x: 84, y: 72 },
          },
        ],
        edges: [
          { from: "role-workspace", to: "token-identity", protocol: "HTTPS", label: text("döntési request", "decision request") },
          { from: "token-identity", to: "permission-policy", protocol: "identity context", label: text("ellenőrzött actor", "verified actor") },
          { from: "permission-policy", to: "workflow-engine", protocol: "policy decision", label: text("engedélyezett parancs", "authorized command") },
          { from: "workflow-engine", to: "project-record", protocol: "transaction", label: text("verziózott módosítás", "versioned update") },
          { from: "workflow-engine", to: "audit-event", protocol: "audit record", label: text("döntési esemény", "decision event") },
        ],
      },
      {
        id: "offline-sync",
        label: text("Offline sync", "Offline sync"),
        summary: text(
          "Tervezési minta lokális műveletek, idempotens szinkron és konfliktuskezelés elválasztására.",
          "A design pattern separating local actions, idempotent synchronization and conflict handling.",
        ),
        disclosure: text(
          "Tervezett referenciaarchitektúra; nem állít kész QuestLog backendet, background syncet vagy mért reliability eredményt.",
          "A planned reference architecture; it does not claim a finished QuestLog backend, background sync or measured reliability result.",
        ),
        nodes: [
          {
            id: "pwa-shell",
            label: text("PWA shell", "PWA shell"),
            category: "client",
            summary: text("Offline használható felület", "Offline-capable interface"),
            responsibilities: [text("A lokális művelet azonnali, őszinte állapotjelzése.", "Give immediate and honest status for a local action.")],
            flow: text("A művelet először helyi parancsként jön létre.", "The action first becomes a local command."),
            security: text("Érzékeny adat csak indokolt, védett lokális tárolóba kerülhet.", "Sensitive data requires a justified, protected local store."),
            reliability: text("Az UI külön jelöli a pending és synced állapotot.", "The UI distinguishes pending and synchronized states."),
            position: { x: 12, y: 25 },
          },
          {
            id: "local-store",
            label: text("Lokális adat", "Local data"),
            category: "data",
            summary: text("Offline olvasási modell", "Offline read model"),
            responsibilities: [text("A szükséges adatrész és lokális verzió tartósítása.", "Persist the required subset and local version.")],
            flow: text("Az UI a lokális read modelből olvas.", "The UI reads from a local read model."),
            security: text("Adatminimalizálás és felhasználói törlési út szükséges.", "Data minimization and a user deletion path are required."),
            reliability: text("Sémaverzió és migráció védi az alkalmazásfrissítést.", "Schema versions and migrations protect app updates."),
            position: { x: 30, y: 25 },
          },
          {
            id: "outbox-queue",
            label: text("Outbox queue", "Outbox queue"),
            category: "client",
            summary: text("Idempotens parancslista", "Idempotent command list"),
            responsibilities: [text("Parancsazonosító, sorrend és retry-állapot kezelése.", "Manage command IDs, order and retry status.")],
            flow: text("A pending műveletek hálózat esetén batchben vagy sorban indulnak.", "Pending actions start in batches or sequence when online."),
            security: text("A queue nem tárol auth tokent a payload részeként.", "The queue does not store auth tokens inside payloads."),
            reliability: text("Exponential backoff és retry limit kerüli a végtelen ciklust.", "Exponential backoff and retry limits avoid infinite loops."),
            position: { x: 48, y: 25 },
          },
          {
            id: "sync-api",
            label: text("Sync API", "Sync API"),
            category: "server",
            summary: text("Validált batch boundary", "Validated batch boundary"),
            responsibilities: [text("Parancsok validálása, deduplikálása és jogosultság-ellenőrzése.", "Validate, deduplicate and authorize commands.")],
            flow: text("A szerver command ID és expected version alapján dolgozik.", "The server processes command IDs and expected versions."),
            security: text("Minden újraküldött művelet ismét authorization ellenőrzést kap.", "Every replayed action receives a fresh authorization check."),
            reliability: text("Idempotency key biztosít stabil ismételt választ.", "An idempotency key provides a stable repeated response."),
            position: { x: 66, y: 25 },
          },
          {
            id: "conflict-policy",
            label: text("Konfliktus-policy", "Conflict policy"),
            category: "server",
            summary: text("Explicit feloldási szabály", "Explicit resolution rule"),
            responsibilities: [text("Verzióütközés felismerése és felhasználói döntés kérése.", "Detect version conflicts and request user resolution.")],
            flow: text("A konfliktus nem csendes felülírás, hanem strukturált válasz.", "A conflict becomes a structured response, not a silent overwrite."),
            security: text("A konfliktusválasz csak szükséges mezőket fed fel.", "Conflict responses expose only necessary fields."),
            reliability: text("A determinisztikus policy reprodukálható eredményt ad.", "A deterministic policy produces reproducible outcomes."),
            position: { x: 84, y: 25 },
          },
          {
            id: "primary-store",
            label: text("Elsődleges adatbázis", "Primary database"),
            category: "data",
            summary: text("Autoritatív verzió", "Authoritative version"),
            responsibilities: [text("A szerveroldali állapot és verzió konzisztens tárolása.", "Persist server state and versions consistently.")],
            flow: text("Elfogadott parancs után új verzió jön létre.", "An accepted command creates a new version."),
            security: text("Tenant-scope és least privilege védi a rekordokat.", "Tenant scope and least privilege protect records."),
            reliability: text("Tranzakció és constraint védi a parancs alkalmazását.", "Transactions and constraints protect command application."),
            position: { x: 66, y: 72 },
          },
          {
            id: "sync-telemetry",
            label: text("Sync telemetry", "Sync telemetry"),
            category: "operations",
            summary: text("Queue- és konfliktusjel", "Queue and conflict signals"),
            responsibilities: [text("Queue depth, retry és conflict arány aggregált követése.", "Track aggregate queue depth, retries and conflict rate.")],
            flow: text("A sync eredmények személyes payload nélkül metrikává válnak.", "Sync outcomes become metrics without personal payloads."),
            security: text("Azonosító és tartalom helyett aggregált jel kerül mérésre.", "Aggregate signals are measured instead of identifiers and content."),
            reliability: text("Riasztás jelzi a tartósan növekvő queue-t vagy retry-t.", "Alerts flag persistently increasing queues or retries."),
            position: { x: 86, y: 72 },
          },
        ],
        edges: [
          { from: "pwa-shell", to: "local-store", protocol: "local transaction", label: text("optimista állapot", "optimistic state") },
          { from: "pwa-shell", to: "outbox-queue", protocol: "command", label: text("pending művelet", "pending action") },
          { from: "outbox-queue", to: "sync-api", protocol: "HTTPS batch", label: text("idempotens parancs", "idempotent command") },
          { from: "sync-api", to: "conflict-policy", protocol: "version check", label: text("expected version", "expected version") },
          { from: "conflict-policy", to: "primary-store", protocol: "transaction", label: text("elfogadott módosítás", "accepted change") },
          { from: "sync-api", to: "sync-telemetry", protocol: "aggregate event", label: text("sync eredmény", "sync outcome") },
        ],
      },
    ],
  },
  permissions: {
    eyebrow: text("Role & Permission Matrix", "Role & Permission Matrix"),
    title: text("Mit engedne ez a szemléltető policy?", "What would this illustrative policy allow?"),
    description: text(
      "Válassz szerepkört a műveletszintű eredményhez. A teljes mátrix mindig olvasható marad.",
      "Choose a role to inspect action-level outcomes. The complete matrix remains readable at all times.",
    ),
    disclosure: text(
      "Anonimizált, kliensoldali demonstráció. Valós rendszerben minden döntést a backendnek kell újra ellenőriznie; a UI csak magyarázza a policy-t.",
      "An anonymized client-side demonstration. A real system must recheck every decision on the backend; the UI only explains the policy.",
    ),
    roleSelectorLabel: text("Szerepkör kiválasztása", "Select a role"),
    selectedRoleLabel: text("Kiválasztott szerepkör", "Selected role"),
    allowedLabel: text("Engedélyezett", "Allowed"),
    deniedLabel: text("Tiltott", "Denied"),
    fullMatrixTitle: text("Teljes permission mátrix", "Complete permission matrix"),
    actionHeader: text("Művelet", "Action"),
    roles: [
      { id: "admin", label: text("Admin", "Admin") },
      { id: "manager", label: text("Manager", "Manager") },
      { id: "engineer", label: text("Engineer", "Engineer") },
      { id: "guest-customer", label: text("Guest customer", "Guest customer") },
    ],
    actions: [
      { id: "project-view", label: text("Projekt megtekintése", "View project"), description: text("A projekt jóváhagyott nézeteinek olvasása.", "Read approved project views."), allowedRoles: ["admin", "manager", "engineer", "guest-customer"] },
      { id: "structure-edit", label: text("Struktúra szerkesztése", "Edit structure"), description: text("Modul-, task- és phase-struktúra módosítása.", "Change module, task and phase structure."), allowedRoles: ["admin", "manager"] },
      { id: "comment", label: text("Komment írása", "Add comment"), description: text("Kontextusos review-komment hozzáadása.", "Add a contextual review comment."), allowedRoles: ["admin", "manager", "engineer", "guest-customer"] },
      { id: "approve-task", label: text("Task jóváhagyása", "Approve task"), description: text("Egy task review-állapotának elfogadása.", "Accept a task review state."), allowedRoles: ["admin", "manager", "engineer"] },
      { id: "approve-module", label: text("Modul jóváhagyása", "Approve module"), description: text("Egy modul review-állapotának elfogadása.", "Accept a module review state."), allowedRoles: ["admin", "manager", "engineer"] },
      { id: "approve-spec", label: text("Spec jóváhagyása", "Approve specification"), description: text("A megosztott specifikáció ügyféloldali elfogadása.", "Customer-side acceptance of a shared specification."), allowedRoles: ["admin", "manager", "guest-customer"] },
      { id: "reject-with-reason", label: text("Elutasítás indoklással", "Reject with reason"), description: text("Döntés rögzítése kötelező magyarázattal.", "Record a decision with a required explanation."), allowedRoles: ["admin", "manager", "guest-customer"] },
      { id: "audit-view", label: text("Audit megtekintése", "View audit trail"), description: text("Minimalizált döntési előzmények olvasása.", "Read minimized decision history."), allowedRoles: ["admin", "manager"] },
    ],
  },
  apiContract: {
    eyebrow: text("API contract example", "API contract example"),
    title: text("Kiszámítható decision endpoint", "A predictable decision endpoint"),
    description: text(
      "Egy rövid, szintetikus példa bemutatja a validált requestet, az optimistic concurrency mezőt és a stabil hibafelületet.",
      "A compact synthetic example shows a validated request, an optimistic concurrency field and a stable error surface.",
    ),
    disclosure: text(
      "Az útvonal és azonosítók csak dokumentációs példák. A portfólió nem szolgálja ki ezt az endpointot.",
      "The route and identifiers are documentation examples only. This portfolio does not serve the endpoint.",
    ),
    endpointLabel: text("Szemléltető endpoint", "Illustrative endpoint"),
    endpoint: "POST /example-api/projects/:projectId/decision",
    requestLabel: text("Request példa", "Request example"),
    requestExample: `{
  "decision": "reject",
  "reason": "Scope needs clarification",
  "expectedVersion": 12,
  "idempotencyKey": "demo-command-001"
}`,
    responseLabel: text("Sikeres response példa", "Successful response example"),
    responseExample: `{
  "status": "rejected",
  "version": 13,
  "auditEventId": "evt_demo_001"
}`,
    errorTitle: text("Stabil hibafelület", "Stable error surface"),
    errors: [
      { status: 400, label: text("Hibás vagy hiányos request", "Invalid or incomplete request") },
      { status: 401, label: text("Nincs érvényes identity", "No valid identity") },
      { status: 403, label: text("A művelet nem engedélyezett", "The action is not authorized") },
      { status: 409, label: text("Verzióütközés; frissítés szükséges", "Version conflict; refresh required") },
    ],
    notes: [
      text("A reason mező reject döntésnél kötelező és szerveroldalon validált.", "The reason field is required for rejection and validated server-side."),
      text("Az expectedVersion megakadályozza a csendes lost update-et.", "expectedVersion prevents a silent lost update."),
      text("Az idempotency key biztonságossá teszi az ismételt küldést.", "The idempotency key makes a repeated submission safe."),
    ],
  },
} as const;

export const labSource = labSourceSchema.parse(rawLabSource);

function localize(value: z.infer<typeof localizedTextSchema>, locale: Locale) {
  return value[locale];
}

function resolveLabContent(locale: Locale) {
  const source = labSource;

  return {
    status: source.status,
    metadata: {
      title: localize(source.metadata.title, locale),
      description: localize(source.metadata.description, locale),
    },
    hero: {
      eyebrow: localize(source.hero.eyebrow, locale),
      title: localize(source.hero.title, locale),
      description: localize(source.hero.description, locale),
      disclosure: localize(source.hero.disclosure, locale),
      demoLabel: localize(source.hero.demoLabel, locale),
    },
    architecture: {
      eyebrow: localize(source.architecture.eyebrow, locale),
      title: localize(source.architecture.title, locale),
      description: localize(source.architecture.description, locale),
      viewSelectorLabel: localize(source.architecture.viewSelectorLabel, locale),
      nodeSelectorLabel: localize(source.architecture.nodeSelectorLabel, locale),
      selectedNodeLabel: localize(source.architecture.selectedNodeLabel, locale),
      fallbackTitle: localize(source.architecture.fallbackTitle, locale),
      fallbackSummary: localize(source.architecture.fallbackSummary, locale),
      edgeListTitle: localize(source.architecture.edgeListTitle, locale),
      panelLabels: {
        responsibilities: localize(source.architecture.panelLabels.responsibilities, locale),
        flow: localize(source.architecture.panelLabels.flow, locale),
        security: localize(source.architecture.panelLabels.security, locale),
        reliability: localize(source.architecture.panelLabels.reliability, locale),
      },
      categoryLabels: Object.fromEntries(
        Object.entries(source.architecture.categoryLabels).map(([key, value]) => [
          key,
          localize(value, locale),
        ]),
      ) as Record<z.infer<typeof categorySchema>, string>,
      views: source.architecture.views.map((view) => ({
        id: view.id,
        label: localize(view.label, locale),
        summary: localize(view.summary, locale),
        disclosure: localize(view.disclosure, locale),
        nodes: view.nodes.map((node) => ({
          id: node.id,
          label: localize(node.label, locale),
          category: node.category,
          summary: localize(node.summary, locale),
          responsibilities: node.responsibilities.map((item) => localize(item, locale)),
          flow: localize(node.flow, locale),
          security: localize(node.security, locale),
          reliability: localize(node.reliability, locale),
          position: node.position,
        })),
        edges: view.edges.map((edge) => ({
          from: edge.from,
          to: edge.to,
          protocol: edge.protocol,
          label: localize(edge.label, locale),
        })),
      })),
    },
    permissions: {
      eyebrow: localize(source.permissions.eyebrow, locale),
      title: localize(source.permissions.title, locale),
      description: localize(source.permissions.description, locale),
      disclosure: localize(source.permissions.disclosure, locale),
      roleSelectorLabel: localize(source.permissions.roleSelectorLabel, locale),
      selectedRoleLabel: localize(source.permissions.selectedRoleLabel, locale),
      allowedLabel: localize(source.permissions.allowedLabel, locale),
      deniedLabel: localize(source.permissions.deniedLabel, locale),
      fullMatrixTitle: localize(source.permissions.fullMatrixTitle, locale),
      actionHeader: localize(source.permissions.actionHeader, locale),
      roles: source.permissions.roles.map((role) => ({
        id: role.id,
        label: localize(role.label, locale),
      })),
      actions: source.permissions.actions.map((action) => ({
        id: action.id,
        label: localize(action.label, locale),
        description: localize(action.description, locale),
        allowedRoles: action.allowedRoles,
      })),
    },
    apiContract: {
      eyebrow: localize(source.apiContract.eyebrow, locale),
      title: localize(source.apiContract.title, locale),
      description: localize(source.apiContract.description, locale),
      disclosure: localize(source.apiContract.disclosure, locale),
      endpointLabel: localize(source.apiContract.endpointLabel, locale),
      endpoint: source.apiContract.endpoint,
      requestLabel: localize(source.apiContract.requestLabel, locale),
      requestExample: source.apiContract.requestExample,
      responseLabel: localize(source.apiContract.responseLabel, locale),
      responseExample: source.apiContract.responseExample,
      errorTitle: localize(source.apiContract.errorTitle, locale),
      errors: source.apiContract.errors.map((error) => ({
        status: error.status,
        label: localize(error.label, locale),
      })),
      notes: source.apiContract.notes.map((note) => localize(note, locale)),
    },
  };
}

export type LabLocaleContent = ReturnType<typeof resolveLabContent>;

export const labContent = Object.fromEntries(
  locales.map((locale) => [locale, resolveLabContent(locale)]),
) as Record<Locale, LabLocaleContent>;

export { labSourceSchema };
