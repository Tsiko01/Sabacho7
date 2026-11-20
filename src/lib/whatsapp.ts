import { WHATSAPP_URL } from "@/lib/constants";
import type { Lang } from "@/lib/i18n";

export type BookingExperience = "wine" | "supra" | "private";
export const BOOKING_EXPERIENCES: BookingExperience[] = ["wine", "supra", "private"];

export const isBookingExperience = (v: unknown): v is BookingExperience =>
  BOOKING_EXPERIENCES.includes(v as BookingExperience);

/** Event used to open the booking dialog from anywhere on the site. */
export const BOOKING_CHOICE_EVENT = "sabacho:booking-choice";
export type BookingChoiceDetail = { experience?: BookingExperience; step?: "choose" | "whatsapp" };

/** Opens the "Book on WhatsApp / Book on Website" chooser. */
export function openBookingChoice(experience?: BookingExperience): void {
  window.dispatchEvent(
    new CustomEvent<BookingChoiceDetail>(BOOKING_CHOICE_EVENT, { detail: { experience } }),
  );
}

/** Opens the WhatsApp booking form directly. */
export function openWhatsAppBooking(experience?: BookingExperience): void {
  window.dispatchEvent(
    new CustomEvent<BookingChoiceDetail>(BOOKING_CHOICE_EVENT, {
      detail: { experience, step: "whatsapp" },
    }),
  );
}

/** Official WhatsApp Click-to-Chat link with a pre-filled, URL-encoded message. */
export function whatsappUrl(text: string): string {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}

/**
 * Opens WhatsApp (app on mobile, WhatsApp Web on desktop) in a new tab.
 * Must run synchronously inside a click/submit handler so popup blockers allow it;
 * if the tab is still blocked, the current tab navigates to WhatsApp instead.
 */
export function openWhatsApp(text: string): void {
  const url = whatsappUrl(text);
  const win = window.open(url, "_blank");
  if (win) {
    try {
      win.opener = null;
    } catch {
      /* ignore */
    }
  } else {
    window.location.href = url;
  }
}

/** Today's date as YYYY-MM-DD in the visitor's timezone (same format as <input type="date">). */
export function todayLocal(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export type WhatsAppBooking = {
  name: string;
  experience: BookingExperience | "";
  guests: string;
  date: string;
  time: string;
  requests: string;
};

/** Field -> i18n error key suffix (`wa.err.<key>`). Empty object means the booking is valid. */
export type WhatsAppBookingErrors = Partial<Record<keyof WhatsAppBooking, string>>;

export function validateWhatsAppBooking(b: WhatsAppBooking): WhatsAppBookingErrors {
  const errors: WhatsAppBookingErrors = {};
  if (b.name.trim().length < 2) errors.name = "name";
  if (!isBookingExperience(b.experience)) errors.experience = "experience";
  const guests = Number(b.guests);
  if (!b.guests.trim() || !Number.isInteger(guests) || guests < 1 || guests > 50)
    errors.guests = "guests";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(b.date)) errors.date = "date";
  else if (b.date < todayLocal()) errors.date = "date_past";
  if (!/^\d{2}:\d{2}/.test(b.time)) errors.time = "time";
  return errors;
}

const DATE_LOCALES: Record<Lang, string> = { en: "en-GB", ka: "ka-GE", ru: "ru-RU", uk: "uk-UA" };

// Chrome ships without Georgian Intl data (it silently falls back to English), so format Georgian by hand.
const KA_MONTHS = [
  "იანვარი",
  "თებერვალი",
  "მარტი",
  "აპრილი",
  "მაისი",
  "ივნისი",
  "ივლისი",
  "აგვისტო",
  "სექტემბერი",
  "ოქტომბერი",
  "ნოემბერი",
  "დეკემბერი",
];
const KA_WEEKDAYS = [
  "კვირა",
  "ორშაბათი",
  "სამშაბათი",
  "ოთხშაბათი",
  "ხუთშაბათი",
  "პარასკევი",
  "შაბათი",
];

/** "2026-12-25" -> "Friday, 25 December 2026" in the visitor's language. */
function formatDate(iso: string, lang: Lang): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  if (lang === "ka") return `${KA_WEEKDAYS[date.getDay()]}, ${d} ${KA_MONTHS[m - 1]}, ${y}`;
  try {
    return new Intl.DateTimeFormat(DATE_LOCALES[lang], {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch {
    return iso;
  }
}

/** The reservation message, in the visitor's language (uses the `wa.msg.*` translations). */
export function buildWhatsAppMessage(
  t: (key: string) => string,
  lang: Lang,
  b: WhatsAppBooking,
): string {
  return [
    t("wa.msg.greeting"),
    "",
    t("wa.msg.intro"),
    "",
    `${t("wa.msg.name")}: ${b.name.trim()}`,
    `${t("wa.msg.experience")}: ${t(`exp.${b.experience}.title`)}`,
    `${t("wa.msg.guests")}: ${Number(b.guests)}`,
    `${t("wa.msg.date")}: ${formatDate(b.date, lang)}`,
    `${t("wa.msg.time")}: ${b.time}`,
    `${t("wa.msg.requests")}: ${b.requests.trim() || "—"}`,
    "",
    t("wa.msg.closing"),
  ].join("\n");
}
