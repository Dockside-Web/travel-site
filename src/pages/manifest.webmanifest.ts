// Web app manifest (Android "Add to Home Screen", browser theming).
import type { APIRoute } from "astro";
import { existsSync } from "node:fs";
import { site } from "../site.config";

export const GET: APIRoute = () => {
  // Only lists icons that exist in /public.
  const icons = [192, 512]
    .filter((size) => existsSync(`public/icon-${size}.png`))
    .map((size) => ({ src: `/icon-${size}.png`, sizes: `${size}x${size}`, type: "image/png" }));

  const manifest = Object.fromEntries(
    Object.entries({
      name: site.name,
      short_name: site.name,
      description: site.description,
      start_url: "/",
      display: "browser",
      theme_color: site.themeColor,
      background_color: "#ffffff",
      icons,
    }).filter(([, v]) => v !== "" && !(Array.isArray(v) && v.length === 0)),
  );

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { "Content-Type": "application/manifest+json" },
  });
};
