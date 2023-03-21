import React from "react";
import Navbar from "../../../src/components/Nav/Navbar";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

const router = createMemoryRouter(
  [
    {
      path: "/",
      element: <Navbar />,
    },
  ],
  { initialEntries: ["/"] }
);
describe("Navbar", () => {
  it("Should render without crash", () => {
    render(<RouterProvider router={router} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
