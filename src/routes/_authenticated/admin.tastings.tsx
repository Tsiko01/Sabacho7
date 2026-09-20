import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Save, Upload } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/site/ConfirmDialog";
import { resolveImageUrl } from "@/lib/assets";

export const Route = createFileRoute("/_authenticated/admin/tastings")({
  component: TastingsAdmin,
});

type Row = {
  id: string;
  name: string;
  name_ka: string | null;
  name_ru: string | null;
  name_uk: string | null;
  category: string | null;
  description: string | null;
  description_ka: string | null;
  description_ru: string | null;
  description_uk: string | null;
  taste_notes: string | null;
  image_url: string | null;
  sort_order: number;
  active: boolean;
};

function TastingsAdmin() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-tastings"],
    queryFn: async () =>
      ((await supabase.from("tastings").select("*").order("sort_order"))
        .data as unknown as Row[]) ?? [],
  });
  const items = data ?? [];
  const add = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("tastings")
        .insert({ name: "New item", sort_order: (items.at(-1)?.sort_order ?? 0) + 1 });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-tastings"] });
      toast.success("Added");
    },
    onError: (e) => toast.error((e as Error).message),
  });
  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-4xl">Tastings</h1>
          <p className="text-sm text-muted-foreground">
            Manage the tasting menu — wines, spirits, pairings.
          </p>
        </div>
        <button
          onClick={() => add.mutate()}
          className="inline-flex items-center gap-2 bg-carrot hover:bg-carrot-hover text-white px-4 py-2 rounded text-xs uppercase tracking-widest"
        >
          <Plus className="w-4 h-4" /> Add item
        </button>
      </div>
      <div className="space-y-4">
        {items.map((r) => (
          <Editor key={r.id} row={r} />
        ))}
      </div>
    </div>
  );
}

function Editor({ row }: { row: Row }) {
  const qc = useQueryClient();
  const [form, setForm] = useState(row);
  const [open, setOpen] = useState(false);
  const [askDelete, setAskDelete] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const inp =
    "w-full bg-background/40 border border-border/60 focus:border-gold outline-none rounded px-3 py-2 text-sm";

  const save = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("tastings")
        .update({
          name: form.name,
          name_ka: form.name_ka,
          name_ru: form.name_ru,
          name_uk: form.name_uk,
          category: form.category,
          description: form.description,
          description_ka: form.description_ka,
          description_ru: form.description_ru,
          description_uk: form.description_uk,
          taste_notes: form.taste_notes,
          image_url: form.image_url,
          sort_order: form.sort_order,
          active: form.active,
        })
        .eq("id", row.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Saved");
      qc.invalidateQueries({ queryKey: ["admin-tastings"] });
      qc.invalidateQueries({ queryKey: ["tastings-public"] });
    },
    onError: (e) => toast.error((e as Error).message),
  });

  async function uploadImage(file: File) {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `tastings/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("gallery")
        .upload(path, file, { contentType: file.type });
      if (upErr) throw upErr;
      const { data: signed } = await supabase.storage
        .from("gallery")
        .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
      const url = signed?.signedUrl;
      if (!url) throw new Error("Failed to get URL");
      setForm((f) => ({ ...f, image_url: url }));
      toast.success("Uploaded — remember to save");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }
  const del = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("tastings").delete().eq("id", row.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["admin-tastings"] });
      qc.invalidateQueries({ queryKey: ["tastings-public"] });
      setAskDelete(false);
    },
    onError: (e) => {
      toast.error((e as Error).message);
      setAskDelete(false);
    },
  });

  return (
    <div className="border border-border/60 rounded-xl bg-card">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/40"
      >
        <div>
          <div className="font-serif text-xl">{form.name}</div>
          <div className="text-xs text-muted-foreground">
            {form.category ?? "—"} · {form.active ? "Active" : "Hidden"}
          </div>
        </div>
        <span className="text-gold text-xs uppercase tracking-widest">
          {open ? "Close" : "Edit"}
        </span>
      </button>
      {open && (
        <div className="p-5 border-t border-border/60 grid gap-3 md:grid-cols-2">
          <input
            className={inp}
            placeholder="Name (EN)"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <input
            className={inp}
            placeholder="Category"
            value={form.category ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
          />
          <input
            className={inp}
            placeholder="Name (KA)"
            value={form.name_ka ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, name_ka: e.target.value }))}
          />
          <input
            className={inp}
            placeholder="Name (RU)"
            value={form.name_ru ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, name_ru: e.target.value }))}
          />
          <input
            className={inp}
            placeholder="Name (UK)"
            value={form.name_uk ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, name_uk: e.target.value }))}
          />
          <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 items-start">
            {form.image_url ? (
              <img
                src={resolveImageUrl(form.image_url) ?? form.image_url ?? ""}
                alt=""
                className="w-28 h-28 rounded-lg object-cover border border-border/60"
              />
            ) : (
              <div className="w-28 h-28 rounded-lg border border-dashed border-border/60 flex items-center justify-center text-[10px] uppercase tracking-widest text-muted-foreground">
                No image
              </div>
            )}
            <div className="flex-1 space-y-2 w-full">
              <label className="inline-flex items-center gap-2 border border-border hover:border-gold hover:text-gold px-4 py-2 rounded text-xs uppercase tracking-widest cursor-pointer">
                <Upload className="w-4 h-4" /> {uploading ? "Uploading…" : "Upload image"}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) uploadImage(f);
                  }}
                />
              </label>
              <input
                className={inp}
                placeholder="Or paste image URL"
                value={form.image_url ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
              />
            </div>
          </div>
          <textarea
            className={`${inp} md:col-span-2 min-h-20`}
            placeholder="Description (EN)"
            value={form.description ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          />
          <textarea
            className={`${inp} min-h-20`}
            placeholder="Description (KA)"
            value={form.description_ka ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, description_ka: e.target.value }))}
          />
          <textarea
            className={`${inp} min-h-20`}
            placeholder="Description (RU)"
            value={form.description_ru ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, description_ru: e.target.value }))}
          />
          <textarea
            className={`${inp} min-h-20`}
            placeholder="Description (UK)"
            value={form.description_uk ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, description_uk: e.target.value }))}
          />
          <input
            className={inp}
            placeholder="Taste notes"
            value={form.taste_notes ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, taste_notes: e.target.value }))}
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
            />{" "}
            Active
          </label>
          <div className="md:col-span-2 flex justify-end gap-2 pt-2">
            <button
              onClick={() => setAskDelete(true)}
              className="inline-flex items-center gap-2 border border-destructive/60 text-destructive hover:bg-destructive hover:text-destructive-foreground px-4 py-2 rounded text-xs uppercase tracking-widest transition"
            >
              <Trash2 className="w-4 h-4" /> Delete tasting
            </button>
            <button
              onClick={() => save.mutate()}
              className="inline-flex items-center gap-2 bg-gold hover:brightness-110 text-black px-4 py-2 rounded text-xs uppercase tracking-widest"
            >
              <Save className="w-4 h-4" /> Save
            </button>
          </div>
        </div>
      )}
      <ConfirmDialog
        open={askDelete}
        title={`Delete "${form.name}"?`}
        description="This tasting item will be removed. This action can't be undone."
        confirmLabel="Delete tasting"
        onCancel={() => setAskDelete(false)}
        onConfirm={() => del.mutate()}
      />
    </div>
  );
}
