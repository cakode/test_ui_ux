import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";

type NavLink = { label: string; to: string; external?: boolean };
type CTA = { label: string; to: string; external?: boolean };

export default function BuioHeader({
  logoSrc = "/logo.svg",
  logoAlt = "Logo",
  links,
  cta,
  className = "",
}: {
  logoSrc?: string;
  logoAlt?: string;
  links: NavLink[];
  cta?: CTA;
  className?: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const firstMobileLinkRef = useRef<HTMLAnchorElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const t = setTimeout(() => firstMobileLinkRef.current?.focus(), 50);
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
      document.addEventListener("keydown", onKey);
      return () => {
        clearTimeout(t);
        document.removeEventListener("keydown", onKey);
      };
    }
  }, [menuOpen]);

  const isActive = useMemo(
    () => (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to)),
    [pathname]
  );

  const baseHeader =
    "sticky top-0 z-50 border-b border-white/10 backdrop-blur bg-white/5" +
    (scrolled ? " shadow-lg shadow-black/20" : "");
  const container = "mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8";
  const linkBase = "inline-flex items-center rounded-xl px-2.5 py-2 text-sm/5 transition-opacity";
  const linkActive = "text-white";
  const linkMuted = "text-[--color-muted] hover:text-white hover:opacity-100 opacity-90";

  return (
    <header className={`${baseHeader} ${className}`} data-scrolled={scrolled}>
      <div className={`${container} h-16 flex items-center justify-between`}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Home">
          <img src={logoSrc} alt={logoAlt} className="h-7 w-auto select-none" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1.5">
          {links.map((l) =>
            l.external ? (
              <a
                key={l.to}
                href={l.to}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkBase} ${linkMuted}`}
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.to}
                to={l.to}
                className={`${linkBase} ${isActive(l.to) ? linkActive : linkMuted}`}
                aria-current={isActive(l.to) ? "page" : undefined}
              >
                {l.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA + Mobile trigger */}
        <div className="flex items-center gap-3">
          {cta &&
            (cta.external ? (
              <a
                href={cta.to}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex h-10 items-center justify-center rounded-2xl px-4 text-sm font-medium bg-[--color-primary] text-[--color-primary-contrast] hover:opacity-90"
              >
                {cta.label}
              </a>
            ) : (
              <Link
                to={cta.to}
                className="hidden md:inline-flex h-10 items-center justify-center rounded-2xl px-4 text-sm font-medium bg-[--color-primary] text-[--color-primary-contrast] hover:opacity-90"
              >
                {cta.label}
              </Link>
            ))}

          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10"
            aria-label={menuOpen ? "Sluit menu" : "Open menu"}
            aria-controls="mobile-nav"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[60] md:hidden"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === overlayRef.current) setMenuOpen(false);
          }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur" />
          <aside
            id="mobile-nav"
            className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-[--color-bg] border-l border-white/10 p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2" aria-label="Home" onClick={() => setMenuOpen(false)}>
                <img src={logoSrc} alt={logoAlt} className="h-7 w-auto" />
              </Link>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10"
                aria-label="Sluit menu"
                onClick={() => setMenuOpen(false)}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav className="mt-6 flex flex-col gap-1.5">
              {links.map((l, i) =>
                l.external ? (
                  <a
                    key={l.to}
                    href={l.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl px-3 py-2.5 text-base text-[--color-muted] hover:text-white hover:bg-white/5"
                    onClick={() => setMenuOpen(false)}
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    key={l.to}
                    ref={i === 0 ? firstMobileLinkRef : undefined}
                    to={l.to}
                    className={`rounded-xl px-3 py-2.5 text-base ${
                      isActive(l.to) ? "bg-white/10 text-white" : "text-[--color-muted] hover:text-white hover:bg-white/5"
                    }`}
                    aria-current={isActive(l.to) ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {l.label}
                  </Link>
                )
              )}
            </nav>

            {cta &&
              (cta.external ? (
                <a
                  href={cta.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-2xl px-4 text-sm font-medium bg-[--color-primary] text-[--color-primary-contrast] hover:opacity-90"
                >
                  {cta.label}
                </a>
              ) : (
                <Link
                  to={cta.to}
                  onClick={() => setMenuOpen(false)}
                  className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-2xl px-4 text-sm font-medium bg-[--color-primary] text-[--color-primary-contrast] hover:opacity-90"
                >
                  {cta.label}
                </Link>
              ))}

            <p className="mt-6 text-xs text-[--color-muted]">© {new Date().getFullYear()} — All rights reserved.</p>
          </aside>
        </div>
      )}
    </header>
  );
}
