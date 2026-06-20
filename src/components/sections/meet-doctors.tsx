"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import ClinicImage from "@/components/ui/clinic-image";
import { GraduationCap, Award, Building, ArrowRight } from "lucide-react";

export default function MeetDoctors() {
  return (
    <section id="doctors" className="py-20 bg-surface-tint">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-white/80 border border-primary/10 shadow-soft px-4 py-1.5 rounded-full inline-block mx-auto">
            Our Doctors
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-dark font-heading">
            Meet our pediatric specialists
          </h2>
          <p className="text-sm sm:text-base text-muted-text font-sans leading-relaxed">
            Our clinic is led by fully registered and credentialed pediatricians holding advanced qualifications from premier institutions in India and the USA.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {siteConfig.doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white border border-gray-150 rounded-3xl shadow-soft hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden shrink-0">
                <ClinicImage
                  src={doctor.image}
                  alt={`${doctor.name} - ${doctor.title}`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow gap-5">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                    {doctor.title}
                  </span>
                  <h3 className="text-2xl font-bold font-heading text-primary-dark">
                    {doctor.name}
                  </h3>
                </div>

                <div className="flex flex-col gap-3 text-sm text-muted-text font-sans border-t border-gray-100 pt-4">
                  {/* Credentials */}
                  <div className="flex items-start gap-2.5">
                    <GraduationCap className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-gray-900 font-medium">Qualifications:</strong> {doctor.degree}
                    </span>
                  </div>

                  {/* Affiliation */}
                  <div className="flex items-start gap-2.5">
                    <Building className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-gray-900 font-medium">Clinical Affiliation:</strong> {doctor.hospital}
                    </span>
                  </div>

                  {/* Association info */}
                  <div className="flex items-start gap-2.5">
                    <Award className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Registered under Medical Council of India &amp; Madhya Pradesh Medical Council.
                    </span>
                  </div>
                </div>

                {/* Profile CTA */}
                <div className="mt-auto pt-6">
                  <Link
                    href={`/doctors#${doctor.id}`}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold text-sm transition-colors group"
                  >
                    <span>View clinical profile</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
