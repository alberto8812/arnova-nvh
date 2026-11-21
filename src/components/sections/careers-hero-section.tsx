import { motion } from "motion/react";
import { useContent } from "@/hooks/use-content";
import { Eyebrow } from "@/components/ui";
import { slideInLeft, slideInRight } from "@/components/motion";

const VP = { once: true, amount: 0.2 } as const;

export function CareersHeroSection() {
  const { jobsPage } = useContent();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
      <motion.div
        variants={slideInLeft}
        initial="hidden"
        whileInView="visible"
        viewport={VP}
      >
        {jobsPage.heroEyebrow && <Eyebrow>{jobsPage.heroEyebrow}</Eyebrow>}
        <h1
          className="font-sans font-semibold mt-[14px] text-brand-900"
          style={{
            fontSize: "clamp(26px, 6vw, 34px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.12,
            textWrap: "balance",
            margin: "14px 0 18px",
          }}
        >
          {jobsPage.heroHeadline}
          {jobsPage.heroHeadlineItalic && (
            <>
              {" "}
              <span className="font-serif italic font-medium">{jobsPage.heroHeadlineItalic}</span>
            </>
          )}
        </h1>
        <div className="flex flex-col gap-3 text-base leading-[1.65] text-neutral-600 max-w-[520px]">
          {jobsPage.heroParagraphs.map((p) => (
            <p key={p} className="m-0">
              {p}
            </p>
          ))}
          <p className="m-0 mt-1 text-brand-900 font-semibold">
            {jobsPage.heroEmail.label}{" "}
            <a
              href={`mailto:${jobsPage.heroEmail.address}`}
              className="text-brand-700 underline underline-offset-4 decoration-accent-500 hover:text-brand-900 break-words focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 rounded-sm"
            >
              {jobsPage.heroEmail.address}
            </a>
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={slideInRight}
        initial="hidden"
        whileInView="visible"
        viewport={VP}
        className="relative rounded-xl overflow-hidden bg-neutral-200 aspect-[4/3] md:aspect-auto md:min-h-[300px]"
      >
        <img
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=70"
          alt={jobsPage.heroImageAlt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "saturate(0.88) contrast(1.02)" }}
          loading="lazy"
        />
      </motion.div>
    </div>
  );
}
