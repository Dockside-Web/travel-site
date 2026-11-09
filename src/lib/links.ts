import { site } from "../site.config";

/** A link into the app, e.g. appLink("/signup"). */
export const appLink = (path: string) => `${site.app.url}${path}`;

export const signupUrl = appLink("/signup");
export const loginUrl = appLink("/login");
// Signs the visitor in to the read-only demo account (the app's /demo route).
export const demoUrl = appLink("/demo");
