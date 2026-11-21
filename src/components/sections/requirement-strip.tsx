import { motion, useReducedMotion } from "motion/react";
import { useContent } from "@/hooks/use-content";
import { Container } from "@/components/ui";
import { fadeUp, EASE } from "@/components/motion";

const VP = { once: true, amount: 0.35 } as const;
const NODE_GRADIENT =
  "linear-gradient(135deg, var(--color-action-red-start), var(--color-action-orange-start))";

// Splits `text` on the highlight substrings (longest first). A highlight that
// is absent from the text is simply ignored, so the sentence always renders.
function renderWithHighlights(text: string, highlights: string[]) {
  const terms = highlights.filter(Boolean).sort((a, b) => b.length - a.length);
  if (terms.length === 0) return text;
  const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(${escaped.join("|")})`));
  return parts.map((part, i) =>
    terms.includes(part) ? (
      <strong
        key={i}
        className="font-bold px-[0.06em] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
        style={{
          background:
            "linear-gradient(transparent 62%, var(--color-accent-300) 62%)",
          boxShadow: "inset 0 -0.1em 0 var(--color-action-orange-start)",
        }}
      >
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

// Full-bleed accent strip: one sentence replaces the old requirement cards.
// The check mark draws in on entry (already drawn under reduced motion).
export function RequirementStrip() {
  const { coverage } = useContent();
  const reduce = useReducedMotion();
  const { text, highlights } = coverage.requirementNote;

  return (
    <section
      id="requisito"
      aria-label="Requisito"
      className="relative overflow-hidden bg-accent-100 border-y border-accent-300"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(520px 220px at 12% 50%, rgba(255,255,255,.75), rgba(255,255,255,0))",
        }}
      />
      <Container>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          className="relative flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-[26px] md:gap-9 py-10 md:py-11"
        >
          <div
            aria-hidden="true"
            className="relative flex-none w-[92px] h-[92px] md:w-28 md:h-28"
          >
            <div
              className="grid place-items-center w-full h-full rounded-full text-white"
              style={{
                background: NODE_GRADIENT,
                boxShadow:
                  "0 18px 30px -12px rgba(186,20,26,.5), 0 0 0 10px rgba(255,255,255,.55)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                focusable="false"
                className="w-[46px] h-[46px] md:w-14 md:h-14"
              >
                <path d="M3 9.5 4.6 4.5h14.8L21 9.5" />
                <path d="M3 9.5a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
                <path d="M5 12.5V20h14v-7.5" />
                <path d="M10 20v-4.5h4V20" />
              </svg>
            </div>
            <motion.span
              className="absolute -right-1.5 -bottom-1 grid place-items-center w-[38px] h-[38px] md:w-11 md:h-11 rounded-full bg-brand-900 border-[3px] border-accent-100 shadow-brand-xl"
              initial={reduce ? false : { scale: 0.4, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={VP}
              transition={{ duration: 0.5, ease: EASE, delay: 0.35 }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                focusable="false"
                className="w-[22px] h-[22px] overflow-visible"
              >
                <motion.path
                  d="M4.5 12.5 9.8 17.8 19.5 6.5"
                  initial={reduce ? false : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={VP}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.65 }}
                />
              </svg>
            </motion.span>
          </div>

          <p
            className="m-0 max-w-[17.5em] font-medium text-brand-900"
            style={{
              fontSize: "clamp(26px, 7.4vw, 44px)",
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
              textWrap: "balance",
            }}
          >
            {renderWithHighlights(text, highlights)}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
