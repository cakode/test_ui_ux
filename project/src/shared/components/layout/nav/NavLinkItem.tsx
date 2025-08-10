import { NavLink } from "react-router-dom";

interface NavLinkItemProps {
    to: string;
    label: string;
};

const NavLinkItem = ({to, label}: NavLinkItemProps) => {
    return(
      <NavLink to={to} className={"inline-flex items-center whitespace-nowrap rounded-md px-3 py-1.5 transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"}>
        {label}
      </NavLink>  
    );
};

export default NavLinkItem;