import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { i as useI18n } from "./i18n-QYYPNaBp.mjs";
import { t as supabase } from "./client-DkzpAgPX.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as CircleAlert, _ as MapPin, p as Phone, v as Mail } from "../_libs/lucide-react.mjs";
import { a as MAPS_URL, c as SOCIALS, i as Header, l as WHATSAPP_URL, n as FloatingButtons, o as PHONE, r as Footer, s as PHONE_INTL, t as EMAIL } from "./FloatingButtons-DdwIOsSi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-DRgdCh8S.js
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	const { t } = useI18n();
	const { data } = useQuery({
		queryKey: ["site_content", "restoration"],
		queryFn: async () => {
			const { data } = await supabase.from("site_content").select("value").eq("key", "restoration").maybeSingle();
			return data?.value ?? {};
		}
	});
	const restoration = data ?? {};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "pt-24 md:pt-32 pb-24 px-6 md:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-5xl mx-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center mb-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-center gap-3 mb-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-gold/60" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] uppercase tracking-[0.5em] text-gold",
										children: t("nav.contact")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-gold/60" })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-serif text-5xl md:text-6xl lg:text-7xl font-light",
								children: t("contact.get_in_touch")
							})]
						}),
						restoration.active !== false && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative overflow-hidden rounded-2xl border border-gold/50 bg-gradient-to-br from-gold/15 via-background to-background p-6 md:p-10 mb-14 animate-fade-in",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-16 -right-16 w-64 h-64 rounded-full bg-gold/10 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex flex-col md:flex-row gap-5 md:gap-8",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-12 h-12 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0 border border-gold/40",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-5 h-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] uppercase tracking-[0.4em] text-gold mb-2",
											children: t("restoration.eyebrow")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "font-serif text-2xl md:text-4xl leading-tight text-foreground",
											children: restoration.title || t("restoration.title")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-4 text-muted-foreground leading-relaxed md:text-lg",
											children: restoration.body || t("restoration.body")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-6 flex flex-wrap gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: WHATSAPP_URL,
												target: "_blank",
												rel: "noopener noreferrer",
												className: "bg-[#25D366] text-white px-6 py-3 rounded-md text-xs uppercase tracking-[0.25em] hover:brightness-110 transition",
												children: t("restoration.whatsapp")
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: `tel:+995597171455`,
												className: "border border-gold text-gold hover:bg-gold hover:text-black px-6 py-3 rounded-md text-xs uppercase tracking-[0.25em] transition",
												children: t("restoration.call")
											})]
										})
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid md:grid-cols-2 gap-10 items-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactRow, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-5 h-5" }),
										label: t("contact.location_label"),
										value: t("contact.address"),
										href: MAPS_URL,
										external: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactRow, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-5 h-5" }),
										label: t("contact.phone_label"),
										value: `+995 ${PHONE}`,
										href: `tel:${PHONE_INTL}`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactRow, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "w-5 h-5" }),
										label: t("contact.email_label"),
										value: EMAIL,
										href: `mailto:${EMAIL}`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-t border-border/60 pt-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] uppercase tracking-[0.4em] text-gold mb-3",
											children: t("contact.follow")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
													href: SOCIALS.instagram,
													target: "_blank",
													rel: "noopener noreferrer",
													className: "border border-border/60 hover:border-gold hover:text-gold px-4 py-2 rounded-full transition",
													children: "Instagram"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
													href: SOCIALS.facebook,
													target: "_blank",
													rel: "noopener noreferrer",
													className: "border border-border/60 hover:border-gold hover:text-gold px-4 py-2 rounded-full transition",
													children: "Facebook"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
													href: SOCIALS.tiktok,
													target: "_blank",
													rel: "noopener noreferrer",
													className: "border border-border/60 hover:border-gold hover:text-gold px-4 py-2 rounded-full transition",
													children: "TikTok"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
													href: WHATSAPP_URL,
													target: "_blank",
													rel: "noopener noreferrer",
													className: "border border-border/60 hover:border-gold hover:text-gold px-4 py-2 rounded-full transition",
													children: "WhatsApp"
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pt-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/",
											hash: "book",
											className: "inline-flex items-center gap-2 bg-carrot hover:bg-carrot-hover text-white px-8 py-3.5 rounded-md text-xs uppercase tracking-[0.3em] font-medium transition-all hover:scale-[1.02]",
											children: t("cta.reserve_evening")
										})
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-2xl overflow-hidden border border-border/60 aspect-[4/3]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
									src: "https://www.google.com/maps?q=41.6727913,45.6769744&hl=en&z=16&output=embed",
									title: "Sabacho Winery location",
									loading: "lazy",
									className: "w-full h-full",
									referrerPolicy: "no-referrer-when-downgrade"
								})
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingButtons, {})
		]
	});
}
function ContactRow({ icon, label, value, href, external }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href,
		target: external ? "_blank" : void 0,
		rel: external ? "noopener noreferrer" : void 0,
		className: "flex items-start gap-4 group",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0 border border-gold/30 group-hover:bg-gold group-hover:text-black transition",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-[10px] uppercase tracking-[0.4em] text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-base text-foreground group-hover:text-gold transition break-words",
				children: value
			})]
		})]
	});
}
//#endregion
export { ContactPage as component };
