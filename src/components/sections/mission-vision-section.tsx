import { motion } from "motion/react";
import { useContent } from "@/hooks/use-content";
import { EASE } from "@/components/motion";
import { AppIcon, Container } from "@/components/ui";

const VP = { once: true, amount: 0.25 } as const;

// Editorial definition list after the navy purpose band: each row pairs the
// site icon + term (section-heading scale) with its statement, divided by
// neutral-200 rules. Stacks per row on mobile.
export function MissionVisionSection() {
  const { missionVision } = useContent();

  return (
    <section id="mision-vision" className="bg-neutral-50 py-14 md:py-[76px]">
      <Container>
        <dl className="m-0 border-y border-neutral-200">
          {missionVision.items.map((item, i) => (
            <motion.div
              key={item.title}
              className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-4 md:gap-16 items-center py-8 md:py-11 border-neutral-200 [&+&]:border-t"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 }}
            >
              <dt className="flex items-center gap-5 text-brand-900">
                <span aria-hidden="true" className="shrink-0">
                  <AppIcon name={item.icon} size={50} />
                </span>
                <span
                  className="font-sans font-semibold"
                  style={{
                    fontSize: "clamp(26px, 6vw, 34px)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.12,
                  }}
                >
                  {item.title}
                </span>
              </dt>
              <dd
                className="m-0 text-lg leading-[1.6] text-neutral-600 max-w-[34em]"
                style={{ textWrap: "pretty" }}
              >
                {item.text}
              </dd>
            </motion.div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
