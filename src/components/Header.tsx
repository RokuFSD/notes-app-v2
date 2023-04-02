import React, { memo } from "react";
import * as CIcon from "@coreui/icons-react";
import { cilSearch } from "@coreui/icons";
import DarkModeToggle from "./DarkModeToggle";
import { useAtomValue } from "jotai";
import { userAtom } from "../jotai/user";

const SearchIcon = memo(CIcon.default);

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
