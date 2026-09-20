import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, MapPin, Phone, Mail } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingButtons } from "@/components/site/FloatingButtons";
import { supabase } from "@/integrations/supabase/client";
import { EMAIL, MAPS_URL, PHONE, PHONE_INTL, SOCIALS, WHATSAPP_URL } from "@/lib/constants";
import { useI18n } from "@/lib/i18n";
import { Schema } from "@/components/seo/Schema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { buildWebPageSchema, buildContactPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Reservations | SABACHO Marani" },
      {
        name: "description",
        content:
          "Reach Sabacho Marani in Kakheti, Georgia. Phone, WhatsApp, email and social links. Please contact us before visiting — the marani is currently under restoration.",
      },
      {
        name: "keywords",
        content:
          "contact Sabacho Marani, Kakheti winery contact, Georgian wine reservation, Sabacho phone, Sabacho email, book wine tasting Georgia",
      },
      { name: "robots", content: "index, follow" },
      { name: "canonical", content: "https://www.sabacho.ge/contact" },
      { property: "og:title", content: "Contact & Reservations | SABACHO Marani" },
      {
        property: "og:description",
        content:
          "Get in touch with Sabacho Marani in Kakheti, Georgia. Phone, WhatsApp, email and social links.",
      },
      { property: "og:url", content: "https://www.sabacho.ge/contact" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Contact & Reservations | SABACHO Marani" },
      {
        name: "twitter:description",
        content:
          "Get in touch with Sabacho Marani in Kakheti, Georgia. Phone, WhatsApp, email and social links.",
      },
    ],
    links: [],
  }),
  component: ContactPage,
});

type Restoration = { active?: boolean; title?: string; body?: string };

function ContactPage() {
  const { t } = useI18n();
  const { data } = useQuery({
    queryKey: ["site_content", "restoration"],
    queryFn: async () => {
      const { data } = await supabase
        .from("site_content")
        .select("value")
        .eq("key", "restoration")
        .maybeSingle();
      return (data?.value as Restoration) ?? {};
    },
  });
  const restoration = data ?? {};

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header />
      <main className="pt-24 md:pt-32 pb-24 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-gold">
                {t("nav.contact")}
              </span>
              <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light">
              {t("contact.get_in_touch")}
            </h1>
          </div>

          {restoration.active !== false && (
            <div className="relative overflow-hidden rounded-2xl border border-gold/50 bg-gradient-to-br from-gold/15 via-background to-background p-6 md:p-10 mb-14 animate-fade-in">
              <div
                className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-gold/10 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative flex flex-col md:flex-row gap-5 md:gap-8">
                <div className="w-12 h-12 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0 border border-gold/40">
                  <AlertCircle className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] uppercase tracking-[0.4em] text-gold mb-2">
                    {t("restoration.eyebrow")}
                  </div>
                  <h2 className="font-serif text-2xl md:text-4xl leading-tight text-foreground">
                    {restoration.title || t("restoration.title")}
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed md:text-lg">
                    {restoration.body || t("restoration.body")}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] text-white px-6 py-3 rounded-md text-xs uppercase tracking-[0.25em] hover:brightness-110 transition"
                      aria-label={t("restoration.whatsapp")}
                    >
                      {t("restoration.whatsapp")}
                    </a>
                    <a
                      href={`tel:${PHONE_INTL}`}
                      className="border border-gold text-gold hover:bg-gold hover:text-black px-6 py-3 rounded-md text-xs uppercase tracking-[0.25em] transition"
                      aria-label={t("restoration.call")}
                    >
                      {t("restoration.call")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="space-y-6">
              <ContactRow
                icon={<MapPin className="w-5 h-5" aria-hidden="true" />}
                label={t("contact.location_label")}
                value={t("contact.address")}
                href={MAPS_URL}
                external
              />
              <ContactRow
                icon={<Phone className="w-5 h-5" aria-hidden="true" />}
                label={t("contact.phone_label")}
                value={`+995 ${PHONE}`}
                href={`tel:${PHONE_INTL}`}
              />
              <ContactRow
                icon={<Mail className="w-5 h-5" aria-hidden="true" />}
                label={t("contact.email_label")}
                value={EMAIL}
                href={`mailto:${EMAIL}`}
              />
              <div className="border-t border-border/60 pt-6">
                <div className="text-[10px] uppercase tracking-[0.4em] text-gold mb-3">
                  {t("contact.follow")}
                </div>
                <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em]">
                  <a
                    href={SOCIALS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-border/60 hover:border-gold hover:text-gold px-4 py-2 rounded-full transition"
                    aria-label="Visit our Instagram page"
                  >
                    Instagram
                  </a>
                  <a
                    href={SOCIALS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-border/60 hover:border-gold hover:text-gold px-4 py-2 rounded-full transition"
                    aria-label="Visit our Facebook page"
                  >
                    Facebook
                  </a>
                  <a
                    href={SOCIALS.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-border/60 hover:border-gold hover:text-gold px-4 py-2 rounded-full transition"
                    aria-label="Visit our TikTok page"
                  >
                    TikTok
                  </a>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-border/60 hover:border-gold hover:text-gold px-4 py-2 rounded-full transition"
                    aria-label="Contact us on WhatsApp"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
              <div className="pt-4">
                <Link
                  to="/"
                  hash="book"
                  className="inline-flex items-center gap-2 bg-carrot hover:bg-carrot-hover text-white px-8 py-3.5 rounded-md text-xs uppercase tracking-[0.3em] font-medium transition-all hover:scale-[1.02]"
                >
                  {t("cta.reserve_evening")}
                </Link>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border/60 aspect-[4/3]">
              <iframe
                src="https://www.google.com/maps?q=41.6727913,45.6769744&hl=en&z=16&output=embed"
                title="Sabacho Winery location"
                loading="lazy"
                className="w-full h-full"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ aspectRatio: "4/3" }}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingButtons />
      <BreadcrumbSchema
        items={[
          { name: "Home", item: "/", position: 1 },
          { name: "Contact", item: "/contact", position: 2 },
        ]}
      />
      <Schema
        schema={buildWebPageSchema(
          "Contact & Reservations | SABACHO Marani",
          "Reach Sabacho Marani in Kakheti, Georgia. Phone, WhatsApp, email and social links.",
          "/contact",
        )}
      />
      <Schema schema={buildContactPageSchema()} />
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-start gap-4 group"
    >
      <span
        className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0 border border-gold/30 group-hover:bg-gold group-hover:text-black transition"
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          {label}
        </span>
        <span className="block text-base text-foreground group-hover:text-gold transition break-words">
          {value}
        </span>
      </span>
    </a>
  );
}
