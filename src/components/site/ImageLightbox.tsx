import { useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Fullscreen-style image lightbox.
 *
 * This is the same lightbox that is used on the Gallery page, extracted into a
 * shared component so the home page "About" images can reuse it instead of
 * maintaining a second implementation. It preserves the original visuals:
 * near-black overlay, centered image, close button and prev/next arrows.
 */
export function ImageLightbox({
  open,
  src,
  alt,
  onClose,
  onPrev,
  onNext,
  footer,
}: {
  open: boolean;
  src?: string | null;
  alt?: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  footer?: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (!open) {
      wasOpenRef.current = false;
      return;
    }
    if (!wasOpenRef.current) {
      wasOpenRef.current = true;
      lastFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      dialogRef.current?.focus();
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "ArrowRight" && onNext) onNext();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lastFocusedRef.current?.focus();
      lastFocusedRef.current = null;
    };
  }, [open, onClose, onNext, onPrev]);

  if (!open || !src) return null;

  return (
    <div
      ref={dialogRef}
      tabIndex={-1}
      className="fixed inset-0 bg-black/95 z-[70] flex items-center justify-center p-4 animate-fade-in outline-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt || "Image lightbox"}
    >
      <button
        type="button"
        className="absolute top-4 right-4 md:top-6 md:right-6 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20"
        aria-label="Close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <X className="w-5 h-5" aria-hidden="true" />
      </button>
      {onPrev && (
        <button
          type="button"
          className="absolute left-3 md:left-6 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20"
          aria-label="Previous image"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
        >
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
        </button>
      )}
      {onNext && (
        <button
          type="button"
          className="absolute right-3 md:right-6 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20"
          aria-label="Next image"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
        >
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </button>
      )}
      <img
        src={src}
        alt={alt ?? "Sabacho gallery image"}
        onClick={(e) => e.stopPropagation()}
        className="max-w-full max-h-full object-contain rounded-lg animate-scale-in"
      />
      {footer && (
        <div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 py-2 px-4 rounded-full bg-black/70 backdrop-blur border border-white/20"
          onClick={(e) => e.stopPropagation()}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
