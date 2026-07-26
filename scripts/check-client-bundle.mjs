import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { gzipSync } from "node:zlib";

const route = "/[locale]/page";
const budgetBytes = 165 * 1024;
const manifestPath = resolve(
  ".next/server/app/[locale]/page_client-reference-manifest.js",
);
const assignment = `globalThis.__RSC_MANIFEST["${route}"] = `;
const source = readFileSync(manifestPath, "utf8");
const assignmentIndex = source.indexOf(assignment);

if (assignmentIndex === -1) {
  throw new Error(`Unable to find ${route} in ${manifestPath}.`);
}

const serializedManifest = source
  .slice(assignmentIndex + assignment.length)
  .trim()
  .replace(/;$/, "");
const manifest = JSON.parse(serializedManifest);
const chunkPaths = [
  ...new Set(
    Object.values(manifest.clientModules).flatMap(({ chunks }) => chunks),
  ),
]
  .filter(
    (chunkPath) =>
      chunkPath.startsWith("/_next/static/chunks/") &&
      chunkPath.endsWith(".js"),
  )
  .sort();

const gzipBytes = chunkPaths.reduce((total, chunkPath) => {
  const filePath = resolve(".next", chunkPath.replace(/^\/_next\//, ""));
  return total + gzipSync(readFileSync(filePath)).byteLength;
}, 0);

const formatKiB = (bytes) => `${(bytes / 1024).toFixed(1)} KiB`;

console.log(
  `Homepage initial client JS: ${formatKiB(gzipBytes)} gzip across ${chunkPaths.length} chunks (budget: ${formatKiB(budgetBytes)}).`,
);

if (gzipBytes > budgetBytes) {
  throw new Error(
    `Homepage initial client JS exceeds its budget by ${formatKiB(gzipBytes - budgetBytes)}.`,
  );
}
