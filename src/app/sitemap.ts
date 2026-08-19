import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { servicesData } from "@/lib/services-data";
import { blogData } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://babystepsnewbornclinic.com";
  
  // 1. Core Static Pages
  const staticPages = [
    "",
    "/about",
    "/doctors",
    "/services",
    "/areas",
    "/areas/neelbad",
    "/areas/kolar-road",
    "/areas/bawadia-kalan",
    "/areas/danish-kunj",
    "/areas/salaiya",
    "/areas/chuna-bhatti",
    "/areas/katara-hills",
    "/areas/bagmugaliya",
    "/areas/lalghati",
    "/areas/aiims-bhopal",
    "/blog",
    "/gallery",
    "/testimonials",
    "/faqs",
    "/contact",
    "/book-appointment",
    "/tools/vaccination-schedule",
    "/tools/growth-calculator",
    "/tools/milestone-tracker",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : route === "/areas" ? 0.8 : 0.7,
  }));

  // 2. Doctor Dynamic Pages
  const doctorPages = siteConfig.doctors.map((doctor) => ({
    url: `${baseUrl}/doctors/${doctor.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // 3. Service Dynamic Pages
  const servicePages = Object.keys(servicesData).map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // 4. Blog Dynamic Pages
  const blogPages = Object.keys(blogData).map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...doctorPages, ...servicePages, ...blogPages];
}
