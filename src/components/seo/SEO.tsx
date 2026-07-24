import { useMemo } from "react";
import { generateSEO, seoMetaToEntries, getGlobalLinks } from "@/lib/seo";
import type { SEOInput } from "@/types/seo";

interface SEOProps extends SEOInput {
  scripts?: React.ReactNode;
}

/**
 * Reusable SEO component that generates all meta tags, links, and scripts.
 * Place inside the `head` function of a TanStack route.
 * Returns { meta, links } that can be spread into the head config.
 */
export function useSEO(options: SEOInput = {}) {
  return useMemo(() => {
    const seo = generateSEO(options);
    const meta = seoMetaToEntries(seo);
    const links = getGlobalLinks();
    return { meta, links };
  }, [options.title, options.description, options.keywords, options.ogImage, options.noindex, options.nofollow, options.canonicalPath]);
}

/**
 * For inline usage in route `head` functions.
 * This creates the meta array directly without React hooks.
 */
export function seoHead(options: SEOInput = {}) {
  const seo = generateSEO(options);
  const meta = seoMetaToEntries(seo);
  const links = getGlobalLinks();
  return { meta, links };
}