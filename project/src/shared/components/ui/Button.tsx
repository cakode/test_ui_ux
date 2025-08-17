import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary";
type Size = "small" | "medium";
type Gap = "small" | "medium";

const sizeMap: Record<Size, string> = {
  small: "h-9 px-4 text-sm",
  medium: "h-11 px-5",
};

const variantMap: Record<Variant, string> = {
  primary:
    "bg-[--color-primary] text-[--color-primary-contrast] hover:opacity-90 rounded-2xl",
  secondary:
    "bg-white/10 text-white hover:bg-white/15 rounded-2xl",
};

const gapMap: Record<Gap, string> = {
  small: "gap-1.5",
  medium: "gap-2.5",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: Size;
  variant?: Variant;
  gapSize?: Gap;
};

export default function Button({
  size = "medium",
  variant = "primary",
  gapSize = "medium",
  className = "",
  children,
  ...rest
}: Props) {
  return (
    <button
      className={`inline-flex items-center justify-center ${sizeMap[size]} ${variantMap[variant]} ${gapMap[gapSize]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
