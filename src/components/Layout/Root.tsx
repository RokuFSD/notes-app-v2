import React, { useEffect } from "react";
import Header from "../Header";
import Navbar from "../Nav/Navbar";
import useData from "../../hooks/useData";
import useAuth from "../../hooks/useAuth";
import { Outlet } from "react-router-dom";
import { onlineAtom } from "../../jotai/user";
import { loadingAtom, loadingOnlineQuery } from "../../jotai";
import { useAtomValue, useSetAtom } from "jotai";
import { classSelector } from "../../lib/utils/classSelector";

type RootProps = {
  withNav?: boolean;
  withHeader?: boolean;
}

const baseClass = [
  "bg-slate-100",
  "dark:bg-zinc-900",
  "gap-10",
  "flex-grow"
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


export default function Root({ withNav = false, withHeader = true }: RootProps) {
  useData();
  const loading = useAtomValue(loadingAtom);
  const { loading: authLoading } = useAuth();
  const setOnline = useSetAtom(onlineAtom);

  function handleOnline() {
    setOnline(true);
  }

  function handleOffline() {
    setOnline(false);
  }

  useEffect(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || authLoading) return <div>Loading...</div>;

  return (
    <>
      {withHeader && <Header />}
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
