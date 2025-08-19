import { cn } from "@/shared/lib/utils";
import { useCallback, useState, type ComponentProps, type ReactNode } from "react";
import NavLinkItem from "./NavLinkItem";
import NavLinkList from "./NavLinkList";
import { Button } from "../../ui/Button2";
import Wrapper from "../../ui/Wrapper";
import Text from "@/shared/components/ui/Text";
import HamburgerIcon from "../../ui/icons/HamburgerIcon";
import CrossXIcon from "../../ui/icons/CrossXIcon";
import { paths } from "@/shared/svg/paths";

type NavProps = React.ComponentProps<"nav"> & {
  brand: string;
  links: ComponentProps<typeof NavLinkItem>[];
  ctaHref?: string;
  ctaLabel?: string;
}

const Nav = ({ brand, links, children, className, ...props }: NavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  return (
    <div id="nav-wrapper"
      className={[
        "fixed inset-x-0 top-0 z-[100] w-full",
        "transition-all duration-300",
        scrolled ? "py-2 md:backdrop-blur-md md:bg-base-950/80" : "py-4",
      ].join(" ")}>
      <Wrapper variant="standard">
        <div
          id="navigation-wrapper"
          className="relative flex flex-col md:flex-row md:items-center md:justify-between"
        >
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
              <HamburgerIcon isOpen={isOpen} />
              <CrossXIcon d={paths.close} className={["size-6", isOpen ? "inline" : "hidden"].join(" ")} />
            </Button>
          </div>
          <nav {...props}
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
            {children}
            <Button
              id="menu-close"
              type="button"
              aria-label="Close mobile navigation menu"
              onClick={closeMenu}
              className="absolute right-4 top-4 text-white focus:outline-none md:hidden"
            >
              <CrossXIcon d="M6 18L18 6M6 6l12 12" />
            </Button>
            <NavLinkList>
              {links.map((link) => <NavLinkItem onClick={closeMenu} key={link.label} to={link.to} label={link.label} />)}
            </NavLinkList>
          </nav>
        </div>
      </Wrapper>
    </div>
  );
};

export default Nav;