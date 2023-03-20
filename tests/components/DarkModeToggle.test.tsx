import React from "react";
import DarkModeToggle from "../../src/components/DarkModeToggle";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Dark mode component", () => {
  it("Should start on dark mode", () => {
    render(<DarkModeToggle />);
    expect(screen.getByText("Dark")).toBeInTheDocument();
  });

  it("Should change the text on click to Light", () => {
    render(<DarkModeToggle />);
    const button = screen.getByText("Dark");
    fireEvent.click(button);
    expect(screen.getByText("Light")).toBeInTheDocument();
  });
});
