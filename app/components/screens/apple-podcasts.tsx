"use client";

import { Blocks, Home, Library, Search } from "lucide-react";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function ApplePodcasts() {
  return (
    <div className={`${inter.className} relative h-[800px] tracking-[-3%]`}>
      <div className="flex items-center justify-between">
        <div className="text-[32px] font-[600]">Home</div>
        <div className="size-[39px] rounded-full bg-white"></div>
      </div>

      <BottomNav />
    </div>
  );
}

function BottomNav() {
  const activeTabColor = "text-[#B03EFF]";
  const [activeTab, setActiveTab] = useState("home");
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <div className="absolute right-0 bottom-0 left-0 z-10 flex h-[73px] w-full items-center justify-evenly gap-7 bg-black">
      <div
        onClick={() => handleTabClick("home")}
        className={`${activeTab === "home" ? activeTabColor : "opacity-70"} flex flex-col items-center text-[12px]`}
      >
        <Home size={36} />
        Home
      </div>
      <div
        onClick={() => handleTabClick("browse")}
        className={`${activeTab === "browse" ? activeTabColor : "opacity-70"} flex flex-col items-center text-[12px]`}
      >
        <Blocks size={36} />
        Browse
      </div>
      <div
        onClick={() => handleTabClick("library")}
        className={`${activeTab === "library" ? activeTabColor : "opacity-70"} flex flex-col items-center text-[12px]`}
      >
        <Library size={36} />
        Library
      </div>
      <div
        onClick={() => handleTabClick("search")}
        className={`${activeTab === "search" ? activeTabColor : "opacity-70"} flex flex-col items-center text-[12px]`}
      >
        <Search size={36} />
        Search
      </div>
    </div>
  );
}

export default ApplePodcasts;
