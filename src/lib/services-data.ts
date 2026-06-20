import {
  Syringe,
  Baby,
  HeartPulse,
  TrendingUp,
  Apple,
  ClipboardCheck,
  Heart,
  Thermometer,
  Wind,
  Activity,
  ShieldAlert,
  GraduationCap,
  Milestone
} from "lucide-react";

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface ServiceItem {
  title: string;
  slug: string;
  description: string;
  whatItIs: string;
  whyItMatters: string;
  whatToExpect: string[];
  faqs: ServiceFAQ[];
  related: { title: string; slug: string }[];
}

export const servicesData: Record<string, ServiceItem> = {
  "vaccination-clinic": {
    title: "Vaccination Clinic",
    slug: "vaccination-clinic",
    description: "IAP-aligned immunization schedules and WHO cold-chain standards to protect your child.",
    whatItIs: "A dedicated immunizations service covering routine, catch-up, and seasonal vaccines from birth through adolescence. We follow recommendations set by the Indian Academy of Pediatrics (IAP) and WHO.",
    whyItMatters: "Immunization is the most effective clinical method to build immunity against life-threatening childhood conditions including polio, tuberculosis, measles, and hepatitis. Proper cold-chain storage preserves vaccine potency.",
    whatToExpect: [
      "Factual screening of the child's current health and temperature check.",
      "Review of immunization history card to verify the current schedule.",
      "Gentle vaccine administration by credentialed pediatricians.",
      "Recording of batch numbers and expiry details on the child's physical and digital health card.",
      "Factual post-vaccination counseling regarding potential mild reactions (like low-grade fever or localized redness)."
    ],
    faqs: [
      {
        q: "What should I do if my child misses a scheduled vaccine?",
        a: "We recommend booking a catch-up consultation. Most missed vaccines can be safely administered later using modified scheduling protocols aligned with IAP guidelines."
      },
      {
        q: "How does the clinic maintain cold-chain storage?",
        a: "We use WHO-approved medical refrigeration cabinets with continuous digital temperature loggers. This keeps storage between the mandatory 2°C to 8°C limits to ensure vaccine safety."
      },
      {
        q: "Can a vaccine be given if my child has a mild cold?",
        a: "Yes. Minor illnesses such as a mild cold or low-grade fever are generally not contraindications for routine vaccines. Our pediatricians will perform a brief physical check to verify safety."
      }
    ],
    related: [
      { title: "Newborn Care", slug: "newborn-care" },
      { title: "Milestone Tracking", slug: "milestone-tracking" }
    ]
  },
  "newborn-care": {
    title: "Newborn Care",
    slug: "newborn-care",
    description: "Complete wellness monitoring, neonatal screening, and development support for infants.",
    whatItIs: "Specialized pediatric monitoring and wellness examinations during the critical first 28 days of life (the neonatal period). We track initial reflexes, growth curves, and metabolic indicators.",
    whyItMatters: "The neonatal phase involves rapid physiological adaptations. Early clinical monitoring identifies feeding problems, neonatal jaundice, and metabolic conditions early to prevent complications.",
    whatToExpect: [
      "Weight-for-age, length, and head circumference measurement and plotting.",
      "Systemic physical examination covering heart, lungs, hips, and reflexes.",
      "Evaluation for neonatal jaundice and cord healing check.",
      "Guidance on thermal protection, cord hygiene, and healthy sleep positioning."
    ],
    faqs: [
      {
        q: "How often does a newborn need to see a pediatrician?",
        a: "After birth discharge, standard checks are recommended at week 1, week 2, and week 6 (coinciding with the start of primary immunizations)."
      },
      {
        q: "What are warning signs in a newborn requiring urgent care?",
        a: "Seek clinical care immediately if the baby has a temperature above 38°C (100.4°F), shows poor feeding/lethargy, has rapid breathing, or shows yellowing of skin below the chest."
      }
    ],
    related: [
      { title: "NICU Follow-up", slug: "nicu-follow-up" },
      { title: "Breastfeeding Counseling", slug: "breastfeeding-counseling" }
    ]
  },
  "nicu-follow-up": {
    title: "NICU Follow-up",
    slug: "nicu-follow-up",
    description: "Advanced developmental tracking and critical medical care post-NICU discharge.",
    whatItIs: "Specialized clinical surveillance for premature infants, low birth weight babies, or newborns discharged from neonatal intensive care units (NICUs).",
    whyItMatters: "NICU graduates have higher risks for developmental delays, feeding difficulties, and respiratory complications. Regular clinical follow-ups facilitate early physical and cognitive support.",
    whatToExpect: [
      "Detailed review of the NICU discharge summary and ongoing medications.",
      "Factual assessment of growth using corrected gestational age charts.",
      "Detailed neurological and developmental milestone screening.",
      "Support for transition to oral feeds and coordinate follow-up with pediatric subspecialists if required."
    ],
    faqs: [
      {
        q: "What is corrected gestational age?",
        a: "For premature infants, we adjust milestones based on their original due date rather than chronological birth date to accurately measure developmental progress."
      },
      {
        q: "How long do NICU follow-ups continue?",
        a: "Follow-ups typically continue until the child reaches 2 years of age, or until developmental and physical curves catch up to standard age parameters."
      }
    ],
    related: [
      { title: "Newborn Care", slug: "newborn-care" },
      { title: "Growth Monitoring", slug: "growth-monitoring" }
    ]
  },
  "growth-monitoring": {
    title: "Growth Monitoring",
    slug: "growth-monitoring",
    description: "Plotting height, weight, and head circumference against WHO reference percentiles.",
    whatItIs: "Routine physical growth screening at scheduled intervals to plot weight-for-age, height-for-age, and head circumference against World Health Organization (WHO) growth charts.",
    whyItMatters: "Consistent plotting detects growth faltering, childhood obesity, and metabolic conditions early. Deviations from percentile curves are key clinical indicators of health shifts.",
    whatToExpect: [
      "High-precision digital scale weight checks.",
      "Infant board length or stadiometer height measurements.",
      "Head circumference checks with flexible tape measurements.",
      "Plotting results on official WHO charts and discussing percentile progression with parents."
    ],
    faqs: [
      {
        q: "What does it mean if my child is in the 15th percentile?",
        a: "It means your child weighs or is taller than 15% of healthy children of the same age and gender. Growth consistency along their personal curve is more clinically significant than the specific percentile number."
      },
      {
        q: "How frequently should growth be measured?",
        a: "Growth is monitored at every immunization visit (typically monthly in infancy) and at least every 6 months during toddler and school-aged years."
      }
    ],
    related: [
      { title: "Child Nutrition", slug: "child-nutrition" },
      { title: "Milestone Tracking", slug: "milestone-tracking" }
    ]
  },
  "child-nutrition": {
    title: "Child Nutrition",
    slug: "child-nutrition",
    description: "Guidance on complementary feeding, balanced diet planning, and managing deficiencies.",
    whatItIs: "Factual dietary counseling covering complementary feeding starts at 6 months, weaning practices, picky eating management, and correction of micronutrient deficiencies.",
    whyItMatters: "Adequate macro- and micronutrient intake is required for brain development, bone density, and immune function. Balanced nutrition counseling prevents stunting and wasting.",
    whatToExpect: [
      "Assessment of current dietary intake and milk feeding volumes.",
      "Clinical evaluation for signs of iron, calcium, or vitamin deficiencies.",
      "Custom, age-appropriate dietary guides detailing portion sizes and food groups.",
      "Factual counseling for weaning transitions and food introduction protocols."
    ],
    faqs: [
      {
        q: "When should solid foods be introduced to an infant?",
        a: "In line with WHO guidelines, solid and semi-solid foods (complementary feeding) should be introduced at exactly 6 completed months of age, alongside continued breastfeeding."
      },
      {
        q: "How do I handle picky eating habits in toddlers?",
        a: "We offer factual behavioral guidelines, advising structured family mealtimes, avoidance of force-feeding, and gradual introduction of new foods without sugar/salt additives."
      }
    ],
    related: [
      { title: "Growth Monitoring", slug: "growth-monitoring" },
      { title: "Parent Education", slug: "parent-education" }
    ]
  },
  "development-assessment": {
    title: "Development Assessment",
    slug: "development-assessment",
    description: "Screening of motor, cognitive, and social developmental skills.",
    whatItIs: "Clinical screening of developmental milestones across gross motor, fine motor, speech/language, and personal-social domains.",
    whyItMatters: "Early identification of motor delays, language delays, or developmental delays allows for early intervention when brain plasticity is highest.",
    whatToExpect: [
      "Standard developmental checklist screening based on age.",
      "Observational analysis of child's play, response to stimuli, and movement.",
      "Discussion of parental observations regarding home behavior.",
      "Referral to specialized pediatric physical or speech therapists if developmental milestones are delayed."
    ],
    faqs: [
      {
        q: "What should I do if my child isn't talking by 15 months?",
        a: "A developmental assessment is recommended. Speech delay can be evaluated clinically to determine if early speech therapy or hearing checks are indicated."
      },
      {
        q: "Are developmental screens diagnostic tests?",
        a: "No, they are screening tools designed to identify children who may benefit from closer clinical monitoring or specialized therapy support."
      }
    ],
    related: [
      { title: "Milestone Tracking", slug: "milestone-tracking" },
      { title: "NICU Follow-up", slug: "nicu-follow-up" }
    ]
  },
  "breastfeeding-counseling": {
    title: "Breastfeeding Counseling",
    slug: "breastfeeding-counseling",
    description: "Lactation techniques, latch correction, and supportive care for mothers.",
    whatItIs: "Clinical support for breastfeeding mothers covering latch techniques, positions, maternal nutrition, and managing lactation challenges.",
    whyItMatters: "Exclusive breastfeeding is recommended for the first 6 months. Lactation support resolves maternal discomfort (like sore nipples or breast engorgement) and ensures the infant receives adequate nutrition.",
    whatToExpect: [
      "Direct evaluation of the baby's latch and maternal breastfeeding positioning.",
      "Assessment of infant swallowing coordination during a feed.",
      "Factual guidelines for managing breast engorgement or low supply.",
      "Instruction on safe expression and storage of breast milk for working mothers."
    ],
    faqs: [
      {
        q: "How do I know if my baby is getting enough breast milk?",
        a: "Factual indicators include the baby passing urine at least 6-8 times in 24 hours, appearing satisfied after feeds, and showing steady weight-for-age chart gains."
      },
      {
        q: "What should I do for painful latching?",
        a: "Pain during latching usually indicates sub-optimal positioning. We recommend a lactation checkup to correct the positioning and prevent nipple soreness."
      }
    ],
    related: [
      { title: "Newborn Care", slug: "newborn-care" },
      { title: "Child Nutrition", slug: "child-nutrition" }
    ]
  },
  "fever-management": {
    title: "Fever Management",
    slug: "fever-management",
    description: "Diagnosis and evidence-based protocols for pediatric fever care.",
    whatItIs: "Clinical evaluation, monitoring, and fever management guidelines for pediatric patients presenting with elevated temperatures.",
    whyItMatters: "Fever is an immune response, not a disease. Clinical evaluation identifies underlying viral or bacterial infections, ensuring safe management and avoiding self-medication risks.",
    whatToExpect: [
      "Measurement of temperature and clinical vitals monitoring.",
      "Examination of throat, ears, chest, and skin for infection foci.",
      "Factual dosage guidelines for pediatric antipyretics based on weight (not age).",
      "Counseling on warning signs and home hydration care protocols."
    ],
    faqs: [
      {
        q: "When is a temperature considered a fever in children?",
        a: "A rectal or tympanic temperature of 38°C (100.4°F) or above, or an axillary (armpit) reading of 37.5°C (99.5°F) or above, is considered a fever."
      },
      {
        q: "Should I immediately give fever medicine for a mild temperature?",
        a: "Not necessarily. If the child is active and comfortable, medicine may not be needed for low-grade temperatures. We recommend consulting on proper weight-based dosages if the child is uncomfortable."
      }
    ],
    related: [
      { title: "Allergy & Asthma Care", slug: "allergy-asthma-care" },
      { title: "Emergency Child Care", slug: "emergency-child-care" }
    ]
  },
  "allergy-asthma-care": {
    title: "Allergy & Asthma Care",
    slug: "allergy-asthma-care",
    description: "Pediatric asthma monitoring, inhaler guidance, and allergy screening.",
    whatItIs: "Long-term monitoring and treatment guidelines for pediatric asthma, recurrent wheezing, allergic rhinitis, and skin allergies.",
    whyItMatters: "Uncontrolled asthma affects school attendance and lung development. Proper inhaler techniques and allergen management reduce acute exacerbations.",
    whatToExpect: [
      "Detailed clinical history of wheezing episodes and allergic triggers.",
      "Chest auscultation and assessment of respiratory function.",
      "Step-by-step training on spacer and inhaler device use.",
      "Creation of a personalized Asthma Action Plan for school and home."
    ],
    faqs: [
      {
        q: "Are inhalers safe for young children?",
        a: "Yes. Inhaled medications deliver small, targeted doses directly to the lungs, making them safer and more effective than oral syrups for managing recurrent wheezing."
      },
      {
        q: "How can we identify my child's allergy triggers?",
        a: "We review clinical history to identify environmental triggers (dust, pollen, pet dander, or foods) and advise on allergen avoidance strategies."
      }
    ],
    related: [
      { title: "Fever Management", slug: "fever-management" },
      { title: "Emergency Child Care", slug: "emergency-child-care" }
    ]
  },
  "adolescent-health": {
    title: "Adolescent Health",
    slug: "adolescent-health",
    description: "Support for growth changes, pubertal development, and emotional wellness.",
    whatItIs: "Clinical counseling and health checkups for adolescents (ages 10-18) covering growth spurts, pubertal changes, and lifestyle health.",
    whyItMatters: "Adolescence involves rapid physical and emotional transitions. Safe clinical guidance helps monitor thyroid changes, nutritional requirements, and emotional wellbeing.",
    whatToExpect: [
      "Evaluation of pubertal growth and development scales.",
      "Screening for adolescent nutritional deficiencies (such as anemia).",
      "Counseling on posture, physical activity, and sleep hygiene.",
      "Private, confidential space for adolescent patients to discuss physical transitions."
    ],
    faqs: [
      {
        q: "What vaccines are recommended for adolescents?",
        a: "Key vaccines include the Tdap booster (Tetanus, Diphtheria, Pertussis), HPV (Human Papillomavirus) vaccine, and Meningococcal vaccines, in line with IAP guidelines."
      },
      {
        q: "Why is nutrition counseling important during puberty?",
        a: "Rapid bone and muscle development during puberty increases requirements for calcium, iron, and protein. We advise on balanced dietary changes to support growth."
      }
    ],
    related: [
      { title: "Child Nutrition", slug: "child-nutrition" },
      { title: "Parent Education", slug: "parent-education" }
    ]
  },
  "emergency-child-care": {
    title: "Emergency Child Care",
    slug: "emergency-child-care",
    description: "Triage guidance and immediate clinic-hour support for acute illnesses.",
    whatItIs: "Immediate clinical assessment, stabilization, and triage guidelines for acutely ill children presenting during clinic hours.",
    whyItMatters: "Accidents, severe breathing difficulty, or dehydration require rapid clinical response. Prompt triage helps stabilize children before safe referral to tertiary emergency rooms.",
    whatToExpect: [
      "Immediate vital signs monitoring (heart rate, oxygen saturation, temperature).",
      "Airway, breathing, and circulation assessment.",
      "First-aid stabilization, hydration, or oxygen administration if indicated.",
      "Coordinated referral to pediatric intensive care units at associated hospitals."
    ],
    faqs: [
      {
        q: "What should I do if my child has a febrile seizure at home?",
        a: "Keep the child on their side, away from sharp objects. Do not place anything in their mouth. Most febrile seizures resolve in under 5 minutes. Seek emergency clinical care immediately."
      },
      {
        q: "Does the clinic operate a 24/7 emergency room?",
        a: "No. We offer emergency triage during outpatient hours. For late-night life-threatening emergencies, proceed directly to the pediatric ER at associated hospitals (Rainbow Children's Hospital or Apollo SAGE Hospital)."
      }
    ],
    related: [
      { title: "Fever Management", slug: "fever-management" },
      { title: "Allergy & Asthma Care", slug: "allergy-asthma-care" }
    ]
  },
  "parent-education": {
    title: "Parent Education",
    slug: "parent-education",
    description: "Workshops and sessions on baby safety, nutrition, and screen time.",
    whatItIs: "Factual guidance programs and counseling covering home baby-proofing, choke prevention, screen-time guidelines, and positive parenting practices.",
    whyItMatters: "Empowered parents make safer homes. Factual pediatric counseling helps prevent accidental injuries and supports healthy cognitive development in early childhood.",
    whatToExpect: [
      "Factual checklists for home safety and baby-proofing.",
      "Instruction on basic child first-aid (choking rescue).",
      "WHO screen-time guidelines and sleep-hygiene recommendations.",
      "Q&A session discussing behavioral parenting strategies."
    ],
    faqs: [
      {
        q: "What are the WHO screen time recommendations for toddlers?",
        a: "WHO recommends zero screen time for children under 2 years of age, and a maximum of 1 hour of high-quality programming per day for children aged 2-5 years."
      },
      {
        q: "How can we prevent choking incidents at home?",
        a: "We advise keeping small items (like coins, buttons, small toys, or whole nuts) out of reach, cutting toddler food into small pieces, and learning the pediatric Heimlich maneuver."
      }
    ],
    related: [
      { title: "Newborn Care", slug: "newborn-care" },
      { title: "Child Nutrition", slug: "child-nutrition" }
    ]
  },
  "milestone-tracking": {
    title: "Milestone Tracking",
    slug: "milestone-tracking",
    description: "Guidance on age-based motor, language, and social development.",
    whatItIs: "Structured tracking of gross motor, fine motor, speech, and social skills at key checkup intervals (2, 4, 6, 9, 12, 18, and 24 months).",
    whyItMatters: "Milestone parameters are clinically validated ranges for child development. Documenting them ensures early developmental delays are addressed promptly.",
    whatToExpect: [
      "Evaluating age-specific tasks (such as rolling, picking objects, responding to sounds).",
      "Recording milestone achievements in the child's developmental file.",
      "Factual advice on home exercises to encourage motor and cognitive skills.",
      "Clinical screening for motor or speech delays."
    ],
    faqs: [
      {
        q: "What is the typical age range for a child to start walking?",
        a: "Most children take their first independent steps between 9 to 15 months of age. If your child is not walking independently by 18 months, a clinical developmental assessment is advised."
      },
      {
        q: "How can we encourage speech development at home?",
        a: "Factual recommendations include talking and reading to your baby daily, responding to their vocalizations, and minimizing exposure to background screen noise."
      }
    ],
    related: [
      { title: "Development Assessment", slug: "development-assessment" },
      { title: "Growth Monitoring", slug: "growth-monitoring" }
    ]
  }
};

export const serviceIconMap: Record<string, any> = {
  "vaccination-clinic": Syringe,
  "newborn-care": Baby,
  "nicu-follow-up": HeartPulse,
  "growth-monitoring": TrendingUp,
  "child-nutrition": Apple,
  "development-assessment": ClipboardCheck,
  "breastfeeding-counseling": Heart,
  "fever-management": Thermometer,
  "allergy-asthma-care": Wind,
  "adolescent-health": Activity,
  "emergency-child-care": ShieldAlert,
  "parent-education": GraduationCap,
  "milestone-tracking": Milestone,
};

