import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, Upload, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/site/ConfirmDialog";
import { resolveImageUrl } from "@/lib/assets";

export const Route = createFileRoute("/_authenticated/admin/gallery")({
  component: GalleryAdmin,
});

type Row = {
  id: string;
  image_url: string;
  alt: string | null;
  category: string | null;
  sort_order: number;
  active: boolean;
};

const CATEGORIES = ["yard", "night", "marani", "wine"] as const;

function GalleryAdmin() {
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [urlInput, setUrlInput] = useState("");
  const [urlCat, setUrlCat] = useState<string>("yard");
  const [pendingDelete, setPendingDelete] = useState<Row | null>(null);
  const [uploading, setUploading] = useState(false);

  const { data } = useQuery({
    queryKey: ["admin-gallery"],
    queryFn: async () =>
      ((await supabase.from("gallery_images").select("*").order("sort_order"))
        .data as unknown as Row[]) ?? [],
  });
  const rows = data ?? [];

  const addFromUrl = useMutation({
    mutationFn: async ({ url, category }: { url: string; category: string }) => {
      const { error } = await supabase
        .from("gallery_images")
        .insert({ image_url: url, category, sort_order: (rows.at(-1)?.sort_order ?? 0) + 1 });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-gallery"] });
      qc.invalidateQueries({ queryKey: ["gallery"] });
      toast.success("Added");
      setUrlInput("");
    },
    onError: (e) => toast.error((e as Error).message),
  });

  async function uploadFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop() ?? "jpg";
        const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("gallery")
          .upload(path, file, { contentType: file.type });
        if (upErr) throw upErr;
        const { data: signed } = await supabase.storage
          .from("gallery")
          .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
        const url = signed?.signedUrl;
        if (!url) throw new Error("Failed to get URL");
        const { error: insErr } = await supabase
          .from("gallery_images")
          .insert({
            image_url: url,
            alt: file.name,
            category: urlCat,
            sort_order: (rows.at(-1)?.sort_order ?? 0) + 1,
          });
        if (insErr) throw insErr;
      }
      qc.invalidateQueries({ queryKey: ["admin-gallery"] });
      qc.invalidateQueries({ queryKey: ["gallery"] });
      toast.success("Uploaded");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("gallery_images").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-gallery"] });
      qc.invalidateQueries({ queryKey: ["gallery"] });
      toast.success("Deleted");
      setPendingDelete(null);
    },
    onError: (e) => {
      toast.error((e as Error).message);
      setPendingDelete(null);
    },
  });

  const inp =
    "w-full bg-background/40 border border-border/60 focus:border-gold outline-none rounded px-3 py-2 text-sm";

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-4xl">Gallery</h1>
          <p className="text-sm text-muted-foreground">
            Add, remove and order photos shown on the public Gallery page.
          </p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 mb-8">
        <label className="border border-dashed border-border/60 rounded-xl p-6 flex items-center gap-4 cursor-pointer hover:border-gold/60 transition">
          <span className="w-11 h-11 rounded-full bg-gold/10 text-gold border border-gold/30 flex items-center justify-center">
            <Upload className="w-5 h-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block font-serif text-lg">
              {uploading ? "Uploading…" : "Upload images"}
            </span>
            <span className="block text-xs text-muted-foreground">
              JPG, PNG or WEBP. Multiple files supported.
            </span>
          </span>
          <input
            ref={fileRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => uploadFiles(e.target.files)}
            aria-label="Upload gallery images"
          />
        </label>
        <form
          className="border border-border/60 rounded-xl p-6 flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (urlInput.trim()) addFromUrl.mutate({ url: urlInput.trim(), category: urlCat });
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="w-11 h-11 rounded-full bg-gold/10 text-gold border border-gold/30 flex items-center justify-center"
              aria-hidden="true"
            >
              <LinkIcon className="w-5 h-5" />
            </span>
            <span>
              <span className="block font-serif text-lg">Add from URL</span>
              <span className="block text-xs text-muted-foreground">Paste an image URL.</span>
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="gallery-url-category" className="sr-only">
              Category
            </label>
            <select
              id="gallery-url-category"
              className={`${inp} max-w-[140px]`}
              value={urlCat}
              onChange={(e) => setUrlCat(e.target.value)}
              aria-label="Category for added image"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <label htmlFor="gallery-url-input" className="sr-only">
              Image URL
            </label>
            <input
              id="gallery-url-input"
              className={inp}
              placeholder="https://…"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
            />
            <button
              type="submit"
              className="bg-gold hover:brightness-110 text-black px-4 rounded text-xs uppercase tracking-widest"
            >
              Add
            </button>
          </div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
            Category applies to uploads and URL adds.
          </p>
        </form>
      </div>

      {rows.length === 0 ? (
        <div className="border border-dashed border-border/60 rounded-2xl p-14 text-center">
          <h3 className="font-serif text-2xl">No gallery images yet</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Upload or add photos to build the public gallery.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {rows.map((r) => (
            <GalleryTile key={r.id} row={r} onDelete={() => setPendingDelete(r)} />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete this image?"
        description="It will no longer appear in the public gallery. This action can't be undone."
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => pendingDelete && del.mutate(pendingDelete.id)}
      />
    </div>
  );
}

function GalleryTile({ row, onDelete }: { row: Row; onDelete: () => void }) {
  const qc = useQueryClient();
  const [alt, setAlt] = useState(row.alt ?? "");
  const [active, setActive] = useState(row.active);
  const [order, setOrder] = useState(row.sort_order);
  const [category, setCategory] = useState<string>(row.category ?? "yard");

  const save = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("gallery_images")
        .update({ alt, active, sort_order: order, category })
        .eq("id", row.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-gallery"] });
      qc.invalidateQueries({ queryKey: ["gallery"] });
      toast.success("Saved");
    },
    onError: (e) => toast.error((e as Error).message),
  });

  const inp =
    "w-full bg-background/40 border border-border/60 focus:border-gold outline-none rounded px-2 py-1.5 text-xs";
  return (
    <div className="border border-border/60 rounded-xl overflow-hidden bg-card">
      <div className="aspect-square overflow-hidden bg-secondary/40 relative">
        <img
          src={resolveImageUrl(row.image_url) ?? row.image_url}
          alt={row.alt ?? ""}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-2 left-2 bg-black/60 backdrop-blur border border-white/15 text-white text-[9px] uppercase tracking-[0.3em] px-2 py-1 rounded-full">
          {row.category ?? "—"}
        </span>
        <button
          type="button"
          onClick={onDelete}
          aria-label="Delete image"
          className="absolute top-2 right-2 p-2 rounded-full bg-black/60 backdrop-blur text-destructive hover:bg-destructive hover:text-white transition border border-white/10"
        >
          <Trash2 className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
      <div className="p-3 space-y-2">
        <label htmlFor={`gallery-alt-${row.id}`} className="sr-only">
          Alt text
        </label>
        <input
          id={`gallery-alt-${row.id}`}
          className={inp}
          placeholder="Alt text"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
        />
        <label htmlFor={`gallery-cat-${row.id}`} className="sr-only">
          Category
        </label>
        <select
          id={`gallery-cat-${row.id}`}
          className={inp}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Image category"
        >
          <option value="yard">Yard</option>
          <option value="night">Night</option>
          <option value="marani">Marani</option>
          <option value="wine">Wine</option>
        </select>
        <div className="flex items-center gap-2">
          <label htmlFor={`gallery-order-${row.id}`} className="sr-only">
            Sort order
          </label>
          <input
            id={`gallery-order-${row.id}`}
            className={inp}
            type="number"
            placeholder="Order"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
          />
          <label className="flex items-center gap-1 text-[10px] uppercase tracking-widest whitespace-nowrap">
            <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />{" "}
            Active
          </label>
        </div>
        <button
          type="button"
          onClick={() => save.mutate()}
          className="w-full bg-gold hover:brightness-110 text-black py-1.5 rounded text-[10px] uppercase tracking-widest"
        >
          Save
        </button>
      </div>
    </div>
  );
}
