// Generated from site.config.ts so the sitemap URL is always correct.
import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const sitemap = site ? `\nSitemap: ${new URL("sitemap-index.xml", site).href}\n` : "";
  return new Response(`User-agent: *\nAllow: /\n${sitemap}`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
