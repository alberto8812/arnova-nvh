import { motion } from "motion/react";
import { useContent } from "@/hooks/use-content";
import { EASE } from "@/components/motion";
import { Container } from "@/components/ui";
import type { MissionVisionContent } from "@/types/content.types";

const VP = { once: true, amount: 0.25 } as const;
const ARROW = "linear-gradient(90deg, var(--color-accent-700), var(--color-accent-500))";

type Glyph = MissionVisionContent["items"][number]["icon"];

// Target for the mission (what we do today), eye for the vision (where we go).
function Glyph({ name }: { name: Glyph }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === "mission" ? (
        <>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.4" fill="currentColor" />
        </>
      ) : (
        <>
          <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
    </svg>
  );
}

// Light section after the navy purpose band: two parallel statements as twin
// cards (site card style), stacked on mobile.
export function MissionVisionSection() {
  const { missionVision } = useContent();

  return (
    <section id="mision-vision" className="bg-neutral-50 py-14 md:py-[76px]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {missionVision.items.map((item, i) => (
            <motion.article
              key={item.title}
              className="arnova-card relative overflow-hidden rounded-[10px] border border-neutral-200 bg-white px-7 py-8 md:px-10 md:py-11"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 }}
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{ background: ARROW }}
              />
              <span
                className="grid place-items-center w-14 h-14 rounded-full text-on-brand"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-action-red-start), var(--color-action-orange-start))",
                }}
              >
                <Glyph name={item.icon} />
              </span>
              <h2
                className="font-sans font-bold text-brand-900 mt-6 mb-3"
                style={{
                  fontSize: "clamp(28px, 3.4vw, 36px)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                {item.title}
              </h2>
              <p
                className="m-0 text-[17px] md:text-lg leading-[1.6] text-neutral-600"
                style={{ textWrap: "pretty" }}
              >
                {item.text}
              </p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
