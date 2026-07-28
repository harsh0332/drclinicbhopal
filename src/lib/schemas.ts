import { siteConfig } from "./site-config";

// T2 & T3 & T5 — Homepage Graph Builder (MedicalClinic + 2 Physicians + FAQPage in a single @graph)
export function getHomepageGraphSchema(faqs: { q: string; a: string }[]) {
  const clinicId = "https://babystepsnewbornclinic.com/#clinic";
  const drSudarshanId = "https://babystepsnewbornclinic.com/#dr-sudarshan";
  const drManishaId = "https://babystepsnewbornclinic.com/#dr-manisha";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "@id": clinicId,
        "name": "Baby Steps - Newborn & Child Clinic",
        "medicalSpecialty": "Pediatric",
        "url": "https://babystepsnewbornclinic.com",
        "logo": "https://babystepsnewbornclinic.com/images/logo/logo-horizontal.png",
        "image": "https://babystepsnewbornclinic.com/images/clinic/exterior.jpg",
        "telephone": "+916262560101",
        "email": "contact@babystepsnewbornclinic.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "227/1, Pooja Colony, Neelbad",
          "addressLocality": "Bhopal",
          "addressRegion": "Madhya Pradesh",
          "postalCode": "462044",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 23.19674,
          "longitude": 77.35040
        },
        "hasMap": "https://www.google.com/maps/place/Baby+Steps+Newborn+%26+Child+Clinic/@23.1967373,77.3504045,17z",
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
        "areaServed": [
          { "@type": "Place", "name": "Neelbad, Bhopal" },
          { "@type": "Place", "name": "Kolar Road, Bhopal" },
          { "@type": "Place", "name": "Bawadia Kalan, Bhopal" },
          { "@type": "Place", "name": "Danish Kunj, Bhopal" },
          { "@type": "Place", "name": "Salaiya, Bhopal" },
          { "@type": "Place", "name": "Chuna Bhatti, Bhopal" },
          { "@type": "Place", "name": "Katara Hills, Bhopal" },
          { "@type": "Place", "name": "Bagmugaliya, Bhopal" },
          { "@type": "Place", "name": "Lalghati, Bhopal" },
          { "@type": "Place", "name": "Ratibad, Bhopal" }
        ],
        "sameAs": [
          "https://facebook.com/babystepsbhopal",
          "https://www.instagram.com/babysteps.bhopal",
          "https://youtube.com/babystepsbhopal"
        ],
        "employee": [
          { "@id": drSudarshanId },
          { "@id": drManishaId }
        ],
        // Manually synced with Google Business Profile on 2026-07-28. Update both this value and the visible on-page figure together.
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "21",
          "bestRating": "5"
        }
      },
      {
        "@type": "Physician",
        "@id": drSudarshanId,
        "name": "Dr. Sudarshan Dev Arya",
        "medicalSpecialty": "Pediatric",
        "jobTitle": "Senior Pediatrician & Newborn Specialist",
        "url": "https://babystepsnewbornclinic.com/doctors/dr-sudarshan-dev-arya",
        "image": "https://babystepsnewbornclinic.com/images/doctors/dr-sudarshan-dev-arya.jpg",
        "worksFor": { "@id": clinicId },
        // TODO: add corrected Practo profile URLs once claimed
        "sameAs": []
      },
      {
        "@type": "Physician",
        "@id": drManishaId,
        "name": "Dr. Manisha Bangarwa Arya",
        "medicalSpecialty": "Neonatal",
        "jobTitle": "Senior Neonatologist & Pediatrician",
        "url": "https://babystepsnewbornclinic.com/doctors/dr-manisha-bangarwa-arya",
        "image": "https://babystepsnewbornclinic.com/images/doctors/dr-manisha-bangarwa-arya.jpg",
        "worksFor": { "@id": clinicId },
        // TODO: add corrected Practo profile URLs once claimed
        "sameAs": []
      },
      {
        "@type": "FAQPage",
        "@id": "https://babystepsnewbornclinic.com/#faq",
        "url": "https://babystepsnewbornclinic.com",
        "mainEntityOfPage": "https://babystepsnewbornclinic.com",
        "mainEntity": faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      }
    ]
  };
}

// Deprecated fallback for compatibility if imported elsewhere
export function getMedicalClinicSchema() {
  return getHomepageGraphSchema([]);
}

