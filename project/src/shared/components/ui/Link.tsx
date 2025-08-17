import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "default" | "accent" | "muted" | "link";
type Size = "xs" | "sm" | "base" | "md" | "lg" | "xl";
type Gap = "xs" | "sm" | "base" | "md" | "lg";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
  size?: Size;          // alleen van toepassing als variant ≠ "link"
  gap?: Gap;
  className?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const VARIANT_CLASSES: Record<Exclude<Variant, "link">, string[]> = {
  default: [
    "text-white",
    "bg-linear-to-t",
    "from-base-800",
    "to-base-600",
    "hover:from-base-600",
    "hover:to-base-800",
    "focus:outline-base-600",
  ],
  accent: [
    "text-white",
    "bg-linear-to-t",
    "from-accent-700",
    "to-accent-500",
    "hover:from-accent-500",
    "hover:to-accent-700",
    "focus:outline-accent-500",
  ],
  muted: [
    "text-white",
    "bg-linear-to-t",
    "from-base-950",
    "to-base-900",
    "hover:from-base-900",
    "hover:to-base-950",
    "focus:outline-white",
  ],
};

const SIZE_CLASSES: Record<Size, string[]> = {
  xs: ["h-8", "px-4", "py-2", "text-xs"],
  sm: ["h-9", "px-4", "py-2", "text-xs"],
  base: ["h-10", "px-6", "py-3", "text-base"],
  md: ["h-11", "px-6", "py-3", "text-md"],
  lg: ["h-12", "px-6", "py-3", "text-lg"],
  xl: ["h-14", "px-6", "py-3", "text-base"],
};

const GAP_CLASSES: Record<Gap, string[]> = {
  xs: ["gap-2"],
  sm: ["gap-4"],
  base: ["gap-8"],
  md: ["gap-10"],
  lg: ["gap-12"],
};

export default function Link({
  href,
  variant = "default",
  size = "base",
  gap = "sm",
  className = "",
  leftIcon,
  rightIcon,
  children,
  ...rest
}: LinkProps) {
  const isBareLink = variant === "link";

  const base =
    "inline-flex items-center justify-center text-center rounded-full font-medium " +
    "duration-500 ease-in-out transition-colors focus:outline-2 outline-offset-4 " +
    // veilige shadow via CSS var
    (isBareLink ? "" : "shadow-[var(--shadow-dimensional)]");

  const classes = [
    base,
    !isBareLink && VARIANT_CLASSES[variant as Exclude<Variant, "link">],
    !isBareLink && SIZE_CLASSES[size],
    !isBareLink && GAP_CLASSES[gap],
    className,
  ]
    .flat()
    .filter(Boolean)
    .join(" ");

  return (
    <a href={href} className={classes} {...rest}>
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </a>
  );
}
