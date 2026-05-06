/**
 * Single source of truth for site metadata, copy, and content.
 * Edit this file to change headlines, project list, and other text.
 */

export const site = {
  name: "Elsewhere Studio",
  shortName: "Elsewhere",
  domain: "breadriseai.com",
  description:
    "An independent studio building cinematic digital experiences for fashion, culture and forward-thinking brands.",
  email: "studio@elsewhere.studio",
  location: "Paris · Lisbon · Remote",
  availability: "Booking projects · winter 2026",
  social: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "Are.na", href: "https://are.na/" },
    { label: "Vimeo", href: "https://vimeo.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
  ],
  navigation: [
    { label: "Index", href: "#index" },
    { label: "Work", href: "#work" },
    { label: "Studio", href: "#studio" },
    { label: "Manifesto", href: "#manifesto" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export type Site = typeof site;
