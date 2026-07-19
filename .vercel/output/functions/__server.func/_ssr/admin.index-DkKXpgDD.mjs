import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { t as supabase } from "./client-DkzpAgPX.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Image, E as Coffee, M as CalendarClock, v as Mail } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-DkKXpgDD.js
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const { data } = useQuery({
		queryKey: ["admin-dashboard"],
		queryFn: async () => {
			const [t, b, pending, g] = await Promise.all([
				supabase.from("tastings").select("id", {
					count: "exact",
					head: true
				}),
				supabase.from("bookings").select("id", {
					count: "exact",
					head: true
				}),
				supabase.from("bookings").select("id", {
					count: "exact",
					head: true
				}).eq("status", "pending"),
				supabase.from("gallery_images").select("id", {
					count: "exact",
					head: true
				})
			]);
			return {
				tastings: t.count ?? 0,
				bookings: b.count ?? 0,
				pending: pending.count ?? 0,
				gallery: g.count ?? 0
			};
		}
	});
	const stats = data ?? {
		tastings: 0,
		bookings: 0,
		pending: 0,
		gallery: 0
	};
	const { data: latest } = useQuery({
		queryKey: ["admin-latest-bookings"],
		queryFn: async () => {
			const { data } = await supabase.from("bookings").select("*").order("created_at", { ascending: false }).limit(8);
			return data ?? [];
		}
	});
	const bookings = latest ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-6xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-4xl mb-2",
				children: "Dashboard"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground mb-8",
				children: "Manage tastings, gallery, and reservations."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coffee, {}),
						label: "Tastings",
						value: stats.tastings
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {}),
						label: "Gallery",
						value: stats.gallery
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, {}),
						label: "Bookings",
						value: stats.bookings
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, {}),
						label: "Pending",
						value: stats.pending,
						accent: true
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between mb-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-[0.4em] text-gold",
						children: "Reservations"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-3xl mt-1",
						children: "Recent bookings"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/bookings",
						className: "text-xs uppercase tracking-widest text-muted-foreground hover:text-gold border-b border-border hover:border-gold pb-1",
						children: "View all"
					})]
				}), bookings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-dashed border-border/60 rounded-2xl p-14 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-14 h-14 rounded-full bg-gold/10 text-gold border border-gold/30 mx-auto flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "w-5 h-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-serif text-2xl mt-5",
							children: "No reservations yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mt-2 max-w-sm mx-auto",
							children: "When guests reserve an evening through the site, their requests will appear here."
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-border/60 rounded-2xl bg-card overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden md:grid grid-cols-12 gap-4 px-5 py-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground border-b border-border/60 bg-secondary/30",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "col-span-3",
								children: "Guest"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "col-span-3",
								children: "Contact"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "col-span-2",
								children: "Date · Guests"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "col-span-2",
								children: "Experience"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "col-span-2 text-right",
								children: "Status"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y divide-border/60",
						children: bookings.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "px-5 py-4 md:grid md:grid-cols-12 md:gap-4 md:items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "md:col-span-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-serif text-lg",
										children: b.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5",
										children: new Date(b.created_at).toLocaleDateString()
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "md:col-span-3 text-sm mt-1 md:mt-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: `mailto:${b.email}`,
										className: "hover:text-gold block truncate",
										children: b.email
									}), b.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: `tel:${b.phone}`,
										className: "hover:text-gold text-muted-foreground text-xs",
										children: b.phone
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "md:col-span-2 text-sm mt-1 md:mt-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [b.booking_date, b.booking_time ? ` · ${b.booking_time.slice(0, 5)}` : ""] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground",
										children: [
											b.guests,
											" guest",
											b.guests === 1 ? "" : "s"
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "md:col-span-2 text-sm text-muted-foreground mt-1 md:mt-0 capitalize",
									children: b.experience ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "md:col-span-2 mt-2 md:mt-0 md:text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: b.status })
								})
							]
						}, b.id))
					})]
				})]
			})
		]
	});
}
function StatusPill({ status }) {
	const style = {
		pending: "bg-gold/15 text-gold border-gold/40",
		confirmed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/40",
		cancelled: "bg-destructive/15 text-destructive border-destructive/40"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-block text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 rounded-full border ${style[status] ?? style.pending}`,
		children: status
	});
}
function Stat({ icon, label, value, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-xl p-5 border ${accent ? "border-gold/60 bg-gold/5" : "border-border/60 bg-card"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs uppercase tracking-[0.2em] text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: accent ? "text-gold" : "text-muted-foreground",
				children: icon
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `mt-2 font-serif text-4xl ${accent ? "text-gold" : ""}`,
			children: value
		})]
	});
}
//#endregion
export { Dashboard as component };
