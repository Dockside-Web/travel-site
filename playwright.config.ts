import { defineConfig } from "@playwright/test";

// A picture of every page (`npm run test:screens`), each on a phone and a wide
// screen. The site has no dark mode, so light only. The pictures are for
// looking at, not for comparing: each run writes them fresh to screens/.shots
// (git-ignored, never committed), and they're kept in the screenshot gallery
// artifact instead. It builds the site and serves the build on its own port
// (4390), so it runs beside a dev server, or the app's tests on 4321.
const phone = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true };
const wide = { viewport: { width: 1440, height: 900 } };

export default defineConfig({
  testDir: "screens",
  snapshotPathTemplate: "{testDir}/.shots/{projectName}/{arg}{ext}",
  // Always write the pictures, never compare them.
  updateSnapshots: "all",
  timeout: 60_000,
  workers: 2,
  reporter: [["list"]],
  use: { baseURL: "http://localhost:4390", browserName: "chromium", timezoneId: "UTC", locale: "en-US", colorScheme: "light" },
  expect: { toHaveScreenshot: { maxDiffPixels: 50, animations: "disabled", stylePath: "./screens/screens.css" } },
  webServer: {
    command: "npm run build && npx astro preview --port 4390",
    url: "http://localhost:4390",
    reuseExistingServer: false,
    timeout: 180_000,
  },
  projects: [
    { name: "phone", use: phone },
    { name: "wide", use: wide },
  ],
});
