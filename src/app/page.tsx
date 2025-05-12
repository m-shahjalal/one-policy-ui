import CTASection from "@/components/blocks/cta";
import DocumentsSection from "@/components/blocks/facilities";
import FeaturesSection from "@/components/blocks/features";
import OnePolicyHero from "@/components/blocks/hero";
import HowItWorks from "@/components/blocks/how-works";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <OnePolicyHero />
      <HowItWorks />
      <DocumentsSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
}
