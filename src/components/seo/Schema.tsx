import { toJsonLdString } from "@/lib/seo";
import type { JsonLdEntry } from "@/types/seo";

interface SchemaProps {
  schema: JsonLdEntry | JsonLdEntry[];
}

/**
 * Renders JSON-LD structured data as a script tag.
 * Place in the component body (not head).
 */
export function Schema({ schema }: SchemaProps) {
  const json = toJsonLdString(schema);
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
