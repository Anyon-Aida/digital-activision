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
          role: "Full-Stack Developer és Product Engineer",
          detail:
            "Enterprise workflowk · 3D konfigurátorok · digitális termékek",
        }
      : {
          role: "Full-Stack Developer & Product Engineer",
          detail:
            "Enterprise workflows · 3D configurators · digital products",
        };

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#f7f5f0",
          color: "#101418",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "66px 76px",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            color: "#1f4b99",
            display: "flex",
            fontSize: 22,
            fontWeight: 700,
            justifyContent: "space-between",
          }}
        >
          <span>Kovács Zalán</span>
          <span
            style={{
              color: "#67707c",
              fontSize: 15,
              letterSpacing: "0.12em",
            }}
          >
            {locale.toUpperCase()} · PORTFOLIO
          </span>
        </div>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            gap: 54,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 22,
              width: 670,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 70,
                fontWeight: 800,
                letterSpacing: "-0.045em",
                lineHeight: 1,
              }}
            >
              {copy.role}
            </div>
            <div
              style={{
                color: "#67707c",
                display: "flex",
                fontSize: 25,
                lineHeight: 1.35,
              }}
            >
              {copy.detail}
            </div>
          </div>
          <div
            style={{
              border: "1px solid #c6c9cc",
              display: "flex",
              flexDirection: "column",
              height: 294,
              justifyContent: "space-between",
              padding: 24,
              position: "relative",
              width: 318,
            }}
          >
            {["WORKFLOW", "3D CONFIG", "BOOKING"].map((label, index) => (
              <div
                key={label}
                style={{
                  alignItems: "center",
                  border: `1px solid ${
                    index === 0
                      ? "#1f4b99"
                      : index === 1
                        ? "#6b5cf6"
                        : "#0097b5"
                  }`,
                  display: "flex",
                  fontSize: 13,
                  height: 58,
                  justifyContent: "space-between",
                  letterSpacing: "0.08em",
                  padding: "0 16px",
                  transform: `translateX(${index * 13}px)`,
                  width: 220,
                }}
              >
                <span>{label}</span>
                <span style={{ color: "#67707c" }}>0{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            alignItems: "center",
            borderTop: "1px solid #d8d9d6",
            color: "#67707c",
            display: "flex",
            fontSize: 19,
            justifyContent: "space-between",
            paddingTop: 22,
          }}
        >
          <span>React · Next.js · Node.js · Laravel · SQL</span>
          <span style={{ color: "#6b5cf6" }}>digitalactivision.hu</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
