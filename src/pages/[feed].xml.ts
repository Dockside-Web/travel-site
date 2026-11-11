// The blog's RSS feed, at /rss.xml. A feed needs full addresses, so it's only
// built once `url` is set in src/site.config.ts (until then there's no file).
import rss from "@astrojs/rss";
import type { APIRoute, GetStaticPaths } from "astro";
import { site } from "../site.config";
import { getPosts } from "../lib/blog";

export const getStaticPaths = (() => (site.url ? [{ params: { feed: "rss" } }] : [])) satisfies GetStaticPaths;

export const GET: APIRoute = async (context) => {
  const posts = await getPosts();
  return rss({
    title: `${site.name} blog`,
    description: "Notes on keeping track of your travels: maps, journals, the spots worth going back to, and splitting the costs.",
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      author: post.data.author,
      link: `/blog/${post.id}`,
    })),
    customData: `<language>${site.lang}</language>`,
  });
};
