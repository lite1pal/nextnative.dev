import { cn } from "@/lib/utils";
import Image from "next/image";

const data = [
  {
    name: "Vlad",
    position: "Android developer",
    image: "/testimonials/vlad.webp",
  },
  {
    name: "Bogdan",
    position: "NVIDIA GPU Engineer",
    image: "/testimonials/bogdan.webp",
  },
  {
    name: "Denis",
    position: "Web developer",
    image: "/testimonials/denis.jpg",
  },
  // {
  //   name: "Richard",
  //   position: "Developer",
  //   image: "/testimonials/richard.png",
  // },
  {
    name: "Vilaliy",
    position: "Senior .NET Developer",
    image: "/testimonials/vitaliy.jpeg",
  },
  {
    name: "Terry",
    position: "Developer",
    image: "/testimonials/terry.jpg",
  },
  {
    name: "Mat B.",
    position: "Developer",
    image: "/testimonials/snouzy.jpg",
  },

  // {
  //   name: "Ryan",
  //   position: "Front-End Web Developer",
  //   image: "/testimonials/ryan.png",
  // },
  {
    name: "Martin",
    position: "Entrepreneur",
    image: "/testimonials/martin.png",
  },
  // { name: "Syauqy", position: "Developer", image: "/testimonials/syauqy.jpeg" },
];

export function AvatarList({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes: Record<"sm" | "md" | "lg", string> = {
    lg: "m-3 size-6",
    md: "m-2 size-12",
    sm: "m-2 size-8",
  };

  return (
    <div className={cn("flex", className)}>
      {data.map((item) => (
        <div
          key={item.name}
          className="pointer-events-none relative z-0 -ml-4 flex scale-100 items-center -space-x-4"
        >
          <div className="relative overflow-hidden rounded-full">
            <div className="bg-size animate-bg-position pointer-events-none absolute h-full w-full from-violet-500 from-30% via-cyan-400 via-50% to-pink-500 to-80% bg-[length:300%_auto] opacity-15 xl:group-hover:bg-gradient-to-r" />
            <div className="z-1 blur-lg" />
            <Image
              src={item.image}
              alt={item.name}
              width={300}
              height={300}
              className={cn(
                "rounded-full object-cover",
                sizes[size] ?? sizes.md,
              )}
              sizes="(max-width: 1279px) 50vw, 25vw"
            />
          </div>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 translate-y-2 transform rounded bg-slate-900 p-2 whitespace-nowrap text-white opacity-0 xl:group-hover:-translate-y-2 xl:group-hover:opacity-100">
            <div className="text-sm font-semibold">{item.name}</div>
            <div className="text-sm">{item.position}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
