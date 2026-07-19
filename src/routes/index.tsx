import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Star, Sparkles, Wine, Utensils, Check } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingButtons } from "@/components/site/FloatingButtons";
import { BookingForm } from "@/components/site/BookingForm";
import { DetailOverlay } from "@/components/site/DetailOverlay";
import { HERO_VIDEO, HERO_FALLBACK, IMAGES } from "@/lib/assets";
import { useI18n, pickLang } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import { SOCIALS, EMAIL, PHONE } from "@/lib/constants";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <About />
        <Experiences />
        <TastingTeaser />
        <Testimonials />
        <FAQ />
        <BookSection />
        <ContactStrip />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}

function Hero() {
  const { t } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOk, setVideoOk] = useState(true);

  useEffect(() => {
    if (videoRef.current) videoRef.current.play().catch(() => setVideoOk(false));
  }, []);

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
      <div className="absolute inset-0">
        {videoOk ? (
          <video
            ref={videoRef}
            src={HERO_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            poster={HERO_FALLBACK}
            onError={() => setVideoOk(false)}
            className="w-full h-full object-cover animate-kenburns"
          />
        ) : (
          <img src={HERO_FALLBACK} alt="Sabacho at night" className="w-full h-full object-cover animate-kenburns" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        <div className="animate-fadeup">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-10 bg-gold/60" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-gold">Kakheti · Georgia</span>
            <span className="h-px w-10 bg-gold/60" />
          </div>
          <h1 className="font-serif text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light leading-[0.95] drop-shadow-2xl tracking-[0.08em]">
            SABACHO
          </h1>
          <p className="mt-6 font-serif text-2xl md:text-3xl text-gold italic tracking-wide">
            Georgian Wine
          </p>
          <p className="mt-4 text-sm md:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
            {t("hero.subtitle")}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#book" className="border border-white/70 hover:border-gold hover:bg-gold/10 text-white px-8 py-3.5 rounded-md text-xs uppercase tracking-[0.3em] font-medium transition-all hover:scale-[1.03] backdrop-blur">
              {t("cta.book")}
            </a>
            <a href="#experiences" className="bg-carrot hover:bg-carrot-hover text-white px-8 py-3.5 rounded-md text-xs uppercase tracking-[0.3em] font-medium transition-all hover:scale-[1.03] shadow-2xl shadow-black/40">
              {t("cta.view_experiences")}
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 z-10">
        <div className="flex flex-col items-center gap-2 animate-pulse">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-8 bg-white/40" />
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-14">
      {eyebrow && (
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-8 bg-gold/60" />
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold">{eyebrow}</span>
          <span className="h-px w-8 bg-gold/60" />
        </div>
      )}
      <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05]">{title}</h2>
      {subtitle && <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed">{subtitle}</p>}
    </div>
  );
}

function About() {
  const { t } = useI18n();
  return (
    <section id="about" className="relative py-24 md:py-32 px-6 md:px-8">
      <div className="max-w-7xl mx-auto grid gap-14 md:grid-cols-2 items-center">
        <div className="relative order-2 md:order-1">
          <div className="grid grid-cols-2 gap-4">
            <img src={IMAGES.maraniInterior} alt="Sabacho marani interior" loading="lazy" className="rounded-lg w-full aspect-[3/4] object-cover" />
            <div className="space-y-4 pt-10">
              <img src={IMAGES.cellarTable} alt="Cellar table" loading="lazy" className="rounded-lg w-full aspect-[4/5] object-cover" />
              <img src={IMAGES.gardenDay} alt="Garden" loading="lazy" className="rounded-lg w-full aspect-square object-cover" />
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 hidden md:block glass rounded-lg px-5 py-3">
            <div className="font-serif text-2xl text-gold">Sabacho</div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Est. Kakheti</div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-gold/60" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-gold">{t("nav.about")}</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05]">{t("about.title")}</h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">{t("about.body")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Badge>{t("about.badge_years")}</Badge>
            <Badge>{t("about.badge_qvevri")}</Badge>
            <Badge>{t("about.badge_kakheti")}</Badge>
          </div>
          <div className="mt-8">
            <Link to="/about" className="inline-flex items-center gap-2 text-gold hover:brightness-125 text-xs uppercase tracking-[0.3em] border-b border-gold/40 pb-1">
              {t("cta.read_story")} <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="border border-gold/40 text-gold px-3 py-1.5 rounded-full text-[11px] uppercase tracking-[0.2em]">{children}</span>;
}

function Experiences() {
  const { t } = useI18n();
  const [open, setOpen] = useState<null | "wine" | "supra">(null);
  const scrollToBook = () => document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
  return (
    <section id="experiences" className="relative py-24 md:py-32 px-6 md:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow={t("exp.eyebrow")} title={t("exp.subtitle")} />
        <div className="grid gap-6 md:grid-cols-2">
          <ExperienceCard
            image={IMAGES.cellarTable}
            title={t("exp.wine.title")}
            price={t("exp.wine.price")}
            items={[t("exp.wine.i1"), t("exp.wine.i2"), t("exp.wine.i3"), t("exp.wine.i4")]}
            icon={<Wine className="w-5 h-5" />}
            onOpen={() => setOpen("wine")}
          />
          <ExperienceCard
            image={IMAGES.gazeboNight}
            title={t("exp.supra.title")}
            price={t("exp.supra.price")}
            items={[t("exp.supra.i1"), t("exp.supra.i2"), t("exp.supra.i3"), t("exp.supra.i4")]}
            icon={<Utensils className="w-5 h-5" />}
            onOpen={() => setOpen("supra")}
          />
        </div>

        <div className="mt-8 relative overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/10 via-background to-background p-8 md:p-12">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-gold/10 blur-3xl" />
          <div className="relative flex flex-col md:flex-row md:items-center gap-6">
            <Sparkles className="w-10 h-10 text-gold shrink-0" />
            <div className="flex-1">
              <h3 className="font-serif text-3xl md:text-4xl text-gold">{t("exp.private.title")}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed max-w-2xl">{t("exp.private.body")}</p>
            </div>
            <a href="#book" onClick={(e) => { e.preventDefault(); scrollToBook(); }} className="shrink-0 border border-gold hover:bg-gold hover:text-black text-gold px-6 py-3 rounded-md text-xs uppercase tracking-[0.25em] transition-all cursor-pointer">
              {t("cta.reserve")}
            </a>
          </div>
        </div>
      </div>

      <DetailOverlay
        open={open === "wine"}
        onClose={() => setOpen(null)}
        eyebrow={t("exp.wine.title")}
        image={IMAGES.cellarTable}
        title={t("exp.wine.title")}
        intro="A guided journey through our family cellar — from qvevri to bottle. Traditional Kakhetian wines, aged Chacha, and 10-year Cognac, poured slowly and paired with warm Georgian snacks."
        sections={[
          { label: "Duration", value: "60–90 minutes" },
          { label: "From", value: t("exp.wine.price") },
          { label: "What you'll taste", value: `• ${t("exp.wine.i1")}\n• ${t("exp.wine.i2")}\n• ${t("exp.wine.i3")}\n• ${t("exp.wine.i4")}` },
          { label: "Atmosphere", value: "Candlelit stone cellar, hand-carved wooden table, family host guiding every pour." },
          { label: "Private option", value: "Reserve in advance to make the evening yours alone — with wines chosen specially for your group." },
        ]}
        onBook={scrollToBook}
        bookLabel={t("cta.book_wine")}
      />

      <DetailOverlay
        open={open === "supra"}
        onClose={() => setOpen(null)}
        eyebrow={t("exp.supra.title")}
        image={IMAGES.gazeboNight}
        title={t("exp.supra.title")}
        intro="The Supra is not a dinner — it is Georgia at its table. A tamada leads the toasts, the wine keeps pouring, and stories become part of the meal. You do not simply eat and drink; you are welcomed into a family."
        sections={[
          { label: "Duration", value: "2.5 – 3 hours" },
          { label: "From", value: t("exp.supra.price") },
          { label: "Experience", value: `• ${t("exp.supra.i1")}\n• ${t("exp.supra.i2")}\n• ${t("exp.supra.i3")}\n• ${t("exp.supra.i4")}` },
          { label: "Georgian hospitality", value: "Toasts to peace, to family, to guests — a tradition that turns strangers into friends by the end of the evening." },
          { label: "The table", value: "Home-cooked Kakhetian dishes made by the family, served under the vine-covered gazebo or in the marani." },
        ]}
        onBook={scrollToBook}
        bookLabel={t("cta.book_supra")}
      />
    </section>
  );
}

function ExperienceCard({ image, title, price, items, icon, onOpen }: { image: string; title: string; price: string; items: string[]; icon: React.ReactNode; onOpen?: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group text-left relative overflow-hidden rounded-2xl border border-border/60 bg-card hover:border-gold/60 transition-all"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img src={image} alt={title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className="absolute bottom-4 left-6 text-[10px] uppercase tracking-[0.3em] text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">Discover →</span>
      </div>
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2 text-gold">{icon}<h3 className="font-serif text-2xl md:text-3xl text-foreground">{title}</h3></div>
          <span className="font-serif text-xl text-gold whitespace-nowrap">{price}</span>
        </div>
        <ul className="mt-5 space-y-2">
          {items.map((it, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><Check className="w-4 h-4 text-gold mt-0.5 shrink-0" />{it}</li>
          ))}
        </ul>
      </div>
    </button>
  );
}

function TastingTeaser() {
  const { t } = useI18n();
  return (
    <section className="relative py-20 md:py-28 px-6 md:px-8">
      <div className="max-w-6xl mx-auto relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-secondary via-background to-secondary/50">
        <div className="absolute inset-0">
          <img src={IMAGES.cellarBottles} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        </div>
        <div className="relative p-8 md:p-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-gold/60" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-gold">{t("nav.tasting")}</span>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl text-foreground">დეგუსტაცია</h2>
            <p className="mt-4 text-muted-foreground max-w-md leading-relaxed">{t("tasting.teaser.subtitle")}</p>
            <a href="/tasting" className="mt-8 inline-flex items-center gap-2 bg-gold hover:brightness-110 text-black px-7 py-3.5 rounded-md text-xs uppercase tracking-[0.25em] font-medium transition-all hover:scale-[1.03]">
              {t("cta.view_tasting")} <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <img src={IMAGES.cellarBottles} alt="" loading="lazy" className="rounded-lg aspect-square object-cover" />
            <img src={IMAGES.cellarTable} alt="" loading="lazy" className="rounded-lg aspect-square object-cover mt-8" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const { t } = useI18n();
  const items = [
    { name: "Anna & Marco", country: "Italy", rating: 5, review: "The best evening of our Georgia trip. The family hosted us like their own — cellar tour, unforgettable wine, a Supra that lasted hours." },
    { name: "Daniel Peters", country: "Germany", rating: 5, review: "Authentic in a way you can't fake. The qvevri wine and 10-year cognac were extraordinary. Highly recommend booking the private evening." },
    { name: "Ivanna Kovalenko", country: "Ukraine", rating: 5, review: "Дуже теплий прийом, справжня грузинська гостинність. Вина неймовірні, чача — окрема пісня. Обов'язково повернемось." },
    { name: "Emma R.", country: "United Kingdom", rating: 5, review: "Beautiful garden, candlelit stone cellar, wines with real character. This is what people mean when they say 'Georgian hospitality'." },
  ];
  return (
    <section className="relative py-24 md:py-32 px-6 md:px-8 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow={t("reviews.eyebrow")} title={t("testimonials.title")} />
        <div className="grid gap-5 md:grid-cols-2">
          {items.map((r, i) => (
            <div key={i} className="glass rounded-xl p-6">
              <div className="flex gap-1 text-gold mb-3">
                {Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed italic">"{r.review}"</p>
              <div className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">{r.name} · {r.country}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type FaqRow = { id: string; question: string; question_ka: string | null; question_ru: string | null; question_uk: string | null; answer: string; answer_ka: string | null; answer_ru: string | null; answer_uk: string | null; sort_order: number };

function FAQ() {
  const { t, lang } = useI18n();
  const { data } = useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const { data, error } = await supabase.from("faqs").select("*").eq("active", true).order("sort_order");
      if (error) throw error;
      return (data ?? []) as unknown as FaqRow[];
    },
  });
  const items = (data ?? []).map(r => ({
    q: pickLang(r, "question", lang) || r.question,
    a: pickLang(r, "answer", lang) || r.answer,
  }));
  const [open, setOpen] = useState<number | null>(0);
  if (items.length === 0) return null;
  return (
    <section className="relative py-24 md:py-32 px-6 md:px-8">
      <div className="max-w-3xl mx-auto">
        <SectionHeading eyebrow={t("faq.eyebrow")} title={t("faq.title")} />
        <div className="space-y-3">
          {items.map((it, i) => (
            <div key={i} className="border border-border/60 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpen(o => o === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-secondary/50 transition"
              >
                <span className="font-serif text-lg text-foreground">{it.q}</span>
                <ChevronRight className={`w-4 h-4 text-gold transition-transform ${open === i ? "rotate-90" : ""}`} />
              </button>
              {open === i && <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{it.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookSection() {
  const { t } = useI18n();
  return (
    <section id="book" className="relative py-24 md:py-32 px-6 md:px-8 bg-secondary/30">
      <div className="max-w-3xl mx-auto">
        <SectionHeading eyebrow={t("cta.book")} title={t("book.title")} subtitle={t("book.subtitle")} />
        <div className="glass rounded-2xl p-6 md:p-10">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}

function ContactStrip() {
  const { t } = useI18n();
  return (
    <section id="contact" className="relative py-16 md:py-20 px-6 md:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="h-px w-8 bg-gold/60" />
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold">{t("visit.eyebrow")}</span>
          <span className="h-px w-8 bg-gold/60" />
        </div>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          <a href={`tel:${PHONE}`} className="hover:text-gold">+995 {PHONE}</a> · <a href={`mailto:${EMAIL}`} className="hover:text-gold">{EMAIL}</a>
        </p>
        <div className="mt-4 flex items-center justify-center gap-4 text-xs uppercase tracking-[0.2em]">
          <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-gold">Instagram</a>
          <span className="text-border">·</span>
          <a href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-gold">Facebook</a>
          <span className="text-border">·</span>
          <a href={SOCIALS.tiktok} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-gold">TikTok</a>
        </div>
        <div className="mt-6">
          <Link to="/contact" className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-[0.3em] border-b border-gold/40 pb-1 hover:brightness-125">
            {t("cta.contact_info")} <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
