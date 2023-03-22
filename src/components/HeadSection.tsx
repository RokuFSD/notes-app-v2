import React from "react";
import Button from "./Button";
import { NavLink } from "react-router-dom";

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
      <NavLink to={"/notes/new"}>
        <Button text="+" className="w-10 h-10" />
      </NavLink>
    </div>
  );
}

export default HeadSection;
