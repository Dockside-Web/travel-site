import { getCollection, type CollectionEntry } from "astro:content";
import { getImage } from "astro:assets";

export type Post = CollectionEntry<"blog">;

/** All posts, newest first. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection("blog");
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Posts whose text links to a page, e.g. postsLinkingTo("/travel-map"). */
export async function postsLinkingTo(path: string): Promise<Post[]> {
  const link = new RegExp(`\\]\\(${path}(?:[#)])`);
  return (await getPosts()).filter((p) => link.test(p.body ?? ""));
}

/** "4 min read", at about 230 words a minute. */
export function readingTime(post: Post): string {
  const words = (post.body ?? "").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 230))} min read`;
}

/** "November 10, 2026". Dates are stored as UTC midnight, so format in UTC. */
export function formatDate(date: Date, month: "long" | "short" = "long"): string {
  return date.toLocaleDateString("en-US", { year: "numeric", month, day: "numeric", timeZone: "UTC" });
}

/** A photo cropped to 1200 × 630 for link previews (Facebook, iMessage, Slack…). */
export async function shareImage(src: ImageMetadata): Promise<string> {
  const img = await getImage({ src, width: 1200, height: 630, fit: "cover", format: "jpg", quality: 80 });
  return img.src;
}
