import { siteConfig } from "./site-config";
import { DOCTOR_CREDENTIALS, blogAuthorship, servicesAuthorship, ContentAuthorship } from "./authorship-config";

// 1. Homepage Schema Builder (MedicalClinic + FAQPage in a unified @graph)
export function getHomepageGraphSchema(faqs: { q: string; a: string }[]) {
  const clinicId = "https://babystepsnewbornclinic.com/#clinic";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "@id": clinicId,
        "name": "Baby Steps – Newborn & Child Clinic",
        "url": "https://babystepsnewbornclinic.com",
        "telephone": "+916262560101",
        "email": "contact@babystepsnewbornclinic.com",
        "image": "https://babystepsnewbornclinic.com/images/og/og-default.jpg",
        "medicalSpecialty": ["Pediatric", "Neonatal"],
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
          "latitude": 23.19674,
          "longitude": 77.35040
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
        "areaServed": [
          { "@type": "Place", "name": "Neelbad, Bhopal" },
          { "@type": "Place", "name": "Kolar Road, Bhopal" },
          { "@type": "Place", "name": "Bawadia Kalan, Bhopal" },
          { "@type": "Place", "name": "Danish Kunj, Bhopal" },
          { "@type": "Place", "name": "Salaiya, Bhopal" },
          { "@type": "Place", "name": "Chuna Bhatti, Bhopal" },
          { "@type": "Place", "name": "Katara Hills, Bhopal" },
          { "@type": "Place", "name": "Bagmugaliya, Bhopal" },
          { "@type": "Place", "name": "Ratibad, Bhopal" },
          { "@type": "Place", "name": "Lalghati, Bhopal" }
        ],
        "sameAs": [
          "https://facebook.com/babystepsbhopal",
          "https://www.instagram.com/babysteps.bhopal",
          "https://youtube.com/babystepsbhopal"
        ],
        "priceRange": "₹₹"
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

// 2. Physician Schema Builder (standalone block with @context)
export function getPhysicianSchema(doctor: {
  id: string;
  name: string;
  degree?: string;
  title?: string;
  hospital?: string;
  image?: string;
}) {
  const isManisha = doctor.name.includes("Manisha") || doctor.id.includes("manisha");
  const doctorSlug = isManisha ? "dr-manisha-bangarwa-arya" : "dr-sudarshan-dev-arya";
  const doctorUrl = `https://babystepsnewbornclinic.com/doctors/${doctorSlug}`;
  const doctorId = `${doctorUrl}#physician`;
  const doctorImage = isManisha
    ? "https://babystepsnewbornclinic.com/images/doctors/dr-manisha-bangarwa-arya.jpg"
    : "https://babystepsnewbornclinic.com/images/doctors/dr-sudarshan-dev-arya.jpg";
  const medicalSpecialty = isManisha ? "Neonatal" : "Pediatric";
  const hospitalName = isManisha
    ? "Apollo SAGE Hospital, Bhopal"
    : "Rainbow Children's Hospital, Bhopal";

  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": doctorId,
    "name": doctor.name,
    "medicalSpecialty": medicalSpecialty,
    "worksFor": {
      "@type": "Hospital",
      "name": hospitalName
    },
    "url": doctorUrl,
    "image": doctorImage,
    "affiliation": {
      "@id": "https://babystepsnewbornclinic.com/#clinic"
    }
  };
}

