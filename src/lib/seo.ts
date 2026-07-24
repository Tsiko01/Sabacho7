import type { SEOInput, SEOMeta, MetaEntry, LinkEntry, BreadcrumbItem, OrganizationData, FAQItem, JsonLdEntry } from "@/types/seo";
import { SOCIALS, EMAIL, PHONE_INTL, PHONE, MAPS_URL } from "@/lib/constants";

// ─── Environment & Defaults ───────────────────────────────────────────────────

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://www.sabacho.ge";
const SITE_NAME = import.meta.env.VITE_SITE_NAME || "SABACHO Marani";
const DEFAULT_OG_IMAGE = import.meta.env.VITE_DEFAULT_OG_IMAGE || `${SITE_URL}/logo.png`;
const TWITTER_HANDLE = import.meta.env.VITE_TWITTER_HANDLE || "@sabacho_marani";
const AUTHOR = "Sabacho Marani";
const CREATOR = "Sabacho Marani";
const PUBLISHER = "Sabacho Marani";
const OG_LOCALE = "en_GE";
const OG_IMAGE_WIDTH = "1200";
const OG_IMAGE_HEIGHT = "630";
const TWITTER_SITE = TWITTER_HANDLE;

export const SEO_DEFAULTS = {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  TWITTER_HANDLE,
  AUTHOR,
  CREATOR,
  PUBLISHER,
  OG_LOCALE,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
  TWITTER_SITE,
};

// ─── Canonical URL Builder ────────────────────────────────────────────────────

