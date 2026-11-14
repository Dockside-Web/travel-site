# Travel Map & Journal (marketing site)

The public site for the Travel Map & Journal app (`../travel-app`). Static Astro 7 + Tailwind 4,
built from the Dockside `astro-website-template`, deployed to Cloudflare Workers. Every "Log in",
"Get started" and "Try the demo" is a plain link into the app.

## Commands

| Command | |
|---|---|
| `npm run dev` | Dev server at http://localhost:4322 (the app's dev server needs 4321, so they run side by side) |
| `npm run check` | Type-check |
| `npm run build` | Build to `dist/` |
| `npm run deploy` | Build + deploy to Cloudflare |
| `npm run test:screens` | A fresh picture of every page on a phone and a wide screen, in `screens/.shots` (builds the site and serves it on port 4390). Git-ignored: screenshots are never committed; they're kept in the gallery artifact |

## Where things are

- `src/site.config.ts`: name, description, SEO, and `app.url` (where every app link goes).
- `src/lib/links.ts`: the links into the app. "Try the demo" goes to the app's `/demo`, which signs
  the visitor in to the read-only demo account.
- `src/pages/index.astro`: the home page, one component per section in `src/components/home/`.
  The page follows one trip's life: the map in the hero, one trip's spots, all your trips,
  sharing, costs, then the demo. The nav (`Navigation`) goes to pages, not to sections: a
  Features menu with the four feature pages, then Blog, Contact, Try the demo and Log in.
  - `Hero`: the lake photo, the app on a laptop, a torn-paper edge (`TornEdge`) and the
    departure board across it (`DepartureBoard`: spins up on load, then flips through the demo's
    trips).
  - `Spots`: the phone (`PhoneTrip`: a real screenshot of the demo's Mexico City trip in a drawn
    phone) and what each spot keeps.
  - `Trips`: the Trips screenshot, hanging down into Sharing.
  - `Sharing`: the demo's Lisbon & Porto share link (`SharedLisbon`: a real screenshot, tall, in a
    drawn browser) and the three ways to share.
  - `Together`: the costs band, with the Lisbon & Porto expenses screenshot.
  - `Demo`: the demo account's real trips as photo cards, each with a passport stamp.
- Feature pages: `src/pages/travel-map.astro`, `countries-visited.astro`, `split-trip-costs.astro`
  and `share-travel-tips.astro`, all on `src/layouts/FeatureLayout.astro` (heading and picture,
  pinned points on fog, the page's own detail, blog posts that link to it, the demo, the closing
  band). Linked from the nav's Features menu and the footer.
- Blog: one Markdown file per post in `src/content/blog/`; the file name is the address
  (`track-countries-visited.md` → `/blog/track-countries-visited`). The header fields are checked in
  `src/content.config.ts`. Put photos in
  `src/assets/` and point `hero:` or `![alt](../../assets/…)` at them. A post shows up under "From
  the blog" on a feature page by linking to it in its text, e.g. `[your travel map](/travel-map)`.
  Its link preview is its hero photo cropped to 1200×630. Pages: `src/pages/blog/`; helpers:
  `src/lib/blog.ts`; RSS at `/rss.xml` once `url` is set (`src/pages/[feed].xml.ts`).
- `src/components/PageHero.astro`: the hero of every page but the home page (feature pages, the
  blog and its posts, Contact, Privacy, Terms, not found): the lake photo behind the nav, the
  title in white, a torn edge into the page. Each page passes its own slice of the photo.
- `src/components/CTA.astro`: the closing band, with the privacy promise and Get Started.
- `src/styles/global.css`: the colours ("Misty harbour": slate blue, fog, linen, sand, ink) and
  fonts (Source Serif 4, Instrument Sans, self-hosted through `astro.config.mjs`).
- `src/assets/`: photos and app screenshots, optimized at build time.
- `screens/`: takes the screenshots (`pages.spec.ts` lists the pages; blog posts are found by
  themselves). A new page goes in its list. The pictures are never committed.

The site is slate blue on purpose, not the app's green and cream: the screenshots should stand out
from the page around them.

## Before launch

- [ ] Demo: "Try the demo" needs the demo account in production (`npm run db:seed:remote` in
      `travel-app`); without it the app's `/demo` is a 404
- [ ] Domain: set `url` in `site.config.ts`; move the app to `app.<domain>` and update `app.url`
- [ ] The link preview (`public/og-default.jpg`, from the "Site link preview options" canvas): redo
      it once the app's final name and logo are decided
- [ ] Photos are free Unsplash stock for now (hero lake, closing fjord, the five trip cards). Swap
      in your own when you have them
- [ ] **Review the legal pages.** Privacy and Terms are live and in Google, but
      are written from what the app does today and still need a review. Update "Last updated" on
      any change
- [ ] Add the email service to Privacy's "How we share information" when the app sends email
- [ ] What it costs: the note at the foot of `Demo` (always a free plan; everything free while
      it's new, limits on the free plan later) and Terms' Price section say the same thing:
      change both together when the plans are set
- [ ] Re-take the app screenshots in `src/assets/` (`app-*.png`, from the demo account, light, its
      demo strip hidden) when the app's look changes
- [ ] The template's launch list still applies: custom domain on the Worker, `workers_dev: false`,
      Search Console, analytics
