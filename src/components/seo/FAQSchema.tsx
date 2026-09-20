import { buildFAQSchema } from "@/lib/seo";
import { Schema } from "./Schema";
import type { FAQItem } from "@/types/seo";

interface FAQSchemaProps {
  items: FAQItem[];
}

/**
 * Renders FAQPage JSON-LD schema.
 * Reusable for any page that has FAQ content.
 */
export function FAQSchema({ items }: FAQSchemaProps) {
  if (items.length === 0) return null;
  const schema = buildFAQSchema(items);
  return <Schema schema={schema} />;
}
