import React, { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

type NavLinkListProps = React.ComponentProps<"div"> & {
    children?: ReactNode
    leftExtra?: ReactNode
    rightExtra?: ReactNode
    innerProps?: HTMLAttributes<HTMLDivElement>;
}

const NavLinkList = ({ leftExtra, rightExtra, innerProps, children, className, ...props }: NavLinkListProps) => {
    const { className: innerClassName, ...innerRest } = innerProps ?? {};

    return (
        <div {...props} className={cn("flex h-full w-full list-none flex-col items-center justify-between gap-4 text-center md:ml-auto md:flex-row md:items-center md:justify-center md:text-left", className)} >
            {leftExtra}
            <div {...innerRest} className={cn("flex flex-col gap-4 md:flex-row", innerClassName)} >
                {children}
            </div >
            {rightExtra}
        </div>
    );
};

export default NavLinkList;