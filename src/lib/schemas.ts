import { siteConfig } from "./site-config";

// Schema helper for MedicalClinic (LocalBusiness)
export function getMedicalClinicSchema() {
  const clinicId = "https://babystepsnewbornclinic.com/#clinic";
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": clinicId,
    "name": "Baby Steps – Newborn & Child Clinic",
    "alternateName": siteConfig.shortName,
    "url": "https://babystepsnewbornclinic.com",
    "logo": "https://babystepsnewbornclinic.com/images/logo/logo-horizontal.png",
    "image": "https://babystepsnewbornclinic.com/images/clinic/exterior.jpg",
    "telephone": "+916262560101",
    "email": "contact@babystepsnewbornclinic.in", // CHECK: verify correctness of this email vs .com
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+916262560101",
        "contactType": "customer service"
      },
      {
        "@type": "ContactPoint",
        "telephone": "+917554565588",
        "contactType": "customer service"
      }
    ],
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "227/1, Near Durga Mata Mandir, Pooja Colony, Neelbad",
      "addressLocality": "Bhopal",
      "addressRegion": "Madhya Pradesh",
      "postalCode": "462044",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 23.1934, // CHECK: exact clinic pin coordinates
      "longitude": 77.3431
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "10:00",
        "closes": "21:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Sunday"],
        "opens": "10:00",
        "closes": "13:00"
      }
    ],
    "medicalSpecialty": "Pediatric",
    "areaServed": ["Neelbad", "Kolar", "Bawadia Kalan", "Ratibad", "South Bhopal"],
    "availableService": siteConfig.services.map((s) => ({
      "@type": "MedicalTherapy",
      "name": s
    })),
    "sameAs": [
      siteConfig.socials.facebook,
      siteConfig.socials.instagram,
      siteConfig.socials.youtube,
      "https://g.page/r/CeKFI-QMCRejEBM/review"
    ],
    "employee": siteConfig.doctors.map((d) => ({
      "@type": "Physician",
      "@id": `https://babystepsnewbornclinic.com/doctors/${d.id}/#doctor`,
      "name": d.name
    }))
  };
}

// Schema helper for Physician (Doctor Profile)
export function getPhysicianSchema(doctor: { name: string; degree: string; title: string; hospital: string; id: string }) {
  const clinicId = "https://babystepsnewbornclinic.com/#clinic";
  const doctorId = `https://babystepsnewbornclinic.com/doctors/${doctor.id}/#doctor`;
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": doctorId,
    "name": doctor.name,
    "medicalSpecialty": "Pediatric",
    "description": `${doctor.title} with credentials ${doctor.degree}. ${doctor.hospital}.`,
    "telephone": "+916262560101",
    "url": `https://babystepsnewbornclinic.com/doctors/${doctor.id}`,
    "logo": "https://babystepsnewbornclinic.com/images/logo/logo-horizontal.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "227/1, Near Durga Mata Mandir, Pooja Colony, Neelbad",
      "addressLocality": "Bhopal",
      "addressRegion": "Madhya Pradesh",
      "postalCode": "462044",
      "addressCountry": "IN"
    },
    "worksFor": {
      "@type": "MedicalClinic",
      "@id": clinicId,
      "name": "Baby Steps – Newborn & Child Clinic",
      "url": "https://babystepsnewbornclinic.com"
    },
    "memberOf": {
      "@type": "Hospital",
      "name": doctor.hospital.includes("Rainbow") ? "Rainbow Children's Hospital, Bhopal" : "Apollo SAGE Hospital, Bhopal"
    }
  };
}

// Schema helper for Service/MedicalProcedure
export function getServiceSchema(service: { title: string; description: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "MedicalClinic",
      "@id": "https://babystepsnewbornclinic.com/#clinic",
      "name": "Baby Steps – Newborn & Child Clinic",
      "url": "https://babystepsnewbornclinic.com"
    },
    "url": `https://babystepsnewbornclinic.com/services/${service.slug}`
  };
}

// Schema helper for FAQPage
export function getFAQSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };
}

// Schema helper for BlogPosting
export function getBlogPostingSchema(post: { title: string; excerpt: string; slug: string; date: string; author: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": new Date(post.date).toISOString().split('T')[0],
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Baby Steps – Newborn & Child Clinic",
      "logo": {
        "@type": "ImageObject",
        "url": "https://babystepsnewbornclinic.com/images/logo/logo-horizontal.png"
      }
    },
    "url": `https://babystepsnewbornclinic.com/blog/${post.slug}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://babystepsnewbornclinic.com/blog/${post.slug}`
    }
  };
}

// Schema helper for BreadcrumbList
export function getBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item.startsWith("http") ? item.item : `https://babystepsnewbornclinic.com${item.item}`
    }))
  };
}
