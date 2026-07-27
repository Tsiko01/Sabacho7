import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import { Toaster } from "sonner";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";
import { buildCanonical } from "@/lib/seo";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "404 - Page Not Found | SABACHO Marani",
          description: "The page you're looking for doesn't exist or has been moved.",
          url: buildCanonical("/404"),
        }),
      }} />
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SABACHO Marani — Georgian Wine Experience in Kakheti" },
      { name: "description", content: "Private Georgian winery in Kakheti. Wine tasting, Supra feasts, Chacha and aged Cognac. Reserve your Sabacho experience." },
      { name: "keywords", content: "Sabacho, Georgian wine, Kakheti winery, wine tasting Georgia, qvevri wine, Georgian supra, Kakheti wine tour, Sabacho Marani, private wine cellar" },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "Sabacho Marani" },
      { name: "creator", content: "Sabacho Marani" },
      { name: "publisher", content: "Sabacho Marani" },
      { name: "referrer", content: "strict-origin-when-cross-origin" },
      { name: "theme-color", content: "#0a0a0a" },
      { name: "color-scheme", content: "dark" },
      { name: "format-detection", content: "telephone=yes, address=yes" },
      { property: "og:title", content: "SABACHO Marani — Georgian Wine Experience in Kakheti" },
      { property: "og:description", content: "Private Georgian winery in Kakheti. Wine tasting, Supra feasts, Chacha and aged Cognac. Reserve your Sabacho experience." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.sabacho.ge" },
      { property: "og:image", content: "https://www.sabacho.ge/logo.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "en_GE" },
      { property: "og:site_name", content: "SABACHO Marani" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "SABACHO Marani — Georgian Wine Experience in Kakheti" },
      { name: "twitter:description", content: "Private Georgian winery in Kakheti. Wine tasting, Supra feasts, Chacha and aged Cognac. Reserve your Sabacho experience." },
      { name: "twitter:image", content: "https://www.sabacho.ge/logo.png" },
      { name: "twitter:site", content: "@sabacho_marani" },
      { name: "twitter:creator", content: "@sabacho_marani" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/logo.png", type: "image/png" },
      { rel: "shortcut icon", href: "/logo.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/logo.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "stylesheet", href: "/fonts/fonts.css", media: "print", onload: "this.media='all'" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
        {/* Preload hero poster image for LCP optimization */}
        <link rel="preload" href="/photos/gazebo-night.webp" as="image" type="image/webp" fetchPriority="high" />
        {/* Google Analytics 4 — loaded async to avoid blocking rendering */}
        {import.meta.env.VITE_GA_ID && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${import.meta.env.VITE_GA_ID}',{page_path:window.location.pathname});`,
              }}
            />
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_ID}`} />
          </>
        )}
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <I18nProvider>
          <OrganizationSchema />
          <Outlet />
          <Toaster theme="dark" position="top-center" richColors />
        </I18nProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}