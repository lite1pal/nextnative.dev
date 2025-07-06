import PricingSection from "@/components/PricingSection";

function PricingPage() {
  return (
    <div className="py-12">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-[500]">Pricing</h1>
        </div>
        <PricingSection />
      </div>
    </div>
  );
}

export default PricingPage;
