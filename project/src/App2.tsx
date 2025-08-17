import Wrapper from "./shared/components/ui/Wrapper";
import Text from "./shared/components/ui/Text";
import Button from "./shared/components/ui/Button";
import BuioHero from "./shared/components/layout/BuioHero";
import BuioNav from "./shared/components/layout/BuioNav";

export default function App() {
  return (
    <main
      className="
        min-h-screen
        bg-[image:var(--background-image-gradient-up)]
        bg-fixed
        text-[var(--astro-code-foreground)]
      "
      style={{
        // fallback mocht een var ontbreken
        color: "var(--astro-code-foreground)",
      }}
    >
      <BuioNav />
      <BuioHero />

      <Wrapper className="py-16">
        <Text tag="h1" variant="displayXL" className="text-center">
          Welcome to the new version!
        </Text>

        {/* ‘muted’ via astro vars */}
        <p className="mt-4 text-center text-[var(--astro-code-token-comment)]">
          Buio-stijl in jouw React + Vite + TS app (Tailwind v4, met Astro vars).
        </p>

        {/* Buttons met astro-variabelen */}
        <div className="mt-8 flex justify-center gap-4">
          <Button
            size="small"
            variant="primary"
            className="
              bg-[var(--astro-code-token-important)]
              hover:bg-[var(--astro-code-token-operator)]
              text-[var(--astro-code-background)]
              ring-1 ring-[var(--astro-code-token-focus)]
            "
          >
            Primary small
          </Button>

          <Button
            size="medium"
            variant="secondary"
            className="
              bg-[var(--astro-code-background)]
              text-[var(--astro-code-foreground)]
              ring-1 ring-[var(--astro-code-token-line-number)]
              hover:ring-[var(--astro-code-token-highlight)]
            "
          >
            Secondary
          </Button>
        </div>

        {/* Card gebruikt astro background/fg + Buio shadow */}
        <div
          className="
            mt-12 rounded-2xl p-6
            bg-[var(--astro-code-background)]
            text-[var(--astro-code-foreground)]
            shadow-[var(--shadow-dimensional)]
            ring-1 ring-[var(--astro-code-token-line-number)]
          "
        >
          <Text tag="h2" variant="displayMD">Card voorbeeld</Text>
          <p className="mt-2 text-[var(--astro-code-token-comment)]">
            Deze card gebruikt <code>--astro-code-*</code> variabelen voor kleuren.
          </p>

          {/* Code preview die meerdere astro tokens laat zien */}
          <pre
            className="
              mt-6 rounded-xl p-4 overflow-auto
              bg-[var(--astro-code-background)]
              text-[var(--astro-code-foreground)]
              ring-1 ring-[var(--astro-code-token-highlight)]
            "
          >
            <code>
              {`// Tokens
foreground: var(--astro-code-foreground)
background: var(--astro-code-background)
comment:    var(--astro-code-token-comment)
keyword:    var(--astro-code-token-keyword)
number:     var(--astro-code-token-number)
string:     var(--astro-code-token-string)
highlight:  var(--astro-code-token-highlight)
`}
            </code>
          </pre>

          {/* Gradient demo met astro-focus/notice als tekst/ring */}
          <div className="mt-6 rounded-xl p-4 bg-[image:var(--background-image-gradient-left-to-right)] ring-1 ring-[var(--astro-code-token-focus)]">
            <p className="text-[var(--astro-code-token-notice)]">
              Gradient demo — background-image komt uit Buio’s CSS variabelen.
            </p>
          </div>
        </div>
      </Wrapper>
    </main>
  );
}
