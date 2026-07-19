import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { i as useI18n } from "./i18n-CruZlRQi.mjs";
import { t as supabase } from "./client-DkzpAgPX.mjs";
import { _ as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.login-DTJxrYec.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminLoginPage() {
	const { t } = useI18n();
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(async ({ data }) => {
			if (data.session) {
				const { data: isAdmin } = await supabase.rpc("has_role", {
					_user_id: data.session.user.id,
					_role: "admin"
				});
				if (isAdmin) navigate({ to: "/admin" });
			}
		});
	}, [navigate]);
	async function submit(e) {
		e.preventDefault();
		setLoading(true);
		try {
			if (mode === "signup") {
				const { data, error } = await supabase.auth.signUp({
					email,
					password,
					options: { emailRedirectTo: `${window.location.origin}/admin/login` }
				});
				if (error) throw error;
				if (!data.session) {
					toast.success("Check your email to confirm, then sign in.");
					setMode("signin");
					return;
				}
				const { data: claimed } = await supabase.rpc("claim_admin_if_first_user");
				if (!claimed) {
					toast.error("Admin already exists — contact the owner.");
					await supabase.auth.signOut();
					return;
				}
				toast.success("Admin account created.");
				navigate({ to: "/admin" });
			} else {
				const { error } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				if (error) throw error;
				const { data: { user } } = await supabase.auth.getUser();
				if (!user) throw new Error("No user");
				const { data: isAdmin } = await supabase.rpc("has_role", {
					_user_id: user.id,
					_role: "admin"
				});
				if (!isAdmin) {
					await supabase.auth.signOut();
					throw new Error("Not an admin account.");
				}
				toast.success("Welcome");
				navigate({ to: "/admin" });
			}
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center px-6 bg-background text-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "block text-center mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-serif text-3xl tracking-[0.25em] text-gold",
					children: "SABACHO"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-[0.35em] text-muted-foreground mt-1",
					children: "Admin"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-2xl p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-serif text-3xl mb-2",
						children: t("admin.login")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground mb-6",
						children: mode === "signup" ? t("admin.signup_hint") : "Sign in with your admin credentials."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: submit,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								required: true,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								placeholder: t("admin.email"),
								className: "w-full bg-background/40 border border-border focus:border-gold outline-none rounded px-4 py-3 text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								required: true,
								minLength: 8,
								value: password,
								onChange: (e) => setPassword(e.target.value),
								placeholder: t("admin.password"),
								className: "w-full bg-background/40 border border-border focus:border-gold outline-none rounded px-4 py-3 text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								disabled: loading,
								className: "w-full bg-carrot hover:bg-carrot-hover text-white py-3 rounded text-xs uppercase tracking-[0.25em] disabled:opacity-60",
								children: loading ? "…" : t("admin.signin")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setMode((m) => m === "signin" ? "signup" : "signin"),
						className: "mt-4 text-xs text-muted-foreground hover:text-gold w-full text-center",
						children: mode === "signin" ? t("admin.signup_hint") : "← Back to sign in"
					})
				]
			})]
		})
	});
}
//#endregion
export { AdminLoginPage as component };
