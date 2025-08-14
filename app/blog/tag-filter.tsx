"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function TagFilter({ tags, currentTag }: { tags: string[]; currentTag?: string }) {
  const router = useRouter();
  const sp = useSearchParams();

  const active = currentTag ?? sp.get("tag") ?? "all";

  const setTag = (t: string | null) => {
    if (!t || t === "all") {
      router.push("/blog");
    } else {
      router.push(`/blog/tag/${encodeURIComponent(t.replaceAll(" ", "-"))}`);
    }
  };

  const basePill =
    "inline-flex cursor-pointer items-center rounded-2xl px-4 py-2 text-sm font-medium " +
    "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
    "bg-[#CDEBFF] text-black";

  const activePill =
    "bg-primary text-white";

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => setTag("all")}
        className={`${basePill} ${active === "all" ? activePill : ""}`}
      >
        All
      </button>

      {tags.filter((tag) => !tag.includes("-")).map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => setTag(tag)}
          className={`${basePill} ${active === tag ? activePill : ""}`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
