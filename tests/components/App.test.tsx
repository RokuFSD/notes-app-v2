import React from "react";
import App from "../../src/App";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import HeadSection from "../../src/components/HeadSection";

const router = createMemoryRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <HeadSection title="title test" newItem={() => null} />,
        },
      ],
    },
  ],
  {
    initialEntries: ["/"],
  }
);

describe("App main component", () => {
  it("Should render without crash", () => {
    render(<RouterProvider router={router} />);
    expect(screen.getByText("title test")).toBeInTheDocument();
  });
});
