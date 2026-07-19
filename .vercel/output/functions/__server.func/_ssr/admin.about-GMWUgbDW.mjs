import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { t as supabase } from "./client-DkzpAgPX.mjs";
import { d as Save, f as Plus, s as Trash2 } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.about-GMWUgbDW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AboutAdmin() {
	const qc = useQueryClient();
	const [about, setAbout] = (0, import_react.useState)({});
	const [rest, setRest] = (0, import_react.useState)({});
	const { data: aboutData } = useQuery({
		queryKey: ["site_content_admin", "about_page"],
		queryFn: async () => {
			const { data } = await supabase.from("site_content").select("value").eq("key", "about_page").maybeSingle();
			return data?.value ?? {};
		}
	});
	const { data: restData } = useQuery({
		queryKey: ["site_content_admin", "restoration"],
		queryFn: async () => {
			const { data } = await supabase.from("site_content").select("value").eq("key", "restoration").maybeSingle();
			return data?.value ?? {};
		}
	});
	(0, import_react.useEffect)(() => {
		if (aboutData) setAbout(aboutData);
	}, [aboutData]);
	(0, import_react.useEffect)(() => {
		if (restData) setRest(restData);
	}, [restData]);
	const saveAbout = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.from("site_content").upsert({
				key: "about_page",
				value: about
			}, { onConflict: "key" });
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["site_content", "about_page"] });
			toast.success("Saved");
		},
		onError: (e) => toast.error(e.message)
	});
	const saveRest = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.from("site_content").upsert({
				key: "restoration",
				value: rest
			}, { onConflict: "key" });
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["site_content", "restoration"] });
			toast.success("Saved");
		},
		onError: (e) => toast.error(e.message)
	});
	const inp = "w-full bg-background/40 border border-border/60 focus:border-gold outline-none rounded px-3 py-2 text-sm";
	const set = (k, v) => setAbout((a) => ({
		...a,
		[k]: v
	}));
	const hosts = about.hosts ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-4xl space-y-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-4xl",
				children: "About page"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Edit the story, people and images on the public About page."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: "Restoration notice",
				subtitle: "Shown on the Contact page.",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: rest.active ?? true,
							onChange: (e) => setRest((r) => ({
								...r,
								active: e.target.checked
							}))
						}), " Show notice"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inp,
						placeholder: "Notice title",
						value: rest.title ?? "",
						onChange: (e) => setRest((r) => ({
							...r,
							title: e.target.value
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: `${inp} min-h-24`,
						placeholder: "Notice body",
						value: rest.body ?? "",
						onChange: (e) => setRest((r) => ({
							...r,
							body: e.target.value
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => saveRest.mutate(),
							className: "inline-flex items-center gap-2 bg-gold hover:brightness-110 text-black px-4 py-2 rounded text-xs uppercase tracking-widest",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "w-4 h-4" }), "Save notice"]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: "Hero",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inp,
						placeholder: "Hero title",
						value: about.hero_title ?? "",
						onChange: (e) => set("hero_title", e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: `${inp} min-h-20`,
						placeholder: "Hero subtitle",
						value: about.hero_subtitle ?? "",
						onChange: (e) => set("hero_subtitle", e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inp,
						placeholder: "Hero image URL (optional)",
						value: about.hero_image ?? "",
						onChange: (e) => set("hero_image", e.target.value)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: "Owner",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inp,
							placeholder: "Owner name",
							value: about.owner_name ?? "",
							onChange: (e) => set("owner_name", e.target.value)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inp,
							placeholder: "Owner role",
							value: about.owner_role ?? "",
							onChange: (e) => set("owner_role", e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: `${inp} min-h-24`,
						placeholder: "Owner bio",
						value: about.owner_bio ?? "",
						onChange: (e) => set("owner_bio", e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inp,
						placeholder: "Owner image URL",
						value: about.owner_image ?? "",
						onChange: (e) => set("owner_image", e.target.value)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: "Hosts",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setAbout((a) => ({
						...a,
						hosts: [...a.hosts ?? [], {
							name: "",
							role: "",
							bio: "",
							image: ""
						}]
					})),
					className: "inline-flex items-center gap-2 border border-border hover:border-gold hover:text-gold px-3 py-1.5 rounded text-xs uppercase tracking-widest",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), "Add host"]
				}),
				children: [hosts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "No hosts yet."
				}), hosts.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-border/60 rounded-lg p-4 space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs uppercase tracking-widest text-muted-foreground",
								children: ["Host ", i + 1]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setAbout((a) => ({
									...a,
									hosts: (a.hosts ?? []).filter((_, j) => j !== i)
								})),
								className: "text-destructive hover:brightness-125",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 md:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inp,
								placeholder: "Name",
								value: h.name,
								onChange: (e) => setAbout((a) => ({
									...a,
									hosts: (a.hosts ?? []).map((x, j) => j === i ? {
										...x,
										name: e.target.value
									} : x)
								}))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inp,
								placeholder: "Role",
								value: h.role,
								onChange: (e) => setAbout((a) => ({
									...a,
									hosts: (a.hosts ?? []).map((x, j) => j === i ? {
										...x,
										role: e.target.value
									} : x)
								}))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							className: `${inp} min-h-20`,
							placeholder: "Bio",
							value: h.bio,
							onChange: (e) => setAbout((a) => ({
								...a,
								hosts: (a.hosts ?? []).map((x, j) => j === i ? {
									...x,
									bio: e.target.value
								} : x)
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inp,
							placeholder: "Image URL",
							value: h.image ?? "",
							onChange: (e) => setAbout((a) => ({
								...a,
								hosts: (a.hosts ?? []).map((x, j) => j === i ? {
									...x,
									image: e.target.value
								} : x)
							}))
						})
					]
				}, i))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: "Marani",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inp,
						placeholder: "Marani title",
						value: about.marani_title ?? "",
						onChange: (e) => set("marani_title", e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: `${inp} min-h-28`,
						placeholder: "Marani body",
						value: about.marani_body ?? "",
						onChange: (e) => set("marani_body", e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inp,
						placeholder: "Marani image URL",
						value: about.marani_image ?? "",
						onChange: (e) => set("marani_image", e.target.value)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: "Village",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inp,
						placeholder: "Village title",
						value: about.village_title ?? "",
						onChange: (e) => set("village_title", e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: `${inp} min-h-28`,
						placeholder: "Village body",
						value: about.village_body ?? "",
						onChange: (e) => set("village_body", e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inp,
						placeholder: "Village image URL",
						value: about.village_image ?? "",
						onChange: (e) => set("village_image", e.target.value)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: "Final CTA",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: inp,
					placeholder: "CTA title",
					value: about.cta_title ?? "",
					onChange: (e) => set("cta_title", e.target.value)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: `${inp} min-h-20`,
					placeholder: "CTA body",
					value: about.cta_body ?? "",
					onChange: (e) => set("cta_body", e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky bottom-4 flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => saveAbout.mutate(),
					className: "inline-flex items-center gap-2 bg-carrot hover:bg-carrot-hover text-white px-6 py-3 rounded text-xs uppercase tracking-widest shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "w-4 h-4" }), " Save About page"]
				})
			})
		]
	});
}
function Section({ title, subtitle, action, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "border border-border/60 rounded-2xl bg-card p-6 space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-serif text-2xl",
				children: title
			}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: subtitle
			})] }), action]
		}), children]
	});
}
//#endregion
export { AboutAdmin as component };
