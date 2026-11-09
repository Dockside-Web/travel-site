// ============================================================================
// SITE CONFIG - FILL THIS IN FOR EVERY NEW CLIENT
// ----------------------------------------------------------------------------
// All SEO info lives here: <title>, meta tags, social share tags, structured
// data (JSON-LD), robots.txt, sitemap, web manifest and the contact form.
// Anything left as "" is skipped. `npm run build` lists required fields that
// are still empty.
// ============================================================================

export const site = {
  // ---------------------------------------------------------------------------
  // REQUIRED
  // ---------------------------------------------------------------------------

  // Business name as it should appear in Google. e.g. "Sweet Caroline Seaport"
  name: "Travel Map & Journal",
  // Short phrase used in the homepage title: "Name | Tagline"
  tagline: "Your Travels, Beautifully Mapped",
  // Fallback meta description if a page doesn't pass one. 140-160 characters.
  description:
    "A private travel journal built around a map: remember where you've been, keep every place you loved, and share the best of any trip in one link.",
  // Production URL with https:// and no trailing slash. e.g. "https://example.com"
  // TODO: set once the domain is chosen (the app moves to app.<domain> then).
  url: "",

  // ---------------------------------------------------------------------------
  // OPTIONAL - BRANDING
  // ---------------------------------------------------------------------------

  // Full legal name for the copyright/schema. e.g. "Sweet Caroline Seaport, LLC"
  legalName: "",
  // Mobile browser bar color + manifest. Usually the main brand color. e.g. "#1e40af"
  themeColor: "#17324d",
  // Social share image in /public, 1200x630. e.g. "/og-default.jpg"
  ogImage: "",
  ogImageAlt: "",
  // Square logo in /public, used by Google. e.g. "/logo.png"
  logo: "",

  // ---------------------------------------------------------------------------
  // OPTIONAL - BUSINESS INFO (Google structured data / local SEO)
  // ---------------------------------------------------------------------------

  business: {
    // Most specific schema.org type that fits: "Restaurant", "Plumber",
    // "LodgingBusiness", "Dentist"... List: https://schema.org/LocalBusiness
    type: "Organization",
    phone: "", // e.g. "+1-305-555-1234"
    email: "",
    address: {
      street: "",
      city: "",
      region: "", // state, e.g. "FL"
      postalCode: "",
      country: "US",
    },
    // Google Maps: right-click the pin to copy. e.g. { lat: 24.55, lng: -81.78 }
    geo: null as { lat: number; lng: number } | null,
    // Google Maps / Business Profile link
    mapUrl: "",
    // 24h format. e.g. { days: ["Monday", "Tuesday"], opens: "09:00", closes: "17:00" }
    hours: [] as { days: string[]; opens: string; closes: string }[],
    priceRange: "", // e.g. "$$"
    areaServed: [] as string[], // e.g. ["Key West", "Monroe County"]
  },

  // Full profile URLs. Google uses these to connect the profiles to the business.
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    x: "",
    youtube: "",
    tiktok: "",
    google: "", // Google Business Profile
  },

  // ---------------------------------------------------------------------------
  // OPTIONAL - CONTACT FORM
  // ---------------------------------------------------------------------------

  forms: {
    basinId: "", // the ID at the end of the Basin form URL
    turnstileSiteKey: "", // Cloudflare dashboard > Turnstile
  },

  // ---------------------------------------------------------------------------
  // OPTIONAL - ANALYTICS + SEARCH CONSOLE
  // ---------------------------------------------------------------------------

  analytics: {
    cloudflareToken: "", // Cloudflare > Web Analytics > token from the snippet
    ga4Id: "", // e.g. "G-XXXXXXXXXX"
  },
  verification: {
    google: "", // Search Console > HTML tag method > the content="" value
    bing: "",
  },

  // ---------------------------------------------------------------------------
  // THE APP (every "Log in" / "Get started" link points here)
  // ---------------------------------------------------------------------------

  app: {
    // No trailing slash. Change to https://app.<domain> once the custom domain is live.
    url: "https://travel-app.riley-50f.workers.dev",
  },

  // Rarely changed
  lang: "en",
  locale: "en_US",
};

// Shown as a warning on every build until filled in.
export const missingRequired = (["name", "tagline", "description", "url"] as const).filter((key) => !site[key]);
