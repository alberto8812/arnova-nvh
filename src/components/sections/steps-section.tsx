import { motion } from "motion/react";
import { useContent } from "@/hooks/use-content";
import { fadeUp, EASE } from "@/components/motion";
import { Container } from "@/components/ui";

const VP = { once: true, amount: 0.2 } as const;

export function StepsSection() {
  const { steps } = useContent();
  return (
    <section
      id="como-funciona"
      className="bg-neutral-50 pt-16 pb-12 md:pt-[120px] md:pb-[76px]"
    >
      <Container>
      {/* Header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={VP}
      >
        <div className="font-mono text-xs tracking-[.14em] uppercase text-neutral-400">
       
        </div>
        <h2
          className="font-sans font-semibold mt-[14px] text-brand-900"
          style={{
            fontSize: "clamp(26px, 6vw, 34px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.12,
            maxWidth: "520px",
            textWrap: "balance",
            marginBottom: "44px",
          }}
        >
          Pasos para solicitar un crédito
        </h2>
      </motion.div>

      {/* Steps — each child gets its own whileInView + delay; the grid container has overflow:hidden
          so we can't use a staggerContainer wrapper (IntersectionObserver can't observe display:contents) */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 border border-neutral-200 bg-neutral-50"
        style={{
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        {steps.map((p, i) => {
          // One row of three from md up: stacked rows divide with a bottom
          // border on mobile, columns with a right border from md.
          const isLast = i === steps.length - 1;
          const borderClasses = isLast
            ? ""
            : "border-b md:border-b-0 md:border-r";
          return (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: i * 0.1 }}
              viewport={VP}
              className={`px-6 py-7 md:px-[30px] md:py-[34px] border-neutral-200 ${borderClasses}`}
            >
              <div className="font-mono text-[13px] tracking-[.08em] text-brand-500">
                PASO {p.n}
              </div>
              <h3
                className="font-sans font-semibold text-brand-900"
                style={{ fontSize: "20px", margin: "14px 0 8px" }}
              >
                {p.t}
              </h3>
              {p.d && (
                <p className="text-[15px] leading-[1.55] m-0 text-neutral-600">
                  {p.d}
                </p>
              )}
              {p.link && (
                <a
                  href={p.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 text-[15px] font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 rounded-sm"
                >
                  {p.link.label}
                  <span aria-hidden="true" className="text-accent-500">→</span>
                </a>
              )}
            </motion.div>
          );
        })}
      </div>
      </Container>
    </section>
  );
}
