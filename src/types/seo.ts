export interface SEOMeta {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogUrl?: string;
  ogImage?: string;
  ogImageWidth?: string;
  ogImageHeight?: string;
  ogLocale?: string;
  ogSiteName?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterSite?: string;
  twitterCreator?: string;
  author?: string;
  creator?: string;
  publisher?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export interface SEOInput {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  noindex?: boolean;
  nofollow?: boolean;
  canonicalPath?: string;
}

export interface MetaEntry {
  title?: string;
  name?: string;
  property?: string;
  content?: string;
  charSet?: string;
}

export interface LinkEntry {
  rel: string;
  href: string;
  type?: string;
  crossOrigin?: "anonymous" | "use-credentials" | undefined;
  sizes?: string;
  color?: string;
  as?: string;
  fetchPriority?: "high" | "low" | "auto";
}

export interface HeadOutput {
  meta: MetaEntry[];
  links: LinkEntry[];
}

export interface JsonLdEntry {
  "@context": "https://schema.org";
  "@type": string;
  [key: string]: unknown;
}

export interface BreadcrumbItem {
  name: string;
  item: string;
  position: number;
}

export interface OrganizationData {
  name: string;
  url: string;
  logo: string;
  telephone: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  sameAs: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}