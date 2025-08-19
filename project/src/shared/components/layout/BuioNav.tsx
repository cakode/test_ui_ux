// src/components/nav/BuioNav.tsx
import { useEffect, useState, useCallback } from "react";
import Text from "@/shared/components/ui/Text";
import Link from "@/shared/components/ui/Link";
import Wrapper from "@/shared/components/ui/Wrapper";
import Button from "../ui/Button";

type NavLink = { href: string; label: string; title?: string; ariaLabel?: string };

interface BuioNavProps {
  brand?: string;
  links?: NavLink[];
  ctaHref?: string;
  ctaLabel?: string;
}

export default function BuioNav({
  brand = "buio®",
  links = [
    { href: "/system/overview", label: "Overview" },
    { href: "/forms/sign-up", label: "Sign up" },
    { href: "/blog/home", label: "Blog" },
  ],
  ctaHref = "https://buy.polar.sh/polar_cl_PAaFiGIVosu7QbMysYXsBXfJ8AZvtysurbXO6lxV7ao",
  ctaLabel = "Buy Buio",
}: BuioNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  // Scroll effects (shrink + blur on desktop) and close on resize to desktop
  useEffect(() => {
    const onScroll = () => {
      const threshold = 20;
      if (window.innerWidth >= 768 || !isOpen) {
        setScrolled(window.scrollY > threshold);
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 768 && isOpen) closeMenu();
      onScroll();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeMenu]);

  // Body scroll lock when mobile menu open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = isOpen ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <div
      id="nav-wrapper"
      className={[
        "fixed inset-x-0 top-0 z-[100] w-full",
        "transition-all duration-300",
        scrolled ? "py-2 md:backdrop-blur-md md:bg-base-950/80" : "py-4",
      ].join(" ")}
    >
      <Wrapper variant="standard">
        <div
          id="navigation-wrapper"
          className="relative flex flex-col md:flex-row md:items-center md:justify-between"
        >
          {/* Top: Brand + Mobile toggle */}
          <div className="flex flex-row items-center justify-between">
            <Text
              tag="a"
              variant="textXL"
              href="/"
              ariaLabel="Go to homepage"
              title="Homepage"
              className="text-white"
            >
              {brand}
            </Text>

            <Button
              id="menu-toggle"
              type="button"
              aria-label="Toggle main menu"
              aria-expanded={isOpen}
              aria-controls="navigation-menu"
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center justify-center p-2 text-base-400 hover:text-base-300 focus:outline-none md:hidden"
            >
              {/* hamburger */}
              <svg className={["size-6", isOpen ? "hidden" : "inline"].join(" ")} stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* close (hidden until open) */}
              <svg className={["size-6", isOpen ? "inline" : "hidden"].join(" ")} stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>

          {/* Nav menu */}
          <nav
            id="navigation-menu"
            role="navigation"
            className={[
              // Mobile overlay base
              "fixed inset-0 min-h-screen h-full flex flex-col justify-between py-24 bg-base-950",
              "bg-[image:var(--background-image-gradient-down)]",
              "transform transition-all duration-300 ease-in-out",
              // Start hidden
              isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none",
              // Desktop reset
              "md:relative md:inset-auto md:min-h-0 md:h-auto md:p-0 md:bg-none md:bg-transparent",
              "md:opacity-100 md:pointer-events-auto md:translate-y-0",
            ].join(" ")}
          >
            <Button
              id="menu-close"
              type="button"
              aria-label="Close mobile navigation menu"
              onClick={closeMenu}
              className="absolute right-4 top-4 text-white focus:outline-none md:hidden"
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>

            {/* -----NAVLIST----- <div className="flex h-full w-full list-none flex-col items-center justify-between gap-4 text-center md:ml-auto md:flex-row md:items-center md:justify-center md:text-left">
              <div className="flex flex-col gap-4 md:flex-row">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    title={l.title ?? l.label}
                    aria-label={l.ariaLabel ?? l.label}
                    className="text-4xl font-display text-white hover:text-base-400 md:text-base md:font-sans"
                    onClick={closeMenu}
                  >
                    {l.label}
                  </a>
                ))}
              </div>

              <Link
                size="sm"
                variant="muted"
                className="w-auto"
                href={ctaHref}
                title={ctaLabel}
                aria-label={ctaLabel}
                onClick={closeMenu}
              >
                {ctaLabel}
              </Link>
            </div>*/}
          </nav>
        </div>
      </Wrapper>
    </div>
  );
}
