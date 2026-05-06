/**
 * Single source of truth for site metadata, copy, and content.
 * Edit this file to change headlines, project list, and other text.
 */

export const site = {
  name: "Bread Rise",
  shortName: "Bread Rise",
  brandMark: "Bread Rise",
  domain: "breadriseai.com",
  description:
    "An independent studio building cinematic, mouse-driven digital experiences for fashion, culture and forward-thinking brands.",
  email: "studio@breadriseai.com",
  location: "Paris · Lisbon · Remote",
  availability: "Booking projects · Q3 2026",
  social: [
    { label: "Instagram", href: "https://instagram.com/breadrise_ai" },
    { label: "Are.na", href: "https://are.na/" },
    { label: "Vimeo", href: "https://vimeo.com/" },
    { label: "TikTok", href: "https://www.tiktok.com/@breadrise_ai" },
  ],
  navigation: [
    { label: "Projects", href: "#projects" },
    { label: "Research", href: "#research" },
    { label: "Studio", href: "#studio" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export type Site = typeof site;
