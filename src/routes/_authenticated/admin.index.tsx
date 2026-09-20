import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Coffee, CalendarClock, ImageIcon, Mail } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Dashboard,
});

type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  booking_date: string;
  booking_time: string | null;
  guests: number;
  experience: string | null;
  status: string;
  created_at: string;
};

function Dashboard() {
  const { data } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const [t, b, pending, g] = await Promise.all([
        supabase.from("tastings").select("id", { count: "exact", head: true }),
        supabase.from("bookings").select("id", { count: "exact", head: true }),
        supabase
          .from("bookings")
          .select("id", { count: "exact", head: true })
          .eq("status", "pending"),
        supabase.from("gallery_images").select("id", { count: "exact", head: true }),
      ]);
      return {
        tastings: t.count ?? 0,
        bookings: b.count ?? 0,
        pending: pending.count ?? 0,
        gallery: g.count ?? 0,
      };
    },
  });
  const stats = data ?? { tastings: 0, bookings: 0, pending: 0, gallery: 0 };

  const { data: latest } = useQuery({
    queryKey: ["admin-latest-bookings"],
    queryFn: async () => {
      const { data } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(8);
      return (data ?? []) as unknown as Booking[];
    },
  });
  const bookings = latest ?? [];

  return (
    <div className="max-w-6xl">
      <h1 className="font-serif text-4xl mb-2">Dashboard</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Manage tastings, gallery, and reservations.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={<Coffee aria-hidden="true" />} label="Tastings" value={stats.tastings} />
        <Stat icon={<ImageIcon aria-hidden="true" />} label="Gallery" value={stats.gallery} />
        <Stat icon={<CalendarClock aria-hidden="true" />} label="Bookings" value={stats.bookings} />
        <Stat
          icon={<CalendarClock aria-hidden="true" />}
          label="Pending"
          value={stats.pending}
          accent
        />
      </div>

      <div className="mt-12">
        <div className="flex items-end justify-between mb-5">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-gold">Reservations</div>
            <h2 className="font-serif text-3xl mt-1">Recent bookings</h2>
          </div>
          <Link
            to="/admin/bookings"
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-gold border-b border-border hover:border-gold pb-1"
          >
            View all
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="border border-dashed border-border/60 rounded-2xl p-14 text-center">
            <div
              className="w-14 h-14 rounded-full bg-gold/10 text-gold border border-gold/30 mx-auto flex items-center justify-center"
              aria-hidden="true"
            >
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl mt-5">No reservations yet</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
              When guests reserve an evening through the site, their requests will appear here.
            </p>
          </div>
        ) : (
          <div className="border border-border/60 rounded-2xl bg-card overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground border-b border-border/60 bg-secondary/30">
              <div className="col-span-3">Guest</div>
              <div className="col-span-3">Contact</div>
              <div className="col-span-2">Date · Guests</div>
              <div className="col-span-2">Experience</div>
              <div className="col-span-2 text-right">Status</div>
            </div>
            <ul className="divide-y divide-border/60">
              {bookings.map((b) => (
                <li
                  key={b.id}
                  className="px-5 py-4 md:grid md:grid-cols-12 md:gap-4 md:items-center"
                >
                  <div className="md:col-span-3">
                    <div className="font-serif text-lg">{b.name}</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">
                      {new Date(b.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="md:col-span-3 text-sm mt-1 md:mt-0">
                    <a href={`mailto:${b.email}`} className="hover:text-gold block truncate">
                      {b.email}
                    </a>
                    {b.phone && (
                      <a
                        href={`tel:${b.phone}`}
                        className="hover:text-gold text-muted-foreground text-xs"
                      >
                        {b.phone}
                      </a>
                    )}
                  </div>
                  <div className="md:col-span-2 text-sm mt-1 md:mt-0">
                    <div>
                      {b.booking_date}
                      {b.booking_time ? ` · ${b.booking_time.slice(0, 5)}` : ""}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {b.guests} guest{b.guests === 1 ? "" : "s"}
                    </div>
                  </div>
                  <div className="md:col-span-2 text-sm text-muted-foreground mt-1 md:mt-0 capitalize">
                    {b.experience ?? "—"}
                  </div>
                  <div className="md:col-span-2 mt-2 md:mt-0 md:text-right">
                    <StatusPill status={b.status} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const style: Record<string, string> = {
    pending: "bg-gold/15 text-gold border-gold/40",
    confirmed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/40",
    cancelled: "bg-destructive/15 text-destructive border-destructive/40",
  };
  return (
    <span
      className={`inline-block text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 rounded-full border ${style[status] ?? style.pending}`}
    >
      {status}
    </span>
  );
}

function Stat({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-5 border ${accent ? "border-gold/60 bg-gold/5" : "border-border/60 bg-card"}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
        <span className={accent ? "text-gold" : "text-muted-foreground"}>{icon}</span>
      </div>
      <div className={`mt-2 font-serif text-4xl ${accent ? "text-gold" : ""}`}>{value}</div>
    </div>
  );
}
