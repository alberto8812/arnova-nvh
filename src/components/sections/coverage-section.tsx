import { motion } from "motion/react";
import { useContent } from "@/hooks/use-content";
import { Container } from "@/components/ui";
import { fadeUp } from "@/components/motion";
import { CoverageMap } from "./coverage-map";

const VP = { once: true, amount: 0.25 } as const;
const ARROW = "linear-gradient(90deg, var(--color-accent-700), var(--color-accent-500))";

// Statement on the left, dot-grid country map on the right (stacked on
// mobile). Cities and requirements are intentionally not rendered here.
export function CoverageSection() {
  const { coverage } = useContent();
  return (
    <section id="cobertura" className="py-14 md:py-[76px]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-[5fr_6fr] gap-6 md:gap-14 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            <span
              aria-hidden="true"
              className="block w-10 h-1 rounded-sm mb-[22px]"
              style={{ background: ARROW }}
            />
            <h2
              className="font-sans font-semibold text-brand-900 m-0"
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.12,
                textWrap: "balance",
              }}
            >
              {coverage.headline}
            </h2>
            <p
              className="m-0 mt-3.5 md:mt-[18px] max-w-[22em] text-[19px] md:text-[23px] leading-normal text-neutral-600"
              style={{ textWrap: "balance" }}
            >
              {coverage.intro}
            </p>
          </motion.div>

          <CoverageMap />
        </div>
      </Container>
    </section>
  );
}
