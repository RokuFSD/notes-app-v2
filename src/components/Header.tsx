import React, { memo } from "react";
import CIcon from "@coreui/icons-react";
import DarkModeToggle from "./DarkModeToggle";
import { userAtom } from "../jotai";
import { cilSearch } from "@coreui/icons";
import { useAtomValue } from "jotai";

const SearchIcon = memo(CIcon);

function Header() {
  const user = useAtomValue(userAtom);

  return (
    <header className="flex bg-slate-100 p-5 pb-0 justify-start gap-2 dark:bg-zinc-900 h-20">
      {/*  Profile picture */}
      <div className="flex justify-center items-center w-12">
        <img
          src={user?.photoURL || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-8 h-8 rounded-full"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
      {/*  Profile name */}
      <div className="flex items-center basis-10/12">
        <h2 className="text-sm text-zinc-400 font-semibold">
          Welcome back <span className="text-zinc-800 dark:text-zinc-100">{user?.name}</span>
        </h2>
      </div>
      {/*  Search Icon */}
      <div className="flex items-center gap-4 dark:text-zinc-100">
        <SearchIcon icon={cilSearch} className="w-5 h-5" />
        <DarkModeToggle />
      </div>
    </header>
  );
}

export default memo(Header);
