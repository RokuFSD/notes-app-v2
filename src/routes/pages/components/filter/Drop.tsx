import React, { ReactNode } from "react";
import { useFilterContextAPI } from "../../dashboard/context/FilterContext";

type DropProps = {
  children: ReactNode;
  defaultValue: string;
};

function Drop({ children, defaultValue }: DropProps) {
  const { changeProject } = useFilterContextAPI();
  return (
    <select
      onChange={(e) => changeProject(e.currentTarget.value)}
      value={defaultValue}
      className="bg-zinc-300 w-32 rounded-md px-1 h-7 font.fm font-semibold text-md"
      title="tag"
    >
      {children}
    </select>
  );
}

export default Drop;
