import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { site, missingRequired } from "./src/site.config";

if (!site.forms.basinId || !site.forms.turnstileSiteKey) {
  console.warn(`\n⚠  src/site.config.ts needs forms.basinId and forms.turnstileSiteKey: until both are set, the contact form can't send\n`);
}
if (missingRequired.length) {
  console.warn(`\n⚠  src/site.config.ts is missing: ${missingRequired.join(", ")}\n`);
}

// Pages that should never appear in the sitemap (also set `noindex` on them).
const sitemapExclude = ["/404"];

export default defineConfig({
  // Set `url` in src/site.config.ts
  site: site.url || undefined,
  // The app's dev server (../travel-app) needs 4321 for logging in to work, so
  // this one runs beside it on 4322.
  server: { port: 4322 },
  output: "static",

  // Clean URLs: /about (not /about/ or /about.html). Cloudflare redirects the
  // other variants here, and canonical tags + sitemap all agree on one URL.
  trailingSlash: "never",
  build: { format: "file" },

  // Prefetch links on hover for near-instant page loads.
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },

  // FONTS - add the client's fonts here. They're downloaded at build time and
  // self-hosted. Then: add a <Font> tag in src/layouts/Layout.astro and set
  // --font-brand / --font-headers in src/styles/global.css. Example:
  //
  // {
  //   provider: fontProviders.google(),
  //   name: "Source Sans 3",
  //   cssVariable: "--font-body",
  //   weights: [400, 600, 700],
  //   styles: ["normal"],
  //   subsets: ["latin"],
  //   fallbacks: ["system-ui", "sans-serif"],
  // },
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Source Serif 4",
      cssVariable: "--font-serif",
      weights: ["400 600"],
      styles: ["normal", "italic"],
      subsets: ["latin", "latin-ext"],
      fallbacks: ["Georgia", "serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Instrument Sans",
      cssVariable: "--font-sans",
      weights: ["400 600"],
      styles: ["normal"],
      subsets: ["latin", "latin-ext"],
      fallbacks: ["system-ui", "sans-serif"],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap({
      filter: (page) => !sitemapExclude.includes(new URL(page).pathname.replace(/\/$/, "")),
    }),
  ],
});
