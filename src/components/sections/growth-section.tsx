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
// Fades the clip's left edge into the band so it reads as part of it, not a box.
const FADE_X = "linear-gradient(90deg, transparent 0%, #000 42%)";
// On mobile the clip sits under the text: fade every edge so no box shows.
const FADE_Y =
  "radial-gradient(ellipse 62% 60% at 50% 55%, #000 55%, transparent 100%)";

// Paints `highlight` (when present in `text`) with the Arnova arrow gradient.
function Highlighted({ text, highlight }: { text: string; highlight: string }) {
  const at = highlight ? text.indexOf(highlight) : -1;
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="font-bold bg-gradient-to-r from-accent-700 to-accent-500 bg-clip-text text-transparent">
        {highlight}
      </span>
      {text.slice(at + highlight.length)}
    </>
  );
}

// Each clip drives itself through its own ref: during the crossfade the
// outgoing and incoming <video> coexist, so a shared DOM lookup would pick
// the outgoing one and leave the new clip frozen on its poster.
// The <video> stays mounted while the band scrolls in and out (it is only
// paused), so entering the viewport never swaps an <img> for a fresh
// <video>. No poster is shown here: the stills are the clips' last frame,
// so painting one before playback flashes the ending. The video stays
// transparent (navy band behind) and fades in once it is actually playing.
function LoopVideo({
  src,
  active,
  onEnded,
  onFail,
  onProgress,
}: {
  src: string;
  active: boolean;
  onEnded: () => void;
  onFail: () => void;
  onProgress: (ratio: number) => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (!active) {
      video.pause();
      return;
    }
    video.muted = true;
    video.play().catch((err: DOMException) => {
      // AbortError is a normal interruption (crossfade, pause); only a
      // real autoplay block falls back to the still poster.
      if (err?.name === "NotAllowedError") onFail();
    });
    // Safety net: if `ended` never fires (stalled decode, background tab),
    // still advance so the rotation can't freeze on one clip.
    const guard = window.setTimeout(onEnded, CLIP_MAX_MS);
    return () => window.clearTimeout(guard);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- re-run only on visibility
  }, [active]);
  return (
    <video
      ref={ref}
      src={src}
      muted
      playsInline
      preload={active ? "auto" : "metadata"}
      onPlaying={() => setReady(true)}
      onEnded={onEnded}
      onError={onFail}
      onTimeUpdate={(e) => {
        const v = e.currentTarget;
        if (v.duration) onProgress(v.currentTime / v.duration);
      }}
      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}
    />
  );
}

export function GrowthSection() {
  const { growthSection } = useContent();
  const { eyebrow, lines, highlight, videos, mediaLabel } = growthSection;
  const sentence = lines.join(" ");

  const bandRef = useRef<HTMLElement>(null);
  const inView = useInView(bandRef, { amount: 0.25 });
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [failed, setFailed] = useState(false);
  const current = videos[index];
  // `playable` keeps the <video> mounted; `animate` only plays/pauses it.
  const playable = !reduce && !failed;
  const animate = inView && playable;

  // The outgoing clip keeps playing during the crossfade; only the clip that
  // matches the current index may drive the progress segments.
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
      ref={bandRef}
      id="crecimiento"
      className="relative overflow-hidden bg-brand-900 text-on-brand flex flex-col md:block"
      style={{
        backgroundImage:
          "radial-gradient(60% 90% at 82% 50%, var(--color-brand-800), var(--color-brand-900) 70%)",
      }}
    >
      {/* Arrow-gradient hairline that marks the band's start */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] z-10"
        style={{
          background:
            "linear-gradient(90deg, var(--color-accent-700), var(--color-accent-500) 45%, transparent)",
        }}
      />

      {/* Media — integrated in the band (no box): 4:5 like the clips so
          nothing is cropped, faded into the navy on its leading edge. */}
      <div
        className="order-2 relative mx-auto mt-2 h-[340px] aspect-[4/5] md:absolute md:mt-0 md:inset-y-0 md:right-0 md:h-full [mask-image:var(--fade-y)] [-webkit-mask-image:var(--fade-y)] md:[mask-image:var(--fade-x)] md:[-webkit-mask-image:var(--fade-x)]"
        style={{
          ["--fade-x" as string]: FADE_X,
          ["--fade-y" as string]: FADE_Y,
        }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            role="img"
            aria-label={mediaLabel}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            {playable ? (
              <LoopVideo
                src={current.src}
                active={inView}
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

      <div className="order-1 relative z-10">
        <Container>
          <div className="pt-12 md:py-[96px] md:min-h-[520px] flex items-center">
            <motion.div
              className="max-w-[640px]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <div className="flex items-center gap-2.5 mb-[18px] text-[13px] font-bold tracking-[.14em] uppercase text-brand-300">
                {/* <span className="w-6 h-[3px] rounded-sm bg-gradient-to-r from-accent-700 to-accent-500" /> */}
                {eyebrow}
              </div>
              <h2
                className="m-0 font-sans font-semibold text-on-brand"
                style={{
                  fontSize: "clamp(26px, 3.2vw, 44px)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  textWrap: "balance",
                }}
              >
                <Highlighted text={sentence} highlight={highlight} />
              </h2>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Minimal progress: one unlabeled segment per clip (jumps on click) */}
      <div className="order-3 relative z-10 flex justify-center md:justify-end gap-1.5 pb-6 pt-3 md:absolute md:bottom-7 md:right-12 md:p-0">
        {videos.map((v, i) => {
          const active = i === index;
          const fill = active ? (animate ? progress : 1) : 0;
          return (
            <button
              key={v.src}
              type="button"
              aria-label={`Animación ${i + 1} de ${videos.length}`}
              aria-current={active}
              onClick={() => goTo(i)}
              className="py-2 cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-brand"
            >
              <span className="block w-10 h-[3px] rounded-sm bg-brand-500 overflow-hidden">
                <span
                  className="block h-full bg-gradient-to-r from-accent-700 to-accent-500 transition-[width] duration-300 ease-linear"
                  style={{ width: `${fill * 100}%` }}
                />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
