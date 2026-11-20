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
  onProgress,
}: {
  src: string;
  poster: string;
  onEnded: () => void;
  onFail: () => void;
  onProgress: (ratio: number) => void;
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
      onTimeUpdate={(e) => {
        const v = e.currentTarget;
        if (v.duration) onProgress(v.currentTime / v.duration);
      }}
      className="w-full h-full object-cover"
    />
  );
}

export function GrowthSection() {
  const { growthSection } = useContent();
  const { eyebrow, lines, highlight, videos, mediaLabel } = growthSection;
  const last = lines.length - 1;

  const mediaRef = useRef<HTMLDivElement>(null);
  const inView = useInView(mediaRef, { amount: 0.25 });
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [failed, setFailed] = useState(false);
  const current = videos[index];
  const animate = inView && !reduce && !failed;

  // The outgoing clip keeps playing during the crossfade; only the clip that
  // matches the current index may drive the step progress bar.
  const indexRef = useRef(index);
  indexRef.current = index;
  const goTo = (i: number) => {
    setProgress(0);
    setIndex(i);
  };
  const next = () => goTo((indexRef.current + 1) % videos.length);
  const progressFor = (i: number) => (ratio: number) => {
    if (indexRef.current === i) setProgress(ratio);
  };

  return (
    <section
      id="crecimiento"
      className="bg-neutral-50 py-14 md:py-[76px] overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-[1.25fr_0.9fr] gap-10 md:gap-16 items-center">
          {/* Message column — carries the section; the media supports it. */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-[.14em] uppercase text-accent-500">
              <span className="w-[22px] h-0.5 bg-gradient-to-r from-accent-700 to-accent-500" />
              {eyebrow}
            </div>
            <h2
              className="font-sans font-semibold mt-[18px] mb-0 text-brand-900"
              style={{
                fontSize: "clamp(26px, 3.4vw, 40px)",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                textWrap: "balance",
              }}
            >
              {lines.map((line, i) => (
                <motion.span
                  key={i}
                  className={i === last ? "text-brand-900" : "text-brand-700"}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VP}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.4 }}
                >
                  {i === last ? (
                    <Highlighted text={line} highlight={highlight} />
                  ) : (
                    line
                  )}{" "}
                </motion.span>
              ))}
            </h2>

            {/* Steps synced with the clips; each one jumps to its clip. */}
            <div
              className="mt-9 grid grid-cols-3 gap-3 sm:gap-5 max-w-[560px]"
              role="tablist"
              aria-label={mediaLabel}
            >
              {videos.map((v, i) => {
                const active = i === index;
                const fill = active ? (animate ? progress : 1) : i < index ? 1 : 0;
                return (
                  <button
                    key={v.src}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => goTo(i)}
                    className="group text-left rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600 cursor-pointer"
                  >
                    <span className="block h-1 rounded-full bg-neutral-200 overflow-hidden">
                      <span
                        className="block h-full rounded-full bg-gradient-to-r from-accent-700 to-accent-500 transition-[width] duration-300 ease-linear"
                        style={{ width: `${fill * 100}%` }}
                      />
                    </span>
                    <span
                      className={`block mt-3 text-[13px] sm:text-[15px] leading-snug font-semibold transition-colors ${
                        active
                          ? "text-brand-900"
                          : "text-neutral-500 group-hover:text-brand-700"
                      }`}
                    >
                      {v.caption}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Media column — 4:5 like the clips, so nothing is cropped. */}
          <div
            ref={mediaRef}
            className="relative w-full max-w-[360px] md:max-w-[440px] mx-auto md:mr-0 aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-900 shadow-brand-lg"
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={index}
                role="img"
                aria-label={`${mediaLabel}: ${current.caption}`}
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
                    onEnded={next}
                    onFail={() => setFailed(true)}
                    onProgress={progressFor(index)}
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
        </div>
      </Container>
    </section>
  );
}
