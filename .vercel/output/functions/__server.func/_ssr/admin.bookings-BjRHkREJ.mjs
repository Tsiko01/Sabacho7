import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { t as supabase } from "./client-DkzpAgPX.mjs";
import { s as Trash2 } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as ConfirmDialog } from "./ConfirmDialog-DAZVnBNG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.bookings-BjRHkREJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUSES = [
	"pending",
	"confirmed",
	"cancelled"
];
function BookingsAdmin() {
	const qc = useQueryClient();
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const { data } = useQuery({
		queryKey: ["admin-bookings"],
		queryFn: async () => (await supabase.from("bookings").select("*").order("created_at", { ascending: false })).data ?? []
	});
	const items = data ?? [];
	const updateStatus = useMutation({
		mutationFn: async ({ id, status }) => {
			const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
			if (error) throw error;
			try {
				await supabase.functions.invoke("send-booking-email", { body: {
					booking_id: id,
					kind: status
				} });
			} catch {}
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["admin-bookings"] });
			qc.invalidateQueries({ queryKey: ["admin-dashboard"] });
			toast.success("Updated");
		},
		onError: (e) => toast.error(e.message)
	});
	const del = useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("bookings").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["admin-bookings"] });
			qc.invalidateQueries({ queryKey: ["admin-dashboard"] });
			toast.success("Deleted");
			setPendingDelete(null);
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-6xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-4xl mb-2",
				children: "Bookings"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground mb-6",
				children: "Reservation requests from the website."
			}),
			items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "No reservations yet."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: items.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border border-border/60 rounded-xl bg-card p-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-serif text-xl",
									children: b.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-muted-foreground mt-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "uppercase tracking-widest text-[10px] text-gold mr-1",
											children: "Date"
										}),
										b.booking_date,
										b.booking_time && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "uppercase tracking-widest text-[10px] text-gold ml-3 mr-1",
											children: "Time"
										}), b.booking_time.slice(0, 5)] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "ml-3",
											children: [
												"· ",
												b.guests,
												" guests · ",
												b.experience ?? "—"
											]
										}),
										b.language && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-3 uppercase text-[10px] tracking-widest text-muted-foreground/60",
											children: b.language
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm mt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: `mailto:${b.email}`,
										className: "hover:text-gold",
										children: b.email
									}), b.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" · ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: `tel:${b.phone}`,
										className: "hover:text-gold",
										children: b.phone
									})] })]
								}),
								b.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground mt-2 whitespace-pre-line",
									children: b.message
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: b.status,
								onChange: (e) => updateStatus.mutate({
									id: b.id,
									status: e.target.value
								}),
								className: "bg-background border border-border rounded px-3 py-2 text-xs uppercase tracking-widest",
								children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s,
									children: s
								}, s))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setPendingDelete(b),
								className: "p-2 border border-destructive/50 text-destructive hover:bg-destructive/10 rounded",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
							})]
						})]
					})
				}, b.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: !!pendingDelete,
				title: "Delete booking?",
				description: pendingDelete ? `${pendingDelete.name} · ${pendingDelete.booking_date}` : "",
				confirmLabel: "Delete",
				onConfirm: () => pendingDelete && del.mutate(pendingDelete.id),
				onCancel: () => setPendingDelete(null)
			})
		]
	});
}
//#endregion
export { BookingsAdmin as component };
