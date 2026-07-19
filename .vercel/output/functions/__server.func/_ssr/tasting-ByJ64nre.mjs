import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { i as useI18n, r as pickLang } from "./i18n-CruZlRQi.mjs";
import { t as supabase } from "./client-DkzpAgPX.mjs";
import { i as resolveImageUrl, r as IMAGES } from "./assets-DPl7XXdf.mjs";
import { i as Header, n as FloatingButtons, r as Footer } from "./FloatingButtons-CcRsYBkn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tasting-ByJ64nre.js
var import_jsx_runtime = require_jsx_runtime();
function TastingPage() {
	const { t, lang } = useI18n();
	const { data } = useQuery({
		queryKey: ["tastings-public"],
		queryFn: async () => {
			const { data, error } = await supabase.from("tastings").select("*").eq("active", true).order("sort_order");
			if (error) throw error;
			return data;
		}
	});
	const items = data ?? [];
	const fallback = [
		IMAGES.cellarBottles,
		IMAGES.cellarTable,
		IMAGES.maraniInterior,
		IMAGES.gardenPomegranate
	];
	const grouped = {};
	for (const it of items) {
		const key = it.category || "Other";
		(grouped[key] ||= []).push(it);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "pt-24 md:pt-32 pb-24 px-6 md:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-5xl mx-auto text-center mb-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-center gap-3 mb-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-gold/60" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] uppercase tracking-[0.5em] text-gold",
									children: t("nav.tasting")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-gold/60" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-serif text-5xl md:text-7xl font-light",
							children: t("tasting.page.title")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-muted-foreground max-w-xl mx-auto",
							children: t("tasting.page.subtitle")
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-6xl mx-auto space-y-14",
					children: [Object.entries(grouped).map(([cat, list]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-3xl text-gold mb-6 pb-3 border-b border-gold/20",
						children: cat
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
						children: list.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "glass rounded-xl overflow-hidden group hover:border-gold/50 transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-[4/3] overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: resolveImageUrl(it.image_url) || fallback[i % fallback.length],
									alt: it.name,
									loading: "lazy",
									className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-serif text-2xl",
										children: pickLang(it, "name", lang) || it.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted-foreground leading-relaxed",
										children: pickLang(it, "description", lang) || it.description
									}),
									it.taste_notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-xs italic text-muted-foreground border-t border-border/50 pt-3",
										children: it.taste_notes
									})
								]
							})]
						}, it.id))
					})] }, cat)), items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-muted-foreground",
						children: "Tasting menu coming soon."
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingButtons, {})
		]
	});
}
//#endregion
export { TastingPage as component };
