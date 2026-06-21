"use client";

import ClinicImage from "@/components/ui/clinic-image";
import { Image as ImageIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
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


  return (
    <section id="gallery" className="py-24 bg-white relative overflow-hidden">
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
            Clinic Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-dark font-heading">
            A look inside our clinic space
          </h2>
          <p className="text-sm sm:text-base text-muted-text font-sans leading-relaxed">
            Factual photos of our child-friendly spaces, examination rooms, and diagnostic facilities in Neelbad.
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
              whileHover={hoverLift(shouldReduceMotion, -4, { boxShadow: "0 10px 25px rgba(22, 60, 122, 0.08)" })}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-2xl border border-gray-150 shadow-soft aspect-square bg-gray-100 cursor-pointer"
            >
              <ClinicImage
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-106"
              />
              
              {/* Overlay with details */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/85 via-primary-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-accent-sunshine uppercase tracking-widest mb-1">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Gallery</span>
                </span>
                <h3 className="text-sm font-semibold font-heading text-white leading-tight">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
