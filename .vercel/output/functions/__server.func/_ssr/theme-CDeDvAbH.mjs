import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/theme-CDeDvAbH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ThemeCtx = (0, import_react.createContext)(null);
function ThemeProvider({ children }) {
	const [theme, setTheme] = (0, import_react.useState)("dark");
	(0, import_react.useEffect)(() => {
		const saved = typeof window !== "undefined" && localStorage.getItem("sabacho-theme") || "dark";
		setTheme(saved);
	}, []);
	(0, import_react.useEffect)(() => {
		if (typeof document === "undefined") return;
		document.documentElement.classList.toggle("dark", theme === "dark");
		try {
			localStorage.setItem("sabacho-theme", theme);
		} catch {}
	}, [theme]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeCtx.Provider, {
		value: {
			theme,
			toggle: () => setTheme((t) => t === "dark" ? "light" : "dark"),
			setTheme
		},
		children
	});
}
function useTheme() {
	const c = (0, import_react.useContext)(ThemeCtx);
	if (!c) throw new Error("useTheme outside provider");
	return c;
}
//#endregion
export { useTheme as n, ThemeProvider as t };
