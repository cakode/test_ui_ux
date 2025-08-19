type HamburgerIconProps = {
    isOpen: boolean
}

export default function HamburgerIcon({ isOpen }: HamburgerIconProps) {
    return (
        <svg className={["size-6", isOpen ? "hidden" : "inline"].join(" ")} stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    );
};