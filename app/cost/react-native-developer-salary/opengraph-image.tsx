import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "React Native Developer Salary Guide 2025";
export const size = {
  width: 1200,
  height: 630,
};
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
          backgroundColor: "white",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #f0fdf4 0%, white 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontFamily: "Outfit Medium",
              fontWeight: 500,
              color: "#111827",
              textAlign: "center",
              marginBottom: 50,
              lineHeight: 1.2,
            }}
          >
            React Native Developer Salary 2025
          </div>

          <div
            style={{
              display: "flex",
              gap: 30,
              marginBottom: 40,
            }}
          >
            {/* Junior */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 25,
                backgroundColor: "#f9fafb",
                borderRadius: 16,
                border: "2px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  fontFamily: "Outfit Regular",
                  color: "#6b7280",
                  marginBottom: 8,
                }}
              >
                Junior
              </div>
              <div
                style={{
                  fontSize: 36,
                  fontFamily: "Outfit Medium",
                  color: "#16a34a",
                }}
              >
                $25K-$75K
              </div>
            </div>

            {/* Mid */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 25,
                backgroundColor: "#f9fafb",
                borderRadius: 16,
                border: "2px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  fontFamily: "Outfit Regular",
                  color: "#6b7280",
                  marginBottom: 8,
                }}
              >
                Mid-Level
              </div>
              <div
                style={{
                  fontSize: 36,
                  fontFamily: "Outfit Medium",
                  color: "#16a34a",
                }}
              >
                $40K-$115K
              </div>
            </div>

            {/* Senior */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 25,
                backgroundColor: "#f9fafb",
                borderRadius: 16,
                border: "2px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  fontFamily: "Outfit Regular",
                  color: "#6b7280",
                  marginBottom: 8,
                }}
              >
                Senior
              </div>
              <div
                style={{
                  fontSize: 36,
                  fontFamily: "Outfit Medium",
                  color: "#16a34a",
                }}
              >
                $60K-$155K
              </div>
            </div>
          </div>

          <div
            style={{
              fontSize: 32,
              fontFamily: "Outfit Regular",
              color: "#6b7280",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Complete salary guide by experience & location
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 60,
              display: "flex",
              alignItems: "center",
              gap: 15,
            }}
          >
            <div
              style={{
                width: 50,
                height: 50,
                backgroundColor: "#06B300",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
              }}
            >
              ⚡
            </div>
            <div
              style={{
                fontSize: 36,
                fontFamily: "Outfit Medium",
                color: "#111827",
              }}
            >
              NextNative
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Outfit Regular",
          data: await outfitRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "Outfit Medium",
          data: await outfitMedium,
          style: "normal",
          weight: 500,
        },
      ],
    },
  );
}
