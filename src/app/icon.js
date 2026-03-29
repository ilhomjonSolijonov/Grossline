import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#0d1b3e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 4,
        }}
      >
        <div
          style={{
            color: "#fff",
            fontSize: 18,
            fontWeight: 900,
            fontFamily: "sans-serif",
            letterSpacing: "-1px",
          }}
        >
          G
        </div>
      </div>
    ),
    { ...size }
  );
}
