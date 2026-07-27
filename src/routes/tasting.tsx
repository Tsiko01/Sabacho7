import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingButtons } from "@/components/site/FloatingButtons";
import { supabase } from "@/integrations/supabase/client";
import { useI18n, pickLang } from "@/lib/i18n";
import { IMAGES, resolveImageUrl } from "@/lib/assets";
import { Schema } from "@/components/seo/Schema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { buildWebPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/tasting")({
  head: () => ({
    meta: [
      { title: "Tasting Menu | SABACHO Marani" },
      { name: "description", content: "Wines, Chacha, aged Cognac and traditional Georgian pairings from Sabacho's private cellar." },
      { name: "keywords", content: "Sabacho tasting menu, Georgian wine tasting, qvevri wine Kakheti, chacha tasting, Georgian cognac, Kakheti wine cellar tasting" },
      { name: "robots", content: "index, follow" },
      { name: "canonical", content: "https://www.sabacho.ge/tasting" },
      { property: "og:title", content: "Tasting Menu | SABACHO Marani" },
      { property: "og:description", content: "The complete Sabacho tasting list — wines, spirits, and pairings." },
      { property: "og:url", content: "https://www.sabacho.ge/tasting" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Tasting Menu | SABACHO Marani" },
      { name: "twitter:description", content: "The complete Sabacho tasting list — wines, spirits, and pairings." },
    ],
    links: [],
  }),
  component: TastingPage,
});

type Tasting = { id: string; name: string; name_ka: string | null; name_ru: string | null; name_uk: string | null; category: string | null; description: string | null; description_ka: string | null; description_ru: string | null; description_uk: string | null; taste_notes: string | null; image_url: string | null; sort_order: number };

function TastingPage() {
  const { t, lang } = useI18n();
  const { data } = useQuery({
    queryKey: ["tastings-public"],
    queryFn: async () => {
      const { data, error } = await supabase.from("tastings").select("*").eq("active", true).order("sort_order");
      if (error) throw error;
      return data as unknown as Tasting[];
    },
  });
  const items = data ?? [];
  const fallback = [IMAGES.cellarBottles, IMAGES.cellarTable, IMAGES.maraniInterior, IMAGES.gardenPomegranate];

  const grouped: Record<string, Tasting[]> = {};
  for (const it of items) {
    const key = it.category || "Other";
    (grouped[key] ||= []).push(it);
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header />
      <main className="pt-24 md:pt-32 pb-24 px-6 md:px-8">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-gold">{t("nav.tasting")}</span>
            <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-light">{t("tasting.page.title")}</h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">{t("tasting.page.subtitle")}</p>
        </div>

        <div className="max-w-6xl mx-auto space-y-14">
          {Object.entries(grouped).map(([cat, list]) => (
            <section key={cat} aria-label={cat}>
              <h2 className="font-serif text-3xl text-gold mb-6 pb-3 border-b border-gold/20">{cat}</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {list.map((it, i) => (
                  <article key={it.id} className="glass rounded-xl overflow-hidden group hover:border-gold/50 transition">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={resolveImageUrl(it.image_url) || fallback[i % fallback.length]} alt={it.name} loading="lazy" decoding="async" width={400} height={300} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-2xl">{pickLang(it, "name", lang) || it.name}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{pickLang(it, "description", lang) || it.description}</p>
                      {it.taste_notes && <p className="mt-3 text-xs italic text-muted-foreground border-t border-border/50 pt-3">{it.taste_notes}</p>}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
          {items.length === 0 && <p className="text-center text-muted-foreground">Tasting menu coming soon.</p>}
        </div>
      </main>
      <Footer />
      <FloatingButtons />
      <BreadcrumbSchema items={[{ name: "Home", item: "/", position: 1 }, { name: "Tasting Menu", item: "/tasting", position: 2 }]} />
      <Schema schema={buildWebPageSchema("Tasting Menu | SABACHO Marani", "Wines, Chacha, aged Cognac and traditional Georgian pairings from Sabacho's private cellar.", "/tasting")} />
    </div>
  );
}