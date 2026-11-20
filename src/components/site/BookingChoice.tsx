import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { CalendarCheck, ChevronRight, X } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import {
  BOOKING_CHOICE_EVENT,
  BOOKING_EXPERIENCES,
  buildWhatsAppMessage,
  isBookingExperience,
  openWhatsApp,
  openWhatsAppBooking,
  todayLocal,
  validateWhatsAppBooking,
  type BookingChoiceDetail,
  type WhatsAppBooking,
  type WhatsAppBookingErrors,
} from "@/lib/whatsapp";

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

const EMPTY: WhatsAppBooking = {
  name: "",
  experience: "wine",
  guests: "2",
  date: "",
  time: "",
  requests: "",
};
// Order used to focus the first invalid field.
const FIELD_ORDER: (keyof WhatsAppBooking)[] = ["name", "experience", "guests", "date", "time"];

// Same input / label styles as the website booking form.
const inputClass = (invalid: boolean) =>
  `w-full bg-background/40 border ${invalid ? "border-destructive/70" : "border-border/60"} focus:border-gold outline-none rounded-md px-4 py-3 text-base sm:text-sm placeholder:text-muted-foreground/60 transition-colors`;
const labelClass = "block text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-1.5";

function Field({
  id,
  label,
  optional,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  optional?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
        {optional && (
          <span className="normal-case tracking-normal text-muted-foreground/70">
            {" "}
            · {optional}
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

/** The experience the visitor already picked in the website form, if any (read-only). */
function selectedWebsiteExperience() {
  const value = (document.getElementById("booking-experience") as HTMLSelectElement | null)?.value;
  return isBookingExperience(value) ? value : undefined;
}

/**
 * Booking dialog: "Book on WhatsApp" / "Book on Website", plus the WhatsApp booking form.
 *
 * Every existing "Book Now" / "Reserve" link points at /#book. Clicks on those links are observed
 * (never cancelled), so each link keeps its original behaviour — scrolling/navigating to the original
 * booking form, closing the mobile menu — and this dialog opens on top. Buttons that aren't links
 * (the experience overlays, the WhatsApp option under the form) open it via `openBookingChoice()` /
 * `openWhatsAppBooking()`.
 */
export function BookingChoice() {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"choose" | "whatsapp">("choose");
  const [form, setForm] = useState<WhatsAppBooking>(EMPTY);
  const [errors, setErrors] = useState<WhatsAppBookingErrors>({});
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);
  const show = useCallback((detail: BookingChoiceDetail) => {
    const experience = detail.experience ?? selectedWebsiteExperience();
    if (experience) setForm((f) => ({ ...f, experience }));
    setErrors({});
    setStep(detail.step ?? "choose");
    setOpen(true);
  }, []);

  // Open on any "Book Now" link click, or on the custom event.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!(a instanceof HTMLAnchorElement)) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== "/" || url.hash !== "#book")
        return;
      const experience = a.dataset.bookingExperience;
      show({ experience: isBookingExperience(experience) ? experience : undefined });
    };
    const onOpen = (e: Event) => show((e as CustomEvent<BookingChoiceDetail>).detail ?? {});
    document.addEventListener("click", onClick, true);
    window.addEventListener(BOOKING_CHOICE_EVENT, onOpen);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener(BOOKING_CHOICE_EVENT, onOpen);
    };
  }, [show]);

  // Escape to close + lock page scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  // Focus management on open / step change.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (panel) panel.scrollTop = 0;
    const desktop = window.matchMedia("(pointer: fine)").matches;
    if (step === "whatsapp" && desktop)
      document.getElementById("wa-name")?.focus({ preventScroll: true });
    else panel?.focus({ preventScroll: true });
  }, [open, step]);

  if (!open) return null;

  const chooseWebsite = () => {
    close();
    const book = document.getElementById("book");
    if (book) book.scrollIntoView({ behavior: "smooth" });
    else window.location.assign("/#book");
  };

  const update =
    (key: keyof WhatsAppBooking) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setForm((f) => ({ ...f, [key]: value }));
      setErrors((errs) => {
        if (!errs[key]) return errs;
        const next = { ...errs };
        delete next[key];
        return next;
      });
    };

  const submitWhatsApp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validateWhatsAppBooking(form);
    setErrors(errs);
    const firstInvalid = FIELD_ORDER.find((k) => errs[k]);
    if (firstInvalid) {
      document.getElementById(`wa-${firstInvalid}`)?.focus();
      return;
    }
    // Still inside the submit gesture, so the new tab isn't popup-blocked.
    openWhatsApp(buildWhatsAppMessage(t, lang, form));
    close();
    toast.success(t("wa.opening"));
  };

  const err = (key: keyof WhatsAppBooking) =>
    errors[key] ? t(`wa.err.${errors[key]}`) : undefined;
  const aria = (key: keyof WhatsAppBooking) => ({
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `wa-${key}-error` : undefined,
  });

  const option =
    "group w-full flex items-center gap-4 text-left rounded-xl border border-border/60 hover:border-gold/60 hover:bg-gold/5 p-4 transition-all";
  const iconWrap =
    "w-11 h-11 rounded-full border border-gold/40 text-gold flex items-center justify-center shrink-0";

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-choice-title"
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close} />
      <div
        ref={panelRef}
        tabIndex={-1}
        className={`relative w-full ${step === "whatsapp" ? "max-w-xl" : "max-w-md"} max-h-[92vh] overflow-y-auto bg-background border border-gold/30 rounded-t-3xl sm:rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/60 outline-none animate-scale-in`}
      >
        <button
          type="button"
          onClick={close}
          aria-label={t("cta.close")}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full border border-border/60 hover:border-gold/60 text-muted-foreground hover:text-gold flex items-center justify-center transition"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>

        {step === "choose" ? (
          <div key="choose" className="animate-fade-in">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-gold">
                {t("cta.book")}
              </span>
            </div>
            <h2
              id="booking-choice-title"
              className="font-serif text-3xl leading-tight text-foreground pr-10"
            >
              {t("wa.choose_title")}
            </h2>
            <div className="mt-6 grid gap-3">
              <button
                type="button"
                onClick={() => {
                  setErrors({});
                  setStep("whatsapp");
                }}
                className={option}
              >
                <span className={iconWrap}>
                  <WhatsAppIcon className="w-5 h-5" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-xs uppercase tracking-[0.25em] font-medium text-foreground group-hover:text-gold transition-colors">
                    {t("wa.option_whatsapp")}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground leading-snug">
                    {t("wa.option_whatsapp_desc")}
                  </span>
                </span>
                <ChevronRight className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
              </button>
              <button type="button" onClick={chooseWebsite} className={option}>
                <span className={iconWrap}>
                  <CalendarCheck className="w-5 h-5" aria-hidden="true" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-xs uppercase tracking-[0.25em] font-medium text-foreground group-hover:text-gold transition-colors">
                    {t("wa.option_website")}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground leading-snug">
                    {t("wa.option_website_desc")}
                  </span>
                </span>
                <ChevronRight className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
              </button>
            </div>
          </div>
        ) : (
          <form key="whatsapp" onSubmit={submitWhatsApp} noValidate className="animate-fade-in">
            <div className="flex items-center gap-3 mb-3 text-gold">
              <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase tracking-[0.5em]">
                {t("wa.option_whatsapp")}
              </span>
            </div>
            <h2
              id="booking-choice-title"
              className="font-serif text-3xl leading-tight text-foreground pr-10"
            >
              {t("wa.form_title")}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {t("wa.form_subtitle")}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-6">
              <Field
                id="wa-name"
                label={t("wa.form_name")}
                error={err("name")}
                className="sm:col-span-6"
              >
                <input
                  id="wa-name"
                  name="name"
                  value={form.name}
                  onChange={update("name")}
                  maxLength={100}
                  autoComplete="name"
                  className={inputClass(!!errors.name)}
                  {...aria("name")}
                />
              </Field>
              <Field
                id="wa-experience"
                label={t("wa.form_experience")}
                error={err("experience")}
                className="sm:col-span-6"
              >
                <select
                  id="wa-experience"
                  name="experience"
                  value={form.experience}
                  onChange={update("experience")}
                  className={inputClass(!!errors.experience)}
                  {...aria("experience")}
                >
                  {BOOKING_EXPERIENCES.map((x) => (
                    <option key={x} value={x} className="bg-background">
                      {t(`book.exp.${x}`)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field
                id="wa-guests"
                label={t("wa.form_guests")}
                error={err("guests")}
                className="sm:col-span-2"
              >
                <input
                  id="wa-guests"
                  name="guests"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={50}
                  value={form.guests}
                  onChange={update("guests")}
                  className={inputClass(!!errors.guests)}
                  {...aria("guests")}
                />
              </Field>
              <Field
                id="wa-date"
                label={t("wa.form_date")}
                error={err("date")}
                className="sm:col-span-2"
              >
                <input
                  id="wa-date"
                  name="date"
                  type="date"
                  min={todayLocal()}
                  value={form.date}
                  onChange={update("date")}
                  className={inputClass(!!errors.date)}
                  {...aria("date")}
                />
              </Field>
              <Field
                id="wa-time"
                label={t("wa.form_time")}
                error={err("time")}
                className="sm:col-span-2"
              >
                <input
                  id="wa-time"
                  name="time"
                  type="time"
                  value={form.time}
                  onChange={update("time")}
                  className={inputClass(!!errors.time)}
                  {...aria("time")}
                />
              </Field>
              <Field
                id="wa-requests"
                label={t("wa.form_requests")}
                optional={t("wa.form_optional")}
                className="sm:col-span-6"
              >
                <textarea
                  id="wa-requests"
                  name="requests"
                  rows={3}
                  maxLength={1000}
                  value={form.requests}
                  onChange={update("requests")}
                  className={`${inputClass(false)} resize-none`}
                />
              </Field>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-carrot hover:bg-carrot-hover text-white px-8 py-4 rounded-md text-xs uppercase tracking-[0.3em] font-medium transition-all hover:scale-[1.01] shadow-xl"
              >
                <WhatsAppIcon className="w-4 h-4" />
                {t("wa.form_submit")}
              </button>
              <button
                type="button"
                onClick={close}
                className="border border-border hover:border-gold/60 text-foreground px-8 py-4 rounded-md text-xs uppercase tracking-[0.3em] transition-colors"
              >
                {t("cta.close")}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/** "or — Book on WhatsApp" option shown directly below the original booking form. */
export function WhatsAppBookingOption() {
  const { t } = useI18n();
  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      <div className="flex items-center gap-3" aria-hidden="true">
        <span className="h-px w-8 bg-gold/60" />
        <span className="text-[10px] uppercase tracking-[0.5em] text-gold">{t("wa.or")}</span>
        <span className="h-px w-8 bg-gold/60" />
      </div>
      <button
        type="button"
        onClick={() => openWhatsAppBooking()}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-gold hover:bg-gold hover:text-black text-gold px-6 py-3 rounded-md text-xs uppercase tracking-[0.25em] transition-all"
      >
        <WhatsAppIcon className="w-4 h-4" />
        {t("wa.option_whatsapp")}
      </button>
    </div>
  );
}
