"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check, DollarSign } from "lucide-react"; // Icon library
import IPhoneMockup from "@/components/note-taking/iphone-mockup";

function ComponentWrapper({
  children,
  codeExample,
  heading = "Component Example",
  paid = false,
}: {
  children: React.ReactNode;
  codeExample: string;
  heading?: string;
  paid?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeExample);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 sec
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div
      style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
      className="rounded-xl bg-white p-6"
    >
      <div className="mb-2 flex items-center gap-6">
        <h2 className="text-xl font-[500] sm:font-semibold">{heading}</h2>

        {!paid && (
          <div className="border-primary text-primary flex items-center gap-1 rounded-full border-2 bg-white px-5 py-0.5 font-[500]">
            <DollarSign size={16} />
            Free
          </div>
        )}
      </div>
      <Tabs defaultValue="preview" className="py-5">
        <TabsList className="gap-1.5">
          <TabsTrigger value="preview" className="cursor-pointer text-lg">
            Preview
          </TabsTrigger>

          <TabsTrigger value="code" className="cursor-pointer text-lg">
            Code
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="preview"
          className="flex items-center justify-center py-10"
        >
          <div className="relative max-h-[450px] overflow-hidden">
            <IPhoneMockup isDark={false}>
              <div className="h-full min-h-[810px] bg-white px-4 pt-16">
                {children}
              </div>
            </IPhoneMockup>
            <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-white via-white/90 to-transparent" />
          </div>
        </TabsContent>

        <TabsContent value="code" className="relative mt-3">
          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="absolute top-3 left-3 cursor-pointer rounded-lg bg-white p-2 transition-colors hover:bg-gray-200"
            title="Copy code"
          >
            {copied ? (
              <Check className="text-primary" size={16} />
            ) : (
              <Copy size={16} />
            )}
          </button>

          <SyntaxHighlighter
            language="tsx"
            style={nightOwl}
            customStyle={{
              padding: "1rem",
              borderRadius: "0.7rem",
              backgroundColor: "rgba(0, 0, 0, 0.90)",
              marginTop: "0",
              paddingTop: "60px",
            }}
          >
            {codeExample}
          </SyntaxHighlighter>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ComponentWrapper;
