import { readdirSync } from "node:fs";
import { expect, test } from "@playwright/test";

// Every page on the site, each as one picture, on a phone and a wide screen.
// The blog's posts are found from src/content/blog, so a new post gets its
// picture by itself; a new page goes in PAGES.
const PAGES: [string, string][] = [
  ["home", "/"],
  ["travel-map", "/travel-map"],
  ["countries-visited", "/countries-visited"],
  ["split-trip-costs", "/split-trip-costs"],
  ["share-travel-tips", "/share-travel-tips"],
  ["blog", "/blog"],
  ["contact", "/contact"],
  ["privacy", "/privacy"],
  ["terms", "/terms"],
  ["not-found", "/no-such-page"],
];

const posts = readdirSync("src/content/blog")
  .filter((f) => f.endsWith(".md"))
  .map((f) => f.replace(/\.md$/, ""));
for (const slug of posts) PAGES.push([`blog-${slug}`, `/blog/${slug}`]);

for (const [name, path] of PAGES) {
  test(name, async ({ page }) => {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    // Photos load lazily: load them all now, and wait until each can be drawn.
    await page.evaluate(async () => {
      const images = Array.from(document.images);
      for (const img of images) img.loading = "eager";
      await Promise.all(
        images.map((img) =>
          img.complete
            ? img.decode().catch(() => {})
            : new Promise((r) => {
                img.addEventListener("load", r, { once: true });
                img.addEventListener("error", r, { once: true });
              }),
        ),
      );
    });
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot(`${name}.png`, {
      fullPage: true,
      // The departure board's letters flip by themselves: the whole board is masked.
      mask: [page.locator(".board")],
      timeout: 15_000,
    });
  });
}
