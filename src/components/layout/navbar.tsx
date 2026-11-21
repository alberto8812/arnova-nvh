import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { EASE } from "@/components/motion";
import { Container } from "@/components/ui";
import { CountrySelector } from "@/components/country-selector";
import { useContent } from "@/hooks/use-content";

// Navbar lives in the shared Layout and persists across routes, so every
// in-page anchor needs the leading "/" to keep resolving to the home sections
// (e.g. from /careers) instead of appending the hash to the current route.
// The careers link's label is country-scoped copy (sourced via `nav`), so it
// is appended in the component body instead of living in this static array.
const NAV_LINKS = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Cómo funciona", href: "/#como-funciona" },
  { label: "Montos", href: "/#montos" },
  { label: "Nosotros", href: "/#nosotros" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const { pathname } = useLocation();
  const { nav } = useContent();
  const navLinks = [...NAV_LINKS, { label: nav.careersLabel, href: "/careers" }];

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let pollId: ReturnType<typeof setInterval> | null = null;

    const tryObserve = () => {
      const hero = document.getElementById("hero");
      if (!hero) return false;
      observer = new IntersectionObserver(
        ([entry]) => setOverHero(entry.isIntersecting),
        { rootMargin: "-71px 0px 0px 0px", threshold: 0 },
      );
      observer.observe(hero);
      return true;
    };

    // Navbar persists across route changes (it lives in the shared Layout), but
    // #hero belongs to HomePage and unmounts/remounts with the route — re-run on
    // pathname change so the observer always targets the current #hero node.
    // The page-transition in Layout delays the new route's mount past this
    // effect's commit (it waits for the outgoing page's exit animation), so
    // #hero may not exist yet — poll until it does instead of giving up.
    if (!tryObserve()) {
      setOverHero(false);
      pollId = setInterval(() => {
        if (tryObserve() && pollId) {
          clearInterval(pollId);
          pollId = null;
        }
      }, 50);
    }

    return () => {
      if (pollId) clearInterval(pollId);
      observer?.disconnect();
    };
  }, [pathname]);

  const transparent = pathname === "/" && overHero && !open;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        transparent
          ? "bg-transparent border-b border-transparent"
          : "bg-brand-900 border-b border-brand-800"
      }`}
    >
      <Container className="h-[70px] flex items-center justify-between">
        {/* Logo — larger over the transparent hero, settles smaller once the solid bar takes over */}
        <Link to="/#hero" className="flex shrink-0 items-center no-underline">
          <img
            src="/images/arnova-wordmark-reverse.png"
            alt="Arnova Financial Group"
            className={`h-6 w-auto object-contain transition-[height] duration-300 ${
              transparent ? "sm:h-12" : "sm:h-9"
            }`}
          />
        </Link>

        {/* Nav links — desktop. Switches at xl (1280px), matching the
            Container's own max-width: below that, the container never has
            enough room for the labels + País + CTA on one line (measured: no
            overlap from 1100px; 14" laptops at 150% scaling report ~1263px)
            without wrapping into the CTA. */}
        <nav className="hidden min-[1100px]:flex gap-4 xl:gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-[15px] font-medium text-on-brand hover:text-brand-500 transition-colors duration-300 no-underline whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* "País · SV" dropdown — renders nothing while no country is chosen
              (the blocking first-visit modal covers that gap); visible at
              every breakpoint. */}
          <CountrySelector />

          {/* CTA — always visible so it's reachable even if the mobile menu's JS fails to mount */}
          <Link
            to="/#contacto"
            className="inline-flex min-h-10 items-center text-sm font-semibold px-3 sm:px-[18px] py-2.5 rounded-md no-underline transition-colors duration-300 bg-action-yellow text-brand-900 hover:bg-accent-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
          >
            <span className="sm:hidden">Solicitar</span>
            <span className="hidden sm:inline">Solicitar crédito →</span>
          </Link>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            aria-label={open ? nav.closeMenuLabel : nav.openMenuLabel}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="min-[1100px]:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 rounded-md text-brand-300 hover:text-on-brand transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile menu panel — positions relative to the sticky header, slides/fades in */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: EASE }}
            className="min-[1100px]:hidden absolute left-0 right-0 top-full bg-brand-900 border-b border-brand-800"
          >
            <div className="flex flex-col px-5 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="text-[15px] font-medium text-brand-300 hover:text-on-brand transition-colors duration-300 no-underline py-3 border-b border-brand-800 last:border-b-0"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
