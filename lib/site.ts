/**
 * Single source of truth for site metadata, copy, and links.
 */

export const site = {
  name: "Bread Rise",
  shortName: "Bread Rise",
  brandMark: "Bread Rise",
  domain: "breadriseai.com",
  description:
    "Bread Rise is an AI-native creative studio in Lisbon. Cinematic editorial direction, fashion imagery and visual identity for forward-thinking brands.",
  /** Used as the SEO meta description and the OG description. */
  shortDescription:
    "AI-native creative studio in Lisbon. Cinematic direction, editorial and visual identity.",
  location: "Lisbon",
  /** Light theme color used in <meta name="theme-color">. Matches --bg. */
  themeColor: "#ffffff",
  /** Brand accent. Used by the favicon SVG and PWA icon mask. */
  accent: "#0645AD",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/breadrise_ai" },
    { label: "TikTok", href: "https://www.tiktok.com/@breadrise_ai" },
    { label: "Pinterest", href: "https://pt.pinterest.com/hlebniikovva/" },
  ],
  /** Primary social used as the contact action. */
  contact: {
    label: "Instagram",
    handle: "@breadrise_ai",
    href: "https://www.instagram.com/breadrise_ai",
  },
} as const;

export type Site = typeof site;
