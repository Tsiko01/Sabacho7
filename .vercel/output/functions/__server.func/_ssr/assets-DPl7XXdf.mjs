//#region node_modules/.nitro/vite/services/ssr/assets/assets-DPl7XXdf.js
var IMAGES = {
	gazeboNight: "/photos/gazebo-night.webp",
	gardenLantern: "/photos/garden-lantern.webp",
	lampNight: "/photos/lamp-night.webp",
	cellarBottles: "/photos/cellar-bottles.webp",
	maraniInterior: "/photos/marani-interior.webp",
	cellarTable: "/photos/cellar-table.webp",
	gardenDay: "/photos/garden-day.webp",
	gardenPomegranate: "/photos/garden-pomegranate.webp",
	gardenPath: "/photos/garden-path.webp"
};
var HERO_VIDEO = "/photos/hero.mp4";
var HERO_FALLBACK = "/photos/gazebo-night.webp";
var LOVABLE_ASSET_RE = /^\/__l5e\/assets-v1\/[^/]+\/([^/]+)$/;
function resolveImageUrl(url) {
	if (!url) return null;
	const m = url.match(LOVABLE_ASSET_RE);
	if (m) return `/photos/${m[1]}`;
	return url;
}
IMAGES.gazeboNight, IMAGES.gardenLantern, IMAGES.lampNight, IMAGES.cellarBottles, IMAGES.maraniInterior, IMAGES.cellarTable, IMAGES.gardenDay, IMAGES.gardenPomegranate, IMAGES.gardenPath;
//#endregion
export { resolveImageUrl as i, HERO_VIDEO as n, IMAGES as r, HERO_FALLBACK as t };
