import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react, r as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { t as I18nProvider } from "./i18n-QYYPNaBp.mjs";
import { t as supabase } from "./client-DkzpAgPX.mjs";
import { t as ThemeProvider } from "./theme-CDeDvAbH.mjs";
import { A as redirect, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DlRnN3is.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-C5V23BvC.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$15 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "SABACHO Marani — Georgian Wine Experience in Kakheti" },
			{
				name: "description",
				content: "Private Georgian winery in Kakheti. Wine tasting, Supra feasts, Chacha and aged Cognac. Reserve your Sabacho experience."
			},
			{
				name: "author",
				content: "Sabacho Marani"
			},
			{
				property: "og:title",
				content: "SABACHO Marani — Georgian Wine Experience in Kakheti"
			},
			{
				property: "og:description",
				content: "Private Georgian winery in Kakheti. Wine tasting, Supra feasts, Chacha and aged Cognac. Reserve your Sabacho experience."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "SABACHO Marani — Georgian Wine Experience in Kakheti"
			},
			{
				name: "twitter:description",
				content: "Private Georgian winery in Kakheti. Wine tasting, Supra feasts, Chacha and aged Cognac. Reserve your Sabacho experience."
			},
			{
				property: "og:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ca63ec91-7e80-48d3-842a-290cfe830bef/id-preview-fe6115bd--fce75d42-5762-4e17-bd83-b22b9d27a738.lovable.app-1784068056279.png"
			},
			{
				name: "twitter:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ca63ec91-7e80-48d3-842a-290cfe830bef/id-preview-fe6115bd--fce75d42-5762-4e17-bd83-b22b9d27a738.lovable.app-1784068056279.png"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$15.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(I18nProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			theme: "dark",
			position: "top-center",
			richColors: true
		})] }) })
	});
}
var $$splitComponentImporter$13 = () => import("./routes-p4giM8Ed.mjs");
var Route$14 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./route-Di7iQBCH.mjs");
var Route$13 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data } = await supabase.auth.getUser();
		if (!data.user) throw redirect({ to: "/admin/login" });
		const { data: isAdmin } = await supabase.rpc("has_role", {
			_user_id: data.user.id,
			_role: "admin"
		});
		if (!isAdmin) {
			await supabase.auth.signOut();
			throw redirect({ to: "/admin/login" });
		}
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./about-CqNsLXV7.mjs");
var Route$12 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About — SABACHO Marani" },
		{
			name: "description",
			content: "The story of Sabacho Marani — the family, the marani, the village, and the Georgian hospitality behind every glass."
		},
		{
			property: "og:title",
			content: "About — SABACHO Marani"
		},
		{
			property: "og:description",
			content: "A Georgian family marani in Kakheti. Meet the people, the place, and the tradition behind Sabacho."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./contact-DRgdCh8S.mjs");
var Route$11 = createFileRoute("/contact")({
	head: () => ({ meta: [
		{ title: "Contact — SABACHO Marani" },
		{
			name: "description",
			content: "Reach Sabacho Marani in Kakheti, Georgia. Phone, WhatsApp, email and social links. Please contact us before visiting — the marani is currently under restoration."
		},
		{
			property: "og:title",
			content: "Contact — SABACHO Marani"
		},
		{
			property: "og:description",
			content: "Get in touch with Sabacho Marani in Kakheti, Georgia."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./gallery-z6Zb1cu6.mjs");
var Route$10 = createFileRoute("/gallery")({
	head: () => ({ meta: [
		{ title: "Gallery — SABACHO Marani" },
		{
			name: "description",
			content: "Photographs from Sabacho Marani — the cellar, the garden, the Supra table, and the light of Kakheti."
		},
		{
			property: "og:title",
			content: "Gallery — SABACHO Marani"
		},
		{
			property: "og:description",
			content: "A visual journey through our Georgian family marani."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var BASE_URL = "";
var entries = [{
	path: "/",
	priority: "1.0",
	changefreq: "weekly"
}, {
	path: "/tasting",
	priority: "0.8",
	changefreq: "weekly"
}];
var Route$9 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map((e) => `  <url><loc>${BASE_URL}${e.path}</loc><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`).join("\n")}\n</urlset>`;
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$8 = () => import("./tasting-D6LlpmcY.mjs");
var Route$8 = createFileRoute("/tasting")({
	head: () => ({ meta: [
		{ title: "Tasting Menu — SABACHO Marani" },
		{
			name: "description",
			content: "Wines, Chacha, aged Cognac and traditional Georgian pairings from Sabacho's private cellar."
		},
		{
			property: "og:title",
			content: "Tasting Menu — SABACHO Marani"
		},
		{
			property: "og:description",
			content: "The complete Sabacho tasting list — wines, spirits, and pairings."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./admin-Dy0vxNho.mjs");
var Route$7 = createFileRoute("/_authenticated/admin")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./admin.login-DPnTfB4X.mjs");
var Route$6 = createFileRoute("/admin/login")({
	ssr: false,
	head: () => ({ meta: [{ title: "Admin — Sabacho" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./admin.index-DkKXpgDD.mjs");
var Route$5 = createFileRoute("/_authenticated/admin/")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./admin.about-GMWUgbDW.mjs");
var Route$4 = createFileRoute("/_authenticated/admin/about")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./admin.bookings-BjRHkREJ.mjs");
var Route$3 = createFileRoute("/_authenticated/admin/bookings")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./admin.faqs-CrDLnUnR.mjs");
var Route$2 = createFileRoute("/_authenticated/admin/faqs")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./admin.gallery-CFlvyL3i.mjs");
var Route$1 = createFileRoute("/_authenticated/admin/gallery")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./admin.tastings-DWAUXpqT.mjs");
var Route = createFileRoute("/_authenticated/admin/tastings")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$14.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$15
});
var AuthenticatedRouteRoute = Route$13.update({
	id: "/_authenticated",
	getParentRoute: () => Route$15
});
var AboutRoute = Route$12.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$15
});
var ContactRoute = Route$11.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$15
});
var GalleryRoute = Route$10.update({
	id: "/gallery",
	path: "/gallery",
	getParentRoute: () => Route$15
});
var SitemapDotxmlRoute = Route$9.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$15
});
var TastingRoute = Route$8.update({
	id: "/tasting",
	path: "/tasting",
	getParentRoute: () => Route$15
});
var AuthenticatedAdminRoute = Route$7.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AdminLoginRoute = Route$6.update({
	id: "/admin/login",
	path: "/admin/login",
	getParentRoute: () => Route$15
});
var AuthenticatedAdminIndexRoute = Route$5.update({
	id: "/",
	path: "/",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminRouteChildren = {
	AuthenticatedAdminAboutRoute: Route$4.update({
		id: "/about",
		path: "/about",
		getParentRoute: () => AuthenticatedAdminRoute
	}),
	AuthenticatedAdminBookingsRoute: Route$3.update({
		id: "/bookings",
		path: "/bookings",
		getParentRoute: () => AuthenticatedAdminRoute
	}),
	AuthenticatedAdminFaqsRoute: Route$2.update({
		id: "/faqs",
		path: "/faqs",
		getParentRoute: () => AuthenticatedAdminRoute
	}),
	AuthenticatedAdminGalleryRoute: Route$1.update({
		id: "/gallery",
		path: "/gallery",
		getParentRoute: () => AuthenticatedAdminRoute
	}),
	AuthenticatedAdminTastingsRoute: Route.update({
		id: "/tastings",
		path: "/tastings",
		getParentRoute: () => AuthenticatedAdminRoute
	}),
	AuthenticatedAdminIndexRoute
};
var AuthenticatedRouteRouteChildren = { AuthenticatedAdminRoute: AuthenticatedAdminRoute._addFileChildren(AuthenticatedAdminRouteChildren) };
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AboutRoute,
	ContactRoute,
	GalleryRoute,
	SitemapDotxmlRoute,
	TastingRoute,
	AdminLoginRoute
};
var routeTree = Route$15._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
