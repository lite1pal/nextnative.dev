import Image from "next/image";

export default function RatingSvg({
  priority = false,
}: {
  priority?: boolean;
}) {
  return (
    <Image
      src="/stars.svg"
      width={109}
      height={25}
      alt="5 out of 5 stars"
      style={{ display: "inline-block" }}
      priority={priority}
    />
  );
}
