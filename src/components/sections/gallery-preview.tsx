"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ClinicImage from "@/components/ui/clinic-image";
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import SectionDivider from "@/components/ui/decor/SectionDivider";
import { 
  fadeRise, 
  softScaleIn, 
  staggerContainer, 
  hoverLift, 
  getInitial, 
  viewportOnce 
} from "@/lib/motion";

export default function GalleryPreview() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const galleryItems = [
    { src: "/images/gallery/gallery-1.jpg", alt: "Baby Steps Clinic Waiting Area", title: "Waiting Area" },
    { src: "/images/gallery/gallery-2.jpg", alt: "Baby Steps Clinic Building Exterior", title: "Clinic Exterior" },
    { src: "/images/gallery/gallery-3.jpg", alt: "Dr. Manisha consulting mother and child", title: "Pediatric Consultation" },
    { src: "/images/gallery/gallery-4.jpg", alt: "Dr. Manisha examining infant", title: "Newborn Assessment" },
    { src: "/images/gallery/gallery-5.jpg", alt: "Baby Steps Clinic Reception Desk", title: "Reception Desk" },
    { src: "/images/gallery/gallery-6.jpg", alt: "Baby Steps Clinic street view", title: "Clinic Frontage" },
    { src: "/images/gallery/gallery-7.jpg", alt: "Empty Pediatric Consultation Room", title: "Consultation Suite" },
    { src: "/images/gallery/gallery-8.jpg", alt: "Pediatric scale and examination bed", title: "Growth & Vaccination Room" }
  ];

  // Close Lightbox and restore focus to the triggering thumbnail
  const closeLightbox = useCallback(() => {
    setSelectedIdx(null);
    // Restore focus to the thumbnail that opened the lightbox
    if (triggerRef.current) {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, []);

  // Open lightbox and save the trigger element
  const openLightbox = useCallback((index: number, element?: HTMLElement) => {
    if (element) triggerRef.current = element;
    setSelectedIdx(index);
  }, []);

  // Navigate Previous
  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((prevIdx) => (prevIdx === null ? null : (prevIdx - 1 + galleryItems.length) % galleryItems.length));
    }
  }, [selectedIdx, galleryItems.length]);

  // Navigate Next
  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((prevIdx) => (prevIdx === null ? null : (prevIdx + 1) % galleryItems.length));
    }
  }, [selectedIdx, galleryItems.length]);

  // Keyboard navigation
  useEffect(() => {
    if (selectedIdx === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIdx, closeLightbox, prevImage, nextImage]);

  // Focus the close button when lightbox opens
  useEffect(() => {
    if (selectedIdx !== null && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [selectedIdx]);

  // Lock body scroll when lightbox is active
  useEffect(() => {
    if (selectedIdx !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIdx]);

  return (
    <section id="gallery" className="relative overflow-hidden pt-16 pb-20 md:pt-28 md:pb-32 bg-[#2E6CF6]/[0.08] select-none">
      {/* Top Wave Divider */}
      <SectionDivider
        type="wave"
        position="top"
        colorClass="fill-white"
        className="absolute top-0 left-0 right-0 z-10"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Heading */}
        <motion.div
          initial={getInitial(shouldReduceMotion)}
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeRise}
          className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4"
        >
          <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-surface-tint px-4 py-1.5 rounded-full inline-block mx-auto">
            Virtual Office Tour
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-dark font-heading">
            A look inside our clinic space
          </h2>
          <p className="text-sm sm:text-base text-muted-text font-sans leading-relaxed">
            Take a virtual tour of our child-friendly spaces, cozy examination rooms, and pediatric facilities in Neelbad. Click any image to view details.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div 
          variants={staggerContainer}
          initial={getInitial(shouldReduceMotion)}
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto"
        >
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              variants={softScaleIn}
              whileHover={hoverLift(shouldReduceMotion, -4, { boxShadow: "0 15px 30px rgba(22, 60, 122, 0.08)" })}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => openLightbox(index, e.currentTarget)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(index, e.currentTarget); } }}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.title} - ${item.alt}`}
              className="group relative overflow-hidden rounded-3xl border border-gray-150 shadow-soft aspect-square bg-gray-100 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus:outline-none"
            >
              <ClinicImage
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Overlay with details */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left">
                <span className="inline-flex items-center gap-1.5 text-[9px] font-bold text-accent-sunshine uppercase tracking-widest mb-1.5 font-sans">
                  <ImageIcon className="w-3.5 h-3.5 text-accent-sunshine" />
                  <span>View Room</span>
                </span>
                <h3 className="text-sm font-semibold font-heading text-white leading-tight">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Lightbox Portal Overlay */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={`Image lightbox: ${selectedIdx !== null ? galleryItems[selectedIdx].title : ''}`}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              ref={closeButtonRef}
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors z-50 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus:outline-none"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Navigation Left */}
            <button
              onClick={prevImage}
              className="absolute left-4 sm:left-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/25 p-3 rounded-full transition-colors z-45 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus:outline-none"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Visual Container */}
            <motion.div
              initial={shouldReduceMotion ? {} : { scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={shouldReduceMotion ? {} : { scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-[4/3] max-h-[70vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black"
            >
              <ClinicImage
                src={galleryItems[selectedIdx].src}
                alt={galleryItems[selectedIdx].alt}
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Navigation Right */}
            <button
              onClick={nextImage}
              className="absolute right-4 sm:right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/25 p-3 rounded-full transition-colors z-45 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus:outline-none"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Caption Indicator */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="mt-6 text-center text-white bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl backdrop-blur-sm max-w-md select-none font-sans z-50"
            >
              <h4 className="text-sm font-semibold font-heading text-white">
                {galleryItems[selectedIdx].title}
              </h4>
              <p className="text-[10px] text-white/50 uppercase tracking-widest mt-1 font-medium">
                Image {selectedIdx + 1} of {galleryItems.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Bottom Wave Divider */}
      <SectionDivider
        type="wave"
        position="bottom"
        colorClass="fill-white"
        className="absolute bottom-0 left-0 right-0 z-10"
      />
    </section>
  );
}
