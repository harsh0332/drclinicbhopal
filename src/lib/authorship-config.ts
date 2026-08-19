export interface DoctorCredentials {
  name: string;
  degree: string;
  title: string;
  credentials: string;
  registrationNumber: string;
  registrationState: string;
  profileUrl: string;
  schemaId: string;
}

export interface ContentAuthorship {
  authorId: string;
  reviewerId?: string;
  reviewedDate?: string;
  lastUpdated: string;
  datePublished: string;
}

export const DOCTOR_CREDENTIALS: Record<string, DoctorCredentials> = {
  "dr-sudarshan-dev-arya": {
    name: "Dr. Sudarshan Dev Arya",
    degree: "MBBS, DCH, DNB (Pediatrics), PGPN (Boston, USA)",
    title: "Senior Consultant Pediatrician",
    credentials: "15+ Years Clinical Experience | MP Medical Council Reg: MP-11234",
    registrationNumber: "MP-11234",
    registrationState: "Madhya Pradesh",
    profileUrl: "/doctors/dr-sudarshan-dev-arya",
    schemaId: "https://babystepsnewbornclinic.com/doctors/dr-sudarshan-dev-arya#physician"
  },
  "dr-manisha-bangarwa-arya": {
    name: "Dr. Manisha Bangarwa Arya",
    degree: "MBBS, DNB (Pediatrics), Fellowship in Neonatology (Fernandez Hospital), PGPN (Boston, USA)",
    title: "Consultant Pediatrician & Neonatologist",
    credentials: "12+ Years Clinical Experience | MP Medical Council Reg: MP-14567",
    registrationNumber: "MP-14567",
    registrationState: "Madhya Pradesh",
    profileUrl: "/doctors/dr-manisha-bangarwa-arya",
    schemaId: "https://babystepsnewbornclinic.com/doctors/dr-manisha-bangarwa-arya#physician"
  }
};

// 13 Services Authorship & Review mapping
export const servicesAuthorship: Record<string, ContentAuthorship> = {
  "vaccination-clinic": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-06-01"
  },
  "newborn-care": {
    authorId: "dr-manisha-bangarwa-arya",
    reviewerId: "dr-sudarshan-dev-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-06-01"
  },
  "nicu-follow-up": {
    authorId: "dr-manisha-bangarwa-arya",
    reviewerId: "dr-sudarshan-dev-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-06-01"
  },
  "growth-monitoring": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-06-01"
  },
  "child-nutrition": {
    authorId: "dr-manisha-bangarwa-arya",
    reviewerId: "dr-sudarshan-dev-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-06-01"
  },
  "development-assessment": {
    authorId: "dr-manisha-bangarwa-arya",
    reviewerId: "dr-sudarshan-dev-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-06-01"
  },
  "breastfeeding-counseling": {
    authorId: "dr-manisha-bangarwa-arya",
    reviewerId: "dr-sudarshan-dev-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-06-01"
  },
  "fever-management": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-06-01"
  },
  "allergy-asthma-care": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-06-01"
  },
  "adolescent-health": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-06-01"
  },
  "emergency-child-care": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-06-01"
  },
  "parent-education": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-06-01"
  },
  "milestone-tracking": {
    authorId: "dr-manisha-bangarwa-arya",
    reviewerId: "dr-sudarshan-dev-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-06-01"
  }
};

export const blogAuthorship: Record<string, ContentAuthorship> = {
  "child-vaccination-guide-india": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-07-18"
  },
  "six-month-development-milestones": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-07-18"
  },
  "missed-vaccine-what-to-do": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-07-18"
  },
  "vaccine-side-effects-fever-management": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-07-18"
  },
  "painless-vaccination-for-babies": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-07-18"
  },
  "baby-weight-gain-tips": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-07-20"
  },
  "dengue-in-children-prevention-care": {
    authorId: "dr-manisha-bangarwa-arya",
    reviewerId: "dr-sudarshan-dev-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-07-20"
  },
  "monsoon-child-care-tips": {
    authorId: "dr-manisha-bangarwa-arya",
    reviewerId: "dr-sudarshan-dev-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-07-20"
  },
  "loose-motion-in-babies-care": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-07-20"
  },
  "child-not-eating-food-picky-eater": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-07-20"
  },
  "vitamin-d-iron-deficiency-kids": {
    authorId: "dr-manisha-bangarwa-arya",
    reviewerId: "dr-sudarshan-dev-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-07-20"
  },
  "child-immunity-booster-guide": {
    authorId: "dr-manisha-bangarwa-arya",
    reviewerId: "dr-sudarshan-dev-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-07-20"
  },
  "baby-vaccination-schedule-chart-india": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-07-21"
  },
  "government-vs-private-vaccination-baby": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-07-19"
  },
  "newborn-care-at-home-guide": {
    authorId: "dr-manisha-bangarwa-arya",
    reviewerId: "dr-sudarshan-dev-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-07-15"
  },
  "baby-fever-when-to-worry": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-07-14"
  },
  "is-my-child-growing-normally": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-07-13"
  },
  "breastfeeding-basics-guide": {
    authorId: "dr-manisha-bangarwa-arya",
    reviewerId: "dr-sudarshan-dev-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-07-11"
  },
  "baby-cough-cold-home-care": {
    authorId: "dr-manisha-bangarwa-arya",
    reviewerId: "dr-sudarshan-dev-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-07-07"
  },
  "newborn-skin-eyes-cord-care": {
    authorId: "dr-manisha-bangarwa-arya",
    reviewerId: "dr-sudarshan-dev-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-07-05"
  },
  "child-vaccination-cost-bhopal-guide": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-07-03"
  },
  "child-flu-symptoms-care-vaccine-guide": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-08-19"
  }
};
