"use client";

// Note: Metadata needs to be handled by a parent layout since this is a client component

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Upload,
  Download,
  Settings,
  Smartphone,
  Monitor,
  CornerDownRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ButtonNextNative from "@/components/Button";
import { Input } from "@/components/ui/input";
import { useIconGenerator } from "@/hooks/use-icon-generator";
import HighlightedSpan from "@/components/HighlightedSpan";
import { trackEvent } from "@/services/custom-analytics";

// Small UI components for clarity and modularity

interface ErrorMessageProps {
  message: string | null;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  const isWarning = message.startsWith("⚠️");

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`mt-4 rounded-lg border px-5 py-4 text-left text-base ${
        isWarning
          ? "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-900/60 dark:bg-yellow-950/40 dark:text-yellow-100"
          : "border-red-200 bg-red-50 text-red-900 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-100"
      }`}
    >
      {message}
    </div>
  );
}

interface SuccessShareCardProps {
  visible: boolean;
}

function SuccessShareCard({ visible }: SuccessShareCardProps) {
  const [copied, setCopied] = useState(false);
  const attributionSnippet =
    '<a href="https://nextnative.dev/free-tools/app-icon-splash-generator">App icon generator by NextNative</a>';

  if (!visible) return null;

  const handleShareOnX = () => {
    trackEvent("FreeTools_Share_Twitter_clicked");
    const text = encodeURIComponent(
      "Generated all my app icons & splash screens in seconds using this free tool by @nextnative.",
    );
    const url = encodeURIComponent(
      "https://nextnative.dev/free-tools/app-icon-splash-generator",
    );
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank",
    );
  };

  const handleCopySnippet = async () => {
    try {
      await navigator.clipboard.writeText(attributionSnippet);
      trackEvent("FreeTools_BacklinkSnippet_copied");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy attribution snippet", err);
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <div
        role="status"
        aria-live="polite"
        className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-left shadow-sm dark:border-emerald-900/60 dark:bg-emerald-950/40"
      >
        <p className="mb-4 text-lg font-semibold text-emerald-900 dark:text-emerald-100">
          Assets generated 🎉
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            size="lg"
            onClick={handleShareOnX}
            variant="outline"
            aria-label="Share this tool on X (Twitter)"
          >
            Share on X
          </Button>
          <Button
            size="lg"
            onClick={handleCopySnippet}
            variant="ghost"
            aria-label={
              copied ? "Attribution snippet copied" : "Copy attribution snippet"
            }
          >
            {copied ? "Copied! ✓" : "Copy attribution snippet"}
          </Button>
        </div>
      </div>
    </div>
  );
}

interface DemoImageButtonProps {
  onUseDemoImage: () => void;
}

function DemoImageButton({ onUseDemoImage }: DemoImageButtonProps) {
  return (
    <button
      type="button"
      onClick={onUseDemoImage}
      aria-label="Try the demo image to see how the generator works"
      className="ml-4 inline-flex cursor-pointer items-center text-base font-medium text-gray-600 underline-offset-4 hover:text-gray-900 hover:underline focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:text-gray-300 dark:hover:text-white"
    >
      Try demo image
    </button>
  );
}

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  isDragActive: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

