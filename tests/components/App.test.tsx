import React from "react";
import App from "../../src/App";
import { render, screen } from "@testing-library/react";

describe("App main component", () => {
  it("Should render without crash", () => {
    render(<App />);
    expect(screen.getByText("Vite + React")).toBeInTheDocument();
  });
});
