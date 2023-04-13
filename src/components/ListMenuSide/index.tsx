import React from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MenuListRouter } from "../../types/dashboard";

export default function ListMenuSide({
  title,
  link,
  from,
  to,
}: MenuListRouter) {
  const { pathname } = useLocation();
  return (
    <li>
      <NavLink exact to={link}>
        {link === pathname ? from : to}
        <span>{title}</span>
      </NavLink>
    </li>
  );
}
