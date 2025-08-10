import { cn } from "@/shared/lib/utils";

const Nav = ({ children, className, ...props }: React.ComponentProps<"nav">) => {
    const base =
        "flex items-center gap-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-4 py-2";

    return (
        <nav className={cn(base, className)} {...props}>
            {children}
        </nav>
    );
};

export default Nav;