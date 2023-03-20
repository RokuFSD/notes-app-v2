import React, { memo } from "react";
import Button from "../../../../components/Button";
import { useFilterContextAPI } from "../../dashboard/context/FilterContext";

type BtnProps = {
  text: string;
  value: string;
  isCurrent: boolean;
};

function Btn({ text, value, isCurrent }: BtnProps) {
  const { changeProject } = useFilterContextAPI();
  return (
    <Button
      text={text}
      onClick={() => changeProject(value)}
      variant={isCurrent ? "active" : ""}
      className={
        "px-4 h-8 font-fm font-semibold text-sm flex items-center justify-center border-[1px]"
      }
    />
  );
}

export default memo(Btn);
