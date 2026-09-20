import { useEffect, useState } from "react";
import { Phone, MapPin, X, MessageCircle } from "lucide-react";
import { MAPS_URL, PHONE, WHATSAPP_URL } from "@/lib/constants";

type Action = {
  label: string;
  href: string;
  target?: string;
  icon: React.ReactNode;
  className: string;
};

export function FloatingButtons() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const actions: Action[] = [
    {
      label: "Location",
      href: MAPS_URL,
      target: "_blank",
      icon: <MapPin className="w-5 h-5" />,
      className: "bg-gold text-black",
    },
    {
      label: "WhatsApp",
      href: WHATSAPP_URL,
      target: "_blank",
      icon: <MessageCircle className="w-5 h-5" />,
      className: "bg-[#25D366] text-white",
    },
    {
      label: "Call",
      href: `tel:${PHONE}`,
      icon: <Phone className="w-5 h-5" />,
      className: "bg-carrot text-white",
    },
  ];

  return (
    <div className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40">
      <div className="flex flex-col items-end gap-3">
        {actions.map((a, i) => (
          <a
            key={a.label}
            href={a.href}
            target={a.target}
            rel={a.target === "_blank" ? "noopener noreferrer" : undefined}
            aria-label={a.label}
            tabIndex={open ? 0 : -1}
            className={`flex items-center gap-3 pr-0 transition-all duration-500 ${
              open
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-6 pointer-events-none"
            }`}
            style={{ transitionDelay: open ? `${i * 70}ms` : `${(actions.length - i) * 30}ms` }}
          >
            <span className="hidden sm:inline-block bg-background/85 backdrop-blur border border-border/60 text-foreground text-[10px] uppercase tracking-[0.3em] px-3 py-2 rounded-full shadow-lg">
              {a.label}
            </span>
            <span
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl shadow-black/40 hover:scale-110 transition-transform ${a.className}`}
            >
              {a.icon}
            </span>
          </a>
        ))}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open contact menu"}
          aria-expanded={open}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl shadow-black/50 transition-all duration-500 ${
            open
              ? "bg-background border border-gold text-gold rotate-90"
              : "bg-carrot hover:bg-carrot-hover text-white hover:scale-110"
          }`}
        >
          {open ? <X className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
}
