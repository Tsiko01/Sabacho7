import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { t as supabase } from "./client-DkzpAgPX.mjs";
import { d as Save, f as Plus, s as Trash2 } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as ConfirmDialog } from "./ConfirmDialog-DAZVnBNG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.faqs-CrDLnUnR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FaqsAdmin() {
	const qc = useQueryClient();
	const { data } = useQuery({
		queryKey: ["admin-faqs"],
		queryFn: async () => (await supabase.from("faqs").select("*").order("sort_order")).data ?? []
	});
	const items = data ?? [];
	const add = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.from("faqs").insert({
				question: "New question",
				answer: "New answer",
				sort_order: (items.at(-1)?.sort_order ?? 0) + 1
			});
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["admin-faqs"] });
			qc.invalidateQueries({ queryKey: ["faqs"] });
			toast.success("Added");
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-5xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-4xl",
				children: "Frequently Asked Questions"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Manage FAQ content shown on the homepage. Available in all four languages."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => add.mutate(),
				className: "inline-flex items-center gap-2 bg-carrot hover:bg-carrot-hover text-white px-4 py-2 rounded text-xs uppercase tracking-widest",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), " Add FAQ"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [items.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaqEditor, { row: f }, f.id)), items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm text-muted-foreground border border-dashed border-border/60 rounded-lg p-8 text-center",
				children: "No FAQs yet. Add your first one."
			})]
		})]
	});
}
function FaqEditor({ row }) {
	const qc = useQueryClient();
	const [form, setForm] = (0, import_react.useState)(row);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [askDelete, setAskDelete] = (0, import_react.useState)(false);
	const inp = "w-full bg-background/40 border border-border/60 focus:border-gold outline-none rounded px-3 py-2 text-sm";
	const save = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.from("faqs").update({
				question: form.question,
				question_ka: form.question_ka,
				question_ru: form.question_ru,
				question_uk: form.question_uk,
				answer: form.answer,
				answer_ka: form.answer_ka,
				answer_ru: form.answer_ru,
				answer_uk: form.answer_uk,
				sort_order: form.sort_order,
				active: form.active
			}).eq("id", row.id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Saved");
			qc.invalidateQueries({ queryKey: ["admin-faqs"] });
			qc.invalidateQueries({ queryKey: ["faqs"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const del = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.from("faqs").delete().eq("id", row.id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Deleted");
			qc.invalidateQueries({ queryKey: ["admin-faqs"] });
			qc.invalidateQueries({ queryKey: ["faqs"] });
			setAskDelete(false);
		},
		onError: (e) => {
			toast.error(e.message);
			setAskDelete(false);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border border-border/60 rounded-xl bg-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setOpen((v) => !v),
				className: "w-full flex items-center justify-between p-4 text-left hover:bg-secondary/40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-serif text-lg truncate",
						children: form.question || "(empty question)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-muted-foreground",
						children: [
							"order ",
							form.sort_order,
							" · ",
							form.active ? "Visible" : "Hidden"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-gold text-xs uppercase tracking-widest shrink-0 ml-4",
					children: open ? "Close" : "Edit"
				})]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5 border-t border-border/60 grid gap-3 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "md:col-span-2 text-[10px] uppercase tracking-[0.3em] text-gold",
						children: "Question"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inp,
						placeholder: "Question (EN)",
						value: form.question,
						onChange: (e) => setForm((f) => ({
							...f,
							question: e.target.value
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inp,
						placeholder: "Question (KA / ქართული)",
						value: form.question_ka ?? "",
						onChange: (e) => setForm((f) => ({
							...f,
							question_ka: e.target.value
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inp,
						placeholder: "Question (RU / Русский)",
						value: form.question_ru ?? "",
						onChange: (e) => setForm((f) => ({
							...f,
							question_ru: e.target.value
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inp,
						placeholder: "Question (UK / Українська)",
						value: form.question_uk ?? "",
						onChange: (e) => setForm((f) => ({
							...f,
							question_uk: e.target.value
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "md:col-span-2 mt-2 text-[10px] uppercase tracking-[0.3em] text-gold",
						children: "Answer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: `${inp} md:col-span-2 min-h-24`,
						placeholder: "Answer (EN)",
						value: form.answer,
						onChange: (e) => setForm((f) => ({
							...f,
							answer: e.target.value
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: `${inp} min-h-24`,
						placeholder: "Answer (KA / ქართული)",
						value: form.answer_ka ?? "",
						onChange: (e) => setForm((f) => ({
							...f,
							answer_ka: e.target.value
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: `${inp} min-h-24`,
						placeholder: "Answer (RU / Русский)",
						value: form.answer_ru ?? "",
						onChange: (e) => setForm((f) => ({
							...f,
							answer_ru: e.target.value
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: `${inp} min-h-24 md:col-span-2`,
						placeholder: "Answer (UK / Українська)",
						value: form.answer_uk ?? "",
						onChange: (e) => setForm((f) => ({
							...f,
							answer_uk: e.target.value
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inp,
						type: "number",
						placeholder: "Sort order",
						value: form.sort_order,
						onChange: (e) => setForm((f) => ({
							...f,
							sort_order: Number(e.target.value)
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: form.active,
							onChange: (e) => setForm((f) => ({
								...f,
								active: e.target.checked
							}))
						}), " Visible on site"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-2 flex justify-end gap-2 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setAskDelete(true),
							className: "inline-flex items-center gap-2 border border-destructive/60 text-destructive hover:bg-destructive hover:text-destructive-foreground px-4 py-2 rounded text-xs uppercase tracking-widest transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" }), " Delete"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => save.mutate(),
							className: "inline-flex items-center gap-2 bg-gold hover:brightness-110 text-black px-4 py-2 rounded text-xs uppercase tracking-widest",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "w-4 h-4" }), " Save"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: askDelete,
				title: "Delete this FAQ?",
				description: "This question and its translations will be removed from the site. This action can't be undone.",
				confirmLabel: "Delete FAQ",
				onCancel: () => setAskDelete(false),
				onConfirm: () => del.mutate()
			})
		]
	});
}
//#endregion
export { FaqsAdmin as component };
