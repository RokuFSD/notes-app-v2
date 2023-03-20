import React from "react";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <main className="bg-slate-100 dark:bg-zinc-700 p-5 flex flex-col gap-10">
      <Outlet />
    </main>
  );
}

export default App;
