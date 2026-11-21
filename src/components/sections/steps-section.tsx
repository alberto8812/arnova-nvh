import { motion } from "motion/react";
import { useContent } from "@/hooks/use-content";
import { fadeUp, EASE } from "@/components/motion";
import { AppIcon, Container } from "@/components/ui";

const VP = { once: true, amount: 0.2 } as const;
const ARROW_V = "linear-gradient(180deg, var(--color-accent-700), var(--color-accent-500))";

// Split layout: the advice block (with the WhatsApp action) leads on the
// left; the steps run as a compact vertical stepper on the right, ending on
// the payoff card. The step carrying `link` feeds the advice block with its
// `d` text, so the stepper keeps only titles and stays balanced.
export function StepsSection() {
  const { steps } = useContent();
  const help = steps.find((s) => s.link);
  const last = steps.length - 1;

  return (
    <section
      id="como-funciona"
      className="bg-neutral-50 pt-16 pb-14 md:pt-[120px] md:pb-[76px]"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-[5fr_6fr] gap-9 md:gap-16 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            <h2
              className="font-sans font-semibold text-brand-900 m-0"
              style={{
                fontSize: "clamp(28px, 4vw, 40px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.12,
                textWrap: "balance",
              }}
            >
              Pasos para solicitar un crédito
            </h2>

            {help?.link && (
              <div className="relative mt-6 md:mt-8 overflow-hidden rounded-[10px] bg-brand-900 text-on-brand shadow-brand-xl pl-7 pr-5 py-[26px] md:pl-9 md:pr-8 md:py-8">
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1.5"
                  style={{ background: ARROW_V }}
                />
                <div
                  aria-hidden="true"
                  className="grid place-items-center w-12 h-12 mb-[18px] rounded-xl bg-white/10"
                >
                  <AppIcon name="chat" size={26} />
                </div>
                <p className="m-0 text-lg md:text-xl leading-normal">{help.d}</p>
                <a
                  href={help.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 min-h-[52px] px-7 mt-6 rounded-[10px] bg-white text-brand-900 text-lg font-bold transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-white"
                >
                  <AppIcon name="phone" size={22} />
                  {help.link.label}
                </a>
              </div>
            )}
          </motion.div>

          <ol className="list-none m-0 p-0">
            {steps.map((s, i) => {
              const payoff = i === last;
              return (
                <motion.li
                  key={s.n}
                  className={`relative ${payoff ? "" : "grid grid-cols-[48px_1fr] md:grid-cols-[56px_1fr] gap-4 md:gap-5 pb-9"}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VP}
                  transition={{ duration: 0.55, ease: EASE, delay: i * 0.12 }}
                >
                  {!payoff && (
                    // Connector to the next step, in the arrow gradient
                    <span
                      aria-hidden="true"
                      className="absolute left-[22px] md:left-[26px] top-12 md:top-14 bottom-0 w-1 rounded-sm"
                      style={{ background: ARROW_V }}
                    />
                  )}
                  {payoff ? (
                    <div
                      className="grid grid-cols-[56px_1fr] md:grid-cols-[64px_1fr] gap-3.5 md:gap-[18px] items-center rounded-[10px] border-2 border-transparent shadow-brand-lg p-4 md:py-5 md:pl-5 md:pr-6"
                      style={{
                        background:
                          "linear-gradient(#fff, #fff) padding-box, linear-gradient(90deg, var(--color-accent-700), var(--color-accent-500)) border-box",
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="grid place-items-center w-14 h-14 md:w-16 md:h-16 rounded-full text-on-brand"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--color-action-red-start), var(--color-action-orange-start))",
                        }}
                      >
                        <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12.5l4.5 4.5L19 7.5" />
                        </svg>
                      </span>
                      <h3 className="m-0 font-sans font-bold text-brand-900 text-2xl md:text-[30px] leading-[1.15] tracking-[-0.01em]">
                        {s.t}
                      </h3>
                    </div>
                  ) : (
                    <>
                      <span
                        aria-hidden="true"
                        className="relative z-10 grid place-items-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border-[3px] border-brand-900 text-brand-900 text-xl md:text-[22px] font-bold"
                      >
                        {Number(s.n)}
                      </span>
                      <div className="pt-1.5 md:pt-2">
                        {s.lead && (
                          <p className="m-0 mb-1 text-[15px] leading-snug font-semibold text-neutral-600">
                            {s.lead}
                          </p>
                        )}
                        <h3 className="m-0 font-sans font-semibold text-brand-900 text-[21px] md:text-2xl leading-tight tracking-[-0.01em]">
                          {s.t}
                        </h3>
                      </div>
                    </>
                  )}
                </motion.li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
