import dynamic from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";
import WaveDivider from "@/components/effects/WaveDivider";

const SignatureProject = dynamic(
  () => import("@/components/home/SignatureProject")
);
const ServicesSection = dynamic(
  () => import("@/components/home/ServicesSection")
);
const ProcessSection = dynamic(
  () => import("@/components/home/ProcessSection")
);
const MaterialsSection = dynamic(
  () => import("@/components/home/MaterialsSection")
);
const TestimonialsSection = dynamic(
  () => import("@/components/home/TestimonialsSection")
);
const CtaSection = dynamic(() => import("@/components/home/CtaSection"));

export default function Home() {
  return (
    <>
      {/* 1. Hero — curtain-split-reveal with spotlight gradient */}
      <HeroSection />

      <WaveDivider color="var(--clr-surface-2)" variant="sharp" />

      {/* 2. Signature Project — asymmetric split, spotlight section */}
      <SignatureProject />

      <WaveDivider color="var(--clr-surface-1)" variant="sharp" flip />

      {/* 3. Services — bento grid with featured cedar fencing */}
      <ServicesSection />

      <WaveDivider color="var(--clr-surface-2)" variant="sharp" />

      {/* 4. Process — zigzag four-step journey */}
      <ProcessSection />

      <WaveDivider color="var(--clr-surface-1)" variant="sharp" flip />

      {/* 5. Materials — offset grid, spotlight + texture */}
      <MaterialsSection />

      <WaveDivider color="var(--clr-surface-2)" variant="sharp" />

      {/* 6. Testimonials — stacked cards, section-bg-deep */}
      <TestimonialsSection />

      <WaveDivider color="var(--clr-surface-1)" variant="sharp" flip />

      {/* 7. CTA — full-bleed, no animation (intentional stillness) */}
      <CtaSection />
    </>
  );
}
