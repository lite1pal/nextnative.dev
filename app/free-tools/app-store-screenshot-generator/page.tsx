"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Preset = {
  id: string;
  label: string;
  w: number;
  h: number;
  store: "ios" | "ipad" | "play" | "custom";
  orientation: "portrait" | "landscape";
};

// Updated presets based on 2025 App Store and Google Play requirements
// Resolutions selected as the highest for each common display size
// Sources: Apple Developer documentation and Google Play Console Help
const PRESETS: Preset[] = [
  {
    id: "ios-69",
    label: "iOS 6.9″ (1320×2868 portrait)",
    w: 1320,
    h: 2868,
    store: "ios",
    orientation: "portrait",
  },
  {
    id: "ios-65",
    label: "iOS 6.5″ (1284×2778 portrait)",
    w: 1284,
    h: 2778,
    store: "ios",
    orientation: "portrait",
  },
  {
    id: "ios-55",
    label: "iOS 5.5″ (1242×2208 portrait)",
    w: 1242,
    h: 2208,
    store: "ios",
    orientation: "portrait",
  },
  {
    id: "ipad-13",
    label: "iPad 13″ (2064×2752 portrait)",
    w: 2064,
    h: 2752,
    store: "ipad",
    orientation: "portrait",
  },
  {
    id: "play-phone",
    label: "Google Play Phone (1080×1920 portrait)",
    w: 1080,
    h: 1920,
    store: "play",
    orientation: "portrait",
  },
  {
    id: "play-tablet",
    label: "Google Play Tablet (1920×1200 landscape)",
    w: 1920,
    h: 1200,
    store: "play",
    orientation: "landscape",
  },
  {
    id: "custom",
    label: "Custom",
    w: 1320,
    h: 2868,
    store: "custom",
    orientation: "portrait",
  },
];

type Uploaded = { id: string; src: string; name: string };

