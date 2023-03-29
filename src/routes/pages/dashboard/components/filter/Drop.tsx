import React, { ReactNode } from "react";
import { useSetAtom } from "jotai";
import { setCurrentProjectId } from "../../../../../jotai/projects";

type DropProps = {
  children: ReactNode;
  defaultValue: string;
};

function Drop({ children, defaultValue }: DropProps) {
  const setCurrentProject = useSetAtom(setCurrentProjectId);
  return (
    <select
      onChange={(e) => setCurrentProject(e.currentTarget.value)}
      value={defaultValue}
      className="bg-zinc-300 w-32 rounded-md border border-zinc-700 px-1 h-7 font.fm font-semibold text-md dark:bg-zinc-700 dark:text-zinc-100 dark:border-zinc-400"
      title="tag"
    >
      {children}
    </select>
  );
}

export default Drop;
