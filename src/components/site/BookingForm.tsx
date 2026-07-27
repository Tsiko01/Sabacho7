import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  booking_date: z.string().min(1),
  booking_time: z.string().optional().or(z.literal("")),
  guests: z.coerce.number().int().min(1).max(50),
  experience: z.string().max(60).optional(),
  message: z.string().max(2000).optional().or(z.literal("")),
});

export function BookingForm({ defaultExperience = "wine" }: { defaultExperience?: string } = {}) {
  const { t, lang } = useI18n();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd) as Record<string, string>;
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      setLoading(false);
      return;
    }
    const v = parsed.data;
    const { error } = await supabase.from("bookings").insert({
      name: v.name,
      email: v.email,
      phone: v.phone || null,
      booking_date: v.booking_date,
      booking_time: v.booking_time || null,
      guests: v.guests,
      experience: v.experience || null,
      message: v.message || null,
      language: lang,
    });
    setLoading(false);
    if (error) {
      toast.error(t("book.error"));
      return;
    }
    toast.success(t("book.success"), {
      description: `${v.name} · ${v.booking_date}${v.booking_time ? " · " + v.booking_time : ""} · ${v.guests} · ${t(`book.exp.${v.experience || "wine"}`)}`,
    });
    (e.target as HTMLFormElement).reset();
  }

  const inp = "w-full bg-background/40 border border-border/60 focus:border-gold outline-none rounded-md px-4 py-3 text-sm placeholder:text-muted-foreground/60 transition-colors";
  const lbl = "block text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-1.5";

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2" noValidate>
      <div>
        <label htmlFor="booking-name" className="sr-only">{t("book.name")}</label>
        <input id="booking-name" name="name" required placeholder={t("book.name")} className={inp} maxLength={100} autoComplete="name" />
      </div>
      <div>
        <label htmlFor="booking-email" className="sr-only">{t("book.email")}</label>
        <input id="booking-email" name="email" type="email" required placeholder={t("book.email")} className={inp} maxLength={255} autoComplete="email" />
      </div>
      <div>
        <label htmlFor="booking-phone" className="sr-only">{t("book.phone")}</label>
        <input id="booking-phone" name="phone" type="tel" placeholder={t("book.phone")} className={inp} maxLength={40} autoComplete="tel" />
      </div>
      <div>
        <label htmlFor="booking-guests" className="sr-only">{t("book.guests")}</label>
        <input id="booking-guests" name="guests" type="number" min={1} max={50} defaultValue={2} placeholder={t("book.guests")} className={inp} autoComplete="off" />
      </div>
      <div>
        <label htmlFor="booking_date" className={lbl}>{t("book.date")}</label>
        <input id="booking_date" name="booking_date" type="date" required className={inp} autoComplete="off" />
      </div>
      <div>
        <label htmlFor="booking_time" className={lbl}>{t("book.time")}</label>
        <input id="booking_time" name="booking_time" type="time" className={inp} autoComplete="off" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="booking-experience" className="sr-only">{t("book.experience")}</label>
        <select id="booking-experience" name="experience" defaultValue={defaultExperience} className={`${inp}`} aria-label={t("book.experience")}>
          <option value="wine" className="bg-background">{t("book.exp.wine")}</option>
          <option value="supra" className="bg-background">{t("book.exp.supra")}</option>
          <option value="private" className="bg-background">{t("book.exp.private")}</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="booking-message" className="sr-only">{t("book.message")}</label>
        <textarea id="booking-message" name="message" rows={4} placeholder={t("book.message")} className={`${inp} resize-none`} maxLength={2000} autoComplete="off" />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="sm:col-span-2 bg-carrot hover:bg-carrot-hover disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-3.5 rounded-md text-xs uppercase tracking-[0.25em] font-medium transition-all hover:scale-[1.01]"
      >
        {loading ? "…" : t("book.submit")}
      </button>
    </form>
  );
}