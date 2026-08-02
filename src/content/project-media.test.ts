import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import {
  getProjectMedia,
  getProjectMediaSource,
  projectMedia,
  projectMediaIds,
} from "./project-media";

const publicFile = (source: string) =>
  join(process.cwd(), "public", source.replace(/^\//, ""));

const repositoryFile = (...parts: string[]) => join(process.cwd(), ...parts);

const heroAssets = [
  {
    sources: {
      avif: "/portfolio-v3/hero/hero-blueprint-adott.avif",
      webp: "/portfolio-v3/hero/hero-blueprint-adott.webp",
    },
    width: 1_200,
    height: 473,
  },
  {
    sources: {
      avif: "/portfolio-v3/hero/hero-blueprint-alba.avif",
      webp: "/portfolio-v3/hero/hero-blueprint-alba.webp",
    },
    width: 1_130,
    height: 746,
  },
  {
    sources: {
      avif: "/portfolio-v3/hero/hero-blueprint-sanjiwani.avif",
      webp: "/portfolio-v3/hero/hero-blueprint-sanjiwani.webp",
    },
    width: 620,
    height: 735,
  },
] as const;

const cvArtifacts = {
  hu: {
    bytes: 5_021_359,
    sha256: "a2db5e25c0a2c57e255885413945bd0f3153a0d6dce6fab8d71e3bc584bd0aca",
  },
  en: {
    bytes: 4_770_553,
    sha256: "36819f1088086ddb9d038f30ca54dde26d250fe2f7edd62bcaca4c4c568a34b6",
  },
} as const;

async function expectRasterMetadata(
  source: string,
  expected: { width: number; height: number },
) {
  const file = publicFile(source);
  const extension = source.endsWith(".avif") ? "avif" : "webp";

  expect(existsSync(file), `Missing media: ${source}`).toBe(true);

  const metadata = await sharp(file).metadata();

  expect(metadata).toMatchObject({
    width: expected.width,
    height: expected.height,
    space: "srgb",
    channels: 3,
    hasAlpha: false,
  });
  expect(metadata.mediaType).toBe(`image/${extension}`);
  expect(metadata.format).toBe(extension === "avif" ? "heif" : "webp");

  if (extension === "avif") {
    expect(metadata.compression).toBe("av1");
  }

  return metadata;
}

async function sha256(file: string) {
  return createHash("sha256").update(await readFile(file)).digest("hex");
}

describe("portfolio V3 project media", () => {
  it("keeps one typed registry entry for every media id", () => {
    expect(projectMedia).toHaveLength(projectMediaIds.length);
    expect(new Set(projectMedia.map(({ id }) => id)).size).toBe(
      projectMediaIds.length,
    );

    for (const id of projectMediaIds) {
      expect(getProjectMedia(id).id).toBe(id);
    }
  });

  it("provides natural bilingual functional alt text", () => {
    for (const media of projectMedia) {
      expect(media.alt.hu.trim().length).toBeGreaterThan(20);
      expect(media.alt.en.trim().length).toBeGreaterThan(20);
      expect(media.width).toBeGreaterThan(0);
      expect(media.height).toBeGreaterThan(0);
    }
  });

  it("declares an intentional surface for every diagram", () => {
    const diagrams = projectMedia.filter(
      (media) => media.kind === "diagram",
    );

    for (const diagram of diagrams) {
      expect(["dark", "light"]).toContain(diagram.surface);
    }

    expect(getProjectMedia("samsung-gate-flow")).toMatchObject({
      kind: "diagram",
      surface: "dark",
    });
    expect(getProjectMedia("adott-workflow")).toMatchObject({
      kind: "diagram",
      surface: "light",
    });
  });

  it("registers generated AVIF, WebP and SVG assets under public/portfolio-v3", async () => {
    for (const media of projectMedia) {
      if (media.kind === "screenshot") {
        for (const source of [media.sources.avif, media.sources.webp]) {
          expect(source).toMatch(/^\/portfolio-v3\/projects\//);
          await expectRasterMetadata(source, media);
        }
      } else {
        expect(media.sources.svg).toMatch(/^\/portfolio-v3\/diagrams\//);
        expect(
          existsSync(publicFile(media.sources.svg)),
          `Missing media: ${media.sources.svg}`,
        ).toBe(true);
      }

      expect(existsSync(publicFile(getProjectMediaSource(media)))).toBe(true);
    }
  });

  it("keeps project raster assets within the published 1600px long-edge budget", () => {
    for (const media of projectMedia) {
      if (media.kind === "screenshot") {
        expect(Math.max(media.width, media.height)).toBeLessThanOrEqual(1_600);
        expect(media.sources.avif).toMatch(/\.avif$/);
        expect(media.sources.webp).toMatch(/\.webp$/);
      }
    }
  });

  it("keeps diagram dimensions aligned with their SVG viewBoxes", async () => {
    for (const media of projectMedia) {
      if (media.kind !== "diagram") continue;

      const svg = await readFile(publicFile(media.sources.svg), "utf8");
      const viewBox = svg.match(
        /\bviewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/,
      );

      expect(viewBox?.[1]).toBe(String(media.width));
      expect(viewBox?.[2]).toBe(String(media.height));
      expect(svg).toMatch(/\baria-hidden="true"/);
      expect(svg).toMatch(/\bfocusable="false"/);
    }
  });

  it("keeps the Samsung diagram grounded in the documented flow and impact", async () => {
    const media = getProjectMedia("samsung-gate-flow");

    expect(media.kind).toBe("diagram");
    if (media.kind !== "diagram") return;

    const svg = await readFile(publicFile(media.sources.svg), "utf8");

    expect(svg).toMatch(/VERIFICATION STAGES/);
    expect(svg).toMatch(/LIVE LOAD/);
    expect(svg).toMatch(/BEFORE/);
    expect(svg).toMatch(/AFTER[\s\S]*\+20%/);
  });

  it("publishes both optimized hero formats within the 1200px long-edge budget", async () => {
    for (const hero of heroAssets) {
      for (const source of [hero.sources.avif, hero.sources.webp]) {
        const metadata = await expectRasterMetadata(source, hero);

        expect(Math.max(metadata.width ?? 0, metadata.height ?? 0)).toBeLessThanOrEqual(
          1_200,
        );
      }
    }
  });

  it.each(["hu", "en"] as const)(
    "publishes the verified %s CV artifact",
    async (locale) => {
      const filename = `kovacs-zalan-cv-${locale}.pdf`;
      const published = repositoryFile("public", "cv", filename);
      const bytes = await readFile(published);

      expect(existsSync(published)).toBe(true);
      expect(bytes.byteLength).toBe(cvArtifacts[locale].bytes);
      expect(await sha256(published)).toBe(cvArtifacts[locale].sha256);
      expect(bytes.subarray(0, 5).toString()).toBe("%PDF-");
    },
  );
});
