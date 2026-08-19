export interface DoctorAuthorship {
  id: string;
  name: string;
  credentials: string;
  profileUrl: string;
  schemaId: string;
}

export const DOCTOR_CREDENTIALS: Record<string, DoctorAuthorship> = {
  "dr-sudarshan-dev-arya": {
    id: "dr-sudarshan-dev-arya",
    name: "Dr. Sudarshan Dev Arya",
    credentials: "MBBS, DCH, DNB (New Delhi), PGPN (Boston). Consultant, Rainbow Children's Hospital, Bhopal.",
    profileUrl: "/doctors/dr-sudarshan-dev-arya",
    schemaId: "https://babystepsnewbornclinic.com/doctors/dr-sudarshan-dev-arya#physician"
  },
  "dr-manisha-bangarwa-arya": {
    id: "dr-manisha-bangarwa-arya",
    name: "Dr. Manisha Bangarwa Arya",
    credentials: "MBBS, DNB (New Delhi), PGPN (Boston), Fellowship in Neonatology. Consultant, Apollo SAGE Hospital, Bhopal.",
    profileUrl: "/doctors/dr-manisha-bangarwa-arya",
    schemaId: "https://babystepsnewbornclinic.com/doctors/dr-manisha-bangarwa-arya#physician"
  }
};

export interface ContentAuthorship {
  authorId: string;
  reviewerId: string | null;
  reviewedDate: string | null;
  lastUpdated: string;
  datePublished: string;
}

// 13 Services Authorship & Review mapping
export const servicesAuthorship: Record<string, ContentAuthorship> = {
  "vaccination-clinic": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-08-14",
    datePublished: "2026-06-01"
  },
  "newborn-care": {
    authorId: "dr-manisha-bangarwa-arya",
    reviewerId: "dr-sudarshan-dev-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-08-14",
    datePublished: "2026-06-01"
  },
  "nicu-follow-up": {
    authorId: "dr-manisha-bangarwa-arya",
    reviewerId: "dr-sudarshan-dev-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-08-14",
    datePublished: "2026-06-01"
  },
  "growth-monitoring": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-08-14",
    datePublished: "2026-06-01"
  },
  "child-nutrition": {
    authorId: "dr-manisha-bangarwa-arya",
    reviewerId: "dr-sudarshan-dev-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-08-14",
    datePublished: "2026-06-01"
  },
  "development-assessment": {
    authorId: "dr-manisha-bangarwa-arya",
    reviewerId: "dr-sudarshan-dev-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-08-14",
    datePublished: "2026-06-01"
  },
  "breastfeeding-counseling": {
    authorId: "dr-manisha-bangarwa-arya",
    reviewerId: "dr-sudarshan-dev-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-08-14",
    datePublished: "2026-06-01"
  },
  "fever-management": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-08-14",
    datePublished: "2026-06-01"
  },
  "allergy-asthma-care": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-08-14",
    datePublished: "2026-06-01"
  },
  "adolescent-health": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-08-14",
    datePublished: "2026-06-01"
  },
  "emergency-child-care": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-08-14",
    datePublished: "2026-06-01"
  },
  "parent-education": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-08-14",
    datePublished: "2026-06-01"
  },
  "milestone-tracking": {
    authorId: "dr-manisha-bangarwa-arya",
    reviewerId: "dr-sudarshan-dev-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-08-14",
    datePublished: "2026-06-01"
  }
};

// Blog Posts Authorship & Review mapping
export const blogAuthorship: Record<string, ContentAuthorship> = {
  "baby-vaccination-guide": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-07-18",
    datePublished: "2026-07-18"
  },
  "breastfeeding-tips-new-mothers": {
    authorId: "dr-manisha-bangarwa-arya",
    reviewerId: "dr-sudarshan-dev-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-07-18",
    datePublished: "2026-07-18"
  },
  "six-month-development-milestones": {
    authorId: "dr-manisha-bangarwa-arya",
    reviewerId: "dr-sudarshan-dev-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-07-18",
    datePublished: "2026-07-18"
  },
  "child-vaccination-guide-india": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-07-20",
    datePublished: "2026-07-20"
  },
  "iap-vaccination-schedule-chart": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-07-20",
    datePublished: "2026-07-20"
  },
  "missed-vaccine-what-to-do": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-07-20",
    datePublished: "2026-07-20"
  },
  "vaccine-side-effects-fever-management": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-07-20",
    datePublished: "2026-07-20"
  },
  "painless-vaccination-for-babies": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-07-20",
    datePublished: "2026-07-20"
  },
  "baby-weight-gain-tips": {
    authorId: "dr-manisha-bangarwa-arya",
    reviewerId: "dr-sudarshan-dev-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-07-20",
    datePublished: "2026-07-20"
  },
  "dengue-in-children-prevention-care": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-07-20",
    datePublished: "2026-07-20"
  },
  "monsoon-child-care-tips": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-07-20",
    datePublished: "2026-07-20"
  },
  "loose-motion-in-babies-care": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-07-20",
    datePublished: "2026-07-20"
  },
  "child-cough-cold-home-care": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-07-20",
    datePublished: "2026-07-20"
  },
  "child-not-eating-food-picky-eater": {
    authorId: "dr-manisha-bangarwa-arya",
    reviewerId: "dr-sudarshan-dev-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-07-20",
    datePublished: "2026-07-20"
  },
  "vitamin-d-iron-deficiency-kids": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-07-20",
    datePublished: "2026-07-20"
  },
  "child-immunity-booster-guide": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-07-20",
    datePublished: "2026-07-20"
  },
  "baby-vaccination-schedule-chart-india": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-07-20",
    datePublished: "2026-07-20"
  },
  "government-vs-private-vaccination-baby": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-07-20",
    datePublished: "2026-07-20"
  },
  "newborn-care-at-home-guide": {
    authorId: "dr-manisha-bangarwa-arya",
    reviewerId: "dr-sudarshan-dev-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-07-20",
    datePublished: "2026-07-20"
  },
  "baby-fever-when-to-worry": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-07-20",
    datePublished: "2026-07-20"
  },
  "is-my-child-growing-normally": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-07-20",
    datePublished: "2026-07-20"
  },
  "breastfeeding-basics-guide": {
    authorId: "dr-manisha-bangarwa-arya",
    reviewerId: "dr-sudarshan-dev-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-07-18",
    datePublished: "2026-07-18"
  },
  "skip-delay-child-vaccination-risks": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-07-20",
    datePublished: "2026-07-20"
  },
  "baby-cough-cold-home-care": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-07-20",
    datePublished: "2026-07-20"
  },
  "newborn-skin-eyes-cord-care": {
    authorId: "dr-manisha-bangarwa-arya",
    reviewerId: "dr-sudarshan-dev-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-07-20",
    datePublished: "2026-07-20"
  },
  "child-vaccination-cost-bhopal-guide": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-07-20",
    lastUpdated: "2026-07-20",
    datePublished: "2026-07-20"
  },
  "child-flu-symptoms-care-vaccine-guide": {
    authorId: "dr-sudarshan-dev-arya",
    reviewerId: "dr-manisha-bangarwa-arya",
    reviewedDate: "2026-08-19",
    lastUpdated: "2026-08-19",
    datePublished: "2026-08-19"
  }
};
