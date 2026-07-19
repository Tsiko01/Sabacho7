import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { i as useI18n, n as LANGS } from "./i18n-QYYPNaBp.mjs";
import { n as useTheme } from "./theme-CDeDvAbH.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as Instagram, T as Facebook, _ as MapPin, c as Sun, g as Menu, h as MessageCircle, m as Moon, n as X, p as Phone, t as Youtube, v as Mail, w as Globe } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/FloatingButtons-DdwIOsSi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAPS_URL = "https://www.google.com/maps/place/Sabacho+Winery/@41.6727913,45.6769744,17z/data=!3m1!4b1!4m6!3m5!1s0x4046854e378bffdb:0x7de7ee1caac18e6c!8m2!3d41.6727913!4d45.6769744!16s%2Fg%2F11rwmn08ls";
var PHONE = "597171455";
var PHONE_INTL = "+995597171455";
var WHATSAPP_URL = `https://wa.me/${PHONE_INTL.replace("+", "")}`;
var SOCIALS = {
	facebook: "https://www.facebook.com/profile.php?id=100054214761956",
	instagram: "https://www.instagram.com/sabachos_marani",
	tiktok: "https://www.tiktok.com/@kaxetitoursabacho",
	youtube: "https://www.youtube.com/@sabacho7"
};
var EMAIL = "info@sabacho-marani.ge";
var NAV_ITEMS = [
	{
		key: "nav.home",
		to: "/",
		hash: ""
	},
	{
		key: "nav.about",
		to: "/about",
		hash: ""
	},
	{
		key: "nav.tasting",
		to: "/tasting",
		hash: ""
	},
	{
		key: "nav.gallery",
		to: "/gallery",
		hash: ""
	},
	{
		key: "nav.contact",
		to: "/contact",
		hash: ""
	}
];
function Header() {
	const { t, lang, setLang } = useI18n();
	const { theme, toggle } = useTheme();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [langOpen, setLangOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `fixed inset-x-0 top-0 z-40 transition-all duration-500 ${scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border/50" : "bg-transparent"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-16 md:h-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-baseline gap-2 group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-serif text-2xl md:text-3xl tracking-[0.25em] text-gold",
						children: "SABACHO"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:inline text-[10px] uppercase tracking-[0.35em] text-muted-foreground",
						children: "Marani"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden lg:flex items-center gap-7",
					children: NAV_ITEMS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `${item.to}${item.hash}`,
						className: "text-xs uppercase tracking-[0.2em] text-foreground/80 hover:text-gold transition-colors",
						children: t(item.key)
					}, item.key + item.hash))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 md:gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setLangOpen((v) => !v),
								className: "p-2 rounded-md hover:bg-foreground/10 transition-colors flex items-center gap-1 text-xs uppercase tracking-widest",
								"aria-label": "Language",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: lang
								})]
							}), langOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute right-0 mt-2 min-w-[160px] glass rounded-md p-1 shadow-2xl",
								onMouseLeave: () => setLangOpen(false),
								children: LANGS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setLang(l.code);
										setLangOpen(false);
									},
									className: `w-full text-left px-3 py-2 rounded text-sm hover:bg-gold/10 flex items-center gap-2 ${lang === l.code ? "text-gold" : ""}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: l.flag }),
										" ",
										l.label
									]
								}, l.code))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: toggle,
							className: "p-2 rounded-md hover:bg-foreground/10 transition-colors",
							"aria-label": "Toggle theme",
							children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "w-4 h-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: MAPS_URL,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "hidden md:inline-flex p-2 rounded-md hover:bg-foreground/10 transition-colors",
							"aria-label": t("nav.location"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-4 h-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/#book",
							className: "hidden md:inline-flex items-center gap-2 bg-carrot hover:bg-carrot-hover text-white px-5 py-2 rounded-md text-xs uppercase tracking-[0.2em] font-medium transition-all hover:scale-[1.03] shadow-lg shadow-black/20",
							children: t("cta.book")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "lg:hidden p-2",
							onClick: () => setOpen((v) => !v),
							"aria-label": "Menu",
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "w-5 h-5" })
						})
					]
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "lg:hidden glass border-t border-border/40",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex flex-col p-4 gap-1",
				children: [
					NAV_ITEMS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `${item.to}${item.hash}`,
						onClick: () => setOpen(false),
						className: "px-3 py-3 rounded text-sm uppercase tracking-[0.2em] hover:bg-gold/10 hover:text-gold",
						children: t(item.key)
					}, item.key + item.hash)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "https://www.google.com/maps/place/Sabacho+Winery/@41.6727913,45.6769744,17z/data=!3m1!4b1!4m6!3m5!1s0x4046854e378bffdb:0x7de7ee1caac18e6c!8m2!3d41.6727913!4d45.6769744!16s%2Fg%2F11rwmn08ls",
						target: "_blank",
						rel: "noopener noreferrer",
						className: "px-3 py-3 rounded text-sm uppercase tracking-[0.2em] hover:bg-gold/10 hover:text-gold flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-4 h-4" }),
							" ",
							t("nav.location")
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/#book",
						onClick: () => setOpen(false),
						className: "mt-2 text-center bg-carrot hover:bg-carrot-hover text-white px-5 py-3 rounded-md text-xs uppercase tracking-[0.2em] font-medium",
						children: t("cta.book")
					})
				]
			})
		})]
	});
}
function Footer() {
	const { t, lang, setLang } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-border/50 bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto px-6 md:px-8 py-14 grid gap-10 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-serif text-3xl tracking-[0.25em] text-gold",
							children: "SABACHO"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-[0.35em] text-muted-foreground mt-1",
							children: "Marani"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed",
							children: t("footer.tagline")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#book",
							className: "mt-6 inline-flex items-center gap-2 bg-carrot hover:bg-carrot-hover text-white px-5 py-2.5 rounded-md text-xs uppercase tracking-[0.2em] font-medium transition-all",
							children: t("cta.book")
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-xs uppercase tracking-[0.25em] text-gold mb-4",
					children: t("nav.contact")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-2 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-4 h-4 mt-0.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: MAPS_URL,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "hover:text-gold",
								children: t("contact.address")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `tel:${PHONE}`,
								className: "hover:text-gold",
								children: PHONE
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `mailto:${EMAIL}`,
								className: "hover:text-gold",
								children: EMAIL
							})]
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-xs uppercase tracking-[0.25em] text-gold mb-4",
						children: t("contact.follow")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: SOCIALS.facebook,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "w-9 h-9 rounded border border-gold/30 hover:border-gold hover:bg-gold/10 flex items-center justify-center transition",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Facebook, { className: "w-4 h-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: SOCIALS.instagram,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "w-9 h-9 rounded border border-gold/30 hover:border-gold hover:bg-gold/10 flex items-center justify-center transition",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "w-4 h-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: SOCIALS.tiktok,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "w-9 h-9 rounded border border-gold/30 hover:border-gold hover:bg-gold/10 flex items-center justify-center transition",
								"aria-label": "TikTok",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									viewBox: "0 0 24 24",
									fill: "currentColor",
									className: "w-4 h-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V9.65a8.16 8.16 0 0 0 4.77 1.52V7.72a4.85 4.85 0 0 1-1.84-1.03Z" })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: SOCIALS.youtube,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "w-9 h-9 rounded border border-gold/30 hover:border-gold hover:bg-gold/10 flex items-center justify-center transition",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Youtube, { className: "w-4 h-4" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: lang,
							onChange: (e) => setLang(e.target.value),
							className: "bg-transparent border border-border/60 text-sm rounded px-3 py-2 focus:border-gold outline-none",
							children: LANGS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: l.code,
								className: "bg-background",
								children: [
									l.flag,
									" ",
									l.label
								]
							}, l.code))
						})
					})
				] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-border/40 py-5 text-center text-xs text-muted-foreground",
			children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" Sabacho Marani. ",
				t("footer.rights")
			]
		})]
	});
}
function FloatingButtons() {
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") setOpen(false);
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [open]);
	const actions = [
		{
			label: "Location",
			href: MAPS_URL,
			target: "_blank",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-5 h-5" }),
			className: "bg-gold text-black"
		},
		{
			label: "WhatsApp",
			href: WHATSAPP_URL,
			target: "_blank",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "w-5 h-5" }),
			className: "bg-[#25D366] text-white"
		},
		{
			label: "Call",
			href: `tel:${PHONE}`,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-5 h-5" }),
			className: "bg-carrot text-white"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-end gap-3",
			children: [actions.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: a.href,
				target: a.target,
				rel: a.target === "_blank" ? "noopener noreferrer" : void 0,
				"aria-label": a.label,
				tabIndex: open ? 0 : -1,
				className: `flex items-center gap-3 pr-0 transition-all duration-500 ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none"}`,
				style: { transitionDelay: open ? `${i * 70}ms` : `${(actions.length - i) * 30}ms` },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden sm:inline-block bg-background/85 backdrop-blur border border-border/60 text-foreground text-[10px] uppercase tracking-[0.3em] px-3 py-2 rounded-full shadow-lg",
					children: a.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `w-12 h-12 rounded-full flex items-center justify-center shadow-xl shadow-black/40 hover:scale-110 transition-transform ${a.className}`,
					children: a.icon
				})]
			}, a.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setOpen((v) => !v),
				"aria-label": open ? "Close menu" : "Open contact menu",
				"aria-expanded": open,
				className: `w-14 h-14 rounded-full flex items-center justify-center shadow-2xl shadow-black/50 transition-all duration-500 ${open ? "bg-background border border-gold text-gold rotate-90" : "bg-carrot hover:bg-carrot-hover text-white hover:scale-110"}`,
				children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-6 h-6" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-6 h-6" })
			})]
		})
	});
}
//#endregion
export { MAPS_URL as a, SOCIALS as c, Header as i, WHATSAPP_URL as l, FloatingButtons as n, PHONE as o, Footer as r, PHONE_INTL as s, EMAIL as t };
