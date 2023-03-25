import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { PUBLIC_ROUTES } from "../../types/routes";

type HeadSectionProps = {
  title: string;
  whereTo: PUBLIC_ROUTES;

  context?: { [key: string]: unknown };
};

// TODO: This is gonna to change in base of what to create
function HeadSection({ title, whereTo, context }: HeadSectionProps) {
  const link = context ? { to: whereTo, state: context } : { to: whereTo };

  return (
    <div className="flex justify-between items-center">
      <h2 className="title text-7xl tracking-tighter dark:text-zinc-100 [word-spacing:10px] font-light">
        {title}
      </h2>
      <Link {...link}>
        <Button text="+" className="w-10 h-10" />
      </Link>
    </div>
  );
}

export default HeadSection;
