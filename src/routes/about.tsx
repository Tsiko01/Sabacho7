import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingButtons } from "@/components/site/FloatingButtons";
import { supabase } from "@/integrations/supabase/client";
import { IMAGES, resolveImageUrl } from "@/lib/assets";
import { useI18n, pickLang } from "@/lib/i18n";
import { Schema } from "@/components/seo/Schema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { buildWebPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story | SABACHO Marani" },
      { name: "description", content: "The story of Sabacho Marani — the family, the marani, the village, and the Georgian hospitality behind every glass." },
      { name: "keywords", content: "Sabacho story, Georgian winery family, Kakheti marani, Georgian wine tradition, Sabacho Marani history, Georgian wine family" },
      { name: "robots", content: "index, follow" },
      { name: "canonical", content: "https://www.sabacho.ge/about" },
      { property: "og:title", content: "Our Story | SABACHO Marani" },
      { property: "og:description", content: "The story of Sabacho Marani — the family, the marani, the village, and the Georgian hospitality behind every glass." },
      { property: "og:url", content: "https://www.sabacho.ge/about" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Our Story | SABACHO Marani" },
      { name: "twitter:description", content: "The story of Sabacho Marani — the family, the marani, the village, and the Georgian hospitality behind every glass." },
    ],
    links: [],
  }),
  component: AboutPage,
});

type AboutContent = {
  hero_title?: string; hero_title_ka?: string; hero_title_ru?: string; hero_title_uk?: string;
  hero_subtitle?: string; hero_subtitle_ka?: string; hero_subtitle_ru?: string; hero_subtitle_uk?: string;
  hero_image?: string;
  owner_name?: string; owner_name_ka?: string; owner_name_ru?: string; owner_name_uk?: string;
  owner_role?: string; owner_role_ka?: string; owner_role_ru?: string; owner_role_uk?: string;
  owner_bio?: string; owner_bio_ka?: string; owner_bio_ru?: string; owner_bio_uk?: string;
  owner_image?: string;
  hosts?: { name: string; role: string; bio: string; image?: string }[];
  marani_title?: string; marani_title_ka?: string; marani_title_ru?: string; marani_title_uk?: string;
  marani_body?: string; marani_body_ka?: string; marani_body_ru?: string; marani_body_uk?: string;
  marani_image?: string;
  village_title?: string; village_title_ka?: string; village_title_ru?: string; village_title_uk?: string;
  village_body?: string; village_body_ka?: string; village_body_ru?: string; village_body_uk?: string;
  village_image?: string;
  cta_title?: string; cta_title_ka?: string; cta_title_ru?: string; cta_title_uk?: string;
  cta_body?: string; cta_body_ka?: string; cta_body_ru?: string; cta_body_uk?: string;
};

