/**
 * Bread Rise — case studies.
 * Files live in /public/media/<slug>/. The asset() helper in lib/utils
 * prepends the GitHub Pages basePath at runtime, so reference them as
 * "/media/<slug>/<file>" here.
 *
 * To add a new project: drop the images into /public/media/<slug>/,
 * append an entry below, and the site picks it up — the 3D stack, the
 * Index list and the Research grid all read from this file.
 */

import { asset } from "@/lib/utils";

export type Project = {
  id: string;
  index: string;
  title: string;
  client?: string;
  year: number;
  discipline: string[];
  /** First image is also used as the cover/headline plate. */
  gallery: string[];
};

const m = (slug: string, file: string) => asset(`/media/${slug}/${file}`);

export const projects: Project[] = [
  {
    id: "women-are-beautiful",
    index: "01",
    title: "Women are beautiful",
    year: 2025,
    discipline: ["Direction", "AI Production", "Editorial"],
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
    title: "Runway training",
    year: 2025,
    discipline: ["Direction", "Motion", "Fashion"],
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
    year: 2024,
    discipline: ["AI Production", "Visual Identity"],
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
    title: "Man accessories",
    year: 2024,
    discipline: ["Direction", "Editorial", "AI Production"],
    gallery: [
      m("man-accessories", "IMG_2966.webp"),
      m("man-accessories", "IMG_2980.webp"),
      m("man-accessories", "IMG_2985.jpg"),
      m("man-accessories", "IMG_2988.jpg"),
      m("man-accessories", "IMG_2996.webp"),
      m("man-accessories", "IMG_2997.webp"),
    ],
  },
];

/** Cover (first) image of every project. */
export const covers = projects.map((p) => ({
  id: p.id,
  index: p.index,
  title: p.title,
  year: p.year,
  src: p.gallery[0],
}));

/**
 * Flat list of every image in every project, tagged with its parent
 * project. Used by the 3D stack and the Research grid so the visuals
 * have variety even when the project count is small.
 */
export type Plate = {
  key: string;
  src: string;
  projectId: string;
  projectTitle: string;
  projectIndex: string;
};

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
 * 12 plates for the hero stack — distributed across all projects so
 * every project shows up.
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
