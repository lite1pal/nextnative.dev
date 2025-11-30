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
  {
    name: "Vilaliy",
    position: "Senior .NET Developer",
    image: "/testimonials/vitaliy.jpeg",
  },
  { name: "Terry", position: "Developer", image: "/testimonials/terry.jpg" },
  { name: "Mat B.", position: "Developer", image: "/testimonials/snouzy.jpg" },
  {
    name: "Martin",
    position: "Entrepreneur",
    image: "/testimonials/martin.png",
  },
];

export function AvatarList({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes: Record<"sm" | "md" | "lg", string> = {
    lg: "h-16 w-16",
    md: "h-12 w-12",
    sm: "h-8 w-8",
  };

  return (
    <div className={cn("-mr-4", className)}>
      <Image
        src={"/testimonials/customers-new-1.webp"}
        alt={"NextNative Customers"}
        width={260}
        height={260}
        // sizes="50px"
      />
      {/* {data.map((item) => (
        <Image
          key={item.name}
          src={item.image}
          alt={item.name}
          width={1920}
          height={1080}
          className={cn("rounded-full object-cover", sizes[size])}
          // sizes="50px"
        />
      ))} */}
    </div>
  );
}
