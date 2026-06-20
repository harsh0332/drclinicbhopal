export interface LocalityItem {
  name: string;
  slug: string;
  title: string;
  intro: string;
  whyChoose: string[];
  distanceNote: string;
  services: string[];
}

export const localitiesData: Record<string, LocalityItem> = {
  "neelbad": {
    name: "Neelbad",
    slug: "neelbad",
    title: "Pediatrician in Neelbad, Bhopal",
    intro: "For parents residing in Neelbad, access to high-standard newborn and child healthcare is available right in the neighborhood. Baby Steps Clinic provides direct outpatient consultations, IAP-aligned immunizations, and specialized neonatal checkups.",
    whyChoose: [
      "Located centrally in Neelbad, eliminating long transit stress for sick infants.",
      "Dual specialist care: consultations managed directly by Dr. Sudarshan Dev Arya and Dr. Manisha Bangarwa Arya.",
      "Strict cold-chain refrigeration monitoring for pediatric vaccinations."
    ],
    distanceNote: "Located locally in Pooja Colony, Neelbad. Under 2 minutes travel time from Neelbad Square.",
    services: ["Vaccination Clinic", "Newborn Care", "Growth Monitoring", "Breastfeeding Counseling"]
  },
  "kolar-road": {
    name: "Kolar Road",
    slug: "kolar-road",
    title: "Pediatrician near Kolar Road, Bhopal",
    intro: "Families living along Kolar Road can access premium pediatric and neonatal services via a short commute to our facility. We offer comprehensive child health monitoring, asthmatic care guidelines, and development screens.",
    whyChoose: [
      "Avoids the heavy traffic of central Bhopal hospitals while seeking senior consulting care.",
      "Dr. Manisha Bangarwa Arya's specialized Neonatology Fellowship provides advanced care for preemies and low birth weight infants.",
      "On-time appointment slots scheduled to reduce waiting room exposure for healthy babies."
    ],
    distanceNote: "Approximately 8 km from Kolar Road (via Kerwa Dam Road / Neelbad Road). Travel time is around 12–15 minutes.",
    services: ["NICU Follow-up", "Allergy & Asthma Care", "Development Assessment"]
  },
  "bawadia-kalan": {
    name: "Bawadia Kalan",
    slug: "bawadia-kalan",
    title: "Pediatrician near Bawadia Kalan, Bhopal",
    intro: "For residents of Bawadia Kalan, Baby Steps Clinic offers evidence-based child consultations and WHO-aligned vaccination services. We support parents with expert milestone assessments and child nutrition advice.",
    whyChoose: [
      "Direct consultancies with physicians holding PGPN Boston credentials in child nutrition.",
      "Clean, modern clinical environment with play-friendly child waiting spaces.",
      "Detailed pediatric health records maintained digitally for subsequent consultations."
    ],
    distanceNote: "Approximately 14 km from Bawadia Kalan (via Kolar Road / Kerwa Dam Road). Travel time is around 25 minutes.",
    services: ["Child Nutrition", "Milestone Tracking", "Vaccination Clinic"]
  },
  "danish-kunj": {
    name: "Danish Kunj",
    slug: "danish-kunj",
    title: "Pediatrician near Danish Kunj, Bhopal",
    intro: "Located near Danish Kunj, Baby Steps Clinic is a dedicated outpatient clinic for families seeking newborn assessments, lactation guidance, and general pediatric checkups. We follow National Medical Commission guidelines.",
    whyChoose: [
      "Convenient cross-town route avoiding commercial center congestions.",
      "Affiliated consulting access at Apollo SAGE and Rainbow Children's Hospitals for quick admission coordinate.",
      "Comprehensive parent educational workshops covering home baby-proofing."
    ],
    distanceNote: "Approximately 9.5 km from Danish Kunj (via Neelbad Road). Travel time is around 15–18 minutes.",
    services: ["Newborn Care", "Parent Education", "Fever Management"]
  },
  "salaiya": {
    name: "Salaiya",
    slug: "salaiya",
    title: "Pediatrician near Salaiya, Bhopal",
    intro: "Salaiya residents can access qualified newborn and critical child outpatient care at Baby Steps Clinic. We provide regular growth curve plotting, complementary feeding guidance, and adolescent physical monitoring.",
    whyChoose: [
      "Pediatricians registered with national medical bodies providing factual clinical guidance.",
      "Specialized consultation setup for preterm babies post-NICU discharge.",
      "Lactation consult room for private maternal breastfeeding instruction."
    ],
    distanceNote: "Approximately 11 km from Salaiya (via Kolar Bypass / Neelbad Road). Travel time is around 20 minutes.",
    services: ["Breastfeeding Counseling", "NICU Follow-up", "Adolescent Health"]
  },
  "chuna-bhatti": {
    name: "Chuna Bhatti",
    slug: "chuna-bhatti",
    title: "Pediatrician near Chuna Bhatti, Bhopal",
    intro: "For parents in Chuna Bhatti looking for evidence-based child healthcare, Baby Steps Clinic offers outpatient services managed by senior consultants. Our clinic specializes in developmental screening and fever management.",
    whyChoose: [
      "Direct consultation with DNB (Pediatrics) qualified doctors from New Delhi.",
      "Evidence-based treatment schedules without diagnostic inflation.",
      "Modern vaccine storage systems preserving immunizations efficacy."
    ],
    distanceNote: "Approximately 10.5 km from Chuna Bhatti (via Kerwa Dam Road). Travel time is around 18 minutes.",
    services: ["Development Assessment", "Fever Management", "Vaccination Clinic"]
  },
  "katara-hills": {
    name: "Katara Hills",
    slug: "katara-hills",
    title: "Pediatrician near Katara Hills, Bhopal",
    intro: "Families in Katara Hills can reach Baby Steps Clinic for specialized neonatal care, milestones assessments, and childhood nutritional mapping. We offer comprehensive counseling for growth parameters.",
    whyChoose: [
      "Specialized husband-wife pediatrician team providing seamless dual reviews for complex pediatric cases.",
      "Factual growth tracking plotted on official WHO percentile charts.",
      "Comprehensive education resources covering infant choke rescue first-aid."
    ],
    distanceNote: "Approximately 18 km from Katara Hills (via Kolar Road). Travel time is around 30 minutes.",
    services: ["Growth Monitoring", "Milestone Tracking", "Parent Education"]
  },
  "bagmugaliya": {
    name: "Bagmugaliya",
    slug: "bagmugaliya",
    title: "Pediatrician near Bagmugaliya, Bhopal",
    intro: "For parents seeking child wellness checkups and childhood immunizations near Bagmugaliya, Baby Steps Clinic provides consultations led by doctors holding affiliations with major pediatric hospitals.",
    whyChoose: [
      "Consultants associated with Apollo SAGE Hospital and Rainbow Children's Hospital.",
      "Clinical protocols aligned with the Indian Academy of Pediatrics (IAP).",
      "Confidential physical transitions counseling for adolescent patients."
    ],
    distanceNote: "Approximately 16 km from Bagmugaliya (via Kolar Road / Kerwa Dam Road). Travel time is around 28 minutes.",
    services: ["Adolescent Health", "Child Nutrition", "Vaccination Clinic"]
  }
};
