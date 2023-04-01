import React from "react";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import HeadSection from "../../src/components/HeadSection";

// TODO: Fix this and the tests in the components folder


// const router = createMemoryRouter(
//   [
//     {
//       path: "/",
//       element: <WithNav />,
//       children: [
//         {
//           index: true,
//           element: <HeadSection title="title test" newItem={() => null} />,
//         },
//       ],
//     },
//   ],
//   {
//     initialEntries: ["/"],
//   }
// );
//
// describe("WithNav layout component", () => {
//   it("Should render without crash", () => {
//     render(<RouterProvider router={router} />);
//     expect(screen.getByText("title test")).toBeInTheDocument();
//   });
// });
