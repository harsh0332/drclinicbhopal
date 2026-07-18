export interface BlogFAQ {
  q: string;
  a: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  dateModified?: string;
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
    dateModified: "July 18, 2026",
    readTime: "5 min read",
    category: "Vaccination",
    excerpt: "An educational overview of the primary vaccination schedule recommended by the IAP during the first six months.",
    author: "Dr. Sudarshan Dev Arya",
    authorTitle: "MBBS, DCH, DNB (New Delhi), PGPN (Boston, USA)",
    authorAffiliation: "Consultant Pediatrician, Rainbow Children's Hospital, Bhopal",
    contentHtml: `
      <h2>Why Are Vaccination Timelines Critical for Newborns?</h2>
      <p>Vaccination timelines ensure that infants build active immunity against life-threatening infections before exposure to wild viral or bacterial pathogens. Guidelines established by the <a href="https://iapindia.org" target="_blank" rel="noopener noreferrer" class="text-primary underline">Indian Academy of Pediatrics (IAP)</a> and the <a href="https://www.who.int" target="_blank" rel="noopener noreferrer" class="text-primary underline">World Health Organization (WHO)</a> dictate specific age intervals for optimal antibody production.</p>
      
      <h2>What Is the Recommended Primary Immunization Schedule?</h2>
      <p>The primary schedule begins at birth with BCG, oral polio vaccine (OPV), and Hepatitis B. By six weeks, infants transition to combination vaccines protecting against Diphtheria, Pertussis, Tetanus, Haemophilus Influenzae Type B, and Pneumococcal Disease under the <a href="https://main.mohfw.gov.in" target="_blank" rel="noopener noreferrer" class="text-primary underline">Universal Immunisation Programme (UIP, MoHFW)</a> framework.</p>
      
      <h2>How Does Vaccine Cold-Chain Storage Protect Efficacy?</h2>
      <p>Vaccine cold-chain storage maintains biological potency by keeping vaccines strictly between 2°C and 8°C. Continuous digital temperature monitoring prevents cold-chain failure, safeguarding vaccine quality and safety for every child.</p>

      <h2>What Are Common Post-Vaccination Reactions and Care Steps?</h2>
      <p>Common post-vaccination reactions include low-grade fever, irritability, and minor swelling at the injection site that resolve in 24 to 48 hours. Parents should maintain hydration and consult pediatricians for weight-appropriate care.</p>

      <p class="p-3 bg-surface-tint border border-primary/20 rounded-xl font-mono text-xs text-primary-dark">[NEEDS DOCTOR REVIEW: draft additional 2 paragraphs on optional vaccines such as Influenza and Varicella]</p>
    `,
    faqs: [
      {
        q: "What should I do if my child has a fever after a vaccine?",
        a: "A mild fever is a normal immune response after vaccination. You should monitor your child's hydration and consult our pediatricians for weight-appropriate paracetamol dosage guidance if they appear uncomfortable."
      },
      {
        q: "Is it safe to give multiple vaccines at the same visit?",
        a: "Yes, administering multiple vaccines during a single visit is clinically safe and effective. It ensures rapid immune protection while reducing the overall number of clinic trips for your baby."
      }
    ]
  },
  "breastfeeding-tips-new-mothers": {
    title: "Breastfeeding Techniques: Clinical Tips for New Mothers",
    slug: "breastfeeding-tips-new-mothers",
    date: "June 08, 2026",
    dateModified: "July 18, 2026",
    readTime: "6 min read",
    category: "Nutrition",
    excerpt: "Understanding proper latch, positioning, feed frequency, and growth monitoring criteria for breastfed infants.",
    author: "Dr. Manisha Bangarwa Arya",
    authorTitle: "MBBS, DNB (New Delhi), PGPN (Boston, USA), Fellowship in Neonatology",
    authorAffiliation: "Consultant Neonatologist & Pediatrician, Apollo SAGE Hospital, Bhopal",
    contentHtml: `
      <h2>Why Is Exclusive Breastfeeding Recommended for 6 Months?</h2>
      <p>Exclusive breastfeeding for six months supplies optimal nutrients, vitamins, and protective maternal antibodies for infant development. The <a href="https://www.who.int" target="_blank" rel="noopener noreferrer" class="text-primary underline">World Health Organization (WHO)</a> confirms that human milk reduces gastrointestinal and respiratory infection risks.</p>
      
      <h2>How Do You Establish a Proper Breastfeeding Latch?</h2>
      <p>A proper latch requires the baby to take in a large portion of the lower areola, ensuring pain-free milk transfer and preventing nipple trauma. Correct infant positioning supports comfortable feeding cycles for new mothers.</p>
      
      <h2>What Is the Expected Feeding Frequency for Newborns?</h2>
      <p>Newborns generally feed on demand, translating to 8 to 12 feeding sessions in a 24-hour cycle. Frequent feeds support maternal milk production and prevent newborn dehydration in warm climates like Bhopal.</p>

      <h2>How Can Parents Track Sufficient Feed Volume?</h2>
      <p>Infants passing clear urine 6 to 8 times daily and showing steady progression on growth charts indicate adequate feed intake. Relaxed sleep between feeds confirms satisfaction.</p>

      <p class="p-3 bg-surface-tint border border-primary/20 rounded-xl font-mono text-xs text-primary-dark">[NEEDS DOCTOR REVIEW: expand section on clinical management of infant reflux and burping techniques]</p>
    `,
    faqs: [
      {
        q: "Is nipple pain normal during breastfeeding?",
        a: "Nipple pain beyond initial mild sensitivity indicates an improper latch technique. We recommend scheduling a clinical lactation assessment to correct positioning and prevent nipple sore trauma."
      },
      {
        q: "How long can expressed breast milk be stored safely?",
        a: "Expressed breast milk remains stable at room temperature for up to 4 hours, and in a household refrigerator at 4°C for 24 to 48 hours in sterile BPA-free containers."
      }
    ]
  },
  "six-month-development-milestones": {
    title: "Recognizing Normal Physiological Milestones at 6 Months",
    slug: "six-month-development-milestones",
    date: "May 28, 2026",
    dateModified: "July 18, 2026",
    readTime: "4 min read",
    category: "Milestones",
    excerpt: "Milestone indicators of physical, language, and motor skills development in infants and when to consult a specialist.",
    author: "Dr. Sudarshan Dev Arya",
    authorTitle: "MBBS, DCH, DNB (New Delhi), PGPN (Boston, USA)",
    authorAffiliation: "Consultant Pediatrician, Rainbow Children's Hospital, Bhopal",
    contentHtml: `
      <h2>What Motor Skills Should a 6-Month-Old Demonstrate?</h2>
      <p>A 6-month-old infant typically demonstrates rolling in both directions and sitting with hand or cushion support. Motor skill development reflects neurological maturation evaluated against pediatric benchmarks established by the <a href="https://iapindia.org" target="_blank" rel="noopener noreferrer" class="text-primary underline">Indian Academy of Pediatrics (IAP)</a>.</p>
      
      <h2>What Speech and Cognitive Progress Occurs at 6 Months?</h2>
      <p>Six-month-old babies vocalize feelings, respond to their names, and begin double-consonant babbling like 'ba-ba'. Cognitive progress shows heightened awareness of auditory and visual stimuli.</p>
      
      <h2>When and How Should Solid Foods Be Introduced?</h2>
      <p>Complementary solid foods should begin at completed six months alongside continued breastfeeding. Single-ingredient smooth purees provide necessary nutrients when milk alone no longer suffices.</p>

      <h2>When Should Parents Consult a Pediatrician for Milestone Delays?</h2>
      <p>Consult a pediatrician if your 6-month-old does not roll, shows no response to sounds, or fails to reach for objects. Early developmental evaluation allows timely supportive intervention.</p>

      <p class="p-3 bg-surface-tint border border-primary/20 rounded-xl font-mono text-xs text-primary-dark">[NEEDS DOCTOR REVIEW: expand section on specific red-flag motor milestone delays at 6 months to ~150 words]</p>
    `,
    faqs: [
      {
        q: "What if my baby isn't sitting independently at 6 months?",
        a: "Independent sitting without hand support normally develops between 6 to 8 months. Sitting with support is the expected 6-month milestone; pediatric checkups monitor ongoing motor progress."
      },
      {
        q: "Can I introduce cow's milk at 6 months?",
        a: "No, whole cow's milk should not be given as a primary drink until 12 months. It lacks suitable iron levels and stresses an infant's immature renal system."
      }
    ]
  },
  "child-vaccination-guide-india": {
    title: "Complete Baby Vaccination Guide for Indian Parents",
    slug: "child-vaccination-guide-india",
    date: "July 18, 2026",
    dateModified: "July 18, 2026",
    readTime: "7 min read",
    category: "Vaccination",
    excerpt: "A comprehensive guide explaining the importance of childhood immunization in India, cold-chain standards, and how to plan vaccine schedules.",
    author: "Dr. Sudarshan Dev Arya",
    authorTitle: "MBBS, DCH, DNB (New Delhi), PGPN (Boston, USA)",
    authorAffiliation: "Consultant Pediatrician, Rainbow Children's Hospital, Bhopal",
    contentHtml: `
      <h2>Why Is Immunization Essential for Infants in India?</h2>
      <p>Immunization protects infants from severe infectious diseases through active antibody generation. In India, guidelines from the <a href="https://main.mohfw.gov.in" target="_blank" rel="noopener noreferrer" class="text-primary underline">Universal Immunisation Programme (UIP, MoHFW)</a> and the <a href="https://iapindia.org" target="_blank" rel="noopener noreferrer" class="text-primary underline">Indian Academy of Pediatrics (IAP)</a> define recommended immunization schedules.</p>

      <h2>What Essential Vaccines Are Given in the First Year?</h2>
      <p>First-year vaccines include birth doses of BCG, OPV, and Hepatitis B, followed by Hexavalent combination shots (DTaP/wP, IPV, Hib, HepB), Rotavirus, and Pneumococcal Conjugate Vaccines (PCV) at 6, 10, and 14 weeks.</p>

      <h2>Why Is Cold-Chain Compliance Critical for Vaccine Safety?</h2>
      <p>Cold-chain compliance maintains storage temperatures strictly between 2°C and 8°C as mandated by <a href="https://www.who.int" target="_blank" rel="noopener noreferrer" class="text-primary underline">WHO guidelines</a>. Specialized medical refrigeration prevents active ingredient breakdown.</p>

      <p class="p-3 bg-surface-tint border border-primary/20 rounded-xl font-mono text-xs text-primary-dark">[NEEDS DOCTOR REVIEW: expand section on Rotavirus and PCV dose timing details to ~150 words]</p>
    `,
    faqs: [
      {
        q: "Why is cold-chain storage so important for vaccines?",
        a: "Cold-chain storage maintains vaccines at strict WHO-compliant temperatures (2°C to 8°C). Any heat or freezing degrades active components, compromising immune response development in children."
      },
      {
        q: "What is catch-up vaccination?",
        a: "Catch-up vaccination provides modified timing for missed immunization doses, ensuring children build complete antibody protection even if original schedules were delayed."
      }
    ]
  },
  "iap-vaccination-schedule-chart": {
    title: "Latest IAP Vaccination Schedule & Immunization Chart",
    slug: "iap-vaccination-schedule-chart",
    date: "July 17, 2026",
    dateModified: "July 18, 2026",
    readTime: "6 min read",
    category: "Vaccination",
    excerpt: "Detailed breakdown of the Indian Academy of Pediatrics (IAP) recommended schedule from birth up to 18 years.",
    author: "Dr. Sudarshan Dev Arya",
    authorTitle: "MBBS, DCH, DNB (New Delhi), PGPN (Boston, USA)",
    authorAffiliation: "Consultant Pediatrician, Rainbow Children's Hospital, Bhopal",
    contentHtml: `
      <h2>What Is the Official IAP Immunization Schedule Baseline?</h2>
      <p>The baseline <a href="https://iapindia.org" target="_blank" rel="noopener noreferrer" class="text-primary underline">Indian Academy of Pediatrics (IAP)</a> schedule starts at birth with BCG, OPV, and HepB, followed by primary hexavalent series at 6, 10, and 14 weeks. Boosters occur at 15-18 months, 2 years, 5 years, and 10 years.</p>

      <h2>What Is the Difference Between Mandatory and Recommended Vaccines?</h2>
      <p>Government schedules focus on core public health risks, whereas IAP outlines comprehensive protection including Influenza, Varicella, Hepatitis A, and Pneumococcal vaccines aligned with <a href="https://www.who.int" target="_blank" rel="noopener noreferrer" class="text-primary underline">WHO recommendations</a>.</p>

      <h2>How Can Parents Organize Immunization Milestones?</h2>
      <p>Structured immunization booklets and automated clinic reminders help parents track booster dates and avoid missed doses.</p>

      <p class="p-3 bg-surface-tint border border-primary/20 rounded-xl font-mono text-xs text-primary-dark">[NEEDS DOCTOR REVIEW: expand section on adolescent Tdap booster and HPV guidelines to ~150 words]</p>
    `,
    faqs: [
      {
        q: "What is the difference between UIP and IAP schedules?",
        a: "The Universal Immunisation Programme (UIP, MoHFW) covers core mandatory public vaccines. The IAP schedule includes additional protective vaccines such as Pneumococcal Conjugate, Influenza, and Chickenpox vaccines."
      },
      {
        q: "Are booster doses necessary?",
        a: "Yes, booster doses reinforce waning immunity from initial primary series, securing long-lasting defense against infectious bacterial and viral pathogens."
      }
    ]
  },
  "missed-vaccine-what-to-do": {
    title: "Missed Child Vaccine? Catch-Up Schedules & What to Do Next",
    slug: "missed-vaccine-what-to-do",
    date: "July 16, 2026",
    dateModified: "July 18, 2026",
    readTime: "5 min read",
    category: "Vaccination",
    excerpt: "Helpful pediatric guidance on catch-up vaccinations, grace periods, and scheduling missed doses safely.",
    author: "Dr. Manisha Bangarwa Arya",
    authorTitle: "MBBS, DNB (New Delhi), PGPN (Boston, USA), Fellowship in Neonatology",
    authorAffiliation: "Consultant Neonatologist & Pediatrician, Apollo SAGE Hospital, Bhopal",
    contentHtml: `
      <h2>What Steps Should Parents Take Immediately After a Missed Vaccine?</h2>
      <p>Parents should consult their pediatrician promptly to map a catch-up calendar. Guidance from the <a href="https://iapindia.org" target="_blank" rel="noopener noreferrer" class="text-primary underline">Indian Academy of Pediatrics (IAP)</a> allows safe scheduling of delayed doses without restarting vaccine series.</p>

      <h2>How Do Catch-Up Immunization Intervals Work?</h2>
      <p>Catch-up schedules adjust minimum intervals between doses to establish proper antibody levels. Most primary vaccines, including DTaP and MMR, can be safely caught up under medical guidance.</p>

      <h2>Are Delayed Doses Safe for Infants?</h2>
      <p>Delayed doses do not increase clinical adverse reaction rates. However, prompt catch-up reduces the timeframe during which an infant remains unprotected against wild infections.</p>

      <p class="p-3 bg-surface-tint border border-primary/20 rounded-xl font-mono text-xs text-primary-dark">[NEEDS DOCTOR REVIEW: expand section on catch-up rules for children above 5 years to ~150 words]</p>
    `,
    faqs: [
      {
        q: "Is there a limit on how late a vaccine can be given?",
        a: "Certain vaccines like Rotavirus have strict upper age limits (typically 8 months) due to intestinal safety profiles. Vaccines like MMR or DTaP can be caught up at later ages under pediatric supervision."
      },
      {
        q: "Do we need to restart the vaccine series from the beginning if we miss a dose?",
        a: "No, missing a dose does not require restarting the entire vaccine series. Clinical protocols simply continue from the last administered dose while respecting minimum dose intervals."
      }
    ]
  },
  "vaccine-side-effects-fever-management": {
    title: "Managing Vaccine Side Effects & Post-Shot Fever in Babies",
    slug: "vaccine-side-effects-fever-management",
    date: "July 15, 2026",
    dateModified: "July 18, 2026",
    readTime: "5 min read",
    category: "Vaccination",
    excerpt: "Pediatric advice on handling post-vaccination fever, redness at the injection site, and home care tips.",
    author: "Dr. Manisha Bangarwa Arya",
    authorTitle: "MBBS, DNB (New Delhi), PGPN (Boston, USA), Fellowship in Neonatology",
    authorAffiliation: "Consultant Neonatologist & Pediatrician, Apollo SAGE Hospital, Bhopal",
    contentHtml: `
      <h2>What Are Normal Post-Vaccination Physiological Symptoms?</h2>
      <p>Low-grade fever, mild localized redness, and slight swelling demonstrate active immune response initiation. Guidelines from the <a href="https://www.who.int" target="_blank" rel="noopener noreferrer" class="text-primary underline">World Health Organization (WHO)</a> confirm these symptoms typically resolve within 24 to 48 hours.</p>

      <h2>How Should Post-Vaccination Fever Be Managed Safely at Home?</h2>
      <p>Maintain frequent feeds to preserve hydration and apply a cool, damp cloth to injection sites for comfort. Consult pediatricians for weight-appropriate paracetamol dosing; never administer aspirin.</p>

      <h2>When Does Post-Vaccination Fever Warrant Immediate Medical Evaluation?</h2>
      <p>Contact your pediatrician immediately if fever exceeds 102°F, inconsolable crying lasts over 3 hours, or severe lethargy occurs.</p>

      <p class="p-3 bg-surface-tint border border-primary/20 rounded-xl font-mono text-xs text-primary-dark">[NEEDS DOCTOR REVIEW: expand section on febrile seizure emergency protocol steps for parents to ~150 words]</p>
    `,
    faqs: [
      {
        q: "How long does a post-vaccination fever typically last?",
        a: "A post-vaccination fever typically begins within 12 to 24 hours of administration and resolves naturally within 24 to 48 hours as immune activation stabilizes."
      },
      {
        q: "Can I apply any ointment to the injection site?",
        a: "Ointments or remedies should not be applied to the injection site. Keep the area clean and dry, using only cool damp compresses for localized discomfort."
      }
    ]
  },
  "painless-vaccination-for-babies": {
    title: "Painless vs. Painful Vaccines: A Pediatrician's Guide for Parents",
    slug: "painless-vaccination-for-babies",
    date: "July 14, 2026",
    dateModified: "July 18, 2026",
    readTime: "6 min read",
    category: "Vaccination",
    excerpt: "Understanding the differences between painless (acellular DTaP) and painful (whole-cell DwPT) combination vaccines.",
    author: "Dr. Sudarshan Dev Arya",
    authorTitle: "MBBS, DCH, DNB (New Delhi), PGPN (Boston, USA)",
    authorAffiliation: "Consultant Pediatrician, Rainbow Children's Hospital, Bhopal",
    contentHtml: `
      <h2>What Is the Primary Difference Between Painless and Painful Vaccines?</h2>
      <p>The difference lies in the pertussis component. Painless vaccines (aP) use purified acellular antigens causing significantly fewer side effects, whereas painful vaccines (wP) use whole-cell bacteria as outlined by the <a href="https://iapindia.org" target="_blank" rel="noopener noreferrer" class="text-primary underline">Indian Academy of Pediatrics (IAP)</a>.</p>

      <h2>Comparison Table: Painless (aP) vs. Painful (wP) DTP Vaccines</h2>
      <div class="overflow-x-auto my-4">
        <table class="min-w-full text-xs text-left border border-gray-200 rounded-lg overflow-hidden">
          <thead class="bg-gray-100 font-bold text-gray-700">
            <tr>
              <th class="p-2.5 border-b">Vaccine Type</th>
              <th class="p-2.5 border-b">Fever Risk</th>
              <th class="p-2.5 border-b">Pain & Swelling</th>
              <th class="p-2.5 border-b">Typical Cost</th>
              <th class="p-2.5 border-b">Schedule</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr>
              <td class="p-2.5 font-semibold">Painless (aP - Acellular)</td>
              <td class="p-2.5 text-green-700 font-medium">Low / Minimal</td>
              <td class="p-2.5 text-green-700 font-medium">Low / Minimal</td>
              <td class="p-2.5 font-mono text-gray-500">[NEEDS DOCTOR REVIEW]</td>
              <td class="p-2.5 font-mono text-gray-500">[NEEDS DOCTOR REVIEW]</td>
            </tr>
            <tr>
              <td class="p-2.5 font-semibold">Painful (wP - Whole-cell)</td>
              <td class="p-2.5 text-amber-700 font-medium">Moderate to High</td>
              <td class="p-2.5 text-amber-700 font-medium">Moderate to High</td>
              <td class="p-2.5 font-mono text-gray-500">[NEEDS DOCTOR REVIEW]</td>
              <td class="p-2.5 font-mono text-gray-500">[NEEDS DOCTOR REVIEW]</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Which Vaccine Option Should Parents Choose?</h2>
      <p>Both vaccine formulations offer effective clinical protection. Painless vaccines are preferred for children prone to febrile reactions or when parents seek to minimize post-shot discomfort.</p>

      <p class="p-3 bg-surface-tint border border-primary/20 rounded-xl font-mono text-xs text-primary-dark">[NEEDS DOCTOR REVIEW: expand section on long-term immunity duration comparison between wP and aP to ~150 words]</p>
    `,
    faqs: [
      {
        q: "Is the painless vaccine less effective than the painful one?",
        a: "No, both vaccine formulations build strong protective immunity against whooping cough. Acellular painless versions contain purified bacterial proteins that significantly reduce fever and swelling."
      },
      {
        q: "Which one should we choose for our baby?",
        a: "If your child has a history of high fever or febrile discomfort following vaccinations, the painless acellular vaccine is highly recommended under pediatric consultation."
      }
    ]
  }
};
