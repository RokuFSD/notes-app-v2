import React from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import DashBoard, { loader } from "./pages/dashboard/DashBoard";
import WithNav from "../components/Layout/WithNav";
import FilterContext from "./pages/dashboard/context/FilterContext";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <WithNav />,
    children: [
      {
        index: true,
        element: (
          <FilterContext>
            <DashBoard />
          </FilterContext>
        ),
        loader: loader,
      },
      {
        path: "/projects",
        async lazy() {
          const { Projects } = await import("./pages/projects/Projects");
          return { Component: Projects };
        },
      },
      {
        path: "/projects/:projectId",
        async lazy() {
          const { Project, loader } = await import("./pages/project/Project");
          return { Component: Project, loader };
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
          const { Newproject, action } = await import(
            "./pages/new-project/Newproject"
          );
          return { Component: Newproject, action };
        },
        element: <div>New project</div>,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
