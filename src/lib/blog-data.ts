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
  },
  "baby-weight-gain-tips": {
    title: "Baby Weight Gain Tips: Healthy Infant Nutrition & WHO Percentile Trajectory",
    slug: "baby-weight-gain-tips",
    date: "2026-07-20",
    dateModified: "2026-07-20",
    readTime: "5 min read",
    category: "Child Nutrition",
    excerpt: "Evidence-based guidelines for healthy infant and toddler weight gain, complementary feeding milestones, and WHO growth chart evaluation.",
    author: "Dr. Manisha Bangarwa Arya",
    authorTitle: "Consultant Pediatrician & Neonatologist",
    authorAffiliation: "MBBS, DNB (Pediatrics), PGPN (Boston, USA)",
    contentHtml: `
      <h2>How Do I Know If My Baby Is Gaining Weight Normally?</h2>
      <p>Tracking your infant's weight trajectory against official <a href="https://www.who.int" target="_blank" rel="noopener noreferrer">WHO Child Growth Standards</a> is the gold standard for monitoring health. During the first 3 months, healthy newborns typically gain 20–30 grams per day.</p>

      <h2>What Are the Best Foods for Healthy Weight Gain in Toddlers?</h2>
      <p>For babies over 6 months, nutrient-dense complementary foods aligned with <a href="https://iapindia.org" target="_blank" rel="noopener noreferrer">Indian Academy of Pediatrics (IAP) nutrition guidelines</a> help maintain ideal weight gain without digestive stress.</p>

      <p class="p-3 bg-surface-tint border border-primary/20 rounded-xl font-mono text-xs text-primary-dark">[NEEDS DOCTOR REVIEW: expand section on dietary caloric density and healthy fats for underweight toddlers to ~150 words]</p>
    `,
    faqs: [
      {
        q: "What should I do if my baby is not gaining weight?",
        a: "Consult your pediatrician for a detailed WHO growth percentile review. Weight gain issues can stem from inadequate latching, calorie density gaps, or underlying digestion concerns."
      },
      {
        q: "When should we start solid foods for weight gain?",
        a: "Complementary feeding should begin at 6 months alongside continued breastfeeding, introducing mashed bananas, khichdi, and ragi porridge under pediatric guidance."
      }
    ]
  },
  "dengue-in-children-prevention-care": {
    title: "Dengue Fever in Children: Symptoms, Warning Signs & Hydration Guidelines",
    slug: "dengue-in-children-prevention-care",
    date: "2026-07-20",
    dateModified: "2026-07-20",
    readTime: "6 min read",
    category: "Child Health",
    excerpt: "Pediatric guidelines on recognizing early dengue symptoms in children, monitoring warning signs, and maintaining oral hydration.",
    author: "Dr. Sudarshan Dev Arya",
    authorTitle: "Senior Consultant Pediatrician",
    authorAffiliation: "MBBS, DCH, DNB (Pediatrics), PGPN (Boston, USA)",
    contentHtml: `
      <h2>What Are the Early Symptoms of Dengue Fever in Children?</h2>
      <p>Dengue in children can present with high fever, severe headache, retro-orbital pain, body aches, and skin rash. Aligned with <a href="https://main.mohfw.gov.in" target="_blank" rel="noopener noreferrer">Ministry of Health & Family Welfare (MoHFW) guidelines</a>, early diagnosis is essential for safe recovery.</p>

      <h2>What Danger Signs Require Immediate Emergency Consultation?</h2>
      <p>Persistent vomiting, abdominal pain, lethargy, or mucosal bleeding require immediate medical evaluation as advised by <a href="https://www.who.int" target="_blank" rel="noopener noreferrer">WHO Dengue Clinical Management protocols</a>.</p>

      <p class="p-3 bg-surface-tint border border-primary/20 rounded-xl font-mono text-xs text-primary-dark">[NEEDS DOCTOR REVIEW: expand section on pediatric fluid calculation and warning signs of dengue shock syndrome to ~150 words]</p>
    `,
    faqs: [
      {
        q: "Can children recover from dengue at home?",
        a: "Mild dengue cases can be managed at home with strict bed rest, paracetamol for fever, and continuous oral fluid intake. Aspirin or ibuprofen must NEVER be given."
      },
      {
        q: "When should blood platelet tests be done?",
        a: "Complete Blood Count (CBC) and platelet monitoring should be ordered by your pediatrician based on fever onset and clinical examination."
      }
    ]
  },
  "monsoon-child-care-tips": {
    title: "Monsoon Child Care Guide: Preventing Flu, Infections & Waterborne Illnesses",
    slug: "monsoon-child-care-tips",
    date: "2026-07-20",
    dateModified: "2026-07-20",
    readTime: "5 min read",
    category: "Preventive Health",
    excerpt: "Essential monsoon health practices for babies and children to prevent seasonal viral fevers, stomach infections, and mosquito-borne illnesses.",
    author: "Dr. Sudarshan Dev Arya",
    authorTitle: "Senior Consultant Pediatrician",
    authorAffiliation: "MBBS, DCH, DNB (Pediatrics), PGPN (Boston, USA)",
    contentHtml: `
      <h2>How Can Parents Protect Children From Seasonal Monsoon Fevers?</h2>
      <p>Monsoon humidity increases viral transmission and vector breeding. Annual seasonal Influenza vaccination recommended by <a href="https://iapindia.org" target="_blank" rel="noopener noreferrer">IAP India</a> provides strong protection against flu strains.</p>

      <h2>What Water and Hygiene Safety Protocols Should Families Follow?</h2>
      <p>Boiling drinking water and enforcing hand hygiene protocols aligned with <a href="https://www.who.int" target="_blank" rel="noopener noreferrer">WHO infection control guidelines</a> significantly reduce gastrointestinal infections.</p>

      <p class="p-3 bg-surface-tint border border-primary/20 rounded-xl font-mono text-xs text-primary-dark">[NEEDS DOCTOR REVIEW: expand section on pediatric monsoon skin infections and viral fever protocols to ~150 words]</p>
    `,
    faqs: [
      {
        q: "Is the annual flu shot necessary for children during monsoon?",
        a: "Yes, the IAP recommends an annual flu vaccination before the monsoon season for all children above 6 months to reduce influenza severity."
      },
      {
        q: "How to prevent mosquito bites in infants?",
        a: "Use full-sleeved cotton clothing, mosquito nets over cribs, and child-safe repellent patches approved for infant skin."
      }
    ]
  },
  "loose-motion-in-babies-care": {
    title: "Loose Motion in Babies: Dehydration Prevention, ORS & Parent Guidelines",
    slug: "loose-motion-in-babies-care",
    date: "2026-07-20",
    dateModified: "2026-07-20",
    readTime: "5 min read",
    category: "Infant Care",
    excerpt: "Clinical guidance on managing pediatric diarrhea, calculating WHO-standard ORS fluid intake, and recognizing dehydration warning signs.",
    author: "Dr. Manisha Bangarwa Arya",
    authorTitle: "Consultant Pediatrician & Neonatologist",
    authorAffiliation: "MBBS, DNB (Pediatrics), PGPN (Boston, USA)",
    contentHtml: `
      <h2>What Should Parents Do Immediately When a Baby Develops Loose Motion?</h2>
      <p>The foremost clinical priority in infant diarrhea is preventing dehydration. Administering low-osmolarity Oral Rehydration Salts (ORS) alongside continuous breastfeeding follows <a href="https://www.who.int" target="_blank" rel="noopener noreferrer">WHO Diarrheal Disease Management</a>.</p>

      <h2>Why Is Zinc Supplementation Recommended During Diarrhea Episodes?</h2>
      <p>According to <a href="https://main.mohfw.gov.in" target="_blank" rel="noopener noreferrer">MoHFW guidelines</a>, 14-day Zinc supplementation reduces the duration and severity of acute diarrhea in infants.</p>

      <p class="p-3 bg-surface-tint border border-primary/20 rounded-xl font-mono text-xs text-primary-dark">[NEEDS DOCTOR REVIEW: expand section on pediatric ORS osmolarity and Zinc supplementation duration to ~150 words]</p>
    `,
    faqs: [
      {
        q: "What are the early signs of dehydration in a baby?",
        a: "Sunken eyes, dry mouth, absence of tears when crying, decreased wet diapers (fewer than 6 in 24 hours), and extreme lethargy require immediate medical care."
      },
      {
        q: "Should I stop feeding my baby during loose motion?",
        a: "No. Never stop breastfeeding or age-appropriate soft feeds during diarrhea. Continued feeding maintains gut integrity and speeds up recovery."
      }
    ]
  },
  "child-cough-cold-home-care": {
    title: "Child Cough & Cold Care: Safe Home Guidelines & When to Consult",
    slug: "child-cough-cold-home-care",
    date: "2026-07-20",
    dateModified: "2026-07-20",
    readTime: "5 min read",
    category: "Pediatric Care",
    excerpt: "Pediatric safe-care advice for managing cold and cough in infants and toddlers without unprescribed OTC medications.",
    author: "Dr. Sudarshan Dev Arya",
    authorTitle: "Senior Consultant Pediatrician",
    authorAffiliation: "MBBS, DCH, DNB (Pediatrics), PGPN (Boston, USA)",
    contentHtml: `
      <h2>Why Are Over-the-Counter Cough Syrups Discouraged for Young Children?</h2>
      <p><a href="https://iapindia.org" target="_blank" rel="noopener noreferrer">IAP medical alerts</a> strongly advise against giving OTC combination cough and cold syrups to infants under 2 years due to respiratory risks. Saline nasal drops and hydration are preferred.</p>

      <h2>When Does a Child's Cough Require a Specialist Pediatric Visit?</h2>
      <p>Fast breathing, chest indrawing, wheezing, or fever lasting over 3 days require clinical evaluation aligned with <a href="https://www.who.int" target="_blank" rel="noopener noreferrer">WHO Acute Respiratory Infection protocols</a>.</p>

      <p class="p-3 bg-surface-tint border border-primary/20 rounded-xl font-mono text-xs text-primary-dark">[NEEDS DOCTOR REVIEW: expand section on red-flag respiratory distress signs in infants under 1 year to ~150 words]</p>
    `,
    faqs: [
      {
        q: "How to clear a blocked nose in a newborn safely?",
        a: "Use pediatrician-approved saline nasal drops (1–2 drops per nostril) followed by gentle bulb suction before feeds and sleep."
      },
      {
        q: "Is steam inhalation safe for toddlers?",
        a: "Direct steam inhalation carries burn risks for young children. Running a hot shower to create a warm humid bathroom environment is much safer."
      }
    ]
  },
  "child-not-eating-food-picky-eater": {
    title: "Child Not Eating Food? Pediatric Nutritionist Advice for Picky Eaters",
    slug: "child-not-eating-food-picky-eater",
    date: "2026-07-20",
    dateModified: "2026-07-20",
    readTime: "5 min read",
    category: "Child Nutrition",
    excerpt: "Clinical strategies for managing toddler picky eating, establishing mealtime routines, and meeting daily caloric and micronutrient needs.",
    author: "Dr. Manisha Bangarwa Arya",
    authorTitle: "Consultant Pediatrician & Neonatologist",
    authorAffiliation: "MBBS, DNB (Pediatrics), PGPN (Boston, USA)",
    contentHtml: `
      <h2>Is Picky Eating Normal for Toddlers Between 1 to 3 Years?</h2>
      <p>Appetite fluctuations are common as toddler growth rates slow down compared to infancy. Following <a href="https://iapindia.org" target="_blank" rel="noopener noreferrer">IAP Infant & Young Child Feeding (IYCF) guidelines</a> prevents forced-feeding struggles.</p>

      <h2>How Can Parents Ensure Balanced Micronutrient Intake Without Forced Feeding?</h2>
      <p>Offering small, nutrient-dense meal portions rich in iron, zinc, and protein aligns with <a href="https://www.who.int" target="_blank" rel="noopener noreferrer">WHO Child Health Recommendations</a>.</p>

      <p class="p-3 bg-surface-tint border border-primary/20 rounded-xl font-mono text-xs text-primary-dark">[NEEDS DOCTOR REVIEW: expand section on behavioral feeding strategies and micronutrient supplementation for toddlers to ~150 words]</p>
    `,
    faqs: [
      {
        q: "Should I give appetite-booster syrups to my child?",
        a: "Appetite syrups should never be given without pediatric consultation. True appetite loss is best evaluated through blood counts and physical growth checks."
      },
      {
        q: "How many meals should a 1-year-old child eat per day?",
        a: "A typical schedule includes 3 main meals and 2 healthy nutrient-dense snacks, alongside milk feeds."
      }
    ]
  },
  "vitamin-d-iron-deficiency-kids": {
    title: "Vitamin D & Iron Deficiency in Children: Clinical Signs & Dietary Sources",
    slug: "vitamin-d-iron-deficiency-kids",
    date: "2026-07-20",
    dateModified: "2026-07-20",
    readTime: "5 min read",
    category: "Child Nutrition",
    excerpt: "Identifying early clinical signs of Vitamin D and Iron deficiency in infants and children, supplementation guidelines, and fortified dietary options.",
    author: "Dr. Manisha Bangarwa Arya",
    authorTitle: "Consultant Pediatrician & Neonatologist",
    authorAffiliation: "MBBS, DNB (Pediatrics), PGPN (Boston, USA)",
    contentHtml: `
      <h2>Why Is Vitamin D Supplementation Recommended for All Breastfed Infants?</h2>
      <p>Breast milk provides optimal nutrition but is low in Vitamin D. <a href="https://iapindia.org" target="_blank" rel="noopener noreferrer">IAP clinical guidelines</a> recommend daily Vitamin D supplementation (400 IU/day) from birth to prevent rickets.</p>

      <h2>What Are the Clinical Signs of Nutritional Anemia in Young Children?</h2>
      <p>Pallor, fatigue, reduced appetite, and poor weight gain indicate iron deficiency anemia. <a href="https://www.who.int" target="_blank" rel="noopener noreferrer">WHO Anemia Control Protocols</a> advocate early dietary iron enrichment.</p>

      <p class="p-3 bg-surface-tint border border-primary/20 rounded-xl font-mono text-xs text-primary-dark">[NEEDS DOCTOR REVIEW: expand section on elemental iron dosage and pediatric Vitamin D supplementation guidelines to ~150 words]</p>
    `,
    faqs: [
      {
        q: "How long should Vitamin D drops be continued for babies?",
        a: "Vitamin D drops (400 IU daily) are usually recommended for the first 12 months of life, as advised by your pediatrician."
      },
      {
        q: "What rich foods provide natural iron for toddlers?",
        a: "Jaggery, green leafy vegetables, lentils, egg yolk, fortified cereals, and Vitamin C-rich foods (which enhance iron absorption) are excellent."
      }
    ]
  },
  "child-immunity-booster-guide": {
    title: "Child Immunity Booster Guide: Science-Backed Habits for Healthy Kids",
    slug: "child-immunity-booster-guide",
    date: "2026-07-20",
    dateModified: "2026-07-20",
    readTime: "5 min read",
    category: "Preventive Health",
    excerpt: "Evidence-based strategies to build natural childhood immunity through WHO-scheduled vaccinations, balanced nutrition, and healthy sleep hygiene.",
    author: "Dr. Sudarshan Dev Arya",
    authorTitle: "Senior Consultant Pediatrician",
    authorAffiliation: "MBBS, DCH, DNB (Pediatrics), PGPN (Boston, USA)",
    contentHtml: `
      <h2>Do Commercial Immunity Booster Powders Really Work for Children?</h2>
      <p>There are no magical quick-fix immunity supplements. True pediatric immunity builds through <a href="https://iapindia.org" target="_blank" rel="noopener noreferrer">IAP-scheduled immunizations</a>, balanced whole foods, physical activity, and adequate sleep.</p>

      <h2>What Are the Most Effective Clinical Habits to Reduce Frequent Infections?</h2>
      <p>Completing routine vaccinations, maintaining hand hygiene, and limiting passive smoke exposure follow proven <a href="https://www.who.int" target="_blank" rel="noopener noreferrer">WHO Child Health Interventions</a>.</p>

      <p class="p-3 bg-surface-tint border border-primary/20 rounded-xl font-mono text-xs text-primary-dark">[NEEDS DOCTOR REVIEW: expand section on gut microbiome role in pediatric immunity and sleep duration benchmarks to ~150 words]</p>
    `,
    faqs: [
      {
        q: "Is it normal for a toddler to get sick 6 to 8 times a year?",
        a: "Yes. Young children attending playschools or daycares naturally experience 6–8 mild viral colds annually as their immune memory develops."
      },
      {
        q: "What role does sleep play in child immunity?",
        a: "Deep sleep releases cytokines required for immune defense. Toddlers need 11–14 hours of daily sleep (including naps) for optimal health."
      }
    ]
  }
};
