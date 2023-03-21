import React from "react";
import App from "../../src/App";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter } from "react-router-dom";

describe("App main component", () => {
  it("Should render without crash", () => {
    render(<App />);
    expect(screen.getByText("Your notes")).toBeInTheDocument();
  });
});
