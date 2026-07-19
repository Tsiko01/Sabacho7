import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { i as useI18n } from "./i18n-CruZlRQi.mjs";
import { t as supabase } from "./client-DkzpAgPX.mjs";
import { i as resolveImageUrl, r as IMAGES } from "./assets-DPl7XXdf.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Header, n as FloatingButtons, r as Footer } from "./FloatingButtons-CcRsYBkn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-BuW1HmOF.js
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
	const { t } = useI18n();
	const { data } = useQuery({
		queryKey: ["site_content", "about_page"],
		queryFn: async () => {
			const { data } = await supabase.from("site_content").select("value").eq("key", "about_page").maybeSingle();
			return data?.value ?? {};
		}
	});
	const c = data ?? {};
	const heroImg = resolveImageUrl(c.hero_image) || IMAGES.gazeboNight;
	const maraniImg = resolveImageUrl(c.marani_image) || IMAGES.cellarBottles;
	const villageImg = resolveImageUrl(c.village_image) || IMAGES.gardenPath;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "relative h-[85vh] min-h-[540px] overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: heroImg,
							alt: "",
							className: "absolute inset-0 w-full h-full object-cover animate-kenburns"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-background" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative h-full flex flex-col justify-center items-center text-center px-6 z-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 mb-6 animate-fade-in",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-10 bg-gold/60" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] uppercase tracking-[0.5em] text-gold",
											children: t("about.our_story")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-10 bg-gold/60" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-serif text-white text-5xl sm:text-7xl md:text-8xl font-light leading-[0.95] drop-shadow-2xl animate-fade-in",
									children: c.hero_title || t("about.hero_title_default")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-6 text-white/85 max-w-2xl mx-auto text-base md:text-lg leading-relaxed animate-fade-in",
									children: c.hero_subtitle || t("about.hero_subtitle_default")
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "relative py-24 md:py-32 px-6 md:px-8 bg-secondary/30",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: maraniImg,
							alt: c.marani_title,
							className: "rounded-2xl w-full aspect-[4/5] object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] uppercase tracking-[0.4em] text-gold mb-3",
								children: t("about.marani_eyebrow")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-tight",
								children: c.marani_title || t("about.marani_title_default")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 text-muted-foreground leading-relaxed md:text-lg whitespace-pre-line",
								children: c.marani_body
							})
						] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "relative py-24 md:py-32 px-6 md:px-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-6xl mx-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center mb-14",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-center gap-3 mb-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-gold/60" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] uppercase tracking-[0.5em] text-gold",
										children: t("about.people_eyebrow")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-gold/60" })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-serif text-4xl md:text-5xl lg:text-6xl font-light",
								children: t("about.people_title")
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileCard, {
								name: c.owner_name || "The Sabacho Family",
								role: c.owner_role || "Owner & Host",
								bio: c.owner_bio,
								image: c.owner_image
							}), (c.hosts ?? []).map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileCard, {
								name: h.name,
								role: h.role,
								bio: h.bio,
								image: h.image
							}, i))]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "relative py-24 md:py-32 px-6 md:px-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "md:order-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: villageImg,
								alt: c.village_title,
								className: "rounded-2xl w-full aspect-[4/5] object-cover"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:order-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] uppercase tracking-[0.4em] text-gold mb-3",
									children: t("about.village_eyebrow")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-tight",
									children: c.village_title || t("about.village_title_default")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-6 text-muted-foreground leading-relaxed md:text-lg whitespace-pre-line",
									children: c.village_body
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "relative py-24 md:py-32 px-6 md:px-8 bg-gradient-to-b from-background to-secondary/40",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-3xl mx-auto text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-serif text-4xl md:text-6xl font-light leading-tight text-gold",
								children: c.cta_title || t("about.cta_title_default")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 text-muted-foreground text-base md:text-lg leading-relaxed",
								children: c.cta_body
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								hash: "book",
								className: "mt-10 inline-flex items-center gap-2 bg-carrot hover:bg-carrot-hover text-white px-10 py-4 rounded-md text-xs uppercase tracking-[0.3em] font-medium transition-all hover:scale-[1.03] shadow-2xl",
								children: t("cta.book")
							})
						]
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingButtons, {})
		]
	});
}
function ProfileCard({ name, role, bio, image }) {
	const resolved = resolveImageUrl(image);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border border-gold/40 shadow-xl shadow-black/40 bg-secondary/40",
				children: resolved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: resolved,
					alt: name ?? "",
					className: "w-full h-full object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full h-full flex items-center justify-center font-serif text-4xl text-gold/50",
					children: (name ?? "S").slice(0, 1)
				})
			}),
			role && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 text-[10px] uppercase tracking-[0.4em] text-gold",
				children: role
			}),
			name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-serif text-2xl mt-1",
				children: name
			}),
			bio && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto",
				children: bio
			})
		]
	});
}
//#endregion
export { AboutPage as component };
