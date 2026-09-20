import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://www.sabacho.ge";

const entries = [
  { path: "/", priority: "1.0", changefreq: "weekly" as const, lastmod: "2026-09-16" },
  { path: "/about", priority: "0.8", changefreq: "monthly" as const, lastmod: "2026-09-16" },
  { path: "/contact", priority: "0.7", changefreq: "monthly" as const, lastmod: "2026-09-16" },
  { path: "/gallery", priority: "0.6", changefreq: "weekly" as const, lastmod: "2026-09-16" },
  { path: "/tasting", priority: "0.8", changefreq: "weekly" as const, lastmod: "2026-09-16" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = entries
          .map(
            (e) =>
              `  <url><loc>${SITE_URL}${e.path}</loc><lastmod>${e.lastmod}</lastmod><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`
          )
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});