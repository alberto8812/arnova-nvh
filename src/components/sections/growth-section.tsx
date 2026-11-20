import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useContent } from "@/hooks/use-content";
import { Container } from "@/components/ui";
import { EASE } from "@/components/motion";

const VP = { once: true, amount: 0.3 } as const;
// Loops are 10 s; advance anyway after this if `ended` never arrives.
const CLIP_MAX_MS = 12_000;

// Paints `highlight` (when present in `text`) with the Arnova arrow gradient.
function Highlighted({ text, highlight }: { text: string; highlight: string }) {
  const at = highlight ? text.indexOf(highlight) : -1;
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="bg-gradient-to-r from-accent-700 to-accent-500 bg-clip-text text-transparent">
        {highlight}
      </span>
      {text.slice(at + highlight.length)}
    </>
  );
}

// Each clip starts itself on mount through its own ref: during the crossfade
// the outgoing and incoming <video> coexist, so a shared DOM lookup would
// pick the outgoing one and leave the new clip frozen on its poster.
function LoopVideo({
  src,
  poster,
  onEnded,
  onFail,
}: {
  src: string;
  poster: string;
  onEnded: () => void;
  onFail: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    video.play().catch((err: DOMException) => {
      // AbortError is a normal interruption (crossfade, re-render); only a
      // real autoplay block falls back to the still poster.
      if (err?.name === "NotAllowedError") onFail();
    });
    // Safety net: if `ended` never fires (stalled decode, background tab),
    // still advance so the rotation can't freeze on one clip.
    const guard = window.setTimeout(onEnded, CLIP_MAX_MS);
    return () => window.clearTimeout(guard);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- once per mounted clip
  }, []);
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      playsInline
      autoPlay
      preload="auto"
      onEnded={onEnded}
      onError={onFail}
      className="w-full h-full object-cover"
    />
  );
}

// Rotates the loops with a crossfade: each clip plays once, then the next one
// fades in. Videos only load/play while the section is on screen; with reduced
// motion (or a failed load) the poster stays still.
function GrowthMedia() {
  const { growthSection } = useContent();
  const { videos, mediaLabel } = growthSection;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.25 });
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const current = videos[index];
  const animate = inView && !reduce && !failed;

  return (
    <div
      ref={ref}
      role="img"
      aria-label={mediaLabel}
      className="absolute inset-0 sm:left-10 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-900"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          {animate ? (
            <LoopVideo
              src={current.src}
              poster={current.poster}
              onEnded={() => setIndex((i) => (i + 1) % videos.length)}
              onFail={() => setFailed(true)}
            />
          ) : (
            <img
              src={current.poster}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.style.visibility = "hidden")}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function GrowthSection() {
  const { growthSection } = useContent();
  const { eyebrow, lines, highlight, chips } = growthSection;
  const last = lines.length - 1;
  const tone = ["text-brand-300", "text-brand-600", "text-brand-900"];

  return (
    <section
      id="crecimiento"
      className="bg-neutral-50 py-14 md:py-[76px] overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.05fr] gap-12 md:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-[.14em] uppercase text-accent-500">
              <span className="w-[22px] h-0.5 bg-gradient-to-r from-accent-700 to-accent-500" />
              {eyebrow}
            </div>
            <h2
              className="font-sans font-semibold mt-[18px] mb-0"
              style={{
                fontSize: "clamp(22px, 3vw, 32px)",
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
              }}
            >
              {lines.map((line, i) => (
                <motion.span
                  key={i}
                  className={`block ${tone[Math.min(i, tone.length - 1)]}`}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VP}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.5 }}
                >
                  {i === last ? (
                    <Highlighted text={line} highlight={highlight} />
                  ) : (
                    line
                  )}{" "}
                </motion.span>
              ))}
            </h2>
          </div>

          <div className="relative aspect-[5/4]">
            <GrowthMedia />
            {chips.map((c, i) => (
              <motion.div
                key={c.l}
                className={`absolute bg-white rounded-2xl px-[18px] py-[14px] shadow-brand-xl ${
                  i === 0 ? "left-2 sm:left-0 top-[10%]" : "right-2 sm:-right-3 bottom-[8%]"
                }`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.7, ease: EASE, delay: 0.8 + i * 0.3 }}
              >
                <b className="block text-brand-900 text-xl">{c.v}</b>
                <small className="text-neutral-500 text-[13px]">{c.l}</small>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
