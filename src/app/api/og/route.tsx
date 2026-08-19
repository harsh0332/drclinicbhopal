import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Baby Steps – Newborn & Child Clinic";
  const category = searchParams.get("category") || "Pediatric Care";
  const doctor = searchParams.get("doctor") || "Dr. Sudarshan Dev Arya & Dr. Manisha Bangarwa Arya";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#0A2540",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.06) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.06) 2%, transparent 0%)",
          backgroundSize: "100px 100px",
          padding: "60px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Category Pill */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              backgroundColor: "rgba(52, 199, 164, 0.15)",
              color: "#34C7A4",
              border: "1px solid rgba(52, 199, 164, 0.4)",
              borderRadius: "24px",
              padding: "8px 20px",
              fontSize: "18px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {category}
          </div>
        </div>

        {/* Title & Subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "1040px" }}>
          <div
            style={{
              fontSize: title.length > 55 ? "44px" : "52px",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.2,
              letterSpacing: "-0.5px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "#93C5FD",
              fontWeight: 500,
            }}
          >
            Evidence-based Pediatric &amp; Neonatal Guidance · Neelbad, Bhopal
          </div>
        </div>

        {/* Footer Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "20px", fontWeight: 700, color: "#FBBF24" }}>
              Baby Steps – Newborn &amp; Child Clinic
            </div>
            <div style={{ fontSize: "15px", color: "#94A3B8" }}>
              227/1, Pooja Colony, Neelbad · +91 62625 60101
            </div>
          </div>
          <div style={{ fontSize: "16px", color: "#34C7A4", fontWeight: 600 }}>
            {doctor}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
