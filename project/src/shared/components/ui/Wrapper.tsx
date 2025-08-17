import type { ReactNode } from "react";

interface WrapperProps {
  variant?: "standard" | "narrow" | "prose";
  className?: string;
  id?: string;
  children: ReactNode;
}

export default function Wrapper({
  variant = "standard",
  className = "",
  id,
  children,
}: WrapperProps) {
  const variantClasses: Record<string, string> = {
    narrow: "max-w-2xl mx-auto px-4",
    standard: "mx-auto max-w-7xl px-4",
    prose:
      "prose-p:text-base-400 prose-hr:bg-base-500 prose-code:text-white prose-ol:text-base-400 prose-li:text-base-400 prose-strong:text-white prose-a:!text-white prose pt-0 prose-pre:rounded-none prose-code:text-white prose-strong:text-white prose-headings:text-white prose-headings:font-light prose-h1:font-display prose-pre:border prose-pre:border-base-900 prose-pre:scrollbar-hide",
  };

  const classes = `${variantClasses[variant] || ""} ${className}`.trim();

  return (
    <div id={id} className={classes}>
      {children}
    </div>
  );
}
