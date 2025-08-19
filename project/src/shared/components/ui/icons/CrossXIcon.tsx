import type { SVGProps } from "react";

type CrossXIconProps = SVGProps<SVGSVGElement> & {
    d: string
};

export default function CrossXIcon({ d, ...props }: CrossXIconProps) {
    return (
        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" aria-label="close" focusable="false" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={d}/>
        </svg>
    );
};