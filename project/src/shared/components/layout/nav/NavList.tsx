import React from "react";
import { cn } from "@/shared/lib/utils";

interface NavListProps extends React.ComponentProps<"ul"> {
    as?: "ul" | "ol";
}

const NavList = ({ as = "ul", children, className, ...props }: NavListProps) => {
    const base =
        "flex items-center gap-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-4 py-2";
    const Comp: any = as;

    return (
        <Comp className={cn(base, className)} {...props}>
            {React.Children.map(children, (child) => (
                <li className="list-none m-0 p-0">{child}</li>
            ))}
        </Comp>
    );
};

export default NavList;