import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin"],
      },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "PerplexityBot",
          "Google-Extended",
          "Googlebot",
          "Bingbot"
        ],
        allow: "/",
        disallow: ["/admin"],
      }
    ],
    sitemap: "https://babystepsnewbornclinic.com/sitemap.xml",
  };
}
