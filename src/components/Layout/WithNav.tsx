import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Nav/Navbar";
import Header from "../Header";
import useData from "../../hooks/useData";


export function Component() {
  const { loading, error } = useData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  return (
    <>
      <Header />
      <main className="bg-slate-100 dark:bg-zinc-900 p-5 flex flex-col gap-10 pb-20">
        <Outlet />
      </main>
      <footer className="bg-transparent h-14 fixed w-full bottom-0 dark:bg-zinc-900">
        <Navbar />
      </footer>
    </>
  );
}

Component.displayName = "WithNav";