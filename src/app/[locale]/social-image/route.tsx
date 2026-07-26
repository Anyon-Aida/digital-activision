import { ImageResponse } from "next/og";
import { isLocale } from "@/i18n/routing";

export const runtime = "edge";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return new Response("Not found", { status: 404 });
  }

  const copy =
    locale === "hu"
      ? {
          role: "Full-Stack fejlesztő és digitális terméképítő",
          detail: "Webalkalmazások · webes rendszerek · digitális termékek",
        }
      : {
          role: "Full-Stack Engineer & Digital Product Builder",
          detail: "Web applications · web systems · digital products",
        };

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#08111f",
          color: "#f8fafc",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px 80px",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "#67e8f9",
            display: "flex",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Digital Activision
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            Kovács Zalán
          </div>
          <div
            style={{
              color: "#cbd5e1",
              display: "flex",
              fontSize: 38,
              lineHeight: 1.2,
              maxWidth: 960,
            }}
          >
            {copy.role}
          </div>
        </div>
        <div
          style={{
            alignItems: "center",
            borderTop: "2px solid #1e293b",
            color: "#94a3b8",
            display: "flex",
            fontSize: 24,
            justifyContent: "space-between",
            paddingTop: 28,
          }}
        >
          <span>{copy.detail}</span>
          <span style={{ color: "#67e8f9" }}>{locale.toUpperCase()}</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
