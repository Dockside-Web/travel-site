# Travel Map & Journal (marketing site)

The public site for the Travel Map & Journal app (`../travel-app`). Static Astro 7 + Tailwind 4,
built from the Dockside `astro-website-template`, deployed to Cloudflare Workers. Every "Log in",
"Get started" and "Try the demo" is a plain link into the app.

## Commands

| Command | |
|---|---|
| `npm run dev` | Dev server |
| `npm run check` | Type-check |
| `npm run build` | Build to `dist/` |
| `npm run deploy` | Build + deploy to Cloudflare |

## Where things are

- `src/site.config.ts`: name, description, SEO, and `app.url` (where every app link goes).
- `src/lib/links.ts`: the links into the app. "Try the demo" goes to the app's `/demo`, which signs
  the visitor in to the read-only demo account.
- `src/pages/index.astro`: the home page, one component per section in `src/components/home/`.
  The page follows one trip's life: the map in the hero, one trip's spots, all your trips,
  sharing, costs, then the demo. The nav lists the sections in the same order.
  - `Hero`: the lake photo, the app on a laptop, a torn-paper edge (`TornEdge`) and the
    departure board across it (`DepartureBoard`: spins up on load, then flips through the demo's
    trips).
  - `Spots`: the phone (`PhoneTrip`, drawn in HTML from the demo's Mexico City trip) and what each
    spot keeps.
  - `Trips`: the Trips screenshot, hanging down into Sharing.
  - `Sharing`: the Lisbon share page drawn tall (`SharedLisbon`) and the three ways to share.
  - `Together`: the costs band, with the Lisbon & Porto expenses screenshot.
  - `Demo`: the demo account's real trips as photo cards, each with a passport stamp.
- `src/components/CTA.astro`: the closing band, with the privacy promise and Get Started.
- `src/styles/global.css`: the colours ("Misty harbour": slate blue, fog, linen, sand, ink) and
  fonts (Source Serif 4, Instrument Sans, self-hosted through `astro.config.mjs`).
- `src/assets/`: photos and app screenshots, optimized at build time.

The site is slate blue on purpose, not the app's green and cream: the screenshots should stand out
from the page around them.

## Before launch

- [ ] Demo: "Try the demo" needs the demo account in production (`npm run db:seed:remote` in
      `travel-app`); without it the app's `/demo` is a 404
- [ ] Domain: set `url` in `site.config.ts`; move the app to `app.<domain>` and update `app.url`
- [ ] Photos are free Unsplash stock for now (hero lake, closing fjord, the five trip cards, the
      Lisbon tram on the share page). Swap in your own when you have them
- [ ] `SharedLisbon` is drawn, with a stock photo and a made-up note from "Alex"; replace it with a
      real screenshot of a share page once the demo has cover photos
- [ ] `legalName`, an `ogImage` (1200×630), favicons from the logo
- [ ] Privacy (`src/pages/privacy.astro`) is a draft from what the app does today: add a contact
      email, have it reviewed, then remove `noindex` and take `/privacy` out of `sitemapExclude`
- [ ] Re-take the screenshots in `src/assets/` when the app's look changes
- [ ] The template's launch list still applies: custom domain on the Worker, `workers_dev: false`,
      Search Console, analytics
