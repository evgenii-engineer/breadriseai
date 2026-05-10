/**
 * Bread Rise — case studies.
 * Files live in /public/media/<slug>/. The asset() helper in lib/utils
 * prepends the GitHub Pages basePath at runtime, so reference them as
 * "/media/<slug>/<file>" here.
 */

import { asset } from "@/lib/utils";

export type Project = {
  id: string;
  index: string;
  title: string;
  client?: string;
  year: number;
  discipline: string[];
  /** Service tags shown on the project detail page. */
  services?: string[];
  /** Long-form description. Use \n\n between paragraphs. */
  description?: string;
  /** Optional bullet list rendered under "Visual signatures". */
  visualSignatures?: string[];
  /** Optional bullet list rendered under "Designed for". */
  designedFor?: string[];
  /** First image is also used as the cover/headline plate. */
  gallery: string[];
};

const m = (slug: string, file: string) => asset(`/media/${slug}/${file}`);

export const projects: Project[] = [
  {
    id: "women-are-beautiful",
    index: "01",
    title: "Women Are Beautiful",
    client: "—",
    year: 2026,
    discipline: ["AI Production", "Editorial"],
    services: [
      "AI Editorial Production",
      "Creative Direction",
      "Visual Identity Systems",
      "Casting & Character Design",
      "Art Direction",
      "Digital Fashion Imagery",
    ],
    description:
      "“Women Are Beautiful” is an AI editorial study of femininity, age, and presence. The project rejects conventional beauty narratives in favor of raw elegance, emotional texture, and hyperreal visual storytelling.\n\nBuilt through AI production and editorial direction, the series transforms mature beauty into a striking visual statement, where skin, movement, vulnerability, and strength become the narrative itself. The result exists somewhere between luxury campaign imagery and synthetic documentation.",
    gallery: [
      m("women-are-beautiful", "IMG_3393.webp"),
      m("women-are-beautiful", "IMG_3392.webp"),
      m("women-are-beautiful", "IMG_3390.webp"),
      m("women-are-beautiful", "IMG_3388.webp"),
      m("women-are-beautiful", "IMG_3387.webp"),
      m("women-are-beautiful", "IMG_3385.jpg"),
      m("women-are-beautiful", "IMG_3384.webp"),
      m("women-are-beautiful", "IMG_3383.webp"),
      m("women-are-beautiful", "IMG_3382.webp"),
    ],
  },
  {
    id: "runway-training",
    index: "02",
    title: "Runway Training",
    client: "—",
    year: 2026,
    discipline: ["AI Production", "Direction", "Fashion"],
    services: [
      "AI Fashion Production",
      "Wearable Concept Design",
      "Creative Direction",
      "Movement Research",
      "Performance Styling",
      "Visual Campaign Development",
      "Fashion Narrative Systems",
    ],
    description:
      "“Runway Training” reimagines fashion through physical discipline and constructed beauty. Combining AI-generated fashion imagery with athletic environments, the project reframes the language of luxury fashion into a sweat-soaked, focused, and constantly observed.\n\nThe series merges gym culture with runway aesthetics, where strength becomes choreography and exhaustion turns into styling. Through exaggerated poses, athletic gear, hyperreal body language, the work examines how contemporary femininity is shaped through performance, pressure, and visibility.",
    gallery: [
      m("runway-training", "IMG_4065.webp"),
      m("runway-training", "IMG_4072.webp"),
      m("runway-training", "IMG_4073.webp"),
      m("runway-training", "IMG_4082.webp"),
      m("runway-training", "IMG_4122.jpg"),
      m("runway-training", "IMG_4131.webp"),
      m("runway-training", "IMG_4132.webp"),
      m("runway-training", "IMG_4134.webp"),
      m("runway-training", "IMG_4138.webp"),
      m("runway-training", "IMG_4160.webp"),
      m("runway-training", "IMG_4161.webp"),
      m("runway-training", "IMG_4162.webp"),
      m("runway-training", "IMG_4163.webp"),
    ],
  },
  {
    id: "wet",
    index: "03",
    title: "Wet",
    client: "—",
    year: 2026,
    discipline: ["AI Production", "Visual Identity"],
    services: [
      "AI Visual Production",
      "Beauty Art Direction",
      "Concept Development",
      "Editorial Image Systems",
      "Texture & Surface Research",
      "Digital Beauty Campaigns",
    ],
    description:
      "“Wet” explores the visual tension between intimacy, gloss, and artificial perfection. Through hyper-detailed AI imagery, the project transforms moisture, skin, reflection, and bodily texture into a controlled visual language suspended between beauty campaign and sensory study.\n\nRather than documenting the body naturally, the series exaggerates surface, shine, and physical detail until the images begin to feel almost synthetic: seductive, clinical, and emotionally distant at the same time. Every frame focuses on texture as identity: wet skin, breath, gloss, saliva, light.",
    gallery: [
      m("wet", "IMG_3948.webp"),
      m("wet", "IMG_3958.webp"),
      m("wet", "IMG_3960.webp"),
      m("wet", "IMG_3962.webp"),
      m("wet", "IMG_3964.webp"),
      m("wet", "IMG_3965.webp"),
      m("wet", "IMG_3966.webp"),
    ],
  },
  {
    id: "man-accessories",
    index: "04",
    title: "Man Accessories",
    client: "—",
    year: 2026,
    discipline: ["AI Production", "Editorial", "Direction"],
    services: [
      "AI Visual Production",
      "Beauty Art Direction",
      "Concept Development",
      "Editorial Image Systems",
      "Texture & Surface Research",
      "Digital Beauty Campaigns",
    ],
    description:
      "“Man Accessories” explores masculinity through restriction, ornament, and engineered identity. Using AI-generated editorial imagery, the project transforms metallic and architectural elements into the construction of the body, suspended between fashion accessory, protective armor, and invasive object.\n\nRather than functioning as wearable products, the pieces operate as visual statements: aggressive yet elegant, mechanical yet intimate. The series examines how masculinity can be constructed, exaggerated, and aestheticized through artificial design language and hyper-controlled imagery.",
    gallery: [
      m("man-accessories", "IMG_2966.webp"),
      m("man-accessories", "IMG_2980.webp"),
      m("man-accessories", "IMG_2985.jpg"),
      m("man-accessories", "IMG_2988.jpg"),
      m("man-accessories", "IMG_2996.webp"),
      m("man-accessories", "IMG_2997.webp"),
    ],
  },
  {
    id: "my-body-made-of-petals",
    index: "05",
    title: "My Body Made of Petals",
    client: "—",
    year: 2026,
    discipline: ["AI Production", "Editorial", "Fine Art"],
    services: [
      "Creative Direction",
      "AI Fashion Image Creation",
      "AI Fashion Video / Motion",
      "Visual Identity for Fashion & Beauty Brands",
      "Art Direction for Social Media",
    ],
    description:
      "My Body Made of Petals is a sensual high-fashion visual series exploring the transformation of the human body into living floral sculpture. Inspired by Vogue beauty editorials, luxury perfume campaigns, and contemporary body art photography, the project merges glossy skin, sculptural posing, and well flower petals into cinematic compositions.\n\nThe body becomes a canvas covered in luminous petals with an almost liquid texture: soft, reflective, organic, and surreal. Every frame is built around macro body details, dramatic studio lighting, rich black backgrounds, and couture-inspired floral styling.\n\nThe project exists between fashion photography, beauty campaigns, and fine art.",
    visualSignatures: [
      "Glossy oil-like petals",
      "Macro body compositions",
      "Black seamless background",
      "Cinematic studio light",
      "Artificial light on skin",
      "Sculptural feminine poses",
      "Luxury Vogue-inspired aesthetic",
      "Sensual but minimal visual language",
      "Floral body couture",
    ],
    designedFor: [
      "Fashion editorials",
      "Perfume & skincare brands",
      "Album covers",
      "Luxury visual identities",
      "Creative concept reels",
      "AI fashion campaigns",
    ],
    gallery: [],
  },
];

