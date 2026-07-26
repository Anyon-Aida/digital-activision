type WorkSocialImageProps = {
  description: string;
  locale: string;
  title: string;
};

type CaseStudySocialImageProps = {
  locale: string;
  result: string;
  status: string;
  title: string;
};

const frameStyle = {
  alignItems: "stretch",
  background: "#08111f",
  color: "#f8fafc",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "space-between",
  padding: "68px 76px",
  width: "100%",
} as const;

function SocialImageChrome({ locale }: { locale: string }) {
  return (
    <div
      style={{
        alignItems: "center",
        color: "#67e8f9",
        display: "flex",
        fontSize: 22,
        fontWeight: 700,
        justifyContent: "space-between",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      <span>Digital Activision</span>
      <span>{locale.toUpperCase()}</span>
    </div>
  );
}

export function WorkSocialImage({
  description,
  locale,
  title,
}: WorkSocialImageProps) {
  return (
    <div style={frameStyle}>
      <SocialImageChrome locale={locale} />
      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        <div
          style={{
            color: "#a9a4ff",
            display: "flex",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Engineering case studies · 04
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            maxWidth: 1_050,
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: "#cbd5e1",
            display: "flex",
            fontSize: 28,
            lineHeight: 1.3,
            maxWidth: 1_000,
          }}
        >
          {description}
        </div>
      </div>
      <div
        style={{
          borderTop: "2px solid #263244",
          color: "#94a3b8",
          display: "flex",
          fontSize: 22,
          justifyContent: "space-between",
          paddingTop: 24,
        }}
      >
        <span>Kovács Zalán · Full-Stack Engineering</span>
        <span style={{ color: "#67e8f9" }}>/work</span>
      </div>
    </div>
  );
}

export function CaseStudySocialImage({
  locale,
  result,
  status,
  title,
}: CaseStudySocialImageProps) {
  return (
    <div style={frameStyle}>
      <SocialImageChrome locale={locale} />
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            color: "#a9a4ff",
            display: "flex",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Engineering case study · {status}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 46 ? 52 : 62,
            fontWeight: 800,
            letterSpacing: "-0.035em",
            lineHeight: 1.02,
            maxWidth: 1_060,
          }}
        >
          {title}
        </div>
        <div
          style={{
            borderLeft: "4px solid #67e8f9",
            color: "#cbd5e1",
            display: "flex",
            fontSize: result.length > 150 ? 24 : 28,
            lineHeight: 1.3,
            maxWidth: 1_040,
            paddingLeft: 22,
          }}
        >
          {result}
        </div>
      </div>
      <div
        style={{
          borderTop: "2px solid #263244",
          color: "#94a3b8",
          display: "flex",
          fontSize: 22,
          justifyContent: "space-between",
          paddingTop: 24,
        }}
      >
        <span>Kovács Zalán · Full-Stack Engineering</span>
        <span style={{ color: "#67e8f9" }}>Case study</span>
      </div>
    </div>
  );
}
