"use client";

import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import ClinicImage from "@/components/ui/clinic-image";
import { Calendar, Phone, MessageSquare } from "lucide-react";
import Cloud from "@/components/ui/decor/Cloud";
import BabyFootprints from "@/components/ui/decor/BabyFootprints";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [expYears, setExpYears] = useState(0);

  useEffect(() => {
    const target = 15;
    if (shouldReduceMotion) {
      requestAnimationFrame(() => setExpYears(target));
      return;
    }
    const duration = 1200;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setExpYears(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [shouldReduceMotion]);

  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 lg:py-24 select-none bg-[radial-gradient(1100px_620px_at_80%_-10%,rgba(52,199,164,0.06),transparent_60%),radial-gradient(1200px_720px_at_8%_-4%,rgba(46,108,246,0.05),transparent_58%)]"
    >
      {/* Animated gradient mesh & background decor */}
      <div
        aria-hidden="true"
        className="absolute inset-[-12%] z-0 pointer-events-none bg-[radial-gradient(440px_340px_at_22%_30%,rgba(46,108,246,0.1),transparent_60%),radial-gradient(480px_360px_at_78%_22%,rgba(52,199,164,0.1),transparent_62%),radial-gradient(440px_380px_at_58%_82%,rgba(255,197,61,0.09),transparent_60%)] animate-[bsMesh_20s_ease-in-out_infinite] will-change-transform"
      />

      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0">
        {/* Slow drifting clouds */}
        <div className="absolute top-[12%] left-[8%] opacity-90 hidden md:block">
          <Cloud className="w-20 h-8 fill-white/90 drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)] animate-[bsCloud_18s_ease-in-out_infinite]" />
        </div>
        <div className="absolute top-[60%] left-[44%] opacity-75 hidden md:block">
          <Cloud className="w-16 h-7 fill-white/75 animate-[bsCloud_22s_ease-in-out_2s_infinite]" />
        </div>

        {/* Twinkling stars */}
        <div className="absolute top-[18%] right-[40%] text-[#FFC53D] text-xl animate-[bsTwinkle_4.5s_ease-in-out_infinite]">✦</div>
        <div className="absolute top-[48%] left-[16%] text-[#34C7A4] text-sm animate-[bsTwinkle_5.5s_ease-in-out_0.8s_infinite]">✦</div>
        <div className="absolute bottom-[18%] right-[10%] text-[#2E6CF6] text-base animate-[bsTwinkle_6s_ease-in-out_0.4s_infinite]">✦</div>

        {/* Brand footprints trail */}
        <div className="absolute top-[5%] left-[31%] opacity-[0.1] hidden lg:block">
          <BabyFootprints className="w-32 h-16 fill-[#2E6CF6]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Sub-headline, CTAs, Stats */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-[#2E6CF6]/80 border border-[#2E6CF6]/15 text-[#163C7A] font-semibold text-xs py-1.5 px-4 rounded-full mb-6 bg-white/75 backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-[#34C7A4] shadow-[0_0_0_4px_rgba(52,199,164,0.18)]" />
              <span>Newborn &amp; Child Specialists · Neelbad, Bhopal</span>
            </div>

            {/* Headline */}
            <h1 className="font-heading font-bold text-[#163C7A] text-4xl sm:text-5xl lg:text-6xl leading-[1.07] tracking-tight mb-5 text-balance">
              Gentle, expert care for your little one.
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-[#5A6B85] mb-6 max-w-2xl text-pretty font-sans">
              A husband-and-wife specialist duo — <strong className="text-[#163C7A] font-bold">Dr. Sudarshan Dev Arya</strong> &amp; <strong className="text-[#163C7A] font-bold">Dr. Manisha Bangarwa Arya</strong> — DNB (New Delhi), PGPN (Boston, USA) trained pediatricians, consultants at Rainbow Children&apos;s &amp; Apollo SAGE Hospital, now caring for families in Neelbad.
            </p>

            {/* Credential Tags */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
              <span className="inline-flex items-center gap-1.5 bg-white border border-[#163C7A]/10 shadow-[0_2px_10px_rgba(22,60,122,0.05)] px-3 py-2 rounded-xl text-xs font-semibold text-[#163C7A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E6CF6]" />
                DNB · New Delhi
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white border border-[#163C7A]/10 shadow-[0_2px_10px_rgba(22,60,122,0.05)] px-3 py-2 rounded-xl text-xs font-semibold text-[#163C7A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34C7A4]" />
                PGPN · Boston, USA
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white border border-[#163C7A]/10 shadow-[0_2px_10px_rgba(22,60,122,0.05)] px-3 py-2 rounded-xl text-xs font-semibold text-[#163C7A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E6CF6]" />
                Rainbow &amp; Apollo SAGE Consultants
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white border border-[#163C7A]/10 shadow-[0_2px_10px_rgba(22,60,122,0.05)] px-3 py-2 rounded-xl text-xs font-semibold text-[#163C7A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34C7A4]" />
                Neonatology Fellowship
              </span>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 w-full sm:w-auto">
              <a
                href="#appointment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2E6CF6] text-white font-bold text-base py-3.5 px-6 rounded-full shadow-[0_10px_26px_rgba(46,108,246,0.34)] hover:shadow-lg transition-all active:scale-[0.98] min-h-[48px]"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
              </a>
              <a
                href={siteConfig.phoneLink}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#163C7A] font-bold text-base py-3.5 px-6 rounded-full border border-[#163C7A]/16 shadow-[0_4px_16px_rgba(22,60,122,0.07)] hover:bg-[#F4F8FF] transition-all min-h-[48px]"
              >
                <Phone className="w-5 h-5 text-[#2E6CF6]" />
                <span>Call {siteConfig.phone}</span>
              </a>
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2FB86B]/10 text-[#1c8b50] font-bold text-base py-3.5 px-5 rounded-full border border-[#2FB86B]/28 hover:bg-[#2FB86B]/15 transition-all min-h-[48px]"
              >
                <MessageSquare className="w-5 h-5 fill-[#2FB86B] stroke-none" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Stats list */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-4 mt-8 pt-6 border-t border-[#163C7A]/10 w-full">
              <div className="flex flex-col text-left">
                <span className="font-heading font-extrabold text-[#163C7A] text-lg">{expYears}+ yrs</span>
                <span className="text-[11.5px] text-[#5A6B85] font-sans">Combined experience</span>
              </div>
              <div className="hidden sm:block w-[1px] h-9 bg-[#163C7A]/10" />
              <div className="flex flex-col text-left">
                <span className="font-heading font-bold text-[#163C7A] text-sm">Rainbow &amp; Apollo SAGE</span>
                <span className="text-[11.5px] text-[#5A6B85] font-sans">Hospital consultants</span>
              </div>
              <div className="hidden sm:block w-[1px] h-9 bg-[#163C7A]/10" />
              <div className="flex flex-col text-left">
                <span className="font-heading font-bold text-[#163C7A] text-sm">South Bhopal</span>
                <span className="text-[11.5px] text-[#5A6B85] font-sans">Neelbad · Kolar · Bawadia</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Stack */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center w-full min-h-[480px]">
            {/* Rainbow Arc Backdrop */}
            <div className="absolute top-[-18px] left-1/2 -translate-x-1/2 w-[340px] h-[180px] opacity-45 z-0 pointer-events-none">
              <svg width="340" height="180" viewBox="0 0 340 180" fill="none" strokeLinecap="round">
                <path d="M30 170 A140 140 0 0 1 310 170" stroke="#FF8A7A" strokeWidth="10" />
                <path d="M50 170 A120 120 0 0 1 290 170" stroke="#FFC53D" strokeWidth="10" />
                <path d="M70 170 A100 100 0 0 1 270 170" stroke="#34C7A4" strokeWidth="10" />
                <path d="M90 170 A80 80 0 0 1 250 170" stroke="#2E6CF6" strokeWidth="10" />
              </svg>
            </div>

            {/* Core Image Container */}
            <div className="relative z-10 w-[300px] aspect-[4/5] rounded-[26px] overflow-hidden border-6 border-white shadow-[0_26px_60px_rgba(22,60,122,0.18)] bg-gradient-to-tr from-[#EAF1FF] to-[#F4FBF8]">
              <ClinicImage
                src="/images/hero/hero-1.jpg"
                alt="Gentle check-up at Baby Steps Clinic Bhopal"
                fill
                sizes="300px"
                className="object-cover"
                priority
              />
            </div>

            {/* Overlapping doctor portraits */}
            <div className="absolute z-20 left-[-6px] bottom-[30px] flex gap-2.5">
              {/* Dr. Sudarshan */}
              <div className="w-[118px] aspect-[3/4] rounded-2xl overflow-hidden border-4 border-white shadow-[0_16px_36px_rgba(22,60,122,0.18)] relative bg-gradient-to-br from-[#EAF1FF] to-white flex flex-col justify-end p-2 text-center">
                <div className="absolute inset-0 z-0">
                  <ClinicImage
                    src="/images/doctors/dr-sudarshan-dev-arya.jpg"
                    alt="Dr. Sudarshan Dev Arya"
                    fill
                    sizes="110px"
                    className="object-cover"
                  />
                </div>
                <div className="relative z-10 bg-white/95 backdrop-blur-xs py-1 px-1.5 rounded-lg border border-gray-100">
                  <span className="font-mono text-[9px] font-bold text-[#2E6CF6] tracking-tight leading-none block">DR. SUDARSHAN</span>
                </div>
              </div>
              {/* Dr. Manisha */}
              <div className="w-[118px] aspect-[3/4] rounded-2xl overflow-hidden border-4 border-white shadow-[0_16px_36px_rgba(22,60,122,0.18)] relative bg-gradient-to-br from-[#EAFBF6] to-white flex flex-col justify-end p-2 text-center">
                <div className="absolute inset-0 z-0">
                  <ClinicImage
                    src="/images/doctors/dr-manisha-bangarwa-arya.jpg"
                    alt="Dr. Manisha Bangarwa Arya"
                    fill
                    sizes="110px"
                    className="object-cover"
                  />
                </div>
                <div className="relative z-10 bg-white/95 backdrop-blur-xs py-1 px-1.5 rounded-lg border border-gray-100">
                  <span className="font-mono text-[9px] font-bold text-[#1FA98A] tracking-tight leading-none block">DR. MANISHA</span>
                </div>
              </div>
            </div>

            {/* Floating Glass Cards */}
            {/* Card 1: Hours */}
            <div className="absolute z-30 top-[50px] left-[-14px] bg-white/75 backdrop-blur-md border border-white/70 shadow-[0_12px_30px_rgba(22,60,122,0.14)] rounded-[15px] p-3 flex items-center gap-2.5 animate-[bsFloatA_5.6s_ease-in-out_infinite] pointer-events-none">
              <div className="w-8 h-8 rounded-lg bg-[#34C7A4]/15 flex items-center justify-center">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#1FA98A" stroke-width="2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </div>
              <div className="leading-tight text-left">
                <div className="text-[12.5px] font-bold text-[#163C7A]">Open Mon–Sat</div>
                <div className="text-[10.5px] text-[#5A6B85]">10–1 &amp; 5–8 · by appt</div>
              </div>
            </div>

            {/* Card 2: Vaccination */}
            <div className="absolute z-30 top-[188px] right-[-16px] bg-white/75 backdrop-blur-md border border-white/70 shadow-[0_12px_30px_rgba(22,60,122,0.14)] rounded-[15px] p-3 flex items-center gap-2.5 animate-[bsFloatB_6.4s_ease-in-out_0.6s_infinite] pointer-events-none">
              <div className="w-8 h-8 rounded-lg bg-[#2E6CF6]/12 flex items-center justify-center">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2E6CF6" stroke-width="2">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div className="leading-tight text-left">
                <div className="text-[12.5px] font-bold text-[#163C7A]">Vaccination</div>
                <div className="text-[10.5px] text-[#5A6B85]">Proper cold-chain</div>
              </div>
            </div>

            {/* Card 3: Duo Credentials */}
            <div className="absolute z-30 bottom-[-10px] right-[-8px] bg-white/80 backdrop-blur-md border border-white/70 shadow-[0_16px_36px_rgba(22,60,122,0.18)] rounded-2xl p-3 max-w-[210px] flex flex-col gap-2 animate-[bsFloatA_7s_ease-in-out_1.1s_infinite] pointer-events-none">
              <div className="flex items-center gap-1.5 text-left">
                <div className="flex -space-x-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2E6CF6] to-[#5b8cff] flex items-center justify-center text-white font-heading font-bold text-xs border-2 border-white select-none">SA</div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#34C7A4] to-[#7ee0c7] flex items-center justify-center text-white font-heading font-bold text-xs border-2 border-white select-none">MA</div>
                </div>
                <span className="font-heading font-bold text-[11px] text-[#163C7A] leading-tight block">
                  Two specialists,<br />one clinic
                </span>
              </div>
              <div className="text-[10.5px] text-[#5A6B85] leading-normal text-left">
                DNB New Delhi · PGPN Boston · Neonatology fellowship
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
