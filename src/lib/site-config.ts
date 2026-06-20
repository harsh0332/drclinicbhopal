export const siteConfig = {
  name: "BABY STEPS – Newborn & Child Clinic",
  shortName: "Baby Steps Clinic",
  address: "227/1, Near Durga Mata Mandir, Pooja Colony, Neelbad, Bhopal, Madhya Pradesh – 462044",
  googleMapsLink: "https://maps.google.com/?q=Baby+Steps+Newborn+Child+Clinic+Neelbad+Bhopal",
  showGoogleRating: false, // Set to true once verified reviews are live
  phone: "62625 60101",
  phoneLink: "tel:+916262560101",
  whatsapp: "62625 60101",
  whatsappLink: "https://wa.me/916262560101?text=Hi%2C%20I'd%20like%20to%20book%20an%20appointment%20for%20my%20child%20at%20Baby%20Steps.",
  email: "contact@babystepsclinic.in",
  hours: [
    { days: "Monday – Saturday", time: "10:00 AM – 1:00 PM, 5:00 PM – 8:00 PM" },
    { days: "Sunday", time: "Closed (Available for Emergencies)" }
  ],
  doctors: [
    {
      id: "dr-sudarshan-dev-arya",
      name: "Dr. Sudarshan Dev Arya",
      degree: "MBBS, DCH, DNB (New Delhi), PGPN (Boston, USA)",
      title: "Senior Pediatrician & Newborn Specialist",
      hospital: "Consultant, Rainbow Children's Hospital, Bhopal",
      image: "/images/doctors/dr-sudarshan-dev-arya.jpg"
    },
    {
      id: "dr-manisha-bangarwa-arya",
      name: "Dr. Manisha Bangarwa Arya",
      degree: "MBBS, DNB (New Delhi), PGPN (Boston, USA), Fellowship in Neonatology",
      title: "Senior Neonatologist & Pediatrician",
      hospital: "Consultant, Apollo SAGE Hospital, Bhopal",
      image: "/images/doctors/dr-manisha-bangarwa-arya.jpg"
    }
  ],
  services: [
    "Vaccination Clinic",
    "Newborn Care",
    "NICU Follow-up",
    "Growth Monitoring",
    "Child Nutrition",
    "Development Assessment",
    "Breastfeeding Counseling",
    "Fever Management",
    "Allergy & Asthma Care",
    "Adolescent Health",
    "Emergency Child Care",
    "Parent Education",
    "Milestone Tracking"
  ],
  navigation: [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Doctors", href: "/doctors" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" }
  ],
  socials: {
    facebook: "https://facebook.com/babystepsbhopal",
    instagram: "https://instagram.com/babystepsbhopal",
    youtube: "https://youtube.com/babystepsbhopal"
  },
  compliance: {
    disclaimer: "Medical Disclaimer: The information provided on this website is for educational and informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.",
    medicalRegistration: "Clinic Reg. No. MP-42113 / MP-9230. Registered under Madhya Pradesh Nursing Home Act."
  }
};
