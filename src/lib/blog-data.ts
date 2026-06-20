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
    excerpt: "Factual indicators of physical, language, and motor skills development in infants and when to consult a specialist.",
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
  }
};
