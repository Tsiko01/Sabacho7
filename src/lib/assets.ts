export const IMAGES = {
  gazeboNight: "/photos/gazebo-night.webp",
  gardenLantern: "/photos/garden-lantern.webp",
  lampNight: "/photos/lamp-night.webp",
  cellarBottles: "/photos/cellar-bottles.webp",
  maraniInterior: "/photos/marani-interior.webp",
  cellarTable: "/photos/cellar-table.webp",
  gardenDay: "/photos/garden-day.webp",
  gardenPomegranate: "/photos/garden-pomegranate.webp",
  gardenPath: "/photos/garden-path.webp",
};

export const HERO_VIDEO = "/photos/hero.mp4";
// Fallback hero background image if video fails / hasn't loaded
export const HERO_FALLBACK = "/photos/gazebo-night.webp";

const LOVABLE_ASSET_RE = /^\/__l5e\/assets-v1\/[^/]+\/([^/]+)$/;
export function resolveImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const m = url.match(LOVABLE_ASSET_RE);
  if (m) return `/photos/${m[1]}`;
  return url;
}

export type GalleryCategory = "winery" | "wines" | "vineyard" | "food" | "guests" | "atmosphere";

export const GALLERY: { src: string; category: GalleryCategory; alt: string }[] = [
  { src: IMAGES.gazeboNight, category: "atmosphere", alt: "Sabacho gazebo at night under a full moon" },
  { src: IMAGES.gardenLantern, category: "atmosphere", alt: "Garden lantern at Sabacho at night" },
  { src: IMAGES.lampNight, category: "atmosphere", alt: "Stone lamp column at night" },
  { src: IMAGES.cellarBottles, category: "wines", alt: "Aged wine bottles in the Sabacho cellar" },
  { src: IMAGES.maraniInterior, category: "winery", alt: "Traditional Sabacho marani interior" },
  { src: IMAGES.cellarTable, category: "winery", alt: "Hand-carved wooden table in the cellar" },
  { src: IMAGES.gardenDay, category: "vineyard", alt: "Sabacho garden by daylight" },
  { src: IMAGES.gardenPomegranate, category: "vineyard", alt: "Pomegranate trees in the Sabacho garden" },
  { src: IMAGES.gardenPath, category: "vineyard", alt: "Stone path through the vineyard" },
];