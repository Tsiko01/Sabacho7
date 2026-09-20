import {
  buildOrganizationSchema,
  buildWebSiteSchema,
  buildLocalBusinessSchema,
  buildProfessionalServiceSchema,
  buildPersonSchema,
} from "@/lib/seo";
import { Schema } from "./Schema";

/**
 * Renders all global organization-level JSON-LD schemas.
 * Should be placed once in the root layout.
 */
export function OrganizationSchema() {
  const schemas = [
    buildOrganizationSchema(),
    buildWebSiteSchema(),
    buildLocalBusinessSchema(),
    buildProfessionalServiceSchema(),
    buildPersonSchema(),
  ];
  return <Schema schema={schemas} />;
}
