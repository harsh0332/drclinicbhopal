/**
 * Internationalization & hreflang routing configuration.
 * 
 * Manages the registry of published multilingual routes to ensure hreflang 
 * alternate language tags are ONLY emitted for pages that exist in both languages,
 * preventing search engines from encountering hreflang pointing to 404 targets.
 */

// Registry of published Hindi route paths (e.g. "/services/vaccination-clinic")
// Empty until translated Hindi content is created and published.
export const publishedHindiRoutes = new Set<string>([
  // e.g. "/services/vaccination-clinic"
]);

/**
 * Returns Metadata alternates object configured for SEO and hreflang.
 * - Always includes canonical English URL.
 * - Only includes "hi-IN", "en-IN", and "x-default" if a Hindi version is published.
 */
export function getPageAlternates(path: string) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const canonical = `https://babystepsnewbornclinic.com${cleanPath === "/" ? "" : cleanPath}`;

  const hasHindi = publishedHindiRoutes.has(cleanPath);

  if (hasHindi) {
    const hindiUrl = `https://babystepsnewbornclinic.com/hi${cleanPath === "/" ? "" : cleanPath}`;
    return {
      canonical,
      languages: {
        "en-IN": canonical,
        "hi-IN": hindiUrl,
        "x-default": canonical,
      },
    };
  }

  return {
    canonical,
  };
}
