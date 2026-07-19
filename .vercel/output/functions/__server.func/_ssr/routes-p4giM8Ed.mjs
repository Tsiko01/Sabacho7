import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, n as useQuery, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { i as useI18n, r as pickLang } from "./i18n-QYYPNaBp.mjs";
import { t as supabase } from "./client-DkzpAgPX.mjs";
import { n as HERO_VIDEO, r as IMAGES, t as HERO_FALLBACK } from "./assets-DPl7XXdf.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Utensils, j as Check, k as ChevronRight, l as Star, n as X, r as Wine, u as Sparkles } from "../_libs/lucide-react.mjs";
import { c as SOCIALS, i as Header, n as FloatingButtons, o as PHONE, r as Footer, t as EMAIL } from "./FloatingButtons-DdwIOsSi.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as stringType, n as literalType, r as objectType, t as coerce } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-p4giM8Ed.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	name: stringType().trim().min(2).max(100),
	email: stringType().trim().email().max(255),
	phone: stringType().trim().max(40).optional().or(literalType("")),
	booking_date: stringType().min(1),
	booking_time: stringType().optional().or(literalType("")),
	guests: coerce.number().int().min(1).max(50),
	experience: stringType().max(60).optional(),
	message: stringType().max(2e3).optional().or(literalType(""))
});
function BookingForm({ defaultExperience = "wine" } = {}) {
	const { t, lang } = useI18n();
	const [loading, setLoading] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		setLoading(true);
		const fd = new FormData(e.currentTarget);
		const raw = Object.fromEntries(fd);
		const parsed = schema.safeParse(raw);
		if (!parsed.success) {
			toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
			setLoading(false);
			return;
		}
		const v = parsed.data;
		const { error } = await supabase.from("bookings").insert({
			name: v.name,
			email: v.email,
			phone: v.phone || null,
			booking_date: v.booking_date,
			booking_time: v.booking_time || null,
			guests: v.guests,
			experience: v.experience || null,
			message: v.message || null,
			language: lang
		});
		setLoading(false);
		if (error) {
			toast.error(t("book.error"));
			return;
		}
		toast.success(t("book.success"), { description: `${v.name} · ${v.booking_date}${v.booking_time ? " · " + v.booking_time : ""} · ${v.guests} · ${t(`book.exp.${v.experience || "wine"}`)}` });
		e.target.reset();
	}
	const inp = "w-full bg-background/40 border border-border/60 focus:border-gold outline-none rounded-md px-4 py-3 text-sm placeholder:text-muted-foreground/60 transition-colors";
	const lbl = "block text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-1.5";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "grid gap-4 sm:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				name: "name",
				required: true,
				placeholder: t("book.name"),
				className: inp,
				maxLength: 100
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				name: "email",
				type: "email",
				required: true,
				placeholder: t("book.email"),
				className: inp,
				maxLength: 255
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				name: "phone",
				type: "tel",
				placeholder: t("book.phone"),
				className: inp,
				maxLength: 40
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				name: "guests",
				type: "number",
				min: 1,
				max: 50,
				defaultValue: 2,
				placeholder: t("book.guests"),
				className: inp
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "booking_date",
				className: lbl,
				children: t("book.date")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "booking_date",
				name: "booking_date",
				type: "date",
				required: true,
				className: inp
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "booking_time",
				className: lbl,
				children: t("book.time")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "booking_time",
				name: "booking_time",
				type: "time",
				className: inp
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				name: "experience",
				defaultValue: defaultExperience,
				className: `${inp} sm:col-span-2`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "wine",
						className: "bg-background",
						children: t("book.exp.wine")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "supra",
						className: "bg-background",
						children: t("book.exp.supra")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "private",
						className: "bg-background",
						children: t("book.exp.private")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				name: "message",
				rows: 4,
				placeholder: t("book.message"),
				className: `${inp} sm:col-span-2 resize-none`,
				maxLength: 2e3
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				disabled: loading,
				className: "sm:col-span-2 bg-carrot hover:bg-carrot-hover disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-3.5 rounded-md text-xs uppercase tracking-[0.25em] font-medium transition-all hover:scale-[1.01]",
				children: loading ? "…" : t("book.submit")
			})
		]
	});
}
function DetailOverlay({ open, onClose, image, eyebrow, title, intro, sections, onBook, bookLabel = "Book Now" }) {
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", onKey);
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = prev;
		};
	}, [open, onClose]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-6 animate-fade-in",
		onClick: onClose,
		"aria-modal": "true",
		role: "dialog",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/80 backdrop-blur-md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			onClick: (e) => e.stopPropagation(),
			className: "relative w-full max-w-4xl max-h-[95vh] bg-background border border-gold/30 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-black/60 flex flex-col animate-scale-in",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onClose,
				"aria-label": "Close",
				className: "absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-black/50 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:bg-black/70 hover:border-gold/60 transition",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-y-auto",
				children: [image && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full h-56 sm:h-72 md:h-96 overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: image,
							alt: title,
							className: "w-full h-full object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" }),
						eyebrow && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute bottom-5 left-6 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-gold/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase tracking-[0.4em] text-gold",
								children: eyebrow
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 md:p-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-3xl md:text-5xl leading-tight text-foreground",
							children: title
						}),
						intro && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-muted-foreground leading-relaxed md:text-lg",
							children: intro
						}),
						sections && sections.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 grid gap-5 sm:grid-cols-2",
							children: sections.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-border/60 pt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] uppercase tracking-[0.3em] text-gold",
									children: s.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 text-sm text-foreground/90 leading-relaxed whitespace-pre-line",
									children: s.value
								})]
							}, i))
						}),
						onBook && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 flex flex-col sm:flex-row gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									onBook();
									onClose();
								},
								className: "flex-1 bg-carrot hover:bg-carrot-hover text-white px-8 py-4 rounded-md text-xs uppercase tracking-[0.3em] font-medium transition-all hover:scale-[1.01] shadow-xl",
								children: bookLabel
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: onClose,
								className: "border border-border hover:border-gold/60 text-foreground px-8 py-4 rounded-md text-xs uppercase tracking-[0.3em]",
								children: "Close"
							})]
						})
					]
				})]
			})]
		})]
	});
}
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Experiences, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TastingTeaser, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQ, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookSection, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactStrip, {})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingButtons, {})
		]
	});
}
function Hero() {
	const { t } = useI18n();
	const videoRef = (0, import_react.useRef)(null);
	const [videoOk, setVideoOk] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (videoRef.current) videoRef.current.play().catch(() => setVideoOk(false));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative h-screen min-h-[640px] w-full overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0",
				children: [videoOk ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					ref: videoRef,
					src: HERO_VIDEO,
					autoPlay: true,
					muted: true,
					loop: true,
					playsInline: true,
					poster: HERO_FALLBACK,
					onError: () => setVideoOk(false),
					className: "w-full h-full object-cover animate-kenburns"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: HERO_FALLBACK,
					alt: "Sabacho at night",
					className: "w-full h-full object-cover animate-kenburns"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10 h-full flex flex-col justify-center items-center text-center px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "animate-fadeup",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-center gap-3 mb-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-10 bg-gold/60" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] uppercase tracking-[0.5em] text-gold",
									children: "Kakheti · Georgia"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-10 bg-gold/60" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-serif text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light leading-[0.95] drop-shadow-2xl tracking-[0.08em]",
							children: "SABACHO"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 font-serif text-2xl md:text-3xl text-gold italic tracking-wide",
							children: "Georgian Wine"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm md:text-base text-white/80 max-w-xl mx-auto leading-relaxed",
							children: t("hero.subtitle")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 flex flex-col sm:flex-row gap-3 justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#book",
								className: "border border-white/70 hover:border-gold hover:bg-gold/10 text-white px-8 py-3.5 rounded-md text-xs uppercase tracking-[0.3em] font-medium transition-all hover:scale-[1.03] backdrop-blur",
								children: t("cta.book")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#experiences",
								className: "bg-carrot hover:bg-carrot-hover text-white px-8 py-3.5 rounded-md text-xs uppercase tracking-[0.3em] font-medium transition-all hover:scale-[1.03] shadow-2xl shadow-black/40",
								children: t("cta.view_experiences")
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-2 animate-pulse",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] uppercase tracking-[0.3em]",
						children: "Scroll"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-px h-8 bg-white/40" })]
				})
			})
		]
	});
}
function SectionHeading({ eyebrow, title, subtitle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center max-w-2xl mx-auto mb-14",
		children: [
			eyebrow && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-center gap-3 mb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-gold/60" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] uppercase tracking-[0.5em] text-gold",
						children: eyebrow
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-gold/60" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05]",
				children: title
			}),
			subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed",
				children: subtitle
			})
		]
	});
}
function About() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "about",
		className: "relative py-24 md:py-32 px-6 md:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto grid gap-14 md:grid-cols-2 items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative order-2 md:order-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: IMAGES.maraniInterior,
						alt: "Sabacho marani interior",
						loading: "lazy",
						className: "rounded-lg w-full aspect-[3/4] object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 pt-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: IMAGES.cellarTable,
							alt: "Cellar table",
							loading: "lazy",
							className: "rounded-lg w-full aspect-[4/5] object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: IMAGES.gardenDay,
							alt: "Garden",
							loading: "lazy",
							className: "rounded-lg w-full aspect-square object-cover"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute -bottom-4 -left-4 hidden md:block glass rounded-lg px-5 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-serif text-2xl text-gold",
						children: "Sabacho"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-[0.3em] text-muted-foreground",
						children: "Est. Kakheti"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "order-1 md:order-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-gold/60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase tracking-[0.5em] text-gold",
							children: t("nav.about")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05]",
						children: t("about.title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-muted-foreground leading-relaxed",
						children: t("about.body")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t("about.badge_years") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t("about.badge_qvevri") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t("about.badge_kakheti") })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/about",
							className: "inline-flex items-center gap-2 text-gold hover:brightness-125 text-xs uppercase tracking-[0.3em] border-b border-gold/40 pb-1",
							children: [
								t("cta.read_story"),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4" })
							]
						})
					})
				]
			})]
		})
	});
}
function Badge({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "border border-gold/40 text-gold px-3 py-1.5 rounded-full text-[11px] uppercase tracking-[0.2em]",
		children
	});
}
function Experiences() {
	const { t } = useI18n();
	const [open, setOpen] = (0, import_react.useState)(null);
	const scrollToBook = () => document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "experiences",
		className: "relative py-24 md:py-32 px-6 md:px-8 bg-secondary/30",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-7xl mx-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						eyebrow: t("exp.eyebrow"),
						title: t("exp.subtitle")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-6 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExperienceCard, {
							image: IMAGES.cellarTable,
							title: t("exp.wine.title"),
							price: t("exp.wine.price"),
							items: [
								t("exp.wine.i1"),
								t("exp.wine.i2"),
								t("exp.wine.i3"),
								t("exp.wine.i4")
							],
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wine, { className: "w-5 h-5" }),
							onOpen: () => setOpen("wine")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExperienceCard, {
							image: IMAGES.gazeboNight,
							title: t("exp.supra.title"),
							price: t("exp.supra.price"),
							items: [
								t("exp.supra.i1"),
								t("exp.supra.i2"),
								t("exp.supra.i3"),
								t("exp.supra.i4")
							],
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, { className: "w-5 h-5" }),
							onOpen: () => setOpen("supra")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 relative overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/10 via-background to-background p-8 md:p-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-16 -right-16 w-64 h-64 rounded-full bg-gold/10 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex flex-col md:flex-row md:items-center gap-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-10 h-10 text-gold shrink-0" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-serif text-3xl md:text-4xl text-gold",
										children: t("exp.private.title")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-muted-foreground leading-relaxed max-w-2xl",
										children: t("exp.private.body")
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#book",
									onClick: (e) => {
										e.preventDefault();
										scrollToBook();
									},
									className: "shrink-0 border border-gold hover:bg-gold hover:text-black text-gold px-6 py-3 rounded-md text-xs uppercase tracking-[0.25em] transition-all cursor-pointer",
									children: t("cta.reserve")
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailOverlay, {
				open: open === "wine",
				onClose: () => setOpen(null),
				eyebrow: t("exp.wine.title"),
				image: IMAGES.cellarTable,
				title: t("exp.wine.title"),
				intro: "A guided journey through our family cellar — from qvevri to bottle. Traditional Kakhetian wines, aged Chacha, and 10-year Cognac, poured slowly and paired with warm Georgian snacks.",
				sections: [
					{
						label: "Duration",
						value: "60–90 minutes"
					},
					{
						label: "From",
						value: t("exp.wine.price")
					},
					{
						label: "What you'll taste",
						value: `• ${t("exp.wine.i1")}\n• ${t("exp.wine.i2")}\n• ${t("exp.wine.i3")}\n• ${t("exp.wine.i4")}`
					},
					{
						label: "Atmosphere",
						value: "Candlelit stone cellar, hand-carved wooden table, family host guiding every pour."
					},
					{
						label: "Private option",
						value: "Reserve in advance to make the evening yours alone — with wines chosen specially for your group."
					}
				],
				onBook: scrollToBook,
				bookLabel: t("cta.book_wine")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailOverlay, {
				open: open === "supra",
				onClose: () => setOpen(null),
				eyebrow: t("exp.supra.title"),
				image: IMAGES.gazeboNight,
				title: t("exp.supra.title"),
				intro: "The Supra is not a dinner — it is Georgia at its table. A tamada leads the toasts, the wine keeps pouring, and stories become part of the meal. You do not simply eat and drink; you are welcomed into a family.",
				sections: [
					{
						label: "Duration",
						value: "2.5 – 3 hours"
					},
					{
						label: "From",
						value: t("exp.supra.price")
					},
					{
						label: "Experience",
						value: `• ${t("exp.supra.i1")}\n• ${t("exp.supra.i2")}\n• ${t("exp.supra.i3")}\n• ${t("exp.supra.i4")}`
					},
					{
						label: "Georgian hospitality",
						value: "Toasts to peace, to family, to guests — a tradition that turns strangers into friends by the end of the evening."
					},
					{
						label: "The table",
						value: "Home-cooked Kakhetian dishes made by the family, served under the vine-covered gazebo or in the marani."
					}
				],
				onBook: scrollToBook,
				bookLabel: t("cta.book_supra")
			})
		]
	});
}
function ExperienceCard({ image, title, price, items, icon, onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onOpen,
		className: "group text-left relative overflow-hidden rounded-2xl border border-border/60 bg-card hover:border-gold/60 transition-all",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "aspect-[16/10] overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: image,
					alt: title,
					loading: "lazy",
					className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute bottom-4 left-6 text-[10px] uppercase tracking-[0.3em] text-white/80 opacity-0 group-hover:opacity-100 transition-opacity",
					children: "Discover →"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-6 md:p-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-gold",
					children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-serif text-2xl md:text-3xl text-foreground",
						children: title
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-serif text-xl text-gold whitespace-nowrap",
					children: price
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-5 space-y-2",
				children: items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start gap-2 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4 text-gold mt-0.5 shrink-0" }), it]
				}, i))
			})]
		})]
	});
}
function TastingTeaser() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative py-20 md:py-28 px-6 md:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-6xl mx-auto relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-secondary via-background to-secondary/50",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: IMAGES.cellarBottles,
					alt: "",
					className: "w-full h-full object-cover opacity-20"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative p-8 md:p-16 grid md:grid-cols-2 gap-10 items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-gold/60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase tracking-[0.5em] text-gold",
							children: t("nav.tasting")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-5xl md:text-6xl text-foreground",
						children: "დეგუსტაცია"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-muted-foreground max-w-md leading-relaxed",
						children: t("tasting.teaser.subtitle")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "/tasting",
						className: "mt-8 inline-flex items-center gap-2 bg-gold hover:brightness-110 text-black px-7 py-3.5 rounded-md text-xs uppercase tracking-[0.25em] font-medium transition-all hover:scale-[1.03]",
						children: [
							t("cta.view_tasting"),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4" })
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: IMAGES.cellarBottles,
						alt: "",
						loading: "lazy",
						className: "rounded-lg aspect-square object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: IMAGES.cellarTable,
						alt: "",
						loading: "lazy",
						className: "rounded-lg aspect-square object-cover mt-8"
					})]
				})]
			})]
		})
	});
}
function Testimonials() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative py-24 md:py-32 px-6 md:px-8 bg-secondary/30",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-6xl mx-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: t("reviews.eyebrow"),
				title: t("testimonials.title")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 md:grid-cols-2",
				children: [
					{
						name: "Anna & Marco",
						country: "Italy",
						rating: 5,
						review: "The best evening of our Georgia trip. The family hosted us like their own — cellar tour, unforgettable wine, a Supra that lasted hours."
					},
					{
						name: "Daniel Peters",
						country: "Germany",
						rating: 5,
						review: "Authentic in a way you can't fake. The qvevri wine and 10-year cognac were extraordinary. Highly recommend booking the private evening."
					},
					{
						name: "Ivanna Kovalenko",
						country: "Ukraine",
						rating: 5,
						review: "Дуже теплий прийом, справжня грузинська гостинність. Вина неймовірні, чача — окрема пісня. Обов'язково повернемось."
					},
					{
						name: "Emma R.",
						country: "United Kingdom",
						rating: 5,
						review: "Beautiful garden, candlelit stone cellar, wines with real character. This is what people mean when they say 'Georgian hospitality'."
					}
				].map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-xl p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-1 text-gold mb-3",
							children: Array.from({ length: r.rating }).map((_, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-4 h-4 fill-current" }, j))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-foreground/90 leading-relaxed italic",
							children: [
								"\"",
								r.review,
								"\""
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground",
							children: [
								r.name,
								" · ",
								r.country
							]
						})
					]
				}, i))
			})]
		})
	});
}
function FAQ() {
	const { t, lang } = useI18n();
	const { data } = useQuery({
		queryKey: ["faqs"],
		queryFn: async () => {
			const { data, error } = await supabase.from("faqs").select("*").eq("active", true).order("sort_order");
			if (error) throw error;
			return data ?? [];
		}
	});
	const items = (data ?? []).map((r) => ({
		q: pickLang(r, "question", lang) || r.question,
		a: pickLang(r, "answer", lang) || r.answer
	}));
	const [open, setOpen] = (0, import_react.useState)(0);
	if (items.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative py-24 md:py-32 px-6 md:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-3xl mx-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: t("faq.eyebrow"),
				title: t("faq.title")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-border/60 rounded-lg overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setOpen((o) => o === i ? null : i),
						className: "w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-secondary/50 transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-serif text-lg text-foreground",
							children: it.q
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: `w-4 h-4 text-gold transition-transform ${open === i ? "rotate-90" : ""}` })]
					}), open === i && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-5 pb-5 text-sm text-muted-foreground leading-relaxed",
						children: it.a
					})]
				}, i))
			})]
		})
	});
}
function BookSection() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "book",
		className: "relative py-24 md:py-32 px-6 md:px-8 bg-secondary/30",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-3xl mx-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: t("cta.book"),
				title: t("book.title"),
				subtitle: t("book.subtitle")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "glass rounded-2xl p-6 md:p-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingForm, {})
			})]
		})
	});
}
function ContactStrip() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "contact",
		className: "relative py-16 md:py-20 px-6 md:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-5xl mx-auto text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-center gap-3 mb-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-gold/60" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase tracking-[0.5em] text-gold",
							children: t("visit.eyebrow")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-gold/60" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground max-w-xl mx-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `tel:${PHONE}`,
							className: "hover:text-gold",
							children: ["+995 ", PHONE]
						}),
						" · ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `mailto:${EMAIL}`,
							className: "hover:text-gold",
							children: EMAIL
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center justify-center gap-4 text-xs uppercase tracking-[0.2em]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: SOCIALS.instagram,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-muted-foreground hover:text-gold",
							children: "Instagram"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-border",
							children: "·"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: SOCIALS.facebook,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-muted-foreground hover:text-gold",
							children: "Facebook"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-border",
							children: "·"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: SOCIALS.tiktok,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-muted-foreground hover:text-gold",
							children: "TikTok"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/contact",
						className: "inline-flex items-center gap-2 text-gold text-xs uppercase tracking-[0.3em] border-b border-gold/40 pb-1 hover:brightness-125",
						children: [
							t("cta.contact_info"),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4" })
						]
					})
				})
			]
		})
	});
}
//#endregion
export { Index as component };
