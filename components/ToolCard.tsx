import Image from "next/image";

export default function ToolCard({ tool, bullets, img }: any) {
  return (
    <div
      style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
      className="flex h-[121.4px] w-fit items-center justify-center rounded-[20px] bg-white px-16 py-4"
    >
      <div className="flex gap-[20px]">
        <div className="h-[60px] w-[60px] overflow-hidden rounded-[10px]">
          <Image
            src={img}
            width={120}
            height={120}
            className="h-full w-full object-cover"
            alt={tool}
            sizes={"60px"}
            priority
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-[24px] font-medium">{tool}</div>

          <ul role="list" className="market-[#868C98] list-disc pl-[17px]">
            {bullets.map((bullet: string) => (
              <li key={bullet} className="text-[16px] text-[#868C98]">
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
