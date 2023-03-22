import React from "react";
import * as CIcon from "@coreui/icons-react";
import { cilSearch } from "@coreui/icons";
import DarkModeToggle from "./DarkModeToggle";

function Header() {
  return (
    <header className="flex bg-slate-100 p-5 pb-0 justify-start gap-2">
      {/*  Profile picture */}
      <div className="flex justify-center items-center w-12">
        <img
          src="https://avatars.githubusercontent.com/u/42540074?v=4"
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
      </div>
      {/*  Profile name */}
      <div className="flex items-center basis-10/12">
        <h2 className="text-sm dark:text-zinc-100 text-zinc-400 font-semibold">
          Welcome back <span className="text-zinc-800">Chad</span>
        </h2>
      </div>
      {/*  Search Icon */}
      <div className="flex items-center gap-4">
        <CIcon.default icon={cilSearch} className="w-5 h-5" />
        <DarkModeToggle />
      </div>
    </header>
  );
}

export default Header;
