"use client";
import { useState } from "react";

export default function EventGalleryCarousel({ images }) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i > 0 ? i - 1 : images.length - 1));
  const next = () => setIndex((i) => (i < images.length - 1 ? i + 1 : 0));

  if (!images || images.length === 0) return null;

  return (
    <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #e8ecf0" }}>
      {/* Main carousel */}
      <div style={{ position: "relative", background: "#000", aspectRatio: "16 / 10" }}>
        <img
          src={images[index]}
          alt="Gallery"
          style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
        />

        {/* Prev/Next buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              style={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.2)",
                border: "none",
                color: "#fff",
                width: 40,
                height: 40,
                borderRadius: 6,
                cursor: "pointer",
                fontSize: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.35)"}
              onMouseLeave={(e) => e.target.style.background = "rgba(255,255,255,0.2)"}
            >
              ←
            </button>
            <button
              onClick={next}
              style={{
                position: "absolute",
                right: 16,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.2)",
                border: "none",
                color: "#fff",
                width: 40,
                height: 40,
                borderRadius: 6,
                cursor: "pointer",
                fontSize: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.35)"}
              onMouseLeave={(e) => e.target.style.background = "rgba(255,255,255,0.2)"}
            >
              →
            </button>
          </>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <div
            style={{
              position: "absolute",
              bottom: 12,
              right: 12,
              background: "rgba(0,0,0,0.5)",
              color: "#fff",
              padding: "6px 12px",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {index + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Dots indicator */}
      {images.length > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            padding: "16px 0",
            background: "#fff",
          }}
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              style={{
                width: i === index ? 24 : 8,
                height: 8,
                borderRadius: 4,
                border: "none",
                background: i === index ? "#1a56db" : "#d0d0d5",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
