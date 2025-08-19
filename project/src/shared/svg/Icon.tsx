import * as React from "react";
import { type SVGProps } from "react";

/** Extra, handige props bovenop de standaard SVGProps */
type IconProps = Omit<SVGProps<SVGSVGElement>, "viewBox"> & {
  /** width/height tegelijk (bv. 16, "1em", "24px") */
  size?: number | string;
  /** Voor toegankelijkheid; als leeg -> aria-hidden */
  title?: string;
  /** Optioneel viewBox override */
  viewBox?: string;
  /** Standaard strokeWidth */
  strokeWidth?: number;
};

/** Reusable <Svg> wrapper */
export const Svg = React.forwardRef<SVGSVGElement, IconProps>(
  (
    {
      size,
      title,
      viewBox = "0 0 24 24",
      stroke = "currentColor",
      fill = "none",
      strokeWidth = 2,
      children,
      ...rest
    },
    ref
  ) => (
    <svg
      ref={ref}
      // size kan nummer of string zijn
      width={size ?? rest.width}
      height={size ?? rest.height}
      viewBox={viewBox}
      stroke={stroke}
      fill={fill}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {/* Zet default strokeWidth op alle child paths/lines tenzij overschreven */}
      <g strokeWidth={strokeWidth}>{children}</g>
    </svg>
  )
);
Svg.displayName = "Svg";

/** Factory om snel icon components te maken vanuit een path-string */
export function createIcon(
  d: string,
  options?: { displayName?: string; viewBox?: string }
) {
  const Comp = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
    <Svg ref={ref} viewBox={options?.viewBox ?? "0 0 24 24"} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </Svg>
  ));
  Comp.displayName = options?.displayName ?? "Icon";
  return Comp;
}

/** Voorbeeld: Close (X) icon */
export const CloseIcon = createIcon("M6 18L18 6M6 6l12 12", {
  displayName: "CloseIcon",
});
