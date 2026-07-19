import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { t as supabase } from "./client-DkzpAgPX.mjs";
import { i as resolveImageUrl } from "./assets-DPl7XXdf.mjs";
import { a as Upload, d as Save, f as Plus, s as Trash2 } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as ConfirmDialog } from "./ConfirmDialog-DAZVnBNG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.tastings-DWAUXpqT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TastingsAdmin() {
	const qc = useQueryClient();
	const { data } = useQuery({
		queryKey: ["admin-tastings"],
		queryFn: async () => (await supabase.from("tastings").select("*").order("sort_order")).data ?? []
	});
	const items = data ?? [];
	const add = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.from("tastings").insert({
				name: "New item",
				sort_order: (items.at(-1)?.sort_order ?? 0) + 1
			});
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["admin-tastings"] });
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
				children: "Tastings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Manage the tasting menu — wines, spirits, pairings."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => add.mutate(),
				className: "inline-flex items-center gap-2 bg-carrot hover:bg-carrot-hover text-white px-4 py-2 rounded text-xs uppercase tracking-widest",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), " Add item"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4",
			children: items.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Editor, { row: r }, r.id))
		})]
	});
}
function Editor({ row }) {
	const qc = useQueryClient();
	const [form, setForm] = (0, import_react.useState)(row);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [askDelete, setAskDelete] = (0, import_react.useState)(false);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const fileRef = (0, import_react.useRef)(null);
	const inp = "w-full bg-background/40 border border-border/60 focus:border-gold outline-none rounded px-3 py-2 text-sm";
	const save = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.from("tastings").update({
				name: form.name,
				name_ka: form.name_ka,
				name_ru: form.name_ru,
				name_uk: form.name_uk,
				category: form.category,
				description: form.description,
				description_ka: form.description_ka,
				description_ru: form.description_ru,
				description_uk: form.description_uk,
				taste_notes: form.taste_notes,
				image_url: form.image_url,
				sort_order: form.sort_order,
				active: form.active
			}).eq("id", row.id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Saved");
			qc.invalidateQueries({ queryKey: ["admin-tastings"] });
			qc.invalidateQueries({ queryKey: ["tastings-public"] });
		},
		onError: (e) => toast.error(e.message)
	});
	async function uploadImage(file) {
		setUploading(true);
		try {
			const ext = file.name.split(".").pop() ?? "jpg";
			const path = `tastings/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
			const { error: upErr } = await supabase.storage.from("gallery").upload(path, file, { contentType: file.type });
			if (upErr) throw upErr;
			const { data: signed } = await supabase.storage.from("gallery").createSignedUrl(path, 3600 * 24 * 365 * 10);
			const url = signed?.signedUrl;
			if (!url) throw new Error("Failed to get URL");
			setForm((f) => ({
				...f,
				image_url: url
			}));
			toast.success("Uploaded — remember to save");
		} catch (e) {
			toast.error(e.message);
		} finally {
			setUploading(false);
			if (fileRef.current) fileRef.current.value = "";
		}
	}
	const del = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.from("tastings").delete().eq("id", row.id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Deleted");
			qc.invalidateQueries({ queryKey: ["admin-tastings"] });
			qc.invalidateQueries({ queryKey: ["tastings-public"] });
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-serif text-xl",
					children: form.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs text-muted-foreground",
					children: [
						form.category ?? "—",
						" · ",
						form.active ? "Active" : "Hidden"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-gold text-xs uppercase tracking-widest",
					children: open ? "Close" : "Edit"
				})]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5 border-t border-border/60 grid gap-3 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inp,
						placeholder: "Name (EN)",
						value: form.name,
						onChange: (e) => setForm((f) => ({
							...f,
							name: e.target.value
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inp,
						placeholder: "Category",
						value: form.category ?? "",
						onChange: (e) => setForm((f) => ({
							...f,
							category: e.target.value
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inp,
						placeholder: "Name (KA)",
						value: form.name_ka ?? "",
						onChange: (e) => setForm((f) => ({
							...f,
							name_ka: e.target.value
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inp,
						placeholder: "Name (RU)",
						value: form.name_ru ?? "",
						onChange: (e) => setForm((f) => ({
							...f,
							name_ru: e.target.value
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inp,
						placeholder: "Name (UK)",
						value: form.name_uk ?? "",
						onChange: (e) => setForm((f) => ({
							...f,
							name_uk: e.target.value
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-2 flex flex-col sm:flex-row gap-3 items-start",
						children: [form.image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: resolveImageUrl(form.image_url) ?? form.image_url ?? "",
							alt: "",
							className: "w-28 h-28 rounded-lg object-cover border border-border/60"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-28 h-28 rounded-lg border border-dashed border-border/60 flex items-center justify-center text-[10px] uppercase tracking-widest text-muted-foreground",
							children: "No image"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 space-y-2 w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "inline-flex items-center gap-2 border border-border hover:border-gold hover:text-gold px-4 py-2 rounded text-xs uppercase tracking-widest cursor-pointer",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "w-4 h-4" }),
									" ",
									uploading ? "Uploading…" : "Upload image",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										ref: fileRef,
										type: "file",
										accept: "image/*",
										className: "hidden",
										onChange: (e) => {
											const f = e.target.files?.[0];
											if (f) uploadImage(f);
										}
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inp,
								placeholder: "Or paste image URL",
								value: form.image_url ?? "",
								onChange: (e) => setForm((f) => ({
									...f,
									image_url: e.target.value
								}))
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: `${inp} md:col-span-2 min-h-20`,
						placeholder: "Description (EN)",
						value: form.description ?? "",
						onChange: (e) => setForm((f) => ({
							...f,
							description: e.target.value
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: `${inp} min-h-20`,
						placeholder: "Description (KA)",
						value: form.description_ka ?? "",
						onChange: (e) => setForm((f) => ({
							...f,
							description_ka: e.target.value
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: `${inp} min-h-20`,
						placeholder: "Description (RU)",
						value: form.description_ru ?? "",
						onChange: (e) => setForm((f) => ({
							...f,
							description_ru: e.target.value
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: `${inp} min-h-20`,
						placeholder: "Description (UK)",
						value: form.description_uk ?? "",
						onChange: (e) => setForm((f) => ({
							...f,
							description_uk: e.target.value
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inp,
						placeholder: "Taste notes",
						value: form.taste_notes ?? "",
						onChange: (e) => setForm((f) => ({
							...f,
							taste_notes: e.target.value
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
						}), " Active"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-2 flex justify-end gap-2 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setAskDelete(true),
							className: "inline-flex items-center gap-2 border border-destructive/60 text-destructive hover:bg-destructive hover:text-destructive-foreground px-4 py-2 rounded text-xs uppercase tracking-widest transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" }), " Delete tasting"]
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
				title: `Delete "${form.name}"?`,
				description: "This tasting item will be removed. This action can't be undone.",
				confirmLabel: "Delete tasting",
				onCancel: () => setAskDelete(false),
				onConfirm: () => del.mutate()
			})
		]
	});
}
//#endregion
export { TastingsAdmin as component };
