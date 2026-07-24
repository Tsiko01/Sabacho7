import { buildBreadcrumbSchema } from "@/lib/seo";
import { Schema } from "./Schema";
import type { BreadcrumbItem } from "@/types/seo";

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

/**
 * Renders BreadcrumbList JSON-LD schema.
 * Items should be ordered from homepage to current page.
 */
export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  if (items.length === 0) return null;
  const schema = buildBreadcrumbSchema(items);
  return <Schema schema={schema} />;
}