import { NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = 86400;

const LLMS_TEXT = `# Baby Steps – Newborn & Child Clinic

> Pediatric and neonatal care clinic in Neelbad, Bhopal, Madhya Pradesh.

## Clinical Specialists & Medical Registration
- Dr. Sudarshan Dev Arya: MBBS, DCH, DNB (Pediatrics, New Delhi), PGPN (Boston, USA). Consultant Pediatrician at Rainbow Children's Hospital, Bhopal. Medical Registration: MP-42113.
- Dr. Manisha Bangarwa Arya: MBBS, DNB (Pediatrics, New Delhi), PGPN (Boston, USA), Fellowship in Neonatology. Consultant Pediatrician & Neonatologist at Apollo SAGE Hospital, Bhopal. Medical Registration: MP-9230.

## Clinic Contact & Location Information
- Clinic Name: Baby Steps – Newborn & Child Clinic
- Address: 227/1, Near Durga Mata Mandir, Pooja Colony, Neelbad, Bhopal, Madhya Pradesh 462044, India
- Primary Phone: +916262560101
- Landline: 0755-4565588
- Email: contact@babystepsnewbornclinic.com
- Hours: Monday – Saturday: 10:00 AM – 9:00 PM | Sunday: 10:00 AM – 1:00 PM

## Core Pages Index
- Homepage: https://babystepsnewbornclinic.com/
- About Us: https://babystepsnewbornclinic.com/about
- Doctors Directory: https://babystepsnewbornclinic.com/doctors
  - Dr. Sudarshan Dev Arya: https://babystepsnewbornclinic.com/doctors/dr-sudarshan-dev-arya
  - Dr. Manisha Bangarwa Arya: https://babystepsnewbornclinic.com/doctors/dr-manisha-bangarwa-arya
- Services Directory: https://babystepsnewbornclinic.com/services
  - Vaccination Clinic: https://babystepsnewbornclinic.com/services/vaccination-clinic
  - Newborn Care: https://babystepsnewbornclinic.com/services/newborn-care
  - NICU Follow-up: https://babystepsnewbornclinic.com/services/nicu-follow-up
  - Growth Monitoring: https://babystepsnewbornclinic.com/services/growth-monitoring
  - Child Nutrition: https://babystepsnewbornclinic.com/services/child-nutrition
  - Development Assessment: https://babystepsnewbornclinic.com/services/development-assessment
  - Breastfeeding Counseling: https://babystepsnewbornclinic.com/services/breastfeeding-counseling
  - Fever Management: https://babystepsnewbornclinic.com/services/fever-management
  - Allergy & Asthma Care: https://babystepsnewbornclinic.com/services/allergy-asthma-care
  - Adolescent Health: https://babystepsnewbornclinic.com/services/adolescent-health
  - Emergency Child Care: https://babystepsnewbornclinic.com/services/emergency-child-care
  - Parent Education: https://babystepsnewbornclinic.com/services/parent-education
  - Milestone Tracking: https://babystepsnewbornclinic.com/services/milestone-tracking
- Locality Hubs (Bhopal):
  - Neelbad: https://babystepsnewbornclinic.com/areas/neelbad
  - Kolar Road: https://babystepsnewbornclinic.com/areas/kolar-road
  - Bawadia Kalan: https://babystepsnewbornclinic.com/areas/bawadia-kalan
- Clinical Interactive Tools:
  - Vaccination Schedule: https://babystepsnewbornclinic.com/tools/vaccination-schedule
  - Growth Calculator: https://babystepsnewbornclinic.com/tools/growth-calculator
  - Milestone Tracker: https://babystepsnewbornclinic.com/tools/milestone-tracker
- Health Blog & Parent Guides: https://babystepsnewbornclinic.com/blog
- Clinic Gallery: https://babystepsnewbornclinic.com/gallery
- Contact & Directions: https://babystepsnewbornclinic.com/contact

## Authorship & Medical Ethics
All medical content and clinical guidance on this website is authored and reviewed by registered pediatricians in compliance with National Medical Commission (NMC) regulations.
`;

export async function GET() {
  return new NextResponse(LLMS_TEXT, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
