import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/site/ConfirmDialog";

export const Route = createFileRoute("/_authenticated/admin/bookings")({
  component: BookingsAdmin,
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
  message: string | null;
  status: string;
  language: string | null;
  created_at: string;
};

const STATUSES = ["pending", "confirmed", "cancelled"] as const;

function BookingsAdmin() {
  const qc = useQueryClient();
  const [pendingDelete, setPendingDelete] = useState<Booking | null>(null);
  const { data } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async () =>
      ((await supabase.from("bookings").select("*").order("created_at", { ascending: false }))
        .data as unknown as Booking[]) ?? [],
  });
  const items = data ?? [];

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
      if (error) throw error;
      // Fire notification email (non-blocking)
      try {
        await supabase.functions.invoke("send-booking-email", {
          body: { booking_id: id, kind: status },
        });
      } catch {
        /* email is best-effort */
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-bookings"] });
      qc.invalidateQueries({ queryKey: ["admin-dashboard"] });
      toast.success("Updated");
    },
    onError: (e) => toast.error((e as Error).message),
  });
  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("bookings").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-bookings"] });
      qc.invalidateQueries({ queryKey: ["admin-dashboard"] });
      toast.success("Deleted");
      setPendingDelete(null);
    },
    onError: (e) => toast.error((e as Error).message),
  });

  return (
    <div className="max-w-6xl">
      <h1 className="font-serif text-4xl mb-2">Bookings</h1>
      <p className="text-sm text-muted-foreground mb-6">Reservation requests from the website.</p>
      {items.length === 0 && <p className="text-sm text-muted-foreground">No reservations yet.</p>}
      <div className="space-y-3">
        {items.map((b) => (
          <div key={b.id} className="border border-border/60 rounded-xl bg-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="font-serif text-xl">{b.name}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  <span className="uppercase tracking-widest text-[10px] text-gold mr-1">Date</span>
                  {b.booking_date}
                  {b.booking_time && (
                    <>
                      <span className="uppercase tracking-widest text-[10px] text-gold ml-3 mr-1">
                        Time
                      </span>
                      {b.booking_time.slice(0, 5)}
                    </>
                  )}
                  <span className="ml-3">
                    · {b.guests} guests · {b.experience ?? "—"}
                  </span>
                  {b.language && (
                    <span className="ml-3 uppercase text-[10px] tracking-widest text-muted-foreground/60">
                      {b.language}
                    </span>
                  )}
                </div>
                <div className="text-sm mt-2">
                  <a href={`mailto:${b.email}`} className="hover:text-gold">
                    {b.email}
                  </a>
                  {b.phone && (
                    <>
                      {" "}
                      ·{" "}
                      <a href={`tel:${b.phone}`} className="hover:text-gold">
                        {b.phone}
                      </a>
                    </>
                  )}
                </div>
                {b.message && (
                  <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line">
                    {b.message}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor={`booking-status-${b.id}`} className="sr-only">
                  Status
                </label>
                <select
                  id={`booking-status-${b.id}`}
                  value={b.status}
                  onChange={(e) => updateStatus.mutate({ id: b.id, status: e.target.value })}
                  className="bg-background border border-border rounded px-3 py-2 text-xs uppercase tracking-widest"
                  aria-label="Booking status"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setPendingDelete(b)}
                  className="p-2 border border-destructive/50 text-destructive hover:bg-destructive/10 rounded"
                  aria-label={`Delete booking for ${b.name}`}
                >
                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete booking?"
        description={pendingDelete ? `${pendingDelete.name} · ${pendingDelete.booking_date}` : ""}
        confirmLabel="Delete"
        onConfirm={() => pendingDelete && del.mutate(pendingDelete.id)}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
