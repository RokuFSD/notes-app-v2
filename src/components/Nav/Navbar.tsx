import React, { useMemo } from "react";
import NavbarItem from "./NavbarItem";

const links: { label: string; href: string }[] = [
  { label: "Projects", href: "/projects" },
  { label: "Home", href: "/" },
  { label: "User", href: "/profile" }
];

function Navbar() {
  const list = useMemo(() => links.map((link) => (
    <NavbarItem key={link.label} label={link.label} to={link.href} />
  )), []);
  return (
    <nav className="h-full rounded-t-3xl overflow-hidden border-2 border-b-0 border-neutral-800 dark:border-neutral-600">
      <ul className="h-full flex w-full justify-around bg-neutral-50 items-center dark:bg-zinc-900">
        {list}
      </ul>
    </nav>
  );
}

export default Navbar;
