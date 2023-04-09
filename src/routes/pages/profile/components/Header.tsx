import React from "react";
import DarkModeToggle from "../../../../components/DarkModeToggle";

export default function Header() {
  return (
    <div className="absolute top-10 right-5">
      <DarkModeToggle />
    </div>
  );
}