import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "App Development Cost Calculator";
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
            App Development
            <br />
            Cost Calculator 📊
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#666",
              marginBottom: 40,
              fontFamily: "Outfit",
            }}
          >
            Get Instant Estimates • Select Features • View Timeline
          </div>
          <div
            style={{
              display: "flex",
              gap: 30,
              fontSize: 24,
              color: "#111",
              fontFamily: "Outfit",
              backgroundColor: "#f0fdf4",
              padding: "30px 50px",
              borderRadius: 20,
            }}
          >
            <div>✓ Feature Selection</div>
            <div>✓ Platform Choice</div>
            <div>✓ Timeline Estimate</div>
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
