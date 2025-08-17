import type {
  ElementType,
  ReactNode,
  ComponentPropsWithoutRef,
  CSSProperties,
} from "react";

type Variants =
  | "display6XL"
  | "display5XL"
  | "display4XL"
  | "display3XL"
  | "display2XL"
  | "displayXL"
  | "displayLG"
  | "displayMD"
  | "displaySM"
  | "displayXS"
  | "textXL"
  | "textLG"
  | "textBase"
  | "textSM"
  | "textXS";

const textStyles: Record<Variants, string> = {
  display6XL: "text-4xl sm:text-7xl md:text-9xl lg:text-[12rem]",
  display5XL: "text-4xl sm:text-7xl md:text-8xl lg:text-[10rem]",
  display4XL: "text-4xl sm:text-7xl md:text-8xl lg:text-9xl",
  display3XL: "text-5xl sm:text-6xl md:text-7xl lg:text-8xl",
  display2XL: "text-5xl sm:text-5xl md:text-6xl lg:text-7xl",
  displayXL: "text-4xl sm:text-4xl md:text-5xl lg:text-6xl",
  displayLG: "text-3xl sm:text-3xl md:text-4xl lg:text-5xl",
  displayMD: "text-2xl md:text-3xl lg:text-4xl",
  displaySM: "text-xl md:text-2xl lg:text-3xl",
  displayXS: "text-xl md:text-xl lg:text-2xl",
  textXL: "text-xl sm:text-xl md:text-2xl",
  textLG: "text-[min(2.4vh,70px)]",
  textBase: "text-base",
  textSM: "text-sm",
  textXS: "text-xs",
};

// Polymorfe props: erft native props voor het gekozen element, minus conflicts
type BaseProps<T extends ElementType> = {
  tag?: T;
  variant?: Variants;
  className?: string;
  children?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  /** Optioneel alias; wordt gemapt naar aria-label */
  ariaLabel?: string;
  /** React style prop */
  style?: CSSProperties;
};

type TextProps<T extends ElementType> = BaseProps<T> &
  Omit<ComponentPropsWithoutRef<T>, "className" | "children" | "style">;

export default function Text<T extends ElementType = "p">({
  tag,
  variant,
  className = "",
  children,
  leftIcon,
  rightIcon,
  ariaLabel,
  style,
  ...rest
}: TextProps<T>) {
  const Tag = (tag || "p") as ElementType;

  const baseClasses = variant ? textStyles[variant] : "";
  const combinedClasses = `${baseClasses} ${className}`.trim();

  // Map ariaLabel → aria-label zonder TypeScript errors
  const ariaProps = ariaLabel ? { "aria-label": ariaLabel } : undefined;

  return (
    <Tag className={combinedClasses} style={style} {...ariaProps} {...(rest as any)}>
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </Tag>
  );
}
