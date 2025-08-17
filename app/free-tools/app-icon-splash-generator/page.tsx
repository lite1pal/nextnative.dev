"use client";

// Note: Metadata needs to be handled by a parent layout since this is a client component

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
        Upload Your App Image
      </label>
      <div
        className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
          isDragActive
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : "border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
        <p className="mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">
          Drop your image here or click to browse
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Supports PNG, JPG, JPEG files up to 10MB
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onImageUpload(file);
          }}
          className="hidden"
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
  return (
    <div className="mb-8 space-y-6">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
        <Settings className="h-5 w-5" />
        Generation Options
      </h3>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            App Name
          </label>
          <Input
            type="text"
            value={appName}
            onChange={(e) => onAppNameChange(e.target.value)}
            placeholder="Enter your app name"
            className="w-full"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Will appear on splash screens
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Background Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
              className="h-10 w-12 cursor-pointer rounded-md border border-gray-300 dark:border-gray-600"
            />
            <Input
              type="text"
              value={backgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
              placeholder="#ffffff"
              className="flex-1"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Background color for splash screens
          </p>
        </div>
      </div>

      <div>
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={roundedCorners}
            onChange={(e) => onRoundedCornersChange(e.target.checked)}
            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <CornerDownRight className="h-4 w-4" />
            Rounded corners for icons
          </span>
        </label>
        <p className="mt-1 ml-8 text-xs text-gray-500 dark:text-gray-400">
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
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Preview
        </h3>
        <div className="rounded-lg bg-gray-50 p-8 text-center dark:bg-gray-800">
          <Smartphone className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <p className="text-gray-500 dark:text-gray-400">
            Upload an image to see previews
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Preview
      </h3>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Icon Previews */}
        <div>
          <h4 className="text-md mb-4 flex items-center gap-2 font-medium text-gray-800 dark:text-gray-200">
            <Smartphone className="h-4 w-4" />
            App Icons
          </h4>
          <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
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
                    <div className="mb-2 rounded-lg bg-white p-2 shadow-sm dark:bg-gray-700">
                      {url ? (
                        <img
                          src={url}
                          alt={`${size}x${size} icon`}
                          className="h-auto w-full rounded"
                        />
                      ) : (
                        <div className="flex aspect-square items-center justify-center rounded bg-gray-200 dark:bg-gray-600">
                          <Smartphone className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
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
          <h4 className="text-md mb-4 flex items-center gap-2 font-medium text-gray-800 dark:text-gray-200">
            <Monitor className="h-4 w-4" />
            Splash Screens
          </h4>
          <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "ios-splash-2732x2732", label: "Square" },
                { name: "ios-splash-1242x2688", label: "Portrait" },
              ].map(({ name, label }) => {
                const url = previewUrls[name];
                return (
                  <div key={name} className="text-center">
                    <div className="mb-2 rounded-lg bg-white p-2 shadow-sm dark:bg-gray-700">
                      {url ? (
                        <img
                          src={url}
                          alt={`${label} splash screen`}
                          className="h-auto max-h-32 w-full rounded object-contain"
                        />
                      ) : (
                        <div className="flex h-32 items-center justify-center rounded bg-gray-200 dark:bg-gray-600">
                          <Monitor className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
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
      <Button
        onClick={onGenerate}
        disabled={disabled || isGenerating}
        size="lg"
        className="px-8 py-3 text-lg font-semibold"
      >
        {isGenerating ? (
          <>
            <div className="mr-3 h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
            Generating... {progress.percentage}%
          </>
        ) : (
          <>
            <Download className="mr-2 h-5 w-5" />
            Generate & Download ZIP
          </>
        )}
      </Button>

      {isGenerating && (
        <div className="mt-4">
          <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
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
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        return;
      }

      const img = document.createElement("img") as HTMLImageElement;
      const url = URL.createObjectURL(file);

      img.onload = () => {
        setSourceImage(img);
        setSourceImageUrl(url);

        // Generate previews immediately with current state values at time of upload
        generatePreviews(img, {
          appName,
          backgroundColor,
          roundedCorners,
        });
      };

      img.src = url;
    },
    [generatePreviews, appName, backgroundColor, roundedCorners], // Keep current state values as dependencies
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
      await generateAndDownload(sourceImage, {
        appName,
        backgroundColor,
        roundedCorners,
      });
    } catch (error) {
      alert("Failed to generate assets. Please try again.");
    }
  }, [
    sourceImage,
    appName,
    backgroundColor,
    roundedCorners,
    generateAndDownload,
  ]);

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
        </div>

        {/* Additional Info */}
        <div className="py-10 sm:py-36">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-[500] md:text-4xl">
              Everything you need to launch
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Generate professional mobile app assets in seconds
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-6">
              <span className="mb-4 block text-3xl">📱</span>
              <h3 className="mb-2 text-xl font-[500] text-gray-900 dark:text-gray-100">
                All Sizes Included
              </h3>
              <p className="text-gray-600">
                Generate all required iOS and Android icon sizes (40+ variants)
                in one click.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6">
              <span className="mb-4 block text-3xl">🎨</span>
              <h3 className="mb-2 text-xl font-[500] text-gray-900">
                Customizable
              </h3>
              <p className="text-gray-600">
                Choose background colors, rounded corners, and add your app name
                to splash screens.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6">
              <span className="mb-4 block text-3xl">⚡</span>
              <h3 className="mb-2 text-xl font-[500] text-gray-900">
                Ready to Use
              </h3>
              <p className="text-gray-600">
                Download organized ZIP with folders for iOS/Android and detailed
                setup instructions.
              </p>
            </div>
          </div>
        </div>

        {/* Related Links */}
        <div className="rounded-xl p-8">
          <h3 className="mb-10 text-center text-3xl font-[500] md:text-4xl">
            More Tools & Resources
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/blog"
              className="rounded-lg bg-white p-4 transition-shadow hover:shadow-md dark:bg-gray-700"
            >
              <h4 className="mb-2 font-medium text-gray-900 dark:text-gray-100">
                Mobile App Development Blog
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Learn best practices and tips
              </p>
            </Link>

            <Link
              href="/pricing"
              className="rounded-lg bg-white p-4 transition-shadow hover:shadow-md dark:bg-gray-700"
            >
              <h4 className="mb-2 font-medium text-gray-900 dark:text-gray-100">
                NextNative
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Build apps 10x faster with Next.js
              </p>
            </Link>

            <Link
              href="/showcase"
              className="rounded-lg bg-white p-4 transition-shadow hover:shadow-md dark:bg-gray-700"
            >
              <h4 className="mb-2 font-medium text-gray-900 dark:text-gray-100">
                App Showcase
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                See apps built with NextNative
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
