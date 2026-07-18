import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { servicesData } from "@/lib/services-data";
import { localitiesData } from "@/lib/localities-data";
import { blogData } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://babystepsnewbornclinic.com";
  
  // 1. Core Static Pages
  const staticPages = [
    "",
    "/about",
    "/doctors",
    "/services",
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
    priority: route === "" ? 1.0 : 0.8,
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

  // 4. Locality Dynamic Pages
  const localityPages = Object.keys(localitiesData).map((slug) => ({
    url: `${baseUrl}/areas/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // 5. Blog Dynamic Pages
  const blogPages = Object.keys(blogData).map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...doctorPages, ...servicePages, ...localityPages, ...blogPages];
}
