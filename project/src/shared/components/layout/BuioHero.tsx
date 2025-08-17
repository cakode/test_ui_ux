// src/components/hero/BuioHeroAlt.tsx
import Text from "@/shared/components/ui/Text";
import Link from "@/shared/components/ui/Link";
import Wrapper from "@/shared/components/ui/Wrapper";
// Als je DecorativeCode naar React omzet (of SVG gebruikt met SVGR), kun je dit gebruiken:
// import DecorativeCode from "../assets/DecorativeCode";

export default function BuioHero() {
  return (
    <section className="relative overflow-hidden bg-[image:var(--background-image-gradient-up)]">
      {/* Decorative overlay (kies één van de twee): */}
      {/* <DecorativeCode className="absolute inset-0 opacity-20 pointer-events-none" /> */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true" />

      <Wrapper
        variant="standard"
        className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pb-12 pt-[10.5rem]"
      >
        <div className="sm:col-span-2 lg:col-start-2 lg:text-center">
          <Text tag="span" variant="textSM" className="text-white">
            Ultimate solutions
          </Text>

          <Text
            tag="h1"
            variant="display2XL"
            className="mt-12 text-white text-balance font-display"
          >
            Own the web.
            <span className="block text-base-400">Build without limits.</span>
          </Text>

          <Text tag="p" variant="textBase" className="mt-2 text-white text-balance">
            Decentralized. Trustless. Borderless. Create the future of the internet
            with cutting-edge Web3 technology—where you’re in control.
          </Text>

          <div className="mt-8 flex lg:justify-center">
            <Link
              href="#_"
              size="base"
              variant="accent"
              title="#_"
              aria-label="#_"
              className="w-auto"
            >
              Get started
            </Link>
          </div>
        </div>
      </Wrapper>
    </section>
  );
}
