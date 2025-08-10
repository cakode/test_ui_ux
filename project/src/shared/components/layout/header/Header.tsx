import { cn } from "@/shared/lib/utils";

const Header = ({children, className, ...props}: React.ComponentProps<"header">) => {
    const base = "w-full sticky top-0 z-40 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white backdrop-blur border-b border-indigo-300 px-4 py-2";

    return(
        <header className={cn(base, className)} {...props}>
            {children}
        </header>
    );
};

export default Header;