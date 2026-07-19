
-- Gallery images (managed via admin)
CREATE TABLE public.gallery_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  alt TEXT,
  category TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gallery_images TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_images TO authenticated;
GRANT ALL ON public.gallery_images TO service_role;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read active gallery" ON public.gallery_images FOR SELECT TO anon, authenticated USING (active = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins manage gallery" ON public.gallery_images FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER gallery_images_set_updated BEFORE UPDATE ON public.gallery_images FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Simple key/value site content (About page, restoration flag, etc.)
CREATE TABLE public.site_content (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read site content" ON public.site_content FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admins manage site content" ON public.site_content FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER site_content_set_updated BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Seed default About page + restoration notice
INSERT INTO public.site_content (key, value) VALUES
  ('about_page', '{
    "hero_title": "About SABACHO",
    "hero_subtitle": "A Georgian marani shaped by wine, people, and tradition — where every guest is welcomed as family.",
    "hero_image": "",
    "owner_name": "The Sabacho Family",
    "owner_role": "Owner & Host",
    "owner_bio": "Generations of Kakhetian winemakers welcome you into their home. Every bottle, every dish, every toast — made with our own hands.",
    "owner_image": "",
    "hosts": [
      {"name": "Nino", "role": "Hospitality & Kitchen", "bio": "Nino welcomes guests to the Supra table and shapes the food that pairs with our wine.", "image": ""},
      {"name": "Giorgi", "role": "Winemaker", "bio": "Giorgi tends the vines and the qvevri — following the family method his grandfather taught him.", "image": ""}
    ],
    "marani_title": "The Marani",
    "marani_body": "A marani is more than a cellar — it is the heart of a Georgian home. Ours is built of stone, cooled by earth, and filled with qvevri buried deep in the ground. Here wine is not made in factories, but in silence, patience, and prayer.",
    "marani_image": "",
    "village_title": "The Village",
    "village_body": "Sabacho sits in a quiet Kakhetian village, where mornings begin with mist over the vineyards and evenings end under vines heavy with grapes. The pace is slow, the hospitality unhurried, the wine honest.",
    "village_image": "",
    "cta_title": "Come and experience SABACHO",
    "cta_body": "Reserve an evening at our marani. We will be waiting for you."
  }'::jsonb),
  ('restoration', '{
    "active": true,
    "title": "SABACHO MARANI IS CURRENTLY UNDER RESTORATION",
    "body": "We are lovingly renewing our marani. Please contact us directly before planning a visit — we are happy to confirm availability and welcome you personally."
  }'::jsonb)
ON CONFLICT (key) DO NOTHING;
