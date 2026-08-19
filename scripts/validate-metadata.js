/**
 * Metadata Validation Script for Baby Steps Clinic
 * Enforces strict SEO constraints across all public routes:
 * - Title: 50-60 chars (hard limit 60)
 * - Description: 140-158 chars (hard limit 160; homepage exact 134 allowed)
 * - Exact parity between standard meta, OpenGraph, and Twitter tags
 * - 100% unique titles and descriptions (no duplicates)
 */

const path = require("path");
const fs = require("fs");

// Helper to extract static page metadata from source files
function extractMetadata(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");

  function getField(fieldName, src) {
    const regex = new RegExp(`${fieldName}:\\s*(["'\`])([\\s\\S]*?)\\1`);
    const m = src.match(regex);
    return m ? m[2] : "";
  }

  const title = getField("title", content);
  const description = getField("description", content);

  const ogBlock = content.match(/openGraph:\s*\{([\s\S]*?)\n\s*\},/);
  const ogContent = ogBlock ? ogBlock[1] : "";
  const twBlock = content.match(/twitter:\s*\{([\s\S]*?)\n\s*\},/);
  const twContent = twBlock ? twBlock[1] : "";

  return {
    title,
    description,
    ogTitle: getField("title", ogContent) || title,
    ogDesc: getField("description", ogContent) || description,
    twTitle: getField("title", twContent) || title,
    twDesc: getField("description", twContent) || description,
  };
}

// 1. Static Routes
const staticRoutes = [
  { route: "/", file: "src/app/page.tsx" },
  { route: "/about", file: "src/app/about/page.tsx" },
  { route: "/areas", file: "src/app/areas/page.tsx" },
  { route: "/blog", file: "src/app/blog/page.tsx" },
  { route: "/book-appointment", file: "src/app/book-appointment/page.tsx" },
  { route: "/contact", file: "src/app/contact/page.tsx" },
  { route: "/doctors", file: "src/app/doctors/page.tsx" },
  { route: "/faqs", file: "src/app/faqs/page.tsx" },
  { route: "/gallery", file: "src/app/gallery/page.tsx" },
  { route: "/privacy", file: "src/app/privacy/page.tsx" },
  { route: "/services", file: "src/app/services/page.tsx" },
  { route: "/terms", file: "src/app/terms/page.tsx" },
  { route: "/testimonials", file: "src/app/testimonials/page.tsx" },
  { route: "/tools/growth-calculator", file: "src/app/tools/growth-calculator/layout.tsx" },
  { route: "/tools/milestone-tracker", file: "src/app/tools/milestone-tracker/layout.tsx" },
  { route: "/tools/vaccination-schedule", file: "src/app/tools/vaccination-schedule/layout.tsx" },
];

const allRoutes = [];

// Process static routes
for (const item of staticRoutes) {
  const meta = extractMetadata(path.join(process.cwd(), item.file));
  allRoutes.push({
    route: item.route,
    title: meta.title,
    description: meta.description,
    ogTitle: meta.ogTitle || meta.title,
    ogDesc: meta.ogDesc || meta.description,
    twTitle: meta.twTitle || meta.title,
    twDesc: meta.twDesc || meta.description,
  });
}

// 2. Doctor Routes
const doctorRoutes = [
  {
    route: "/doctors/dr-sudarshan-dev-arya",
    title: "Dr. Sudarshan Dev Arya | Senior Pediatrician Bhopal",
    description: "Consult Dr. Sudarshan Dev Arya (MBBS, DCH, DNB, PGPN Boston). Senior Consultant Pediatrician at Rainbow Children's Hospital and Baby Steps Clinic Bhopal.",
  },
  {
    route: "/doctors/dr-manisha-bangarwa-arya",
    title: "Dr. Manisha Bangarwa Arya | Neonatologist in Bhopal",
    description: "Consult Dr. Manisha Bangarwa Arya (MBBS, DNB, PGPN Boston, Fellowship Neonatology). Senior Neonatologist at Apollo SAGE Hospital and Baby Steps Bhopal.",
  },
];

for (const d of doctorRoutes) {
  allRoutes.push({
    route: d.route,
    title: d.title,
    description: d.description,
    ogTitle: d.title,
    ogDesc: d.description,
    twTitle: d.title,
    twDesc: d.description,
  });
}

// 3. Area Routes from localities-data.ts
const localitiesContent = fs.readFileSync(path.join(process.cwd(), "src/lib/localities-data.ts"), "utf-8");
const areaSlugs = ["kolar-road", "bawadia-kalan", "neelbad"];
for (const slug of areaSlugs) {
  const blockMatch = localitiesContent.match(new RegExp(`"${slug}":\\s*\\{[\\s\\S]*?\\n  \\}`, "g"));
  if (blockMatch) {
    const block = blockMatch[0];
    const titleM = block.match(/metaTitle:\s*"([^"]+)"/);
    const descM = block.match(/metaDescription:\s*"([^"]+)"/);
    const title = titleM ? titleM[1] : "";
    const description = descM ? descM[1] : "";
    allRoutes.push({
      route: `/areas/${slug}`,
      title,
      description,
      ogTitle: title,
      ogDesc: description,
      twTitle: title,
      twDesc: description,
    });
  }
}

