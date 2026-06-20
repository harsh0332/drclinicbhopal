import { siteConfig } from "./site-config";

// Schema helper for MedicalClinic (LocalBusiness)
export function getMedicalClinicSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": siteConfig.name,
    "alternateName": siteConfig.shortName,
    "url": "https://www.babystepsclinic.in",
    "logo": "https://www.babystepsclinic.in/images/logo/logo.png",
    "image": "https://www.babystepsclinic.in/images/clinic/exterior.jpg",
    "telephone": "+916262560101",
    "email": siteConfig.email,
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
      "latitude": 23.2031, // Approximate latitude for Neelbad
      "longitude": 77.3489 // Approximate longitude for Neelbad
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "10:00",
        "closes": "13:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "17:00",
        "closes": "20:00"
      }
    ],
    "sameAs": [
      siteConfig.socials.facebook,
      siteConfig.socials.instagram,
      siteConfig.socials.youtube
    ]
  };
}

// Schema helper for Physician (Doctor Profile)
export function getPhysicianSchema(doctor: { name: string; degree: string; title: string; hospital: string; id: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": doctor.name,
    "medicalSpecialty": "Pediatric",
    "description": `${doctor.title} with credentials ${doctor.degree}. ${doctor.hospital}.`,
    "telephone": "+916262560101",
    "url": `https://www.babystepsclinic.in/doctors/${doctor.id}`,
    "logo": "https://www.babystepsclinic.in/images/logo/logo.png",
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
      "name": siteConfig.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "227/1, Near Durga Mata Mandir, Pooja Colony, Neelbad",
        "addressLocality": "Bhopal",
        "addressRegion": "Madhya Pradesh",
        "postalCode": "462044",
        "addressCountry": "IN"
      }
    },
    "hospitalAffiliation": {
      "@type": "Hospital",
      "name": doctor.hospital.replace("Consultant, ", "")
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
      "name": siteConfig.name,
      "url": "https://www.babystepsclinic.in"
    },
    "url": `https://www.babystepsclinic.in/services/${service.slug}`
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
      "name": siteConfig.name,
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.babystepsclinic.in/images/logo/logo.png"
      }
    },
    "url": `https://www.babystepsclinic.in/blog/${post.slug}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.babystepsclinic.in/blog/${post.slug}`
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
      "item": item.item.startsWith("http") ? item.item : `https://www.babystepsclinic.in${item.item}`
    }))
  };
}
