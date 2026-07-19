import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { t as supabase } from "./client-DkzpAgPX.mjs";
import { i as resolveImageUrl } from "./assets-DPl7XXdf.mjs";
import { a as Upload, b as Link, s as Trash2 } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as ConfirmDialog } from "./ConfirmDialog-DAZVnBNG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.gallery-CFlvyL3i.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATEGORIES = [
	"yard",
	"night",
	"marani",
	"wine"
];
function GalleryAdmin() {
	const qc = useQueryClient();
	const fileRef = (0, import_react.useRef)(null);
	const [urlInput, setUrlInput] = (0, import_react.useState)("");
	const [urlCat, setUrlCat] = (0, import_react.useState)("yard");
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const { data } = useQuery({
		queryKey: ["admin-gallery"],
		queryFn: async () => (await supabase.from("gallery_images").select("*").order("sort_order")).data ?? []
	});
	const rows = data ?? [];
	const addFromUrl = useMutation({
		mutationFn: async ({ url, category }) => {
			const { error } = await supabase.from("gallery_images").insert({
				image_url: url,
				category,
				sort_order: (rows.at(-1)?.sort_order ?? 0) + 1
			});
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["admin-gallery"] });
			qc.invalidateQueries({ queryKey: ["gallery"] });
			toast.success("Added");
			setUrlInput("");
		},
		onError: (e) => toast.error(e.message)
	});
	async function uploadFiles(files) {
		if (!files || files.length === 0) return;
		setUploading(true);
		try {
			for (const file of Array.from(files)) {
				const ext = file.name.split(".").pop() ?? "jpg";
				const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
				const { error: upErr } = await supabase.storage.from("gallery").upload(path, file, { contentType: file.type });
				if (upErr) throw upErr;
				const { data: signed } = await supabase.storage.from("gallery").createSignedUrl(path, 3600 * 24 * 365 * 10);
				const url = signed?.signedUrl;
				if (!url) throw new Error("Failed to get URL");
				const { error: insErr } = await supabase.from("gallery_images").insert({
					image_url: url,
					alt: file.name,
					category: urlCat,
					sort_order: (rows.at(-1)?.sort_order ?? 0) + 1
				});
				if (insErr) throw insErr;
			}
			qc.invalidateQueries({ queryKey: ["admin-gallery"] });
			qc.invalidateQueries({ queryKey: ["gallery"] });
			toast.success("Uploaded");
		} catch (e) {
			toast.error(e.message);
		} finally {
			setUploading(false);
			if (fileRef.current) fileRef.current.value = "";
		}
	}
	const del = useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("gallery_images").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["admin-gallery"] });
			qc.invalidateQueries({ queryKey: ["gallery"] });
			toast.success("Deleted");
			setPendingDelete(null);
		},
		onError: (e) => {
			toast.error(e.message);
			setPendingDelete(null);
		}
	});
	const inp = "w-full bg-background/40 border border-border/60 focus:border-gold outline-none rounded px-3 py-2 text-sm";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-6xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-between mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-serif text-4xl",
					children: "Gallery"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Add, remove and order photos shown on the public Gallery page."
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-2 mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "border border-dashed border-border/60 rounded-xl p-6 flex items-center gap-4 cursor-pointer hover:border-gold/60 transition",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-11 h-11 rounded-full bg-gold/10 text-gold border border-gold/30 flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "w-5 h-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-serif text-lg",
							children: uploading ? "Uploading…" : "Upload images"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-xs text-muted-foreground",
							children: "JPG, PNG or WEBP. Multiple files supported."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileRef,
							type: "file",
							multiple: true,
							accept: "image/*",
							className: "hidden",
							onChange: (e) => uploadFiles(e.target.files)
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "border border-border/60 rounded-xl p-6 flex flex-col gap-3",
					onSubmit: (e) => {
						e.preventDefault();
						if (urlInput.trim()) addFromUrl.mutate({
							url: urlInput.trim(),
							category: urlCat
						});
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-11 h-11 rounded-full bg-gold/10 text-gold border border-gold/30 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { className: "w-5 h-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-serif text-lg",
								children: "Add from URL"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs text-muted-foreground",
								children: "Paste an image URL."
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									className: `${inp} max-w-[140px]`,
									value: urlCat,
									onChange: (e) => setUrlCat(e.target.value),
									children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: c,
										children: c
									}, c))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: inp,
									placeholder: "https://…",
									value: urlInput,
									onChange: (e) => setUrlInput(e.target.value)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "bg-gold hover:brightness-110 text-black px-4 rounded text-xs uppercase tracking-widest",
									children: "Add"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] text-muted-foreground uppercase tracking-widest",
							children: "Category applies to uploads and URL adds."
						})
					]
				})]
			}),
			rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-dashed border-border/60 rounded-2xl p-14 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-serif text-2xl",
					children: "No gallery images yet"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-2",
					children: "Upload or add photos to build the public gallery."
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
				children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GalleryTile, {
					row: r,
					onDelete: () => setPendingDelete(r)
				}, r.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: !!pendingDelete,
				title: "Delete this image?",
				description: "It will no longer appear in the public gallery. This action can't be undone.",
				onCancel: () => setPendingDelete(null),
				onConfirm: () => pendingDelete && del.mutate(pendingDelete.id)
			})
		]
	});
}
function GalleryTile({ row, onDelete }) {
	const qc = useQueryClient();
	const [alt, setAlt] = (0, import_react.useState)(row.alt ?? "");
	const [active, setActive] = (0, import_react.useState)(row.active);
	const [order, setOrder] = (0, import_react.useState)(row.sort_order);
	const [category, setCategory] = (0, import_react.useState)(row.category ?? "yard");
	const save = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.from("gallery_images").update({
				alt,
				active,
				sort_order: order,
				category
			}).eq("id", row.id);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["admin-gallery"] });
			qc.invalidateQueries({ queryKey: ["gallery"] });
			toast.success("Saved");
		},
		onError: (e) => toast.error(e.message)
	});
	const inp = "w-full bg-background/40 border border-border/60 focus:border-gold outline-none rounded px-2 py-1.5 text-xs";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border border-border/60 rounded-xl overflow-hidden bg-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "aspect-square overflow-hidden bg-secondary/40 relative",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: resolveImageUrl(row.image_url) ?? row.image_url,
					alt: row.alt ?? "",
					className: "w-full h-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute top-2 left-2 bg-black/60 backdrop-blur border border-white/15 text-white text-[9px] uppercase tracking-[0.3em] px-2 py-1 rounded-full",
					children: row.category ?? "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onDelete,
					"aria-label": "Delete image",
					className: "absolute top-2 right-2 p-2 rounded-full bg-black/60 backdrop-blur text-destructive hover:bg-destructive hover:text-white transition border border-white/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-3 space-y-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: inp,
					placeholder: "Alt text",
					value: alt,
					onChange: (e) => setAlt(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: inp,
					value: category,
					onChange: (e) => setCategory(e.target.value),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "yard",
							children: "Yard"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "night",
							children: "Night"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "marani",
							children: "Marani"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "wine",
							children: "Wine"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inp,
						type: "number",
						placeholder: "Order",
						value: order,
						onChange: (e) => setOrder(Number(e.target.value))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-1 text-[10px] uppercase tracking-widest whitespace-nowrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: active,
							onChange: (e) => setActive(e.target.checked)
						}), " Active"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => save.mutate(),
					className: "w-full bg-gold hover:brightness-110 text-black py-1.5 rounded text-[10px] uppercase tracking-widest",
					children: "Save"
				})
			]
		})]
	});
}
//#endregion
export { GalleryAdmin as component };
