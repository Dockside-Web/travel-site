Changelog for the Astro website template for Dockside Web Solutions, LLC

10/16/26 - v1.1.0
Added:
src/site.config.ts - one file for all SEO / client info. Starts blank; build warns about missing required fields
README is now a checklist of everything to fill in for a new site
head/SEO.astro - robots, og:site_name/locale/image size+alt, twitter alt, noindex prop, per-page share image, search console verification
head/StructuredData.astro - LocalBusiness + WebSite JSON-LD, plus per-page schema via Layout
head/Analytics.astro - Cloudflare Web Analytics / GA4 from config, production only
robots.txt + manifest.webmanifest generated from config
contact page
public/_headers (security + caching), public/_redirects
Skip link, <main>, data-reveal scroll animations, reduced motion
Changed:
Updated to Astro 7 (requires Node 22.22+), Tailwind 4.3, sitemap 3.7.4. Removed @astrojs/compiler-rs (built into Astro 7)
Removed all content from previous clients. Navigation, Footer, CTA, PageHero are empty shells
Removed Section + SectionHeader
Brand colors are placeholder grays, fonts are system fonts, wrangler name is blank
Fonts set up for the Astro Fonts API (self-hosted, was Google Fonts @import)
Clean URLs (trailingSlash never, build.format file); sitemap excludes 404
Turnstile script only loads on pages with the contact form, and is skipped if no key is set
Fixed:
ContactForm: Company label pointed at name field, "optional" Company was required
Turnstile script referenced a callback that didn't exist


3/26/26
Made sweetcarolineseaport.com from this template and added things that worked well and fixed things that didnt

3/21/26
Added ContactForm component

3/14/26
Updated to Astro 6

3/1/26
Added:
Tailwind CSS Intellisense extension

2/23/26 - Created Layout
Added:
TailwindCSS
astrojs/sitemap

Button.astro
Footer.astro
Header.astro
SEO.astro
404.astro
