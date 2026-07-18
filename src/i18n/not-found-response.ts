import type { Locale } from "./routing";

const copy = {
  hu: {
    eyebrow: "404 · Ismeretlen útvonal",
    title: "Ez az oldal nem található",
    description:
      "A kért oldal nem létezik, vagy másik címre került. Térj vissza a portfólió kezdőoldalára.",
    home: "Vissza a kezdőoldalra",
    alternate: "EN",
  },
  en: {
    eyebrow: "404 · Unknown route",
    title: "This page could not be found",
    description:
      "The requested page does not exist or has moved. Return to the portfolio homepage.",
    home: "Back to the homepage",
    alternate: "HU",
  },
} as const;

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character,
  );
}

function alternatePath(pathname: string, locale: Locale) {
  const nextLocale: Locale = locale === "hu" ? "en" : "hu";
  const segments = pathname.split("/");

  if (segments[1] === "hu" || segments[1] === "en") {
    segments[1] = nextLocale;
    return { href: segments.join("/") || `/${nextLocale}`, nextLocale };
  }

  return { href: `/${nextLocale}`, nextLocale };
}

export function localizedNotFoundResponse(pathname: string, locale: Locale) {
  const content = copy[locale];
  const alternate = alternatePath(pathname, locale);
  const homeHref = `/${locale}`;

  const document = `<!doctype html>
<html lang="${locale}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <title>${escapeHtml(content.title)} · Digital Activision</title>
    <style>
      :root { color-scheme: light; font-family: Inter, ui-sans-serif, system-ui, sans-serif; }
      * { box-sizing: border-box; }
      body { margin: 0; background: #f8fafc; color: #111827; }
      main { min-height: 100vh; display: grid; place-items: center; padding: 2rem; }
      section { width: min(44rem, 100%); }
      p { color: #475569; font-size: 1.075rem; line-height: 1.7; }
      .eyebrow { color: #6d28d9; font-size: .8rem; font-weight: 750; letter-spacing: .16em; text-transform: uppercase; }
      h1 { margin: 1rem 0; font-size: clamp(2.5rem, 8vw, 4.5rem); line-height: 1; letter-spacing: -.04em; }
      nav { display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 2rem; }
      a { min-height: 2.75rem; display: inline-flex; align-items: center; border: 1px solid #cbd5e1; border-radius: 999px; padding: .7rem 1.1rem; color: #111827; font-weight: 700; text-decoration: none; }
      a:first-child { background: #111827; border-color: #111827; color: white; }
      a:focus-visible { outline: 3px solid #22d3ee; outline-offset: 3px; }
    </style>
  </head>
  <body>
    <main id="main">
      <section aria-labelledby="not-found-title">
        <div class="eyebrow">${escapeHtml(content.eyebrow)}</div>
        <h1 id="not-found-title">${escapeHtml(content.title)}</h1>
        <p>${escapeHtml(content.description)}</p>
        <nav aria-label="404">
          <a href="${escapeHtml(homeHref)}">${escapeHtml(content.home)}</a>
          <a href="${escapeHtml(alternate.href)}" hreflang="${alternate.nextLocale}">${escapeHtml(content.alternate)}</a>
        </nav>
      </section>
    </main>
  </body>
</html>`;

  return new Response(document, {
    status: 404,
    headers: {
      "Cache-Control": "no-store",
      "Content-Language": locale,
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