export default function AppStoreScreenshotGenerator() {
  const [uploads, setUploads] = useState<Uploaded[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<Preset>(PRESETS[0]);
  const [customW, setCustomW] = useState(1320);
  const [customH, setCustomH] = useState(2868);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "portrait",
  );

  const [title, setTitle] = useState("Ship faster with NextNative");
  const [subtitle, setSubtitle] = useState(
    "Turn your website into an iOS & Android app",
  );

  const [padding, setPadding] = useState(80); // inner padding around content
  const [bgMode, setBgMode] = useState<"solid" | "gradient" | "image">("solid");
  const [bg1, setBg1] = useState("#0ea5a3"); // teal-ish
  const [bg2, setBg2] = useState("#16a34a"); // green
  const [bgImage, setBgImage] = useState<Uploaded | null>(null);
  const [gradientDirection, setGradientDirection] = useState<
    "diagonal" | "vertical" | "horizontal"
  >("diagonal");
  const [textColor, setTextColor] = useState("#ffffff");
  const [imageScale, setImageScale] = useState(100); // %
  const [cornerRadius, setCornerRadius] = useState(48);
  const [textYOffset, setTextYOffset] = useState(0); // adjustable text block position
  const [previewIndex, setPreviewIndex] = useState(0); // which upload to preview

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dropRef = useRef<HTMLDivElement | null>(null);

  // Active size, considering orientation
  const size = useMemo(() => {
    let w =
      selectedPreset.id !== "custom"
        ? selectedPreset.w
        : Math.max(500, Math.floor(customW));
    let h =
      selectedPreset.id !== "custom"
        ? selectedPreset.h
        : Math.max(900, Math.floor(customH));
    if (orientation === "landscape") {
      [w, h] = [h, w];
    }
    return { w, h };
  }, [selectedPreset, customW, customH, orientation]);

  const onUpload = (files: FileList | null) => {
    if (!files?.length) return;
    Array.from(files).forEach((f) => {
      const reader = new FileReader();
      reader.onload = () => {
        setUploads((u) => [
          ...u,
          { id: crypto.randomUUID(), src: String(reader.result), name: f.name },
        ]);
      };
      reader.readAsDataURL(f);
    });
  };

  const onBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setBgImage({
        id: crypto.randomUUID(),
        src: String(reader.result),
        name: file.name,
      });
    };
    reader.readAsDataURL(file);
    e.currentTarget.value = "";
  };

  const removeUpload = (id: string) =>
    setUploads((u) => u.filter((x) => x.id !== id));

  const draw = async (imgSrc?: string, targetSize = size) => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const { w, h } = targetSize;

    canvas.width = w;
    canvas.height = h;

    // background
    if (bgMode === "solid") {
      ctx.fillStyle = bg1;
      ctx.fillRect(0, 0, w, h);
    } else if (bgMode === "gradient") {
      let g;
      if (gradientDirection === "vertical") {
        g = ctx.createLinearGradient(0, 0, 0, h);
      } else if (gradientDirection === "horizontal") {
        g = ctx.createLinearGradient(0, 0, w, 0);
      } else {
        g = ctx.createLinearGradient(0, 0, w, h);
      }
      g.addColorStop(0, bg1);
      g.addColorStop(1, bg2);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    } else if (bgMode === "image" && bgImage) {
      const bgImg = await loadImage(bgImage.src);
      // cover fill
      const ratio = Math.max(w / bgImg.width, h / bgImg.height);
      const drawW = Math.floor(bgImg.width * ratio);
      const drawH = Math.floor(bgImg.height * ratio);
      const x = Math.floor((w - drawW) / 2);
      const y = Math.floor((h - drawH) / 2);
      ctx.drawImage(bgImg, x, y, drawW, drawH);
    }

    // rounded rect mask
    if (cornerRadius > 0) {
      ctx.save();
      roundedRectPath(ctx, 0, 0, w, h, cornerRadius);
      ctx.clip();
    }

    const innerW = w - padding * 2;
    const innerHTop = Math.floor(h * 0.33) + textYOffset; // adjustable text block
    const innerHBottom = h - padding * 2 - innerHTop;

    // Title/Sub
    ctx.fillStyle = textColor;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    // Title
    ctx.font = `700 ${Math.round(w * 0.062)}px system-ui, -apple-system, Segoe UI, Roboto, sans-serif`;
    const titleLines = wrapText(
      ctx,
      title,
      padding,
      padding,
      innerW,
      Math.round(w * 0.075),
    );

    // Subtitle below title
    ctx.font = `500 ${Math.round(w * 0.035)}px system-ui, -apple-system, Segoe UI, Roboto, sans-serif`;
    wrapText(
      ctx,
      subtitle,
      padding,
      padding + titleLines * Math.round(w * 0.075),
      innerW,
      Math.round(w * 0.05),
    );

    // Main image (contain)
    if (imgSrc) {
      const img = await loadImage(imgSrc);
      const scale = (imageScale || 100) / 100;

      const maxW = innerW;
      const maxH = innerHBottom;

      const ratio = Math.min(maxW / img.width, maxH / img.height) * scale;
      const drawW = Math.floor(img.width * ratio);
      const drawH = Math.floor(img.height * ratio);

      const x = Math.floor((w - drawW) / 2);
      const y = Math.floor(h - padding - drawH);

      // subtle drop shadow
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.25)";
      ctx.shadowBlur = Math.max(6, Math.floor(w * 0.01));
      ctx.shadowOffsetY = Math.max(3, Math.floor(h * 0.004));
      ctx.drawImage(img, x, y, drawW, drawH);
      ctx.restore();
    }

    if (cornerRadius > 0) {
      ctx.restore();
    }
  };

  // live preview
  useEffect(() => {
    draw(uploads[previewIndex]?.src);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    uploads,
    previewIndex,
    size.w,
    size.h,
    orientation,
    padding,
    bgMode,
    bg1,
    bg2,
    bgImage,
    gradientDirection,
    textColor,
    title,
    subtitle,
    imageScale,
    cornerRadius,
    textYOffset,
  ]);

  const downloadOne = async (img: Uploaded, p: Preset | null = null) => {
    let targetPreset = p;
    if (targetPreset && targetPreset.id === "custom") targetPreset = null;
    let targetSize = targetPreset
      ? { w: targetPreset.w, h: targetPreset.h }
      : size;
    let targetOrientation = targetPreset
      ? targetPreset.orientation
      : orientation;
    if (targetOrientation === "landscape") {
      targetSize = { w: targetSize.h, h: targetSize.w };
    }
    const canvas = canvasRef.current!;
    const prev = { w: canvas.width, h: canvas.height };
    await draw(img.src, targetSize);
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    const label = targetPreset
      ? targetPreset.label.replace(/[^\dx×]+/g, "").replace(/×/g, "x")
      : `${targetSize.w}x${targetSize.h}`;
    const base = img.name.replace(/\.[^.]+$/, "");
    a.download = `${base}-${label}.png`;
    a.click();
    // restore
    canvas.width = prev.w;
    canvas.height = prev.h;
    draw(uploads[previewIndex]?.src);
  };

  const downloadAllForPreset = (p: Preset | null = null) => {
    uploads.forEach((u, i) => {
      setTimeout(() => downloadOne(u, p), i * 500); // stagger to avoid browser limits
    });
  };

  // Drag and drop setup
  useEffect(() => {
    const dropArea = dropRef.current;
    if (!dropArea) return;

    const prevent = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: DragEvent) => {
      prevent(e);
      const files = e.dataTransfer?.files;
      onUpload(files || null);
    };

    dropArea.addEventListener("dragenter", prevent);
    dropArea.addEventListener("dragover", prevent);
    dropArea.addEventListener("dragleave", prevent);
    dropArea.addEventListener("drop", handleDrop);

    return () => {
      dropArea.removeEventListener("dragenter", prevent);
      dropArea.removeEventListener("dragover", prevent);
      dropArea.removeEventListener("dragleave", prevent);
      dropArea.removeEventListener("drop", handleDrop);
    };
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="mb-2 text-center text-4xl font-bold text-gray-900 dark:text-white">
        App Store Screenshot Generator 📱
      </h1>
      <p className="mb-16 text-center text-gray-600 dark:text-gray-400">
        Upload images, customize text & visuals, select store presets (updated
        for 2025), and export high-quality PNGs for App Store, Google Play, and
        more. Fully browser-based with drag & drop support.
      </p>

      {/* Controls */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: upload + list */}
        <section
          ref={dropRef}
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900"
        >
          <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            1) Upload screenshots (drag & drop here)
          </h3>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => onUpload(e.target.files)}
            className="mb-4"
          />
          <ul className="space-y-2 text-sm">
            {uploads.map((u, i) => (
              <li
                key={u.id}
                className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 ${i === previewIndex ? "bg-green-100 dark:bg-green-900" : "bg-gray-50 dark:bg-gray-800/60"}`}
                onClick={() => setPreviewIndex(i)}
              >
                <span className="truncate">{u.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeUpload(u.id);
                    if (previewIndex >= uploads.length - 1) setPreviewIndex(0);
                  }}
                  className="text-xs text-red-500 hover:underline"
                >
                  remove
                </button>
              </li>
            ))}
            {!uploads.length && (
              <li className="text-gray-500">
                No files yet. Drag images here or click to upload.
              </li>
            )}
          </ul>
        </section>

        {/* Middle: settings */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            2) Settings
          </h3>

          {/* Presets */}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">Preset</label>
            <select
              value={selectedPreset.id}
              onChange={(e) => {
                const p = PRESETS.find((x) => x.id === e.target.value)!;
                setSelectedPreset(p);
                setOrientation(p.orientation);
              }}
              className="w-full rounded-lg border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              {PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>

            {selectedPreset.id === "custom" && (
              <div className="mt-3 grid grid-cols-2 gap-3">
                <input
                  type="number"
                  min={300}
                  value={customW}
                  onChange={(e) => setCustomW(+e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="Width"
                />
                <input
                  type="number"
                  min={600}
                  value={customH}
                  onChange={(e) => setCustomH(+e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="Height"
                />
              </div>
            )}
            <p className="mt-2 text-xs text-gray-500">
              Presets updated for 2025. Always verify latest guidelines from
              Apple/Google.
            </p>
          </div>

          {/* Orientation */}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">
              Orientation
            </label>
            <select
              value={orientation}
              onChange={(e) =>
                setOrientation(e.target.value as "portrait" | "landscape")
              }
              className="w-full rounded-lg border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
            </select>
          </div>

          {/* Overlay text */}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">Subtitle</label>
            <input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Visuals */}
          <div className="mb-3 grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Background
              </label>
              <select
                value={bgMode}
                onChange={(e) => setBgMode(e.target.value as any)}
                className="w-full rounded-lg border border-gray-300 bg-white p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="solid">Solid</option>
                <option value="gradient">Gradient</option>
                <option value="image">Image</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Text color
              </label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="h-10 w-full cursor-pointer rounded-lg border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Color A</label>
              <input
                type="color"
                value={bg1}
                onChange={(e) => setBg1(e.target.value)}
                disabled={bgMode === "image"}
                className="h-10 w-full cursor-pointer rounded-lg border border-gray-300 bg-white disabled:opacity-40 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                {bgMode === "gradient" ? "Color B" : "—"}
              </label>
              <input
                type="color"
                value={bg2}
                onChange={(e) => setBg2(e.target.value)}
                disabled={bgMode !== "gradient"}
                className="h-10 w-full cursor-pointer rounded-lg border border-gray-300 bg-white disabled:opacity-40 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>
          </div>

          {bgMode === "gradient" && (
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium">
                Gradient Direction
              </label>
              <select
                value={gradientDirection}
                onChange={(e) => setGradientDirection(e.target.value as any)}
                className="w-full rounded-lg border border-gray-300 bg-white p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="diagonal">Diagonal</option>
                <option value="vertical">Vertical</option>
                <option value="horizontal">Horizontal</option>
              </select>
            </div>
          )}

          {bgMode === "image" && (
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium">
                Upload Background Image
              </label>
              <input type="file" accept="image/*" onChange={onBgUpload} />
              {bgImage && (
                <div className="mt-2 flex items-center">
                  <span className="truncate text-sm text-gray-500">
                    {bgImage.name}
                  </span>
                  <button
                    onClick={() => setBgImage(null)}
                    className="ml-2 text-xs text-red-500 hover:underline"
                  >
                    remove
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Range
              label="Padding"
              value={padding}
              setValue={setPadding}
              min={40}
              max={160}
            />
            <Range
              label="Image scale %"
              value={imageScale}
              setValue={setImageScale}
              min={60}
              max={140}
            />
            <Range
              label="Corner radius"
              value={cornerRadius}
              setValue={setCornerRadius}
              min={0}
              max={100}
            />
            <Range
              label="Text Y offset"
              value={textYOffset}
              setValue={setTextYOffset}
              min={-200}
              max={200}
            />
          </div>
        </section>

        {/* Right: preview & export */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            3) Preview & export
          </h3>
          <canvas
            ref={canvasRef}
            className="mx-auto block w-full max-w-sm rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
          />

          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button
              disabled={!uploads.length}
              onClick={() => downloadAllForPreset()}
              className="rounded-xl bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
            >
              Download all current ({size.w}×{size.h})
            </button>

            <button
              disabled={!uploads.length}
              onClick={() => downloadAllForPreset(PRESETS[0])}
              className="rounded-xl border border-green-600 px-4 py-2 font-semibold text-green-700 hover:bg-green-50 disabled:opacity-50 dark:hover:bg-gray-800"
            >
              All iOS 6.9″
            </button>
            <button
              disabled={!uploads.length}
              onClick={() => downloadAllForPreset(PRESETS[1])}
              className="rounded-xl border border-green-600 px-4 py-2 font-semibold text-green-700 hover:bg-green-50 disabled:opacity-50 dark:hover:bg-gray-800"
            >
              All iOS 6.5″
            </button>
            <button
              disabled={!uploads.length}
              onClick={() => downloadAllForPreset(PRESETS[3])}
              className="rounded-xl border border-green-600 px-4 py-2 font-semibold text-green-700 hover:bg-green-50 disabled:opacity-50 dark:hover:bg-gray-800"
            >
              All iPad 13″
            </button>
            <button
              disabled={!uploads.length}
              onClick={() => downloadAllForPreset(PRESETS[4])}
              className="rounded-xl border border-green-600 px-4 py-2 font-semibold text-green-700 hover:bg-green-50 disabled:opacity-50 dark:hover:bg-gray-800"
            >
              All Play Phone
            </button>
          </div>

          <p className="mt-3 text-xs text-gray-500">
            Tip: For batch exports, downloads are staggered. Use different
            presets for device-specific requirements. Supports up to 10
            screenshots per listing.
          </p>
        </section>
      </div>
    </div>
  );
}

/* ---------- small UI helpers ---------- */
function Range({
  label,
  value,
  setValue,
  min,
  max,
}: {
  label: string;
  value: number;
  setValue: (n: number) => void;
  min: number;
  max: number;
}) {
  return (
    <label className="flex flex-col">
      <span className="mb-1 text-sm font-medium">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(+e.target.value)}
        className="accent-green-600"
      />
      <span className="mt-1 text-xs text-gray-500">{value}</span>
    </label>
  );
}

function roundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
): number {
  const words = text.split(/\s+/);
  let line = "";
  let yy = y;
  let lines = 0;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const { width } = ctx.measureText(testLine);
    if (width > maxWidth && n > 0) {
      ctx.fillText(line.trimEnd(), x, yy);
      line = words[n] + " ";
      yy += lineHeight;
      lines++;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trimEnd(), x, yy);
  return lines + 1; // return line count for positioning
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
