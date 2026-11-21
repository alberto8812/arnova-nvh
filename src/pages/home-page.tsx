import {
  HeroSection,
  TrustBarSection,
  BenefitsSection,
  // SimulatorSection, — retired by client request; kept for future reuse
  GrowthSection,
  //AmountSelectorSection,
  StepsSection,
  // ServicesSection, — section commented out in the JSX below
  AboutSection,
  MissionVisionSection,
  CoverageSection,
  RequirementStrip,
  TestimonialsSection,
  VideosSection,
  FaqSection,
  ContactSection,
} from "@/components/sections";

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrustBarSection />
      <BenefitsSection />
      {/* <SimulatorSection /> */}
      <GrowthSection />
      {/* <AmountSelectorSection /> */}
      <StepsSection />
      {/* <ServicesSection /> */}
      <CoverageSection />
      <RequirementStrip />
      <AboutSection />
      <MissionVisionSection />
      <TestimonialsSection />
      <VideosSection />
      <FaqSection />
      <ContactSection />
    </main>
  );
}
