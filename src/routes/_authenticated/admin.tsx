import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, Coffee, CalendarClock, LogOut, Image as ImageIcon, BookOpen, HelpCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  }
  const linkCls = "flex items-center gap-3 px-4 py-2.5 rounded-md text-sm hover:bg-gold/10 hover:text-gold transition";
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <aside className="w-64 border-r border-border/60 p-6 hidden md:flex flex-col justify-between">
        <div>
          <Link to="/" className="block mb-8">
            <div className="font-serif text-2xl tracking-[0.25em] text-gold">SABACHO</div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Admin</div>
          </Link>
          <nav className="space-y-1" aria-label="Admin navigation">
            <Link to="/admin" activeOptions={{ exact: true }} activeProps={{ className: "bg-gold/10 text-gold" }} className={linkCls}><LayoutDashboard className="w-4 h-4" aria-hidden="true" />Dashboard</Link>
            <Link to="/admin/tastings" activeProps={{ className: "bg-gold/10 text-gold" }} className={linkCls}><Coffee className="w-4 h-4" aria-hidden="true" />Tastings</Link>
            <Link to="/admin/gallery" activeProps={{ className: "bg-gold/10 text-gold" }} className={linkCls}><ImageIcon className="w-4 h-4" aria-hidden="true" />Gallery</Link>
            <Link to="/admin/about" activeProps={{ className: "bg-gold/10 text-gold" }} className={linkCls}><BookOpen className="w-4 h-4" aria-hidden="true" />About page</Link>
            <Link to="/admin/faqs" activeProps={{ className: "bg-gold/10 text-gold" }} className={linkCls}><HelpCircle className="w-4 h-4" aria-hidden="true" />FAQ</Link>
            <Link to="/admin/bookings" activeProps={{ className: "bg-gold/10 text-gold" }} className={linkCls}><CalendarClock className="w-4 h-4" aria-hidden="true" />Bookings</Link>
          </nav>
        </div>
        <button type="button" onClick={signOut} className={linkCls}><LogOut className="w-4 h-4" aria-hidden="true" />Sign out</button>
      </aside>
      <div className="md:hidden fixed top-0 inset-x-0 z-20 bg-background/90 backdrop-blur border-b border-border/60 flex items-center justify-between px-4 py-3">
        <Link to="/admin" className="font-serif text-lg tracking-[0.25em] text-gold">SABACHO</Link>
        <button type="button" onClick={signOut} className="text-xs uppercase tracking-widest text-muted-foreground">Sign out</button>
      </div>
      <div className="md:hidden fixed top-14 inset-x-0 z-10 bg-background border-b border-border/60 flex overflow-x-auto" role="tablist" aria-label="Admin navigation">
        <Link to="/admin" activeOptions={{ exact: true }} activeProps={{ className: "text-gold border-gold" }} className="px-4 py-2 text-xs uppercase tracking-widest border-b-2 border-transparent" role="tab">Dash</Link>
        <Link to="/admin/tastings" activeProps={{ className: "text-gold border-gold" }} className="px-4 py-2 text-xs uppercase tracking-widest border-b-2 border-transparent" role="tab">Tastings</Link>
        <Link to="/admin/gallery" activeProps={{ className: "text-gold border-gold" }} className="px-4 py-2 text-xs uppercase tracking-widest border-b-2 border-transparent" role="tab">Gallery</Link>
        <Link to="/admin/about" activeProps={{ className: "text-gold border-gold" }} className="px-4 py-2 text-xs uppercase tracking-widest border-b-2 border-transparent" role="tab">About</Link>
        <Link to="/admin/faqs" activeProps={{ className: "text-gold border-gold" }} className="px-4 py-2 text-xs uppercase tracking-widest border-b-2 border-transparent" role="tab">FAQ</Link>
        <Link to="/admin/bookings" activeProps={{ className: "text-gold border-gold" }} className="px-4 py-2 text-xs uppercase tracking-widest border-b-2 border-transparent" role="tab">Bookings</Link>
      </div>
      <main className="flex-1 p-6 md:p-10 pt-28 md:pt-10 overflow-auto"><Outlet /></main>
    </div>
  );
}