import React from "react";
import Header from "../../src/components/Header";
import { render, screen } from "@testing-library/react";

describe("Header component", () => {
  it("Should render the header", () => {
    render(<Header />);
    expect(screen.getByText("Welcome back")).toBeInTheDocument();
  });
});
