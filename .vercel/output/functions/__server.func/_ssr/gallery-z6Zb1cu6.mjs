import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, n as useQuery, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { i as useI18n } from "./i18n-QYYPNaBp.mjs";
import { t as supabase } from "./client-DkzpAgPX.mjs";
import { i as resolveImageUrl } from "./assets-DPl7XXdf.mjs";
import { A as ChevronLeft, k as ChevronRight, n as X } from "../_libs/lucide-react.mjs";
import { i as Header, n as FloatingButtons, r as Footer } from "./FloatingButtons-DdwIOsSi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gallery-z6Zb1cu6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATEGORIES = [
	"yard",
	"night",
	"marani",
	"wine"
];
function GalleryPage() {
	const { t } = useI18n();
	const [filter, setFilter] = (0, import_react.useState)("all");
	const { data } = useQuery({
		queryKey: ["gallery"],
		queryFn: async () => {
			const { data, error } = await supabase.from("gallery_images").select("id, image_url, alt, category").eq("active", true).order("sort_order");
			if (error) throw error;
			return data;
		}
	});
	const all = data ?? [];
	const rows = (0, import_react.useMemo)(() => filter === "all" ? all : all.filter((r) => (r.category ?? "").toLowerCase() === filter), [all, filter]);
	const [openIdx, setOpenIdx] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setOpenIdx(null);
	}, [filter]);
	(0, import_react.useEffect)(() => {
		if (openIdx === null) return;
		const onKey = (e) => {
			if (e.key === "Escape") setOpenIdx(null);
			if (e.key === "ArrowRight") setOpenIdx((i) => i === null ? 0 : (i + 1) % rows.length);
			if (e.key === "ArrowLeft") setOpenIdx((i) => i === null ? 0 : (i - 1 + rows.length) % rows.length);
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [openIdx, rows.length]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "pt-24 md:pt-32 pb-24 px-6 md:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center mb-14",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-center gap-3 mb-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-gold/60" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] uppercase tracking-[0.5em] text-gold",
										children: "Gallery"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-gold/60" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-serif text-5xl md:text-6xl lg:text-7xl font-light",
								children: t("gallery.title")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-muted-foreground max-w-xl mx-auto text-sm md:text-base",
								children: t("gallery.subtitle")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 flex flex-wrap justify-center gap-2 text-[10px] uppercase tracking-[0.3em]",
								children: ["all", ...CATEGORIES].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setFilter(c),
									className: `px-4 py-2 rounded-full border transition ${filter === c ? "bg-gold text-black border-gold" : "border-border/60 text-muted-foreground hover:border-gold/60 hover:text-gold"}`,
									children: c === "all" ? t("gallery.all") : t(`gallery.filter.${c}`)
								}, c))
							})
						]
					}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center text-muted-foreground py-14 text-sm",
						children: t("gallery.empty")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]",
						children: rows.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setOpenIdx(i),
							className: "block w-full mb-4 overflow-hidden rounded-lg group relative animate-fade-in",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: resolveImageUrl(g.image_url) ?? "",
									alt: g.alt ?? "Sabacho",
									loading: "lazy",
									className: "w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-700"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors" }),
								g.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute top-3 left-3 bg-black/60 backdrop-blur border border-white/15 text-white text-[9px] uppercase tracking-[0.3em] px-3 py-1 rounded-full",
									children: t(`gallery.filter.${g.category}`) || g.category
								})
							]
						}, g.id))
					})]
				}), openIdx !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "fixed inset-0 bg-black/95 z-[70] flex items-center justify-center p-4 animate-fade-in",
					onClick: () => setOpenIdx(null),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "absolute top-4 right-4 md:top-6 md:right-6 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20",
							"aria-label": "Close",
							onClick: (e) => {
								e.stopPropagation();
								setOpenIdx(null);
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "absolute left-3 md:left-6 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20",
							"aria-label": "Previous",
							onClick: (e) => {
								e.stopPropagation();
								setOpenIdx((i) => i === null ? 0 : (i - 1 + rows.length) % rows.length);
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "w-5 h-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "absolute right-3 md:right-6 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20",
							"aria-label": "Next",
							onClick: (e) => {
								e.stopPropagation();
								setOpenIdx((i) => i === null ? 0 : (i + 1) % rows.length);
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-5 h-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: resolveImageUrl(rows[openIdx].image_url) ?? "",
							alt: rows[openIdx].alt ?? "",
							onClick: (e) => e.stopPropagation(),
							className: "max-w-full max-h-full object-contain rounded-lg animate-scale-in"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingButtons, {})
		]
	});
}
//#endregion
export { GalleryPage as component };
