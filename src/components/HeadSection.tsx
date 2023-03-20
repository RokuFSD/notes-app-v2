import React from "react";
import Button from "./Button";

type HeadSectionProps = {
  title: string;
  newItem: () => void;
};

function HeadSection({ title, newItem }: HeadSectionProps) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="title text-5xl tracking-tighter dark:text-zinc-100 [word-spacing:10px] font-light">
        {title}
      </h2>
      <Button text="+" onClick={() => newItem()} className="w-10 h-10" />
    </div>
  );
}

export default HeadSection;
