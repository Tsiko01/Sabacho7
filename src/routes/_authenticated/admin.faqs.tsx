import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Save } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/site/ConfirmDialog";

export const Route = createFileRoute("/_authenticated/admin/faqs")({
  component: FaqsAdmin,
});

type Faq = {
  id: string;
  question: string;
  question_ka: string | null;
  question_ru: string | null;
  question_uk: string | null;
  answer: string;
  answer_ka: string | null;
  answer_ru: string | null;
  answer_uk: string | null;
  sort_order: number;
  active: boolean;
};

function FaqsAdmin() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-faqs"],
    queryFn: async () =>
      ((await supabase.from("faqs").select("*").order("sort_order")).data as unknown as Faq[]) ??
      [],
  });
  const items = data ?? [];

  const add = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("faqs").insert({
        question: "New question",
        answer: "New answer",
        sort_order: (items.at(-1)?.sort_order ?? 0) + 1,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-faqs"] });
      qc.invalidateQueries({ queryKey: ["faqs"] });
      toast.success("Added");
    },
    onError: (e) => toast.error((e as Error).message),
  });

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-4xl">Frequently Asked Questions</h1>
          <p className="text-sm text-muted-foreground">
            Manage FAQ content shown on the homepage. Available in all four languages.
          </p>
        </div>
        <button
          type="button"
          onClick={() => add.mutate()}
          className="inline-flex items-center gap-2 bg-carrot hover:bg-carrot-hover text-white px-4 py-2 rounded text-xs uppercase tracking-widest"
        >
          <Plus className="w-4 h-4" aria-hidden="true" /> Add FAQ
        </button>
      </div>
      <div className="space-y-4">
        {items.map((f) => (
          <FaqEditor key={f.id} row={f} />
        ))}
        {items.length === 0 && (
          <div className="text-sm text-muted-foreground border border-dashed border-border/60 rounded-lg p-8 text-center">
            No FAQs yet. Add your first one.
          </div>
        )}
      </div>
    </div>
  );
}

function FaqEditor({ row }: { row: Faq }) {
  const qc = useQueryClient();
  const [form, setForm] = useState(row);
  const [open, setOpen] = useState(false);
  const [askDelete, setAskDelete] = useState(false);
  const inp =
    "w-full bg-background/40 border border-border/60 focus:border-gold outline-none rounded px-3 py-2 text-sm";

  const save = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("faqs")
        .update({
          question: form.question,
          question_ka: form.question_ka,
          question_ru: form.question_ru,
          question_uk: form.question_uk,
          answer: form.answer,
          answer_ka: form.answer_ka,
          answer_ru: form.answer_ru,
          answer_uk: form.answer_uk,
          sort_order: form.sort_order,
          active: form.active,
        })
        .eq("id", row.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Saved");
      qc.invalidateQueries({ queryKey: ["admin-faqs"] });
      qc.invalidateQueries({ queryKey: ["faqs"] });
    },
    onError: (e) => toast.error((e as Error).message),
  });

  const del = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("faqs").delete().eq("id", row.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["admin-faqs"] });
      qc.invalidateQueries({ queryKey: ["faqs"] });
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
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/40"
        aria-expanded={open}
        aria-controls={`faq-editor-${row.id}`}
      >
        <div className="min-w-0">
          <div className="font-serif text-lg truncate">{form.question || "(empty question)"}</div>
          <div className="text-xs text-muted-foreground">
            order {form.sort_order} · {form.active ? "Visible" : "Hidden"}
          </div>
        </div>
        <span className="text-gold text-xs uppercase tracking-widest shrink-0 ml-4">
          {open ? "Close" : "Edit"}
        </span>
      </button>
      {open && (
        <div
          id={`faq-editor-${row.id}`}
          className="p-5 border-t border-border/60 grid gap-3 md:grid-cols-2"
        >
          <div className="md:col-span-2 text-[10px] uppercase tracking-[0.3em] text-gold">
            Question
          </div>
          <input
            className={inp}
            placeholder="Question (EN)"
            value={form.question}
            onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
          />
          <input
            className={inp}
            placeholder="Question (KA / ქართული)"
            value={form.question_ka ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, question_ka: e.target.value }))}
          />
          <input
            className={inp}
            placeholder="Question (RU / Русский)"
            value={form.question_ru ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, question_ru: e.target.value }))}
          />
          <input
            className={inp}
            placeholder="Question (UK / Українська)"
            value={form.question_uk ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, question_uk: e.target.value }))}
          />

          <div className="md:col-span-2 mt-2 text-[10px] uppercase tracking-[0.3em] text-gold">
            Answer
          </div>
          <textarea
            className={`${inp} md:col-span-2 min-h-24`}
            placeholder="Answer (EN)"
            value={form.answer}
            onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))}
          />
          <textarea
            className={`${inp} min-h-24`}
            placeholder="Answer (KA / ქართული)"
            value={form.answer_ka ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, answer_ka: e.target.value }))}
          />
          <textarea
            className={`${inp} min-h-24`}
            placeholder="Answer (RU / Русский)"
            value={form.answer_ru ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, answer_ru: e.target.value }))}
          />
          <textarea
            className={`${inp} min-h-24 md:col-span-2`}
            placeholder="Answer (UK / Українська)"
            value={form.answer_uk ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, answer_uk: e.target.value }))}
          />

          <input
            className={inp}
            type="number"
            placeholder="Sort order"
            value={form.sort_order}
            onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))}
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
            />{" "}
            Visible on site
          </label>

          <div className="md:col-span-2 flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setAskDelete(true)}
              className="inline-flex items-center gap-2 border border-destructive/60 text-destructive hover:bg-destructive hover:text-destructive-foreground px-4 py-2 rounded text-xs uppercase tracking-widest transition"
            >
              <Trash2 className="w-4 h-4" aria-hidden="true" /> Delete
            </button>
            <button
              type="button"
              onClick={() => save.mutate()}
              className="inline-flex items-center gap-2 bg-gold hover:brightness-110 text-black px-4 py-2 rounded text-xs uppercase tracking-widest"
            >
              <Save className="w-4 h-4" aria-hidden="true" /> Save
            </button>
          </div>
        </div>
      )}
      <ConfirmDialog
        open={askDelete}
        title="Delete this FAQ?"
        description="This question and its translations will be removed from the site. This action can't be undone."
        confirmLabel="Delete FAQ"
        onCancel={() => setAskDelete(false)}
        onConfirm={() => del.mutate()}
      />
    </div>
  );
}
