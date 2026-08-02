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
  background: "#f7f5f0",
  color: "#101418",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "space-between",
  padding: "68px 76px",
  position: "relative",
  width: "100%",
} as const;

function SocialImageChrome({ locale }: { locale: string }) {
  return (
    <div
      style={{
        alignItems: "center",
        color: "#1f4b99",
        display: "flex",
        fontSize: 22,
        fontWeight: 700,
        justifyContent: "space-between",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      <span>Kovács Zalán</span>
      <span>{locale.toUpperCase()}</span>
    </div>
  );
}

function BlueprintMotif() {
  return (
    <div
      style={{
        display: "flex",
        height: 250,
        opacity: 0.34,
        position: "absolute",
        right: 58,
        top: 142,
        width: 410,
      }}
    >
      <div
        style={{
          borderLeft: "2px solid #1f4b99",
          borderTop: "2px solid #1f4b99",
          display: "flex",
          height: 105,
          left: 0,
          position: "absolute",
          top: 0,
          width: 190,
        }}
      />
      <div
        style={{
          borderBottom: "2px solid #0097b5",
          borderRight: "2px solid #0097b5",
          bottom: 0,
          display: "flex",
          height: 130,
          position: "absolute",
          right: 0,
          width: 240,
        }}
      />
      <div
        style={{
          background: "#6b5cf6",
          borderRadius: 999,
          display: "flex",
          height: 14,
          left: 181,
          position: "absolute",
          top: 96,
          width: 14,
        }}
      />
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
      <BlueprintMotif />
      <SocialImageChrome locale={locale} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 26,
          position: "relative",
        }}
      >
        <div
          style={{
            color: "#6b5cf6",
            display: "flex",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {locale === "hu" ? "Kiemelt munkák" : "Selected work"} · 05
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
            color: "#67707c",
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
          borderTop: "2px solid #c6c9cc",
          color: "#67707c",
          display: "flex",
          fontSize: 22,
          justifyContent: "space-between",
          paddingTop: 24,
        }}
      >
        <span>Kovács Zalán · Full-Stack Developer & Product Engineer</span>
        <span style={{ color: "#1f4b99" }}>/work</span>
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
      <BlueprintMotif />
      <SocialImageChrome locale={locale} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          position: "relative",
        }}
      >
        <div
          style={{
            color: "#6b5cf6",
            display: "flex",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {locale === "hu" ? "Esettanulmány" : "Case study"} · {status}
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
            borderLeft: "4px solid #0097b5",
            color: "#67707c",
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
          borderTop: "2px solid #c6c9cc",
          color: "#67707c",
          display: "flex",
          fontSize: 22,
          justifyContent: "space-between",
          paddingTop: 24,
        }}
      >
        <span>Kovács Zalán · Full-Stack Developer & Product Engineer</span>
        <span style={{ color: "#1f4b99" }}>
          Digital Activision Studio
        </span>
      </div>
    </div>
  );
}
