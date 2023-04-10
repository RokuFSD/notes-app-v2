import React, { memo, useMemo } from "react";
import { NavLink } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilNotes, cilHome, cilUser } from "@coreui/icons";

type NavbarItemProps = {
  label: string;
  to: string;
};

const icons = {
  projects: cilNotes,
  home: cilHome,
  user: cilUser
};

const activeStyle =
  "relative bg-gradient-to-bl w-12 h-12 flex items-center justify-center rounded-full from-blue-200 to-blue-300 dark:from-zinc-400 dark:to-zinc-800";

const NavBarIcon = memo(CIcon);

function NavbarItem({ label, to }: NavbarItemProps) {
  const icon = useMemo(() => icons[label.toLowerCase() as keyof typeof icons], [label]);

  return (
    <li
      key={label}
      className="rounded-full w-12 h-12 flex items-center justify-center from-blue-300 to-blue-500 dark:text-zinc-100"
    >
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? activeStyle
            : "w-full h-full flex items-center justify-center"
        }
      >
        <NavBarIcon
          icon={icon}
          className="w-8 h-8 flex items-center z-50"
        />
        <p className="hidden">{label}</p>
      </NavLink>
    </li>
  );
}

export default NavbarItem;
