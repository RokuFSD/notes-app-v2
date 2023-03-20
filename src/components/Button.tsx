import React, { ButtonHTMLAttributes } from "react";
import { classSelector } from "../utils/classSelector";

type ButtonComponents = {
  text: string;
  className?: string;
  variant?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const baseClass = [
  "border-2",
  "rounded-lg",
  "border-slate-700",
  "dark:border-slate-200",
];

const variants = {
  primary: [] as string[],
  cancel: [] as string[],
  active: ["bg-lime-300"],
};

function Button({ text, variant, className, ...props }: ButtonComponents) {
  const classes = classSelector(baseClass.concat(className || ""), variants);
  return (
    <button className={classes(variant || "")} {...props}>
      {text}
    </button>
  );
}

export default Button;
