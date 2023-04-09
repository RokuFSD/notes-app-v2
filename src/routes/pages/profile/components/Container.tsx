import React, { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode
}

export default function Container({ children }: ContainerProps) {
  return (
    <section className="flex-grow flex flex-col justify-center dark:text-zinc-100">
      {children}
    </section>
  );
}