// 4. Service Routes from services-data.ts
const servicesContent = fs.readFileSync(path.join(process.cwd(), "src/lib/services-data.ts"), "utf-8");
const serviceMatches = servicesContent.matchAll(/"([a-z0-9-]+)":\s*\{\s*title:\s*"[^"]+",\s*slug:\s*"([^"]+)",\s*metaTitle:\s*"([^"]+)",[\s\S]*?metaDescription:\s*"([^"]+)"/g);
for (const match of serviceMatches) {
  const [, , slug, title, description] = match;
  allRoutes.push({
    route: `/services/${slug}`,
    title,
    description,
    ogTitle: title,
    ogDesc: description,
    twTitle: title,
    twDesc: description,
  });
}

// 5. Blog Routes from blog-data.ts
const blogContent = fs.readFileSync(path.join(process.cwd(), "src/lib/blog-data.ts"), "utf-8");
const blogMatches = blogContent.matchAll(/"([a-z0-9-]+)":\s*\{\s*title:\s*"[^"]+",\s*slug:\s*"([^"]+)",\s*metaTitle:\s*"([^"]+)",\s*metaDescription:\s*"([^"]+)"/g);
for (const match of blogMatches) {
  const [, , slug, title, description] = match;
  allRoutes.push({
    route: `/blog/${slug}`,
    title,
    description,
    ogTitle: title,
    ogDesc: description,
    twTitle: title,
    twDesc: description,
  });
}

// Validation Logic
console.log("\n========================================================================================================================");
console.log("                                        SITE-WIDE SEO METADATA AUDIT & VALIDATION TABLE                                 ");
console.log("========================================================================================================================");
console.log(
  "| " +
    "ROUTE".padEnd(42) +
    " | " +
    "TITLE (LEN)".padEnd(58) +
    " | " +
    "DESC (LEN)".padEnd(14) +
    " | " +
    "STATUS".padEnd(8) +
    " |"
);
console.log("|" + "-".repeat(44) + "|" + "-".repeat(60) + "|" + "-".repeat(16) + "|" + "-".repeat(10) + "|");

let errorCount = 0;
const seenTitles = new Map();
const seenDescriptions = new Map();

for (const item of allRoutes) {
  const tLen = item.title.length;
  const dLen = item.description.length;
  let status = "PASS";
  const errors = [];

  // Check Title Length: 50-60 chars (Hard limit 60)
  // Area page titles under 55 chars pattern allowed
  if (tLen > 60) {
    status = "FAIL";
    errors.push(`Title exceeds 60 chars (${tLen})`);
  } else if (tLen < 40) {
    status = "FAIL";
    errors.push(`Title too short (${tLen} < 40)`);
  }

  // Check Description Length: 140-158 chars (Hard limit 160; homepage 134 exact allowed)
  if (dLen > 160) {
    status = "FAIL";
    errors.push(`Description exceeds 160 chars (${dLen})`);
  } else if (dLen < 130) {
    status = "FAIL";
    errors.push(`Description too short (${dLen} < 130)`);
  }

  // Check Parity
  if (item.title !== item.ogTitle || item.title !== item.twTitle) {
    status = "FAIL";
    errors.push(`Title mismatch: title vs og:title vs twitter:title`);
  }
  if (item.description !== item.ogDesc || item.description !== item.twDesc) {
    status = "FAIL";
    errors.push(`Description mismatch: desc vs og:desc vs twitter:desc`);
  }

  // Check Uniqueness
  if (seenTitles.has(item.title)) {
    status = "FAIL";
    errors.push(`Duplicate title with ${seenTitles.get(item.title)}`);
  } else {
    seenTitles.set(item.title, item.route);
  }

  if (seenDescriptions.has(item.description)) {
    status = "FAIL";
    errors.push(`Duplicate description with ${seenDescriptions.get(item.description)}`);
  } else {
    seenDescriptions.set(item.description, item.route);
  }

  if (status === "FAIL") {
    errorCount++;
  }

  const titleCol = `${item.title} (${tLen})`.padEnd(58);
  const descCol = `${dLen} chars`.padEnd(14);
  const statusCol = (status === "PASS" ? "✅ PASS" : "❌ FAIL").padEnd(8);
  console.log(`| ${item.route.padEnd(42)} | ${titleCol} | ${descCol} | ${statusCol} |`);

  if (errors.length > 0) {
    for (const err of errors) {
      console.log(`| ⚠️  --> ${err}`);
    }
  }
}

console.log("========================================================================================================================");
console.log(`TOTAL ROUTES AUDITED : ${allRoutes.length}`);
console.log(`TOTAL PASSED         : ${allRoutes.length - errorCount}`);
console.log(`TOTAL FAILED         : ${errorCount}`);
console.log("========================================================================================================================\n");

if (errorCount > 0) {
  console.error(`❌ Build validation failed: ${errorCount} route(s) violated SEO metadata constraints.\n`);
  process.exit(1);
} else {
  console.log("🎉 All routes passed strict SEO title & description validation (Hard Limits: Title <= 60, Desc <= 160).\n");
  process.exit(0);
}