function ImageUpload({
  onImageUpload,
  isDragActive,
  onDragOver,
  onDragLeave,
  onDrop,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="mb-8">
      <label
        htmlFor="image-upload"
        className="mb-3 block text-base font-semibold text-gray-900 dark:text-gray-100"
      >
        Upload Your App Image
      </label>
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload image area. Click to browse or drag and drop an image file"
        className={`cursor-pointer rounded-lg border-2 border-dashed p-10 text-center transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${
          isDragActive
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : "border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
      >
        <Upload
          className="mx-auto mb-5 h-14 w-14 text-gray-400"
          aria-hidden="true"
        />
        <p className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Drop your image here or click to browse
        </p>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Supports PNG, JPG, JPEG files up to 10MB
        </p>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-500">
          💡 Tip: Use at least 1024×1024px for best results
        </p>
        <input
          id="image-upload"
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onImageUpload(file);
          }}
          className="hidden"
          aria-label="Upload image file"
        />
      </div>
    </div>
  );
}

interface OptionsFormProps {
  appName: string;
  backgroundColor: string;
  roundedCorners: boolean;
  onAppNameChange: (value: string) => void;
  onBackgroundColorChange: (value: string) => void;
  onRoundedCornersChange: (value: boolean) => void;
}

function OptionsForm({
  appName,
  backgroundColor,
  roundedCorners,
  onAppNameChange,
  onBackgroundColorChange,
  onRoundedCornersChange,
}: OptionsFormProps) {
  const colorPresets = [
    { name: "White", value: "#ffffff" },
    { name: "Black", value: "#000000" },
    { name: "iOS Blue", value: "#007AFF" },
    { name: "Android Green", value: "#3DDC84" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Red", value: "#EF4444" },
  ];

  return (
    <div className="mb-8 space-y-6">
      <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
        <Settings className="h-6 w-6" aria-hidden="true" />
        Generation Options
      </h3>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="app-name"
            className="mb-2 block text-base font-semibold text-gray-900 dark:text-gray-100"
          >
            App Name
          </label>
          <Input
            id="app-name"
            type="text"
            value={appName}
            onChange={(e) => onAppNameChange(e.target.value)}
            placeholder="Enter your app name"
            className="w-full text-base"
            aria-describedby="app-name-hint"
          />
          <p
            id="app-name-hint"
            className="mt-2 text-sm text-gray-600 dark:text-gray-400"
          >
            Will appear on splash screens
          </p>
        </div>

        <div>
          <label
            htmlFor="background-color"
            className="mb-2 block text-base font-semibold text-gray-900 dark:text-gray-100"
          >
            Background Color
          </label>
          <div className="flex items-center gap-3">
            <input
              id="background-color"
              type="color"
              value={backgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
              className="h-12 w-14 cursor-pointer rounded-md border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600"
              aria-label="Select background color using color picker"
            />
            <Input
              type="text"
              value={backgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
              placeholder="#ffffff"
              className="flex-1 text-base"
              aria-label="Enter background color hex code"
              aria-describedby="color-hint"
            />
          </div>
          <div
            className="mt-3 flex flex-wrap gap-2"
            role="group"
            aria-label="Color presets"
          >
            {colorPresets.map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => onBackgroundColorChange(preset.value)}
                className="group relative rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                aria-label={`Select ${preset.name} color`}
                title={preset.name}
              >
                <div
                  className={`h-8 w-8 rounded-md border-2 transition-all ${
                    backgroundColor.toLowerCase() === preset.value.toLowerCase()
                      ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                      : "border-gray-300 hover:border-gray-400 dark:border-gray-600"
                  }`}
                  style={{ backgroundColor: preset.value }}
                  aria-hidden="true"
                />
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 rounded bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-gray-100 dark:text-gray-900">
                  {preset.name}
                </span>
              </button>
            ))}
          </div>
          <p
            id="color-hint"
            className="mt-4 text-sm text-gray-600 dark:text-gray-400"
          >
            Background color for splash screens
          </p>
        </div>
      </div>

      <div>
        <label className="group flex cursor-pointer items-center gap-3">
          <input
            id="rounded-corners"
            type="checkbox"
            checked={roundedCorners}
            onChange={(e) => onRoundedCornersChange(e.target.checked)}
            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-describedby="rounded-corners-hint"
          />
          <span className="flex items-center gap-2 text-base font-medium text-gray-900 dark:text-gray-100">
            <CornerDownRight className="h-5 w-5" aria-hidden="true" />
            Rounded corners for icons
          </span>
        </label>
        <p
          id="rounded-corners-hint"
          className="mt-2 ml-8 text-sm text-gray-600 dark:text-gray-400"
        >
          Applies modern rounded corners to app icons
        </p>
      </div>
    </div>
  );
}

interface PreviewSectionProps {
  sourceImageUrl: string | null;
  previewUrls: { [key: string]: string };
  appName: string;
}

function PreviewSection({
  sourceImageUrl,
  previewUrls,
  appName,
}: PreviewSectionProps) {
  if (!sourceImageUrl) {
    return (
      <div className="mb-8">
        <h3 className="mb-5 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Preview
        </h3>
        <div
          className="rounded-lg bg-gray-50 p-10 text-center dark:bg-gray-800"
          role="status"
        >
          <Smartphone
            className="mx-auto mb-5 h-16 w-16 text-gray-400"
            aria-hidden="true"
          />
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Upload an image to see previews
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h3 className="mb-5 text-xl font-semibold text-gray-900 dark:text-gray-100">
        Preview
      </h3>

      <div className="grid grid-cols-1 gap-8">
        {/* Icon Previews */}
        <div>
          <h4 className="mb-5 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            <Smartphone className="h-5 w-5" aria-hidden="true" />
            App Icons
          </h4>
          <div className="rounded-lg border border-gray-100 bg-gray-50 p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="grid grid-cols-4 gap-4">
              {[
                "ios-icon-1024",
                "ios-icon-512",
                "ios-icon-256",
                "ios-icon-128",
              ].map((sizeName) => {
                const url = previewUrls[sizeName];
                const size = sizeName.split("-")[2];
                return (
                  <div key={sizeName} className="text-center">
                    <div className="mb-2 rounded-lg bg-white p-3 shadow-md dark:bg-gray-700">
                      {url ? (
                        <img
                          src={url}
                          alt={`${size}x${size} icon preview`}
                          className="h-auto w-full rounded"
                        />
                      ) : (
                        <div className="flex aspect-square items-center justify-center rounded bg-gray-200 dark:bg-gray-600">
                          <Smartphone
                            className="h-6 w-6 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {size}×{size}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Splash Screen Previews */}
        <div>
          <h4 className="mb-5 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            <Monitor className="h-5 w-5" aria-hidden="true" />
            Splash Screens
          </h4>
          <div className="rounded-lg border border-gray-100 bg-gray-50 p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="grid gap-4">
              {[
                { name: "ios-splash-2732x2732", label: "Square" },
                { name: "ios-splash-1242x2688", label: "Portrait" },
              ].map(({ name, label }) => {
                const url = previewUrls[name];
                return (
                  <div key={name} className="text-center">
                    <div className="mb-2 rounded-lg bg-white p-3 shadow-md dark:bg-gray-700">
                      {url ? (
                        <img
                          src={url}
                          alt={`${label} splash screen preview`}
                          className="h-auto max-h-48 w-full rounded object-contain"
                        />
                      ) : (
                        <div className="flex h-32 items-center justify-center rounded bg-gray-200 dark:bg-gray-600">
                          <Monitor
                            className="h-8 w-8 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface GenerationButtonProps {
  onGenerate: () => void;
  isGenerating: boolean;
  progress: { current: number; total: number; percentage: number };
  disabled: boolean;
}

function GenerationButton({
  onGenerate,
  isGenerating,
  progress,
  disabled,
}: GenerationButtonProps) {
  return (
    <div className="text-center">
      <p className="mb-4 text-base text-gray-600 dark:text-gray-400">
        You'll get 40+ icons and 2 splash screens in a single ZIP.
        {!disabled && (
          <span className="ml-2 inline-flex items-center rounded bg-gray-100 px-2.5 py-1 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            ⌘ + Enter
          </span>
        )}
      </p>
      <Button
        onClick={onGenerate}
        disabled={disabled || isGenerating}
        size="lg"
        className="px-10 py-6 text-lg font-semibold"
        aria-label={
          isGenerating
            ? `Generating assets, ${progress.percentage}% complete`
            : "Generate and download ZIP file"
        }
      >
        {isGenerating ? (
          <>
            <div
              className="mr-3 h-5 w-5 animate-spin rounded-full border-b-2 border-white"
              role="status"
              aria-label="Generating"
            />
            Generating... {progress.percentage}%
          </>
        ) : (
          <>
            <Download className="mr-2 h-5 w-5" aria-hidden="true" />
            Generate & Download ZIP
          </>
        )}
      </Button>

      {isGenerating && (
        <div className="mt-5" role="status" aria-live="polite">
          <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-3 rounded-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress.percentage}%` }}
              aria-hidden="true"
            />
          </div>
          <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
            Processing {progress.current} of {progress.total} assets...
          </p>
        </div>
      )}
    </div>
  );
}

