import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onCancel(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full max-w-md bg-background border border-destructive/40 rounded-2xl p-6 shadow-2xl animate-scale-in">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-full bg-destructive/15 text-destructive flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="font-serif text-2xl text-foreground">{title}</h3>
            {description && <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{description}</p>}
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 rounded text-xs uppercase tracking-widest border border-border hover:border-gold/60">{cancelLabel}</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded text-xs uppercase tracking-widest bg-destructive text-destructive-foreground hover:brightness-110">{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}