// T2 — Physician Schema Builder for doctor pages
export function getPhysicianSchema(doctor: { name: string; id: string }) {
  const isManisha = doctor.name.includes("Manisha") || doctor.id.includes("manisha");
  const doctorId = isManisha
    ? "https://babystepsnewbornclinic.com/#dr-manisha"
    : "https://babystepsnewbornclinic.com/#dr-sudarshan";
  const doctorUrl = isManisha
    ? "https://babystepsnewbornclinic.com/doctors/dr-manisha-bangarwa-arya"
    : "https://babystepsnewbornclinic.com/doctors/dr-sudarshan-dev-arya";
  const doctorImage = isManisha
    ? "https://babystepsnewbornclinic.com/images/doctors/dr-manisha-bangarwa-arya.jpg"
    : "https://babystepsnewbornclinic.com/images/doctors/dr-sudarshan-dev-arya.jpg";
  const medicalSpecialty = isManisha ? "Neonatal" : "Pediatric";
  const jobTitle = isManisha ? "Senior Neonatologist & Pediatrician" : "Senior Pediatrician & Newborn Specialist";

  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": doctorId,
    "name": doctor.name,
    "medicalSpecialty": medicalSpecialty,
    "jobTitle": jobTitle,
    "url": doctorUrl,
    "image": doctorImage,
    "worksFor": {
      "@id": "https://babystepsnewbornclinic.com/#clinic"
    },
    // TODO: add corrected Practo profile URLs once claimed
    "sameAs": []
  };
}

// T6 — Service Schema Builder
export function getServiceSchema(service: { title: string; description?: string; whatItIs?: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description || service.whatItIs || `${service.title} at Baby Steps Newborn & Child Clinic in Neelbad, Bhopal.`,
    "provider": {
      "@type": "MedicalClinic",
      "@id": "https://babystepsnewbornclinic.com/#clinic"
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Bhopal"
    },
    "serviceType": "Pediatric care",
    "url": `https://babystepsnewbornclinic.com/services/${service.slug}`
  };
}

// T7 — Area WebPage Schema Builder (No MedicalClinic node!)
export function getAreaWebPageSchema(areaName: string, slug: string) {
  const pageUrl = `https://babystepsnewbornclinic.com/areas/${slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": pageUrl,
        "url": pageUrl,
        "name": `Pediatrician & Child Clinic Near ${areaName}, Bhopal`,
        "about": {
          "@type": "MedicalClinic",
          "@id": "https://babystepsnewbornclinic.com/#clinic"
        }
      },
      getBreadcrumbSchema([
        { name: "Home", item: "/" },
        { name: "Areas We Serve", item: "/areas" },
        { name: areaName, item: `/areas/${slug}` }
      ])
    ]
  };
}

// Standalone FAQPage helper
export function getFAQSchema(faqs?: { q: string; a: string }[], pageUrl: string = "https://babystepsnewbornclinic.com/faqs") {
  const safeFaqs = faqs || [];
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    "url": pageUrl,
    "mainEntityOfPage": pageUrl,
    "mainEntity": safeFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };
}

// T8 — MedicalWebPage / BlogPosting Schema Builder
export function getBlogPostingSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  dateModified?: string;
  author: string;
}) {
  const publishedIso = new Date(post.date).toISOString();
  const modifiedIso = post.dateModified
    ? new Date(post.dateModified).toISOString()
    : publishedIso;

  const physicianId = post.author.includes("Manisha")
    ? "https://babystepsnewbornclinic.com/#dr-manisha"
    : "https://babystepsnewbornclinic.com/#dr-sudarshan";

  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `https://babystepsnewbornclinic.com/blog/${post.slug}`,
    "headline": post.title,
    "description": post.excerpt,
    "url": `https://babystepsnewbornclinic.com/blog/${post.slug}`,
    "image": "https://babystepsnewbornclinic.com/images/og/og-default.jpg",
    "datePublished": publishedIso,
    "dateModified": modifiedIso,
    "author": {
      "@type": "Physician",
      "@id": physicianId
    },
    "reviewedBy": {
      "@type": "Physician",
      "@id": physicianId
    },
    "publisher": {
      "@type": "MedicalClinic",
      "@id": "https://babystepsnewbornclinic.com/#clinic"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://babystepsnewbornclinic.com/blog/${post.slug}`
    }
  };
}

// BreadcrumbList Schema Builder
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
