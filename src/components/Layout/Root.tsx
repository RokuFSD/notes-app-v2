import React from "react";
import Header from "../Header";
import Navbar from "../Nav/Navbar";
import useData from "../../hooks/useData";
import { Outlet } from "react-router-dom";
import { classSelector } from "../../lib/utils/classSelector";

type RootProps = {
  withNav?: boolean;
}

const baseClass = [
  "bg-slate-100",
  "dark:bg-zinc-900",
  "gap-10"
];

const variants = {
  withNav: [
    "flex",
    "flex-col",
    "pb-20",
    "p-5"
  ],
  base: [
    "p-4",
    "grid",
    "grid-cols-1"
  ]
};

const classes = classSelector(baseClass, variants);

export default function Root({ withNav = false }: RootProps) {
  const { loading, error } = useData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  return (
    <>
      <Header />
      <main className={classes(withNav ? "withNav" : "base")}>
        <Outlet />
      </main>
      {withNav && (
        <footer className="bg-transparent h-14 fixed w-full bottom-0 dark:bg-zinc-900">
          <Navbar />
        </footer>
      )}
    </>
  );
}
