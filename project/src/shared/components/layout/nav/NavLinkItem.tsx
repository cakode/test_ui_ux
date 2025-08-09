import { NavLink } from "react-router-dom";

interface NavLinkItemProps {
    to: string;
    label: string;
};

const NavLinkItem = ({to, label}: NavLinkItemProps) => {
    return(
      <NavLink to={to} className={"Lexington themes"}>
        {label}
      </NavLink>  
    );
};

export default NavLinkItem;