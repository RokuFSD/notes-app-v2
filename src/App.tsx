import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Nav/Navbar";

function App() {
  return (
    <>
      <main className="bg-slate-100 dark:bg-zinc-700 p-5 flex flex-col gap-10 pb-20">
        <Outlet />
      </main>
      <footer className="bg-transparent h-14 fixed w-full bottom-0">
        <Navbar />
      </footer>
    </>
  );
}

export default App;
