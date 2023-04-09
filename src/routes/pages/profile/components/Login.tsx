import React from "react";
import useAuth from "../../../../hooks/useAuth";
import Button from "../../../../components/Button";
import { useAtomValue } from "jotai";
import { userAtom } from "../../../../jotai";

function Login() {
  const { login, logout } = useAuth();
  const user = useAtomValue(userAtom);
  return (
    <section>
      {user ? (
        <Button
          className="text-xl bg-lime-300 w-full h-full rounded-2xl border title text-zinc-700 dark:text-zinc-700 dark:border-zinc-700"
          onClick={() => logout()}
          text={"Logout"}
        />
      ) : (
        <Button
          className="text-xl bg-lime-300 w-full h-full rounded-2xl border title text-zinc-700 dark:text-zinc-700 dark:border-zinc-700"
          onClick={() => login()}
          text={"Login"}
        />
      )}

    </section>
  );
}

export default Login;