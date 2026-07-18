export const legacyRedirects = [
  { source: "/adatkezeles", destination: "/hu/privacy" },
  {
    source: "/works/hamburger",
    destination: "/projects/hamburger/index.html",
  },
  {
    source: "/works/boxer-hero",
    destination: "/projects/boxer-hero/index.html",
  },
  { source: "/works/nati", destination: "/projects/nati/index.html" },
  {
    source: "/works/nati/chat",
    destination: "/projects/nati/chat/index.html",
  },
  {
    source: "/projects/hamburger",
    destination: "/projects/hamburger/index.html",
  },
  {
    source: "/projects/boxer-hero",
    destination: "/projects/boxer-hero/index.html",
  },
  { source: "/projects/nati", destination: "/projects/nati/index.html" },
  {
    source: "/projects/nati/chat",
    destination: "/projects/nati/chat/index.html",
  },
] as const;

const legacyNamespaces = new Set(["adatkezeles", "projects", "works"]);

export function isLegacyPathname(pathname: string): boolean {
  const firstSegment = pathname.split("/").find(Boolean);
  return firstSegment !== undefined && legacyNamespaces.has(firstSegment);
}
