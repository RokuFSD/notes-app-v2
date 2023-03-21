import React from "react";
import { NavLink } from "react-router-dom";
import * as CIcon from "@coreui/icons-react";
import { cilNotes, cilHome, cilUser } from "@coreui/icons";

type NavbarItemProps = {
  label: string;
  to: string;
};

const icons = {
  projects: cilNotes,
  home: cilHome,
  user: cilUser,
};

const activeStyle =
  "relative bg-gradient-to-bl w-12 h-12 flex items-center justify-center rounded-full from-blue-200 to-blue-400";

function NavbarItem({ label, to }: NavbarItemProps) {
  return (
    <li
      key={label}
      className="rounded-full w-12 h-12 flex items-center justify-center from-blue-300 to-blue-500"
    >
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? activeStyle
            : "w-full h-full flex items-center justify-center"
        }
      >
        <CIcon.default
          icon={icons[label.toLowerCase() as keyof typeof icons]}
          className="w-8 h-8 flex items-center z-50"
        />
        <p className="hidden">{label}</p>
      </NavLink>
    </li>
  );
}

export default NavbarItem;
