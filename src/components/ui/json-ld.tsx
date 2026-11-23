import React from "react";

interface JsonLdProps {
  data: Record<string, unknown>;
}

// Escape characters that could close the <script> tag or break HTML parsing
// if any schema value ever contains them (e.g. "</script>" in CMS text).
function serializeJsonLd(data: Record<string, unknown>) {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