function AboutPage() {
  const { t, lang } = useI18n();
  const { data } = useQuery({
    queryKey: ["site_content", "about_page"],
    queryFn: async () => {
      const { data } = await supabase.from("site_content").select("value").eq("key", "about_page").maybeSingle();
      return (data?.value as AboutContent) ?? {};
    },
  });
  const c = data ?? {};
  const heroImg = resolveImageUrl(c.hero_image) || IMAGES.gazeboNight;
  const maraniImg = resolveImageUrl(c.marani_image) || IMAGES.cellarBottles;
  const villageImg = resolveImageUrl(c.village_image) || IMAGES.gardenPath;

  const heroTitle = pickLang(c, "hero_title", lang) || t("about.hero_title_default");
  const heroSubtitle = pickLang(c, "hero_subtitle", lang) || t("about.hero_subtitle_default");
  const maraniTitle = pickLang(c, "marani_title", lang) || t("about.marani_title_default");
  const maraniBody = pickLang(c, "marani_body", lang) || t("about.marani_body_default");
  const villageTitle = pickLang(c, "village_title", lang) || t("about.village_title_default");
  const villageBody = pickLang(c, "village_body", lang) || t("about.village_body_default");
  const ctaTitle = pickLang(c, "cta_title", lang) || t("about.cta_title_default");
  const ctaBody = pickLang(c, "cta_body", lang) || t("about.cta_body_default");
  const ownerName = pickLang(c, "owner_name", lang) || t("about.owner_name_default");
  const ownerRole = pickLang(c, "owner_role", lang) || t("about.owner_role_default");
  const ownerBio = pickLang(c, "owner_bio", lang) || t("about.owner_bio_default");

  return (
    <div className="bg-background text-foreground">
      <Header />
      <main>
        {/* HERO */}
        <section className="relative h-[85vh] min-h-[540px] overflow-hidden" aria-label={t("about.our_story")}>
          <img src={heroImg} alt="" decoding="async" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover animate-kenburns" aria-hidden="true" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-background" />
          <div className="relative h-full flex flex-col justify-center items-center text-center px-6 z-10">
            <div className="flex items-center gap-3 mb-6 animate-fade-in">
              <span className="h-px w-10 bg-gold/60" aria-hidden="true" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-gold">{t("about.our_story")}</span>
              <span className="h-px w-10 bg-gold/60" aria-hidden="true" />
            </div>
            <h1 className="font-serif text-white text-5xl sm:text-7xl md:text-8xl font-light leading-[0.95] drop-shadow-2xl animate-fade-in">
              {heroTitle}
            </h1>
            <p className="mt-6 text-white/85 max-w-2xl mx-auto text-base md:text-lg leading-relaxed animate-fade-in">
              {heroSubtitle}
            </p>
          </div>
        </section>

        {/* MARANI */}
        <section className="relative py-24 md:py-32 px-6 md:px-8 bg-secondary/30" aria-label={maraniTitle}>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <img src={maraniImg} alt={maraniTitle} loading="lazy" decoding="async" className="rounded-2xl w-full aspect-[4/5] object-cover" width={800} height={1000} />
            <div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-gold mb-3">{t("about.marani_eyebrow")}</div>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-tight">{maraniTitle}</h2>
              <p className="mt-6 text-muted-foreground leading-relaxed md:text-lg whitespace-pre-line">{maraniBody}</p>
            </div>
          </div>
        </section>

        {/* PEOPLE */}
        <section className="relative py-24 md:py-32 px-6 md:px-8" aria-label={t("about.people_title")}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
                <span className="text-[10px] uppercase tracking-[0.5em] text-gold">{t("about.people_eyebrow")}</span>
                <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
              </div>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light">{t("about.people_title")}</h2>
            </div>

            {/* Owner + Hosts as compact circular portraits */}
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              <ProfileCard name={ownerName} role={ownerRole} bio={ownerBio} image={c.owner_image} />
              {(c.hosts ?? []).map((h, i) => (
                <ProfileCard key={i} name={h.name} role={h.role} bio={h.bio} image={h.image} />
              ))}
            </div>
          </div>
        </section>

        {/* VILLAGE */}
        <section className="relative py-24 md:py-32 px-6 md:px-8" aria-label={villageTitle}>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="md:order-2">
              <img src={villageImg} alt={villageTitle} loading="lazy" decoding="async" className="rounded-2xl w-full aspect-[4/5] object-cover" width={800} height={1000} />
            </div>
            <div className="md:order-1">
              <div className="text-[10px] uppercase tracking-[0.4em] text-gold mb-3">{t("about.village_eyebrow")}</div>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-tight">{villageTitle}</h2>
              <p className="mt-6 text-muted-foreground leading-relaxed md:text-lg whitespace-pre-line">{villageBody}</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-24 md:py-32 px-6 md:px-8 bg-gradient-to-b from-background to-secondary/40" aria-label={ctaTitle}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-4xl md:text-6xl font-light leading-tight text-gold">{ctaTitle}</h2>
            <p className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed">{ctaBody}</p>
            <Link to="/" hash="book" className="mt-10 inline-flex items-center gap-2 bg-carrot hover:bg-carrot-hover text-white px-10 py-4 rounded-md text-xs uppercase tracking-[0.3em] font-medium transition-all hover:scale-[1.03] shadow-2xl">
              {t("cta.book")}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
      <BreadcrumbSchema items={[{ name: "Home", item: "/", position: 1 }, { name: "Our Story", item: "/about", position: 2 }]} />
      <Schema schema={buildWebPageSchema("Our Story | SABACHO Marani", "The story of Sabacho Marani — the family, the marani, the village, and the Georgian hospitality behind every glass.", "/about")} />
    </div>
  );
}

function ProfileCard({ name, role, bio, image }: { name?: string; role?: string; bio?: string; image?: string }) {
  const resolved = resolveImageUrl(image);
  return (
    <div className="text-center">
      <div className="mx-auto w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border border-gold/40 shadow-xl shadow-black/40 bg-secondary/40">
        {resolved ? (
          <img src={resolved} alt={name ?? ""} loading="lazy" decoding="async" className="w-full h-full object-cover" width={128} height={128} />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-serif text-4xl text-gold/50" aria-hidden="true">{(name ?? "S").slice(0, 1)}</div>
        )}
      </div>
      {role && <div className="mt-4 text-[10px] uppercase tracking-[0.4em] text-gold">{role}</div>}
      {name && <h3 className="font-serif text-2xl mt-1">{name}</h3>}
      {bio && <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{bio}</p>}
    </div>
  );
}