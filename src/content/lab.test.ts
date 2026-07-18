import { describe, expect, it } from "vitest";
import { labContent, labSource, labSourceSchema } from "./lab";

describe("Engineering Lab content", () => {
  it("exposes exactly three honest conceptual architecture views", () => {
    expect(labSource.status).toBe("conceptual-demonstration");
    expect(labSource.architecture.views.map(({ id }) => id)).toEqual([
      "validated-request",
      "approval-workflow",
      "offline-sync",
    ]);

    for (const locale of ["hu", "en"] as const) {
      expect(labContent[locale].architecture.views).toHaveLength(3);
      expect(labContent[locale].hero.disclosure).toMatch(
        /koncepcion|szintetikus|conceptual|synthetic/i,
      );
    }
  });

  it("keeps every edge inside its declared view", () => {
    for (const view of labSource.architecture.views) {
      const ids = new Set(view.nodes.map(({ id }) => id));

      for (const edge of view.edges) {
        expect(ids.has(edge.from)).toBe(true);
        expect(ids.has(edge.to)).toBe(true);
        expect(edge.from).not.toBe(edge.to);
      }
    }
  });

  it("fails closed for an edge that references a missing node", () => {
    const invalid = structuredClone(labSource);
    invalid.architecture.views[0].edges[0].to = "missing-node";

    expect(() => labSourceSchema.parse(invalid)).toThrow(/existing nodes/i);
  });

  it("provides complete responsibility, flow, security and reliability text", () => {
    for (const locale of ["hu", "en"] as const) {
      for (const view of labContent[locale].architecture.views) {
        for (const node of view.nodes) {
          expect(node.responsibilities.length).toBeGreaterThan(0);
          expect(node.responsibilities.every(Boolean)).toBe(true);
          expect(node.flow).not.toBe("");
          expect(node.security).not.toBe("");
          expect(node.reliability).not.toBe("");
        }
      }
    }
  });

  it("contains the specified four roles and eight permission actions", () => {
    expect(labSource.permissions.roles.map(({ id }) => id)).toEqual([
      "admin",
      "manager",
      "engineer",
      "guest-customer",
    ]);
    expect(labSource.permissions.actions.map(({ id }) => id)).toEqual([
      "project-view",
      "structure-edit",
      "comment",
      "approve-task",
      "approve-module",
      "approve-spec",
      "reject-with-reason",
      "audit-view",
    ]);
  });

  it("keeps the permission policy locale-independent", () => {
    const matrix = (locale: "hu" | "en") =>
      labContent[locale].permissions.actions.map(({ id, allowedRoles }) => ({
        id,
        allowedRoles,
      }));

    expect(matrix("en")).toEqual(matrix("hu"));
    expect(labContent.en.permissions.disclosure).toMatch(/backend/i);
    expect(labContent.hu.permissions.disclosure).toMatch(/backend/i);
  });

  it("documents validation, authentication, authorization and conflict errors", () => {
    expect(labSource.apiContract.errors.map(({ status }) => status)).toEqual([
      400, 401, 403, 409,
    ]);
    expect(labSource.apiContract.endpoint).toMatch(/^POST \/example-api\//);

    for (const locale of ["hu", "en"] as const) {
      expect(labContent[locale].apiContract.disclosure).toMatch(
        /péld|nem szolgálja ki|example|does not serve/i,
      );
    }
  });
});
