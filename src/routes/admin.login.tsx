import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/login")({
  ssr: false,
  head: () => ({ meta: [{ title: "Admin — Sabacho" }, { name: "robots", content: "noindex" }] }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (data.session) {
        const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: data.session.user.id, _role: "admin" });
        if (isAdmin) navigate({ to: "/admin" });
      }
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin/login` } });
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
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("No user");
        const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
        if (!isAdmin) {
          await supabase.auth.signOut();
          throw new Error("Not an admin account.");
        }
        toast.success("Welcome");
        navigate({ to: "/admin" });
      }
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background text-foreground">
      <div className="w-full max-w-md">
        <Link to="/" className="block text-center mb-8">
          <div className="font-serif text-3xl tracking-[0.25em] text-gold">SABACHO</div>
          <div className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground mt-1">Admin</div>
        </Link>
        <div className="glass rounded-2xl p-8">
          <h1 className="font-serif text-3xl mb-2">{t("admin.login")}</h1>
          <p className="text-sm text-muted-foreground mb-6">{mode === "signup" ? t("admin.signup_hint") : "Sign in with your admin credentials."}</p>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="sr-only">{t("admin.email")}</label>
              <input id="admin-email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder={t("admin.email")} className="w-full bg-background/40 border border-border focus:border-gold outline-none rounded px-4 py-3 text-sm" autoComplete="email" />
            </div>
            <div>
              <label htmlFor="admin-password" className="sr-only">{t("admin.password")}</label>
              <input id="admin-password" type="password" required minLength={8} value={password} onChange={e => setPassword(e.target.value)} placeholder={t("admin.password")} className="w-full bg-background/40 border border-border focus:border-gold outline-none rounded px-4 py-3 text-sm" autoComplete="current-password" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-carrot hover:bg-carrot-hover text-white py-3 rounded text-xs uppercase tracking-[0.25em] disabled:opacity-60">
              {loading ? "…" : t("admin.signin")}
            </button>
          </form>
          <button type="button" onClick={() => setMode(m => m === "signin" ? "signup" : "signin")} className="mt-4 text-xs text-muted-foreground hover:text-gold w-full text-center">
            {mode === "signin" ? t("admin.signup_hint") : "← Back to sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}