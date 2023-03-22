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
      {
        path: "/projects",
        async lazy() {
          const { Projects } = await import("./pages/projects/Projects");
          return { Component: Projects };
        },
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
        async lazy() {
          const { Newproject } = await import("./pages/new-project/Newproject");
          return { Component: Newproject };
        },
        element: <div>New project</div>,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
