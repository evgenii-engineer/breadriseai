/**
 * Single source of truth for site metadata, copy, and links.
 */

export const site = {
  name: "Bread Rise",
  shortName: "Bread Rise",
  brandMark: "Bread Rise",
  domain: "breadriseai.com",
  description:
    "Cinematic moments, made with AI. Direction, editorial and visual identity for fashion, culture and forward-thinking brands.",
  location: "Lisbon",
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
