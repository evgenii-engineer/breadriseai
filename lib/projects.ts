/**
 * Project / case study list shown on the home page.
 * Add or remove items here — sections re-render automatically.
 *
 * Image and video URLs are external by default to avoid shipping
 * binary assets in the scaffold. Drop your own files into `public/media/`
 * and reference them as `/media/your-file.jpg` (the Image helper handles
 * the GitHub Pages basePath).
 */

export type Project = {
  id: string;
  index: string;
  client: string;
  title: string;
  discipline: string[];
  year: number;
  cover: string;
  /** Optional accent color sampled from the artwork. */
  accent?: string;
};

export const projects: Project[] = [
  {
    id: "neon-archive",
    index: "01",
    client: "Maison Aurelle",
    title: "A season of soft brutalism",
    discipline: ["Art Direction", "Web", "Film"],
    year: 2025,
    cover:
      "https://images.unsplash.com/photo-1512446816042-444d641267d4?auto=format&fit=crop&w=1600&q=80",
    accent: "#c46a3d",
  },
  {
    id: "atlas-interactive",
    index: "02",
    client: "Atlas Editions",
    title: "Editorial in motion",
    discipline: ["Identity", "Interaction"],
    year: 2025,
    cover:
      "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?auto=format&fit=crop&w=1600&q=80",
    accent: "#7e8c6e",
  },
  {
    id: "nocturne",
    index: "03",
    client: "Nocturne Records",
    title: "An ambient catalog of nights",
    discipline: ["Brand", "Sound", "Spatial"],
    year: 2024,
    cover:
      "https://images.unsplash.com/photo-1483084537434-eaf024518c8b?auto=format&fit=crop&w=1600&q=80",
    accent: "#4f5d75",
  },
  {
    id: "orbit",
    index: "04",
    client: "Orbit Coffee",
    title: "Mornings, designed",
    discipline: ["Identity", "Packaging", "Web"],
    year: 2024,
    cover:
      "https://images.unsplash.com/photo-1442975631115-c4f7b05b6b3a?auto=format&fit=crop&w=1600&q=80",
    accent: "#b6855a",
  },
  {
    id: "bleu-courant",
    index: "05",
    client: "Bleu Courant",
    title: "An ocean told in pixels",
    discipline: ["Web", "Film", "Sound"],
    year: 2024,
    cover:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    accent: "#3a6b8a",
  },
  {
    id: "studio-twelve",
    index: "06",
    client: "Studio Twelve",
    title: "A monograph in motion",
    discipline: ["Editorial", "Interaction"],
    year: 2023,
    cover:
      "https://images.unsplash.com/photo-1504198266287-1659872e6590?auto=format&fit=crop&w=1600&q=80",
    accent: "#8a7a6b",
  },
];
