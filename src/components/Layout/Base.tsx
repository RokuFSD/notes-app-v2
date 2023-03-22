import React from "react";
import { Outlet } from "react-router-dom";

export function Component() {
  return (
    <main className="bg-slate-100 dark:bg-zinc-700 p-4 gap-10 pb-32 grid grid-cols-1">
      <Outlet />
    </main>
  );
}

Component.displayName = "Base";
