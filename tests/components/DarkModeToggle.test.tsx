import React from "react";
import DarkModeToggle from "../../src/components/DarkModeToggle";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Dark mode component", () => {
  it("Should start on dark mode", () => {
    render(<DarkModeToggle />);
    expect(screen.getByLabelText("go-dark")).toBeInTheDocument();
  });

  it("Should change the text on click to Light", () => {
    render(<DarkModeToggle />);
    const button = screen.getByLabelText("go-dark");
    fireEvent.click(button);
    expect(screen.getByLabelText("go-light")).toBeInTheDocument();
  });
});
