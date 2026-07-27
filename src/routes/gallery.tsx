import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingButtons } from "@/components/site/FloatingButtons";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";
import { resolveImageUrl } from "@/lib/assets";
import { Schema } from "@/components/seo/Schema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { buildWebPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | SABACHO Marani" },
      { name: "description", content: "Photographs from Sabacho Marani — the cellar, the garden, the Supra table, and the light of Kakheti." },
      { name: "keywords", content: "Sabacho Marani photos, Kakheti winery gallery, Georgian wine cellar photos, Sabacho garden, Georgian supra table" },
      { name: "robots", content: "index, follow" },
      { name: "canonical", content: "https://www.sabacho.ge/gallery" },
      { property: "og:title", content: "Gallery | SABACHO Marani" },
      { property: "og:description", content: "A visual journey through our Georgian family marani." },
      { property: "og:url", content: "https://www.sabacho.ge/gallery" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Gallery | SABACHO Marani" },
      { name: "twitter:description", content: "A visual journey through our Georgian family marani." },
    ],
    links: [],
  }),
  component: GalleryPage,
});

type GalleryRow = { id: string; image_url: string; alt: string | null; category: string | null };

const CATEGORIES = ["yard", "night", "marani", "wine"] as const;

function GalleryPage() {
  const { t } = useI18n();
  const [filter, setFilter] = useState<"all" | (typeof CATEGORIES)[number]>("all");
  const { data } = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const { data, error } = await supabase.from("gallery_images").select("id, image_url, alt, category").eq("active", true).order("sort_order");
      if (error) throw error;
      return data as unknown as GalleryRow[];
    },
  });
  const all = data ?? [];
  const rows = useMemo(() => filter === "all" ? all : all.filter(r => (r.category ?? "").toLowerCase() === filter), [all, filter]);

  const [openIdx, setOpenIdx] = useState<number | null>(null);
  useEffect(() => { setOpenIdx(null); }, [filter]);

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
      if (e.key === "ArrowRight") setOpenIdx(i => (i === null ? 0 : (i + 1) % rows.length));
      if (e.key === "ArrowLeft") setOpenIdx(i => (i === null ? 0 : (i - 1 + rows.length) % rows.length));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openIdx, rows.length]);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header />
      <main className="pt-24 md:pt-32 pb-24 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-gold">Gallery</span>
              <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light">{t("gallery.title")}</h1>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm md:text-base">{t("gallery.subtitle")}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-2 text-[10px] uppercase tracking-[0.3em]" role="group" aria-label="Filter gallery by category">
              {(["all", ...CATEGORIES] as const).map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  className={`px-4 py-2 rounded-full border transition ${filter === c ? "bg-gold text-black border-gold" : "border-border/60 text-muted-foreground hover:border-gold/60 hover:text-gold"}`}
                  aria-pressed={filter === c}
                >
                  {c === "all" ? t("gallery.all") : t(`gallery.filter.${c}`)}
                </button>
              ))}
            </div>
          </div>
          {rows.length === 0 ? (
            <div className="text-center text-muted-foreground py-14 text-sm">{t("gallery.empty")}</div>
          ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
            {rows.map((g, i) => (
              <button key={g.id} type="button" onClick={() => setOpenIdx(i)} className="block w-full mb-4 overflow-hidden rounded-lg group relative animate-fade-in" aria-label={g.alt ?? "Sabacho gallery image"}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={resolveImageUrl(g.image_url) ?? ""} alt={g.alt ?? "Sabacho"} loading="lazy" decoding="async" width={400} height={300} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors" />
                {g.category && <span className="absolute top-3 left-3 bg-black/60 backdrop-blur border border-white/15 text-white text-[9px] uppercase tracking-[0.3em] px-3 py-1 rounded-full">{t(`gallery.filter.${g.category}`) || g.category}</span>}
              </button>
            ))}
          </div>
          )}
        </div>

        {openIdx !== null && (
          <div className="fixed inset-0 bg-black/95 z-[70] flex items-center justify-center p-4 animate-fade-in" onClick={() => setOpenIdx(null)} role="dialog" aria-modal="true" aria-label="Image gallery lightbox">
            <button type="button" className="absolute top-4 right-4 md:top-6 md:right-6 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20" aria-label="Close" onClick={(e) => { e.stopPropagation(); setOpenIdx(null); }}><X className="w-5 h-5" aria-hidden="true" /></button>
            <button type="button" className="absolute left-3 md:left-6 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); setOpenIdx(i => i === null ? 0 : (i - 1 + rows.length) % rows.length); }}><ChevronLeft className="w-5 h-5" aria-hidden="true" /></button>
            <button type="button" className="absolute right-3 md:right-6 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20" aria-label="Next image" onClick={(e) => { e.stopPropagation(); setOpenIdx(i => i === null ? 0 : (i + 1) % rows.length); }}><ChevronRight className="w-5 h-5" aria-hidden="true" /></button>
            <img
              src={resolveImageUrl(rows[openIdx].image_url) ?? ""}
              alt={rows[openIdx].alt ?? "Sabacho gallery image"}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-full object-contain rounded-lg animate-scale-in"
            />
          </div>
        )}
      </main>
      <Footer />
      <FloatingButtons />
      <BreadcrumbSchema items={[{ name: "Home", item: "/", position: 1 }, { name: "Gallery", item: "/gallery", position: 2 }]} />
      <Schema schema={buildWebPageSchema("Gallery | SABACHO Marani", "Photographs from Sabacho Marani — the cellar, the garden, the Supra table, and the light of Kakheti.", "/gallery")} />
    </div>
  );
}