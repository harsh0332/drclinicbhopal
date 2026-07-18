export interface BlogFAQ {
  q: string;
  a: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  author: string;
  authorTitle: string;
  authorAffiliation: string;
  contentHtml: string;
  faqs: BlogFAQ[];
}

export const blogData: Record<string, BlogPost> = {
  "baby-vaccination-guide": {
    title: "Essential Immunization Guide: Protecting Your Newborn",
    slug: "baby-vaccination-guide",
    date: "June 15, 2026",
    readTime: "5 min read",
    category: "Vaccination",
    excerpt: "An educational overview of the primary vaccination schedule recommended by the IAP during the first six months.",
    author: "Dr. Sudarshan Dev Arya",
    authorTitle: "MBBS, DCH, DNB (New Delhi), PGPN (Boston, USA)",
    authorAffiliation: "Consultant Pediatrician, Rainbow Children's Hospital, Bhopal",
    contentHtml: `
      <h2>The Importance of Vaccination Timelines</h2>
      <p>Immunization is one of the most effective methods to protect infants from severe and life-threatening childhood infections. Administering vaccines at recommended intervals ensures that children build active immunity before they are exposed to wild viruses or bacterial pathogens.</p>
      
      <h2>IAP-Aligned Primary Schedule</h2>
      <p>The Indian Academy of Pediatrics (IAP) recommends a structured schedule starting from birth. Primary vaccines include BCG for tuberculosis, oral polio vaccine (OPV), and Hepatitis B. By six weeks, infants begin combination vaccines covering Diphtheria, Pertussis, Tetanus, Haemophilus Influenzae Type B, and Pneumococcal Disease.</p>
      
      <h2>Understanding Vaccine Cold-Chain Safety</h2>
      <p>Vaccines are highly sensitive biological substances. To maintain their immunizing potency, they must be stored continuously between 2°C and 8°C. Cold-chain failure degrades vaccine efficacy, making strict digital temperature monitoring essential for clinical safety.</p>

      <h2>What to Watch for Post-Vaccination</h2>
      <p>It is common for infants to experience mild physiological responses after injection. These typically include low-grade fever, irritability, or minor swelling at the injection site. These symptoms usually resolve in 24 to 48 hours and can be managed under pediatric advice.</p>
    `,
    faqs: [
      {
        q: "What should I do if my child has a fever after a vaccine?",
        a: "A mild fever is a normal immune response. You should monitor their hydration and consult our pediatricians for weight-appropriate paracetamol dosage guidance if they appear uncomfortable."
      },
      {
        q: "Is it safe to give multiple vaccines at the same visit?",
        a: "Yes. Clinical studies confirm that administering multiple vaccines during a single visit is safe and highly effective, allowing the child to build immunity quickly and reducing the number of clinic transits."
      }
    ]
  },
  "breastfeeding-tips-new-mothers": {
    title: "Breastfeeding Techniques: Clinical Tips for New Mothers",
    slug: "breastfeeding-tips-new-mothers",
    date: "June 08, 2026",
    readTime: "6 min read",
    category: "Nutrition",
    excerpt: "Understanding proper latch, positioning, feed frequency, and growth monitoring criteria for breastfed infants.",
    author: "Dr. Manisha Bangarwa Arya",
    authorTitle: "MBBS, DNB (New Delhi), PGPN (Boston, USA), Fellowship in Neonatology",
    authorAffiliation: "Consultant Neonatologist & Pediatrician, Apollo SAGE Hospital, Bhopal",
    contentHtml: `
      <h2>Why Exclusive Breastfeeding is Recommended</h2>
      <p>The World Health Organization (WHO) recommends exclusive breastfeeding for the first six months of life. Breast milk provides optimal nutrients, vitamins, and protective maternal antibodies that support the newborn's developing immune system.</p>
      
      <h2>Establishing a Proper Breastfeeding Latch</h2>
      <p>A comfortable, pain-free latch is key to successful breastfeeding. A proper latch requires the baby to take in a large portion of the lower areola, not just the nipple. This ensures efficient milk transfer and prevents nipple soreness or engorgement.</p>
      
      <h2>Feeding Frequencies and Sleep Cycles</h2>
      <p>Newborns generally feed on demand, which translates to 8 to 12 feedings in a 24-hour cycle. Frequent feeds support maternal milk supply and prevent physiological infant dehydration in warm climates like Bhopal.</p>

      <h2>Signs of Sufficient Feed Volume</h2>
      <p>Parents can track feed adequacy through objective parameters: the infant should pass clear urine at least 6-8 times in 24 hours, appear relaxed and sleep between feeds, and display steady progression along their weight-for-age percentile charts.</p>
    `,
    faqs: [
      {
        q: "Is nipple pain normal during breastfeeding?",
        a: "While mild sensitivity is common in the first few days, sharp or persistent pain is generally an indicator of an incorrect latch. We recommend scheduling a lactation checkup to correct the baby's position."
      },
      {
        q: "How long can expressed breast milk be stored safely?",
        a: "At room temperature, expressed milk is stable for up to 4 hours. In a household refrigerator (at 4°C), it can be stored safely for up to 24-48 hours. Always use sterile glass or BPA-free storage containers."
      }
    ]
  },
  "six-month-development-milestones": {
    title: "Recognizing Normal Physiological Milestones at 6 Months",
    slug: "six-month-development-milestones",
    date: "May 28, 2026",
    readTime: "4 min read",
    category: "Milestones",
    excerpt: "Milestone indicators of physical, language, and motor skills development in infants and when to consult a specialist.",
    author: "Dr. Sudarshan Dev Arya",
    authorTitle: "MBBS, DCH, DNB (New Delhi), PGPN (Boston, USA)",
    authorAffiliation: "Consultant Pediatrician, Rainbow Children's Hospital, Bhopal",
    contentHtml: `
      <h2>Tracking Motor Skills Milestones</h2>
      <p>By six months of age, infants exhibit significant physical changes. Key milestones include rolling over in both directions (front-to-back and back-to-front) and sitting up with support from their hands or surrounding cushions.</p>
      
      <h2>Speech and Cognitive Progress</h2>
      <p>Cognitively, 6-month-olds begin to respond to vocalizations and sound directions. They vocalize pleasure or displeasure, begin basic babbling with double consonant sounds (like 'ba-ba' or 'da-da'), and respond when their name is called.</p>
      
      <h2>Introduction of Complementary Solids</h2>
      <p>Reaching six completed months marks the physiological readiness for complementary solid foods. Nutritional needs can no longer be met by milk alone. We recommend starting with smooth, single-ingredient purees (like mashed banana or rice water) while continuing breastfeeding.</p>

      <h2>When to Consult a Pediatrician</h2>
      <p>While motor skills curves vary, consult our pediatricians if by 6 months your baby does not roll over, shows no response to sounds, does not reach for objects, or does not make vowel sounds ('ah', 'eh', 'oh').</p>
    `,
    faqs: [
      {
        q: "What if my baby isn't sitting independently at 6 months?",
        a: "Sitting independently without hand support typically develops between 6 to 8 months. Sitting *with* support is the expected milestone for 6 months. We monitor motor coordination at checkups."
      },
      {
        q: "Can I introduce cow's milk at 6 months?",
        a: "No. Whole cow's milk is not recommended as a primary drink until 1 year of age, as it does not contain appropriate iron levels and is difficult for an infant's kidneys to process."
      }
    ]
  },
  "child-vaccination-guide-india": {
    title: "Complete Baby Vaccination Guide for Indian Parents",
    slug: "child-vaccination-guide-india",
    date: "July 18, 2026",
    readTime: "7 min read",
    category: "Vaccination",
    excerpt: "A comprehensive guide explaining the importance of childhood immunization in India, cold-chain standards, and how to plan vaccine schedules.",
    author: "Dr. Sudarshan Dev Arya",
    authorTitle: "MBBS, DCH, DNB (New Delhi), PGPN (Boston, USA)",
    authorAffiliation: "Consultant Pediatrician, Rainbow Children's Hospital, Bhopal",
    contentHtml: `
      <h2>Understanding Immunization in India</h2>
      <p>Childhood immunization is the cornerstone of preventative healthcare, shielding your baby from multiple severe infections. In India, both the government's Universal Immunization Programme (UIP) and the Indian Academy of Pediatrics (IAP) provide guidelines to secure optimal protection. At Baby Steps Clinic, we align our procedures with WHO and IAP cold-chain safety benchmarks to preserve vaccine potency.</p>
      <h2>Essential Vaccines and Their Roles</h2>
      <p>The primary schedule begins at birth with BCG, Oral Polio Vaccine (OPV), and Hepatitis B. As the infant grows, combination vaccines like DTaP/wP (Hexavalent) protect against diphtheria, tetanus, pertussis, Hib, polio, and Hepatitis B in single visits. Rotavirus and Pneumococcal Conjugate Vaccines (PCV) shield against severe diarrhea and invasive pneumonia.</p>
      <h2>The Critical Role of Cold Chain Compliance</h2>
      <p>Vaccines are highly sensitive biological products. To maintain their potency, they must be stored continuously between 2°C and 8°C. Cold-chain failure degrades vaccine efficacy, which is why Baby Steps Clinic uses specialized medical-grade refrigeration units with digital continuous temperature logs.</p>
    `,
    faqs: [
      {
        q: "Why is cold-chain storage so important for vaccines?",
        a: "Cold-chain storage keeps vaccines at strict WHO-compliant temperatures (2°C to 8°C). Any exposure to heat or freezing degrades the active ingredients, reducing their ability to build strong immunity in children."
      },
      {
        q: "What is catch-up vaccination?",
        a: "If your child misses a scheduled vaccine date, catch-up vaccination allows them to receive the missed doses later under a modified timeline, ensuring they still build necessary protective antibodies."
      }
    ]
  },
  "iap-vaccination-schedule-chart": {
    title: "Latest IAP Vaccination Schedule & Immunization Chart",
    slug: "iap-vaccination-schedule-chart",
    date: "July 17, 2026",
    readTime: "6 min read",
    category: "Vaccination",
    excerpt: "Detailed breakdown of the Indian Academy of Pediatrics (IAP) recommended schedule from birth up to 18 years.",
    author: "Dr. Sudarshan Dev Arya",
    authorTitle: "MBBS, DCH, DNB (New Delhi), PGPN (Boston, USA)",
    authorAffiliation: "Consultant Pediatrician, Rainbow Children's Hospital, Bhopal",
    contentHtml: `
      <h2>IAP Immunization Schedule Milestones</h2>
      <p>The Indian Academy of Pediatrics (IAP) outlines key milestones for vaccinations. At birth: BCG, OPV, HepB. At 6, 10, and 14 weeks: Hexavalent combinations (DTaP/wP, IPV, Hib, HepB) along with Rotavirus and PCV. At 6 months: Influenza and Typhoid. At 9 months: MMR-1. Boosters follow at 15 to 18 months, 2 years, 5 years, and 10 years to maintain long-term immunity.</p>
      <h2>Mandatory vs. Recommended Vaccines</h2>
      <p>While National schedules provide core protection, IAP recommends additional vaccines such as Pneumococcal, Influenza, Chickenpox, Hepatitis A, and Meningococcal vaccines to provide comprehensive protection against localized childhood illness vectors.</p>
      <h2>Planning Your Child's Immunization Visits</h2>
      <p>Having a structured chart helps parents stay organized and avoid missing critical milestones. Our pediatricians supply a detailed physical vaccination booklet at your first visit, and we coordinate digital appointment reminders to ensure your child stays protected on schedule.</p>
    `,
    faqs: [
      {
        q: "What is the difference between UIP and IAP schedules?",
        a: "The UIP (Universal Immunization Programme) is the government schedule covering key primary vaccines. The IAP (Indian Academy of Pediatrics) schedule includes additional vaccines for comprehensive protection, such as Pneumococcal Conjugate, Influenza, and Chickenpox vaccines."
      },
      {
        q: "Are booster doses necessary?",
        a: "Yes. Booster doses 'boost' your child's immune system as initial protection wears off over time, ensuring long-term defense against infectious diseases."
      }
    ]
  },
  "missed-vaccine-what-to-do": {
    title: "Missed Child Vaccine? Catch-Up Schedules & What to Do Next",
    slug: "missed-vaccine-what-to-do",
    date: "July 16, 2026",
    readTime: "5 min read",
    category: "Vaccination",
    excerpt: "Helpful pediatric guidance on catch-up vaccinations, grace periods, and scheduling missed doses safely.",
    author: "Dr. Manisha Bangarwa Arya",
    authorTitle: "MBBS, DNB (New Delhi), PGPN (Boston, USA), Fellowship in Neonatology",
    authorAffiliation: "Consultant Neonatologist & Pediatrician, Apollo SAGE Hospital, Bhopal",
    contentHtml: `
      <h2>What to Do if You Miss a Scheduled Vaccine</h2>
      <p>Missing a vaccination date can cause anxiety, but catch-up schedules are highly effective. Most childhood vaccines have flexible grace periods. The first step is to avoid panic and consult your pediatrician to map out a safe catch-up vaccination calendar based on your child's age.</p>
      <h2>Catch-Up Immunization Rules</h2>
      <p>Depending on the vaccine, catch-up schedules adjust the interval between subsequent doses. For example, the primary DTaP series or MMR vaccine can be safely administered later if the original window was missed. Delaying vaccines prolongs the time a child is vulnerable to infection, so scheduling catch-up visits promptly is recommended.</p>
      <h2>Safety of Delayed Doses</h2>
      <p>Clinical studies show that delayed vaccines do not cause increased side effects. However, they should be given in a coordinated sequence to allow the baby's immune system to build antibodies efficiently. Our doctors customize catch-up timelines to minimize clinic visits while ensuring complete safety.</p>
    `,
    faqs: [
      {
        q: "Is there a limit on how late a vaccine can be given?",
        a: "Yes, some vaccines like Rotavirus have strict upper age limits (typically 8 months) because the risk profile shifts. Other vaccines like MMR or DTaP can be caught up at any age."
      },
      {
        q: "Do we need to restart the vaccine series from the beginning if we miss a dose?",
        a: "No. You do not need to restart the series. We simply continue from where we left off, maintaining the minimum recommended intervals between the remaining doses."
      }
    ]
  },
  "vaccine-side-effects-fever-management": {
    title: "Managing Vaccine Side Effects & Post-Shot Fever in Babies",
    slug: "vaccine-side-effects-fever-management",
    date: "July 15, 2026",
    readTime: "5 min read",
    category: "Vaccination",
    excerpt: "Pediatric advice on handling post-vaccination fever, redness at the injection site, and home care tips.",
    author: "Dr. Manisha Bangarwa Arya",
    authorTitle: "MBBS, DNB (New Delhi), PGPN (Boston, USA), Fellowship in Neonatology",
    authorAffiliation: "Consultant Neonatologist & Pediatrician, Apollo SAGE Hospital, Bhopal",
    contentHtml: `
      <h2>Normal Post-Vaccination Physical Responses</h2>
      <p>Mild side effects like low-grade fever, localized swelling, redness, and irritability are normal physiological signs that the body is building immunity. These symptoms usually resolve naturally within 24 to 48 hours.</p>
      <h2>Safe Fever Management at Home</h2>
      <p>To comfort your baby, offer frequent breastfeeds or water to prevent dehydration. Apply a cool, damp cloth to the injection site to ease soreness (do not apply ice directly). For fever, consult our pediatricians for weight-appropriate paracetamol dosage guidance. Never give aspirin or self-prescribe medication.</p>
      <h2>When to Contact Your Pediatrician</h2>
      <p>While mild reactions are normal, contact the clinic if your baby experiences a fever above 102°F, shows extreme lethargy, cries inconsolably for more than three hours, or displays swelling that spreads beyond the injection area.</p>
    `,
    faqs: [
      {
        q: "How long does a post-vaccination fever typically last?",
        a: "A post-vaccination fever usually begins within 12 to 24 hours of the injection and resolves naturally within 1 to 2 days as the immune system settles."
      },
      {
        q: "Can I apply any ointment to the injection site?",
        a: "No. Do not apply any ointments, oils, or home remedies to the injection site. Keep the area clean and dry, and use a cool damp compress if the area is swollen."
      }
    ]
  },
  "painless-vaccination-for-babies": {
    title: "Painless vs. Painful Vaccines: A Pediatrician's Guide for Parents",
    slug: "painless-vaccination-for-babies",
    date: "July 14, 2026",
    readTime: "6 min read",
    category: "Vaccination",
    excerpt: "Understanding the differences between painless (acellular DTaP) and painful (whole-cell DwPT) combination vaccines.",
    author: "Dr. Sudarshan Dev Arya",
    authorTitle: "MBBS, DCH, DNB (New Delhi), PGPN (Boston, USA)",
    authorAffiliation: "Consultant Pediatrician, Rainbow Children's Hospital, Bhopal",
    contentHtml: `
      <h2>Painless (Acellular) vs. Painful (Whole-cell) Vaccines</h2>
      <p>The difference lies in the pertussis (whooping cough) component. Painful vaccines (wP) use whole killed bacteria, which often cause high fever, pain, and swelling. Painless vaccines (aP) use purified components, resulting in significantly fewer side effects while maintaining strong protective efficacy.</p>
      <h2>Pediatric Recommendations for Parents</h2>
      <p>Both vaccine types are approved and highly effective. IAP recommends whole-cell vaccines as primary choices due to long-term community immunity profiles, but painless acellular vaccines are preferred for children prone to high febrile reactions or when parents prefer to minimize post-shot discomfort.</p>
      <h2>Efficacy and Protection Comparison</h2>
      <p>Numerous clinical reviews confirm that both options offer excellent protection during infancy. The painless option simply reduces post-injection symptoms like swelling and high temperature, allowing the baby to sleep and feed comfortably after their visit.</p>
    `,
    faqs: [
      {
        q: "Is the painless vaccine less effective than the painful one?",
        a: "No, both vaccines are highly effective in building immunity against whooping cough. The acellular (painless) version simply contains fewer bacterial proteins, which significantly reduces side effects."
      },
      {
        q: "Which one should we choose for our baby?",
        a: "If your child has a history of high fever or seizures after vaccination, a painless vaccine is highly recommended. Our pediatricians will review your baby's history to help you decide."
      }
    ]
  }
};
