import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Save, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/about")({
  component: AboutAdmin,
});

type Host = { name: string; role: string; bio: string; image?: string };
type AboutContent = {
  hero_title?: string;
  hero_subtitle?: string;
  hero_image?: string;
  owner_name?: string;
  owner_role?: string;
  owner_bio?: string;
  owner_image?: string;
  hosts?: Host[];
  marani_title?: string;
  marani_body?: string;
  marani_image?: string;
  village_title?: string;
  village_body?: string;
  village_image?: string;
  cta_title?: string;
  cta_body?: string;
};
type Restoration = { active?: boolean; title?: string; body?: string };

function AboutAdmin() {
  const qc = useQueryClient();
  const [about, setAbout] = useState<AboutContent>({});
  const [rest, setRest] = useState<Restoration>({});

  const { data: aboutData } = useQuery({
    queryKey: ["site_content_admin", "about_page"],
    queryFn: async () => {
      const { data } = await supabase
        .from("site_content")
        .select("value")
        .eq("key", "about_page")
        .maybeSingle();
      return (data?.value as AboutContent) ?? {};
    },
  });
  const { data: restData } = useQuery({
    queryKey: ["site_content_admin", "restoration"],
    queryFn: async () => {
      const { data } = await supabase
        .from("site_content")
        .select("value")
        .eq("key", "restoration")
        .maybeSingle();
      return (data?.value as Restoration) ?? {};
    },
  });

  useEffect(() => {
    if (aboutData) setAbout(aboutData);
  }, [aboutData]);
  useEffect(() => {
    if (restData) setRest(restData);
  }, [restData]);

  const saveAbout = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("site_content")
        .upsert({ key: "about_page", value: about }, { onConflict: "key" });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["site_content", "about_page"] });
      toast.success("Saved");
    },
    onError: (e) => toast.error((e as Error).message),
  });
  const saveRest = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("site_content")
        .upsert({ key: "restoration", value: rest }, { onConflict: "key" });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["site_content", "restoration"] });
      toast.success("Saved");
    },
    onError: (e) => toast.error((e as Error).message),
  });

  const inp =
    "w-full bg-background/40 border border-border/60 focus:border-gold outline-none rounded px-3 py-2 text-sm";
  const set = <K extends keyof AboutContent>(k: K, v: AboutContent[K]) =>
    setAbout((a) => ({ ...a, [k]: v }));
  const hosts = about.hosts ?? [];

  return (
    <div className="max-w-4xl space-y-12">
      <div>
        <h1 className="font-serif text-4xl">About page</h1>
        <p className="text-sm text-muted-foreground">
          Edit the story, people and images on the public About page.
        </p>
      </div>

      <Section title="Restoration notice" subtitle="Shown on the Contact page.">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={rest.active ?? true}
            onChange={(e) => setRest((r) => ({ ...r, active: e.target.checked }))}
          />{" "}
          Show notice
        </label>
        <input
          className={inp}
          placeholder="Notice title"
          value={rest.title ?? ""}
          onChange={(e) => setRest((r) => ({ ...r, title: e.target.value }))}
        />
        <textarea
          className={`${inp} min-h-24`}
          placeholder="Notice body"
          value={rest.body ?? ""}
          onChange={(e) => setRest((r) => ({ ...r, body: e.target.value }))}
        />
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => saveRest.mutate()}
            className="inline-flex items-center gap-2 bg-gold hover:brightness-110 text-black px-4 py-2 rounded text-xs uppercase tracking-widest"
          >
            <Save className="w-4 h-4" aria-hidden="true" />
            Save notice
          </button>
        </div>
      </Section>

      <Section title="Hero">
        <input
          className={inp}
          placeholder="Hero title"
          value={about.hero_title ?? ""}
          onChange={(e) => set("hero_title", e.target.value)}
        />
        <textarea
          className={`${inp} min-h-20`}
          placeholder="Hero subtitle"
          value={about.hero_subtitle ?? ""}
          onChange={(e) => set("hero_subtitle", e.target.value)}
        />
        <input
          className={inp}
          placeholder="Hero image URL (optional)"
          value={about.hero_image ?? ""}
          onChange={(e) => set("hero_image", e.target.value)}
        />
      </Section>

      <Section title="Owner">
        <div className="grid gap-3 md:grid-cols-2">
          <input
            className={inp}
            placeholder="Owner name"
            value={about.owner_name ?? ""}
            onChange={(e) => set("owner_name", e.target.value)}
          />
          <input
            className={inp}
            placeholder="Owner role"
            value={about.owner_role ?? ""}
            onChange={(e) => set("owner_role", e.target.value)}
          />
        </div>
        <textarea
          className={`${inp} min-h-24`}
          placeholder="Owner bio"
          value={about.owner_bio ?? ""}
          onChange={(e) => set("owner_bio", e.target.value)}
        />
        <input
          className={inp}
          placeholder="Owner image URL"
          value={about.owner_image ?? ""}
          onChange={(e) => set("owner_image", e.target.value)}
        />
      </Section>

      <Section
        title="Hosts"
        action={
          <button
            type="button"
            onClick={() =>
              setAbout((a) => ({
                ...a,
                hosts: [...(a.hosts ?? []), { name: "", role: "", bio: "", image: "" }],
              }))
            }
            className="inline-flex items-center gap-2 border border-border hover:border-gold hover:text-gold px-3 py-1.5 rounded text-xs uppercase tracking-widest"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            Add host
          </button>
        }
      >
        {hosts.length === 0 && <p className="text-sm text-muted-foreground">No hosts yet.</p>}
        {hosts.map((h, i) => (
          <div key={i} className="border border-border/60 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                Host {i + 1}
              </span>
              <button
                type="button"
                onClick={() =>
                  setAbout((a) => ({ ...a, hosts: (a.hosts ?? []).filter((_, j) => j !== i) }))
                }
                className="text-destructive hover:brightness-125"
                aria-label={`Delete host ${h.name || i + 1}`}
              >
                <Trash2 className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              <input
                className={inp}
                placeholder="Name"
                value={h.name}
                onChange={(e) =>
                  setAbout((a) => ({
                    ...a,
                    hosts: (a.hosts ?? []).map((x, j) =>
                      j === i ? { ...x, name: e.target.value } : x,
                    ),
                  }))
                }
              />
              <input
                className={inp}
                placeholder="Role"
                value={h.role}
                onChange={(e) =>
                  setAbout((a) => ({
                    ...a,
                    hosts: (a.hosts ?? []).map((x, j) =>
                      j === i ? { ...x, role: e.target.value } : x,
                    ),
                  }))
                }
              />
            </div>
            <textarea
              className={`${inp} min-h-20`}
              placeholder="Bio"
              value={h.bio}
              onChange={(e) =>
                setAbout((a) => ({
                  ...a,
                  hosts: (a.hosts ?? []).map((x, j) =>
                    j === i ? { ...x, bio: e.target.value } : x,
                  ),
                }))
              }
            />
            <input
              className={inp}
              placeholder="Image URL"
              value={h.image ?? ""}
              onChange={(e) =>
                setAbout((a) => ({
                  ...a,
                  hosts: (a.hosts ?? []).map((x, j) =>
                    j === i ? { ...x, image: e.target.value } : x,
                  ),
                }))
              }
            />
          </div>
        ))}
      </Section>

      <Section title="Marani">
        <input
          className={inp}
          placeholder="Marani title"
          value={about.marani_title ?? ""}
          onChange={(e) => set("marani_title", e.target.value)}
        />
        <textarea
          className={`${inp} min-h-28`}
          placeholder="Marani body"
          value={about.marani_body ?? ""}
          onChange={(e) => set("marani_body", e.target.value)}
        />
        <input
          className={inp}
          placeholder="Marani image URL"
          value={about.marani_image ?? ""}
          onChange={(e) => set("marani_image", e.target.value)}
        />
      </Section>

      <Section title="Village">
        <input
          className={inp}
          placeholder="Village title"
          value={about.village_title ?? ""}
          onChange={(e) => set("village_title", e.target.value)}
        />
        <textarea
          className={`${inp} min-h-28`}
          placeholder="Village body"
          value={about.village_body ?? ""}
          onChange={(e) => set("village_body", e.target.value)}
        />
        <input
          className={inp}
          placeholder="Village image URL"
          value={about.village_image ?? ""}
          onChange={(e) => set("village_image", e.target.value)}
        />
      </Section>

      <Section title="Final CTA">
        <input
          className={inp}
          placeholder="CTA title"
          value={about.cta_title ?? ""}
          onChange={(e) => set("cta_title", e.target.value)}
        />
        <textarea
          className={`${inp} min-h-20`}
          placeholder="CTA body"
          value={about.cta_body ?? ""}
          onChange={(e) => set("cta_body", e.target.value)}
        />
      </Section>

      <div className="sticky bottom-4 flex justify-end">
        <button
          type="button"
          onClick={() => saveAbout.mutate()}
          className="inline-flex items-center gap-2 bg-carrot hover:bg-carrot-hover text-white px-6 py-3 rounded text-xs uppercase tracking-widest shadow-2xl"
        >
          <Save className="w-4 h-4" aria-hidden="true" /> Save About page
        </button>
      </div>
    </div>
  );
}

function Section({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="border border-border/60 rounded-2xl bg-card p-6 space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl">{title}</h2>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