/** Cover (first) image of every project that actually has photos. */
export const covers = projects
  .filter((p) => p.gallery.length > 0)
  .map((p) => ({
    id: p.id,
    index: p.index,
    title: p.title,
    year: p.year,
    src: p.gallery[0],
  }));

export type Plate = {
  key: string;
  src: string;
  projectId: string;
  projectTitle: string;
  projectIndex: string;
};

/**
 * Flat list of every project image, tagged with its parent project.
 * Used by the 3D stack and the References wall.
 */
export const plates: Plate[] = projects.flatMap((p) =>
  p.gallery.map((src, i) => ({
    key: `${p.id}-${i}`,
    src,
    projectId: p.id,
    projectTitle: p.title,
    projectIndex: p.index,
  })),
);

/**
 * Standalone reference images that aren't part of any project's gallery.
 * Drop files into /public/media/references/ and append entries here.
 */
export const references: Plate[] = [];

/**
 * 12 plates for the hero stack — distributed across all projects so
 * every project shows up at least once.
 */
export const stackPlates: Plate[] = (() => {
  const out: Plate[] = [];
  let i = 0;
  while (out.length < 12 && i < 50) {
    for (const p of projects) {
      const img = p.gallery[i];
      if (!img) continue;
      out.push({
        key: `${p.id}-stack-${i}`,
        src: img,
        projectId: p.id,
        projectTitle: p.title,
        projectIndex: p.index,
      });
      if (out.length >= 12) break;
    }
    i += 1;
  }
  return out;
})();

/** Project plates + reference plates, used by the References wall. */
export const allReferencePlates: Plate[] = [...references, ...plates];
