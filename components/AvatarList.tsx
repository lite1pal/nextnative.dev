import { cn } from "@/lib/utils";
import Image from "next/image";

export function AvatarList({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("-mr-4", className)}>
      <Image
        src={"/testimonials/customers-new-1.webp"}
        alt={"NextNative Customers"}
        width={260}
        height={260}
        priority={priority}
      />
    </div>
  );
}
