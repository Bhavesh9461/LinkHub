/**
 * If /public/icons/{id}.png is missing or fails to load, LinkCard falls
 * back to a Remix Icon class instead of a broken <Image>. Add an entry
 * here for any new link id you add to data/links.js.
 */
export const iconFallbacks = {
  portfolio: "ri-global-line",
  instagram: "ri-instagram-line",
  twitter: "ri-twitter-x-line",
  youtube: "ri-youtube-line",
  discord: "ri-discord-line",
  steam: "ri-steam-fill",
  xbox: "ri-xbox-line",
  spotify: "ri-spotify-line",
  github: "ri-github-line",
  linkedin: "ri-linkedin-box-line",
  email: "ri-mail-line",
  phone: "ri-phone-line",
};

export const DEFAULT_ICON_FALLBACK = "ri-links-line";
