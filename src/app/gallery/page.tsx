import Link from "next/link";
import { Metadata } from "next";
import ClinicImage from "@/components/ui/clinic-image";
import { getBreadcrumbSchema } from "@/lib/schemas";
import { Image as ImageIcon, Calendar } from "lucide-react";
import Cloud from "@/components/ui/decor/Cloud";
import BabyFootprints from "@/components/ui/decor/BabyFootprints";


export const metadata: Metadata = {
  title: "Clinic Gallery | Baby Steps Clinic",
  description: "Real photographs of our child-friendly spaces, pediatric consultation suites, and vaccine storage facilities in Neelbad, Bhopal.",
  alternates: {
    canonical: "https://babystepsnewbornclinic.com/gallery",
  },
  openGraph: {
    title: "Clinic Gallery | Baby Steps Clinic",
    description: "Real photographs of our child-friendly spaces, pediatric consultation suites, and vaccine storage facilities in Neelbad, Bhopal.",
    url: "https://babystepsnewbornclinic.com/gallery",
    siteName: "Baby Steps – Newborn & Child Clinic",
    type: "website",
  },
};

export default function GalleryPage() {
  const galleryItems = [
    { src: "/images/gallery/gallery-1.jpg", alt: "Baby Steps Clinic Waiting Area", title: "Waiting Area", desc: "Child-friendly seating space with cartoon wall murals designed to put children at ease." },
    { src: "/images/gallery/gallery-2.jpg", alt: "Baby Steps Clinic Building Exterior", title: "Clinic Exterior", desc: "Front frontage showing the clinic logo, main entry ramp, and clean access signage." },
    { src: "/images/gallery/gallery-3.jpg", alt: "Dr. Manisha consulting mother and child", title: "Pediatric Consultation", desc: "Consultation in progress with parent and baby under sterile and secure guidelines." },
    { src: "/images/gallery/gallery-4.jpg", alt: "Dr. Manisha examining infant", title: "Newborn Assessment", desc: "Dr. Manisha checking heart rate and breathing via stethoscope during a newborn checkup." },
    { src: "/images/gallery/gallery-5.jpg", alt: "Baby Steps Clinic Reception Desk", title: "Reception Desk", desc: "Information desk for appointments, digital health card logging, and patient queries." },
    { src: "/images/gallery/gallery-6.jpg", alt: "Baby Steps Clinic street view", title: "Clinic Frontage", desc: "Wider street view showing neighbors, parking availability, and road visibility." },
    { src: "/images/gallery/gallery-7.jpg", alt: "Empty Pediatric Consultation Room", title: "Consultation Suite", desc: "Clean checkroom with consultation desk, examination beds, and sanitizing points." },
    { src: "/images/gallery/gallery-8.jpg", alt: "Pediatric scale and examination bed", title: "Growth & Vaccination Room", desc: "Dedicated examination space containing infant scales and digital height tools." }
  ];

  // Breadcrumbs schema
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Gallery", item: "/gallery" }
  ]);

  return (
    <main className="flex-1 bg-white">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Page Header */}
      <section className="bg-surface-tint border-b border-gray-100 py-12 relative overflow-hidden">
        {/* Background SVGs */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-0 select-none">
          <div className="absolute right-[12%] top-[10%]">
            <Cloud className="w-36 h-20 fill-primary" />
          </div>
          <div className="absolute left-[30%] bottom-[-10px]">
            <BabyFootprints className="w-12 h-10 rotate-[15deg] fill-primary" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col gap-2 text-left">
            <div className="flex items-center gap-2 text-xs text-muted-text font-sans">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-primary-dark font-medium">Gallery</span>
            </div>
            <h1 className="text-4xl font-extrabold text-primary-dark font-heading leading-tight">
              Our Clinic Gallery
            </h1>
            <p className="text-sm sm:text-base text-muted-text font-sans max-w-2xl leading-relaxed">
              Take a look inside our clinic — explore our warm facilities, consulting rooms, and child-safe environments in Neelbad, Bhopal.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-150 rounded-2xl shadow-soft overflow-hidden flex flex-col h-full text-left"
              >
                {/* Photo Aspect Ratio */}
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden shrink-0">
                  <ClinicImage
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Details */}
                <div className="p-5 flex flex-col flex-grow gap-2">
                  <h2 className="text-base font-bold font-heading text-primary-dark flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-primary shrink-0" />
                    <span>{item.title}</span>
                  </h2>
                  <p className="text-xs text-muted-text font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Inline Booking CTA */}
          <div className="max-w-3xl mx-auto bg-surface-tint border border-primary/5 rounded-3xl p-8 text-center mt-16 flex flex-col items-center gap-4">
            <h3 className="text-xl font-bold font-heading text-primary-dark">
              Want to visit our clinic?
            </h3>
            <p className="text-sm text-muted-text font-sans leading-relaxed max-w-xl">
              Baby Steps Clinic is situated near Durga Mata Mandir in Neelbad. Request a wellness checkup or vaccination consultation slot today.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <Link
                href="/book-appointment"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold py-3.5 px-6 rounded-2xl hover:bg-primary-dark shadow-md transition-all active:scale-[0.98]"
              >
                <Calendar className="w-4.5 h-4.5" />
                <span>Book Appointment</span>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
