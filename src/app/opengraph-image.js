import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "linear-gradient(135deg, #0d1b3e 0%, #0066cc 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            background: "rgba(255,255,255,0.15)",
            borderRadius: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <div style={{ color: "#fff", fontSize: 72, fontWeight: 900 }}>G</div>
        </div>
        <div style={{ color: "#fff", fontSize: 64, fontWeight: 800, marginBottom: 16, letterSpacing: "-2px" }}>
          GrossLINE Pharm
        </div>
        <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 28, maxWidth: 700, textAlign: "center", lineHeight: 1.4 }}>
          Фармацевтическая компания Узбекистана
        </div>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 20, marginTop: 40 }}>
          grossline.uz
        </div>
      </div>
    ),
    { ...size }
  );
}
