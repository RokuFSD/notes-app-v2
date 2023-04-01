import React from "react";
import useAuth from "../../../../hooks/useAuth";
import Button from "../../../../components/Button";

function Login() {
  const { login } = useAuth();
  return (
    <section>
      <h1 className="text-4xl font-fm font-semibold text-center">
        Login to continue
      </h1>
      <Button
        className="text-xl bg-lime-300 w-full h-full rounded-2xl border title text-zinc-700 dark:text-zinc-700 dark:border-zinc-700"
        onClick={() => login()}
        text={"Login"}
      />
    </section>
  );
}

export default Login;