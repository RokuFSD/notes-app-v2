import React, { memo } from "react";
import Button from "../../../../../components/Button";
import { useSetAtom } from "jotai";
import { setCurrentProjectId } from "../../../../../jotai/projects";

type BtnProps = {
  text: string;
  value: string;
  isCurrent: boolean;
};

function Btn({ text, value, isCurrent }: BtnProps) {
  const setCurrentProject = useSetAtom(setCurrentProjectId);
  return (
    <Button
      text={text}
      onClick={() => setCurrentProject(value)}
      variant={isCurrent ? "active" : ""}
      className={
        "px-4 h-8 font-fm font-semibold flex items-center justify-center border-[1px] text-xs"
      }
    />
  );
}

export default memo(Btn);
