export interface LocalityItem {
  name: string;
  slug: string;
  h1: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  introHeading: string;
  introParagraphs: string[];
  distanceHeading: string;
  distanceNote: string;
  landmarkPlaceholder?: string;
  whyChooseHeading: string;
  whyChoose: { title: string; desc: string }[];
  servicesHeading: string;
  services: string[];
  faqs: { q: string; a: string }[];
  testimonialPlaceholder: string;
}

export const localitiesData: Record<string, LocalityItem> = {
  "kolar-road": {
    name: "Kolar Road",
    slug: "kolar-road",
    h1: "Child Specialist in Kolar Road, Bhopal",
    subtitle: "Clinical Newborn & Pediatric Care for families in Kolar Road",
    metaTitle: "Child Specialist in Kolar Road, Bhopal | Baby Steps",
    metaDescription: "Looking for a trusted child specialist near Kolar Road? Sunday clinic (10 AM–1 PM) & evening care in Neelbad (~20 min). Call +91 62625 60101.",
    introHeading: "Comprehensive Pediatric Care for Kolar Road Families",
    introParagraphs: [
      "Kolar Road represents one of the largest and fastest-growing residential belts in South Bhopal, home to thousands of young families, working parents, and newborns. For parents residing along the Kolar Road corridor, finding dedicated pediatric care that fits around work schedules without long hospital waiting times is essential. Baby Steps – Newborn & Child Clinic provides comprehensive outpatient pediatric and neonatal consultations located approximately 20 minutes from Kolar Road in nearby Neelbad.",
      "Led by Dr. Sudarshan Dev Arya (Senior Pediatrician) and Dr. Manisha Bangarwa Arya (Senior Neonatologist & Pediatrician), our clinic offers complete clinical care ranging from routine infant immunisation to newborn milestone assessments, infant nutrition mapping, and acute pediatric care. We emphasize calm, unhurried consultations that allow parents to discuss every clinical question thoroughly."
    ],
    distanceHeading: "Getting Here from Kolar Road",
    distanceNote: "Reaching Baby Steps Clinic from Kolar Road takes approximately 20 minutes by car or two-wheeler. The clinic is situated on the main road at 227/1, near Durga Mata Mandir, Pooja Colony, Neelbad, Bhopal. Free street parking is available directly outside the clinic for both four-wheelers and two-wheelers. The route provides a straightforward commute away from congested city hospital zones, allowing parents to bring infants for consultations with minimal transit distress.",
    landmarkPlaceholder: "[VERIFY: nearest landmark in Kolar Road]",
    whyChooseHeading: "Why Families in Kolar Road Choose Baby Steps",
    whyChoose: [
      {
        title: "Dedicated Sunday Morning Clinic (10:00 AM – 1:00 PM)",
        desc: "For dual-working parents along Kolar Road, weekday clinic visits can be difficult to manage. Baby Steps Clinic operates a dedicated Sunday morning outpatient clinic from 10:00 AM to 1:00 PM, allowing working parents to attend scheduled vaccinations, growth checkups, and routine consultations without taking time off work."
      },
      {
        title: "Extended Weekday Consultation Hours (10:00 AM – 9:00 PM)",
        desc: "Our 11-hour weekday schedule (Monday to Saturday, 10:00 AM to 9:00 PM) ensures that working parents commuting back to Kolar Road in the evening have reliable access to experienced pediatric consultations after office hours, minimizing emergency room visits for routine illnesses."
      },
      {
        title: "Complete IAP Immunisation Schedule & WHO Cold-Chain Standards",
        desc: "We maintain a 100% stocked Indian Academy of Pediatrics (IAP) vaccination schedule, including routine and optional vaccines (such as Meningococcal, Rabies, and HPV). All vaccines are stored in dedicated medical-grade refrigeration units with continuous digital temperature monitoring strictly between 2°C and 8°C."
      }
    ],
    servicesHeading: "Primary Services Sought by Kolar Road Parents",
    services: [
      "Vaccination Clinic",
      "Growth Monitoring",
      "Child Nutrition",
      "Allergy & Asthma Care",
      "Newborn Care"
    ],
    faqs: [
      {
        q: "Is there a child specialist open on Sunday near Kolar Road?",
        a: "Yes. Baby Steps Clinic runs an outpatient clinic every Sunday from 10:00 AM to 1:00 PM. This session is designed for working parents from Kolar Road and surrounding South Bhopal areas who require scheduled child immunisation or health checkups over the weekend."
      },
      {
        q: "How long does it take to travel from Kolar Road to Baby Steps Clinic?",
        a: "The commute from Kolar Road to our clinic in Neelbad takes approximately 20 minutes under normal traffic conditions. The clinic is located at 227/1, near Durga Mata Mandir, Pooja Colony, Neelbad, with convenient free street parking outside."
      },
      {
        q: "Can working parents visit after office hours on weekdays from Kolar Road?",
        a: "Yes. Our regular weekday consultation hours extend until 9:00 PM from Monday to Saturday (10:00 AM to 9:00 PM). Parents returning from work can comfortably schedule evening visits or walk in for general consultations."
      }
    ],
    testimonialPlaceholder: "[NEEDS CLIENT INPUT: testimonial from a Kolar Road family]"
  },
  "bawadia-kalan": {
    name: "Bawadia Kalan",
    slug: "bawadia-kalan",
    h1: "Pediatrician in Bawadia Kalan, Bhopal",
    subtitle: "Clinical Newborn & Pediatric Care for families in Bawadia Kalan",
    metaTitle: "Pediatrician in Bawadia Kalan, Bhopal | Baby Steps",
    metaDescription: "Senior pediatrician & neonatologist near Bawadia Kalan (~25 min drive). Dual specialist care under one roof in Neelbad. Call +91 62625 60101.",
    introHeading: "Specialist Child & Newborn Care for Bawadia Kalan Families",
    introParagraphs: [
      "Bawadia Kalan is a premier residential locality in South Bhopal with a large population of young families and newborns. When infants require medical attention, parents often face a dilemma: visiting a general pediatrician for older children while seeking a separate neonatologist for newborn or preterm follow-ups.",
      "Baby Steps – Newborn & Child Clinic solves this challenge by providing dual specialist expertise in a single location. Situated approximately 25 minutes from Bawadia Kalan in Neelbad, our clinic houses both a senior general pediatrician and a fellowship-trained neonatologist under one roof, providing coordinated, seamless pediatric care."
    ],
    distanceHeading: "Getting Here from Bawadia Kalan",
    distanceNote: "The drive from Bawadia Kalan to Baby Steps Clinic in Neelbad takes approximately 25 minutes. Our clinic is located at 227/1, near Durga Mata Mandir, Pooja Colony, Neelbad, Bhopal. Ample free street parking is available directly in front of the clinic for four-wheelers and two-wheelers, ensuring a smooth and hassle-free arrival with young infants.",
    landmarkPlaceholder: "[VERIFY: nearest landmark in Bawadia Kalan]",
    whyChooseHeading: "Why Families in Bawadia Kalan Choose Baby Steps",
    whyChoose: [
      {
        title: "Dual Specialist Care: Pediatrician + Neonatologist Under One Roof",
        desc: "Dr. Sudarshan Dev Arya brings extensive expertise in general pediatrics and childhood illness management, while Dr. Manisha Bangarwa Arya holds a specialized Fellowship in Neonatology alongside pediatric qualifications. This dual-consultant setup means families with both a newborn and an older sibling can have both children evaluated in a single visit without needing separate appointments at different facilities."
      },
      {
        title: "Specialized Post-NICU & Preterm Infant Care",
        desc: "For families in Bawadia Kalan whose babies were born preterm, with low birth weight, or required NICU hospitalization, specialized developmental follow-up is critical. Our neonatal clinic provides precise kangaroo care guidance, lactation support, growth curve plotting, and infant development monitoring."
      },
      {
        title: "Reliable Cold-Chain Vaccine Safety & 7-Day Availability",
        desc: "We maintain every dose of the IAP vaccination schedule in temperature-controlled WHO-standard medical refrigeration (2°C to 8°C). The clinic is open Monday to Saturday from 10:00 AM to 9:00 PM, and Sunday morning from 10:00 AM to 1:00 PM."
      }
    ],
    servicesHeading: "Primary Services Sought by Bawadia Kalan Parents",
    services: [
      "Newborn Care",
      "NICU Follow-up",
      "Breastfeeding Counseling",
      "Development Assessment",
      "Child Nutrition",
      "Vaccination Clinic"
    ],
    faqs: [
      {
        q: "Is there a child specialist open on Sunday near Bawadia Kalan?",
        a: "Yes. Baby Steps Clinic provides Sunday morning consultation hours from 10:00 AM to 1:00 PM. Parents travelling from Bawadia Kalan can comfortably visit for scheduled vaccinations or child health reviews over the weekend."
      },
      {
        q: "Why do families from Bawadia Kalan travel 25 minutes to Baby Steps Clinic?",
        a: "Families from Bawadia Kalan choose our clinic because of the rare availability of dual specialist care in one place: a senior pediatrician and a fellowship-trained neonatologist. This eliminates the need for separate visits when managing newborn care, lactation guidance, and sibling pediatric checkups."
      },
      {
        q: "Can newborn checkups and older sibling consultations be booked together?",
        a: "Yes. Because both pediatric and neonatal specialists practise together at Baby Steps Clinic, families can bring their newborn and older children for synchronized consultations during the same visit."
      }
    ],
    testimonialPlaceholder: "[NEEDS CLIENT INPUT: testimonial from a Bawadia Kalan family]"
  },
  "neelbad": {
    name: "Neelbad",
    slug: "neelbad",
    h1: "Pediatrician in Neelbad, Bhopal",
    subtitle: "Clinical Newborn & Pediatric Care for families in Neelbad",
    metaTitle: "Pediatrician in Neelbad, Bhopal | Baby Steps Clinic",
    metaDescription: "Local pediatrician in Neelbad, Bhopal. Zero transit stress for sick infants. Walk-ins welcome Mon–Sat 10AM–9PM, Sun 10AM–1PM. Call +91 62625 60101.",
    introHeading: "Trusted Pediatric & Newborn Care in the Heart of Neelbad",
    introParagraphs: [
      "For parents living in Neelbad and surrounding neighborhoods, having direct, immediate access to senior pediatric care right in the locality is invaluable. When an infant has a sudden fever, feeding difficulty, or requires scheduled vaccinations, avoiding long commutes across Bhopal prevents unnecessary stress for both child and parents.",
      "Baby Steps – Newborn & Child Clinic is physically established in Neelbad at Pooja Colony. We provide prompt outpatient consultations, complete IAP-aligned immunisations, newborn developmental assessments, and dedicated lactation counseling, all backed by hospital-grade clinical precision."
    ],
    distanceHeading: "Getting Here in Neelbad",
    distanceNote: "Our clinic is conveniently located at 227/1, near Durga Mata Mandir, Pooja Colony, Neelbad, Bhopal, MP 462044. For residents across Neelbad, the clinic is just minutes away by foot, car, or two-wheeler. Free street parking is available right outside the clinic. Because we are locally situated, families in Neelbad can walk in for general consultations without advance appointment barriers during all operating hours.",
    whyChooseHeading: "Why Families in Neelbad Choose Baby Steps",
    whyChoose: [
      {
        title: "Immediate Local Access — Zero Transit Delay for Sick Infants",
        desc: "Travelling across Bhopal with a sick or irritable child can be distressing. Having senior pediatric consultants located right in Neelbad means prompt medical assessment when your baby needs attention, with no prolonged car or auto rides."
      },
      {
        title: "Dual Consultant Expertise on Your Doorstep",
        desc: "Neelbad residents benefit from direct access to Dr. Sudarshan Dev Arya (MBBS, DCH, DNB New Delhi, PGPN Boston) and Dr. Manisha Bangarwa Arya (MBBS, DNB New Delhi, PGPN Boston, Fellowship in Neonatology). This level of specialized newborn and child healthcare is available locally without visiting distant multi-specialty hospitals."
      },
      {
        title: "11-Hour Weekday Availability (10 AM–9 PM) & Sunday Morning Clinic (10 AM–1 PM)",
        desc: "Our doors are open Monday through Saturday from 10:00 AM to 9:00 PM, and Sunday from 10:00 AM to 1:00 PM. Whether you need a morning wellness checkup, an evening after-work visit, or a Sunday vaccination slot, local care is always accessible."
      }
    ],
    servicesHeading: "Primary Services Sought by Neelbad Parents",
    services: [
      "Vaccination Clinic",
      "Newborn Care",
      "Breastfeeding Counseling",
      "Growth Monitoring",
      "Child Nutrition",
      "Development Assessment"
    ],
    faqs: [
      {
        q: "Is there a child specialist open on Sunday near Neelbad?",
        a: "Yes. Baby Steps Clinic is open every Sunday from 10:00 AM to 1:00 PM for scheduled vaccinations and child health consultations, providing weekend healthcare access for local families."
      },
      {
        q: "Can I walk in without an appointment for urgent child health concerns in Neelbad?",
        a: "Yes. Walk-in consultations are welcome during our regular hours for general pediatric concerns. Vaccination visits are scheduled in advance to ensure cold-chain dose preparation and maintain separate scheduling for healthy infant visits."
      },
      {
        q: "Where exactly in Neelbad is Baby Steps Clinic located?",
        a: "The clinic is located at 227/1, near Durga Mata Mandir, Pooja Colony, Neelbad, Bhopal. We have free street parking directly outside for cars and two-wheelers."
      }
    ],
    testimonialPlaceholder: "[NEEDS CLIENT INPUT: testimonial from a Neelbad family]"
  }
};
