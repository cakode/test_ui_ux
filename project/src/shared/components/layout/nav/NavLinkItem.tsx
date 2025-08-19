import { NavLink } from "react-router-dom";

export type NavLinkItemProps = {
    to: string;
    label: string;
    onClick: () => void;
};

const NavLinkItem = ({to, label, onClick}: NavLinkItemProps) => {
    return(
      <NavLink onClick={() => onClick()} to={to} className="text-4xl font-display text-white hover:text-base-400 md:text-base md:font-sans">
        {label}
      </NavLink>  
    );
};

export default NavLinkItem;