// 3. Service Node Builder (for @graph arrays)
export function getServiceSchema(service: { title: string; description?: string; whatItIs?: string; slug: string }) {
  return {
    "@type": "Service",
    "@id": `https://babystepsnewbornclinic.com/services/${service.slug}#service`,
    "name": service.title,
    "description": service.description || service.whatItIs || `${service.title} at Baby Steps Newborn & Child Clinic in Neelbad, Bhopal.`,
    "provider": {
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

// 4. Area MedicalClinic Node Builder (for @graph arrays)
export function getAreaMedicalClinicSchema(areaName: string, slug: string) {
  const pageUrl = `https://babystepsnewbornclinic.com/areas/${slug}`;
  return {
    "@type": "MedicalClinic",
    "@id": `${pageUrl}#clinic`,
    "name": `Baby Steps – Newborn & Child Clinic (${areaName})`,
    "url": pageUrl,
    "branchOf": {
      "@id": "https://babystepsnewbornclinic.com/#clinic"
    },
    "areaServed": {
      "@type": "Place",
      "name": `${areaName}, Bhopal`
    }
  };
}

// 5. FAQPage Node Builder (for @graph arrays)
export function getFAQSchema(faqs?: { q: string; a: string }[], pageUrl: string = "https://babystepsnewbornclinic.com/faqs") {
  const safeFaqs = faqs || [];
  return {
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

// 6. MedicalWebPage Node Builder for Blog Posts (for @graph arrays)
export function getBlogPostingSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  dateModified?: string;
  author?: string;
  reviewPending?: boolean;
}) {
  const authorship: ContentAuthorship = blogAuthorship[post.slug] || {
    authorId: post.author?.includes("Manisha") ? "dr-manisha-bangarwa-arya" : "dr-sudarshan-dev-arya",
    reviewerId: post.author?.includes("Manisha") ? "dr-sudarshan-dev-arya" : "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: post.dateModified || post.date,
    datePublished: post.date
  };

  const authorDoctor = DOCTOR_CREDENTIALS[authorship.authorId] || DOCTOR_CREDENTIALS["dr-sudarshan-dev-arya"];
  const isReviewExpired = authorship.reviewedDate ? authorship.reviewedDate < (authorship.lastUpdated || post.dateModified || post.date) : true;
  const hideReviewer = post.reviewPending || isReviewExpired || !authorship.reviewerId;
  const reviewerDoctor = !hideReviewer && authorship.reviewerId ? DOCTOR_CREDENTIALS[authorship.reviewerId] : null;

  const publishedIso = new Date(authorship.datePublished || post.date).toISOString();
  const modifiedIso = new Date(authorship.lastUpdated || post.dateModified || post.date).toISOString();

  const node: Record<string, any> = {
    "@type": "MedicalWebPage",
    "@id": `https://babystepsnewbornclinic.com/blog/${post.slug}#webpage`,
    "headline": post.title,
    "description": post.excerpt,
    "url": `https://babystepsnewbornclinic.com/blog/${post.slug}`,
    "image": `https://babystepsnewbornclinic.com/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent("Child Health")}`,
    "inLanguage": "en-IN",
    "datePublished": publishedIso,
    "dateModified": modifiedIso,
    "author": {
      "@id": authorDoctor.schemaId
    },
    "publisher": {
      "@id": "https://babystepsnewbornclinic.com/#clinic"
    },
    "mainEntityOfPage": `https://babystepsnewbornclinic.com/blog/${post.slug}`
  };

  if (reviewerDoctor) {
    node["reviewedBy"] = {
      "@id": reviewerDoctor.schemaId
    };
  }

  return node;
}

// 6b. MedicalWebPage Node Builder for Service Pages (for @graph arrays)
export function getServiceMedicalWebPageSchema(service: {
  title: string;
  description?: string;
  whatItIs?: string;
  slug: string;
}) {
  const authorship = servicesAuthorship[service.slug];
  if (!authorship) return null;

  const authorDoctor = DOCTOR_CREDENTIALS[authorship.authorId] || DOCTOR_CREDENTIALS["dr-sudarshan-dev-arya"];
  const reviewerDoctor = authorship.reviewerId ? DOCTOR_CREDENTIALS[authorship.reviewerId] : null;

  const publishedIso = new Date(authorship.datePublished).toISOString();
  const modifiedIso = new Date(authorship.lastUpdated).toISOString();

  const node: Record<string, any> = {
    "@type": "MedicalWebPage",
    "@id": `https://babystepsnewbornclinic.com/services/${service.slug}#webpage`,
    "headline": `${service.title} in Neelbad, Bhopal`,
    "description": service.description || service.whatItIs || `${service.title} at Baby Steps Newborn & Child Clinic.`,
    "url": `https://babystepsnewbornclinic.com/services/${service.slug}`,
    "image": `https://babystepsnewbornclinic.com/api/og?title=${encodeURIComponent(service.title)}&category=${encodeURIComponent("Pediatric Service")}`,
    "inLanguage": "en-IN",
    "datePublished": publishedIso,
    "dateModified": modifiedIso,
    "author": {
      "@id": authorDoctor.schemaId
    },
    "publisher": {
      "@id": "https://babystepsnewbornclinic.com/#clinic"
    },
    "mainEntityOfPage": `https://babystepsnewbornclinic.com/services/${service.slug}`
  };

  if (reviewerDoctor) {
    node["reviewedBy"] = {
      "@id": reviewerDoctor.schemaId
    };
  }

  return node;
}

// 7. BreadcrumbList Schema Builder (standalone with @context)
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

// 8. BreadcrumbList Node Builder (for @graph arrays - no @context)
export function getBreadcrumbNode(items: { name: string; item: string }[]) {
  return {
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item.startsWith("http") ? item.item : `https://babystepsnewbornclinic.com${item.item}`
    }))
  };
}
