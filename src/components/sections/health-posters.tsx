"use client";

import { createPortal } from "react-dom";
import { useSyncExternalStore } from "react";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  ArrowRight,
  Share2,
  Pause,
  Play,
  Stethoscope,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion, useInView } from "framer-motion";
import ClinicImage from "@/components/ui/clinic-image";
import SectionDivider from "@/components/ui/decor/SectionDivider";
import Sparkle from "@/components/ui/decor/Sparkle";
import { fadeRise, getInitial, viewportOnce } from "@/lib/motion";
import { healthPosters, POSTER_WIDTH, POSTER_HEIGHT } from "@/lib/health-posters";

const ROTATE_MS = 7000;
const SITE_URL = "https://babystepsnewbornclinic.com";

const noopSubscribe = () => () => {};

export default function HealthPosters() {
  const shouldReduceMotion = useReducedMotion();
  // Lightbox is portalled to <body>: sections use `content-visibility: auto`,
  // which would otherwise trap a position:fixed overlay inside the section.
  const portalReady = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const sectionRef = useRef<HTMLElement>(null);
  // "some" + margin: the section is taller than a phone screen, so a ratio
  // threshold would never be met on mobile.
  const inView = useInView(sectionRef, { margin: "-15% 0px -15% 0px" });

  const [active, setActive] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lightboxTriggerRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const total = healthPosters.length;
  const poster = healthPosters[active];
  const autoplay = !shouldReduceMotion && !userPaused && !hoverPaused && !lightboxOpen && inView;

  const go = useCallback(
    (index: number) => setActive(((index % total) + total) % total),
    [total]
  );
  const next = useCallback(() => setActive((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setActive((i) => (i - 1 + total) % total), [total]);

  // Deep link support: /?poster=<id>#health-tips opens that poster directly
  // (used by the WhatsApp share link).
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("poster");
    const idx = id ? healthPosters.findIndex((p) => p.id === id) : -1;
    if (idx < 0) return;
    // Deferred so it runs after hydration rather than synchronously in the effect.
    const t = window.setTimeout(() => {
      setActive(idx);
      setUserPaused(true);
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  // Auto-rotate only while the section is on screen and nobody is interacting.
  useEffect(() => {
    if (!autoplay) return;
    const t = window.setTimeout(next, ROTATE_MS);
    return () => window.clearTimeout(t);
  }, [autoplay, active, next]);

  // Lightbox: keyboard navigation, focus management, scroll lock
  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    lightboxTriggerRef.current?.focus();
    lightboxTriggerRef.current = null;
  }, []);

  const openLightbox = (el?: HTMLElement | null) => {
    lightboxTriggerRef.current = el ?? null;
    setLightboxOpen(true);
  };

  useEffect(() => {
    if (!lightboxOpen) return;
    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, closeLightbox, prev, next]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 45) return;
    setUserPaused(true);
    if (dx < 0) next();
    else prev();
  };

  const selectTab = (index: number) => {
    setUserPaused(true);
    go(index);
  };

  const onTabKeyDown = (e: React.KeyboardEvent) => {
    let target: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") target = (active + 1) % total;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") target = (active - 1 + total) % total;
    if (e.key === "Home") target = 0;
    if (e.key === "End") target = total - 1;
    if (target === null) return;
    e.preventDefault();
    selectTab(target);
    document.getElementById(`poster-tab-${healthPosters[target].id}`)?.focus();
  };

  const shareHref = `https://wa.me/?text=${encodeURIComponent(
    `${poster.titleHi}\n${poster.summaryEn}\n\nBaby Steps Newborn & Child Clinic, Neelbad, Bhopal\n${SITE_URL}/?poster=${poster.id}#health-tips`
  )}`;

  return (
    <section
      ref={sectionRef}
      id="health-tips"
      aria-labelledby="health-tips-heading"
      className="relative overflow-hidden pt-16 pb-20 md:pt-28 md:pb-32 bg-[#FF8A7A]/[0.07] scroll-mt-20 lg:scroll-mt-24"
    >
      <SectionDivider
        type="clouds"
        position="top"
        colorClass="fill-white"
        className="absolute top-0 left-0 right-0 z-10"
      />

      <div className="absolute left-[5%] top-[18%] opacity-[0.25] pointer-events-none hidden lg:block select-none" aria-hidden="true">
        <Sparkle className="w-8 h-8" colorClass="fill-accent-sunshine" />
      </div>
      <div className="absolute right-[7%] bottom-[14%] opacity-[0.2] pointer-events-none hidden lg:block select-none" aria-hidden="true">
        <Sparkle className="w-10 h-10" colorClass="fill-accent-coral" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Heading */}
        <motion.div
          initial={getInitial(shouldReduceMotion)}
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeRise}
          className="text-center max-w-3xl mx-auto mb-10 md:mb-14 flex flex-col gap-4"
        >
          <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-white/80 border border-primary/10 shadow-soft px-4 py-1.5 rounded-full inline-flex items-center gap-2 mx-auto">
            <Stethoscope className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Doctor&apos;s Advice · <span lang="hi">डॉक्टर की सलाह</span></span>
          </span>
          <h2 id="health-tips-heading" className="text-3xl sm:text-4xl font-extrabold text-primary-dark font-heading">
            Health tips from our pediatricians
          </h2>
          <p className="text-sm sm:text-base text-muted-text font-sans leading-relaxed">
            Simple, practical guidance from Dr. Sudarshan and Dr. Manisha on the questions parents ask us most — in Hindi, so it&apos;s easy to share with the whole family.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Poster viewer */}
          <div
            className="lg:col-span-5 w-full max-w-[480px] mx-auto"
            onMouseEnter={() => setHoverPaused(true)}
            onMouseLeave={() => setHoverPaused(false)}
            onFocusCapture={() => setHoverPaused(true)}
            onBlurCapture={() => setHoverPaused(false)}
          >
            <div className="relative bg-white/60 backdrop-blur-md p-3 sm:p-4 rounded-[2rem] border border-white/70 shadow-soft">
              <div
                className="relative w-full rounded-2xl overflow-hidden bg-surface-tint shadow-soft"
                style={{ aspectRatio: `${POSTER_WIDTH} / ${POSTER_HEIGHT}` }}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                role="tabpanel"
                id="poster-panel"
                aria-labelledby={`poster-tab-${poster.id}`}
              >
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.button
                    key={poster.id}
                    type="button"
                    onClick={(e) => openLightbox(e.currentTarget)}
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full cursor-zoom-in focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 group"
                    aria-label={`Open full-size poster: ${poster.titleEn}`}
                  >
                    <ClinicImage
                      src={poster.src}
                      alt={poster.alt}
                      fill
                      quality={85}
                      sizes="(max-width: 520px) 92vw, 480px"
                      className="object-cover"
                    />
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-primary-dark/80 text-white text-[11px] font-semibold font-sans px-3 py-1.5 rounded-full backdrop-blur-sm opacity-90 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                      Tap to zoom
                    </span>
                  </motion.button>
                </AnimatePresence>

                {/* Prev / Next */}
                <button
                  type="button"
                  onClick={() => { setUserPaused(true); prev(); }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-primary-dark shadow-md flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Previous poster"
                >
                  <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => { setUserPaused(true); next(); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-primary-dark shadow-md flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Next poster"
                >
                  <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Dots + play/pause */}
              <div className="flex items-center justify-center gap-3 mt-4">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  {healthPosters.map((p, i) => (
                    <span
                      key={p.id}
                      className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-primary" : "w-2 bg-primary/25"}`}
                    />
                  ))}
                </div>
                {!shouldReduceMotion && (
                  <button
                    type="button"
                    onClick={() => setUserPaused((v) => !v)}
                    className="w-7 h-7 rounded-full bg-white border border-gray-150 text-primary-dark flex items-center justify-center hover:bg-surface-tint transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label={userPaused ? "Resume poster slideshow" : "Pause poster slideshow"}
                  >
                    {userPaused ? <Play className="w-3.5 h-3.5" aria-hidden="true" /> : <Pause className="w-3.5 h-3.5" aria-hidden="true" />}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Topic tabs + details */}
          <div className="lg:col-span-7 flex flex-col gap-6 min-w-0">
            <div
              role="tablist"
              aria-label="Health topics"
              aria-orientation="horizontal"
              className="flex lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-3 overflow-x-auto lg:overflow-visible snap-x snap-mandatory -mx-4 px-4 lg:mx-0 lg:px-0 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {healthPosters.map((p, i) => {
                const selected = i === active;
                return (
                  <button
                    key={p.id}
                    id={`poster-tab-${p.id}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="poster-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => selectTab(i)}
                    onKeyDown={onTabKeyDown}
                    className={`relative snap-start shrink-0 w-[220px] lg:w-auto flex items-center gap-3 p-2.5 pr-3 rounded-2xl border text-left overflow-hidden transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      selected
                        ? "bg-white border-primary/30 shadow-md"
                        : "bg-white/60 border-gray-150/80 hover:bg-white hover:border-primary/20"
                    }`}
                  >
                    <span className="relative w-12 h-[52px] rounded-lg overflow-hidden shrink-0 bg-surface-tint border border-gray-100">
                      <ClinicImage src={p.src} alt="" fill sizes="64px" className="object-cover object-top" />
                    </span>
                    <span className="flex flex-col gap-0.5 min-w-0">
                      <span className={`text-[10px] font-bold uppercase tracking-wider font-sans ${selected ? "text-secondary-dark" : "text-muted-text"}`}>
                        {p.tag}
                      </span>
                      <span className={`text-sm font-bold font-heading leading-snug line-clamp-2 ${selected ? "text-primary" : "text-primary-dark"}`}>
                        {p.titleEn}
                      </span>
                    </span>
                    {/* Autoplay progress */}
                    {selected && !shouldReduceMotion && (
                      <span
                        key={`${p.id}-${autoplay ? "run" : "stop"}`}
                        aria-hidden="true"
                        className="absolute left-0 bottom-0 h-[3px] w-full bg-primary/70 origin-left"
                        style={
                          autoplay
                            ? { animation: `bsPosterProgress ${ROTATE_MS}ms linear forwards` }
                            : { transform: "scaleX(0)" }
                        }
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active poster details */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={poster.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-white rounded-3xl border border-gray-150/80 shadow-soft p-6 sm:p-8 flex flex-col gap-5"
                aria-live="polite"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-secondary-dark bg-secondary/10 border border-secondary/15 py-0.5 px-2 rounded-md uppercase tracking-wider font-sans w-max">
                    {poster.tag}
                  </span>
                  <h3 lang="hi" className="text-xl sm:text-2xl font-extrabold text-primary-dark font-heading leading-snug">
                    {poster.titleHi}
                  </h3>
                  <p className="text-sm text-muted-text font-sans leading-relaxed">{poster.summaryEn}</p>
                </div>

                <ul lang="hi" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {poster.pointsHi.map((point) => (
                    <li key={point} className="flex gap-2.5 items-start text-sm text-gray-800 font-sans leading-relaxed bg-surface-tint/60 rounded-xl p-3">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-accent-coral shrink-0" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-1">
                  <Link
                    href={poster.cta.href}
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold py-3 px-6 rounded-2xl hover:bg-primary-dark shadow-md transition-all active:scale-[0.98]"
                  >
                    <span>{poster.cta.label}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <button
                    type="button"
                    onClick={(e) => openLightbox(e.currentTarget)}
                    className="inline-flex items-center justify-center gap-2 bg-white text-primary-dark border border-primary/20 text-sm font-semibold py-3 px-6 rounded-2xl hover:bg-surface-tint transition-all active:scale-[0.98]"
                  >
                    <Maximize2 className="w-4 h-4" aria-hidden="true" />
                    <span>View full poster</span>
                  </button>
                  <a
                    href={shareHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366]/10 text-[#128C4B] border border-[#25D366]/30 text-sm font-semibold py-3 px-6 rounded-2xl hover:bg-[#25D366]/20 transition-all active:scale-[0.98]"
                  >
                    <Share2 className="w-4 h-4" aria-hidden="true" />
                    <span>Share on WhatsApp</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {portalReady && createPortal(
        <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={`Poster: ${poster.titleEn}`}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeLightbox}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close poster"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white bg-black/60 hover:bg-black/80 ring-1 ring-white/20 p-3 rounded-full transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Previous poster"
            >
              <ChevronLeft className="w-6 h-6" aria-hidden="true" />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              className="relative rounded-xl overflow-hidden shadow-2xl bg-white"
              style={{
                width: `min(94vw, calc(82vh * ${POSTER_WIDTH / POSTER_HEIGHT}))`,
                aspectRatio: `${POSTER_WIDTH} / ${POSTER_HEIGHT}`,
              }}
            >
              <ClinicImage
                key={poster.id}
                src={poster.src}
                alt={poster.alt}
                fill
                quality={85}
                loading="eager"
                sizes="(max-width: 768px) 100vw, 760px"
                className="object-contain"
              />
            </div>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white bg-black/60 hover:bg-black/80 ring-1 ring-white/20 p-3 rounded-full transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Next poster"
            >
              <ChevronRight className="w-6 h-6" aria-hidden="true" />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              className="mt-3 flex items-center gap-3 text-white font-sans text-xs"
            >
              <span className="text-white/60">{active + 1} / {total}</span>
              <a
                href={poster.src}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 text-white/80 hover:text-white"
              >
                Open original
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
