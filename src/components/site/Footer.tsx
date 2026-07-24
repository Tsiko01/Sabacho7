import { Facebook, Instagram, Youtube, MapPin, Phone as PhoneIcon, Mail } from "lucide-react";
import { useI18n, LANGS, type Lang } from "@/lib/i18n";
import { SOCIALS, MAPS_URL, PHONE, EMAIL } from "@/lib/constants";
import logo from "/logo.png";

export function Footer() {
  const { t, lang, setLang } = useI18n();
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-2">
            <img src={logo} alt="Sabacho Marani" className="h-10 w-auto object-contain" />
            <div>
              <div className="font-serif text-3xl tracking-[0.25em] text-gold">SABACHO</div>
              <div className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Marani</div>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">{t("footer.tagline")}</p>
          <a href="#book" className="mt-6 inline-flex items-center gap-2 bg-carrot hover:bg-carrot-hover text-white px-5 py-2.5 rounded-md text-xs uppercase tracking-[0.2em] font-medium transition-all">
            {t("cta.book")}
          </a>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.25em] text-gold mb-4">{t("nav.contact")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /><a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gold">{t("contact.address")}</a></li>
            <li className="flex items-center gap-2"><PhoneIcon className="w-4 h-4" /><a href={`tel:${PHONE}`} className="hover:text-gold">{PHONE}</a></li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4" /><a href={`mailto:${EMAIL}`} className="hover:text-gold">{EMAIL}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.25em] text-gold mb-4">{t("contact.follow")}</h4>
          <div className="flex gap-3">
            <a href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded border border-gold/30 hover:border-gold hover:bg-gold/10 flex items-center justify-center transition"><Facebook className="w-4 h-4" /></a>
            <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded border border-gold/30 hover:border-gold hover:bg-gold/10 flex items-center justify-center transition"><Instagram className="w-4 h-4" /></a>
            <a href={SOCIALS.tiktok} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded border border-gold/30 hover:border-gold hover:bg-gold/10 flex items-center justify-center transition" aria-label="TikTok">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V9.65a8.16 8.16 0 0 0 4.77 1.52V7.72a4.85 4.85 0 0 1-1.84-1.03Z"/></svg>
            </a>
            <a href={SOCIALS.youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded border border-gold/30 hover:border-gold hover:bg-gold/10 flex items-center justify-center transition"><Youtube className="w-4 h-4" /></a>
          </div>
          <div className="mt-6">
            <select
              value={lang}
              onChange={e => setLang(e.target.value as Lang)}
              className="bg-transparent border border-border/60 text-sm rounded px-3 py-2 focus:border-gold outline-none"
            >
              {LANGS.map(l => <option key={l.code} value={l.code} className="bg-background">{l.flag} {l.label}</option>)}
            </select>
          </div>
        </div>
      </div>
      <div className="border-t border-border/40 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Sabacho Marani. {t("footer.rights")}
      </div>
    </footer>
  );
}