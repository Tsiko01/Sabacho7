import { useEffect } from "react";
import { X } from "lucide-react";

export function DetailOverlay({
  open,
  onClose,
  image,
  eyebrow,
  title,
  intro,
  sections,
  onBook,
  bookLabel = "Book Now",
}: {
  open: boolean;
  onClose: () => void;
  image?: string | null;
  eyebrow?: string;
  title: string;
  intro?: string;
  sections?: { label: string; value: string }[];
  onBook?: () => void;
  bookLabel?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-6 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[95vh] bg-background border border-gold/30 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-black/60 flex flex-col animate-scale-in"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-black/50 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:bg-black/70 hover:border-gold/60 transition"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="overflow-y-auto">
          {image && (
            <div className="relative w-full h-56 sm:h-72 md:h-96 overflow-hidden">
              <img src={image} alt={title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              {eyebrow && (
                <div className="absolute bottom-5 left-6 flex items-center gap-3">
                  <span className="h-px w-8 bg-gold/70" />
                  <span className="text-[10px] uppercase tracking-[0.4em] text-gold">{eyebrow}</span>
                </div>
              )}
            </div>
          )}
          <div className="p-6 md:p-10">
          <h2 className="font-serif text-3xl md:text-5xl leading-tight text-foreground">{title}</h2>
          {intro && <p className="mt-4 text-muted-foreground leading-relaxed md:text-lg">{intro}</p>}
          {sections && sections.length > 0 && (
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {sections.map((s, i) => (
                <div key={i} className="border-t border-border/60 pt-4">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-gold">{s.label}</div>
                  <div className="mt-2 text-sm text-foreground/90 leading-relaxed whitespace-pre-line">{s.value}</div>
                </div>
              ))}
            </div>
          )}
          {onBook && (
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => { onBook(); onClose(); }}
                className="flex-1 bg-carrot hover:bg-carrot-hover text-white px-8 py-4 rounded-md text-xs uppercase tracking-[0.3em] font-medium transition-all hover:scale-[1.01] shadow-xl"
              >
                {bookLabel}
              </button>
              <button
                onClick={onClose}
                className="border border-border hover:border-gold/60 text-foreground px-8 py-4 rounded-md text-xs uppercase tracking-[0.3em]"
              >
                Close
              </button>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}