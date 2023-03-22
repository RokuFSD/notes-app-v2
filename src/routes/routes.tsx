import React from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import DashBoard, { loader } from "./pages/dashboard/DashBoard";
import WithNav from "../components/Layout/WithNav";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <WithNav />,
    children: [
      {
        index: true,
        element: <DashBoard />,
        loader: loader,
      },
    ],
  },
  {
    lazy: () => import("../components/Layout/Base"),
    children: [
      {
        path: "/notes/new",
        async lazy() {
          const { Newnote, action } = await import("./pages/new-note/Newnote");
          return { Component: Newnote, action };
        },
      },
      {
        path: "/projects/new",
        element: <div>New project</div>,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
