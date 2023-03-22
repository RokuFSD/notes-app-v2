import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";

export function Component() {
  return (
    <>
      <Header />
      <main className="bg-slate-100 dark:bg-zinc-700 p-4 gap-10 grid grid-cols-1">
        <Outlet />
      </main>
    </>
  );
}

Component.displayName = "Base";
