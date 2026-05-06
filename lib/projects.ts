/**
 * Project / case study list.
 * The first ~12 entries become plates in the 3D parallax stack on the home page.
 *
 * Drop your own files into `public/media/` and reference as `/media/foo.jpg`.
 */

export type Project = {
  id: string;
  index: string;
  client: string;
  title: string;
  discipline: string[];
  year: number;
  cover: string;
};

export const projects: Project[] = [
  {
    id: "neon-archive",
    index: "01",
    client: "Maison Aurelle",
    title: "A season of soft brutalism",
    discipline: ["Art Direction", "Web", "Film"],
    year: 2025,
    cover: "https://images.unsplash.com/photo-1512446816042-444d641267d4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "atlas",
    index: "02",
    client: "Atlas Editions",
    title: "Editorial in motion",
    discipline: ["Identity", "Interaction"],
    year: 2025,
    cover: "https://images.unsplash.com/photo-1558865869-c93f6f8482af?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "nocturne",
    index: "03",
    client: "Nocturne Records",
    title: "An ambient catalog of nights",
    discipline: ["Brand", "Sound", "Spatial"],
    year: 2024,
    cover: "https://images.unsplash.com/photo-1518972559570-7cc1309f3229?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "orbit",
    index: "04",
    client: "Orbit Coffee",
    title: "Mornings, designed",
    discipline: ["Identity", "Packaging", "Web"],
    year: 2024,
    cover: "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "bleu-courant",
    index: "05",
    client: "Bleu Courant",
    title: "An ocean told in pixels",
    discipline: ["Web", "Film", "Sound"],
    year: 2024,
    cover: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "studio-twelve",
    index: "06",
    client: "Studio Twelve",
    title: "A monograph in motion",
    discipline: ["Editorial", "Interaction"],
    year: 2023,
    cover: "https://images.unsplash.com/photo-1504198266287-1659872e6590?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "vermeer-reverie",
    index: "07",
    client: "Vermeer Reverie",
    title: "Light, slowly",
    discipline: ["Film", "Spatial"],
    year: 2023,
    cover: "https://images.unsplash.com/photo-1502691876148-a84978e59af8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "kiln",
    index: "08",
    client: "Kiln Ceramics",
    title: "Hands and earth",
    discipline: ["Brand", "Web"],
    year: 2023,
    cover: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "voltaire",
    index: "09",
    client: "Maison Voltaire",
    title: "An archive in glass",
    discipline: ["Editorial", "Identity"],
    year: 2022,
    cover: "https://images.unsplash.com/photo-1495556650867-99590cea3657?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "sable",
    index: "10",
    client: "Sable",
    title: "A garment, breathing",
    discipline: ["Direction", "Film"],
    year: 2022,
    cover: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "iris",
    index: "11",
    client: "Iris Botanique",
    title: "A field guide to red",
    discipline: ["Brand", "Editorial"],
    year: 2022,
    cover: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ferment",
    index: "12",
    client: "Ferment Studio",
    title: "Living surfaces",
    discipline: ["Spatial", "Web"],
    year: 2022,
    cover: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
  },
];
