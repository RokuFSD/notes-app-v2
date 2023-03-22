import React from "react";
import { action, Newnote } from "../../src/routes/pages/new-note/Newnote";
import { RouteObject, RouterProvider } from "react-router-dom";
import { createMemoryRouter } from "react-router-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import DashBoard, { loader } from "../../src/routes/pages/dashboard/DashBoard";

const routes: RouteObject[] = [
  {
    path: "/new",
    element: <Newnote />,
    action: action,
  },
  {
    path: "/",
    element: <DashBoard />,
    loader: loader,
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ["/", "/new"],
  initialIndex: 1,
});

describe("New note", () => {
  it("should render new note page", () => {
    render(<RouterProvider router={router} />);
    expect(screen.getByLabelText("Save in project")).toBeInTheDocument();
  });

  it("should not redirect to dashboard on empty", () => {
    render(<RouterProvider router={router} />);
    const createButton = screen.getByText("Create");

    fireEvent.click(createButton);
    expect(screen.getByLabelText("Save in project")).toBeInTheDocument();
  });

  it("should redirect to dashboard on filled", async () => {
    // Navigate to new note page
    render(<RouterProvider router={router} />);
    const title = screen.getByPlaceholderText("Title...");
    const description = screen.getByPlaceholderText("Description...");
    const createButton = screen.getByText("Create");

    fireEvent.input(title, { target: { value: "Test title" } });
    fireEvent.input(description, { target: { value: "Test description" } });
    await act(async () => {
      fireEvent.click(createButton);
    });
    expect(screen.getByText("Your notes")).toBeInTheDocument();
  });
});
