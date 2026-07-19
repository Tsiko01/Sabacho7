import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as supabase } from "./client-DkzpAgPX.mjs";
import { _ as useNavigate, d as Outlet, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Image, D as CircleQuestionMark, E as Coffee, M as CalendarClock, N as BookOpen, x as LayoutDashboard, y as LogOut } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-Dy0vxNho.js
var import_jsx_runtime = require_jsx_runtime();
function AdminLayout() {
	const navigate = useNavigate();
	async function signOut() {
		await supabase.auth.signOut();
		navigate({ to: "/admin/login" });
	}
	const linkCls = "flex items-center gap-3 px-4 py-2.5 rounded-md text-sm hover:bg-gold/10 hover:text-gold transition";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground flex",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "w-64 border-r border-border/60 p-6 hidden md:flex flex-col justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "block mb-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-serif text-2xl tracking-[0.25em] text-gold",
						children: "SABACHO"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-[0.3em] text-muted-foreground",
						children: "Admin"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin",
							activeOptions: { exact: true },
							activeProps: { className: "bg-gold/10 text-gold" },
							className: linkCls,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "w-4 h-4" }), "Dashboard"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/tastings",
							activeProps: { className: "bg-gold/10 text-gold" },
							className: linkCls,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coffee, { className: "w-4 h-4" }), "Tastings"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/gallery",
							activeProps: { className: "bg-gold/10 text-gold" },
							className: linkCls,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "w-4 h-4" }), "Gallery"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/about",
							activeProps: { className: "bg-gold/10 text-gold" },
							className: linkCls,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-4 h-4" }), "About page"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/faqs",
							activeProps: { className: "bg-gold/10 text-gold" },
							className: linkCls,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "w-4 h-4" }), "FAQ"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/bookings",
							activeProps: { className: "bg-gold/10 text-gold" },
							className: linkCls,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "w-4 h-4" }), "Bookings"]
						})
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: signOut,
					className: linkCls,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "w-4 h-4" }), "Sign out"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:hidden fixed top-0 inset-x-0 z-20 bg-background/90 backdrop-blur border-b border-border/60 flex items-center justify-between px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin",
					className: "font-serif text-lg tracking-[0.25em] text-gold",
					children: "SABACHO"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: signOut,
					className: "text-xs uppercase tracking-widest text-muted-foreground",
					children: "Sign out"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:hidden fixed top-14 inset-x-0 z-10 bg-background border-b border-border/60 flex overflow-x-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin",
						activeOptions: { exact: true },
						activeProps: { className: "text-gold border-gold" },
						className: "px-4 py-2 text-xs uppercase tracking-widest border-b-2 border-transparent",
						children: "Dash"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/tastings",
						activeProps: { className: "text-gold border-gold" },
						className: "px-4 py-2 text-xs uppercase tracking-widest border-b-2 border-transparent",
						children: "Tastings"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/gallery",
						activeProps: { className: "text-gold border-gold" },
						className: "px-4 py-2 text-xs uppercase tracking-widest border-b-2 border-transparent",
						children: "Gallery"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/about",
						activeProps: { className: "text-gold border-gold" },
						className: "px-4 py-2 text-xs uppercase tracking-widest border-b-2 border-transparent",
						children: "About"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/faqs",
						activeProps: { className: "text-gold border-gold" },
						className: "px-4 py-2 text-xs uppercase tracking-widest border-b-2 border-transparent",
						children: "FAQ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/bookings",
						activeProps: { className: "text-gold border-gold" },
						className: "px-4 py-2 text-xs uppercase tracking-widest border-b-2 border-transparent",
						children: "Bookings"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 p-6 md:p-10 pt-28 md:pt-10 overflow-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})
		]
	});
}
//#endregion
export { AdminLayout as component };