export function buildCanonical(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean === "/" ? "" : clean}`;
}

// ─── SEO Meta Generator ───────────────────────────────────────────────────────

export function generateSEO(input: SEOInput = {}): SEOMeta {
  const {
    title,
    description,
    keywords = "Sabacho, Georgian wine, Kakheti winery, wine tasting Georgia, qvevri wine, Georgian supra, Tbilisi wine tour, Sabacho Marani, private wine cellar Georgia, chacha, cognac Georgia, eastern Georgia wine",
    ogImage = DEFAULT_OG_IMAGE,
    noindex = false,
    nofollow = false,
    canonicalPath,
  } = input;

  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const canonical = canonicalPath !== undefined ? buildCanonical(canonicalPath) : undefined;
  const robots = noindex && nofollow
    ? "noindex, nofollow"
    : noindex
      ? "noindex, follow"
      : nofollow
        ? "index, nofollow"
        : "index, follow";

  return {
    title: fullTitle,
    description,
    keywords,
    canonical,
    robots,
    ogTitle: fullTitle,
    ogDescription: description,
    ogType: "website",
    ogUrl: canonical,
    ogImage,
    ogImageWidth: OG_IMAGE_WIDTH,
    ogImageHeight: OG_IMAGE_HEIGHT,
    ogLocale: OG_LOCALE,
    ogSiteName: SITE_NAME,
    twitterCard: "summary_large_image",
    twitterTitle: fullTitle,
    twitterDescription: description,
    twitterImage: ogImage,
    twitterSite: TWITTER_SITE,
    twitterCreator: TWITTER_HANDLE,
    author: AUTHOR,
    creator: CREATOR,
    publisher: PUBLISHER,
    noindex,
    nofollow,
  };
}

// ─── Meta Converter (SEOMeta → MetaEntry[]) ───────────────────────────────────

export function seoMetaToEntries(meta: SEOMeta): MetaEntry[] {
  const entries: MetaEntry[] = [];

  if (meta.title) entries.push({ title: meta.title });
  if (meta.description) entries.push({ name: "description", content: meta.description });
  if (meta.keywords) entries.push({ name: "keywords", content: meta.keywords });
  if (meta.canonical) entries.push({ name: "canonical", content: meta.canonical });
  if (meta.robots) entries.push({ name: "robots", content: meta.robots });
  if (meta.author) entries.push({ name: "author", content: meta.author });
  if (meta.creator) entries.push({ name: "creator", content: meta.creator });
  if (meta.publisher) entries.push({ name: "publisher", content: meta.publisher });

  // Open Graph
  if (meta.ogTitle) entries.push({ property: "og:title", content: meta.ogTitle });
  if (meta.ogDescription) entries.push({ property: "og:description", content: meta.ogDescription });
  if (meta.ogType) entries.push({ property: "og:type", content: meta.ogType });
  if (meta.ogUrl) entries.push({ property: "og:url", content: meta.ogUrl });
  if (meta.ogImage) entries.push({ property: "og:image", content: meta.ogImage });
  if (meta.ogImageWidth) entries.push({ property: "og:image:width", content: meta.ogImageWidth });
  if (meta.ogImageHeight) entries.push({ property: "og:image:height", content: meta.ogImageHeight });
  if (meta.ogLocale) entries.push({ property: "og:locale", content: meta.ogLocale });
  if (meta.ogSiteName) entries.push({ property: "og:site_name", content: meta.ogSiteName });

  // Twitter
  if (meta.twitterCard) entries.push({ name: "twitter:card", content: meta.twitterCard });
  if (meta.twitterTitle) entries.push({ name: "twitter:title", content: meta.twitterTitle });
  if (meta.twitterDescription) entries.push({ name: "twitter:description", content: meta.twitterDescription });
  if (meta.twitterImage) entries.push({ name: "twitter:image", content: meta.twitterImage });
  if (meta.twitterSite) entries.push({ name: "twitter:site", content: meta.twitterSite });
  if (meta.twitterCreator) entries.push({ name: "twitter:creator", content: meta.twitterCreator });

  // Security meta
  entries.push({ name: "referrer", content: "strict-origin-when-cross-origin" });
  entries.push({ name: "theme-color", content: "#0a0a0a" });
  entries.push({ name: "color-scheme", content: "dark" });
  entries.push({ name: "format-detection", content: "telephone=yes, address=yes" });

  // Search console verification placeholder
  const googleVerification = import.meta.env.VITE_GOOGLE_VERIFICATION;
  if (googleVerification) {
    entries.push({ name: "google-site-verification", content: googleVerification });
  }

  return entries;
}

// ─── Security & Utility Links ─────────────────────────────────────────────────

export function getGlobalLinks(): LinkEntry[] {
  return [
    { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    { rel: "icon", href: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    { rel: "icon", href: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
    { rel: "manifest", href: "/site.webmanifest" },
    { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#a67c52" },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  ];
}

// ─── JSON-LD Schema Builders ──────────────────────────────────────────────────

const organizationData: OrganizationData = {
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  telephone: PHONE_INTL,
  email: EMAIL,
  address: {
    streetAddress: "Sabacho Village",
    addressLocality: "Kakheti",
    addressRegion: "Kakheti",
    postalCode: "0900",
    addressCountry: "GE",
  },
  sameAs: [SOCIALS.facebook, SOCIALS.instagram, SOCIALS.tiktok, SOCIALS.youtube],
};

export function buildOrganizationSchema(): JsonLdEntry {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: organizationData.name,
    url: organizationData.url,
    logo: organizationData.logo,
    telephone: organizationData.telephone,
    email: organizationData.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: organizationData.address.streetAddress,
      addressLocality: organizationData.address.addressLocality,
      addressRegion: organizationData.address.addressRegion,
      postalCode: organizationData.address.postalCode,
      addressCountry: organizationData.address.addressCountry,
    },
    sameAs: organizationData.sameAs,
  };
}

export function buildWebSiteSchema(): JsonLdEntry {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildLocalBusinessSchema(): JsonLdEntry {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    image: `${SITE_URL}/logo.png`,
    url: SITE_URL,
    telephone: PHONE_INTL,
    email: EMAIL,
    description: "Private Georgian winery in Kakheti offering wine tastings, Supra feasts, Chacha and aged Cognac experiences.",
    priceRange: "₾50–₾200",
    address: {
      "@type": "PostalAddress",
      streetAddress: organizationData.address.streetAddress,
      addressLocality: organizationData.address.addressLocality,
      addressRegion: organizationData.address.addressRegion,
      postalCode: organizationData.address.postalCode,
      addressCountry: organizationData.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.6727913,
      longitude: 45.6769744,
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "10:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "10:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "10:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "10:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "10:00", closes: "22:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "22:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "12:00", closes: "18:00" },
    ],
    sameAs: organizationData.sameAs,
  };
}

export function buildProfessionalServiceSchema(): JsonLdEntry {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: SITE_URL,
    telephone: PHONE_INTL,
    description: "Family-run Georgian winery and hospitality service in Kakheti.",
    areaServed: "Kakheti, Georgia",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Wine Experiences",
      itemListElement: [
        { "@type": "Offer", name: "Wine Tasting", description: "Guided cellar wine tasting experience" },
        { "@type": "Offer", name: "Supra Feast", description: "Traditional Georgian supra with wine and food" },
        { "@type": "Offer", name: "Private Evening", description: "Exclusive private evening at the marani" },
      ],
    },
  };
}

export function buildServiceSchema(): JsonLdEntry {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Sabacho Wine Experiences",
    serviceType: "Wine Tasting & Hospitality",
    provider: {
      "@type": "LocalBusiness",
      name: SITE_NAME,
    },
    areaServed: "Kakheti, Georgia",
    description: "Wine tasting, Supra feasts, Chacha and aged Cognac experiences at a private Georgian marani.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Experiences",
      itemListElement: [
        { "@type": "Offer", name: "Wine Tasting", price: "Starting from ₾50" },
        { "@type": "Offer", name: "Supra Feast", price: "Starting from ₾100" },
        { "@type": "Offer", name: "Private Evening", price: "Starting from ₾200" },
      ],
    },
  };
}

export function buildPersonSchema(): JsonLdEntry {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Madonna Jolokhava",
    givenName: "Madonna",
    familyName: "Jolokhava",
    email: EMAIL,
    telephone: PHONE_INTL,
    jobTitle: "Owner & Host",
    url: SITE_URL,
    sameAs: [SOCIALS.facebook, SOCIALS.instagram],
    knowsAbout: ["Georgian wine", "Qvevri winemaking", "Kakhetian hospitality", "Georgian supra traditions"],
    affiliation: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): JsonLdEntry {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      item: `${SITE_URL}${item.item}`,
    })),
  };
}

export function buildFAQSchema(faqs: FAQItem[]): JsonLdEntry {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildWebPageSchema(title: string, description: string, path: string): JsonLdEntry {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: description,
    url: buildCanonical(path),
    isPartOf: {
      "@type": "WebSite",
      url: SITE_URL,
    },
  };
}

export function buildContactPageSchema(): JsonLdEntry {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: buildCanonical("/contact"),
    description: "Contact Sabacho Marani for reservations and inquiries.",
  };
}

// ─── Schema String Builder ────────────────────────────────────────────────────

export function toJsonLdString(schema: JsonLdEntry | JsonLdEntry[]): string {
  const data = Array.isArray(schema) ? schema : [schema];
  return JSON.stringify(data, null, 2);
}

// ─── Page-specific SEO presets ─────────────────────────────────────────────────

export const PAGE_SEO = {
  home: {
    title: "Georgian Wine Experience in Kakheti",
    description: "Private Georgian winery in Kakheti. Wine tasting, Supra feasts, Chacha and aged Cognac. Reserve your Sabacho experience.",
    keywords: "Sabacho, Georgian wine, Kakheti winery, wine tasting Georgia, qvevri wine, Georgian supra, Kakheti wine tour, Sabacho Marani, private wine cellar",
    canonicalPath: "/",
  },
  about: {
    title: "Our Story",
    description: "The story of Sabacho Marani — the family, the marani, the village, and the Georgian hospitality behind every glass.",
    canonicalPath: "/about",
  },
  contact: {
    title: "Contact & Reservations",
    description: "Reach Sabacho Marani in Kakheti, Georgia. Phone, WhatsApp, email and social links. Please contact us before visiting.",
    canonicalPath: "/contact",
  },
  gallery: {
    title: "Gallery",
    description: "Photographs from Sabacho Marani — the cellar, the garden, the Supra table, and the light of Kakheti.",
    canonicalPath: "/gallery",
  },
  tasting: {
    title: "Tasting Menu",
    description: "Wines, Chacha, aged Cognac and traditional Georgian pairings from Sabacho's private cellar.",
    canonicalPath: "/tasting",
  },
  notFound: {
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist or has been moved.",
    noindex: true,
    nofollow: true,
    canonicalPath: "/404",
  },
} as const;