// Health-awareness posters designed for the clinic (Hindi, 1199×1312).
// The poster text is baked into the image, so each entry also carries the key
// points as real text — search engines, screen readers and parents on slow
// connections all get the advice even when the image itself isn't read.

export interface HealthPoster {
  id: string;
  src: string;
  /** Hindi headline as printed on the poster */
  titleHi: string;
  /** English topic label */
  titleEn: string;
  tag: string;
  /** Detailed English alt text describing the poster */
  alt: string;
  /** 3–4 key takeaways in Hindi, taken from the poster */
  pointsHi: string[];
  /** One-line English summary */
  summaryEn: string;
  cta: { label: string; href: string };
}

export const POSTER_WIDTH = 1199;
export const POSTER_HEIGHT = 1312;

export const healthPosters: HealthPoster[] = [
  {
    id: "vaccination",
    src: "/images/posters/vaccination.webp",
    titleHi: "टीकाकरण नवजात और बच्चों के लिए क्यों है ज़रूरी?",
    titleEn: "Why vaccination matters for newborns & children",
    tag: "Vaccination",
    alt: "Baby Steps Clinic poster in Hindi on why vaccination is important for newborns and children — diseases prevented (BCG, diphtheria, whooping cough, tetanus, polio, hepatitis B, pneumonia, measles, mumps, rubella, rotavirus, JE), benefits of on-time vaccination and tips for parents, with Dr. Sudarshan Dev Arya and Dr. Manisha Bangarwa Arya.",
    pointsHi: [
      "टीका बच्चे की इम्यूनिटी को मजबूत करता है",
      "टीबी, पोलियो, खसरा, निमोनिया, रोटावायरस जैसी बीमारियों से बचाव",
      "टीकाकरण समय पर और पूरा कराएं — कोई डोज़ न छोड़ें",
      "टीकाकरण कार्ड सुरक्षित रखें",
    ],
    summaryEn: "Complete, on-time vaccination is your child's shield against serious diseases.",
    cta: { label: "View IAP vaccination schedule", href: "/tools/vaccination-schedule" },
  },
  {
    id: "growth-monitoring",
    src: "/images/posters/growth-monitoring.webp",
    titleHi: "बच्चों में वृद्धि (Growth) की निगरानी क्यों ज़रूरी है?",
    titleEn: "Why growth monitoring matters",
    tag: "Growth",
    alt: "Baby Steps Clinic poster in Hindi on growth monitoring — measuring weight, height and head circumference, its benefits, and how often to check: monthly in the first year, every 3 months from 1 to 5 years, every 6 months after 5 years.",
    pointsHi: [
      "वजन, लंबाई और सिर के घेर को समय-समय पर मापना",
      "पहले 1 वर्ष में हर माह, 1–5 वर्ष में हर 3 माह",
      "5 वर्ष से अधिक — हर 6 माह",
      "कुपोषण या अधिक वजन का जल्दी पता चलता है",
    ],
    summaryEn: "Regular growth checks catch nutrition or hormonal problems early.",
    cta: { label: "Try the growth calculator", href: "/tools/growth-calculator" },
  },
  {
    id: "child-nutrition",
    src: "/images/posters/child-nutrition.webp",
    titleHi: "डॉक्टर, मेरा बच्चा क्यों पतला है?",
    titleEn: "Why is my child thin? Nutrition gaps explained",
    tag: "Nutrition",
    alt: "Baby Steps Clinic poster in Hindi answering 'Doctor, why is my child thin?' — causes of poor weight gain, common nutrient deficiencies (calories, protein, iron, vitamins A, D, B12, folate, zinc), what a balanced diet should include and when to see a pediatrician.",
    pointsHi: [
      "संतुलित आहार की कमी, बार-बार संक्रमण या पोषक तत्वों का अवशोषण न होना",
      "आयरन, प्रोटीन, विटामिन D/B12 और जिंक की कमी पर ध्यान दें",
      "दाल, पनीर, दूध, हरी सब्ज़ियाँ, मौसमी फल और घी/मूंगफली दें",
      "वजन न बढ़े या भूख कम लगे तो पेडियाट्रिशियन से मिलें",
    ],
    summaryEn: "Poor weight gain has a cause — growth charts and a balanced plate help find and fix it.",
    cta: { label: "Child nutrition consultation", href: "/services/child-nutrition" },
  },
  {
    id: "screen-time",
    src: "/images/posters/screen-time.webp",
    titleHi: "बच्चों का स्क्रीन टाइम — कितना सही, कितना नुकसानदायक?",
    titleEn: "Children's screen time — how much is safe?",
    tag: "Screen Time",
    alt: "Baby Steps Clinic poster in Hindi on children's screen time — harms of excess screen use (eye strain, poor attention, sleep, obesity, speech delay, irritability), safe limits by age (0–2 years none, 2–5 years max 1 hour a day, 5–18 years 1–2 hours excluding study) and easy tips to control it.",
    pointsHi: [
      "0–2 वर्ष: स्क्रीन से पूर्णतः दूर रखें",
      "2–5 वर्ष: अधिकतम 1 घंटा/दिन",
      "5–18 वर्ष: अधिकतम 1–2 घंटे/दिन (पढ़ाई को छोड़कर)",
      "खाने के समय स्क्रीन न दें, सोने से 1 घंटा पहले बंद करें",
    ],
    summaryEn: "No screens under 2, and clear daily limits after that — parents lead by example.",
    cta: { label: "Development assessment", href: "/services/development-assessment" },
  },
  {
    id: "clinic-intro",
    src: "/images/posters/clinic-intro.webp",
    titleHi: "बेबी स्टेप्स — हर नन्हे कदम के साथ",
    titleEn: "Baby Steps Newborn & Child Clinic",
    tag: "Our Clinic",
    alt: "Baby Steps Newborn & Child Clinic poster featuring Dr. Sudarshan Dev Arya (MBBS, DCH, DNB, PGPN Boston USA) and Dr. Manisha Bangarwa Arya (MBBS, DNB, Fellowship in Neonatology), services — day care treatment, laboratory, X-ray, pharmacy, complete vaccination — and clinic timings Mon–Sat 10 AM–9 PM, Sunday 10 AM–1 PM, Pooja Colony, Neelbad, Bhopal.",
    pointsHi: [
      "डे केयर ट्रीटमेंट, लैबोरेटरी, X-Ray और फार्मेसी — एक ही जगह",
      "सम्पूर्ण टीकाकरण और टीकाकरण अनुसूची",
      "सोमवार–शनिवार: सुबह 10 से रात 9 बजे तक",
      "रविवार: सुबह 10 से दोपहर 1 बजे तक",
    ],
    summaryEn: "Two pediatric specialists, lab, X-ray, pharmacy and vaccination under one roof in Neelbad.",
    cta: { label: "Meet our doctors", href: "/doctors" },
  },
];
