import { Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, MapPin, Sun, Moon, Globe } from "lucide-react";
import { useI18n, LANGS, type Lang } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { MAPS_URL } from "@/lib/constants";

const NAV_ITEMS = [
  { key: "nav.home", to: "/", hash: "" },
  { key: "nav.about", to: "/about", hash: "" },
  { key: "nav.tasting", to: "/tasting", hash: "" },
  { key: "nav.gallery", to: "/gallery", hash: "" },
  { key: "nav.contact", to: "/contact", hash: "" },
] as const;

export function Header() {
  const { t, lang, setLang } = useI18n();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-16 md:h-20">
        <Link to="/" className="flex items-baseline gap-2 group">
          <span className="font-serif text-2xl md:text-3xl tracking-[0.25em] text-gold">
            SABACHO
          </span>
          <span className="hidden sm:inline text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
            Marani
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.to === "/" ? currentPath === "/" : currentPath.startsWith(item.to);
            return (
              <a
                key={item.key + item.hash}
                href={`${item.to}${item.hash}`}
                className="text-xs uppercase tracking-[0.2em] text-foreground/80 hover:text-gold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                aria-current={isActive ? "page" : undefined}
              >
                {t(item.key)}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 md:gap-2">
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="p-2 rounded-md hover:bg-foreground/10 transition-colors flex items-center gap-1 text-xs uppercase tracking-widest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              aria-label={`Language: ${lang.toUpperCase()}`}
              aria-expanded={langOpen}
              aria-haspopup="true"
            >
              <Globe className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">{lang}</span>
            </button>
            {langOpen && (
              <div
                className="absolute right-0 mt-2 min-w-[160px] glass rounded-md p-1 shadow-2xl"
                onMouseLeave={() => setLangOpen(false)}
                role="menu"
                aria-label="Select language"
              >
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code as Lang);
                      setLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-gold/10 flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                      lang === l.code ? "text-gold" : ""
                    }`}
                    role="menuitem"
                    aria-current={lang === l.code ? "true" : undefined}
                  >
                    <span aria-hidden="true">{l.flag}</span> {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={toggle}
            className="p-2 rounded-md hover:bg-foreground/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Moon className="w-4 h-4" aria-hidden="true" />
            )}
          </button>

          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex p-2 rounded-md hover:bg-foreground/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            aria-label={t("nav.location")}
          >
            <MapPin className="w-4 h-4" aria-hidden="true" />
          </a>

          <a
            href="/#book"
            className="hidden md:inline-flex items-center gap-2 bg-carrot hover:bg-carrot-hover text-white px-5 py-2 rounded-md text-xs uppercase tracking-[0.2em] font-medium transition-all hover:scale-[1.03] shadow-lg shadow-black/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            {t("cta.book")}
          </a>

          <button
            className="lg:hidden p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden glass border-t border-border/40">
          <nav className="flex flex-col p-4 gap-1" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.to === "/" ? currentPath === "/" : currentPath.startsWith(item.to);
              return (
                <a
                  key={item.key + item.hash}
                  href={`${item.to}${item.hash}`}
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 rounded text-sm uppercase tracking-[0.2em] hover:bg-gold/10 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  aria-current={isActive ? "page" : undefined}
                >
                  {t(item.key)}
                </a>
              );
            })}
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-3 rounded text-sm uppercase tracking-[0.2em] hover:bg-gold/10 hover:text-gold flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <MapPin className="w-4 h-4" aria-hidden="true" /> {t("nav.location")}
            </a>
            <a
              href="/#book"
              onClick={() => setOpen(false)}
              className="mt-2 text-center bg-carrot hover:bg-carrot-hover text-white px-5 py-3 rounded-md text-xs uppercase tracking-[0.2em] font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {t("cta.book")}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