export default function AppIconSplashGenerator() {
  const [sourceImage, setSourceImage] = useState<HTMLImageElement | null>(null);
  const [sourceImageUrl, setSourceImageUrl] = useState<string | null>(null);
  const [appName, setAppName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [roundedCorners, setRoundedCorners] = useState(true);
  const [isDragActive, setIsDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccessCard, setShowSuccessCard] = useState(false);

  const {
    isGenerating,
    progress,
    previewUrls,
    generatePreviews,
    generateAndDownload,
    cleanupPreviews,
  } = useIconGenerator();

  const handleImageUpload = useCallback(
    (file: File) => {
      setErrorMessage(null);
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage("File size must be less than 10MB");
        trackEvent("FreeTools_Error_file_too_large");
        return;
      }

      const img = document.createElement("img") as HTMLImageElement;
      const url = URL.createObjectURL(file);

      img.onload = () => {
        // Quality check: warn if image is too small
        if (img.width < 1024 || img.height < 1024) {
          setErrorMessage(
            "⚠️ Image resolution is low. For best results, use an image at least 1024×1024 pixels.",
          );
          trackEvent("FreeTools_Warning_low_resolution");
        }

        setSourceImage(img);
        setSourceImageUrl(url);
        trackEvent("FreeTools_ImageUploaded");

        // Generate previews immediately with current state values at time of upload
        generatePreviews(img, {
          appName,
          backgroundColor,
          roundedCorners,
        });
      };

      img.src = url;
    },
    [generatePreviews, appName, backgroundColor, roundedCorners],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragActive(false);

      const files = Array.from(e.dataTransfer.files);
      const imageFile = files.find((file) => file.type.startsWith("image/"));

      if (imageFile) {
        handleImageUpload(imageFile);
      }
    },
    [handleImageUpload],
  );

  const handleGenerate = useCallback(async () => {
    if (!sourceImage) return;

    try {
      setErrorMessage(null);
      setShowSuccessCard(false);
      trackEvent("FreeTools_Generate_Clicked");
      await generateAndDownload(sourceImage, {
        appName,
        backgroundColor,
        roundedCorners,
      });
      trackEvent("FreeTools_ZIP_generated");
      setShowSuccessCard(true);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to generate assets. Please try again.");
      trackEvent("FreeTools_Error_generation_failed");
    }
  }, [
    sourceImage,
    appName,
    backgroundColor,
    roundedCorners,
    generateAndDownload,
  ]);

  // Load saved settings on mount and track view
  useEffect(() => {
    try {
      const savedAppName = window.localStorage.getItem("nn_icon_appName");
      const savedBg = window.localStorage.getItem("nn_icon_backgroundColor");
      const savedRounded = window.localStorage.getItem(
        "nn_icon_roundedCorners",
      );

      if (savedAppName) setAppName(savedAppName);
      if (savedBg) setBackgroundColor(savedBg);
      if (savedRounded !== null) {
        setRoundedCorners(savedRounded === "true");
      }
    } catch (err) {
      console.error("Failed to load saved settings", err);
    }

    trackEvent("FreeTools_Viewed");
  }, []);

  // Persist settings when they change
  useEffect(() => {
    try {
      window.localStorage.setItem("nn_icon_appName", appName);
      window.localStorage.setItem("nn_icon_backgroundColor", backgroundColor);
      window.localStorage.setItem(
        "nn_icon_roundedCorners",
        roundedCorners ? "true" : "false",
      );
    } catch (err) {
      console.error("Failed to save settings", err);
    }
  }, [appName, backgroundColor, roundedCorners]);

  // Update previews when options change (debounced to avoid lag on typing)
  useEffect(() => {
    if (!sourceImage) return;

    const timeoutId = setTimeout(() => {
      generatePreviews(sourceImage, {
        appName,
        backgroundColor,
        roundedCorners,
      });
    }, 500); // Increased debounce to 500ms for better performance

    return () => clearTimeout(timeoutId);
  }, [sourceImage, appName, backgroundColor, roundedCorners, generatePreviews]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupPreviews();
      if (sourceImageUrl) {
        URL.revokeObjectURL(sourceImageUrl);
      }
    };
  }, [cleanupPreviews, sourceImageUrl]);

  // Keyboard shortcuts for power users
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Cmd/Ctrl + Enter to generate
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && sourceImage) {
        e.preventDefault();
        handleGenerate();
        trackEvent("FreeTools_Keyboard_Generate");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [sourceImage, handleGenerate]);

  return (
    <div className="mx-auto w-full max-w-[962px] px-4 py-12 xl:max-w-[1260px] xl:px-0">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 py-10 text-center">
          <h1 className="mb-4 text-4xl font-semibold text-gray-900 md:text-[74px] md:leading-[91px]">
            Free App Icon & Splash Screen{" "}
            <HighlightedSpan>Generator</HighlightedSpan>
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-600 dark:text-gray-400">
            Upload one image and instantly get all required icon and splash
            screen sizes for iOS and Android apps. 100% free, no signup
            required.
          </p>

          {/* Social proof / usage stats */}
          <div className="mx-auto mb-10 flex flex-wrap items-center justify-center gap-6 text-base text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                ⚡
              </span>
              <span>
                <strong className="text-gray-900 dark:text-gray-100">
                  Instant
                </strong>{" "}
                generation
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                🎨
              </span>
              <span>
                <strong className="text-gray-900 dark:text-gray-100">
                  40+
                </strong>{" "}
                sizes included
              </span>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-3xl" aria-hidden="true">
                ✨
              </span>
              <span>
                <strong className="text-gray-900 dark:text-gray-100">
                  No watermark
                </strong>
              </span>
            </div>
          </div>

          <ButtonNextNative
            onClick={() => {
              trackEvent("FreeTools_CTA_clicked");
              const el = document.getElementById("upload-form");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
            variant="primary"
          >
            Upload your image now
          </ButtonNextNative>
          <DemoImageButton
            onUseDemoImage={async () => {
              try {
                trackEvent("FreeTools_DemoImage_used");
                const response = await fetch(
                  "/showcase/bill-organizer/logo.png",
                );
                const blob = await response.blob();
                const file = new File([blob], "demo-app-icon.png", {
                  type: blob.type || "image/png",
                });
                handleImageUpload(file);
                const el = document.getElementById("upload-form");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                }
              } catch (err) {
                console.error("Failed to load demo image", err);
                setErrorMessage("Failed to load demo image. Please try again.");
                trackEvent("FreeTools_Error_demo_image_failed");
              }
            }}
          />
        </div>

        {/* Main Content */}
        <div
          id="upload-form"
          className="mb-12 rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-900"
        >
          <ImageUpload
            onImageUpload={handleImageUpload}
            isDragActive={isDragActive}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          />

          <OptionsForm
            appName={appName}
            backgroundColor={backgroundColor}
            roundedCorners={roundedCorners}
            onAppNameChange={setAppName}
            onBackgroundColorChange={setBackgroundColor}
            onRoundedCornersChange={setRoundedCorners}
          />

          <PreviewSection
            sourceImageUrl={sourceImageUrl}
            previewUrls={previewUrls}
            appName={appName}
          />

          <GenerationButton
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            progress={progress}
            disabled={!sourceImage}
          />

          <ErrorMessage message={errorMessage} />
          <SuccessShareCard visible={showSuccessCard} />
        </div>

        {/* Additional Info */}
        <div className="py-14 sm:py-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-[500] md:text-4xl">
              Everything you need to launch
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Generate professional mobile app assets in seconds
            </p>
          </div>

          <div className="mb-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900/60 dark:ring-gray-700">
              <span className="mb-5 block text-4xl" aria-hidden="true">
                📱
              </span>
              <h3 className="mb-3 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                All Sizes Included
              </h3>
              <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                Generate all required iOS and Android icon sizes (40+ variants)
                plus key splash screens in one click.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900/60 dark:ring-gray-700">
              <span className="mb-5 block text-4xl" aria-hidden="true">
                🎨
              </span>
              <h3 className="mb-3 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Customizable
              </h3>
              <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                Choose background colors, rounded corners, and add your app name
                to splash screens for a polished, on-brand launch.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900/60 dark:ring-gray-700">
              <span className="mb-5 block text-4xl" aria-hidden="true">
                ⚡
              </span>
              <h3 className="mb-3 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Ready to Use
              </h3>
              <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                Download an organized ZIP with folders for iOS/Android plus a
                README explaining exactly where to drop each asset.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12 max-w-3xl space-y-8 text-left">
            <h3 className="text-3xl font-semibold text-gray-900 dark:text-gray-50">
              Frequently asked questions
            </h3>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Is this generator really free?
              </h4>
              <p className="mt-2 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                Yes. This app icon and splash screen generator is completely
                free to use, with no signup and no watermarks. It&apos;s part of
                the NextNative toolset to help you ship production-ready mobile
                apps faster.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                How do I use these icons in Xcode / Android Studio?
              </h4>
              <p className="mt-2 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                The ZIP includes a README that explains exactly where to drop
                your icons and splash screens in Xcode and Android Studio. You
                can also see platform-specific guides in the{" "}
                <a
                  href="https://nextnative.dev/docs"
                  className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:text-blue-400 dark:hover:text-blue-300"
                >
                  NextNative docs
                </a>
                .
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Can I use these assets for commercial apps?
              </h4>
              <p className="mt-2 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                Yes. You retain full rights to icons and splash screens you
                generate from your own artwork. You can use them in commercial
                apps, client projects, and apps built with NextNative.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Does this work with Capacitor, React Native, or Flutter?
              </h4>
              <p className="mt-2 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                The exported assets are just PNG files, so they work with any
                modern mobile stack. For Capacitor and NextNative, follow the{" "}
                <a
                  href="https://nextnative.dev/docs"
                  className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Capacitor icon &amp; splash docs
                </a>
                . For React Native or Flutter, place the files in your iOS and
                Android projects as usual.
              </p>
            </div>
          </div>

          {/* For blog authors */}
          <div className="max-w-3xl rounded-2xl border border-dashed border-gray-300 bg-white/70 p-8 text-left shadow-sm dark:border-gray-700 dark:bg-gray-900/60">
            <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-50">
              For blog authors &amp; educators
            </h3>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              If you&apos;re writing about mobile design, app store
              optimization, or app development tutorials, feel free to link this
              generator as a resource. It&apos;s free, no signup,
              watermark-free, and ideal for helping your readers quickly
              generate production-ready app icons and splash screens.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
