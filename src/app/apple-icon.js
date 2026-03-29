import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#0d1b3e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 20,
        }}
      >
        <div
          style={{
            color: "#fff",
            fontSize: 100,
            fontWeight: 900,
            fontFamily: "sans-serif",
            letterSpacing: "-4px",
          }}
        >
          G
        </div>
      </div>
    ),
    { ...size }
  );
}
