import React from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "../../../jotai";
import useAuth from "../../../hooks/useAuth";
import Login from "./components/Login";
import Button from "../../../components/Button";
import DarkModeToggle from "../../../components/DarkModeToggle";

export function Profile() {
  const user = useAtomValue(userAtom);
  const { logout } = useAuth();

  if (!user) {
    return (
      <section className="flex-grow flex flex-col justify-center dark:text-zinc-100">
        <div className="absolute top-10 right-5">
          <DarkModeToggle />
        </div>
        <Login />
      </section>
    );
  }

  return (
    <section className="flex-grow flex flex-col justify-center dark:text-zinc-100">
      <div className="absolute top-10 right-5">
        <DarkModeToggle />
      </div>
      <h1>Profile</h1>
      <Button
        className="text-xl bg-lime-300 w-full h-full rounded-2xl border title text-zinc-700 dark:text-zinc-700 dark:border-zinc-700"
        onClick={() => logout()}
        text={"Logout"}
      />
    </section>
  );

}