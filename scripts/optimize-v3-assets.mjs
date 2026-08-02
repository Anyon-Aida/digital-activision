import { mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const sourceRoot = path.join(repoRoot, "docs", "portfolio-v3", "references");
const outputRoot = path.join(repoRoot, "public", "portfolio-v3");

const projectAssets = [
  ...[
    "adott-bug-report-list",
    "adott-bug-report",
    "adott-company-create",
    "adott-company-detail",
    "adott-inquiry-roles",
    "adott-inquiry-status-and-details",
    "adott-notifications",
    "adott-quote-editor",
    "adott-quote-structure",
  ].map((name) => ({
    source: `adott/${name}.png`,
    output: `projects/adott/${name}`,
    maxLongEdge: 1_600,
    quality: { avif: 76, webp: 80 },
  })),
  ...[
    "alba-brand-section-footer",
    "alba-configurator-desktop",
    "alba-website-3d-entry",
  ].map((name) => ({
    source: `alba/${name}.png`,
    output: `projects/alba/${name}`,
    maxLongEdge: 1_600,
    quality: { avif: 76, webp: 80 },
  })),
  {
    source: "alba/alba-configurator-mobile.png",
    output: "projects/alba/alba-configurator-mobile",
    maxLongEdge: 1_600,
    quality: { avif: 80, webp: 82 },
  },
  ...[
    "sanjiwani-booking-flow-desktop",
    "sanjiwani-home-desktop",
    "sanjiwani-services-desktop",
  ].map((name) => ({
    source: `sanjiwani/${name}.png`,
    output: `projects/sanjiwani/${name}`,
    maxLongEdge: 1_600,
    quality: { avif: 76, webp: 80 },
  })),
];

const heroAssets = [
  {
    source: "adott/adott-quote-structure.png",
    output: "hero/hero-blueprint-adott",
    crop: { left: 200, top: 80, width: 1_600, height: 630 },
    maxLongEdge: 1_200,
    quality: { avif: 75, webp: 78 },
  },
  {
    source: "alba/alba-configurator-desktop.png",
    output: "hero/hero-blueprint-alba",
    crop: { left: 205, top: 0, width: 1_130, height: 746 },
    maxLongEdge: 1_200,
    quality: { avif: 75, webp: 78 },
  },
  {
    source: "sanjiwani/sanjiwani-booking-flow-desktop.png",
    output: "hero/hero-blueprint-sanjiwani",
    crop: { left: 430, top: 0, width: 620, height: 735 },
    maxLongEdge: 1_200,
    quality: { avif: 75, webp: 78 },
  },
];

const assets = [...projectAssets, ...heroAssets];

const assertCropFits = (source, metadata, crop) => {
  if (!crop) return;

  const fits =
    crop.left >= 0 &&
    crop.top >= 0 &&
    crop.width > 0 &&
    crop.height > 0 &&
    crop.left + crop.width <= metadata.width &&
    crop.top + crop.height <= metadata.height;

  if (!fits) {
    throw new Error(
      `Crop for ${source} exceeds ${metadata.width}x${metadata.height}`,
    );
  }
};

const createPipeline = (inputPath, asset) => {
  let pipeline = sharp(inputPath, {
    failOn: "error",
    limitInputPixels: 64 * 1024 * 1024,
  }).removeAlpha();

  if (asset.crop) {
    pipeline = pipeline.extract(asset.crop);
  }

  return pipeline.resize({
    width: asset.maxLongEdge,
    height: asset.maxLongEdge,
    fit: "inside",
    withoutEnlargement: true,
    kernel: sharp.kernel.lanczos3,
  });
};

const encodeAsset = async (asset) => {
  const inputPath = path.join(sourceRoot, asset.source);
  const sourceStats = await stat(inputPath);

  if (!sourceStats.isFile()) {
    throw new Error(`V3 source is not a file: ${asset.source}`);
  }

  const [metadata, imageStats] = await Promise.all([
    sharp(inputPath).metadata(),
    sharp(inputPath).stats(),
  ]);

  if (!metadata.width || !metadata.height) {
    throw new Error(`Missing source dimensions: ${asset.source}`);
  }
  if (!imageStats.isOpaque) {
    throw new Error(
      `Unexpected transparency in ${asset.source}; review before encoding`,
    );
  }

  assertCropFits(asset.source, metadata, asset.crop);

  const [avif, webp] = await Promise.all([
    createPipeline(inputPath, asset)
      .avif({
        quality: asset.quality.avif,
        effort: 6,
        chromaSubsampling: "4:4:4",
      })
      .toBuffer({ resolveWithObject: true }),
    createPipeline(inputPath, asset)
      .webp({
        quality: asset.quality.webp,
        effort: 6,
        smartSubsample: true,
      })
      .toBuffer({ resolveWithObject: true }),
  ]);

  if (
    avif.info.width > asset.maxLongEdge ||
    avif.info.height > asset.maxLongEdge ||
    webp.info.width > asset.maxLongEdge ||
    webp.info.height > asset.maxLongEdge
  ) {
    throw new Error(`No-upscale boundary failed for ${asset.output}`);
  }
  if (
    avif.info.width !== webp.info.width ||
    avif.info.height !== webp.info.height
  ) {
    throw new Error(`Format dimensions diverged for ${asset.output}`);
  }

  const outputBase = path.join(outputRoot, asset.output);
  await mkdir(path.dirname(outputBase), { recursive: true });
  await Promise.all([
    writeFile(`${outputBase}.avif`, avif.data),
    writeFile(`${outputBase}.webp`, webp.data),
  ]);

  return {
    output: asset.output,
    width: avif.info.width,
    height: avif.info.height,
    avifBytes: avif.info.size,
    webpBytes: webp.info.size,
  };
};

const results = [];

for (const asset of assets) {
  results.push(await encodeAsset(asset));
}

const totals = results.reduce(
  (summary, result) => ({
    avifBytes: summary.avifBytes + result.avifBytes,
    webpBytes: summary.webpBytes + result.webpBytes,
  }),
  { avifBytes: 0, webpBytes: 0 },
);

console.table(
  results.map(({ output, width, height, avifBytes, webpBytes }) => ({
    output,
    dimensions: `${width}x${height}`,
    "AVIF KiB": (avifBytes / 1024).toFixed(1),
    "WebP KiB": (webpBytes / 1024).toFixed(1),
  })),
);
console.log(
  `Generated ${results.length * 2} raster assets: ` +
    `${(totals.avifBytes / 1024).toFixed(1)} KiB AVIF + ` +
    `${(totals.webpBytes / 1024).toFixed(1)} KiB WebP.`,
);
