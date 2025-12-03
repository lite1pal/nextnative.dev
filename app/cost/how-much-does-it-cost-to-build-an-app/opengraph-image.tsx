import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "How Much Does It Cost to Build an App?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const outfitRegular = await readFile(
    join(process.cwd(), "public/fonts/Outfit-Regular.ttf"),
  );
  const outfitMedium = await readFile(
    join(process.cwd(), "public/fonts/Outfit-Medium.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          padding: "40px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 600,
              color: "#111",
              marginBottom: 20,
              fontFamily: "Outfit Medium",
              lineHeight: 1.2,
            }}
          >
            How Much Does It Cost
            <br />
            to Build an App? 💰
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#666",
              marginBottom: 40,
              fontFamily: "Outfit",
            }}
          >
            Interactive Calculator • Real 2025 Pricing
          </div>
          <div
            style={{
              display: "flex",
              gap: 40,
              fontSize: 28,
              color: "#111",
              fontFamily: "Outfit Medium",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: 48, color: "#06B300" }}>$500</div>
              <div style={{ fontSize: 20, color: "#666" }}>DIY</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: 48, color: "#06B300" }}>$30K</div>
              <div style={{ fontSize: 20, color: "#666" }}>Freelancer</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: 48, color: "#06B300" }}>$120K</div>
              <div style={{ fontSize: 20, color: "#666" }}>Agency</div>
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 80,
            fontSize: 24,
            color: "#06B300",
            fontFamily: "Outfit Medium",
          }}
        >
          nextnative.dev
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Outfit",
          data: outfitRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "Outfit Medium",
          data: outfitMedium,
          style: "normal",
          weight: 500,
        },
      ],
    },
  );
}
