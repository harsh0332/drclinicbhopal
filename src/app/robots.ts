import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
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
      }
    ],
    sitemap: "https://babystepsnewbornclinic.com/sitemap.xml",
  };
}
